# Remittance (BE)

Receives remittance/EOB data from payers (check header, claim-level payment detail, PDF EOB attachments) and tracks each remittance through reconciliation and posting status. A separate service from Remittance Processing, despite the similar name — this one owns the raw remittance/check record and bank reconciliation; Remittance Processing owns claim-payment adjudication and the rules engine. Owned by the Financial Ledger squad (Squad Herbert).

This file carries no load-bearing facts — everything Claude depends on for this repo lives in `CLAUDE.md`.
