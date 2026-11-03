# Flow analysis — following an action across services

Goal: take a `TraceId` (or a business key that resolves to one) and assemble the **end-to-end flow**
of an action across API → Cosmos events → consumers, time-ordered, then reason over it
conversationally.

This builds on the `splunk-search` skill. **Use `splunk-search` for the mechanics** — index naming
(`sharp-app-aks-{env}-king`), the environment list (including the `exchange` to `exch` index alias),
and running the search through Chrome. The solution→namespace mapping is in `references/namespaces.md`.
This file only adds the trace-correlation layer on top. Filter by `namespace="{namespace}"` only when
scoping to one solution; for a cross-service flow do not filter by namespace.

## Field paths — confirmed against real indexed events

Logs are emitted as JSON via Serilog's `JsonFormatter`, which nests **every custom property under a
`Properties` object**. Confirmed field layout from a real `sharp-app-aks-ninja-king` event:

| Field | Splunk path |
|---|---|
| W3C trace id / span id | depends on log type + conversion — **three sources**, see below |
| Service / application name | `Properties.Application` |
| Event stream identifier | `Properties.identifier` or `Properties.EventStreamIdentifier` (**not** bare `identifier`) |
| Business keys (`RemittanceId`, `CompanyId`, …) | `Properties.<Key>` |
| Tenant / org | `Properties.metadata.TenantId` (or a promoted `Properties.OrganizationId`) |
| Entity id | `Properties.metadata.EntityId` |
| Legacy correlation Guid | `Properties.metadata.CorrelationId` |

### Where the trace id lives — THREE sources (confirmed against real events)

The W3C trace id can appear in three places; which are populated depends on **log type** (HTTP
request vs background/consumer) and whether the service has had the conformance pass:

1. **top-level `TraceId` / `SpanId`** — injected by the **APM agent (Instana)** on **HTTP-request**
   logs (it has an active request span). Present regardless of the app's logging config, and even on
   *unconverted* services. **Absent on background/consumer logs** (no request span). *Not* written by
   the app's `JsonFormatter` — it's added by the agent/pipeline. (Proven: a migrated build with **no**
   app enricher still had top-level `TraceId` on a request log; a background `CompanyProjectionWriter`
   log had **none**.)
2. **`Properties.TraceId` / `Properties.SpanId`** — emitted by the app's `ActivityEnricher`
   (Change 3) on a **converted** service. On request logs this duplicates the top-level; on
   **consumer/background logs it is the ONLY trace id** (the agent injects nothing there). This is the
   enricher's real value — pre-conformance, background logs had *no* trace at all.
3. **`Properties.metadata.TraceId` / `Properties.metadata.SpanId`** — on **unconverted** services
   that log the `{@metadata}` blob (event-handler logs); buried, and no top-level.

By log type:
- Converted service, **request** log → top-level `TraceId` (and `Properties.TraceId`).
- Converted service, **consumer/background** log → `Properties.TraceId` **only**.
- Unconverted service → top-level `TraceId` on its requests; `Properties.metadata.TraceId` on its
  event-handlers; nothing queryable on other background logs.

