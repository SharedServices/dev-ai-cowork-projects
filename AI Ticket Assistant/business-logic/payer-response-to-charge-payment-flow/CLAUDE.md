# Payer Response to Charge Payment Flow — how a payer's 835 becomes charge payments (cross-repo overview)

Scope: genuinely cross-repo (Change Healthcare feed, remittance-be, remittance-processing-be, ledger). This is the shortest description of the flow; details live in each repo's own modules, linked below.

## The flow

| # | What happens | Repo | Details |
|---|---|---|---|
| 1 | The payer's 835 EDI arrives as a Change Healthcare report file (type `R5`, `ReportFileUploaded`). | Change Healthcare feed | `repos/snowdrop-remittance-be/business-logic/EraEdiParsing/CLAUDE.md` (steps 1-4) |
| 2 | Remittance (BE) parses the EDI with EdiFabric into a `RemittanceMessage` (Header, Claims, Services, Adjustments), matches claims by account number, and publishes `RemittanceCreatedEvent` (message goes to blob storage when large). The EOB PDF is generated from it. | `snowdrop-remittance-be` | `repos/snowdrop-remittance-be/business-logic/EraEdiParsing/CLAUDE.md`; which record is authoritative: `repos/snowdrop-remittance-be/business-logic/PayerResponseSourceOfTruth/CLAUDE.md` |
| 3 | Remittance processing reads the message, loads each claim's charges, assigns each service line to a charge (control number first, then code, quantity, modifiers, date, billed amount). | `snowdrop-remittance-processing-be` | `repos/snowdrop-remittance-processing-be/business-logic/ServiceLineChargeMatching/CLAUDE.md` |
| 4 | Lines on the same charge are combined into one charge payment; claim payments are built and written as `RemittanceInitialized`. | `snowdrop-remittance-processing-be` | `.../ChargePaymentAggregation/CLAUDE.md`, `.../ChargePaymentCreation/CLAUDE.md` (10-step flow and replay script) |
| 5 | Claim payments are posted; the ledger records `ChargeRemittancePosted` (transaction type 470). | `snowdrop-remittance-processing-be`, `snowdrop-ledger-be` | `.../ChargePaymentCreation/CLAUDE.md`; ledger repo's own `CLAUDE.md` |

## What to remember

- The remittance's `RemittanceMessage` is the payer's answer; everything after step 2 is derived from it (`PayerResponseSourceOfTruth`).
- Payers can scramble service line labels; amounts then follow the control number onto another charge (`repos/snowdrop-remittance-processing-be/business-logic/PayerServiceLineMislabeling/CLAUDE.md`).
- Tracing an amount: compare 835 line, `RemittanceMessage`, `RemittanceInitialized` charge payment, ledger event, at each step (the replay script in `ChargePaymentCreation/references/` does steps 3-4).
- Worked example: ticket UF-6260, remittance `e6c5ac26-ede3-4cf4-bcc2-d38b9561998c` (space).
