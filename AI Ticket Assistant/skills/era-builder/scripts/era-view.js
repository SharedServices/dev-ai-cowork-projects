// era-view.js - the ERA model engine, part 3: the markdown view. Needs era-core.js loaded first.
// E.view() builds the text into E.out.view; read it back in slices with E.read('view', i). Small ERAs get the full tables,
// large ones a summary. E.view({ check: 1, from: 100, to: 110 }) shows a range of claims (and their services) of one check.
(() => {
  const E = globalThis.__era;
  const { has, L, u, fmtU } = E._h;
  const STATUS = { 1: 'Primary', 2: 'Secondary', 3: 'Tertiary', 4: 'Denied', 19: 'Primary, forwarded', 20: 'Secondary, forwarded', 21: 'Tertiary, forwarded', 22: 'Reversal', 23: 'Not our claim' };
  const FULL_CLAIMS = 25, FULL_SERVICES = 80;

  const cell = v => (v == null || String(v) === '' ? '—' : String(v).replace(/\|/g, '/'));
  const m2 = v => {
    if (v == null || String(v) === '') return '—';
    let r = Math.round(Number(v) * 100) / 100;
    if (Object.is(r, -0)) r = 0;
    return r.toFixed(2);
  };
  const tag = (o, name) => {
    if (!L(o && o.generated).includes(name)) return '';
    const word = ['amount', 'billed', 'paid'].includes(name) ? 'computed' : ['number', 'claimNumber', 'icn'].includes(name) ? 'generated' : 'default';
    return ` (${word})`;
  };
  const addr = o => {
    const parts = [];
    if (has(o, 'addressLine1')) parts.push(o.addressLine1);
    if (has(o, 'addressLine2')) parts.push(o.addressLine2);
    if (has(o, 'city')) parts.push(o.city);
    const sz = `${o.state == null ? '' : o.state} ${o.zip == null ? '' : o.zip}`.trim();
    if (sz) parts.push(sz);
    return cell(parts.join(', '));
  };
  const adjText = adjs => L(adjs).map(a => `${a.group}-${a.reason} ${m2(a.amount)}`).join(', ');

  const CLAIM_FIELDS = { insured: 'insured', secondId: 'second id', forwardedTo: 'forwarded-to', serviceProviderId: 'service provider id', remarkCodes: 'remark codes', adjustments: 'claim-level adjustments', supplementalAmounts: 'supplemental amounts', patientResponsibility: 'patient responsibility (set to override the calculation)' };
  const SERVICE_FIELDS = { modifiers: 'modifiers', sentProcedure: 'sent procedure', sentUnits: 'sent quantity', periodStart: 'service period start', periodEnd: 'service period end', lineControlNumber: 'line control number', renderingProviderId: 'rendering provider id', remarks: 'remarks', supplementalAmounts: 'supplemental amounts' };
  const unset = (items, fields) => Object.keys(fields).filter(k => !items.some(i => L(i[k]).length > 0)).map(k => fields[k]).join(', ');

  const checkTable = (c, pla) => [
    '| Field | Value |', '|---|---|',
    `| Check number | ${cell(c.number)}${tag(c, 'number')} |`,
    `| Check date | ${cell(c.date)}${tag(c, 'date')} |`,
    `| Check amount | ${m2(c.amount)}${tag(c, 'amount')} |`,
    `| Payer name | ${cell(c.payer.name)}${tag(c.payer, 'name')} |`,
    `| Payer address | ${addr(c.payer)} |`,
    `| Payee name | ${cell(c.payee.name)}${tag(c.payee, 'name')} |`,
    `| Payee id code | ${cell(c.payee.idCode)} |`,
    `| Payee tax id | ${cell(c.payee.taxId)} |`,
    `| Payee address | ${addr(c.payee)} |`,
    `| Provider adjustments | ${cell(pla)} |`
  ];

  const claimRow = (cl, i) => {
    let patient = '—';
    if (has(cl, 'patient')) patient = `${cl.patient.last}, ${cl.patient.first}` + (has(cl.patient, 'middle') ? ` ${cl.patient.middle}` : '') + (has(cl.patient, 'id') ? ` (${cl.patient.id})` : '');
    const status = `${cl.status} ${STATUS[String(cl.status)] || ''}`.trim();
    const resp = has(cl, 'patientResponsibility') ? m2(cl.patientResponsibility) : 'blank';
    return `| ${i} | ${cell(cl.claimNumber)}${tag(cl, 'claimNumber')} | ${status} | ${cell(patient)} | ${m2(cl.billed)}${tag(cl, 'billed')} | ${m2(cl.paid)}${tag(cl, 'paid')} | ${resp} | ${cell(cl.icn)}${tag(cl, 'icn')} | ${cell(cl.date)}${tag(cl, 'date')} | ${cell(adjText(cl.adjustments))} |`;
  };
  const CLAIM_HEAD = ['| # | Claim number | Status | Patient (id) | Billed | Paid | Patient resp. | ICN | Claim date | Adjustments |', '|---|---|---|---|---|---|---|---|---|---|'];
  const SVC_HEAD = ['| Claim | Procedure | Modifiers | Units | Billed | Paid | Allowed | Adjustments | Service date |', '|---|---|---|---|---|---|---|---|---|'];
  const svcRow = (s, i) => `| ${i} | ${cell(s.procedure)} | ${cell(L(s.modifiers).map(String).join(', '))} | ${cell(s.units)} | ${m2(s.billed)} | ${m2(s.paid)} | ${m2(s.allowed)} | ${cell(adjText(s.adjustments))} | ${cell(s.serviceDate)}${tag(s, 'serviceDate')} |`;

  const balance = (m, max) => {
    const issues = E.check(m), out = [''];
    if (issues.length) { out.push(max < 100 ? `**Balance issues** (${issues.length})` : '**Balance issues**'); issues.slice(0, max).forEach(x => out.push(`- ${x}`)); if (issues.length > max) out.push(`- ... and ${issues.length - max} more`); }
    else out.push("**Balance:** Balanced. Service billed minus paid equals the adjustments, claim totals match their services, and the check amount equals the claims' paid total.");
    return out;
  };

  E.view = opts => {
    opts = opts || {};
    const m = E.model, checks = L(m.checks), out = [];
    const allClaims = checks.flatMap(c => L(c.claims)), allSvcs = allClaims.flatMap(cl => L(cl.services));
    const summary = opts.mode ? opts.mode === 'summary' : (allClaims.length > FULL_CLAIMS || allSvcs.length > FULL_SERVICES);

    // A range of claims of one check.
    if (opts.from != null) {
      const c = checks[(opts.check || 1) - 1], claims = L(c.claims), a = Math.max(1, opts.from), b = Math.min(claims.length, opts.to || opts.from);
      out.push(`**Claims ${a} to ${b} of ${claims.length}, check ${cell(c.number)}**`, '', ...CLAIM_HEAD);
      for (let i = a; i <= b; i++) out.push(claimRow(claims[i - 1], i));
      const rows = [];
      for (let i = a; i <= b; i++) for (const s of L(claims[i - 1].services)) rows.push(svcRow(s, i));
      if (rows.length) out.push('', '**Services**', '', ...SVC_HEAD, ...rows.slice(0, 60));
      if (rows.length > 60) out.push('', `... ${rows.length - 60} more service rows in this range. Ask for a smaller range.`);
      E.out.view = out.join('\n');
      return JSON.stringify({ chars: E.out.view.length, slices: Math.ceil(E.out.view.length / 600) });
    }

    checks.forEach((c, k) => {
      const claims = L(c.claims), svcs = claims.flatMap(cl => L(cl.services));
      const pla = L(c.providerAdjustments).map(p => `${p.reasonCode} ${m2(p.amount)}` + (has(p, 'providerId') ? ` (provider ${p.providerId}` + (has(p, 'fiscalDate') ? `, ${p.fiscalDate}` : '') + ')' : '')).join('; ');
      out.push('', `**Check ${k + 1} of ${checks.length}**`, '', ...checkTable(c, pla), '');
      if (claims.length === 0) { out.push('**Claims:** none yet.'); return; }
      if (!summary) {
        out.push('**Claims**', '', ...CLAIM_HEAD);
        claims.forEach((cl, i) => out.push(claimRow(cl, i + 1)));
        if (svcs.length) {
          out.push('', '**Services**', '', ...SVC_HEAD);
          claims.forEach((cl, i) => L(cl.services).forEach(s => out.push(svcRow(s, i + 1))));
        }
      } else {
        const counts = {};
        claims.forEach(cl => { counts[cl.status] = (counts[cl.status] || 0) + 1; });
        const stat = Object.keys(counts).map(s => `${s} ${STATUS[s] || ''} x${counts[s]}`.replace('  ', ' ')).join(', ');
        out.push(`**Claims:** ${claims.length} claims, ${svcs.length} services. Billed ${m2(claims.reduce((t, cl) => t + (has(cl, 'billed') ? u(cl.billed) : 0), 0) / 10000)}, paid ${m2(claims.reduce((t, cl) => t + (has(cl, 'paid') ? u(cl.paid) : 0), 0) / 10000)}. Statuses: ${stat}.`, '');
        const shown = claims.length <= 4 ? claims.map((cl, i) => i) : [0, 1, 2, claims.length - 1];
        out.push(...CLAIM_HEAD);
        shown.forEach((i, j) => { if (j === 3 && claims.length > 4) out.push(`| ... | ${claims.length - 4} more claims | | | | | | | | |`); out.push(claimRow(claims[i], i + 1)); });
        const rows = [];
        shown.slice(0, 3).forEach(i => L(claims[i].services).forEach(s => rows.push(svcRow(s, i + 1))));
        if (rows.length) out.push('', '**Services of the first claims**', '', ...SVC_HEAD, ...rows.slice(0, 12));
        out.push('', `This is a summary. Ask for a range, for example claims 100 to 110 of check ${k + 1}.`);
      }
    });
    out.push('', '**Also available, not set**', `- **Claim:** ${unset(allClaims, CLAIM_FIELDS)}`, `- **Service:** ${unset(allSvcs, SERVICE_FIELDS)}`);
    out.push(...balance(m, summary ? 5 : 1000));
    E.out.view = out.join('\n');
    return JSON.stringify({ chars: E.out.view.length, slices: Math.ceil(E.out.view.length / 600), summary });
  };
})();
