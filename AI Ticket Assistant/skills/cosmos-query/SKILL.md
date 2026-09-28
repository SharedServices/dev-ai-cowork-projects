---
name: cosmos-query
description: >
  Query Azure Cosmos DB for Unlimited Systems environments. Use this skill when asked to query Cosmos,
  look up a remittance / organization / charge / payer / event feed in Cosmos, build a Cosmos SQL query,
  generate an Azure Data Explorer deeplink, or inspect a document/container in any environment. Trigger
  on: "query cosmos", "look in cosmos", "cosmos query", "data explorer", "find this remittance/org in
  cosmos", or a pasted remittance URL of the form sdsh.unlimitedfinancials.{env}/...
---

# Cosmos Query Skill

Use this skill when asked to query Azure Cosmos DB in any Unlimited Systems environment — looking up a
remittance, organization, charge, payer, or event-sourced feed; building a Cosmos SQL query; or
generating an Azure Data Explorer deeplink.

> **Status:** account/auth patterns confirmed (2026-06-25). Event-feed structure confirmed in depth
> 2026-07-07 and again 2026-07-20 (source-derived event docs for Resources, Payers, Charge Masters,
> Guarantors, Patients). **Reorganized 2026-07-20**: this file now holds only cross-cutting mechanics
> (auth, StreamId format, universal envelope, blob-pointer pattern, running queries). Per-service detail
> (stream maps, gotchas, per-service queries) lives in `services/*.md` — see the table below and open the
> relevant file before answering a service-specific question. **Browser-launch behavior refined
> 2026-10-01** — see "Auto-launching Data Explorer via Claude-in-Chrome" below; this replaces the older
> "ask the user to navigate themselves" default. **All 11 envs' Data Explorer deeplinks fully confirmed
> 2026-10-02** — see the *Azure Data Explorer deeplink* table; no more guessed resource-group names.
> **Not yet fully toured:** Plans search,
> `snowdrop-charge-assemblies-be` (a different team's service — namespace/StreamId info not yet gathered,
> source doc available when needed), and every other-squad entity — still `{TODO-confirm}`. Don't present
> a `{TODO-confirm}` value as fact.

---

## Service reference files

Each file below is self-contained: StreamId format, database/container, confirmed aggregate types, gotchas, and ready-to-run queries for that service. Open the one that matches the question rather than searching this file for service-specific detail.

**These files are curated distillations, not the ground truth.** Each repo's own `repos/{repo}/references/Events.md` (where one exists — see that repo's `CLAUDE.md`) is source-derived — every event class, stream, and property for that repo — and is authoritative. A service file here being silent on a stream, entity type, or event is not evidence it doesn't exist; it may just not have been pulled in yet. **Before telling the user something isn't documented, read the matching `Events.md` first**, then fold whatever you find back into the relevant file (see "Growing this skill" below).

| Service | File | Covers |
|---|---|---|
| Remittance Processing | `repos/snowdrop-remittance-processing-be/references/cosmos_query.md` **(migrated out of this skill — repo-scoped)** | workflow status/dates, dispute lookup by ChargePaymentId |
| Remittance (BE) | `repos/snowdrop-remittance-be/references/cosmos_query.md` **(migrated out of this skill — repo-scoped)** | `LedgerDate`, `CheckAmount`/check header, EOB attachments |
| Resources | `repos/snowdrop-resources-be/references/cosmos_query.md` **(migrated out of this skill — repo-scoped)** | company, facility, provider, payment-device/vendor, monthly-close, division-ledger, facility/human-resource |
| Guarantors | `repos/snowdrop-guarantors-be/references/cosmos_query.md` **(migrated out of this skill — repo-scoped)** | guarantor CRUD, PII warning |
| Patients | `repos/snowdrop-patients-api-be/references/cosmos_query.md` **(migrated out of this skill — repo-scoped)** | patient demographics, merge/duplicate, address/contact/location collections |
| Payers | `repos/snowdrop-payers-api-be/references/cosmos_query.md` **(migrated out of this skill — repo-scoped)** | payer/plan, contracts, fee schedules, global fee schedules, SNF, delinquency thresholds, vendor settings |
| Charge Masters | `repos/snowdrop-charge-master-be/references/cosmos_query.md` **(migrated out of this skill — repo-scoped)** | company catalogue stream vs. per-charge-master fee stream |
| Ledgers | `repos/snowdrop-ledger-be/references/cosmos_query.md` **(migrated out of this skill — repo-scoped)** | charge/balance/insurance events, `ChargePostingFailed` error codes |
| Invoices | `services/invoices.md` | claim-invoice stream lookup (not a Herbert service — no `Events.md` source doc; StreamId format confirmed by live sample only) |
| Activities | `services/activities.md` | charge-level activity stream lookup, keyed by `ChargeId` (not a Herbert service — no `Events.md` source doc; StreamId format confirmed by live sample only) |

---

## Access

- **Account naming pattern:** `king-{env}-sharp-be-cdb` (e.g. `king-ninja-sharp-be-cdb`) — Cosmos-specific
  instantiation of the pattern declared in root `CLAUDE.md`'s Cosmos DB section (canonical source; don't
  restate the formula's provenance here). Structure — databases, containers, partition keys — is
  **identical across all environments**; only the account name changes.
- **Envs/tiers:** see root `CLAUDE.md`'s `## Environments` table — canonical list and the "prod is a
  grouping label, not a peer env" rule live there, not here.
