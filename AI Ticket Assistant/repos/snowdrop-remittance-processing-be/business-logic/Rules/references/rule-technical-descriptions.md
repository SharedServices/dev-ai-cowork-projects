# Rule Descriptions

A catalog of the rule behaviors implemented in `Snowdrop.RemittanceProcessing.RuleBehaviors`. Each rule is composed of three things:

**Working a real ticket?** This file describes *what* each behavior does and its config shape. For *why a specific rule fired or didn't fire on a specific payment* — ordered fire-condition checklists, verbatim skip reasons, and known issue-analysis gotchas per behavior — go to [rule-behaviors-issue-analysis.md](rule-behaviors-issue-analysis.md) instead.

1. A **NetType** — the entity grain the rule operates on (`ClaimSequences` evaluates whole claim payments, `ChargeSequences` evaluates individual charges).
2. A **BehaviorCategory** — what action the rule performs (defined in `Contracts/BehaviorCategory.cs`).
3. A **Behavior configuration** — category-specific parameters that tailor the action (defined in each behavior's `*Updated` event).

Each behavior implements `IRuleBehaviorFactory<TIN, TOUT>` (`Contracts/IRuleBehaviorFactory.cs`), where:
- `TIN` is either `ChargePaymentReference` (charge-level) or `ClaimPaymentReference` (claim-level).
- `TOUT` is `RemittanceProcessingEventList` — the set of domain events produced by running the behavior.

Behaviors are grouped into eight **Pre-Defined Sequences** (`Contracts/PreDefinedSequences.cs`) that order behaviors within a NetType.

## Behavior Categories (numeric IDs)

| ID | Category | NetType | Sequence Group |
|----|----------|---------|----------------|
| 1 | ReassignAsAdjustment | ChargeSequences | Adjudication Code Reassignment |
| 2 | ReassignAsTransfer | ChargeSequences | Adjudication Code Reassignment |
| 3 | DisputeDenial | ChargeSequences | Denial Intervention |
| 4 | DisputeUnderpayment | ChargeSequences | Underpayment Intervention |
| 5 | DisputeTransfer | ChargeSequences | Transfer Intervention |
| 6 | DiscardClaimPayment | ClaimSequences | Discard Claim Payment |
| 7 | AutomaticallyPostRemittance | ClaimSequences | Post Claim Payment |
| 8 | SuppressAdjudicationCode | ChargeSequences | Adjudication Code Suppression |
| 9 | TransitionEpisode | ChargeSequences | Transition Episode |
| 10 | TransferToGuarantor | ChargeSequences | Adjudication Code Reassignment |
| 11 | AdjustToZero | ChargeSequences | Adjudication Code Reassignment |

## Pre-Defined Sequences

A sequence bundles related behaviors and is identified by a fixed GUID (`PreDefinedSequences.cs`). Within a sequence the behaviors execute in their listed order.

| Sequence | NetType | Contains Behaviors |
|----------|---------|--------------------|
| Adjudication Code Suppression | ChargeSequences | SuppressAdjudicationCode |
| Adjudication Code Reassignment | ChargeSequences | ReassignAsAdjustment, ReassignAsTransfer, TransferToGuarantor, AdjustToZero |
| Denial Intervention | ChargeSequences | DisputeDenial |
| Underpayment Intervention | ChargeSequences | DisputeUnderpayment |
| Transfer Intervention | ChargeSequences | DisputeTransfer |
| Transition Episode | ChargeSequences | TransitionEpisode |
| Discard Claim Payment | ClaimSequences | DiscardClaimPayment |
| Post Claim Payment | ClaimSequences | AutomaticallyPostRemittance |

## How a Behavior Runs

`RuleBehaviorManager<TIN, TOUT>.Execute(rule, entity)` (`RuleBehaviorManager.cs:71`) resolves the matching factory by `(NetType, BehaviorCategory)` and invokes its `Execute` method. The factory:
1. Reads the rule's behavior configuration and qualifiers.
2. Checks qualification predicates (payer position, invoice-prefix, date-of-service, etc.).
3. If the entity qualifies, produces one or more events in a `RemittanceProcessingEventList`.
4. Optionally mutates the in-memory entity (e.g., removing reason codes, adding transfers).

Configuration shared by most behaviors is `QualificationConfiguration` (`Contracts/QualificationConfiguration.cs`):
- `AllPayers` — apply to every payer position.
- `PayerPositions` — restrict to specific positions (1=primary, 2=secondary, …).
- `InvoiceNumberPrefix` + `ExcludeClaimsWithMatchingPrefix` — include/exclude claims whose invoice number begins with the prefix.

Many behaviors also expose `OnlyOnReconciliationOrReprocessing`, which restricts execution to reconciliation/reprocessing flows rather than first-time receipt.

---

## Charge-Level Behaviors (`NetType = ChargeSequences`)

Charge-level behaviors take a `ChargePaymentReference` and emit events scoped to a single charge.

### ReassignAsAdjustment — `BehaviorCategory = 1`

**Purpose.** Reassigns matched adjustment or transfer reason codes on a charge to a new **adjustment** reason. Filters source codes by category and qualifiers, emits a `RemittanceReasonCodeReassigned` event, and updates the in-memory charge by adding the new adjustment and removing the matched original codes.

**Configuration (`ReassignAsAdjustmentUpdated`)**
- `Category` — which kind of code is being matched.
- `ReceivedReasons` — the reason-code patterns to match against.
- `ReassignReasonId` — the adjustment reason to apply.
- `OnlyOnReconciliationOrReprocessing`.

**Source:** `AdjudicationCodeReassignment/ReassignAsAdjustment/`

### ReassignAsTransfer — `BehaviorCategory = 2`

**Purpose.** Like ReassignAsAdjustment, but reassigns the matched codes to a new **transfer** reason. Emits `RemittanceReasonCodeReassigned`, adds a transfer to the in-memory charge, and removes the matched originals.

**Configuration (`ReassignAsTransferUpdated`)**
- `Category`, `ReceivedReasons`, `ReassignReasonId`, `OnlyOnReconciliationOrReprocessing`.

**Source:** `AdjudicationCodeReassignment/ReassignAsTransfer/`

### TransferToGuarantor — `BehaviorCategory = 10`

**Purpose.** Marks a charge for transfer to the guarantor. Emits `RemittanceChargePaymentTransferToGuarantor` unless the charge already has a transfer-to destination matching the guarantor or patient account.

**Configuration (`TransferToGuarantorUpdated`)**
- `OnlyOnReconciliationOrReprocessing`.

**Source:** `AdjudicationCodeReassignment/TransferToGuarantor/`

### AdjustToZero — `BehaviorCategory = 11`

**Purpose.** Adjusts a charge to a zero balance. The behavior fires when paid amount + transfers + adjustments doesn't equal account balance minus outstanding expected adjustments, and emits `RemittanceReasonCodeAdjustToZero` carrying the configured adjustment reason.

**Configuration (`AdjustToZeroUpdated`)**
- `AdjustmentReasonId` — adjustment reason to apply when zeroing out.
- `ReplaceExistingAdjustments` — replace any current adjustments on the charge.
- `OnlyApplyWhenPaidAmountIsZero` — restrict to fully unpaid charges.
- `OnlyOnReconciliationOrReprocessing`.

**Source:** `AdjudicationCodeReassignment/AdjustToZero/`

### SuppressAdjudicationCode — `BehaviorCategory = 8`

**Purpose.** Removes specified adjustment and transfer reason codes from a charge. After qualifier filtering and optional payment-history/reversal checks, emits a `RemittanceReasonCodeSuppressed` event for each removed code and prunes the in-memory charge.

**Configuration (`SuppressAdjudicationCodeUpdated`)**
- `SuppressedReasons` — codes to suppress.
- `OnlyWhenPreviousPaymentReceived` — only suppress when a prior payment exists.
- `OnlyIfReversalOfPrevious` — only suppress when the current entry reverses a prior one.
- `OnlyOnReconciliationOrReprocessing`.

**Source:** `AdjudicationCodeSuppression/SuppressAdjudicationCode/`

### DisputeDenial — `BehaviorCategory = 3`

**Purpose.** Flags a zero-paid charge as a denial dispute when it appears on an EOB, has zero paid and non-zero expected, passes the payer-position predicate, and has no account balance offset by outstanding adjustments.

**Configuration (`DisputeDenialUpdated`)**
- No behavior-specific fields — driven entirely by `QualificationConfiguration`.

**Source:** `DenialIntervention/DisputeDenial/`

### DisputeUnderpayment — `BehaviorCategory = 4`

**Purpose.** Disputes underpayments (and optionally overpayments) on the primary-payer position by comparing paid or allowed amount against expected amount. Supports percentage thresholds, fixed-amount thresholds, and AND/OR combination.

**Configuration (`DisputeUnderpaymentUpdated`)**
- `UnderpaymentPercentThreshold`, `UnderpaymentAmountThreshold`, `IsAnded`, `UseAllowed` — underpayment trigger conditions.
- `DisputeOverpayment`, `OverpaymentPercentThreshold`, `OverpaymentAmountThreshold`, `OverpaymentIsAnded`, `OverpaymentUseAllowed` — symmetric overpayment trigger conditions.

**Source:** `UnderpaymentIntervention/DisputeUnderpayment/`

### DisputeTransfer — `BehaviorCategory = 5`

**Purpose.** Flags a charge as a transfer dispute when the total amount transferred meets or exceeds a configured threshold.

**Configuration (`DisputeTransferUpdated`)**
- `AmountThreshold` (decimal) — minimum transfer amount that triggers a dispute.

**Source:** `TransferIntervention/DisputeTransfer/`

### TransitionEpisode — `BehaviorCategory = 9`

**Purpose.** Transitions a claim payment to a specified episode type and phase by emitting `RemittanceTransitionEpisodes`.

**Configuration (`TransitionEpisodeUpdated`)**
- `EpisodeTypeId` (Guid) — target episode type.
- `PhaseId` (Guid) — target phase within the episode.

**Source:** `TransitionEpisode/TransitionEpisode/`

---

## Claim-Level Behaviors (`NetType = ClaimSequences`)

Claim-level behaviors take a `ClaimPaymentReference` and operate on the claim payment as a whole.

### DiscardClaimPayment — `BehaviorCategory = 6`

**Purpose.** Automatically discards a claim payment based on optional invoice-prefix matching and a date-of-service range. Skips claim payments that are already discarded and honors the qualification's invoice-prefix include/exclude rule.

**Configuration (`DiscardClaimPaymentUpdated`)**
- `InvoiceNumberPrefix` (string?) — prefix to match against the claim's invoice number.
- `ExcludeClaimsWithMatchingPrefix` (bool?) — invert the prefix match.
- `StartDateOfService` (Date?), `EndDateOfService` (Date?) — bound the DOS window.

**Source:** `DiscardClaimPayment/DiscardClaimPayment/`

### AutomaticallyPostRemittance — `BehaviorCategory = 7`

**Purpose.** Automatically posts a claim payment when balance and exception checks pass. Supports partial-post mode that tolerates exceptions named in `ExcludedExceptions`. Can bypass ledger posting when the claim payment is flagged for it.

**Configuration (`PostClaimPaymentUpdated`)**
- `AllowPartial` (bool) — permit posting when exceptions present, provided they're all in `ExcludedExceptions`.
- `ExcludedExceptions` (List<PaymentException>) — exceptions that don't block posting under `AllowPartial`.

**Source:** `PostClaimPayment/PostClaimPayment/`

---

## Manual-Review and Release Behavior

Beyond the action-producing factories, `Contracts/ManualReviewBehavior.cs` carries a `ReleaseType` that controls how downstream consumers release the resulting events for manual review. The `ReleaseType` is stored on the rule itself and is independent of behavior category.

## Discovery and Registration

`RuleBehaviorManager` (`RuleBehaviorManager.cs:19`) reflects over the executing assembly at startup and discovers every concrete type implementing `IRuleBehaviorFactory<TIN, TOUT>`. The static `Register(IServiceCollection)` registers each factory as a singleton, along with a shared `RuleBehaviorEventHandler`. New behaviors are picked up automatically by adding a Factory class that implements the interface.

Events emitted by `Execute(rule, entity)` are dispatched by `RuleBehaviorEventHandler.FindAndHandle()`, which uses reflection to invoke a matching `Handle(EventStreamIdentifier, Metadata, eventType)` method per runtime event type — no explicit dispatch table is maintained.
