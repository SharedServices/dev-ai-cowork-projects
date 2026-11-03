# Remittance (BE) — Cosmos query recipes and confirmed facts

Repo-specific content — generic cross-service mechanics (envelope shape, StreamId conventions, auth) live in the `cosmos-query` skill instead, since those apply to every service, not just this repo.

Full event schemas (every event class, property, enum): `references/Events.md`.

Database: `snowdrop-remittance` (dedicated — **do not confuse with `snowdrop-remittanceprocessing`**, a completely separate service/database, confirmed distinct 2026-07-07; matches the two different namespaces in the project's top-level `references/namespaces.md`: "Remittance (BE)" vs "Remittance processing"). Container: `snowdrop-remittance-events`, plus a second container `snowdrop-remittance-events-manual` that is **structurally identical** (per James, 2026-07-07) — not a "manual entry" log as originally guessed. Same event types route to either container depending on which entities they target, and which one an event lands in isn't predictable from `EventType` alone — check both when tracing an entity. Also has `snowdrop-remittance-lease` (Change Feed processor lease storage — standard Cosmos pattern, seen on `snowdrop-resources` too) and `snowdrop-remittance-data` (a read-model/projection container, not raw events — see this repo's `CLAUDE.md` Streams section).

Aggregate-type segment: `remittance`.

**StreamId:** `snowdrop-remittance->{organizationId}->remittance->{remittanceId}`

## Look up a remittance (BE) event feed
```sql
SELECT * FROM c
WHERE c.StreamId = "snowdrop-remittance->{organizationId}->remittance->{remittanceId}"
  AND c.Type = "e"
ORDER BY c._ts ASC
```

## Key facts

**`LedgerDate` lives here, not on remittance-processing.** Confirmed via `RemittanceLedgerDateUpdated` (`Data.LedgerDate`). This is the field to check against month-close eligibility (see `cosmos-query` skill's `services/resources.md` for `MonthClosed`) — remittance-processing has no equivalent field. **For the business rule governing when this field is expected to change (and when a frozen value is/isn't meaningful), see this repo's own business-logic rules on Ledger Date Locking** — that's a platform-behavior fact true regardless of which system surfaces the date (Cosmos, blob, or FE).

**`PostingStatus` enum (confirmed 2026-08-25, UF-16266, via James — source: `CheckPostingStatus`):**
`0 Unknown, 1 New, 2 Reconciled, 3 Posting, 4 Posted, 5 Empty, 6 Building, 7 Ready, 8 Discarded, 9 Archived`.
**Correction:** an earlier version of this doc claimed `6` meant "fully posted" — that's wrong. `6` is
**Building**; `4` is **Posted**. `PostingStatus` is not monotonic — in the one case traced end-to-end
(UF-16266), the check cycled New → Reconciled → Building → Posted → Building → Posted → Building →
Posting → Building → Posting → Building over 16+ months. Don't assume a check currently showing Building
or Posting has never reached Posted before.

**`RemittanceLedgerDateUpdated` is published by `DepositAndLedgerDateMediator`, not by a change to Building (6).** It is published at creation when the check is created Reconciled with a payer, deposit date and company (UF-17855: event 1, same timestamp as `RemittanceCreatedEvent`), and again whenever the deposit date changes or the status is set to Reconciled (UF-17855: event 8, same timestamp as `RemittanceDepositDateUpdated`). A company change does not publish it. The date is the deposit date, or the company's first open day when the deposit date is in a closed month; see `business-logic/LedgerDateCalculation/CLAUDE.md`. UF-16266 traced one remittance where it fired once, 3 days after intake and before any claim payment posted, and never again over 16+ months of `PostingStatus` cycling. That fits a single Reconciled transition with no later deposit-date change, and does not show a Building trigger.

**Top-level fields confirmed on `RemittanceCreatedEvent`:** `RemittanceId`, `PostingStatus`, `CheckNumber`, `CheckDate`, `CheckAmount`, `PayerId`, `CompanyId`, `DepositDate`, `DepositAmount`, `RemittanceCheckReceivedDate`, `PayerLiteral`, `RemittanceMessage` (full 835-style payload — claims/services/adjustments), `CheckSource`, `PaymentType`, `ReportId`. `CheckAmount` is a **snapshot, set once at creation** — no event updates it later; if it needs to change, look for a `RemittanceCreatedEvent`-adjacent correction event rather than assuming any existing event type carries a revision. `DepositAmount` may stay `null` even after `DepositDate` is set (`RemittanceDepositDateUpdated`) — the two aren't set together.

**Attachment references here don't use the blob-pointer shape.** `RemittancePerClaimEobRemittancePdfAttachmentsUpdated` references PDF EOBs by `AttachmentId` + `FileName` only — no `Container`/`DocumentPath` pair like the charge-master blob pattern (see `cosmos-query` skill's main `SKILL.md`, *Business payload can be a pointer*). Don't assume that shape generalizes to every attachment reference.

## Unreconciled-check detection query

Count of unreconciled (pending) checks for an org, `snowdrop-remittance-data` container:
```sql
SELECT count(root) FROM root
WHERE root["PostingStatus"] = 1
  AND NOT (IS_DEFINED(root["IsDiscarded"]) AND root["IsDiscarded"] = true)
  AND root["Partition"] = "RemittanceCheckGridItem/{organizationId}"
```
This query result alone doesn't tell you whether a backlog is a problem — month-close status from `snowdrop-resources` matters too.

## Read the grid record (check header) for one remittance

The Bank Rec / Pending Checks / Reconciled lists are served from `snowdrop-remittance-data`, not from the event stream. One document per remittance, id `RemittanceCheckGridItem_{remittanceId}`, partition `RemittanceCheckGridItem/{organizationId}`:
```sql
SELECT * FROM c
WHERE c.Partition = "RemittanceCheckGridItem/{organizationId}"
  AND c.id = "RemittanceCheckGridItem_{remittanceId}"
```
Useful fields: `PostingStatus`, `IsDiscarded`, `LedgerDate`, `PaymentType.CurrentValue`, `DepositDate`/`DepositAmount` (`CurrentValue`, `IsInvalid`, `LastModifiedBy`), `PostedAmount`, `DiscardedAmount`, `UnappliedAmount`.

**Which tab a check is in** (`RemittanceCheckGridItemRepository`): Pending Checks (`GetUnreconciledChecks`) returns only `PostingStatus` 1 (New) that are not discarded. Reconciled (`GetReconciledChecks`) returns `PostingStatus` 2, 5, 7, 6, 3 and 4 (Reconciled, Empty, Ready, Building, Posting, Posted). A check that is reconciled therefore never appears in Pending Checks.

**Ledger date and deposit amount are published by the mediator, not by the status change.** `DepositAndLedgerDateMediator` publishes `RemittanceLedgerDateUpdated` together with the deposit date / Reconciled status on the user Reconcile path, but the credit card (Stripe) path publishes the deposit date, deposit amount and ledger date only when the transaction date differs from the existing deposit date. See the remittance processing known failure `credit-card-payment-reconciles-check-without-ledger-date-or-deposit-amount`.
