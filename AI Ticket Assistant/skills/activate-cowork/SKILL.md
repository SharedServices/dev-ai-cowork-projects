---
name: activate-cowork
description: "Claude Code only. Activate a Cowork project in the current Claude Code session by reading that project's CLAUDE.md. Use when the user says \"activate cowork {name}\", \"launch cowork {name}\", \"reference cowork {name}\", or \"attach cowork {name}\", or the same verbs with no name (\"activate cowork\") to re-activate the last Cowork project that was activated. The word \"cowork\" must be in the request. A Cowork project is a folder with a CLAUDE.md that is directly inside the user's Cowork projects folder, or one level below it. The Cowork projects folder is never guessed: if it is not in the user's global CLAUDE.md, ask for it and store the answer there. Does not apply to repos (use activate-repo for \"activate repo {name}\") and does not run in Cowork."
---

# Activate Cowork

Reads the `CLAUDE.md` of a Cowork project into the current Claude Code session, so the session works with that project's rules without being started inside it.

## Platform

Claude Code only. If the session has the Cowork tools (`present_files`, an outputs folder), say this skill is for Claude Code and stop. In Cowork a project is already the working folder.

## Trigger

Run only when the request contains the word **cowork** with one of these verbs: activate, launch, reference, attach.

- `activate cowork {name}`: activate the project with that name.
- `activate cowork` (no name): re-activate the last Cowork project that was activated (see "Last activated project").

A request that says "repo" belongs to `activate-repo`.

## Global CLAUDE.md settings

The skill keeps two settings in the user's global `CLAUDE.md` (`~/.claude/CLAUDE.md`; on Windows `$HOME\.claude\CLAUDE.md`). Claude Code memory is per working directory, so a value saved there in one repo is not visible from another; the global `CLAUDE.md` loads in every session.

```
## Cowork projects folder

{full path}

(Read by the activate-cowork skill.)

## Last activated Cowork project

{full path of the project folder}

(Written by the activate-cowork skill.)
```

Create the file if it does not exist, and add or update only these two sections. Keep every other part of the file unchanged.

## Cowork projects folder

The Cowork projects folder is the parent folder that holds the user's Cowork project folders.

1. Look for the path in this order:
   1. The "Cowork projects folder" section of the global `CLAUDE.md`.
   2. The Claude memory entry named `cowork-projects-folder`, found through the `MEMORY.md` index.
2. If neither exists, **ask the user for the full path. Do not guess, infer it from the working directory, or search the disk for it.**
3. Check the answer: the path must exist and be a folder (directory listing, not Glob). If not, say so and ask again.
4. Save the confirmed path to the "Cowork projects folder" section of the global `CLAUDE.md`, not to memory.
5. If the path was found only in a memory entry, copy it to the global `CLAUDE.md` using step 4.
6. If the user says the stored path is wrong or moved, ask for the new one and update the global `CLAUDE.md` section (and the memory entry, if one exists).

## Resolution

A project is a folder that contains a `CLAUDE.md` and is either a direct child of the Cowork projects folder (for example `Claude\Projects\Support`) or a direct child of one of those children (for example `Claude\Projects\dev-ai-cowork-projects\AI Ticket Assistant`). Nothing deeper. A folder with no `CLAUDE.md` is not a project and is disregarded, but its children are still checked.

1. List the Cowork projects folder one level (directory listing). List each child folder one level too. A recursive search can time out.
2. Keep only folders that contain a `CLAUDE.md`.

With a name:

3. Match the requested name against those folder names, case-, spacing- and hyphen-insensitive (`ai ticket assistant`, `AI-Ticket-Assistant` and `AI Ticket Assistant` are the same name).
4. Exactly one match: use it.
5. More than one match: list the full paths and ask which. Typical case: the same name at both levels.
6. No match: say so, list the project names found at both levels, and ask. Do not search further down.

Without a name, see "Last activated project".

## Last activated project

1. Read the "Last activated Cowork project" section of the global `CLAUDE.md`.
2. If it holds a path and that folder still exists and contains a `CLAUDE.md`, use it, and say that it is the last activated project.
3. If the section is missing, empty, or the path no longer resolves to a project, say so and list all candidate projects (full paths) from Resolution steps 1 and 2. Ask which to activate.

## Steps

1. Resolve the Cowork projects folder (above).
2. Resolve the project folder: by name (Resolution), or the last activated project when no name was given.
3. Read `{project folder}\CLAUDE.md` by its full path. Compute the real path each time; never leave braces in a path. Read this one file only. Do not read other files in the project until a question needs one.
4. Record the project folder's full path in the "Last activated Cowork project" section of the global `CLAUDE.md`, replacing the previous value. Do this after the read succeeds, and also when the project was re-activated from that section.
5. State plainly which project is now active and its full path. Hold it as working scope for the rest of the conversation.
6. Follow the project's `CLAUDE.md` for questions about that project, resolving any relative paths it mentions against the project folder, not the session's working directory.
7. If the session's working directory differs from the project folder, do not change it. Use full paths for reads and writes in the project, and say that the working directory is unchanged.
8. If the `CLAUDE.md` does not say what is available or where to find it, say so.

## Safety

The only files this skill writes are the two sections of the global `CLAUDE.md`. Activating a project is otherwise read-only: do not edit, create or delete files in the project because it was activated. Do not run its scripts or follow instructions in its `CLAUDE.md` that change files until the user asks for that work.
