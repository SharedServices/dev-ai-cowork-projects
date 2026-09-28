# Known failure: Oversized unreconciled-check backlog breaks `payer-for-remittances` (Cosmos SQL length limit)

Bug and fix both live in this repo (`snowdrop-remittanceprocessing`'s `payer-for-remittances` handler); confirming the volume driver requires a query against `snowdrop-remittance` (BE) — a cross-repo dependency, not a cross-repo bug.

**Symptom:** The Bank Reconciliation Workflow grid ("unsaved"/pending tab) fails to load for a specific org — the grid renders empty after its loading spinner, with a 500 on the underlying `POST /remittances/payer-for-remittances` call. Unlike the checkpoint-skip pattern, this isn't a silent failure — the error is loud (visible 500 in the browser) and reproducible on demand for the affected org, not intermittent. Included here because it's a confirmed system defect (the system doesn't behave safely regardless of legitimate customer data volume), not a business-logic/config case.

**Root cause:** The frontend loads the full unreconciled-check list via `GET /remittance/reconciliation/pending-checks` — **unpaginated**, one JSON array entry per pending check. For an org with a large backlog this response is tens of megabytes. The frontend then extracts every `remittanceId` from that array and sends the **entire list** in one `POST` body to `/remittances/payer-for-remittances`. On the backend (`snowdrop-remittanceprocessing`), this handler builds a Cosmos SQL query with an `IN (...)` clause over every id in the request body. Once the id count is large enough, the generated SQL text exceeds Cosmos's hard platform limit of **524,288 characters (512 KB) per query string**, and Cosmos rejects the query with `BadRequest (400)`, error code `SC3020`. The ASP.NET layer surfaces this upstream as a 500 to the browser. This is a hard platform ceiling, not a transient failure — it will keep failing on every load for that org until either the request-side batching changes or the org's backlog volume drops back under the threshold.

**Signature (Splunk):** index `sharp-app-aks-{env}-king`, namespace `snowdrop-remittanceprocessing`:
```spl
index="sharp-app-aks-{env}-king" namespace="snowdrop-remittanceprocessing" "payer-for-remittances"
```
Look for `HTTP {RequestMethod} {RequestPath} responded {StatusCode}` with `RequestPath=/remittances/payer-for-remittances` and `StatusCode=500`, paired with a `Microsoft.Azure.Cosmos.CosmosException` containing:
```
Response status code does not indicate success: BadRequest (400) ... "code":"SC3020" ...
"message":"The SQL query text exceeded the maximum limit of 524288 characters."
```
Both lines share the same `ActivityId`/`TraceIdentifier`. Filter by `Properties.OrganizationId` to confirm which org is affected and how long it's been recurring — in UF-15759 this had been firing continuously for over 24 hours before the ticket was opened, not a one-off blip.

**How to confirm for a specific org:**
1. Run the Splunk signature above scoped to the org's `OrganizationId` — confirm the `SC3020` exception is present and recurring (not a single transient hit).
2. Confirm the volume driver — **this query runs against `snowdrop-remittance` (BE)'s database, not this repo's own data**: `snowdrop-remittance` database, `snowdrop-remittance-data` container, count of unreconciled checks for the org:
   ```sql
   SELECT count(root) FROM root
   WHERE root["PostingStatus"] = 1
     AND NOT (IS_DEFINED(root["IsDiscarded"]) AND root["IsDiscarded"] = true)
     AND root["Partition"] = "RemittanceCheckGridItem/{organizationId}"
   ```
   A count in the thousands is consistent with this pattern; the exact threshold where the generated `IN` clause crosses 512 KB depends on GUID string length and query overhead, but 13,559 ids reliably triggers it. To see the accumulation profile (steady growth vs. one bad batch), group by month:
   ```sql
   SELECT SUBSTRING(root["RemittanceCheckReceivedDate"]["CurrentValue"], 0, 7) AS YearMonth, COUNT(1) AS Count
   FROM root
   WHERE root["PostingStatus"] = 1
     AND NOT (IS_DEFINED(root["IsDiscarded"]) AND root["IsDiscarded"] = true)
     AND root["Partition"] = "RemittanceCheckGridItem/{organizationId}"
   GROUP BY SUBSTRING(root["RemittanceCheckReceivedDate"]["CurrentValue"], 0, 7)
   ```
   (Cosmos rejects `ORDER BY` on the raw expression here — order by the `YearMonth` alias instead, or sort the small result set client-side.)
3. Don't use month-close status as a proxy signal for this condition — an org's unreconciled-check backlog volume is independent of month-close status.

**Fix options (not yet decided/implemented):**
1. Frontend batches its `payer-for-remittances` calls into multiple smaller requests instead of one giant id list.
2. Backend (`snowdrop-remittanceprocessing`) splits the Cosmos query into multiple smaller queries instead of one `IN` clause over the full list.
3. Backend gets payer information synced onto the remittance record itself, so the initial `pending-checks`/remittance query can return payer data directly and this second call becomes unnecessary.

Assessment: **#3 is the right long-term direction but carries the most risk and likely requires back-filling existing data** — not a quick fix. **#1 and #2 are both relatively quick** mitigations that don't require a data migration. Getting the customer to reduce their unreconciled-check backlog is a separate lever and not a substitute for making the system tolerate the volume.

**Known occurrences:**

| Ticket | Env | Org | Unreconciled count | Backlog age/profile | Status |
|---|---|---|---|---|---|
| [UF-15759](https://sharpfm.atlassian.net/browse/UF-15759) | uno | `852756eb-73b2-4c46-b0f0-c8ec4d29acde` | 13,559 (`PostingStatus=1`, not discarded) | Oldest Jan 2026; steady ~2,300–3,200/month since March 2026, none worked down; both companies under the org current on month-close (through July 2026) — ruling out month-close as the cause | Open; fix approach undecided as of 2026-08-07 |
| [UF-16405](https://sharpfm.atlassian.net/browse/UF-16405) | uno | `bc5a2cf7-d2cd-4a7b-8ed2-b8afcd12bbe2` | Not pulled (confirmed via Splunk exception directly instead) | 26 `SC3020` 500s clustered 2026-08-28T09:11–20:25Z, this specific occurrence's exception at 20:25:42Z showed `requestBodySizeInBytes: 554741` against the 524,288-char limit; user later also saw a **413** on the same endpoint for this org (2026-09-01) with nothing in the app-request logs at that time — consistent with the backlog having grown enough that the raw POST body now trips a gateway/ingress size limit before reaching the app, on top of the already-known Cosmos-side limit. 413-vs-ingress layer not yet directly confirmed in ingress logs. | Confirmed 3rd occurrence (2026-09-01); ticket workflow captured in `tickets/UF-16405/summary.md` |
