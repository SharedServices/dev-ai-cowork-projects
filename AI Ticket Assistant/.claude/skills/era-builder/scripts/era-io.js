// era-io.js - the ERA model engine, part 4: talking to the API from the page. Needs era-core.js loaded first, in a tab on the app origin.
// Everything long-running starts and returns 'started'; read E.state for progress and E.read('upload', i) for the result.
(() => {
  const E = globalThis.__era;
  const { L, u } = E._h;

  // E.config('https://api.unlimitedfinancials.ninja', '<organization id>')
  E.config = (apiBase, orgId) => { E.cfg = { apiBase, orgId }; return 'ok'; };
  const hdr = () => ({ 'accept': 'application/json', 'org-id-req': E.cfg.orgId });
  const getJson = async p => (await fetch(E.cfg.apiBase + p, { credentials: 'include', headers: hdr() })).json();

  // Immediate validation: only what exists as soon as the upload returns, the response and the remittance snapshot.
  const verdict = async c => {
    try {
      const s = await getJson(`/remittance/reconciliation/remittance-snapshot/${c.id}`);
      const mc = L(E.model.checks).find(x => String(x.number) === String(c.n));
      const claims = s.remittanceMessage && s.remittanceMessage.claims ? s.remittanceMessage.claims : null;
      const v = { id: c.id, n: c.n, posting: s.postingStatus, deleted: s.isDeleted, amount: s.checkAmount, claims: claims ? claims.length : null, blob: !!s.remittanceMessageStoredInBlobStorage, linked: claims ? claims.filter(x => x.claimId).length : null, company: s.companyId || null, payer: s.payerId || null };
      const issues = [];
      if (String(s.checkNumber) !== String(c.n)) issues.push('check number differs');
      if (mc && u(s.checkAmount) !== u(mc.amount)) issues.push('amount differs');
      if (claims && mc && claims.length !== L(mc.claims).length) issues.push('claim count differs');
      v.verdict = (s.isDeleted || s.postingStatus === 8) ? 'discarded' : issues.length ? 'mismatch: ' + issues.join(', ') : s.postingStatus === 1 ? 'live' : 'posting status ' + s.postingStatus;
      if (!claims && s.remittanceMessageStoredInBlobStorage) v.note = 'message is in blob storage; claim count and links not checked';
      return v;
    } catch (e) { return { id: c.id, n: c.n, verdict: 'snapshot failed: ' + String(e) }; }
  };

  // Renders the model, uploads it, then validates each created check. Result in E.out.upload.
  E.upload = opts => {
    opts = opts || {};
    E.state = { done: false, stage: 'rendering' };
    (async () => {
      const t0 = Date.now();
      const blob = new Blob(E.render(E.model), { type: 'text/plain' });
      const fd = new FormData();
      fd.append('file', new File([blob], `era-builder-${L(E.model.checks)[0].number}.835`, { type: 'text/plain' }));
      fd.append('overrideDuplicates', opts.overrideDuplicates ? 'true' : 'false');
      E.state = { done: false, stage: 'uploading', bytes: blob.size };
      const r = await fetch(`${E.cfg.apiBase}/remittance/era-upload`, { method: 'POST', body: fd, credentials: 'include', headers: { 'org-id-req': E.cfg.orgId } });
      const text = await r.text();
      let body = null; try { body = JSON.parse(text); } catch (e) { /* not JSON */ }
      const res = { status: r.status, bytes: blob.size, ms: Date.now() - t0 };
      if (body) { res.outcome = body.outcome; res.message = body.message; res.checks = L(body.checks).map(c => ({ n: c.checkNumber, st: c.status, id: c.remittanceId, why: c.reason })); }
      else res.body = text.slice(0, 300);
      E.state = { done: false, stage: 'validating' };
      res.verdicts = [];
      for (const c of L(res.checks).filter(x => x.st === 0 && x.id).slice(0, 20)) res.verdicts.push(await verdict(c));
      E.out.upload = JSON.stringify(res);
      E.state = { done: true, stage: 'done' };
    })().catch(e => { E.out.upload = JSON.stringify({ error: String(e) }); E.state = { done: true, stage: 'error' }; });
    return 'started';
  };

  // Loads the model from the file a remittance was uploaded from. { remittanceId, dropCheckNumbers }. Report in E.out.import.
  const loadStored = async opts => {
    const snap = await getJson(`/remittance/reconciliation/remittance-snapshot/${opts.remittanceId}`);
    if (!snap.uploadId) throw new Error('This remittance was not created by an upload, so there is no stored file.');
    const r = await fetch(`${E.cfg.apiBase}/remittance/era-upload/${snap.uploadId}`, { credentials: 'include', headers: hdr() });
    if (!r.ok) throw new Error(`The stored file request returned ${r.status}.`);
    const text = await r.text();
    const { model, report } = E.import(text, { dropCheckNumbers: !!opts.dropCheckNumbers });
    E.model = model; E.complete(model);
    E._base = null; E._source = { remittanceId: opts.remittanceId, dropCheckNumbers: !!opts.dropCheckNumbers }; E._log = [];
    E.out.import = report.join('\n');
    return text.length;
  };
  E.fetchStored = opts => {
    E.state = { done: false, stage: 'fetching' };
    loadStored(opts).then(chars => { E.state = { done: true, stage: 'done', chars, stats: E.stats() }; })
      .catch(e => { E.state = { done: true, stage: 'error', error: String(e) }; });
    return 'started';
  };

  // Rebuilds a saved ERA (the text E.save produced). Starts and returns 'started'; E.state shows when it is done.
  E.restore = recipe => {
    const r = typeof recipe === 'string' ? JSON.parse(recipe) : recipe;
    if (!r || r.format !== 'era-builder-recipe') throw new Error('This is not a saved era-builder file.');
    E.state = { done: false, stage: 'restoring' };
    (async () => {
      if (r.stored) await loadStored(r.stored); else E.load(JSON.parse(JSON.stringify(r.base)));
      if (L(r.ops).length) E.edit(r.ops);
      E.state = { done: true, stage: 'done', name: r.name, stats: E.stats() };
    })().catch(e => { E.state = { done: true, stage: 'error', error: String(e) }; });
    return 'started';
  };

  // Finds remittances by check number (new, pending and discarded ones included). Result in E.out.found, one line each.
  E.findUploads = checkNumber => {
    E.state = { done: false, stage: 'searching' };
    (async () => {
      const r = await fetch(`${E.cfg.apiBase}/snowdrop/remittanceprocessing/remittances/checknumbersearch`, { method: 'POST', credentials: 'include', headers: { ...hdr(), 'content-type': 'application/json' }, body: JSON.stringify({ checkNumber: String(checkNumber), includePending: true }) });
      const j = r.ok ? await r.json() : [];
      E.out.found = j.map(x => `${x.remittanceId} | ${x.checkNumber} | ${x.checkAmount} | ${x.status}`).join('\n');
      E.state = { done: true, stage: 'done', status: r.status, count: j.length };
    })().catch(e => { E.state = { done: true, stage: 'error', error: String(e) }; });
    return 'started';
  };
  // Current-state check for one created check: the grid and the remittance-processing view, which can lag. Result in E.out.current.
  E.currentState = (remittanceId, checkNumber) => {
    E.state = { done: false, stage: 'checking' };
    (async () => {
      const out = {};
      const pend = await getJson('/remittance/reconciliation/pending-checks');
      const p = pend.find(x => x.remittanceId === remittanceId);
      out.pendingChecks = { total: pend.length, found: !!p };
      const d = await fetch(`${E.cfg.apiBase}/remittance/reconciliation/discarded-checks`, { method: 'POST', credentials: 'include', headers: { ...hdr(), 'content-type': 'application/json' }, body: JSON.stringify({ checkNumber }) });
      const dj = d.ok ? await d.json() : [];
      out.discardedChecks = { status: d.status, found: dj.some(x => x.remittanceId === remittanceId) };
      const g = await fetch(`${E.cfg.apiBase}/snowdrop/remittanceprocessing/remittances/${remittanceId}`, { credentials: 'include', headers: hdr() });
      const gj = g.ok ? await g.json() : null;
      out.remittanceProcessing = { status: g.status, checkNumber: gj && gj.checkNumber, checkAmount: gj && gj.checkAmount, remittanceStatus: gj && gj.status, claimPayments: gj && gj.claimPayments ? gj.claimPayments.length : null };
      E.out.current = JSON.stringify(out);
      E.state = { done: true, stage: 'done' };
    })().catch(e => { E.out.current = JSON.stringify({ error: String(e) }); E.state = { done: true, stage: 'error' }; });
    return 'started';
  };

  // ---------- claim sampling (prototype) ----------
  // findClaims: one search-by-patient call for a company (or a patient) and a date of service. The list is kept in E._claims.
  // buildClaims: picks claims at random from that list, loads each claim's view, and builds one check per payer. Timings in E.out.build.
  // opts for findClaims: { dateOfService: 'yyyy-MM-dd' or dateFrom/dateTo (a range, one search per day), companyId, patient: { last, first, fan, dob }, payerId, payerIdInRequest, claimTypes (default [4, 6]), stopAt, concurrency }
  // payerId filters the result in the page; it is sent in the request only when payerIdInRequest is true (the API has to accept it first).
  const ROUTES = {
    professional: id => `/snowdrop/invoices/claims/${id}/change-healthcare/professional`,
    institutional: id => `/snowdrop/invoices/claims/${id}/change-healthcare/institutional`,
    crossover: id => `/snowdrop/invoices/claims/${id}/crossover`
  };
  // ClaimType: 0 Professional Paper, 1 ANSI 5010 Professional, 2 Institutional Paper, 3 ANSI 5010 Institutional, 4 Professional Electronic,
  // 5 Institutional Electronic, 6 Crossover. Paper claims are printed, not remitted, so they do not belong on an ERA. Types 1 and 3 have no
  // claim view route here. Institutional electronic (5) is left out: its view has no service lines and no billed amount. Default: types 4 and 6.
  const DEFAULT_TYPES = [4, 6];
  const routeOrder = t => (String(t) === '6' ? ['crossover', 'professional', 'institutional'] : String(t) === '5' ? ['institutional', 'professional', 'crossover'] : ['professional', 'institutional', 'crossover']);
  const pct = (a, p) => (a.length ? a.slice().sort((x, y) => x - y)[Math.min(a.length - 1, Math.floor(a.length * p))] : null);

  const dayList = (from, to) => {
    const out = [], d = new Date(from + 'T00:00:00Z'), end = new Date(to + 'T00:00:00Z');
    for (; d <= end; d.setUTCDate(d.getUTCDate() + 1)) out.push(d.toISOString().slice(0, 10));
    return out;
  };

  // A date range (dateFrom, dateTo, inclusive) runs the single-date search once per day, 8 at a time, in random day order, and merges the
  // results by claim id. stopAt ends the scan once that many claims (after the payer filter) have been found, so a small sample
  // does not scan the whole range. Timings of the searches are in the state.
  E.findClaims = opts => {
    opts = opts || {};
    E.state = { done: false, stage: 'searching' };
    (async () => {
      const p = opts.patient || {};
      const searchDate = async date => {
        const body = { lastName: p.last || null, firstName: p.first || null, patientFAN: p.fan || null, dateOfBirth: p.dob || null, dateOfService: date, companyId: opts.companyId || null };
        if (opts.payerIdInRequest && opts.payerId) body.payerId = opts.payerId;
        const t0 = Date.now();
        const r = await fetch(`${E.cfg.apiBase}/snowdrop/remittanceprocessing/claims/search-by-patient`, { method: 'POST', credentials: 'include', headers: { ...hdr(), 'content-type': 'application/json' }, body: JSON.stringify(body) });
        const text = await r.text();
        let j = null; try { j = JSON.parse(text); } catch (e) { /* not JSON */ }
        const list = Array.isArray(j) ? j : (j && j.claimId ? [j] : (j && Array.isArray(j.claims) ? j.claims : []));
        return { status: r.status, ok: r.ok, ms: Date.now() - t0, list, text };
      };
      const ranged = !!opts.dateFrom;
      const dates = ranged ? dayList(opts.dateFrom, opts.dateTo || opts.dateFrom) : [opts.dateOfService];
      if (ranged) for (let i = dates.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [dates[i], dates[j]] = [dates[j], dates[i]]; }
      const seen = new Map(), skipped = new Map(), durs = [];
      const allowed = new Set((opts.claimTypes || DEFAULT_TYPES).map(String));
      let next = 0, searched = 0, failed = 0, raw = 0, daysWithClaims = 0, status = null, sample = null;
      const t0 = Date.now();
      const worker = async () => {
        while (next < dates.length && !(opts.stopAt && seen.size >= opts.stopAt)) {
          const date = dates[next++];
          try {
            const r = await searchDate(date);
            durs.push(r.ms); searched++; status = r.status;
            if (!r.ok) { failed++; sample = sample || r.text.slice(0, 200); }
            raw += r.list.length;
            const forPayer = opts.payerId ? r.list.filter(x => String(x.payerId).toLowerCase() === String(opts.payerId).toLowerCase()) : r.list;
            const kept = forPayer.filter(x => allowed.has(String(x.claimType)));
            for (const x of forPayer) if (!allowed.has(String(x.claimType))) skipped.set(x.claimId, x.claimType);
            if (kept.length) daysWithClaims++;
            for (const x of kept) seen.set(x.claimId, x);
          } catch (e) { failed++; sample = sample || String(e); }
          if (ranged) E.state = { done: false, stage: 'searching', dates: dates.length, searched, found: seen.size, failed };
        }
      };
      await Promise.all(Array.from({ length: ranged ? (opts.concurrency || 8) : 1 }, worker));
      const list = [...seen.values()];
      E._claims = list;
      E._claimsRequest = { companyId: opts.companyId || null, dateOfService: opts.dateOfService, dateFrom: opts.dateFrom, dateTo: opts.dateTo };
      const byPayer = {};
      for (const x of list) byPayer[x.payerId] = (byPayer[x.payerId] || 0) + 1;
      E.out.claims = list.map(x => `${x.claimId} | ${x.claimNumber} | type ${x.claimType} | payer ${x.payerId} | pos ${x.payerPosition} | ${x.patientName} | balance ${x.claimBalance}`).join('\n');
      E.out.byPayer = Object.keys(byPayer).map(k => `${k} | ${byPayer[k]}`).join('\n');
      const st = { done: true, stage: 'done', status, ms: Date.now() - t0, count: list.length, payers: Object.keys(byPayer).length, keys: list[0] ? Object.keys(list[0]).join(',') : '' };
      if (ranged) Object.assign(st, { dates: dates.length, searched, failed, daysWithClaims, avgMs: durs.length ? Math.round(durs.reduce((a, b) => a + b, 0) / durs.length) : null, p95Ms: pct(durs, 0.95), maxMs: durs.length ? Math.max(...durs) : null, stoppedEarly: searched < dates.length });
      if (opts.payerId && raw !== list.length + skipped.size) st.filteredOut = raw - list.length - skipped.size;
      if (skipped.size) { const by = {}; for (const t of skipped.values()) by[t] = (by[t] || 0) + 1; st.skippedByType = Object.keys(by).map(t => `${t}:${by[t]}`).join(','); }
      if (failed || (!list.length && !raw)) st.body = sample || '';
      E.state = st;
    })().catch(e => { E.state = { done: true, stage: 'error', error: String(e) }; });
    return 'started';
  };

  // opts: { count (default all found, at most max), max (default 1000), concurrency (default 8), append (add to the current model instead of replacing it), payerLiteral (one payer name for all claims of a company: one check instead of one per policy payer) }
  E.buildClaims = opts => {
    opts = opts || {};
    const all = E._claims || [];
    if (!all.length) throw new Error('No claims found yet. Run findClaims first.');
    const n = Math.min(opts.count || all.length, all.length, opts.max || 1000);
    const pool = all.slice();
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
    const picked = pool.slice(0, n);
    E.state = { done: false, stage: 'building', total: n, built: 0, failed: 0 };
    (async () => {
      const t0 = Date.now(), durs = [], fails = [], groups = new Map(), companies = {};
      const getJ = async path => {
        const t = Date.now();
        const r = await fetch(E.cfg.apiBase + path, { credentials: 'include', headers: hdr() });
        const out = { status: r.status, json: r.ok ? await r.json() : null };
        durs.push(Date.now() - t);
        return out;
      };
      const company = id => (companies[id] = companies[id] || getJ(`/snowdrop/resources/companies/${id}`));
      let next = 0, built = 0, zeroSvc = 0;
      const worker = async () => {
        while (next < picked.length) {
          const c = picked[next++];
          try {
            let view = null;
            for (const k of routeOrder(c.claimType)) { const r = await getJ(ROUTES[k](c.claimId)); if (r.status === 200) { view = r.json; break; } }
            if (!view) { fails.push(`${c.claimNumber} (type ${c.claimType}): no claim view`); continue; }
            const charges = view.charges || [];
            if (!charges.length) { fails.push(`${c.claimNumber} (type ${c.claimType}): no charges`); continue; }
            const companyId = (view.company && view.company.companyId) || (E._claimsRequest && E._claimsRequest.companyId);
            const co = ((await company(companyId)).json) || {};
            // Services come from the service lines, which hold the amount billed and the units. The charge fee can be 0 on a settled charge,
            // and several same-code charges can share one chargeId in the lines, so lines are not looked up by charge. Without lines, use the charges.
            const lineList = (view.serviceLines && view.serviceLines.serviceLines) || [];
            const dateOf = {}, balOf = {}, lineCount = {};
            for (const ch of charges) { dateOf[ch.chargeId] = ch.dateOfService; if (ch.balance != null && Number.isFinite(Number(ch.balance))) balOf[ch.chargeId] = Number(ch.balance); }
            for (const l of lineList) lineCount[l.chargeId] = 1 + (lineCount[l.chargeId] || 0);
            const serviceRows = lineList.length
              ? lineList.map(l => ({ code: l.chargeCode, modifiers: l.modifiers, units: Number(l.units || 1), amt: Number(l.chargeAmount), date: dateOf[l.chargeId] || charges[0].dateOfService, bal: lineCount[l.chargeId] === 1 ? balOf[l.chargeId] : undefined }))
              : charges.map(ch => ({ code: ch.chargeCode, modifiers: ch.modifiers, units: 1, amt: Number(ch.fee), date: ch.dateOfService, bal: balOf[ch.chargeId] }));
            const sub = view.claimInformation && view.claimInformation.subscriber;
            // The ERA's patient id (NM1*QC) is the payer's member id (the policy number), not the financial account number.
            // The insured (NM1*IL) is only written when the subscriber is a different person from the patient.
            const memberId = (view.policy && view.policy.policyNumber) || (sub && sub.policyNumber) || undefined;
            const same = (a, b) => String(a || '').trim().toLowerCase() === String(b || '').trim().toLowerCase();
            const subscriberIsPatient = !sub || (view.patient && same(sub.lastName, view.patient.lastName) && same(sub.firstName, view.patient.firstName));
            const pol = view.policy || {}, payerAddress = {};
            if (pol.addressLine1) payerAddress.addressLine1 = pol.addressLine1;
            if (pol.addressLine2) payerAddress.addressLine2 = pol.addressLine2;
            if (pol.city) payerAddress.city = pol.city;
            if (pol.state) payerAddress.state = pol.state;
            if (pol.zipCode) payerAddress.zip = pol.zipCode;
            const claim = {
              claimNumber: view.invoiceNumber || c.claimNumber, status: String(c.payerPosition || 1), date: view.dateRangeStart || undefined, icn: view.icn || undefined,
              patient: { last: view.patient && view.patient.lastName, first: view.patient && view.patient.firstName, id: memberId },
              insured: subscriberIsPatient ? undefined : (sub ? { last: sub.lastName, first: sub.firstName, id: sub.policyNumber } : undefined),
              serviceProviderId: view.billingProvider && view.billingProvider.npi,
              services: serviceRows.map(s => {
                if (!(s.amt > 0)) zeroSvc++;
                const svc = { procedure: s.code, modifiers: s.modifiers, units: s.units, billed: s.amt, paid: s.amt, serviceDate: s.date };
                // The charge balance already has the expected contractual adjustment taken off: pay the balance and adjust the rest as CO-45.
                if (Number.isFinite(s.bal)) {
                  svc.chargeBalance = s.bal;
                  svc.allowed = Math.round(Math.min(s.bal, s.amt) * 100) / 100;
                  if (s.bal < s.amt) { svc.paid = Math.round(s.bal * 100) / 100; svc.adjustments = [{ group: 'CO', reason: '45', amount: Math.round((s.amt - s.bal) * 100) / 100 }]; }
                }
                return svc;
              })
            };
            // With opts.payerLiteral every claim of a company goes on one check under that payer name (several policy payers can share one check).
            const key = opts.payerLiteral ? `|${companyId}` : `${c.payerId}|${companyId}`;
            if (!groups.has(key)) groups.set(key, { payer: opts.payerLiteral ? { name: String(opts.payerLiteral), ...payerAddress } : { name: view.policy && view.policy.payerName, ...payerAddress }, payee: { name: co.name, idCode: co.npi, taxId: co.taxId }, claims: [] });
            groups.get(key).claims.push(claim);
            built++;
          } catch (e) { fails.push(`${c.claimNumber}: ${String(e)}`); }
          E.state = { done: false, stage: 'building', total: n, built, failed: fails.length };
        }
      };
      await Promise.all(Array.from({ length: opts.concurrency || 8 }, worker));
      const buildMs = Date.now() - t0;
      const checks = [...groups.values()];
      if (checks.length) {
        if (opts.append && E.model) E.edit(checks.map(c => ({ op: 'add', path: 'checks', value: c })));
        else E.load({ checks });
      }
      const byType = {};
      for (const c of picked) byType[c.claimType] = (byType[c.claimType] || 0) + 1;
      E.out.build = JSON.stringify({ requested: n, built, failed: fails.length, firstFailures: fails.slice(0, 5), checks: checks.length, ms: buildMs, calls: durs.length, avgMs: durs.length ? Math.round(durs.reduce((a, b) => a + b, 0) / durs.length) : null, p50Ms: pct(durs, 0.5), p95Ms: pct(durs, 0.95), maxMs: durs.length ? Math.max(...durs) : null, concurrency: opts.concurrency || 8, msPerClaim: built ? Math.round(buildMs / built) : null, pickedByType: byType, zeroBilledServices: zeroSvc });
      E.state = { done: true, stage: 'done', built, failed: fails.length, ms: buildMs, stats: checks.length ? E.stats() : null };
    })().catch(e => { E.state = { done: true, stage: 'error', error: String(e) }; });
    return 'started';
  };

  // Size of the X12 the current model renders to, without sending it.
  E.size = () => new Blob(E.render(E.model)).size;
})();
