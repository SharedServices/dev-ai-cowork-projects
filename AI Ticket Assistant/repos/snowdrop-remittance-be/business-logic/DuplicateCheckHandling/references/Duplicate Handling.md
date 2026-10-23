# Duplicate Check Handling

This describes how remittance-be detects and handles duplicate checks (e.g. from repeat/reprocessed ERA files from Change Healthcare or other payers). It is a reference for how the system behaves today, not a design spec.

## Bottom line

Duplicate handling is **detection and recording only. There is no automatic removal, suppression, or exclusion of duplicates from any grid, list, or downstream call.** A duplicate check number still counts as a fully separate pending/reconciled check in every respect — the only thing the system does is annotate each grid item with the ids of the other remittances that share its check number, so a human can go discard the extras through the existing discard endpoints.

## What counts as a "duplicate"

Match key: **`CheckNumber` (case-insensitive), within the same organization, among checks not yet discarded** (`IsDiscarded == false`). See `GetActiveChecksByCheckNumber` in [RemittanceCheckGridItemRepository.cs](../src/Snowdrop.Remittance.Runtime/Repositories/RemittanceCheckGridItemRepository.cs).

This is a narrow definition:
- **Only the check number is compared.** `CheckDate`, `CheckAmount`, `PayerId`, and `PostingStatus` are not part of the match — two remittances with the same check number but different amounts/dates are still flagged as duplicates of each other.
- **Already-discarded checks are excluded from the comparison set.** Once a check is discarded (`IsDiscarded = true`), it drops out of everyone else's `CheckNumberDuplicates` list and no longer causes new matches.
- **No concept of "the original."** The system does not decide which member of a duplicate group is canonical — it just lists sibling remittance ids on every member of the group. Nothing marks a preferred/authoritative one by earliest-received date, ERA sequence, or any other rule.

## Where duplicate detection lives

### Data: `CheckNumberDuplicates` field
Every `RemittanceCheckGridItem` (the pending/reconciled grid projection, Cosmos container behind the `snowdrop-remittance` database) carries a `Guid[] CheckNumberDuplicates` field — the remittance ids of other active checks sharing its check number. See [RemittanceCheckGridItem.cs](../src/Snowdrop.Remittance.Model/Reconciliation/RemittanceCheckGridItem.cs). It's surfaced to the frontend via `CheckGridItemResponse.FromGrid`, so the grid UI can display/flag it — but the grid endpoints themselves do not filter, hide, or paginate based on it.

### Recompute logic: `RemittanceCheckGridItemRepository.UpdateDuplicateChecks`
```
GetActiveChecksByCheckNumber(org, checkNumber)
  → group all active checks with that check number
  → for each one, set CheckNumberDuplicates = the other members' RemittanceIds
  → skip the write if the array is already correct (no-op diffing)
```
Writes go through `ConcurrentDocumentUpdateAsync` (optimistic concurrency retry), one grid item at a time — this is a fan-out of N writes for an N-member duplicate group, not a single batch operation.

### Trigger points — when a recompute is queued
[CheckGridEventHandlers.cs](../src/Snowdrop.Remittance.Services/RemittanceReconciliation/CheckGridEventHandlers.cs) enqueues a `DuplicateCheckNumberRequest(OrganizationId, CheckNumber)` message onto the `remittance-duplicate-check` storage queue whenever:
- A new grid item is created (on the initial remittance-created event handlers) — the normal ERA-inbound path.
- A check number is corrected (`RemittanceCheckNumberUpdated`) — enqueues **both** the old and new check numbers, since both groups may have changed.
- A remittance's discard state changes (`RemittanceDeletedEvent` / `RemittanceDiscardedDeletedEvent`) — because removing a member from the active set can change everyone else's duplicate list.

Each queue message is consumed by the **`DuplicateNumberCheckTrigger`** Azure Function ([DuplicateNumberCheckTrigger.cs](../src/Snowdrop.Remittance.Functions.DuplicateNumberCheck/Functions/DuplicateNumberCheckTrigger.cs)), which just calls `UpdateDuplicateChecks` for that one `(org, checkNumber)` pair. So detection is event-driven and incremental — it doesn't rescan the whole org on every check.

### One-off backfill: `DuplicateCheckScanner`
[DuplicateCheckScanner.cs](../src/Snowdrop.Remittance.DeploymentJob/DuplicateCheckScanner/DuplicateCheckScanner.cs), run from the DeploymentJob, does a **cross-partition** Cosmos query (not scoped to one org) grouping every non-discarded check by `(OrganizationId, CheckNumber)`, keeping groups with `COUNT > 1`, then calls `UpdateDuplicateChecks` for each. This looks like a migration/backfill tool — e.g. to populate `CheckNumberDuplicates` for pre-existing data after the field was introduced — rather than something that runs continuously. It doesn't discard anything either; same detection-only behavior as the queue-driven path.

## What actually removes a check from a grid

The pending-checks endpoint (`GET /remittance/reconciliation/pending-checks`) returns everything where `PostingStatus == New && !IsDiscarded`. The only way to remove a check from that result set is to flip `IsDiscarded = true`, which happens through:

- **`POST /remittance/reconciliation/discard`** — single remittance, body `{ RemittanceId, IsDeleted }`. Blocked if the remittance `HasPostedClaimPayments` (can't discard something with posted claims), and if it's already in the requested discard state.
- **`POST /remittance/reconciliation/discard-multiple`** — batch variant, body `{ RemittanceIds[], IsDeleted }`. Same posted-claims guard per remittance; failures for individual ids are collected into a response string rather than failing the whole batch.
- **`POST /remittance/support/remittance/{remittanceId}/restore-discarded`** — undoes a discard (safety net).

None of these three accept a check number or duplicate-group id — the caller has to already know which `RemittanceId`s to discard. There is no "discard all but one of this duplicate group" helper endpoint; that selection has to happen outside the API (e.g. read `CheckNumberDuplicates` off the grid items, or query Cosmos directly, decide which to keep, then call `discard-multiple` with the rest).

## Summary

| Question | Answer |
|---|---|
| Are duplicates detected? | Yes — by exact (case-insensitive) check number match within an org, among active (non-discarded) checks. |
| Are duplicates automatically discarded/removed? | No. |
| Does the system pick which duplicate to keep? | No — no concept of an authoritative/original record exists. |
| Where is duplicate info exposed? | `CheckNumberDuplicates` field on each grid item, returned by the grid APIs. |
| How do you actually remove a duplicate? | Discard it via `discard` / `discard-multiple`, blocked only if it has posted claim payments. |
