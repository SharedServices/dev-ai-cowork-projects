---
name: era-builder
description: Build an ERA (X12 835) file from a conversation and upload it to the Remittance ERA upload endpoint (POST /remittance/era-upload) in a chosen environment. Use when the user wants to create, edit, preview, or send a test ERA, including very large ones, e.g. "build an ERA with two claims", "make an ERA like this sample", "deny the second claim with CO-50", "make an ERA with 5,000 claims", "show me the ERA so far", "send it to ninja for org X". Works from a standard or empty template, a saved file, a pasted sample, an earlier upload, or plain instructions. NOT for investigating how a real ERA was parsed.
---

# ERA builder

Builds an 835 from a model in plain terms (patient, claim number, procedure, adjustment) and uploads it from the signed-in Chrome tab. The model holds only the fields the Remittance parser reads; everything else in the X12 is generated. The work is done by a small JavaScript engine that runs in the browser tab, and it handles very large ERAs.

Files:
- `reference/engine.md` - how to load the engine into the tab, every function, the output limits, edit operations, large ERAs, recovery. Read it first.
- `reference/era-model.md` - every model field, the segment it becomes, and what the parser does with it. Read it before editing a model or answering a question about a field.
- `reference/send-via-chrome.md` - how the page talks to the API, the validation rules, failure cases.
- `references/org-lookup.md` (project root `references/`) - find an organization id (and its environment and app host) from an organization name, tag or part of one. Read it when the user names an organization instead of giving an id.
- `reference/lookups.md` - read-only lookups of companies, payers, patients, claims and stored files in the target organization.
- `reference/claim-lookup.md` - fill a check and claim from a claim number. Read it when the user gives a claim number.
- `reference/claim-sampling.md` - build a large remittance from random real claims of a company or patient on a date of service (prototype). Read it when the user asks for large remittances, random claims, or many real claims, and give the user the requirements listed there.
- `reference/name-lookup.md` - fill the payee from a company name, the payer from a payer name (with its payer literal), or a claim's patient from a patient name.
- `scripts/era-core.js`, `era-x12.js`, `era-view.js`, `era-io.js` - the engine.
- `templates/*.json` - starting models.

## Requirements

- Claude in Chrome connected to a browser that is signed in to the target environment's app (`https://sdsh.unlimitedfinancials.{env}`). Everything is sent from that browser tab. The organization name lookup (`references/org-lookup.md`) opens a second tab on the Nimbus host, which also needs the browser to be signed in. Nothing else needs to be installed.
- The target environment must have the ERA upload endpoint and the stored file and payer literal routes deployed. Confirmed on ninja.
- **Installation:** the skill is a project skill in `.claude/skills/era-builder/`. It holds `SKILL.md`, `reference/`, `scripts/` and `templates/`, and uses the project's `references/org-lookup.md`, root `CLAUDE.md` and the `api-testing` and `snowdrop-api-calls` skills instead of repeating them. Edit it there.
- **Related skills:** `api-testing` (API test procedures in the project's `API Tests/` folder that upload test ERAs use this skill), `ticket-workflow` (save the ERA files that were uploaded in the active ticket's `downloads/` folder), `snowdrop-api-calls` (ingress paths and the Chrome session approach, for calls other than the ERA upload).

To use it, ask for what you want in plain words (for example "build an ERA with two claims and send it to ninja for organization X"), or type `/era-builder`.

## Starting a conversation

If the user gave instructions (for example "make an ERA for claim X and send it to ninja"), do not show the options: start from the `Empty` template and apply them. If the skill was started with no instructions, offer these four ways to start and let the user pick:

1. **A previously uploaded ERA.** The ERA from an earlier upload.
2. **A standard template.** One of the ready-made ERAs.
3. **An empty ERA.** One check with nothing set.
4. **A previously saved file.** An ERA the user saved in an earlier session.

