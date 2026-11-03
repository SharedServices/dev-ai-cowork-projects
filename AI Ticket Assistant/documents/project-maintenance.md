# Project Maintenance

Read this before making any change to this workspace's own structure, rules, or skills — creating or renaming a repo/skill/business-logic category/known-failure pattern, editing a `CLAUDE.md`, updating a skill, or adjusting a project-wide convention (including this document and root `CLAUDE.md` itself). Root `CLAUDE.md` is scoped to normal, day-to-day investigative use and intentionally does not carry this material.

---

## Annotations and history

**Keep `CLAUDE.md` and `SKILL.md` files ("production files") free of attribution annotations and dated historical narration.** State a rule or fact plainly — not as "(James said/confirmed/removed this on {date})" or similar parenthetical narration of who decided something and when. If a rule needs justification, give the reason in plain prose (a **Why:** line) rather than citing who said it or the incident that prompted it. This applies to every `CLAUDE.md` in this project, including new ones created from `templates/`, and to every `SKILL.md`.

This does **not** apply to a confirmed-as-of date kept for technical-confidence reasons (e.g. "confirmed 2026-07-07 in Data Explorer" on a StreamId shape) — that's a fact about how solid an assumption is, not an attribution. The rule is specifically about narrating who decided or changed something and when.

**Historical color belongs in that file's companion `README.md` instead of being deleted.** Every `CLAUDE.md` and skill folder has (or should have) a companion `README.md` — root `CLAUDE.md` ↔ root `README.md`, each repo's `CLAUDE.md` ↔ that repo's `README.md`, the skills folder ↔ `.claude/skills/README.md`. When something is renamed, removed, or replaced, put the plain current-state fact in the production file (if it still affects behavior) and the story — what it was, when it changed, why — in the companion README. Companion READMEs are never read during normal use (see root `CLAUDE.md`'s "Folder layout" section), so history parked there doesn't cost anything day to day, but stays discoverable when someone's asking "why is this named like that" or "what happened to X."

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

- **App memory** — Claude's own per-user memory store, kept by Claude Code outside the project folder. It is not part of the project and never reaches git.
- **`memories/`** — the project folder for memories local to one instance of the project. Git ignores everything in it except `.gitkeep` (see `.gitignore`), so nothing in it is committed, merged to origin, or present in a new instance created from GitHub. Format: one `.md` per memory plus a `MEMORY.md` index.
- **`references/`** — published, tracked lookup material (see below). Read-only in practice: changed only by re-publishing or re-mirroring.

`local/` is separate from all three: it holds per-user settings (currently `user.md`), is git-ignored, and is not a memory.

A memory that proves worth sharing is promoted by writing it into a tracked location (a `references/` file, a `business-logic/` category, a `known-failures/` pattern, a `CLAUDE.md`, or a skill); the `memories/` copy stays local.

## References folders

**A `references/` folder's content is publish-only — never hand-edit it in place.** Applies at every nesting level: the project's own top-level `references/`, a repo's `references/`, and a business-logic category's `references/`. A reference file either started as a promoted `memories/` draft (refresh it by re-publishing the updated draft, not by patching the reference directly) or mirrors an external source of truth (e.g. `Events.md` — refresh by re-pasting from that source). When a file is added or removed from a `references/` folder, update the corresponding pointer list in that folder's own parent `CLAUDE.md` — that list is a generated rollup, not independently maintained.

## Live skill capture

**Don't wait to be asked — applies to every skill.** Whenever a new fact is confirmed in conversation for any in-scope skill — a StreamId pattern, an ingress path, a database/container name, an event shape, a gotcha, or a corrected wrong assumption — fold it into that skill's files immediately, in the same turn — not at the end of the conversation, not only when the user explicitly requests it. Batch by "confirmed fact," not by message — don't interrupt an active investigation to edit the skill after every line, but don't let a session end with confirmed knowledge sitting only in chat history either. Default to just making the update; only pause to ask first if the change is ambiguous, large, or alters the skill's core behavior in a way the user would want to weigh in on.

