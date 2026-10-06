## Instructions specific to Command Center

This repo is **Platform** squad, **Quality** pod (guess).

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-commandcenter-be`
- Squad: Platform
- Pod: Quality (guess)
- Nickname: Command center
- Cosmos namespace / database: `snowdrop-commandcenter` — confirmed 2026-07-07 as a Cosmos DB database name (`king-ninja-sharp-be-cdb`), per `references/namespaces.md`. Not yet seen directly in Splunk; the Splunk `namespace` value is presumed identical but unconfirmed.
- API ingress segment: not confirmed. Sample route seen in the checked-in spec: `/bulkactions` (flat, no `/snowdrop/` prefix) — not verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (none confirmed)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. -->
No `Events.md` exists for this repo anywhere in this workspace. No stream/container/entity-id data is available; don't infer one from the API spec.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Snowdrop.CommandCenter.Api.Dictionary.md` — condensed API route/method/tag listing (read this before the full spec).
- `references/Snowdrop.CommandCenter.Api.json` — full OpenAPI document.
