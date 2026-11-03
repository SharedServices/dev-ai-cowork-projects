# Sending an ERA from the Chrome tab

Endpoint: `POST https://api.unlimitedfinancials.{env}/remittance/era-upload`. Flat path, no `/snowdrop/` prefix. Multipart form with `file` and optional `overrideDuplicates`. Response is `EraUploadResponse`: `outcome` (0 Accepted, 1 PartlyProcessed, 2 DuplicateWarning, 3 Rejected), `message`, `checks[]` (`checkNumber`, `status` 0 Created, 1 NotCreated, 2 DuplicateWithheld, 3 Failed, `remittanceId`, `existingRemittanceIds`, `reason`). The engine (`engine.md`) makes this call for you; this file explains the conditions it needs and how to read the result.

## How the call has to be made (confirmed on ninja, 2026-10-14)

The general rules for calling the API from the browser (run from a tab on the app origin, never from an API-origin tab, `credentials: 'include'`, the `org-id-req` header, never copy cookies, never set the multipart `Content-Type`) are in the `api-testing` skill's `references/browser-api-mechanics.md`, "Setup" and "Patterns". What is specific to the ERA upload:

- **Application host.** It is the organization's `kingdomUrl` host from the organization lookup (`references/org-lookup.md` at the project root); for the test organization used so far it is `sdsh.unlimitedfinancials.ninja`. The API answers CORS for that origin.
- **API-origin tab failure.** From a tab on the API origin, Chrome replaces the page with its own error page whose origin is `null`, and the fetch fails with `TypeError: Failed to fetch`. `/remittance/swagger` and `/remittance/swagger/index.html` both return 404 on ninja.
- **Organization header.** The engine always sends `org-id-req` (`config` sets it).
- Application hosts differ by organization (`sdsh`, `sdct`, `sd`, and others). Take the host from the organization lookup, not from a guess. The API host `api.unlimitedfinancials.{env}` is confirmed for ninja only; for other environments confirm it with the user.

## Getting the tab ready

1. Set up the tab as in the `api-testing` skill's `references/browser-api-mechanics.md`, "Setup" (load the Chrome tools, get the tab context, navigate to `https://<application host>/{organizationId}/`, handle a sign-in page).
2. Probe with a read-only call. A 200 with a JSON array confirms the session, the organization and CORS before anything is written (start it, then read the result; see `engine.md`):

```js
(() => {
  window.__probe = { done: false };
  fetch('https://api.unlimitedfinancials.{env}/remittance/reconciliation/pending-checks', {
    credentials: 'include',
    headers: { 'accept': 'application/json', 'org-id-req': '<ORGANIZATION ID>' }
  }).then(async r => { window.__probe = { done: true, status: r.status, bodyStart: (await r.text()).slice(0, 100) }; })
    .catch(e => { window.__probe = { done: true, err: String(e) }; });
  return 'started';
})()
```

3. Load the engine and call `config` (see `engine.md`). Navigating to another page clears the engine and the model.

## Immediate validation

`__era.upload()` checks only what is known to exist as soon as the response returns: the upload response and the remittance snapshot. The snapshot is built from the event stream, and the upload has already written its events when it responds. The result holds a verdict for every check the response reports as Created:

- **mismatch** if the snapshot's check number, check amount or claim count differ from the model, or the snapshot cannot be read.
- **discarded** if `isDeleted` is true or `postingStatus` is 8. The upload still says Created. The usual cause is a payee tax id that matches no company in the organization. Say so, and do not report success.
- **live** otherwise (`postingStatus` 1, New), whether or not `company` and `payer` resolved. Report both, since null means no company or payer matched.

Also report `linked` out of `claims`. A claim is linked when its claim number and payer position match a claim in the organization; the message claim then carries that claim's id. Unlinked claims still import. A remittance with more than 1,000 claims, or one whose first write failed, keeps its message in blob storage: `blob` is true and `claims` and `linked` are null; say so and do not treat it as a mismatch.