**`cosmos-query`'s per-service depth lives close to the service it documents, not all in `SKILL.md`.** For the nine Squad Herbert services, that's each repo's own `repos/{repo}/references/cosmos_query.md` — not `.claude/skills/cosmos-query/services/`. For a non-Herbert service without a repo folder yet, use `.claude/skills/cosmos-query/services/{service}.md`, following the existing files' shape (database/container, StreamId format, confirmed aggregate types/gotchas, ready-to-run queries), and move it into a repo's own `references/` once that repo gets a folder. Only touch `cosmos-query/SKILL.md` itself for genuinely cross-service facts (universal envelope, blob-pointer pattern, StreamId conventions, auth/access mechanics) or to add a row to its routing tables when a new service file is created.

**Blob projection catalogs follow the same repo-scoped pattern, for blob downloads instead of Cosmos event downloads.** Each repo that stores projection blobs keeps a `repos/{repo}/references/blob_projections.md`: one entry per projection with the name people use for it (**Called**), the type name (**Projection**), the storage account type (standard, premium, or feeschedule), and the path template (container first, placeholders in braces, filled in lowercase). The `blob-projection-fetch` skill and root `CLAUDE.md`'s "Azure Blob Storage" section read these files; neither duplicates their entries. Only add an entry for a projection whose account and path have been confirmed, and never infer a path for one that has no entry. Because the file is in `references/`, the publish-only rule above applies to it. When a repo gains its first `blob_projections.md`, add it to that repo's `CLAUDE.md` "Where to look for more" list in the same turn.

If the user asks whether a session's Cosmos learnings have been fully captured, re-scan *that conversation* (cheap and reliable) rather than trying to reconstruct older sessions from transcript files — those are large, awkwardly escaped JSONL, and slow/brittle to search after the fact.

## CLAUDE.md-vs-skill duplication

**When a convention has both a root/repo `CLAUDE.md` mention and its own `SKILL.md`, the `SKILL.md` is the sole owner of mechanical detail — folder shapes, file templates, step sequences, trigger phrasing.** The `CLAUDE.md` side carries only a **Why** (the rationale for the convention existing at all — architectural context, not mechanics) and a **Full skill:** pointer describing at a glance what the skill covers. Never restate a folder-shape diagram, a file template, or a step list in both places.

**Why:** duplicated mechanical detail drifts. `CLAUDE.md`'s copy of the ticket-folder shape and `summary.md` template fell out of date against `.claude/skills/ticket-workflow/SKILL.md` (missing `code-analysis/`, missing the `Category` field) before this was caught — the skill was still correct, but a reader trusting the `CLAUDE.md` copy would have gotten a stale picture. A single owner per fact removes the drift risk entirely rather than relying on remembering to update both.

**How to apply:** when adding or updating a skill-backed convention, check whether `CLAUDE.md` already restates something the skill also documents. If so, trim `CLAUDE.md` to Why + pointer during that same edit — don't leave the duplicate for a later pass. This applies at every level the pattern occurs: root `CLAUDE.md` vs. a project-wide skill, or a repo's own `CLAUDE.md` vs. a repo-scoped skill.

## Creating a new skill

A project skill is a folder `.claude/skills/{name}/` with a `SKILL.md`. Claude Code loads it directly from the project, so there is no separate source and installed copy.

When the user asks for a brand-new skill, ask whether it belongs to this project or is personal. A project skill goes in `.claude/skills/{name}/`, gets a row and one-line summary in `.claude/skills/README.md`'s inventory table, and gets a pointer in root `CLAUDE.md` where one applies (Cosmos, Splunk and so on). A personal skill stays out of the project. Do not create a project skill and also save a copy of it to the Claude account or `~/.claude/skills/`, because the second copy loads alongside the project copy as a duplicate and can be older.

`.claude/skills/README.md`'s inventory table defines which skills belong to the project. Keep root `CLAUDE.md`'s per-surface skill pointers and that table in sync, since they are two views of the same scope. Third-party and personal-productivity skills are deliberately out of scope; see the exclusion list in that README.

