# Support Skills — index & Claude Code setup

This is the companion `README.md` for `skills/` — maintenance-only documentation, never read during normal investigative use (see root `CLAUDE.md`'s "Folder layout" section). It follows the annotation-placement policy in `documents/project-maintenance.md`: `SKILL.md` files stay plainly stated, and historical color lives here instead.

This folder holds the editable **source** for the Unlimited Systems support-investigation skills. A skill is a folder containing a `SKILL.md` (YAML frontmatter + instructions). The same format works in the Claude app, Claude Code, and the Agent SDK — but the project's `skills/` folder is only the source. A skill reaches the Claude account when its `.skill` card is saved (`initiate project`, run in Cowork, presents the cards), and account skills load in both Cowork and Claude Code (desktop app). See [Using these in Claude Code](#using-these-in-claude-code).

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
| `ticket-workflow/` | Skill (source) | Manages the `tickets/{TICKET-ID}/` durable case-folder convention — start/resume/log/close a ticket, redirect Cosmos/Splunk downloads into it. Supports multiple projects: offers to create `tickets/` instead of refusing when absent, and derives the absolute download path from the session's own project path rather than a hardcoded one. Runs the same on Claude Code started in this project; either platform writes `summary.md` and `downloads/`, only Claude Code writes `code-analysis/`. |
| `instana-query/` | Skill (source) | Look up Kubernetes/APM data (CPU, memory, pod health) in IBM Instana. Browser-only, no MCP/API path. All 15 cluster IDs + all 9 Squad Herbert namespace IDs (7 prod envs) recorded; deployment-level IDs cached opportunistically. Auto-updates as new IDs are resolved. |
| `activate-repo/` | Skill (source) | Sets the current investigation scope to one or more `repos/` folders — single, multi, or squad-level activation, resolved against root `CLAUDE.md`'s `## Repos` table, ask-don't-guess on no/multiple matches. Relative path on Cowork and on Claude Code started in this project; full path of the attached folder on Claude Code started in another repo. Sole source for this behavior on both platforms. |
| `initiate-project/` | Skill (source) | First-time setup and re-sync, run in Cowork only (refuses in Claude Code). Optional argument `{squad}`. Records Squad, and the Source path read from the project's attached source folder (plus the account's name and email for reference) in the git-ignored `local/user.md`, packages the skills in this table as `.skill` cards, lists personal Claude Code skills that duplicate them, and smoke-tests Claude for Chrome and a Splunk query. Explicit, on-demand trigger ("initiate project"). |
| `blob-projection-fetch/` | Skill (source) | Fetch a projection blob (e.g. the remittance projection) from Azure Blob Storage into a ticket's `downloads/`. Claude Code downloads via `az storage blob download --auth-mode login` (the Azure MCP storage tool returns properties only, not content); the Claude app resolves the account/container/blob/destination from the repo's `blob_projections.md` and outputs a self-contained "fetch blob projection" paste block, since it cannot reach Azure or trigger Claude Code. Authored fresh. Also moved Claude Code into the `downloads/` write scope for fetched evidence (`ticket-workflow` updated to match). |

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
Covers: resolution against root `CLAUDE.md`'s `## Repos` table (folder name or nickname, case/spacing/hyphen-insensitive), ask-don't-guess on no match or multiple matches, reading only the resolved repo's own `CLAUDE.md` (not `references/`/`business-logic/` yet) — relative path on Cowork and on Claude Code started in this project, full path of the attached folder on Claude Code started in another repo. This skill is the sole source for this behavior on both platforms; there is no separate Claude Code slash command.

