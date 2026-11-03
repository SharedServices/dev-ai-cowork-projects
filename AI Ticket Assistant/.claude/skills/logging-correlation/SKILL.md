---
name: logging-correlation
description: Snowdrop structured-logging and W3C trace-correlation standard. Use in two situations — (1) APPLY/VERIFY the logging standard in a Snowdrop .NET backend solution (trace-correlated logs, ILogger+scope conventions, event trace rehydration), and (2) TRACE A FLOW end-to-end across services by TraceId or a business key (the API→event→consumer correlation that lets an action be followed through the system). For general Splunk error/log investigation use the `splunk-search` skill instead; this skill is specifically about cross-service trace correlation and conforming code to the standard.
---

# Logging & Trace Correlation — Snowdrop Platform

A consistent logging framework that lets a single action be followed through the system —
an API call, the events it writes to Cosmos, and the consumers that process those events —
all sharing one correlation identifier, so logs can be assembled into a flow and analysed
conversationally.

This skill has **two roles**. Read the matching reference file before doing the work:

| Intent | Reference |
|---|---|
| "Make this repo's logging conform to the standard" / "add trace correlation here" / verify a repo | [references/conformance.md](references/conformance.md) |
| "Trace this flow" / "what happened to remittance X" / "follow this TraceId across services" | [references/flow-analysis.md](references/flow-analysis.md) |

For plain error/exception/log investigation that is **not** about following a flow, use the
separate `splunk-search` skill (index/environment mechanics live there). This skill's
analysis role *builds on* `splunk-search` and adds the TraceId-flow assembly on top.

---

## Design decisions (settled — do not relitigate)

These were agreed deliberately. Treat them as fixed constraints unless the user reopens one.

1. **Canonical tracing model: OpenTelemetry / W3C `Activity`.** W3C trace context is the standard.
2. **Primary correlation key: W3C `TraceId`.** This is the field logs and analysis pivot on.
3. **Legacy `CorrelationId` Guid is deprecated.** Stop populating it; remove references over time.
   Do not build new behaviour on it.
4. **System of record for analysis: Splunk.** (See `splunk-search` for index/env mapping.)
5. **Trace context is reconstructed from existing event metadata fields** (`TraceId`, `SpanId`) —
   **no event-schema change.** Do not add a new `traceparent` field.
6. **`sharp-events` MUST NOT be modified.** It is a shared library across ~13 solutions. All work
   is **extension-side**, in each consuming repo. The only exception is if a change is *absolutely
   necessary* and explicitly approved.
7. **Per-repo, common spec.** `ScopeProperties` (and the field dictionary) stay copied per repo, but
   every copy conforms to the one standard below. `sharp-events` is *enriched, not rewritten*.

## Why this is mostly standardisation, not new build

The foundation already exists in `sharp-events`:

- `StreamMetadata` (base of `Sharp.Events.Metadata`) **already captures at write time** the W3C
  `TraceId`, `SpanId`, `CallerActivityParentId`, plus a legacy `CorrelationId` Guid and a
  `TransactionId`. So **every event already carries the writer's trace context.**
- `Activities.SetActivityIdDefaults()` forces W3C activity id format (the right standard), and a
  `Sharp.Events` `ActivitySource` exists.
- Each repo has a `ScopeProperties` BeginScope helper (~25 typed `WithXxxId(...)` business-key
  methods) and an `EventHandlerBase` that already wraps handlers in a scope with timing.

## The gaps the standard closes

1. **The trace chain breaks at the consumer.** Writers stamp `TraceId` into the event, but the
   Cosmos consumer never rehydrates an `Activity` from it — so the flow isn't stitched on the read
   side. **This is the linchpin fix, and because `sharp-events` is off-limits it lives app-side in
   each repo's `EventHandlerBase`.** (Details in `conformance.md`.)
2. **Trace ids aren't first-class log properties.** Event handlers bury the whole `@metadata` blob
   in scope; controllers/repositories have no trace enricher at all. The standard promotes
   `TraceId`/`SpanId` to explicit scope properties and adds a Serilog `Activity` enricher.
3. **Two logging stacks.** App code uses `ILogger`; some app code and all `sharp-events` internals
   use Serilog-static. App-code Serilog-static calls migrate to `ILogger`; `sharp-events` is left
   alone but its output is *correlated via the global Serilog enricher* (with one known limitation —
   see below).

## Known limitation (accepted)

`sharp-events`' own framework logs (`EventConsumerLogger`'s "Received/Handled event in Xms",
consumer lifecycle logs) fire **inside the library, outside** the app's rehydrated `Activity`.
The global Serilog enricher reaches them, but `Activity.Current` there is the change-feed processing
context (or none) — **not the event's origin trace.** So those framework lines won't correlate to
the originating flow. They are operational, not flow-analysis, logs — an accepted loss of not
modifying the library. The minimal library change that would fix it (rehydrate one level earlier in
`RecordHandler`) is noted only as a fallback if it ever becomes *absolutely necessary*.

## Rollout

The per-repo conformance work folds naturally into each solution as it is touched during the
.NET 10 upgrade campaign (see the `dotnet10-upgrade` skill). It does **not** require .NET 10 —
the changes are independent of the target framework.

## Arguments

`$ARGUMENTS`

- If it names a **repo / solution** or says *apply / add / verify / conform* → read
  `references/conformance.md` and work through the checklist for that repo.
- If it gives a **TraceId, a business key (RemittanceId, ClaimId, PatientId, …), or asks to follow
  a flow** → read `references/flow-analysis.md` and assemble the flow from Splunk.
- If ambiguous, ask which of the two roles is intended before proceeding.
