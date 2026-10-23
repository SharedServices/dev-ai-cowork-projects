# Change Healthcare — Cosmos query recipes and confirmed facts

Repo-specific content — generic cross-service mechanics (envelope shape, document `Type`, StreamId conventions, auth) live in the `cosmos-query` skill instead. No `Events.md` exists for this repo here; everything below was read from live data on team (org SDHB-2) and from the Remittance (BE) consumer code that reads these events.

Database: `snowdrop` (the shared database, not a dedicated one). Container: `snowdrop-change-healthcare-events`. Namespace in the StreamId: `snowdrop-changehealthcare` (no dash between "change" and "healthcare").

**StreamId:** `snowdrop-changehealthcare->{organizationId}->report->{reportId}_{fileType}`

- `{reportId}` is the report guid in **compressed form, with no dashes**, for example `2bb6a082c1cbf111bf5b6045bdd5cfcf`. This is the real format. Streams in this container with a dashed report id come from QA test code, which writes them incorrectly; do not treat them as the convention.
- `{fileType}` is lower case in the stream id (`r5`) and upper case in the event data (`R5`). `R5` is the ERA (835) report file; `snowdrop-remittance-be` only consumes streams whose file type is `R5` (`EraConsumerService.EraFilesOnly`).

## Look up the report event

```sql
SELECT c.StreamId, c.EventNumber, c.EventType, c.ts, c.Data.ReportId, c.Data.FileType, c.Data.FileName, c.Data.FileReceived, c.Data.DataStoredInBlobContainer, LENGTH(c.Data.Data) AS DataLength, c.Metadata.CorrelationId, c.Metadata.TraceId
FROM c
WHERE c.StreamId = "snowdrop-changehealthcare->{organizationId}->report->{reportIdWithoutDashes}_r5"
  AND c.Type = "e"
```

Replace `c.Data.Data` and the projection with `c.Data` to get the EDI body (large: the whole file as text). The projection above leaves it out.

## Find the report from a ReportId (one-off, non-production)

A `RemittanceCreatedEvent` in `snowdrop-remittance` carries `ReportId` with dashes. This finds the stream by it. It is a cross-partition scan, so use it once to get the StreamId, then query by StreamId:

```sql
SELECT TOP 5 c.StreamId, c.EventNumber, c.EventType, c.ts, c.Data.ReportId, c.Data.FileType FROM c WHERE c.Data.ReportId = "{reportId with dashes}"
```

The `Data.ReportId` field is the dashed form; only the StreamId is compressed.

## Key facts

**`ReportFileUploaded`** is the event the ERA consumer handles. Fields confirmed in `Data`: `ReportId` (dashed), `SubmitterId` (null seen), `FileType`, `FileName` (`JTR5.835` seen), `Data` (the EDI text), `FileReceived`, `DataStoredInBlobContainer`. When `DataStoredInBlobContainer` is true the EDI is not in the event; the consumer fetches it from the Change Healthcare API (`GetReportAsync`, org, `R5`, report id). Seen false for a 1681-character file.

**Flow to a remittance (confirmed on team, 2026-10-19):** `ReportFileUploaded` (event time 13:37:11.954Z) is followed 187 ms later by the remittance's `RemittanceCreatedEvent` (13:37:12.141Z) in `snowdrop-remittance-events`, whose `ReportId` is the report's id (dashed). Remittance (BE)'s `EraFileEventHandler` parses the EDI and creates one remittance per check. The remittance event keeps only the fields the parser maps; the EDI body is the only record of the rest (see the Remittance (BE) repo and the PD-432 ticket folder). A report already recorded as processed for the organization is skipped, and reports received before a cutoff date are skipped.

**EDI delimiters are read from the ISA segment**, not fixed. The test file used `~` between elements, `^` inside composites and `_` between segments.

**Event stream shape:** one `e` document (event 0, `ReportFileUploaded`) and one `v` version record. See the skill's "Document types in an event feed" section.

**Not yet confirmed:** other event types in this container; which service writes `FileName`/`SubmitterId` in production; the API's own routes (listed in `Snowdrop.ChangeHealthcare.Services.Dictionary.md`, server URL `https://api.unlimitedfinancials.ninja/snowdrop/changehealthcare` from the spec only).
