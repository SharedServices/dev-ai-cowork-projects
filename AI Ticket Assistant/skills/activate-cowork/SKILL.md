---
name: activate-cowork
description: >
  Activate a Claude app Cowork project's shared knowledge folder (normally a folder directly under
  C:\Users\JamesMoorhouse\Claude\Projects\, e.g. "Support" or "Consolidated" — but also resolves a
  project that instead lives one level down inside a git-repo-backed container folder there, e.g.
  C:\Users\JamesMoorhouse\Claude\Projects\dev-ai-cowork-projects\AI Ticket Assistant, so the project
  can be worked on as the actual git checkout instead of a separate copy) from Claude Code, and
  auto-activate any repo folder inside it that matches the repo Claude Code is currently working in.
  Use when James says "activate cowork {name}", "activate cowork project {name}", or similar (e.g.
  "activate cowork Support"). Reads that project's root CLAUDE.md, then — if it defines a "## Repos"
  index table the way the Support workspace does — checks whether the current Claude Code repo (its
  folder name) matches a row (folder name or nickname, case/spacing/hyphen-insensitive) and, if so,
  reads that repo's own CLAUDE.md too, mirroring the Cowork-side activate-repo skill's resolution
  logic. This is the Claude-Code-side counterpart to that skill: a Claude Code session has no built-in
  awareness that a Cowork project exists or that the repo it's sitting in has curated content there.
---

# Activate Cowork

Loads a Cowork project's shared knowledge folder into the current Claude Code session, and — where
the project tracks repos the way the Support workspace does — automatically activates the one
matching the repo Claude Code is currently in. Coarse orientation only, same spirit as `activate-repo`:
load the manifest-level files, not everything underneath.

## Parameter

`{cowork-folder}` — the name of the Cowork project (e.g. `Support`, `Consolidated`, `AI Ticket
Assistant`), not necessarily a path. It usually resolves to a folder directly under
`C:\Users\JamesMoorhouse\Claude\Projects\`, but see step 1 for how it also resolves when the project
instead lives one level down inside a git-repo checkout there. This is always a Windows path once
resolved, since this skill only runs in Claude Code.

## Steps

1. **Resolve the cowork folder's path. Do these substeps in this exact order — do not skip (a), and
   do not substitute your own search strategy for (b)/(c).**

   a. **Check memory first, before running any search.** Read `MEMORY.md` in your memory directory
      and look for an entry named `cowork-project-location-{slug}` where `{slug}` is `{cowork-folder}`
      lowercased with spaces replaced by hyphens (e.g. `AI Ticket Assistant` →
      `cowork-project-location-ai-ticket-assistant`). If that memory file exists, read it to get the
      stored `{resolved-path}`, then run `Test-Path "{resolved-path}\CLAUDE.md"`.
      - If `True`: use `{resolved-path}` and skip straight to step 2. **Do not re-run (b)/(c).**
      - If `False` or no such memory exists: continue to (b). If a stale memory was found, delete it
        (both the `.md` file and its `MEMORY.md` line) before continuing, since you're about to
        re-resolve and re-record it.

   b. **Level 0 search.** Run:
      `Get-ChildItem -Path "C:\Users\JamesMoorhouse\Claude\Projects" -Directory | Select-Object -ExpandProperty Name`
      and match `{cowork-folder}` against the returned names case-insensitively.

   c. **Level 1 search — run this even if (b) found nothing, and run it exactly as written; don't
      improvise a different search.** For each name returned by the same `Get-ChildItem` call above,
      test `Test-Path "C:\Users\JamesMoorhouse\Claude\Projects\{name}\CLAUDE.md"`. For every `{name}`
      where that's `False` (not a project itself — likely a repo checkout holding projects as
      subfolders), run:
      `Get-ChildItem -Path "C:\Users\JamesMoorhouse\Claude\Projects\{name}" -Directory | Select-Object -ExpandProperty Name`
      and match `{cowork-folder}` against those, keeping only ones where
      `Test-Path "C:\Users\JamesMoorhouse\Claude\Projects\{name}\{match}\CLAUDE.md"` is `True`.
      This is a bounded, cheap scan — one level, only under `Claude\Projects\` — never a wider
      filesystem search, and never a guess based on the current working directory's name.

   d. **Zero matches** across (b) and (c): ask the user for the path directly (free text) — don't
      guess. Once given, verify `Test-Path "{path}\CLAUDE.md"` is `True` before proceeding, then go to
      (g) to record it.

   e. **Exactly one match** across (b) and (c): confirm it with the user before proceeding — e.g.
      "Found '{cowork-folder}' at `{path}` — use this, and remember it for next time?" On yes, go to
      (g) to record it before continuing to step 2. On no, ask for the correct path and go to (d)'s
      verification, then (g).

   f. **Multiple matches:** list the candidates and ask which one was meant — don't pick one. Then
      go to (g) to record the chosen one.

   g. **Record the resolved path immediately — this is not optional and not deferred to later in the
      conversation.** Do it now, as two concrete tool calls, before moving to step 2:
      1. **Write** a memory file at `{your memory directory}\cowork-project-location-{slug}.md`:
         ```markdown
         ---
         name: cowork-project-location-{slug}
         description: Local filesystem path where the "{cowork-folder}" Cowork project lives on this machine.
         metadata:
           type: reference
         ---

         The Cowork project "{cowork-folder}" is located at `{resolved-path}` on this machine.
         Resolved via the `activate-cowork` skill's search (not a `Claude\Projects\{cowork-folder}`
         direct match — recorded here so future activations skip the search).
         ```
      2. **Edit** `MEMORY.md` in your memory directory to append one line:
         `- [Cowork project: {cowork-folder}](cowork-project-location-{slug}.md) — local path lookup for activate-cowork`
      This mapping is per-machine, not project content: it goes in your personal Claude Code memory
      store, never into this skill file or anything committed to the `dev-ai-cowork-projects` repo.
      Different people clone the repo to different local paths, so a path baked into the shared
      `SKILL.md` would be wrong for everyone but the person who wrote it.

2. **Read that project's root `CLAUDE.md`** (at the path resolved in step 1) — this file only, in
   full. Don't read its `memories/`,
   `references/`, or `skills/` yet; those load only when a specific question needs one of them.

3. **Determine the current repo.** Use the current Claude Code working directory's repo root folder
   name (e.g. `git rev-parse --show-toplevel`, then take the last path segment). This is the name to
   match against the cowork project's repo index, if it has one.

4. **Look for a `## Repos` index table in the CLAUDE.md just read** (Support's is the reference shape:
   columns for repo folder, squad, nickname, scope). If the project's `CLAUDE.md` has no such table,
   stop here — report the cowork project as active and that no repo-level auto-activation applies to
   it.

