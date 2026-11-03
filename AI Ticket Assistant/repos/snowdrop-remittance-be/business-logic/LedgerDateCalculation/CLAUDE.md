## Ledger date calculation — how a remittance's LedgerDate comes from its deposit date and the company's closed months

### What this covers
How `RemittanceLedgerDateUpdated` gets its date, which actions recalculate it, and which readers use it. A deposit date in a closed month is allowed on purpose; the ledger date is what moves to the first open day. Source: `snowdrop-remittance-be` (`DepositAndLedgerDateMediator`, `IRecordProjectionsCacheAccess.CompanyMonthClosures`, `RemittanceReconciliationController`, `GridItemChangesMediator`) and `snowdrop-remittance-processing-be` (`CompanyMediator`).

### Key concepts / vocabulary
- **Cutoff (per company):** the first day of the month after the company's most recent closed month (`CalculateRemittanceCutoffDate`). `Date.MinValue` when the company has no closed month. A closed month is a `MonthClosed` event in `snowdrop-resources` (see `../../../snowdrop-resources-be/references/cosmos_query.md`), held in the `CompanyMonthClosures` cache.
- **Ledger date:** `CalculateLedgerDate(depositDate, companyId)` returns the deposit date when it is on or after the cutoff, otherwise the cutoff.
- **Readers of the cutoff:** the Bank Rec reconciled list keeps only checks with `LedgerDate >= cutoff`; remittance processing's `IsLedgerClosed` is `cutoff > LedgerDate`.

### Known gotchas / non-obvious behavior

#### Only a few actions recalculate the ledger date
On creation (payer, deposit date and company present, status Reconciled), and in `PublishEventsOnUpdated` when the deposit date changes or the status is set to Reconciled (with a deposit date, a status other than New, and a company). No recalculation when a month is closed was found in the code read, so a check that already has a ledger date keeps it.

#### A company change does not recalculate the ledger date
`POST reconciliation/company-id` (`UpdateCompanyId`) and the grid edit `companyid` (`GridItemChangesMediator`) publish only `RemittanceCompanyIdUpdated`. A ledger date calculated for the old company can be before the new company's cutoff. Both paths refuse only when claim payments are posted. See `../../known-failures/company-change-leaves-ledger-date-in-closed-month/CLAUDE.md`.

#### A deposit-date change to the current value does nothing
The mediator compares the new deposit date with the current one. The same date publishes no events, so the ledger date is not recalculated.

#### `POST reconciliation/ledger-date` has no guard and no calculation
It publishes `RemittanceLedgerDateUpdated` with the date it is given. There is no closed-month check, no posted-claims check and no status check.

#### Deposit-date change guard
`DepositDateChangeGuard` refuses a deposit-date change when claim payments are posted. The branch `features/UF-17845-reserved-funds-posted-guard-on-deposit-date` also refuses it when reserved funds are posted; `develop` does not.

#### The credit card (assistance) path does not adjust for closed months
`PublishEventsOnAssistanceUpdated` publishes the ledger date as the deposit date itself, not through `CalculateLedgerDate`. Seen in the code; not tested against a closed month.

#### This differs from `references/cosmos_query.md`
`../../references/cosmos_query.md` says `RemittanceLedgerDateUpdated` fires once, the first time `PostingStatus` reaches Building. The code above publishes it on creation and at each deposit-date change (and on Reconciled). Resolve the difference before relying on either statement.

### Investigation workflow
1. Read the remittance events (check both `snowdrop-remittance-events` and `snowdrop-remittance-events-manual`). Note `RemittanceCreatedEvent.CompanyId` and `DepositDate`, every `RemittanceLedgerDateUpdated`, and every `RemittanceCompanyIdUpdated`, in order.
2. Read the `MonthClosed` events for the companies involved and work out each company's cutoff.
3. Compare the last `LedgerDate` with the current company's cutoff. If it is earlier, the check is missing from the Bank Rec reconciled list and `isLedgerClosed` is true in remittance processing. If a company change came after the last ledger date event, it is the known failure above.
4. Check the readers: the check's entry in `GET /remittance/reconciliation/reconciled-checks` (`ledgerDate`) and `GET /snowdrop/remittanceprocessing/remittances/{id}` (`isLedgerClosed`).

### Where to look for more
- `../LedgerDateLocking/CLAUDE.md` — a ledger date that does not change after the first posting.
- `../../known-failures/company-change-leaves-ledger-date-in-closed-month/CLAUDE.md` — the defect this logic produces.
- `../../../snowdrop-remittance-processing-be/known-failures/claim-payments-added-to-check-in-closed-ledger-month/CLAUDE.md` — a different closed-month failure: a check already Posted when the month closed returns to Building.
- `../../references/cosmos_query.md` and `../../references/EventEnums.md` — event mechanics and the `PostingStatus` values.
