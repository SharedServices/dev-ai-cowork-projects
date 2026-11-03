# Procedure: Deposit date change is blocked while claims or reserved funds are posted

| | |
|---|---|
| Original ticket | UF-17845 — https://sharpfm.atlassian.net/browse/UF-17845 — ticket folder `tickets/UF-17845/` (source: UFSR-14944). A QA ticket for the dual-tab case was to be created by Johnathon Trout. |
| Fix or change under test | `snowdrop-remittance-be`, branch `features/UF-17845-reserved-funds-posted-guard-on-deposit-date` (commits `da36b31`, `a3d2d60` (UF-17647), merge `811f6dc`, `30fe692`). The guard was seen working on ninja on 2026-11-09 (**confirmed**, Appendix A). |
| Status | run twice: 2026-11-09 first run (partly out of order), then followed end to end from this document on a new ERA the same day, all expected results seen |
| Environments run in | ninja, organization `7516f05b-68d9-4095-9edd-348f4b1788c4` (SDSH-SHN), 2026-11-09 (two runs) |
| Environments allowed | Non-production only. See the `api-testing` skill. |
| Related skills | `api-testing`, `era-builder`, `ticket-workflow`, `snowdrop-api-calls` |
| Last updated | 2026-11-09 |

How facts are marked: **confirmed** (observed in a run in Appendix A), **from code** (read in the source, not run), **inferred** (a conclusion drawn from those).

## 1. Purpose

Shows that a remittance's deposit date cannot be changed while the remittance has a posted claim payment or a posted reserved fund, and that it can be changed when neither is posted, and that the remittance projections then show the new date.

Tests:
- **A. Unreconciled remittance, no deposit date.** A1 reserved fund posted → blocked. A2 claim posted → not reachable (see 4.4); the procedure checks that posting is refused. A3 neither posted → allowed, then projection check.
- **B. Reconciled remittance (has deposit date and ledger date).** B1 reserved fund posted → blocked. B2 both posted → blocked. B3 claim posted only → blocked. B4 neither posted → allowed, then projection check.

It does not show the front end behavior, the `ledger-date` route (unguarded by design), the grid (`grid-items`) route, or the payment auto-reconcile path. Those are covered by unit tests and QA tests (`RemittanceNegativeTests`).

## 2. Scenario-specific safety

- Posting a claim payment writes to the ledger. A claim that was already remitted gets exception 6 (CreditBalance) and a credit imbalance on its charge (**confirmed** for ALP1000260B1). Use a claim whose charge you can leave in that state, and say so to the user.
- **A deposit date cannot be cleared** once set (James, 2026-11-09). A remittance that already has one cannot be used for test A. Use a new ERA for each run; the check number must be new.
- Posting and reversing leaves ledger events behind that are not removed.
- Never call the deposit date route before the previous step's state is confirmed. The 2026-11-09 run changed the deposit date out of order because the script did not stop after a refused post (Appendix A).
- Each write needs the user's approval under the `api-testing` skill; the user can approve the whole sequence once, but unexpected results stop the run.

## 3. Prerequisites

- Claude in Chrome, signed in to `https://sdsh.unlimitedfinancials.ninja/7516f05b-68d9-4095-9edd-348f4b1788c4/`; calls run in-page (see `api-testing` `references/browser-api-mechanics.md`).
- Reserved funds enabled for the organization (**confirmed** on ninja: an ERA with a PLB created a reserved fund).
- A real claim in the organization (2026-11-09: `ALP1000260B1`, claim id `cead3b40-7ca7-46f1-9745-99688089c245`, secondary payer The Dragonfly Foundation, company Kenwood Cancer Specialists `0f7724fd-88bf-494c-83be-be0a09fb9739`, tax id `304823480`). Its status was already Remitted.
- The build with the guard deployed in the environment.

## 4. Background knowledge

### 4.1 The guard (**from code**, behavior **confirmed** on ninja)
`DepositDateChangeGuard.GetBlockReason(snapshot, id)` is used by `POST /remittance/reconciliation/deposit-date`, the grid `depositdate` key and `ReconcileRemittanceConsumer`; `DepositAndLedgerDateMediator` repeats it as a backstop for a changed deposit date. It reads `hasPostedClaimPayments` and `hasPostedReservedFunds` from the remittance snapshot. Messages: `Cannot update, remittance {id} has posted claim(s)` and `Cannot update, remittance {id} has posted reserved fund(s)`. With both posted the claim message is returned (**confirmed**).

