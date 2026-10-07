# Project Maintenance

Read this before making any change to this workspace's own structure, rules, or skills — creating or renaming a repo/skill/business-logic category/known-failure pattern, editing a `CLAUDE.md`, updating a skill, or adjusting a project-wide convention (including this document and root `CLAUDE.md` itself). Root `CLAUDE.md` is scoped to normal, day-to-day investigative use and intentionally does not carry this material — that split is itself a maintenance decision, recorded in `workspace-plan.md`.

---

## Annotations and history

**Keep `CLAUDE.md` and `SKILL.md` files ("production files") free of attribution annotations and dated historical narration.** State a rule or fact plainly — not as "(James said/confirmed/removed this on {date})" or similar parenthetical narration of who decided something and when. If a rule needs justification, give the reason in plain prose (a **Why:** line) rather than citing who said it or the incident that prompted it. This applies to every `CLAUDE.md` in this project, including new ones created from `templates/`, and to every `SKILL.md`.

This does **not** apply to a confirmed-as-of date kept for technical-confidence reasons (e.g. "confirmed 2026-07-07 in Data Explorer" on a StreamId shape) — that's a fact about how solid an assumption is, not an attribution. The rule is specifically about narrating who decided or changed something and when.

**Historical color belongs in that file's companion `README.md` instead of being deleted.** Every `CLAUDE.md` and skill folder has (or should have) a companion `README.md` — root `CLAUDE.md` ↔ root `README.md`, each repo's `CLAUDE.md` ↔ that repo's `README.md`, the skills folder ↔ `skills/README.md`. When something is renamed, removed, or replaced, put the plain current-state fact in the production file (if it still affects behavior) and the story — what it was, when it changed, why — in the companion README. Companion READMEs are never read during normal use (see root `CLAUDE.md`'s "Folder layout" section), so history parked there doesn't cost anything day to day, but stays discoverable when someone's asking "why is this named like that" or "what happened to X."

This reverses an earlier, stricter pass in this workspace that deleted attribution annotations outright rather than relocating them — that was too blunt. The goal was always to keep production files lean, not to erase history.

---

## Repo folder architecture

- New repos are scaffolded from `templates/repo-template/`, not by copying an existing repo folder.
- Each repo folder follows a fixed shape: `CLAUDE.md` (manifest), `README.md` (plain description + history, not load-bearing), `references/`, `business-logic/`, `known-failures/`.
- `business-logic/` and `known-failures/` are folder-per-category, never flat files — every topic (business-logic) or pattern (known-failures) gets its own subfolder: `{category}/CLAUDE.md` (+ optional `README.md`, `references/`) for business-logic, `{pattern-name}/CLAUDE.md` for known-failures. **This applies identically at the project's top level (cross-repo or not-yet-homed content) and inside each repo (repo-specific content) — the top-level folders are not a special case.** Scaffold new categories/patterns from `templates/business-logic-category-template/` and `templates/known-failure-pattern-template/`. Each parent `CLAUDE.md` (top-level or per-repo) carries a generated index — one bullet per subfolder, pulled from that subfolder's own `CLAUDE.md`.
- A known-failure entry may duplicate a business-logic fact inline rather than citing it — a known failure records a specific incident, not the canonical fact, so there's no conflict in restating it.
- Whenever a repo folder is added or a repo's scope changes, update root `CLAUDE.md`'s `## Repos` table in the same turn — that table is a generated rollup, not independently maintained.

## Memories and references

Three terms are kept distinct throughout this project:

- **App memory** — Claude's own per-user memory store, kept by the Claude app (Cowork) or Claude Code outside the project folder. It is not part of the project and never reaches git.
- **`memories/`** — the project folder for memories local to one instance of the project. Git ignores everything in it except `.gitkeep` (see `.gitignore`), so nothing in it is committed, merged to origin, or present in a new instance created from GitHub. Format: one `.md` per memory plus a `MEMORY.md` index.
- **`references/`** — published, tracked lookup material (see below). Read-only in practice: changed only by re-publishing or re-mirroring.

