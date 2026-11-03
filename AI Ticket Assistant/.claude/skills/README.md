# Support Skills — index

This is the companion `README.md` for `.claude/skills/` — maintenance-only documentation, never read during normal investigative use (see root `CLAUDE.md`'s "Folder layout" section). It follows the annotation-placement policy in `documents/project-maintenance.md`: `SKILL.md` files stay plainly stated, and human-facing description lives here instead.

This folder holds the **project skills** for the Unlimited Systems support-investigation work. A skill is a folder containing a `SKILL.md` (YAML frontmatter + instructions). Claude Code loads them directly from `.claude/skills/` in any session of an environment that has this project folder attached (primary or additional). See [Loading these skills](#loading-these-skills).

## Scope: what counts as "a skill to sync"

**This README's inventory table is the definition of sync scope.** A skill is "in scope" — meaning the user and Claude should keep it maintained and free of duplicate copies elsewhere — if and only if it's listed in the table below. That covers skills built for and maintained by this workspace.

It deliberately excludes:
- **Third-party / externally-sourced skills** — anything installed from a plugin marketplace, an Anthropic-provided skill, or someone else's org (e.g. generic `docx`/`pdf`/`pptx`/`xlsx`, `schedule`, `skill-creator`, `morning`, engineering/data/qodo plugin skills). These aren't authored by this workspace and have no business having a source copy here.
- **Personal productivity skills unrelated to the support-investigation workflow** — e.g. `jira-implementing-and-ready`, `vacation-catchup`, `slack-channel-summary`, `office-hours`. These may be installed in the user's own profile but aren't part of "this workspace's" skill set.
- **Skills not yet decided on.** If a new installed skill shows up and it's ambiguous whether it belongs here, ask the user rather than assuming — add it to the table only once they confirm.

To bring a new skill into scope: add a row to the table below, then write the skill here. To take a skill out of scope: delete its folder here and remove its row below and its own `CLAUDE.md`/root reference — this table must always match the folders actually present in `.claude/skills/`.

## What's in this folder

| Item | Type | Purpose |
|---|---|---|
| `splunk-search/` | Skill | Search Splunk, trace requests, download logs, cache a QA org. Mature. |
| `cosmos-query/` | Skill | Query Cosmos DB / build Data Explorer deeplinks / event-feed StreamId lookups. Scaffold — has `{TODO-confirm}` placeholders. |
| `snowdrop-api-calls/` | Skill | Call authenticated Snowdrop/Unlimited Financials APIs (cookie auth, ingress URL mapping) from PowerShell or the logged-in browser — genuinely cross-repo mechanics, kept here. Two remittance-processing-specific call recipes live in that repo's `references/api-calls.md` instead; the per-service ingress table stays here, with the remittance-processing row annotated as a mirror of that repo's canonical `CLAUDE.md`. |
| `ticket-workflow/` | Skill | Manages the `tickets/{TICKET-ID}/` durable case-folder convention — start/resume/log/close a ticket, redirect Cosmos/Splunk downloads into it. Supports multiple projects: offers to create `tickets/` instead of refusing when absent, and derives the absolute download path from the session's project root rather than a hardcoded one. |
| `instana-query/` | Skill | Look up Kubernetes/APM data (CPU, memory, pod health) in IBM Instana. Browser-only, no MCP/API path. All 15 cluster IDs + all 9 Squad Herbert namespace IDs (7 prod envs) recorded; deployment-level IDs cached opportunistically. Auto-updates as new IDs are resolved. |
| `activate-repo/` | Skill | Sets the current investigation scope to one or more `repos/` folders — single, multi, squad-level, or pod-level (primary pod only) activation, resolved against root `CLAUDE.md`'s `## Repos` table, ask-don't-guess on no/multiple matches. Relative path when the project root is the working directory; absolute path when the project is an additional folder. |
| `blob-projection-fetch/` | Skill | Fetch a projection blob (e.g. the remittance projection) from Azure Blob Storage into a ticket's `downloads/`. Downloads via `az storage blob download --auth-mode login` (the Azure MCP storage tool returns properties only, not content), resolving the account/container/blob/destination from the repo's `blob_projections.md`. Authored fresh. |
| `api-testing/` | Skill | General rules for running, repeating and writing API test procedures: non-production only, approval before writes, investigate existing state first, evidence and reporting, browser-based API and Splunk mechanics. Each scenario's own procedure is a document in the project's `API Tests/` folder. Authored fresh. |
| `logging-correlation/` | Skill | Snowdrop structured-logging and W3C trace-correlation standard: conform a repo's logging (`references/conformance.md`) and follow one action across services by `TraceId` in Splunk (`references/flow-analysis.md`, which holds the trace-id sources, property dictionary by namespace and the SPL workflow). |
| `era-builder/` | Skill | Build an ERA (X12 835) from a conversation and upload it to the Remittance ERA upload endpoint from the signed-in Chrome tab. A JavaScript engine (`scripts/`) runs in the tab, so it handles very large ERAs. Includes organization lookup by name, claim, payer, company and patient lookups, saved files, and starting templates. |

> Related, outside `.claude/skills/`: reference docs live in `references/` (`namespaces.md`); instance-local memories in `memories/` (git-ignored).

## The skills

### splunk-search
Search Splunk logs across environments. Triggers: "search Splunk", "check logs", "trace this request", "download splunk logs", "cache org", "cache QA org".
Covers: Chrome fast-path URL search, confirmed field conventions, the Serilog `MessageTemplate` log shape, the `sid`-based JSON result-extraction method + the `[BLOCKED]` content-filter workaround, three-field trace lookup, "Handled" success inference, FAN→guarantor lookup, the bulk download-logs procedure, and QA-org caching with the `00000000-0000-` guardrail.

### cosmos-query (scaffold)
Generate Cosmos SQL / Data Explorer deeplinks / local PowerShell for event-feed lookups. Triggers: "query cosmos", "data explorer", or a pasted `sdsh.unlimitedfinancials.{env}/...` remittance URL.
Covers: account naming `king-{env}-sharp-be-cdb`, remittance-URL parsing, prod-write safety, the StreamId event-feed query model, master-key (HMAC) auth (AAD is rejected — different Entra tenant), and per-env access reality (ninja = key script works; others = Data Explorer). Many entity containers/partition keys are still `{TODO-confirm}` — don't treat placeholders as fact.

### snowdrop-api-calls
Generate and run authenticated HTTP calls to Snowdrop/Unlimited Financials Azure-hosted web services. Triggers: "call/test/hit the {service} API", a pasted `api.unlimitedfinancials.*`/`snowdrop/{service}` URL, or a supplied `SharpAuth`/`SharpOrg` session cookie.
Covers: the non-obvious ingress URL/path mapping (external path ≠ swagger "servers" URL), cookie-based auth, and 401/404 diagnosis. Works from PowerShell (`scripts/Invoke-SnowdropApi.ps1`) or by driving the logged-in browser. Bundled references: `auth-and-ingress.md`, `troubleshooting.md`.

### ticket-workflow
Manages the `tickets/{TICKET-ID}/` durable case-folder convention. Triggers: "start a ticket for UF-XXXXX", "resume/continue work on UF-XXXXX", "close out UF-XXXXX", "log/summarize this for the ticket".
Covers: folder shape (`summary.md` dated log + `downloads/`), start/resume/log/close behaviors, redirecting Cosmos/Splunk download instructions into the ticket's `downloads/` folder instead of the generic scratch locations, and the write boundary (it's a plain folder in the repo, no sync step).
History: the second Jira comment was titled "How To Test" and held only manual test steps. It is now titled "Testing" with sections Unit testing, Automated API testing, Claude API testing (only when the user had Claude call APIs) and How to Test Manually. Changed 2026-11-09 after UF-17865.

### instana-query
Look up Kubernetes/APM data in IBM Instana. Triggers: "check instana", "look in instana", a pasted `*.instana.io` URL, or a request for a deployment/namespace's memory/CPU/health.
Covers: browser-only access via Claude in Chrome (no MCP/API path exists), the confirmed single-tenant base URL (`unlmtdsys-unlmtdsys.instana.io` — constant across environments, unlike other services' per-env hosts), and why `namespaceId`/`deploymentId` in deeplinks are opaque and must be found via UI search rather than substitution. Several facts are still open (custom time-range click path, non-prod env coverage, whether OOM/restart events surface directly) — see the skill's "Open questions" section.

### activate-repo
Sets the current investigation scope to one or more repo folders under `repos/`. Triggers: "activate repo {name}", "activate repo {name} and {name}", "activate repos for all squad {squad name} repos", "activate repos for all pod {pod name} repos".
Covers: resolution against root `CLAUDE.md`'s `## Repos` table (folder name or nickname, case/spacing/hyphen-insensitive), ask-don't-guess on no match or multiple matches, reading only the resolved repo's own `CLAUDE.md` (not `references/`/`business-logic/` yet) — relative path when the project root is the working directory, absolute path when the project is an additional folder. There is no separate Claude Code slash command.

### blob-projection-fetch
Fetches a projection blob from Azure Blob Storage into a ticket's `downloads/`. Triggers: "get/fetch/pull the {name} projection", "blob projection".
Covers: resolving the storage account, container, blob path and destination from the repo's `references/blob_projections.md` and the account name pattern in root `CLAUDE.md`; downloading with `az storage blob download --auth-mode login` (`key` on ninja) and saving into the ticket's `downloads/`; never inferring a path for a projection with no catalog entry, and never using SAS tokens or connection strings (the account key is used only on ninja, read-only).

### api-testing
Runs, repeats and writes API test procedures. Triggers: "run the {name} API test", "repeat the rule order test", "test this through the API", "write up how to repeat this test", or a pointer to a file in `API Tests/`.
Covers: where procedures live (`API Tests/`, one file per scenario with a header naming its original ticket), the standing rules common to all of them (non-production environments and organizations only, approval for every write, investigate existing state first, read back and record evidence in the ticket folder, report ids in full, label facts as confirmed, from code or inferred, stop-and-ask triggers), how to update a procedure after a run, and how to write a new one from `references/procedure-template.md`. Bundled reference: `references/browser-api-mechanics.md` (Claude in Chrome in-page API calls, tool limits, polling, upload and Splunk read patterns). The first procedure is `API Tests/rule-sequence-order.md` (from UF-16594).

### logging-correlation
Applies and verifies the logging standard in a Snowdrop .NET repo, and traces a flow across services. Triggers: "make this repo's logging conform", "add trace correlation", "trace this flow", "follow this TraceId", "what happened to remittance X".
Covers: the settled design decisions (W3C `TraceId` as the key, `sharp-events` not modified), nine conformance changes (consumer rehydration, `ScopeProperties.WithTrace`, Serilog `ActivityEnricher`, `ActivitySource` registration, `ILogger` conversion, fan-in `LinkedTraceIds`, request-logging filter, `[LogKeys]`, Functions middleware), and the flow analysis workflow with the three trace-id sources. Uses `splunk-search` for Splunk mechanics and `references/namespaces.md` for namespaces.

### era-builder
Builds and sends test ERAs. Triggers: "build an ERA with two claims", "make an ERA like this sample", "deny the second claim with CO-50", "make an ERA with 5,000 claims", "show me the ERA so far", "send it to ninja for org X", or `/era-builder`.
Covers: the model-in-the-page engine (`scripts/era-core.js`, `era-x12.js`, `era-view.js`, `era-io.js`), starting from a template, a saved file, a pasted ERA or an earlier upload, the field model and parser rules, upload with immediate and current-state validation, and lookups that fill the ERA from real data (organization by name, claim number, company, payer, patient, random claims). Bundled references: `reference/engine.md`, `era-model.md`, `send-via-chrome.md`, `lookups.md`, `claim-lookup.md`, `claim-sampling.md`, `name-lookup.md`; templates in `templates/`. Used by `api-testing` procedures that upload test ERAs. Production-tier environments need explicit confirmation before every upload. The organization lookup uses `references/org-lookup.md`.

## Loading these skills

The skills are project skills: Claude Code loads them from `.claude/skills/` in any session of an environment that has this project folder attached, and an edit is live in the next session. Nothing is published or copied by hand.

- **Verify** by starting Claude Code in this project and checking that the skills are listed.
- **Duplicates.** A folder with the same name in `~/.claude/skills/` loads alongside the project copy and may be older. Remove the duplicate.

## Project files these skills rely on

1. **Referenced facts.** `no-truncate-guids` and `qa-org-identification` live in root `CLAUDE.md` (`## Language` and `## Environments`); `snowdrop-event-type-field` lives in `.claude/skills/cosmos-query/SKILL.md`'s Conventions section; `chargepayment-maps-to-charge` and `nimbus-system-user-id` live in `repos/snowdrop-remittance-processing-be/business-logic/ChargePaymentCardinality/CLAUDE.md` and top-level `business-logic/CLAUDE.md` respectively.
2. **`references/namespaces.md` and `references/org-lookup.md`.** The skills point to them for service↔namespace mapping and organization lookup.
3. **Environment access.** Azure and Splunk queries run on the user's machine (Azure MCP / PowerShell / Data Explorer / browser).

## Source-of-truth reminder

Edit skills here. If a skill behaves differently from what is written here, check for a duplicate in `~/.claude/skills/` before assuming the source is wrong.
