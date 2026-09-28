## Instructions specific to Identifiers

This repo is **Platform** squad.

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: only the repo name, nickname, squad and spec-derived server URLs are filled in. No ingress/Helm/Cosmos investigation has been done for this repo. -->
- Repo: `snowdrop-identifiers-be`
- Squad: Platform
- Nickname: Identifiers
- Cosmos namespace / database: not confirmed.
- API ingress segment: not confirmed. Server URL(s) listed in the checked-in specs: `https://api.unlimitedfinancials.ninja/auditlog/api`, `https://api.unlimitedfinancials.ninja/snowdrop/identifiers/internal`, `https://api.unlimitedfinancials.ninja/snowdrop/identifiers/public` — not verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (none confirmed)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. -->
No `Events.md` exists for this repo anywhere in this workspace. No stream/container/entity-id data is available; don't infer one from the API spec.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Snowdrop.Identifiers.Services.Api.Configuration.Dictionary.md` — condensed API route/method/tag listing for `Snowdrop.Identifiers.Services.Api.Configuration.json` (4 paths; read this before the full spec).
- `references/Snowdrop.Identifiers.Services.Api.Configuration.json` — full OpenAPI document.
- `references/Snowdrop.Identifiers.Services.Api.Internal.Dictionary.md` — condensed API route/method/tag listing for `Snowdrop.Identifiers.Services.Api.Internal.json` (7 paths; read this before the full spec).
- `references/Snowdrop.Identifiers.Services.Api.Internal.json` — full OpenAPI document.
- `references/Snowdrop.Identifiers.Services.Api.Public.Dictionary.md` — condensed API route/method/tag listing for `Snowdrop.Identifiers.Services.Api.Public.json` (7 paths; read this before the full spec).
- `references/Snowdrop.Identifiers.Services.Api.Public.json` — full OpenAPI document.
