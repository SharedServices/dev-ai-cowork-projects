# Credit card payment reconciles a check without a ledger date or deposit amount — cross-reference, the full entry is in remittance processing

## What happens
A Credit-type check is reconciled by the Stripe payment handler in this service, and the handler skips the deposit date, deposit amount and ledger date events when the user has already set the same deposit date by hand. The check is Reconciled (then Building, Ready) with a null `LedgerDate` and a null `DepositAmount`. The defect code is here: `PaymentsEventHandler` in `Snowdrop.Remittance.Consumers` and `DepositAndLedgerDateMediator.PublishEventsOnAssistanceUpdated` in `Snowdrop.Remittance.Runtime`. The full entry (detection, verification across the Remittance (BE) events, payments stream and credit card payments blob, and data correction) is kept in the remittance processing repo, because that is where an investigation of the Remittance Posting workflow usually starts:

`../snowdrop-remittance-processing-be/known-failures/credit-card-payment-reconciles-check-without-ledger-date-or-deposit-amount/CLAUDE.md`

## Detection signature
In this repo's data: the Remittance (BE) stream has a user-written `RemittanceDepositDateUpdated`, then a user-written `RemittancePostingStatusUpdated` to 2 (Reconciled), and no `RemittanceLedgerDateUpdated` or `RemittanceDepositAmountUpdated` event. The grid record in `snowdrop-remittance-data` has a null `LedgerDate` and an invalid, null `DepositAmount`.

A check that is not `New` is not returned by the Pending Checks tab. `GetUnreconciledChecks` returns only grid records with `PostingStatus` 1 that are not discarded, so a reconciled check is missing from Pending Checks by design; look in the reconciled list (`GetReconciledChecks`) instead.

## Confirmed occurrences
- UF-17639 (app): remittance `518675b4-8389-4ae4-90f2-700121935ab5`.

## Fix status
Not fixed. See the full entry.
