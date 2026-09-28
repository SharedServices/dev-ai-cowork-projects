## Instructions specific to remittance processing

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically. -->
- Repo: `snowdrop-remittance-processing-be`
- Squad: Financial Ledger (Herbert)
- Nickname: Remittance Processing
- Cosmos namespace / database: `snowdrop-remittanceprocessing`
- API ingress segment: `remittanceprocessing` (single segment — this repo isn't a multi-spec/sub-service repo the way `ledger-be`, `payers-api-be`, `resources-be` are)
- Function App code: `sdrp-remproc` (pattern: `king-{env}-sdrp-remproc-orchestration` — a third, unrelated naming scheme, not derivable from the namespace above)

### Streams (six confirmed — format is per-stream, not one repo-wide convention)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. Regenerate fresh from Events.md when that file is refreshed, rather than hand-patching stale rows. The "Notes" column is the one hand-authored piece inside this generated table. -->
| Stream | Container | Entity id | Notes |
|---|---|---|---|
| Remittance | `snowdrop-remittanceprocessing-events` | `RemittanceId` | dashed/short StreamId convention; carries the great majority of event types |
| Claim Payment | same | composite `{RemittanceId}-{ClaimPaymentId}` | same aggregate-type name as Remittance, distinguished only by the composite id; only event: `RemittanceClaimPaymentPosted`, and only via the posting-queue backfill path |
| Reserved Funds | same | `RemittanceId` | |
| Vendor | same | `OrganizationId` itself (not a distinct entity id — one doc per org) | org-level settings, no `RemittanceId` at all |
| Rule | same | `RuleId` | entity-type constants confirmed in code; exact event shape not yet sampled live |
| Sequence | same | `SequenceId` | same caveat as Rule — inferred, not yet sampled |
| Ledger Charge (cross-app, not published from here) | `Snowdrop.Ledger.Charges` — different source app | `ChargeId` | referenced in this repo's event resources but never targeted by an event here; see Ledger's own docs, not this repo's |

**Separate from the above:** `snowdrop-remittanceprocessing-eventbatchfunctions` is a **Splunk** container_name for batch-function logs — not a Cosmos event container, don't conflate the two when a query or search mentions "the remittanceprocessing container."

### Where to look for more (read only the one that answers the actual question)
<!-- system-generated: one bullet per file present under references/, each with a one-line description. Add/remove a bullet whenever a file is added/removed from references/. -->
- `references/Events.md` — every event class, property, enum for every stream above. Ground truth; a curated summary being silent on something is not evidence it doesn't exist.
- `references/EventEnums.md` — every enum name and its member values, generated from `Events.md`'s Model Types → Enums section (e.g. `ReservedFundType` = `ReservedFund`/`Reapplication`). **Check here, not the full OpenAPI spec, when a request/response schema references an enum by name** — the spec only declares these as bare integers with no member names, so opening it for this specific purpose is a dead end. Generated file — regenerate with `references/generate-enums.py` after `Events.md` refreshes, never hand-edit it.
- `references/cosmos_query.md` — ready-to-run Cosmos queries, gotchas (housekeeping docs, the `RemittanceClaimPaymentPosted` stream gotcha, cross-stream prefix queries).
- `references/Snowdrop.RemittanceProcessing.Services.Dictionary.md` — condensed route listing (read this before the full spec).
- `references/Snowdrop.RemittanceProcessing.Services.json` — full API spec, including the cookie-auth-reachable orchestration routes.
- `references/api-calls.md` — cookie-auth orchestration routes, and the remittance fetch/discard workflow (discard itself hits `remittance`-be, not this repo — noted inline). The `snowdrop-api-calls` skill holds the generic call mechanics (URL patterns, auth, troubleshooting) since those apply to every repo, not just this one.

### Business logic
Looking for how something is supposed to work: `business-logic/CLAUDE.md`.

### Known failure patterns
Looking for a confirmed defect: `known-failures/CLAUDE.md`.
