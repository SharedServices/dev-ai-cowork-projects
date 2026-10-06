## Instructions specific to Patients API (BE)

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-patients-api-be` — confirmed exception in `references/namespaces.md`'s "Repository naming convention" table: namespace equals repo name, no additional `-be` appended.
- Squad: Financial Ledger (Herbert)
- Pod: Quality (guess)
- Nickname: Patients API (BE)
- Cosmos namespace / database: `snowdrop-patients` (dedicated) — confirmed via the `cosmos-query` skill's entity/database map. **Distinct from the Splunk namespace value below** — `references/namespaces.md` already documents that this service's Splunk `namespace` (`snowdrop-patients-api-be`) and `Properties.Application` (`snowdrop-patients-api`) differ; the Cosmos database name is a third, further-differing value. Don't assume any two of these three strings are interchangeable.
- API ingress segment: not confirmed. Sample route seen in the checked-in spec: `/population/patients` — doesn't obviously map to a `patients` or `patients-api` ingress segment; not verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (1 confirmed, from `references/Events.md`)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. Regenerate fresh from Events.md any time that file is refreshed, rather than hand-patching stale rows. -->
| Stream | Container | Entity id | Notes |
|---|---|---|---|
| Patient | `snowdrop-patients-events` | `{PatientId}` | Stream id `Snowdrop.Patients->{OrganizationId}->Snowdrop.Patients.Patient->{PatientId}`. Entity type `Snowdrop.Patients.Patient`. Fed by three event-tag namespaces (`Snowdrop.Patients.Events`, `.PersonalContacts`, `.System`) but it's a single stream/container. |

**Separate from the above (confirmed, don't conflate):** `snowdrop-patient-phoenix-events`, `snowdrop-patients-identities`, `snowdrop-patients-subscriptions` are additional containers in this database, purpose/shape not yet investigated for the first one.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Events.md` — stream format and every event class for this service, across all three event-tag namespaces. Ground truth.
- `references/EventEnums.md` — every enum name and its member values, generated from `Events.md`'s dedicated `## Enums` section (a sibling of Model Types in this repo, not nested inside it — e.g. `StatusType` = `Active`/`Inactive`/`Deceased`/...). **Check here, not the full OpenAPI spec, when a request/response schema references an enum by name** — confirmed the spec only declares these as bare integers with no member names (checked `StatusType`), so opening the `.json` spec for this specific purpose is a dead end. Generated file — regenerate with `references/generate-enums.py` after `Events.md` refreshes, never hand-edit it.
- `references/cosmos_query.md` — confirmed database/containers, event families, gotchas, ready-to-run query.
- `references/Snowdrop.Patients.Api.Dictionary.md` — condensed API route/method/tag listing (read this before the full spec).
- `references/Snowdrop.Patients.Api.json` — full OpenAPI document.
