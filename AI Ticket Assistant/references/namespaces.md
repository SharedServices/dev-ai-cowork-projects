Namespaces are Kubernetes namespaces. The field name varies by tool — in Splunk use `namespace="{value}"`. The human-readable service name and the actual namespace value don't always match exactly — record confirmed values here as they're discovered.

## Repository naming convention

The Unlimited solution is broken into repositories, one per service. By default the repository name is the namespace value with a `-be` suffix appended (e.g. namespace `snowdrop-payers` → repo `snowdrop-payers-be`).

Confirmed exceptions where repo = namespace (no additional `-be`):

| Namespace | Repository |
|---|---|
| `snowdrop-patients-api-be` | `snowdrop-patients-api-be` |

Confirmed exceptions with a different insertion, not just a suffix:

| Namespace | Repository |
|---|---|
| `snowdrop-payers` | `snowdrop-payers-api-be` (has an inserted `-api-`, same shape as the Patients exception above) |
| `snowdrop-charge-masters` | `snowdrop-charge-master-be` (singular, unlike the plural namespace value) |

## Tool field mappings & container notes

The namespace value is reused across tools, but field names and container names differ:

- **Splunk:** filter with `namespace="{value}"`. `Properties.Application` usually carries the same value as `namespace` — but not always (see exceptions below).
- **Container names** (`container_name` in Splunk) are usually derived from the namespace but can differ.

Confirmed exceptions / details:

| Service | namespace | `Properties.Application` | container / notes |
|---|---|---|---|
| Charge masters | `snowdrop-charge-masters` | (same) | container `snowdrop-charge-masters-api`; CQRS write/projection pattern (`CompanyProjectionWriter` updates read projections) |
| Patients API | `snowdrop-patients-api-be` | `snowdrop-patients-api` | namespace and Application **differ** — check both when scoping by service |

## Activity-tracing (TraceId) rollout

Instana/`TraceId` instrumentation is being rolled out namespace-by-namespace and environment-by-environment, not all at once. See the `splunk-search` skill's "Activity-tracing adherence by environment" section for the current confirmed state per env and how to search around gaps (e.g. `snowdrop-ledger` not propagating trace ids even where the rest of the flow is instrumented).

- **Rollout order:** new tracing coverage lands in **cloud** first, then reaches all other environments roughly **one week later**.
- **Adherence is monotonic per namespace+environment** — once a namespace is confirmed to carry `TraceId`/`SpanId` in a given environment, that's permanent; it doesn't regress. Record confirmations forward-only in the skill.
- **Always start an investigation with the cross-service `TraceId` pattern**, even in an environment/namespace not yet confirmed — that's how newly-rolled-out coverage gets noticed rather than assumed absent.

## Namespaces by squad

Namespaces other than the Financial Ledger rows were confirmed from Splunk ninja index 2026-06-08, except **Code systems** and **Command center** — those were confirmed 2026-07-07 as Cosmos DB database names (`king-ninja-sharp-be-cdb`), not yet seen directly in Splunk; the Splunk `namespace` value is presumed identical but unconfirmed.

**Cosmos database name vs Splunk namespace can differ in dashing.** Confirmed exception: Charge assemblies is `snowdrop-charge-assemblies` in Splunk but `snowdrop-chargeassemblies` (no dash before "assemblies") as a Cosmos database name (2026-07-07). Don't assume the two are always byte-identical — verify the Cosmos database name in Data Explorer rather than reusing the Splunk namespace string as-is.