5. **If a `## Repos` table exists, match the current repo's folder name against it** — both the folder
   name and nickname columns count, case/spacing/hyphen-insensitive (identical rule to `activate-repo`,
   e.g. `snowdrop-remittance-processing-be` and `Remittance Processing` resolve to the same row).
   - **One match:** auto-activate it. Read `{resolved-project-path}\repos\{repo-name}\CLAUDE.md` (full
     absolute path, built from the project path resolved in step 1 — not assumed to be
     `Claude\Projects\{cowork-folder}\...`, since step 1(c) may have resolved the project one level
     deeper. Claude Code sessions aren't rooted in the Cowork project folder, so a relative
     `repos/{repo-name}/CLAUDE.md` won't resolve either way). Don't read that repo's `references/`,
     or `business-logic/` yet.
   - **No match:** the current repo isn't in that project's index. State the cowork project is active
     and that no repo was auto-activated — don't guess or fall back to a similarly-named row.
   - **Ambiguous match:** ask, listing the candidates, rather than picking one.

6. **State plainly what's now active** — the cowork project, and (if matched) the repo — and hold that
   as working scope for the rest of the conversation. Ordinary conversational context; no special
   persistence mechanism needed within a session.

## Notes

- **Claude-Code-only.** This mirrors `activate-repo`'s role but for the opposite platform: `activate-repo`
  is the Cowork-side skill (relative paths, triggered by phrases inside a Cowork session) and doesn't
  know about a Claude Code working directory at all. This skill exists because Claude Code has no
  equivalent — it needs the absolute-path handling and the "what repo am I even in" step that Cowork
  doesn't.
- **Don't assume every cowork project has a `repos/` layout.** Only Support is confirmed to have one
  as of the time this skill was written. Other projects (e.g. `Consolidated`) may just have a flat
  `CLAUDE.md` with no repo index — step 4 handles that gracefully rather than erroring.
- If the matched repo's `CLAUDE.md` doesn't clearly say what's available there and where to find it,
  say so — same manifest-quality check `activate-repo` makes.
- **The level-1 search (step 1c) is a one-level, `Claude\Projects\`-scoped heuristic, not a general
  filesystem search.** It exists specifically for the "git repo checked out under `Claude\Projects\`,
  with the cowork project as a subfolder of that checkout" layout — e.g. so a project can be worked on
  as the live git working tree (edit, commit, push) instead of a separate synced-in copy. It does not
  search deeper than one level, and does not search outside `Claude\Projects\` — a checkout elsewhere
  on disk (e.g. under a `C:\unlimited\repositories\...` convention) still needs the user to supply the
  path once via step 1(d), after which memory makes it a one-time cost.
