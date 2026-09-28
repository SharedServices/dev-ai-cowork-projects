# Charge terminology has three system-specific representations

Why the word "Charge" needs disambiguating across Activities, Ledger, and Remittance Processing.

Plain description only — see `CLAUDE.md` for the facts and reference pointers Claude actually uses.

Added 2026-08-13, during UF-15804 code analysis: Claude Code had initially misread `RebuildChargePayment`'s Charge-projection behavior and mislabeled Remittance Processing's own `Charge` type as a "ledger charge," which it is not. This fact was written up to prevent that misdiagnosis from recurring.
