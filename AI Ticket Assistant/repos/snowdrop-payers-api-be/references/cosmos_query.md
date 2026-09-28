# Payers — Cosmos query recipes and confirmed facts

Repo-specific content — generic cross-service mechanics (envelope shape, StreamId conventions, auth) live in the `cosmos-query` skill instead, since those apply to every service, not just this repo.

Full event schemas (every event class, property, enum): `references/Events.md`.

Database: `snowdrop-payers` (dedicated). **Two separate event containers, both under this same database — don't assume "the payers container" is singular:**
- `snowdrop-payers-events` — the main Payers event feed (all streams below except Factory).
- `snowdrop-payers-factory-events` — factory rate/global fee schedule events, a distinct concern (matches "Payers Factory" naming already seen in Azure Function Apps / storage accounts, e.g. `king-{env}-sdrp-payers-factory`).

**Full stream map (confirmed 2026-07-20, from source-derived event documentation).** StreamId format is the dotted/qualified convention throughout: `Snowdrop.Payers->{Partition}->Snowdrop.Payers.{Entity}->{EntityId}`.

| Stream | Format | Gotcha |
|---|---|---|
| Payer | `Snowdrop.Payers->{OrganizationId}->Snowdrop.Payers.Payer->{PayerId}` | |
| Plan | `Snowdrop.Payers->{OrganizationId}->Snowdrop.Payers.Plan->{PlanId}` | |
| Payer CHC Settings | `...->Snowdrop.Payers.Payer.ChcSettings->{PayerId}` | |
| Plan CHC Settings | `...->Snowdrop.Payers.Plan.ChcSettings->{PlanId}` | |
| Payer Eligibility Config | `...->Snowdrop.Payers.Payer.Eligibility->{PayerId}` | `*Updated` events carry **no entity ID field** — must resolve the payer from the StreamId, not the event body |
| Plan Eligibility Config | `...->Snowdrop.Payers.Plan.Eligibility->{PlanId}` | same as above |
| Manufacturer Copay Program | `...->Snowdrop.Payers.ManufacturerCopayProgram->{ManufacturerCopayProgramId}` | |
| Global Fee Schedule | `...->Snowdrop.Payers.GlobalFeeSchedule->{GlobalFeeScheduleId}` | |
| Global Fee Schedule Fees | `...->Snowdrop.Payers.GlobalFeeSchedule.Fees->{GlobalFeeScheduleId}_{AllowedScheduleId}` | composite key, not lower-cased |
| Factory Fee Schedule | `Snowdrop.Payers->{Source}_{ScheduleType}->Snowdrop.Payers.FactoryFeeSchedule->{Period}_{Locality}_{PricingType}` | **partition is NOT OrganizationId** — it's `{Source}_{ScheduleType}`; id sanitised by replacing `/ ? $ ,` with spaces |
| Fee Schedule | `...->Snowdrop.Payers.FeeSchedule->{PayerId}_{ContractId}_{FeeScheduleId}` | composite key IS lower-cased |
| Fee Schedule Storage | `...->Snowdrop.Payers.FeeSchedule.Storage->{PayerId}_{ContractId}_{FeeScheduleId}` | composite key IS lower-cased (matches the earlier-confirmed triple-composite `EntityId` — middle segment `ContractId` still not independently re-verified against the "?" placeholder from the 2026-07-07 sample) |
| Contract — Payer summary | `...->Snowdrop.Payers.ContractPayer->{PayerId}` | holds the ordered *list* of a payer's contracts |
| Contract — Detail | `...->Snowdrop.Payers.ContractDetail->{PayerId}_{ContractId}` | holds one contract's associations/fee schedules — **two different streams for "a contract," pick based on what you need** |
| Delinquency Thresholds | `...->Snowdrop.Payers.DelinquencyThresholds->{PayerId}_{ContractId}_{ClaimType}` | carries the full threshold *values*; separate from the lightweight reference on Contract Detail, see below |
| Skilled Nursing Facility | `...->Snowdrop.Payers.SkilledNursingFacility->{SnfId}` | |
| SNF Patient | `...->Snowdrop.Payers.SkilledNursingFacility.Patient->{SnfPatientId}` | keyed by `SnfPatientId`, events also carry `PatientId` |
| Vendor Settings | `...->Snowdrop.Payers.Vendor.Settings->{OrganizationId}` | entity ID = OrganizationId itself (same pattern as Resources' `payment-vendor`) |

## Gotchas

- **Some events carry no entity ID field at all — resolve from the StreamId only.** `PayerEligibilityConfigurationUpdated`, `PlanEligibilityConfigurationUpdated`, `PlanInheritContactPointsFromPayerSet`, and Vendor Settings' `PatientAssistsanceIsEnabledUpdated` (class/file name has a typo — "Assistsance" — the property itself is correctly spelled `PatientAssistanceIsEnabled`) all rely entirely on the StreamId to identify their target.
- **Delinquency threshold *values* live on their own stream**, separate from `ContractDelinquencyThresholdsSet` on the Contract Detail stream — the latter only records *that* threshold data exists for a claim type (`HasData` flag), not the actual day-count values. If you need the real thresholds (`ClaimSentDays`, etc.), query the DelinquencyThresholds stream directly.
- **Contract streams split in two on purpose.** `ContractPayer` (keyed by `PayerId`) is the ordered list of a payer's contracts; `ContractDetail` (keyed by `{PayerId}_{ContractId}`) holds one contract's own associations (divisions/facilities/plans/providers/SNFs) and fee schedules. Querying "a contract" without knowing which of the two you need is a common mistake.
- **Large fee batches chunk into multiple events.** `GlobalFeeScheduleFeesUpdated` and `FactoryFeeScheduleFeesSet` share a `BatchId`/`BatchSize`/`BatchIndex` across chunks (up to 10,000 fees each) — query all chunks sharing a `BatchId`, not just the one event you happened to find.
- **`FeeScheduleFeesStored` externalizes fees to blob storage** via `FeeStoragePath` — same generalizable pattern as charge masters (see the `cosmos-query` skill's *Business payload can be a pointer*): blob container name = the writing service's own name (`snowdrop-payers` here). This is the Payers-side re-projection of a charge master's fee schedule (Payers' `ChargeMastersProjectionService` consumes charge-master events and writes its own independent stream/blob copy).
- **`GlobalFeeScheduleFeesUpdated` (Factory container) does NOT externalize** — fees are stored inline, unlike the main-container fee-schedule events. Same domain, different aggregate, different storage choice — don't assume blob-pointer behavior generalizes across every fee-bearing event.
- **Preserved typo:** a field serialized as `"DeliquencyThresholds"` (single 'l') on the Contract Detail stream is a preserved typo in the codebase, not a query mistake on your part.

## Look up a payer event feed
```sql
SELECT * FROM c
WHERE c.StreamId = "Snowdrop.Payers->{organizationId}->Snowdrop.Payers.Payer->{payerId}"
ORDER BY c._ts ASC
```