Detection — is a service converted? Check for `Properties.TraceId` (top-level only tells you it's a
request log, not that it's converted):

```spl
index="sharp-app-aks-{env}-king" Properties.Application="{service}"
| head 5
| table RequestPath, TraceId, Properties.TraceId, Properties.metadata.TraceId
```

**Universal flow query — coalesce/OR all three sources** so it works across request *and* consumer
logs and converted *and* unconverted services:
`(TraceId="{id}" OR Properties.TraceId="{id}" OR Properties.metadata.TraceId="{id}")`

## Property dictionary by namespace

Every name below is a `Properties.<name>` field (top-level for the trace ids — see above). Scanned from
each solution's `ScopeProperties` helper + its `[LogKeys]` attributes + the `RequestLoggingFilter`.
The **namespace** is the Splunk/k8s namespace (§2). A property can appear in both namespaces — use
this to know which business keys are available to pivot on for a given service. **Living list — extend
as more solutions are converted.**

| `Properties.<name>` | `snowdrop-charge-masters` | `snowdrop-guarantors` | Source |
|---|---|---|---|
| `TraceId` / `SpanId` | ✓ | ✓ | enricher (+ `WithTrace`) |
| `OrganizationId` | ✓ | ✓ | filter identity / `WithOrganizationId` |
| `UserId` | ✓ | ✓ | filter identity / `WithUserId` |
| `identifier` | ✓ | ✓ | `With(EventStreamIdentifier)` (the StreamId) |
| `TransactionId` | ✓ | ✓ | `ScopeProperties` (defined) |
| `Action` / `Elapsed` | ✓ | ✓ | `RequestLoggingFilter` messages |
| `CompanyId` | ✓ | — | `ScopeProperties` + `[LogKeys]` |
| `ChargeMasterId` | ✓ | — | `ScopeProperties` + `[LogKeys]` |
| `ChargeMasterName` | ✓ | — | `[LogKeys]` alias (`request.Name`) |
| `ChargeCode` | ✓ | — | `ScopeProperties` (defined) |
| `EffectiveStartDate` | ✓ | — | `[LogKeys]` (`request.EffectiveStartDate`) |
| `ImportId` | ✓ | — | `ScopeProperties` |
| `EventStreamIdentifier` | ✓ | — | `ScopeProperties` (full ESID string) |
| `LinkedTraceIds` | ✓ | — | `ScopeProperties` (fan-in array) |
| `PatientId` | — | ✓ | `ScopeProperties` + `[LogKeys]` |
| `GuarantorId` | — | ✓ | `ScopeProperties` + `[LogKeys]` |
| `PortfolioId` | — | ✓ | `ScopeProperties` |
| `FinancialAccountNumber` | — | ✓ | `ScopeProperties` (FAN) |
| `FirstName` / `LastName` | — | ✓ | `ScopeProperties` + `[LogKeys]` |

Notes:
- `Properties.@metadata` (the destructured event-metadata blob) and its nested fields
  (`Properties.metadata.TraceId`, `.CorrelationId`, `.TenantId`, `.EntityId`) appear on event-handler
  logs in both namespaces — see §3/§4.
- `Properties.Application` and the `namespace` field are host-level (set by the bootstrap/forwarder),
  not by `ScopeProperties`/the filter — covered in §2–§3.

## Step 1 — Resolve to a TraceId

If the user gives a `TraceId`, skip to Step 2. If they give a business key (RemittanceId, ClaimId,
PatientId, etc.), resolve it first:

```spl
index="sharp-app-aks-{env}-king" Properties.RemittanceId="{id}"
| eval Trace=coalesce(TraceId, 'Properties.TraceId', 'Properties.metadata.TraceId')
| stats min(_time) as first, max(_time) as last by Trace
| sort first
```

(`coalesce` collapses all three trace sources — APM top-level (requests), `Properties.TraceId`
(converted, incl. consumers), `Properties.metadata.TraceId` (unconverted) — so one query works across
log types and rollout state.)

A business key can map to **several** TraceIds (multiple actions touched the same entity over time).
Present them with timestamps and let the user pick, or analyse the most recent by default.

## Step 2 — Pull the whole flow for a TraceId

```spl
index="sharp-app-aks-{env}-king" (TraceId="{traceId}" OR Properties.TraceId="{traceId}" OR Properties.metadata.TraceId="{traceId}")
| eval Span=coalesce(SpanId, 'Properties.SpanId', 'Properties.metadata.SpanId')
| table _time, namespace, Properties.Application, Span, Level, MessageTemplate
| sort _time
```

(Top-level `Level`/`Timestamp`/`MessageTemplate` are not under `Properties`. `namespace` and other
`kubernetes.*` fields are added by the log forwarder, separate from the app's JSON.)

This is the spine: every log line across every service that participated in the action, in order.
Search **across namespaces** (don't filter to one solution) — the whole point is to see the hops
between services. If the action might span environments, that's unusual; stay within one env unless
told otherwise.

## Step 3 — Follow fan-in / fan-out

- **Fan-out** (one action → many events/consumers): all child work shares the same `TraceId`, so
  Step 2 already captures it; group by `kubernetes.namespace_name` / `<SpanIdField>` to see the
  branches.
- **Fan-in** (a batch consumer processing many origins): the batch line carries a `LinkedTraceIds`
  array (see conformance.md, Change 6). To expand a batch back to its origins:

```spl
index="sharp-app-aks-{env}-king" <TraceIdField>="{batchTraceId}" LinkedTraceIds=*
| eval origins=split(LinkedTraceIds, ",")
| mvexpand origins
| table _time, origins
```

Then run Step 2 for each origin TraceId of interest.

## Step 4 — Reason over the assembled flow

Don't just dump rows. Use the spine to:
- Establish the **sequence**: where did the action start (the API line), what events were written,
  which consumers picked them up, where did it end.
- Locate the **break**: the first `Error`/`Warning`, or the hop where the trace stops continuing
  (e.g. an event written but no consumer line with that `TraceId` — a consumer that didn't rehydrate,
  or hasn't processed yet).
- Surface **timing**: gaps between hops, the `Handled … in {Elapsed}` lines.
- Pull the **business context** from the scope properties already on each line (RemittanceId,
  ClaimId, OrganizationId) to explain *what* the action was, not just that it failed.

## Caveat — framework logs may not correlate

`sharp-events`' own consumer framework lines ("Received/Handled event in Xms", lifecycle) do **not**
carry the originating `TraceId` (see the Known Limitation in SKILL.md). If a gap in the trace looks
like a consumer "did nothing", check for these framework lines by namespace/time near the gap before
concluding the event was dropped — the work may have happened, just logged without the origin trace.
Stream-id-based backup consumers can also lack the originating `TraceId` (see conformance.md,
"Consumers that don't receive per-event metadata").

`Properties.metadata.CorrelationId` is a legacy per-write Guid, being deprecated in favour of `TraceId`;
do not pivot flows on it.

## Conversational loop

1. Ask for / confirm the environment (wrong env = empty results). Default time window `-1h` unless the
   user specifies otherwise; widen as needed.
2. Resolve business key → TraceId(s) if needed; confirm which to follow.
3. Assemble the spine (Step 2), then answer the user's actual question against it.
4. Offer to drill into a specific hop, expand a batch's origins, or widen the time window.

Etiquette: start broad (a count or summary), then drill into specific events; briefly explain what a
non-trivial SPL query does before showing results; surface findings (patterns, the break point, timing)
instead of pasting rows.
