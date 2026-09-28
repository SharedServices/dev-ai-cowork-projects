# Rule Behaviors — Issue Analysis Reference

Deep-dive companion to [Rule Technical Descriptions.md](rule-technical-descriptions.md) and [Rules User Descriptions.md](rules-user-descriptions.md). Those documents describe what each rule does; this one exists to answer two specific questions against a real production case:

1. **Why did this rule fire, or not fire, given this specific payment's data?**
2. **Why did this rule produce this specific result?**

Every behavior section below lists its fire conditions as an ordered list of checks (all must pass, in order — the first failing check is why the rule didn't fire), the exact skip/failure conditions and any verbatim validation messages, and the precise event(s)/mutation(s) produced when it does fire. Source file paths are given so findings can be verified against the current code, since behavior can change between releases.

All code lives under `src/rulebehaviors/` in `Snowdrop.RemittanceProcessing.RuleBehaviors`, namespaced `Snowdrop.RemittanceProcessing.RuleBehaviors.[CategoryName].[BehaviorName]`.

---

## Part 1 — Shared Evaluation Framework

Every rule behavior sits on top of the same dispatch and qualification machinery. Understanding this layer first is what lets you localize a "rule didn't fire" question to the right check.

### 1.1 End-to-end evaluation flow

1. A remittance arrives; the batch processor loads the remittance, its claim payments, and their charge payments.
2. **Per charge**, for each of the 6 charge-level predefined sequences (in fixed order — see §1.5): the processor pre-qualifies candidate rules by attribute intersection (a fast filter — company/division/payer/set matching), then for each pre-qualified rule in order:
   a. Loads the rule document.
   b. Checks rule applicability gates (`RuleIsNotApplicable`, episode qualification if the rule has an `EpisodeQualifier`) — fails here skip the rule entirely, before the behavior even runs.
   c. Calls `RuleBehaviorManager<TIN,TOUT>.Execute(rule, reference)`.
3. The manager looks up the one factory matching `(rule.NetType, rule.BehaviorCategory)` via `GetBehavior()` (throws `ApplicationException("Behavior not found {category}")` if none registered — a configuration/deployment bug, not a data issue) and calls that factory's `Execute(rule, reference)`.
4. Inside the factory's `Execute`: deserialize `QualificationConfiguration` and the behavior-specific configuration from the rule's stored JSON, run the qualification gates, then the behavior-specific logic, and return a `RuleBehaviorValidationResult<TIN,TOUT>`.
5. The processor switches on the result's `RuleCompletionAction`:
   - **`Continue`** → move to the next rule in the sequence; this rule simply didn't apply.
   - **`ActionMatched`** → **stop the sequence**, keep the emitted events. This is the single most important mechanic for "why didn't rule B fire": if rule A earlier in the same sequence returned `ActionMatched`, no later rule in that sequence is even evaluated.
   - **`StepFailure`** → log a warning and move to the next rule (config error or missing data on this rule only; does not abort the sequence).
6. Repeat step 2 for every charge, then run the 2 claim-level sequences once per claim.
7. Aggregate all emitted events and publish them.

**Practical implication:** a rule that looks like it should fire but didn't may have been pre-empted by an earlier same-sequence rule matching first (`ActionMatched` short-circuits), or by an earlier rule mutating the charge's in-memory adjustments/transfers so the later rule's qualifiers no longer match (see §1.5 ordering notes and the Adjudication Code Reassignment/Suppression sections in Part 3).

### 1.2 `IRuleBehaviorFactory<TIN, TOUT>`
*(`Contracts/IRuleBehaviorFactory.cs`)*

The contract every behavior implements. `TIN` is `ChargePaymentReference` or `ClaimPaymentReference`; `TOUT` is `RemittanceProcessingEventList`.

| Member | Purpose |
|---|---|
| `BehaviorCategory Category` | Which of the 11 categories this factory implements |
| `NetType NetType` | `ClaimSequences` or `ChargeSequences` — constrains when it can run |
| `Execute(Rule rule, TIN entity)` | The evaluation + action method described above |
| `ValidateBehaviorRequest(JObject)` | Validates behavior config JSON shape when a rule is saved via the API |
| `CreateBehaviorUpdateEvent(...)` | Builds the event published when a rule's config is edited (persists to Cosmos, does not fire the behavior) |
| `GetBehaviorConfiguration` / `GetQualificationConfiguration` | Extract each config sub-object from the rule's stored JSON |

### 1.3 `RuleBehaviorValidationResult<TIN, TOUT>` and `RuleCompletionAction`
*(`Contracts/RuleBehaviorValidationResult.cs`, `src/prequalification/Contracts/RuleCompletionAction.cs`)*

| `RuleCompletionAction` | Value | Meaning | Sequence effect |
|---|---|---|---|
| `Continue` | 0 | Rule did not qualify / conditions not met | Next rule in sequence is tried |
| `StepFailure` | 1 | Unrecoverable error on this rule (bad config JSON, missing required data) | Logged as a warning; next rule is tried — **one broken rule does not block the rest of the sequence** |
| `ActionMatched` | 2 | Rule fired and produced its result | Sequence stops; results are kept |

Helper constructors: `Continue()`, `Complete()` (fired but produced zero events — rare, seen in a few reassignment/suppression paths when qualifiers resolve to an empty set), `StepFailure(entity, message?)`, `Create(action, message?, results)`.

### 1.4 `QualificationConfiguration` — the common gate
*(`Contracts/QualificationConfiguration.cs`)*

Every behavior (except `PostClaimPayment`, which has no qualification layer) checks this before its own logic runs. A failure here always returns `Continue`, never `StepFailure` — so a qualification mismatch is silent by design; it doesn't look like an error anywhere.

| Field | Default | Effect |
|---|---|---|
| `AllPayers` (bool) | `true` | If true, payer position is not checked at all. If false, the payment's `ClaimPayment.PayerPosition` (defaults to `0` if null) must be in `PayerPositions`, or the rule returns `Continue`. |
| `PayerPositions` (`IEnumerable<int>`) | empty | Only consulted when `AllPayers == false`. |
| `InvoiceNumberPrefix` (`string?`) | `null` | If set, gates on whether `ClaimPayment.ClaimNumber` starts with this prefix (case-insensitive, `InvariantCultureIgnoreCase`). No value = no filtering. |
| `ExcludeClaimsWithMatchingPrefix` (bool) | `false` | Flips the meaning of the prefix check: `false` = only process claims that *do* start with the prefix; `true` = only process claims that *do not*. Concretely: skip (`Continue`) when `(isMatch && exclude) || (!isMatch && !exclude)`. |

**Note on `DiscardClaimPayment` specifically:** it has its *own* second, separate prefix/date filter at the behavior-configuration level, layered on top of this qualification-level filter — see §2.1. A qualification-level prefix mismatch returns `Continue` (try the next rule); a behavior-level prefix or date mismatch returns `Complete`/no-fire (stop, this rule is done, but doesn't necessarily open the door to the next rule the way `Continue` does — check the sequence's completion semantics when diagnosing).

### 1.5 The 8 Predefined Sequences and execution order
*(`Contracts/PreDefinedSequences.cs`; full GUID table in [predefined-sequences.md](predefined-sequences.md))*

Sequences are hardcoded, identical across every organization, and always evaluated in this fixed order:

| Order | Sequence | NetType | Behaviors (execution order within sequence) |
|---|---|---|---|
| 1 | Adjudication Code Suppression | ChargeSequences | SuppressAdjudicationCode |
| 2 | Adjudication Code Reassignment | ChargeSequences | ReassignAsAdjustment, ReassignAsTransfer, TransferToGuarantor, AdjustToZero |
| 3 | Denial Intervention | ChargeSequences | DisputeDenial |
| 4 | Transfer Intervention | ChargeSequences | DisputeTransfer |
| 5 | Underpayment Intervention | ChargeSequences | DisputeUnderpayment |
| 6 | Transition Episode | ChargeSequences | TransitionEpisode |
| 7 | Discard Claim Payment | ClaimSequences | DiscardClaimPayment |
| 8 | Post Claim Payment | ClaimSequences | AutomaticallyPostRemittance (PostClaimPayment) |

**Why suppression runs before reassignment:** removing an unwanted reason code before any reassignment rule sees it prevents that code from being reassigned instead of dropped. If a Suppress rule is configured broadly, it can silently starve a Reassign/AdjustToZero/Dispute rule of the data it needed to match — this is one of the most common "rule didn't fire" root causes for charge-level behaviors, and it's invisible unless you check what ran earlier in the *same* charge's sequence pass.

**Charge-level rules mutate in-memory state that later rules in the same pass observe.** ReassignAsAdjustment/ReassignAsTransfer add new adjustment/transfer entries (under the *new* reason code) and remove the matched originals; SuppressAdjudicationCode removes matched entries outright. A later rule in the Reassignment sequence (e.g. AdjustToZero) sees the charge *after* those mutations, not the charge as it arrived on the remittance.

### 1.6 Manual Review / `ReleaseType`
*(`Contracts/ManualReviewBehavior.cs`, `ManualReviewUpdated.cs`)*

`ReleaseType` is a property on the rule itself, independent of `BehaviorCategory` — it is not a 12th behavior. It controls whether the events a rule produces are held for human review before being released, versus auto-released. This governs what happens *after* a behavior fires, not whether it fires — if a rule's results seem to be firing correctly but not taking effect downstream, check `ReleaseType` on the rule before assuming the behavior logic is at fault.

### 1.7 `RuleBehaviorManager` discovery/dispatch and `RuleBehaviorEventHandler`
*(`RuleBehaviorManager.cs`, `RuleBehaviorEventHandler.cs`)*

Factories are discovered once via reflection over the assembly (all non-interface types implementing `IRuleBehaviorFactory<TIN,TOUT>`) and registered as DI singletons — they are stateless; all state comes from the `Rule` document and the input entity passed to `Execute`. `GetBehavior(netType, category)` does a `SingleOrDefault` lookup; exactly one factory must exist per `(NetType, BehaviorCategory)` pair.

Separately, `RuleBehaviorEventHandler.FindAndHandle` routes each behavior's `*Updated` event (emitted when a rule's configuration is edited via the API/UI) to a reflection-matched `Handle(...)` method, which persists the new configuration to the rule document in Cosmos via `ConcurrentUpdateRuleAsync` (optimistic concurrency — an ETag conflict here means two people edited the same rule concurrently, not a data-processing issue). **This event/handler path only persists configuration changes; it never causes a behavior to fire.**

