# Upgrade project — Cowork

Instructions for `upgrade project` in a Cowork session. Root `CLAUDE.md` ("Project upgrade") defines how this file is run. The project version is in `upgrade/version.md`.

## Release steps

One entry per release that needs this platform to do something, oldest first, headed `### {version} — title` (versions as in `upgrade/version.md`). Changes not yet released are headed `### Unreleased — title` and are ignored until the maintainer gives the version. Each entry is a set of checks that report "nothing found" when there is nothing to do, so running it on a fresh install is harmless. If an entry needs the user to act, say what to do and leave the platform's version unchanged so the next run repeats the entry.

### 2026-10-07 — Remove the account `initiate-project` skill

`initiate-project` is no longer a skill. `upgrade project` replaces it and runs from this file. An account copy of `initiate-project` still loads, takes over the phrase "initiate project", and runs an old procedure.

1. Look for `initiate-project` in the session's available skills (any prefix, for example `anthropic-skills:initiate-project`), using only the skill listing already in the session context. Do not call `list_skills` or any tool that lists skills: it displays all of the user's skills in the chat with buttons, which is confusing here.
2. Not found: report "old initiate-project skill not installed" and continue.
3. Found: tell the user to delete it in Claude (click Customize, then select both Skills and Yours in the panel that opens, find `initiate-project`, and delete it), start a new Cowork session, and run `upgrade project` again. The skill list only refreshes in a new session, so a re-run in this session would still find it. Do not record the version. Stop here: do not run the every-run steps, ask no questions, and present no cards. Re-running in a new session after the skill is deleted runs everything once.

## Every-run steps

### 1. Confirm identity and source access

Read `local/user.md` (relative path). The file has this shape:

```
# Current user

- Squad: {squad}
- Pod: {pod}
- Source path: {full Windows path of the attached folder that contains the source repositories}
- Upgrade version (Cowork): {version}
- Upgrade version (Code): {version}

## Account (reference only)

- Name: {account name}
- Email: {account email}
```

**Squad and Pod.** The request takes no arguments; both are asked for. If the file has a value, state it plainly and ask whether it is still correct. If it is missing or blank, ask which squad the user is on, offering the `## Squads` table in root `CLAUDE.md` as the option list (Squad name or Alias, case-insensitive), then ask which pod, offering the `## Pods` table as the option list. Squads are being retired; keep asking for both until they are. Write the chosen names exactly as listed in those tables.

**Source path comes from the project's attached folders, not from the user.** The user attaches the folder in the project settings (before or after this step). Do not ask for a path.

1. List the attached folders: the session's working directories and connected folders (the file-tool paths, e.g. `C:\unlimited\repositories`). Exclude the project folder itself and non-source folders (the outputs folder, `uploads`, `.claude`, and similar).
2. **None left:** say plainly that no source folder is attached, so Cowork has no access to source code in this project. Explain how to fix it: attach the parent folder containing the repositories in the project settings, then start a new session (a folder attached after a session starts is not visible to that session) and re-run `upgrade project`. Leave Source path as it is (it may still serve Claude Code), do not invent one, and continue with the remaining steps.
3. **More than one left:** list them and ask which one holds the source repositories. Record only the chosen one.
4. **Exactly one:** use it.
5. The attached folder must be the **parent** folder, with one subfolder per repository named as in `repos/` (the `## Repos` table). If the folder's own name matches a `repos/` folder, it is a single repo: warn that Cowork will see only that repo and ask the user to attach its parent instead.
6. Check the attachment. List one level only (a recursive search over the tree times out) and compare the subfolder names to the `## Repos` table. Report "N of M project repos found in source; K other folders ignored". A project repo with no source folder is informational, not an error (OpenAPI-only repos have no checkout).
7. Record the **Windows path** (the file-tool path), never the `/sessions/.../mnt/...` path that bash sees. If `local/user.md` already holds a different Source path, say so and replace it with the attached path (the attachment is what Cowork can actually read). If the file holds a path and nothing is attached, keep the stored path and say it is unverified.

