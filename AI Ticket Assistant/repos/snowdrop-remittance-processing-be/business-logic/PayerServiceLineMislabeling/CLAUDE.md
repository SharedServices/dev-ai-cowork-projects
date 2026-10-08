# Payer Service Line Mislabeling — payers sometimes scramble which service line their payment and adjustment amounts belong to, so amounts post to the wrong charge

## What this covers

An external data problem, not a defect in this system. A payer's remittance (835) sometimes attributes amounts to the wrong service lines: the line's procedure code, its sent procedure code, its quantity, its billed amount and its control number do not agree with each other. Remittance processing builds charge payments from those lines exactly as given, so the paid amount and adjustment codes of one charge end up on another. Treat this as a possible root cause whenever a charge's payment or adjustments look wrong and the replay of the charge payment build (`../ChargePaymentCreation/`) reproduces what was posted.

## Key concepts / vocabulary

- **Service line fields** — per line in `RemittanceMessage.Claims[].Services[]`: `Procedure` (what the payer adjudicated), `SentProcedure` (what the payer says we sent), `Qty`, `SentQuantity`, `Billed`, control number (`6R` reference), `ProviderPaid`, `Adjustments[]`.
- **Charge fee / billing units / service line number** — what we sent, from the claim's charges (`GET /snowdrop/remittanceprocessing/claims?claimId={claimId}`).
- **Reconciliation difference** — for a charge payment: charge fee minus (paid + adjustments + transfers + unknown-code amounts). Zero on a healthy charge.

## How it presents

The payer's answer is internally consistent in total but wrong in position. The lines still add up for the claim, while individual charges do not:

- one charge carries adjustments larger than its own fee, another carries too few;
- lines matched by control number have a `Billed` amount that differs from the matched charge's fee;
- a line's `Procedure` differs from its `SentProcedure` and from the code of the charge its control number belongs to;
- `Qty` and `SentQuantity` disagree (for example `Qty` 8 with `SentQuantity` 1);
- a charge that was billed for a large amount shows only a small adjustment and no payment, while a small charge shows a large one.

A `Procedure` that is an NDC while `SentProcedure` is the HCPCS code is a different, benign pattern: it can appear on a healthy line. Judge by the amounts, not by the procedure column alone.

## How to identify it

1. Replay the charge payment build with `../ChargePaymentCreation/references/replay_charge_payments.py`. If the replay matches `RemittanceInitialized`, our processing did what the payer's lines said.
2. Read the script's "Payer data consistency" table. The signature is: several charges do not reconcile (difference not 0) while the claim as a whole nets to 0. Lines listed under it with `Billed` different from the charge fee are the misattributed ones.
3. Compare the lines' control numbers, procedure and sent procedure in the first table. A line labeled with one code but carrying another charge's control number and amounts is the scrambled line.
4. Confirm against the payer's own documents: the EOB PDF on the remittance, and if needed the raw EDI in the Change Healthcare event feed. If they show the same scrambled lines, the data came from the payer.

## Impact

- Each charge posts to the ledger with the paid amount and adjustments of the lines matched to it, so a charge can show a payment or write-off that belongs to a different charge on the same claim.
- A charge payment can be flagged as disputed because the line matched to it shows 0 paid or an unexpected adjustment.
- The payer is the party that can correct it (a corrected remittance or reprocessed claim). Nothing in remittance processing changes the amounts on its own.

## Known gotchas / non-obvious behavior

### Control number match makes the scramble harmless to line identity but not to amounts
When the payer echoes our control number on the wrong amounts, the match is exact and the charge is correct. The lines themselves are what is wrong. This is why matching by procedure code (reading the 835 by eye) and the posted result can disagree.

### A claim can reconcile while every charge is wrong
Total payment and total adjustments on the claim can equal what was billed, so claim-level totals give no warning. Check per charge.

### Do not conclude "payer paid 0 on the charge" from the posted charge alone
On a scrambled claim, a 0 paid on the charge can mean the paid amount went to another charge's line, or that the payer paid 0 across the claim. Check the claim's `TotalPayment` and all lines.

## Worked example

Remittance `e6c5ac26-ede3-4cf4-bcc2-d38b9561998c` (space), HUMANA INC., claim payment `833cee15-0c50-417c-8ed4-c2c895db06e2` (reconsideration response, claim total payment 0.00, billed 561.53).

| Charge | Fee | Paid | Adjustments and transfers on the charge payment | Reconciliation difference |
|---|---|---|---|---|
| 85025 | 20.00 | 0.00 | 296.99 (CO-45 280.80 and 16.11, CO-253 0.08) | -276.99 |
| 36415 | 10.00 | 0.00 | 10.00 adjusted + 15.00 transferred (PR-3) | -15.00 |
| 96365 | 111.53 | 0.00 | 235.73 | -124.20 |
| J1750 | 420.00 | 0.00 | 3.81 (CO-B13) | 416.19 |

The differences sum to 0.00 across the claim. The three lines the payer labeled J1750 (billed 280.80, 15.00, 124.20, total 420.00) carry `SentProcedure` 85025, 36415 and 96365 and the control numbers of those charges, so they posted to those charges. The line with J1750's control number carries 3.81. The three other claims on the same remittance reconcile on every charge.

## Where to look for more
- `../ServiceLineChargeMatching/CLAUDE.md` — how lines are assigned to charges.
- `../ChargePaymentAggregation/CLAUDE.md` — how lines combine on a charge.
- `../ChargePaymentCreation/CLAUDE.md` — the build flow and the replay script.
- `../../../snowdrop-remittance-be/business-logic/PayerResponseSourceOfTruth/CLAUDE.md` — the remittance message and EOB are the payer's answer.
