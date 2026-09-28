# Known failure: Event-batch checkpoint skip on blob ETag conflict (+ its False-Credit-Balance consequence)

**This entry combines two closely related patterns into one folder**, because the second is an explicitly confirmed *consequence* of the first, not a separate mechanism. Confirmed remittance-processing-specific: every occurrence and the entire root cause sit inside this repo's own event-batch-function code, even though the symptom shows up through a cross-service posting handshake with Ledgers.

## Part 1: The underlying defect

**Symptom:** An event clearly exists in an entity's event feed (Cosmos) and should have produced a downstream effect — a projection field, a status flag, a dependent event — but that effect never materializes, with no error visible anywhere in the UI or to the customer.

**Signature (Splunk):** In this repo's `snowdrop-remittanceprocessing-eventbatchfunctions` container, index `sharp-app-aks-{env}-king`:
```
Failed to process events for {StreamId} from {FirstEventNumber} to {LastEventInBatch} after {Duration}
```
with exception:
```
System.ApplicationException: ETag did not match
  at Snowdrop.RemittanceProcessing.Runtime.Data.Blob.BlobRepository...ConcurrentUpdateWithETag...
```

**Important gotcha:** this is logged at **`Level=Warning`**, not `Error` — a search scoped to `Level=Error` will miss it. Search on the message text / exception string instead, or include Warning:
```spl
index="sharp-app-aks-{env}-king" container_name="snowdrop-remittanceprocessing-eventbatchfunctions"
"{StreamId or entity id}" ("Failed to process" OR "ETag did not match")
```

**Root cause:** Multiple event-batch workers race to write the same checkpoint/state blob within milliseconds of each other (e.g. several posting batches in quick succession). The losing worker's batch write hits an optimistic-concurrency conflict (Azure Blob HTTP 412 `ConditionNotMet`). The checkpoint has **already advanced past** the failed batch's event range by the time the failure is caught, so the consumer resumes at the *next* batch — the failed batch's events are silently never reprocessed.

**How to confirm for a specific entity:**
1. Pull the entity's event feed (Cosmos, by `StreamId`) and find the `EventNumber` of the event you expect to have taken effect.
2. Run the Splunk signature above for that stream/time window.
3. Check whether the target `EventNumber` falls within the failed batch's `FirstEventNumber` → `LastEventInBatch` range. If it does, that's your root cause.

**Wrinkle — visible impact is inconsistent, don't rule the pattern out just because the end state looks correct.** Whether this defect is actually *visible* to a customer depends entirely on whether the affected entity happens to get reprocessed again afterward for some unrelated reason:
- If nothing reprocesses it, the dropped event's effect is **permanently missing**.
- If the entity later gets reprocessed anyway (e.g. an unrelated correction/reversal/repost cycle), that forces a *fresh* evaluation outside the failed batch's range, which can succeed and make the final state look correct — but only by coincidence, not because the defect was fixed. Always check the *first* occurrence, not just the final projection state.

**Known occurrences:**

