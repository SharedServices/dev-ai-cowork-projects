// era-core.js - the ERA model engine, part 1: defaults, balance check, edits, repeat. Load era-x12.js, era-view.js and era-io.js after it.
// Runs as a page script in a Chrome tab (Claude Code and Cowork alike) and in Node. State lives on globalThis.__era.
(() => {
  const E = (globalThis.__era = globalThis.__era || {});
  E.out = E.out || {};

  // ---------- helpers ----------
  const has = (o, n) => o != null && o[n] != null && String(o[n]) !== '';
  const L = x => (x == null ? [] : (Array.isArray(x) ? x : [x]).filter(i => i != null));
  const u = v => Math.round(Number(v) * 10000);
  const fmtU = x => String(Math.round(x) / 10000);
  const money = v => {
    if (v == null || String(v) === '') return '';
    let r = Math.round(Number(v) * 100) / 100;
    if (Object.is(r, -0)) r = 0;
    return String(r);
  };
  const sumU = (items, prop) => { let t = 0; for (const i of L(items)) if (has(i, prop)) t += u(i[prop]); return t; };
  const rand = n => { let s = ''; for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10); return s; };
  const txt = s => (s == null ? '' : String(s)).replace(/[*~:^]/g, ' ');
  const pad = (v, n) => String(v).padStart(n, '0');
  const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1, 2)}-${pad(d.getDate(), 2)}`;
  E._h = { has, L, u, fmtU, money, sumU, txt, pad, ymd, rand };

  // ---------- defaults ----------
  const setDefault = (o, n, v) => {
    if (has(o, n)) return;
    o[n] = v;
    if (typeof v !== 'object') o.generated = [...L(o.generated), n];
  };

  // A total the engine worked out is recomputed whenever the model changes; one the user set (not in generated) is left alone.
  const computed = (o, n, v) => {
    if (has(o, n) && !L(o.generated).includes(n)) return;
    o[n] = v;
    if (!L(o.generated).includes(n)) o.generated = [...L(o.generated), n];
  };

  E.complete = m => {
    const today = ymd(new Date());
    const asImported = !!m.asImported;
    for (const c of L(m.checks)) {
      setDefault(c, 'number', rand(10));
      setDefault(c, 'date', today);
      setDefault(c, 'payer', {});
      setDefault(c.payer, 'name', 'TEST PAYER');
      setDefault(c, 'payee', {});
      setDefault(c.payee, 'name', 'TEST PROVIDER');
      for (const cl of L(c.claims)) {
        setDefault(cl, 'claimNumber', 'CLM' + rand(8));
        setDefault(cl, 'status', '1');
        if (!asImported) {
          setDefault(cl, 'icn', rand(12));
          setDefault(cl, 'date', c.date);
          for (const s of L(cl.services)) setDefault(s, 'serviceDate', cl.date);
        }
        if (L(cl.services).length > 0) {
          computed(cl, 'billed', sumU(cl.services, 'billed') / 10000);
          computed(cl, 'paid', sumU(cl.services, 'paid') / 10000);
        }
      }
      computed(c, 'amount', (sumU(c.claims, 'paid') - sumU(c.providerAdjustments, 'amount')) / 10000);
    }
    return m;
  };

  // ---------- balance check ----------
  E.check = m => {
    const issues = [];
    for (const c of L(m.checks)) {
      const cn = c.number;
      if (L(c.claims).length === 0) issues.push(`Check ${cn}: has no claims`);
      const expected = sumU(c.claims, 'paid') - sumU(c.providerAdjustments, 'amount');
      if (u(c.amount) !== expected) issues.push(`Check ${cn}: amount ${c.amount} but claims paid minus provider adjustments is ${fmtU(expected)}`);
      for (const cl of L(c.claims)) {
        const id = `Check ${cn} claim ${cl.claimNumber} (status ${cl.status})`;
        const svcs = L(cl.services);
        if (svcs.length > 0) {
          const sb = sumU(svcs, 'billed'), sp = sumU(svcs, 'paid');
          if (sb !== u(cl.billed)) issues.push(`${id}: billed ${cl.billed} but services billed sum to ${fmtU(sb)}`);
          if (sp !== u(cl.paid)) issues.push(`${id}: paid ${cl.paid} but services paid sum to ${fmtU(sp)}`);
        }
        for (const s of svcs) {
          if (has(s, 'billed') && has(s, 'paid')) {
            const adj = sumU(s.adjustments, 'amount');
            const gap = u(s.billed) - u(s.paid);
            if (gap !== adj) issues.push(`${id} service ${s.procedure}: billed minus paid is ${fmtU(gap)} but adjustments sum to ${fmtU(adj)}`);
          }
          // chargeBalance is lookup information from the claim, not an ERA field: it is never written to the X12.
          if (has(s, 'chargeBalance') && has(s, 'paid') && u(s.paid) > u(s.chargeBalance)) issues.push(`${id} service ${s.procedure}: paid ${s.paid} is more than the charge balance ${s.chargeBalance}`);
        }
      }
    }
    return issues;
  };

  // ---------- model access and edits ----------
  const parsePath = p => { const t = []; String(p).replace(/[^.[\]]+/g, x => { t.push(/^\d+$/.test(x) ? Number(x) : x); }); return t; };
  const walk = (root, tokens) => { let o = root; for (const t of tokens) { if (o == null) return undefined; o = o[t]; } return o; };

  const expand = (v, n) => {
    if (typeof v === 'string') return v.replace(/\{n(?::(\d+))?\}/g, (_, w) => (w ? pad(n, Number(w)) : String(n)));
    if (Array.isArray(v)) return v.map(x => expand(x, n));
    if (v && typeof v === 'object') { const r = {}; for (const k of Object.keys(v)) r[k] = expand(v[k], n); return r; }
    return v;
  };

  // Clones the element at `path` `count` times. `{n}` and `{n:6}` in strings become the copy number (from `start`, default 1).
  // Values the engine had generated (claim number, ICN) are renumbered in sequence so a large ERA has no duplicates.
  const repeat = (m, path, count, start) => {
    const tokens = parsePath(path), idx = tokens.pop(), arr = walk(m, tokens);
    if (!Array.isArray(arr) || typeof idx !== 'number' || !arr[idx]) throw new Error(`repeat: ${path} is not an element of a list.`);
    const proto = arr[idx], gen = L(proto.generated);
    const baseClaim = Math.floor(Math.random() * 1e7), baseIcn = Math.floor(Math.random() * 1e11);
    const clones = [];
    for (let k = 0; k < count; k++) {
      const n = (start || 1) + k;
      const c = expand(JSON.parse(JSON.stringify(proto)), n);
      if (gen.includes('claimNumber')) c.claimNumber = 'CLM' + pad(baseClaim + n, 8);
      if (gen.includes('icn')) c.icn = pad(baseIcn + n, 12);
      clones.push(c);
    }
    arr.splice(idx, 1, ...clones);
    return clones.length;
  };

  // Payer behaviour: what a real payer does that an invoice cannot tell us. Applied to every check, or to the one at `path`.
  // o: { allowedPercent (allowed as a percent of billed; default: keep allowed or billed),
  //      additions: [{ group (default CO), reason, percentOfAllowed }]  payer-added adjustments, written before CO-45,
  //      remark: { qualifier (default HE), code }  remark on every paid line,
  //      deny: [{ claimNumber (default every claim), procedure (default every service of that claim), group (default CO), reason (default 96), remark }]  denied lines: paid 0, units 0, original units in the sent units,
  //      lines: [{ claimNumber?, procedure?, allowed? (amount), additions? }]  overrides for matching lines (the first match wins),
  //      coverage (default true): write AMT*AU on each claim as the billed amount of its paid lines }
  // Additions are worked out in the order listed, each as a percent of what is left of the allowed amount after the earlier ones
  // (a real payer takes sequestration as about 2% of the payment left after its other reductions).
  // Paid = allowed minus the additions; CO-45 = billed minus allowed, so billed minus paid always equals the adjustments.
  const r2 = v => Math.round((v + Number.EPSILON) * 100) / 100;
  const applyPayer = (m, o) => {
    const scope = o.path ? [walk(m, parsePath(o.path))].filter(Boolean) : L(m.checks);
    let touched = 0;
    for (const chk of scope) {
      for (const cl of L(chk.claims)) {
        for (const s of L(cl.services)) {
          const rule = L(o.deny).find(d => (d.claimNumber == null || String(d.claimNumber) === String(cl.claimNumber)) && (d.procedure == null || String(d.procedure) === String(s.procedure)));
          const billed = Number(s.billed || 0);
          if (rule) {
            const units = s.units;
            s.sentUnits = units == null ? 1 : units;
            s.units = 0;
            s.paid = 0;
            delete s.allowed;
            s.adjustments = [{ group: rule.group || 'CO', reason: String(rule.reason || '96'), amount: r2(billed) }];
            s.remarks = rule.remark ? [{ qualifier: 'HE', code: rule.remark }] : [];
          } else {
            const over = L(o.lines).find(d => (d.claimNumber == null || String(d.claimNumber) === String(cl.claimNumber)) && (d.procedure == null || String(d.procedure) === String(s.procedure))) || {};
            const allowed = over.allowed != null ? Number(over.allowed) : (o.allowedPercent != null ? r2(billed * Number(o.allowedPercent) / 100) : (has(s, 'allowed') ? Number(s.allowed) : billed));
            let left = allowed;
            const adds = L(over.additions || o.additions).map(a => { const amount = r2(left * Number(a.percentOfAllowed) / 100); left = r2(left - amount); return { group: a.group || 'CO', reason: String(a.reason), amount }; });
            const co45 = r2(billed - allowed);
            s.allowed = allowed;
            s.adjustments = [...adds, ...(co45 !== 0 ? [{ group: 'CO', reason: '45', amount: co45 }] : [])];
            s.paid = r2(allowed - adds.reduce((t, a) => t + a.amount, 0));
            if (o.remark) s.remarks = [{ qualifier: o.remark.qualifier || 'HE', code: o.remark.code }];
          }
          touched++;
        }
        delete cl.billed; delete cl.paid; delete cl.generated;
        if (o.coverage !== false) {
          const covered = r2(L(cl.services).filter(s => Number(s.paid) > 0).reduce((t, s) => t + Number(s.billed || 0), 0));
          cl.supplementalAmounts = L(cl.supplementalAmounts).filter(x => x.qualifier !== 'AU');
          if (covered > 0) cl.supplementalAmounts.push({ qualifier: 'AU', amount: covered });
        }
      }
      delete chk.amount;
    }
    return touched;
  };

  // ops: [{ op: 'set', path, value } | { op: 'add', path, value } | { op: 'remove', path } | { op: 'repeat', path, count, start } | { op: 'payer', path?, allowedPercent?, additions?, remark?, deny?, coverage? }]
  E.edit = ops => {
    const m = E.model;
    const done = [];
    for (const o of L(typeof ops === 'string' ? JSON.parse(ops) : ops)) {
      const tokens = parsePath(o.path);
      if (o.op === 'set') {
        const last = tokens.pop(), parent = walk(m, tokens);
        if (parent == null) throw new Error(`set: ${o.path} has no parent.`);
        parent[last] = o.value;
        if (typeof last === 'string' && Array.isArray(parent.generated)) parent.generated = parent.generated.filter(x => x !== last);
      } else if (o.op === 'add') {
        const arr = walk(m, tokens);
        if (arr == null) { const last = tokens.pop(), parent = walk(m, tokens); parent[last] = [o.value]; }
        else arr.push(o.value);
      } else if (o.op === 'remove') {
        const last = tokens.pop(), parent = walk(m, tokens);
        if (Array.isArray(parent)) parent.splice(last, 1); else delete parent[last];
      } else if (o.op === 'repeat') {
        done.push(`${o.path} x${repeat(m, o.path, o.count, o.start)}`);
        continue;
      } else if (o.op === 'payer') {
        done.push(`payer ${o.path || 'all checks'}: ${applyPayer(m, o)} services`);
        continue;
      } else throw new Error(`Unknown op ${o.op}`);
      done.push(`${o.op} ${o.path}`);
    }
    E.complete(m);
    E._log = (E._log || []).concat(L(typeof ops === 'string' ? JSON.parse(ops) : ops));
    return done;
  };

  // What the model was started from and what has been done to it, so it can be saved and rebuilt (see save and restore).
  // Generated values are left out of the saved start, so a reloaded ERA gets fresh check and claim numbers.
  const strip = v => {
    if (Array.isArray(v)) return v.map(strip);
    if (v && typeof v === 'object') {
      const g = L(v.generated), r = {};
      for (const k of Object.keys(v)) if (k !== 'generated' && !g.includes(k)) r[k] = strip(v[k]);
      return r;
    }
    return v;
  };

  E.load = x => {
    const m = typeof x === 'string' ? JSON.parse(x) : x;
    delete m.template;
    E._base = strip(JSON.parse(JSON.stringify(m)));
    E._source = null;
    E._log = [];
    E.model = m;
    E.complete(m);
    return E.stats();
  };

  // Saves what is needed to rebuild the model, as text in E.out.recipe (read it back with E.read('recipe', i)).
  // A model started with load is saved as its start plus the edits; one started with fetchStored as a pointer to the stored file plus the edits.
  E.save = (name, description) => {
    if (!E._base && !E._source) throw new Error('Nothing to save: the model was not started with load or fetchStored.');
    const r = { format: 'era-builder-recipe', version: 1, name: name || 'ERA', description: description || '', savedAt: new Date().toISOString() };
    if (E._source) r.stored = E._source; else r.base = E._base;
    r.ops = E._log;
    const text = JSON.stringify(r);
    if (text.length > 30000) throw new Error(`This ERA is too large to save as a file (${text.length} characters). Start from an earlier upload, or describe it with a repeat operation, so the saved file stays small.`);
    E.out.recipe = text;
    return JSON.stringify({ chars: text.length, slices: Math.ceil(text.length / 600) });
  };

  E.stats = () => {
    const m = E.model;
    let claims = 0, services = 0;
    for (const c of L(m.checks)) for (const cl of L(c.claims)) { claims++; services += L(cl.services).length; }
    return { checks: L(m.checks).length, claims, services, issues: E.check(m).length };
  };

  // Reads a stored text back in slices that fit the tool's output limit: E.out[name], slice i of `size` characters.
  E.read = (name, i, size) => {
    size = size || 600;
    const t = E.out[name] || '';
    return JSON.stringify({ name, i, n: Math.ceil(t.length / size), text: t.slice(i * size, (i + 1) * size) });
  };
})();
