---
name: ticket-workflow
description: "Manages a durable case folder at tickets/{TICKET-ID}/ for any Jira ticket (UF-XXXXX) under investigation — summary.md log, downloads/ for Cosmos/Splunk evidence, code-analysis/ for code-side investigation notes. Use when the user says \"start/resume/close a ticket for UF-XXXXX\", \"log this for the ticket\", \"log progress\", \"draft a jira comment\", or begins sustained investigation on a ticket number. If the current project has no tickets/ folder yet, offer to create one instead of refusing — it can run in any project. Before starting/resuming with unrelated prior history, ask if a new session is wanted — this skill cannot open one automatically. Otherwise check whether tickets/{TICKET-ID}/ exists; if so, read summary.md and recap before continuing. Jira comments: one comment, Business + Technical Summary, drafted then approved before posting. The folder — not the chat — is the source of truth."
---

# Ticket Workflow

A ticket folder gives an investigation a home that outlives the conversation: readable from a brand-new
Claude Code session of the project environment, so it can start, resume, or continue the same ticket. The chat transcript
is disposable; `tickets/{TICKET-ID}/` is not.

## Folder shape

```
tickets/{TICKET-ID}/
  summary.md       — living investigation record, dated log entries
  downloads/       — raw evidence: Cosmos exports, Splunk exports, blob projections, etc.
  code-analysis/   — notes/artifacts from code-side investigation
                      (see "Write boundary" below)
```

## Precondition — confirm before scaffolding into a new project

This skill can trigger in a session started in any project, not just one designated "ticket"
project — so it can't assume the current project is already set up for ticket work. Before doing anything
else (starting, resuming, logging, closing, or generating a Jira comment), check whether the current
project already has a `tickets/` folder at its root.

**How to check — directory listing only.** Run `ls` on the project root in bash (or `test -d tickets`),
using the project's bash path. Do not use Glob for this: Glob matches files, not folders, so a pattern
like `tickets/*` returns nothing when `tickets/` contains only subfolders. An empty Glob result is never
evidence that a folder is missing. If bash is unavailable, use Read on the folder path or Glob with
`tickets/**/summary.md`, and treat any "not found" result as unconfirmed until a second method agrees.
The same rule applies to every existence check in this skill, including `tickets/{TICKET-ID}/` below.

- If `tickets/` exists: proceed normally.
- If `tickets/` does not exist: **stop before creating anything.** Tell the user plainly that this project
  doesn't currently look set up for ticket work — no `tickets/` folder at the root — and ask whether they'd
  like to start using this convention here now, or whether this ticket belongs in a different project they
  already use for ticket work. Don't silently create the folder just because a ticket number was
  mentioned — a missing folder is a signal to confirm intent, not an automatic green light. But don't
  refuse outright either: a project adopting ticket-workflow for the first time looks identical to one
  that was never meant to use it, and only the user can tell those apart.
- If the user confirms creating it here: proceed as a normal "Starting a ticket" (create `tickets/` and
  `tickets/{TICKET-ID}/downloads/` below). No need to re-ask on later tickets in this same project —
  `tickets/` existing is itself the record that this project has opted in.

This guards against a ticket folder accidentally getting scaffolded into a project the user didn't mean
to use for ticket work (e.g. a one-off repo or an unrelated workspace), where it would be orphaned from
the rest of the user's ticket history — while still letting a genuinely new project adopt the convention
on request instead of assuming only one project can ever have one.

## New-session check — before starting or resuming

A ticket investigation reads best as its own conversation — one thread, one ticket, no crosstalk from
whatever else was discussed earlier in the session. This skill cannot open a new session
on the user's behalf, so this can't be done automatically; the most useful thing the skill can do is flag it
and let the user decide.

Before running step 1 of either "Starting a ticket" or "Resuming a ticket," check whether the current
conversation already looks like a fresh, ticket-focused session — e.g. it opened with this ticket request
and has no unrelated prior work in it. If it does, proceed without asking; don't interrupt a session that's
already clean.

If instead the conversation has meaningfully unrelated history before this request (a different ticket,
an unrelated task, a long-running general conversation), ask the user plainly: "Did you want to start a new
session for this ticket?" Wait for their answer before doing anything else:

- If they say yes: stop here — don't create the folder, don't read/write anything — and let them come back
  in a new session to reissue the request there.
