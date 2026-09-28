---
name: splunk-search
description: >
  Search Splunk logs for Unlimited Systems environments. Use this skill when asked to search Splunk,
  investigate errors, trace requests, diagnose issues, build SPL queries, download Splunk logs, or
  cache a QA org for any environment. Trigger on: "search Splunk", "check logs", "look in Splunk",
  "find errors in", "trace this request", "download splunk logs", "cache org", "cache QA org", or any
  mention of Splunk or SPL queries. Invoke automatically when the user references an environment name
  (ninja, team, one, exch, cloud, app, care, space, uno) combined with log, error, exception, or trace
  signals.
---

# Splunk Search Skill

Use this skill when asked to search Splunk, investigate errors, trace requests, diagnose issues, download logs, or cache a QA org in any environment.

## Access

- **Splunk Cloud:** https://unlimitedsystems.splunkcloud.com/ — accessed via the Claude in Chrome connector (the user is usually already authenticated in Browser 1).
- **Index pattern:** `sharp-app-aks-{env}-king` (e.g. `sharp-app-aks-ninja-king`) — Splunk-specific instantiation of root `CLAUDE.md`'s env/naming conventions; see its `## Environments` table for the canonical env list and prod-tier grouping rule, don't restate it here.
- **Nav entries `alpha`/`beta`/`black` are not current environments.** `alpha` and `beta` were never real environments. `black` did exist at one point but has since been decommissioned — don't query against it; if old data under it is ever needed, treat it as a historical/archived index, not a live one. None of the three belong in CLAUDE.md's canonical env table.
- **Confirmed exception — exchange/exch (2026-09-21, UF-16886):** the nav/URL name is **exchange** (e.g. `sd.unlimitedfinancials.exchange`), but the Splunk **index name uses the alias `exch`, not `exchange`** — `sharp-app-aks-exch-king`. `sharp-app-aks-exchange-king` silently returns **zero events for everything, not an error** — no job failure, no warning, just an empty result set — so this is easy to mistake for "no errors found" instead of "wrong index." Always use `exch` for this environment's index; `exchange` is only the display/nav/URL name. Don't assume any other env's nav name is index-safe without checking — this one wasn't.
- **Service → namespace mapping:** see `references/namespaces.md` directly. Read it fresh — values are added as confirmed.

### Running a search via Chrome (fast path)
Build the search URL directly rather than typing in the UI:
```
https://unlimitedsystems.splunkcloud.com/en-US/app/search/search?q=search%20<URL-encoded SPL>&earliest=-30d&latest=now
```
Then wait ~12s for the job to complete before reading results.

For queries that touch only a few fields, run in **Fast mode** (`adhoc_search_level=fast`) — skipping full field discovery is a free speed-up with identical results.

---

## Field conventions (confirmed)

- `namespace="{value}"` — NOT `kubernetes.namespace_name`.
- `container_name` — NOT `kubernetes.container_name`.
- `Level` with capitalized values: `Information` / `Warning` / `Error` — NOT `log_level=ERROR`.
- Business keys live under `Properties.<Key>` (e.g. `Properties.CompanyId`, `Properties.OrganizationId`). Tenant: `Properties.metadata.TenantId`. Entity: `Properties.metadata.EntityId`.
- `Properties.Application` usually equals the `namespace` value — **but not always.** Confirmed exception: Patients API logs with `namespace="snowdrop-patients-api-be"` but `Properties.Application="snowdrop-patients-api"`. When scoping by service, check both. (See `references/namespaces.md`.)
- **Trace id lives in THREE places — never filter on top-level `TraceId` alone** (that silently drops consumer/background logs and unconverted services). Top-level `TraceId`/`SpanId` are injected by the Instana APM agent on HTTP-request logs only. Always OR all three (see trace pattern below).
- For a **cross-service** flow, do NOT filter by `namespace` — that's the point, to see the hops. Filter by namespace only when scoping to one solution.

### Log shape (Serilog CLEF JSON in `_raw`)
- The human-readable message is **`MessageTemplate`**, NOT `message`. A `| table ... message` column comes back EMPTY.
- Structured context lives in `Properties{}` (e.g. `SourceContext`, `Action`, `OrganizationId`, `CompanyId`, `Elapsed`, `RequestPath`, `RequestId`).
- To get message text, use `MessageTemplate` or parse `_raw`.

---

## Extracting results reliably (key gotcha)

When reading results back through the Chrome connector:

