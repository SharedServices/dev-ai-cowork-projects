## Charge terminology has three system-specific representations

**Scope:** genuinely cross-repo — Activities, Ledger, Remittance Processing.

### What this covers

The word "Charge" means different concrete things depending on which system is talking, though all three refer to the same conceptual charge, tied together by a shared `ChargeId`. Confusing these is a recurring source of misdiagnosis.

### The fact

**The lifecycle, in order:**
1. **Activity Charge** — charges originate in `snowdrop-activities`. This is the source of truth for what was billed. Activity Charges get collected into invoices and sent to the insurance payer requesting payment.
2. **Ledger Charge** — `snowdrop-ledger` (Ledgers) receives events describing these charges from the Activity event feed and maintains its own projection with its own data. Ledgers is the main financial source of truth for what's been billed, paid, adjudicated, etc. — Ledgers and Activities are working against the *same* charges, identified by the same `ChargeId`, but each owns its own projection/data shape.
3. **Charge (on a Charge Payment)** — `snowdrop-remittance-processing` (Remittance Processing) receives charges coming back from the payer in a remittance. These are linked into `ChargePayment` records because the same charge can be referenced more than once on the same claim. When the claim payment is posted, the Charge Payment and its associated Charge are posted to Ledgers, since Ledgers tracks the charge's balance and disposition.

### Implications

- Before reasoning about a "Charge" in any solution, identify which of the three representations is meant — Activity Charge (billed), Ledger Charge (financial source of truth), or the Charge referenced from a Charge Payment (payer-response side, in Remittance Processing). The same `ChargeId` threads through all three, but the underlying data/projection is owned separately by each service.
- A `Charge` type inside `snowdrop-remittance-processing-be` (e.g. the projection built from Activity Charge events in `src/consumers/ActivityCharges/ActivityChargesEventHandler.cs`) is **not** a "ledger charge" — it is Remittance Processing's own projection of Activity Charge events, independent of Ledger's own model against the same charge id. Don't conflate a solution's local Charge projection with Ledger's.

### How to apply

When reasoning about or describing a "Charge" in any of these three solutions, state explicitly which representation is meant rather than using the bare word "Charge" — the same `ChargeId` looks up different data depending on which service you ask.

**First applied:** UF-15804 — used to correct code-analysis terminology when adding the `ChargeModifier` rule-qualifier attribute (distinguishing "Modifier (on Charge)," sourced from the Activity-Charge projection, from "Modifier (as returned)," sourced from the payer/EDI via `ChargePayment`).

### Where to look for more
- `../../repos/snowdrop-remittance-processing-be/business-logic/Rules/references/attribute-types.md` — the Modifier-source distinction this fact underlies.
