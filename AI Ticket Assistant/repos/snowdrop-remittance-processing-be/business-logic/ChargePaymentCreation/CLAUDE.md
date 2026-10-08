# Charge Payment Creation — how a remittance's claim payments and charge payments are built from the payer's response

## What this covers

The path from the `RemittanceCreatedEvent` that remittance (BE) publishes to the claim payments and charge payments recorded in remittance processing's `RemittanceInitialized` event, and the replay script that reproduces that result from exported data. Matching is in `../ServiceLineChargeMatching/`, combining in `../ChargePaymentAggregation/`.

## Key concepts / vocabulary

- **`RemittanceCreatedEvent`** — in the `snowdrop-remittance` stream. `RemittanceMessage.Claims[]` holds the payer's answer: one entry per claim with `ClaimId`, `ClaimPaymentId`, `ICN`, `TotalPayment` and `Services[]`. When `RemittanceMessageStoredInBlobStorage` is true the message is read from blob storage and is not in any event.
- **Claim payment / charge payment** — remittance processing's records of what the payer paid on a claim and on each charge of it. A claim payment holds its charge payments.
- **Claim projection** — remittance processing's view of the claim we sent: `ClaimProjection` with its `ClaimCharge` list. Available through `GET /snowdrop/remittanceprocessing/claims?claimId={claimId}` (`GetClaimByIdAsync`).
- **`RemittanceInitialized`** — in the `snowdrop-remittanceprocessing` stream, written when the remittance is first built. Its `ClaimPayments[].ChargePayments[]` are the result of the steps below, before any user edit or dispute evaluation.

## The flow

| Step | What happens | Code |
|---|---|---|
| 1 | The remittance message is taken from the event, or from blob storage when it is stored there. | `ClaimBuilderHelper.BuildCheckPayment` |
| 2 | The payer-literal setting `IgnorePayerControlNumber` is read for the event's `PayerLiteral`. | `PayerLiteralSettings.IgnorePayerControlNumber` |
| 3 | For each claim in the message, the claim projection for its `ClaimId` is loaded (`GetClaimProjectionWithPortfolioAdjustments`). That call can reassign the claim's portfolio when its charges point at a different portfolio. | `ClaimBuilderFactory.GetClaimBuilder` |
| 4 | Each service line is matched to a claim charge and converted to a charge payment; catalogs turn codes into ids: ContractualAdjustmentReasons (adjustments), TransferReasons (transfers), RemarkCodes, Modifiers. | `BuildChargePayment`, `ServiceLineChargeMatching` |
| 5 | Charge payments for the same charge are combined. | `AggregateSameChargeId`, `ChargePaymentAggregation` |
| 6 | Claim interest (supplemental amount qualifier `I`) is spread over charges with a non-zero paid amount. | `InterestCalculator` |
| 7 | Charge payments are put in claim order, with a placeholder for each claim charge that got no line; unmatched lines go last. | `OrderChargePayments` |
| 8 | Payer position and the next payer (transfer target) are looked up for the claim and each charge. | `ChargeTransferTargetMediator.GetTransferPositionAsync` |
| 9 | The claim payment is created (`TotalPayment` = the 835 claim `TotalPayment` plus interest); claim payments sharing a `ClaimId` are combined; account balances are applied. | `ClaimPayment.Create`, `AggregateSameClaimId`, `ApplyBalances` |
| 10 | The result is what `RemittanceInitialized` shows. Dispute flags are not set at this point; they appear on later events (`RemittanceDisputes`, `RemittanceClaimPaymentPosted`). | event stream |

Later changes (for example `RemittanceClaimPaymentUpdated` when a user edits a claim payment, or a rebuild after a claim changes) replace charge payments through `RebuildClaimPayment`; they are not part of this initial build.

## Replay script

`references/replay_charge_payments.py` (Python 3, standard library only) rebuilds the charge payments from the same inputs and compares them with `RemittanceInitialized`. It prints, per claim: a table assigning each service line to a charge with the matching step, a table of the aggregated charge payments, a payer data consistency table (per charge, billed minus paid, adjustments and transfers; see `../PayerServiceLineMislabeling/`), and a field-by-field comparison.

Inputs and where they come from:

| Input | Source |
|---|---|
| Remittance message | `snowdrop-remittance` stream, `RemittanceCreatedEvent` (see `repos/snowdrop-remittance-be/references/cosmos_query.md`) |
| Actual result | `snowdrop-remittanceprocessing` stream, `RemittanceInitialized` (see `../../references/cosmos_query.md`) |
| Claim charges | `GET /snowdrop/remittanceprocessing/claims?claimId={claimId}` for each claim in the message, saved as JSON (patient name and FAN can be removed) |
| Catalogs | `CatalogCacheProjection` blobs (see `../../references/blob_projections.md`): `contractualadjustmentreasons`, `transferreasons`, `remarkcodes`, `modifiers` |
| Control number flag | `POST /snowdrop/remittanceprocessing/payerliterals`, pass `--ignore-control-number` when true |

Run: `python3 -I replay_charge_payments.py --remit-be-events {file} --rp-events {file} --claims {files} --catalogs {folder}`

What is compared: charge, code, control number, flags set during the build (`IsVoided`, `WasFuzzyMatch`, `AmbiguousAdjustmentCode`, `NotOnEob`, `ExcludeFromPosting`), date of service, billed, allowed and expected amounts, payments, modifiers, adjustments, transfers, unknown codes, remark codes and order. Not compared: charge payment ids (random), payer ids (the claims call does not return per-charge payer), activity and ordering provider, transfer-to details, interest distribution, and dispute flags.

## Known gotchas / non-obvious behavior

### The result depends on data that changes after intake
The claim's charges, the catalogs and the payer-literal setting are read as they are now. If any changed since the remittance was built, the replay can differ from `RemittanceInitialized` without a code difference.

### A payer's 835 line labels are not the charge's identity
See `../ServiceLineChargeMatching/CLAUDE.md`. The paid amounts and adjustments a charge payment shows are those of the lines matched to it, which can differ from what the 835 shows under the same procedure code.

### Charge-level payer id can differ from the claim's payer
Each charge payment's `PayerId` comes from the claim charge, not from the claim. A charge payment's payer can therefore differ from its claim payment's payer.

## Validation status

Replay reproduced all four claim payments of remittance `e6c5ac26-ede3-4cf4-bcc2-d38b9561998c` (space, HUMANA INC., 12 + 3 + 4 + 1 service lines) exactly on the compared fields. Matching steps exercised: control number (step 1) and unique charge code (step 2a). Not yet exercised by any validated example: code with quantity, modifier or date-of-service narrowing, the fuzzy billed-amount step, unmatched lines, `IgnorePayerControlNumber` true, voided charges, ambiguous adjustment codes, interest, crossover claims, and claim-level combining.

## Where to look for more
- `../ServiceLineChargeMatching/CLAUDE.md` — matching rules.
- `../ChargePaymentAggregation/CLAUDE.md` — combining rules.
- `../ChargePaymentCardinality/CLAUDE.md` — one charge, several charge payment ids.
- `../PayerServiceLineMislabeling/CLAUDE.md` — payer data that scrambles which charge amounts belong to.
- `../../../snowdrop-remittance-be/business-logic/PayerResponseSourceOfTruth/CLAUDE.md` — the remittance message is the payer's answer.
- `references/replay_charge_payments.py` — the replay script.
