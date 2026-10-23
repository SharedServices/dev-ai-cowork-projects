# Duplicate Check Handling — duplicate checks are detected and annotated, never removed automatically

## What this covers

How remittance (BE) detects and records duplicate checks (for example from repeat or reprocessed ERA files). Detection and recording only: there is no automatic removal, suppression, or exclusion of duplicates from any grid, list, or downstream call. A duplicate still counts as a fully separate pending or reconciled check. The system only writes, on each grid item, the ids of the other remittances that share its check number; a person discards the extras through the existing discard endpoints. Source: the repo's `Documentation/Duplicate Handling.md`, copied unchanged to `references/Duplicate Handling.md`. It describes behavior as of that document; it is not a design spec.

## Key concepts / vocabulary

- **Duplicate** — a check with the same `CheckNumber` (case-insensitive) as another check in the same organization, where both are not discarded (`IsDiscarded == false`).
- **`CheckNumberDuplicates`** — `Guid[]` on every `RemittanceCheckGridItem` (read-model container `snowdrop-remittance-data`): the remittance ids of the other active checks with the same check number.
- **`DuplicateCheckNumberRequest(OrganizationId, CheckNumber)`** — queue message on the `remittance-duplicate-check` storage queue that triggers a recompute for one check number.
- **`DuplicateNumberCheckTrigger`** — Azure Function that consumes that queue and calls `UpdateDuplicateChecks` for the one `(org, checkNumber)` pair.
- **`DuplicateCheckScanner`** — one-off cross-partition backfill in the DeploymentJob.

## Known gotchas / non-obvious behavior

### Only the check number is compared
`CheckDate`, `CheckAmount`, `PayerId`, and `PostingStatus` are not part of the match. Two remittances with the same check number and different amounts or dates are flagged as duplicates of each other.

### No original is chosen
No member of a duplicate group is marked canonical (by earliest received, ERA sequence, or any other rule). Every member lists its siblings.

### Discarded checks drop out of the group
Once `IsDiscarded = true`, a check disappears from every other member's `CheckNumberDuplicates` and no longer causes matches. Discarding triggers a recompute for the check number, so the remaining members' lists shrink.

### Grid endpoints do not use the field
`GET /remittance/reconciliation/pending-checks` returns everything with `PostingStatus == New && !IsDiscarded`. It does not filter, hide, or paginate on `CheckNumberDuplicates`. The field is returned to the frontend through `CheckGridItemResponse.FromGrid` for display only.

### Recompute is a fan-out of single writes, and is skipped when already correct
For an N-member group, `UpdateDuplicateChecks` writes N grid items one at a time through `ConcurrentDocumentUpdateAsync` (optimistic concurrency retry). A write is skipped when the array is already correct.

### A recompute is queued on three events
`CheckGridEventHandlers` enqueues `DuplicateCheckNumberRequest` when a grid item is created (normal ERA-inbound path), when a check number is corrected (`RemittanceCheckNumberUpdated`; both the old and the new number are enqueued), and when discard state changes (`RemittanceDeletedEvent`, `RemittanceDiscardedDeletedEvent`). A stale `CheckNumberDuplicates` on a grid item points at a missed or failed queue message or Function run.

### No endpoint discards a duplicate group
`POST /remittance/reconciliation/discard` (single, `{ RemittanceId, IsDeleted }`) and `POST /remittance/reconciliation/discard-multiple` (`{ RemittanceIds[], IsDeleted }`) take remittance ids only. Both refuse a remittance with `HasPostedClaimPayments`; `discard` also refuses when the remittance is already in the requested state; `discard-multiple` collects per-id failures into a response string instead of failing the batch. `POST /remittance/support/remittance/{remittanceId}/restore-discarded` undoes a discard. Choosing which duplicates to keep happens outside the API: read `CheckNumberDuplicates` from the grid items or query Cosmos, then call `discard-multiple` with the rest.

### The backfill is not continuous
`DuplicateCheckScanner` groups every non-discarded check by `(OrganizationId, CheckNumber)` across partitions, keeps groups with `COUNT > 1`, and calls `UpdateDuplicateChecks` for each. It appears to be a migration tool for populating the field on pre-existing data. It discards nothing.

## Tracing this in Splunk

No log lines for this logic have been confirmed. The queue name `remittance-duplicate-check` and the Function name `DuplicateNumberCheckTrigger` are the terms to search on. Namespace: see `references/namespaces.md`. The Function App hosting `DuplicateNumberCheckTrigger` is not confirmed in this workspace (see the repo `CLAUDE.md` Identity section).

## Investigation workflow

1. Query `snowdrop-remittance-data` for `RemittanceCheckGridItem` documents in the organization with the check number; read `IsDiscarded`, `PostingStatus`, and `CheckNumberDuplicates` on each.
2. If the lists are missing or wrong, check the remittance events (`snowdrop-remittance-events` and `snowdrop-remittance-events-manual`) for the creation, `RemittanceCheckNumberUpdated`, and discard events, then look for the queue message and `DuplicateNumberCheckTrigger` run for that `(org, checkNumber)`.
3. If a duplicate is in the pending grid, that is expected until someone discards it. Confirm none of the copies has posted claim payments before suggesting `discard` or `discard-multiple`.
4. The auto-reconcile rule for zero-amount checks also checks for another active check with the same number; see `../EraEdiParsing/CLAUDE.md` (flow step 9).

## Where to look for more
- `references/Duplicate Handling.md` — the source document, unchanged.
- `../../references/api-calls.md` — discard and restore endpoint calls.
- `../../references/cosmos_query.md` — Cosmos queries for this repo.
- `../EraEdiParsing/CLAUDE.md` — the ERA-inbound path that creates the grid items.
