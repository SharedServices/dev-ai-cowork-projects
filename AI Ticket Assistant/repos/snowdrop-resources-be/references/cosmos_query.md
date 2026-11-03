# Resources — Cosmos query recipes and confirmed facts

Repo-specific content — generic cross-service mechanics (envelope shape, StreamId conventions, auth) live in the `cosmos-query` skill instead, since those apply to every service, not just this repo.

Full event schemas (every event class, property, enum): `references/Events.md`.

Database: `snowdrop-resources` (dedicated). Container: `snowdrop-resources-events`, plus `snowdrop-resources-lease` (Change Feed processor lease storage — standard Cosmos pattern, seen on `snowdrop-remittance` too).

**Full stream map (confirmed 2026-07-20, from source-derived event documentation — supersedes earlier live-sample guesswork where they overlap).** All nine aggregate types live in this one container, under the shared StreamId format `snowdrop-resources->{OrganizationId}->{aggregate-type}->{EntityId}`:

| Aggregate type | Entity ID | Events (examples) |
|---|---|---|
| `company` | `CompanyId` | `CompanyCreated`, `CompanyUpdated`, plus all `Division*`/Stripe/WorldPay company sub-events (see gotcha below) |
| `facility` | `FacilityId` | `FacilityCreated`, `FacilityUpdated`, `FacilityLocationsAssigned` |
| `provider` | `ProviderId` | `ProviderCreated`, `ProviderUpdated`, `ProviderSchedulingEntitlementUpdated` |
| `payment-device` | `DeviceId` | `PaymentDeviceCreated`, `PaymentDeviceRegistered`, `StripePaymentDeviceRegistered` |
| `payment-vendor` | **= the OrganizationId itself** (one config doc per org, not a separate entity) | `PaymentVendorConfigurationSet` |
| `monthly-close` | `MonthlyCloseId` (own id, not `CompanyId` — see gotcha below) | `MonthClosed` (`Data`: `CompanyId`, `Month` enum 1-12, `Year`, `ClosedBy`, `ClosedOn`) |
| `division-ledger` | `DivisionId` | `ChargeLedgerClosed`, `PaymentLedgerClosed` — **routed differently, see gotcha below** |
| `facility-resource` | `FacilityResourceId` | `FacilityResourceCreated`, `FacilityResourceUpdated`, `FacilityResourceRemoved` |
| `human-resource` | `HumanResourceId` | `HumanResourceCreated`, `HumanResourceUpdated`, `HumanResourceRemoved` |

## Gotchas

- **Division events route to the Company stream, not their own stream.** Every `Division*` event (`DivisionCreated`, `DivisionHeaderUpdated`, `DivisionAddressUpdated`, `DivisionAcceptorUpdated/Removed`, `DivisionLocationsUpdated`, `DivisionLocationAcceptorsUpdated`) is keyed by `CompanyId` and lands on the **company** stream (`snowdrop-resources->{org}->company->{CompanyId}`), even though it's division-level data — there's no separate `division` aggregate type. Same for company-level Stripe (`StripeAgreementAccepted`, `StripeAccountSet`, etc.) and WorldPay (`MerchantAccountRegistered`, `MerchantAcceptorAdded`, etc.) events — all land on `company`, not their own streams.
- **Ledger events bypass the whole `IResourceEvent` hierarchy.** `ChargeLedgerClosed`/`PaymentLedgerClosed` implement `IChargeLedgerOwner`/`IPaymentLedgerOwner` instead, and publish to the **division-ledger** stream via a `DivisionIdentifier` (in `Snowdrop.Resources.Ledger`) — a different routing mechanism than every other event in this container. Don't assume it follows the same subscription/query pattern as the other eight aggregate types.
- **Payment Vendor's entity ID is the OrganizationId, not a distinct GUID** — there's exactly one `PaymentVendorConfigurationSet` document per org, so the StreamId's last segment duplicates the org segment: `snowdrop-resources->{orgId}->payment-vendor->{orgId}`.
- **Monthly-close's `{entityId}` is the close record's OWN EntityId, NOT the CompanyId** (confirmed 2026-07-17, corrected after an initial wrong assumption). `CompanyId` is a field inside `Data`, one level down — it isn't derivable from a CompanyId alone, so you can't build a single-partition point read for "all closes for company X" the way you can for a remittance/charge.

## Look up a company's monthly closes

Cross-partition filter on `Data.CompanyId`, with a `StreamId` prefix filter (same namespace/org/aggregate-type segments) to at least scope the scan to one org's monthly-close records instead of the whole container. Use `STARTSWITH` and no `ORDER BY`; sort the rows on the client:
```sql
SELECT c.EventNumber, c.ts, c.Data.CompanyId, c.Data.Year, c.Data.Month, c.Data.ClosedOn
FROM c
WHERE STARTSWITH(c.StreamId, "snowdrop-resources->{organizationId}->monthly-close->")
  AND c.EventType = "MonthClosed"
  AND c.Data.CompanyId = "{companyId}"
```
Through the Azure MCP tool, `LIKE` or `STARTSWITH` with `ORDER BY c.Data.Year` returned status 400 (`Value cannot be null (Parameter 'utf8Json')`); the same filter without `ORDER BY` worked on `app`. To compare companies, use `c.Data.CompanyId IN ("{companyA}", "{companyB}")`. The company's cutoff is the first day of the month after its most recent closed month.
`MonthClosed` events can be closed live (as of the close date) or retroactively in a batch (seen: five months closed within the same minute, ~8 months after the fact) — check `c.ts`/`c._ts` (write time) against `Data.Year`/`Data.Month` rather than assuming a close happened when its period ended.
