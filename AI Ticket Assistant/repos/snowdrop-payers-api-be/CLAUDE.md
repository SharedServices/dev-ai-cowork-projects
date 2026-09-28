## Instructions specific to Payers

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-payers-api-be` — **naming anomaly:** the namespace value below is `snowdrop-payers` (no `-api-`), so the repository-naming convention (namespace + `-be`) would predict `snowdrop-payers-be`. This folder's actual name has `-api-` inserted, the same way `snowdrop-patients-api-be` does — but unlike that repo, this exception isn't recorded in `references/namespaces.md`'s "Repository naming convention" table. Flagged there; add a row once confirmed.
- Squad: Financial Ledger (Herbert)
- Nickname: Payers
- Cosmos namespace / database: `snowdrop-payers` (dedicated) — confirmed via the `cosmos-query` skill's entity/database map. **Two event containers in this one database**, not one — see Streams below.
- API ingress segment: not confirmed. This is a **multi-spec repo** — three separate OpenAPI documents (Payers, Payers.Assistance, Payers.FeeSchedules), each likely with its own ingress path. Sample route seen in the main spec: `/payers` (flat, no `/snowdrop/` prefix). None of this is verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (18 confirmed, from `references/Events.md`)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. Regenerate fresh from Events.md any time that file is refreshed, rather than hand-patching stale rows. -->
| Stream | Container | Entity id | Notes |
|---|---|---|---|
| Payer | `snowdrop-payers-events` | `{PayerId}` | |
| Plan | `snowdrop-payers-events` | `{PlanId}` | |
| Payer CHC Settings | `snowdrop-payers-events` | `{PayerId}` | |
| Plan CHC Settings | `snowdrop-payers-events` | `{PlanId}` | |
| Payer Eligibility Configuration | `snowdrop-payers-events` | `{PayerId}` | `*Updated` events carry no entity ID field — resolve from the StreamId. |
| Plan Eligibility Configuration | `snowdrop-payers-events` | `{PlanId}` | Same as above. |
| Manufacturer Copay Program | `snowdrop-payers-events` | `{ManufacturerCopayProgramId}` | |
| Global Fee Schedule | `snowdrop-payers-events` | `{GlobalFeeScheduleId}` | |
| Global Fee Schedule Fees | `snowdrop-payers-events` | `{GlobalFeeScheduleId}_{AllowedScheduleId}` | id is **not** lower-cased (unlike Fee Schedule/Fee Schedule Storage below). |
| Factory Fee Schedule | `snowdrop-payers-factory-events` | `{Period}_{Locality}_{PricingType}` | **Different container from every other row.** Partition is `{Source}_{ScheduleType}`, not `OrganizationId` — the only stream here that isn't org-partitioned. Id is sanitised (`/`, `?`, `$`, `,` replaced with spaces). |
| Fee Schedule | `snowdrop-payers-events` | `{PayerId}_{ContractId}_{FeeScheduleId}` | Lower-cased composite key. |
| Fee Schedule Storage | `snowdrop-payers-events` | `{PayerId}_{ContractId}_{FeeScheduleId}` | Lower-cased composite key. |
| Contract — Payer summary | `snowdrop-payers-events` | `{PayerId}` | Ordered list of contracts for a payer. |
| Contract — Detail | `snowdrop-payers-events` | `{PayerId}_{ContractId}` | Contract associations and fee schedules. Split from the summary stream above — check both when tracing a contract. |
| Delinquency Thresholds | `snowdrop-payers-events` | `{PayerId}_{ContractId}_{ClaimType}` | |
| Skilled Nursing Facility | `snowdrop-payers-events` | `{SnfId}` | |
| SNF Patient | `snowdrop-payers-events` | `{SnfPatientId}` | |
| Vendor Settings | `snowdrop-payers-events` | `{OrganizationId}` | Entity id equals the organization id itself — one document per org, same pattern as `snowdrop-resources`' Payment Vendor stream. |

All stream ids follow `Snowdrop.Payers->{Partition}->{EntityTypeName}->{EntityId}`. Every stream lives in `snowdrop-payers-events` **except** Factory Fee Schedule, which lives in the separate `snowdrop-payers-factory-events` container — don't assume "the Payers container" is singular.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Events.md` — stream formats and every event class for this service. Ground truth.
- `references/EventEnums.md` — every enum name and its member values, generated from `Events.md`'s Model Types → Enums section (e.g. `PayerType` = `Insurance`/`SelfPay`/`SkilledNursingFacility`/`Manufacturer`/...). **Check here, not the full OpenAPI spec, when a request/response schema references an enum by name** — confirmed the spec only declares these as bare integers with no member names (checked `PayerType`), so opening a `.json` spec for this specific purpose is a dead end. Generated file — regenerate with `references/generate-enums.py` after `Events.md` refreshes, never hand-edit it.
- `references/cosmos_query.md` — confirmed databases/containers, full stream map with gotchas, ready-to-run query.
- `references/Snowdrop.Payers.Api.Dictionary.md` — condensed route listing for the main Payers spec.
- `references/Snowdrop.Payers.Api.json` — full OpenAPI document, main Payers spec.
- `references/Snowdrop.Payers.Assistance.Api.Dictionary.md` — condensed route listing, Assistance sub-spec.
- `references/Snowdrop.Payers.Assistance.Api.json` — full OpenAPI document, Assistance sub-spec.
- `references/Snowdrop.Payers.FeeSchedules.Api.Dictionary.md` — condensed route listing, Fee Schedules sub-spec.
- `references/Snowdrop.Payers.FeeSchedules.Api.json` — full OpenAPI document, Fee Schedules sub-spec.
