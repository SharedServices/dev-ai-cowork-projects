# Support Investigation Workspace — history and context

Companion to the root `CLAUDE.md`. This file is maintenance-only — never read or relied on during normal investigative use (see `CLAUDE.md`'s "Folder layout" section). It holds plain description and historical color that would otherwise clutter `CLAUDE.md`: what changed, when, and why, kept separate from the plainly-stated current rules and facts `CLAUDE.md` depends on. See `documents/project-maintenance.md` for the policy this follows.

## Retired skills

`business-logic-expert`, `function-apis`, `detect-blocked-evaluations`, and `known-failure-patterns` were all removed once the per-repo `CLAUDE.md`/`business-logic/`/`known-failures/` architecture matured — once a repo is activated, its own `CLAUDE.md` manifest routes to business-logic and known-failure content directly, so a dedicated routing skill added no value.

- `business-logic-expert` and `known-failure-patterns`: former content lives on at `repos/snowdrop-remittance-processing-be/business-logic/Rules/` and each repo's own `known-failures/CLAUDE.md`.
- `function-apis`: held env/key tables, an API reference, an auto-purge gotcha, and a bulk-scan technique for Remittance Processing Orchestration. Migrated once to `repos/snowdrop-remittance-processing-be/references/function-apis.md`, but that file was itself deleted in a secrets audit — it carried live function keys with no vault replacement. No function app has a documented home in this workspace since, and no function keys should be stored anywhere in this project until a vault-backed alternative exists.
- `detect-blocked-evaluations`: removed as no longer needed; no replacement content exists.

`office-hours` was removed as a tracked skill in this workspace (personal-productivity, not support-investigation) — its folder no longer exists under `skills/`.

## Project initiation

The `## Current user` section in root `CLAUDE.md` used to carry an automatic trigger — "on first use of a project instance, if Name or Squad are blank, ask" — directly inline. In practice that implicit trigger proved unreliable: on a fresh copy of this project it didn't fire until the user explicitly asked for it. Root `CLAUDE.md` now just points to `local/user.md` — a git-ignored file where the user's Squad (and, as reference, the Claude account's name and email) is kept, so personal values never show up as edits to a tracked file — and first-time setup (recording Squad and Source path, publishing the skills as cards, smoke-testing Claude for Chrome and Splunk access) moved to an explicit, on-demand skill — `skills/initiate-project/SKILL.md`, triggered by "initiate project" — rather than an automatic trigger nothing was reliably invoking. This also folded in other first-use checks (skill installation status, Chrome/Splunk connectivity) that had no home before.

## Documentation structure

`CLAUDE.md` files (root, per-repo, per-category) and `SKILL.md` files are the machine-facing "production" files Claude depends on during normal use — kept plainly stated, free of attribution annotations and historical narration. Companion `README.md` files (this one, each repo's, `skills/README.md`) hold the human-facing description plus whatever historical color is worth keeping — who decided what, why something was renamed or removed, what was tried and abandoned.

This split (root `CLAUDE.md` for day-to-day use, `documents/project-maintenance.md` for how to change the workspace itself, companion `README.md`s for history) replaced an earlier approach that just deleted attribution annotations outright rather than relocating them.
