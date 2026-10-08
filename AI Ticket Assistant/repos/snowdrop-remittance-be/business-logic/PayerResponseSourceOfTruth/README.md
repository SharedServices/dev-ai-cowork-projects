# Payer Response Source of Truth

Why the remittance's created event, and the payer EDI behind it, is what decides what a payer paid, and how that differs from ticket text, UI summaries and ledger payment transactions.

Plain description only — see `CLAUDE.md` for the facts Claude actually uses.

Added during UF-6260, where a manually entered ledger payment of 124.20 was initially read as a payer payment although the payer's remittance returned 0.
