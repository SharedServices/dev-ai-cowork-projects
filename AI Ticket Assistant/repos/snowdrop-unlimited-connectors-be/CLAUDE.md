## Instructions specific to Unlimited Connectors

This repo is **Financial Clearance** squad, **Interoperability** pod (guess).

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: only the repo name, nickname, squad, pod and spec-derived server URLs are filled in. No ingress/Helm/Cosmos investigation has been done for this repo. -->
- Repo: `snowdrop-unlimited-connectors-be`
- Squad: Financial Clearance
- Pod: Interoperability (guess)
- Nickname: Unlimited Connectors
- Cosmos namespace / database: not confirmed.
- API ingress segment: not confirmed. Server URL(s) listed in the checked-in specs: `https://api.unlimitedfinancials.ninja/snowdrop/unlimited-connectors/public` — not verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (none confirmed)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. -->
No `Events.md` exists for this repo anywhere in this workspace. No stream/container/entity-id data is available; don't infer one from the API spec.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/Snowdrop.Unlimited.Connectors.Services.Api.Public.Dictionary.md` — condensed API route/method/tag listing for `Snowdrop.Unlimited.Connectors.Services.Api.Public.json` (6 paths; read this before the full spec).
- `references/Snowdrop.Unlimited.Connectors.Services.Api.Public.json` — full OpenAPI document.
