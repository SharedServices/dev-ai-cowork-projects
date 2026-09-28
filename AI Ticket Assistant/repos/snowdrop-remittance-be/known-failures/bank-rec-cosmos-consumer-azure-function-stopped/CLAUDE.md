# Bank Rec Cosmos consumer Azure Function stops and doesn't self-restart

Split out from the general "three possible causes" business rule for Bank Rec mismatches — this is the one cause of the three that's an actual confirmed defect, not benign/expected behavior.

## What happens

The Bank Reconciliation **Workflow** view is fed by an Azure Function that consumes a Cosmos DB change feed and propagates check-posting stats into the workflow's own read model. When Microsoft performs platform maintenance, Azure Functions can be stopped, and this one does not always restart itself afterward ("a feature, not a bug," per Azure's own behavior for this trigger type) — the Cosmos consumer stays stopped indefinitely until something manually restarts it. While it's stopped, the Reconciliation Workflow view silently falls behind the authoritative Check view and never catches up on its own.

## Detection signature

Symptom: a persistent (not self-resolving after a normal propagation delay) mismatch between the Check view's posting stats and the Reconciliation Workflow view's stats for the same check(s).

**Diagnostic tell:** manually launch into the Azure Function in the Azure Portal. If the Workflow view's numbers update immediately upon doing so, that confirms this cause — the Function was stopped, and opening/triggering it in the Portal is enough to start it running again.

## Root cause

The Cosmos change-feed consumer Azure Function has no independent wake mechanism — it relies on being invoked, and once stopped by Microsoft-side maintenance, nothing brings it back until it's triggered again (manually, or by the permanent fix below).

## Confirmed occurrences

| Ticket | Notes |
|---|---|
| UF-14514 | Root-caused; confirmed the diagnostic tell (immediate update on manual Portal launch) |

## Fix status

**Permanent fix: a timer function that wakes the Cosmos consumer on its own trigger**, added in **Release 26.7**. As of UF-14514 (June 2026), Release 26.7 was **not yet in CLOUD (prod)** — check current release status before assuming this is fully resolved in a given production environment; other prod-tier environments may lag CLOUD's rollout further still.