---

## Part 2 — Claim-Level Behaviors (`NetType = ClaimSequences`)

These operate on `ClaimPaymentReference` — the whole claim payment, not an individual charge — and run once per claim, after all charge-level sequences have completed for every charge in that claim.

### 2.1 DiscardClaimPayment (`BehaviorCategory = 6`)
*`DiscardClaimPayment/DiscardClaimPayment/{DiscardClaimPaymentBehavior.cs, Factory.cs, DiscardClaimPaymentUpdated.cs, EventHandler.cs}`*

**Business purpose.** Excludes entire claim batches from processing by invoice-number pattern and/or date-of-service window — e.g. keeping a test-data prefix, a discontinued payer's claims, or an out-of-band-handled invoice series from ever posting.

**Configuration shape**

| Field | Type | Meaning |
|---|---|---|
| `InvoiceNumberPrefix` | `string?` | Behavior-level prefix filter (separate from the qualification-level one in §1.4) |
| `ExcludeClaimsWithMatchingPrefix` | `bool?` | Inverts the behavior-level prefix match |
| `StartDateOfService` | `Date?` | Earliest DOS a charge may have and still be discarded |
| `EndDateOfService` | `Date?` | Latest DOS a charge may have and still be discarded |

**Fire conditions (in order — all must pass):**

