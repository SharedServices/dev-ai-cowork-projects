# Service Line Charge Matching — how each payer service line in a remittance is assigned to a charge on the claim

## What this covers

A payer's remittance (the 835, as `RemittanceCreatedEvent.RemittanceMessage`) reports payment per service line. A service line does not carry a `ChargeId`. Remittance processing assigns each service line to one charge on the claim it answers, using the claim's charges. This module describes that assignment (`ClaimBuilder.FindChargeOnClaim`, called from `BuildChargePayment(Service)`). Lines that land on the same charge are then combined; see `../ChargePaymentAggregation/`.

## Key concepts / vocabulary

- **Service line** — one entry in `Claims[].Services[]` of the remittance message: `Procedure`, `SentProcedure`, `Qty`, `SentQuantity`, `Modifier1-4`, `ServiceDate`, `Billed`, `ProviderPaid`, `Adjustments[]`, `References[]`.
- **Claim charge** — one entry in the claim's charge list (`ClaimCharge`): `ChargeId`, `ServiceLineNumber`, `ChargeCode`, `BillingUnits`, `Modifiers`, `DateOfService`, `Fee`, `Allowed`. Read it from `GET /snowdrop/remittanceprocessing/claims?claimId={claimId}` (`GetClaimByIdAsync`, returns `ClaimDetails`; the same fields are in `charges[]`).
- **Control number** — the service line's reference with qualifier `6R` (for example `SVC137961`). A charge's `ServiceLineNumber` is the value we sent to the payer for that line, so the payer echoing it back identifies the line exactly.
- **`SentProcedure` / `SentQuantity`** — what the payer says we sent. Payers fill `Procedure` with the code they adjudicated, which can differ from what was sent.
- **`IgnorePayerControlNumber`** — payer-literal setting. When true for the remittance's `PayerLiteral`, step 1 below is skipped. Read it with `POST /snowdrop/remittanceprocessing/payerliterals` and body `{"payerLiteral":"{PayerLiteral}"}` (`GetPayerLiteralSetting`); the response is false both when the setting is false and when none exists.

## The matching sequence

Steps run in order for each service line. The first step that yields exactly one charge decides.

| Step | Rule | Flag set |
|---|---|---|
| 1 | Service line control number equals a charge's `ServiceLineNumber` (first charge in claim order if several). Skipped when `IgnorePayerControlNumber` is true or the line has no `6R` reference. | none |
| 2a | Charges whose `ChargeCode` equals `SentProcedure`, or `Procedure` when `SentProcedure` is empty (case-insensitive). Exactly one: match. | none |
| 2b | Several share the code: keep those whose `BillingUnits` equals `SentQuantity` (or `Qty` when empty). Exactly one: match. | none |
| 2c | Still several: keep those whose modifier set equals the line's modifiers (resolved through the Modifiers catalog). Exactly one: match. | none |
| 2d | Still several: keep those whose `DateOfService` equals the line's `ServiceDate`. Exactly one: match. | none |
| 3 | Fuzzy: charges whose `Fee` equals the line's `Billed`. Exactly one: match. | `WasFuzzyMatch` |
| none | No match: the line becomes a charge payment with no `ChargeId`, placed after the claim's charges. | none |

Step 2 only runs the narrowing sub-steps when more than one charge shares the code. If code matches several charges and no sub-step narrows to one, the line falls to step 3.

## Known gotchas / non-obvious behavior

### The 835's Procedure column does not decide the charge
Control number outranks code. A line labeled `Procedure` J1750 with a control number belonging to another charge is assigned to that other charge. Looking at the 835 by procedure code will give a different picture than the one posted. When the payer has mislabeled lines, the amounts follow the control number onto the wrong charge; see `../PayerServiceLineMislabeling/CLAUDE.md`.

### SentProcedure outranks Procedure in the code step
Step 2 compares the charge code to `SentProcedure` first. A line whose `Procedure` is J1750 but whose `SentProcedure` is 85025 is an 85025 line for step 2.

### Lines without a control number match by code and can merge into a charge that also has a control-number line
Payers often send extra lines (small adjustment lines) with no `6R` reference. They match by code and land on the same charge as the lines matched by control number. That is why one charge can carry several lines.

### Billed-amount fuzzy match is a last resort and is flagged
A `WasFuzzyMatch` charge payment was matched only because exactly one charge had the same fee as the line's `Billed`. Treat it as less certain than the other steps.

### A voided charge still matches
A charge with `chargeStatus` 100 is matched like any other and the charge payment gets `IsVoided`.

### Rebuilding an existing charge payment matches differently
When a claim payment is rebuilt (`RebuildClaimPayment`, for example after a user changes the claim), existing charge payments are re-matched with `FindChargeOnClaim(ChargePayment)`: current `ChargeId` first, then control number, then `SentCode ?? ChargeCode`, then the same quantity, modifier, date of service and fuzzy narrowing. A line can therefore end on a different charge after a rebuild than at intake.

## Worked example

Remittance `e6c5ac26-ede3-4cf4-bcc2-d38b9561998c` (space), claim `e73556f2-3f1e-413d-b1d6-8dbb0cd54508`, `IgnorePayerControlNumber` false. The claim's charges: 85025 `SVC125331`, 36415 `SVC125326`, 96365 `SVC125322`, J1750 `SVC137961`.

| Line | Control | Procedure | SentProcedure | Billed | Adjustment | Step | Charge |
|---|---|---|---|---|---|---|---|
| 0 | SVC125331 | J1750 | 85025 | 280.80 | CO-45 | 1 | 85025 |
| 1 | SVC125326 | J1750 | 36415 | 15.00 | PR-3 | 1 | 36415 |
| 2 | SVC125322 | J1750 | 96365 | 124.20 | CO-B13 | 1 | 96365 |
| 3 | SVC137961 | 85025 | NDC of J1750 | 3.81 | CO-B13 | 1 | J1750 |
| 4-5 | none | 85025 | none | 0.08, 16.11 | CO-253, CO-45 | 2a | 85025 |
| 6-8 | none | 36415 | none | 8.47, 0.17, 1.36 | CO-B13, CO-253, CO-45 | 2a | 36415 |
| 9-11 | none | 96365 | none | 50.07, 1.02, 60.44 | CO-B13, CO-253, CO-45 | 2a | 96365 |

The J1750 charge receives only line 3. The three lines labeled J1750 in the 835 (totaling 420.00) belong to the other three charges.

## Investigation workflow

1. Get the `RemittanceCreatedEvent` (remittance stream), the claim's charges (`GetClaimByIdAsync`), the payer-literal setting, and the catalog projections (Modifiers, ContractualAdjustmentReasons, TransferReasons, RemarkCodes). See `../ChargePaymentCreation/` for where each comes from.
2. Run `../ChargePaymentCreation/references/replay_charge_payments.py`. Its first table shows the step and charge for every line.
3. Compare the result with the charge payments in `RemittanceInitialized`. A difference means the claim's charges changed since intake, the catalogs changed, or a later event (`RemittanceClaimPaymentUpdated`) altered the payment.

## Where to look for more
- `../ChargePaymentAggregation/CLAUDE.md` — what happens to lines matched to the same charge.
- `../ChargePaymentCreation/CLAUDE.md` — the whole flow and the replay script.
- `src/runtime/Mediators/ClaimBuilder.cs` in the `snowdrop-remittance-processing-be` source — `FindChargeOnClaim`.