To retire a skill: delete its folder from `.claude/skills/`, remove its row from the README inventory, remove its mentions from root `CLAUDE.md`, and add a release entry to `upgrade/code.md` listing the name so `upgrade project` removes duplicate copies from users' machines (see "Upgrade project"). Record the story in the README's "Retired skills".

## Updating skills

Edit the skill's files in `.claude/skills/{name}/` directly, either on request or through live skill capture. The change takes effect in the next session, and reaches other users when they pull.

Use the `skill-creator` skill only when a skill is being built or substantially revised, or when the user asks for evals or description tuning. A targeted fix based on something just confirmed needs no packaging step.

If an update needs users to do something on their machines (remove a duplicate copy, delete an account skill), add a release entry to `upgrade/code.md` and suggest a version bump (see "Upgrade project").

## Upgrade project

`upgrade project` is a procedure in root `CLAUDE.md` ("Project upgrade") that runs `upgrade/code.md`. It is deliberately not a skill: a skill saved to the account is a stale copy until it is re-saved, so users who pulled an update would still run the old procedure. Everything that changes between releases belongs in `upgrade/code.md`, which loads from the project folder.

- **One project version.** `upgrade/version.md` holds the project version. `local/user.md` records the version the user last upgraded to, and the user is behind when that is blank or older. A release with no new instructions only updates the recorded version.
- **Document shape.** `upgrade/code.md` has `## Release steps` (entries headed by version, oldest first) and `## Every-run steps`. The procedure in `CLAUDE.md` runs them and carries no logic of its own.
- **How a version is set.** The maintainer publishes releases from a GitHub folder one level above this project, which Claude cannot see. When a change needs target systems adjusted (anything in `upgrade/`, the shape of `local/user.md`, the skill inventory or a skill change that needs users to act, the `CLAUDE.md` procedure), suggest a version bump. Draft instructions as `### Unreleased — title` in `upgrade/code.md`; the procedure ignores `Unreleased` entries. When the maintainer gives the version, write it to `upgrade/version.md` and rename each `Unreleased` heading to it. If the maintainer announces a version with nothing unreleased, change only `upgrade/version.md`. Remind the maintainer to commit `upgrade/` so the version reaches users.
- **Version format.** `YYYY.M.D`, with `.N` for a second or later release the same day (`2026.10.7.2`); month and day are not zero-padded, and `.1` is never written. Compare the dot-separated parts as whole numbers (a missing last number counts as 1), never as plain text. The rule is in `upgrade/version.md`. Never reuse a version.
- **Write entries as idempotent checks.** An entry reports "nothing found" when there is nothing to do, so it is safe on a fresh install and on a repeat run. An entry that needs the user to act says what to do, leaves the recorded version unchanged until a later run finds it done, and says whether the run stops there. Use stop when the user's action changes how the rest of the run behaves (for example, deleting a skill that intercepts this procedure), so every user takes the same path: act, then run once.
- **Every-run steps** are for work needed on every run (environment checks, identity, smoke tests). One-time work is a release entry, not an every-run step.
- **Removing a skill from the inventory** follows "Creating a new skill" above, plus a release entry in `upgrade/code.md` listing the name to remove from `~/.claude/skills/`. If an `anthropic-skills:{name}` copy may exist in users' accounts, the entry reports it and tells the user to delete it in the Claude settings.
- **Changing the shape of `local/user.md`** (a new setting) is documented in step 1 of the every-run steps in `upgrade/code.md`, which owns that shape.
- **Pruning.** Entries can be deleted once every user is past them. A blank version then skips the deleted entries, which is correct only if the removed checks are no longer needed.
- **Test.** After changing `upgrade/code.md` or the `CLAUDE.md` procedure, run `upgrade project` in a fresh Claude Code session. Check that it runs only the entries newer than the recorded version, and records the version only when every step finished and none is waiting on the user.

---

## Workspace evolution

This workspace evolves as new customer issues surface new patterns. When a query, path, or search proves useful twice, add it to the relevant skill. Don't speculate about workflows that haven't happened yet.
