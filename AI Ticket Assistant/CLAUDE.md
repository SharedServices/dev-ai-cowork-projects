# Support Investigation Workspace

This directory is a personal workspace for supporting web apps that span Azure Cosmos DB, Azure Blob Storage, Splunk, and .NET code. The goal of capabilities here is fast evidence-gathering across those four surfaces during customer issues.

This file is scoped to normal, day-to-day use of the workspace. Before making any change to the workspace's own structure, rules, or skills, read `documents/project-maintenance.md` first — see "Project maintenance" at the end of this file.

## Language

Avoid metaphor, analogy, idiom, and filler. Prefer plain, literal, concise language. State uncertainty plainly rather than dressing it up.

**Show GUIDs and other ids in full — never abbreviate.** Applies to TraceId, SpanId, and any entity id (OrganizationId, GuarantorId, CompanyId, PatientId, ChargeMasterId, FAN, etc.) in summaries, tables, or prose sent to the user. A truncated id can't be copy-pasted back into Splunk or Cosmos, or matched against another system. Internal tool displays may still truncate for space; what gets reported to the user is always the full value.

## Current user

The user's Squad, Pod and Source path (the Windows path of the attached source folder, recorded by `initiate project`) for this instance are kept in `local/user.md` — git-ignored, one small file per local copy, created by `initiate project`. The file also holds the Claude account's name and email as reference only. Read it when a task depends on which squad's or pod's repos to default to, where the source code is, or who the user is. On Claude Code started in this project, read it by relative path. If the file is missing or a setting is blank, treat it as unset and do not ask unprompted; suggest `initiate project` only when a squad- or pod-scoped default or a source lookup would have mattered.

## Source Code

The source code for the repos this project describes is in a parent folder, in subfolders with the same name as the repos in this project. The user attaches that parent folder to the Cowork project in the project settings; `initiate project` records its Windows path as Source path in `local/user.md`.

- **Cowork** can read source only if that folder is attached to the project (and, for a folder attached after a session started, only in a new session). Look for it among the session's attached folders first. Cowork cannot run `dotnet build` or `dotnet test`; those go through Claude Code.
- **Claude Code** reads source at the Source path in `local/user.md`, provided that path is accurate.
- If no source is attached and Source path is unset, say so and suggest attaching the folder and running `initiate project`; do not guess a location. Searching one level of the source folder is fine; a recursive sweep of the whole tree times out, so search within a named repo's subfolder.

## Project initiation

**When the user says "initiate project"** (or asks to set up, onboard, or do first-time setup on this project instance) — read `skills/initiate-project/SKILL.md` and follow it exactly. It covers recording the user's Squad and Pod (asked for, not passed as arguments), and the Source path read from the attached source folder, in `local/user.md` (warning when no source folder is attached), packaging the skills in `skills/README.md` as cards to save to the account (account skills load in both Cowork and Claude Code), listing duplicate personal skills to remove, and smoke-testing Claude for Chrome and Splunk access. It runs in Cowork only and refuses in Claude Code. The Source path is read from the project's attached source folder, not typed.

## Squads

Squads are being replaced by pods; both are kept until squads are retired. Index of squads this workspace supports — the counterpart to `## Repos`' Squad column, and the list the Squad in `local/user.md` is chosen from. Keep current as squads are added or renamed.

| Squad | Alias |
|---|---|
| Financial Ledger | Herbert |
| Financial Clearance | — |
| Billing & AR | Shelby |
| Platform | — |

## Pods

Index of pods — the counterpart to `## Repos`' Pod column, and the list the Pod in `local/user.md` is chosen from. Source: Confluence "Pod Ownership" (https://sharpfm.atlassian.net/wiki/spaces/PE/pages/5536514058/Pod+Ownership), which lists functionality per pod, not repositories; repo-to-pod assignments are initial guesses. Names are the bare pod names, without the lead.

