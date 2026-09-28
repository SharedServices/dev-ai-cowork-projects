## Instructions specific to Remittance (BE)

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-remittance-be`
- Squad: Financial Ledger (Herbert)
- Nickname: Remittance (BE) — deliberately distinct from "Remittance Processing," a different repo/database entirely. Don't shorten either to just "Remittance" in a context where both could be meant.
- Cosmos namespace / database: `snowdrop-remittance` (dedicated — confirmed distinct from `snowdrop-remittanceprocessing` 2026-07-07, do not conflate)
- API ingress segment: `remittance` — **Pattern B (flat passthrough, no `/snowdrop/` prefix)**, external path `/remittance/<route>`, unlike remittance-processing's Pattern A. A sibling `/remittance/swagger` ingress has no `auth-url` annotation at all — reachable with no cookie, useful as a no-auth reachability probe.
- Function App code: none confirmed. No dedicated Azure Function app has been identified for this repo as of 2026-09-18 — don't assume one exists just because remittance-processing has one.

### Streams (one event stream confirmed, plus a separate read-model container — not the same thing)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. Regenerate fresh from Events.md when that file is refreshed, rather than hand-patching stale rows. The "Notes" column is the one hand-authored piece inside this generated table. -->
| Stream | Container | Entity id | Notes |
|---|---|---|---|
| Remittance | `snowdrop-remittance-events` | `RemittanceId` | aggregate-type segment `remittance`; StreamId `snowdrop-remittance->{organizationId}->remittance->{remittanceId}` |

**Separate from the above (confirmed, don't conflate):**
- `snowdrop-remittance-events-manual` — a second container, **structurally identical** to `snowdrop-remittance-events` (not a "manual entry" log, despite the name). The same event types route to either container depending on which entities they target, and which one an event lands in isn't predictable from `EventType` alone — check both when tracing an entity.
- `snowdrop-remittance-lease` — Change Feed processor lease storage, standard Cosmos pattern (also seen on `snowdrop-resources`), not event data.
- `snowdrop-remittance-data` — a **read-model/projection container**, not raw events. Holds documents like `RemittanceCheckGridItem` (partition `RemittanceCheckGridItem/{organizationId}`), queried directly by fields like `PostingStatus`/`IsDiscarded` rather than by StreamId. Used by the unreconciled-check-backlog detection query in `../snowdrop-remittance-processing-be/known-failures/oversized-unreconciled-check-backlog-breaks-payer-for-remittances/CLAUDE.md` — don't assume every query against this repo's data goes through the event stream above.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file present under references/, each with a one-line description. Add/remove a bullet whenever a file is added/removed from references/. -->
- `references/Events.md` — every event class, property, enum for the Remittance stream. Ground truth.
- `references/EventEnums.md` — every enum name and its member values, generated from `Events.md`'s Model Types → Enums section (e.g. `PostingStatus` = `Unknown`/`New`/`Reconciled`/...). **Check here, not the full OpenAPI spec, when a request/response schema references an enum by name** — confirmed the spec only declares these as bare integers with no member names (checked `PostingStatus`), so opening the `.json` spec for this specific purpose is a dead end. Generated file — regenerate with `references/generate-enums.py` after `Events.md` refreshes, never hand-edit it.
- `references/Snowdrop.Remittance.Api.Dictionary.md` — condensed API route/method/tag listing (read this before the full spec).
- `references/Snowdrop.Remittance.Api.json` — full OpenAPI document.
- `references/cosmos_query.md` — StreamId query, `PostingStatus` enum, `LedgerDate` mechanics, other confirmed Cosmos-level facts.
- `references/api-calls.md` — reconciliation discard/restore endpoints and the swagger no-auth quirk.

### Business logic
Looking for how something is supposed to work: `business-logic/CLAUDE.md`.

### Known failure patterns
Looking for a confirmed defect: `known-failures/CLAUDE.md`.