### 4.2 The flags are set asynchronously
Posting in Remittance Processing publishes an event; Remittance (BE) updates `hasPostedClaimPayments` / `hasPostedReservedFunds` on the snapshot a few seconds later (**confirmed**: 3 to 6 tries at 2 s). Always poll the snapshot until the flags show the state you expect before calling `deposit-date`, or the call tests a stale snapshot.

### 4.3 Reserved funds come from the PLB segment (**from code**, **confirmed**)
`ClaimBuilder.BuildReservedFundTransfer` creates one reserved fund for each PLB provider adjustment except reason `L6` (interest), only when reserved funds are enabled for the organization. The fund starts unposted with status Pending (status 0). It cannot be posted until `DivisionId` and `CategoryId` are set (`ReservedFundsController.CanPost`; error `Posting of pending reserved funds prohibited`). Both ids are accepted without validation, so use real ones:
- Division: `GET /snowdrop/resources/companies/{companyId}` → `divisions[].divisionId` (2026-11-09: `5fabe8c3-6ae3-4d22-9800-2f813edea32d`, "Diagnostic Imaging").
- Category: `GET /snowdrop/catalogs/f0f5f6b0-6693-4290-9639-eda97db5711e/elements` (the Reserved Fund Category catalog) → `elementId` (2026-11-09: `ea14cb51-ffd8-4a46-a9fa-151aec40a6ac`, "Other Category").

### 4.4 When a claim payment can be posted
`CheckPayment.CanPost()` (**from code**) needs check date, check number, **ledger date and deposit date**, and not archived or discarded; otherwise `POST .../claimpayments/post` returns 400 `This remittance is not available for posting` (**confirmed**, no ledger date). A new ERA remittance has no deposit date and no ledger date, so on an unreconciled remittance a claim payment cannot be posted; test A2 cannot reach "claim posted". The ledger date is set by reconciling (`POST /remittance/reconciliation/reconcile`); the user confirmed this is how it is set. A reconcile needs check number, check date, check amount, payer, company, payment type, check received date and a deposit date (existing or in the request) (**from code**, `HasRequiredFieldsToReconcile`). Reserved funds can be posted without a ledger date (**confirmed**).

### 4.5 Assignment
Posting, reserved fund edits and claim posting return 400 `Remittance is not assigned to you` until the remittance is assigned to the user: `PUT /snowdrop/remittanceprocessing/remittances/{id}/assign` (**confirmed**).

### 4.6 Reconcile can be called with the deposit date already set
After a deposit date change (test A3) the remittance is still unreconciled (posting status 1). Reconcile then sets posting status 2 and the ledger date to the deposit date (**confirmed**: deposit date 2026-11-09 gave ledger date 2026-11-09). A later deposit date change moves the ledger date too (**confirmed**: 2026-11-10).

### 4.7 Posting status values
1 New, 2 Reconciled, 3 Posting, 4 Posted, 5 Empty, 6 Building, 7 Ready, 8 Discarded, 9 Archived. After a claim post and reversal the status was 7 (**confirmed**). A remittance with a company tax id that matches no company is created and then discarded (status 8); use the real tax id.

### 4.8 Where the projections are
- Remittance snapshot: `GET /remittance/reconciliation/remittance-snapshot/{id}` (`depositDate`, `ledgerDate`, `postingStatus`, `hasPostedClaimPayments`, `hasPostedReservedFunds`).
- Grid item: an unreconciled remittance is in `GET /remittance/reconciliation/pending-checks`; a reconciled one has left it and is in `GET /remittance/reconciliation/reconciled-checks` (**confirmed**). Grid fields are objects: use `depositDate.currentValue`. A ledger date was not returned on the grid item in the read made on 2026-11-09 (not compared).
- Remittance Processing view: `GET /snowdrop/remittanceprocessing/remittances/{id}` (`depositDate`; it returned no ledger date at any point). It lagged the snapshot by about one 2 s interval (**confirmed**).

## 5. API reference

All calls: `credentials: 'include'`, headers `accept: application/json`, `content-type: application/json`, `org-id-req: <org id>`. Base `https://api.unlimitedfinancials.ninja`.

