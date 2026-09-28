# Known-failure pattern template — CLAUDE.md skeleton

Copy this into `repos/{repo-name}/known-failures/{pattern-name}/CLAUDE.md` for a confirmed platform defect — a case where the system did NOT behave as designed, as opposed to business-logic/config behavior that only looks wrong. Deliberately a standalone file, no README/memories/references subfolders — a known-failure pattern is short enough (symptom, detection, tickets) that splitting it into a fractal unit would be pure overhead. Delete this header and the `---` when you copy it.

The opening line is what the parent repo's `CLAUDE.md` pulls as this pattern's one-line description in its own "Known failure patterns" section (system-generated there) — keep it accurate and short.

---

# {Pattern name} — {one-line description of the symptom}

## What happens
{Plain description of the failure: what should have happened per the event history / design, and what actually happened instead.}

## Detection signature
{The concrete, checkable signal that confirms this pattern rather than something else — a Cosmos query result shape, a Splunk log line pattern, a specific error code. Be specific enough that this can be checked against a new ticket without guessing.}

## Consequence variants
{If this root cause produces more than one downstream symptom depending on circumstances, list them here. Delete this section if there's only one.}

## Confirmed occurrences
{Jira ticket(s) this was confirmed on, with a one-line note each if useful.}

## Fix status
{Not fixed / fix merged not deployed / fixed in {version or date} — whatever is currently true.}