1. `ClaimPayment.DiscardedDate == null` (a claim that was previously discarded and then explicitly *undiscarded* is never auto-discarded again).
2. Qualification-level prefix check passes (§1.4) — mismatch here returns `Continue`, i.e. tries the next rule.
3. Behavior config deserializes.
4. Behavior-level prefix check: if `InvoiceNumberPrefix` is set, `ClaimNumber.StartsWith(prefix, InvariantCultureIgnoreCase)` combined with `ExcludeClaimsWithMatchingPrefix` — mismatch here returns `Complete` (stops this rule, does not fire).
5. `ClaimPayment.IsDiscarded == false`.
6. If either date bound is set: every charge on the claim must have a non-null `DateOfService`; if the claim has no charges, or any charge has a null DOS, the rule does not fire.
7. If `StartDateOfService` is set: no charge has `DateOfService < StartDateOfService`.
8. If `EndDateOfService` is set: no charge has `DateOfService > EndDateOfService`.

**Skip / non-qualification reasons (verbatim where applicable):**

| Condition | Result | Message |
|---|---|---|
| `DiscardedDate != null` | no fire | "Never auto-discard a claim payment that has been undiscarded" |
| Behavior or qualification config fails to deserialize | `StepFailure` | "Rule configuration error" |
| Qualification-level prefix mismatch | `Continue` | — |
| Behavior-level prefix mismatch | `Complete`, no fire | — |
| Already discarded | no fire | — |
| Missing DOS data when a date bound is configured | no fire | — |
| Any charge outside the configured DOS window | no fire | — |

**Effect when fired.** Emits `RemittanceClaimPaymentDiscarded { remittanceId, claimPaymentId, postedDate: UtcNow }` and sets `ClaimPayment.IsDiscarded = true` in memory.

**Gotchas for issue analysis:**
- The prefix filter exists at *two* levels (qualification and behavior) with different miss-behavior (`Continue` vs `Complete`) — a claim can pass one and fail the other.
- "Even one charge outside the DOS range blocks the entire claim from being discarded" — this is an `Any()` check across all charges, not an average or majority.
- A charge with `DateOfService == null` is treated as "can't be sure," and blocks the discard entirely if any date bound is configured — not treated as a pass.

### 2.2 AutomaticallyPostRemittance / PostClaimPayment (`BehaviorCategory = 7`)
*`PostClaimPayment/PostClaimPayment/{PostClaimPaymentBehavior.cs, Factory.cs, PostClaimPaymentUpdated.cs, EventHandler.cs}`*

**Business purpose.** Hands-off posting for claim payments that look clean, while still holding anything with an exception for manual review — unless that exception type is explicitly allow-listed.

**Configuration shape**

| Field | Type | Meaning |
|---|---|---|
| `AllowPartial` | `bool` | `false` = strict mode (balance only). `true` = lenient mode (exception-based). |
| `ExcludedExceptions` | `List<PaymentException>` | Exception types that don't block posting when `AllowPartial == true`. |

No qualification configuration exists for this behavior — payer position / invoice prefix filters do not apply.

**Fire conditions (in order):**

1. `ClaimPayment.PostedDate == null` (never re-post a previously reversed claim).
2. `CheckPayment.CanPost() == true` AND `ClaimPayment.CanPost(CheckPayment) == true`.
3. **If `AllowPartial == false`** (strict path): `CheckPayment.IsBalanced == true` AND `CheckPayment.HasBlockingExceptions(true) == false`.
4. **If `AllowPartial == true`** (lenient path): `CheckPayment.HasBlockingExceptions(false) == false` AND `ClaimPayment.HasBlockingExceptions(CheckPayment) == false` AND `ClaimPayment.CanPost(ExcludedExceptions, CheckPayment) == true`.

**Skip / non-qualification reasons:**

