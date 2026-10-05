---
name: initiate-project
description: "Run first-time setup, or re-sync, for this AI Ticket Assistant project instance. Cowork only. Use when the user says \"initiate project\", optionally with arguments (\"initiate project {squad} {source-path}\", e.g. \"initiate project Financial Ledger C:\\unlimited\\repositories\"), or \"set up this project\", \"onboard me\", \"first-time setup\". Records the Squad and the Source path (folder containing the source repositories) in the git-ignored local/user.md, packages the skills listed in skills/README.md as .skill cards for the user to save (account skills load in both Cowork and Claude Code), lists personal Claude Code skills that duplicate them and should be removed, then smoke-tests Claude for Chrome and a Splunk query. Re-run after any edit under skills/. If run from Claude Code, stop and tell the user to run it in Cowork."
---

# Initiate Project

First-time setup, or re-sync, for this project instance. Cowork only: packaging a `.skill` card needs Cowork's `skill-creator` and `present_files`.

Skills saved to the Claude account load in both Cowork and Claude Code (desktop app), so one saved card serves both. Run this once on a new instance, and again after any edit under `skills/`; a skill edit reaches the account only when its card is saved.

## Steps

### 0. Confirm the platform

If this is a Claude Code session, stop now. Do none of the steps below. Say plainly: "`initiate project` runs in Cowork only. Open this project in Cowork and run it there. Skills saved to the account there are also available in Claude Code."

### 1. Confirm identity

The request may carry arguments: `initiate project {squad} {source-path}`.

- The Source path is the part of the arguments that starts with a drive letter and colon, a `\`, a `/`, or `~`, up to the end (quoted paths with spaces are fine). The Squad is the text before it.
- Match the Squad against the `## Squads` table in root `CLAUDE.md`, by Squad name or Alias, case-insensitive. If it matches nothing, ask, offering that table as the option list.
- Arguments that were supplied replace the stored values. Arguments that were not supplied fall back to the stored value, then to asking.

Read `local/user.md` (relative path). The file has this shape:

```
# Current user

- Squad: {squad}
- Source path: {path to the folder containing the source repositories}

## Account (reference only)

- Name: {account name}
- Email: {account email}
```

- For each of Squad and Source path: if no argument was given and the file has a value, state it plainly and move on — don't re-ask.
- If the file is missing or Squad is blank (and no argument was given), ask which squad the user is on, offering the `## Squads` table as the option list.
- If the file is missing or Source path is blank (and no argument was given), ask for the full path to the folder that contains the source repositories (each repo in a subfolder named the same as its folder under `repos/`). Store the path as given; Cowork cannot check it.
- Ask only for the settings that are missing or blank, and don't ask for a name. Create `local/` if it doesn't exist and write the file in the shape above (update in place if it exists, keeping any setting that was already filled in).
- Fill the Account section from the Claude account details already in the session context. Don't ask the user for them; if a value isn't available, omit that line. These lines are reference only and are refreshed whenever the file is written.
- `local/` is git-ignored — never copy these values into a tracked file.

### 2. Publish the skills

Read the inventory table in `skills/README.md` — every row is a skill to publish.

For each row, check whether a matching skill is already available in the current session (the platform's own available-skills listing, prefixed e.g. `anthropic-skills:`). Build two lists: already installed, and missing.

- If nothing is missing and no source changed since the last save, say so plainly and skip packaging.
- An installed skill may be stale after an edit under `skills/`, including `initiate-project` itself. Re-present every skill whose source changed since it was last saved, not only the missing ones. If the user said nothing about which changed, ask.
- For each skill to present: copy its source folder from `skills/{name}/` to a writable location, then invoke the `skill-creator` skill's packaging step (`python3 -m scripts.package_skill <path-to-skill-folder>`, run with `skill-creator`'s own `scripts/` directory as the working directory — see `documents/project-maintenance.md`'s "Updating skills" section for the exact mechanics and the read-only-filesystem workaround) to produce a `.skill` file for each. Skip the full skill-creator eval/test-case loop — this is packaging an already-written skill, not authoring one from scratch.
- Present all the resulting `.skill` files together in one `present_files` call. Alongside, give one plain-language line per skill — pulled from `skills/README.md`'s own per-skill section — stating what it does and what phrase triggers it, so the user knows what they're saving and how to use it once they click **Save skill** on each card. Saving is the user's action, not something this skill can do on their behalf.

### 3. List personal Claude Code skills to remove

A skill folder in `~/.claude/skills/` loads in Claude Code alongside the account copy of the same skill, so the user sees duplicates, and the personal copy can be an older version. Cowork cannot see `~/.claude/`, so give the user this for them to run once. Use the real names: every skill in the inventory table, plus every name under "Retired skills" in `skills/README.md`.

```
foreach ($n in '<name1>','<name2>') {
  $d = Join-Path $HOME ".claude\skills\$n"
  if (Test-Path $d) { Remove-Item -Recurse -Force $d; "removed $d" }
}
```

Say that this deletes those folders, and that it is only needed once per machine unless a skill is added to the inventory.

### 4. Smoke-test Claude for Chrome

Confirm the Claude for Chrome browser extension is connected and responsive: get the tab context (creating a tab if needed), navigate to a harmless, always-available page, and confirm a screenshot or page read succeeds.

Report plainly: working, or not connected/responding (in which case tell the user to check the Claude for Chrome extension is installed and enabled, per that tool's own setup — don't guess further at the cause).

### 5. Smoke-test Splunk

Run one small, cheap, known-good Splunk search via the `splunk-search` skill's Chrome-based flow (see that skill for the mechanics — index pattern, `sid`-based result extraction) against a low-stakes environment such as `ninja`, scoped tightly (e.g. last 15 minutes, a small `head` limit) purely to confirm the query round-trip works end to end.

Report plainly: working (found N results, or zero results but no error — still a pass), or failed (and what the failure looked like — auth prompt, no results tab, timeout) so the user knows to check their Splunk session/VPN rather than assuming this workspace is misconfigured.

### 6. Summarize

Give one short, plain summary: identity (squad and source path), skills (installed, or cards to save), the personal-skill removal block, Chrome, Splunk. State what passed, what didn't, and what the user needs to do next. The last next step is: after saving the cards, start Claude Code in this project folder and run `/skills` to confirm the `anthropic-skills:` entries are listed.
