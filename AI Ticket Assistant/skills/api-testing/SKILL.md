---
name: api-testing
description: "Run, repeat or write up an API test procedure against a non-production Unlimited Financials environment. Procedures are documents in the project's `API Tests/` folder, one per scenario; this skill holds the rules that apply to every one of them (environment safety, approval before writes, investigating existing state first, evidence, reporting, browser mechanics). Use when the user says 'run the {name} API test', 'repeat the rule order test', 'test this through the API', 'write up how to repeat this test', 'create an API test procedure', or points at a file in `API Tests/`. Not for unit tests or the QA solution's automated tests (those are code changes; see the `ticket-workflow` skill, section 'QA tests')."
---

# API Testing

An API test here is a manual, Claude-driven test: Claude calls the deployed APIs (and reads Splunk) in a non-production environment, checks the results against what the procedure says should happen, and records the evidence. Each scenario has its own procedure document in `API Tests/`. This skill holds the rules that are the same for every scenario.

Two kinds of knowledge are kept apart on purpose:
- **This skill** - how any API test is run: safety, approvals, evidence, reporting, tool mechanics, how to write a procedure.
- **A procedure document** - how one specific test is run: its background knowledge, API shapes, ids, steps, expected results and sample data.

If the two ever disagree, the safety and approval rules in this skill win; scenario facts in the procedure document win for that scenario.

## Finding the procedure

1. List `API Tests/` at the project root with a directory listing (`ls`), not a Glob, which does not match folders. Each file is one scenario and starts with a header block (title, original ticket, status, environments tested, related skills). If the project has no `API Tests/` folder, say so and ask whether to create it (when writing a first procedure) or whether the user means a different project; do not create it silently.
2. Pick the file that matches what the user asked for. If the user pointed at a file, use it. If several could match, or none does, ask. Do not guess.
3. Read the whole procedure before doing anything else, including its "Not verified" section.
4. If the user asks to test something with no procedure, offer to write one as the test is run (see "Writing a new procedure").

## Standing rules

### Environment and authorization
- **Non-production only.** Production environments are `cloud`, `app`, `care`, `space`, `uno`, `blue` and `live`. Non-production environments are `ninja` (dev), `team` (QA), `one` (release) and `exchange` (alias `exch`, hotfix release). A procedure says which environments it has been run in; any other non-production environment is allowed but untested, so say so.
- **Use an organization the user names for testing.** An organization id starting `00000000-0000-` is a QA/test organization. If the environment or organization is not clearly non-production, stop and ask.
- **Approval is per write and per environment or organization.** Approval for one does not carry over to another.

### Investigate before changing anything
- Read the existing state first (for example, the rules already in the organization, existing data for the entity under test). Never assume the organization is empty. Record what was there.
- Existing configuration can change a test's result. If it could, tell the user and let them decide: remove it, or design the test data so nothing existing matches. Never edit or delete data you did not create unless the user asks.

### Approval and writes
- Show the user each write before sending it: what will be created or changed, with the full body for rule or configuration changes, and the contents of any file to be uploaded. Wait for a clear yes.
- Read back every write and compare it with what was sent. Some read models lag for a few seconds; poll before deciding something failed.
- If a write call returns an error, do not retry blindly. Check whether the write took effect first, to avoid duplicates, and say plainly when that cannot be checked.
- Name everything created with a ticket prefix (for example `UF-16594 Test - ...`) so it can be found and removed later.
- Check the procedure for operations that cannot be undone (hard deletes, no restore). For those, ask separately for each item, and prefer a reversible change (for example flipping a qualifier) for control runs.
- Never put cookies, tokens or function keys in a file, a ticket or a message.

### Evidence and recording
- Report ids in full (organization, remittance, claim payment, charge payment, rule ids). A shortened id cannot be searched.
- Save evidence (uploaded files, result tables, Splunk lines) in the active ticket's `downloads/` folder with fresh file names that include the environment, an entity id, a short description and a timestamp, and give the user the full absolute path. Follow the `ticket-workflow` skill for the folder and `summary.md` conventions.
- Add a dated entry to the ticket's `summary.md` after each meaningful step (rules created, a run finished, a result).
- Label every statement as **confirmed** (observed in a run), **from code** (read in the source, not run), or **inferred** (a conclusion drawn from those). Say plainly when a prediction turned out wrong.
- A Jira comment is drafted first, shown to the user, and posted only after approval (see `ticket-workflow`). Keep a copy of the approved text in a file in case posting fails.

### Reporting during a run
After each step say what was done, what was seen (with the ids), and what comes next. State limits: what the test cannot show, what was not covered, what is an assumption. Report problems at once.

### Stop and ask when
- The environment or organization is unclear or could be production.
- Existing data conflicts with the procedure's assumptions.
- A result differs from the procedure's expectation, or something unexpected appears (an unexplained exception, a different payer, a 404 that does not clear).
- A step is needed that the procedure does not describe, or needs a write that was not approved.

### Source code
A procedure should carry the knowledge needed so the backend source is not required. If a run needs a fact that is not in the procedure, read the source (use `git show {branch}:{path}` if the working tree is on another branch; do not switch the user's branch), then propose adding the fact to the procedure, marked **from code**.

## Running a procedure

1. Read the procedure and its prerequisites. Check the tools it needs are available (browser connection, a signed-in session, other skills).
2. Confirm with the user: the environment, the organization, the ticket the evidence goes into, and which tests of the procedure to run.
3. Work through the procedure's steps in order. Where the procedure says to investigate existing state, do that before designing anything.
4. Apply the standing rules at every write: show, approve, send, read back.
5. At the end, summarize the results against the procedure's expected results, list what is left in the environment (rules, remittances, other data), and ask what to do with it.
6. If anything learned during the run is not in the procedure, propose an update (see below).

## Updating a procedure

When a run finds a wrong step, a missing fact, a new gotcha or a new variant, propose the edit to the user and make it after approval. Keep the sample data from earlier runs and add the new run as a new dated block. Do not delete or rewrite earlier sample data.

## Writing a new procedure

- Create one file per scenario in `API Tests/`, with a kebab-case name, from `references/procedure-template.md`.
- The header must name the original ticket (key, link, ticket folder) so the history can be found.
- Make it self-contained: endpoints, request shapes, ids, enum values, what each component does, timing, expected results, and a sample-data appendix from a real run.
- Mark facts as confirmed, from code or inferred. Include a "Not verified" section.
- Put only scenario-specific content in the procedure. General rules stay in this skill; refer to them by name.

## Tools

- **Browser API calls** (Claude in Chrome, in-page `fetch`): `references/browser-api-mechanics.md`.
- **Splunk**: every Splunk read goes through the Claude in Chrome flow of the `splunk-search` skill (index names, field conventions, the `exchange` to `exch` index alias, result extraction). Never use a connector or a sandbox call for Splunk. `references/browser-api-mechanics.md` has the same extraction in short form for use inside a test run; if the two differ, `splunk-search` wins.
- **Calls from PowerShell, ingress paths, cookie auth**: the `snowdrop-api-calls` skill.
- **Building and uploading test ERA files**: the `era-builder` skill. It also finds an organization id from a name, and fills claims, payers and patients from the organization's data.
- **Organization name to id**: the "Organization name to id" section of the project's root `CLAUDE.md` (Nimbus lookup); `era-builder` has the same lookup built in.
- **Cosmos lookups**: the `cosmos-query` skill.
- **Ticket folder, `summary.md`, Jira comments**: the `ticket-workflow` skill.
