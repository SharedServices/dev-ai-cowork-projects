# Filling a check from a claim number

Run both scripts in the Chrome tab described in `send-via-chrome.md` (a tab on the app origin, signed in). Substitute `{env}` and `<ORGANIZATION ID>`. `javascript_tool` output is cut off at about 1 to 2 KB, so the scripts run in the page and keep only a small result on `window`. Start them, then read the result in a second call (see `lookups.md`).

## 1. Search

```js
(() => {
  window.__claimSearch = { done: false };
  fetch('https://api.unlimitedfinancials.{env}/snowdrop/invoices/claims/claimnumbersearch', {
    method: 'POST', credentials: 'include',
    headers: { 'accept': 'application/json', 'content-type': 'application/json', 'org-id-req': '<ORGANIZATION ID>' },
    body: JSON.stringify({ claimNumber: '<CLAIM NUMBER>' })
  }).then(async r => {
    const j = r.ok ? await r.json() : [];
    window.__claimSearch = { done: true, status: r.status, matches: j.map(x => ({ claimId: x.claimId, invoiceType: x.invoiceType, claimStatus: x.claimStatus, payerName: x.payerName, claimTotal: x.claimTotal })) };
  }).catch(e => { window.__claimSearch = { done: true, err: String(e) }; });
  return 'started';
})()
```

Then read `JSON.stringify(window.__claimSearch)`. A claim number can match several claims (for example a primary and a crossover). Show each match (type, payer, status, total) and ask which one when there is more than one. If there are no matches, say so.

## 2. Build the claim

Run it for the chosen `claimId` and `invoiceType`. It loads the claim view for that type, the company, and the claim's payer position, and returns a small object shaped like the model.

```js
(() => {
  const B = 'https://api.unlimitedfinancials.{env}', ORG = '<ORGANIZATION ID>';
  const claimId = '<CLAIM ID>', invoiceType = '<INVOICE TYPE>';
  const H = { 'accept': 'application/json', 'content-type': 'application/json', 'org-id-req': ORG };
  const getJ = async p => { const r = await fetch(B + p, { credentials: 'include', headers: H }); return { status: r.status, json: r.ok ? await r.json() : null }; };
  const postJ = async (p, b) => { const r = await fetch(B + p, { method: 'POST', credentials: 'include', headers: H, body: JSON.stringify(b) }); return { status: r.status, json: r.ok ? await r.json() : null }; };
  const routes = { professional: id => `/snowdrop/invoices/claims/${id}/change-healthcare/professional`, institutional: id => `/snowdrop/invoices/claims/${id}/change-healthcare/institutional`, crossover: id => `/snowdrop/invoices/claims/${id}/crossover` };
  const order = t => /institutional/i.test(t) ? ['institutional', 'professional', 'crossover'] : /crossover/i.test(t) ? ['crossover', 'professional', 'institutional'] : ['professional', 'institutional', 'crossover'];
  window.__claimBuilt = { done: false };
  (async () => {
    const tried = []; let view = null, kind = null;
    for (const k of order(invoiceType)) { const r = await getJ(routes[k](claimId)); tried.push(`${k}:${r.status}`); if (r.status === 200) { view = r.json; kind = k; break; } }
    if (!view) { window.__claimBuilt = { done: true, error: 'no claim view route returned 200', tried }; return; }
    const companyId = view.company && view.company.companyId;
    const co = await getJ(`/snowdrop/resources/companies/${companyId}`);
    const rp = await postJ('/snowdrop/remittanceprocessing/claims/search-by-claimnumber', { claimNumber: view.invoiceNumber, companyId });
    const pos = (rp.json || []).find(x => x.claimId === claimId);
    const lines = {}; for (const l of ((view.serviceLines && view.serviceLines.serviceLines) || [])) lines[l.chargeId] = l;
    const sub = view.claimInformation && view.claimInformation.subscriber;
    // The ERA's patient id (NM1*QC) is the payer's member id, which is the policy number, not the provider's financial account number.
    // The insured (NM1*IL) is only written when the subscriber is a different person from the patient.
    const memberId = (view.policy && view.policy.policyNumber) || (sub && sub.policyNumber) || undefined;
    const same = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
    const subscriberIsPatient = !sub || (view.patient && same(sub.lastName, view.patient.lastName) && same(sub.firstName, view.patient.firstName));
    const c = co.json || {};
    const pol = view.policy || {}, payerAddress = {};
    if (pol.addressLine1) payerAddress.addressLine1 = pol.addressLine1;
    if (pol.addressLine2) payerAddress.addressLine2 = pol.addressLine2;
    if (pol.city) payerAddress.city = pol.city;
    if (pol.state) payerAddress.state = pol.state;
    if (pol.zipCode) payerAddress.zip = pol.zipCode;
    window.__claimBuilt = { done: true, source: kind, tried, payerPosition: pos ? pos.payerPosition : null,
      check: { payer: { name: view.policy && view.policy.payerName, ...payerAddress }, payee: { name: c.name, idCode: c.npi, taxId: c.taxId } },
      claim: {
        claimNumber: view.invoiceNumber, status: pos ? String(pos.payerPosition) : '1', date: view.dateRangeStart, icn: view.icn || undefined,
        patient: { last: view.patient && view.patient.lastName, first: view.patient && view.patient.firstName, id: memberId },
        insured: subscriberIsPatient ? undefined : (sub ? { last: sub.lastName, first: sub.firstName, id: sub.policyNumber } : undefined),
        serviceProviderId: view.billingProvider && view.billingProvider.npi,
        services: (view.charges || []).map(ch => {
          const svc = { procedure: ch.chargeCode, modifiers: ch.modifiers, units: Number((lines[ch.chargeId] || {}).units || 1), billed: ch.fee, paid: ch.fee, serviceDate: ch.dateOfService };
          // The charge balance already has the expected contractual adjustment taken off: pay the balance, adjust the rest as CO-45.
          if (ch.balance != null && Number.isFinite(Number(ch.balance))) {
            svc.chargeBalance = Number(ch.balance);
            if (svc.chargeBalance < ch.fee) { svc.paid = Math.round(svc.chargeBalance * 100) / 100; svc.adjustments = [{ group: 'CO', reason: '45', amount: Math.round((ch.fee - svc.chargeBalance) * 100) / 100 }]; }
            svc.allowed = Math.round(Math.min(svc.chargeBalance, ch.fee) * 100) / 100;
          }
          return svc;
        })
      } };
  })().catch(e => { window.__claimBuilt = { done: true, err: String(e) }; });
  return 'started';
})()
```

