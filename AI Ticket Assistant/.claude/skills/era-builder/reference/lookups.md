# Data lookups

All lookups are read-only and run in the same Chrome tab and with the same headers as the upload (see `send-via-chrome.md`): a tab on `https://sdsh.unlimitedfinancials.{env}/{organizationId}/`, `credentials: 'include'`, header `org-id-req`. Org data is fetched live each time. Never store it in the skill.

Two tool habits:
- A fetch that is awaited inside `javascript_tool` sometimes times out even though the request took milliseconds. Start the request without awaiting, store the result on `window`, return `'started'`, then read `window.<name>` in a second call.
- Show ids in full.

"Confirmed" means called live on ninja on 2026-10-14. Everything else is from the service specs and is unconfirmed.

## Paths

| Service | Path style | Example |
|---|---|---|
| Resources (companies) | prefix `/snowdrop/resources` | `/snowdrop/resources/companies` |
| Invoices (claims) | prefix `/snowdrop/invoices` | `/snowdrop/invoices/claims/claimnumbersearch` |
| Remittance processing | prefix `/snowdrop/remittanceprocessing` | `/snowdrop/remittanceprocessing/claims/search-by-claimnumber` |
| Remittance processing, claims by company or patient and date of service | prefix `/snowdrop/remittanceprocessing` | `/snowdrop/remittanceprocessing/claims/search-by-patient` (unconfirmed, see `claim-sampling.md`) |
| Payers | flat | `/payers` |
| Patients | flat | `/population/patients/search` |
| Remittance (this API) | flat | `/remittance/era-upload` |

## Company by name (confirmed)

- `GET /snowdrop/resources/companies` returns an array (9 in the test organization) with `companyId`, `name`, `taxId`, `active`, `autoReconcileOnZeroPayments`. Filter by name in the skill. Add `?includeInactive=true` to include inactive ones.
- `GET /snowdrop/resources/companies/{companyId}` adds `npi` and `legalName`.
- Fills: `payee.name` from `name`, `payee.taxId` from `taxId`, `payee.idCode` from `npi`. Using a real company's tax id is what stops the remittance being discarded.

## Payer by name and payer literal (confirmed)

- `GET /payers/aggregate` returns every payer in one array (70 in the test organization): the 29 insurance payers from `GET /payers` plus the 41 assistance payers from `GET /payers/assistance`. Each has `payerId`, `payerName`, `payerType`, `isInactive`. Filter by `payerName` in the skill. Search this list, not `GET /payers`: assistance payers such as The Dragonfly Foundation are not in `GET /payers`.
- Fills: `payer.name` from `payerName`.
- The upload resolves the payer from a payer-name mapping (the "payer literal") kept by the remittance service. Read a payer's literals with `GET /remittance/reconciliation/payer-literals/{payerId}`, which returns `{ "payerLiterals": [ ... ] }` (confirmed on ninja 2026-10-14).
- The literals are stored normalized: trimmed and upper-case. The upload normalizes the ERA's payer name the same way, so using a returned literal as `payer.name` resolves that payer.
- An empty list means no mapping exists for that payer (also returned for an unknown payer id, with status 200). Say so, and say that a payer name typed on a new ERA will not resolve a payer by name unless a mapping exists. The payer is also taken from the ERA's claims when they match claims in the organization (confirmed: an ERA for a claim of The Dragonfly Foundation, which has no literal, resolved that payer).
- A literal maps to one payer. In the test organization `AUTOMATION PAYER` maps to Cigna only, even though an Aetna remittance once carried that text, so a literal seen on an old remittance is not proof of the current mapping. Use this route, not remittance history.

## Stored ERA file (confirmed)

- `GET /remittance/era-upload/{uploadId}` returns the original file of an upload as `text/plain`, byte for byte (confirmed by length and SHA-256 against the uploaded files). It returns 404 for an unknown upload id.
- Get `uploadId` from `GET /remittance/reconciliation/remittance-snapshot/{remittanceId}`. A remittance that was not created by an upload has none.
- The response carries an `X-Content-Sha256` header, but a script running in the page cannot read it (it is not exposed to browser scripts); compute the hash in the page with `crypto.subtle.digest` if one is needed.
- A stored file can hold several checks. The reader makes one check per transaction.
- Use `__era.fetchStored({remittanceId, dropCheckNumbers})` (see `engine.md`): it does both calls and reads the file into the model inside the page, so the file never passes through the tool, whatever its size. Confirmed on ninja on 2026-10-14.
## Patient by name (confirmed)

