# Catalogs Service — resolving attribute-type GUIDs to human names

The `catalogs` service (Pattern A ingress, `/snowdrop/catalogs/...`) is the way to resolve a GUID seen
elsewhere (most commonly in a rules-engine rule's `qualifiers[]` or `SuppressedReasons[]` — see
`repos/snowdrop-remittance-processing-be/business-logic/Rules/references/attribute-types.md` for the `AttributeType` enum that tells
you *which* catalog a given GUID's attribute type points at) into its actual human-readable code/name.

## Endpoint

```
https://api.unlimitedfinancials.{env}/snowdrop/catalogs/administration/{catalogId}/elements
```

`{catalogId}` selects which catalog (Modifiers, Charge Codes, etc.) — **the catalog concept lines up with
the rules engine's `AttributeType` enum**, so once you know a GUID's `attributeType` value (e.g. `7` =
Modifier), you're looking for that attribute type's corresponding catalog GUID here. Returns the list of
elements in that catalog — each element carries the GUID(s) used elsewhere (e.g. a rule's `qualifiers[].id`)
alongside its actual code/description, letting you resolve "what does GUID X actually mean" instead of
guessing from context.

## Confirmed catalog GUIDs

| AttributeType | Catalog name | Catalog GUID | Env/org confirmed |
|---|---|---|---|
| 7 (Modifier) | Modifiers | `877fbaf8-a61b-425d-96ef-436f56858415` | `space`, org `20390dc5-616a-456d-bbb6-cb247a4981cb` (2026-08-05, UF-15495) |

Not yet confirmed whether catalog GUIDs are fixed/global (like the rules engine's `SequenceId` GUIDs —
identical across every org) or per-organization. Confirm before reusing this GUID against a different org
without checking — if reused successfully across a second org, update this note.

## Why this matters

Investigating UF-15495 surfaced a rule ("DR - Suppress Transfers (Specialty Pharmacy)") whose top-level
`qualifiers[]` required a specific Modifier element GUID. The charge in question carried a *different*
Modifier GUID on its remittance data. Without resolving both GUIDs to their actual modifier codes (e.g.
"DR" vs "JZ") via this endpoint, there's no way to confirm whether that's a genuine qualifier mismatch
(rule correctly didn't fire) or a data-shape misunderstanding (e.g. multiple modifiers on a charge, only
one of which lands in the field the rule reads). This endpoint is the missing piece for that kind of
GUID-to-meaning resolution — pair it with `repos/snowdrop-remittance-processing-be/business-logic/Rules/references/attribute-types.md` whenever a rule's
JSON config surfaces an unresolved element GUID.
