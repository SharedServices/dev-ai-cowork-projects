# ERA model reference

The model is JSON. Every field is optional unless marked. The right column gives the 835 segment and element, and how the Remittance parser uses it. Derived from the parser code in `src/Snowdrop.Remittance.EdiFabric/EraReader/` (nothing there needs to be read to use this file). The renderer in `scripts/era-x12.js` is the source of truth for what is written; update this file when it changes.

Dates are `yyyy-MM-dd`. Amounts are plain numbers and may be negative (reversals).

## Fields left out on purpose

The model carries only fields that end up in the stored remittance. A value the Remittance factory does not map is a dead end, so it has no model field and is not written: payment method and format (BPR01, BPR03, BPR04, BPR05), DTM*405, TRN03, CLP06, CLP08, CLP09. The envelope (ISA, GS, ST, SE, GE, IEA) is written with fixed values because the file needs it to be read; none of it is a model field.

## checks[] (one per 835 transaction, one remittance each)

| Field | X12 | Parser use |
|---|---|---|
| `number` | TRN02 | Check number. Duplicate check number in the organization is withheld. Generated, 10 digits. |
| `date` | BPR16 | Check date. Default today. |
| `amount` | BPR02 | Check amount. Computed as claims paid minus provider adjustment amounts when omitted. |
| `payer.name` | N1*PR, N102 | Payer name and payer literal. Default `TEST PAYER`. |
| `payer.addressLine1/2`, `city`, `state`, `zip` | N3, N4 | Payer address lines 1 to 3. |
| `payee.name` | N1*PE, N102 | Payee name. Default `TEST PROVIDER`. |
| `payee.idCode` | N1*PE, N104 (qualifier XX) | Payee id code. |
| `payee.taxId` | REF*TJ in the PE loop | Used to find the company. If a tax id is present and no company in the organization has it, the remittance is created and then discarded automatically (posting status 8, Discarded) and never appears in the pending checks list. Omit the field to get a normal New remittance with no company, or use the tax id of an existing company. The templates omit it. |
| `payee.addressLine1/2`, `city`, `state`, `zip` | N3, N4 | Payee address lines 1 to 3. |
| `providerAdjustments[]` | PLB | One pair per entry. |
| - `providerId` | PLB01 | |
| - `fiscalDate` | PLB02 | |
| - `reasonCode` | PLB03-1 | |
| - `identifier` | PLB03-2 | The EOB reads this one value as `{FCN} {HICN}`: it splits on whitespace, the last token is shown as HICN and everything before it as FCN/Other Identifier. The FCN is shown with a hyphen after its first two characters (`12345` shows as `12-345`; an FCN that already has a hyphen shows as `12--345`), or as `MM/dd/yyyy` when it is 8 digits `yyyyMMdd`. The last token is not necessarily a HICN: the claim page of the EOB lists the adjustment on a claim only when the identifier contains that claim's claim number or ICN. With no identifier the adjustment appears only in the footer table. Source: `EobGenerator.cs` in `snowdrop-remittance-be` (`CreateClaimAdjustmentLines`, `CreateAdjustmentsTable`). |
| - `amount` | PLB04 | Positive reduces the payment, negative increases it. |

## checks[].claims[] (one CLP loop each)

| Field | X12 | Parser use |
|---|---|---|
| `claimNumber` | CLP01 | Account number; matched to a claim in the organization. Generated `CLM` plus 8 digits. |
| `status` | CLP02 | Required. Blank fails the whole check. 1/19 primary, 2/20 secondary, 3/21 tertiary, 4 denied, 22 reversal. Default `1`. |
| `billed` | CLP03 | Computed from services when omitted. |
| `paid` | CLP04 | Computed from services when omitted. |
| `patientResponsibility` | CLP05 | When omitted, blank, and the system calculates it from service adjustments. |
| `icn` | CLP07 | Generated, 12 digits. |
| `date` | DTM*232 | Claim date. Default check date. |
| `patient.last/first/middle/suffix/id` | NM1*QC (03/04/05/07/09) | Patient name and HIC. |
| `insured.last/first/middle/suffix/id` | NM1*IL | Insured name and HIC. |
| `secondId` | NM1*74, 09 | Second HIC. |
| `forwardedTo` | NM1*TT, 03 | |
| `serviceProviderId` | NM1*82, 09 | |
| `remarkCodes[]` | MOA03 to MOA07 | Up to 5. |
| `adjustments[]` | CAS | Claim-level. Each is `group`, `reason`, `amount`. Max 4 pairs per CAS segment (renderer splits). |
| `supplementalAmounts[]` | AMT | `qualifier`, `amount`. `I` is interest. |

## checks[].claims[].services[] (one SVC loop each)

| Field | X12 | Parser use |
|---|---|---|
| `procedure` | SVC01-2 | Procedure code. Copied as sent. |
| `modifiers[]` | SVC01-3 to 01-6 | Up to 4. |
| `billed` | SVC02 | |
| `paid` | SVC03 | Provider paid. |
| `units` | SVC05 | Quantity. |
| `sentProcedure`, `sentUnits` | SVC06-2, SVC07 | |
| `serviceDate` | DTM*472 | Default claim date. |
| `periodStart`, `periodEnd` | DTM*150, DTM*151 | |
| `allowed` | AMT*B6 | |
| `adjustments[]` | CAS | Service-level, same shape as claim level. Reason `1` is read as deductible, `2` as coinsurance. Patient responsibility is calculated from adjustments whose group-reason is in the transfer reasons catalog (for example `PR-1`). |
| `lineControlNumber` | REF*6R | Used by charge matching. |
| `references[]` | REF | Any other service REF: `qualifier`, `id`. Written after the 6R and HPI references. |
| `renderingProviderId` | REF*HPI | Not set by the claim lookup: a real production ERA had none. Set it only when asked. |
| `supplementalAmounts[]` | AMT | |
| `remarks[]` | LQ | `qualifier`, `code`. |
| `chargeBalance` | none | Lookup information from a claim (the charge's balance), never written to the X12. The balance line warns when `paid` is more than it. |

## asImported (top level)

`true` on a model read from an ERA file. The engine then leaves missing claim dates, service dates and ICNs empty instead of defaulting them, so the ERA reproduces the source. Remove it to get the defaults back.

## generated (any object)

The engine saves a `generated` list of field names in each check, claim and service object (and in `payer` and `payee`) for the values it filled in by default. The summary uses it to label values as generated, computed or default. It has no effect on the X12. The `set` edit operation removes the name from the list when the user sets that value.

## Balance rules (checked by `-Action Check`)

- Service: billed minus paid equals the sum of its adjustment amounts.
- Claim: billed and paid equal the sums over its services.
- Check: amount equals claims paid minus provider adjustment amounts.

## Not modelled

Segments the parser does not read are left out or generated with fixed values: PER, claim-level REF, DTM*233 and DTM*050, the fields listed under "Fields left out on purpose", SE/GE/IEA counts (computed).
