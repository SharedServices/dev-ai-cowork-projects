# Conformance — applying the logging standard to a repo

Goal: make a Snowdrop .NET backend solution emit **trace-correlated, structured logs** so a single
action can be followed across API → Cosmos events → consumers, with `TraceId` as the primary key.

**Hard constraint:** do **not** modify `sharp-events`. Everything here is changes inside the
*consuming* repo. Reference code below is a *pattern to adapt per repo*, not a verified drop-in —
build and run the repo's tests after applying.

Reference files seen in `snowdrop-remittance-processing-be` (paths differ per repo, the shapes don't):
- `src/runtime/Eventing/EventHandlerBase.cs` — wraps event handlers (the rehydration seam)
- `src/runtime/Logging/ScopeProperties.cs` — the BeginScope helper (the field dictionary)
- `src/runtime/Logging/SerilogBuilder.cs` and `Program.Common.cs` — Serilog bootstrap (the enricher)

---

## The field dictionary (the per-repo "common spec")

Canonical property names. Every repo's `ScopeProperties` conforms to these; spelling must be
identical across repos or cross-service analysis breaks.

| Property | When | Source |
|---|---|---|
| `TraceId` | **always** | W3C trace id — the primary flow key |
| `SpanId` | **always** | current span |
| `OrganizationId` | **always** | tenant/org (already in `ScopeProperties.WithOrganizationId`) |
| `Application` | **always** | service name (already added by the Serilog bootstrap `Enrich.WithProperty("Application", …)`) |
| business keys | when in scope | `RemittanceId`, `ClaimId`, `ChargeId`, `PatientId`, `PayerId`, `PlanId`, … (existing `WithXxxId` methods) |
| `LinkedTraceIds` | batch/fan-in only | array of origin TraceIds a batch is processing (see fan-in below) |

Rules:
- **Message templates, never interpolation** — `_logger.LogInformation("Handled {Event} for {RemittanceId}", …)`, not `$"…{x}…"`.
- **Levels:** `Information` = normal flow milestones; `Warning` = recoverable/retryable; `Error` = failed unit of work; `Debug` = diagnostic detail.
- **Exceptions** are logged with the exception object (`_logger.LogError(ex, "…")`), not concatenated into the text.
- `TraceId`/`SpanId` are **first-class scope properties**, not only buried inside the serialised `@metadata` blob.

---

## Change 1 — Rehydrate the trace on consume (the linchpin)

In each repo's `EventHandlerBase` (the class every event handler routes through), reconstruct the
parent context from the event metadata's existing `TraceId`/`SpanId` and start an `Activity` on an
**app-owned `ActivitySource`** before opening the scope. This restores the chain that breaks at the
consumer, and — because onward event writes pick up `Activity.Current` — also propagates the trace
to any new events the consumer writes.

```csharp
using System.Diagnostics;

public abstract class EventHandlerBase : IEventHandler
{
    // One per service. Name it after the solution; register it in startup (Change 4).
    private static readonly ActivitySource _activitySource = new("Snowdrop.RemittanceProcessing");

    protected readonly ILogger _logger;
    protected EventHandlerBase(ILogger logger) { _logger = logger; }

    protected async Task WrapHandler<T>(EventStreamIdentifier identifier, Metadata metadata, T @event,
        Func<ScopeProperties, ScopeProperties> with,
        Func<EventStreamIdentifier, Metadata, T, Task> body)
    {
        using Activity? activity = StartConsumeActivity(metadata, @event!.GetType().Name);

        // Stamp TraceId/SpanId into the scope DIRECTLY from metadata — this guarantees log
        // correlation even if no ActivityListener is sampling (activity may be null).
        using IDisposable? scope = _logger.BeginScope(
            with(ScopeProperties.Empty.With(identifier).With(metadata).WithTrace(metadata)).Build);

        try
        {
            var sw = Stopwatch.StartNew();
            await body(identifier, metadata, @event);
            _logger.LogInformation("Handled {Event} in {Elapsed}", @event!.GetType().Name, sw.Elapsed);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed handling {Event}", @event!.GetType().Name);
            throw;
        }
    }

    // WrapMutator: same pattern (start activity + WithTrace(metadata) on the scope).

    private static Activity? StartConsumeActivity(Metadata metadata, string eventName)
    {
        ActivityContext parent = default;
        if (!string.IsNullOrEmpty(metadata?.TraceId) && !string.IsNullOrEmpty(metadata?.SpanId))
        {
            try
            {
                parent = new ActivityContext(
                    ActivityTraceId.CreateFromString(metadata.TraceId),
                    ActivitySpanId.CreateFromString(metadata.SpanId),
                    ActivityTraceFlags.Recorded);
            }
            catch (ArgumentException) { /* malformed ids — start a fresh trace */ }
        }
        return _activitySource.StartActivity($"Consume {eventName}", ActivityKind.Consumer, parent);
    }
}
```

Notes:
- **Stamp from `metadata` directly** (`WithTrace(metadata)`), not from `Activity.Current` — so logs
  correlate regardless of whether a tracer is sampling. The `Activity` is for onward propagation and
  APM; the scope property is for the logs.
- `ActivityTraceId.CreateFromString` expects a 32-hex string; `ActivitySpanId` a 16-hex string —
  which is exactly what `metadata.TraceId`/`SpanId` hold.

### Handlers that bypass `EventHandlerBase`

Some handlers open `BeginScope` inline instead of going through `WrapHandler`/`WrapMutator`
(e.g. several `Mutate` overloads in `PlansEventHandler`). These get **no** rehydration. Conformance
requires routing all event handling through the wrapped base, or at minimum calling
`.WithTrace(metadata)` on every inline scope. Find them:

```
grep -rn "BeginScope" src --include=*.cs   # any not flowing through EventHandlerBase needs fixing
```

### Consumers that don't receive per-event metadata — STOP and flag for a decision

Whether a consumer can rehydrate the **origin** trace depends on what its base hands it:

- **Batch / record consumers** (`EventBatchConsumerBase`, or any handler that gets `RecordedEvent`s):
  the events carry `Metadata.TraceId`. Rehydrate the origin per stream from the latest event that has
  a trace id, and log the batch's `LinkedTraceIds` (Change 6). This is the full linchpin — just do it.
- **Stream-only / projection-rebuild consumers** (`EventStreamsConsumerBase` → `VersionedObservedEventStream`:
  **only the stream identity + last observed version, no events, no `Metadata`**). The origin trace is
  **not available** without re-reading the events.

> **When you detect the stream-only case, surface it to the user — do NOT silently pick a path.**
> It's a genuine decision they want to make per consumer (sometimes resolve, sometimes accept).
> Present both options:
>
> - **Resolve** — recover the origin trace by reading the stream's recent events (via an event
>   reader) to get `Metadata.TraceId`, then rehydrate it as a normal origin trace. Costs extra Cosmos
>   I/O per change; choose when origin↔consumer correlation genuinely matters.
> - **Accept** — start a **fresh processing trace** so the rebuild's own logs and anything it calls
>   (e.g. a projection writer) share one `TraceId`; cross-correlate to the origin via the business
>   keys the consumer scopes (`OrganizationId`/`CompanyId`/`EventStreamIdentifier`). Note it on the
>   consumer so analysts don't expect the origin `TraceId` there.
>
>   ```csharp
>   using var activity = <AppActivitySource>.StartConsume("Rebuild <X> projection", metadata: null);
>   ```
>
> Whichever they choose, never leave the consumer trace-less. **Detect every such consumer**
> (`grep -rn "EventStreamsConsumerBase" src`) and raise the resolve-vs-accept choice for each — don't
> default silently, even if a previous consumer in the same repo was accepted.