- `get_page_text` returns an SPL2 help article, NOT the results — useless here.
- `read_page` accessibility tree and DOM table cells are **visually truncated** by Splunk — long `_raw` values get cut off.
- **WORKING METHOD:** after the search runs, grab the `sid` from the page URL and fetch full JSON results from the page context with `javascript_tool`:
  ```js
  await (async()=>{const sid="<sid>";const r=await fetch(`/en-US/splunkd/__raw/services/search/jobs/${sid}/results?output_mode=json&count=0`,{headers:{'X-Requested-With':'XMLHttpRequest'}});const j=await r.json();window.__ev=j.results.map(x=>JSON.parse(x._raw));return window.__ev.length;})()
  ```
  `javascript_tool` has REPL semantics: the result of the last expression is returned, and top-level `await` works (confirmed 2026-10-01). An async IIFE that is not itself awaited returns `{}` (an unresolved promise), so use top-level `await` or `await (async()=>{...})()`. Then return small slices/fields (the tool display itself truncates long strings), e.g. map to `MessageTemplate`, `Level`, `SpanId`, `Properties.SourceContext`.

### Content-filter gotcha
Returning `_raw` or fully-rendered messages can trip a `[BLOCKED: Cookie/query string data]` filter — caused by ASP.NET request-logging templates containing `{QueryString}`/`{Path}`/header-like content. **Workaround:** never dump `_raw` or rendered request lines; return the bare `MessageTemplate` plus a curated allow-list of `Properties` keys (e.g. EventType, FAN, PatientId, GuarantorId, OrganizationId, Action, Elapsed, StatusCode, SourceContext).

---

## Investigation strategy

1. **Start broad** — run a count/summary query first to understand the shape before drilling into raw logs.
2. **Default time window:** `-1h` unless the user specifies otherwise (or the specific pattern below says otherwise).
3. **Default output:** raw logs (no `| table`/`| stats`/transforms) unless the user explicitly asks for a table or summary.
4. **Drill down** — narrow by `container_name`, time range, or specific error strings once you have a signal.
5. **Show GUIDs in full** — never abbreviate ids/TraceIds/etc. when reporting to the user. Canonical rule lives in root `CLAUDE.md`'s `## Language` section.

### Reading success
Treat a `RequestLoggingFilter` "Handled {Action} in {Elapsed}" log line as evidence the request completed successfully, and present it plainly as a successful completion. Do NOT add caveats about a missing status code or note that success is "inferred" — a clean "Handled" line with no error/warning entries reliably indicates success for Snowdrop services.

---

## SPL query patterns

### Error summary for a namespace
```spl
index="sharp-app-aks-{env}-king" namespace="{namespace}" (Level=Error OR Level=Warning OR "Exception")
| stats count by Level, container_name
| sort -count
```

### Recent exceptions
```spl
index="sharp-app-aks-{env}-king" namespace="{namespace}" ("Exception" OR "Unhandled")
| table _time, container_name, MessageTemplate
| sort -_time
```

### Pod restarts / crash signals
Crash/lifecycle signals (`OOMKilled`, `CrashLoopBackOff`, `terminated`) are kubelet/container-runtime events, **not** Serilog CLEF app logs — they often have **no `MessageTemplate` field**, so tabling `MessageTemplate` here returns blanks (same trap as `message`). Coalesce to whatever field carries the text:
```spl
index="sharp-app-aks-{env}-king" namespace="{namespace}" ("terminated" OR "OOMKilled" OR "CrashLoopBackOff" OR "BackOff")
| eval msg=coalesce(MessageTemplate, message, _raw)
| table _time, container_name, msg
| sort -_time
```
(Verify the actual field on a live hit; `_raw` is the reliable fallback for infra log lines.)

