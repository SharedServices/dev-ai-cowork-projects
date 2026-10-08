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

---

## The catalog projections

One blob per catalog, per organization. Each holds `Elements`, a dictionary of code name to catalog element id (for example `CO-45`, `PR-3`, `QW`, `N381`), used when building charge payments. Confirmed by download for the four below (space).

- **Called:** the catalog projection for contractual adjustment reasons; the adjustment reasons catalog
- **Projection:** `Snowdrop.RemittanceProcessing.Runtime.Contracts.Catalogs.CatalogCacheProjection`
- **Account:** standard
- **Path template:** `snowdrop-remittanceprocessing/Organizations/{organizationId}/Snowdrop-RemittanceProcessing-Runtime-Contracts-Catalogs-CatalogCacheProjection/contractualadjustmentreasons.json`

- **Called:** the catalog projection for transfer reasons; the transfer reasons catalog
- **Projection:** `Snowdrop.RemittanceProcessing.Runtime.Contracts.Catalogs.CatalogCacheProjection`
- **Account:** standard
- **Path template:** `snowdrop-remittanceprocessing/Organizations/{organizationId}/Snowdrop-RemittanceProcessing-Runtime-Contracts-Catalogs-CatalogCacheProjection/transferreasons.json`

- **Called:** the catalog projection for remark codes; the remark codes catalog
- **Projection:** `Snowdrop.RemittanceProcessing.Runtime.Contracts.Catalogs.CatalogCacheProjection`
- **Account:** standard
- **Path template:** `snowdrop-remittanceprocessing/Organizations/{organizationId}/Snowdrop-RemittanceProcessing-Runtime-Contracts-Catalogs-CatalogCacheProjection/remarkcodes.json`

- **Called:** the catalog projection for modifiers; the modifiers catalog
- **Projection:** `Snowdrop.RemittanceProcessing.Runtime.Contracts.Catalogs.CatalogCacheProjection`
- **Account:** standard
- **Path template:** `snowdrop-remittanceprocessing/Organizations/{organizationId}/Snowdrop-RemittanceProcessing-Runtime-Contracts-Catalogs-CatalogCacheProjection/modifiers.json`
