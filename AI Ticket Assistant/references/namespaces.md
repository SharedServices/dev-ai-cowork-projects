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
| Charge masters | `snowdrop-charge-masters` | (same) | container `snowdrop-charge-masters-api`; CQRS write/projection pattern (`CompanyProjectionWriter` updates read projections) | Ledger |
| Patients API | `snowdrop-patients-api-be` |

## Activity-tracing (TraceId) rollout

Instana/`TraceId` instrumentation is being rolled out namespace-by-namespace and environment-by-environment, not all at once. See the `splunk-search` skill's "Activity-tracing adherence by environment" section for the current confirmed state per env and how to search around gaps (e.g. `snowdrop-ledger` not propagating trace ids even where the rest of the flow is instrumented).

- **Rollout order:** new tracing coverage lands in **cloud** first, then reaches all other environments roughly **one week later**.
- **Adherence is monotonic per namespace+environment** — once a namespace is confirmed to carry `TraceId`/`SpanId` in a given environment, that's permanent; it doesn't regress. Record confirmations forward-only in the skill.
- **Always start an investigation with the cross-service `TraceId` pattern**, even in an environment/namespace not yet confirmed — that's how newly-rolled-out coverage gets noticed rather than assumed absent.

## Namespaces by service

Namespaces other than the Financial Ledger rows were confirmed from Splunk ninja index 2026-06-08, except **Code systems** and **Command center** — those were confirmed 2026-07-07 as Cosmos DB database names (`king-ninja-sharp-be-cdb`), not yet seen directly in Splunk; the Splunk `namespace` value is presumed identical but unconfirmed.

Squad and pod ownership is kept only in root `CLAUDE.md`'s `## Repos` table (and, for services without a repo folder, the rows there with `—` as the repo folder). It is not repeated here.

**Cosmos database name vs Splunk namespace can differ in dashing.** Confirmed exception: Charge assemblies is `snowdrop-charge-assemblies` in Splunk but `snowdrop-chargeassemblies` (no dash before "assemblies") as a Cosmos database name (2026-07-07). Don't assume the two are always byte-identical — verify the Cosmos database name in Data Explorer rather than reusing the Splunk namespace string as-is.

| Service / area            | namespace value                    |
|---------------------------|------------------------------------|
| Activities                | `snowdrop-activities`              |
| Audit log                 | `snowdrop-audit-log`               |
| Catalogs                  | `snowdrop-catalogs`                |
| Change healthcare         | `snowdrop-change-healthcare`       |
| Charge assemblies         | `snowdrop-charge-assemblies`       |
| Charge interventions      | `snowdrop-chargeinterventions`     |
| Charge masters            | `snowdrop-charge-masters`          |
| Code systems              | `snowdrop-code-systems`            |
| Command center            | `snowdrop-commandcenter`           |
| Custom fields             | `snowdrop-custom-fields` *(unconfirmed — derived from repo name `snowdrop-custom-fields-be` via the default naming convention, not yet seen directly in Splunk/Cosmos; added 2026-09-21 at James's request)* |
| Engagement brands         | `unlimited-engagement-brands` *(unconfirmed — derived from repo name `unlimited-engagement-brands-be` via the default naming convention)* |
| Engagement communication  | `unlimited-engagement-communication` *(unconfirmed — repo name has no `-be` suffix; namespace not yet seen directly)* |
| Engagement patient portal | `unlimited-engagement-patient-portal` *(unconfirmed — derived from repo name `unlimited-engagement-patient-portal-be` via the default naming convention)* |
| Episodes                  | `snowdrop-episodes`                |
| Financial counselor       | `snowdrop-financial-counselor`     |
| Graph API                 | `snowdrop-graphapi`                |
| Guarantors                | `snowdrop-guarantors`              |
| Identifiers               | `snowdrop-identifiers`             |
| Intake                    | `snowdrop-intake`                  |
| Interventions             | `snowdrop-interventions`           |
| Invoices                  | `snowdrop-invoices`                |
| Ledgers                   | `snowdrop-ledger`                  |
| Notes (Unlimited API)     | `snowdrop-notes-unlimitedapi`      |
| Notes v2                  | `snowdrop-notes-v2`                |
| Patient agreements        | `snowdrop-patientagreements`       |
| Patient encounters        | `snowdrop-patientencounters`       |
| Patient providers         | `snowdrop-patient-providers`       |
| Patients API (BE)         | `snowdrop-patients-api-be`         |
| Payer portfolios v2       | `snowdrop-payer-portfolios-v2`     |
| Payers                    | `snowdrop-payers`                  |
| Payments                  | `snowdrop-payments`                |
| Phoenix                   | `phoenix` *(unconfirmed — derived from repo name `phoenix-be` via the default naming convention)* |
| Plans search              | `snowdrop-plans-search`            |
| Policies                  | `snowdrop-policies`                |
| Policy authorizations     | `snowdrop-policyauthorizations`    |
| Policy referrals          | `snowdrop-policyreferrals`         |
| Pre-visit validation      | `snowdrop-previsit-validation`     |
| Remittance (BE)           | `snowdrop-remittance`              |
| Remittance processing     | `snowdrop-remittanceprocessing`    |
| Resources                 | `snowdrop-resources`               |
| RTE                       | `snowdrop-rte`                     |
| Scheduling                | `snowdrop-scheduling`              |
| Security                  | `snowdrop-security`                |
| Security (functional)     | `snowdrop-security-functional`     |
| Sets                      | `snowdrop-sets`                    |
| Statements                | `snowdrop-statements`              |
| Unlimited connectors      | `snowdrop-unlimited-connectors` *(unconfirmed — derived from repo name `snowdrop-unlimited-connectors-be` via the default naming convention)* |
| Waypoints                 | `snowdrop-waypoints`               |
| Workflows                 | `snowdrop-workflows`               |
