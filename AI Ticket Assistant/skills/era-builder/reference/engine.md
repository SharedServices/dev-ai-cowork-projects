# The ERA engine

All of the work on the ERA (defaults, balance check, the summary view, X12 rendering, reading X12, uploading and validating) is done by four small JavaScript files in `scripts/`. They run inside the signed-in Chrome tab, in Claude Code and in Cowork alike, so no local runtime is needed. The model lives in the page, on `globalThis.__era.model`. The files also run in Node, which is how they were tested.

## Loading it

Before any ERA work, check the tab (see `send-via-chrome.md`), then check the engine is there:

```js
typeof globalThis.__era === 'object' && typeof globalThis.__era.upload === 'function'
```

If not (a new tab, or the page reloaded), load the four files in this order, each as its own page-script call. Read each file and send its full text as the script, then add a final line such as `'core loaded'` so the call returns a short string:

1. `scripts/era-core.js` - defaults, balance check, edits, repeat.
2. `scripts/era-x12.js` - X12 rendering and reading.
3. `scripts/era-view.js` - the markdown view.
4. `scripts/era-io.js` - upload, validation, stored file, current state.

Then run `globalThis.__era.config('https://api.unlimitedfinancials.{env}', '<ORGANIZATION ID>')`. A page reload loses the engine and the model. Reload the engine and rebuild the model by replaying what was done (see Recovery).

## Limits of the page-script tool

- Output is cut off at roughly 1,000 characters, and a long string of digits is blocked as if it were base64. Always return short strings or compact JSON. Read longer text in slices with `__era.read(name, i)` (600 characters a slice, the reply tells you how many slices there are).
- A long call must not be awaited. Functions that take time start work and return `'started'`; poll `JSON.stringify(__era.state)` in a second call until `done` is true.
- Input of at least 20,000 characters in one call works. The four files are each under 15,000.

## Functions

All are on `globalThis.__era`.

| Call | What it does |
|---|---|
| `load(jsonOrObject)` | Makes it the working model (drops a `template` block), fills defaults. Returns `{checks, claims, services, issues}`. |
| `edit(ops)` | Applies a list of operations (below), then recomputes the defaults and totals. Returns what was done. |
| `view(opts)` | Builds the markdown view into `out.view`, returns `{chars, slices, summary}`. Read it with `read('view', i)`. Small ERAs get the full tables; more than 25 claims or 80 services gets a summary. `view({mode:'full'})` or `{mode:'summary'}` forces one. `view({check:1, from:100, to:110})` shows a range of claims and their services. |
| `check(model)` | Returns the list of balance problems. `stats()` returns the counts and the number of problems. |
| `render(model)` | Returns the X12 as an array of strings. `size()` returns its size in bytes without sending anything. |
| `import(text, {dropCheckNumbers})` | Reads X12 text into `{model, report}`. The model is marked `asImported`. |
| `upload({overrideDuplicates})` | Renders and uploads the model, then runs the immediate validation. Starts and returns `'started'`; the result is in `out.upload` (read with `read('upload', 0, 700)`). |
| `fetchStored({remittanceId, dropCheckNumbers})` | Loads the model from the file a remittance was uploaded from, entirely in the page. Report in `out.import`. |
| `findUploads(checkNumber)` | Finds remittances by check number (new, pending and discarded ones included). Result in `out.found`, one line each: `id | check number | amount | status`. |
| `save(name, description)` | Records what the model was started from and every edit, as text in `out.recipe`; returns `{chars, slices}`. Read it with `read('recipe', i)`. Refuses when the text would pass 30,000 characters. Generated values are left out. |
| `restore(text)` | Rebuilds a saved ERA from that text. Starts and returns `'started'`; poll `state`. A file started from an earlier upload reads that upload again. |
| `currentState(remittanceId, checkNumber)` | The current-state check (grid and remittance-processing view). Result in `out.current`. |
| `findClaims({dateOfService, companyId, patient, payerId})` | One search-by-patient call; keeps the claims in the page. Starts and returns `'started'`; poll `state`. Prototype, see `claim-sampling.md`. |
| `buildClaims({count, concurrency, append, payerLiteral})` | Picks claims at random from the last `findClaims`, loads each claim view and builds one check per payer. Timings in `out.build`. Prototype, see `claim-sampling.md`. |

`upload` result: `status`, `bytes`, `ms`, `outcome`, `message`, `checks` (`n` check number, `st` status, `id` remittance id, `why` reason), and `verdicts` for each created check: `posting`, `deleted`, `amount`, `claims` (null when the message is in blob storage), `linked`, `blob`, `company`, `payer`, `verdict` (`live`, `discarded`, a mismatch, or another posting status).

## Edit operations

`edit` takes a list. Paths use dots and list positions, for example `checks[0].claims[1].services[0].paid`.

