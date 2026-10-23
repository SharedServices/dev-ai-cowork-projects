# Known-Failure Detection: Plan to Host Instructions in This Project

Status: proposed, not built. Maintenance-only document; not read during normal investigative use.

## Current state

The daily job `known-failure-detection-daily` is a Cowork scheduled task. Its stored prompt is self-contained and holds all of the following:

- Slack channel id for results (James's DM, `DJ0BJKNES`).
- Two Confluence pages on `sharpfm.atlassian.net`: "Known Failure - Potential Occurrences" (page id `5627346945`, space REP) and "Known Failure Status" (page id `5633114134`, space SHAR).
- Search window (`-24h@h` to `@h`), the environment list, and the QA-org exclusion (organization ids beginning `00000000-0000-`).
- The SPL for pattern `KF-AUTOPOST-INIT`.
- The procedure: run, classify hits as new or repeat, update both pages, post to Slack only when there are new hits.
- Message formats.

No file in this project is read during a run. The project is connected only by:

- The project `CLAUDE.md`, which loads as session context but is not used by the procedure.
- A path in the prompt to the analysis file `repos/snowdrop-remittance-processing-be/known-failures/auto-post-arePosting-append-lost-leaves-claim-payment-initialized/CLAUDE.md`. It is text for the user's later analysis step and is never opened by the run.
- The `splunk-search` skill, which runs from the copy installed on the account. Its source is in `skills/splunk-search/`.

## Goal

Maintain the detection instructions in this project and reduce the schedule or routine prompt to a short pointer. Adding or changing a pattern then needs only a file edit, with no schedule edit.

## Proposed design

### 1. Skill `known-failure-detection`

Source in `skills/known-failure-detection/SKILL.md`. It owns the mechanics:

- Procedure steps (date, run searches, failure handling, new-versus-repeat rule, doc updates, Slack post).
- Table column layouts for both Confluence pages.
- Slack message formats.
- Environment list and the `exch` index name for exchange.
- Rule that Splunk is reached only through Claude in Chrome using the `splunk-search` skill.

Per `project-maintenance.md`, `SKILL.md` is the sole owner of this mechanical detail; `CLAUDE.md` should carry only a Why and a pointer.

### 2. One file per pattern, with separate sections

Each pattern's detection, verification and analysis live in that pattern's own `CLAUDE.md`, under the repo's `known-failures/{pattern-name}/`. This is decided: detection goes in a separate section of the pattern's `CLAUDE.md`, not in a separate file. The skill gets its pattern list from the parent `known-failures/CLAUDE.md` index. Adding a pattern is then a new or edited folder in the repo.

Sections in each pattern `CLAUDE.md`, in order:

- **Signature:** what the failure is, in plain terms.
- **Detection:** the SPL and any Cosmos queries or read-only API calls that find candidate occurrences, written with parameters (environment, organization id, time window) so the same text serves both the scheduler and a ticket investigation. Everything in this section must be safe to run unattended.
- **Verification:** steps that confirm a candidate is a real occurrence. Each step is marked `scheduler-safe` or `interactive-only`. Interactive-only steps are ones that cannot or should not run in the scheduler (for example steps that need a person's judgment, a browser session with a user cookie, or a large or slow query).
- **Analysis:** root-cause analysis and fix guidance, used by the user in a session.

### 3. No duplicate instructions between the scheduler and ticket analysis

The scheduled detection and the detection done during normal ticket analysis overlap almost completely, so the procedure is written once.

- The Detection and Verification sections of the pattern `CLAUDE.md` are the single source. The scheduler runs Detection (and the `scheduler-safe` Verification steps) with the standard window. A ticket investigation runs the same Detection section with the ticket's organization, environment and time range, then continues into the `interactive-only` Verification steps and Analysis.
- `known-failure-detection` carries only what is specific to the scheduled run: window, environment list, the new-versus-repeat rule, Confluence updates and Slack posting. It must not restate any pattern's SPL, queries or steps.
- Ticket analysis (the `ticket-workflow` skill and the `analyze known failure {pattern id}` request) points to the pattern `CLAUDE.md` rather than copying its steps.
- A pattern is changed in one place only. Mechanical detail follows the single-owner rule in `project-maintenance.md`.

### 4. Claude Code scope: Cosmos queries and read-only API calls

When the job moves to Claude Code, Detection and scheduler-safe Verification may include Cosmos queries (through the `cosmos-query` skill) in addition to Splunk. Read-only API calls (through the `snowdrop-api-calls` skill) and Function (Orchestration) calls are interactive-only. This changes the current rule "detect and report only; do not query Cosmos or call service APIs", which must be rewritten for the routine prompt.

Constraints to carry into the routine prompt and skill:

- Every Cosmos query is read-only. No writes, deletes or purges in any environment. (API and Function calls, when a person runs them interactively, are likewise `GET`-style only.)
- Production environments get read-only queries only; no operation that changes state.
- Cosmos queries are `scheduler-safe`. Verified 2026-10-13 on uno: a scheduled task (`cosmos-uno-smoke-test`) ran a read-only StreamId query through the Azure MCP `cosmos` tool and returned the expected rows. Other environments are unverified (key and access rules vary, and the accounts are in the `sharedsvs.onmicrosoft.com` tenant, see `cosmos-query`). Run the same smoke test per environment before relying on Cosmos there. Until then, a Cosmos access failure on an unverified environment is recorded as "unverified".
- Splunk is reached only through Claude in Chrome (`splunk-search` skill).
- API calls (`snowdrop-api-calls`, cookie authentication `SharpAuth`/`SharpOrg`) and Function (Orchestration) calls are expected to work from a routine but are unverified. They are `interactive-only`, and may stay so for security reasons even if verified. Moving any of them to `scheduler-safe` needs an explicit decision, and for the API a confirmed way for an unattended routine to obtain and refresh a valid cookie.
- Keep query volume bounded: scope by organization id and a time range taken from the Splunk hit, not whole-container scans.

### 5. Slim schedule or routine prompt

The prompt keeps only the scope limits and the pointer:

- Run the `known-failure-detection` skill.
- Unattended run; do not ask questions.
- Read-only on all environments, including any Cosmos queries. No API or Function (Orchestration) calls (interactive-only).
- Writes only to the two Confluence pages and Slack channel `DJ0BJKNES`.
- Exclude QA orgs.
- Show all ids in full.
- Finish with one summary line.

**Why the limits stay in the prompt:** content read from a file during a run is data, not a direct instruction from the user. Allowed write targets and the read-only rule must come from the stored prompt so an unattended run cannot be redirected by a file edit.

## Requirements and risks

- The skill reaches the account only when its card is saved. Cowork does this through `upgrade project`, which presents the card. Edits to the skill do not reach the schedule until the card is re-saved.
- If pattern definitions are read from project files at run time, the project folder must be mounted and reachable when the schedule fires. A Claude Code routine needs the same folder on its machine. If the folder may be absent, embed the pattern list in the skill instead.
- Claude in Chrome must be open and signed in to Splunk (`unlimitedsystems.splunkcloud.com`).
- Connectors required: Slack and Atlassian.
- Creating a skill requires the maintainer to confirm adding it to the tracked sync scope (a row in `skills/README.md`).

## Build steps

1. Read `documents/project-maintenance.md` (done for this plan).
2. Add Signature, Detection, Verification (with `scheduler-safe` / `interactive-only` marks) and Analysis sections to `templates/known-failure-pattern-template/`. Restructure the `KF-AUTOPOST-INIT` pattern `CLAUDE.md` to match, moving the SPL from the schedule prompt into its Detection section with the window, environment and organization id as parameters.
3. Point `ticket-workflow` and the "analyze known failure" request at the pattern `CLAUDE.md` Detection and Verification sections instead of restating them.
4. Author `skills/known-failure-detection/SKILL.md` and `skills/README.md` row via the `skill-creator` flow; present the `.skill` card and save it.
5. Add a Why plus pointer to root `CLAUDE.md`. Do not restate the mechanics there.
6. Draft an `Unreleased` entry in `upgrade/cowork.md` and `upgrade/code.md` so users receive the new skill card; ask the maintainer for the version number.
7. Replace the schedule prompt (and the Claude Code routine prompt) with the slim version.
8. Run once manually and compare the output against the current prompt's behavior.

## Rollback

Keep the current full prompt as `known-failure-detection-daily` until step 8 passes. If the slim version misbehaves, restore the full prompt.
