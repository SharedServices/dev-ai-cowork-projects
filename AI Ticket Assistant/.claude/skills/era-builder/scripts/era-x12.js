// era-x12.js - the ERA model engine, part 2: X12 rendering and X12 reading. Needs era-core.js loaded first.
(() => {
  const E = globalThis.__era;
  const { has, L, money, txt, pad, rand } = E._h;

  const d8 = v => {
    if (v == null || String(v) === '') return '';
    const s = String(v);
    let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (m) return m[1] + m[2] + m[3];
    if (/^\d{8}$/.test(s)) return s;
    throw new Error(`Date "${s}" is not yyyy-MM-dd or yyyyMMdd.`);
  };
  const dt = v => (/^\d{8}$/.test(String(v)) ? `${v.slice(0, 4)}-${v.slice(4, 6)}-${v.slice(6, 8)}` : String(v));
  const addList = (o, k, item) => { (o[k] = o[k] || []).push(item); };

  // ---------- X12 rendering ----------
  const seg = e => {
    const x = e.map(v => (v == null ? '' : String(v)));
    while (x.length > 1 && x[x.length - 1] === '') x.pop();
    return x.join('*') + '~';
  };

  // The system's parser reads CAS pairs 1 to 4 correctly and pairs 5 and 6 wrongly, so at most 4 pairs per segment.
  // Adjustments keep their order: a new segment starts when the group code changes or 4 pairs are reached.
  const casSegs = adjs => {
    const items = L(adjs).filter(Boolean), out = [];
    let i = 0;
    while (i < items.length) {
      const group = String(items[i].group == null ? '' : items[i].group);
      const e = ['CAS', group];
      let n = 0;
      while (i < items.length && String(items[i].group == null ? '' : items[i].group) === group && n < 4) {
        const a = items[i];
        e.push(a.reason == null ? '' : String(a.reason), money(a.amount), '');
        i++; n++;
      }
      out.push(seg(e));
    }
    return out;
  };

  const address = (s, o) => {
    if (has(o, 'addressLine1')) s.push(seg(['N3', txt(o.addressLine1), txt(o.addressLine2)]));
    if (has(o, 'city')) s.push(seg(['N4', txt(o.city), txt(o.state), txt(o.zip)]));
  };
  const nameSeg = (q, kind, p, idQual) => seg(['NM1', q, kind, txt(p.last), txt(p.first), txt(p.middle), '', txt(p.suffix), has(p, 'id') ? idQual : '', txt(p.id)]);

  const renderCheck = (c, ctl, rnd) => {
    const s = [];
    s.push(seg(['ST', '835', ctl]));
    s.push(seg(['BPR', '', money(c.amount), ...Array(13).fill(''), d8(c.date)]));
    s.push(seg(['TRN', '1', txt(c.number)]));
    s.push(seg(['N1', 'PR', txt(c.payer.name)]));
    address(s, c.payer);
    s.push(seg(['N1', 'PE', txt(c.payee.name), has(c.payee, 'idCode') ? 'XX' : '', txt(c.payee.idCode)]));
    address(s, c.payee);
    if (has(c.payee, 'taxId')) s.push(seg(['REF', 'TJ', txt(c.payee.taxId)]));
    s.push(seg(['LX', '1']));
    for (const cl of L(c.claims)) {
      s.push(seg(['CLP', txt(cl.claimNumber), cl.status, money(cl.billed), money(cl.paid), money(cl.patientResponsibility), '', txt(cl.icn)]));
      s.push(...casSegs(cl.adjustments));
      if (has(cl, 'patient')) s.push(nameSeg('QC', '1', cl.patient, 'MI'));
      if (has(cl, 'insured')) s.push(nameSeg('IL', '1', cl.insured, 'MI'));
      if (has(cl, 'secondId')) s.push(seg(['NM1', '74', '1', '', '', '', '', '', 'MI', txt(cl.secondId)]));
      if (has(cl, 'forwardedTo')) s.push(seg(['NM1', 'TT', '2', txt(cl.forwardedTo)]));
      if (has(cl, 'serviceProviderId')) s.push(seg(['NM1', '82', '1', '', '', '', '', '', 'XX', txt(cl.serviceProviderId)]));
      if (L(cl.remarkCodes).length > 0) s.push(seg(['MOA', '', '', ...L(cl.remarkCodes).slice(0, 5).map(txt)]));
      if (has(cl, 'date')) s.push(seg(['DTM', '232', d8(cl.date)]));
      for (const a of L(cl.supplementalAmounts)) s.push(seg(['AMT', a.qualifier, money(a.amount)]));
      for (const sv of L(cl.services)) {
        const mods = L(sv.modifiers).filter(Boolean).slice(0, 4).map(x => ':' + txt(x)).join('');
        const sent = has(sv, 'sentProcedure') ? 'HC:' + txt(sv.sentProcedure) : '';
        s.push(seg(['SVC', `HC:${txt(sv.procedure)}${mods}`, money(sv.billed), money(sv.paid), '', money(sv.units), sent, money(sv.sentUnits)]));
        if (has(sv, 'serviceDate')) s.push(seg(['DTM', '472', d8(sv.serviceDate)]));
        if (has(sv, 'periodStart')) s.push(seg(['DTM', '150', d8(sv.periodStart)]));
        if (has(sv, 'periodEnd')) s.push(seg(['DTM', '151', d8(sv.periodEnd)]));
        s.push(...casSegs(sv.adjustments));
        if (has(sv, 'lineControlNumber')) s.push(seg(['REF', '6R', txt(sv.lineControlNumber)]));
        if (has(sv, 'renderingProviderId')) s.push(seg(['REF', 'HPI', txt(sv.renderingProviderId)]));
        for (const r of L(sv.references)) s.push(seg(['REF', txt(r.qualifier), txt(r.id)]));
        if (has(sv, 'allowed')) s.push(seg(['AMT', 'B6', money(sv.allowed)]));
        for (const a of L(sv.supplementalAmounts)) s.push(seg(['AMT', a.qualifier, money(a.amount)]));
        for (const r of L(sv.remarks)) s.push(seg(['LQ', r.qualifier, txt(r.code)]));
      }
    }
    for (const p of L(c.providerAdjustments)) {
      const ref = has(p, 'identifier') ? `${p.reasonCode}:${txt(p.identifier)}` : `${p.reasonCode}`;
      s.push(seg(['PLB', txt(p.providerId), d8(p.fiscalDate), ref, money(p.amount)]));
    }
    s.push(seg(['SE', String(s.length + 1), ctl]));
    return s;
  };

  // Returns the X12 as an array of strings (join them, or pass them to a Blob). opts.now and opts.rand are for tests.
  E.render = (m, opts) => {
    opts = opts || {};
    const now = opts.now || new Date(), rnd = opts.rand || rand;
    const i = { senderId: 'SENDER', receiverId: 'RECEIVER', controlNumber: 1 };
    const p15 = v => String(v == null ? '' : v).padEnd(15).slice(0, 15);
    const ctl = String(i.controlNumber).padStart(9, '0');
    const yy = String(now.getFullYear()).slice(2), mm = pad(now.getMonth() + 1, 2), dd = pad(now.getDate(), 2);
    const hhmm = pad(now.getHours(), 2) + pad(now.getMinutes(), 2);
    const out = [];
    out.push(`ISA*00*${' '.repeat(10)}*00*${' '.repeat(10)}*ZZ*${p15(i.senderId)}*ZZ*${p15(i.receiverId)}*${yy}${mm}${dd}*${hhmm}*^*00501*${ctl}*0*P*:~`);
    out.push(seg(['GS', 'HP', txt(i.senderId), txt(i.receiverId), `${now.getFullYear()}${mm}${dd}`, hhmm, '1', 'X', '005010X221A1']));
    let n = 0;
    for (const c of L(m.checks)) { n++; out.push(renderCheck(c, pad(n, 4), rnd).join('')); }
    out.push(seg(['GE', String(n), '1']));
    out.push(seg(['IEA', '1', ctl]));
    return out;
  };

  // ---------- X12 reading ----------
  // E.import(text, { dropCheckNumbers }) returns { model, report: [lines] }.
  E.import = (text, opts) => {
    opts = opts || {};
    text = String(text).replace(/^﻿/, '');
    if (text.length < 106 || !text.startsWith('ISA')) throw new Error('This is not an X12 file: it must start with an ISA segment.');
    const es = text[3], cs = text[104], term = text[105];
    const segs = [];
    for (const raw of text.split(term)) { const t = raw.trim(); if (t !== '') segs.push(t.split(es)); }

    const e = (s, n) => (n < s.length && String(s[n]).trim() !== '' ? String(s[n]) : '');
    const q = (s, n) => e(s, n).trim();
    const amt = v => (v === '' ? undefined : Number(v));
    const put = (h, k, v) => { if (v != null && String(v) !== '') h[k] = v; };
    const ignored = {};
    const ign = k => { ignored[k] = 1 + (ignored[k] || 0); };
    const nameOf = s => { const n = {}; put(n, 'last', e(s, 3)); put(n, 'first', e(s, 4)); put(n, 'middle', e(s, 5)); put(n, 'suffix', e(s, 7)); put(n, 'id', e(s, 9)); return n; };

    const checks = [];
    let check = null, claim = null, svc = null, party = '', longCas = 0;

    for (const s of segs) {
      const id = String(s[0]).trim();
      if (id === 'ST') { check = { payer: {}, payee: {} }; checks.push(check); claim = null; svc = null; party = ''; continue; }
      if (id === 'ISA' || id === 'GS' || id === 'GE' || id === 'IEA') continue;
      if (id === 'SE') { check = null; continue; }
      if (check == null) continue;
      switch (id) {
        case 'BPR': put(check, 'amount', amt(e(s, 2))); put(check, 'date', dt(e(s, 16))); break;
        case 'TRN': put(check, 'number', e(s, 2)); break;
        case 'N1': {
          const k = q(s, 1);
          if (k === 'PR') { party = 'payer'; put(check.payer, 'name', e(s, 2)); }
          else if (k === 'PE') { party = 'payee'; put(check.payee, 'name', e(s, 2)); put(check.payee, 'idCode', e(s, 4)); }
          else { party = ''; ign(`N1*${k}`); }
          break;
        }
        case 'N3': if (party && !claim) { put(check[party], 'addressLine1', e(s, 1)); put(check[party], 'addressLine2', e(s, 2)); } else ign('N3'); break;
        case 'N4': if (party && !claim) { put(check[party], 'city', e(s, 1)); put(check[party], 'state', e(s, 2)); put(check[party], 'zip', e(s, 3)); } else ign('N4'); break;
        case 'LX': claim = null; svc = null; party = ''; break;
        case 'CLP':
          claim = {}; svc = null; party = '';
          put(claim, 'claimNumber', e(s, 1)); put(claim, 'status', e(s, 2)); put(claim, 'billed', amt(e(s, 3))); put(claim, 'paid', amt(e(s, 4)));
          put(claim, 'patientResponsibility', amt(e(s, 5))); put(claim, 'icn', e(s, 7));
          addList(check, 'claims', claim);
          break;
        case 'NM1': {
          const k = q(s, 1);
          if (!claim) { ign(`NM1*${k}`); break; }
          if (k === 'QC') claim.patient = nameOf(s);
          else if (k === 'IL') claim.insured = nameOf(s);
          else if (k === '74') put(claim, 'secondId', e(s, 9));
          else if (k === 'TT') put(claim, 'forwardedTo', e(s, 3));
          else if (k === '82') put(claim, 'serviceProviderId', e(s, 9));
          else ign(`NM1*${k}`);
          break;
        }
        case 'MOA': if (claim) { for (let i = 3; i <= 7; i++) { const c = e(s, i); if (c !== '') addList(claim, 'remarkCodes', c); } } else ign('MOA'); break;
        case 'SVC': {
          if (!claim) { ign('SVC'); break; }
          const comp = e(s, 1).split(cs);
          svc = {};
          if (comp[0] !== 'HC') ign(`SVC01 qualifier ${comp[0]} (written as HC)`);
          if (comp.length > 1) put(svc, 'procedure', comp[1]);
          for (let m = 2; m <= 5; m++) if (m < comp.length && String(comp[m]) !== '') addList(svc, 'modifiers', comp[m]);
          put(svc, 'billed', amt(e(s, 2))); put(svc, 'paid', amt(e(s, 3))); put(svc, 'units', amt(e(s, 5)));
          const sent = e(s, 6).split(cs);
          if (sent.length > 1) put(svc, 'sentProcedure', sent[1]);
          put(svc, 'sentUnits', amt(e(s, 7)));
          addList(claim, 'services', svc);
          break;
        }
        case 'DTM': {
          const k = q(s, 1);
          if (svc) {
            if (k === '472') put(svc, 'serviceDate', dt(e(s, 2)));
            else if (k === '150') put(svc, 'periodStart', dt(e(s, 2)));
            else if (k === '151') put(svc, 'periodEnd', dt(e(s, 2)));
            else ign(`DTM*${k} (service)`);
          } else if (claim) { if (k.endsWith('232')) put(claim, 'date', dt(e(s, 2))); else ign(`DTM*${k} (claim)`); }
          else ign(`DTM*${k}`);
          break;
        }
        case 'CAS': {
          const target = svc || claim;
          if (!target) { ign('CAS'); break; }
          if (s.length > 12) longCas++;
          const group = q(s, 1);
          for (let i = 2; i < s.length; i += 3) {
            const reason = e(s, i).trim();
            if (reason === '') continue;
            const a = { group, reason };
            put(a, 'amount', amt(e(s, i + 1)));
            addList(target, 'adjustments', a);
          }
          break;
        }
        case 'AMT': {
          const k = q(s, 1);
          const entry = { qualifier: k };
          put(entry, 'amount', amt(e(s, 2)));
          if (svc) { if (k === 'B6') put(svc, 'allowed', amt(e(s, 2))); else addList(svc, 'supplementalAmounts', entry); }
          else if (claim) addList(claim, 'supplementalAmounts', entry);
          else ign(`AMT*${k}`);
          break;
        }
        case 'REF': {
          const k = q(s, 1);
          if (svc) {
            if (k === '6R') put(svc, 'lineControlNumber', e(s, 2));
            else if (k === 'HPI') put(svc, 'renderingProviderId', e(s, 2));
            else addList(svc, 'references', { qualifier: k, id: e(s, 2) });
          } else if (claim) ign(`REF*${k} (claim)`);
          else if (party === 'payee' && k === 'TJ') put(check.payee, 'taxId', e(s, 2));
          else ign(`REF*${k}`);
          break;
        }
        case 'LQ': if (svc) addList(svc, 'remarks', { qualifier: e(s, 1), code: e(s, 2) }); else ign('LQ'); break;
        case 'PLB':
          for (let i = 3; i < s.length; i += 2) {
            const reason = e(s, i).split(cs);
            if (String(reason[0]) === '') continue;
            const p = {};
            put(p, 'providerId', e(s, 1)); put(p, 'fiscalDate', dt(e(s, 2))); put(p, 'reasonCode', reason[0]);
            if (reason.length > 1) put(p, 'identifier', reason[1]);
            put(p, 'amount', amt(e(s, i + 1)));
            addList(check, 'providerAdjustments', p);
          }
          break;
        default: ign(id);
      }
    }
    if (opts.dropCheckNumbers) for (const c of checks) delete c.number;

    const nClaims = checks.reduce((a, c) => a + L(c.claims).length, 0);
    const nSvc = checks.reduce((a, c) => a + L(c.claims).reduce((b, cl) => b + L(cl.services).length, 0), 0);
    const report = [`Read ${checks.length} check(s), ${nClaims} claim(s), ${nSvc} service(s).`];
    const names = Object.keys(ignored).sort();
    report.push(names.length ? 'Segments with no model field, not carried over: ' + names.map(k => `${k} x${ignored[k]}`).join(', ') : 'Every segment maps to a model field or is envelope.');
    if (longCas > 0) report.push(`${longCas} CAS segment(s) have more than 4 reason/amount pairs. The system's parser reads pairs 5 and 6 wrongly, so an upload of the regenerated ERA will not match the original for those.`);
    report.push('Never carried over: envelope control numbers and ids, payment method details and bank fields, PER contacts, CLP06/CLP08/CLP09, MOA percent and amount, SVC04, LX numbers, name entity types, segment order and layout, the original CAS grouping.');
    return { model: { asImported: true, checks }, report };
  };
})();
