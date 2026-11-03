# Company change leaves the ledger date in a closed month — cross-reference, the full entry is in remittance (BE)

## What happens
A check whose company was changed after its ledger date was set can have a ledger date before the new company's closed-month cutoff. In this repo, `CompanyMediator.IsLedgerClosed` (`cutoff > LedgerDate`) is then true, `GET /snowdrop/remittanceprocessing/remittances/{id}` returns `isLedgerClosed: true`, and the check cannot be posted. It is also missing from the Bank Rec reconciled list. The defect code is in remittance (BE): `UpdateCompanyId` and `GridItemChangesMediator` publish only `RemittanceCompanyIdUpdated`. The full entry (detection, month-close query, data correction) is kept in remittance (BE), because the cause is in that service's stream:

`../../../snowdrop-remittance-be/known-failures/company-change-leaves-ledger-date-in-closed-month/CLAUDE.md`

## Detection signature
In this repo's data nothing looks wrong: claim payments are added and reviewed, there are no posting events, and the status stays at Ready (7) or Building. The signal is `isLedgerClosed: true` on the remittance response for a check that has never posted. Confirm in the Remittance (BE) stream: a `RemittanceCompanyIdUpdated` after the last `RemittanceLedgerDateUpdated`.

Not `claim-payments-added-to-check-in-closed-ledger-month`: there the check was Posted before the month closed and returns to Building when a claim payment is added afterwards, and no company change is involved.

## Confirmed occurrences
- UF-17855 (app): remittance `b88dc070-81ca-4d8c-babc-9936749918f9`, organization `8509ab2a-9a70-49a0-bc13-f8416dad1a87`.

## Fix status
Not fixed. See the full entry.
