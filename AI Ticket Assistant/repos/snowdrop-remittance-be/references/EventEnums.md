# Event Enums -- snowdrop-remittance-be

**Generated file -- do not hand-edit.** Produced by `generate-enums.py` from this repo's own `references/Events.md`. Regenerate by re-running the script against a refreshed `Events.md`; never patch this file directly, same convention as every other file under `references/`.

Last generated: 2026-09-24. Source: `references/Events.md` (format 1 of 3 -- see the generator script's own docstring for what that means).

## Index

- [`CheckSource`](#checksource)
- [`PaymentType`](#paymenttype)
- [`PostingStatus`](#postingstatus)

---

## `CheckSource`

| Value | Notes |
|-------|-------|
| `Unkown = 0` | Typo preserved from source (`Unkown`, not `Unknown`) |
| `Electronic = 1` | |
| `Manual = 2` | |

---

## `PaymentType`

`EFT = 0`, `Check = 1`, `Credit = 2`, `Refund = 3`

---

## `PostingStatus`

`Unknown = 0`, `New = 1`, `Reconciled = 2`, `Posting = 3`, `Posted = 4`, `Empty = 5`, `Building = 6`, `Ready = 7`, `Discarded = 8`, `Archived = 9`

An extension method `PostingStatusExtensions.IsReconciled()` returns `true` only for `Reconciled`.

---
