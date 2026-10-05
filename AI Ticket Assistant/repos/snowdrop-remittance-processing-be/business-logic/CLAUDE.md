## Business logic
<!-- system-generated: one bullet per subfolder here, with a one-line description pulled from that subfolder's own CLAUDE.md. -->
- `Rules/` — rules engine: sequences, behaviors, claim vs. charge payment semantics.
- `RemittanceLifecycle/` — remittances live 1 week–1 year; per-remittance data self-sunsets.
- `ChargePaymentCardinality/` — one ChargeId maps to multiple ChargePaymentIds.
- `CheckPostingStatus/` — how a check's status (Building, Posted, ...) is derived from its claim payments.

**Ruling out a business-logic explanation:** walk `Rules/references/rule-behaviors-issue-analysis.md`'s ordered fire-condition checklist against the payment's real data. If every condition passes but the effect still isn't visible downstream, this isn't a business-logic question — check `../known-failures/CLAUDE.md` instead.


