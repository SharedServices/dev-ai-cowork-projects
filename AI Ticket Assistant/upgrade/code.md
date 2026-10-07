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

## Every-run steps

None. Recording identity and source access, publishing skills, and the Chrome and Splunk smoke tests need Cowork. The cross-platform check in root `CLAUDE.md` tells the user to run `upgrade project` in Cowork when its version is behind.
