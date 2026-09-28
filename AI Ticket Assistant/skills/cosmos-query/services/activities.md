# Activities — Cosmos Event Stream

**Not a Squad Herbert service** — a different squad's namespace ("Activities"), confirmed real but not
otherwise documented. No `Events.md` source doc known. Everything here is confirmed by live sample only
(2026-08-06, UF-15723); treat gaps as unconfirmed.

Database/container: `{TODO-confirm}` — the container `snowdrop-activities-charges-events` was sighted
2026-07-07 as real, but the StreamId below uses `snowdrop-activities` as the namespace segment, not
`snowdrop-activities-charges` — don't assume the container name and the StreamId namespace segment are
the same string without checking a live sample's actual container.

**StreamId format (dashed/short convention):** `snowdrop-activities->{organizationId}->charge->{chargeId}`

Confirmed via a real sample:
```
snowdrop-activities->c81d5075-34fe-46bc-a5c5-90c64cad6d8e->charge->85722167-7bd0-4535-9bc3-8bfcf387bd47
```

**Entity id = `ChargeId`** (confirmed 2026-08-06) — unlike `services/invoices.md`'s open question, this one's entity-id mapping is settled: use the same `ChargeId` you already have from remittance-processing/remittance-BE directly, no discovery step needed.

## Look up a charge's activity event feed
```sql
SELECT * FROM c
WHERE c.StreamId = "snowdrop-activities->{organizationId}->charge->{chargeId}"
ORDER BY c._ts ASC
```

## Growing this file
- Confirm the actual database/container name (candidate: `snowdrop-activities-charges-events`, but not
  yet verified against a live query result rather than just a container listing).
- Event class names/shapes for this stream — none captured yet, only the StreamId format and entity-id mapping.
- What this stream actually represents relative to `repos/snowdrop-ledger-be/references/cosmos_query.md`'s charge/balance events and
  remittance-processing's `ChargePayments` — likely the "charge as billed/activity-level" side rather
  than the ledger or remittance-processing view, but not yet confirmed by comparing a real sample's `Data` shape.
