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

**`RemittanceLedgerDateUpdated` fires once, the first time `PostingStatus` reaches Building (6) — not at intake, and not re-fired on any later status change,** confirmed by tracing one remittance end-to-end (UF-16266: fired 3 days after intake, before any claim payment had actually posted, then never fired again across 16+ months of further `PostingStatus` cycling).

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
