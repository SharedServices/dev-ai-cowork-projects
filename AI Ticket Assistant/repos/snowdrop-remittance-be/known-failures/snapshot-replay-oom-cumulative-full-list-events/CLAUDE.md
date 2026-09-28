# Known failure: Snapshot-replay OOM from cumulative full-list events (`RemittancePerClaimEobRemittancePdfAttachmentsUpdated`)

This bug is entirely in the Remittance (BE) service — don't confuse it with `snowdrop-remittance-processing-be`, a different, easily-confused repo.

**Symptom:** `snowdrop-remittance-api` throws `OutOfMemoryException` bursts (and fails liveness probes / restarts) when specific "hot" remittances are requested — concentrated on a handful of remittance IDs, typically large checks (thousands of claims), often in a retry-storm pattern where the same ID is re-requested continuously. In Instana this shows as sawtooth memory climbing past the pod limit with `Killing — failed liveness probe` restarts, **not** cgroup `OOMKilled` events.

**Signature (Splunk):** index `sharp-app-aks-{env}-king`, container `snowdrop-remittance-api`, namespace `snowdrop-remittance`:
```spl
index="sharp-app-aks-{env}-king" container_name="snowdrop-remittance-api" "OutOfMemoryException"
```
Stack traces root in `RemittanceEobController.GetClaimEobsForRemittance` → `RemittanceEventStore.GetRemittanceSnapshot` → `Sharp.Events.EventApplicator.ApplyJObject`, though the exception can surface anywhere in that call path (Cosmos feed iteration, `CosmosJsonNetSerializer.FromStream`, JObject clone/merge, `BlobRepository.ReadDocumentByIdAsync`). Endpoints hit: `/remittance/eob/claims/{guid}` (dominant) and `/remittance/eob/claims/claim/{guid}`. `Properties.ThreadPoolPendingCount` spikes during bursts (pileup once memory pressure hits).

**Root cause:** the EOB generation function publishes `RemittancePerClaimEobRemittancePdfAttachmentsUpdated` once per 100-claim batch, and each event re-stores the **entire cumulative** attachment list rather than a delta — so an N-claim remittance writes N/100 events whose payloads grow linearly (quadratic total). A 4,500-claim check produced 45 events totaling ~23 MB of a 44 MB stream. Snapshot rehydration (`GetRemittanceSnapshot`) deserializes and JObject-merges every event, exhausting heap. Regeneration (`RemittanceRegenerateClaimEobsEvent`) appends the whole sequence again. Callers that don't back off re-trigger the crash repeatedly.

**How to confirm for a specific entity:**
1. From the Splunk OOM events, group by remittance ID in the request path — hot IDs dominate (in UF-15648, one ID was 66% of all events).
2. Pull the remittance's event stream from Cosmos by StreamId (`snowdrop-remittance->{orgId}->remittance->{remittanceId}`) and check for many consecutive `RemittancePerClaimEobRemittancePdfAttachmentsUpdated` events with monotonically growing `ClaimEobRemittancePdfAttachments` arrays.
3. Corroborate in Instana: memory sawtooth over the burst window, liveness-probe restarts (no `OOMKilled`).

**Mitigation/fix:** fix plan in `tickets/UF-15648/code-analysis/` — read side moves `GetClaimEobsForRemittance` to the blob `RemittanceEobsProjection` (immediate, works for existing bloated streams); write side moves to delta events (gated on consumer sign-off, per the project's changing-events-is-last-ditch standing rule in root `CLAUDE.md`). **No stream repair:** remittances live a week to a year (average < 1 month), so existing bloated streams self-sunset.

**Known occurrences:**

| Ticket | Env | Entity | Scale | Status |
|---|---|---|---|---|
| [UF-15648](https://sharpfm.atlassian.net/browse/UF-15648) | app | Remittance `bca61dfa-741d-4545-b288-4df779733292` (org `c43aa31b-4103-40e0-8319-818ed30b3470`); also `7f966744-11ae-43b2-b42f-383f961e7a11`, `029578ac-ea52-463a-a784-e0f1471e9c82` | 1,069+ OOM events over 7 days (top ID = 66%); 45 cumulative events, 100→4,383 entries, ~23 MB of a 44 MB stream | Open; fix plan drafted 2026-08-04; retry-storm caller unidentified |