| Condition | Result | Message |
|---|---|---|
| `PostedDate != null` | no fire | "Never auto-post a claim payment that has been reversed" |
| Behavior config fails to deserialize | `StepFailure` | "Rule configuration error" |
| `CanPost()` false on check or claim | no fire | — |
| Strict path: check not balanced, or has blocking exceptions | no fire | — |
| Lenient path: check or claim has blocking exceptions, or exception isn't in `ExcludedExceptions` | no fire | — |

**Effect when fired.** Emits one of two events depending on `ClaimPayment.BypassLedgerPosting()`:
- `true` → `RemittanceClaimPaymentsArePosted { bypassLedger: true, isPosted: true, transactionId: new Guid(), postedDate: UtcNow }` — posting completes immediately.
- `false` → `RemittanceClaimPaymentsArePosting { isPosting: true, postedDate: UtcNow }` — posting is initiated (async ledger flow), not completed synchronously.

**Gotchas for issue analysis:**
- **The strict and lenient paths check genuinely different things**, not just a superset/subset of each other. A balanced claim with zero exceptions posts under either mode identically, but a claim with an allow-listed exception can post under `AllowPartial=true` while the exact same claim, unbalanced, would never post under `AllowPartial=false` even if that same exception were the only issue.
- If a claim payment "should have auto-posted but didn't," check `BypassLedgerPosting()` and whether the resulting event was `...ArePosting` (started, async) rather than `...ArePosted` (done) — the claim may be correctly mid-flight rather than stuck.
- No qualification layer means payer-position/invoice-prefix filtering cannot be used to scope this rule; it applies to every claim payment a rule of this category is attached to.

---

## Part 3 — Charge-Level Behaviors (`NetType = ChargeSequences`)

These operate on `ChargePaymentReference` — a single charge within a claim — and are evaluated once per charge, per sequence pass. Ordering within and across sequences (§1.5) matters: later behaviors observe the in-memory state left by earlier ones on the *same charge*.

### 3.1 Sequence: Adjudication Code Suppression

#### SuppressAdjudicationCode (`BehaviorCategory = 8`)
*`AdjudicationCodeSuppression/SuppressAdjudicationCode/{SuppressAdjudicationCodeBehavior.cs, Factory.cs, SuppressAdjudicationCodeUpdated.cs, EventHandler.cs}`*

**Business purpose.** Removes specific adjustment/transfer reason codes from a charge entirely — for noise codes, duplicates, or codes that should only be dropped once a prior payment exists or when the current entry is a reversal of an earlier one.

**Configuration shape**

| Field | Type | Meaning |
|---|---|---|
| `SuppressedReasons` | `IEnumerable<AttributeQualifiers>` | Reason-code sets to suppress; matched against both `Adjustments` and `Transfers` |
| `OnlyWhenPreviousPaymentReceived` | `bool` | Requires a prior payment on this charge (checked via a `ChargeAccountProjection` blob lookup keyed on `ChargeId` + `PolicyId`) |
| `OnlyIfReversalOfPrevious` | `bool` | Only suppress an entry whose amount exactly equals `-BilledAmount` |
| `OnlyOnReconciliationOrReprocessing` | `bool` | Restricts firing to `RequestSource.Reconciling`/`Reevaluating` |

**Fire conditions (in order):**

1. Qualification-level payer-position/prefix check passes (§1.4).
2. If `OnlyOnReconciliationOrReprocessing == true`: `RequestSource` is `Reconciling` or `Reevaluating`.
3. If `OnlyWhenPreviousPaymentReceived == true`: the `ChargeAccountProjection` lookup for `(ChargeId, PolicyId)` succeeds and shows a previous payment — **if either ID is null, this check silently fails and suppression is skipped**.
4. For each candidate matched by `SuppressedReasons` (searched across both Adjustments and Transfers): if `OnlyIfReversalOfPrevious == true`, the entry's amount must exactly equal `-BilledAmount` (exact decimal equality — no tolerance).

**Skip / non-qualification reasons:** config parse failure → `StepFailure`, "Rule configuration error"; payer mismatch or reconciliation gate failure → `Continue`; `OnlyWhenPreviousPaymentReceived` true with no previous payment found → fires with zero events (`ActionMatched`, indistinguishable from "nothing matched"); no candidates matched by `SuppressedReasons` → same, zero-event fire.

**Effect when fired.** One `RemittanceReasonCodeSuppressed { remittanceId, claimPaymentId, chargePaymentId, reasonCodeCategory, reason }` event **per suppressed entry** (can be multiple events from one rule firing), and the matched entries are removed from the in-memory `Adjustments`/`Transfers` lists.

**Gotchas for issue analysis:**
- **This is the rule most likely to explain "why didn't rule X fire" for any later rule in the Reassignment/Dispute sequences** — it runs first (§1.5) and removes data those rules key off of.
- **Exact-equality reversal matching** (`amount == -BilledAmount`) can silently fail to match on floating-point/rounding differences that look identical in a UI.
- **A zero-event `ActionMatched` fire is indistinguishable from "correctly found nothing to suppress"** — there's no separate signal for "the previous-payment check failed" vs "there was genuinely no matching reason code." If diagnosing, check `ChargeAccountProjection` data directly rather than trusting rule output alone.
- The unit test file for this behavior (`Factory.UnitTests.cs`) was found entirely commented out — treat any assumption about its tested behavior with extra caution; verify against current code, not against test coverage.

### 3.2 Sequence: Adjudication Code Reassignment (runs in this order: ReassignAsAdjustment → ReassignAsTransfer → TransferToGuarantor → AdjustToZero)