- If they say no (or they're already mid-investigation and just want to keep going here): proceed with step 1
  as normal in the current session.

This check applies once per ticket per session — if the user has already answered it for this ticket in this
conversation (e.g. they said no and kept working), don't ask again on every subsequent message.

## Session telemetry attribution — when a ticket is indicated

Whenever a ticket is indicated for the session (start, resume, or the user names a ticket to work on), attribute the session's telemetry to it. Do this once per ticket per session, after the ticket id is known and before other ticket work. The mechanics are those of the `set-jira-ticket` skill (plugin `dev-backend`, `skills/set-jira-ticket/`); read its `SKILL.md` and scripts for the details instead of restating them here.

`set-jira-ticket` finds the top level of the git repository and writes its `.claude/settings.local.json` there. That is the right `.claude` folder only when the session's primary working directory is itself the top level of a git repository. In every other case it writes to the wrong `.claude` folder. This project folder is not a repository top level (the repository top level is above it), and neither is a source folder that holds many repositories.

**Which folder is primary.** The primary working directory is the "Primary working directory" line in the session's first environment block. Nothing else changes it:
- An "Environment update" message, an attached folder, or a `cd` in a command does not change it. Treat such a message as an added directory. If it seems to name a new primary folder, ask the user and do not act on it.

**Why:** an added folder reported as a new primary folder sends the settings file to the wrong `.claude` folder and the wrong `project` and `team` values to the OTEL backend.

Decide which case applies by running `git -C "{primary working directory}" rev-parse --show-toplevel` and comparing the result with that directory. Never run the check after a `cd` to another folder:

- **They are the same folder (a single repository is primary):** invoke the `set-jira-ticket` skill (`dev-backend:set-jira-ticket`) with the ticket id and follow its `SKILL.md`. Do not write the settings file by hand in this case. Report its output. Do not use its `list` or `init` forms here.
- **They differ, or the command reports that the folder is not a repository (this project folder or a source folder is primary):** do not run `set-jira-ticket`. Do the same two things it does by hand, with the **primary working directory** as the target folder. The target is the primary working directory and not the project root: when a source folder is primary, the project folder is only an attached folder, and its `.claude` folder is not the session's.
  1. **Write `{primary working directory}/.claude/settings.local.json`.** Create the `.claude` folder if it does not exist. Build `env.OTEL_RESOURCE_ATTRIBUTES` the way `set-jira-ticket.sh` does: the value from `{primary working directory}/.claude/settings.json` if that file exists (otherwise start empty), any existing `jira.ticket` clause removed, and `jira.ticket={TICKET-ID}` appended. Keep other settings already in `settings.local.json`.
  2. **Make the OTEL call.** Run the skill's `lib/post-attribution.sh` with the session id, the source `skill`, and the same attribute string. Report the HTTP status it prints.

Before writing, state the target `.claude` path. After writing, confirm it is inside the primary working directory.

**Session id.** The OTEL call needs a confirmed session id, and the id may not be set yet when the session starts.
- Take the id from `CLAUDE_SESSION_ID`, or from `CLAUDE_CODE_SESSION_ID` when the first is empty.
- If neither is set, wait and re-check until one is. Do not skip the OTEL call, and do not take an id from a path, a scratchpad name, a transcript name or any other source. Tell the user the call is pending while waiting.
- This also applies to the `set-jira-ticket` skill's `--session` argument: do not run it with an empty id.

## Categorizing a ticket

Every ticket falls into one of three categories, and which one it is changes what happens next. Right now
the only category-specific behavior is whether to launch into the Claude for Chrome page-capture prompt
(see steps below) — more will be added as they're confirmed. Because that fork happens early (step 5 in
"Starting a ticket" / step 4 in "Resuming a ticket"), categorize before reaching it, not after.

- **Diagnostics/Analysis** (the default) — the ticket reports a symptom: something broken, unexpected, a
  customer complaint, an error, a "why does X happen." No fix is predetermined; the point of the work is
  to find one.
- **Speckit** — the ticket is being run through GitHub Spec Kit (`/specify`/`/clarify`/`/plan`/`/tasks`/
  `/implement` in Claude Code). Recognize this from the Jira description already being in the `/specify`
  output shape (Feature Specification, Acceptance Scenarios, FR-XXX requirements, `[NEEDS CLARIFICATION]`
  markers), or from the user saying so explicitly. The spec-kit commands run in Claude Code; this skill's role on these
  is research/spec-review — flagging gaps in `spec.md`/`plan.md`/`tasks.md` and feeding
  `[NEEDS CLARIFICATION]` resolution.
- **Feature** — the ticket already states a solution to build (e.g. "cap the tab at 5,000"), and it's
  simple enough that the user isn't running it through spec-kit. This is closer to Speckit than to
  Diagnostics in spirit — both are "build this," not "investigate this" — the difference is just process
  weight, not framing.

