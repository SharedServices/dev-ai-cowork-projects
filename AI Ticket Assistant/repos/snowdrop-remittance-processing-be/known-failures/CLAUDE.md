## Known failure patterns
<!-- system-generated: one bullet per subfolder here, with a one-line description pulled from that subfolder's own CLAUDE.md. -->
- `event-batch-checkpoint-skip-on-blob-etag-conflict/` — event lands in Cosmos, effect never applies; includes False Credit Balance.
- `oversized-unreconciled-check-backlog-breaks-payer-for-remittances/` — Bank Rec grid 500s (Cosmos SC3020) on large backlogs.
- `quiet-failed-read-in-cross-service-event-handler/` — cross-service event silently no-ops, no exception logged.
