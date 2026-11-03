## Known failure patterns
<!-- system-generated: one bullet per subfolder here, with a one-line description pulled from that subfolder's own CLAUDE.md. -->
- `snapshot-replay-oom-cumulative-full-list-events/` — OOM on hot remittances from cumulative EOB attachment events.
- `bank-rec-cosmos-consumer-azure-function-stopped/` — Cosmos consumer Function stops and doesn't self-restart.
- `company-change-leaves-ledger-date-in-closed-month/` — a company change does not recalculate LedgerDate, leaving it before the new company's closed-month cutoff; the check cannot post and drops out of Bank Rec.
- `credit-card-payment-reconciles-check-without-ledger-date-or-deposit-amount/` — cross-reference: Credit check reconciled by the Stripe handler here with null ledger date and deposit amount; full entry is in remittance processing.