- `{ "op": "set", "path": "...", "value": ... }` sets a value. It also removes that field from the object's `generated` list, so it is no longer labelled generated.
- `{ "op": "add", "path": "checks[0].claims", "value": {...} }` appends to a list.
- `{ "op": "remove", "path": "checks[0].claims[2]" }` removes a list item or a field.
- `{ "op": "payer", "path": "checks[0]", "allowedPercent": 24.9, "additions": [{"reason": "253", "percentOfAllowed": 2}], "remark": {"code": "N59"}, "deny": [{"claimNumber": "...", "procedure": "84439", "reason": "96", "remark": "N115"}], "lines": [{"claimNumber": "...", "procedure": "80053", "allowed": 11.09}] }` applies payer behaviour, which an invoice cannot tell us (see "Payer behaviour" below). Every field is optional; `path` defaults to all checks.
- `{ "op": "repeat", "path": "checks[0].claims[0]", "count": 5000, "start": 1 }` replaces that item with that many copies. In every string of the copies `{n}` becomes the copy number and `{n:6}` the number padded to 6 digits. Generated claim numbers and ICNs are renumbered in sequence, so there are no duplicates.

Totals the engine computed (check amount, claim billed and paid) are recomputed after every edit. A total the user set is left alone.

## Payer behaviour

An invoice gives the fee, not what the payer will pay. A production ERA (cloud, org ALOC) paid 1250.37 on 5242.00 billed; the invoices' balances and expected amounts all equalled the fee, so nothing on them predicts the payment. The `payer` edit operation sets it:

- `allowedPercent` (or a per-line `allowed` amount in `lines`) sets `AMT*B6`; `CO-45` is billed minus allowed.
- `additions` are payer-added adjustments, worked out in the order listed, each as a percent of what is left of the allowed amount after the earlier ones (the production payer took `CO-253` at about 2% of the payment left after `CO-303`, which was about 20% of allowed). Paid is allowed minus the additions, so billed minus paid always equals the adjustments.
- `deny` makes lines denied: paid 0, units 0, the original units in the sent units, one adjustment for the full billed amount (default `CO-96`) and an optional `LQ*HE` remark. A claim whose lines are all denied keeps its status.
- `remark` writes an `LQ*HE` remark on every paid line.
- `lines` overrides allowed and additions for matching lines (by claim number and procedure).
- `AMT*AU` is written on each claim as the billed amount of its paid lines, unless `coverage` is false. It is left out when every line is denied.
- The check amount, claim billed and paid are recomputed.

Checked by replaying the production ERA: with the real allowed amounts, 2% additions (20% for `CO-303`) and its four denied lines, 36 of 37 lines matched the real paid amount and every adjustment to the cent, and all 16 `AMT*AU` values matched. The one miss was a line where the payer's `CO-253` was 1.63% of allowed.

## Large ERAs

The ERA is built and sent in the page, so nothing large passes through the tool. To make a large remittance:

1. Load a small template, or build one claim as the user describes it, with patterns in the values, for example `"last": "DOE{n}"` and `"id": "{n:8}"`.
2. `edit([{op:'repeat', path:'checks[0].claims[0]', count: 5000}])`. Repeat a service the same way to make claims with many services.
3. `view()` gives a summary with counts and totals. Ask for a range to look at claims.
4. `size()` tells the size. The upload limit is 100 MB. In testing the engine built a 30,000-claim, 7.8 MB ERA in about half a second.
5. `upload()`. Remittances with more than 1,000 claims keep their message in blob storage, so the validation reports the snapshot without a claim count or links (`blob` is true).

Claim numbers made this way do not exist in the organization, so the claims are not linked. To link claims, use real claim numbers (see `claim-lookup.md`).

## Saving and recovery

The page is the only copy of the model. The engine records what the model was started from (`load`, or `fetchStored` as a pointer to the stored file) and every `edit`. `save` turns that record into a small piece of text and `restore` rebuilds the model from it. Saved files for the user (see "Saved files" in `SKILL.md`) and rebuilding after a page reload use the same record.

After a page reload the engine and the record are gone. Keep the work reproducible in the conversation: the template used, the `edit` operations applied, and any lookups merged. To rebuild, load the engine again, load the same start, and apply the same operations. Generated values (check number, claim numbers) come out different after a rebuild; that does not matter before the upload. Do not store the model in the browser's storage: it can hold patient data.
## Tests

The engine was checked against the PowerShell version it replaced, with seven sample ERAs: the models read from X12 were identical, the rendered X12 matched segment for segment, and the rendered files parsed with the system's own parser gave the same results as the originals (no differences in about 98,000 fields). The summary view and balance check matched on five models. A 30,000-claim ERA and a 5,000-claim ERA parsed correctly with the system's parser.
