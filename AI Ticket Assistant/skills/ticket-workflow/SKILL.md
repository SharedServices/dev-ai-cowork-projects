---
name: ticket-workflow
description: "Manages a durable case folder at tickets/{TICKET-ID}/ for any Jira ticket (UF-XXXXX) under investigation — summary.md log, downloads/ for Cosmos/Splunk evidence, code-analysis/ written only by Claude Code. Use when the user says \"start/resume/close a ticket for UF-XXXXX\", \"log this for the ticket\", \"draft a jira comment\", or begins sustained investigation on a ticket number. If the current project has no tickets/ folder yet, offer to create one instead of refusing — it can run in any project. Before starting/resuming with unrelated prior history, ask if a new session is wanted — neither platform can open one automatically. Otherwise check whether tickets/{TICKET-ID}/ exists; if so, read summary.md and recap before continuing. Either platform writes summary.md + downloads/; only Claude Code writes code-analysis/. Jira comments: one comment, Business + Technical Summary, drafted then approved before posting. The folder — not the chat — is the source of truth."
---

# Ticket Workflow

A ticket folder gives an investigation a home that outlives the conversation: readable from a brand-new
Cowork or Claude Code session started in this project, so either can start, resume, or continue the same ticket. The chat transcript
is disposable; `tickets/{TICKET-ID}/` is not.

## Folder shape

```
tickets/{TICKET-ID}/
  summary.md       — living investigation record, dated log entries (written by whichever platform is working the ticket)
  downloads/       — raw evidence: Cosmos exports, Splunk exports, blob projections, etc.
                      (written by whichever platform is working the ticket, including blobs fetched in Claude Code)
  code-analysis/   — Claude Code's own notes/artifacts from code-side investigation
                      (Claude Code writes this — see "Write boundary with Claude Code" below)
```

## Precondition — confirm before scaffolding into a new project

This skill is installed account-wide and can trigger in any project, not just one designated "ticket"
project — so it can't assume the current project is already set up for ticket work. Before doing anything
else (starting, resuming, logging, closing, or generating a Jira comment), check whether the current
project already has a `tickets/` folder at its root.

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
whatever else was discussed earlier in the session. Cowork has no tool that lets Claude open a new session
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
  markers), or from the user saying so explicitly. Cowork's role on these is research/spec-review — flagging
  gaps in `spec.md`/`plan.md`/`tasks.md` and feeding `[NEEDS CLARIFICATION]` resolution — not driving the
  spec-kit commands themselves, which live in Claude Code.
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

0. Run the "New-session check" above first.
1. Check whether `tickets/{TICKET-ID}/` already exists. If it does, this is a resume, not a fresh start —
   go to "Resuming a ticket" instead.
2. Create `tickets/{TICKET-ID}/` and `tickets/{TICKET-ID}/downloads/`. Do not create `code-analysis/` —
   that folder is Claude Code's to create on its own when it first needs it.
3. Look up the ticket (Jira `getJiraIssue`) to seed the header: title, URL, current status, a short
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

0. Run the "New-session check" above first.
1. Read `summary.md` in full. If `code-analysis/` exists, skim it too — Claude Code may have left findings
   there since the last CoWork session that `summary.md` doesn't yet reflect.
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
immediately whenever the user explicitly says "log/summarize this for the ticket."

- Append, don't overwrite. Each entry: `## {YYYY-MM-DD} — {short heading}` followed by a few sentences to
  a short paragraph.
- Write in prose capturing the reasoning and conclusion — this is a narrative record, not a transcript
  dump. Link out to Jira comments, Splunk searches, specific files in `downloads/`, or specific files in
  `code-analysis/` rather than pasting raw data inline.
- Raw evidence (Cosmos JSON, Splunk exports) belongs in `downloads/`, referenced by filename from
  `summary.md` — not embedded in the summary itself.
- If summarizing something Claude Code found in `code-analysis/`, cite it by filename in `summary.md`
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
skill is installed account-wide and runs against whichever project the user has open (per the Precondition
section above).

**Where that path comes from, per platform:** in Cowork, the connected folder's absolute path is given at
the start of every session as part of the session's own environment info (e.g. a line like "Additional
working directories: C:\Users\{user}\Claude\Projects\{ProjectName}") — read it from there rather than
remembering a value from a previous session or project. In Claude Code, the working directory itself is
that path (`pwd` on the shell, or the cwd Claude Code already operates in) — no separate lookup needed.
Either way, compute the full path fresh each time — `{connected-project-path}\tickets\{TICKET-ID}\downloads\{filename}` —
rather than reusing one seen earlier in the conversation, per the standing "never hand the user a file path
containing a literal placeholder token" rule in root `CLAUDE.md`. Same rule applies to `summary.md`
references if ever surfaced to the user directly.

