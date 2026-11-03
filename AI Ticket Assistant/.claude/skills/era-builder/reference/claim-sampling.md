# Large remittances from real claims (prototype)

Builds an ERA from real claims in the target organization: one search call for a company (or a patient) on a date of service, a random pick from the result, then one claim view per picked claim. Real claim numbers and payer positions mean the claims link on upload. Prototype: the search route is taken from the service spec and has not been called yet, and timings are to be collected.

## Requirements to give the user

When the user asks for a large remittance, random claims, or "N claims from a company", say what is needed:

1. **Environment and organization**, with the browser signed in (see `send-via-chrome.md`).
2. **A company or a patient.** Company id (find it with `name-lookup.md`), or patient details: last name, first name, financial account number, date of birth. All patient fields are optional; the company id alone returns the company's claims.
3. **A date of service**, one date, `yyyy-MM-dd`, or a range of dates. The search honours one date per call and claims usually span a day or so, so a single date rarely has many claims (the busiest date in a test company had 38). For hundreds of claims give a range: the engine runs one search per day in the range.
4. **A count.** Default is every claim found. One ERA is capped at 1,000 claims. More than 1,000 claims keep the message in blob storage, so the immediate validation cannot count or link claims.
5. **Optionally a payer id.** The search does not take one yet. The page filters the result by payer, so the whole company list is still returned.
6. **Payment.** Every service is paid in full with no adjustments. Change it afterwards with `edit` (see `engine.md`).

Also say: it makes about one request per claim (plus one for the search and one per company), so confirm before running more than about 100 claims, and the first run on an environment should be a small count.

## The search call

`POST /snowdrop/remittanceprocessing/claims/search-by-patient`, remittance-processing prefix, body `PatientClaimSearchRequest`:

```json
{ "lastName": null, "firstName": null, "patientFAN": null, "dateOfBirth": null, "dateOfService": "2026-10-15", "companyId": "<company id>" }
```

Every field must be present; the patient fields and `companyId` are nullable. Each result is a `ClaimSelectionDetails`: `claimId`, `claimNumber`, `claimType` (4 professional electronic, 6 crossover), `startDate`, `endDate`, `isPaid`, `patientId`, `patientName`, `patientFan`, `patientDateOfBirth`, `planId`, `snfId`, `payerId`, `payerPosition`, `encounters`, `claimBalance`. It has no charges, procedure codes, billing provider or company tax id, so each claim still needs its view.

Unconfirmed: whether the response is an array or a single object (the spec says one object; the live `search-by-claimnumber` returned an array despite the same spec shape; the engine accepts either), the format of the date fields, and any result cap. `findClaims` reports the field names of the first result and the first 200 characters of an error or unrecognised body, so the first run confirms these.

## Running it

Start the Chrome tab and load the engine (`engine.md`), then:

1. `__era.findClaims({ dateOfService: '2026-10-15', companyId: '<id>' })` (add `payerId` to filter in the page; add `patient: { last, first, fan, dob }` for a patient search). For a range use `dateFrom` and `dateTo` instead of `dateOfService`: one search per day, 8 at a time, days in random order, results merged by claim id. Add `stopAt: N` to end the scan once about N claims are found (it can overshoot by the searches already in flight), so a sample of 100 does not scan hundreds of days. Poll `__era.state`. It holds `status`, `ms`, `count`, `payers`, `keys`, and for a range `dates`, `searched`, `failed`, `daysWithClaims`, `avgMs`, `p95Ms`, `maxMs`, `stoppedEarly`, `filteredOut` (other payers), `skippedByType`. Report the search timings with the build timings. Read `__era.out.byPayer` for claims per payer and `__era.out.claims` for the list (slices of 600 characters with `read('claims', i)`).
2. Show the count and the claims per payer, and ask how many to build.
3. `__era.buildClaims({ count: 50 })` (options: `concurrency`, default 8; `max`, default 1000; `append: true` to add to the current model instead of replacing it). Poll `__era.state` (`built`, `failed`, `total`). Claims are picked at random from the list. One check is made per payer and company, with the payee from the company and the status from the claim's payer position.
4. Read `__era.out.build`: `built`, `failed`, `firstFailures`, `checks`, `ms`, `calls`, `avgMs`, `p50Ms`, `p95Ms`, `maxMs`, `msPerClaim`. Report these to the user as the timing.
5. `view()` gives the usual summary. The ERA is paid in full and balanced. Continue with the normal send steps. An ERA this large cannot be saved as a file (over 30,000 characters); say so if the user asks.

Service amounts: the charge `fee` in a claim view can be 0 when the charge is already settled, while the service line's `chargeAmount` holds the amount billed (the line amounts add up to `invoiceTotal`). Charges with the same code can also share one `chargeId` in the service lines, so a lookup by charge id misses some. The build therefore makes one service per service line (code, units, `chargeAmount`, with the date taken from the matching charge) and uses the charges and their fee only when a view has no service lines. `out.build.zeroBilledServices` counts services that still have no amount; tell the user if it is not 0, because a zero-billed service makes a poor test ERA.

Claims that return no view or have no charges are skipped and listed in `firstFailures` with their claim type.

## Claim types

`claimType` in the search result is the `ClaimType` enum:

| Value | Name | On an ERA |
|---|---|---|
| 0 | Professional Paper | No. Printed, not remitted. Its only view route is `/cms1500/workspace`. |
| 1 | ANSI 5010 Professional | No claim view route is known here, so it is excluded. |
| 2 | Institutional Paper | No. Printed, not remitted. |
| 3 | ANSI 5010 Institutional | No claim view route is known here, so it is excluded. |
| 4 | Professional Electronic | Yes. `change-healthcare/professional` view, confirmed. |
| 5 | Institutional Electronic | No. Left out: the `change-healthcare/institutional` view has no `serviceLines`, and in the claim checked the charge fee and `invoiceTotal` were both 0, so there is no billed amount. |
| 6 | Crossover | Yes. `crossover` view, confirmed. |

`findClaims` keeps types 4 and 6 by default and reports the others it dropped in `skippedByType` (for example `0:24` is 24 paper professional claims). Institutional claims are not offered. Without the filter, paper claims fail with "no claim view" (17 of 100 in a test), which wastes calls and lowers the built count.

## Requirements for the API change

If the user asks what would make this better, or how to avoid loading the whole company list, the change under consideration is an optional `payerId` on `PatientClaimSearchRequest`:

- Optional and nullable, so existing callers are unaffected. When set, only claims whose payer matches are returned.
- The search should keep honouring `dateOfService`, and should return an array.
- Optional `claimTypes` filter, so paper claims are not returned.
- Optional `dateOfServiceFrom` and `dateOfServiceTo`, so a range is one call instead of one call per day (a range of two years is about 780 calls today).
- A limit or paging parameter, so a large company does not return every claim.
- Ideally the result includes `companyId`, so the claim view call is not needed to find the company.

To test it once deployed, call `findClaims` with `payerIdInRequest: true` so the payer id goes in the request body instead of being filtered in the page.
