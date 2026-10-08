# Charge Payment Aggregation — how service lines matched to the same charge are combined into one charge payment

## What this covers

After service lines are matched to charges (`../ServiceLineChargeMatching/`), several lines can point at the same `ChargeId`. `ClaimBuilder.AggregateSameChargeId` combines them into a single charge payment per charge. The result is the charge payment shown in `RemittanceInitialized`. `OrderChargePayments` then arranges the charge payments in claim order and adds a placeholder for any claim charge that received no line.

## Key concepts / vocabulary

- **Group** — all charge payments (one per service line) that share a `ChargeId`. Only groups of two or more are aggregated; a single line is left as built.
- **Chosen entry** — the first member of a group that is not `ExcludeFromPosting`, or the first member if all are excluded. Several fields are taken from it.
- **Placeholder** — a charge payment made from the claim charge when no line matched it. Flags `NotOnEob` and `ExcludeFromPosting`, paid 0, control number = the charge's `ServiceLineNumber`.

## How fields combine (groups of two or more)

| Field | Result |
|---|---|
| `ChargeId`, `ActivityId`, ordering provider | from the claim charge |
| `ChargeCode`, `DateOfService`, `BillingUnits` | from the claim charge |
| `BilledAmount` | claim charge `Fee` |
| `ExpectedAmount` | claim charge `Allowed` |
| `PayerId`, `PayerType`, copay assistance ids | from the claim charge |
| `ControlNumber`, `SentCode` | from the chosen entry |
| `SentQuantity` | sum of the members' values (empty values count as 0) |
| `Payments` | all members' payments concatenated, entries with paid 0 and interest 0 dropped; if none remain, a single 0 / 0 entry |
| `AllowedAmount` | members' lists concatenated |
| `EobAllowedAmount` | sum of members' non-empty values, or empty if none |
| `Modifiers`, `RemarkCodes`, `UnknownRemarkCodes` | union, first occurrence order |
| `Adjustments`, `Transfers`, `UnknownAdjudicationCodes` | concatenated, then ordered by reason id (adjustments, transfers) or by group and reason code (unknown); equal keys keep the 835 order |
| `Flags` | OR of members, then reduced to `IsDisputed`, `IsVoided`, `WasFuzzyMatch`, `AmbiguousAdjustmentCode`, `IsDisputedUserSet`; `NotOnEob` is set only if every member has it |

Adjustment amounts are not merged: two CO-45 lines stay as two CO-45 entries on the charge payment. Totals per code must be summed by the reader.

A charge payment's paid amount is the sum of its payments. Interest is distributed afterwards across charges with a non-zero paid amount (`InterestCalculator.DistributeInterest`), the last such charge taking the remainder.

## Known gotchas / non-obvious behavior

### A charge payment's adjustments can exceed the charge's billed amount
Because lines are matched first and combined second, one charge can carry adjustments from lines that belong to another charge in the payer's own bookkeeping. On the example below, the 85025 charge (billed 20.00) carries CO-45 280.80 from a line the payer labeled J1750. Compare adjustments to the 835 lines that were matched to the charge, not to the charge's billed amount.

### Aggregated billed and expected come from the claim, not from the 835
For a group of two or more, `BilledAmount` and `ExpectedAmount` are the claim charge's. For a single unaggregated line they are also the claim charge's when a charge matched, and the line's `Billed` when none did.

### Zero payments disappear on aggregation but not on single lines
A single line with paid 0 keeps its 0 / 0 payment. In a group, zero entries are dropped and a lone 0 / 0 is put back only if everything was zero.

### Claim-level combining is separate
`AggregateSameClaimId` combines claim payments that share a `ClaimId` within one remittance when the claim payment status is Ready. It is not part of the charge-level flow described here and is not exercised by the example below.

## Worked example

Claim payment `833cee15-0c50-417c-8ed4-c2c895db06e2` on remittance `e6c5ac26-ede3-4cf4-bcc2-d38b9561998c` (space). 12 service lines, 4 charge payments.

| Charge | Lines | Control number kept | Paid | Adjustments and transfers on the charge payment |
|---|---|---|---|---|
| 85025 | 3 | SVC125331 | 0.00 | CO-253 0.08, CO-45 280.80, CO-45 16.11 |
| 36415 | 4 | SVC125326 | 0.00 | CO-253 0.17, CO-B13 8.47, CO-45 1.36; transfer PR-3 15.00 |
| 96365 | 4 | SVC125322 | 0.00 | CO-253 1.02, CO-B13 124.20, CO-B13 50.07, CO-45 60.44 |
| J1750 | 1 | SVC137961 | 0.00 | CO-B13 3.81 |

Adjustment order within each row is by reason id, then 835 order. PR-3 is a transfer because the code exists in the TransferReasons catalog and not in ContractualAdjustmentReasons; a code in both catalogs sets `AmbiguousAdjustmentCode` and is dropped from both lists.

## Investigation workflow

1. Run the replay (`../ChargePaymentCreation/references/replay_charge_payments.py`); its second table lists, per charge, the number of lines combined, the paid total and the adjustments.
2. To explain an amount on a charge payment, list the lines the first table assigned to that charge and sum them by code.
3. If the charge payment in `RemittanceInitialized` differs from the replay, check for later changes: `RemittanceClaimPaymentUpdated` and rebuilds can replace the charge payments.

## Where to look for more
- `../ServiceLineChargeMatching/CLAUDE.md` — how lines get their charge.
- `../ChargePaymentCreation/CLAUDE.md` — whole flow and replay script.
- `src/runtime/Mediators/ClaimBuilder.cs` in the `snowdrop-remittance-processing-be` source — `AggregateSameChargeId`, `AggregateCharges`, `OrderChargePayments`.
