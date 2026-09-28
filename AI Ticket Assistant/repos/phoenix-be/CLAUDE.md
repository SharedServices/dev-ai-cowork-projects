## Instructions specific to Phoenix

This repo is **Platform** squad.

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: only the repo name, nickname, squad and spec-derived server URLs are filled in. No ingress/Helm/Cosmos investigation has been done for this repo. -->
- Repo: `phoenix-be`
- Squad: Platform
- Nickname: Phoenix
- Cosmos namespace / database: not confirmed.
- API ingress segment: not confirmed. Server URL(s) listed in the checked-in specs: `https://api.unlimitedfinancials.ninja/phoenix/administration`, `https://api.unlimitedfinancials.ninja/phoenix/messaging/hl7`, `https://api.unlimitedfinancials.ninja/phoenix/public` — not verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (none confirmed)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. -->
No `Events.md` exists for this repo anywhere in this workspace. No stream/container/entity-id data is available; don't infer one from the API spec.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Phoenix.Services.Administration.Dictionary.md` — condensed API route/method/tag listing for `Phoenix.Services.Administration.json` (100 paths; read this before the full spec).
- `references/Phoenix.Services.Administration.json` — full OpenAPI document.
- `references/Phoenix.Services.Hl7Messaging.Dictionary.md` — condensed API route/method/tag listing for `Phoenix.Services.Hl7Messaging.json` (2 paths; read this before the full spec).
- `references/Phoenix.Services.Hl7Messaging.json` — full OpenAPI document.
- `references/Phoenix.Services.Public.Dictionary.md` — condensed API route/method/tag listing for `Phoenix.Services.Public.json` (1 paths; read this before the full spec).
- `references/Phoenix.Services.Public.json` — full OpenAPI document.
