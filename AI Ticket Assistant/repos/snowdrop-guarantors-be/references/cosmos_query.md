# Guarantors — Cosmos query recipes and confirmed facts

Repo-specific content — generic cross-service mechanics (envelope shape, StreamId conventions, auth) live in the `cosmos-query` skill instead, since those apply to every service, not just this repo.

Full event schemas (every event class, property, enum): `references/Events.md`.

Database: `snowdrop-guarantors` (dedicated). Container: `snowdrop-guarantors-events`. Aggregate-type: `guarantor`.

**StreamId:** `snowdrop-guarantors->{organizationId}->guarantor->{guarantorId}`

Single aggregate type, straightforward — keyed by `GuarantorId`. Events: `GuarantorCreated`, `GuarantorUpdated`, `GuarantorDeleted`. `GuarantorCreated` carries the full guarantor record (name, DOB, SSN, address, contact info, `GuarantorFAN`, `PatientRelationship`); `GuarantorUpdated` carries only the fields that can change post-creation.

## PII warning

`GuarantorCreated` documents include `SocialSecurityNumber`, `BirthDate`, full `Address`, `PhoneNumber`, and `EmailAddress` directly on the event, plus `GuarantorFAN` (ties into the `splunk-search` skill's FAN → guarantor lookup pattern — the FAN lives right on this entity). Ninja's values are synthetic/scrambled test data, not real PII, but treat this container as sensitive by default in any other environment — don't paste raw guarantor documents into chat from `team`/`one`/`exchange`/prod without redacting SSN/DOB/address/contact fields first.

## Look up a guarantor event feed
```sql
SELECT * FROM c
WHERE c.StreamId = "snowdrop-guarantors->{organizationId}->guarantor->{guarantorId}"
ORDER BY c._ts ASC
```