## Claude Code handoff

Claude Code started in this project runs this skill the same way Cowork does: start, resume, log, close, and the Jira comment draft all apply unchanged. `tickets/{TICKET-ID}/` is a plain folder in the project, so Claude Code reads and writes it directly with no sync step. Resuming a ticket in Claude Code reads `summary.md` and `downloads/` (and skims `code-analysis/`) and recaps, exactly as in Cowork.

**Run the same "New-session check" as Cowork before diving in.** The reasoning is identical to the
Cowork case above: a ticket investigation reads best as its own conversation, and Claude Code sessions
accumulate unrelated history just as easily as Cowork ones do (a long-running terminal session touching
several tickets or unrelated code tasks before a ticket comes up). Before starting
work on the ticket, check whether the current Claude Code conversation already
looks like a fresh, ticket-focused session. If it does, proceed without asking. If it has meaningfully
unrelated history (a different ticket, an unrelated coding task, a long-running general session), ask
the user plainly whether they want to start a new session/terminal for this ticket before continuing — same
as Cowork, Claude Code has no tool to open a new session on the user's behalf, so the most it can do is flag it
and let them decide. This check applies once per ticket per session; don't re-ask if they've already answered
it and kept working.

### Write boundary between platforms

Cowork and Claude Code both have full read access to the entire `tickets/{TICKET-ID}/` folder:

- **Either platform writes:** `summary.md` and `downloads/` — whichever is working the ticket in the current session, with the same log format and fresh-filename discipline on both. Don't work the same ticket in both at once: neither session sees the other's unsaved context, and both append to `summary.md`.
- **Only Claude Code writes:** `code-analysis/` — its own subfolder for code-investigation notes/artifacts, created by Claude Code itself the first time it needs it (don't pre-create it from Cowork). Cowork never writes into it.

Raw evidence stays in `downloads/` and analysis stays in `code-analysis/`, so it is clear at a glance which is which. Claude Code is the only platform that can reach Azure Blob Storage (`blob-projection-fetch`) and read the source repositories. When code-level analysis is needed from Cowork, tell the user to continue in Claude Code with "resume ticket UF-XXXXX" rather than trying to do code analysis from Cowork — and when picking a ticket back up on either platform, check `code-analysis/` for anything Claude Code left before assuming `summary.md` alone has the full picture.

## Generating a Jira comment

Trigger: the user asks for "comments for the jira ticket," "a comment explaining the conclusion," or similar
— a request to turn the investigation into something postable to the ticket itself (confirmed shape
2026-08-06, UF-15723).

**One comment, two sections, draft-then-approve.** This is always a single Jira comment with two clearly
headed sections — never two separate comments, and never posted straight to Jira without the user reviewing
it first. Draft it in the conversation, let the user read and adjust it, and only call
`addCommentToJiraIssue` once they explicitly confirm. This matters because a comment posted to Jira is
effectively permanent (visible in the ticket's history even if edited later), and the Business Summary
section in particular may use customer-facing language worth a second look before it's committed.

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
- The fix, if one exists — pull this from `code-analysis/` if Claude Code did the fix work; cite the file
  rather than re-deriving implementation detail from scratch. If there was no fix (e.g. "working as
  designed"), say so explicitly rather than leaving it implied.
- Any open questions or follow-ups that don't block closing this ticket but are worth flagging (e.g. a
  standing product/requirements question the investigation surfaced).

**Source the content from `summary.md` (and `code-analysis/` when present) — not from chat history.**
The dated log is the record of what was actually concluded and why; reconstructing from conversation
memory risks losing nuance or reintroducing a hypothesis that was later revised (see the pattern in
UF-15723 where an initial "not a bug" conclusion was briefly reopened and then reconfirmed — the comment
should reflect the final state in `summary.md`, not an intermediate one).

**Example (from UF-15723, case 1 — reproduce this shape, not this wording, for a new ticket):**

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

## Growing this skill

If a new recurring need shows up (e.g. the user wants a specific downloads sub-structure per evidence type,
or wants summary.md entries auto-cross-posted as Jira comments), add it here once confirmed rather than
speculating ahead of an actual request.
