## Bank Rec Mismatch Causes

### What this covers

How to read a mismatch between the Check view and the Reconciliation Workflow view for the same
check, and which of the three possible causes actually needs action.

The confirmed-defect cause (#3 below) has its own entry at
`../../known-failures/bank-rec-cosmos-consumer-azure-function-stopped/CLAUDE.md` instead of being
folded in here — it has its own diagnostic signature and fix status, which is known-failure shape,
not domain-fact shape. This entry keeps the general "how to read a mismatch" framing plus the two
benign causes.

### The fact

The Check view shows actual posting stats read directly from the check (authoritative). The
Reconciliation Workflow view shows a *propagated* copy, fed through a Cosmos DB and an Azure
Function Cosmos consumer. A mismatch between the two views has three possible causes:

1. **Lag** — ordinary propagation delay (a few seconds). Self-resolves; no action needed.
2. **Update failure** — an update failed partway, so the two views temporarily disagree.
   Self-resolves the next time those stats change, since the whole stat set is recomputed and
   rewritten on each update — don't treat a stale mismatch as evidence of permanent data loss.
3. **The propagation pipeline's Azure Function has stopped** — see
   `../../known-failures/bank-rec-cosmos-consumer-azure-function-stopped/CLAUDE.md` for this one;
   it's a confirmed defect, not benign.

### How to apply

Don't jump to "something is broken" on sight of a Workflow-vs-Check mismatch — causes 1 and 2 are
expected, transient, and self-resolving. Only escalate to the known-failure pattern once the
mismatch persists and the diagnostic tell there (numbers update immediately on manually launching
the Function in the Portal) confirms cause 3 specifically.

### Where to look for more
- `../../known-failures/bank-rec-cosmos-consumer-azure-function-stopped/CLAUDE.md` — cause 3, the
  confirmed defect.
