## Business logic
<!-- system-generated: one bullet per subfolder here, with a one-line description pulled from that subfolder's own CLAUDE.md. -->
- `BankRecMismatchCauses/` — three causes of a Check-vs-Workflow mismatch; two benign.
- `LedgerDateLocking/` — LedgerDate locks after first posting; a frozen date alone isn't a bug.
- `PayerResponseSourceOfTruth/` — the remittance's `RemittanceCreatedEvent` is the definitive record of what the payer returned.
- `EraEdiParsing/` — how a Change Healthcare 835 file is parsed (EdiFabric) into `RemittanceCreatedEvent.RemittanceMessage`; segment-to-field mapping.