---

## Change 2 — Extend `ScopeProperties`

Add a `WithTrace` overload that promotes the trace ids to first-class properties, and stop adding
the deprecated `CorrelationId`.

```csharp
public ScopeProperties WithTrace(Metadata? metadata)
{
    if (!string.IsNullOrEmpty(metadata?.TraceId)) With("TraceId", metadata.TraceId);
    if (!string.IsNullOrEmpty(metadata?.SpanId)) With("SpanId", metadata.SpanId);
    return this;
}

// Optional convenience for non-event code paths that have an ambient Activity:
public ScopeProperties WithTrace(System.Diagnostics.Activity? activity)
{
    if (activity is not null)
    {
        With("TraceId", activity.TraceId.ToHexString());
        With("SpanId", activity.SpanId.ToHexString());
    }
    return this;
}
```

Keep this overload identical across every repo's copy of `ScopeProperties`.

### Why this matters in Splunk (confirmed against real events)

Serilog's `JsonFormatter` nests scope/enriched properties under `Properties`. A **not-yet-converted**
service that logs the `{@metadata}` blob buries the trace id three levels deep — there is no clean
top-level field to query:

```
Properties.metadata.TraceId   ← only path on an unconverted service (e.g. snowdrop-guarantors today)
```

After this change (the Change 3 enricher is what actually emits it), the id is promoted into the
`Properties` bag:

