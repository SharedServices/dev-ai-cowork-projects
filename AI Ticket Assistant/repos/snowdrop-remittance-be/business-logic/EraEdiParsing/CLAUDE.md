# Era EDI Parsing — how a Change Healthcare 835 file becomes `RemittanceCreatedEvent.RemittanceMessage`

## What this covers

How remittance (BE) turns the payer's 835 EDI into the `RemittanceMessage` stored on `RemittanceCreatedEvent`. The field is `RemittanceMessage` (not `MessageHeader`; `Header` is only one part of it). Source: `Snowdrop.Remittance.EraInboundService` (consumer and handler) and `Snowdrop.Remittance.EdiFabric` (parser and mapping) in the `snowdrop-remittance-be` source. Read from code; no mapping rule below has been compared against a raw EDI file yet.

## Key concepts / vocabulary

- **`ReportFileUploaded`** — event in the Change Healthcare event feed. One per uploaded report file. Carries `ReportId`, `FileType`, `FileReceived`, `DataStoredInBlobContainer`, and `Data` (the EDI text) unless it is in a blob.
- **R5** — the report `FileType` for 835 ERA files. Any other type is ignored.
- **TS835** — EdiFabric's typed 835 transaction set (`EdiFabric.Templates.X12004010`). One EDI file can hold several; each becomes one remittance (one check).
- **CLP loop** — one claim payment in the 835. **SVC loop** — one service line under it. **CAS** — adjustment segment (group code + up to six reason/amount pairs). **PLB** — provider-level adjustment segment.
- **`RemittanceMessage`** — `Header`, `Claims[]` (each with `Services[]`), `ProviderAdjustments[]`.
- **`ClaimPaymentId`** — a new random GUID assigned to each CLP loop at parse time. It is not in the EDI.

## The flow

| Step | What happens | Code |
|---|---|---|
| 1 | The consumer reads the Change Healthcare report event streams, skipping any whose report identity file type is not `R5`. | `EraConsumerService.EraFilesOnly` |
| 2 | `ReportFileUploaded` is dropped when: file type is not R5; the `ReportId` is already in the processed-report projection; `FileReceived` is before 2021-06-01. | `EraFileEventHandler.Handle` |
| 3 | EDI text is taken from the event, or fetched from the Change Healthcare service (`GetReportAsync`) when `DataStoredInBlobContainer` is true. A failed fetch logs an error and the file is not processed. | `EraFileEventHandler.Handle` |
| 4 | EdiFabric `X12Reader` parses the text; the `TS835` items are selected. None found: error logged, nothing created. | `EraReader.Read835Edi`, `Get835s` |
| 5 | For each 835 (one check): a new `RemittanceId` (random GUID) is created and the 835 is mapped to a `RemittanceMessage` (mapping below). A failure on one 835 is logged and does not stop the others. | `GenerateAndPublishRemittanceCreatedEvent` |
| 6 | Patient responsibility is calculated for claims whose CLP05 was blank. | `CalculateAndSetTotalPatientResponsibilityForClaimsIfNotReceived` |
| 7 | Each claim is matched to a Unlimited claim by account number (`ClaimNumber`) and payer responsibility; `ClaimId` is set on the message claim. | `GetClaimIdentifiers`, `GetClaimMatchForRemittanceClaim` |
| 8 | Company is found from the payee tax id, else from the matched claims; payer is found from the payer-literal mapping for the payer name, else from the matched claims. | `GenerateRemittanceCreatedEventFrom835` |
| 9 | Posting status is `Reconciled` only for a zero check on a company that auto-reconciles zero payments, with company and payer found and no other active check with the same number; otherwise `New`. | `CalculatePostingStatus` |
| 10 | `RemittanceCreatedEvent` is built (`CheckSource.Electronic`, `PaymentType.EFT`, `ReportId`, `PayeeTaxId`) and published. If the message has more than 1000 claims, or the first publish throws a `CosmosException`, the message is written to blob storage, the event carries no `RemittanceMessage`, and `RemittanceMessageStoredInBlobStorage` is true. | `RemittanceMessageBlobRepository.WriteRemittanceMessageAsync` |

## Mapping: 835 segment to `RemittanceMessage` field