**Read the ticket, make a call, then confirm — don't silently guess, and don't ask an open-ended
question either.** The Jira description usually makes the category clear enough to propose one
confidently: a symptom report reads differently from a stated solution, and a `/specify`-shaped
description is unmistakable. Ask a single multiple-choice confirmation (e.g. "Reading this as **Feature**
— confirm, or is it actually Diagnostics/Speckit?") before doing anything category-specific. This is cheap
and avoids both silently guessing wrong and making the user spell out the category themself every time.

Record the result on its own line in `summary.md`'s header, next to `Status`:
```
**Category:** Feature (as of {date})
```

**A ticket can change category mid-investigation** — most commonly Diagnostics → Feature, once a root
cause is found and the user decides to build something rather than just explain the symptom. This isn't
something to infer from tone; wait for the user to say it plainly ("let's fix this by...", "let's turn this
into a feature") and then confirm the recategorization the same way as above, then log it as a new dated
entry in `summary.md` (append, don't overwrite the old category — same convention as Status changes).

## Starting a ticket

Trigger: "start a ticket for UF-XXXXX", or the user begins clearly sustained investigation on a ticket number
that doesn't have a folder yet.

0. Run the "New-session check" above first, then "Session telemetry attribution" above.
1. Check whether `tickets/{TICKET-ID}/` already exists, using `ls` per the Precondition's "How to check"
   (never Glob alone). If it does, this is a resume, not a fresh start — go to "Resuming a ticket" instead.
2. Create `tickets/{TICKET-ID}/` and `tickets/{TICKET-ID}/downloads/`. Do not create `code-analysis/` —
   create that folder only when code-side notes are first needed.
3. Look up the ticket (Jira `getJiraIssue`; cloudId `7a5a0836-efbd-4ae8-9c1e-b806746e5705`, site `https://sharpfm.atlassian.net`) to seed the header: title, URL, current status, a short
   excerpt of the description. Don't skip this even if the user already described the ticket verbally — the
   canonical title/link belongs in the file.
4. Determine the category per "Categorizing a ticket" above and confirm it with the user before writing
   anything — the category line belongs in the file from the moment it's created, not added after.
5. Write the initial `summary.md`:
   ```
   # {TICKET-ID} — {ticket title}

   **Jira:** {ticket URL}
   **Category:** {Diagnostics/Analysis | Speckit | Feature} (as of {date})
   **Status:** Open (as of {date})

   ---
   ```
   From here on in this conversation, this ticket is "active" — see "Downloads convention" below.
6. Give the user a clickable link to the ticket itself (the `{ticket URL}` used in `summary.md`). **Only
   for Diagnostics/Analysis** tickets, follow it with the page-capture flow in "Page capture (Diagnostics/
   Analysis tickets)" below — this is how the user gets whatever page is relevant to the ticket (the Jira
   ticket itself, a support-tool screen, a customer portal view) into the case file, without leaking
   sensitive data into the ticket record. For Speckit or Feature tickets, skip this step entirely — there's
   no evidence-gathering step to launch into; go straight to the work (spec review for Speckit,
   scoping/implementation discussion for Feature).

7. Mention once, lightly, that the user may want to rename the conversation title to match the ticket — but
   note this is a nice-to-have now, not load-bearing, since the folder carries continuity instead of the
   chat.

## Page capture (Diagnostics/Analysis tickets)

Triggered from step 6 of "Starting a ticket" and step 4 of "Resuming a ticket," for Diagnostics/Analysis
tickets only. The goal is the same either way: get whatever page is relevant to this ticket into the case
file, without the user retyping details by hand.

**Always reach for the Preferred path first — it is the default, not one of two equal options.** Drop to
the Fallback path only when one of its own trigger conditions actually applies (no application link found,
or unsaved/in-memory state a fresh navigation can't reproduce). Never skip straight to the cut-and-paste
prompt as a matter of habit or convenience — it stays in this skill as a deliberate backup for the cases
the direct path genuinely can't handle, not as an equally-valid first move.

### Preferred path — direct capture from a link on the ticket

Validated 2026-09-29 (UF-16886) as the default path when the Claude-in-Chrome MCP tools are available in
the session (tools named `mcp__claude-in-chrome__*` — load via ToolSearch if deferred). This replaces
manual copy/paste entirely: no side panel, no pasting a prompt, no pasting a result back.

1. Scan the ticket's description and all comments (already fetched via `getJiraIssue` when the ticket was
   opened/resumed — no separate fetch needed) for links.
2. Keep only application links — this project's pattern is `https://sd.unlimitedfinancials.*` — and drop
   everything else: `https://api.unlimitedfinancials.*` links are direct backend calls, not pages (they
   return 401/400 depending on session state when navigated to directly, and are never the right target
   for a page capture — route those through the `snowdrop-api-calls` skill instead if that data is ever
   actually needed), along with PR links, mailto links, and any other non-application link.
3. List the matches in the order they appear (description first, then comments oldest to newest), capped
   at the top 10. If none are found, say so and fall back to "Fallback path" below — the user is likely
   looking at a page that isn't linked from the ticket itself.
4. If one or more matches, ask the user which one to capture (or to skip) via a multiple-choice prompt —
   don't just grab the first one silently, since a ticket can reference more than one relevant page.
5. On selection, get a tab (`tabs_context_mcp`, creating one if needed), `navigate` to the chosen URL,
   then `get_page_text` to extract the rendered content.
6. **Login check.** Compare the tab's URL after navigating to the URL requested. If they don't match — in
   this project, a redirect to `hello.unlimited.systems` is the confirmed sign-in gate — stop. Don't treat
   the redirected page as captured content, and don't retry on your own. Say plainly "Login is now showing,
   please login," and wait. Once the user confirms they've logged in, retry `get_page_text` on the **same**
   tab (not a new one — a fresh tab would lose the session that was just established).
7. Write the extracted text into `tickets/{TICKET-ID}/downloads/` using the same fresh-filename discipline
   as "Downloads convention" below (env + entity id + short description + timestamp, full absolute path),
   then close the tab per the Claude-in-Chrome tools' own cleanup convention, unless the user wants it left
   open.

This path re-navigates to the URL fresh, so it can only capture what that URL renders on a clean load —
it cannot preserve unsaved form input, a specific filter/search result the user built up by hand, or any
other in-memory state that only exists in a tab the user already has open. That's what the fallback path
below is for.

### Fallback path — Claude for Chrome side panel

Use this when no application link was found on the ticket (step 3 above), or when the relevant page
depends on unsaved/in-memory state that a fresh navigation can't reproduce — the classic case being a page
the user already has open and mid-interaction with. Give the user the prompt below, in its own cut-and-paste
block — nothing else inside the block, so it copies cleanly in one action. Everything explaining what it's
for goes outside the block, not mixed into it:

Claude for Chrome prompt (paste into the Claude for Chrome panel to summarize whatever page the user has
open, before pasting the result back here):

```
Read only the page that is already open and already fully loaded in this tab right now. Do not
navigate, click any link or button, refresh or reload, open a new tab, or inspect network requests,
console logs, or cookies — none of that is needed and it risks changing what's on screen or losing the
exact state the user wants captured. Just read the text and fields already rendered on screen and
summarize them into a document: the page URL, and all details relevant to the main entity or record
being displayed (key identifiers, status, amounts/dates, associated people or organizations, and any
notes, attachments, or line-item details shown). Include every identifying GUID visible on the page in
full (org id, remittance id, claim id, charge id, payment id, or any other record identifier) — these
are the primary keys used to look the record up in Cosmos/Splunk afterward, so omitting or truncating
them makes the summary far less useful. Skip technical details like DOM structure, cookies, or headers.
Redact or omit any sensitive personal data (e.g., SSNs, dates of birth, medical details, financial
account numbers, or other identifying personal information) rather than including it in the summary.
```

## Resuming a ticket

Trigger: "resume/continue work on UF-XXXXX", or `tickets/{TICKET-ID}/` already exists when the user starts
working that ticket number.

0. Run the "New-session check" above first, then "Session telemetry attribution" above.
1. Read `summary.md` in full. If `code-analysis/` exists, skim it too — a previous session may have left findings
   there that `summary.md` doesn't yet reflect.
2. Recap it back to the user before continuing — state the current status, **category**, and the gist of
   the last entry (from both `summary.md` and, if present, `code-analysis/`), so both sides are
   re-grounded. Don't silently resume as if no time had passed.

   If the ticket predates the `Category` field and `summary.md` has no `**Category:**` line, determine
   and confirm one now per "Categorizing a ticket" above, then add it to the header, before continuing —
   don't leave it unset just because the file is older than the field.
3. If a quick Jira check shows the ticket's status has changed since the last logged entry (e.g. someone
   else moved it), note the discrepancy. Also watch for signs the category itself should change (see
   "Categorizing a ticket" — a recategorization is confirmed with the user explicitly, never inferred).
