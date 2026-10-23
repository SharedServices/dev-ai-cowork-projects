# Procedure: Rule sequence order in Remittance Processing

| | |
|---|---|
| Original ticket | UF-16594 "RP Rules running out of order causing Dispute Flag" - https://sharpfm.atlassian.net/browse/UF-16594. Ticket folder: `tickets/UF-16594/` (investigation log in `summary.md`, evidence in `downloads/`). QA ticket: UF-16636. |
| Fix under test | Repo `snowdrop-remittance-processing-be`, branch `features/UF-16594-out-of-order-sequence-execution` (last commit `8723a968`). Key commits: `9dc02da0` moves the Reassignment block to follow Suppression; `18d03d27` drives the order from `PreDefinedSequences`. Merged into the ninja branch (`b6aa042b`) and deployed on ninja when these runs were made. |
| Status | Run on ninja (Tests 1, 2, 3A to 3D) and on team (the same six runs, with a different claim; see Appendix A.5). |
| Environments run in | ninja, organization `7516f05b-68d9-4095-9edd-348f4b1788c4`, 2026-10-21. team, organization SDHB-1 (Herbert Test 1) `bdeab2ce-cfbc-4280-8338-edce0fcbae06`, 2026-10-21. |
| Environments allowed | Non-production only. See the `api-testing` skill. |
| Related skills | `api-testing` (general rules, browser mechanics), `era-builder` (test ERA files; optional), `splunk-search`, `ticket-workflow`. |
| Last updated | 2026-10-21 |

How facts are marked:
- **Confirmed** - observed in a run described in Appendix A.
- **From code** - read in `snowdrop-remittance-processing-be` (feature branch commit `8723a968`); not independently run.
- **Inferred** - a conclusion drawn from the two above. Treat as an assumption.

The general rules for running any API test (environment safety, approval before writes, investigating existing state, evidence, reporting, browser mechanics) are in the `api-testing` skill. This document holds only what is specific to this scenario. It is written so that a Claude without access to the backend source can repeat the tests.

Contents: 1 Purpose, 2 Scenario-specific safety, 3 Prerequisites, 4 Background knowledge, 5 API reference, 6 Step-by-step procedure, 7 Test definitions, 8 Reading the results, 9 Lessons and gotchas, 10 Not verified, Appendix A sample data, Appendix B snippets.

---

## 1. Purpose

Charge payments in a remittance are evaluated by rule sequences in a fixed order. UF-16594 fixed a defect where the Adjudication Code Reassignment sequence ran last instead of second, so a dispute rule could fire on a code that a reassignment rule was meant to change first.

These tests show, through the deployed API and Splunk:
1. **Test 1 (ordering):** when a Reassignment rule and a Transfer dispute rule both apply to one charge payment, the reassignment happens first and no dispute is raised.
2. **Test 2 (control):** with the Reassignment rule not applying, the same data does raise the dispute. This proves the dispute rule would have fired in Test 1 if the order were wrong.
3. **Test 3 (other sequences):** Suppression, Denial and Underpayment still do what their rules say.

The same pattern (a control that removes one rule, plus one scenario per sequence) can be reused for other sequence-order questions.

---

## 2. Scenario-specific safety

- **Rule deletion is a hard delete with no restore.** `PUT .../{ruleId}/delete` removes the rule from the read model, and there is no restore endpoint for rules. To switch a rule off for a control run, update its qualifier instead (step 10). Delete test rules only at cleanup, one at a time, after the user agrees to each.
- Test rules and the remittances created by the ERA uploads stay in the organization after the run. List what was left and ask the user what to do with it. (A discard route for remittances exists; it was not used in these runs.)
- Name every test rule `{ticket key} Test - ...` so the rules can be found and removed.

---

## 3. Prerequisites

