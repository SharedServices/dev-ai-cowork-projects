## Ledger Date Locking

### What this covers

Whether a long-unchanged `LedgerDate` on a remittance/check is itself a signal of a problem — it
is not, on its own.

### The fact

Once at least one claim payment on a remittance/check has posted, the check's `LedgerDate` locks
and is not intended to change again, even if the check's posting status later cycles back through
Building/Posted/Posting (e.g. from reworking an individual claim payment within it). This holds
regardless of which system surfaced the date — Cosmos event feed, a blob export, or the FE display
all show the same underlying fact.

**Confirmed:** 2026-08-25, during UF-16266 — corrected an initial mischaracterization of a
long-unchanged `LedgerDate` as a defect.

### Implications

- Don't treat a `LedgerDate` that hasn't updated across a long or reopened posting history as a bug
  signal on its own — that's expected once posting has started on the remittance.
- The failure mode that actually matters is the *combination*: the locked ledger date now falling
  inside a since-hard-closed ledger month, combined with an outstanding (e.g. discarded/disputed)
  claim payment on the same check that still needs to post. That combination — not the frozen date
  by itself — is what produces an "Invalid Ledger Date" error with no obvious remediation path
  (can't discard the whole remit if other claim payments already posted, can't reverse-post, and
  Bank Rec won't surface checks older than 6 months to manually adjust the date).

**Example (UF-16266):** check 175596587 (org MIAM) had its `LedgerDate` set 2022-05-20, three days
after intake and before any claim payment had actually posted, then never touched again across
16+ months of the check cycling through Building/Posted/Posting while one claim payment (behind
invoice UFHMSD102905) was repeatedly reworked and ultimately discarded. The division subsequently
hard-closed through July 2022, leaving that check unable to reach Posted.

### Where to look for more
- `../../references/cosmos_query.md` — the mechanical detail (which event fires `LedgerDate`,
  `PostingStatus` enum values). This entry is the business-rule interpretation of that data, true
  independent of which system it's read from.
- `../../../snowdrop-remittance-processing-be/business-logic/CheckPostingStatus/CLAUDE.md` — how a check's
  status (Building, Posted, ...) is derived, and why one unposted claim payment keeps the whole check out
  of Posted.
