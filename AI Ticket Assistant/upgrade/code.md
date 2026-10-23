# Upgrade project — Claude Code

Instructions for `upgrade project` in a Claude Code session. Root `CLAUDE.md` ("Project upgrade") defines how this file is run. The project version is in `upgrade/version.md`.

## Release steps

One entry per release that needs this platform to do something, oldest first, headed `### {version} — title` (versions as in `upgrade/version.md`). Changes not yet released are headed `### Unreleased — title` and are ignored until the maintainer gives the version. Each entry is a set of checks that report "nothing found" when there is nothing to do, so running it on a fresh install is harmless. If an entry needs the user to act, say what to do and leave the platform's version unchanged so the next run repeats the entry.

### 2026.10.7 — Remove personal copies of the account skills

Skills saved to the Claude account load in Claude Code as `anthropic-skills:{name}`. A folder with the same name in `~/.claude/skills/` loads alongside it as a duplicate and can be an older version.

Names to look for: `splunk-search`, `cosmos-query`, `snowdrop-api-calls`, `ticket-workflow`, `instana-query`, `activate-repo`, `initiate-project`, `blob-projection-fetch`, `activate-cowork`, `reference-ticket`. Do not touch any other folder; the user may keep unrelated personal skills there.

1. List which of those names exist as folders in `~/.claude/skills/` (on Windows, `$HOME\.claude\skills\`). For each, state whether it is a real folder or a symlink/junction (in PowerShell, `(Get-Item $path).Attributes -band [IO.FileAttributes]::ReparsePoint`).
2. None found: report "no personal copies found" and continue.
3. Never delete a symlink or junction, and never recurse into one. A link may point at this project's `skills/` source, and a recursive delete through it removes the source. Report each link with its target and tell the user to remove the link themselves if it should go.
4. List the real folders to be deleted and ask the user for an OK. On OK, delete only those folders and report each path removed. Without an OK, delete nothing, do not record the version, and say the step is still open.
5. Report, without deleting, any of the same names found in `.claude/skills/` of this project folder or of the first-level folders under the Source path in `local/user.md`. Those may be intentional.
6. Print what remains in `~/.claude/skills/`, and tell the user to restart Claude Code so the skill list reloads.

### 2026.10.21 — Remove personal copies of era-builder and api-testing

`era-builder` and `api-testing` are account skills and load in Claude Code as `anthropic-skills:era-builder` and `anthropic-skills:api-testing`. A folder with either name in `~/.claude/skills/` loads alongside the account copy as a duplicate and can be older (era-builder was earlier described as a project skill that Claude Code loaded from a checkout).

Apply the same steps as the 2026.10.7 entry, with these names: `era-builder`, `api-testing`. Also report, without deleting, a `.claude/skills/era-builder` or `.claude/skills/api-testing` folder in this project folder or in the first-level folders under the Source path in `local/user.md`.

### Unreleased — Record the Cowork projects folder for activate-cowork

The `activate-cowork` skill reads the folder that holds the user's Cowork projects from a section of the global `~/.claude/CLAUDE.md`. This is separate from the Source path in `local/user.md`: `local/user.md` lives inside a project and is found only once the project is known, while the global `CLAUDE.md` is read before any project is known.

1. Read `~/.claude/CLAUDE.md` (on Windows `$HOME\.claude\CLAUDE.md`). If the file is missing, treat the section as missing.
2. If it has a section titled "Cowork projects folder" with a path and that path exists as a folder (directory listing), report the path and continue. Nothing to do.
3. If the section is missing, or its path does not exist, ask the user for the full path of the folder that holds their Cowork project folders. Do not guess it, infer it from the working directory, or search the disk. If the user gives a path, check that it exists, then add or update only the "Cowork projects folder" section in the format given in `skills/activate-cowork/SKILL.md` (create the file if missing; leave every other part unchanged) and report the path written.
4. If the user does not want to set it now, report that `activate-cowork` will ask for it on first use, and continue.
5. Do not write the "Last activated Cowork project" section; the skill writes it on activation.

## Every-run steps

None. Recording identity and source access, publishing skills, and the Chrome and Splunk smoke tests need Cowork. The cross-platform check in root `CLAUDE.md` tells the user to run `upgrade project` in Cowork when its version is behind.