`local/` is separate from all three: it holds per-user settings (currently `user.md`), is git-ignored, and is not a memory.

A memory that proves worth sharing is promoted by writing it into a tracked location (a `references/` file, a `business-logic/` category, a `known-failures/` pattern, a `CLAUDE.md`, or a skill); the `memories/` copy stays local.

## References folders

**A `references/` folder's content is publish-only — never hand-edit it in place.** Applies at every nesting level: the project's own top-level `references/`, a repo's `references/`, and a business-logic category's `references/`. A reference file either started as a promoted `memories/` draft (refresh it by re-publishing the updated draft, not by patching the reference directly) or mirrors an external source of truth (e.g. `Events.md` — refresh by re-pasting from that source). When a file is added or removed from a `references/` folder, update the corresponding pointer list in that folder's own parent `CLAUDE.md` — that list is a generated rollup, not independently maintained.

## Live skill capture

**Don't wait to be asked — applies to every skill.** Whenever a new fact is confirmed in conversation for any in-scope skill — a StreamId pattern, an ingress path, a database/container name, an event shape, a gotcha, or a corrected wrong assumption — fold it into that skill's files immediately, in the same turn — not at the end of the conversation, not only when the user explicitly requests it. Batch by "confirmed fact," not by message — don't interrupt an active investigation to edit the skill after every line, but don't let a session end with confirmed knowledge sitting only in chat history either. Default to just making the update; only pause to ask first if the change is ambiguous, large, or alters the skill's core behavior in a way the user would want to weigh in on.

**`cosmos-query`'s per-service depth lives close to the service it documents, not all in `SKILL.md`.** For the nine Squad Herbert services, that's each repo's own `repos/{repo}/references/cosmos_query.md` — not `skills/cosmos-query/services/`. For a non-Herbert service without a repo folder yet, use `skills/cosmos-query/services/{service}.md`, following the existing files' shape (database/container, StreamId format, confirmed aggregate types/gotchas, ready-to-run queries), and move it into a repo's own `references/` once that repo gets a folder. Only touch `cosmos-query/SKILL.md` itself for genuinely cross-service facts (universal envelope, blob-pointer pattern, StreamId conventions, auth/access mechanics) or to add a row to its routing tables when a new service file is created.

**Blob projection catalogs follow the same repo-scoped pattern, for blob downloads instead of Cosmos event downloads.** Each repo that stores projection blobs keeps a `repos/{repo}/references/blob_projections.md`: one entry per projection with the name people use for it (**Called**), the type name (**Projection**), the storage account type (standard, premium, or feeschedule), and the path template (container first, placeholders in braces, filled in lowercase). The `blob-projection-fetch` skill and root `CLAUDE.md`'s "Azure Blob Storage" section read these files; neither duplicates their entries. Only add an entry for a projection whose account and path have been confirmed, and never infer a path for one that has no entry. Because the file is in `references/`, the publish-only rule above applies to it. When a repo gains its first `blob_projections.md`, add it to that repo's `CLAUDE.md` "Where to look for more" list in the same turn.

If the user asks whether a session's Cosmos learnings have been fully captured, re-scan *that conversation* (cheap and reliable) rather than trying to reconstruct older sessions from transcript files — those are large, awkwardly escaped JSONL, and slow/brittle to search after the fact.

## CLAUDE.md-vs-skill duplication

**When a convention has both a root/repo `CLAUDE.md` mention and its own `SKILL.md`, the `SKILL.md` is the sole owner of mechanical detail — folder shapes, file templates, step sequences, trigger phrasing.** The `CLAUDE.md` side carries only a **Why** (the rationale for the convention existing at all — architectural context, not mechanics) and a **Full skill:** pointer describing at a glance what the skill covers. Never restate a folder-shape diagram, a file template, or a step list in both places.