### Activity-tracing adherence by environment
TraceId/SpanId instrumentation is being rolled out **namespace-by-namespace and environment-by-environment**, not uniformly. Full rollout mechanics (order, timing) are in `references/namespaces.md` under "Activity-tracing (TraceId) rollout" — the short version: new coverage lands in **cloud first, then everywhere else about a week later**, and once a namespace+env is confirmed to carry trace ids, treat that as permanent (it won't regress).

- **ninja and team** currently have the fullest implementation, covering many Squad Herbert namespaces — but **`snowdrop-ledger` is not included even in these two envs** (see the confirmed gap below).
- **No other environment is currently confirmed** — one, exchange/exch, cloud, app, care, space, uno. Confirmed absent in `space` as of 2026-07-06/07 (a charge-masters fee-import's `TraceId` stayed entirely inside `snowdrop-charge-masters`, never reaching Payers or Ledger). This is a snapshot, not a permanent gap — rollout is ongoing.
- **Always start every investigation with the cross-service `TraceId` pattern below, in every environment — never skip straight to business-key search.** This is how newly-rolled-out coverage gets noticed as it lands, rather than assumed absent forever based on this snapshot. If the TraceId search comes back empty, that's your signal to fall back to the business-key "Entity activity trace" procedure (and to update the adherence notes here / in `references/namespaces.md` once a new namespace+env is confirmed one way or the other).

### Trace a request across services (3 trace fields — REQUIRED)
```spl
index="sharp-app-aks-*-king" (TraceId="{id}" OR Properties.TraceId="{id}" OR Properties.metadata.TraceId="{id}")
| eval Span=coalesce(SpanId,'Properties.SpanId','Properties.metadata.SpanId')
| table _time, namespace, container_name, Span, MessageTemplate
| sort _time
```
Do NOT scope by `namespace` for a cross-service trace. For fan-out/fan-in, also follow `Properties.LinkedTraceIds`. Canonical end-to-end workflow: `references/cowork-flow-analysis.md` (living doc — re-read when doing flow analysis).

### Entity activity trace (business keys, no TraceId — e.g. "trace activity for schedule/contract/charge master X")
The user will often ask to "trace activity" for a business entity (schedule id, contract id, charge master id, org id) with no TraceId given. This is NOT the cross-service trace pattern above — there's no single execution to follow, so the goal is the entity's full history, not one request's path. Say so explicitly when presenting results ("this is the entity's history across N days, not a single request trace").

**Do NOT OR multiple business-key ids together and report aggregate stats from that.** The same GUID pattern gets reused for unrelated fields across services (a "contract" id in one message can be a `CompanyId` in another and something unrelated in a third), so OR'ing ids inflates results with cross-contamination — counts that look like they're about entity A are often actually about a sibling entity B that merely shares a parent with A. This is the same failure mode as the FAN gotcha below, generalized to any business key.

Correct procedure:
1. **One id at a time.** Never combine multiple entity ids with OR for a stats/count query.
2. **Summary before raw.** Run `| stats count earliest(_time) as first latest(_time) as last by namespace, MessageTemplate` first, scoped to the known-relevant namespaces (check `references/namespaces.md`) rather than the whole index — an unscoped 30d scan on a production index can run 90s+ and still return noise.
3. **Verify before trusting a count.** Before reporting any aggregate number, pull one raw sample from that MessageTemplate group and confirm the searched id actually appears in the field the message implies (e.g. confirm it's really `Properties.ChargeMasterId` and not just present somewhere else in the same log line). If it's not, that message group isn't part of this entity's history — drop it.
4. **Then narrow per id.** Only after each id has been searched and verified separately should you assemble the combined timeline (e.g. schedule created → linked to parent → propagated downstream → matched/not matched against charges).

### Bridging a TraceId trace into a service that doesn't propagate it
Even in ninja/team, a `TraceId` trace (pattern above) goes cold at Ledger (see adherence note above) even though you know it acted. Don't conclude "it wasn't processed"; switch to a business-key search **scoped to that one service/namespace** to pick the activity back up, then splice it into the timeline by timestamp proximity to the last known trace hop (not by TraceId, since there isn't one).

- **Confirmed gap:** `snowdrop-ledger`'s charge-master event consumers — `Snowdrop.Ledger.Services.ChargeMasters.ChargeMastersEventProcessorV2`, `.Handlers.CompaniesEventHandlers`, `.Handlers.FeesEventHandlers` — log with **no `TraceId`/`SpanId` at all** when reacting to a charge-master event off the bus, in every environment (including ninja/team where the rest of the flow is instrumented). Add other confirmed gaps here as they're found (service/handler name + what's missing).
- **Use the composite entity key when the domain has one.** For event-sourced streams, prefer searching the full `StreamId`/`EntityId` composite (e.g. `{ChargeMasterId}_{ScheduleId}` under `snowdrop.chargemasters`) over OR'ing the raw ids separately — it's a single unambiguous string, so it skips the per-id verification step in the entity-trace procedure above and won't cross-contaminate.
- **A shared business key does NOT mean same activity.** A later log line matching the same business key can belong to a completely different execution — confirm via its own `TraceId` (or explicit sequence correlation like matching `EventId`/`EventNumber`) before folding it into the timeline. Confirmed example: a charge master's `FeeFinder` "Charge matches charge master" line, seconds after creation, referenced the same `ChargeMasterId` but carried a different, unrelated `TraceId` — it belongs to the separate charge-evaluation request, not the creation flow.
- A consumer may only react to specific event types in a stream — don't assume every event number in a stream produces a log line in every downstream service. (Ledger only logged handling `ChargeMasterFeesImported` / event 0; it never separately logged `ChargeMasterFeesStored` / event 1.)

### Request latency / slow calls
```spl
index="sharp-app-aks-{env}-king" namespace="{namespace}" Properties.Elapsed=*
| stats avg(Properties.Elapsed) as avg_ms, max(Properties.Elapsed) as max_ms, count by container_name
| sort -avg_ms
```

### Cross-environment error comparison
```spl
index="sharp-app-aks-*-king" namespace="{namespace}" Level=Error
| rex field=index "sharp-app-aks-(?<env>[^-]+)-king"
| stats count by env
| sort -count
```

### FAN → guarantor lookup
Do NOT full-text search the raw FAN number — that produces coincidental false hits (e.g. digits matching a microsecond timestamp). The FAN is minted by **Patients API** (a guarantor is modeled as a patient record).

1. Locate the `CreatePatientGuarantorAsync` call for that FAN (the FAN-assignment / "Created guarantor" line; marker: "Attempt to assign next FAN for patient {PatientId}… resulted with FAN: {FAN}", field `Properties.FAN`).
2. Read the **`GuarantorId`** off it.
3. Filter all further messages by that `GuarantorId`.

If the FAN can't be resolved to a `CreatePatientGuarantorAsync` call, the guarantor doesn't exist in that env — say so rather than inferring from stray text matches.

---

## Downloading Splunk logs

When the user asks "how do I download splunk logs" (or for a bulk/whole-org pull that can't stream back through automation), give these steps:

1. **Run a bare event search** — no transforms (`stats`/`table`/`timechart`); raw events keep every field + full `_raw`. E.g. `index="sharp-app-aks-ninja-king" Properties.OrganizationId="<org>"` (optionally `| sort _time`).
2. **Time range:** set the picker to **All time**, or a window that actually covers the activity. (An empty export = the range missed the data — it writes just an 83-byte header.)
3. **Search mode: Verbose**; **Event Sampling: No Event Sampling.**
4. **Export button** (not the on-screen results) → **Format: JSON** → **Number of Results:** a number **larger than the event count** (e.g. 10000). The dialog rejects `0`/"unlimited" — that only works on the REST endpoint (`count=0`).
5. **Save into the project's `splunk-downloads/` folder.**
6. **CRITICAL — use a FRESH filename every time.** Never re-export onto an existing filename: the VM's virtiofs pins the first-seen file size, so a reused name reads stale (an 83-byte read of a 2.2 MB file). Splunk's sid-based auto-names are naturally fresh — just don't overwrite.
7. Tell me the filename; I read + process it entirely in bash (no volume through context) and can build an `org-cache` file from it.

Why download vs live query: large/whole-org pulls can't stream back through the automation channel (script-return truncates ~1 KB/call), so a file export is the right tool for bulk.

---

## Caching a QA org

When the user says **"cache org <id>"**: pull the ENTIRE org's messages into a file, then answer all later questions about that org from the file — do NOT re-query Splunk.

- **"cache QA org <xyz>" shorthand:** the `00000000-0000-` prefix is fixed for QA orgs, so "cache QA org 4039-5141-94427f8c3ed9" ≡ "cache org 00000000-0000-4039-5141-94427f8c3ed9". (Same expansion when the user names a QA org by its short suffix in any request.)
- **QA-only guardrail:** caching is ONLY valid for QA orgs (orgId starts `00000000-0000-` — canonical rule in root `CLAUDE.md`'s `## Environments` section). If asked to cache an org whose id does NOT start `00000000-0000-`, do NOT cache — push back first, explaining that non-QA orgs are live, may keep changing, and may be too large, so a cache would go stale or be incomplete. Only proceed if the user explicitly confirms after the pushback.
- **Why:** QA orgs are one-time (populated, tested, abandoned) and small, so the cache is complete and immutable. This avoids repeated live queries and sidesteps the content-filter block and result-table truncation, since the data is processed locally.

**How to apply:**
- Fetch: bare event search `index="sharp-app-aks-{env}-king" Properties.OrganizationId="<id>"` over **all time** (env = current scope, default ninja); pull the full result set with `_raw` via the REST `sid` endpoint; write to `org-cache/{env}_{orgId}.json` (NDJSON, one event per line). Use a file *I* write (host-downloaded files hit virtiofs cache-lag).
- Confirm with event count + time span after caching.
- After caching, questions naming that org id (or clearly about it) → read the cached file and answer locally; never re-query. No auto-refresh — QA orgs don't change.
- Only re-pull on explicit **"recache org <id>"** (or for non-QA orgs after confirmation).
- If a question gives a FAN/guarantor but no org and the org isn't determinable, ask or fall back to a live query rather than guessing.

---


## Growing this skill

When a new SPL pattern or gotcha proves useful twice, add it here. Follow the pattern: name, a one-line description if non-obvious, then the query block.
