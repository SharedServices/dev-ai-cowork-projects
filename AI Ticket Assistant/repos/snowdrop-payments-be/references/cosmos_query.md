# Payments — Cosmos Event Stream

**Not a Squad Herbert service** — no `Events.md` source doc exists for it in this project. Everything here is confirmed by live sample only (app, 2026-10-26, UF-17639); treat gaps as unconfirmed.

Database: `snowdrop` (the shared exception database). Container: `snowdrop-payments-events`.

**StreamId format (dashed/short convention):** `snowdrop-payments->{organizationId}->payment-specification->{paymentSpecificationId}`

**The entity id is the payment specification id, not the id of the thing being paid.** A StreamId built with a remittance id returns nothing. For a remittance's insurance credit card payment, the payment specification id comes from the remittance's credit card payments blob (`Data.Payments[].PaymentSpecificationId`), kept by remittance processing; see `repos/snowdrop-remittance-processing-be/references/blob_projections.md`, "The credit card payments blob". Do not search the container by remittance id on a production env (cross-partition scan); read the blob first.

Events seen on one remittance credit card payment (in order): `PaymentSpecificationCreated` (`EntityId` and `EntityType` = the remittance id and `remittance`, `CorrelationId` = the remittance processing `PaymentId`, `PaymentSource` `snowdrop-remittance`, `TransactionAmount`, `UserId`), `PaymentSpecificationProcessed`, `StripeTransactionProcessed` (`TransactionAmount`, `FeeAmount`, `TransactionDate` with a UTC offset, `LastFour`, `CardLogo`, `StripePaymentId`, `StripeAccountId`), and later `PaymentPayoutScheduled` (`StripePayoutId`, `ExpectedArrivalDate`; no user).

## Look up a payment's event feed
```sql
SELECT c.EventNumber, c.EventType, c.ts, c.Data FROM c
WHERE c.StreamId = "snowdrop-payments->{organizationId}->payment-specification->{paymentSpecificationId}"
  AND c.Type = "e"
ORDER BY c._ts ASC
```

## Growing this file
- Other payment sources (patient payments, payment plans) use the same container; their entity ids and `PaymentSource` values are not confirmed here.
- Event class list and property shapes beyond the four above are not captured.