4. Give the user a clickable link to the ticket (the `{ticket URL}` from the `summary.md` header). **Only
   for Diagnostics/Analysis** tickets, follow it with the same page-capture flow in "Page capture
   (Diagnostics/Analysis tickets)" below — same reasoning applies on a resume: there's likely a page worth
   capturing into the case file. For Speckit or Feature tickets, skip it and go straight back into the work.
5. Continue work, and append a **new** dated section for this session rather than editing or overwriting
   prior entries — a reopened ticket gets a new entry on top of the old resolution, not a rewritten one. If
   the header's `Status` line currently reads `Resolved`, update it to `Reopened (as of {date})` first — the
   header should reflect current state, not the last-closed one.

## Logging progress

Do this proactively at natural checkpoints — a root cause confirmed, a hypothesis ruled out, a decision
made, a ticket comment posted — not after every single message, and not only when asked. Also do it
immediately whenever the user says "log progress" or "log/summarize this for the ticket."

"Log progress" is a complete request. The ticket is the one this session is working on; do not ask which
(ask once only if the session has worked on more than one ticket). Write an entry covering everything since
the last entry, and save any evidence not yet in `downloads/`. The user often says it just before ending
the session, so the entry must stand on its own: current status, what was found, what was ruled
out, open questions, and the next step.

