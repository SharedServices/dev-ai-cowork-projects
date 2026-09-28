# AttributeType Enum

Rule `qualifiers` and `behaviorConfiguration.SuppressedReasons[].AttributeType` fields reference this
enum by numeric value. **Positional/0-relative** — the first named member (`ActivityCode`) is `1`, not the
implicit `Unknown = 0`. Confirmed 2026-08-05 (James, from source) while investigating UF-15495's
"DR - Suppress Transfers (Specialty Pharmacy)" rule, whose top-level `qualifiers` entry uses
`attributeType: 7` — confirmed as `Modifier`.

| Value | Name | Description |
|---|---|---|
| 0 | Unknown | (implicit first enum member, no `[Description]`) |
| 1 | ActivityCode | Activity Codes |
| 2 | AttendingProvider | Attending Providers |
| 3 | Channel | Channels |
| 4 | Division | Divisions |
| 5 | IcdCode | ICD Codes |
| 6 | Location | Locations |
| 7 | Modifier | Modifiers |
| 8 | OrderingProvider | Ordering Providers |
| 9 | SupervisingProvider | Supervising Providers |
| 10 | SupportingProvider | Supporting Providers |
| 11 | BillingProvider | Billing Providers |
| 12 | ChargeCode | Charge Codes |
| 13 | Facility | Facilities |
| 14 | Payer | Payers |
| 15 | Company | Companies |
| 16 | InvoiceType | Invoice Types |
| 17 | NDC | National Drug Codes |
| 18 | Units | Units |
| 19 | RemarkCode | Remark Codes |
| 20 | TransferReason | Transfer Reasons |
| 21 | AdjustmentReason | Adjustment Reasons |
| 22 | NextPayer | Next Payers |
| 23 | PreviousPayer | Previous Payers |
| 24 | AppointmentType | Appointment Types |
| 25 | ResponsibleProvider | Responsible Providers |

**Cross-check against live rule data (UF-15495, org `20390dc5-616a-456d-bbb6-cb247a4981cb`, Adjudication
Code Suppression sequence):** `SuppressedReasons[].AttributeType` values seen in that sequence's rules
line up with this table — `20` (`TransferReason`) on rules using `transferreasons` sets, `21`
(`AdjustmentReason`) on rules using `contractualadjustmentreasons` sets. This confirms the table's
positional indexing is correct, not just the `Modifier = 7` value in isolation.

## Where this shows up

- **Top-level `qualifiers[]`** on a rule object (from the `remittance-processing-sequences/{sequenceId}/rules`
  API — see `snowdrop-api-calls` skill): `{attributeType, id, isSet, exclusionary}`. When `isSet: false`,
  `id` is a single element GUID the rule requires a match on for that attribute type (e.g. a specific
  Modifier GUID) — not a set reference.
- **`behaviorConfiguration.SuppressedReasons[].AttributeType`**: paired with either `SetQualifiers`
  (`SetType`/`SetId`, a named set like `transferreasons` or `contractualadjustmentreasons`) or
  `ElementQualifiers` (single element GUIDs), same `AttributeType` numbering.

Don't assume a GUID's meaning from context alone (e.g. "this must be the DR modifier") — the enum
value tells you *which attribute type* the GUID belongs to, but resolving the GUID itself to a
human-readable value (e.g. which modifier code `df8b094b-d8af-4e19-bbf3-ee72727945a5` actually is)
requires a separate lookup against that attribute type's own admin/set data.

**Resolving a Modifier GUID to its code — confirmed 2026-08-06 (UF-15723):** call the `catalogs` service's
`administration/{catalogId}/elements` endpoint (see `snowdrop-api-calls` skill's
`references/catalogs.md`) with the Modifiers catalog id `877fbaf8-a61b-425d-96ef-436f56858415` (confirmed
on `space`, org `20390dc5-616a-456d-bbb6-cb247a4981cb` — likely org-scoped, re-derive per org if a lookup
fails). It returns every modifier element as `{elementId, elementName, isExpired, custom,
isDisconnected}` — `elementName` is the human-readable code (e.g. `"DR"`, `"JZ"`). Confirmed pair from
this investigation: `df8b094b-d8af-4e19-bbf3-ee72727945a5` = **DR** (also flagged `isDisconnected: true`
in the catalog — meaning worth investigating separately, not yet understood), `8085a5f0-0622-4a8b-876d-
ef4264bda5c0` = **JZ**. This resolved the same open question raised on UF-15495 for the identical rule
(`1fec8f7c-7067-4a7e-a7e8-ccfb4ccbc858`, "DR - Suppress Transfers (Specialty Pharmacy)") — its single
`qualifiers[]` entry (`attributeType: 7`, `isSet: false`) requires an exact match on the DR element only,
so a charge carrying any other modifier (including JZ) will never qualify. That's a legitimate
non-qualification, not a bug, when the charge's actual modifier differs from DR.

**Which Modifiers a rule's `qualifiers[]` Modifier check actually sees — confirmed by James 2026-08-06
(UF-15723):** a rule's top-level `qualifiers[]` entry with `attributeType: 7` (Modifier) binds to
**`ChargePayment.Modifiers`, sourced from the payer's remittance/835 submission** — NOT the original
charge's modifiers as created in the `snowdrop-activities` service. This distinction matters because a
charge can be originally billed with more modifiers than a payer's remittance response echoes back. On
UF-15723, charge J3489 was created (Activities' `ChargeCreated` event) with modifiers **DR, JZ, and
SPH**, but United Healthcare's 835 response for that charge only echoed back **JZ** — so a rule requiring
an exact match on DR (`1fec8f7c-7067-4a7e-a7e8-ccfb4ccbc858`, "DR - Suppress Transfers (Specialty
Pharmacy)") correctly did not qualify, even though the charge was genuinely billed with DR. When
diagnosing "why didn't this Modifier-qualified rule fire," always check the **remittance-processing**
`ChargePayment.Modifiers` (or the raw 835 in `snowdrop-remittance`'s `RemittanceCreatedEvent`), not the
`snowdrop-activities` `ChargeCreated` event — the latter can show a modifier that was billed but never
came back from the payer, which will look like a false "the data supports firing" read if you check the
wrong source.

**This is confirmed-as-designed behavior, not a bug — but there's an open design question about it
(per James, 2026-08-06).** Using the payer-remittance-sourced modifier rather than the originally-billed
invoice modifier is per current requirements, so a case like UF-15723 (rule didn't fire because the payer
echoed back JZ instead of the billed DR) is correctly classified as "payer sent an uncorrected/incomplete
modifier on their remittance," not a system defect. There is a standing open question, not yet resolved,
about whether the system *should* continue sourcing this qualifier from the payer's remittance or should
instead read it from the original invoice/charge — if that requirement ever changes, this whole
qualifier-source behavior would need to be revisited. Until then, treat "payer didn't echo back the
correct/expected modifier" as a known anomaly class, distinct from an engine bug, when explaining a
similar non-fire to someone.
