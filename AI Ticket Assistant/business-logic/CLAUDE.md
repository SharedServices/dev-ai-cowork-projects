# Business Facts — Index

Confirmed domain facts that don't belong in any single repo's own `business-logic/`. Two
different reasons a fact ends up here, kept distinguishable per-entry: (1) it's **genuinely cross-repo** —
true regardless of which repo you're looking from, or (2) it's single-repo but that repo has **no `repos/`
folder yet**, so this is a temporary parking spot, not its final home. Moving a fact out once its repo
exists is a small edit, not a re-derivation — do it rather than leaving a stale copy here once that repo
folder is built.

One fact per folder, under `business-logic/{fact-name}/CLAUDE.md` (+ optional `README.md`, `references/`) —
folder-per-category, same as every repo's own `business-logic/`. Not one growing file — a single shared
file becomes a collision point once more than one contributor adds a fact here. This file is just the index.

<!-- system-generated: one bullet per subfolder here, with a one-line description pulled from that subfolder's own CLAUDE.md. -->

## Genuinely cross-repo (permanent)

- [`charge-terminology-three-representations/`](charge-terminology-three-representations/CLAUDE.md) — Activities, Ledger, Remittance Processing all mean something different by "Charge," tied together by `ChargeId`.
- [`unreconciled-check-backlog-vs-month-close/`](unreconciled-check-backlog-vs-month-close/CLAUDE.md) — `snowdrop-resources` month-close and `snowdrop-remittance` reconciliation are separate conditions; a backlog can grow unbounded regardless of month-close.
- [`standard-nimbus-system-user-id/`](standard-nimbus-system-user-id/CLAUDE.md) — `daeb914f-1df3-470f-9637-0dae563aa034` on any repo's event feed is background processing, not a person.

## Awaiting a repo home (temporary — single repo, no `repos/` folder yet)

None currently. Add new single-repo facts here as their own folder under `business-logic/` (tag the scope
line inside that folder's `CLAUDE.md` as "awaiting a repo home," not "genuinely cross-repo"), and move the
folder under "Genuinely cross-repo" or into the relevant repo's own `business-logic/` once that repo folder
exists.
