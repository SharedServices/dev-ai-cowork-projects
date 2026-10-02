# Support Skills — index & Claude Code setup

This is the companion `README.md` for `skills/` — maintenance-only documentation, never read during normal investigative use (see root `CLAUDE.md`'s "Folder layout" section). It follows the annotation-placement policy in `documents/project-maintenance.md`: `SKILL.md` files stay plainly stated, and historical color lives here instead.

This folder holds the editable **source** for the Unlimited Systems support-investigation skills. A skill is a folder containing a `SKILL.md` (YAML frontmatter + instructions). The same format works in the Claude app, Claude Code, and the Agent SDK — but the stores are separate and **do not sync**, so to use these in Claude Code you copy the folders in (see [Using these in Claude Code](#using-these-in-claude-code)).

## Scope: what counts as "a skill to sync"

**This README's inventory table is the definition of sync scope.** A skill is "in scope" — meaning the user and Claude should keep its local source and its published/installed copy(s) in agreement — if and only if it's listed in the table below. That covers skills built for and maintained by this workspace (whether authored here from scratch or built ad hoc in Cowork and later backfilled here).

It deliberately excludes:
- **Third-party / externally-sourced skills** — anything installed from a plugin marketplace, an Anthropic-provided skill, or someone else's org (e.g. generic `docx`/`pdf`/`pptx`/`xlsx`, `schedule`, `setup-cowork`, `skill-creator`, `morning`, engineering/data/qodo plugin skills). These aren't authored by this workspace and have no business having a source copy here.
- **Personal productivity skills unrelated to the support-investigation workflow** — e.g. `jira-implementing-and-ready`, `vacation-catchup`, `slack-channel-summary`, `office-hours`. These may be installed in the user's Cowork profile but aren't part of "this workspace's" skill set.
- **Skills not yet decided on.** If a new installed skill shows up and it's ambiguous whether it belongs here, ask the user rather than assuming — add it to the table only once they confirm.

To bring a new skill into scope: add a row to the table below, then either copy its installed source in (if it already exists as an installed skill) or write it fresh here. To take a skill out of scope: delete its folder here and remove its row below and its own `CLAUDE.md`/root reference — this table must always match the folders actually present in `skills/`.

## What's in this folder

| Item | Type | Purpose |
|---|---|---|
| `splunk-search/` | Skill (source) | Search Splunk, trace requests, download logs, cache a QA org. Mature. |
| `cosmos-query/` | Skill (source) | Query Cosmos DB / build Data Explorer deeplinks / event-feed StreamId lookups. Scaffold — has `{TODO-confirm}` placeholders. |
| `snowdrop-api-calls/` | Skill (source) | Call authenticated Snowdrop/Unlimited Financials APIs (cookie auth, ingress URL mapping) from Claude Code (PowerShell) or the Claude app (browser) — genuinely cross-repo mechanics, kept here. Two remittance-processing-specific call recipes live in that repo's `references/api-calls.md` instead; the per-service ingress table stays here, with the remittance-processing row annotated as a mirror of that repo's canonical `CLAUDE.md`. |
| `ticket-workflow/` | Skill (source) | Manages the `tickets/{TICKET-ID}/` durable case-folder convention — start/resume/log/close a ticket, redirect Cosmos/Splunk downloads into it. Supports multiple projects: offers to create `tickets/` instead of refusing when absent, and derives the absolute download path from the session's own project path rather than a hardcoded one. |
| `instana-query/` | Skill (source) | Look up Kubernetes/APM data (CPU, memory, pod health) in IBM Instana. Browser-only, no MCP/API path. All 15 cluster IDs + all 9 Squad Herbert namespace IDs (7 prod envs) recorded; deployment-level IDs cached opportunistically. Auto-updates as new IDs are resolved. |
| `activate-repo/` | Skill (source) | Sets the current investigation scope to one or more `repos/` folders — single, multi, or squad-level activation, resolved against root `CLAUDE.md`'s `## Repos` table, ask-don't-guess on no/multiple matches. Full Windows path on Claude Code, relative path on Cowork. Sole source for this behavior on both platforms — no separate Claude Code slash command exists. No automatic Claude Code trigger yet, though — that needs this folder copied into that project's own `.claude/skills/`, not yet done. |
| `initiate-project/` | Skill (source) | First-time setup on a fresh project instance — records the user's Squad (plus the account's name and email for reference) in the git-ignored `local/user.md`, checks which in-scope skills (this table) are already installed and packages/presents the rest with plain-language wording, and smoke-tests Claude for Chrome and a Splunk query. Explicit, on-demand trigger ("initiate project") — replaced an earlier implicit "on first use" trigger that proved unreliable. |
| `activate-cowork/` | Skill (source) | **Claude-Code-only** — the Claude-Code-side counterpart to `activate-repo`: activates a Cowork project's shared knowledge folder (e.g. this one) from within a Claude Code session, and auto-activates whichever repo inside it matches the repo Claude Code is currently sitting in. Backfilled here from an installed Claude Code copy — has no Cowork-side equivalent (Cowork already knows what project it's in) and never needs packaging into a `.skill` for the Claude app. |
| `reference-ticket/` | Skill (source) | **Claude-Code-only** — loads a Claude app (CoWork) `tickets/{TICKET-ID}/` case folder into a Claude Code session so code analysis builds on findings already gathered there, then defaults any generated analysis doc to that ticket's `code-analysis/` folder. Resolves the ticket's base path against whichever Cowork project is active in the current session (set by `activate-cowork` or an explicit project activation) rather than a fixed workspace — updated 2026-09-30 after it was found hardcoded to `Consolidated` and missed tickets living under this project instead. Backfilled here from an installed Claude Code copy; no Cowork-side equivalent (Cowork already knows what ticket folder it's in). |
| `blob-projection-fetch/` | Skill (source) | Fetch a projection blob (e.g. the remittance projection) from Azure Blob Storage into a ticket's `downloads/`. Claude Code downloads via `az storage blob download --auth-mode login` (the Azure MCP storage tool returns properties only, not content); the Claude app resolves the account/container/blob/destination from the repo's `blob_projections.md` and outputs a self-contained "fetch blob projection" paste block, since it cannot reach Azure or trigger Claude Code. Authored fresh. Also moved Claude Code into the `downloads/` write scope for fetched evidence (`ticket-workflow`, `reference-ticket` updated to match). |

> Related, outside `skills/`: reference docs live in `references/` (`namespaces.md`, `cowork-flow-analysis.md`); PowerShell tooling in `cosmos-access/`; instance-local memories in `memories/` (git-ignored).

## The skills

### splunk-search
Search Splunk logs across environments. Triggers: "search Splunk", "check logs", "trace this request", "download splunk logs", "cache org", "cache QA org".
Covers: Chrome fast-path URL search, confirmed field conventions, the Serilog `MessageTemplate` log shape, the `sid`-based JSON result-extraction method + the `[BLOCKED]` content-filter workaround, three-field trace lookup, "Handled" success inference, FAN→guarantor lookup, the bulk download-logs procedure, and QA-org caching with the `00000000-0000-` guardrail.

### cosmos-query (scaffold)
Generate Cosmos SQL / Data Explorer deeplinks / local PowerShell for event-feed lookups. Triggers: "query cosmos", "data explorer", or a pasted `sdsh.unlimitedfinancials.{env}/...` remittance URL.
Covers: account naming `king-{env}-sharp-be-cdb`, remittance-URL parsing, prod-write safety, the StreamId event-feed query model, master-key (HMAC) auth (AAD is rejected — different Entra tenant), and per-env access reality (ninja = key script works; others = Data Explorer). Many entity containers/partition keys are still `{TODO-confirm}` — don't treat placeholders as fact.

### snowdrop-api-calls
Generate and run authenticated HTTP calls to Snowdrop/Unlimited Financials Azure-hosted web services. Triggers: "call/test/hit the {service} API", a pasted `api.unlimitedfinancials.*`/`snowdrop/{service}` URL, or a supplied `SharpAuth`/`SharpOrg` session cookie.
Covers: the non-obvious ingress URL/path mapping (external path ≠ swagger "servers" URL), cookie-based auth, and 401/404 diagnosis. Works in both Claude Code (PowerShell via `scripts/Invoke-SnowdropApi.ps1`) and the Claude app (drive the logged-in browser). Bundled references: `auth-and-ingress.md`, `troubleshooting.md`.

### ticket-workflow
Manages the `tickets/{TICKET-ID}/` durable case-folder convention. Triggers: "start a ticket for UF-XXXXX", "resume/continue work on UF-XXXXX", "close out UF-XXXXX", "log/summarize this for the ticket".
Covers: folder shape (`summary.md` dated log + `downloads/`), start/resume/log/close behaviors, redirecting Cosmos/Splunk download instructions into the ticket's `downloads/` folder instead of the generic scratch locations, and the Claude Code handoff (no sync step needed — it's a plain folder in the repo).

### instana-query
Look up Kubernetes/APM data in IBM Instana. Triggers: "check instana", "look in instana", a pasted `*.instana.io` URL, or a request for a deployment/namespace's memory/CPU/health.
Covers: browser-only access via Claude for Chrome (no MCP/API path exists), the confirmed single-tenant base URL (`unlmtdsys-unlmtdsys.instana.io` — constant across environments, unlike other services' per-env hosts), and why `namespaceId`/`deploymentId` in deeplinks are opaque and must be found via UI search rather than substitution. Several facts are still open (custom time-range click path, non-prod env coverage, whether OOM/restart events surface directly) — see the skill's "Open questions" section.

### activate-repo
Sets the current investigation scope to one or more repo folders under `repos/`. Triggers: "activate repo {name}", "activate repo {name} and {name}", "activate repos for all squad {squad name} repos".
Covers: resolution against root `CLAUDE.md`'s `## Repos` table (folder name or nickname, case/spacing/hyphen-insensitive), ask-don't-guess on no match or multiple matches, reading only the resolved repo's own `CLAUDE.md` (not `references/`/`business-logic/` yet) — full Windows path on Claude Code, relative path on Cowork. This skill is the sole source for this behavior on both platforms; there is no separate Claude Code slash command. No automatic Claude Code trigger yet, though — that needs this folder copied into that project's own `.claude/skills/`, not yet done.

### initiate-project
First-time setup on a fresh project instance. Triggers: "initiate project", "set up this project", "onboard me", "first-time setup".
Covers: recording the user's Squad in the git-ignored `local/user.md` (asking and offering the `## Squads` list if the file is missing or Squad is blank; the Claude account's name and email are filled in as reference without asking), diffing this table's in-scope skills against what's already installed in the session and packaging/presenting the rest via `skill-creator` with a plain-language line per skill, and smoke-testing Claude for Chrome (tab/navigate/screenshot round-trip) and Splunk (one small, cheap, known-good search against `ninja`) so connectivity gaps surface on day one instead of mid-investigation.

### activate-cowork
**Claude-Code-only.** Loads a Cowork project's shared knowledge folder into a Claude Code session, and auto-activates whichever repo inside it matches the repo Claude Code is currently working in. Triggers: "activate cowork {name}", "activate cowork project {name}".
Covers: resolving `{cowork-folder}` against the subfolders of `C:\Users\JamesMoorhouse\Claude\Projects\`, matching the current Claude Code repo's folder name against a project's `## Repos` table (same case/spacing/hyphen-insensitive rule `activate-repo` uses), and degrading gracefully for a Cowork project with no repo index at all. Exists because Claude Code — unlike Cowork — has no built-in awareness that a Cowork project exists or that the repo it's sitting in has curated content there.

### reference-ticket
**Claude-Code-only.** Loads a Claude app (CoWork) `tickets/{TICKET-ID}/` case folder into a Claude Code session. Triggers: "reference ticket UF-XXXXX", "pull up UF-XXXXX", "load ticket UF-XXXXX".
Covers: resolving the ticket's base path against whichever Cowork project is active in the session (`{active-cowork-project}\tickets\{TICKET-ID}\`) rather than a hardcoded workspace, reading `summary.md` + inventorying `downloads/` for grounding, and defaulting any generated analysis doc to that ticket's `code-analysis/` folder for the rest of the session without re-asking. Asks rather than guessing when no project has been activated yet, since more than one project can hold a matching ticket folder.

## Using these in Claude Code

Claude Code discovers skills from the local filesystem only. Copy the **skill folder** (not the `.skill` zip) into one of:

- **Personal — available in every project:** `~/.claude/skills/`
- **Project — committed to a repo, shared with the squad:** `<repo>/.claude/skills/`

**Use the personal location for this workspace's skills, not project-scoped.** Most of these (`ticket-workflow`, `activate-repo`, `cosmos-query`, `splunk-search`, `snowdrop-api-calls`, `instana-query`, `reference-ticket`) need to trigger while Claude Code is sitting in some *other* repo's checkout during actual ticket work (e.g. `snowdrop-payers-api-be`), not this project — a copy scoped to a single repo's `.claude/skills/` wouldn't be visible from there.

Copy **every** folder under `skills/` (not a hand-picked subset — a fixed list here just goes stale as new skills are added, which is exactly what happened to this section before this note was added):

```bash
mkdir -p ~/.claude/skills
cp -r "<this-folder>"/*/ ~/.claude/skills/
```

Run this from inside the project folder (so `<this-folder>` is just `skills/`, no absolute path needed) — simplest as the very first Claude Code action when setting up a new machine, before switching into any service repo.

Claude Code picks them up automatically (verify with `/skills` or by triggering one). Editing the copied `SKILL.md` updates Claude Code immediately — no reinstall step, unlike the app.

## Important: dependencies these skills assume

These skills were written for the Claude app, where they can draw on app memory and local project files. **Claude Code's memory is a separate store and its sessions are not rooted in this project**, so plain copies can lose context. To make them fully functional in Claude Code, also provide:

1. **Referenced facts.** `no-truncate-guids` and `qa-org-identification` live in root `CLAUDE.md` (`## Language` and `## Environments`); `snowdrop-event-type-field` lives in `skills/cosmos-query/SKILL.md`'s Conventions section; `chargepayment-maps-to-charge` and `nimbus-system-user-id` live in `repos/snowdrop-remittance-processing-be/business-logic/ChargePaymentCardinality/CLAUDE.md` and top-level `business-logic/CLAUDE.md` respectively. None of these are a Claude Code dependency gap — all load as ordinary project files, no memory store needed.
2. **`references/namespaces.md`.** The skills point to it for service↔namespace mapping. Copy it alongside (or into the repo) and keep the `references/namespaces.md` path, or update the references.
3. **`cosmos-access/` tooling.** `cosmos-query` hands the user `Query-Remittance.ps1` (project root) as a remittance-processing-specific alternative to Data Explorer. That script must exist locally for it to work.
4. **Environment access.** All of these note the sandbox can't reach Azure/Splunk; queries run on the user's machine (PowerShell / Data Explorer / browser). That holds in Claude Code too.

## Source-of-truth reminder

This folder is the **master**. From here you publish two ways, none auto-syncing:

- **Claude app:** package the folder into a `.skill` (via the `skill-creator` flow — see `documents/project-maintenance.md`'s "Updating skills" section) → present it → click **Save skill**. The installed copy in the account only matches this source once that Save click has happened — assume it's stale otherwise, and re-present after any source edit.
- **Claude Code:** copy folder → `~/.claude/skills/` (personal) or `<repo>/.claude/skills/` (project).

Edit here, then re-push to whichever surface you use. If a correction surfaces on either the Claude Code or Claude app side, check both the source here and the installed copy before assuming which one is stale — they can drift in either direction.
