# Claim payments added to a check in a closed ledger month — check returns to Building and cannot post or be edited

## What happens
The system allows a claim payment to be added to a check whose ledger date falls in a month that is already hard-closed. The check can be fully Posted when the month closes. When a claim payment is later added to it, the check status is recomputed, the new claim payment makes the check unbalanced, and the status returns to Building (Blocked is evaluated before Posted). The ledger date is set once, the first time the check reaches Building, and is locked once a claim payment has posted, so it stays in the closed month. The new claim payments cannot post into the closed month. The check cannot be edited, and the FE disables post, edit and "..." actions because the ledger is closed. The client cannot work the check to complete its period close. Users can keep adding claim payments, and each addition moves the check further from balanced.

A check older than 6 months is not shown in the Remittance Posting workflow or in Bank Rec, so it can only be reached through the Payers pillar, and Bank Rec cannot be used to correct the ledger date.

## Detection signature
All of the following hold:
- Remittance (BE) stream `snowdrop-remittance->{organizationId}->remittance->{remittanceId}`: `RemittanceLedgerDateUpdated` fired once, with a `LedgerDate` inside a month that has since closed. A `RemittancePostingStatusUpdated` to 4 (Posted) precedes the close, and a `RemittancePostingStatusUpdated` to 6 (Building) follows it.
- Resources stream (`snowdrop-resources->{organizationId}->monthly-close->{id}`, filter `Data.CompanyId`): a `MonthClosed` event for that `Year`/`Month` whose `ts` is earlier than the `RemittanceClaimPaymentAdded` events described next.
- Remittance-processing stream: one or more `RemittanceClaimPaymentAdded` (each followed by `RemittanceClaimPaymentReviewed`) with `ts` after the `MonthClosed` `ts`, and a `RemittanceStatusChanged` to 6 shortly after the first of them. Claim payments added after the close are usually not posted. Other events after the close are `RemittanceAssigned` and `RemittanceDisputes`; none changes the check amount, deposit date or ledger date.
- Projection (`RemittanceProjection`): `Status` 6, `IsBalanced` false, `IsBlocked` true. The sum of `TotalPayment` over claim payments that are not `IsRemoved` differs from `CheckAmount`.
- Not this pattern: `HasAllInvoices` false, a blocking exception, or the check not reconciled also produce Building. Check these first (see `business-logic/CheckPostingStatus/CLAUDE.md`).

Enums: `CheckPostingStatus` 1 New, 3 Posting, 4 Posted, 6 Building, 7 Ready; `ClaimPostingStatus` 1 Ready, 2 Posting, 3 Posted, 4 Discarded, 5 Excluded, 6 Removed (`references/EventEnums.md`).

## Verify
1. Get the ledger date: query the Remittance (BE) stream, `ORDER BY c._ts ASC`, and read `RemittanceLedgerDateUpdated.Data.LedgerDate`. Also check the `snowdrop-remittance-events-manual` container if the event is not found.
2. Get the close: query `snowdrop-resources-events` with `StreamId LIKE "snowdrop-resources->{organizationId}->monthly-close->%" AND c.Data.CompanyId = "{companyId}"`. Do not add `ORDER BY c.Data.Year, c.Data.Month` (no composite index; the query fails); sort the results yourself, or use `ORDER BY c._ts`, or no `ORDER BY`. Take the `MonthClosed` for the ledger date's month.
3. Get the check's events: query `snowdrop-remittanceprocessing-events` with the prefix `LIKE "snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}%" AND c.Type = "e"`. List `RemittanceClaimPaymentAdded` events with `ts` after the close.
4. Compare. The pattern is confirmed when the check was Posted at the close and claim payments were added after it. Also confirm nothing else changed after the close (the event-type counts after the close show only the events listed above).
5. Download the remittance projection: `snowdrop-remittanceprocessing/Organizations/{organizationId}/Snowdrop-RemittanceProcessing-Runtime-Contracts-Remittances-RemittanceProjection/{remittanceId}.json` in the standard storage account (`references/blob_projections.md`; Claude Code with the `blob-projection-fetch` skill). Add up `TotalPayment` for claim payments that are not `IsRemoved`, and compare with `CheckAmount`.

