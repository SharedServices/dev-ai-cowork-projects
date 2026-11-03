# Invoices — Cosmos Event Stream

**Not a Squad Herbert service** — no `Events.md` source doc exists for it yet, unlike the eight Herbert
services. Everything here is confirmed by live sample only (2026-08-06, UF-15723); treat gaps as
unconfirmed rather than assuming Herbert conventions carry over.

Database: `snowdrop` (the shared exception database — same one charge masters, episodes, and intake
live in, not a dedicated `snowdrop-invoices` database). Container: `snowdrop-invoices-events`.

**StreamId format (dashed/short convention):** `snowdrop-invoices->{organizationId}->claim-invoice->{invoiceId}`

Confirmed via a real sample:
```
snowdrop-invoices->c81d5075-34fe-46bc-a5c5-90c64cad6d8e->claim-invoice->5573e534-7eda-4ca6-95bb-efd736233dd7
```

**Entity id is `{TODO-confirm}`: not yet confirmed whether it's the claim GUID or a separate
invoice-specific GUID.** The one live sample's entity id didn't match any other GUID already known for
that record (claim id, assembly id, etc.) — so don't assume `{invoiceId}` in the StreamId equals the
`ClaimId` you already have from remittance-processing/remittance-BE. If a StreamId built from a known
claim id returns nothing, the invoice has its own id that needs to be discovered first — e.g. via a
one-off equality filter (not `CONTAINS`, especially not against a production env):

```sql
SELECT * FROM c
WHERE c.Data.ClaimId = "{claimId}" OR c.Metadata.EntityId = "{claimId}"
```

Once a real document comes back, its own `StreamId` gives you the confirmed invoice id for that claim,
and you can point-read the stream directly from then on.

## Look up an invoice's event feed (once the invoice id is known)
```sql
SELECT * FROM c
WHERE c.StreamId = "snowdrop-invoices->{organizationId}->claim-invoice->{invoiceId}"
ORDER BY c._ts ASC
```

## Growing this file
- Confirm whether `{invoiceId}` = `ClaimId` or a distinct id, and how to derive it directly (e.g. from a
  claim/invoice page URL or another service's event) without the discovery-query fallback above.
- Event class names/shapes for this stream — none captured yet, only the StreamId format.
- Whether this service has its own source-derived `Events.md` equivalent anywhere, or whether it's a
  genuinely different squad's service with no such doc.