Create `local/` if it doesn't exist and write the file in the shape above (update in place if it exists, keeping every setting that is already filled in, including the Code upgrade version). Fill the Account section from the Claude account details already in the session context. Don't ask the user for them; if a value isn't available, omit that line. These lines are reference only and are refreshed whenever the file is written. `local/` is git-ignored: never copy these values into a tracked file.

### 2. Publish the skills

Read the inventory table in `skills/README.md` — every row is a skill to publish.

For each row, compare the project source `skills/{name}/` with the installed copy and classify the skill as current, outdated, or missing. Never ask the user whether a skill changed.

- **Where the installed copy is.** The session exposes the account's installed skills as a read-only folder with one subfolder per skill (the folder the session's own skill files are read from; in bash it is `.claude/skills/` under the session's `mnt` folder). A skill with no subfolder there is **missing**. Do not call `list_skills` or any tool that lists skills.
- **How to compare.** Installing a skill rewrites its `SKILL.md` frontmatter (the name is quoted and the description is reflowed), so never compare `SKILL.md` as raw text. Compare: (1) the text after the frontmatter, with CRLF converted to LF and trailing whitespace and surrounding blank lines removed; (2) the frontmatter `name` and `description`, parsed as YAML, with the description's whitespace collapsed; (3) every other file in the folder, byte for byte after converting CRLF to LF; (4) the set of files, since a file present on only one side is a difference. Any difference makes the skill **outdated**; no difference makes it **current**.
- **If the installed folder cannot be read,** treat every skill as outdated and say so, rather than asking.
- If every skill is current, say so plainly and skip packaging.
- Present cards for every skill that is missing or outdated, not only the missing ones.
- A card saved during this session does not appear in the installed folder until a new session. If the user re-runs right after saving, tell them to start a new session first, because the saved skills will still show as outdated.
- For each skill to present: copy its source folder from `skills/{name}/` to a writable location, then invoke the `skill-creator` skill's packaging step (`python3 -m scripts.package_skill <path-to-skill-folder>`, run with `skill-creator`'s own `scripts/` directory as the working directory — see `documents/project-maintenance.md`'s "Updating skills" section for the exact mechanics and the read-only-filesystem workaround) to produce a `.skill` file for each. Skip the full skill-creator eval/test-case loop — this is packaging an already-written skill, not authoring one from scratch.
- Present all the resulting `.skill` files together in one `present_files` call. Alongside, give one plain-language line per skill — pulled from `skills/README.md`'s own per-skill section — stating what it does and what phrase triggers it, so the user knows what they're saving and how to use it once they click **Save skill** on each card. Saving is the user's action, not something this procedure can do on their behalf.

### 3. Smoke-test Claude for Chrome

Confirm the Claude for Chrome browser extension is connected and responsive: get the tab context (creating a tab if needed), navigate to a harmless, always-available page, and confirm a screenshot or page read succeeds.

Report plainly: working, or not connected/responding (in which case tell the user to check the Claude for Chrome extension is installed and enabled, per that tool's own setup — don't guess further at the cause).

### 4. Smoke-test Splunk

Run one small, cheap, known-good Splunk search via the `splunk-search` skill's Chrome-based flow (see that skill for the mechanics — index pattern, `sid`-based result extraction) against a low-stakes environment such as `ninja`, scoped tightly (e.g. last 15 minutes, a small `head` limit) purely to confirm the query round-trip works end to end.

Report plainly: working (found N results, or zero results but no error — still a pass), or failed (and what the failure looked like — auth prompt, no results tab, timeout) so the user knows to check their Splunk session/VPN rather than assuming this workspace is misconfigured.

### 5. Summarize

Give one short, plain summary: identity (squad, pod), source access (attached folder and repo match count, or "no source attached"), skills (installed, or cards to save), Chrome, Splunk. State what passed, what didn't, and what the user needs to do next. If cards were presented, the last next step is: after saving them, start Claude Code in this project folder and run `/skills` to confirm the `anthropic-skills:` entries are listed.
