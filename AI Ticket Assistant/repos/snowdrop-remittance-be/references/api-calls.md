# Remittance (BE) — API call recipes

Ingress: Pattern B (flat passthrough), external path `/remittance/<route>` — see this repo's `CLAUDE.md` identity block.

## Remittance reconciliation — fetch, validate, discard

Confirmed 2026-08-12 (UF-15759, org `852756eb-73b2-4c46-b0f0-c8ec4d29acde`, env uno).

- **Discard one remittance:**
  ```
  POST https://api.unlimitedfinancials.{env}/remittance/reconciliation/discard
  Body: { "remittanceId": "<uuid>", "isDeleted": true }
  ```

- **Discard multiple remittances in one call (batch variant):**
  ```
  POST https://api.unlimitedfinancials.{env}/remittance/reconciliation/discard-multiple
  Body: { "remittanceIds": ["<uuid>", ...], "isDeleted": true }
  ```

- **Undo a discard** — `/remittance/support/remittance/{remittanceId}/restore-discarded` (POST), a useful safety net if a discard needs reversing.

**Swagger is reachable with no auth:** a sibling `/remittance/swagger` ingress has no `auth-url` annotation at all (confirmed via live ingress YAML scan, 2026-07-28) — useful as a no-cookie-needed reachability probe, distinct from the data API itself.

**Safety note:** discard is a write against (potentially production) financial data. Per this workspace's production-write policy, don't call it unattended — validate the fetch response against expected values (check number/amount/payer) before discarding, and run any bulk discard as a human-driven script the user runs themselves, not an autonomous loop.
