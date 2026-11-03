# Remittance Processing — Cosmos Event Stream

Database: `snowdrop-remittanceprocessing` (dedicated). Container: `snowdrop-remittanceprocessing-events`.

Full event schemas (every event class, property, enum): `references/Events.md` (this repo folder's own copy)

**Only carries workflow dates.** The fields present are `AssignedToDate`, `ReviewedDate`, `PostedDate`, `DiscardedDate`, `ReversalDate` — there is no `LedgerDate` field anywhere in this stream (confirmed by exhaustive scan 2026-07-17). For ledger-period / month-close eligibility questions, query `snowdrop-remittance` (BE) instead. Don't confuse the two services; they're separate databases confirmed distinct 2026-07-07.

## Stream map (confirmed 2026-07-28, from source-derived event documentation)

This service writes **six** streams, all in the one container above — don't assume "remittance-processing" means only the Remittance stream:

| Stream | Format | Events (examples) |
|---|---|---|
| Remittance | `snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}` | `RemittanceInitialized`, `RemittanceAssigned`, `RemittanceStatusChanged`, `RemittanceClaimPaymentAdded/Updated/Discarded/Removed`, `RemittanceReasonCodeReassigned/Suppressed`, `RemittanceIsDenialDispute`/`RemittanceDisputes`, credit-card payment/refund initiated events — the great majority of event types in this repo |
| Claim Payment | `snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}-{claimPaymentId}` (composite entity id, **same aggregate-type name as Remittance**) | `RemittanceClaimPaymentPosted` only — and only from the posting-queue backfill path, not the normal posting flow |
| Reserved Funds | `snowdrop-remittanceprocessing->{organizationId}->remittance-processing-reserved-funds->{remittanceId}` | `RemittanceProcessingReservedFundsCreated/Added/Updated/Discarded/Posted/Removed` |
| Vendor | `snowdrop-remittanceprocessing->{organizationId}->remittance-processing-vendor->{organizationId}` — **entity id = the organization id itself**, one doc per org | `ReservedFundsEnabled`, `CompaniesUnlimitedRemittancesSet` |
| **Rule** | `snowdrop-remittanceprocessing->{organizationId}->remittance-processing-rule->{ruleId}` | `RuleCreated`, `RuleUpdated`, `RuleRemoved` (event names inferred from `RuleController`/entity-type naming — exact property shape not yet pulled from a live sample) |
| **Sequence** | `snowdrop-remittanceprocessing->{organizationId}->remittance-processing-sequence->{sequenceId}` | `SequenceCreated`, `SequenceStatusUpdated`, `SequenceOrderUpdated` (same caveat — inferred, not yet sampled) |

**Rule/Sequence streams confirmed 2026-08-05 (UF-15495)** from `references/Events.md`. `RemittanceProcessingEventResources` defines `Sequence`, `Rule`, `SequenceOrder`, and `RuleOrder` entity-type constants (`remittance-processing-sequence`, `remittance-processing-rule`, etc.) used by `SequenceController`/`RuleController`. These events aren't itemized in `src/contracts/Events` the way the others are, but the stream follows the identical `{app}->{org}->{entityType}->{entityId}` convention as every other stream in this service. **Use the Rule stream to pull a rule's full change history** — the `remittance-processing-sequences/{sequenceId}/rules` API (`snowdrop-api-calls` skill) only returns *current* rule state, with no way to tell if/when it was last changed relative to a specific evaluation you're investigating.

### Pull a rule's change history
```sql
SELECT * FROM c
WHERE c.StreamId = "snowdrop-remittanceprocessing->{organizationId}->remittance-processing-rule->{ruleId}"
  AND c.Type = "e"
ORDER BY c._ts ASC
```

**Gotcha — `RemittanceClaimPaymentPosted` is the one event that does NOT land on the Remittance stream.** Despite belonging to the claim-payment lifecycle like its siblings (`RemittanceClaimPaymentAdded`, `...Discarded`, etc., which all use the Remittance stream keyed by `RemittanceId` alone), this one event uses the composite `{RemittanceId}-{ClaimPaymentId}` entity id and only appears via the posting-queue backfill path. If you're looking for a claim payment's "it posted" event and don't find it on the Remittance stream, check the Claim Payment stream before concluding it wasn't posted.

**Cross-app note:** a second stream, `Snowdrop.Ledger.Charges->{organizationId}->charge->{chargeId}`, is referenced in this repo's event resources (entity type `"charge"`) but no event here targets it — it's consumed cross-application. This is the same charge-ledger stream documented in `services/ledgers.md` as `sd-charge-golden-box-events` (StreamId prefix `snowdrop.ledger.charges->...`, lowercase) — **note the case difference between the two sightings** (`Snowdrop.Ledger.Charges` here vs `snowdrop.ledger.charges` there); not yet confirmed which is authoritative or whether Cosmos StreamId matching is case-sensitive here — verify against a live sample before relying on exact case.

## Look up a remittance event feed
```sql
SELECT * FROM c
WHERE c.StreamId = "snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}"
  AND c.Type = "e"
ORDER BY c._ts ASC
```
Match a specific event class with `(c.EventType = "X" OR c.SubEventType = "X")` (event-type field fallback — see main SKILL.md *Conventions*).

### Pull the Remittance stream + all Claim Payment sub-streams in one query (confirmed 2026-07-29)
Since `RemittanceClaimPaymentPosted` lives on the composite `{remittanceId}-{claimPaymentId}` stream (see
gotcha above), an exact-match query on the Remittance stream alone will never return it. Use a prefix
`LIKE` to pull the Remittance stream and every Claim Payment sub-stream together:
```sql
SELECT * FROM c
WHERE c.StreamId like "snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}%"
ORDER BY c._ts ASC
```
Still resolves to a single-partition prefix scan (partition key is `StreamId`), so no meaningful cost
increase over the exact-match version. Use this whenever the investigation needs a claim payment's actual
posted record (e.g. checking `IsDisputed`/`DisputeType` as posted, not just what `RemittanceDisputes`
computed) rather than just the Remittance stream.

**Gotcha — the `LIKE` prefix query also returns `_version_` housekeeping docs** (`Type: "v"`, `id`/`StreamId`
matching the stream with no `EventType`/`SubEventType`), one per matched stream (confirmed 2026-08-14,
UF-15848). Filter with `WHERE c.Type = "e"` (or just skip rows with no `EventType`) to get real business
events only — same pattern as the `_version_`/`_snapshot_` housekeeping docs already documented for
Ledger in `services/ledgers.md`, just not previously confirmed here.

**Confirmed timing correlation (UF-15848, 2026-08-14):** on the Remittance stream, every post/reverse
click produces `RemittanceClaimPaymentsArePosting` → `RemittanceClaimPaymentsArePosted` →
`RemittanceClaimPaymentStatusChanged` in sequence (both for a forward post AND a reversal — the naming
is generic to any claim-payment status transition, not literal to "posting"). This local RemittanceProcessing
workflow completes in seconds (10–35s observed). The Ledger charge event (`services/ledgers.md`,
`ChargeRemittancePosted`) can land seconds after `StatusChanged` in the normal case, but was observed
lagging **3m27s** behind `StatusChanged` in one slow repro — i.e. the delay was isolated to the
RemittanceProcessing→Ledger propagation step, not to RemittanceProcessing's own posting logic. When
investigating posting slowness, compare `StatusChanged` (this stream) against `ChargeRemittancePosted`
(Ledger stream) timestamps rather than assuming the whole click-to-landed time is one bottleneck.

## Count events by type for a remittance
```sql
SELECT c.EventType, COUNT(1) AS n FROM c
WHERE c.StreamId = "snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}"
  AND c.Type = "e"
GROUP BY c.EventType
```

## Find disputes (referenced only by ChargePaymentId)
ChargePayment↔Charge is one-to-many — a ChargeId can have multiple ChargePaymentIds, and some events (e.g. `RemittanceDisputes`) reference the charge only by `ChargePaymentId`. Collect ALL ChargePaymentIds for a charge first, then:
```sql
SELECT * FROM c
WHERE c.OrganizationId = "{organizationId}"
  AND ARRAY_CONTAINS(["{chargePaymentId1}","{chargePaymentId2}"], c.ChargePaymentId)
```

## Credit card (ICC) payment: find the payment events and the check header

A credit card payment on a remittance writes to three places: this stream (`RemittanceAssistanceCreditCardPaymentInitiated`, `PaymentId` and `Amount`), the payments stream, and a credit card payments blob. The payments stream is keyed by the payment specification id, not the remittance id, so read it in this order:

1. Download the remittance's credit card payments blob (`references/blob_projections.md`, "The credit card payments blob") and read `Data.Payments[].PaymentSpecificationId`. Claude Code: `az storage blob download --account-name king{env}sharpsdstg --auth-mode login --subscription "uf-kingdom - {Env}"` (confirmed on app).
2. Query the payments events: database `snowdrop`, container `snowdrop-payments-events`:
```sql
SELECT c.EventNumber, c.EventType, c.ts, c.Data FROM c
WHERE c.StreamId = "snowdrop-payments->{organizationId}->payment-specification->{paymentSpecificationId}"
  AND c.Type = "e"
ORDER BY c._ts ASC
```
   Events seen: `PaymentSpecificationCreated`, `PaymentSpecificationProcessed`, `StripeTransactionProcessed` (`TransactionAmount`, `TransactionDate`, `LastFour`, `StripePaymentId`; `Data.CorrelationId` = the blob's `PaymentId`), `PaymentPayoutScheduled`.
3. Remittance (BE) reacts to `StripeTransactionProcessed` and can reconcile the check; see `known-failures/credit-card-payment-reconciles-check-without-ledger-date-or-deposit-amount/CLAUDE.md`.
