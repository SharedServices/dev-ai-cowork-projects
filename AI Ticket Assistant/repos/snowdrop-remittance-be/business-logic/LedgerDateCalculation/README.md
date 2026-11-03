# Ledger Date Calculation

How a check's LedgerDate is worked out from its deposit date and the company's closed months, which actions recalculate it, and which screens depend on it.

Written from UF-17855. The source was read on `develop` and on `features/UF-17845-reserved-funds-posted-guard-on-deposit-date`; the calculation and both company-change paths are the same on both, and the deposit-date guard is the only difference found.

This file carries no load-bearing facts — everything Claude depends on for this category lives in `CLAUDE.md`.