Posting status values: 1 New, 2 Reconciled, 3 Posting, 4 Posted, 5 Empty, 6 Building, 7 Ready, 8 Discarded, 9 Archived.

Then tell the user plainly that only the immediate state was checked (response and snapshot), that the grid and the remittance-processing view are written afterwards and may lag, and ask whether they want a current-state check.

## Current-state check

Only when the user asks. It can be repeated: the user may wait and ask again, or ask several times, to get past the lag. `__era.currentState(remittanceId, checkNumber)` checks the grid and the remittance-processing view for one check and puts the result in `__era.out.current`:

- `pendingChecks`: whether the remittance is listed in `GET /remittance/reconciliation/pending-checks`.
- `discardedChecks`: whether `POST /remittance/reconciliation/discarded-checks` with the check number finds it.
- `remittanceProcessing`: `GET /snowdrop/remittanceprocessing/remittances/{id}` (a different service, so it has the prefix): status, check number, amount, `remittanceStatus` and the number of claim payments.

How to read it:
- **Live remittance:** it should be in `pendingChecks`, not in `discardedChecks`, and `remittanceProcessing` should return 200 with the check number and amount sent and a claim payment count equal to the claim count.
- **Discarded remittance:** it should be in `discardedChecks` and not in `pendingChecks`.
- **Anything missing:** say it is not there yet, that this may be lag, and offer to check again. Do not call it a failure on the first miss. `remittanceStatus` is the remittance-processing service's own status value; report it as returned.

## Failure cases

- `TypeError: Failed to fetch` with no status: the tab is not on the app origin (see above), or the network is down.
- The tab is on a sign-in page: the session expired; ask the user to sign in and navigate the tab again.
- 401: no session, or `org-id-req` is missing or wrong.
- 400: no file, or the organization or user could not be determined.
- 404: the endpoint is not deployed in that environment.
- 200 with `outcome` 3: the file was rejected; read `message` and each check's `why` (reason).

## Confirmed results

2026-10-14, ninja, organization `7516f05b-68d9-4095-9edd-348f4b1788c4`: the upload of a generated two-claim ERA returned 200, `outcome` 0, message `1 remittance(s) created from the file.`, check status 0 with a `remittanceId`. Fetching that remittance by id returned the check number and amount sent (400), payer literal `TEST HEALTH PLAN`, `companyId` and `payerId` null, posting status 8 (Discarded), and two claim payments each with `status` 1 and `exceptions` `[3]` (not decoded). That ERA carried a payee tax id that matches no company in the organization, which is why it was discarded and absent from pending checks. A second ERA with the same content and no payee tax id came back with posting status 1 (New) and appeared in pending checks. The claim numbers were generated and do not exist in that organization.

Snapshot values seen on ninja the same day: the discarded remittance returned `isDeleted` true and `postingStatus` 8; the live one returned `isDeleted` false and `postingStatus` 1. Both returned the check number and amount sent and a claim count of 2, with `companyId` and `payerId` null.

Current-state lookups seen on ninja the same day: `POST /remittance/reconciliation/discarded-checks` with the check number returned the discarded remittance for its check number and an empty list for the live one. `pending-checks` listed the live remittance and not the discarded one.

Claim-based upload confirmed on ninja the same day: an ERA built from claim ALP1000260B1 through the claim lookup (secondary claim, payer position 2, real company tax id) returned Accepted, the snapshot showed it live with the company, payer and claim linked, and the check appeared in pending checks. After the user reconciled it, the claim appeared in the claims list with the payment looking reasonable.

The page engine, on ninja the same day: an upload of a small ERA (856 bytes, 213 ms) returned Accepted with a verdict of live; the stored file was read back into the engine inside the page (2 claims, 3 services); the current-state check found the remittance in pending checks, not in discarded checks, and the remittance-processing view returned 200 with the same check number, amount and 2 claim payments.