## Fix (data correction by Ops)
Technical procedure; the claim payments to remove are those added after the close.

1. Identify every claim payment added after the close (step 3 above). Include the ones already discarded.
2. Edit a copy of the projection: set `IsDiscarded` and `IsRemoved` to `true` on each of them. Leave everything else alone, including the stored check-level values (`Status`, `IsBalanced`, `IsBlocked`, `IsBuilding`, `IsPosting`, `IsPosted`, `IsReady`); these are recomputed. Keep the file's line endings and indentation. Setting `IsDiscarded` alone is not enough, because the balance counts discarded claim payments and excludes only removed ones.
3. Before sending it, load the original and the edited file into the real `RemittanceProjection` type (a throwaway console harness in Claude Code) and confirm the edited file computes Status 4 (Posted) and `IsBalanced` true. The check balances when `CheckAmount == (sum of TotalPayment where not IsRemoved - reserved funds balance) - check adjustments`. Removing only the post-close claim payments restores the balance when the check was balanced at close.
4. Raise an Ops ticket with the edited file, naming the account, container and blob path and the claim payments changed. Ops replaces the blob. Production change: confirm before it is applied.
5. After Ops applies it, trigger a recompute by assigning the check and clearing the assignment in the FE. The FE shows the check correctly when it loads, because the values are recomputed on read. The stored `Status` still holds the old value until an event is written.
6. Confirm the recompute wrote events: a `RemittanceStatusChanged` to 4 on the remittance-processing stream (after the `RemittanceAssigned` events from the assign and clear), and a `RemittancePostingStatusUpdated` to 4 on the Remittance (BE) stream.

Side effect: the edit changes the remittance-processing projection only. The Gravity/ledger side is not changed by it and can differ from the projection; this was accepted for an old check on an earlier occurrence. The removed claim payments never posted, so no ledger postings need reversing in this variant. Confirm that none of them posted before removing them.

## Consequence variants
- Posted check pulled back to Building by claim payments added after the close (the case above).
- Partly posted check in a closed month with an outstanding claim payment that needs to post (reworked or reversed discard). Here the claim payment is real, so removing it may not be acceptable. The ledger date is locked, and there is no supported path to move the check to Posted; see `snowdrop-remittance-be` `business-logic/LedgerDateLocking/CLAUDE.md`. The correction above applies only if the outstanding claim payment is to be dropped; otherwise the decision is a product question.

## Confirmed occurrences
- UF-17254 (app): check 45178550, remittance `437efeca-c616-4cb3-b919-67988b7ef9f3`, org `8509ab2a-9a70-49a0-bc13-f8416dad1a87`, company `7de15cd9-3df9-4663-9fd9-8c0a93f516dd`. Ledger date 2026-08-14. August 2026 closed 2026-09-04T21:23:35Z with the check Posted. Six claim payments added by users between 2026-09-16 and 2026-10-07; the check returned to Building on 2026-09-16. Corrected with an edited projection applied by Ops in UF-17258 (`IsDiscarded` and `IsRemoved` set on the six); after assign and clear assignment the status event to Posted was written.
- UF-13324 (app): remittance `69f13a14-2c6d-4361-879f-9b356edf6e67`, org `358c390e-a8b1-4901-86b5-8c2ca909b1f3`, check 9792463576, ledger date 2022-07-28 (month closed). A discard was reversed after the close and another claim payment was added on 2026-04-15. Corrected by Ops with a projection edit (UF-15512), with the claim payments removed. The edited projection differs from Gravity; accepted because of the check's age.
- Related, not the same trigger: UF-16266 (app): remittance `54d7d48a-78cc-4707-af0c-de80a2efb088`, check 175596587, ledger date 2022-05-20 inside a hard-closed period, a discarded claim payment repeatedly reworked. The check is partly posted, in Building, with no supported path to Posted.

## Fix status
Not fixed in the product. The system still accepts claim payments on a check whose ledger date is in a closed month. Each occurrence is corrected as a data fix. A product fix would block adding or reviewing claim payments on a check with a locked ledger date in a closed month, or give the check a supported way to move to an open month. Not yet scoped.