#### ReassignAsAdjustment (`BehaviorCategory = 1`)
*`AdjudicationCodeReassignment/ReassignAsAdjustment/{ReassignAsAdjustmentBehavior.cs, Factory.cs, ReassignAsAdjustmentUpdated.cs, EventHandler.cs}`*

**Business purpose.** Re-labels one or more incoming reason codes under a single adjustment reason of the organization's own choosing — e.g. rolling several payer-specific codes up to one internal category, while keeping them recorded as adjustments (write-offs), not transfers.

**Configuration shape**

| Field | Type | Meaning |
|---|---|---|
| `Category` | `ReasonCodeCategory` (Adjustment \| Transfer) | Which incoming list to search — `Adjustments` or `Transfers` |
| `ReceivedReasons` | `AttributeQualifiers` | The incoming reason-code GUIDs to match |
| `ReassignReasonId` | `Guid` | The adjustment reason to assign to matched entries |
| `OnlyOnReconciliationOrReprocessing` | `bool` | Restricts to reconciliation/reevaluation |

**Fire conditions (in order):**

1. Qualification-level payer-position check passes.
2. If `OnlyOnReconciliationOrReprocessing == true`: `RequestSource` is `Reconciling` or `Reevaluating`.
3. Query `Adjustments` or `Transfers` (per `Category`) for entries whose `Reason` is in the `ReceivedReasons` set (resolved at execution time via `SetProjectionRepository`).
4. At least one match exists.

**Skip reasons:** config parse failure → `StepFailure`, "Rule configuration error"; payer mismatch or reconciliation gate fail → `Continue`; zero matches → `ActionMatched` with an empty event list (fires but does nothing).

**Effect when fired.** One `RemittanceReasonCodeReassigned { fromCategory: Category, toCategory: Adjustment, reassignmentDetail: [matched codes w/ amount, group code, original reason], reassignReasonId }` event. In memory: matched entries are removed from their source list and new `PaymentAdjustment` entries are added under `ReassignReasonId`.

**Gotchas:**
- **This is one-way and can be non-idempotent in a chain**: a reassigned entry now carries `ReassignReasonId`, not its original reason. If the same rule (or another reassignment rule) is evaluated again on the mutated charge and its qualifier set happens to include `ReassignReasonId`, it will match its own prior output.
- `Category = Transfer` means it looks *only* at `Transfers`, not `Adjustments`, even if matching-looking codes exist in the other list — a common source of "why didn't this reassign" confusion.

#### ReassignAsTransfer (`BehaviorCategory = 2`)
*`AdjudicationCodeReassignment/ReassignAsTransfer/{ReassignAsTransferBehavior.cs, Factory.cs, ReassignAsTransferUpdated.cs, EventHandler.cs}`*

**Business purpose.** Same matching mechanics as ReassignAsAdjustment, but the outcome is recorded as a **transfer** (responsibility moves to another payer/guarantor) rather than an adjustment (write-off). Runs second in the Reassignment sequence, so it observes the charge *after* ReassignAsAdjustment has already run against it.

**Configuration shape:** identical fields to ReassignAsAdjustment (`Category`, `ReceivedReasons`, `ReassignReasonId`, `OnlyOnReconciliationOrReprocessing`).

**Fire conditions:** identical structure to ReassignAsAdjustment — payer qualification, reconciliation gate, match `Adjustments`/`Transfers` per `Category` against `ReceivedReasons`, require at least one match.

**Skip reasons:** identical pattern (config error → `StepFailure`; qualification/gate miss → `Continue`; no matches → empty-event `ActionMatched`).

**Effect when fired.** One `RemittanceReasonCodeReassigned { fromCategory: Category, toCategory: Transfer, reassignmentDetail, reassignReasonId }` event. In memory: if source was `Adjustments`, matched entries are removed from `Adjustments` and added to `Transfers` under `ReassignReasonId`; if source was `Transfers`, matched entries are removed and re-added to `Transfers` with the new reason.

