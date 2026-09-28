# Event Enums -- snowdrop-remittance-processing-be

**Generated file -- do not hand-edit.** Produced by `generate-enums.py` from this repo's own `references/Events.md`. Regenerate by re-running the script against a refreshed `Events.md`; never patch this file directly, same convention as every other file under `references/`.

Last generated: 2026-09-24. Source: `references/Events.md` (format 1 of 3 -- see the generator script's own docstring for what that means).

## Index

- [`CheckPaymentStatus`](#checkpaymentstatus)
- [`CheckPostingStatus`](#checkpostingstatus)
- [`ClaimPostingStatus`](#claimpostingstatus)
- [`ReasonCodeCategory`](#reasoncodecategory)
- [`DisputeTypes`](#disputetypes)
- [`TransferToMode`](#transfertomode)
- [`ChargePaymentFlags`](#chargepaymentflags)
- [`RemittanceProcessingEventSource`](#remittanceprocessingeventsource)
- [`Snowdrop.RemittanceProcessing.Contracts.ReservedFunds.ReservedFundType`](#snowdropremittanceprocessingcontractsreservedfundsreservedfundtype)
- [`Snowdrop.RemittanceProcessing.Contracts.ReservedFunds.ReservedFundStatus`](#snowdropremittanceprocessingcontractsreservedfundsreservedfundstatus)

---

## `CheckPaymentStatus`

`NotTaken = 0` (Payment Not Taken), `Taken = 1` (Payment Taken, Not Deposited), `Deposited = 2` (Payment Taken and Deposited)

---

## `CheckPostingStatus`

`Unknown = 0`, `New = 1`, `Reconciled = 2`, `Posting = 3`, `Posted = 4`, `Empty = 5`, `Building = 6`, `Ready = 7`, `Discarded = 8`, `Archived = 9`

---

## `ClaimPostingStatus`

`Unknown = 0`, `Ready = 1`, `Posting = 2`, `Posted = 3`, `Discarded = 4`, `Excluded = 5`, `Removed = 6`

---

## `ReasonCodeCategory`

`UnKnown = 0` (typo preserved — capital K), `Adjustment = 1`, `Transfer = 2`

---

## `DisputeTypes`

(`[Flags]`)

`None = 0`, `User = 0x1`, `Denial = 0x10`, `Transfer = 0x20`, `Underpayment = 0x40`. Three bit values (`0x2`, `0x4`, `0x8`) are reserved/commented out in source as `//New1`/`//New2`/`//New3`.

---

## `TransferToMode`

`Unknown = 0`, `Payer = 1` (secondary payer), `Patient = 2`, `Guarantor = 3`, `Manufacturer = 4`

---

## `ChargePaymentFlags`

(`[Flags]`, in `Snowdrop.RemittanceProcessing.Contracts.RemittanceProcessing`)

`None = 0`, `IsDisputed = 0x001`, `IsVoided = 0x002`, `WasFuzzyMatch = 0x004`, `AmbiguousAdjustmentCode = 0x008`, `DenialDispute = 0x010`, `UnderpaymentDispute = 0x020`, `TransferDispute = 0x040`, `NotOnEob = 0x080`, `IsDisputedUserSet = 0x100`, `ExcludeFromPosting = 0x200`, `TransferToGuarantor = 0x400`. Derives `IsDisputed()`, `ExcludeFromPosting()`, etc. via extension methods; underlies the computed `IsDisputed`/`ExcludeFromPosting` properties on `RemittanceInitialized.ChargePayment`.

---

## `RemittanceProcessingEventSource`

`Unknown`, `Normal`, `Validation` — not referenced as a property on any documented event; appears to be an internal marker enum.

---

## `Snowdrop.RemittanceProcessing.Contracts.ReservedFunds.ReservedFundType`

`ReservedFund = 0`, `Reapplication = 1`

---

## `Snowdrop.RemittanceProcessing.Contracts.ReservedFunds.ReservedFundStatus`

`Pending`, `Ready`, `Posted`, `Discarded`, `Removed` — a computed status on `ReservedFundsEntry`, not itself serialized on any event property directly (it's a derived getter).

---