| Ticket | Env | Entity | Failed batch range | Event that fell in the gap | Outcome | Status |
|---|---|---|---|---|---|---|
| [UF-14744](https://sharpfm.atlassian.net/browse/UF-14744) | uno | Remittance `7c52fa91-a919-4497-9542-6adb2b0b835c` (org `bb6afbd4-6313-408a-a965-1e66e02cc2fd`), ClaimPaymentId `2b6c7bed-5ff9-46bb-a78a-bc014bec6d8b` | events 23→72 | `RemittanceClaimPaymentsArePosted` (event 23) — claim payment posted in Ledger but never marked `IsPosted` in Remittance Processing | Permanently missing — never reprocessed | Testing; deferred to **26.10.0.0 Tech Debt Release** (JT/Jayme Alexander: event-batch retry changes are historically risky outside a planned release) |
| UF-15610 investigation (2026-07-29), example 1 | cloud | Remittance `134a2c2a-f73d-451f-b98a-40a6557e8a9c` (org `5d6908ef-fef5-4a6e-ac9c-34fcb3834ce0`), ClaimPaymentId `b2ca0454-894c-44a7-ae49-93aff02aa10c` (UFMHM1324894A1) | events 10→59 | `RemittanceDisputes` (event 10) — "Zero Pay" denial dispute fired correctly in the event store but never appeared on the claim payment's live projection | Permanently missing — never reprocessed | Second occurrence of UF-14744 defect; not yet its own ticket |
| UF-15610 investigation (2026-07-29), example 2 | uno | Remittance `4001729b-d44d-4fe3-a435-31a0fec731ae` (org `d03539b6-4186-4040-b2d7-5c0165a349f0`), ClaimPaymentId `0f7b807a-e3fc-44d2-ad68-bd6088aec5f8` (UFLH1022390A1) | events 6→55 | `RemittanceDisputes` (event 6) — dropped from the first posting (`IsDisputed: false` despite matched `DisputeRuleDetails`) | Self-corrected — an unrelated unpost/repost cycle the next day forced a second, unaffected dispute evaluation that succeeded | Third occurrence of UF-14744 defect; not yet its own ticket |
| UF-15610 investigation (2026-07-29), example 3 (NCCS) | space | Remittance `ea2b3b4e-8d32-455a-9ebc-5397508bad29` (org `4150c9a8-cdfd-41ef-ad7d-eb93140b03a0`), ClaimPaymentId `3b64caf8-ef5f-4f8e-a4c9-ff32c9a32181` (UFD1166098A1) | events 10→59 | `RemittanceDisputes` (event 10) — "Zero Pay" + "Dispute Adjustments" both matched but never applied | Permanently missing — never reprocessed | Fourth occurrence of UF-14744 defect; not yet its own ticket |
| [UF-15635](https://sharpfm.atlassian.net/browse/UF-15635) (2026-08-03) | care | Remittance `629b8ac7-e1b8-448c-bcc8-fcbfc5b1070d` (org `6cf94e67-b0b4-47aa-b902-e4832713f86f`), ClaimPaymentId `4045b918-00c9-43c2-b1e1-2ccf9be1bdbb` (UFTUL1465125A1) | events 5→54 | `RemittanceClaimPaymentsArePosted` (event 5) — same event type as UF-14744's dropped event; Ledger posted the charges but Remittance Processing never registered the completion | Not permanently missing this time — a later manual reverse+repost forced re-evaluation and resolved the visible symptom, but the underlying dropped event was never reprocessed on its own | **First occurrence confirmed with a direct Splunk signature** rather than inferred from Cosmos alone; also the first occurrence diagnosed as **Part 2 below (False Credit Balance)** rather than a missing dispute — same root defect, different visible consequence depending on which event gets dropped |

**Suggested fix (per UF-14744):** on batch failure, retry must resume at the batch's `FirstEventNumber`, not the next event — or the checkpoint write must not advance past a failed batch.

**Occurrence-count flag:** this pattern has recurred five times across three tickets/investigations and four environments (uno, cloud, space, care). Worth raising with the user whether this warrants its own dedicated tracking ticket (separate from UF-14744) rather than continuing to log occurrences against a single deferred fix.

**Confirmed Splunk signature for the `RemittanceClaimPaymentsArePosted` variant (UF-15635, 2026-08-03):** when this specific event is the one dropped, the batch-failure Warning is followed by a companion `Catch&Throw; Handling {Event} Message {Message}` line naming the event and a top-level `Error` with the full exception — all three share the same `AzureFunctions_InvocationId` and `MessageId`, and the dropped event's `TransactionId` (from the `Catch&Throw` line's `metadata.TransactionId`) matches the `RemittanceClaimPaymentsArePosted` event's own `Metadata.TransactionId` in the Cosmos remittance-processing stream:
```spl
index="sharp-app-aks-{env}-king" "{StreamId}" "Catch&Throw"
| table _time, Properties.Event, Properties.Message, Properties.metadata.TransactionId
```

## Part 2: Its consequence — False Credit Balance when the dropped event is the posting-completion event

**Symptom:** A remittance/claim payment shows **Posted** with **$0.00 unapplied** on the check, but one or more charges still carry a **Credit Balance** exception in the Remittance Posting Workflow — even though the check amount and per-charge paid amounts fully reconcile against the invoice/transaction log. Looks identical to a real credit-balance data problem, but the underlying Ledger data is actually correct.

**Root cause — this is Part 1 above landing specifically on the `RemittanceClaimPaymentsArePosted` event, not a separate mechanism.** Posting normally runs: `RemittanceClaimPaymentsArePosting` (announces the batch) → remittance processing validates with Ledgers → `RemittanceClaimPaymentPosted` is written (tells Ledgers to post) → Ledgers posts the charges internally and reports back `ChargeRemittancePosted`/`ChargeRemittancePostingFailed` → remittance processing writes `RemittanceClaimPaymentsArePosted` to mark the batch complete. A claim payment's credit-balance evaluation is based on a snapshot of charge balances **captured once, at posting time** — not a live lookup — so getting that capture timed correctly depends on this full sequence actually completing and being consumed.

**Confirmed via Splunk (UF-15635, 2026-08-03):** the event is written to Cosmos successfully (Ledgers really did post the charges), but the event-batch consumer responsible for *processing* that event into remittance-processing's own read model hits the Part 1 ETag-conflict checkpoint skip and never processes it. Remittance processing's own view of the claim payment reverts to (or never reaches) "posted," even though Ledgers already has it posted. On a later retry, remittance processing's validation call to Ledgers gets back "already posted" instead of success, and accepts that **without writing a new `RemittanceClaimPaymentPosted` event** — so the balance-capture step never re-fires. The claim payment is left holding the snapshot from the original attempt, effectively an **after-posting** balance mislabeled as the pre-posting one — off by exactly that charge's payment amount. Confirmed (2026-08-03): the flag has no functional effect beyond the visual exception — it doesn't block processing or propagate elsewhere.

**Signature — check Splunk first, Cosmos second:**

1. **Splunk** — search the remittance-processing StreamId for the Part 1 ETag-conflict signature in the window around the *original* posting. If found, pull the companion `Catch&Throw; Handling {Event} Message {Message}` line — if `Properties.Event = "RemittanceClaimPaymentsArePosted"`, this is Part 2's specific trigger. Then search the *retry* window:
   ```spl
   index="sharp-app-aks-{env}-king" "{RemittanceId}" "already posted"
   ```
   A hit on `Ledgers is reporting the claim payment is already posted` (`SourceContext=Snowdrop.RemittanceProcessing.Runtime.Orchestrators.PostingFlowOrchestrator`) confirms the retry took the "already posted" short-circuit rather than a fresh posting.
2. **Cosmos** (`snowdrop-remittanceprocessing-events` — see this repo's `references/cosmos_query.md`) — corroborate by pulling the remittance-processing stream and comparing posting attempts. A **normal/uninterrupted posting** produces a detailed `RemittanceClaimPaymentPosted` event with the complete `Data.Claim.Charges[]` payload and a `LedgerDate`. The retry attempt instead produces only `RemittanceClaimPaymentsArePosting` → `RemittanceClaimPaymentsArePosted` (no detailed `RemittanceClaimPaymentPosted`). Cross-check the charge's `chargesummary` stream (`sd-ledger-balance-events` — Ledger's own stream, not this repo's) — no new `ChargeSummaryBalancesCalculated` event at the retry's timestamp confirms Ledgers didn't re-process the charge there.
   ```sql
   SELECT c.EventType, c._ts FROM c
   WHERE c.StreamId like "snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}%"
     AND c.EventType IN ("RemittanceClaimPaymentsArePosting","RemittanceClaimPaymentPosted","RemittanceClaimPaymentsArePosted")
   ORDER BY c._ts ASC
   ```

**Confirmed workaround:** a plain repost does **not** clear the exception, because it hits the same "already posted" short-circuit and never re-captures the balance. **Reversing the claim payment and then posting it again does** — reversal un-posts the claim payment on both sides, so the subsequent post is a genuine fresh pass.

**How to confirm for a specific case:**
1. Run the Splunk signature above for the affected remittance/claim-payment across both the original posting window and any retry window.
2. Corroborate in Cosmos: does the claim payment's most recent posting attempt have a full `RemittanceClaimPaymentPosted` event (fresh posting, balance recaptured) or only the thin `ArePosting`/`ArePosted` pair?
3. Cross-check the affected charge(s)' `chargesummary` stream for a missing `ChargeSummaryBalancesCalculated` event at the retry's timestamp.
4. If the exception needs to clear before a fix ships, use reverse-then-repost, not a plain repost, and not a corrective transaction (the Ledger balance is already correct — only the claim payment's captured snapshot is stale).

**Known occurrences:**

| Ticket | Env | Entity | Original posting (interrupted) | Retry ("already posted") | Fix applied | Status |
|---|---|---|---|---|---|---|
| [UF-15635](https://sharpfm.atlassian.net/browse/UF-15635) | care | Remittance `629b8ac7-e1b8-448c-bcc8-fcbfc5b1070d` (org `6cf94e67-b0b4-47aa-b902-e4832713f86f`), ClaimPaymentId `4045b918-00c9-43c2-b1e1-2ccf9be1bdbb` (UFTUL1465125A1) | 2026-07-09T16:13:42Z; ETag checkpoint skip on `RemittanceClaimPaymentsArePosted` confirmed in Splunk at 16:13:54.119Z (batch range events 5→54) | 2026-08-03T17:04:35.720Z, `Ledgers is reporting the claim payment is already posted` | Reverse + repost | Resolved 2026-08-03; also logged as the 5th occurrence of Part 1 above; related to broader false-credit-balance defect with a fix shipping in release 26.8.0.0 |

**Relationship to the 26.8.0.0 false-credit-balance fix:** this pattern was investigated as a candidate instance of the general "false credit balance" defect referenced in UF-15635's Jira description (fix landing in 26.8.0.0). Not yet confirmed whether 26.8.0.0's fix addresses this specific no-op-repost mechanism or a different cause of the same visible symptom — treat as related but not proven identical until the release notes/fix are reviewed against this signature.
