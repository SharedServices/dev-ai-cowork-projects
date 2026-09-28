# Ledgers — Cosmos query recipes and confirmed facts

Repo-specific content — generic cross-service mechanics (envelope shape, StreamId conventions, auth) live in the `cosmos-query` skill instead, since those apply to every service, not just this repo.

Database: `snowdrop-ledger` (dedicated) — confirmed to be Ledgers' only database, fully toured.

No `Events.md` exists for this repo (no source-derived event schema doc was ever checked in) — this file's knowledge comes entirely from live Cosmos investigation. Cross-reference: `repos/snowdrop-remittance-processing-be/references/Events.md` mentions a second source application, `Snowdrop.Ledger.Charges`, registered for the Ledger Charge stream (entity type `"charge"`) — this is presumably the same stream as `sd-charge-golden-box-events` below, but note the casing differs between the two sightings (`Snowdrop.Ledger.Charges->{OrganizationId}->charge->{ChargeId}` there vs `snowdrop.ledger.charges->{organizationId}->charge->{chargeId}` confirmed here) — not yet verified which case is authoritative.

**Ledgers breaks the container-naming convention.** Containers are prefixed `sd-` instead of the `snowdrop-{entity}-events` pattern everywhere else, and don't even contain the word "ledger" consistently, so searching for "ledger" in the container list can miss them. All six confirmed containers:

- `sd-charge-golden-box-events` — the main charge/transaction event feed. StreamId namespace segment `snowdrop.ledger.charges`, aggregate-type `charge`: `snowdrop.ledger.charges->{organizationId}->charge->{chargeId}`.
- `sd-ledger-balance-events` — holds **two aggregate types sharing one container**: `chargesummary` (event `ChargeSummaryBalancesCalculated`, keyed by `ChargeId`) and `patientsummary` (keyed by `PatientId`) — visible directly in the `id` column (`1+chargesummary->{chargeId}->...`, `0+patientsummary->{patientId}->...`).
- `sd-ledger-insurance-events` — `InsuranceReservedFundPosted` seen.
- `sd-ledger-migration-subscriptions`
- `sd-ledger-subscriptions`
- `sd-patient-payment-pyramid-events` — actually stores the `paymentpatient` aggregate (event `PaymentPatientAdded`, `EntityTypeName: "PaymentPatient"`), despite the "payment pyramid" internal codename. **Ledger container names are internal codenames, not descriptive entity names — always check the `id`/`StreamId` prefix for the real aggregate name rather than guessing from the container name** (same lesson from "golden box" storing charges).

## Look up a charge's ledger event feed
```sql
SELECT * FROM c
WHERE c.StreamId = "snowdrop.ledger.charges->{organizationId}->charge->{chargeId}"
ORDER BY c._ts ASC
```

## Gotchas

- **Filter out event-sourcing housekeeping documents.** Alongside real events (`Type: "e"`), `sd-charge-golden-box-events` also contains `_version_{streamId}`, `_snapshot_->{streamId}`, and a `_collection_creator_thumbprint` system document — presumably periodic snapshotting to avoid replaying an entire long charge history. Not seen on any other service's event container so far (Ledger streams are unusually long-lived/high-volume). Filter with `WHERE c.Type = "e"` for actual business events rather than assuming every document matching a StreamId prefix is one.
- **`Data.TransactionId` and `Metadata.TransactionId` are different ids, despite the identical field name** (seen on `InsuranceReservedFundPosted`). `Metadata.TransactionId` is the universal-envelope correlation id (same meaning as on every other service). `Data.TransactionId` here is Ledger's own business-level transaction/batch reference — don't assume a field name means the same thing at the `Data` level as at the `Metadata` level.
- **Balance breakdown:** a charge's balance breaks into an `Accounts` array, each entry tagged with a numeric `Type` — seen `30` (has `PolicyId`/`PayerId`/`PortfolioId`/`PolicyPlanId`, looks like an insurance/policy account) and `40` (has `GuarantorId` instead, looks like self-pay) — plus `GuarantorBalance`/`OutstandingBalance`/`ExpectedAdjustmentSum` at the top level. Enum meaning of `Type` not confirmed beyond these two values.
- **Ledger leans heavily on unexplained numeric enum codes:** `TransactionType: 600`, `BatchType: 610` (insurance events), `Account.Type: 30/40` (balance events), `ChargeStatus: 200`/`ChargeSubStatus: 204` (`ChargePostingFailed`). None decoded beyond context clues — flag as unresolved rather than guessing a mapping when reporting to the user.
- **Possible second system/automated account id:** `79e8d69d-3636-4e0a-8362-b971701869ab` shows up as both `CreatedByUserId` and `SourceMetadata.UserId` on `InsuranceReservedFundPosted`, and it's the *same* guid seen as `ClosedBy`/`SourceMetadata.UserId` on `snowdrop-resources`' `MonthClosed` event. Recurring across two different automated financial/period-close processes suggests a system account distinct from the all-zero/Nimbus (`daeb914f-...`) pattern — not confirmed as a named account, but worth recognizing if it recurs again.

