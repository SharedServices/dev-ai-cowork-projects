## Instructions specific to Change Healthcare

This repo is **Billing & AR (Shelby)** squad, **Quality** pod (guess).

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: only the repo name, nickname, squad, pod and spec-derived server URLs are filled in. No ingress/Helm investigation has been done for this repo; the Cosmos location was read from live data on team. -->
- Repo: `snowdrop-change-healthcare-be`
- Squad: Billing & AR (Shelby)
- Pod: Quality (guess)
- Nickname: Change Healthcare
- Cosmos namespace / database: namespace `snowdrop-changehealthcare`, shared database `snowdrop`, container `snowdrop-change-healthcare-events` (confirmed on team, 2026-10-20). StreamId `snowdrop-changehealthcare->{organizationId}->report->{reportId without dashes}_{fileType}`.
- API ingress segment: not confirmed. Server URL(s) listed in the checked-in specs: `https://api.unlimitedfinancials.ninja/snowdrop/changehealthcare` — not verified against actual ingress/nginx config.
- Function App code: none confirmed. No Function App content for this service exists anywhere in this workspace.

### Streams (one confirmed)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. -->
No `Events.md` exists for this repo anywhere in this workspace; the one stream below was read from live data, so other streams or event types may exist.

| Stream | Container | Entity id | Notes |
|---|---|---|---|
| Report | `snowdrop-change-healthcare-events` (database `snowdrop`) | report id (compressed guid) plus `_r5` for ERA files | event `ReportFileUploaded`; StreamId `snowdrop-changehealthcare->{organizationId}->report->{reportIdWithoutDashes}_r5` |

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/cosmos_query.md` — Cosmos location, StreamId format, `ReportFileUploaded` fields, the flow to a remittance, and query recipes.
- `references/Snowdrop.ChangeHealthcare.Services.Dictionary.md` — condensed API route/method/tag listing for `Snowdrop.ChangeHealthcare.Services.json` (4 paths; read this before the full spec).
- `references/Snowdrop.ChangeHealthcare.Services.json` — full OpenAPI document.
