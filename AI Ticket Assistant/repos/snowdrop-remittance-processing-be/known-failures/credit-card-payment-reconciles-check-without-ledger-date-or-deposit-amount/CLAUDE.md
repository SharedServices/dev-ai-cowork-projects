# Credit card payment reconciles a check without a ledger date or deposit amount — grid shows Reconciled with null `LedgerDate` and `DepositAmount`

## What happens
A Credit-type check (insurance credit card payment, taken in the Remittance workspace Payments card) is reconciled by the Stripe payment handler instead of by the user. When the user has already set the deposit date by hand and the payment's transaction date is the same day, the handler publishes the `Reconciled` status event but skips the deposit date, deposit amount and ledger date events. The check then moves on through Building and Ready with a null `LedgerDate` and a null `DepositAmount` on the Remittance (BE) side, while remittance processing's own credit card payments blob holds the ledger date, deposit date and deposit amount.

The defect is in the Remittance (BE) service, not in remittance processing: `PaymentsEventHandler` (`Snowdrop.Remittance.Consumers`) calls `DepositAndLedgerDateMediator.PublishEventsOnAssistanceUpdated` (`Snowdrop.Remittance.Runtime/Mediators/DepositAndLedgerDateMediator.cs`). That method publishes the deposit date, deposit amount and ledger date events only when the transaction date differs from the remittance's existing deposit date. It publishes the status change independently. A cross-reference entry exists in `snowdrop-remittance-be` `known-failures/`.

Support sees it as a Credit check that is not in the Pending Checks tab (it is not `New`), is reconciled, and has no ledger date. Posting a claim payment from the Remittance Posting workflow can return 400 "This remittance is not available for posting"; a null ledger date alone is not shown to cause that message, so confirm the actual reason separately.

## Detection signature
All of the following hold:
- Remittance (BE) stream `snowdrop-remittance->{organizationId}->remittance->{remittanceId}` (check `snowdrop-remittance-events-manual` too): a `RemittanceDepositDateUpdated` written by a user, then a `RemittancePostingStatusUpdated` with `PostingStatus` 2 (Reconciled) written by the same user a short time later (seconds to minutes). No `RemittanceLedgerDateUpdated` and no `RemittanceDepositAmountUpdated` exist anywhere in the stream. The later `RemittancePostingStatusUpdated` events (6 Building, 7 Ready) are written by the system user `daeb914f-1df3-470f-9637-0dae563aa034`.
- Payments stream `snowdrop-payments->{organizationId}->payment-specification->{paymentSpecificationId}` (database `snowdrop`, container `snowdrop-payments-events`): a `StripeTransactionProcessed` event with `Data.EntityType` "remittance" and `Data.EntityId` = the remittance id, with a `ts` just before the Reconciled event. Its `Data.TransactionDate` falls on the same date as the remittance's `DepositDate`.
- Grid record (`snowdrop-remittance-data`, id `RemittanceCheckGridItem_{remittanceId}`, partition `RemittanceCheckGridItem/{organizationId}`): `PostingStatus` is not 1, `LedgerDate` is null, `DepositAmount.CurrentValue` is null with `IsInvalid` true, `PaymentType.CurrentValue` is the Credit value.
- Credit card payments blob (`references/blob_projections.md`): a payment whose `LedgerDate`, `DepositDate` and `DepositAmount` are set.
- Not this pattern: a check reconciled by the user through the Reconcile action has a `RemittanceLedgerDateUpdated` in the same write as the Reconciled status. A check whose deposit date was not set before payment gets all three events from the handler.

Enums: `PostingStatus` 1 New, 2 Reconciled, 6 Building, 7 Ready (`references/EventEnums.md`).