```
Properties.TraceId            ← emitted by the app
Properties.SpanId
```

A top-level `TraceId` / `SpanId` *also* appears in Splunk, but it is **injected by the APM agent
(Instana) on HTTP-request logs** — not by the app (the `JsonFormatter` only writes under `Properties`).
So the top-level field is present even on *unconverted* services' requests, and **absent on
background/consumer logs**. That makes `Properties.TraceId` (this enricher) the *only* queryable trace
id on consumer/background logs; on request logs it overlaps the agent's top-level field. See
`flow-analysis.md` for the three-source query model.

`Properties.metadata.TraceId` still exists (the write-time origin captured on the event by
`StreamMetadata`, which we can't stop emitting) — promotion **adds** the field, it doesn't remove the
buried one. To tell whether a service is converted, check for **`Properties.TraceId`** (a top-level
`TraceId` only tells you it's a request log, not that it's converted).

---

## Change 3 — Serilog `Activity` enricher (covers non-scoped logs)

Controllers and repositories don't open a handler scope, so they have no trace properties today.
Add a tiny enricher that reads `Activity.Current` at emit time. Zero new package dependency.
Because `sharp-events` logs through the **global `Serilog.Log`** static, registering this on the
global logger also reaches the library's own logs (subject to the Known Limitation in SKILL.md).

```csharp
using System.Diagnostics;
using Serilog.Core;
using Serilog.Events;

public sealed class ActivityEnricher : ILogEventEnricher
{
    public void Enrich(LogEvent logEvent, ILogEventPropertyFactory pf)
    {
        var a = Activity.Current;
        if (a is null) return;
        logEvent.AddPropertyIfAbsent(pf.CreateProperty("TraceId", a.TraceId.ToHexString()));
        logEvent.AddPropertyIfAbsent(pf.CreateProperty("SpanId", a.SpanId.ToHexString()));
    }
}
```

Register it in the Serilog bootstrap (in repos on the .NET 10 pattern this is
`Program.Common.cs` → `Common_ConfigureLogging`; otherwise `SerilogBuilder`):

```csharp
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.FromLogContext()
    .Enrich.WithProperty("Application", _applicationName)
    .Enrich.With(new ActivityEnricher())          // <-- add
    .WriteTo.Console(new JsonFormatter())
    .CreateLogger();
```

`AddPropertyIfAbsent` means the explicit scope `TraceId` from Change 1 always wins; the enricher
only fills the gap for code paths with no scope.

> **Why this isn't redundant with the APM agent.** The Instana/APM agent already injects a top-level
> `TraceId` on **HTTP-request** logs, so on request paths this enricher overlaps it. But the agent
> injects **nothing on background/consumer logs** — verified against a production pre-conformance
> background `CompanyProjectionWriter` log: no top-level `TraceId`, no `Properties.TraceId`, *no trace
> at all*. This enricher (with Change 1/4 setting `Activity.Current` on consumers) is the **first and
> only** thing that gives consumer/background logs a queryable trace id. That's its real value — don't
> drop it thinking the agent covers it.

---

## Change 4 — Register the app `ActivitySource` so `Activity.Current` is set

`ActivitySource.StartActivity` returns `null` unless an `ActivityListener` is sampling its source.
A real `Activity` is needed for **onward propagation** (so events written by a consumer carry the
trace). If the repo already wires OpenTelemetry, just add the source there
(`.AddSource("Snowdrop.RemittanceProcessing")`). Otherwise register a lightweight always-on listener
in startup:

```csharp
ActivitySource.AddActivityListener(new ActivityListener
{
    ShouldListenTo      = s => s.Name == "Snowdrop.RemittanceProcessing",
    Sample              = (ref ActivityCreationOptions<ActivityContext> _) => ActivitySamplingResult.AllData,
    SampleUsingParentId = (ref ActivityCreationOptions<string> _)          => ActivitySamplingResult.AllData,
});
```

> Note on Instana: solutions today inject `Instana.Tracing.Core` (see the `dotnet10-upgrade` skill).
> The canonical model is OpenTelemetry/W3C. Instana consuming the same W3C `Activity` is fine;
> the listener above is only to guarantee `Activity.Current` exists for propagation and logging.
> Do not add Instana-specific span code.

---

## Change 5 — Convert ALL app-code Serilog logging to `ILogger<T>` + `BeginScope`

Convert every static/ambient Serilog logging site in app code to the `ILogger<T>` abstraction, and
replace Serilog's ambient context-push patterns with `ILogger.BeginScope` (using `ScopeProperties`
from Change 2 where available). Serilog stays only as the *sink* behind `ILogger` (the
`Program.Common.cs` bootstrap) — application code calls `ILogger<T>`, never Serilog directly.