- `GET /population/patients/search?query=<text>&top=<n>` returns `{ totalsHits, includedHits, results[] }`. Each result is `{ score, patient }`. `patient` has `patientId`, `financialAccountNumber`, `firstName`, `middleName`, `lastName`, `suffixName`, `birthDate`, address fields, `isTestPatient`.
- Fills: `claim.patient.first/middle/last/suffix`. `financialAccountNumber` is the provider's account number, not the payer's member id; the claim number flow sets `claim.patient.id` from the policy number instead.

## Claim by claim number (confirmed for professional electronic claims)

A claim number can match more than one claim. The test claim `COMP1000357A1` matched a primary claim (payer position 1) and a crossover claim (payer position 2). When there is more than one match, show them and ask which one.

1. Find the claims. Either call returns an array:
   - `POST /snowdrop/invoices/claims/claimnumbersearch` with `{ "claimNumber": "<number>" }` returns `claimId`, `invoiceNumber`, `invoiceType` (for example `Professional Electronic`, `Crossover`), `claimStatus`, `payerId`, `payerName`, `planName`, `claimTotal`, `chargeBalance`, `dateOfService`, `chargeIds[]`.
   - `POST /snowdrop/remittanceprocessing/claims/search-by-claimnumber` with `{ "claimNumber": "<number>", "companyId": "<company id>" }` returns an array (the spec says a single object; the live response is an array) with `claimId`, `claimNumber`, `claimType`, `isPaid`, `payerId`, `payerPosition`, `planId`, `claimBalance`, `patientId`, `patientName`, `patientFan`, `startDate`. Observed `claimType` values: 4 for Professional Electronic, 6 for Crossover.
2. Load the claim's detail. The route depends on the claim type:
   - Professional Electronic: `GET /snowdrop/invoices/claims/{claimId}/change-healthcare/professional` (confirmed). The `cms1500` and `ub04` workspace routes return 404 for this type.
   - Institutional claims: the equivalent route is expected to be `GET /snowdrop/invoices/claims/{claimId}/change-healthcare/institutional` (from the spec; not yet called, because no institutional claim number was available). The only claim types in scope are professional and institutional.
   - Crossover: `GET /snowdrop/invoices/claims/{claimId}/crossover` (confirmed). Same patient, policy, company, billing provider and charges blocks, but no service lines (no units) and no subscriber.
   - Other types are unconfirmed and out of scope. From the spec: institutional electronic `GET /claims/{claimId}/change-healthcare/institutional`, paper professional `GET /claims/{claimId}/cms1500/workspace`, paper institutional `GET /claims/{claimId}/ub04/workspace`, crossover `GET /claims/{claimId}/crossover`. Try the matching one, and say it was not confirmed if it fails.
3. What the professional view holds, and where it goes in the model:

| View field | Model field |
|---|---|
| `invoiceNumber` (the claim number) | `claim.claimNumber` |
| `patient.firstName`, `lastName` | `claim.patient.first`, `last` |
| `policy.policyNumber` | `claim.patient.id` (the member id); `claim.insured` only when the subscriber differs from the patient |
| `policy.payerName`, `policy.policyNumber` | check `payer.name`; `claim.insured.id` |
| `billingProvider.npi` | `claim.serviceProviderId` |
| `invoiceTotal` | `claim.billed` |
| `dateRangeStart` | `claim.date` |
| `charges[]`: `chargeCode`, `modifiers` (strings), `dateOfService`, `fee` | `service.procedure`, `modifiers`, `serviceDate`, `billed` |
| `serviceLines[]`: `units` (a string), `chargeAmount` | `service.units` |
| `icn` (null in the test claim) | `claim.icn` (generated when null) |

   The view's `company` has only the id and name. Get the tax id and NPI from the company lookup above.
4. Claim status on the ERA follows the payer position: 1 primary, 2 secondary, 3 tertiary (the remittance matches a claim by claim number and payer responsibility).
5. Paid amounts and adjustments are not in the claim. Default to the full fee paid, and change them as the user asks.

The review route `GET /snowdrop/invoices/review/{claimId}` also works (confirmed), but returns only a header, and its `invoiceNumber` was 0 for the test claim. Do not use it for the claim number.