## Timing comparisons across charges on the same claim payment (confirmed 2026-08-17, UF-15997)

**`ChargeFromActivityPosted` is not a valid comparator for claim-payment/remittance response-time analysis.** This event fires at original charge creation, before the charge is ever bundled into a claim payment — staggered or differing timestamps across charges on the same claim payment carry no meaning for posting/propagation-speed questions. Don't flag `ChargeFromActivityPosted` timing gaps as an anomaly when comparing charges on one claim payment; look at `ChargeRemittancePosted` instead (see below).

**`ChargeRemittancePosted` is the right comparator, and is expected to land as a near-simultaneous batch.** When a claim payment with multiple charges posts, each charge's `ChargeRemittancePosted` event (the transfer/adjustment posting from that remittance) should land within milliseconds of its siblings — a single atomic batch write, not staggered. Confirmed on UF-15997: 3 charges' events landed within 21ms of each other.

**That batch is expected to land fairly quickly after remittance-processing's `RemittanceClaimPaymentStatusChanged` — a multi-minute gap is a real Ledger-side problem, not normal variance.** Confirmed on UF-15997: the `ChargeRemittancePosted` batch landed **7m50.6s** after `RemittanceClaimPaymentStatusChanged` — more than double the previous worst-case sample (3m27s, UF-15848, see below). This class of delay indicates a serious problem on the Ledger side (queue backlog, throttling, Ledger-side fault) — not just a slower point on a normal propagation-time distribution. Treat any multi-minute gap here as worth escalating, not as a data point to average in with faster cases.

## Splunk shortcut for `ChargeRemittancePosted` timing (confirmed 2026-08-14, UF-15848)

When you need the timestamp of a `ChargeRemittancePosted` write but don't want a Cosmos round-trip, the Splunk log line `"Writing Charge Events"` from `Snowdrop.Ledger...Remittances.ChargeRemitPoster` (namespace `snowdrop-ledger`) is a reliable proxy — validated against the actual Cosmos `_ts` across 4 post/reverse cycles in ninja, all within **90ms** (three within 10ms):

| Splunk "Writing Charge Events" | Cosmos `ChargeRemittancePosted._ts` | Delta |
|---|---|---|
| 15:00:22.373 | 15:00:22.459 | +86ms |
| 15:00:33.674 | 15:00:33.667 | -7ms |
| 15:01:13.471 | 15:01:13.463 | -8ms |
| 15:01:28.366 | 15:01:28.357 | -9ms |

Safe to use this Splunk line instead of pulling a fresh Cosmos export when timing the RemittanceProcessing→Ledger propagation or the Ledger→SignalR reaction step. Only pull the real Cosmos event if sub-10ms precision matters or the Splunk log is missing/incomplete for the window in question.

## High-value find: `ChargePostingFailed` carries structured error codes

First confirmed sample:
```json
{
  "EventType": "ChargePostingFailed",
  "Data": {
    "ChargeId": "{guid}", "IsPosted": false,
    "Errors": [
      { "Code": 10206, "Message": "Missing company." },
      { "Code": 10204, "Message": "Missing facility." },
      { "Code": 10208, "Message": "Missing division." },
      { "Code": 10103, "Message": "Could not determine fee." },
      { "Code": 10100, "Message": "Could not determine allowed amount." }
    ],
    "ChargeStatus": 200, "ChargeSubStatus": 204
  }
}
```
Not an exhaustive code list — just what's been seen once (10100, 10103, 10204, 10206, 10208). This is exactly the "why didn't this charge post" root-cause detail Splunk's logging doesn't carry (compare to the `FeeFinder` pattern in `splunk-search`). When a support case is "why didn't this charge post," query `sd-charge-golden-box-events` for that `ChargeId`'s `ChargePostingFailed` event and read `Errors` directly rather than reconstructing the reason from Splunk.
