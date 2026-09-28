---
name: initiate-project
description: "Run first-time setup on a fresh copy of this Support project instance. Use when the user says \"initiate project\", \"set up this project\", \"onboard me\", \"first-time setup\", or similar — this is the explicit, on-demand counterpart to the old implicit \"on first use, if Name/Squad are blank\" trigger, which proved unreliable. Confirms the user's Name/Squad in the git-ignored local/user.md (asking if the file is missing or either is blank, offering the ## Squads list from root CLAUDE.md), checks which in-scope skills from skills/README.md's inventory are already installed and offers to package/install the rest with plain-language wording on what each does, then smoke-tests Claude for Chrome and a Splunk query so the user knows day-one whether those surfaces are working."
---

# Initiate Project

Runs first-time setup on a fresh copy of this Support project instance. This is a one-time (or occasional re-check) on-demand action — trigger it directly rather than expecting it to fire automatically on first use; an earlier implicit "on first use" trigger inside `## Current user` proved unreliable and was replaced with this explicit skill.

## Steps

### 1. Confirm identity

Read `local/user.md` in the project root (full absolute path on Claude Code, relative path on Cowork). The file has this shape:

```
# Current user

- Name: {name}
- Squad: {squad}
```

- If the file exists and both fields are filled in, state them plainly and move on — don't re-ask.
- If the file is missing or either field is blank, ask the user for their name and which squad they're on, offering the `## Squads` table in root `CLAUDE.md` as the option list. Once answered, create `local/` if it doesn't exist and write the file in the shape above (update in place if it exists). `local/` is git-ignored — never copy these values into a tracked file.

### 2. Check and offer the in-scope skills

Read `skills/README.md`'s inventory table — this is the definition of which skills belong to this workspace (`splunk-search`, `cosmos-query`, `snowdrop-api-calls`, `ticket-workflow`, `instana-query`, `activate-repo`, `initiate-project`, and any later additions).

For each row, check whether a matching skill is already available in the current session (the platform's own available-skills listing, prefixed e.g. `anthropic-skills:`). Build two lists: already installed, and missing.

- If nothing is missing, say so plainly and skip packaging.
- If any are missing, for each missing one: copy its source folder from `skills/{name}/` to a writable location, then invoke the `skill-creator` skill's packaging step (`python3 -m scripts.package_skill <path-to-skill-folder>`, run with `skill-creator`'s own `scripts/` directory as the working directory — see `documents/project-maintenance.md`'s "Updating skills" section for the exact mechanics and the read-only-filesystem workaround) to produce a `.skill` file for each. Skip the full skill-creator eval/test-case loop — this is packaging an already-written skill, not authoring one from scratch.
- Present all the resulting `.skill` files together in one `present_files` call. Alongside, give one plain-language line per skill — pulled from `skills/README.md`'s own per-skill section — stating what it does and what phrase triggers it, so the user knows what they're saving and how to use it once they click **Save skill** on each card. Saving is the user's action, not something this skill can do on their behalf.

### 3. Smoke-test Claude for Chrome

Confirm the Claude for Chrome browser extension is connected and responsive: get the tab context (creating a tab if needed), navigate to a harmless, always-available page, and confirm a screenshot or page read succeeds.

Report plainly: working, or not connected/responding (in which case tell the user to check the Claude for Chrome extension is installed and enabled, per that tool's own setup — don't guess further at the cause).

### 4. Smoke-test Splunk

Run one small, cheap, known-good Splunk search via the `splunk-search` skill's Chrome-based flow (see that skill for the mechanics — index pattern, `sid`-based result extraction) against a low-stakes environment such as `ninja`, scoped tightly (e.g. last 15 minutes, a small `head` limit) purely to confirm the query round-trip works end to end.

Report plainly: working (found N results, or zero results but no error — still a pass), or failed (and what the failure looked like — auth prompt, no results tab, timeout) so the user knows to check their Splunk session/VPN rather than assuming this workspace is misconfigured.

### 5. Summarize

Give one short, plain summary covering all four checks: identity, skill install status, Chrome, Splunk. No filler — state what passed and what didn't, and what (if anything) the user needs to do next.
