## Customers can accumulate unbounded unreconciled-check backlogs, independent of month-close status

**Scope:** genuinely cross-repo — needs `snowdrop-resources`-be's month-close status and `snowdrop-remittance`-be's reconciliation data together to make its point. This fact needs data from both repos so it stays here even though both have their own folders — don't move it into either one alone.

### What this covers

Whether a customer's ledger month-close status can be used as a proxy for whether they have a bank-reconciliation backlog.

### The fact

Ledger month-close and bank-rec check reconciliation are separate, independent conditions. A company can be closed through last month (current, not backlogged) while still carrying a large and growing volume of **unreconciled** checks — closing the ledger doesn't require or imply reconciling every check. Some customers simply don't work down their unreconciled-check backlog, and it can accumulate steadily and indefinitely rather than trending toward zero.

### Implications

- Don't use `snowdrop-resources` month-close status as a proxy for "does this customer have a reconciliation backlog" — check the reconciliation data directly (see detection query below). A customer can be perfectly current on month-close and still have thousands of unreconciled checks.
- An unreconciled-check backlog that grows without bound for a given customer is not necessarily a data anomaly — it can be expected behavior for a customer that isn't working its reconciliation queue, and the volume can reach the thousands.
- Whether the right lever for a specific customer's backlog is a product/CS push to get them reconciling vs. simply accepting the backlog as ongoing reality is a separate, bigger discussion from any individual bug fix — see `../../repos/snowdrop-remittance-processing-be/known-failures/oversized-unreconciled-check-backlog-breaks-payer-for-remittances/CLAUDE.md` for the case where this volume itself becomes a system defect trigger. Don't conflate "get the customer to reduce their backlog" with "make the system tolerate the backlog" when scoping a ticket — both may be worth doing, but they're different workstreams.

### How to apply

**Detection query** — count of unreconciled (pending) checks for an org, `snowdrop-remittance` database, `snowdrop-remittance-data` container:
```sql
SELECT count(root) FROM root
WHERE root["PostingStatus"] = 1
  AND NOT (IS_DEFINED(root["IsDiscarded"]) AND root["IsDiscarded"] = true)
  AND root["Partition"] = "RemittanceCheckGridItem/{organizationId}"
```

**First applied:** UF-15759 — org `852756eb-73b2-4c46-b0f0-c8ec4d29acde` (uno) had 13,559 unreconciled checks, accumulating at roughly 2,300–3,200/month since March 2026 (oldest: January 2026), none worked down — confirmed via the query above and a per-month breakdown, both independent of the org's (current/up-to-date) month-close status. See the known-failure entry above for how this volume triggered a backend defect.

### Where to look for more
- `../../repos/snowdrop-remittance-processing-be/known-failures/oversized-unreconciled-check-backlog-breaks-payer-for-remittances/CLAUDE.md` — the known-failure this backlog volume triggers.