> **Scope note:** in some repos Serilog-static is *infrequent* (a few `Telemitry`-style calls); in
> others it's *pervasive* (the whole codebase). The work is the same shape either way — this is a
> full sweep, not a spot fix. Done once per repo.

Find every site:

```
grep -rn "Serilog\.Log\.\|Serilog\.ILogger\|Log\.Information\|Log\.Error\|Log\.Warning\|Log\.Debug\|Log\.ForContext\|Log\.Logger\|LogContext\.\|PropertyBagEnricher\|LogContextScope" src --include=*.cs
```

### Conversion patterns

| From (Serilog) | To (`ILogger<T>`) |
|---|---|
| `private static readonly ILogger Log = Serilog.Log.ForContext<T>();` | injected `private readonly ILogger<T> _logger;` via constructor |
| `Log.Information(...)` / `Log.Error(ex, ...)` / `Log.Warning(...)` | `_logger.LogInformation(...)` / `LogError(ex, ...)` / `LogWarning(...)` |
| `Log.Information($"...{x}...")` (interpolation) | message template: `_logger.LogInformation("...{X}...", x)` |
| `Log.ForContext("K", v).Information(msg)` | `using (_logger.BeginScope(ScopeProperties.Empty.With("K", v).Build)) _logger.LogInformation(msg);` — or fold the value into the message template if it's a one-off |
| `LogContext.PushProperty("K", v)` | `using var scope = _logger.BeginScope(ScopeProperties.Empty.With("K", v).Build);` |
| `Sharp.Logging` `new PropertyBagEnricher { ["K"] = v }.PushContext()` | `using var _ = _logger.BeginScope(ScopeProperties.Empty.With("K", v).Build);` |
| `Sharp.Logging.Context.LogContextScope` + `scope.AddProperty(...)` | a single `using var scope = _logger.BeginScope(ScopeProperties...);` covering the same block |

Promote `TraceId`/`SpanId` to first-class scope properties via `WithTrace(metadata)` (Change 2)
wherever a handler has the event metadata.

### Three cascades that bite — handle them

1. **Manually-`new`-ed classes.** A class that isn't resolved from DI (constructed with a runtime
   value, e.g. `new CatalogReader(orgId, client)`) can't have `ILogger<T>` auto-injected. Add the
   `ILogger<T>` parameter and **thread it from every creator** — the creators are usually DI-resolved
   and can take `ILogger<ThatClass>` themselves. Find all creators: `grep -rn "new ClassName(" src`.
   Don't forget **tests** that `new` the class — pass `NullLogger<T>.Instance`
   (`Microsoft.Extensions.Logging.Abstractions`).