For every start, first get the Chrome tab ready and the engine loaded (`reference/engine.md`, `reference/send-via-chrome.md`). The organization is needed straight away for option 1, and later (when sending) for the others. If the user gives an organization name, a tag or part of one instead of an id, follow `references/org-lookup.md`; it also gives the environment and the app host. Otherwise ask for the environment and the organization id. Then open `https://<application host>/<organization id>/` in the app tab (see `reference/send-via-chrome.md`), and run `__era.config('https://api.unlimitedfinancials.<environment>', '<organization id>')`. The production rules under "Sending" depend on the environment name, not on the organization's `type`.

- **Option 1, a previously uploaded ERA.** Ask for the check number (best), the remittance id, or the address of the remittance in the app (the id is the long code after `/remittance/`). For a check number run `__era.findUploads('<check number>')` and read `__era.out.found` (one line per remittance: id, check number, amount, status); show the matches with full ids and ask which when there is more than one. Then follow "Starting from an ERA file or an earlier upload" below.
- **Option 2, a standard template.** Read the `template` block (`name`, `description`) of every file in `templates/` except `Empty`, and show them as a numbered list. Load the chosen one with `__era.load(<template json>)`.
- **Option 3, an empty ERA.** Load `templates/empty.json` with `__era.load(...)`.
- **Option 4, a previously saved file.** Follow "Saved files" below.

Once the ERA is loaded, show the short list below, then let the user drive. Anything not set gets a default. A pasted sample ERA is also a way to start (see below).
What the user can set on the check (say it in these terms, adjusted to what the template already contains):

- **Check number.** Generated if left out. A number that already exists in the organization is withheld as a duplicate.
- **Check date.** Default today.
- **Check amount.** Default is the claims' paid total minus provider adjustments. Setting it yourself makes an unbalanced ERA; say so when it does not balance.
- **Payer.** Name and address. The name is matched against the organization's payer mappings to find the payer; with no match the payer stays blank.
- **Payee.** Name, id code, address, and tax id. The tax id is used to find the company. **If the user gives a tax id that no company in the organization has, the remittance is created and then immediately discarded, and the upload still says Created.** Say this when the tax id comes up, and suggest leaving it out unless the user has a real company's tax id.
- **Provider adjustments.** Provider id, date, reason code, optional identifier, amount. A positive amount reduces the payment and a negative one increases it.
- **Claims.** Covered next, once the check is settled.
- **More than one check** can go in one file; each becomes its own remittance.

The model has no payment method, sender or receiver id, TRN03, or CLP06/08/09: they do not reach the stored remittance, so they are not written and cannot be set.

Only when the user asks for detail:
- Check date can be any date, including one in a closed month. The system keeps the ledger date out of closed months on its own, so there is nothing to watch for.
- An ERA upload has no deposit date field.
- A zero-dollar check is auto-reconciled only when the company and the payer are both found and no other active check has the same number. This comes from reading the code and has not been tested.

## Working model

The model lives in the page (`__era.model`). Change it with `__era.edit([...])` for each change the user asks for (operations are in `reference/engine.md`). Keep the template and the operations you have applied in the conversation, so the model can be rebuilt if the page reloads. Fields the user leaves out are filled in by the engine (check number, claim numbers, ICN, dates, names, totals); totals are recomputed after every edit. Ask only for what you cannot sensibly default.

## Showing the ERA

Run `__era.view()` and read the result back in slices (`__era.read('view', i)`), then show it to the user as it is, joined in order. It is markdown: a table of the check, a table of the claims, a table of the services, a list of the fields that can still be set, and a balance line. Do not rewrite or shorten it; the user asks about whatever they want from it. For a large ERA the view is a summary (counts, totals, the first claims, the balance problems); offer a range, for example claims 100 to 110.

Labels in the tables:
- `(generated)` is a claim number, check number or ICN made up by the engine. `(computed)` is a total worked out from the services or claims. `(default)` is any other value filled in by default. A value the user set has no label (`edit` does this by itself).
- Status shows its meaning (1 Primary, 2 Secondary, 3 Tertiary, 4 Denied, 22 Reversal). Explain other codes only when asked.

The balance line reports problems: service billed minus paid must equal the adjustments, claim totals must equal the services, the check amount must equal claims paid minus provider adjustments, and a check needs at least one claim. Fix the model to balance unless the user wants an unbalanced ERA on purpose; say plainly when it is unbalanced.