When the entry is written, reply with the entry heading, then end with one line giving the real ticket
id: "Logged to tickets/{real ticket id}/summary.md. To continue in a new session, say: resume ticket
{real ticket id}."

- Append, don't overwrite. Each entry: `## {YYYY-MM-DD} — {short heading}` followed by a few sentences to
  a short paragraph.
- Write in prose capturing the reasoning and conclusion — this is a narrative record, not a transcript
  dump. Link out to Jira comments, Splunk searches, specific files in `downloads/`, or specific files in
  `code-analysis/` rather than pasting raw data inline.
- Raw evidence (Cosmos JSON, Splunk exports) belongs in `downloads/`, referenced by filename from
  `summary.md` — not embedded in the summary itself.
- If summarizing something found in `code-analysis/`, cite it by filename in `summary.md`
  rather than copying it wholesale — `code-analysis/` is the source of record for code-side detail.

## Closing a ticket

Trigger: the user says the ticket is resolved, or "close out UF-XXXXX."

1. Append a final dated entry summarizing the resolution.
2. Update the status line at the top of `summary.md` (`Status: Resolved (as of {date})`).
3. Leave everything in place. Closing is not deleting — the folder stays so it can be reopened later (see
   "Resuming a ticket").

## Downloads convention

The `cosmos-query` and `splunk-search` skills default to generic scratch locations
(`cosmos-access/results/`, a Splunk downloads folder) for saved query results. **When a ticket is active
in the conversation, override that default** — tell the user to save into
`tickets/{TICKET-ID}/downloads/` instead, using the same fresh-filename discipline those skills already
require (never reuse a filename; include env + entity id + a short description + timestamp). This is what
makes the ticket folder a complete, self-contained case file instead of leaving evidence scattered in a
generic results folder that mixes multiple investigations together.

