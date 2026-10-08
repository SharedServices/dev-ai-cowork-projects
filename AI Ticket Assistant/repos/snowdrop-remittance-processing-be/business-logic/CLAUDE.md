## Business logic
<!-- system-generated: one bullet per subfolder here, with a one-line description pulled from that subfolder's own CLAUDE.md. -->
- `Rules/` — rules engine: sequences, behaviors, claim vs. charge payment semantics.
- `RemittanceLifecycle/` — remittances live 1 week–1 year; per-remittance data self-sunsets.
- `ChargePaymentCardinality/` — one ChargeId maps to multiple ChargePaymentIds.
- `CheckPostingStatus/` — how a check's status (Building, Posted, ...) is derived from its claim payments.
- `ChargePaymentCreation/` — the flow from a remittance's `RemittanceCreatedEvent` to the claim payments and charge payments in `RemittanceInitialized`, plus a replay script.
- `ServiceLineChargeMatching/` — how each payer service line is assigned to a charge on the claim.
- `ChargePaymentAggregation/` — how service lines matched to the same charge are combined into one charge payment.
- `PayerServiceLineMislabeling/` — payers sometimes scramble which service line their amounts belong to, so payment and adjustments land on the wrong charge; how to recognize it.

**Ruling out a business-logic explanation:** walk `Rules/references/rule-behaviors-issue-analysis.md`'s ordered fire-condition checklist against the payment's real data. If every condition passes but the effect still isn't visible downstream, this isn't a business-logic question — check `../known-failures/CLAUDE.md` instead.


