# Filling the model from a name

Use it when the user names a company, payer or patient and wants the model filled from the organization's data. Run the scripts in the Chrome tab described in `send-via-chrome.md` (a tab on the app origin, signed in). Substitute `{env}`, `<ORGANIZATION ID>` and `<NAME TEXT>`. Each script keeps a small result on `window`; start it, then read the result in a second call (see `lookups.md`).

Matching is a case-insensitive "contains" on the name. Show at most 10 matches. When there are more than 5, the script skips the extra detail calls; ask the user for more of the name and run it again. When there is more than one match, show them and ask which one.

## Company (the payee)

```js
(() => {
  const B = 'https://api.unlimitedfinancials.{env}', H = { 'accept': 'application/json', 'org-id-req': '<ORGANIZATION ID>' };
  window.__companies = { done: false };
  (async () => {
    const text = '<NAME TEXT>'.toLowerCase();
    const r = await fetch(`${B}/snowdrop/resources/companies?includeInactive=true`, { credentials: 'include', headers: H });
    const j = r.ok ? await r.json() : [];
    const hits = j.filter(c => (c.name || '').toLowerCase().includes(text));
    const matches = hits.slice(0, 10).map(c => ({ companyId: c.companyId, name: c.name, taxId: c.taxId, active: c.active }));
    if (matches.length <= 5) for (const m of matches) { const d = await fetch(`${B}/snowdrop/resources/companies/${m.companyId}`, { credentials: 'include', headers: H }); if (d.ok) { const dj = await d.json(); m.npi = dj.npi; m.legalName = dj.legalName; } }
    window.__companies = { done: true, status: r.status, total: j.length, matchCount: hits.length, matches };
  })().catch(e => { window.__companies = { done: true, err: String(e) }; });
  return 'started';
})()
```

Read `JSON.stringify(window.__companies)`. Merge the chosen company into the check with `__era.edit` `set` operations: `checks[0].payee.name` from `name`, `payee.idCode` from `npi`, `payee.taxId` from `taxId` (a `set` also clears the "generated" label). Say if the company is inactive. A real company's tax id is what stops the remittance being discarded.

## Payer

`GET /payers/aggregate` lists every payer: the insurance payers (`GET /payers`) and the assistance payers (`GET /payers/assistance`) together. Search that one list. Assistance payers such as foundations are not in `GET /payers`.

```js
(() => {
  const B = 'https://api.unlimitedfinancials.{env}', H = { 'accept': 'application/json', 'org-id-req': '<ORGANIZATION ID>' };
  window.__payers = { done: false };
  (async () => {
    const text = '<NAME TEXT>'.toLowerCase();
    const r = await fetch(`${B}/payers/aggregate`, { credentials: 'include', headers: H });
    const j = r.ok ? await r.json() : [];
    const hits = j.filter(p => (p.payerName || '').toLowerCase().includes(text));
    const matches = hits.slice(0, 10).map(p => ({ payerId: p.payerId, payerName: p.payerName, payerType: p.payerType, isInactive: p.isInactive }));
    if (matches.length <= 5) for (const m of matches) { const l = await fetch(`${B}/remittance/reconciliation/payer-literals/${m.payerId}`, { credentials: 'include', headers: H }); m.literals = l.ok ? (await l.json()).payerLiterals : null; }
    window.__payers = { done: true, status: r.status, total: j.length, matchCount: hits.length, matches };
  })().catch(e => { window.__payers = { done: true, err: String(e) }; });
  return 'started';
})()
```

Read `JSON.stringify(window.__payers)`. `payerType` 5 is an assistance payer; do not interpret other values. Then set the check's `payer.name`:
- **One literal:** use it as `payer.name`. Literals are stored upper-case and trimmed, and the upload normalizes the ERA's payer name the same way, so it resolves that payer.
- **Several literals:** show them and ask which.
- **No literal:** say there is no payer-name mapping for this payer, so a payer name on the ERA will not resolve it by name. It is still found when the ERA's claims match claims in the organization (an ERA for a claim of The Dragonfly Foundation resolved that payer with no literal on record). Ask whether to use the payer's own name anyway.

Apply it with a `set` operation on `checks[0].payer.name`.

## Patient

```js
(() => {
  const B = 'https://api.unlimitedfinancials.{env}', H = { 'accept': 'application/json', 'org-id-req': '<ORGANIZATION ID>' };
  window.__patients = { done: false };
  (async () => {
    const r = await fetch(`${B}/population/patients/search?query=${encodeURIComponent('<NAME TEXT>')}&top=10`, { credentials: 'include', headers: H });
    const j = r.ok ? await r.json() : { results: [] };
    window.__patients = { done: true, status: r.status, totalHits: j.totalsHits, matches: (j.results || []).map(x => x.patient).filter(Boolean).map(p => ({ patientId: p.patientId, last: p.lastName, first: p.firstName, middle: p.middleName, suffix: p.suffixName, fan: p.financialAccountNumber, birthDate: p.birthDate })) };
  })().catch(e => { window.__patients = { done: true, err: String(e) }; });
  return 'started';
})()
```

Read `JSON.stringify(window.__patients)`. Show last, first, financial account number and birth date, and ask which. Merge into the claim being edited (ask which claim if there are several) with a `set` operation on its `patient`: `last`, `first`, `middle`, `suffix` (leave out nulls) and `id` from `fan`.

A patient lookup does not link the claim. A claim is linked when its claim number and payer position match a claim in the organization; for that use the claim number flow in `claim-lookup.md`, which fills the patient too.

## Checked on ninja, 2026-10-14

Company "kenwood" returned one match with NPI and legal name. Payer "dragon" returned The Dragonfly Foundation (type 5, no literals) and "cigna" returned Cigna with the literal `AUTOMATION PAYER`. Patient "Crabs" returned one patient. The aggregate payer list held 70 payers: 29 insurance and 41 assistance.