2. **`Microsoft.Extensions.Logging.Abstractions` reference.** `ILogger<T>` is *not* available in
   plain `Microsoft.NET.Sdk` class libraries by default (it *is* in `Microsoft.NET.Sdk.Web` hosts via
   the framework). Add `<PackageReference Include="Microsoft.Extensions.Logging.Abstractions" />` to
   each non-Web class library that now uses `ILogger<T>`, and a `<PackageVersion>` in
   `Directory.Packages.props` (match the band of the other `Microsoft.Extensions.*`, e.g. `10.0.8`).
3. **Tests that build their own `ServiceCollection`.** Adding an `ILogger<T>` constructor dependency
   breaks any test (or test fixture) that hand-builds a container and resolves the converted class —
   the container can't satisfy `ILogger<T>` and construction throws at resolve time. **This compiles
   fine and only fails at runtime**, so it won't show up until you run the tests. Add
   `services.AddLogging();` to every such test `ServiceCollection`. Find them:
   `grep -rn "new ServiceCollection()" src` (test projects). This is distinct from cascade #1 — here
   the class *is* DI-resolved, just by a test-owned container that never registered logging.

   > **Run the tests — don't just build.** This cascade is invisible to `dotnet build`; only
   > `dotnet test` surfaces it. Never assume a repo's tests "need live infra" without checking —
   > many Snowdrop suites are fully in-memory (`MemoryEventingSystem` + `WithInMemoryMode`) and run
   > offline in seconds.

> **`ScopeProperties` reachability:** it lives in the shared project (e.g. `Internal`). A project can
> only use it if it references that project *without* creating a cycle. Projection writers that
> `Internal` itself depends on **cannot** reference back to it — use a plain
> `Dictionary<string, object>` for `BeginScope` there instead.

### What to LEAVE on Serilog (exclusions — flag, don't convert)

- **`sharp-events`** internals — off-limits (Change 3 enricher correlates them, within the Known Limitation).
- **Vendored shared components** copied into the repo (e.g. `Snowdrop.Shared.HealthCollection`).
  Converting them diverges them from the canonical copies; their `Log.Logger` lines still flow
  through the global Serilog pipeline and pick up the `ActivityEnricher`'s `TraceId`.
- **Framework-bound logging contracts** — interfaces from shared packages that *mandate* a
  `Serilog.ILogger` (e.g. `Sharp.Reincarnation`'s `ISeeder.Seed(SeedRequest, Serilog.ILogger)`, where
  the framework hands the implementation a per-request `Serilog.ILogger`). Converting breaks the
  contract; keep using the supplied logger.
- The **`Program.Common.cs` Serilog bootstrap** (`Log.Logger = new LoggerConfiguration()...`) — this
  *is* the sink wiring; it stays (and is where the `ActivityEnricher` is registered in Change 3).

### Behavioural gotcha

Undisposed `LogContext.PushProperty(...)` (no `using`) leaks the property into the ambient context
for the rest of the request. Converting it to `using var scope = _logger.BeginScope(...)` correctly
scopes it to the enclosing block — a quiet correctness improvement; verify the property is still
present on the log lines that need it.

---

## Change 6 — Fan-in / batch handlers (the "array of context ids")

A Cosmos batch handler processes N events from potentially N different originating traces — a single
batch span cannot belong to all of them. At the **log** level, capture the set so analysis can hop
from the batch back to each origin:

```csharp
var originTraceIds = events
    .Select(e => e.Metadata?.TraceId)
    .Where(t => !string.IsNullOrEmpty(t))
    .Distinct()
    .ToArray();

using (_logger.BeginScope(ScopeProperties.Empty
    .WithOrganizationId(organizationId)
    .With("LinkedTraceIds", originTraceIds).Build))
{
    // ... then each individual event still rehydrates its own TraceId via EventHandlerBase ...
}
```

Each event inside the batch still gets its own correct `TraceId` from Change 1; `LinkedTraceIds`
records the fan-in relationship for the batch-level line. (This realises the "array of context ids"
intent at the log level without full OpenTelemetry span links.)

---

## Change 7 — Global request-logging filter (controllers)

