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

## Reconciliation — deposit date, ledger date, company

Routes are `/remittance/reconciliation/<route>` (flat). Dates in bodies are `"YYYY-MM-DD"` strings. Send calls that change data from a signed-in application tab (`snowdrop-api-calls` skill, "In-page `fetch`").

- **`POST deposit-date`** `{ "remittanceId": "<uuid>", "depositDate": "<date>" }` — refused when claim payments are posted (the branch `features/UF-17845-reserved-funds-posted-guard-on-deposit-date` also refuses when reserved funds are posted). Otherwise it publishes `RemittanceDepositDateUpdated` and, through `DepositAndLedgerDateMediator`, `RemittanceLedgerDateUpdated` calculated for the remittance's current company. A date equal to the current deposit date publishes nothing. Confirmed on `app` (UF-17855): `200`, empty body.
- **`POST ledger-date`** `{ "remittanceId": "<uuid>", "ledgerDate": "<date>" }` — publishes `RemittanceLedgerDateUpdated` with the date given. No closed-month check, no posted-claims check, no calculation. Not called so far.
- **`POST company-id`** `{ "remittanceId": "<uuid>", "companyId": "<uuid>" }` — publishes only `RemittanceCompanyIdUpdated`; refused when claim payments are posted. It does not recalculate the ledger date (see `known-failures/company-change-leaves-ledger-date-in-closed-month/CLAUDE.md`).

Reads that confirm the state after a change:
- `GET /remittance/reconciliation/reconciled-checks` — grid items with `postingStatus`, `ledgerDate`, `depositDate.currentValue` and `companyId`. Large (2,454 rows on `app`); filter in the page.
- `GET /snowdrop/remittanceprocessing/remittances/{remittanceId}` — the remittance processing service (prefixed path). Includes `isLedgerClosed`, `status` and `depositDate`.
- Not usable as probes on `app`: `GET .../reconciliation/company-closures` returned an empty `404` although the controller declares it as a GET (cause not found), and `GET .../reconciliation/company-can-close/{companyId}` returned `405`.

**Swagger is reachable with no auth:** a sibling `/remittance/swagger` ingress has no `auth-url` annotation at all (confirmed via live ingress YAML scan, 2026-07-28) — useful as a no-cookie-needed reachability probe, distinct from the data API itself.

**Safety note:** discard is a write against (potentially production) financial data. Per this workspace's production-write policy, don't call it unattended — validate the fetch response against expected values (check number/amount/payer) before discarding, and run any bulk discard as a human-driven script the user runs themselves, not an autonomous loop.
