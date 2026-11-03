# Company change leaves the ledger date in a closed month — the check cannot post and drops out of Bank Rec

## What happens
A remittance's ledger date is calculated for the company it has at that moment (see `../../business-logic/LedgerDateCalculation/CLAUDE.md`). Changing the company afterwards publishes only `RemittanceCompanyIdUpdated`; the ledger date is not recalculated. When the new company's most recent closed month is later than the old company's, the ledger date is before the new company's cutoff. The check then:
- is missing from the Bank Rec reconciled list (it keeps only `LedgerDate >= cutoff`);
- has `isLedgerClosed: true` in remittance processing (`cutoff > LedgerDate`), so it cannot be posted;
- stays in its status (Ready in UF-17855) and cannot be worked from Bank Rec or Remittance Posting.

## Detection signature
- Remittance (BE) stream: a `RemittanceLedgerDateUpdated` with date L, then a `RemittanceCompanyIdUpdated`, and no `RemittanceLedgerDateUpdated` after it.
- `snowdrop-resources` / `snowdrop-resources-events`: the new company's most recent `MonthClosed` gives a cutoff (first day of the next month) later than L. Use `STARTSWITH` without `ORDER BY`; ordering across partitions fails through the Azure MCP tool:
```sql
SELECT c.EventNumber, c.ts, c.Data.CompanyId, c.Data.Year, c.Data.Month, c.Data.ClosedOn
FROM c
WHERE STARTSWITH(c.StreamId, "snowdrop-resources->{organizationId}->monthly-close->")
  AND c.EventType = "MonthClosed"
  AND c.Data.CompanyId IN ("{oldCompanyId}", "{newCompanyId}")
  AND c.Data.Year >= {year}
```
- Readers: the check is absent from `GET /remittance/reconciliation/reconciled-checks`, and `GET /snowdrop/remittanceprocessing/remittances/{id}` returns `isLedgerClosed: true`.

## Not to be confused with
`../../../snowdrop-remittance-processing-be/known-failures/claim-payments-added-to-check-in-closed-ledger-month/CLAUDE.md`: there the check was already Posted when the month closed and returns to Building when a claim payment is added later. No company change is involved and the ledger date is not changed.

## Data correction
Confirmed on `app` for UF-17855. Needs: no posted claim payments (and no posted reserved funds when the deployed build has that guard), and the user's go-ahead for the call (`ticket-workflow` skill, "Data fixes").
- Call: `POST https://api.unlimitedfinancials.{env}/remittance/reconciliation/deposit-date` with `{"remittanceId": "<id>", "depositDate": "<first open date>"}`, the date as `YYYY-MM-DD`, on or after the new company's cutoff. Send it from a signed-in application tab (`snowdrop-api-calls` skill, "In-page `fetch`").
- Effect: `RemittanceDepositDateUpdated`, then `RemittanceLedgerDateUpdated` with the calculated date (the cutoff when the date is in a closed month). The deposit date changes.
- Alternative, not used so far: `POST .../reconciliation/ledger-date` with `{"remittanceId": "<id>", "ledgerDate": "<date>"}` leaves the deposit date alone, but it has no guard and no calculation.
- Restoring the original deposit date with a second deposit-date call is expected to keep the ledger date at the cutoff (the calculation returns the cutoff for a closed-month date). Not tested.
- Validate with read-only reads: two new events on the stream, `isLedgerClosed: false`, and the check in the reconciled list with the new `ledgerDate`. Posting the claim payments is a separate step.

## Confirmed occurrences
- UF-17855 (app): remittance `b88dc070-81ca-4d8c-babc-9936749918f9`, organization `8509ab2a-9a70-49a0-bc13-f8416dad1a87`, in `snowdrop-remittance-events-manual`. Created 2026-10-07T10:14:57Z under company `7de15cd9-3df9-4663-9fd9-8c0a93f516dd` with ledger date 2026-09-28 (that company's September closed 2026-10-08). Changed about 100 seconds later to company `f81d3313-0d60-4545-8553-4bb6445c8b2f`, whose September closed 2026-10-06 (cutoff 2026-10-01). Corrected 2026-11-04 with deposit date 2026-10-01; response 200; ledger date 2026-10-01.

## Fix status
Not fixed. Proposed: recalculate the ledger date in both company-change paths through `DepositAndLedgerDateMediator`, or reject a company change that would leave the ledger date before the new company's cutoff. A follow-up ticket was requested from UF-17855.