## Verify
1. Get the Remittance (BE) events: query `snowdrop-remittance-events` by StreamId equality, `ORDER BY c._ts ASC`, projecting `EventNumber`, `EventType`, `ts`, `Data` and `Metadata.SourceMetadata.UserId`. Confirm the sequence in the first bullet above, including the absence of ledger date and deposit amount events.
2. Get the remittance's credit card payments blob and read `Data.Payments[].PaymentSpecificationId` (Claude Code: `az storage blob download --auth-mode login` on the standard storage account; path in `references/blob_projections.md`).
3. Query the payments stream for that payment specification id and read `StripeTransactionProcessed`: `TransactionAmount`, `TransactionDate`, `CorrelationId` (equals the blob's `PaymentId`).
4. Compare `TransactionDate` (local date) with the `RemittanceDepositDateUpdated` date. When they are the same date, and the deposit date event came before the Stripe event, the pattern is confirmed.
5. Get the grid record from `snowdrop-remittance-data` with `WHERE c.id = "RemittanceCheckGridItem_{remittanceId}" AND c.Partition = "RemittanceCheckGridItem/{organizationId}"` and confirm null `LedgerDate` and `DepositAmount`.

## Fix (data correction)
Technical procedure. Production change: confirm before it is applied, every time.

The Remittance (BE) API has two endpoints that publish the missing events directly through the normal event store, so the grid record and projections update through their usual consumers:
- `POST /remittance/deposit-amount` with `RemittanceId` and `DepositAmount` publishes `RemittanceDepositAmountUpdated`. It refuses a discarded remittance and a remittance with posted claim payments.
- `POST /remittance/ledger-date` with `RemittanceId` and `LedgerDate` publishes `RemittanceLedgerDateUpdated`. It has no checks on the remittance state or on closed months, so the date must be chosen correctly: use the ledger date held in the credit card payments blob, and confirm the month for the company is not closed.

Steps:
1. Complete Verify above.
2. Take the deposit amount and ledger date from the credit card payments blob.
3. Check month close for the company (`snowdrop-resources` `MonthClosed`; see `business-logic/CheckPostingStatus/CLAUDE.md` and the ledger date locking rules in `snowdrop-remittance-be`).
4. Call `deposit-amount`, then `ledger-date`, as the person making the correction (cookie-authenticated; see `references/api-calls.md` and the `snowdrop-api-calls` skill).
5. Confirm a `RemittanceDepositAmountUpdated` and a `RemittanceLedgerDateUpdated` event in the Remittance (BE) stream, and that the grid record now holds both values.

## Consequence variants
- Deposit amount missing only: when the Stripe event has an amount but the check already holds the same deposit date, the same code path skips the amount.
- Remittance with no company or payer at the time of the payment: the handler does not run (it requires the fields in `HasRequiredFieldsToReconcileOnPayment`), so this pattern does not apply.

## Confirmed occurrences
- UF-17639 (app): check 418561863, remittance `518675b4-8389-4ae4-90f2-700121935ab5`, org `5b713915-f218-4516-b928-64a8d14f10cb`, company `ebbd8a02-2f4f-4fea-8cbc-60d084ddb4fd`, payment specification `f13d923f-7862-4d84-bcd6-7ffb00b55e43`. Deposit date set by hand 2026-10-19 19:09:34, Stripe payment $418.24 processed 19:09:52, Reconciled written at the same second, no ledger date or deposit amount event. A second check in the same ticket (418561861, remittance `c7fb12fa-efb8-41b6-9cd8-2977d259529b`, payment specification `2e2ce4b8-0738-4ed6-9973-b475bcaed73f`) has the identical signature: deposit date set by hand 19:12:58, Reconciled 19:13:19.9 by the same user, Stripe payment $3,048.21 processed 19:13:19.4 with a transaction date of 2026-10-19; grid `PostingStatus` 6, null `LedgerDate` and `DepositAmount`.

The mechanism was established from the code and the event timing; it has not been reproduced in a test environment.

## Fix status
Not fixed. A product fix would publish the ledger date, deposit date and deposit amount events whenever the remittance has no ledger date (or no deposit amount), not only when the transaction date differs from the existing deposit date.

## Data correction side effect
Setting the ledger date can start auto-posting of claim payments that were waiting on it: in UF-17639 the claim payment posted about 2 seconds after `RemittanceLedgerDateUpdated` was written, and the remittance went to Posted. Check the claim payments on the check and tell the client before applying the correction. Order used: `deposit-amount`, then `ledger-date`.
