# Check Posting Status — how a check's status (Building, Posted, ...) is derived from its claim payments

## What this covers

A check (remittance) status in this repo is computed, never set directly. It is derived from the check's reconciliation state, its claim payments, its reserved funds, its exceptions and its balance. The logic is the `Status` property of `CheckPayment` (`src/runtime/Contracts/Remittances/CheckPayment.cs`). The enum values are `Unknown, New, Reconciled, Posting, Posted, Empty, Building, Ready, Discarded, Archived`; the numeric values are in `snowdrop-remittance-be`'s `references/cosmos_query.md`.

## Key concepts / vocabulary

- **Blocked:** any of — the check is not reconciled; a claim payment that is not discarded or removed has no invoice; the check has a blocking exception; the check is not balanced.
- **Balanced:** `CheckAmount == (total claim payments - reserved-funds balance) - check adjustments amount`.
- **Empty:** the check has no claim payments and no reserved funds.

## Status precedence

The first matching row wins.

| Order | Condition | Status |
|---|---|---|
| 1 | Archived | Archived |
| 2 | Discarded | Discarded |
| 3 | Not reconciled | New |
| 4 | Empty, reconciled, balanced, and check adjustments non-zero | Posted |
| 5 | Empty | Empty |
| 6 | Blocked | Building |
| 7 | Every claim payment is posted, discarded or removed, and no reserved funds are pending or ready | Posted |
| 8 | Some claim payments are posted or posting, but not all are posted, posting, discarded or removed (or reserved funds are posting) | Posting |
| 9 | Otherwise | Ready |

## Known gotchas / non-obvious behavior

### Building takes precedence over Posted
Blocked is evaluated before Posted. A check whose claim payments are all posted returns to Building if it becomes blocked, for example when a claim payment is reworked and the check stops balancing or gains a blocking exception. Status therefore moves back and forth over a check's life, and a check showing Building may have been Posted before.

### Posted requires every claim payment to be finished
A check reaches Posted only when each claim payment is posted, discarded or removed. One claim payment that cannot post keeps the whole check out of Posted, even if all others have posted. Discarding that claim payment, or removing it, is what lets the check reach Posted.

### Posting is the expected status for a partly posted check
A check with at least one posted claim payment and at least one claim payment that is not posted, posting, discarded or removed shows Posting. This is the correct computed status, not a hang. The unposted claim payment is Ready (not yet submitted for posting), so the check stays Posting until that claim payment posts, is discarded, or is removed. Ready is the fallback status: the check is reconciled and not blocked, and no claim payment has posted or started posting.

### Posting implies the check is not blocked
Blocked (row 6) is evaluated before Posting (row 8). A check showing Posting therefore was not blocked when its status was last computed: it is reconciled, every live claim payment has an invoice, there is no blocking exception, and it is balanced. If a claim payment stays unposted on a Posting check, the cause is not one of those blockers.

### A check cannot be archived once any claim payment has posted
`CanArchive()` is true only when the check is not already archived, no claim payment is posted, and the reserved funds can be archived. A check with even one posted claim payment cannot be archived and recreated. The way out is to post, discard or remove each remaining claim payment.

## Investigation workflow

1. Get the check's status history from `snowdrop-remittanceprocessing-events` (`RemittanceStatusChanged`) and, for the same check, the `snowdrop-remittance` stream (`RemittancePostingStatusUpdated`).
2. If the check is Building, find which blocker applies: reconciled, every live claim payment has an invoice, no blocking exceptions, balanced.
3. If the check is Posting, find the claim payment that is not yet posted. A `RemittanceClaimPaymentsArePosting` event lists the claim payments submitted for posting; a claim payment that never appears in one was never submitted, and no posting failure is expected for it. Compare it with the claim payments that did post (reviewed, claim and charge linked, not disputed, not excluded from posting) to see what differs.
4. `RemittanceClaimPaymentsHaveFailedPosting` events show a post attempt that did not complete.
5. `GET /snowdrop/remittanceprocessing/orchestration/remittance/{remittanceId}/isevaluating` (and the `claimpayment/{claimPaymentId}/isevaluating` variant) returning `false` rules out an evaluation that is still running. A 404 from the matching `state` route means no orchestration entity currently exists. See `../../references/api-calls.md`.
6. For a ledger-date error on a check in a closed period, see `../../../snowdrop-remittance-be/business-logic/LedgerDateLocking/CLAUDE.md`.

## Where to look for more
- `../../../snowdrop-remittance-be/business-logic/LedgerDateLocking/CLAUDE.md` — why a locked ledger date plus an unposted claim payment leaves a check unable to reach Posted.
- `../../references/cosmos_query.md` — stream map and queries for status events.
