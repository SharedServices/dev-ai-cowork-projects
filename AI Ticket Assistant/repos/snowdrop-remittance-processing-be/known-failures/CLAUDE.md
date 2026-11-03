## Known failure patterns
<!-- system-generated: one bullet per subfolder here, with a one-line description pulled from that subfolder's own CLAUDE.md. -->
- `event-batch-checkpoint-skip-on-blob-etag-conflict/` — event lands in Cosmos, effect never applies; includes False Credit Balance.
- `oversized-unreconciled-check-backlog-breaks-payer-for-remittances/` — Bank Rec grid 500s (Cosmos SC3020) on large backlogs.
- `quiet-failed-read-in-cross-service-event-handler/` — cross-service event silently no-ops, no exception logged.
- `auto-post-arePosting-append-lost-leaves-claim-payment-initialized/` — claim payment never starts posting after an auto-post; check stays in Posting.
- `claim-payments-added-to-check-in-closed-ledger-month/` — claim payments added after month close return a Posted check to Building; fix is a projection edit.
- `adjust-to-zero-not-in-memory-image-blocks-auto-post/` — claim payment with a balance cleared only by an AdjustToZero rule is not auto-posted.
- `credit-card-payment-reconciles-check-without-ledger-date-or-deposit-amount/` — Credit check reconciled by the Stripe handler with null ledger date and deposit amount; defect code is in remittance (BE).
- `company-change-leaves-ledger-date-in-closed-month/` — cross-reference: a company change leaves the ledger date before the new company's cutoff, `isLedgerClosed` is true and the check cannot post; full entry is in remittance (BE).
