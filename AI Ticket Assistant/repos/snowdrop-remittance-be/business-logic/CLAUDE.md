## Business logic
<!-- system-generated: one bullet per subfolder here, with a one-line description pulled from that subfolder's own CLAUDE.md. -->
- `BankRecMismatchCauses/` — three causes of a Check-vs-Workflow mismatch; two benign.
- `LedgerDateLocking/` — LedgerDate locks after first posting; a frozen date alone isn't a bug.
- `LedgerDateCalculation/` — how LedgerDate comes from the deposit date and the company's closed months; a company change does not recalculate it.
- `PayerResponseSourceOfTruth/` — the remittance's `RemittanceCreatedEvent` is the definitive record of what the payer returned.
- `EraEdiParsing/` — how a Change Healthcare 835 file is parsed (EdiFabric) into `RemittanceCreatedEvent.RemittanceMessage`; segment-to-field mapping.
- `DuplicateCheckHandling/` — duplicate checks (same check number, same org, not discarded) are detected and annotated on grid items, never removed automatically.
- `PayerLiteralMapping/` — the payer a check resolves to comes from the last payer a user entered for that payer literal in Bank Reconciliation; suspect in test environments.
