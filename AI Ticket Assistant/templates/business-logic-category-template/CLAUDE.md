# Business-logic category template — CLAUDE.md skeleton

Copy this into `repos/{repo-name}/business-logic/{category}/CLAUDE.md` when a repo has a distinct business-logic concept worth its own fractal unit (a rules engine, a matching/scoring algorithm, a versioning policy — anything with its own gotchas and its own way of being traced in logs). Not every repo needs one, and a repo can have more than one category. Delete this header and the `---` when you copy it.

Uses `CLAUDE.md` + `README.md` + `references/` (only when there's enough supporting reference material — rule descriptions, config tables, worked examples — to justify splitting it out; not by default), unlike known-failure patterns which are a single standalone file. **No `memories/` subfolder** — dropped from the standard 2026-09-23: it was never actually used at this scope (every nested `memories/` folder in the project was empty), and the memory-promotion design lands a confirmed fact in `CLAUDE.md`, `references/`, or a skill-bundled reference directly from the project's one real top-level `memories/`, not through a mirrored empty folder at every nesting level. See `documents/project-maintenance.md`'s "References folders" section for the publish-only convention — don't restate it here.

The opening line of this file is what a parent repo's `CLAUDE.md` pulls as this category's one-line description in its own "Business logic" section (system-generated there) — keep that first sentence accurate and short.

---

# {Category name} — {one-line description of what this business logic does}

## What this covers
{Plain description: what domain concept or engine this is, what decisions it makes, what inputs drive it.}

## Key concepts / vocabulary
{Any terms specific to this logic that a newcomer needs before the rest of the file makes sense.}

## Known gotchas / non-obvious behavior
{Confirmed cases where the logic behaves in a way that looks like a bug but isn't — config flags that don't do what their name implies, ordering dependencies, qualify-but-no-op cases. This is the highest-value section; it's what a skill like `business-logic-expert` existed to explain before repo folders existed.}

<!-- Give each gotcha its own named subheading (### {FlagOrBehaviorName}), not one flowing paragraph mentioning several. Costs nothing while this section is small — reading the whole file is fine at that size — but it's the structure that lets a future grep for a specific flag/behavior name land on just its own entry instead of matching scattered mentions across a page of prose, once this section grows large enough that a full read stops being the cheap option. Decided 2026-09-21, see multi-user-generalization-plan.md #13 for the reasoning: the actual trigger for switching from "read this file" to "grep within it" is whether a one-line description can still narrow to the right entry, not a size threshold picked in advance — keeping entries separately headed either way costs nothing now and preserves the option later. -->

### {FlagOrBehaviorName}
{One gotcha per heading: what it looks like, what it actually does, and the ticket/date it was confirmed on.}

## Tracing this in Splunk
{A table or list of the log lines / fields that show this logic firing, and what each one means.}

## Investigation workflow
{The step-by-step approach for root-causing a ticket that implicates this logic — what to check first, what rules out what.}

## Where to look for more
- `references/{file}.md` — {one-line description}