| Message field | 835 source |
|---|---|
| `Header.CheckNumber` | `TRN02` |
| `Header.CheckDate` | `BPR16` |
| `Header.CheckAmount` | `BPR02` |
| `Header.PayerName` and the event's payer literal | `N1` loop with `PR`, `N102` |
| `Header.PayerAddressLine1/2/3` | that loop's `N3` (first), `N4` (city, state, zip) |
| `Header.PayeeName`, `PayeeIdCode`, address lines | `N1` loop with `PE`: `N102`, `N104`, `N3`, `N4` |
| `Header.PayeeTaxId` | `REF` with qualifier `TJ` in the `PE` loop |
| `ProviderAdjustments[]` | each `PLB`: first pair always; further pairs (up to six) only when their reason code is present. Fields: provider id, fiscal date, reason, adjustment identifier, amount |
| `Claims[].AccountNumber` | `CLP01` (our claim number) |
| `Claims[].StatusCode` | `CLP02` (blank throws `EraSyntaxException`, so the whole 835 fails) |
| `Claims[].TotalBilled`, `TotalPayment`, `TotalPatientResponsibility` | `CLP03`, `CLP04`, `CLP05` |
| `Claims[].ICN` | `CLP07` |
| `Claims[].TotalPatientResponsibilityFromClp05` | true when `CLP05` was present |
| `Claims[].PatientName*`, `PatientHIC` | `NM1` `QC` |
| `Claims[].InsuredName*`, `InsuredHIC` | `NM1` `IL` |
| `Claims[].SecondHIC`, `ForwardedTo`, `ServiceProviderID` | `NM1` `74`, `TT`, `82` |
| `Claims[].MOARemarkCode1-5` | `MOA03-07` |
| `Claims[].ClaimDate` | `DTM` whose qualifier ends with `232` |
| `Claims[].Adjustments[]` | claim-level `CAS` (see CAS gotcha) |
| `Claims[].SupplementalAmounts[]` | claim `AMT`: `AMT02` with qualifier `AMT01` (`I` is interest) |
| `Claims[].ASG` | always true (code comment: how to calculate it is undecided) |
| `Claims[].ClaimPaymentId` | new random GUID |
| `Services[].Procedure`, `Modifier1-4` | `SVC01` composite: product id, modifiers |
| `Services[].Billed`, `ProviderPaid`, `Qty` | `SVC02`, `SVC03`, `SVC05` |
| `Services[].SentProcedure`, `SentQuantity` | `SVC06` composite product id, `SVC07` |
| `Services[].ServiceDate` | `DTM` `472`; `ServicePeriodStartDate`/`EndDate` from `150`/`151` |
| `Services[].Allowed` | service `AMT` with qualifier `B6` |
| `Services[].Coins`, `Deduct` | first `CAS` with reason code `2`, `1` (amount) |
| `Services[].RenderingProvider` | `REF` with qualifier `HPI` |
| `Services[].Adjustments[]` | service-level `CAS` (see CAS gotcha) |
| `Services[].References[]` | every service `REF`: `ID` = `REF02`, `IDQualifier` = `REF01`. Qualifier `6R` is the line control number used by charge matching |
| `Services[].Remarks[]` | `LQ`: `QualifierCode` = `LQ01`, `RemarkCode` = `LQ02` |

## Known gotchas / non-obvious behavior

### The service line labels are copied as sent
`Procedure` is `SVC01-2` and `SentProcedure` is `SVC06-2`, with no checks against the claim. Mislabeled lines in the EDI appear unchanged in the message; see `repos/snowdrop-remittance-processing-be/business-logic/PayerServiceLineMislabeling/CLAUDE.md`.

### CAS segments with five or six reason/amount pairs are mapped incorrectly (read from code, not yet seen in data)
A CAS segment holds up to six pairs (reason at positions 02, 05, 08, 11, 14, 17; amount at 03, 06, 09, 12, 15, 18). The mapping for the fifth pair reads reason 11 and amount 12 (a copy of the fourth pair); for the sixth pair it reads reason 14 with amount 15 (the fifth pair's reason). This is in both `ClpLoopExtensions.GetAdjustments` and `SvcLoopExtensions.GetServiceAdjustments`. A CAS with up to four pairs maps correctly. The sixth pair's own reason and amount, and the fifth pair's own values, are never read. Confirm with a raw 835 that has such a segment before treating this as a defect; it would be a candidate for `known-failures/`.

### One 835 failing does not stop the file
Each check is handled in its own try block. A claim with a blank status code (or any `EraSyntaxException`) fails only its own check, with no `RemittanceCreatedEvent` for it, and the log line is the only trace.

### Re-parsing the same file gives different ids
`RemittanceId` and every `ClaimPaymentId` are new GUIDs each parse. The processed-report check on `ReportId` is what prevents a second remittance from the same file.

### Large messages go to blob storage in two ways
More than 1000 claims, or a Cosmos failure on the first publish (document too large). In both cases the event has no `RemittanceMessage`; read it from blob storage through the Remittance API (`RemittanceMessageBlobController`) or the blob container. Claim-to-claim-payment links are written either way.

### The raw EDI is not kept by remittance (BE)
Only the parsed message is stored. The EDI lives in the Change Healthcare report event (`ReportFileUploaded.Data`, or in the Change Healthcare service's blob when `DataStoredInBlobContainer`). The `ReportId` on `RemittanceCreatedEvent` links the remittance to it.

## Tracing this in Splunk

Log messages from `EraFileEventHandler` in remittance (BE): `Handling ReportFileUploaded event`, `Unexpected File Type found`, `ReportFileUploaded event received with already processed ReportId`, `...received date before cutoff`, `Failed to GET report file stored in blob via UF chc service API`, `Could not parse 835s from Zenith report`, `Could not created and publish remittance`, `ERA processing failed` (the `EraSyntaxException` detail with check number, organization, report id and remittance id), `Could not generate remittance from ERA`. Search by `ReportId`. Namespace: see `references/namespaces.md`.

## Investigation workflow

1. Take `ReportId` from `RemittanceCreatedEvent` (top level).
2. If the message is in doubt, find the `ReportFileUploaded` event for that `ReportId` in the Change Healthcare feed and read the EDI (`Data`, or the report via the Change Healthcare service).
3. Locate the check's `ST`...`SE` set by `TRN02` (check number), then the claim by `CLP01`/`CLP07`, then the service line by `SVC`/`REF*6R`.
4. Compare to the message using the mapping table. A difference points at this mapping (check the CAS gotcha first); no difference means the payer sent it.
5. If no remittance exists for a report, search Splunk for the log lines above by `ReportId`.

## Where to look for more
- `../PayerResponseSourceOfTruth/CLAUDE.md` — which record to trust and the upstream flow.
- `repos/snowdrop-remittance-processing-be/business-logic/ChargePaymentCreation/CLAUDE.md` — what happens to the message next.
- `../../references/Events.md` — `RemittanceCreatedEvent` schema.
- Source: `src/Snowdrop.Remittance.EdiFabric/EraReader/` (`Era835Extensions`, `ClpLoopExtensions`, `SvcLoopExtensions`) and `src/Snowdrop.Remittance.EraInboundService/EraInbound/EraFileEventHandler.cs`.
