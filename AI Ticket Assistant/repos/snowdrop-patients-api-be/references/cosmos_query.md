# Patients — Cosmos query recipes and confirmed facts

Repo-specific content — generic cross-service mechanics (envelope shape, StreamId conventions, auth) live in the `cosmos-query` skill instead, since those apply to every service, not just this repo.

Full event schemas (every event class, property, enum): `references/Events.md`.

Database: `snowdrop-patients` (dedicated) — **distinct from the Splunk namespace value** `snowdrop-patients-api-be`; see this repo's `CLAUDE.md` Identity block, don't conflate the two. Container: `snowdrop-patients-events`, plus `snowdrop-patient-phoenix-events`, `snowdrop-patients-identities`, and `snowdrop-patients-subscriptions`. The `-phoenix-` container name is the second sighting of "phoenix" (there's also a standalone top-level `phoenix` database, unrelated naming convention) — purpose not yet investigated.

Aggregate-type (dotted convention): `Snowdrop.Patients.Patient`.

**StreamId:** `Snowdrop.Patients->{organizationId}->Snowdrop.Patients.Patient->{patientId}`

Single aggregate type per patient, keyed by `PatientId`. Three event namespaces feed the same stream: `Snowdrop.Patients.Events`, `Snowdrop.Patients.Events.PersonalContacts`, `Snowdrop.Patients.Events.System`.

## Event families

- **Lifecycle:** `PatientCreated`, `PatientCreationDetailSet`, `PatientDeleted`, `PatientDismissed`, `PatientFinancialAccountNumberAssigned`
- **Data:** `PatientDemographicsUpdated`, `PatientDemographicsVerified`, `PatientDetailsUpdated`, `PatientStatusUpdated`, `PatientTestStatusToggled`, `PatientPoliciesSnapshotted`
- **Merge / duplicate management:** `PatientMerged` (on the source/merged-away patient), `PatientMergeSourceAdded` (on the target/surviving patient), `PatientDesignatedAsPrimaryPotentialDuplicate`, `PatientProbableDuplicateAdded/Removed/MatchedFieldsUpdated`
- **Address / Contact Point (phone, email, fax) / Location collections:** each has `Added`/`Updated`/`Deleted`/`CollectionOrderUpdated` variants, serialized as an ID-keyed dictionary under a named JSON property (`"Addresses"`, `"ContactPoints"`, `"Locations"`) — e.g. `{ "PatientId": "<guid>", "Addresses": { "<AddressId>": {...} } }`. `ContactPointType` (`Phone`/`Email`/`Fax`) is the discriminator shared across all three contact-point event families.
- **Personal Contact collection** (namespace `Snowdrop.Patients.Events.PersonalContacts`): same Added/Updated/Deleted/CollectionOrderUpdated pattern under `"PersonalContacts"`, `PatientPersonalContactsSet` for full replacement (new patients only).
- **System** (namespace `Snowdrop.Patients.Events.System`): `PatientFanMigrationCompleted` — does not extend the common `PatientEvent` base.

## Gotchas

- **`PatientDemographicsVerified` nests its payload one level deeper than usual.** A custom `JsonConverter` wraps `Verification` inside a `Demographics` object to match the patient document shape: `{ "PatientId": "...", "Demographics": { "Verification": {...} } }`. Don't assume `c.Data.Verification` — it's `c.Data.Demographics.Verification`.
- **`PatientFanMigrationCompleted`** (namespace `Snowdrop.Patients.Events.System`) is the one event in this stream that does not extend the common `PatientEvent` base — no functional query impact (still keyed by `PatientId` in `Data`), just don't expect it in a `PatientEvent`-only type filter if code ever does one.
- **`PatientMerged` fires on the source (merged-away) patient's own stream**, not the target's — if tracing a patient that "disappeared," check its own stream for this event rather than assuming merges only show up on the surviving patient. The companion `PatientMergeSourceAdded` is what lands on the target's stream.

## Look up a patient event feed
```sql
SELECT * FROM c
WHERE c.StreamId = "Snowdrop.Patients->{organizationId}->Snowdrop.Patients.Patient->{patientId}"
ORDER BY c._ts ASC
```
