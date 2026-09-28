# Remittance Processing — API call recipes

Repo-specific call recipes — generic call-mechanics (URL patterns, auth, troubleshooting) live in the `snowdrop-api-calls` skill instead, since those apply to every service, not just this repo.

## Remittance orchestration reachable via cookie auth (in addition to the Function App)

Confirmed 2026-08-13 from `references/Snowdrop.RemittanceProcessing.Services.json`. The same remittance/claim-payment orchestration operations that were documented in `references/function-apis.md` (direct Azure Function call, `x-functions-key` auth — that file was removed 2026-09-21 in the secrets audit, see the "Where to look for more" section of this repo's `CLAUDE.md`) are **also** exposed as cookie-authenticated routes on this repo's own service (Pattern A, prefix-rewrite — see `snowdrop-api-calls` skill's `references/auth-and-ingress.md` for what that means):

```
POST /snowdrop/remittanceprocessing/orchestration/remittance/{remittanceId}/ping
POST /snowdrop/remittanceprocessing/orchestration/remittance/{remittanceId}/purge
GET  /snowdrop/remittanceprocessing/orchestration/remittance/{remittanceId}/state
GET  /snowdrop/remittanceprocessing/orchestration/remittance/{remittanceId}/isevaluating
GET  /snowdrop/remittanceprocessing/orchestration/remittance/{remittanceId}/claimpayment/{claimPaymentId}/isevaluating
POST /snowdrop/remittanceprocessing/orchestration/remittance/{remittanceId}/evaluate-remittance
POST /snowdrop/remittanceprocessing/orchestration/remittance/{remittanceId}/evaluate-claimpayments
```

This mirrored the remittance- and claim-payment-level endpoints from the now-removed `references/function-apis.md`'s Remittance Processing Orchestration app, but **not** the environment- or organization-level state/purge/ping, throttle, or rules-build endpoints — those were function-app-only and are not preserved anywhere in this workspace after the removal. Useful when you have a logged-in browser session (cookie) but not the function key, or vice versa.

## Fetch a remittance

Confirmed 2026-08-12 (UF-15759, org `852756eb-73b2-4c46-b0f0-c8ec4d29acde`, env uno).

- **Fetch a remittance by id** (Pattern A, prefix-rewrite), confirmed live:
  ```
  GET https://api.unlimitedfinancials.{env}/snowdrop/remittanceprocessing/remittances/{remittanceId}
  ```
  Returns `checkNumber`, `checkDate`, `checkAmount`, `payerLiteral`, `status`, `claimPayments[]`, and more.
