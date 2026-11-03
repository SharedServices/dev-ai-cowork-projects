# Support Investigation Workspace — context

Companion to the root `CLAUDE.md`. This file is maintenance-only — never read or relied on during normal investigative use (see `CLAUDE.md`'s "Folder layout" section). It holds plain description that would otherwise clutter `CLAUDE.md`. See `documents/project-maintenance.md` for the policy this follows.

## Setup

The required setup is the same for every user:

1. Clone the repository to a folder (for example `dev-ai-cowork-projects`). Use a clone, not a zip download, so `git pull` brings updates.
2. Open the Code tab of the Claude app.
3. Create an environment named "AI Ticket Assistant - Knowledge":
   - Primary folder: the `AI Ticket Assistant` folder in the clone.
   - Additional folder: the folder that holds the source repositories, one subfolder per repository.
   - Environment variable: `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`.
4. Start a session in that environment and say `upgrade project`. It checks the setup (the primary folder is an AI Ticket Assistant folder, the additional folder holds repositories, the variable is set), asks for Squad and Pod, and records them with the source path in `local/user.md`.

Nothing needs to be added to `settings.local.json`. Skills and the project `CLAUDE.md` load from the folders attached to the environment.

Optional: create further environments with a source folder (all repositories, or one repository) as primary and the AI Ticket Assistant folder attached as an additional folder. `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` is required for these, because the project `CLAUDE.md` loads only through it. Project paths are resolved from the project root (root `CLAUDE.md`, "Folder locations"), so they work in every environment.

## Project upgrade

`upgrade project` is a procedure in root `CLAUDE.md` that runs `upgrade/code.md` from the project folder. The project has one version, kept in `upgrade/version.md`. The version last upgraded to is recorded in `local/user.md`, and only the release steps newer than that are run. One-time cleanups, such as removing the personal copies in `~/.claude/skills/`, are dated release steps in `upgrade/code.md`.

`local/user.md` is a git-ignored file where the user's Squad, Pod and Source path (and, as reference, the Claude account's name and email) are kept, so personal values never show up as edits to a tracked file.

## Documentation structure

`CLAUDE.md` files (root, per-repo, per-category) and `SKILL.md` files are the machine-facing files Claude depends on during normal use — kept plainly stated. Companion `README.md` files (this one, each repo's, `.claude/skills/README.md`) hold the human-facing description.