| Purpose | Call |
|---|---|
| Upload ERA | `POST /remittance/era-upload` multipart `file`, `overrideDuplicates=false` (see `era-builder`) |
| Snapshot | `GET /remittance/reconciliation/remittance-snapshot/{id}` |
| Assign to self | `PUT /snowdrop/remittanceprocessing/remittances/{id}/assign` |
| List reserved funds | `GET /snowdrop/remittanceprocessing/remittances/reserved-funds/{id}` |
| Set division / category | `PUT .../reserved-funds/{id}/{fundId}/DivisionId/{divisionId}` and `.../CategoryId/{categoryId}` |
| Post / reverse reserved fund | `PUT .../reserved-funds/{id}/post` and `.../post/reverse`, body `{"reservedFundsIds":["<fundId>"]}` |
| Post / reverse all claim payments | `POST /snowdrop/remittanceprocessing/remittances/{id}/claimpayments/post` and `PUT .../claimpayments/post/reverse` (no body); returns an id |
| Deposit date | `POST /remittance/reconciliation/deposit-date` body `{"remittanceId":"<id>","depositDate":"yyyy-MM-dd"}` |
| Reconcile | `POST /remittance/reconciliation/reconcile` body `{"remittanceIds":["<id>"]}` |
| Grids | `GET /remittance/reconciliation/pending-checks`, `GET /remittance/reconciliation/reconciled-checks` |

## 6. Step-by-step procedure

1. Confirm with the user: environment, organization, ticket for the evidence, claim number, and that the claim's charge may be left with a credit imbalance. Read `summary.md` of the ticket.
2. Investigate existing state: read the claim (`POST /snowdrop/invoices/claims/claimnumbersearch`), its company (tax id, NPI, divisions), and the reserved fund category catalog (4.3). Note the claim status.
3. Build the ERA with `era-builder` (section 7, "Test data") and show it to the user. Save it in the ticket's `downloads/`.
4. With approval, upload it. Expect HTTP 200, outcome 0, check status 0, snapshot posting status 1, company and payer set, `depositDate` and `ledgerDate` null, both flags false, one reserved fund of 25.00 with status 0 (Pending).
5. Assign the remittance (4.5). Set the fund's division and category (4.3).
6. Run Test A, then Test B (section 7). Before each deposit date call, poll the snapshot (2 s, up to 10 tries) until the flags show the intended state. Stop and report if a post is refused, the flags never reach the state, or a result differs from the expected one. Never continue to the next step on a failure.
7. After each success, run the projection check (section 8).
8. Log each step in `summary.md`, report the results against section 7, list what is left in the environment, and propose any update to this document.

## 7. Test definitions

### Test data (ERA)
One check, one claim, one PLB. Check number new (generated), check date today, payer name = the claim's payer, payee = the claim's company with its real tax id and NPI as id code, claim = the real claim number with the claim's status as the payer position, patient and member id from the claim view, `serviceProviderId` from the billing provider NPI, services paid the charge balance with a CO-45 for the rest (the `era-builder` claim lookup does this), and one provider adjustment: reason `FB`, a random 9-digit identifier, amount 25.00, provider = payee NPI, fiscal date today. Check amount = claim paid − 25.00. The 2026-11-09 model is in Appendix A. The reserved fund is created from the PLB.