| Pod |
|---|
| Ledger |
| Remittance |
| Quality |
| Activity & Charge Processing |
| AR Management |
| Portals |
| Financial Clearance |
| Payments & Security |
| Scheduling & Intake |
| Auth & Data Framework |
| Interoperability |
| Notes & Attachments |

## Folder layout (shared knowledge surface)

This project folder is the shared knowledge surface between the Claude app and Claude Code. This `CLAUDE.md` is the only file auto-loaded every session — the rest is a library to read when relevant.

**Companion `README.md` files are never read or relied on during normal investigative use.** Every `README.md` in this project (this one at the root, each repo's own, `skills/README.md`) is maintenance-only documentation — plain human-facing description plus historical color (what changed, when, and why) kept out of the machine-facing `CLAUDE.md`/`SKILL.md` files. Pull behavior and structure from `CLAUDE.md`/`SKILL.md` files only; open a `README.md` only while doing maintenance work per `documents/project-maintenance.md`.

**Claude Code sync scope:** when asked to sync/scan this project, scan **only** `CLAUDE.md`, `references/`, and `skills/`. Do **not** scan `local/`, `memories/`, `cosmos-access/`, or `documents/` — the first three are local to the instance, the last is maintenance-only; none is shared investigative knowledge.

Shared (scan these):

- **`CLAUDE.md`** — this file: the layout map plus the workspace operating rules below.
- **`references/`** — published, tracked lookup docs shared across repos: `namespaces.md`, `cowork-flow-analysis.md`. Never hand-edited in place — see `documents/project-maintenance.md`. Per-repo reference material (including `Events.md`, ground truth for a repo's events — a curated skill summary being silent on something doesn't mean it doesn't exist) lives inside that repo's own `repos/{repo}/references/` instead, not here.
- **`repos/`** — per-repo folders (`CLAUDE.md`, `README.md`, `references/`, `business-logic/`, `known-failures/`). See `documents/project-maintenance.md` before creating a new one.
- **`business-logic/`** — cross-repo (or not-yet-homed) business facts; see `business-logic/CLAUDE.md`. Not covered by `activate-repo` — check separately.
- **`known-failures/`** — cross-repo (or not-yet-homed) known-failure patterns; see `known-failures/CLAUDE.md`. Empty so far.
- **`templates/`** — skeletons for scaffolding new repos, business-logic categories, and known-failure patterns. Maintenance-only — see `documents/project-maintenance.md` before using one.
- **`skills/`** — skill **sources** (`SKILL.md` folders): currently `splunk-search`, `cosmos-query`, `snowdrop-api-calls`, `ticket-workflow`, `instana-query`, `activate-repo`, `initiate-project`, `blob-projection-fetch`. `skills/README.md` holds the full inventory and Claude Code setup instructions — maintenance-only, don't read it during normal use; the individual `SKILL.md` files auto-trigger on their own. Source, not live — a skill reaches the Claude account when its card, presented by `initiate project`, is saved; account skills then load in both Cowork and Claude Code (desktop app).

Local (do not scan):

- **`local/`** — per-user settings for this instance of the project; currently `user.md` (Squad, Pod and Source path, plus the account's name and email for reference — see `## Current user`). Ignored by git, so never committed and never present in a new instance created from GitHub. Settings, not memories.
- **`memories/`** — memories local to this instance of the project: one `.md` per memory plus a `MEMORY.md` index. Ignored by git, so never committed and never present in a new instance created from GitHub. Read the index and pull the relevant file when a question may depend on something recorded locally. Not Claude's own app memory (which is stored outside the project) and not `references/` (which is published and tracked) — see `documents/project-maintenance.md`.
- **`scratch/`** — disposable, single-use execution scripts (e.g. a one-off "purge and evaluate these 3 remittances" `.ps1` generated for the user to run locally). These have no lasting value once run and are NOT shared knowledge — never put a reusable template, tool, or anything referenced by a skill here. Any script generated for a one-time action against a specific org/remittance/environment goes in `scratch/`, not the project root, so it never gets confused with real project files or skill templates (`skills/*/scripts/`, `cosmos-access/scripts/`). Cleanup is manual — the user deletes from `scratch/` on their own via the file system whenever they like; Claude does not need to ask permission or track what's still needed, since nothing in this folder is ever load-bearing.

Maintenance (read only per `documents/project-maintenance.md`, not during normal use):

- **`documents/`** — `project-maintenance.md` (read before changing this project's own structure, rules, or skills), `workspace-plan.md` (current status of decisions — what's implemented, decided-but-not-built, and still open), and `testing/` (the navigation-test spec, its human-readable rendering, and the Claude Code automation harness that exercises this project's own manifests/skills — read `testing/README.md` before running or extending it).

Case records (open directly when working a specific ticket — not part of the general scan, but not disposable scratch either):

- **`tickets/{TICKET-ID}/`** — one folder per Jira ticket under active or past investigation. See "Ticket folders" below for the full convention. Unlike `cosmos-access/` and `scratch/`, this is durable and meant to outlive any single conversation — the folder, not the chat history, is the source of truth for "what did we find on UF-XXXXX."

## Repos

Index of repo folders under `repos/` — keep this table current whenever a repo folder is added or a repo's scope changes. This table exists so resolving "which repo is this question about" is a single cheap read of an already-auto-loaded file, not a filesystem search — that stops mattering at one repo but won't stay that way.

| Repo folder | Squad | Pod (guess) | Nickname | Scope |
|---|---|---|---|---|
| `snowdrop-remittance-processing-be` | Financial Ledger (Herbert) | Remittance | Remittance Processing | Remittance and claim-payment lifecycle, reserved funds, vendor settings, the rules engine |
| `snowdrop-remittance-be` | Financial Ledger (Herbert) | Remittance | Remittance (BE) | Raw remittance/check record, EOB attachments, bank reconciliation and posting status — a different repo from Remittance Processing despite the similar name |
| `snowdrop-charge-master-be` | Financial Ledger (Herbert) | Ledger | Charge Masters | Company charge master catalogues (procedure/charge codes) and their fee data |
| `snowdrop-guarantors-be` | Financial Ledger (Herbert) | Quality | Guarantors | Patient guarantors — the party responsible for a patient's account |
| `snowdrop-patients-api-be` | Financial Ledger (Herbert) | Quality | Patients API (BE) | Patient demographic/identity records |
| `snowdrop-payers-api-be` | Financial Ledger (Herbert) | Quality | Payers | Payers, plans, contracts, fee schedules, vendor settings, eligibility |
| `snowdrop-resources-be` | Financial Ledger (Herbert) | Quality | Resources | Companies, facilities, providers, payment devices/vendors, monthly close, division ledgers |
| `snowdrop-ledger-be` | Financial Ledger (Herbert) | Ledger | Ledgers | General ledger — patient/account-level charge and payment posting |
| `snowdrop-commandcenter-be` | Platform | Quality | Command Center | Bulk actions. Platform squad, transferred from Financial Ledger (Herbert). |
| `phoenix-be` | Platform | Interoperability | Phoenix | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-activities-be` | Billing & AR (Shelby) | Activity & Charge Processing | Activities | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-analytics-be` | Platform | Auth & Data Framework | Analytics | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-audit-log-be` | Platform | Interoperability | Audit Log | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-catalogs-be` | Billing & AR (Shelby) | Quality | Catalogs | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-change-healthcare-be` | Billing & AR (Shelby) | Quality | Change Healthcare | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-charge-assemblies-be` | Billing & AR (Shelby) | Activity & Charge Processing (alt: Quality) | Charge Assemblies | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-charge-interventions-be` | Billing & AR (Shelby) | Quality | Charge Interventions | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-custom-fields-be` | Platform | Quality | Custom Fields | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-episodes-be` | Billing & AR (Shelby) | Quality | Episodes | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-financial-counselor-be` | Financial Clearance | Financial Clearance | Financial Counselor | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-identifiers-be` | Platform | Quality | Identifiers | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-intake-be` | Financial Clearance | Scheduling & Intake | Intake | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-interventions-be` | Platform | Payments & Security | Interventions | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-invoices-be` | Billing & AR (Shelby) | AR Management | Invoices | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-notes-v2-be` | Platform | Notes & Attachments | Notes V2 | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-patient-providers-be` | Financial Clearance | Quality | Patient Providers | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-patientagreements-be` | Financial Clearance | Quality | Patientagreements | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-patientencounters-be` | Billing & AR (Shelby) | Quality | Patientencounters | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-payer-portfolios-v2-be` | Billing & AR (Shelby) | AR Management | Payer Portfolios V2 | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-payments-be` | Financial Clearance | Payments & Security | Payments | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-plans-search-be` | Financial Ledger (Herbert) | Quality | Plans Search | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-policies-be` | Financial Clearance | Financial Clearance | Policies | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-policyauthorizations-be` | Financial Clearance | Financial Clearance | Policyauthorizations | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-policyreferrals-be` | Financial Clearance | Financial Clearance | Policyreferrals | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-previsit-validation-be` | Financial Clearance | Financial Clearance | Previsit Validation | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-rte-be` | Financial Clearance | Financial Clearance | Rte | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-scheduling-be` | Financial Clearance | Scheduling & Intake | Scheduling | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-security-be` | Platform | Payments & Security | Security | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-security-functional-be` | Platform | Payments & Security | Security Functional | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-sets-be` | Billing & AR (Shelby) | Quality | Sets | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-statements-be` | Billing & AR (Shelby) | Activity & Charge Processing | Statements | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-unlimited-connectors-be` | Financial Clearance | Interoperability | Unlimited Connectors | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-waypoints-be` | Billing & AR (Shelby) | Activity & Charge Processing | Waypoints | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `snowdrop-workflows-be` | Billing & AR (Shelby) | Activity & Charge Processing | Workflows | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `unlimited-engagement-brands-be` | Financial Clearance | Quality | Engagement Brands | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `unlimited-engagement-communication` | Financial Clearance | Quality | Engagement Communication | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| `unlimited-engagement-patient-portal-be` | Financial Clearance | Portals | Engagement Patient Portal | OpenAPI documents only (pulled from the release blob container); scope not yet described |
| — | Platform | Quality | Code Systems | No repo folder. Namespace `snowdrop-code-systems`. |
| — | Platform | Payments & Security | Graph API | No repo folder. Namespace `snowdrop-graphapi`. |
| — | Platform | Notes & Attachments | Notes (Unlimited API) | No repo folder. Namespace `snowdrop-notes-unlimitedapi`. |

Squad and pod are recorded in each repo's own `CLAUDE.md` Identity section, which is the canonical source; this table is a rollup of them. `references/namespaces.md` maps services to Splunk namespaces and does not repeat them. Activation by pod uses the primary pod only; an "alt" pod noted in this table does not match. Rows with `—` as the repo folder are services with no repo folder here and cannot be activated.

**Resolution rule — do not scan to find or guess a repo.** Resolve which repo a question concerns using this table (exact or unambiguous match) or by asking the user — the same exact-match caution `commands/activate-repo.md` uses below. **Never run an exploratory Glob/Grep sweep of `repos/` or the wider project** to answer "which repo is this," to find a repo whose name wasn't given, or to compensate for a manifest that seems incomplete. That doesn't scale as repos are added, costs more with every repo in the folder, and risks pulling in the wrong repo's content. Once a repo is resolved, read only that repo's own `CLAUDE.md` and the specific files it names from there — not sibling repos, not extra reads "just in case" a narrower one might be insufficient. If a repo's manifest genuinely doesn't have enough to answer, that is a gap in the manifest to flag and fix — not a reason to broaden the search.

## Repo activation

**When the user says "activate repo {name}"** — including multiple names in one request, or a squad- or pod-level request like "activate repos for all squad {squad} repos" or "activate repos for all pod {pod} repos" — read `skills/activate-repo/SKILL.md` and follow it exactly. It handles resolving the name(s) against the `## Repos` index table above (folder name or nickname, spacing/hyphen/case-insensitive), reading each resolved repo's `CLAUDE.md` (see that file's Steps section for the path on each platform), and setting scope for the rest of the conversation. This skill is the sole trigger path for repo activation on both platforms. On both platforms the skill loads from the account once its card is saved; if it is not listed in `/skills` on Claude Code, read the file directly. See `documents/workspace-plan.md`'s "Not yet decided" section for what's deliberately deferred until repo count grows enough to revisit (typo tolerance, an explicit alias table).

## Ticket folders

**Why:** Cowork conversation history is local-only and not guaranteed to persist (no cloud sync, reports of lost/truncated session history). Rather than relying on the chat transcript as the record of an investigation, each ticket gets a durable folder in the project itself — `tickets/{TICKET-ID}/` — so work can be resumed in a brand-new conversation, or picked up by Claude Code for deeper code analysis, without depending on any particular chat surviving. Established 2026-07-29, piloted on UF-15610.

**Full skill:** `skills/ticket-workflow/SKILL.md` is the sole source for the folder shape, the `summary.md` template, and the start/resume/log/close/Jira-comment triggers — read it rather than reconstructing the shape from memory here, since it's the file this workspace keeps current as the convention evolves. Covers redirecting Cosmos/Splunk downloads into `tickets/{TICKET-ID}/downloads/` instead of `cosmos-access/results/`, and the Claude Code handoff (no special sync step needed — it's just a folder Code can read directly when working in this repo).

## Environments

All customer-facing infrastructure is replicated across these environments. Each environment has the same Cosmos databases/containers and the same blob path conventions — only the account name changes.

| env    | tier        | notes |
|--------|-------------|-------|
| ninja    | dev             | in-process developer testing |
| team     | QA              | QA testing |
| one      | release         | regular release testing |
| exchange | hotfix release  | hotfix release testing; commonly referred to by the alias **exch** |
| cloud    | production      | |
| app    | production  | |
| care   | production  | |
| space  | production  | |
| uno    | production  | |
| blue   | production  | newer production-tier env |
| live   | production  | newer production-tier env |

Note: `prod` is not itself an environment — it's shorthand/grouping label for "the production-tier environments" (used when scoping a command/query to all of them at once). Never list it as a peer of the named envs above.

**Production envs:** `cloud`, `app`, `care`, `space`, `uno`, `blue`, `live`. Treat these with extra care — read-only queries are fine, but any write/delete/update operation against production must be confirmed explicitly with the user before running, regardless of how it's been authorized previously. Never assume prior approval extends from a non-prod env to a prod env.

**QA organizations:** within any environment, an `organizationId` beginning `00000000-0000-` identifies a QA/test org, not a real customer org — production organizations never use this prefix. When asked to filter for "QA orgs" vs "non-QA orgs" (in Cosmos, Splunk, or anywhere else organizationId appears), filter on this prefix. A QA org referred to by its short suffix expands to the full form, e.g. `4039-5141-94427f8c3ed9` → `00000000-0000-4039-5141-94427f8c3ed9`.

## Application URLs (remittance view)

When the user pastes a URL of this shape, parse it to extract env/org/remittance — these are the standard inputs to cosmos queries and other lookups. Don't ask the user to re-state them.

**Format:**
```
https://sdsh.unlimitedfinancials.{env}/{organizationId}/payers/payer/{payerId}/remittance/{remittanceId}
```

**Example (ninja):**
```
https://sdsh.unlimitedfinancials.ninja/7516f05b-68d9-4095-9edd-348f4b1788c4/payers/payer/e042b656-a451-406b-9d01-a953a7794401/remittance/fb85fd1f-a9ec-49a3-862b-d97b304f44b0
```
- host suffix `ninja` → **env**: `ninja`
- path segment 1 `7516f05b-68d9-4095-9edd-348f4b1788c4` → **organizationId**
- path segment 4 `e042b656-a451-406b-9d01-a953a7794401` → **payerId** (ignore unless explicitly asked about payers)
- path segment 6 `fb85fd1f-a9ec-49a3-862b-d97b304f44b0` → **remittanceId**

The host pattern `sdsh.unlimitedfinancials.{env}` was confirmed for `ninja` on 2026-05-14. Other envs are presumed to follow the same pattern but haven't been seen yet — if a host suffix doesn't match a known env, ask before guessing.

## Azure Cosmos DB

- **Account naming pattern:** `king-{env}-sharp-be-cdb`
- **Structure:** identical across all environments — same databases, same containers. Within an account, one dedicated database per service is the default (e.g. `snowdrop-guarantors`, `snowdrop-patients`, `snowdrop-payers`); a shared `snowdrop` database (charge masters, episodes, intake, invoices, etc.) is the exception — see the skill for the confirmed map, don't guess a new entity's database.
- **Tenant:** accounts are homed in Entra tenant `sharedsvs.onmicrosoft.com` (NOT the org's own `unlimitedsystems.com` tenant). Portal/Data Explorer work cross-tenant, but data-plane AAD tokens and ARM `listKeys` from the org's tenant are rejected (except ninja, which grants `listKeys`).
- **Skill:** `skills/cosmos-query/SKILL.md` (built — StreamId query model, master-key REST auth, per-env access, gotchas, Data Explorer deeplinks). Installed to the account through the card presented by `initiate project`.
- **Tooling:** `cosmos-access/scripts/Query-Remittance.ps1` (ninja, key auth, remittance-processing only) writes JSON to `cosmos-access/results/`. For anything else — a different entity, or any non-ninja env — run the StreamId SQL in Data Explorer, export JSON into `cosmos-access/results/`, Claude reads it.

## Azure Blob Storage

- **Accounts:** each environment has three blob storage accounts — standard, premium, and feeschedule. Account names have no dashes, unlike the Cosmos account pattern. Each environment's accounts are in the Azure subscription named `uf-kingdom - {Env}` (e.g. `uf-kingdom - Space`); pass that display name as the subscription.

  | Account | Name pattern |
  |---|---|
  | Standard | `king{env}sharpsdstg` |
  | Premium | `king{env}sharpdocpremstg` |
  | Feeschedule | `king{env}feeschedulesstg` |

  `{env}` is the environment name from the table above, with one exception: for `exchange`, the standard account uses `exchange` (`kingexchangesharpsdstg`), while the premium and feeschedule accounts use `exch` (`kingexchsharpdocpremstg`, `kingexchfeeschedulesstg`).
- **Projection blobs:** many repos store projections as JSON blobs. A repo's projection blobs are listed in that repo's `references/blob_projections.md`; the repo is resolved through `## Repos`. To locate a projection blob: open that file, find the entry by the name the user uses (e.g. "the remittance projection"), take its storage account type and path template, fill the template's placeholders from known values, and use the account name for that environment from the table above. Each path template begins with the container name, followed by the blob name.

  Many projections share one general pattern: `Organizations/{organizationId}/{type full name with dots replaced by dashes}/{id}.json`, with the ids lowercase. That pattern is not guaranteed for every type, and what `{id}` is (remittance id, claim payment id, composite id, etc.) differs per projection, so some entries are case-by-case knowledge. Do not infer a path for a projection that has no entry; ask.
- **Container/folder (feeschedule account):** varies by which solution stored the fee schedule — seen so far: `snowdrop-payers`, `snowdrop-chargemasters`. Pick the folder matching the producing service (e.g. a `ChargeMasterFeesStored` event → `snowdrop-chargemasters`).
- **Path conventions:** first data point confirmed 2026-07-07, via a charge master's `ChargeMasterFeesStored` Cosmos event (see `skills/cosmos-query/SKILL.md`): blob container `snowdrop-chargemasters`, path `Organization/{organizationId}/Schedule/{scheduleId}/Version/{versionGuid}/...`. Only seen for charge masters so far — don't generalize the `Organization/.../Version/...` shape to other entities until confirmed. Large event payloads can be blob-referenced (a pointer in the Cosmos event's `Data`) rather than stored inline — worth checking for on any event whose `Data` looks suspiciously small for what it claims to represent.
- **Skill:** `skills/blob-projection-fetch/SKILL.md` — Claude Code downloads the blob with `az storage blob download --auth-mode login` (the Azure MCP storage tool returns blob properties only, not content); the Claude app resolves account/container/blob/destination and outputs a paste block for Claude Code. Claude Code cannot be triggered from the Claude app.

## Splunk

- **Access — Chrome only. Never use an MCP/connector or a sandbox/API call for Splunk.** There is no working Splunk MCP and the sandbox can't reach Splunk. Every Splunk request goes through the `splunk-search` skill's Claude-for-Chrome flow (build the search URL, run in Browser 1, extract results via the `sid` JSON method). This applies from the first mention of Splunk, before the skill fully loads.
- **Index pattern:** `sharp-app-aks-{env}-king` (e.g. `sharp-app-aks-ninja-king`)
- **Field conventions & result extraction:** documented in the `splunk-search` skill (installed account-wide)
- **Service → namespace mapping:** see `references/namespaces.md`
- **Skill:** `splunk-search` (installed) — SPL templates, field conventions, investigation workflow

## Investigation principles

**Check that a file or folder exists with a directory listing (`ls` in bash, or Read on the path), never with Glob alone.** Glob matches files, not folders, so a pattern like `tickets/*` returns nothing when the folder holds only subfolders. An empty Glob result is not evidence that something is missing; confirm with a second method before saying so or asking the user to create it.

**When something should have happened per the event history but didn't, don't jump to "no explanation" or "it's a bug."** Resolve the repo(s) involved (see `## Repos` above), then check that repo's own `business-logic/CLAUDE.md` — if the documented rules explain the result exactly as configured, that's expected behavior, not a defect. Only if the rules don't explain it — every condition satisfied but the effect still never landed — check that repo's own `known-failures/CLAUDE.md` for a matching confirmed defect before concluding there's no cause.

**Changing a published event's shape or semantics is a last-ditch effort, not a routine fix option.** Events are cross-team contracts — consumers exist outside the producing solution and outside the producing team's visibility. Any proposal that alters an existing event needs an explicit impact-plus-no-alternative justification and consumer-team sign-off; exhaust read-side/projection-side fix options first. Applies project-wide, to any repo.

**Never hand the user a file path containing a literal placeholder token.** Any time a skill's own documentation shows an example path with a bracketed token like `{timestamp}` or `{TICKET-ID}`, that notation is for describing the pattern — it must never survive into an actual path sent in a message. Compute real values (env, ids already known; date/time via `date` in bash) fresh every single time, not just the first time in a session. Before sending any file path to the user, scan it for a stray `{`/`}` — if found, stop and substitute the real value first.

## Azure Function APIs

- **App name pattern:** `king-{env}-{app}-fa` (varies — confirmed names live per-repo now, see below)
- **Auth:** function key via `x-functions-key` header
- **Note:** API calls must be made from your local machine — the Cowork shell cannot reach Azure endpoints directly
- **Skill:** none. No function app currently has a documented home in this workspace, and no function keys should be stored anywhere in this project — see root `README.md` for why.

## Project maintenance

Before creating or renaming a repo/skill/business-logic category, editing any `CLAUDE.md`, updating a skill, or changing a project-wide rule (including this file), read `documents/project-maintenance.md` — it covers the how-to and the annotation-placement policy that normal use doesn't need loaded.
