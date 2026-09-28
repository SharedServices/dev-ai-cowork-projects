# Charge Masters — Cosmos query recipes and confirmed facts

Repo-specific content — generic cross-service mechanics (envelope shape, StreamId conventions, auth) live in the `cosmos-query` skill instead, since those apply to every service, not just this repo.

Full event schemas (every event class, property, enum): `references/Events.md`.

Database: `snowdrop` — the **shared exception** to the one-dedicated-database-per-service default (see the `cosmos-query` skill's main `SKILL.md`, *Entity → database / container map*). Container: `snowdrop-chargemasters-events`, plus a non-event container `snowdrop-chargemasters-subscriptions`.

**Two separate streams (confirmed 2026-07-20), both dotted-convention, both in the same container:**

- **Company stream** — catalogue-level, which charge masters exist for a company: `Snowdrop.ChargeMasters->{OrganizationId}->Snowdrop.ChargeMasters.Company->{CompanyId}`. Events: `CompanyChargeMasterAdded`/`Updated`/`Deleted`/`CollectionOrderUpdated` — items serialized as an ID-keyed dictionary under `"ChargeMasters"`.
- **ChargeMaster stream** — fee-data for one specific charge master: `Snowdrop.ChargeMasters->{OrganizationId}->Snowdrop.ChargeMasters.ChargeMaster->{CompanyId}_{ChargeMasterId}` — **composite entity ID**. Events: `ChargeMasterFeesImported` (fees inline as `OrderedCollection<FeeIdentity, Fee>`), `ChargeMasterFeesStored` (fees externalized to blob — see the `cosmos-query` skill's *Business payload can be a pointer* for the `FeeStoragePath` shape and the confirmed blob path).

Don't confuse the two — "give me this company's charge masters" needs the Company stream; "give me this charge master's fees" needs the ChargeMaster stream with the composite id.

## Look up a company's charge master catalogue
```sql
SELECT * FROM c
WHERE c.StreamId = "Snowdrop.ChargeMasters->{organizationId}->Snowdrop.ChargeMasters.Company->{companyId}"
ORDER BY c._ts ASC
```

## Look up a specific charge master's fees
```sql
SELECT * FROM c
WHERE c.StreamId = "Snowdrop.ChargeMasters->{organizationId}->Snowdrop.ChargeMasters.ChargeMaster->{companyId}_{chargeMasterId}"
ORDER BY c._ts ASC
```
