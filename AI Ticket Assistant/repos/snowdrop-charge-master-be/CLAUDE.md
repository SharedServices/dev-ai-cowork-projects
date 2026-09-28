## Instructions specific to Charge Masters

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-charge-master-be` — confirmed correct as the singular form, despite the plural namespace value below; not a naming-convention violation.
- Squad: Financial Ledger (Herbert)
- Nickname: Charge Masters
- Cosmos namespace / database: `snowdrop` — **confirmed exception, not the presumed dedicated database.** This service's events live in the shared `snowdrop` database (container `snowdrop-chargemasters-events`), per the `cosmos-query` skill's confirmed entity/database map — don't assume `snowdrop-charge-masters` is the database name just because it's the Splunk namespace value.
- API ingress segment: not confirmed. Sample route seen in the checked-in spec: `/charge-masters` (flat, no `/snowdrop/` prefix) — consistent with a `charge-masters` ingress segment, but this is inferred from the OpenAPI paths, not verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (2 confirmed, from `references/Events.md`)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. Regenerate fresh from Events.md any time that file is refreshed, rather than hand-patching stale rows. -->
| Stream | Container | Entity id | Notes |
|---|---|---|---|
| Company | `snowdrop-chargemasters-events` | `{CompanyId}` | Stream id `Snowdrop.ChargeMasters->{OrganizationId}->Snowdrop.ChargeMasters.Company->{CompanyId}`. Catalogue-level events (charge master added/updated/deleted/reordered). |
| ChargeMaster | `snowdrop-chargemasters-events` | `{CompanyId}_{ChargeMasterId}` | Stream id `Snowdrop.ChargeMasters->{OrganizationId}->Snowdrop.ChargeMasters.ChargeMaster->{CompanyId}_{ChargeMasterId}`. Fee-data events for one charge master (import, storage-confirmation); large fee sets externalized to blob (`ChargeMasterFeesStored`). |

Non-event container `snowdrop-chargemasters-subscriptions` also lives in this database — not a stream, don't query it by StreamId.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Events.md` — stream formats, model types, and every event class for this service. Ground truth.
- `references/cosmos_query.md` — confirmed database/container, both stream formats, ready-to-run queries.
- `references/Snowdrop.ChargeMasters.Api.Dictionary.md` — condensed API route/method/tag listing (read this before the full spec).
- `references/Snowdrop.ChargeMasters.Api.json` — full OpenAPI document.
