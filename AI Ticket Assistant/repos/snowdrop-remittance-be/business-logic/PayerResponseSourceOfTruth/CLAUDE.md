# Payer Response Source of Truth — the remittance's `RemittanceCreatedEvent` is the definitive record of what the payer returned

## What this covers

Which record to trust when a question is "what did the payer actually pay or adjust?" The answer is the `RemittanceCreatedEvent` on the remittance's `snowdrop-remittance` stream (`snowdrop-remittance->{organizationId}->remittance->{remittanceId}`), not a ticket description, a UI payer summary, a ledger transaction, or any downstream event.

## Key concepts / vocabulary

- **`RemittanceCreatedEvent.Data.RemittanceMessage`** — the translated payer response (835): `Header` (check, payee, payer), `Claims[]` (each with `ClaimPaymentId`, `ICN`, `TotalPayment`, `Services[]`), and `ProviderAdjustments`. Each service carries `Procedure`, `SentProcedure`, `ProviderPaid`, `Adjustments[]` (`GroupCode`/`ReasonCode`/`Amount`) and `References[]` (qualifier `6R` = the line control number, e.g. `SVC137961`).
- **`RemittanceMessageStoredInBlobStorage`** — flag on the event. When the payer response is too large, `RemittanceMessage` is held in blob storage and does not appear in any event, so check this flag before concluding the message is empty.
- **The payer's original EDI** is in the Change Healthcare event feed, not in the remittance event. It is harder to find than `RemittanceMessage`; use it only when the translated message is in doubt.
- **The EOB PDF** — a PDF generated on receipt and visible on the remittance (`RemittanceEobAttachmentUpdated`, `RemittancePerClaimEobRemittancePdfAttachmentsUpdated`). It is a second, human-readable copy of what the payer returned and can be used to cross-check paid amounts.
- **Derived records** — everything after intake is computed from that message: remittance-processing's `RemittanceInitialized` charge payments, `RemittanceClaimPaymentPosted`, the ledger's `ChargeRemittancePosted`, and the claims built for the next payer.

## Upstream flow: how the payer's EDI becomes the remittance

1. The payer's 835 EDI reaches Unlimited as a report file (file type `R5`) in the Change Healthcare event feed (`ReportFileUploaded`; the EDI is in the event's `Data`, or in the Change Healthcare service's blob when `DataStoredInBlobContainer`).
2. Remittance (BE)'s `EraInboundService` consumes that event, parses the EDI with EdiFabric, and creates one remittance per check (835 transaction set) in the file.
3. It publishes `RemittanceCreatedEvent` on the remittance's stream with the parsed `RemittanceMessage` and the `ReportId` of the source file. Large messages go to blob storage instead (see above).
4. Downstream services (remittance processing, EOB PDF generation, ledger) read the message, not the EDI.

So the raw EDI is reachable from a remittance through `ReportId`, and `RemittanceMessage` is a field-by-field translation of it. Segment-to-field mapping, drop conditions and mapping gotchas are in `../EraEdiParsing/CLAUDE.md`. When the translated message and the EOB disagree, or the message looks wrong, compare against the EDI using that mapping.

## Known gotchas / non-obvious behavior

### Payer-paid amounts come from the remittance, not from ticket text, the UI, or ledger Type 200
A "paid" figure in a ticket description, a charge's payer summary, or a ledger Type 200 (Payment) transaction is not evidence that the payer returned that amount. A ledger Type 200 payment can be a user-entered payment application with no remittance behind it. Confirm against `RemittanceMessage` for the claim payment (`Claims[].TotalPayment`, `Services[].ProviderPaid`). If the remittance says 0, the payer returned 0.

### Compare derived records against the message to find where an amount changed
To trace how a payer amount reached the ledger, line the message up against remittance-processing's charge payments and then the ledger event. If they agree at every stage, nothing in the pipeline altered the amount and the answer is the payer's response.

### 835 service lines can be labeled with procedure codes that do not belong to the charge
A payer can return lines whose `Procedure`, `SentProcedure`, quantity, billed amount and control number do not agree, so amounts land on the wrong charge. This is a payer data problem, described with how to recognize it in `repos/snowdrop-remittance-processing-be/business-logic/PayerServiceLineMislabeling/CLAUDE.md`. Remittance-processing matches lines to charges by control number first (see `ServiceLineChargeMatching` in the same repo), so read the 835 by control number, not by procedure code.

## Investigation workflow

1. Pull the remittance's `snowdrop-remittance` stream and read `RemittanceCreatedEvent`. Check `RemittanceMessageStoredInBlobStorage` first; if true, the message is in blob storage and not in the event.
2. Find the claim by `ClaimPaymentId`, `ICN` or account number, then the service line by control number.
3. Read `TotalPayment`, `ProviderPaid` and the `Adjustments` as the payer's answer.
4. Cross-check against the EOB PDF on the remittance. Go to the Change Healthcare event feed for the raw EDI (using the event's `ReportId`) only if the two disagree or the message is unavailable; then use `../EraEdiParsing/CLAUDE.md` to compare EDI to message.
5. Compare with remittance-processing's charge payment (same control number) and the ledger `ChargeRemittancePosted`.

## Where to look for more
- `../../references/cosmos_query.md` — StreamId, container and the `RemittanceCreatedEvent` top-level fields.
- `../../references/Events.md` — full event schema.
