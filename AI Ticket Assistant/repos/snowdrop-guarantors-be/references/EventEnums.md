# Event Enums -- snowdrop-guarantors-be

**Generated file -- do not hand-edit.** Produced by `generate-enums.py` from this repo's own `references/Events.md`. Regenerate by re-running the script against a refreshed `Events.md`; never patch this file directly, same convention as every other file under `references/`.

Last generated: 2026-09-24. Source: `references/Events.md` (format 2 of 3 -- see the generator script's own docstring for what that means).

## Index

- [`GuarantorStatus`](#guarantorstatus)
- [`SexType`](#sextype)
- [`PhoneType`](#phonetype)
- [`PhoneUse`](#phoneuse)
- [`EmailUse`](#emailuse)

---

## `GuarantorStatus`

| Value | Int | Description |
|---|---|---|
| `Provisional` | 0 | Default status; guarantor has been created but not yet confirmed. |
| `Active` | 1 | Guarantor is active. |

---

## `SexType`

| Value | Description |
|---|---|
| `Male` | Male. |
| `Female` | Female. |
| `Other` | Other. |
| `Unknown` | Unknown. |

---

## `PhoneType`

| Value | Int | Description |
|---|---|---|
| `NoPhone` | 0 | No phone on record. |
| `Phone` | 1 | Standard landline. |
| `Cell` | 2 | Mobile / cell phone. |
| `Fax` | 3 | Fax number. |

---

## `PhoneUse`

| Value | Int | Description |
|---|---|---|
| `Personal` | 1 | Personal use. |
| `Business` | 2 | Business use. |

---

## `EmailUse`

| Value | Int | Description |
|---|---|---|
| `Personal` | 1 | Personal use. |
| `Business` | 2 | Business use. |

---
