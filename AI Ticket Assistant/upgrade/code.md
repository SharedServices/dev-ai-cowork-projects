# Upgrade project

Instructions for `upgrade project`, run in a session of the project environment (`README.md`, "Setup"). Root `CLAUDE.md` ("Project upgrade") defines how this file is run. The project version is in `upgrade/version.md`.

## Release steps

One entry per release that needs something done, oldest first, headed `### {version} — title` (versions as in `upgrade/version.md`). Changes not yet released are headed `### Unreleased — title` and are ignored until the maintainer gives the version. Each entry is a set of checks that report "nothing found" when there is nothing to do, so running it on a fresh install is harmless. If an entry needs the user to act, say what to do and leave the recorded version unchanged so the next run repeats the entry.

### 2026.10.7 — Remove personal copies of the project skills

A folder with the same name as a project skill in `~/.claude/skills/` loads alongside the project copy as a duplicate and can be an older version.

Names to look for: `splunk-search`, `cosmos-query`, `snowdrop-api-calls`, `ticket-workflow`, `instana-query`, `activate-repo`, `initiate-project`, `blob-projection-fetch`, `activate-cowork`, `reference-ticket`. Do not touch any other folder; the user may keep unrelated personal skills there.

1. List which of those names exist as folders in `~/.claude/skills/` (on Windows, `$HOME\.claude\skills\`). For each, state whether it is a real folder or a symlink/junction (in PowerShell, `(Get-Item $path).Attributes -band [IO.FileAttributes]::ReparsePoint`).
2. None found: report "no personal copies found" and continue.
3. Never delete a symlink or junction, and never recurse into one. A link may point at this project's `.claude/skills/` source, and a recursive delete through it removes the source. Report each link with its target and tell the user to remove the link themselves if it should go.
4. List the real folders to be deleted and ask the user for an OK. On OK, delete only those folders and report each path removed. Without an OK, delete nothing, do not record the version, and say the step is still open.
5. Print what remains in `~/.claude/skills/`, and tell the user to restart Claude Code so the skill list reloads.

### 2026.10.21 — Remove personal copies of era-builder and api-testing

Apply the steps of the 2026.10.7 entry with these names: `era-builder`, `api-testing`.

### 2026.11.10 — Remove duplicates of the project skills and of removed skills

The project skills are in `.claude/skills/` and are the only copies. `activate-cowork` was removed, and `logging-correlation` moved from `~/.claude/skills/` into the project.

1. Apply the steps of the 2026.10.7 entry with these names: `activate-cowork`, `logging-correlation`, and every folder name under this project's `.claude/skills/`.
2. The skill list may also show copies as `anthropic-skills:{name}` (saved to the Claude account). Report any whose name matches a project skill and tell the user to delete them in the Claude settings (Customize, Skills); this cannot be done from Claude Code.
3. Check the user's global `~/.claude/CLAUDE.md` for the sections "Cowork projects folder" and "Last activated Cowork project". If present, tell the user they are no longer used and ask for an OK to delete them; delete only those two sections.

## Every-run steps

### 1. Validate the environment, then confirm identity and source access

**Validate the environment.** Report each check as pass or fail with the evidence. A failure does not stop the later steps; tell the user how to fix it (setup is in `README.md`, "Setup").

1. **Project root.** Find it as root `CLAUDE.md` "Folder locations" describes (the folder that contains `upgrade/version.md`, `CLAUDE.md` and `repos/`). In the standard environment it is the primary working directory. If it is only an additional directory, report that this is an alternate environment (allowed) and that check 3 applies.
2. **Source folder.** Among the other working directories (the additional working directories line of the session's environment info, apart from the project root), look for a folder that looks like a source root, using the listing in "Source path" below. If none is attached, report that no source folder is attached and tell the user to add one to the environment.
3. **Variable.** If the project root is an additional directory, this file was loaded, which shows `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` is in effect: pass. Otherwise run `echo $CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` in bash. A value of `1` passes. An empty value is unconfirmed, not failed (the shell may not show variables the app sets); tell the user to confirm the variable is in the environment settings, because source-primary environments need it.

Read `local/user.md` in the project root. The file has this shape:

```
# Current user

- Squad: {squad}
- Pod: {pod}
- Source path: {full Windows path of the folder that contains the source repositories}
- Upgrade version: {version}

## Account (reference only)

- Name: {account name}
- Email: {account email}
```

**Squad and Pod.** The request takes no arguments; both are asked for. If the file has a value, state it plainly and ask whether it is still correct. If it is missing or blank, ask which squad the user is on, offering the `## Squads` table in root `CLAUDE.md` as the option list (Squad name or Alias, case-insensitive), then ask which pod, offering the `## Pods` table as the option list. Squads are being retired; keep asking for both until they are. Write the chosen names exactly as listed in those tables.

**Source path.** The expected value is the source folder found in environment check 2: the folder that holds the source repositories, one subfolder per repository named as in `repos/` (the `## Repos` table). If the file has a value, state it and ask whether it is still correct; if it differs from the attached source folder, show both and ask which to record. If it is missing or blank, propose the attached source folder and ask for confirmation. If no source folder is attached, ask the user for the full path. Do not guess or search the disk for it.

1. Check that the path exists and is a folder (directory listing, not Glob).
2. If the folder's own name matches a `repos/` folder, it is a single repo: warn that only that repo will be found and ask for its parent folder instead.
3. List one level only (a recursive search over the tree times out) and compare the subfolder names to the `## Repos` table. Report "N of M project repos found in source; K other folders ignored". A project repo with no source folder is informational, not an error (OpenAPI-only repos have no checkout).
4. If the user has no source folder, leave Source path blank and continue.

Create `local/` if it doesn't exist and write the file in the shape above (update in place if it exists, keeping every setting that is already filled in). If the file has `Upgrade version (...)` lines that name a platform, replace them with one `Upgrade version` line holding the highest of those versions. Fill the Account section from the account details already in the session context; if a value isn't available, omit that line. These lines are reference only and are refreshed whenever the file is written. `local/` is git-ignored: never copy these values into a tracked file.

### 2. Smoke-test Claude in Chrome

Confirm the Claude in Chrome extension is connected and responsive: load the Chrome tools with ToolSearch if they are deferred, get the tab context (creating a tab if needed), navigate to a harmless, always-available page, and confirm a screenshot or page read succeeds.

Report plainly: working, or not connected/responding (in which case tell the user to check the Claude in Chrome extension is installed and enabled, per that tool's own setup — don't guess further at the cause).

### 3. Smoke-test Splunk

Run one small, cheap, known-good Splunk search via the `splunk-search` skill's Chrome-based flow (see that skill for the mechanics — index pattern, `sid`-based result extraction) against a low-stakes environment such as `ninja`, scoped tightly (e.g. last 15 minutes, a small `head` limit) purely to confirm the query round-trip works end to end.

Report plainly: working (found N results, or zero results but no error — still a pass), or failed (and what the failure looked like — auth prompt, no results tab, timeout) so the user knows to check their Splunk session/VPN rather than assuming this workspace is misconfigured.

### 4. Summarize

Give one short, plain summary: environment checks (project root, source folder, variable), identity (squad, pod), source access (folder and repo match count, or "no source folder"), Chrome, Splunk. State what passed, what didn't, and what the user needs to do next.