**Gotchas:**
- Because it runs *after* ReassignAsAdjustment in the fixed sequence order, if both rules are configured to match the same incoming reason code, ReassignAsAdjustment wins (it's evaluated first) — unless ReassignAsAdjustment's own qualifiers/reconciliation gate caused it to skip, in which case ReassignAsTransfer sees the original, unmutated entry.
- Same category-asymmetry gotcha as ReassignAsAdjustment: `Category` selects the *source* list only.

#### TransferToGuarantor (`BehaviorCategory = 10`)
*`AdjudicationCodeReassignment/TransferToGuarantor/{TransferToGuarantorBehavior.cs, Factory.cs, TransferToGuarantorUpdated.cs, EventHandler.cs}`*

**Business purpose.** Flags a charge's remaining balance as the patient/guarantor's responsibility — the payer is done with it. Does not touch reason codes; it's a destination-flag action, independent of the reassignment rules that run around it.

**Configuration shape:** only `OnlyOnReconciliationOrReprocessing` (bool).

**Fire conditions (in order):**

1. Qualification-level payer-position check passes.
2. If `OnlyOnReconciliationOrReprocessing == true`: `RequestSource` is `Reconciling` or `Reevaluating`.
3. Not already effectively a no-op — see skip conditions 4–5 below.

**Skip reasons:**

| Condition | Result |
|---|---|
| Config parse failure | `StepFailure`, "Rule configuration error" |
| Payer mismatch | `Continue` |
| Reconciliation gate fails | skip, silent |
| `GuarantorId == null` AND charge is already `TransferToMode.Patient` transferred to `ClaimPayment.PatientId` | skip — no guarantor to transfer to, and already at the patient |
| Charge already `TransferToMode.Guarantor` transferred to the current `GuarantorId` | skip — already done, prevents duplicate events |

**Effect when fired.** One `RemittanceChargePaymentTransferToGuarantor { remittanceId, claimPaymentId, chargePaymentId }` event. No in-memory mutation of Adjustments/Transfers — the destination flag change is applied downstream in event handling.

**Gotchas:**
- If `GuarantorId` is null but the charge is *not yet* transferred anywhere, the rule fires anyway — a null-guarantor edge case that downstream handling must cope with, not something this rule guards against.
- Its own idempotency check only looks at `TransferToMode`/`Account` matching the *current* `GuarantorId` — safe to leave broadly enabled without generating duplicate events on re-evaluation.

#### AdjustToZero (`BehaviorCategory = 11`)
*`AdjudicationCodeReassignment/AdjustToZero/{AdjustToZeroBehavior.cs, Factory.cs, AdjustToZeroUpdated.cs, EventHandler.cs}`*

**Business purpose.** Closes out a charge that will never be paid further by generating a write-off adjustment that brings its balance to zero — e.g. small leftover balances after primary/secondary processing, or denials the organization has decided to write off. Runs last in the Reassignment sequence, so it sees the charge after any suppression/reassignment already applied.

**Configuration shape**

| Field | Type | Meaning |
|---|---|---|
| `AdjustmentReasonId` | `Guid` | Adjustment reason recorded on the zero-out |
| `ReplaceExistingAdjustments` | `bool` | Replace vs. add to existing adjustments |
| `OnlyApplyWhenPaidAmountIsZero` | `bool` | Restrict to charges with `PaidAmount == 0` |
| `OnlyOnReconciliationOrReprocessing` | `bool` | Restricts to reconciliation/reevaluation |

**Fire conditions (in order):**

1. Qualification-level payer-position check passes.
2. If `OnlyApplyWhenPaidAmountIsZero == true`: `PaidAmount == 0`.
3. If `OnlyOnReconciliationOrReprocessing == true`: `RequestSource` is `Reconciling` or `Reevaluating`.
4. Balance test: `PaidAmount + TotalChargeTransfered() + TotalChargeAdjustments() == AccountBalance - OutstandingExpectedAdjustments` defines "balanced."
5. If `ReplaceExistingAdjustments == true`: fires if the charge has existing adjustments **or** is unbalanced.
   If `ReplaceExistingAdjustments == false`: fires only if the charge is unbalanced.

**Skip reasons:** config parse failure (behavior or qualification) → `StepFailure`, "Rule configuration error"; payer mismatch → `Continue`; paid-amount or reconciliation gate fails → `Continue`; balanced charge with `ReplaceExistingAdjustments == false`, or balanced charge with no existing adjustments and `ReplaceExistingAdjustments == true` → no event generated.

**Effect when fired.** One `RemittanceReasonCodeAdjustToZero { remittanceId, claimPaymentId, chargePaymentId, reasonCodeId: AdjustmentReasonId, replace: ReplaceExistingAdjustments }` event.

**Gotchas:**
- **The balance formula depends on `TotalChargeTransfered()` and `TotalChargeAdjustments()`, both of which reflect any mutations already applied by SuppressAdjudicationCode/ReassignAsAdjustment/ReassignAsTransfer earlier in the same pass** — the "is this charge balanced" answer is evaluated on post-mutation state, not the charge as it arrived on the remittance.
- `ReplaceExistingAdjustments` does double duty: it changes *whether* the rule fires on an already-balanced charge (fires if adjustments exist), and it sets the `replace` flag consumed downstream (replace vs. stack adjustments). These are easy to conflate when reading the config alone.
- Running this rule twice on the same charge with `ReplaceExistingAdjustments == true`: after the first run, the balance test may now pass, so a second evaluation produces no event — expected, not a bug.

### 3.3 Sequence: Denial Intervention

#### DisputeDenial (`BehaviorCategory = 3`)
*`DenialIntervention/DisputeDenial/{DisputeDenialBehavior.cs, Factory.cs, DisputeDenialUpdated.cs, EventHandler.cs}`*

**Business purpose.** Flags a charge where the payer paid nothing at all, despite the provider expecting payment, so billing staff can review and decide whether to appeal. No behavior-specific configuration — entirely driven by qualification (payer position, invoice prefix).

**Configuration shape:** none beyond `QualificationConfiguration` (§1.4).

**Fire conditions (in order):**

1. Charge is on the EOB: `!Flags.NotOnEob()`.
2. `PaidAmount == 0`.
3. `ExpectedAmount > 0`.
4. Qualification-level payer-position check passes.
5. **Not** (`AccountBalance == 0` AND `OutstandingExpectedAdjustments > 0`) — i.e. skip if the balance is already zero *and* there are still expected adjustments pending, since the apparent denial may just be an in-flight adjustment, not a real denial yet.

**Skip reasons:** not on EOB, non-zero paid, zero/null expected amount, payer mismatch, or zero-balance-with-pending-adjustments → no fire, `Continue`. No verbatim message returned (silent skip in all cases).

**Effect when fired.** `RemittanceIsDenialDispute { remittanceId, claimPaymentId, chargePaymentId, isDisputed: true, ruleId, ruleName, userGuidance, disputeTypes: Denial }` and the charge is flagged with `ChargePaymentFlags.DenialDispute`.

**Gotchas:**
- The pending-adjustments guard (condition 5) is the one non-obvious safety net here — a charge can look denied ($0 paid, expected > 0) purely because its offsetting adjustment hasn't posted yet. If a denial dispute seems to have fired too early, check `OutstandingExpectedAdjustments` at the time of evaluation.
- No re-fire guard is visible in code — if the rule runs again on an already-`DenialDispute`-flagged charge that still meets conditions 1–5, it fires again and re-emits the event.
- `DisputeUnderpayment` explicitly skips charges already flagged `DenialDispute` (see §3.5) — so once this rule fires, the underpayment rule will not also fire on the same charge, by design.

### 3.4 Sequence: Transfer Intervention

#### DisputeTransfer (`BehaviorCategory = 5`)
*`TransferIntervention/DisputeTransfer/{DisputeTransferBehavior.cs, Factory.cs, DisputeTransferUpdated.cs, EventHandler.cs}`*

**Business purpose.** Flags unusually large transfers for human review before they pass through silently.

**Configuration shape:** `AmountThreshold` (decimal) — minimum cumulative transferred amount that triggers the dispute.

**Fire conditions (in order):**

1. Charge is on the EOB: `!Flags.NotOnEob()`.
2. Qualification-level payer-position check passes.
3. `TotalChargeTransfered() >= AmountThreshold`.

**Skip reasons:** not on EOB, payer mismatch, or total transferred below threshold → no fire, silent `Continue`.

**Effect when fired.** `RemittanceIsTransferDispute { remittanceId, claimPaymentId, chargePaymentId, isDisputed: true, ruleId, ruleName, userGuidance, disputeTypes: Transfer }` and the charge is flagged `ChargePaymentFlags.TransferDispute`.

**Gotchas:**
- `AmountThreshold = 0` fires on any transfer at all — a common misconfiguration to check for if this rule is firing unexpectedly on small transfers.
- Does not inspect the transfer's *destination* (patient, secondary payer, write-off) — any transfer meeting the cumulative threshold triggers it regardless of where the money went.
- `TotalChargeTransfered()` is cumulative across all transfers on the charge, including ones created by ReassignAsTransfer/TransferToGuarantor earlier in the same evaluation pass — a transfer created by an earlier rule can push this rule over its threshold on the same pass.

### 3.5 Sequence: Underpayment Intervention

#### DisputeUnderpayment (`BehaviorCategory = 4`)
*`UnderpaymentIntervention/DisputeUnderpayment/{DisputeUnderpaymentBehavior.cs, Factory.cs, DisputeUnderpaymentUpdated.cs, EventHandler.cs}`*

**Business purpose.** The most configurable dispute rule: flags when the primary payer paid meaningfully less (or, optionally, more) than expected/allowed, using percentage and/or dollar thresholds. Used to catch contractual underpayment errors or unexpected overpayments (e.g. duplicate payments) for review.

**Configuration shape**

| Field | Type | Meaning |
|---|---|---|
| `UnderpaymentPercentThreshold` | decimal | Underpayment % of expected that triggers a dispute |
| `UnderpaymentAmountThreshold` | decimal | Underpayment $ shortfall that triggers a dispute |
| `IsAnded` | bool | If true, both thresholds must be met; if false, either suffices |
| `UseAllowed` | bool | Compare against EOB-allowed amount instead of expected amount |
| `DisputeOverpayment` | bool | Enables the symmetric overpayment check below |
| `OverpaymentPercentThreshold` / `OverpaymentAmountThreshold` / `OverpaymentIsAnded` / `OverpaymentUseAllowed` | — | Mirror the underpayment fields for overpayment detection |

**Fire conditions — pre-qualification (all required):**

1. Charge is on the EOB: `!Flags.NotOnEob()`.
2. **`ClaimPayment.PayerPosition.Position == 1` — primary payer only.** This is hardcoded in the behavior itself; the rule's own `QualificationConfiguration.AllPayers`/`PayerPositions` fields are **not consulted** for this behavior. A rule of this category configured for "all payers" or a non-primary position will still never fire for secondary/tertiary payers.
3. `PaidAmount > 0`.
4. `ExpectedAmount > 0`.
5. `ChargePaymentFlags.DenialDispute` is **not** already set on this charge (denial takes priority; underpayment/overpayment is skipped entirely if the charge was already flagged a denial).

**Underpayment check (evaluated if pre-qualification passes):**

- If `UseAllowed == false`: `shortfall = ExpectedAmount - PaidAmount - TotalChargeTransfered()`; `percent = shortfall / ExpectedAmount * 100`.
- If `UseAllowed == true`: `shortfall = ExpectedAmount - EobAllowedAmount` (note: **the percent denominator is still `ExpectedAmount`, not the allowed amount, even in this branch**).
- Skip if `shortfall <= 0`.
- Threshold test: `IsAnded == true` → both `shortfall >= UnderpaymentAmountThreshold` AND `percent >= UnderpaymentPercentThreshold` must hold; `IsAnded == false` → either is sufficient.

**Overpayment check (only evaluated if `DisputeOverpayment == true`):** mirrors the underpayment math with signs flipped (`amounthigh = -(ExpectedAmount - PaidAmount - TotalChargeTransfered())`, or the allowed-amount variant), and its own `OverpaymentIsAnded`/threshold fields.

**Skip reasons:** not primary payer, not on EOB, zero/negative paid or expected amount, already denial-disputed, shortfall/overage ≤ 0, or thresholds not met → no fire, silent `Continue`.

**Effect when fired.** Both the underpayment and overpayment checks emit the **same event type**, `RemittanceIsUnderpaymentDispute`, with `disputeTypes: Underpayment` in both cases — there is no distinct overpayment event type. Up to two events can be produced in one firing (one per check that passed). The charge is flagged with the single `ChargePaymentFlags.UnderpaymentDispute` flag for either case.

**Gotchas — this is the highest-risk behavior for misdiagnosis:**
- **Primary-payer-only is hardcoded and silently overrides the rule's own qualification config.** If someone configures this rule with `PayerPositions: [2]` expecting it to run on secondary payers, it never will — this looks like a qualification bug but is actually intended behavior baked into the factory itself.
- **Underpayment and overpayment disputes are indistinguishable at the flag level** (`ChargePaymentFlags.UnderpaymentDispute` covers both) — you must inspect the emitted event, not the flag, to tell which case fired.
- **The percent-threshold denominator is always `ExpectedAmount`, even when `UseAllowed == true`** — a charge with `Expected=$100, Allowed=$60, Paid=$50` computes underpayment as `$10 / $100 = 10%`, not `$10/$60`. This asymmetry is easy to miss when explaining a dispute's percentage to someone expecting it relative to the allowed amount.
- Transfers reduce the apparent underpayment (`TotalChargeTransfered()` is subtracted from the shortfall) — a charge that looks underpaid by $50 but has $40 already transferred elsewhere is only $10 underpaid for this rule's purposes.
- A charge already flagged `DenialDispute` by the earlier-running Denial Intervention sequence will never also get an underpayment/overpayment dispute, by design — if you expected both, check whether DisputeDenial fired first.

### 3.6 Sequence: Transition Episode

#### TransitionEpisode (`BehaviorCategory = 9`)
*`TransitionEpisode/TransitionEpisode/{TransitionEpisodeBehavior.cs, Factory.cs, TransitionEpisodeUpdated.cs, EventHandler.cs}`*

**Business purpose.** An "Episode" is a phase of patient care tracked by a separate downstream Episodes service (e.g. bundled-payment/care-episode workflows). This rule signals that a specific charge marks the point where the patient's episode should advance into a new configured phase, keeping the Episodes service in sync with remittance activity without manual intervention.

**Configuration shape**

| Field | Type | Meaning |
|---|---|---|
| `EpisodeTypeId` | `Guid` | Which episode type to act on |
| `PhaseId` | `Guid` | The target phase to transition into |

**Fire conditions (in order):**

1. Behavior config deserializes.
2. Qualification config deserializes.
3. Qualification-level payer-position check passes: `AllPayers == true` OR `PayerPositions.Contains(PayerPosition ?? 0)`.

There is no validation of `EpisodeTypeId`/`PhaseId` at fire time — invalid GUIDs pass straight through and only surface as an error downstream, in the Episodes service call.

**Skip reasons:** config parse failure (behavior or qualification) → `StepFailure`, "Rule configuration error"; payer mismatch → silent `Continue`. Note: `InvoiceNumberPrefix`/`ExcludeClaimsWithMatchingPrefix` are present in the shared `QualificationConfiguration` but are **not evaluated** by this behavior's `Execute` method — configuring them on a TransitionEpisode rule has no effect.

**Effect when fired.** One `RemittanceTransitionEpisodes` event carrying a list of `EpisodeTransition { claimPaymentId, episodeTypeId, phaseId }` entries (multiple charges qualifying in the same evaluation can each contribute an entry to a single event). Downstream: the projector applies the transition to the remittance projection, then a separate handler calls the Episodes service's `ProcessRemittancePhaseChangeAsync` API with remittance ID, claim payment ID, patient ID, episode ID, phase ID, and current date — logging a warning (not an error that blocks remittance processing) if the Episodes service rejects it.

**Gotchas:**
- **No idempotency check at the rule level** — the rule does not verify the episode isn't already in the target phase, or that it hasn't already been transitioned; redundant/invalid transitions are passed straight to the Episodes service, which may reject them (logged as a warning only).
- **Invoice-prefix qualifiers are silently inert for this behavior** — if a TransitionEpisode rule isn't firing/not-firing as expected and prefix filters are configured, they are not the cause; only payer position is actually checked.
- Evaluated per charge (`ChargeSequences`), so a claim with multiple qualifying charges produces multiple `EpisodeTransition` entries against the same `claimPaymentId` in one event — expected, not a duplicate-event bug.
- Downstream failure (Episodes service rejecting the call) does not roll back or flag the remittance-side event — the `RemittanceTransitionEpisodes` event and its in-Cosmos effects stand even if the Episodes service call later fails; check Episodes-service logs separately if a transition appears recorded here but didn't take effect there.