**Why:** duplicated mechanical detail drifts. `CLAUDE.md`'s copy of the ticket-folder shape and `summary.md` template fell out of date against `skills/ticket-workflow/SKILL.md` (missing `code-analysis/`, missing the `Category` field) before this was caught — the skill was still correct, but a reader trusting the `CLAUDE.md` copy would have gotten a stale picture. A single owner per fact removes the drift risk entirely rather than relying on remembering to update both.

**How to apply:** when adding or updating a skill-backed convention, check whether `CLAUDE.md` already restates something the skill also documents. If so, trim `CLAUDE.md` to Why + pointer during that same edit — don't leave the duplicate for a later pass. This applies at every level the pattern occurs: root `CLAUDE.md` vs. a project-wide skill, or a repo's own `CLAUDE.md` vs. a repo-scoped skill.

## Creating a new skill

**Whenever the user asks to create a brand-new skill (from scratch, in any session — Cowork or Claude Code), ask them whether it should be added to the tracked sync scope — a source copy in this project's `skills/` folder plus a row in `skills/README.md`'s inventory table — before finishing the task.** Don't assume either way, and don't scan the account's full installed-skill list to guess at this — the user likely has plenty of skills installed that have nothing to do with this workspace, and `skills/README.md`'s scope rule already says a skill is only "in scope" once the user confirms it belongs. This prompt is the moment that confirmation should happen, because it's the one point where the answer is cheap to get and the cost of skipping it is high: a skill built and saved without this step has no project-local source, so it never gets the "live skill capture" treatment above, and drifts silently until noticed by accident.

If the user says yes: create the source folder here, add the row + one-line summary to `skills/README.md`, and note in the row how it got there (e.g. "authored fresh" vs. "backfilled from installed copy").

`skills/README.md`'s inventory table is the definition of which skills are in scope for syncing between the Claude app and Claude Code. Keep root `CLAUDE.md`'s per-surface skill pointers (Cosmos, Splunk, etc.) and that table in sync — they are two views of the same scope, and drift between them is exactly the failure mode this section exists to prevent. Third-party/personal-productivity skills installed in the Claude app are deliberately out of scope — see `skills/README.md`'s own exclusion list.

To take a skill out of scope entirely: delete its folder from `skills/`, remove its row from `skills/README.md`, and remove its mentions from root `CLAUDE.md`. `skills/README.md` is a companion README, so the retired skill's story (why it was removed, where its content went) can stay there rather than being deleted outright.

## Updating skills

**Any time a skill needs to be updated — whether the user explicitly asks for it, or it's the "live skill capture" pattern above kicking in automatically — always go through the `skill-creator` flow, never edit the installed skill in place.** Installed skills (anything under the Cowork skills cache, i.e. everything referenced as `.claude/skills/...` in this file) are read-only in a Cowork session; editing them directly either fails or silently doesn't persist. The working path is:

1. Invoke the `skill-creator` skill.
2. Copy the target skill folder to a writable location (e.g. the outputs/scratch directory), and `chmod -R u+w` it if file tool edits hit permission errors on the copy.
3. Edit the copy's `SKILL.md` (or bundled scripts/references) with the confirmed change.
4. Package it: `python3 -m scripts.package_skill <path-to-skill-folder>` — run this with `skill-creator`'s own `scripts/` directory as the working directory (copy `skill-creator` itself to a writable location too if `-m scripts.package_skill` fails with a read-only filesystem error trying to write the `.skill` output next to a read-only source).
5. Present the resulting `.skill` file with `present_files` — this renders as a card with a **Save skill** button in chat. That button is what actually installs the update into the user's profile; nothing Claude does in the sandbox persists it on its own.

Skip the full skill-creator eval/test-case loop (draft → test prompts → benchmark viewer) for small, well-understood fixes — that machinery is for building or substantially revising a skill from scratch. A targeted edit based on something just confirmed in conversation just needs steps 1-5 above ("just vibe with me" mode, per the skill-creator instructions). Only reach for the full eval loop if the user asks for it or the change is large/risky enough to want a benchmarked comparison.