## Starting from an ERA file or an earlier upload

- **An earlier upload (a remittance that was uploaded as an ERA):** `__era.fetchStored({remittanceId, dropCheckNumbers: true})`. The stored file is fetched and read inside the page. Use `dropCheckNumbers` when the model will go to the same organization, because a check number that already exists is withheld as a duplicate. The remittance has to have been created by an upload.
- **Pasted ERA text:** `__era.import(text, {dropCheckNumbers: true})` gives `{model, report}`; set it with `__era.load(model)`. Pasted text has to pass through the tool, so this suits small files.

Relay the report: the counts, and the segments in the file that the model has no field for (not carried over). The report also holds the fixed list of things never carried over; give it to the user when they ask what might be missed. The delimiters are read from the file, so any valid X12 works. The model is marked `asImported`: claim dates, service dates and ICNs that the file did not have stay empty, so the ERA reproduces the source. Remove `asImported` if the user starts adding new claims and wants those defaults.

Checked on 2026-10-14 with seven sample ERAs (one with five checks, one with 38,000 parsed fields): reading each into a model and rendering it again gave identical results when parsed by the system's own parser, with claim and payment ids excluded. One source can still differ: a CAS segment with five or six reason/amount pairs. The system's parser reads those wrongly, so the original and the regenerated ERA both load wrongly; the report says so when it sees one.

## Saved files

The user can save the ERA they are building and load it again later. A saved file holds what the ERA was started from and every edit made to it, not the finished model, so even a very large ERA saves as a small file. Generated values (check number, claim numbers, ICNs) are left out and come out fresh on reload, so reloading never collides with a check that was already uploaded. Values the user set, including a check number they chose, are kept.

