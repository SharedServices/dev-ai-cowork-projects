---
name: activate-repo
description: "Set the current investigation scope to one or more repo folders under repos/ in the Support project. Use when the user says \"activate repo {name}\", \"activate repo {name} and {name}\" (multiple named repos), or \"activate repos for all squad {squad name} repos\" (squad-level bulk activation). This is the explicit, deterministic counterpart to automatic repo-inference (e.g. ticket-workflow guessing a repo from ticket context) — trigger it directly when starting ad hoc work, or as a manual override if the automatic path picked the wrong repo or ignored one that should apply. Resolves the name against root CLAUDE.md's ## Repos index table (folder name or nickname column, case/spacing/hyphen-insensitive), asking rather than guessing on no match or multiple matches, then reads only that repo's own CLAUDE.md (not references/ or business-logic/ yet)."
---

# Activate Repo

Sets the current investigation scope to one or more repo folders under `repos/` in the Support project — coarse orientation only, no full content load. This is the explicit, deterministic counterpart to automatic repo-inference (e.g. `ticket-workflow` guessing a repo from ticket context): use it directly when starting ad hoc work, or as a manual override if the automatic path seems to have picked the wrong repo, or ignored a repo or business rule that should apply.

## Resolution

Match the requested name(s) against root `CLAUDE.md`'s `## Repos` index table — both the **folder name** and the **nickname** column count, case/spacing/hyphen-insensitive (e.g. `snowdrop-remittance-processing-be`, `remittance processing be`, and `Remittance Processing` should all resolve to the same row). **Validated 2026-09-18** against two real repos — see `documents/repo-activation-prototype-plan.md`'s closing section for the test record. Three request shapes are all supported:

- **Single repo:** `activate repo {name}` — resolve to one row.
- **Multiple named repos:** `activate repo {name} and {name}` (and so on) — resolve each independently; treat unresolved names in the list the same as a single unresolved name (ask, don't drop silently).
- **Squad-level bulk activation:** `activate repos for all squad {squad name} repos` — resolve every row in the index table whose Squad column matches, and activate all of them.

**If a name matches more than one row, or matches nothing, ask — don't guess.** For no match, list the folder names/nicknames that exist in the index table. For multiple matches, list the candidates and ask which was meant. This is the same resolution rule root `CLAUDE.md`'s `## Repos` section states generally; this skill is just its explicit, on-demand trigger.

**No further fuzzy/typo-tolerant matching or explicit alias table planned right now** — folder-name-or-nickname comprehension plus ask-when-ambiguous has covered every case tested so far. A user who consistently works with the same one or two repos can shortcut this entirely by stating that preference in their own `CLAUDE.md`, rather than needing this skill to guess it. Revisit only if repo count or name collisions grow enough that this stops being sufficient — don't build ahead of that need.

Don't offer to scaffold a new repo folder if nothing matches — creating repo content is out of scope for this skill; it only navigates what already exists.

## Steps

1. Resolve the requested name(s) to one or more folders under `repos/` per above.
2. For each resolved repo, read its `CLAUDE.md` — this one file only. Don't read anything under its `references/` or `business-logic/` yet; that happens only when a specific question actually needs one of those files. **Path differs by platform, added 2026-09-21 — get this wrong and the read silently fails or hits the wrong file:**
   - **Claude Code started in this project:** the working directory is the project root, so use the relative path `repos/{repo-name}/CLAUDE.md`.
   - **Claude Code started in another repo, with this project attached as an additional directory:** use the full absolute path of the attached folder, read from the session's environment info (the additional working directories line) — `{attached-project-path}\repos\{repo-name}\CLAUDE.md` — because the relative path resolves against the other repo. If none of the attached folders is this project, ask once rather than guessing a username or folder. Compute the real path each time; never leave the braces in a path.
   - **Cowork:** keep using the relative path, `repos/{repo-name}/CLAUDE.md`. Cowork's working directory is this connected Support project folder, so the relative path already resolves; the Windows absolute path doesn't map onto the sandbox's own path scheme and shouldn't be used here.
3. State plainly which repo(s) are now active, and hold that as the working scope for the rest of the conversation — ordinary conversational context, no special persistence mechanism needed within a single session.
4. If any activated repo's `CLAUDE.md` doesn't clearly say what's available and where to find it (rather than just naming files), say so — this skill is also how we're testing whether that file is doing its job as a manifest, not just a listing.

## Search behavior once a repo is activated

The `repos/{repo}/` tree (`CLAUDE.md`, `references/`, `business-logic/`, `known-failures/`) is a curated knowledge surface, not the repo's actual source code. It's built so a question resolves by following a chain of pointers — this repo's `CLAUDE.md` → e.g. `business-logic/CLAUDE.md` → a specific reference file — not by searching. When answering a question in scope of an activated repo, follow that pointer chain rather than running a Grep/Glob sweep across the knowledge folder for a term, even when a keyword search would probably find it. A sweep can still land on the right file, but it defeats the reason these files are pointer-based, and it papers over a gap in the manifest that should instead be flagged and fixed.

This is about which tree is being searched, not a blanket restriction on search tools. If the repo's actual source code is reachable (the attached source folder in Cowork, or the Source path in `local/user.md` in Claude Code — distinct from this knowledge folder), Grep/Glob within that repo's subfolder is the normal, expected way to work — this note doesn't apply there. It only governs navigating the Support project's own `repos/{repo}/` folder.

## Note on platforms

This `SKILL.md` is the sole source for this behavior on both platforms. It is published to the Claude account as a card by `initiate project` (run in Cowork) and loads in both Cowork and Claude Code from there. Edit only `skills/activate-repo/`, then re-run `initiate project` and save the card. See the path-handling note in Steps above for the per-platform paths.
