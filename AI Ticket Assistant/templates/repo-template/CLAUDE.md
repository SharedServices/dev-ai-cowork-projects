# Repo template — CLAUDE.md skeleton

This is not a real repo's manifest — it's the skeleton to copy when a new `repos/{repo-name}/` folder is created. Delete this header line and everything above the `---` when you copy it.

Every block below is tagged as one of:
- **hand-authored** — requires domain judgment (an investigation, a confirmed gotcha, a naming decision). Write it once, update it when something changes. No script will ever produce this content correctly.
- **system-generated** — a mechanical rollup of what's already in this repo's own folder (a file listing, a table derived from another file, a list of subfolders with their one-line descriptions). No automation exists yet to produce these, so today a human or Claude assembles them by hand — but strictly by following the stated recipe, not by adding editorial judgment, so a future script can take over the exact same section without changing its shape or meaning. When you regenerate one of these sections, re-derive it fresh from the source it names rather than hand-editing the old rollup.

Each tag is left in as an HTML comment in the real file — it's for whoever (human or Claude) maintains the file, and costs nothing since Claude doesn't act on comments unless told to.

---

## Instructions specific to {repo-name}

### Identity (machine-facing — this is the canonical source; `references/namespaces.md` and any generated index are downstream of this, not the other way around)
<!-- hand-authored: confirmed once per repo via ingress/Helm/Cosmos investigation. No infra-scanning tool exists yet to derive these automatically — until one does, treat every field here as a fact that was confirmed, not assumed, and note how/when it was confirmed if that's not obvious. -->
- Repo: `{repo-folder-name}`
- Squad: {squad name} ({program name, e.g. Herbert, if applicable})
- Pod: {pod name}
- Nickname: {short human name used in conversation}
- Cosmos namespace / database: `{cosmos-namespace}`
- API ingress segment: `{ingress-segment}` (note here if this repo is a multi-spec/sub-service repo, the way `ledger-be`, `payers-api-be`, `resources-be` are — that changes how the ingress segment maps to routes)
- Function App code: `{function-app-code}` (pattern: `king-{env}-{function-app-code}-...` — state the exact pattern; don't assume it's derivable from the namespace or ingress segment above, it usually isn't)

### Streams ({N} confirmed — format is per-stream, not one repo-wide convention)
<!-- system-generated: derived from references/Events.md's stream/entity-id groupings. Regenerate this table fresh from Events.md any time that file is refreshed, rather than hand-patching stale rows. The "Notes" column is the one hand-authored piece inside this generated table — gotchas and caveats a plain listing wouldn't surface. -->
| Stream | Container | Entity id | Notes |
|---|---|---|---|
| {stream name} | {cosmos container name} | {entity id shape, e.g. a single id or a composite} | {hand-authored gotcha or caveat, if any — leave blank if none} |

**Separate from the above (state only if true):** note here if this repo has a Splunk-only log container distinct from its Cosmos event container(s) — don't let a query or search conflate the two.

### Where to look for more (read only the one that answers the actual question — don't load all of them)
<!-- system-generated: one bullet per file actually present under references/, each with a one-line description of what it holds. Add or remove a bullet whenever a file is added or removed from references/ — don't leave a bullet pointing at a file that no longer exists, or a file with no bullet. -->
- `references/Events.md` — {one-line description}
- `references/{other-reference-file}.md` — {one-line description}

### Business logic
<!-- hand-authored, one line: point at the category index, don't inline its contents. Omit this section if the repo has no business-logic/ folder. -->
Looking for how something is supposed to work: `business-logic/CLAUDE.md`.

### Known failure patterns
<!-- hand-authored, one line: point at the category index, don't inline its contents. Omit this section if the repo has no known-failures/ folder. -->
Looking for a confirmed defect: `known-failures/CLAUDE.md`.
