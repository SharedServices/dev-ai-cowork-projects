# Known failure: Quiet failed read inside a cross-service event handler treated as "not found," silently dropping the event

Bug and fix are both in this repo's own `BlobRepository` code; the trigger is consuming an event from a different repo (Remittance BE), which is why it's described as "cross-service" — that doesn't make the defect itself cross-repo.

**Symptom:** A cross-service consumed event (e.g. `RemittanceLedgerDateUpdated`, written by the Remittance (BE) service and consumed by RemittanceProcessing's `RemittanceOrchestrator`) never takes effect on the consuming side, even though the source event was written correctly and the target entity has existed for days. No exception is logged anywhere. The only trace is a Warning:

```
Remittance {RemittanceId} not found in organisation {OrganisationId}; update silently skipped
SourceContext: Snowdrop.RemittanceProcessing.Runtime.Orchestrators.RemittanceOrchestrator (or equivalent orchestrator for the affected entity)
```

**Signature (Splunk):** the giveaway is not the Warning text alone (that's just the symptom the handler chose to log) but its pairing with an unusually large `Elapsed` on the wrapping "Handled" completion line for the *same* event, at the *same* timestamp:

```spl
index="sharp-app-aks-{env}-king" "{RemittanceId or entity id}" ("not found in organisation" OR "Handled")
| table _time, container_name, Properties.Event, Properties.Elapsed, MessageTemplate
| sort _time
```

Confirmed shape (UF-16293, care, 2026-08-24): the "Handling `{Event}` event" dequeue log and the "not found" Warning + "Handled `{Event}` in `{Elapsed}`" completion log are **the same event's lifecycle**, not two different events colliding — `Properties.Event` on both lines names the identical event (`RemittanceLedgerDateUpdated`), and `Properties.Elapsed` on that completion line was `00:00:08.0022265` — roughly 8 seconds, versus sub-second (`00:00:00.223` in the same window) for a normal, successful handling of a sibling event. **No other log line exists anywhere in that multi-second gap** — no exception, no retry message, nothing naming the actual read that failed. Don't mistake two events dequeued a few milliseconds apart (normal for messages arriving in the same small batch off one ordered stream) for a race — check `Properties.Event` and `Properties.Elapsed` on the specific "Handled" line before concluding anything raced.

**Root cause — confirmed at the code level (Claude Code, 2026-08-26, UF-16293):** the defect is in `BlobRepository.ReadDocumentAndETagByIdAsync<T>`. The **outer** method has a retry loop that correctly distinguishes a genuine blob 404 (`BlobErrorCode.BlobNotFound` → legitimately return null) from a transient failure (retry with backoff) — that logic is correct and was never the problem. But the **inner** function that actually performs the download had its own `catch (Exception ex) { return (default, ...); }`, which swallowed **every** exception — timeouts, cancellations, transient storage/network errors, anything — before it could ever reach the outer retry logic. Any transient failure was silently converted into an unlogged "not found" on the very first attempt, with the retry infrastructure sitting right there but structurally unreachable. Fix (UF-16293): remove the inner catch so failures propagate to the outer method's existing, already-correct retry/backoff logic. Branch `features/UF-16293-error-causes-not-found`, **not yet merged/deployed** as of 2026-08-26 — until it ships, this failure mode can still occur on any entity whose handler goes through this same blob-read path.

**How to confirm for a specific entity:**
1. Pull the entity's cross-service event stream (Cosmos) and identify the specific event you'd expect to have taken effect but didn't (e.g. via `cosmos-query`'s per-service file for the writing service).
2. Run the Splunk signature above for that entity/time window. Confirm — don't assume — that the "not found" Warning and a "Handled" completion line share the same timestamp and the same `Properties.Event` as the event you're chasing.
3. Compare that `Properties.Elapsed` against a normal instance of the same event type on the same entity or a sibling entity — an outlier of several seconds (vs. sub-second normal) is the tell that a read stalled before the handler gave up.
4. Confirm no exception/retry line exists in the gap between the "Handling" dequeue log and the "Handled" completion log — that absence is part of the signature, not a search miss.
5. Downstream, confirm whatever the event was supposed to update never landed (e.g., a workflow queue projection, a status field) — this is what makes the drop visible to the customer.

**Known occurrences:**

| Ticket | Env | Entity | Event dropped | Elapsed before "not found" | Downstream symptom | Status |
|---|---|---|---|---|---|---|
| [UF-16293](https://sharpfm.atlassian.net/browse/UF-16293) | care | Remittance `1b06e647-efca-4e19-bc5c-2bba54cde8a1` (org `6cf94e67-b0b4-47aa-b902-e4832713f86f`) | `RemittanceLedgerDateUpdated`, warning at 2026-08-24T15:06:58.115Z | ~8.0s (`00:00:08.0022265`) | Reconciled remittance never appeared in the Remittance Posting Workflow "unsaved" queue, despite displaying correctly in the payer pillar view; posting attempt failed with "This remittance is not available for posting" | Root cause fixed in code 2026-08-26 (see above), branch not yet merged/deployed; this remittance's stuck state manually corrected via `POST /remittance/reconciliation/ledger-date` (see `snowdrop-api-calls` skill) |

**Not pursuing further:** what specifically caused the underlying read to fail/throw in this instance — most likely a transient Azure Storage error — is unrecoverable now (the inner catch swallowed the exception type along with everything else, so it was never logged) and isn't reproducible on demand, so it's not worth chasing. It's also not relevant to the fix: the fix doesn't depend on knowing the trigger, it just makes any trigger retry/surface correctly instead of being swallowed. Once `features/UF-16293-error-causes-not-found` merges, this failure mode should stop entirely — if it's still observed after that branch deploys, that would mean the fix didn't fully address the swallowed-exception path and is worth flagging as a re-open, not a new pattern.
