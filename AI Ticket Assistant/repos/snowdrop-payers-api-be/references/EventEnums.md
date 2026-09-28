# Event Enums -- snowdrop-payers-api-be

**Generated file -- do not hand-edit.** Produced by `generate-enums.py` from this repo's own `references/Events.md`. Regenerate by re-running the script against a refreshed `Events.md`; never patch this file directly, same convention as every other file under `references/`.

Last generated: 2026-09-24. Source: `references/Events.md` (format 1 of 3 -- see the generator script's own docstring for what that means).

## Index

- [`PayerStatus`](#payerstatus)
- [`PayerType`](#payertype)
- [`PlanStatusType`](#planstatustype)
- [`FeeScheduleType`](#feescheduletype)
- [`SnfStatusType`](#snfstatustype)
- [`ManufacturerCopayProgramStatusType`](#manufacturercopayprogramstatustype)
- [`ManufacturerDataSource`](#manufacturerdatasource)
- [`ContactPointType`](#contactpointtype)
- [`PreferredVerificationMethod`](#preferredverificationmethod)
- [`VerificationInterval`](#verificationinterval)
- [`Payer.AutoAdjustmentReasonTypes`](#payerautoadjustmentreasontypes)

---

## `PayerStatus`

`Active = 0`, `Inactive = 1`

---

## `PayerType`

| Value | Display name | Notes |
|-------|-------------|-------|
| `Insurance = 0` | Insurance | |
| `SelfPay = 1` | SelfPay | |
| `SkilledNursingFacility = 2` | Snf | |
| `Manufacturer = 3` | ManufacturerCopayer | **Obsolete** — use `ManufacturerAssistance` |
| `ManufacturerAssistance = 4` | Manufacturer | Assistance payer |
| `FoundationAssistance = 5` | Foundation | Assistance payer |
| `OtherAssistance = 6` | Other | Assistance payer |

---

## `PlanStatusType`

`Active = 0`, `Inactive = 1`

---

## `FeeScheduleType`

`FromUpload = 0`, `FromChargemaster = 1`, `FromGlobal = 2`

---

## `SnfStatusType`

`Inactive = 0`, `Active = 1`

---

## `ManufacturerCopayProgramStatusType`

`Inactive = 0`, `Active = 1`

---

## `ManufacturerDataSource`

`AssistPoint = 0`, `TailorMed = 1`

---

## `ContactPointType`

(Payers and Plans namespaces — identical)

`Phone = 0`, `Email = 1`, `Fax = 2`

---

## `PreferredVerificationMethod`

`Unassigned = 0`, `RTE = 1`, `Phone = 2`, `Website = 3`

---

## `VerificationInterval`

`Unassigned = 0`, `Daily = 1`, `Weekly = 2`, `Monthly = 3`, `Yearly = 4`

---

## `Payer.AutoAdjustmentReasonTypes`

(nested enum)

`Contractual`, `NonContractual`

---