- The standard browser setup in the `api-testing` skill (`references/browser-api-mechanics.md`): Claude in Chrome connected, a tab signed in to the organization, Splunk reachable in the same browser.
- A **primary** claim (payer position 1) with one charge in the target organization, and the user's agreement to upload remittances for it.
- Optional: the `era-builder` skill, whose scripts render the X12 file in Node (`scripts/` in the skill's folder, which is read-only when the skill is installed; copy the three scripts it names to a working folder before running them). It can also send the file from the Chrome tab. Without it, build the X12 by hand from step 7 and Appendix A.
- Access to the ticket folder `tickets/UF-16594/` (or the folder of the ticket this run is recorded under) for evidence, per the `ticket-workflow` skill.

---

## 4. Background knowledge

### 4.1 Sequence order for charge payments
Charge-level sequences run in this order for every charge payment (**from code**: the fixed build iterates `PreDefinedSequences.Sequences`; **confirmed** by `GET .../remittance-processing-sequences`, field `order`):

| Order | Sequence | Sequence id | Behavior categories |
|---|---|---|---|
| 1 | Adjudication Code Suppression | `e6f6aa9e-94f6-4c04-abc0-eb17f242e506` | 8 SuppressAdjudicationCode |
| 2 | Adjudication Code Reassignment | `e6f6aa9e-94f6-4c04-abc0-eb17f242e500` | 1 ReassignAsAdjustment, 2 ReassignAsTransfer, 10 TransferToGuarantor, 11 AdjustToZero |
| 3 | Denial Intervention | `e6f6aa9e-94f6-4c04-abc0-eb17f242e501` | 3 DisputeDenial |
| 4 | Transfer Intervention | `e6f6aa9e-94f6-4c04-abc0-eb17f242e503` | 5 DisputeTransfer |
| 5 | Underpayment Intervention | `e6f6aa9e-94f6-4c04-abc0-eb17f242e502` | 4 DisputeUnderpayment |
| 6 | Transition Episode | `e6f6aa9e-94f6-4c04-abc0-eb17f242e509` | 9 TransitionEpisode |
| 7 | Discard Claim Payment (claim level) | `e6f6aa9e-94f6-4c04-abc0-eb17f242e504` | 6 DiscardClaimPayment |
| 8 | Post Claim Payment (claim level) | `e6f6aa9e-94f6-4c04-abc0-eb17f242e505` | 7 AutomaticallyPostRemittance |

Sequence ids are the same in every organization. The order is fixed by design and cannot be changed from the UI or API. Before the fix, Reassignment ran after Transition Episode (sixth, not second); **from code**.

### 4.2 How one rule is evaluated (from code)
For each charge payment and each sequence in order:
1. The sequence's rules are narrowed by **qualifiers**: for each qualifier attribute (charge code, payer, adjustment reason, transfer reason, remark code, and so on), the rule must match the charge payment's current values. A rule with several qualifier attributes needs all of them to match. Exclusionary element qualifiers match everything except the listed element.
2. Rules whose start or end date does not cover the check date are skipped.
3. The rule's behavior then runs. It can return **Continue** (no effect, the next rule is tried) or **ActionMatched** (events are recorded).
4. The log line `Rule action matched, adding events and skipping remaining rules` is written for ActionMatched. At charge level the code then continues with the next rule in the same sequence; the wording of the log line is not accurate for charge-level rules (**from code**, effect untested).
5. Rules in a sequence are ordered by their position in the sequence; new rules are added at the end.

**Why the order matters (from code):** the Reassignment behavior updates the charge payment held in memory (it removes the reassigned transfer and adds the adjustment) before later sequences run. Later sequences, including their qualifiers and thresholds, see the changed charge payment. So a Transfer dispute rule that runs after Reassignment no longer sees the transfer.

**Inferred:** in Test 1 the dispute rule probably dropped out at its own PR-45 qualifier, because PR-45 is no longer among the charge payment's transfers. If a dispute rule were qualified on something unrelated (for example the charge code), it would drop out at its threshold check instead, because the total transferred is then 0. Either way no dispute is raised.

### 4.3 What each behavior does (from code)

| Behavior | Fires when | Effect |
|---|---|---|
| ReassignAsAdjustment, category Transfer | the charge payment has transfers whose reason matches the behavior's `ReceivedReasons` element list (and, if `OnlyOnReconciliationOrReprocessing` is true, the request is a reconcile or reevaluate) | each matching transfer is replaced by an adjustment with the reason id `ReassignReasonId` and the same amount, group code and reason code. It always returns ActionMatched, even if nothing matched, so the log line proves only that the rule qualified; the line `Reassigning transfer code` (logged only when a transfer matched) proves a reassignment. After reassignment the charge payment shows the new reason id with the original group and code text (for example group `PR`, code `45`, reason id of CO-45). |
| Suppression | `OnlyWhenPreviousPaymentReceived`, `OnlyOnReconciliationOrReprocessing` and `OnlyIfReversalOfPrevious` allow it (all false in these runs) | removes every adjustment and transfer whose reason is in `SuppressedReasons`. Always returns ActionMatched. |
| DisputeDenial | the charge payment is on the EOB, **paid amount is exactly 0**, and the denial conditions hold | marks a Denial dispute (dispute type 16, exception 15) |
| DisputeTransfer | the charge payment is on the EOB, the payer qualifies, and **total transferred (all transfers, not only the qualifier's reason) is at least `AmountThreshold`** | marks a Transfer dispute (type 32, exception 17) |
| DisputeUnderpayment | the charge payment is on the EOB, **paid amount greater than 0**, **expected amount greater than 0**, **payer position is 1**, and `expected - paid - total transferred` is positive and above the percent and/or amount thresholds (`IsAnded` selects both versus either; `UseAllowed` true uses the EOB allowed amount instead of paid) | marks an Underpayment dispute (type 64, exception 16), **unless the charge payment already has a Denial dispute** |

Consequence: Denial (paid 0) and Underpayment (paid above 0) can never both fire on one charge payment, so their relative order cannot be observed on a single charge payment.

### 4.4 Rule configuration shapes (confirmed, accepted by the API)
- `ruleAction`: 1 Update, 2 Hold for manual review, 3 Update and hold. `releaseType`: 0 None, 1 RetryAll, 2 RetrySequence, 3 RetryLast, 4 GotoNext. For `ruleAction` 1 the server forces `releaseType` to 0, so send 0.
- `behaviorCategory`: see the table in 4.1.
- **qualificationConfiguration** (all payers): `{"AllPayers":true,"PayerPositions":[],"InvoiceNumberPrefix":null,"ExcludeClaimsWithMatchingPrefix":false}`.
- **Qualifier**: `{"attributeType":<n>,"setQualifiers":[],"elementQualifiers":[{"elementId":"<guid>","exclusionary":false}]}`.
- **Qualifier attribute types** (`GET .../remittance-processing-charge-rules/qualifiers`): 4 Divisions, 7 Modifiers, 8 Ordering Providers, 11 Billing Providers, 12 Charge Codes, 13 Facilities, 14 Payers, 15 Companies, 19 Remark Codes, 20 Transfer Reasons, 21 Adjustment Reasons, 22 Next Payers, 23 Previous Payers, 33 Charge Modifiers.
- The behavior configurations used are in Appendix A.2. Property names inside `behaviorConfiguration` are PascalCase (as stored); the rest of the body is camelCase.
- `ReasonCodeCategory` inside the Reassignment behavior: 1 Adjustment, 2 Transfer. For a transfer-to-adjustment rule `Category` is 2 (the source category). `ReceivedReasons.AttributeType` is 21 in the accepted body; the engine matches on the element ids in `ReceivedReasons.ElementQualifiers` against the charge payment's transfers (**from code**).

### 4.5 Enum values seen in results
- **Dispute type** (flags): 0 None, 1 User, 16 Denial, 32 Transfer, 64 Underpayment.
- **Payment exception** (selected): 3 Invoice Not Found, 6 Credit Balance (user-stated, team 2026-10-21: the test payment on a claim that was already paid created a credit balance; it stayed on charge payments that no dispute replaced, and was replaced by 16 on 3C and 3D; the user said the payment would be discarded after the test), 7 Balance Remaining (undisputed balance remains; expected on a partly paid charge), 15 Denial, 16 Underpayment, 17 Excess Transfer (transfer dispute), 29 shown by the user as Payer Mismatch (the claim's payer differs from the payer the check resolved to; not blocking).
- **Posting status** of a remittance: 1 New, 2 Reconciled, 3 Posting, 4 Posted, 5 Empty, 6 Building, 7 Ready, 8 Discarded, 9 Archived. Status 7 (Ready) is normal for a live check (user-stated, team 2026-10-21). Seen on team: Test 1 and Test 2 read 7 at the first snapshot read; 3B (zero-dollar) read 2 at first and 7 at the clean-up read; 3A read 1 at first and 7 at the clean-up read; 3C and 3D read 1 both times.
- **ERA upload response**: `outcome` 0 Accepted, 1 PartlyProcessed, 2 DuplicateWarning (nothing created), 3 Rejected; check `status` 0 Created, 1 NotCreated, 2 DuplicateWithheld, 3 Failed.

### 4.6 Catalog (reason code) ids
System catalog ids (constants) used by `GET https://api.unlimitedfinancials.{env}/snowdrop/catalogs/administration/{catalogId}/elements`:
- Contractual adjustment reasons: `37C2861D-D8E6-42AF-8B9E-22A75EA169B5`
- Transfer reasons: `53DA4A4E-CE82-4426-9141-C299CFCF915F`

Element ids seen on ninja (**look them up again in any other environment or organization**; the response lists `elementName` such as `PR-45` and `elementId`):
- Transfer reason PR-45: `7bfc35aa-29db-42d8-ba0b-a770fc0384b8`
- Adjustment reasons: CO-45 `f32b38ab-d290-4bee-94dd-dcca858a5600`, OA-23 `e5f49aba-b919-4d69-ba03-4dfb143aa5d6`, CO-50 `ff3e2bc5-d17e-423d-b3b9-270898321895`, CO-253 `299b7a9b-749b-47e3-916e-39a26a991002`

On team (2026-10-21, organization SDHB-1) the PR-45 transfer element, and the CO-45, OA-23, CO-50 and CO-253 adjustment elements, had the same ids as on ninja and none was expired (**confirmed**). Still look them up in any other environment or organization.

An ERA adjustment `CAS*CO*45*...` is matched to the element named `CO-45` (group-reason). A `CAS*PR*45*...` line is treated as a transfer when `PR-45` is in the transfer reasons catalog.

### 4.7 Timing (confirmed)
- A new or changed rule needs several seconds to take effect. Wait at least 15 seconds after the last rule write before uploading an ERA.
- After an upload, the claim payment appeared in the search within about 10 seconds, but dispute flags and reassignment results can be written a few seconds later. Read the claim payment, wait 6 to 8 seconds, and read it again before judging.
- The remittance snapshot is available about 2 seconds after the upload response.
- **Team (confirmed):** a read 3 seconds after the upload can return no claim payment at all (3A, 3B), or the state before the rules ran (Test 1 still showed the PR-45 transfer and CO-45 39.00; 3C and 3D showed no dispute and exception 6). A read 7 seconds later showed the final state in all six runs. Always read twice, as above.

### 4.8 Payer literal mapping (confirmed)
The payer the check resolves to comes from the payer literal (the payer name on the ERA) mapped by the last payer a user entered for it in the Bank Reconciliation panel. In UF-16594 the literal "Blue Cross" was tied to Aetna, so the remittances resolved to Aetna and claim payments carried exception 29. The user corrected the mapping and the exception stopped. Check the snapshot's `payerId` after the first upload; if it is not the claim's payer, report it and ask. The rule tests are not affected by it. Business fact: `repos/snowdrop-remittance-be/business-logic/PayerLiteralMapping/CLAUDE.md`.

### 4.9 Zero-dollar checks (optional)
A check with amount 0 and every claim paid 0 is auto-reconciled on upload when the company and payer are found and no other active check has the same check number (posting status 2). Rules ran normally on these checks. This was convenient because no manual reconcile was needed, but it is **not required**: a check with a non-zero amount can be used, then reconciled manually in Bank Reconciliation (the reconcile route was not used in these runs). Only the zero-dollar variant was run on ninja. **On team (confirmed)** the rules also ran on non-zero checks that stayed unreconciled: 3A (check amount 5.00), 3C and 3D (2.00) stayed at posting status 1 at the first snapshot read, and their rules fired as expected. Manual reconcile was still not run.

### 4.10 Payee without an NPI (confirmed on team)
If the claim's company has no NPI (`GET /snowdrop/resources/companies/{companyId}` returns `npi` null), leave out the `XX*{npi}` part of the payee line: send `N1*PE*{company name}` and `REF*TJ*{tax id}`. This uploaded, linked to the claim and ran the rules on team (organization SDHB-1, company Cosmo Company).

---

## 5. API reference

All calls: header `org-id-req: {organizationId}`, session cookie sent by the browser (see the `api-testing` skill). Base URLs use the ninja API host; replace `ninja` for another environment after confirming the host.

### 5.1 Remittance processing (prefix `/snowdrop/remittanceprocessing`)
| Purpose | Call |
|---|---|
| List sequences with their rules and order | `GET /remittance-processing-sequences` |
| Rules in one sequence | `GET /remittance-processing-sequences/{sequenceId}/rules` |
| All charge rules | `GET /remittance-processing-charge-rules` |
| One rule (full detail) | `GET /remittance-processing-charge-rules/{ruleId}` |
| Rule name unused? | `GET /remittance-processing-charge-rules/names/isunique?name={name}` returns `true` or `false` |
| Valid qualifier attributes | `GET /remittance-processing-charge-rules/qualifiers` |
| Create rule | `POST /remittance-processing-charge-rules` with the body in 5.2; returns the new rule id as a JSON string |
| Update rule | `PUT /remittance-processing-charge-rules/{ruleId}/update` with the body in 5.3; returns 200 with an empty body |
| Delete (hard) | `PUT /remittance-processing-charge-rules/{ruleId}/delete` |
| Claim payments of a remittance | `POST /remittances/{remittanceId}/claimpayments/search` with body `{}` |
| Dispute types of a claim payment | `GET /remittances/{remittanceId}/{claimPaymentId}/disputes` returns `{ "disputes": { "{chargePaymentId}": <dispute type> } }` |
| Reevaluate a claim payment | `PUT /remittances/{remittanceId}/{claimPaymentId}/reevaluate` (exists; not used in these runs) |

Claim payment search result, fields used: `claimPaymentId`, `status`, `exceptions[]`, `chargePayments[]` with `chargePaymentId`, `isDisputed`, `isDisputedUserSet`, `exceptions[]`, `adjustments[]` (`reasonId`, `groupCode`, `reasonCode`, `amount`), `patientResponsibilities[]` (transfers: `reasonId`, `groupCode`, `reasonCode`, `amount`), `paidAmount`, `expectedAmount`, `billedAmount`. Map `reasonId` to a name with the catalog list (4.6).

### 5.2 Create-rule body
```json
{
  "sequenceId": "<sequence id, lowercase accepted>",
  "name": "UF-16594 Test - <short name>",
  "description": "<up to 250 characters>",
  "userGuidance": "<up to 250 characters>",
  "behaviorCategory": 1,
  "startDate": null,
  "endDate": null,
  "qualifiers": [ { "attributeType": 20, "setQualifiers": [], "elementQualifiers": [ { "elementId": "<guid>", "exclusionary": false } ] } ],
  "sameDateOfServiceQualifiers": [],
  "episodeQualifier": null,
  "ruleAction": 1,
  "releaseType": 0,
  "behaviorConfiguration": { },
  "qualificationConfiguration": { "AllPayers": true, "PayerPositions": [], "InvoiceNumberPrefix": null, "ExcludeClaimsWithMatchingPrefix": false }
}
```
The server rejects an invalid `behaviorCategory`, `behaviorConfiguration` or qualifier attribute with HTTP 400 and does not save anything.

### 5.3 Update-rule body
Read the rule with GET, change the fields wanted, and send everything back with `ruleId` and `modifiedDate`:
`ruleId, name, description, userGuidance, behaviorCategory, startDate, endDate, qualifiers, sameDateOfServiceQualifiers, episodeQualifier, ruleAction, releaseType, behaviorConfiguration, qualificationConfiguration, modifiedDate` (ISO timestamp). Confirmed uses: change `AmountThreshold`; flip `exclusionary` on a qualifier element.
**Team (confirmed):** the rule read (`GET .../{ruleId}`) has no field named `modifiedDate`; it returns `lastModifiedDate` (and `createdDate`, `createdByUserId`, `lastModifiedByUserId`, `sequenceId`, `reviewRequired`, `netType`). Send the read's `lastModifiedDate` value as `modifiedDate`. Two updates were accepted with it (HTTP 200, empty body). After the first update the read-back showed the new qualifier value but an unchanged `lastModifiedDate` (cause not known), so on the second update the same `modifiedDate` was sent and accepted.

### 5.4 Other services used
| Purpose | Call |
|---|---|
| Find a claim by number | `POST /snowdrop/invoices/claims/claimnumbersearch` body `{"claimNumber":"..."}`; returns one entry per claim (primary and crossover) with `claimId`, `invoiceType`, `payerId`, `payerName`, `chargeBalance`, `chargeIds[]` (`chargeId`, `chargeCode`, `fee`, `balance`) |
| Claim detail, professional electronic | `GET /snowdrop/invoices/claims/{claimId}/change-healthcare/professional` (crossover: `.../crossover`) |
| Company | `GET /snowdrop/resources/companies/{companyId}` (name, `npi`, `taxId`) |
| Payer position of a claim | `POST /snowdrop/remittanceprocessing/claims/search-by-claimnumber` body `{"claimNumber":"...","companyId":"..."}` returns an array with `claimId` and `payerPosition` |
| Catalog elements | `GET /snowdrop/catalogs/administration/{catalogId}/elements` |
| ERA upload | `POST /remittance/era-upload` (flat path, no `/snowdrop`), multipart form field `file`; no `overrideDuplicates` unless the user asks |
| Remittance snapshot | `GET /remittance/reconciliation/remittance-snapshot/{remittanceId}` (`postingStatus`, `isDeleted`, `checkNumber`, `checkAmount`, `companyId`, `payerId`, `payerLiteral`) |
| Pending checks | `GET /remittance/reconciliation/pending-checks` (array; use it to check a check number is unused) |
| Payer literals of a payer | `GET /remittance/reconciliation/payer-literals/{payerId}` |

### 5.5 Clean-up calls
| Purpose | Call |
|---|---|
| Delete a rule (hard, no restore) | `PUT /snowdrop/remittanceprocessing/remittance-processing-charge-rules/{ruleId}/delete`, no body. **Confirmed on team** (HTTP 200); list the rules afterwards to see them gone. Ask the user for each rule. |
| Discard a remittance | `POST /remittance/reconciliation/discard` with body `{"remittanceId":"{id}","isDeleted":true}`. **From code** (`RemittanceReconciliationController`, `Discard`), **confirmed on team**: HTTP 200 and the snapshot then shows `postingStatus` 8 and `isDeleted` true. Sending `isDeleted` false reverses it (from code, not run). Refused if the remittance has posted claim payments (from code). |
| Hide a discarded remittance | `POST /remittance/reconciliation/delete-discarded` (from code, not run). |
No route that sets a remittance to Archived (status 9) was found in `snowdrop-remittance-be` (from code); "archive" in a request therefore means discard unless the user says otherwise.

---

## 6. Step-by-step procedure

Each write step needs the user's approval first (see the `api-testing` skill). Report results after each step.

1. **Agree environment, organization, ticket and scope.** Confirm it is non-production, record the organization id, name the ticket whose folder receives the evidence, and agree which tests to run (Section 7).
2. **Prepare the browser** as described in the `api-testing` skill. Probe with a read-only call such as `GET /snowdrop/remittanceprocessing/remittance-processing-sequences`.
3. **Investigate the existing rules before designing the test rules.** List all sequences and the rules in each, and read every existing rule's detail (qualifiers, behavior, `OnlyOnReconciliationOrReprocessing`, payer qualification). Existing rules can change the result of a test. Seen in UF-16594: a Reassignment rule "Tx to Guarantor" (payer-scoped, reconciliation and reprocessing only), an auto-post rule on a payer, denial rules scoped to charge codes, and a suppression rule on an adjustment reason. Decide with the user: remove them first (the user did, which gave a clean organization), or scope the test rules by reasons and charge data that no existing rule matches. Never edit existing rules without the user's say. Record what was there.
4. **Choose the claim and charge.** Search the claim number. Use a **primary** claim (payer position 1; the Underpayment rule needs position 1), with a single charge if possible. Note the charge `fee`, `balance` and `chargeCode`. A claim that already shows "Remitted" can receive another remittance. Read company and billing provider from the claim detail so the ERA uses real data (step 7).
5. **Look up catalog element ids** for every reason code the tests use (4.6) and confirm none is expired.
6. **Create the rules** (Appendix A.2 has the bodies used). Check each name with `isunique`. After each create, poll GET until it returns 200 and compare category, sequence and behavior. For the ordering tests the transfer threshold must be at or below the transfer amount in the ERA, and the transfer amount must not exceed the charge's billed amount. In UF-16594 the first threshold of 100 was lowered to 5 for a charge with fee 9.13. Wait at least 15 seconds before uploading.
7. **Build each ERA.**
   - Use the claim's real claim number, patient name, member id (the claim's policy number) and billing provider NPI; the payee name, NPI (`N1*PE ... XX*{npi}`) and tax id (`REF*TJ`) of the claim's company; the payer name and address of the claim's policy; `CLP02` status equal to the claim's payer position. A claim number that does not exist in the organization is not linked, and rules do not run on unlinked charges.
   - **Leave out the payee tax id or use the real company's.** A tax id that matches no company makes the remittance be discarded after upload, while the upload still reports Created.
   - One service line per charge: `SVC*HC:{chargeCode}*{billed}*{paid}**{units}`. Billed minus paid must equal the sum of the adjustments on that line. Adjustments are `CAS*{group}*{reason}*{amount}` segments; one segment can hold up to four reason/amount pairs, written `CAS*CO*50*3**253*3` (an empty quantity element between pairs). Put the allowed amount in `AMT*B6*{allowed}`.
   - Check amount (`BPR02`) equals the sum of paid amounts. Use a new random 10-digit check number each time (`TRN*1*{number}`) and confirm it is not in the pending checks.
   - Segment terminator `~`, element separator `*`. `SE01` is the number of segments from `ST` through `SE` inclusive. The `ISA` segment is fixed width (106 characters including the terminator): copy it from Appendix A.3.
   - With the era-builder scripts, load a model, call `E.load(model)`, `E.view()` and `E.render(E.model).join('')` in Node (Appendix B, snippet 2).
   - Show the user the ERA contents (field table and the X12) before uploading.
8. **Upload.** Send the X12 as a multipart `file`. Expect HTTP 200, `outcome` 0 and check `status` 0 with a `remittanceId`. `outcome` 2 means a duplicate check number and nothing was created. Then read the snapshot: `postingStatus` 1 or 2 and `isDeleted` false mean the check is live; 8 or `isDeleted` true means it was discarded (usually a wrong payee tax id). Report `payerId` and `companyId` and compare them to the claim.
9. **Read the claim payment** (search with `{}`), wait 6 to 8 seconds and read again, then read the dispute types. Record adjustments, patient responsibilities (transfers), `isDisputed`, exceptions and dispute type for each charge payment.
10. **Control run (Test 2).** Update the Reassignment rule so its qualifier no longer matches: read the rule, set `exclusionary` to true on its PR-45 qualifier element, send the update, read it back, wait at least 15 seconds, then upload a second ERA with the same content and a new check number. Afterwards **restore** the qualifier (set `exclusionary` back to false) and read it back.
11. **Other sequences (Test 3).** Upload one ERA per scenario (Section 7) and read the results as in step 9.
12. **Splunk check.** Search `index="sharp-app-aks-{env}-king" Properties.RemittanceId="{remittanceId}" Properties.RuleId=*` over the last few hours and read selected fields only (see the `api-testing` skill, Splunk pattern). Expect one `Rule action matched` line per rule that matched.
13. **Record and clean up.** Save the ERAs, a results table and the Splunk lines in the ticket's `downloads/` folder, add a dated entry to `summary.md`, and ask the user what to do with the test rules and remittances. Cleanup calls are in 5.5 (rules: hard delete, one approval per rule; remittances: discard). Read the result back afterwards.

---

## 7. Test definitions

Common data: one primary claim with one charge, billed amount B. Transfer amount T (PR-45) must be at least the Transfer dispute threshold and at most B.

### Test 1 - ordering (Reassignment before Transfer dispute)
- Rules: Reassignment (category 1, source transfer reason PR-45, target adjustment reason CO-45) and Transfer dispute (category 5, threshold at or below T), both qualified on PR-45.
- ERA: paid 0, adjustments CO-45 (B minus T) and PR-45 (T).
- Expect: the charge payment has no PR-45 transfer, an adjustment under CO-45 for the full amount, `isDisputed` false, no dispute exception, dispute type 0. Splunk: `Reassigning transfer code` and `Rule action matched` for the Reassignment rule; no line for the dispute rule.

### Test 2 - control (dispute fires without Reassignment)
- Same rules and ERA as Test 1 with a new check number, after setting the Reassignment rule's PR-45 qualifier to exclusionary.
- Expect: `isDisputed` true, dispute type 32, exception 17, PR-45 transfer kept as patient responsibility. Splunk: `Transfer is disputed` and `Rule action matched` for the dispute rule; no Reassignment line.
- Restore the Reassignment qualifier afterwards.

### Test 3 - other sequences
Rules: Suppression of OA-23; Denial dispute qualified on CO-50; Underpayment dispute qualified on CO-253 (`UnderpaymentPercentThreshold` 10, `IsAnded` true, `UnderpaymentAmountThreshold` 1, `UseAllowed` false). Each rule is qualified on a reason that only its own scenario's ERA carries.
- 3A suppression: paid 5.00 with OA-23 1.13 and CO-45 3.00. Expect OA-23 gone, CO-45 3 kept, not disputed.
- 3B denial: paid 0 with CO-50 9.13. Expect disputed, type 16, exception 15.
- 3C underpayment: paid 2.00 with CO-253 7.13 on a charge whose expected amount is above 2.00. Expect disputed, type 64, exception 16.
- 3D combined: paid 2.00 with OA-23 1.13, CO-50 3.00, CO-253 3.00. Expect OA-23 gone and an Underpayment dispute (Denial cannot apply because paid is above 0).
- Not tested: Transition Episode (not set up in the organization), Discard and Post sequences, claim-level rules, reversals, multi-charge claims.

---

## 8. Reading the results

- A rule's `Rule action matched` log line means the rule qualified and ran. The Reassignment and Suppression rules log it even when they changed nothing; use the `Reassigning transfer code` line or the charge payment data for the effect.
- A rule that does not qualify writes nothing, so the absence of a dispute log in Test 1 does not by itself show order. The conclusion needs Test 2 (the dispute rule does qualify on this data) together with Test 1 (it did not fire when Reassignment applied). This is an **inference**; there is no log line showing both rules evaluated in order.
- A before-and-after comparison needs an environment that runs the build without the fix. None was available in UF-16594 (the fix was already in ninja), so only the fixed behavior was checked.
- Exception 29 and a payer id different from the claim's payer point to a payer literal mapping problem (4.8), not to the rules.

---

## 9. Lessons and gotchas

- Investigate the existing rules first (step 3). An existing payer-scoped or auto-post rule could change or hide the result.
- Scope each test rule by reason codes only the test ERA uses, so rules and ERAs do not interact across scenarios.
- Match the transfer dispute threshold to the charge: the claim used had a 9.13 fee, so the planned threshold of 100 never fired until it was lowered to 5.
- Choose the primary claim for Underpayment tests (payer position 1) and a charge whose expected amount is above 0.
- Use real claim data in the ERA. An unlinked claim number does not run the rules.
- Leave the payee tax id out, or use the company's real tax id, or the remittance is discarded after upload.
- Read the claim payment twice, a few seconds apart, before judging.
- The reassigned adjustment keeps its original group and code text (PR, 45) while carrying the new reason id (CO-45). Judge by the reason id, not the text.
- The Denial and Underpayment rules are mutually exclusive on one charge payment. A first prediction for scenario 3D (Denial wins) was wrong for that reason.
- Rules cannot be restored after deletion. Flip a qualifier for control runs and put it back.
- The Jira connector failed twice when posting a long comment; keep the comment text in a file so it can be posted by hand.
- On team, `GET .../remittance-processing-sequences` listed the rules per sequence correctly (0 everywhere before the test; 1 in each of orders 2 and 4 after the Test 1 and 2 rules were created), and `GET .../remittance-processing-charge-rules` returned the same rules. Both can be used to check the existing rules.
- Scale the amounts to the claim: on team the charge was billed 49.00 with expected amount 40.84, so the ERA used a PR-45 transfer of 10.00 (threshold 5) and adjustments that add up to the billed amount.
- Test 3D on team showed the Denial rule logging `Rule action continue, checking next rule` (it qualified on CO-50 but did not fire because paid was above 0), between the Suppression and Underpayment matches, in sequence order.

---

## 10. Not verified

- Environments `one` and `exchange`, and other organizations (including other organizations on team): ids, hosts and data may differ. Team was run once, in organization SDHB-1 only.
- Reconciling a non-zero check manually (on team the rules ran on unreconciled non-zero checks, but a manual reconcile was not run).
- Reevaluating a claim payment as a way to rerun rules (the route exists; not used).
- Multi-charge claims, secondary claims, reversals, and tests with a payer qualification other than all payers.
- Whether the log line `Rule action matched, adding events and skipping remaining rules` stops later rules in the same sequence at charge level (the code continues; not tested).
- The meaning of exception 29 beyond the user's statement (the enum value was not looked up).
- The meaning of exception 6 beyond the user's statement (credit balance from a test payment on an already paid claim); the enum value was not looked up.
- Why `lastModifiedDate` on a rule did not change after an update on team (5.3).
- Whether discarding the remittances cleared the credit balance on the claim.

---

## Appendix A. Sample data (ninja, 2026-10-21)

### A.1 Environment and data
- Organization: `7516f05b-68d9-4095-9edd-348f4b1788c4`. Application host `sd.unlimitedfinancials.ninja`, API host `api.unlimitedfinancials.ninja`.
- Claim COMP1000357A1, primary: claim id `aa82568a-bdaf-4ea5-9f1e-dd38ef36ddc8`, Professional Electronic, payer Blue Cross (plan BCBS Federal), payer position 1, charge 85025 (`fbeac5cb-4edd-40e5-b650-1bae4e3dabe5`), fee 9.13, balance 7.61, date of service 2026-01-05, patient McKean, Matt, member id 789, billing NPI 9975118111. The crossover claim (Aetna) is `ed5daa44-1c26-41a3-9889-3dc5483107d3`.
- Company: Kenwood Cancer Specialists, id `0f7724fd-88bf-494c-83be-be0a09fb9739`, NPI 1000000000, tax id 304823480.
- Payer Blue Cross address from the policy: PO Box 11387, Columbus, OH 43081. The payer id `3e501619-e0d0-4275-9384-8a873a5c1619` is Aetna (the payer the mapping wrongly produced).

### A.2 Rule bodies used (values in `behaviorConfiguration`)
Reassignment, Test 1 and 2 (sequence `e6f6aa9e-94f6-4c04-abc0-eb17f242e500`, rule `e6d40e0b-6794-4faf-91e7-356a148a4658`):
```json
{ "sequenceId": "e6f6aa9e-94f6-4c04-abc0-eb17f242e500", "name": "UF-16594 Test - PR-45 to CO-45 reassignment",
  "description": "UF-16594 ordering test: reassign PR-45 transfer as CO-45 adjustment", "userGuidance": "UF-16594 test rule",
  "behaviorCategory": 1, "startDate": null, "endDate": null,
  "qualifiers": [ { "attributeType": 20, "setQualifiers": [], "elementQualifiers": [ { "elementId": "7bfc35aa-29db-42d8-ba0b-a770fc0384b8", "exclusionary": false } ] } ],
  "sameDateOfServiceQualifiers": [], "episodeQualifier": null, "ruleAction": 1, "releaseType": 0,
  "behaviorConfiguration": { "Category": 2,
    "ReceivedReasons": { "AttributeType": 21, "SetQualifiers": [], "ElementQualifiers": [ { "ElementId": "7bfc35aa-29db-42d8-ba0b-a770fc0384b8", "Exclusionary": false } ] },
    "ReassignReasonId": "f32b38ab-d290-4bee-94dd-dcca858a5600", "OnlyOnReconciliationOrReprocessing": false },
  "qualificationConfiguration": { "AllPayers": true, "PayerPositions": [], "InvoiceNumberPrefix": null, "ExcludeClaimsWithMatchingPrefix": false } }
```
Transfer dispute, Test 1 and 2 (sequence `e6f6aa9e-94f6-4c04-abc0-eb17f242e503`, rule `04bace46-ebce-4df3-b379-48a2a0a90ef6`): same shape with name `UF-16594 Test - PR-45 transfer dispute`, `behaviorCategory` 5, the same PR-45 qualifier, `"behaviorConfiguration": { "AmountThreshold": 5 }` (first created with 100, then updated to 5).

Test 3 rules (qualifier attribute 21 with the element shown, same other fields):
- Suppression, sequence `e6f6aa9e-94f6-4c04-abc0-eb17f242e506`, category 8, rule `41ff1ddc-ddb0-4bc0-8584-99941b111418`, qualifier element OA-23 `e5f49aba-b919-4d69-ba03-4dfb143aa5d6`, behavior `{ "OnlyWhenPreviousPaymentReceived": false, "SuppressedReasons": [ { "AttributeType": 21, "SetQualifiers": [], "ElementQualifiers": [ { "ElementId": "e5f49aba-b919-4d69-ba03-4dfb143aa5d6", "Exclusionary": false } ] } ], "OnlyOnReconciliationOrReprocessing": false, "OnlyIfReversalOfPrevious": false }`
- Denial dispute, sequence `e6f6aa9e-94f6-4c04-abc0-eb17f242e501`, category 3, rule `c83c9007-89a3-4993-9c89-a1e3bd681dc9`, qualifier element CO-50 `ff3e2bc5-d17e-423d-b3b9-270898321895`, behavior `{ "InterventionsEnabled": false, "DefaultPriority": 2, "DefaultInterventionUserAssignment": null, "AdditionalInterventionTags": [], "InterventionReferenceDateType": 3, "ReferenceDateDaysOffset": 0 }`
- Underpayment dispute, sequence `e6f6aa9e-94f6-4c04-abc0-eb17f242e502`, category 4, rule `630564be-b88d-411d-8d68-0334029d74bd`, qualifier element CO-253 `299b7a9b-749b-47e3-916e-39a26a991002`, behavior `{ "UnderpaymentPercentThreshold": 10, "IsAnded": true, "UnderpaymentAmountThreshold": 1, "UseAllowed": false, "DisputeOverpayment": false, "OverpaymentPercentThreshold": 0, "OverpaymentIsAnded": false, "OverpaymentAmountThreshold": 0, "OverpaymentUseAllowed": false }`

Update used for the control run: the Reassignment rule read back, `qualifiers[0].elementQualifiers[0].exclusionary` set to `true`, sent to `PUT .../e6d40e0b-6794-4faf-91e7-356a148a4658/update`; restored later with `false`.

### A.3 The ERAs uploaded
Header (identical in all six; the two time values differ and do not matter):
`ISA*00*          *00*          *ZZ*SENDER         *ZZ*RECEIVER       *261021*0845*^*00501*000000001*0*P*:~GS*HP*SENDER*RECEIVER*20261021*0845*1*X*005010X221A1~`

Bodies (claim number, payer, payee, patient and provider as in A.1):

Test 1, check 0535803385, remittance `9065e1da-4cf0-4f1e-9b5e-4950178d311b`:
`ST*835*0001~BPR**0**************20261021~TRN*1*0535803385~N1*PR*Blue Cross~N3*PO Box 11387~N4*Columbus*OH*43081~N1*PE*Kenwood Cancer Specialists*XX*1000000000~REF*TJ*304823480~LX*1~CLP*COMP1000357A1*1*9.13*0***637942693630~NM1*QC*1*McKean*Matt****MI*789~NM1*82*1******XX*9975118111~DTM*232*20260105~SVC*HC:85025*9.13*0**1~DTM*472*20260105~CAS*CO*45*1.52~CAS*PR*45*7.61~AMT*B6*7.61~SE*19*0001~GE*1*1~IEA*1*000000001~`

Test 2 (control), check 4110796059, remittance `17711c06-b8e6-4e2a-af5f-9ec94524e928`: the same body with `TRN*1*4110796059` and ICN `036759432229` (header time 0858).

Test 3 (header time 0953):
- 3A suppression, check 6248825185, remittance `6a37db7c-3bc7-455f-b840-3264d84a90f1`: `ST*835*0001~BPR**5**************20261021~TRN*1*6248825185~N1*PR*Blue Cross~N3*PO Box 11387~N4*Columbus*OH*43081~N1*PE*Kenwood Cancer Specialists*XX*1000000000~REF*TJ*304823480~LX*1~CLP*COMP1000357A1*1*9.13*5***314034480277~NM1*QC*1*McKean*Matt****MI*789~NM1*82*1******XX*9975118111~DTM*232*20260105~SVC*HC:85025*9.13*5**1~DTM*472*20260105~CAS*OA*23*1.13~CAS*CO*45*3~AMT*B6*7.61~SE*19*0001~GE*1*1~IEA*1*000000001~`
- 3B denial, check 3181791949, remittance `c00972ae-f3fe-4345-b2cb-99fd17e46e01`: same as 3A with `BPR**0`, `TRN*1*3181791949`, `CLP*COMP1000357A1*1*9.13*0***000517777821`, `SVC*HC:85025*9.13*0**1`, one `CAS*CO*50*9.13`, `SE*18*0001`.
- 3C underpayment, check 0642066168, remittance `cca779d1-6bf4-43aa-acde-c010b7f1640e`: `BPR**2`, `TRN*1*0642066168`, `CLP*COMP1000357A1*1*9.13*2***922473459293`, `SVC*HC:85025*9.13*2**1`, one `CAS*CO*253*7.13`, `SE*18*0001`.
- 3D combined, check 2663638118, remittance `bc67f876-7970-487d-93f2-193aa8d4fb39`: `BPR**2`, `TRN*1*2663638118`, `CLP*COMP1000357A1*1*9.13*2***978620894532`, `SVC*HC:85025*9.13*2**1`, `CAS*OA*23*1.13`, `CAS*CO*50*3**253*3`, `SE*19*0001`.

The files as rendered are in `downloads/` of the ticket folder `tickets/UF-16594/`, together with `ninja_splunk_rule-log-order-test1-and-test2_20261021-094634.md` (the Splunk lines for Test 1 and Test 2, read back through the page, not a raw export) and `ninja_test3_results-by-scenario_20261021-095705.md` (full ids and results for Test 3).

### A.4 Results
| Run | Claim payment | Charge payment | Adjustments afterwards | Transfers afterwards | Disputed | Dispute type | Exceptions (claim payment / charge) |
|---|---|---|---|---|---|---|---|
| Test 1 | `e7ed9c4d-0f5c-44b3-a80c-5ad42477a182` | `bd2c0c3a-6b37-469e-ae2d-9e1e263ad7bb` | one CO-45 reason, 9.13 | none | no | 0 | 29 / none |
| Test 2 | `14e8a06b-302b-4b96-9ed6-6b5db12620ae` | `b488b86f-c028-48ff-ac51-325aead318d5` | CO-45 1.52 | PR-45 7.61 | yes | 32 | 29, 17 / 17 |
| 3A | `6c88d760-8502-4eab-b9df-15c02d37cd5a` | `202d3870-8dbf-4b34-945b-b31c784e0646` | CO-45 3 | none | no | 0 | 7 / 7 |
| 3B | `00782a89-7244-4071-97b9-9a956b31258f` | `4f0dd3c2-7c66-4870-a15e-5b6a6751f20e` | CO-50 9.13 | none | yes | 16 | 15 / 15 |
| 3C | `492efd7e-5c4e-4df1-a564-0393697965ee` | `ae3187e1-15d1-40a5-bcb4-549f19a6855d` | CO-253 7.13 | none | yes | 64 | 16 / 16 |
| 3D | `bd1b39d5-79ad-405a-91b6-4091fba17072` | `a36dccdd-428c-4ecc-8ec6-c2f7f06cb579` | CO-253 3, CO-50 3 | none | yes | 64 | 16 / 16 |

Notes: exception 29 on the Test 1 and Test 2 claim payments came from the payer literal mapping (4.8); it cleared after the user corrected the mapping, so the later Test 3 runs do not show it. Read exceptions from the claim payment of the run being checked, not from this table.

Splunk (index `sharp-app-aks-ninja-king`, times UTC):
- Test 1: 12:50:40.619 evaluation starts; 12:50:40.670 `Reassigning transfer code` (rule `e6d40e0b-6794-4faf-91e7-356a148a4658`); 12:50:40.680 `Rule action matched, adding events and skipping remaining rules` for the same rule; a second evaluation at 12:50:46.696 with no rule match; no line for rule `04bace46-ebce-4df3-b379-48a2a0a90ef6`.
- Test 2: 12:59:50.811 `Transfer is disputed` and 12:59:50.812 `Rule action matched ...` for rule `04bace46-ebce-4df3-b379-48a2a0a90ef6`; no line for the Reassignment rule.

### A.5 Team run (organization SDHB-1, 2026-10-21)
Ticket folder `tickets/UF-16594/` (summary.md entries "Team ..." and the `team_*` files in `downloads/`). Rules were created, run and then deleted; remittances were discarded (5.5). All results below are **confirmed**.

**Environment and data**
- Organization: Herbert Test 1, tag SDHB-1, id `bdeab2ce-cfbc-4280-8338-edce0fcbae06`, type Test. Application host `sdherbert1.unlimitedfinancials.team`, API host `https://api.unlimitedfinancials.team` (found through Nimbus on `https://nimbus.ucp.team/`; the user first named it "SBHB-1", which does not exist, and confirmed SDHB-1). The organization had no rules before the test.
- Claim COMP1000021A1, primary (payer position 1): claim id `ef1e5082-404e-48d4-b322-88910faafc34`, Professional Electronic, status Remitted (`isPaid` true), payer Tricare `7ca757cf-9af5-41a5-aac4-8f1390868846` (plan Tricare East; PO Box 8923, Madison, WI 53707), member id `TE-012345- MM` (with the space), patient Morales, Miles (FAN 543212), date of service 2025-01-15, one charge 11103 `4afa1691-01a5-4561-93ea-7ce3c764ea44`, fee 49.00, balance 40.84 (expected amount 40.84). Billing provider NPI 9578655255.
- Company Cosmo Company `15f5475e-1107-40b1-950e-a032d222894d`, tax id 111177777, NPI null (see 4.10).
- Values used: billed 49.00, transfer 10.00, Transfer dispute threshold 5. Rule bodies as in A.2 (the PR-45, CO-45, OA-23, CO-50 and CO-253 element ids were identical on team). Rule ids (all deleted afterwards): Reassignment `a51686eb-c927-4162-9167-3719e0b2bc8d`, Transfer dispute `887b4788-43df-4b4d-ba7d-d9f0d4635019`, Suppression `f5dcfaa4-19e5-433d-8f4f-bfea22d8b008`, Denial `601dd103-0086-4f1d-83dc-0d6441fdcae3`, Underpayment `aabec982-a5a2-48d9-9737-81659926a211`.

**ERAs** (same header as A.3; body shown for Test 1, the others differ in the fields listed):
`ST*835*0001~BPR**0**************20261021~TRN*1*2026111519~N1*PR*Tricare~N3*PO Box 8923~N4*Madison*WI*53707~N1*PE*Cosmo Company~REF*TJ*111177777~LX*1~CLP*COMP1000021A1*1*49*0***566160155935~NM1*QC*1*Morales*Miles****MI*TE-012345- MM~NM1*82*1******XX*9578655255~DTM*232*20250115~SVC*HC:11103*49*0**1~DTM*472*20250115~CAS*CO*45*39~CAS*PR*45*10~AMT*B6*10~SE*19*0001~GE*1*1~IEA*1*000000001~`
- Test 2: check 2907269190, ICN 449416872786, same content (rule qualifier set to exclusionary first).
- 3A: check 7422038153, ICN 120533887739, `BPR**5`, paid 5, `CAS*OA*23*1.13`, `CAS*CO*45*42.87`, `AMT*B6*40.84`, SE 19.
- 3B: check 5090948364, ICN 994153005791, paid 0, `CAS*CO*50*49`, SE 18.
- 3C: check 9576777218, ICN 208506872264, `BPR**2`, paid 2, `CAS*CO*253*47`, SE 18.
- 3D: check 8911324462, ICN 113588554656, `BPR**2`, paid 2, `CAS*OA*23*1.13`, `CAS*CO*50*3`, `CAS*CO*253*42.87`, SE 20.
Test 1 and Test 2 used `AMT*B6*10`; 3A to 3D used `AMT*B6*40.84`. In 3B to 3D the CLP and SVC paid amounts equal the paid shown, and the CLP billed amount is 49.

**Results** (second read, 7 to 10 seconds after upload)
| Run | Remittance | Claim payment | Charge payment | Adjustments / transfers | Disputed | Type | Exceptions |
|---|---|---|---|---|---|---|---|
| Test 1 | `1cc69528-1a59-4ef7-9f31-627d31db5789` | `289d4a9a-d226-4350-8648-32f20a76442f` | `51e532f4-f0cc-4dc8-b872-0d2126500943` | one CO-45 reason 49.00; no transfer | no | 0 | 6 |
| Test 2 | `0c1a53d2-e42c-4d55-acb7-23eb73bad936` | `e18c16ad-bec4-47f5-95cb-40d59d0b7b2c` | `3e83a0e1-8a31-4617-881b-533da8d51ee6` | CO-45 39.00; PR-45 10.00 kept | yes | 32 | 17 |
| 3A | `739cb622-1e90-4d82-8684-8c6c270e34c1` | `fd5aa7f3-7b2f-4595-8b1c-90dbff612589` | `a1b88c5d-c10c-4e19-9550-53b45ecc093b` | OA-23 removed; CO-45 42.87 | no | 0 | 6 |
| 3B | `b36d7267-03d1-42b9-8a23-349278d2b567` | `4f066f2b-7f92-4c56-8246-06d9bbcc2a68` | `30720811-64fb-4489-994f-10c85e8d0ee9` | CO-50 49.00 | yes | 16 | 15 |
| 3C | `fea4914f-d909-4ac5-9c1b-3c3f2e1e3cb0` | `90a9164f-2f51-4750-ba28-d2b63748d080` | `df404e65-bd5a-4955-85a4-df3f31a5e927` | CO-253 47.00 | yes | 64 | 16 |
| 3D | `2bc9bd28-3075-49f4-932c-06634b715740` | `198788a9-b661-4ca3-b2cc-6ad6efc8d220` | `81672171-1f59-4ebd-a89b-6d94b57793d2` | OA-23 removed; CO-253 42.87, CO-50 3.00 | yes | 64 | 16 |
Posting status at the first snapshot read: 2026111519 (7), 2907269190 (7), 7422038153 (1), 5090948364 (2), 9576777218 (1), 8911324462 (1). The snapshot `payerId` (Tricare) and `companyId` matched the claim in all six.

**Splunk** (index `sharp-app-aks-team-king`, `Properties.RemittanceId` plus `Properties.RuleId=*`, last 4 hours, times as logged):
- Test 1: 18:32:47.580 `Reassigning transfer code` and `Rule action matched` for the Reassignment rule; no line for the dispute rule.
- Test 2: 18:49:02.057 `Transfer is disputed` and 18:49:02.058 `Rule action matched` for the dispute rule; no Reassignment line.
- 3A: 19:01:38.010 `Rule action matched` for the Suppression rule only.
- 3B: 19:11:30.201 `Denial is disputed` and `Rule action matched` for the Denial rule.
- 3C: 19:13:35.489 `Underpayment is disputed` and `Rule action matched` for the Underpayment rule.
- 3D: 19:16:41.549 Suppression `Rule action matched`; 19:16:41.551 Denial `Rule action continue, checking next rule`; 19:16:41.554 Underpayment `Rule action matched` and `Underpayment is disputed`.

**Clean-up (5.5):** the five rules were deleted (HTTP 200, rule list empty afterwards) and the six remittances discarded (HTTP 200, snapshots read back as status 8, `isDeleted` true, read twice).

---

## Appendix B. Scenario-specific snippets

Generic browser snippets (API call, create then poll, start then poll, multipart upload, Splunk read) are in the `api-testing` skill, `references/browser-api-mechanics.md`.

1. **Create a rule and read it back** (inside `await (async () => { ... })()` on the application page; `rule` is a body from Appendix A.2):
```js
const base = 'https://api.unlimitedfinancials.ninja/snowdrop/remittanceprocessing', ORG = '<organization id>';
const H = { 'accept': 'application/json', 'content-type': 'application/json', 'org-id-req': ORG };
const r = await fetch(base + '/remittance-processing-charge-rules', { method: 'POST', credentials: 'include', headers: H, body: JSON.stringify(rule) });
const id = JSON.parse(await r.text());                       // the rule id, returned as a JSON string
for (let i = 0; i < 8; i++) {                                 // the read model lags; poll
  const g = await fetch(base + '/remittance-processing-charge-rules/' + id, { credentials: 'include', headers: H });
  if (g.status === 200) return JSON.stringify({ id, category: (await g.json()).behaviorCategory });
  await new Promise(s => setTimeout(s, 3000));
}
```
2. **Render an ERA in Node with the era-builder scripts** (`era-core.js`, `era-x12.js`, `era-view.js` from the skill's `scripts` folder; each attaches to `globalThis.__era`):
```js
['era-core','era-x12','era-view'].forEach(f => require('<scripts folder>/' + f + '.js'));
const E = globalThis.__era;
E.load({ checks: [{ payer: { name: 'Blue Cross', addressLine1: 'PO Box 11387', city: 'Columbus', state: 'OH', zip: '43081' },
  payee: { name: 'Kenwood Cancer Specialists', idCode: '1000000000', taxId: '304823480' },
  claims: [{ claimNumber: 'COMP1000357A1', status: '1', date: '2026-01-05', patient: { last: 'McKean', first: 'Matt', id: '789' }, serviceProviderId: '9975118111',
    services: [{ procedure: '85025', units: 1, billed: 9.13, paid: 0, allowed: 7.61, serviceDate: '2026-01-05',
      adjustments: [{ group: 'CO', reason: '45', amount: 1.52 }, { group: 'PR', reason: '45', amount: 7.61 }] }] }] }] });
E.view(); console.log(E.out.view);          // field tables and a balance line
const x12 = E.render(E.model).join('');     // the file to upload
```