| Service / area            | namespace value                    | Squad |
|---------------------------|------------------------------------|-------|
| Activities                | `snowdrop-activities`              | Billing & AR |
| Audit log                 | `snowdrop-audit-log`               | Platform |
| Catalogs                  | `snowdrop-catalogs`                | Billing & AR |
| Change healthcare         | `snowdrop-change-healthcare`       | Billing & AR |
| Charge assemblies         | `snowdrop-charge-assemblies`       | Billing & AR |
| Charge interventions      | `snowdrop-chargeinterventions`     | Billing & AR |
| Charge masters            | `snowdrop-charge-masters`          | Financial Ledger |
| Code systems              | `snowdrop-code-systems`            | Platform |
| Command center            | `snowdrop-commandcenter`           | Platform |
| Custom fields             | `snowdrop-custom-fields` *(unconfirmed — derived from repo name `snowdrop-custom-fields-be` via the default naming convention, not yet seen directly in Splunk/Cosmos; added 2026-09-21 at James's request)* | Platform |
| Engagement brands         | `unlimited-engagement-brands` *(unconfirmed — derived from repo name `unlimited-engagement-brands-be` via the default naming convention)* | Financial Clearance |
| Engagement communication  | `unlimited-engagement-communication` *(unconfirmed — repo name has no `-be` suffix; namespace not yet seen directly)* | Financial Clearance |
| Engagement patient portal | `unlimited-engagement-patient-portal` *(unconfirmed — derived from repo name `unlimited-engagement-patient-portal-be` via the default naming convention)* | Financial Clearance |
| Episodes                  | `snowdrop-episodes`                | Billing & AR |
| Financial counselor       | `snowdrop-financial-counselor`     | Financial Clearance |
| Graph API                 | `snowdrop-graphapi`                | Platform |
| Guarantors                | `snowdrop-guarantors`              | Financial Ledger |
| Identifiers               | `snowdrop-identifiers`             | Platform |
| Intake                    | `snowdrop-intake`                  | Financial Clearance |
| Interventions             | `snowdrop-interventions`           | Platform |
| Invoices                  | `snowdrop-invoices`                | Billing & AR |
| Ledgers                   | `snowdrop-ledger`                  | Financial Ledger |
| Notes (Unlimited API)     | `snowdrop-notes-unlimitedapi`      | Platform |
| Notes v2                  | `snowdrop-notes-v2`                | Platform |
| Patient agreements        | `snowdrop-patientagreements`       | Financial Clearance |
| Patient encounters        | `snowdrop-patientencounters`       | Billing & AR |
| Patient providers         | `snowdrop-patient-providers`       | Financial Clearance |
| Patients API (BE)         | `snowdrop-patients-api-be`         | Financial Ledger |
| Payer portfolios v2       | `snowdrop-payer-portfolios-v2`     | Billing & AR |
| Payers                    | `snowdrop-payers`                  | Financial Ledger |
| Payments                  | `snowdrop-payments`                | Financial Clearance |
| Phoenix                   | `phoenix` *(unconfirmed — derived from repo name `phoenix-be` via the default naming convention)* | Platform |
| Plans search              | `snowdrop-plans-search`            | Financial Ledger |
| Policies                  | `snowdrop-policies`                | Financial Clearance |
| Policy authorizations     | `snowdrop-policyauthorizations`    | Financial Clearance |
| Policy referrals          | `snowdrop-policyreferrals`         | Financial Clearance |
| Pre-visit validation      | `snowdrop-previsit-validation`     | Financial Clearance |
| Remittance (BE)           | `snowdrop-remittance`              | Financial Ledger |
| Remittance processing     | `snowdrop-remittanceprocessing`    | Financial Ledger |
| Resources                 | `snowdrop-resources`               | Financial Ledger |
| RTE                       | `snowdrop-rte`                     | Financial Clearance |
| Scheduling                | `snowdrop-scheduling`              | Financial Clearance |
| Security                  | `snowdrop-security`                | Platform |
| Security (functional)     | `snowdrop-security-functional`     | Platform |
| Sets                      | `snowdrop-sets`                    | Billing & AR |
| Statements                | `snowdrop-statements`              | Billing & AR |
| Unlimited connectors      | `snowdrop-unlimited-connectors` *(unconfirmed — derived from repo name `snowdrop-unlimited-connectors-be` via the default naming convention)* | Financial Clearance |
| Waypoints                 | `snowdrop-waypoints`               | Billing & AR |
| Workflows                 | `snowdrop-workflows`               | Billing & AR |
