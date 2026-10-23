How the payer on a check is chosen from the payer literal, and why a user's last entry in the Bank Reconciliation panel can make a remittance resolve to the wrong payer.

History: found during the UF-16594 test run on ninja (organization 7516f05b-68d9-4095-9edd-348f4b1788c4, 2026-10-21). Two ERAs for claim COMP1000357A1 (primary, Blue Cross) were uploaded with the payer name "Blue Cross". Both remittances resolved to the Aetna payer id 3e501619-e0d0-4275-9384-8a873a5c1619 because a user had earlier tied that literal to Aetna, and both claim payments carried exception 29 (Payer Mismatch). James corrected the mapping and the exception no longer appeared. James described the rule and its test-environment caveat.

This file carries no load-bearing facts — everything Claude depends on for this category lives in `CLAUDE.md`.
