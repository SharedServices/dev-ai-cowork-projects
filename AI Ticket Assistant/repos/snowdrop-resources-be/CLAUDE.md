## Instructions specific to Resources

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-resources-be`
- Squad: Financial Ledger (Herbert)
- Pod: Quality (guess)
- Nickname: Resources
- Cosmos namespace / database: `snowdrop-resources` (dedicated) — confirmed via the `cosmos-query` skill's entity/database map.
- API ingress segment: not confirmed. This is a **multi-spec repo** — the Ledger sub-service's own OpenAPI paths bake the full prefix into the route itself (sample: `/snowdrop/resources/ledger/divisions/{divisionId}`), unlike the flatter-looking paths seen in this workspace's other services' specs. The two Services specs (`Snowdrop.Resources.Services.json`, `Snowdrop.Resources.Services.Administration.json`) weren't sampled for their path style. None of this is verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (9 confirmed, from `references/Events.md`)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. Regenerate fresh from Events.md any time that file is refreshed, rather than hand-patching stale rows. -->
| Stream | Container | Entity id | Notes |
|---|---|---|---|
| Company | `snowdrop-resources-events` | `{CompanyId}` | Also receives all `Divisions*` events (they implement `ICompanyEvent`), keyed by `CompanyId` — don't assume division events live on a separate Division stream. Company-level Stripe/WorldPay events land here too. |
| Facility | `snowdrop-resources-events` | `{FacilityId}` | |
| Provider | `snowdrop-resources-events` | `{ProviderId}` | |
| Payment Device | `snowdrop-resources-events` | `{DeviceId}` | |
| Payment Vendor | `snowdrop-resources-events` | `{OrganizationId}` | Entity id equals the organization id itself — one vendor-configuration document per organization, same pattern as `snowdrop-payers-api-be`'s Vendor Settings stream. |
| Monthly Close | `snowdrop-resources-events` | `{MonthlyCloseId}` | The close record's own id, **not** `CompanyId` — `CompanyId` is a field inside `Data`, one level down. |
| Division Ledger | `snowdrop-resources-events` | `{DivisionId}` | `ChargeLedgerClosed`/`PaymentLedgerClosed` land here via `DivisionIdentifier` in `Snowdrop.Resources.Ledger`, **not** via `IResourceEvent` like the other streams — a different interface path to the same stream. |
| Facility Resource | `snowdrop-resources-events` | `{FacilityResourceId}` | |
| Human Resource | `snowdrop-resources-events` | `{HumanResourceId}` | |

All nine streams share one container, `snowdrop-resources-events`, under `snowdrop-resources->{OrganizationId}->{EntityTypeName}->{EntityId}` (Division Ledger is the routing exception, not a container exception). `snowdrop-resources-lease` is Change Feed processor lease storage, not event data.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Events.md` — stream formats and every event class for this service. Ground truth.
- `references/EventEnums.md` — every enum name and its member values, generated from `Events.md`'s Model Types → Enums section (e.g. `AcceptorType` = `CardPresent`/`CardNotPresent`). **Check here, not the full OpenAPI spec, when a request/response schema references an enum by name** — confirmed the spec only declares these as bare integers with no member names (checked `Snowdrop.Resources.Contracts.Companies.WorldPay.AcceptorType`), so opening a `.json` spec for this specific purpose is a dead end. Generated file — regenerate with `references/generate-enums.py` after `Events.md` refreshes, never hand-edit it.
- `references/cosmos_query.md` — confirmed database/containers, full aggregate-type map with gotchas, ready-to-run query.
- `references/Snowdrop.Resources.Ledger.Api.Dictionary.md` — condensed route listing, Ledger sub-service.
- `references/Snowdrop.Resources.Ledger.Api.json` — full OpenAPI document, Ledger sub-service.
- `references/Snowdrop.Resources.Services.Dictionary.md` — condensed route listing, main Services spec.
- `references/Snowdrop.Resources.Services.json` — full OpenAPI document, main Services spec.
- `references/Snowdrop.Resources.Services.Administration.Dictionary.md` — condensed route listing, Services Administration spec.
- `references/Snowdrop.Resources.Services.Administration.json` — full OpenAPI document, Services Administration spec.