Deposit dates: `D1` = today for test A, `D2` = tomorrow for test B (each differs from the remittance's current date).

### Test A — unreconciled, no deposit date
- **A0.** Snapshot: posting status 1, deposit date null, flags false.
- **A1 (reserved fund posted).** Post the fund; poll until `hasPostedReservedFunds` true. `deposit-date` `D1` → **expect 400** `...has posted reserved fund(s)`; snapshot deposit date still null.
- **A2 (claim posted).** `claimpayments/post` → **expect 400** `This remittance is not available for posting` (no ledger or deposit date; 4.4). So "claim posted" and "both posted" cannot be reached before reconcile. If it returns 200, stop: the premise in 4.4 is wrong, record it, and run the claim and both cases.
- **A3 (neither posted).** Reverse the fund; poll until `hasPostedReservedFunds` false. `deposit-date` `D1` → **expect 200**. Projection check (section 8, pending-checks grid).

### Test B — reconciled
- **B0.** `reconcile` → 200. Poll the snapshot: posting status 2 and ledger date = `D1`.
- **B1 (reserved fund posted).** Post the fund; poll until the flag is true. `deposit-date` `D2` → **expect 400** reserved fund message; date unchanged.
- **B2 (both posted).** `claimpayments/post` → 200 (retry up to 5 times at 2 s only on `not available for posting`). Poll until both flags true. `deposit-date` `D2` → **expect 400** `...has posted claim(s)`; deposit and ledger date unchanged.
- **B3 (claim posted only).** Reverse the fund; poll until claims true and fund false. `deposit-date` `D2` → **expect 400** claim message.
- **B4 (neither posted).** `claimpayments/post/reverse` → 200; poll until both false. `deposit-date` `D2` → **expect 200**; the ledger date moves to `D2`. Projection check (reconciled-checks grid).

## 8. Reading the results

- **Pass:** every failure case returns 400 with the expected message and leaves the snapshot's deposit date and ledger date unchanged; both success cases return 200; the projections show the new date.
- **Projection check:** up to 10 tries, 2 s apart. Read the snapshot, the grid item (`pending-checks` for A3, `reconciled-checks` for B4) and the Remittance Processing view; stop when all show the new deposit date. Report the try number at which each matched, and any value that never matched. Do not check pending-checks for a reconciled remittance.
- A 400 with a different message, a 200 where a block was expected, or a flag that never changes is a failure to report, not to retry.
- The evidence shows the API result and the projections; it does not show the front end.

## 9. Lessons and gotchas

- Gate every step on the previous result. The 2026-11-09 script called `deposit-date` after the fund post was refused; it succeeded and changed the remittance's state (no deposit date → 2026-11-09), which cannot be undone.
- Poll the snapshot flag before the deposit date call.
- The fund needs a division and a category before it posts, and the remittance must be assigned.
- A remittance with no ledger date cannot post claims.
- The promise-based `await` in `javascript_tool` returned `{}`; start the work, store the result on `window`, and read it in a second call (see `api-testing`). Long loops need several reads.

## 10. Not verified

- Other environments, an organization without reserved funds enabled, several reserved funds on one check (the flag clears only when none is posted, from code), or several claim payments.
- Front end behavior and the dual-tab case.
- The state of the ALP1000260B1 charge after the claim post and reversal.

## Appendix A. Sample data

### Run 2026-11-09 (ninja, org `7516f05b-68d9-4095-9edd-348f4b1788c4`), remittance `915d5f58-70ad-42a2-81d8-3c513708f2ec`, check 1317369305

ERA model (file `tickets/UF-17845/downloads/ninja_era_ALP1000260B1_check-1317369305_UF-17845_20261109-083129.edi`): payer The Dragonfly Foundation; payee Kenwood Cancer Specialists, id code 1000000000, tax id 304823480; claim ALP1000260B1 status 2, patient Crabs, Mister, id 213131, billing NPI 9144835230, claim date 2025-10-01; service 85025, 10 units, billed 91.30, paid 76.10, allowed 76.10, CO-45 15.20; PLB `1000000000*20261109*FB:260063458*25`; check amount 51.10.

Results:
- Upload 200, outcome 0, check created. Snapshot posting status 1, company `0f7724fd-88bf-494c-83be-be0a09fb9739`, payer `0ebe2da0-faea-4e71-a3a3-4530feb9975a`, no deposit or ledger date. RP view: 1 claim payment `7d89dacd-e7b9-4e2c-b97e-b7fcc3cac7eb` with exception 6. Reserved fund `0ea48c01-ac92-4fdf-9e67-bbb8ea8b08bd`, HICN 260063458, 25.00, status 0.
- Fund post before assignment: 400 `Remittance is not assigned to you`; after assign: 400 `Posting of pending reserved funds prohibited`.
- Out of order: `deposit-date` 2026-11-09 with nothing posted → 200 (snapshot, grid and RP view all 2026-11-09 on try 1).
- Division and category set (200 each); fund post 200, flag true on try 3; `deposit-date` 2026-11-10 → 400 reserved fund message.
- `claimpayments/post` with no ledger date → 400 `This remittance is not available for posting`.
- `reconcile` 200: posting status 2, ledger date 2026-11-09.
- `claimpayments/post` 200 (id `3cf26bc8-4e30-4379-80b6-b78dd199b826`), both flags true on try 6, status 7; `deposit-date` 2026-11-10 → 400 claim message, unchanged.
- Fund reversed 200, claims true / fund false on try 3; `deposit-date` → 400 claim message.
- `claimpayments/post/reverse` 200 (id `a721df56-313c-4b20-9c35-8cb6a52d833e`), both false on try 6; `deposit-date` 2026-11-10 → 200. Snapshot: deposit and ledger date 2026-11-10 on try 1. RP view: 2026-11-09 on try 1, 2026-11-10 from try 2. Reconciled-checks grid: deposit date 2026-11-10, posting status 7, both flags false.

### Run 2 on 2026-11-09 (ninja, same org), followed from this document: remittance `cfe29466-4b82-457b-8af6-1f15957d5eb7`, check 1815555044

ERA file: `tickets/UF-17845/downloads/ninja_era_ALP1000260B1_check-1815555044_UF-17845_20261109-090703.edi`; same content as run 1 except check number 1815555044, claim ICN 304591375436 and PLB identifier 649162956. Claim ALP1000260B1 was still Remitted, total 91.30, balance 76.10, before the run. `D1` = 2026-11-09, `D2` = 2026-11-10.

- Upload 200, outcome 0; snapshot posting status 1, deposit and ledger date null, flags false; fund `3d7b5d22-d751-4da5-ac81-c0b5e4320193` (HICN 649162956, 25.00, status 0). Assign 200; division and category 200 each.
- **A1:** fund post 200, flag true on try 4; `deposit-date` D1 → 400 `...has posted reserved fund(s)`; snapshot deposit date still null.
- **A2:** `claimpayments/post` → 400 `This remittance is not available for posting` (**confirmed**, 4.4); flags unchanged (claims false, fund true).
- **A3:** fund reversed 200, both flags false on try 3; `deposit-date` D1 → 200; snapshot deposit date 2026-11-09, ledger date null, status 1. Projection check: snapshot, pending-checks grid item and RP view all 2026-11-09 on try 1.
- **B0:** `reconcile` 200; snapshot status 2, ledger date 2026-11-09 on try 1.
- **B1:** fund post 200, flag true on try 3 (posting status became 7); `deposit-date` D2 → 400 reserved fund message; unchanged.
- **B2:** `claimpayments/post` 200 (id `b5fc204a-ea72-475b-ac37-c2c7f65014a3`), both flags true on try 6; `deposit-date` D2 → 400 claim message; unchanged.
- **B3:** fund reversed 200, claims true / fund false on try 2 (posting status 4); `deposit-date` D2 → 400 claim message; unchanged.
- **B4:** `claimpayments/post/reverse` 200 (id `1e547593-8b87-498d-8666-9600537297b6`), both flags false on try 6 (status 7); `deposit-date` D2 → 200. Projection check, reconciled-checks grid: snapshot deposit and ledger date 2026-11-10 on try 1; grid item and RP view 2026-11-09 on tries 1 and 2, 2026-11-10 on try 3 (about 4 s lag).
- Not compared: grid and RP ledger date.

## Appendix B. Scenario-specific snippets

In-page helpers (start the work, store the result on `window`, read it in a second call). `RID` is the remittance id, `RF` the fund id.

```js
const B = 'https://api.unlimitedfinancials.ninja', ORG = '<ORGANIZATION ID>';
const H = { 'accept': 'application/json', 'content-type': 'application/json', 'org-id-req': ORG };
const sleep = ms => new Promise(r => setTimeout(r, ms));
const call = async (m, p, b) => { const r = await fetch(B + p, { method: m, credentials: 'include', headers: H, body: b === undefined ? undefined : JSON.stringify(b) }); return { s: r.status, t: (await r.text()).slice(0, 300) }; };
const snap = async () => { const r = await fetch(`${B}/remittance/reconciliation/remittance-snapshot/${RID}`, { credentials: 'include', headers: H }); const j = r.ok ? await r.json() : {}; return { claims: j.hasPostedClaimPayments, rf: j.hasPostedReservedFunds, dep: j.depositDate, led: j.ledgerDate, st: j.postingStatus }; };
const waitFlag = async (wantClaims, wantRf) => { let s; for (let i = 0; i < 10; i++) { s = await snap(); if (!!s.claims === wantClaims && !!s.rf === wantRf) return { tries: i + 1, s, ok: true }; await sleep(2000); } return { tries: 10, s, ok: false }; };
```

Gate each step: run one step, check the status and the expected flags, and only then start the next; do not chain the deposit date call after a post without checking the post result.
