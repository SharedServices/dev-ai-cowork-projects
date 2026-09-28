## Charge / ChargePayment Cardinality

### What this covers

The ChargeId↔ChargePaymentId relationship in this repo's Cosmos event feeds — load-bearing for
any investigation that greps the event feed by one or the other.

### The fact

`ChargeId` ↔ `ChargePaymentId` is one-to-many: one `ChargeId` can have multiple `ChargePaymentId`s
(e.g. one per payer posting — primary, secondary, reprocessing). Each `ChargePaymentId` belongs to
exactly one `ChargeId`.

### Implications

Events like `RemittanceDisputes` (and its sub-arrays `DenialDisputs`/`ChargeDisputes`) reference a
charge only by `ChargePaymentId`, never `ChargeId`. Grepping the `ChargeId` alone misses these
events; grepping a single `ChargePaymentId` can miss the same charge's *other* payments.

### How to apply

Find the `ChargeId` in `RemittanceClaimPaymentPosted`/`RemittanceInitialized` events, collect all
distinct `ChargePaymentId`s tied to it, then re-grep the feed for each one individually.

**Example (UF-14487):** `ChargeId` `c3d12365-ca2c-47e5-ba37-f739f24ea3c3` had `ChargePaymentId`
`42856673-e063-45c7-963b-219ed2be713b` — searching by `ChargeId` alone found 4 events; searching by
that `ChargePaymentId` surfaced 2 more `RemittanceDisputes` events the `ChargeId` search had missed.

### Where to look for more
- `../Rules/` — this cardinality is the mechanical basis for the claim-vs-charge-payment
  distinction the rules engine draws.