- **The Cowork shell CANNOT reach Azure endpoints** (same constraint as the Function APIs). Any query
  that actually hits Cosmos must be run from **the user's local machine** (Azure CLI / PowerShell / SDK) or
  in the **Azure Portal Data Explorer** in the browser. From here, this skill's job is to *generate* the
  query, the deeplink, or the local command — not to execute it. (Claude can, however, **launch** the
  browser to the right place — see "Auto-launching Data Explorer via Claude-in-Chrome" below. That's
  navigation, not query execution; it doesn't change this constraint.)
- **Authorization:** the user generally has **read** access for investigation; they may not be authorized to
  run direct queries against every env. Expect Data Explorer (portal RBAC) to be the reliable path; CLI
  with keys may be blocked. Generate the query regardless and let them run whichever path works.

### Auth options (local machine)
- **Entra ID / RBAC** (preferred, no secrets): `az login`, then the SDK / Data Explorer uses your AD
  identity. Data-plane RBAC must be granted on the account.
- **Account key / connection string:** `az cosmosdb keys list -n king-{env}-sharp-be-cdb -g {rg} --type keys`.
  Treat keys as secrets — never write them to the project or to memory.

---

## Parsing the remittance URL

When the user pastes a URL of this shape, extract the inputs — don't ask them to re-state them:

```
https://sdsh.unlimitedfinancials.{env}/{organizationId}/payers/payer/{payerId}/remittance/{remittanceId}
```

- host suffix → **env**
- path segment 1 → **organizationId**
- path segment 4 → **payerId** (ignore unless explicitly asked about payers)
- path segment 6 → **remittanceId**

Map `env` → account `king-{env}-sharp-be-cdb`. (Host pattern confirmed for `ninja` only; if a suffix
doesn't match a known env, ask before guessing — per CLAUDE.md.)

---

## Production safety

Production envs are exactly CLAUDE.md's `## Environments` table's production row (`cloud`, `app`, `care`,
`space`, `uno`, `blue`, `live` — see there for the current list, don't restate it here). Read-only
`SELECT` queries are fine against them. **Any write / delete / replace / upsert against prod must be
confirmed explicitly with the user before running, every time** — prior approval never carries from one
env to another (CLAUDE.md rule). Non-prod writes are lower-risk but still flag them.

---

## Conventions

- **Show GUIDs in full** — never abbreviate ids when reporting. Canonical rule lives in root `CLAUDE.md`'s
  `## Language` section — don't restate it here.
- **QA orgs:** organizationId starting `00000000-0000-` = QA org. Canonical rule lives in root `CLAUDE.md`'s
  `## Environments` section — don't restate it here.
- **Event feeds:** the event class name is the discriminator — match `c.EventType` **first**, fall back
  to `c.SubEventType`. Robust filter: `(c.EventType = "X" OR c.SubEventType = "X")`. Confirmed (team env):
  `ChargeAssemblyDNAUpdated`, `ChargeAssemblyPayerAccountsUpdated` use `EventType`; `PayerAssemblyCreated`,
  `PayerAssemblyIndexUpdated`, `PayerAssemblyStatusUpdated`, `PayerAssemblyCoveredChargesUpdated` use
  `SubEventType` — confirmed for charge-assemblies/payer-assemblies specifically, not yet verified as
  universal.
- **ChargePayment↔Charge cardinality and the Nimbus system UserId are not covered here.** ChargePayment↔Charge cardinality is remittance-processing-specific — see `repos/snowdrop-remittance-processing-be/business-logic/ChargePaymentCardinality/CLAUDE.md`. The Nimbus system UserId is confirmed platform-wide, not repo-specific — see the top-level `business-logic/CLAUDE.md` instead.

---

## Azure Data Explorer deeplink

The reliable path when CLI access is blocked. Generate a portal deeplink to the account's Data Explorer;
the user pastes the SQL into the query editor.

**Whenever this URL is handed to the user, put it alone in its own fenced code block — never inline in a
sentence or just named by account/env.** That's what gives the chat UI a copy button on it, and it's the
whole point of generating the link at all — a description of where to find it ("Data Explorer for
`king-{env}-sharp-be-cdb`") is not a substitute for the clickable/copyable URL itself. This applies
everywhere the deeplink is surfaced in this skill, including "Responding to 'get events for X'" below.

```
https://portal.azure.com/#@/resource/subscriptions/{subscriptionId}/resourceGroups/{rg}/providers/Microsoft.DocumentDB/databaseAccounts/king-{env}-sharp-be-cdb/dataExplorer
```

`{subscriptionId}` and `{rg}` are env-specific — confirmed for `ninja` (subscription "uf-kingdom - Ninja"):
`subscriptionId=6951b16b-2798-4bcc-9d77-7f5cde70551e`, `rg=king-ninja-rg-sharp-becdb-ue` (2026-07-07, via
portal navigation — also note the account itself resolves under tenant `sharedsvs.onmicrosoft.com`, e.g.
`portal.azure.com/#@sharedsvs.onmicrosoft.com/resource/...`, not the org's home tenant). `team`'s: subscription
`247c6a4e-97b7-4df7-b9f2-3fe2b56c6bff`, RG `king-team-rg-sharp-becdb-ue`. **`space`'s (confirmed 2026-08-06,
UF-15723, via a real portal URL pasted from a live session):** subscription `8bcba29c-f8a6-42bd-b2ba-e2a929138d51`, RG
`king-space-rg-sharp-becdb-ue`. Note the user's actual URL used a different blade name/shape than this doc had
been assuming — `.../providers/Microsoft.DocumentDb/databaseAccounts/king-space-sharp-be-cdb/DataExplorerBlade`
(capital-B `DataExplorerBlade`, plus lowercase `DocumentDb` in the provider segment) rather than
`.../dataExplorer` — and it was anchored to the `sharedsvs.onmicrosoft.com` tenant slug
(`#@sharedsvs.onmicrosoft.com/resource/...`), same as ninja. Confirmed working full link for `space`:
```
https://portal.azure.com/#@sharedsvs.onmicrosoft.com/resource/subscriptions/8bcba29c-f8a6-42bd-b2ba-e2a929138d51/resourceGroups/king-space-rg-sharp-becdb-ue/providers/Microsoft.DocumentDb/databaseAccounts/king-space-sharp-be-cdb/DataExplorerBlade
```
**Also confirmed working for `ninja` (2026-10-01):** navigating directly to the `.../dataExplorer` suffix
(no `DataExplorerBlade`) redirects through the account's Overview page first, then on to Data Explorer —
one extra hop, ~6-8s, but lands in the same place. Either suffix works; `DataExplorerBlade` is slightly
faster when confirmed for an env, `dataExplorer` is the safe fallback otherwise.

**All 11 envs fully confirmed 2026-10-02** — subscriptionIds via the user's own `az account list` output
(matched against the `uf-kingdom - {Env}` naming pattern), resource groups via a live portal spot-check of
every env (global search for the account name, or filtering each subscription's Resource Groups blade for
`becdb` when global search came up empty). Two different resource-group suffixes are in play — `-ue`
(East US, the original three plus six more) and `-cus` (Central US, seen on the two newer prod envs) — so
don't assume one suffix is universal; the table below has the real value for each env, not a guess.

| env | subscriptionId | resource group |
|---|---|---|
| `ninja` | `6951b16b-2798-4bcc-9d77-7f5cde70551e` | `king-ninja-rg-sharp-becdb-ue` — confirmed |
| `team` | `247c6a4e-97b7-4df7-b9f2-3fe2b56c6bff` | `king-team-rg-sharp-becdb-ue` — confirmed |
| `space` | `8bcba29c-f8a6-42bd-b2ba-e2a929138d51` | `king-space-rg-sharp-becdb-ue` — confirmed |
| `one` | `51258de7-4c68-44aa-80cf-cfba52e68cba` | `king-one-rg-sharp-becdb-ue` — confirmed 2026-10-02 |
| `exchange` | `ba256f0f-fd77-4eb6-be93-189f9ee2361f` | `king-exchange-rg-sharp-becdb-ue` — confirmed 2026-10-02. Uses the full word "exchange," NOT the `exch` alias the `splunk-search` skill uses for its index — that alias does not carry over to the Cosmos account/RG name. |
| `cloud` | `30bd19bd-df6b-4e3f-afb8-a0943731eaa3` | `king-cloud-rg-sharp-becdb-ue` — confirmed 2026-10-02 |
| `app` | `07dc059a-8cbd-45bc-8aa6-4f5c61dea671` | `king-app-rg-sharp-becdb-ue` — confirmed 2026-10-02 |
| `care` | `e5770398-3279-49ba-bdfb-0c02ae7c07d4` | `king-care-rg-sharp-becdb-ue` — confirmed 2026-10-02. Note: this subscription also has a second, unrelated `king-care-sharp-becdb-ue` RG (no `-rg-`) that is NOT the Cosmos account's RG — don't confuse the two. |
| `uno` | `e8829cb5-bb7d-4814-9371-de53e5ebd890` | `king-uno-rg-sharp-becdb-ue` — confirmed 2026-10-02 |
| `blue` | `13c7f2a2-5779-443f-8ff1-53b61cf9844e` | `king-blue-rg-sharp-becdb-cus` — confirmed 2026-10-01, breaks the `-ue` pattern (`cus` suffix) |
| `live` | `bcc78f14-19ef-4f63-baef-49d2bca43404` | `king-live-rg-sharp-becdb-cus` — confirmed 2026-10-02, also `cus` like `blue` |

Build the deeplink using each env's own confirmed resource group from the table above — don't apply a
single templated suffix across all envs, since `-ue` and `-cus` both occur:
```
https://portal.azure.com/#@sharedsvs.onmicrosoft.com/resource/subscriptions/{subscriptionId}/resourceGroups/{resource group from table}/providers/Microsoft.DocumentDB/databaseAccounts/king-{env}-sharp-be-cdb/dataExplorer
```
Every env now has a fully confirmed, ready-to-use deeplink — no more "pattern, unverified" caveats.

**Blade-suffix behavior varies by env, confirmed while spot-checking `blue`/`live` (the `cus` envs)
2026-10-01/02:** navigating straight to the `.../dataExplorer` URL suffix auto-redirects through Overview
to Data Explorer on the `-ue` envs (confirmed on `ninja`, ~6-8s one-hop redirect), but on `blue` it landed
on Overview and stayed there — only clicking the "Data Explorer" link in the left nav actually got to Data
Explorer, resolving to the `.../DataExplorerBlade` suffix. Not independently re-checked on `live` or the
other `-ue` envs beyond `ninja`/`space`, but worth defaulting to `DataExplorerBlade` for `blue` and `live`
specifically, and falling back to a click-through if `dataExplorer` doesn't land correctly on any env.

---

## Auto-launching Data Explorer via Claude-in-Chrome

**Confirmed 2026-10-01, validated live by the user the same day.** When responding to a request to pull
Cosmos events (or any Data Explorer query) and the Claude-in-Chrome tools are available, Claude should
navigate the browser directly to the confirmed deeplink for that env (see above) rather than just telling
the user to go there themselves. This is a single `navigate` call — fast (a few seconds), not subject to
the slowness problem described below, and it reliably lands on the Data Explorer blade with the
database/container tree visible and, often, the last-used query tab still open.

**What this does and does not replace.** This is a navigation convenience only — it removes the step of
the user finding the right Cosmos account in the portal themselves. It is explicitly **not** an attempt
at full automation of typing the query, running it, and downloading results. That remains out of scope:
typing into the Monaco query editor via simulated keystrokes risks the editor's auto-closing
brackets/quotes doubling up characters (unconfirmed either way — not tested), and even if the query ran
cleanly, the "Download Query Results (JSON)" button triggers either an OS-native Save-As dialog or a
silent save to Chrome's default download folder — neither of which these browser tools can reliably drive
or read back from. Confirmed by the user from direct experience: full click-through automation of Data
Explorer's resource tree is "unreasonably slow" even where mechanically possible, so this skill
intentionally stops at the launch step.

**Response shape after launching:**
1. One line confirming the browser is open to the right account's Data Explorer.
2. The SQL query, in its own fenced code block — nothing else inside that block, so it pastes cleanly.
3. The download path, in its own fenced block directly under the query (per the *Filename discipline*
   section below) — not bundled with the query, not described in prose.
4. A short prompt asking the user to say once the file has been downloaded. **Do not ask the user to
   report back the filename** — Claude already gave them the exact path in step 3, so asking for it back
   is redundant. If the user saves under a different name or location than given, Claude's job is to look
   for whatever new file shows up in the expected folder, not to require the user to recite a filename
   Claude itself provided (confirmed user feedback, 2026-10-01).

Example:

> I've opened Data Explorer for `king-space-sharp-be-cdb` in your browser. Paste this into the query tab:
>
> ```sql
> SELECT * FROM c
> WHERE c.StreamId = "snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}"
> ORDER BY c._ts ASC
> ```
>
> Run it, then **Download Query Results (JSON)** into:
>
> ```
> {full absolute path}
> ```
>
> Tell me once it's downloaded.

**Tab lifecycle — do not auto-close.** The Claude-in-Chrome tools' own convention is for Claude to close
tabs it opened once it's "done" with them. That default does not apply here: Claude launching the tab is
only the first step of a task the *user* has to finish (paste, run, click download, pick a save
location). Leave the tab open after navigating. Only close it once the user confirms the download
happened (or says they're done with it) — closing it proactively right after the launch (confirmed as a
mistake in practice, 2026-10-01) strands the user mid-task with no visible browser state to work from.

**When multiple queries are being handed over in one message** (e.g. two services for the same
investigation), launch to the first env/account needed, present that query+path pair, and either open a
second tab for a second account or let the user navigate within the same session — don't try to
pre-navigate to multiple containers at once, since Data Explorer doesn't support deep-linking to a
specific container or query via URL parameters (confirmed — only the account-level blade is
deeplinkable).

---

## Event feeds — query by StreamId

**Every event container has a `StreamId`, and `StreamId` is the most efficient way to query it** (it's
the partition key — querying by it is a single-partition point read instead of a cross-partition fan-out).
**Always query event feeds by `StreamId`.** **Never use `CONTAINS(c.StreamId, …)` against a production
env** — it forces a full cross-partition scan. Tolerable as a one-off discovery trick; once any real
StreamId shape is known, always use partition-key equality (`c.StreamId = "…"`).

### StreamId format
```
{namespace}->{organizationId}->{aggregate-type}->{entityId}
```
**Three different conventions exist — confirm which one before constructing a query, don't assume:**
- **Dashed/short form:** `snowdrop-remittanceprocessing->{organizationId}->remittance-processing->{remittanceId}` — namespace uses dashes, aggregate-type is a short kebab-case word. Seen on remittance-processing, remittance (BE), resources, guarantors.
- **Dotted/qualified form:** `Snowdrop.Patients->{organizationId}->Snowdrop.Patients.Patient->{patientId}` — namespace and aggregate-type use dots and read like a .NET namespace path. Seen on patients, payers, charge masters.
- **Hybrid form:** dotted namespace + short aggregate word — `snowdrop.ledger.charges->{organizationId}->charge->{chargeId}` (Ledgers).

Which convention a service uses isn't predictable from its name; pull one real event/log line (or the service's `Events.md` source doc, when available) and copy its actual `StreamId` shape rather than guessing. See the *Service reference files* table above for every confirmed shape.

### Entity → database / container map

**Default pattern: one dedicated database per service**, named `snowdrop-{entity}` — NOT a single shared database (revised understanding, 2026-07-07). A plain `snowdrop` database is the **exception**, bundling several entities (charge masters, episodes, intake, invoices, and others) as containers instead of giving them each their own database. There's also a `phoenix` database, unrelated naming convention, purpose not yet investigated. Don't assume any new entity shares `snowdrop`; assume it has its own `snowdrop-{entity}` database until confirmed otherwise.

| Entity | Database | Container | Detail file |
|---|---|---|---|
| Remittance (processing) | `snowdrop-remittanceprocessing` (dedicated) | `snowdrop-remittanceprocessing-events` | `repos/snowdrop-remittance-processing-be/references/cosmos_query.md` (migrated, repo-scoped) |
| Remittance (BE) | `snowdrop-remittance` (dedicated) | `snowdrop-remittance-events` (+ `-events-manual`, `-lease`, `-data` projection) | `repos/snowdrop-remittance-be/references/cosmos_query.md` (migrated, repo-scoped) |
| Resources | `snowdrop-resources` (dedicated) | `snowdrop-resources-events` (+ `-lease`) | `repos/snowdrop-resources-be/references/cosmos_query.md` (migrated, repo-scoped) |
| Guarantors | `snowdrop-guarantors` (dedicated) | `snowdrop-guarantors-events` | `repos/snowdrop-guarantors-be/references/cosmos_query.md` (migrated, repo-scoped) |
| Patients | `snowdrop-patients` (dedicated) | `snowdrop-patients-events` (+ `-phoenix-`, `-identities`, `-subscriptions`) | `repos/snowdrop-patients-api-be/references/cosmos_query.md` (migrated, repo-scoped) |
| Payers (main + Factory) | `snowdrop-payers` (dedicated) | `snowdrop-payers-events`, `snowdrop-payers-factory-events` | `repos/snowdrop-payers-api-be/references/cosmos_query.md` (migrated, repo-scoped) |
| Charge masters | `snowdrop` (the shared exception) | `snowdrop-chargemasters-events` | `repos/snowdrop-charge-master-be/references/cosmos_query.md` (migrated, repo-scoped) |
| Ledgers | `snowdrop-ledger` (dedicated) | six `sd-*`-prefixed containers | `repos/snowdrop-ledger-be/references/cosmos_query.md` (migrated, repo-scoped) |
| Invoices | `snowdrop` (the shared exception) | `snowdrop-invoices-events` | `services/invoices.md` |
| _(others)_ | `{TODO-confirm}` | `{TODO-confirm}` | — |

**Eight dedicated databases confirmed** (`snowdrop-remittanceprocessing`, `snowdrop-remittance`, `snowdrop-resources`, `snowdrop-guarantors`, `snowdrop-patients`, `snowdrop-payers`, `snowdrop-ledger`, plus the shared `snowdrop` exception). Confirmed 2026-07-07 in Data Explorer (ninja), the shared `snowdrop` database also holds `snowdrop-episodes-events`, `snowdrop-intake-events`, `snowdrop-invoices-events`, plus non-event containers like `snowdrop-chargemasters-subscriptions`. **`snowdrop-invoices-events` now has a confirmed StreamId shape as of 2026-08-06 (UF-15723)** — see `services/invoices.md`; the entity-id resolution (claim id vs. a distinct invoice id) is still open. The rest are not yet individually mapped to a service beyond container-name sighting.

`snowdrop-activities-charges-events` is a real container (confirmed 2026-07-07) but belongs to a **non-Herbert namespace** ("Activities," a different squad). **StreamId format now confirmed 2026-08-06 (UF-15723)** — see `services/activities.md`; entity id = `ChargeId` directly, no discovery step needed (unlike Invoices). Database/container name still not fully verified against a live query. `snowdrop-guarantors` events carry real PII outside ninja — see `repos/snowdrop-guarantors-be/references/cosmos_query.md`.

---

## Universal event envelope (confirmed across services 2026-07-07)

Every event document, regardless of which service wrote it, carries the same `Metadata` envelope shape on top of its business `Data`. Confirmed identical structure on five services: `snowdrop-chargemasters` (`ChargeMasterFeesStored`), `snowdrop-remittanceprocessing` (`RemittanceClaimPaymentStatusChanged`), `snowdrop-remittance` (`RemittancePerClaimEobRemittancePdfAttachmentsUpdated`), `snowdrop-resources` (`MonthClosed`), and `snowdrop-patients` (`PatientPoliciesSnapshotted`):

```json
{
  "Data": { /* business payload, shape varies by EventType */ },
  "Metadata": {
    "EventAssemblyQualifiedType": "{Namespace}.Events.{EventType}, {Namespace}",
    "TransactionId": "{guid}",
    "SourceApplication": "{namespace}",
    "TenantId": "{organizationId}",
    "EntityId": "{entityId, matches the StreamId's entity segment}",
    "EntityTypeName": "{format varies — sometimes a qualified .NET type like 'Snowdrop.Patients.Patient', sometimes a short kebab string like 'guarantor' or 'monthly-close'}",
    "CorrelationId": "{guid}",
    "SourceMetadata": {
      "Data": "{not always empty — seen populated with context, e.g. {\"DataSource\": \"Policy Update Handler\"} on a patients event}",
      "Writer": "{optional — fully qualified class name of the internal writer, e.g. 'Snowdrop.Patients.Internal.Eventing.PatientWriter', when present}",
      "UserId": "{guid, all-zero or `daeb914f-1df3-470f-9637-0dae563aa034` = Nimbus system user, not a real person — see nimbus-system-user-id memory}"
    },
    "TraceId": "{hex}",
    "SpanId": "{hex}",
    "CallerActivityParentId": ""
  },
  "id": "{EventNumber}+{StreamId}->{namespace}",
  "EventNumber": 0,
  "Type": "e",
  "ts": "{ISO timestamp}"
}
```
Treat every field here as present-but-variable-shape rather than fixed — confirm the actual value/format on a real sample before writing logic that parses it.

**`EntityId` is not always a composite key, and when it is, the depth varies.** `snowdrop-resources`'s `monthly-close` entity uses a plain single guid. Charge master schedules use a `{parent}_{child}` composite. Payers' `FeeSchedule.Storage` entity goes a level deeper still — a `{contractId}_{?}_{feeScheduleId}` triple composite (middle segment not yet identified). Don't assume a fixed number of underscore-joined segments — split and count what's actually there.

**Why this matters for trace analysis:** `Metadata.TraceId`/`Metadata.SpanId` are the trace id of whoever **wrote** the event (the originating request), not of whatever consumer later reads it. So when Splunk logging for a consumer is missing or terse (see the `splunk-search` skill's TraceId gaps), the Cosmos event itself still carries the origin `TraceId` — useful for confirming *which* request produced a given event. `TransactionId`/`CorrelationId`/`CallerActivityParentId` are additional correlation fields available here that never make it into Splunk at all.

---

## Business payload can be a pointer, not the data (confirmed on charge masters 2026-07-07)

`ChargeMasterFeesStored`'s `Data` didn't contain the actual fees — it contained a pointer into **Blob Storage**:
```json
"Data": {
  "ChargeMasterId": "{scheduleId}",
  "FeeStoragePath": {
    "Container": "snowdrop-chargemasters",
    "DocumentPath": "Organization/{organizationId}/Schedule/{scheduleId}/Version/{versionGuid}/...",
    "Multiplier": 1
  }
}
```
Don't assume every event's `Data` is self-contained; large payloads may be blob-referenced like this one.

**Blob account naming pattern** — `king{env}feeschedulesstg` (e.g. `kingninjafeeschedulesstg`), no dashes unlike the Cosmos account pattern; canonical declaration (confirmed 2026-07-06) lives in root `CLAUDE.md`'s Blob Storage section, not restated here.

**The blob container name matches the writing service's own name — a generalizable rule, confirmed on a second service.** `snowdrop-payers`' `FeeScheduleFeesStored` event uses the identical `FeeStoragePath{Container, DocumentPath, Multiplier}` shape, but with `Container: "snowdrop-payers"` — this is the Payers-side re-projection of a charge master's fee schedule (Payers' `ChargeMastersProjectionService` consumes a charge master's events and writes its own independent stream/blob copy).

**Blob content schema confirmed 2026-07-06** (read directly from `kingninjafeeschedulesstg/snowdrop-chargemasters/Organization/{organizationId}/Schedule/{chargeMasterId}/Version/{versionGuid}.json`):
```json
{ "OrganizationId": "{organizationId}", "Source": 0, "Id": "{chargeMasterId}", "Fees": { "{feeIdentifier}": 239.93 } }
```
Simpler/flatter than the in-stream `Fees.Collection.{id}.{Amount,IsDeleted,TimeStamp}` shape — the blob only keeps `feeIdentifier: amount`. `Source` is an unresolved numeric enum (seen `0` once).

**Not every fee/attachment event uses this shape, though** — see `repos/snowdrop-payers-api-be/references/cosmos_query.md` (Factory's `GlobalFeeScheduleFeesUpdated` stores inline) and `repos/snowdrop-remittance-be/references/cosmos_query.md` (EOB attachments referenced by `AttachmentId`+`FileName` only). Confirm the actual reference shape per event type before trying to resolve it to a blob path.

---

## Generating a runnable command for the user (local)

Because the shell can't reach Azure, hand the user something to run locally. They have `az` in PowerShell and
prefer it.

**There is NO working `az cosmosdb sql query` data-plane command** — it's not in the stable CLI and the
preview one returns "query is misspelled or not recognized" (verified 2026-06-25). Don't suggest it.

**AAD/Entra data-plane auth does NOT work for these accounts (confirmed 2026-06-25):** a token minted
from the user's tenant is rejected with 401 "authority [<tid>] not trusted by this database account …
tenant(s) []" — even as a correct v2 token from their only tenant. The Cosmos account is homed in a
**different Entra tenant**. Portal Data Explorer still works because it uses the **account key**, not the
user's identity. So: **use master-key (HMAC) auth**, same as Data Explorer.

**Working path: `az` to fetch the account key, REST + master-key auth for the query.** Ready-to-run
parameterized script: `cosmos-access/scripts/Query-Remittance.ps1` (writes results to
`cosmos-access/results/`). Core of it:

```powershell
$account  = "king-{env}-sharp-be-cdb"; $host_ = "https://$account.documents.azure.com"
$streamId = "snowdrop-remittanceprocessing->{org}->remittance-processing->{remittanceId}"
$rg  = az cosmosdb list --query "[?name=='$account'].resourceGroup | [0]" -o tsv
$key = az cosmosdb keys list --name $account --resource-group $rg --type keys --query primaryMasterKey -o tsv
$date = [DateTime]::UtcNow.ToString("r"); $link = "dbs/snowdrop-remittanceprocessing/colls/snowdrop-remittanceprocessing-events"
# StringToSign: verb\n resourceType\n resourceLink\n date(lower)\n \n  (only verb/type/date lowercased)
$payload = "post`ndocs`n$link`n$($date.ToLowerInvariant())`n`n"
$h = [System.Security.Cryptography.HMACSHA256]::new([Convert]::FromBase64String($key))
$sig = [Convert]::ToBase64String($h.ComputeHash([Text.Encoding]::UTF8.GetBytes($payload)))
$headers = @{
  Authorization                = [uri]::EscapeDataString("type=master&ver=1.0&sig=$sig")
  "x-ms-date"                  = $date
  "x-ms-version"               = "2018-12-31"
  "x-ms-documentdb-isquery"    = "True"
  "x-ms-documentdb-partitionkey" = '["' + $streamId + '"]'   # LITERAL array — see gotcha below
}
$body = @{ query = "SELECT * FROM c WHERE c.StreamId = '$streamId'" } | ConvertTo-Json -Compress
(Invoke-RestMethod -Method Post -ContentType "application/query+json" `
   -Uri "$host_/dbs/snowdrop-remittanceprocessing/colls/snowdrop-remittanceprocessing-events/docs" `
   -Headers $headers -Body $body).Documents | ConvertTo-Json -Depth 25
```
- Master-key StringToSign: `verb\n resourceType\n resourceLink\n date\n \n`; lowercase verb/type/date
  only (NOT resourceLink — it's case-sensitive). HMAC-SHA256 with the base64-decoded key; URL-encode the
  whole `type=master&ver=1.0&sig={sig}` string. `x-ms-version` `2018-12-31`.
- Simplest alternative for one-offs: just paste the SQL into **Data Explorer** (it works for the user) —
  or, better, have Claude launch Data Explorer there directly (see "Auto-launching Data Explorer via
  Claude-in-Chrome" above) and hand over the query/path as pastable blocks.

### Why AAD/listKeys fail (root cause, confirmed 2026-06-25 via portal)
The Cosmos accounts are homed in a **different Entra tenant — `sharedsvs.onmicrosoft.com`** — than the org's own
`unlimitedsystems.com`. The user's access is cross-tenant/delegated, so the **portal and Data Explorer work**,
but **data-plane AAD tokens from that tenant are rejected** and **ARM `listKeys` is denied** (except ninja).
`team` subscription `247c6a4e-97b7-4df7-b9f2-3fe2b56c6bff`, RG `king-team-rg-sharp-becdb-ue`.

### Per-env access (confirmed 2026-06-25)
- **ninja:** the user has ARM `listKeys` → the key-based script works end-to-end.
- **team (and presumably all other envs):** the user does **NOT** have `Microsoft.DocumentDB/databaseAccounts/listKeys/action`
  (`AuthorizationFailed`), and AAD is rejected (different tenant). So the script can't auth there. **Use
  Data Explorer** (their portal access there is via a data-plane role, not ARM listKeys): run the StreamId
  SQL, **Download Query Results (JSON)** into `cosmos-access/results/` (fresh filename), and Claude reads
  that file to summarize — same as a script run. Don't bother running the script for non-ninja envs.

### Filename discipline for Data Explorer downloads (confirmed 2026-07-30, full-path rule added 2026-08-02)
The user's Chrome shows a **Save As dialog** when downloading query results — they have to interact with it
anyway to pick the destination folder, so they can just as easily paste a full path there too. **Always give
them the complete, concrete, ABSOLUTE path — never a bare filename and never a relative path like
`tickets/{TICKET-ID}/downloads/foo.json` or `cosmos-access/results/foo.json`.** A relative path means
nothing pasted into a Save As dialog's filename field — only a full path (or a full path they can paste in
to navigate there, then a filename) actually lands the file in the right folder. Compute the actual
current date/time (e.g. via `date` in bash) and bake it into the literal filename, then prefix it with the
real project root for *this* session — never hardcode a specific username or drive path here, the same
generalization `ticket-workflow`'s Downloads convention section makes: in Cowork, read the connected
folder's absolute path from the session's own environment info at session start; in Claude Code, use the
working directory. E.g., for a project rooted at `C:\Users\{user}\Claude\Projects\Support`, the download
path would look like
`C:\Users\{user}\Claude\Projects\Support\cosmos-access\results\cloud_remittance_134a2c2a-f73d-451f-b98a-40a6557e8a9c_20260730-095412.json`
once the real path is substituted in — something they can copy-paste as-is with zero editing. A placeholder
or a relative path they have to manually complete defeats the purpose of giving them a ready-made path at
all, and in practice they just fall back to whatever default name/location Data Explorer/Chrome suggests.
If a ticket is active (see `ticket-workflow` skill), the same rule applies to that path too: give the full
`{project-root}\tickets\{TICKET-ID}\downloads\{filename}.json` path, computed the same way, not the
shorthand `tickets/{TICKET-ID}/downloads/`.

**Failure mode actually observed, not just hypothetical (2026-08-05):** after correctly computing a real
timestamp for the first download path in a session, every subsequent download path in the *same* session
reverted to the literal string `{timestamp}` — the placeholder notation from this doc's own examples got
echoed into real messages verbatim instead of being recomputed each time. **This is a per-message
discipline, not a once-per-session one** — run `date` (or equivalent) fresh before *every* file path
handed over, even the fifth one in a row, and before sending a path, scan it for stray `{`/`}` characters
as a final check. If one is found, the path is broken — stop and compute the real value first.

**When handing the user multiple queries in the same message (e.g. one query per service, like
remittance-processing + remittance-BE for the same investigation), each query needs its own download path
presented immediately after it — not one shared path, and not the paths bundled together separately from
the queries.** The pattern that broke (confirmed 2026-08-06): two SQL queries were given back-to-back, each
in its own cut-and-paste code block as expected, but only one download path was supplied for both —
the user had no ready-made destination for the second result and had to ask for it. Every query block needs
a path block right under it, in the same message, computed with its own fresh timestamp (see the failure
mode above — don't let two paths in one message collapse to the same timestamp or placeholder). Structure
each query this way:

```sql
SELECT * FROM c WHERE c.StreamId = "..."
```

```
{project-root}\tickets\{TICKET-ID}\downloads\{env}_{service}_{entityId}_{fresh-timestamp}.json
```
(substitute the real path for *this* session's project root and ticket id — never leave either as a literal token, per root `CLAUDE.md`'s placeholder rule.)

Repeat that pair — query block, then its own path block — for every query in the message, even when
several queries target the same entity across different services. Put the path in its own fenced block
(not inline prose) for the same reason the query gets one: it's meant to be copy-pasted whole into a Save
As dialog with zero editing.

### Responding to "get events for X"
When the user asks to "get events for" an entity, **launch Data Explorer for the right account directly**
(see "Auto-launching Data Explorer via Claude-in-Chrome" above) when the Claude-in-Chrome tools are
available, then give the database/container context, the query, and the download path exactly per that
section's response shape: one line confirming the launch, the query in its own fenced block, the download
path in its own fenced block right under it, then a short prompt to say once it's downloaded — **not** a
request to report back the filename, since it was already given. Leave the browser tab open — don't
close it until the user confirms the download happened.

If Claude-in-Chrome isn't available (or the env's subscriptionId/RG pair isn't confirmed yet), fall back
to the older response shape: give the database, container, and StreamId query (see the *Entity →
database/container map* and *StreamId format* above), plus the instruction to go to Portal → Cosmos DB →
search `king-{env}-sharp-be-cdb` → **Data Explorer** themselves.

This applies the same way in every environment, including ninja — there's no special-cased response for
it here.

Keep the response itself short: the query and DB/container, nothing else padded in — the mechanics live
in the sections above; this is just the response shape.

---

## Growing this skill

Remaining `{TODO-confirm}` items, in rough priority order:
- Squad Herbert: **Plans search** mapping still unconfirmed.
- `snowdrop-charge-assemblies-be` — **a different team's service** (not Squad Herbert). The user has an `Events.md`-style source doc available for it but hasn't shared it yet (2026-07-20) — namespace/StreamId/database still `{TODO-confirm}`. Fold in via a new `services/charge-assemblies.md` when it's provided, following the same pattern as the other eight service files.
- `snowdrop-activities-charges-events` confirmed real (not a misread) but belongs to a non-Herbert namespace (likely "Activities") — map it to a service/namespace when it becomes relevant to an investigation.
- Ledger's numeric enum codes are undecoded: `Account.Type` (30, 40), `TransactionType` (600), `BatchType` (610), `ChargeStatus`/`ChargeSubStatus` (200/204).
- Other-squad entities (activities, catalogs, episodes, intake, policies, etc.) — several are known to live in the shared `snowdrop` database by container-name sighting, but not individually confirmed. Invoices was one of these until 2026-08-06 (UF-15723) — see `services/invoices.md` for what's now confirmed and what's still open (entity-id resolution, event class names).
- ~~Resource group names for all 11 envs~~ — **done, all confirmed 2026-10-02** (see the *Azure Data Explorer deeplink* table). Two suffixes exist (`-ue` on nine envs, `-cus` on `blue`/`live`); `exchange` uses the full word, not the `exch` Splunk alias; `care`'s subscription has a decoy `king-care-sharp-becdb-ue` RG (no `-rg-`) that isn't the Cosmos account's real RG.
- the `phoenix` database and the `-phoenix-` containers seen under `snowdrop-patients` — purpose unknown, two sightings, not yet investigated.
- middle segment of Payers' `FeeSchedule.Storage` triple-composite `EntityId` (`{contractId}_{?}_{feeScheduleId}`).
- exhaustive `ChargePostingFailed` error code list (only 5 codes seen so far).
- possible second system/automated account id `79e8d69d-3636-4e0a-8362-b971701869ab` (seen on `MonthClosed` and `InsuranceReservedFundPosted`) — not yet confirmed as a named account.
- Whether typing into the Monaco query editor via simulated keystrokes causes auto-closing-bracket/quote
  doubling — not yet tested. If this skill is ever extended toward typing the query in automatically (not
  just launching to the page), test this first.

**When adding a new service:** create `services/{name}.md` following the existing files' shape (database/container, StreamId format, confirmed aggregate types/gotchas, ready-to-run queries), then add one row to the *Service reference files* table and the *Entity → database / container map* table above. Don't grow this main file with per-service depth — that's what triggered the 2026-07-20 reorg.

When a query, container, or partition key proves correct twice, record it here (and consider a `reference`
memory). Don't speculate about containers that haven't been seen — follow the workspace working principle.
