# AdjustToZero not applied to in-memory image before auto-post — claim payment with a balance cleared only by AdjustToZero is not auto-posted

## What happens
On a Reconciling or Reevaluating request, each claim is evaluated in two steps. Charge-level sequences run first and add events to an accumulator. Then the claim-level auto-post sequence ("Post Claim Payment", rule "Auto Post All Payments") runs against the claim payment's in-memory image. The behaviors SuppressAdjudicationCode, ReassignAsAdjustment, ReassignAsTransfer, DisputeDenial, DisputeTransfer, DisputeUnderpayment and DiscardClaimPayment call `reference.Update(...)`, which rolls the charge change up to the claim image (`ChargePaymentReference.Update` -> `ClaimPayment.WithAddedCharge`). AdjustToZero only emits `RemittanceReasonCodeAdjustToZero` and never updates the image. Its effect reaches the claim only when the projector applies the event after the evaluation.

When AdjustToZero is the only thing that clears a claim's remaining balance, auto-post still sees the balance. The auto-post rule excludes the exception "Balance Remaining" (UndisputedBalanceRemaining) among its `ExcludedExceptions`, so `ClaimPayment.CanPost` is false and the claim is not posted. No later evaluation with auto-post runs unless one is requested, so the claim stays unposted until it is posted manually or re-evaluated.

The Splunk message "Rule action matched, adding events and skipping remaining rules" is misleading here. In the charge-payment rule loop an action match runs `continue`, so every qualifying rule in the sequence still runs, and auto-post is a separate claim-level sequence. The message is not the cause.

## Detection signature
All of the following hold for the claim payment:
- Remittance stream (Cosmos): a `RemittanceReasonCodeAdjustToZero` event for the claim's charge payment in the evaluation, and no `RemittanceClaimPaymentsArePosting` event listing the claim payment from that evaluation. The claim is later posted manually or by a later evaluation.
- Splunk (`snowdrop-remittanceprocessing`, `EvaluateClaimPaymentActivity`): "Rule action matched, adding events and skipping remaining rules" for the AdjustToZero rule on that claim payment, with no "Trigger AutoPosting for remittance" line carrying its `Properties.ClaimPaymentId`. Confirmed on one occurrence (UF-17571): that message carries `Properties.ClaimPaymentId`, one line per claim payment auto-posted (97 lines for 97 claim payments in the evaluation), so a claim payment with "Evaluating ClaimPayment" and "Rule action matched" lines but no "Trigger AutoPosting" line was not sent to auto-post. Search `Properties.RemittanceId="{id}"` over the evaluation window and filter on the claim payment id.
- Rule configuration: an AdjustToZero rule whose adjustments are the only way the claim's charges balance (for example a suppression that left the charge unbalanced, then AdjustToZero clearing it). The auto-post rule's `ExcludedExceptions` include 7.
- The request source was Reconciling or Reevaluating. `Updated` requests do not evaluate auto-post.

To tell it apart from other no-auto-post causes: the claim has no exception of its own after the AdjustToZero event, so a re-evaluation with auto-post posts it. The Cosmos event timeline also shows no failed or lost posting (compare `auto-post-arePosting-append-lost-leaves-claim-payment-initialized`).

## Consequence variants
- Individual claim payments on a check stay unposted after reconciliation or re-evaluation, with no exception shown that explains it once the balance has cleared. They are posted by hand later.
- A rule created or changed after a remittance arrives only takes effect on a re-evaluation. If that re-evaluation is the first run of the new AdjustToZero rule, those claims need a second evaluation to auto-post.

## Confirmed occurrences
- UF-17571 (blue): remittance `c71e2f7c-62f8-44f6-b805-d48b2e9dae1f`, org `304eea33-2015-4af9-af91-200389b89198`, claim payment `176aa9cf-e7fc-4e30-972c-941d903a7c6d` (claim UFSURP1131202B1), AdjustToZero rule `72ab5696-8267-416e-8bbb-cac12598a1d0`, auto-post rule `fd4f9369-6795-42dd-b345-0e86806bb144`. Evaluated 2026-10-06T19:07; posted manually 2026-10-21. The claim's balance was inferred from the AdjustToZero rule firing, not observed.

## Fix status
Not fixed. Tracked in UF-17579 (make AdjustToZero update the in-memory charge/claim image). No existing branch contains it. Related items in UF-17579: the misleading log text, and the wrong `ExcludedExceptions` wording in `Documentation\Rule Behaviors - Issue Analysis Reference.md` section 2.2. Until fixed, the workaround is to request a re-evaluation with auto-post after the rule changes have been applied. Not yet checked: whether other claim payments on this check were affected.
