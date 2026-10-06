## Instructions specific to Guarantors

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-guarantors-be`
- Squad: Financial Ledger (Herbert)
- Pod: Quality (guess)
- Nickname: Guarantors
- Cosmos namespace / database: `snowdrop-guarantors` (dedicated) — confirmed via the `cosmos-query` skill's entity/database map.
- API ingress segment: not confirmed. Sample route seen in the checked-in spec: `/guarantors/patient/{patientId}` (flat, no `/snowdrop/` prefix) — consistent with a `guarantors` ingress segment, but this is inferred from the OpenAPI paths, not verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (1 confirmed, from `references/Events.md`)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. Regenerate fresh from Events.md any time that file is refreshed, rather than hand-patching stale rows. -->
| Stream | Container | Entity id | Notes |
|---|---|---|---|
| Guarantor | `snowdrop-guarantors-events` | `{GuarantorId}` | Stream id `snowdrop-guarantors->{OrganizationId}->guarantor->{GuarantorId}`. Entity type `guarantor`. Carries real PII (SSN, DOB, address, contact info) — see `references/cosmos_query.md`'s PII warning before pasting raw documents into chat outside ninja. |

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Events.md` — stream format and every event class for this service. Ground truth.
- `references/EventEnums.md` — every enum name and its member values, generated from the `_(enum)_`-tagged entries scattered under `Events.md`'s Model Types section (this repo has no dedicated Enums heading — e.g. `GuarantorStatus` = `Provisional`/`Active`). **Check here, not the full OpenAPI spec, when a request/response schema references an enum by name** — confirmed the spec only declares these as bare integers with no member names (checked `Snowdrop.Guarantors.Model.GuarantorStatus`), so opening the `.json` spec for this specific purpose is a dead end. Generated file — regenerate with `references/generate-enums.py` after `Events.md` refreshes, never hand-edit it.
- `references/cosmos_query.md` — confirmed database/container, PII warning, ready-to-run query.
- `references/Snowdrop.Guarantors.Api.Dictionary.md` — condensed API route/method/tag listing (read this before the full spec). **Anomaly, fixed on import:** this file and its sibling `.json` were found misnamed as `Snowdrop.ChargeMasters.Api.*` (a copy-paste artifact — the OpenAPI spec's actual title was always "Snowdrop Guarantors API", only the filenames and the dictionary's own header lines said ChargeMasters). Renamed to match on move into this folder.
- `references/Snowdrop.Guarantors.Api.json` — full OpenAPI document.