Every controller action must emit an **initial log on entry** and ensure **any failure is logged**.
Do this with one global MVC action filter, **not** per-method `try/catch` — a filter guarantees
coverage for all current *and future* actions with no boilerplate to forget, and doesn't disturb the
controllers' existing in-action `catch` blocks that translate domain exceptions into responses.

```csharp
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;

public sealed class RequestLoggingFilter : IAsyncActionFilter
{
    private readonly ILogger<RequestLoggingFilter> _logger;
    public RequestLoggingFilter(ILogger<RequestLoggingFilter> logger) => _logger = logger;

    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var action = context.ActionDescriptor.DisplayName;
        _logger.LogInformation("Handling {Action}", action);

        var stopwatch = Stopwatch.StartNew();
        var executed = await next();

        if (executed.Exception is not null && !executed.ExceptionHandled)
            _logger.LogError(executed.Exception, "Unhandled exception in {Action} after {Elapsed}", action, stopwatch.Elapsed);
        else
            _logger.LogInformation("Handled {Action} in {Elapsed}", action, stopwatch.Elapsed);
    }
}
```

Register it once where controllers are added (the host's `Program.Common.cs`):

```csharp
builder.Services.AddControllers(options => options.Filters.Add<RequestLoggingFilter>());
```

Notes:
- **Log, don't swallow.** Do not set `executed.ExceptionHandled = true` — the exception still
  propagates, so the framework's response and any in-action `catch` are unchanged; this only *ensures
  the failure is recorded*. Entry/error lines carry the request `TraceId` via the Change 3 enricher.
- **`Filters.Add<T>()` resolves the filter from DI** (`ActivatorUtilities`), so `ILogger<T>` is
  injected with no explicit registration.
- **Do NOT apply this to seeding / reincarnation / other dev-tooling APIs** (e.g. a
  `Reincarnation.Api` host, or `ISeeder`-style endpoints). It's for the product's real controllers.
- **Multiple product web hosts:** there's no clean shared home for an MVC filter (a domain class
  library would need an ASP.NET `FrameworkReference`). Just **duplicate the small filter into each
  web host** — consistent with the per-repo "common spec, copied" model.