**Always give the user the full absolute path, never the shorthand relative form** (confirmed
2026-08-02 — the user pastes these into a Save As dialog's filename field, where a relative path like
`tickets/UF-15633/downloads/foo.json` doesn't resolve to anything). The shorthand `tickets/{TICKET-ID}/downloads/`
used throughout this skill is fine for internal reasoning about folder structure, but whenever a path is
actually being handed to the user to type, click, or paste, it needs to be the real absolute path for
*this* project on *this* machine — never hardcode a specific project name or drive path here, since this
skill runs against whichever project the user has open (per the Precondition
section above).

**Where that path comes from:** the project root, found as root `CLAUDE.md`'s "Folder locations" describes. When
the working directory is the project root, it is `pwd`. When a source folder is primary and this project is an
additional directory, read its path from the session's environment info (the additional working directories line).
Never reuse a value from a previous session.
Compute the full path fresh each time — `{connected-project-path}\tickets\{TICKET-ID}\downloads\{filename}` —
rather than reusing one seen earlier in the conversation, per the standing "never hand the user a file path
containing a literal placeholder token" rule in root `CLAUDE.md`. Same rule applies to `summary.md`
references if ever surfaced to the user directly.

**Evidence gathered in the browser.** Browser JavaScript cannot write files. For results from Splunk, a page capture or an in-page API call, reduce them in the page, return compact text, and write the file from bash. State in the file's first lines that it is an aggregated summary and which search or call produced it; raw bulk results go through the export steps in the `splunk-search` skill. To print the absolute Windows path of a file written from bash, use `cygpath -w "$(pwd)/downloads/<file>"`: building the path with `echo` and a backslash inside double quotes printed the variable name instead of its value.

## Write boundary

`tickets/{TICKET-ID}/` is a plain folder in the project, read and written directly with no sync step.

- **`summary.md` and `downloads/`:** written by the session working the ticket, with the same log format and fresh-filename discipline throughout. Don't work the same ticket in two sessions at once: neither session sees the other's unsaved context, and both append to `summary.md`.
- **`code-analysis/`:** its own subfolder for code-investigation notes/artifacts, created the first time it is needed.

Raw evidence stays in `downloads/` and analysis stays in `code-analysis/`, so it is clear at a glance which is which. Source repositories are read through the Source path in `local/user.md`. When picking a ticket back up, check `code-analysis/` for anything left there before assuming `summary.md` alone has the full picture.

## Generating a Jira comment

Trigger: the user asks for "comments for the jira ticket," "a comment explaining the conclusion," or similar
— a request to turn the investigation into something postable to the ticket itself (confirmed shape
2026-08-06, UF-15723).

**One comment, a summary line plus two sections, draft-then-approve.** This is always a single Jira comment
with a one-line summary at the top followed by two clearly headed sections — never split into two comments, and never posted straight to Jira without the user reviewing
it first. Once it is posted, a second, separate "Testing" comment follows (see "Testing comment"
below). Draft it in the conversation, let the user read and adjust it, and only call
`addCommentToJiraIssue` once they explicitly confirm. This matters because a comment posted to Jira is
effectively permanent (visible in the ticket's history even if edited later), and the Business Summary
section in particular may use customer-facing language worth a second look before it's committed.

**Summary line (first line of the comment, above both sections).** One line, in the form
`**Summary:** {Outcome} — {what happened, in a few words}`. Audience is casual readers scanning the ticket,
so it must say what kind of result this is without opening the sections. Rules:
- `{Outcome}` is one bold label. Use **Resolved** when a fix was made or delivered, or **Known Issue** when
  the finding matches a documented known failure or a confirmed defect with no fix yet. Otherwise use the
  label that best categorizes the result, e.g. **Not a Defect**, **Data Correction**, **Configuration**,
  **Pending**.
- The rest is a quick reference to the finding: plain language, no GUIDs, event names, or internal service
  names, one line only.
- It must agree with the Current status stated in the Business Summary and the final state in `summary.md`.

Examples:
- `**Summary:** **Not a Defect** — rule did not apply because the payer's remittance omitted the DR modifier.`
- `**Summary:** **Resolved** — charge master fees were not stored after import; fixed in the next release.`
- `**Summary:** **Known Issue** — duplicate postings from a retried remittance; matches an existing defect, no fix yet.`

**Section 1 — Business Summary.** Audience is customers and business-oriented stakeholders, not
engineers. Structure:
- What happened, in plain language (no GUIDs, event names, Cosmos/Splunk jargon, or internal service names).
- Customer/business impact.
- Root cause, explained in non-technical terms.
- Current status — fixed, not a bug, pending, etc. — stated plainly.

**Section 2 — Technical Summary.** Audience is developers/engineers. Structure:
- The investigation trail: what was checked and where (which service, which event/API, which id).
- The specific technical root cause — actual field names, config values, event types, ids where they add
  value for someone debugging a similar case later.
- The fix, if one exists — pull this from `code-analysis/` if the fix work was recorded there; cite the file
  rather than re-deriving implementation detail from scratch. If there was no fix (e.g. "working as
  designed"), say so explicitly rather than leaving it implied.
- Any open questions or follow-ups that don't block closing this ticket but are worth flagging (e.g. a
  standing product/requirements question the investigation surfaced).

**Source the content from `summary.md` (and `code-analysis/` when present) — not from chat history.**
The dated log is the record of what was actually concluded and why; reconstructing from conversation
memory risks losing nuance or reintroducing a hypothesis that was later revised (see the pattern in
UF-15723 where an initial "not a bug" conclusion was briefly reopened and then reconfirmed — the comment
should reflect the final state in `summary.md`, not an intermediate one).

**Each statement in the Business Summary must trace to confirmed evidence in `summary.md`.** Word anything that was inferred and not read or tested as inferred (for example "we expect" or "the likely block"), and have the Technical Summary say what was not read or checked. After posting, report the `jsdPublic` value in the Jira response: `true` means the comment may be visible to customers, which matters because the Technical Summary names ids and internal code.

**Example (from UF-15723, case 1 — reproduce this shape, not this wording, for a new ticket):**

> **Summary:** **Not a Defect** — rule did not apply because the payer's remittance omitted the DR modifier.
>
> **Business Summary**
>
> We investigated why the "DR - Suppress Transfers (Specialty Pharmacy)" rule did not remove the $350
> patient-responsibility transfer on claim UFNYCE1034047A1 (check 56523948).
>
> This charge (J3489) was originally billed with a DR modifier, which should have triggered the
> suppression rule. However, United Healthcare's remittance response for this charge did not include the
> DR modifier — it only returned a different modifier (JZ). Our system correctly evaluates this type of
> rule against the modifier information the payer actually sends back on the remittance, not the modifier
> we originally billed. Since the payer's response was missing the DR modifier, the rule correctly did
> not apply.
>
> **Conclusion: this is not a system defect.** The rule performed as designed. The discrepancy stems from
> the payer's remittance not reflecting the same modifier that was submitted on the original claim. There
> is a separate, ongoing internal discussion about whether the system should evaluate this type of rule
> using the originally-billed modifier instead of the payer-returned one — but that would be a considered
> product/requirements change, not a bug fix, and is outside the scope of this ticket.
>
> **Technical Summary**
>
> Investigated rule `1fec8f7c-7067-4a7e-a7e8-ccfb4ccbc858` ("DR - Suppress Transfers (Specialty
> Pharmacy)", sequence "Adjudication Code Suppression") against remittance
> `2436f5f0-b0c9-497b-a608-6e7ff9ce6e26` / claim payment `b3d55479-ee90-45a8-a990-da04966f139c`, charge
> `da08e0af-6ed7-424d-ba19-c0b29ba50988` (J3489).
>
> The rule's top-level `qualifiers[]` requires an exact match on modifier element
> `df8b094b-d8af-4e19-bbf3-ee72727945a5` ("DR", `attributeType: 7`, `isSet: false`). Confirmed via Cosmos:
> `snowdrop-activities`'s `ChargeCreated` event shows the charge was originally created with three
> modifiers (DR, JZ, SPH); `snowdrop-remittance`'s `RemittanceCreatedEvent` (raw 835 payload) and
> `snowdrop-remittanceprocessing`'s `ChargePayment.Modifiers` both show only JZ — DR was not present in
> what the payer returned.
>
> Confirmed (business logic SME): the rule's Modifier qualifier binds to `ChargePayment.Modifiers`,
> sourced from the payer's remittance/835 submission, not the original invoice/charge record. This is
> current, intentional behavior per requirements — there's a standing open question about whether this
> should instead source from the original invoice, but that's unresolved and out of scope here.
>
> No code fix was required or made for this case — behavior is as designed.
>
> Root cause: payer (United Healthcare) did not echo the DR modifier on their remittance response,
> despite it being present on the original claim submission.

## Data fixes

Trigger: the investigation ends in a correction made through an API call against a live environment (for example a date, status or assignment change).

1. **State the call before making it:** method, full URL, body, how each part was determined, and what is not confirmed. Make the call only after the user approves that call. Approval for one call or one environment does not extend to another; production writes follow root `CLAUDE.md`'s rule.
2. **Confirm host, path and body from the application's own requests and the front-end source**, not from swagger or memory. The mechanics (resource timing, `unsys-web` helpers, in-page `fetch`) are in the `snowdrop-api-calls` skill.
3. **Make one call.** Do not make an optional or follow-up call unless the user approved it as well.
4. **Validate with read-only reads:** the events in Cosmos, the view the user works in (page or grid), and the service's own state endpoint. A `200` with no body does not show what changed.
5. **Log it** in `summary.md`: the call, the time, the response, the validation results, and what the fix did not do (for example, posting not done).
6. **A data fix is not the root-cause fix.** If the cause can recur, say so in the comment and record the follow-up. Look for the repo's known-failure entry, or add one. When the code fix is made, the "API tests" section below applies.

## Testing comment

Trigger: the resolution comment above has been posted to Jira. Every resolution comment is followed by a
Testing comment, with no exceptions. Do not wait for the user to ask for it; draft it right after the
resolution comment is posted.

**A separate comment, titled "Testing", draft-then-approve.** It is its own Jira comment, never merged
into the resolution comment. Its first line is the bold title `**Testing**`. Draft it in the
conversation, let the user read and adjust it, and only call `addCommentToJiraIssue` once they explicitly
confirm, the same as the resolution comment.

**Sections, in this order, each under a bold heading:**
1. **Unit testing**
2. **Automated API testing**
3. **Claude API testing**, only when it applies (see below)
4. **How to Test Manually**

**Unit testing.** Audience is developers. Cover the unit tests (xUnit, in the `*.Tests` projects) added or
changed for the ticket: the test classes and a count or the test names, what each group checks, which
existing tests were checked and left unchanged, the result of running them (passed and failed counts, and
the branch or commit they ran on), and what the unit tests do not cover. If none were added or changed, say so
and give the reason.

**Automated API testing.** Audience is developers and QA. Cover the automated API tests (the repo's API test
solution, for example `Snowdrop.Remittance.QA.Api.Tests`; see the "API tests" section below) added or
changed: the test names, what each checks, which existing tests were checked and left unchanged, and the
result of running them (environment, the branch or commit deployed there, passed and failed counts). State
what they do not cover and any assumption in them. If none were added or changed, say so and give the
reason.

**Claude API testing.** Include this section only when the user explicitly had Claude test the change by
calling APIs against a deployed environment during this ticket (the `api-testing` skill, with a procedure
document in `API Tests/`). When that was not done, leave the section out and do not mention Claude API
testing anywhere in the comment. When it was done, give: the environment and organization; the procedure
document used (its path under `API Tests/`); the calls made, as method and route, without secrets; what was
seen against what was expected; data left behind in the environment; and what was not verified. The
documents in `API Tests/` show the shape of such a test.

**How to Test Manually.** Audience is a tester or QA, not the developer. This section is always written, and
the comment is always drafted and posted, even when the fix cannot be tested by hand.

*When it can be tested.* Write numbered, step-by-step instructions that can be followed without reading the
code:
- **Environment:** which environment to use and what test data or setup is needed.
- **One test per scenario**, each with numbered steps and the expected result. Cover the fixed case, the
  closest unchanged behavior that must still work (regression), and any related path the change could
  affect (for example bulk versus single).
- **Optional backend check** (Splunk, Cosmos) when a log or record confirms the result; give the index,
  namespace, and search text. Only include log wording that has been confirmed against the code.
- **Limits:** conditions the steps cannot cover, such as asynchronous timing or events that cannot be forced.

*When it cannot be tested.* Start with one line stating that the fix cannot be validated by a tester and why.
Typical reasons: the condition only occurs after an unreproducible system failure (for example, an Azure
Function delayed for about four minutes for reasons not fully understood), the case depends on timing that
cannot be forced in a test environment, or the outcome is "not a defect" or "working as designed" with no
change to validate. Then list what was done instead: what was observed, in which environment, and what
evidence is recorded (Jira comment, `summary.md`, `code-analysis/`). Add monitoring guidance if the
condition can be watched for after release, for example the log or metric to check.

**Source the content from `summary.md` and the committed change, not from chat history or from the
planned design.** Report test results only when the run is recorded in `summary.md`. Steps and expected
results must match what was actually built. If the committed change has not been read, or a step has not
been tried, say in the draft notes which steps or expected outcomes are assumptions.

**Log it.** After posting, add a dated entry to `summary.md` stating that the Testing comment was
posted, with the comment link.

## API tests

Automated API tests are owned by this team. When a change to the main solution (a fix, a behavior change, a changed event, API or contract) affects what an API test checks, update the affected API tests as part of the same work. Do not leave them for another group and do not treat them as off limits.

- Claude Code makes the test changes.
- Find the affected tests by searching the API test code for the changed behavior, endpoint, event name or data shape. State which tests were changed and which were checked and left unchanged.
- Test code that writes data in a form the real service does not (for example dashed guids where the service writes compressed guids) is incorrect; correct it when it is in scope of the change.
- Record the API test changes in `code-analysis/` with the other code-side notes, and mention them in the Technical Summary of the resolution comment and in the "Automated API testing" section of the Testing comment.
- An API test change that is only a guess at what the main change implies is an assumption. Say so in the draft notes, as for the Testing comment.
- Do not confuse these automated tests with Claude API testing, where the user has Claude call the deployed APIs by hand (procedures in `API Tests/`, rules in the `api-testing` skill). Each has its own section in the Testing comment.

## Growing this skill

If a new recurring need shows up (e.g. the user wants a specific downloads sub-structure per evidence type,
or wants summary.md entries auto-cross-posted as Jira comments), add it here once confirmed rather than
speculating ahead of an actual request.
