# Auto-post ArePosting append lost — one claim payment never starts posting and the check stays in Posting

## What happens
Claim payments are posted one at a time as a user reviews them: each review queues a single-claim evaluation request (`Claims = 1`), which is intentional so interactive posting is quick. Normally each request runs when queued, so the posts are spread out. If processing of the queued requests is delayed, they are released together and each is evaluated in its own activity (`EvaluateClaimPaymentActivity`), all running at nearly the same moment. The delay is suspected to be an Azure Functions cold start or host stall; this is not confirmed. Each activity calls `PostingFlowOrchestrator.InitiatePosting`, which first commits an `Initialized` row to the claim payment action table and then appends `RemittanceClaimPaymentsArePosting` to the remittance event stream through `ConcurrentPublishFromLastTypeAsync`. That event is what moves the row from `Initialized` to `Working` and queues the posting request.

Suspected mechanism (from code reading; no log confirms it): the append writes with `ExpectedVersion.Exact(n)` and, on a version conflict, retries immediately with no backoff or jitter, up to `retryLimit = 5`. With several concurrent writers on one stream, one writer can lose all of its attempts. At the limit the method returns `ConcurrentWriteResult.RetryLimitReached()` without throwing or logging, and `PublishMissingArePostingEvents` discards the result. The claim payment is left with an `Initialized` row and no event. Nothing retries it (the republish in `HandleLateInitialized` is commented out with a `// TODO`). About four hours later the expiration timer removes the row. The other claim payments post normally, so the check stays in Posting with one claim payment unposted.

## Detection signature
All of the following hold for the one claim payment:
- Cosmos (Remittance and Claim Payment streams): the claim payment was reviewed and is eligible (linked claim and charge, not disputed, not excluded from posting), but no `RemittanceClaimPaymentsArePosting` event lists it. It has no posted, discarded, removed or `RemittanceClaimPaymentsHaveFailedPosting` event. The sibling claim payments each have an ArePosting event written within a few hundred milliseconds of each other.
- Splunk: its `ClaimPaymentEvaluationOrchestrator` run logs the same message sequence as the siblings, including "Trigger AutoPosting for remittance" and `PostingFlowOrchestrator` state added (`Initialized`). The siblings then change state `Initialized` -> `Working` seconds later; this one never does. No Warning or Error names it, and no line for its TransactionId appears until the expiration timer.
- About 4h21m after the auto-post, `Snowdrop.RemittanceProcessing.Functions.Timers` logs an Error "The claim payment action expired and is being removed [PriorState=Initialized]" for that TransactionId, followed by state `Deleted`.
- Check status: `Posting` with the other claim payments posted. System-user `RemittanceStatusChanged` Posting events around the timer time carry no claim payment activity.
- Request timing (Splunk, `RemittanceValidationMediator`): a series of `Queuing request for remittance {RemittanceId} with {Claims} claims, from plan execution` lines, each with `Claims = 1`, seconds apart as the user reviews, and no `Begin EvaluateClaimPaymentActivity` line for the remittance until all the claim payments' orchestrators start within about 100 ms of each other. The quiet gap before that burst is the delay. Check Application Insights / Function host logs around the burst for a host start or scale-out.
- Orchestration `isevaluating` returns false and `state` returns 404 at remittance and claim payment level (no evaluation in progress).

To tell it apart from the event-batch checkpoint skip: there the event reaches Cosmos and the downstream handler drops it, with a `Catch&Throw` line and an Error. Here the event never reaches Cosmos.

## Consequence variants
- Check stays in `Posting` with one or more claim payments unposted. A check with any posted claim payment cannot be archived and recreated.
- Month-end close can be blocked until the claim payment is posted manually.

## Confirmed occurrences
- UF-17116 (uno): remittance `bdf587cb-5427-47cf-8eec-69003b781628`, claim payment `ea244b68-a748-48df-9467-b106ff05309d`, 1 of 7 claim payments. Mechanism is the suspected one above; not confirmed from logs.

## Fix status
Not fixed. Tracked in UF-17129. Candidate fixes: check the `ConcurrentWriteResult` in `PublishMissingArePostingEvents` and throw or remove the `Initialized` row on `RetryLimitReached`; add backoff with jitter and raise `retryLimit`, or write one ArePosting event per remittance batch; restore the republish in `HandleLateInitialized`. Aggregating the queued single-claim requests into one evaluation request at the throttle dequeue step would remove the concurrent appends in this scenario but not any other concurrent evaluation of one remittance, so the append fix is still needed. Analysis: UF-17129 `code-analysis/`. Still to do: confirm the mechanism, identify what delayed the queue (cold start or otherwise) and check other remittances for an `Initialized` row with no matching ArePosting event.