- **Watch for double-logging:** actions that already `LogError(...); throw;` will now log twice (their
  line + the filter's). Harmless, but trim the now-redundant in-action catch if you want the filter to
  be the single source.

---

## Change 8 — Business context on the request filter (identity + per-endpoint keys)

The Change 7 filter logs *what* ran but not *whom/what for* — so a trace can't be pivoted from
business data. Enrich it by opening the scope **before** the entry log so identity and keys land on
every line of the action (entry, the action's own logs, exit/error). Two categories:

**(1) Caller identity — global.** Read OrganizationId/UserId from the request (this repo: `org-id`
header + `sub` JWT claim, via the local `SharpContext()` extension) and add them to the scope for
every action.

**(2) Per-endpoint business keys — declared with a `[LogKeys(...)]` attribute.** String paths into
the action's bound arguments; the filter resolves them by reflection. First segment = parameter name,
rest navigate properties; optional `"Alias=path"` sets the logged name to match the field dictionary.
Missing/mistyped paths are **skipped silently** (never fail the request).

```csharp
// On the action:
[HttpPost("companies/{companyId}")]
[LogKeys("companyId", "request.Name", "request.EffectiveStartDate")]   // route scalar + body fields
public Task<ActionResult<...>> Post(Guid companyId, ChargeMasterCreateRequest request) { ... }
// Use the alias form where the arg name doesn't match the dictionary: [LogKeys("CompanyId=companyId")]
```

```csharp
// In RequestLoggingFilter.OnActionExecutionAsync, before the entry log:
var keys = ScopeProperties.Empty;

if (context.Controller is ControllerBase controller)               // (1) identity
{
    var caller = controller.SharpContext();
    if (caller.OrganizationId.Id != Guid.Empty) keys.WithOrganizationId(caller.OrganizationId.Id);
    if (caller.UserId.Id != Guid.Empty) keys.WithUserId(caller.UserId.Id);
}

var declared = (context.ActionDescriptor as ControllerActionDescriptor)?   // (2) [LogKeys]
    .MethodInfo.GetCustomAttribute<LogKeysAttribute>();
if (declared is not null)
    foreach (var spec in declared.Paths)
        if (TryResolveKey(context.ActionArguments, spec, out var name, out var value))
            keys.With(name, value);

using var scope = _logger.BeginScope(keys.Build);
// ... entry log / next() / exit log ...
```

`TryResolveKey` splits the optional `alias=` prefix, then walks `args[segment0].segment1.segment2…`
by reflection (`BindingFlags.IgnoreCase`), returning false (skip) on any miss. `LogKeysAttribute` is
a trivial `[AttributeUsage(Method)]` holding `string[] Paths`.

Notes:
- **Trade-off (chosen):** string paths mean no compile-time safety and no *computed* keys — typos
  fail silently. Accepted for zero per-endpoint ceremony. (If a repo needs computed keys or
  type-safety, an attribute that names an extractor *type* is the heavier alternative.)
- **Dictionary consistency without touching contracts:** the `Alias=path` form decouples the
  *logged* name from the external route/parameter/property name — so you get the shared field name
  while the API contract is unchanged (critical: renaming params or contract properties would break
  external callers). Use it whenever the source name differs from the dictionary, e.g.
  `"CompanyId=companyId"` (route scalar → consistent casing) or
  `"ChargeMasterName=request.Name"` (incoming `Name` → the meaningful business key). Same naming
  rule as `ScopeProperties` (Change 2).
- Lives in the web host alongside the filter (duplicate per product web host, like Change 7).

---

## Change 9 — Azure Functions host (isolated worker)

A Functions host is a third entry-point type alongside controllers (Change 7) and Cosmos consumers
(Change 1), and it needs its own seam. **Why it's not automatic:** in the isolated worker model, only
**HTTP-triggered** functions (under `ConfigureFunctionsWebApplication` ASP.NET Core integration) get an
`Activity` from the incoming request — so the Change 3 enricher works there for free. **Non-HTTP
triggers** (timer, queue, Service Bus, Cosmos, blob) do **not** flow through ASP.NET, so
`Activity.Current` is usually `null` → the enricher stamps nothing, and any events the function writes
carry **no `TraceId`** (sharp-events reads `Activity.Current` at write time). One worker middleware
fixes every trigger type.

```csharp
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Middleware;

public sealed class FunctionsLoggingMiddleware(ILogger<FunctionsLoggingMiddleware> logger) : IFunctionsWorkerMiddleware
{
    public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
    {
        var functionName = context.FunctionDefinition.Name;

        // Continue the host-propagated W3C trace so Activity.Current is set for EVERY trigger type
        // (and onward event writes inherit it). StartFunction parses TraceContext.TraceParent via
        // ActivityContext.TryParse; falls back to a fresh trace if absent/malformed (external caller).
        using var activity = <AppActivitySource>.StartFunction(
            $"Function {functionName}", context.TraceContext?.TraceParent, context.TraceContext?.TraceState);

        using var scope = logger.BeginScope(ScopeProperties.Empty
           .WithFunctionName(functionName)
           .WithInvocationId(context.InvocationId).Build);

        logger.LogInformation("Handling {FunctionName}", functionName);
        try { await next(context); }
        catch (Exception ex) { logger.LogError(ex, "Unhandled exception in {FunctionName}", functionName); throw; }
    }
}
```

`StartFunction` on the app `ActivitySource` (sits next to `StartConsume` from Change 1):

```csharp
public static Activity? StartFunction(string operationName, string? traceParent, string? traceState = null)
{
    if (!string.IsNullOrEmpty(traceParent) && ActivityContext.TryParse(traceParent, traceState, out var parent))
        return Source.StartActivity(operationName, ActivityKind.Server, parent);
    return Source.StartActivity(operationName, ActivityKind.Server);
}
```

Register once in startup:

```csharp
.ConfigureFunctionsWebApplication(worker => worker.UseMiddleware<FunctionsLoggingMiddleware>())
```

Notes:
- **Home — the Functions host project, NOT the shared `runtime` lib.** The middleware needs the
  `Microsoft.Azure.Functions.Worker` packages; adding those to the general domain lib drags Functions
  deps into every web/consumer host that references it. (This is the opposite of the Change 7 filter,
  which *can* live in a shared lib because that lib already carries an ASP.NET `FrameworkReference`.)
  Multiple Functions hosts in one solution → duplicate the small middleware, or extract a dedicated
  Functions-shared lib — never the general runtime lib.
- **Event/message-triggered functions** that receive a payload carrying sharp-events `Metadata` (or a
  W3C `traceparent`) should rehydrate **that** origin instead of (or in addition to) `TraceContext` —
  reuse `StartConsume(metadata)` from Change 1 so the function continues the originating trace, same
  principle as a Cosmos consumer. Add the business keys to the scope as available.
- **Isolated = two processes.** The Functions *host* logs separately and is **not** routed through the
  app's Serilog/enricher; only the **worker** (your code) is. Because the worker continues the host's
  `TraceId` via `TraceContext`, the ids still line up across both. Don't expect host-emitted lines to
  carry `Properties.TraceId`.
- **Serilog wiring in the worker** is the same as a web host but inside `ConfigureServices`:
  `Log.Logger = new LoggerConfiguration()...Enrich.With(new ActivityEnricher())...CreateLogger();` then
  `services.AddSerilog(); services.AddSingleton(Log.Logger);` — application code uses `ILogger<T>`.
- **External vs internal callers.** An externally-triggered webhook (e.g. Stripe) legitimately
  *starts* a trace — there's no internal upstream to continue, so the fresh-trace fallback is correct.
  Internal HTTP callers propagate `traceparent`, which ASP.NET integration already honours.

---

## Verify

1. **Build AND run the tests** — `dotnet test`, not just `dotnet build`. The `ILogger<T>` ctor
   change is invisible to the compiler but fails at resolve time in any test container missing
   `AddLogging()` (Change 5, cascade #3). Most Snowdrop suites are in-memory and run offline in
   seconds — don't skip them assuming they need live infra.
2. **Conformance grep checklist:**
   - `ScopeProperties` has the `WithTrace` overload, identical to other repos.
   - The Change 5 grep returns **only** the allowed exclusions: the `Program.Common.cs` bootstrap,
     vendored shared components, and framework-bound `Serilog.ILogger` contracts. No other app-code
     `Serilog.Log`/`Log.Xxx`/`LogContext`/`PropertyBagEnricher` calls remain.
   - Every class library that now uses `ILogger<T>` has the `Microsoft.Extensions.Logging.Abstractions`
     reference (and a `Directory.Packages.props` version); manually-`new`-ed classes (incl. tests)
     pass a logger.
   - No new population of the deprecated `CorrelationId`.
   - All event handlers route through `EventHandlerBase` (or call `WithTrace(metadata)`).
   - Every stream-only consumer (`grep -rn "EventStreamsConsumerBase" src`) was **flagged to the user**
     with the resolve-vs-accept choice (Change 1) — not silently defaulted; and none are left trace-less.
   - The app `ActivitySource` is registered (Change 4) and the `ActivityEnricher` is added (Change 3).
   - Each **product** web host registers the `RequestLoggingFilter` in `AddControllers(...)` (Change 7);
     seeding/reincarnation/tooling hosts are intentionally excluded.
   - The filter enriches the scope with caller identity (OrganizationId/UserId), and actions with
     meaningful inputs carry `[LogKeys(...)]` for their business keys (Change 8).
   - Each **Azure Functions host** registers the `FunctionsLoggingMiddleware`
     (`grep -rn "ConfigureFunctionsWeb\|ConfigureFunctionsWorker" src`), and `StartFunction` lives on
     the app `ActivitySource` (Change 9). Event/message-triggered functions rehydrate the payload's
     origin trace via `StartConsume`, not just `TraceContext`.
3. **Smoke test the chain:** trigger an API call that writes an event, let the consumer process it,
   and confirm in the logs that the API line and the consumer line share the same `TraceId`.
   Then confirm the field is queryable in Splunk (see `flow-analysis.md` — the exact Splunk field
   path depends on the JSON formatter and must be confirmed once against real indexed events).
