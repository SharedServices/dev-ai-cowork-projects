# Payer Literal Mapping — the payer a check resolves to comes from the last payer a user entered for that payer literal in Bank Reconciliation

## What this covers

How a check's payer name text (the payer literal) is tied to an internal payer, and why a remittance can resolve to the wrong payer without any defect in the code. The mapping is data entered by users, not derived by the system.

## Key concepts / vocabulary

- **Payer literal** — the payer name text on the check or ERA, stored trimmed and upper-case. The upload normalizes the ERA's payer name the same way before looking it up, so a returned literal used as the payer name resolves that payer.
- **Payer literal mapping** — the link from a literal to one payer. It is created when a user enters a payer for a check in the Bank Reconciliation user panel.
- **Payer Mismatch (exception code 29)** — exception on a claim payment whose payer differs from the payer the check resolved to. It is not blocking.

## Known gotchas / non-obvious behavior

### The mapping is driven by user input in the Bank Reconciliation panel
Whenever a user enters a payer for a check, that payer becomes tied to the payer literal on that check. Nothing validates that the chosen payer is the payer the literal names.

### The last user input wins
A later entry for the same literal replaces the earlier one. A literal maps to one payer, so one wrong entry changes the payer for every later check carrying that literal.

### Test environments are suspect
Many people enter payers by hand while testing, so a literal in a test environment can be tied to an unrelated payer. Check the current mapping before treating a payer mismatch as a code defect.

### A wrong mapping shows up as Payer Mismatch on the claim payments
The remittance resolves to the mapped payer, while each claim payment keeps the payer of its own invoice. When the two differ, every claim payment on the check gets exception 29. Correcting the mapping in the Bank Reconciliation panel clears the exception.

## Tracing this in Splunk
No log lines for this mapping have been confirmed.

## Investigation workflow

1. Read the remittance snapshot (`GET /remittance/reconciliation/remittance-snapshot/{remittanceId}`) and note its `payerId` and `payerLiteral`.
2. Compare that `payerId` with the payer on the claim's invoice. If they differ, the mapping is the first suspect.
3. Read the literals mapped to the expected payer with `GET /remittance/reconciliation/payer-literals/{payerId}` (confirmed on ninja 2026-10-14). It returns `{ "payerLiterals": [...] }`; an empty list means no mapping exists for that payer, and it also returns 200 for an unknown payer id.
4. If the literal is mapped to the wrong payer, correct it by entering the right payer for the check in the Bank Reconciliation panel, then reevaluate or reprocess. Do not look for a code defect first.

## Where to look for more
- `../../references/api-calls.md` — reconciliation endpoint calls for this repo.
- `../DuplicateCheckHandling/CLAUDE.md` — the other check-level behavior that depends on user actions in Bank Reconciliation.
