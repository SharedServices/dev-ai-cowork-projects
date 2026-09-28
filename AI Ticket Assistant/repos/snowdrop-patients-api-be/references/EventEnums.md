# Event Enums -- snowdrop-patients-api-be

**Generated file -- do not hand-edit.** Produced by `generate-enums.py` from this repo's own `references/Events.md`. Regenerate by re-running the script against a refreshed `Events.md`; never patch this file directly, same convention as every other file under `references/`.

Last generated: 2026-09-24. Source: `references/Events.md` (format 3 of 3 -- see the generator script's own docstring for what that means).

## Index

- [`StatusType`](#statustype)
- [`SexType`](#sextype)
- [`AddressType`](#addresstype)
- [`MailType`](#mailtype)
- [`ContactPointType`](#contactpointtype)
- [`PhoneType`](#phonetype)
- [`PersonalContactPhoneType`](#personalcontactphonetype)
- [`ContactUse`](#contactuse)
- [`ReciprocalMode`](#reciprocalmode)

---

## `StatusType`

| Value | Int | Description |
|---|---|---|
| `Active` | 0 | Patient is active. |
| `Inactive` | 1 | Patient is inactive. |
| `Deceased` | 2 | Patient is deceased. |
| `Dismissed` | 3 | Patient has been dismissed. |
| `PRN` | 4 | Patient is PRN (as-needed). |

---

## `SexType`

| Value | Description |
|---|---|
| `Male` | Male. |
| `Female` | Female. |
| `Other` | Other. |
| `Unknown` | Unknown. |

---

## `AddressType`

| Value | Description |
|---|---|
| `Residential` | Residential address. |
| `Business` | Business address. |

---

## `MailType`

| Value | Description |
|---|---|
| `AllMail` | Patient receives all mail. |
| `NoLogoMail` | Patient receives mail without logo. |
| `NoMail` | Patient receives no mail. |

---

## `ContactPointType`

_(serialised as string)_

| Value | Description |
|---|---|
| `Phone` | Phone contact point. |
| `Email` | Email contact point. |
| `Fax` | Fax contact point. |

---

## `PhoneType`

| Value | Description |
|---|---|
| `NoPhone` | No phone. |
| `Phone` | Standard landline. |
| `Cell` | Mobile / cell phone. |

---

## `PersonalContactPhoneType`

| Value | Description |
|---|---|
| `NoPhone` | No phone. |
| `Phone` | Standard landline. |
| `Cell` | Mobile / cell phone. |
| `Fax` | Fax number. |

---

## `ContactUse`

| Value | Description |
|---|---|
| `Personal` | Personal use. |
| `Business` | Business use. |

---

## `ReciprocalMode`

| Value | Int | Description |
|---|---|---|
| `Unknown` | 0 | Default / unset. |
| `PatientCreatedAPI` | 1 | Reciprocal created via patient creation API. |
| `PatientProbableDuplicateAddedEvent` | 2 | Reciprocal triggered by a `PatientProbableDuplicateAdded` event. |
| `PatientProbableDuplicateRemovedEvent` | 3 | Reciprocal triggered by a `PatientProbableDuplicateRemoved` event. |
| `PatientProbableDuplicateMatchedFieldsUpdatedEvent` | 4 | Reciprocal triggered by a `PatientProbableDuplicateMatchedFieldsUpdated` event. |
| `Delayed` | 9 | Reciprocal was delayed. |
| `Testing` | 10 | Testing only. |

---
