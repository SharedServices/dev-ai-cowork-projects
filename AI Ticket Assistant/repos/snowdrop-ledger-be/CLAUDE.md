## Instructions specific to Ledgers

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-ledger-be` — confirmed exception in `references/namespaces.md`'s "OpenAPI document location" table: namespace `snowdrop-ledger`'s OpenAPI folder is the repository name `snowdrop-ledger-be`, not the bare namespace.
- Squad: Financial Ledger (Herbert)
- Nickname: Ledgers
- Cosmos namespace / database: `snowdrop-ledger` (dedicated) — confirmed via the `cosmos-query` skill as Ledgers' only database, fully toured. **Container names break the usual convention** — see Streams below.
- API ingress segment: not confirmed. This is a **multi-spec repo** (main Api, Api.Administration, Api.Internal). Sample route seen in the main spec's dictionary: `/armw/{patientId}/adjustment` (tag `Adjustment`) — doesn't obviously map to a `/ledger` ingress segment; not verified against actual ingress/nginx config.
- Function App code: none confirmed for this general-ledger service. (A separate "Ledger Remittance" Function App was documented once in the now-removed `function-apis` skill, but that content was deleted in a secrets audit and never had a home here — don't assume it still exists or applies to this repo generally.)

### Streams (6 containers confirmed via live Cosmos investigation — no `Events.md` exists for this repo)
<!-- system-generated: normally derived from references/Events.md; this repo has none, so this table is derived from references/cosmos_query.md's live-investigation findings instead. -->
Containers are prefixed `sd-` instead of the `snowdrop-{entity}-events` pattern used everywhere else, and container names are internal codenames, not descriptive entity names — always check the `id`/`StreamId` prefix for the real aggregate, not the container name.

| Aggregate | Container | Entity id | Notes |
|---|---|---|---|
| charge | `sd-charge-golden-box-events` | `{ChargeId}` | Main charge/transaction feed. StreamId namespace `snowdrop.ledger.charges` (lower-case — a second sighting elsewhere uses `Snowdrop.Ledger.Charges`, casing not resolved). Also holds `_version_`/`_snapshot_` housekeeping docs — filter `WHERE c.Type = "e"` for real events. |
| chargesummary | `sd-ledger-balance-events` | `{ChargeId}` | Shares this container with `patientsummary` below — distinguish via the `id` prefix. |
| patientsummary | `sd-ledger-balance-events` | `{PatientId}` | See above. |
| insurance | `sd-ledger-insurance-events` | not confirmed | `InsuranceReservedFundPosted` seen. |
| paymentpatient | `sd-patient-payment-pyramid-events` | not confirmed | Container name ("payment pyramid") does not match the aggregate it actually stores — same lesson as "golden box" storing charges. |
| (subscriptions) | `sd-ledger-migration-subscriptions`, `sd-ledger-subscriptions` | n/a | Non-event housekeeping containers, not aggregates. |

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. -->
- `references/cosmos_query.md` — confirmed database/containers, gotchas, timing-analysis findings, and the `ChargePostingFailed` error-code catalog. Ground truth for this repo — there's no `Events.md`.
- `references/Snowdrop.Ledger.Api.Dictionary.md` — condensed route listing, main spec.
- `references/Snowdrop.Ledger.Api.json` — full OpenAPI document, main spec.
- `references/Snowdrop.Ledger.Api.Administration.Dictionary.md` — condensed route listing, Administration spec.
- `references/Snowdrop.Ledger.Api.Administration.json` — full OpenAPI document, Administration spec.
- `references/Snowdrop.Ledger.Api.Internal.Dictionary.md` — condensed route listing, Internal spec.
- `references/Snowdrop.Ledger.Api.Internal.json` — full OpenAPI document, Internal spec.
