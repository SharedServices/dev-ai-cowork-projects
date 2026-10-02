# Blob projections

Projection blobs stored by this repo. One entry per projection. See root `CLAUDE.md`, "Azure Blob Storage", for how to use an entry and for the account name patterns.

- **Called:** the name the user uses for the projection.
- **Projection:** the type name.
- **Account:** the storage account type (standard, premium, or feeschedule).
- **Path template:** the container, then the blob name. Placeholders in braces are filled in lowercase.

---

## The remittance projection

- **Called:** the remittance projection; the main remittance projection
- **Projection:** `Snowdrop.RemittanceProcessing.Runtime.Contracts.Remittances.RemittanceProjection`
- **Account:** standard
- **Path template:** `snowdrop-remittanceprocessing/Organizations/{organizationId}/Snowdrop-RemittanceProcessing-Runtime-Contracts-Remittances-RemittanceProjection/{remittanceId}.json`
