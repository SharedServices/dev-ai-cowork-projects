---
name: reference-ticket
description: >
  Load context from a Claude app (Claude CoWork) ticket case folder — tickets/{TICKET-ID}/ under
  whichever Cowork project is currently active in this session — so Claude Code can pick up an
  investigation already done there. Use when James says "reference ticket UF-XXXXX" (or similar:
  "pull up UF-XXXXX", "load ticket UF-XXXXX"). Reads summary.md and inventories downloads/ for
  grounding. For the rest of the session, any generated analysis document defaults to writing into
  tickets/{TICKET-ID}/code-analysis/ without needing to be asked each time — do not touch
  summary.md or downloads/, those belong to the Claude app side.
---

# Reference Ticket

Brings a Claude app (CoWork) ticket investigation into a Claude Code session, so code analysis can build
directly on real-world findings already gathered there instead of starting cold.

## Folder shape (owned jointly, split by writer)

```
{active-cowork-project}\tickets\{TICKET-ID}\
  summary.md       — Claude app writes this. Read-only from here.
  downloads\        — Claude app writes this. Read-only from here, except fetched blobs (see below).
  code-analysis\    — this skill writes here. Claude app never touches this folder.
```

`{active-cowork-project}` is the Cowork project folder currently active in this session — set by
`activate-cowork`, an explicit "activate project {name}" statement, or any other prior activation
earlier in the conversation. It can be a direct child of `C:\Users\JamesMoorhouse\Claude\Projects\`
(e.g. `Consolidated`) or nested further (e.g. `dev-ai-cowork-projects\AI Ticket Assistant`) — use
whatever path was actually established when that project was activated, don't re-derive or guess it.

**If no project has been activated yet this session, ask which project's tickets to use** (offering
the subfolders of `C:\Users\JamesMoorhouse\Claude\Projects\` as options) rather than silently
defaulting to `Consolidated` — more than one project can hold a `tickets/{TICKET-ID}\` folder, and
guessing wrong burns a round-trip and (worse) can surface the wrong ticket's data. `Consolidated` is
a reasonable one to suggest first since it's the original, most-used workspace, but it's a suggestion,
not an assumed default.

Access works because `C:\Users\JamesMoorhouse\Claude` is registered as an additional working
directory in James's global `~/.claude/settings.json` — it applies to every Claude Code session
on this machine, not just one repo.

## Triggering

Trigger: "reference ticket UF-XXXXX" (or "pull up"/"load ticket UF-XXXXX").

1. Resolve `{active-cowork-project}` per above, then the path:
   `{active-cowork-project}\tickets\{TICKET-ID}\`.
2. If the ticket folder doesn't exist under the active project, say so plainly — don't silently fall
   back to searching a different project's `tickets/` folder, and don't guess a different ticket.
   James may not have started a CoWork ticket folder for this one yet, or it may live under a
   different project than the one currently active; if so, ask rather than switching silently.
3. If it exists:
   - Read `summary.md` in full.
   - List `downloads/` (filenames only — don't read every file yet, they can be large raw exports).
   - Recap back to James: the ticket title/status from the summary header, the gist of the findings,
     and what's available in `downloads/`. This confirms the right context loaded before analysis starts.
4. Only read a specific `downloads/` file when the analysis at hand actually needs it (e.g. a Cosmos
   export referenced by the finding being investigated) — don't bulk-load everything up front.

## Session default: where analysis goes

Once a ticket has been referenced this way, it stays "active" for the rest of the session:

- Any document James asks you to generate about this ticket — an analysis summary, findings, notes —
  defaults to `tickets/{TICKET-ID}\code-analysis\` without needing to be told the destination each time.
- State the destination once, the first time you write there in the session (e.g. "saving this to
  tickets/{TICKET-ID}/code-analysis/..."), so it's visible, then don't re-confirm on subsequent writes
  in the same session.
- Never reuse a filename — include a short description and date/timestamp, same discipline as the
  `downloads/` convention on the Claude app side.
- If James explicitly asks for output somewhere else (a PR description, a different file, inline chat
  only), that overrides the default — this is a default, not a forced destination.
- Never write into `summary.md` from Claude Code. If something belongs in the living narrative record,
  tell James so he can log it from a Claude app session instead.
- `downloads/` is written from Claude Code only for fetched evidence the Claude app cannot reach (blob
  projections, via `blob-projection-fetch`). Analysis documents still go to `code-analysis/`.

## Multiple tickets in one session

If James references a second ticket mid-session, treat the newly referenced ticket as the active one
for subsequent writes — don't keep defaulting to the first. If ambiguous which ticket a request is
about, ask.

## Content shape: diagnosis vs feature implementation

Not every ticket worked in Claude Code is a root-cause investigation. Two recurring shapes so far:

- **Diagnosis** (the original case) — a bug/behavior investigation against root-cause theories. Write
  findings as an investigation narrative: what was checked, what was ruled out, what was confirmed, and
  the root cause.
- **Feature implementation** — a story/task where actual code was written (new attribute types, new
  endpoints, a new qualifier, etc.), confirmed 2026-08-13 on UF-15804. For these, structure the
  code-analysis document around **two eventual audiences**, since Claude App (CoWork) will draft the Jira
  write-up from this file and needs both halves — see the `ticket-workflow` skill's "Generating a Jira
  comment" section for the exact Business Summary / Technical Summary shape CoWork produces:
  - **Business description** — what was built and why, in plain language: what capability is now
    possible, no file paths, type names, or code-level detail.
  - **High-level technical outline** — the shape of the change for an engineer skimming it: what was
    added/changed and where, at the level of "which files, which types, which behavior," without walking
    through the full diff.
  - Below those two, capture deeper technical detail for future reference (exact files/line numbers, data
    model findings, corrected assumptions, edge cases handled, test coverage added) — this is the part a
    developer debugging a related issue later will actually need, even though it won't make it into the
    Jira write-up verbatim.

Only Claude Code decides the write boundary and file destination (see above) — `ticket-workflow` is
CoWork's skill and doesn't carry Claude-Code-specific authoring instructions like this; this skill is
where those belong.

## Growing this skill

`code-analysis/` content shape started as just "a final analysis" — now split by diagnosis vs feature
implementation (see above). Other artifact types may still show up (diagrams, code excerpts, decision
notes) — add structure here once a recurring pattern actually shows up, rather than speculating ahead of
it.