### initiate-project
**Cowork only** — first-time setup and re-sync. Triggers: "initiate project", "initiate project {squad}", "set up this project", "onboard me", "first-time setup". Refuses when run from Claude Code.
Covers: recording Squad (from the argument if given, else asking) and the Source path (read from the attached source folder, never typed; warns if none is attached or if more than one needs a choice) in the git-ignored `local/user.md` (the Claude account's name and email are filled in as reference without asking), packaging/presenting the skills via `skill-creator` with a plain-language line per skill, giving the user a one-time block that removes same-named personal skills from `~/.claude/skills/` (they would load as duplicates of the account copies), and smoke-testing Claude for Chrome (tab/navigate/screenshot round-trip) and Splunk (one small, cheap, known-good search against `ninja`) so connectivity gaps surface on day one instead of mid-investigation.

## Using these in Claude Code

Skills saved to the Claude account (Settings → Capabilities) load in Claude Code in the desktop app as well as in Cowork, shown as `anthropic-skills:{name}`. Observed in the desktop app's Code tab and in the terminal CLI, where the skill loads when invoked even though `/skills` did not list it. IDE extensions have not been checked.

- **One publish path.** `initiate project`, run in Cowork, presents `.skill` cards. Saving them serves both products. Nothing is copied into Claude Code by hand.
- **Re-run `initiate project` in Cowork after any edit under `skills/`**, then save the re-presented cards. Edits to `skills/` are not live in Claude Code until the card is saved.
- **Verify** by starting Claude Code and running `/skills`; the `anthropic-skills:` entries should be listed.
- **Personal copies duplicate account skills.** A folder in `~/.claude/skills/` with the same name loads alongside the account copy and may be older. `initiate project` gives the user a one-time block that removes them.
- Claude Code skill folders (`~/.claude/skills/`, `<repo>/.claude/skills/`) still work for a skill that should exist only in Claude Code. None of this workspace's skills are in that category.

## Important: dependencies these skills assume

These skills were written for the Claude app, where they can draw on app memory and local project files. **Claude Code's memory is a separate store**, so a skill that relied on app memory can lose context. With Claude Code started in this project, the project files below load normally; the items to provide are:

1. **Referenced facts.** `no-truncate-guids` and `qa-org-identification` live in root `CLAUDE.md` (`## Language` and `## Environments`); `snowdrop-event-type-field` lives in `skills/cosmos-query/SKILL.md`'s Conventions section; `chargepayment-maps-to-charge` and `nimbus-system-user-id` live in `repos/snowdrop-remittance-processing-be/business-logic/ChargePaymentCardinality/CLAUDE.md` and top-level `business-logic/CLAUDE.md` respectively. None of these are a Claude Code dependency gap — all load as ordinary project files, no memory store needed.
2. **`references/namespaces.md`.** The skills point to it for service↔namespace mapping. Copy it alongside (or into the repo) and keep the `references/namespaces.md` path, or update the references.
3. **`cosmos-access/` tooling.** `cosmos-query` hands the user `Query-Remittance.ps1` (project root) as a remittance-processing-specific alternative to Data Explorer. That script must exist locally for it to work.
4. **Environment access.** All of these note the sandbox can't reach Azure/Splunk; queries run on the user's machine (PowerShell / Data Explorer / browser). That holds in Claude Code too.

## Retired skills

`initiate project` adds these names to the list of personal Claude Code skills to remove. Add a name here whenever a skill leaves the inventory.

- `activate-cowork` — loaded a Cowork project's `CLAUDE.md` into a Claude Code session started elsewhere. Retired when Claude Code started in this project folder became the primary mode, since the project is then already the working directory.
- `reference-ticket` — loaded a ticket folder into a Claude Code session. Retired for the same reason; `ticket-workflow` now runs on Claude Code directly ("resume ticket UF-XXXXX").

## Source-of-truth reminder

This folder is the **master**. From here you publish two ways, none auto-syncing:

- **Claude app:** package the folder into a `.skill` (via the `skill-creator` flow — see `documents/project-maintenance.md`'s "Updating skills" section) → present it → click **Save skill**. The installed copy in the account only matches this source once that Save click has happened — assume it's stale otherwise, and re-present after any source edit.
- **Claude Code (desktop app):** loads the same account skills, so saving the card publishes to both.

Edit here, then re-run `initiate project` in Cowork. If a correction surfaces on either the Claude Code or Claude app side, check both the source here and the installed copy before assuming which one is stale — they can drift in either direction.