This supersedes just writing the fact to `memories/` or a `CLAUDE.md` file and hoping it gets manually copied into the skill later — the `.skill` card + Save button is the actual mechanism that updates the installed skill, and it should be produced in the same turn the update is warranted, not deferred.

## Upgrade project

`upgrade project` is a procedure in root `CLAUDE.md` ("Project upgrade") that runs `upgrade/cowork.md` or `upgrade/code.md`. It is deliberately not a skill: a skill saved to the account is a stale copy until its card is re-saved, so users who pulled an update would still run the old procedure. Everything that changes between releases belongs in the two documents, which load from the project folder.

- **One project version, recorded per platform.** `upgrade/version.md` holds the project version. Each platform records the version it last upgraded to in `local/user.md`, and is behind when that is blank or older. The documents carry no version of their own beyond their entry headings. Whether the other platform is behind never depends on whether it has new instructions; a platform with none just updates its recorded version.
- **The two documents have the same shape.** `## Release steps` (entries headed by version, oldest first) and `## Every-run steps`. The procedure in `CLAUDE.md` is identical for both platforms; any difference between platforms lives in the documents. Do not add platform-specific logic to `CLAUDE.md`.
- **How a version is set.** The maintainer publishes releases from a GitHub folder one level above this project, which Claude cannot see. When a change needs target systems adjusted (anything in `upgrade/`, the shape of `local/user.md`, the skill inventory or a skill that needs a new card, the `CLAUDE.md` procedure), suggest a version bump. Draft instructions as `### Unreleased — title` in the document of each platform affected; the procedure ignores `Unreleased` entries. When the maintainer gives the version, write it to `upgrade/version.md` and rename each `Unreleased` heading to it. If the maintainer announces a version with nothing unreleased, change only `upgrade/version.md`. Remind the maintainer to commit `upgrade/` so the version reaches users.
- **Version format.** `YYYY.M.D`, with `.N` for a second or later release the same day (`2026.10.7.2`); month and day are not zero-padded, and `.1` is never written. Compare the dot-separated parts as whole numbers (a missing last number counts as 1), never as plain text. The rule is in `upgrade/version.md`. Never reuse a version.
- **Write entries as idempotent checks.** An entry reports "nothing found" when there is nothing to do, so it is safe on a fresh install and on a repeat run. An entry that needs the user to act says what to do, leaves the platform's recorded version unchanged until a later run finds it done, and says whether the run stops there. Use stop when the user's action changes how the rest of the run behaves (for example, deleting a skill that intercepts this procedure), so every user takes the same path: act, then run once.
- **Every-run steps** are for work needed on every run (identity, publishing skills, smoke tests). One-time work is a release entry, not an every-run step.
- **Removing a skill from the inventory** follows "Creating a new skill" above, plus a release entry in `upgrade/code.md` listing the name to remove from `~/.claude/skills/` and, if the account copy should go, an entry in `upgrade/cowork.md` telling the user to delete it. Record the story in `skills/README.md`'s "Retired skills".
- **Changing the shape of `local/user.md`** (a new setting) is documented in `upgrade/cowork.md` step 1, which owns that shape. Each platform writes only its own upgrade version.
- **Pruning.** Entries can be deleted once every user is past them. A blank version then skips the deleted entries, which is correct only if the removed checks are no longer needed.
- **Test.** After changing either document or the `CLAUDE.md` procedure, run `upgrade project` in a fresh Cowork session and a fresh Claude Code session. Check that each runs only the entries newer than its recorded version, records only its own version, and names the other platform when that version is behind.

---

## Workspace evolution

This workspace evolves as new customer issues surface new patterns. When a query, path, or search proves useful twice, add it to the relevant skill. Don't speculate about workflows that haven't happened yet. See `workspace-plan.md` for the current status of decided-but-not-built and open items.