Then read `JSON.stringify(window.__claimBuilt)`. Confirmed on ninja on 2026-10-14 for a professional electronic claim (`professional` route) and its crossover claim (`crossover` route). Not yet run for an institutional claim; the `institutional` route comes from the spec. If no route returns 200, say which routes were tried and stop.

## 3. Merge into the model

Apply the result with `__era.edit([...])` (operations are in `engine.md`; a `set` also clears the "generated" label on that field).

- Add the claim to a check: `{op:'add', path:'checks[0].claims', value:<claim>}`. A check has one payer name. By default, claims for different policy payers go in different checks (the primary and its crossover are two checks); add a check first with `{op:'add', path:'checks', value:{}}` and use its index. A real ERA can hold claims for several policy payers under one payer name: the production example had one payer literal (`AETNA`) over two policy payers (Medicare Advantage and Aetna). To build that, put the claims on one check under the literal (the bulk builder does this with `payerLiteral`). The system accepts it: a claim payment whose payer differs from the check's payer gets a `PayerMismatched` exception, which is not blocking (`ClaimPayment.cs` and `PaymentExceptions.cs` in remittance processing), and all 16 claims of the production example posted. The check's payer comes from the payer literal (or from the claims when there is no literal); each claim payment keeps the payer of its own invoice.
- Set the check's `payer.name` and `payee` (name, idCode, taxId) from the result with `set` operations, unless the user already set them. The payee tax id is the real company's, so the remittance is not discarded.
- `status` is the claim's payer position (1 primary, 2 secondary, 3 tertiary). If `payerPosition` is null it defaulted to 1; tell the user.
- Services default to paying the charge balance. Each charge in the claim view has a `fee` and a `balance`; the balance already has the expected contractual adjustment taken off. When the balance is below the fee, the service is paid the balance with one `CO-45` adjustment for fee minus balance (confirmed on team, org SDHB-2: for five charges on three claims the fee minus balance matched the expected contractual adjustment to the cent, and the claim paid totals matched the claims' open balances). When the balance equals the fee, the service is paid in full with no adjustment. The allowed amount (`AMT*B6`) is set to the same balance (fee minus the CO-45 adjustment). The service keeps `chargeBalance` (lookup information only, never written to the X12).
- The service-level rendering provider (`REF*HPI`) is not written by default. A real production ERA (cloud, org ALOC, 16 claims, 37 lines) had no `REF*HPI` on any service line, so a payer does not necessarily send it. Set `renderingProviderId` on a service only when the user asks. The claim-level provider (`NM1*82`) is the billing provider's NPI: on 10 of 10 production claims the real ERA's `NM1*82` NPI equalled the invoice's billing provider NPI, which also equalled its rendering provider NPI (the data cannot say which one a payer would use when they differ). The payer's address (`addressLine1`, `addressLine2`, `city`, `state`, `zip`) comes from the claim view's `policy` (`zipCode` there). Confirmed on team, org SDHB-2: the policy held the Tricare PO box address.
- The patient id (`NM1*QC` element 9, stored as the HICN) is the policy number, the payer's member id, not the patient's financial account number. Confirmed on production (cloud, org ALOC): for 10 of 10 claims of a real Aetna ERA the `QC` id equals the invoice's policy number and never the financial account number. The insured (`NM1*IL`) is written only when the subscriber is a different person from the patient (the real ERA has no `NM1*IL`).
- The invoice balance does not predict what a payer pays: on a production Aetna ERA every charge had balance equal to fee, and the payer paid about a quarter of billed with its own adjustments. To model a payer, use the `payer` edit operation (`engine.md`, "Payer behaviour") after the lookup.
- The balance line warns when a service's paid amount is more than its `chargeBalance`. Relay that warning when the user asks for more than the balance (for example full payment on a charge with an expected adjustment), and say that claim payments above the open balance are a test case, not a default. Ask what payment the user wants: the balance (default), full, partial, deny, or specific adjustments. Keep service billed minus paid equal to the adjustments.
- Claim totals are left to be computed from the services.
- The crossover view has no service line units and no subscriber, so units default to 1 and the insured has only the policy number.
- Remind the user that claim payments only link when the claim number and payer position match a claim in the target organization, which they do here because the data came from it.