**Saving.** When the user asks to save:
1. Ask for a name and, if they want, a short description.
2. Ask where saved files go, once per session: suggest a folder outside the repository (for example `era-builder-saved` in the user's home folder). Do not save inside the repository; a saved file could be committed by accident.
3. Run `__era.save('<name>', '<description>')`. It returns how many slices the text has. Read them all with `__era.read('recipe', i)` and join them exactly.
4. Write the text to `<folder>/<name>.era.json` (letters, digits, spaces and dashes only in the name) with the file tool, and tell the user the full path.
5. Say what is in the file: if lookups were used, it holds the patient, company and claim data that was merged from the organization, so treat it as test data from that organization. A model that was read from a pasted file, and is too large (about 30,000 characters), cannot be saved; the engine says so. An ERA started from an earlier upload saves as a pointer to that upload plus the edits, however large it is.

**Loading (option 4).** List the `*.era.json` files in the saved folder (ask for the folder if it is not known): show each file's name, description and saved date. If there are none, say so and offer the other options. Read the chosen file and run `__era.restore(<file text>)`, then poll `__era.state` until done and show the ERA. A file that was started from an earlier upload reads that upload again, so the environment and organization must be the ones it came from; if the stored file cannot be read, say so. Claims merged from an organization's lookups link only in that organization.
## Payer behaviour

An invoice cannot tell what a payer will pay. When the user wants a realistic payer (allowed amount below billed, payer-added adjustments such as `CO-253`/`CO-303`, denied lines, `AMT*AU`), use the `payer` edit operation described in `reference/engine.md` ("Payer behaviour"), and ask for the allowed amounts or a percent, the added adjustments, and the lines to deny. Several policy payers can share one check under one payer literal; the system allows it (see `reference/claim-lookup.md`).

## Large ERAs

Build one claim as the user describes it, with patterns such as `{n}` in the values, then repeat it with the `repeat` operation. Everything stays in the page, so there is no size problem in the tool; see "Large ERAs" in `reference/engine.md`. For many real claims instead of generated ones, for example "pull 1,000 random claims for a company", follow `reference/claim-sampling.md`: tell the user what it needs (company or patient, a date of service, a count, optionally a payer), then run it when they provide those. It is a prototype and reports timings. Tell the user the size (`__era.size()`) before sending a large one and that over 1,000 claims the system keeps the message in blob storage. The upload limit is 100 MB. These tests can load the target system heavily; confirm with the user before sending a very large ERA.

## Filling from a name

When the user names a company, payer or patient, follow `reference/name-lookup.md`: run the search, show the matches and ask which when there is more than one, then merge the choice into the model and show the usual summary. Company fills the payee (including the real tax id). Payer fills the payer name with its payer literal when one exists, and says so when none does. Patient fills a claim's patient, and does not link the claim; use the claim number flow for that.

## Filling from a claim number

When the user gives a claim number, follow `reference/claim-lookup.md`: search, ask which claim if several match (for example primary and crossover), build the claim, and merge it into the model. Show the result with the usual summary. Services are paid their charge balance with a CO-45 adjustment for fee minus balance (see `reference/claim-lookup.md`); then ask what payment the user wants (the balance, full, partial, denied, or specific adjustments), and relay any warning that a payment is more than the charge balance.

## Rules that come from the parser

- A blank claim status code fails the whole check. The engine always writes one (default `1`).
- At most 4 adjustment pairs per CAS segment. The parser maps pairs 5 and 6 wrongly. The engine splits larger groups into more CAS segments.
- Claims are matched to existing claims in the organization by claim number and payer responsibility (status 1/19 primary, 2/20 secondary, 3/21 tertiary). A claim number that does not exist in the target organization still uploads but is not linked. Ask for real claim numbers when the user wants matching.
- Status 22 (reversal) is matched to the other claim on the same ERA with the same claim number. Include both in one check.
- The payer is found from the payer name (payer literal mapping), or from the claims when they match claims in the organization; the company from the payee tax id. These only resolve when they match data in the target organization.
- **A payee tax id that matches no company discards the remittance.** If `payee.taxId` is set and no company in the organization has it, the upload still reports Created, but the remittance is immediately discarded (posting status 8) and is hidden from the pending checks list. Leave `payee.taxId` out unless the user gives the tax id of a real company in that organization.

## Sending

1. Environments, their tiers and the `00000000-0000-` QA organization prefix are in root `CLAUDE.md` ("Environments"). The API host is `api.unlimitedfinancials.{env}`. It is confirmed for ninja (see the `snowdrop-api-calls` skill, "Environment hosts"); for any other environment confirm the host with the user before sending.
2. Production tier (root `CLAUDE.md`): this creates real remittances. Stop and get explicit confirmation naming the environment and organization before every upload. Prior approval for another environment does not carry over.
3. Check the model: `__era.check(__era.model)`. Report issues and ask whether to send anyway.
4. `__era.upload()`, then poll `__era.state` until done and read `__era.read('upload', 0, 700)`.
5. Report the HTTP status, `outcome`, `message`, and each check's number, status, remittance id and reason, with ids in full.
6. Immediate validation: the upload result already holds a verdict for every check reported as Created, taken from the remittance snapshot: live, discarded, or mismatch against the model. Check only the response and the snapshot at this point. A discarded remittance is not a success even though the upload says Created.
7. Tell the user that only the immediate state was checked and ask whether they want a current-state check.
8. Current-state check, only when asked and repeatable (the user may wait and ask again to get past lag): `__era.currentState(remittanceId, checkNumber)` checks the grid (pending checks, or discarded checks by check number) and the remittance-processing view, as described in `reference/send-via-chrome.md`. A miss on the first try is not a failure; say it may be lag and offer to check again.

Organization is selected with the `org-id-req` header on the request. The call runs from a Chrome tab on the organization's app origin, `https://<application host>/{organizationId}/` (the host comes from the organization lookup; `sdsh.unlimitedfinancials.ninja` for the test organization used so far, confirmed for ninja), not from a tab on the API host. The user id comes from the logged-in session and cannot be chosen.

Never set `overrideDuplicates` to true unless the user asks. A `DuplicateWarning` outcome means nothing was created; offer a new check number or the override.

## Status

The engine was verified on 2026-10-14 against the system's own parser and then run in the ninja tab: load, view, upload with the immediate validation, a stored file read straight back, and the current-state check, all on a small ERA. Large ERAs were verified up to 30,000 claims in Node and with the system's parser, and not yet uploaded. Not yet run against any other environment.
