# Snowdrop Log Flow Analysis (Cowork edition)

Conversational analysis of Snowdrop logs in Splunk, focused on **following one action end-to-end**
across services — an API call, the events it writes to Cosmos, and the consumers that process them —
by their shared W3C `TraceId`.

> This is a **self-contained, portable copy** for use in Cowork (where the Splunk connector works).
> The canonical source is `flow-analysis.md` in the `logging-correlation` Claude Code skill, located at
> `C:\Users\JamesMoorhouse\.claude\skills\logging-correlation` (confirmed 2026-09-21). This copy and the
> canonical file are expected to differ in places — how Splunk is reached (connector here vs. Claude
> Code's own workflow), for instance — that's normal platform adaptation, not drift. Sync between the
> two is manual and only done when needed; there's no automatic mechanism.
>
> **Corrected 2026-09-21:** §2's Plan Search row read `snowdrop-plan-search` (singular); fixed to
> `snowdrop-plans-search` (plural), matching the Financial Ledger rows of `references/namespaces.md`'s "Namespaces by squad" table. The
> earlier note in this file attributing the wrong value to an edit in the Claude Code canonical
> `flow-analysis.md` was unverified speculation on Claude's part and has been removed — nobody has
> actually confirmed what `flow-analysis.md` says about Plan Search, or whether it says anything at all.

Use whatever Splunk search tool/connector is available in this space to run the SPL below.

---

## 1. Index & environments

```
index="sharp-app-aks-{env}-king"
```

Replace `{env}` with one of the environment names. Scope to the relevant environment unless asked to
search across all (then use `index="sharp-app-aks-*-king"`).

| Env | Index |
|---|---|
| ninja | `sharp-app-aks-ninja-king` |
| team | `sharp-app-aks-team-king` |
| one | `sharp-app-aks-one-king` |
| exch | `sharp-app-aks-exch-king` |
| cloud | `sharp-app-aks-cloud-king` |
| app | `sharp-app-aks-app-king` |
| care | `sharp-app-aks-care-king` |
| space | `sharp-app-aks-space-king` |
| uno | `sharp-app-aks-uno-king` |

## 2. Solutions → namespaces

Each solution maps to a Kubernetes namespace. Filter with `namespace="{namespace}"` (confirmed
working) or `kubernetes.namespace_name="{namespace}"`. The same value also appears in the app JSON as
`Properties.Application`.

| Solution | Namespace |
|---|---|
| Charge Masters | `snowdrop-charge-masters` |
| Guarantors | `snowdrop-guarantors` |
| Patients API | `snowdrop-patients-api-be` |
| Plan Search | `snowdrop-plans-search` |
| Payers | `snowdrop-payers` |
| Remittance | `snowdrop-remittance` |
| Remittance Processing | `snowdrop-remittanceprocessing` |
| Resources | `snowdrop-resources` |

For a cross-service flow, do **not** filter by namespace — the point is to see the hops between
services. Filter by namespace only when scoping to one solution.

---

## 3. Field map (confirmed against real indexed events)

Logs are JSON (Serilog `JsonFormatter`), which nests custom properties under a `Properties` object.

| Field | Splunk path |
|---|---|
| W3C trace id / span id | three sources depending on log type + conversion (see §4) |
| Service / application name | `Properties.Application` (also the `namespace` field) |
| Log level / message template | top-level `Level` / `MessageTemplate` (**not** under `Properties`) |
| Event stream identifier | `Properties.identifier` (**not** bare `identifier`) |
| Business keys (`CompanyId`, `RemittanceId`, …) | `Properties.<Key>` |
| Tenant / org | `Properties.metadata.TenantId` |
| Entity id | `Properties.metadata.EntityId` |
| Legacy correlation Guid | `Properties.metadata.CorrelationId` |

`kubernetes.*` fields (`namespace`, pod/container names) are added by the log forwarder, separate
from the app's JSON.

## 4. Where the trace id lives — THREE sources

The W3C trace id can appear in three places; which are populated depends on **log type** (HTTP
request vs background/consumer) and whether the service has had the conformance pass:

1. **top-level `TraceId` / `SpanId`** — injected by the **APM agent (Instana)** on **HTTP-request**
   logs only. Present even on *unconverted* services' requests; **absent on background/consumer logs**
   (no request span). Not written by the app.
2. **`Properties.TraceId` / `Properties.SpanId`** — emitted by a **converted** service's app enricher.
   On request logs it duplicates the top-level; on **consumer/background logs it is the ONLY trace id**.
3. **`Properties.metadata.TraceId` / `Properties.metadata.SpanId`** — on **unconverted** services that
   log the `{@metadata}` blob (event-handler logs); buried, no top-level.

By log type: converted request → top-level (and `Properties.TraceId`); converted consumer →
`Properties.TraceId` only; unconverted → top-level on requests, `Properties.metadata.TraceId` on
event-handlers.

Detect whether a service is converted — check for **`Properties.TraceId`** (top-level only means it's
a request log, not that it's converted):

```spl
index="sharp-app-aks-{env}-king" Properties.Application="{service}"
| head 5
| table RequestPath, TraceId, Properties.TraceId, Properties.metadata.TraceId
```

Any flow query must **coalesce/OR all three** sources:
`(TraceId="{id}" OR Properties.TraceId="{id}" OR Properties.metadata.TraceId="{id}")`.

---

## 5. Property dictionary by namespace

Every name below is a `Properties.<name>` field (top-level for the trace ids — §4). Scanned from each
solution's `ScopeProperties` helper + its `[LogKeys]` attributes + the `RequestLoggingFilter`. The
**namespace** is the Splunk/k8s namespace (§2); a property can appear in both. Use this to know which
business keys are available to pivot on for a given service. **Living list — extend as more solutions
are converted.**

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

- `Properties.@metadata` (the destructured metadata blob) + nested `Properties.metadata.TraceId` /
  `.CorrelationId` / `.TenantId` / `.EntityId` appear on event-handler logs in both namespaces (§3/§4).
- `Properties.Application` and the `namespace` field are host-level (§1–§2), not from
  `ScopeProperties`/the filter.

---

## 6. Workflow

### Prereq — confirm the environment
Wrong environment = empty results. If env is ambiguous, ask. Default time window `-1h` unless the
user specifies otherwise; widen as needed.

### Step 1 — Resolve to a TraceId
If given a `TraceId`, skip to Step 2. If given a business key (CompanyId, RemittanceId, etc.):

```spl
index="sharp-app-aks-{env}-king" Properties.CompanyId="{id}"
| eval Trace=coalesce(TraceId, 'Properties.TraceId', 'Properties.metadata.TraceId')
| stats min(_time) as first, max(_time) as last by Trace
| sort first
```

A business key can map to several TraceIds (multiple actions over time). Present them with
timestamps; analyse the most recent by default or let the user pick.

### Step 2 — Pull the whole flow for a TraceId

```spl
index="sharp-app-aks-{env}-king" (TraceId="{traceId}" OR Properties.TraceId="{traceId}" OR Properties.metadata.TraceId="{traceId}")
| eval Span=coalesce(SpanId, 'Properties.SpanId', 'Properties.metadata.SpanId')
| table _time, namespace, Properties.Application, Span, Level, MessageTemplate
| sort _time
```

This is the spine: every line across every service that participated, in order. Search across
namespaces.

### Step 3 — Fan-out / fan-in
- **Fan-out** (one action → many events/consumers): all child work shares the `TraceId`; group by
  `Properties.Application` / `Span` to see the branches.
- **Fan-in** (a batch consumer draining many origins): the batch line carries a `LinkedTraceIds`
  array. Expand it to the origin traces:

```spl
index="sharp-app-aks-{env}-king" Properties.LinkedTraceIds=* TraceId="{batchTraceId}"
| eval origins=split('Properties.LinkedTraceIds', ",")
| mvexpand origins
| table _time, origins
```

Then run Step 2 for each origin of interest.

### Step 4 — Reason over the spine
Don't just dump rows:
- **Sequence:** where the action started (API line), what events were written, which consumers picked
  them up, where it ended.
- **Break point:** the first `Error`/`Warning`, or the hop where the trace stops continuing (event
  written but no consumer line with that `TraceId` — a consumer that didn't process yet, or isn't
  converted).
- **Timing:** gaps between hops; the `Handled {Action} in {Elapsed}` / `Handled … in {Elapsed}` lines.
- **Business context:** pull `Properties.CompanyId` / `Properties.identifier` / `Properties.metadata.*`
  to explain *what* the action was, not just that it failed.

---

## 7. Caveats

- **Unconverted services** won't have a top-level `TraceId` — fall back to `Properties.metadata.TraceId`
  (Step 2 already ORs both).
- **Framework / backup-consumer logs may not correlate.** The `sharp-events` library's own
  "Received/Handled event" lines, and stream-id-based backup consumers, can lack the originating
  `TraceId`. If a consumer looks like it "did nothing", check for those lines by namespace/time near
  the gap before concluding an event was dropped — the work may have happened, just logged without
  the origin trace.
- **`Properties.metadata.CorrelationId`** is a legacy per-write Guid (being deprecated in favour of
  `TraceId`); don't pivot flows on it.

## 8. Etiquette

1. Clarify environment (and solution, if scoping) before querying.
2. Start broad (a count/summary), then drill into specific events.
3. Briefly explain what a non-trivial SPL query does before showing results.
4. Surface findings — patterns, the break point, timing — don't just paste rows.
