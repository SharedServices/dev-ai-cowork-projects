---
name: instana-query
description: Look up Kubernetes/APM data in IBM Instana for Unlimited Systems environments — namespace/deployment/pod health, CPU, memory, and pod-restart signals. Use when asked to check Instana, look at a deployment's memory/CPU chart, check pod health/restarts, or correlate an incident against Instana metrics. Trigger on "check instana", "look in instana", "instana metrics", a pasted `*.instana.io` URL, or a request to check memory/CPU/health for a named deployment or namespace. Access is browser-only via Claude for Chrome — there is no working Instana MCP/API path from the sandbox.
---

# Instana Query

Use this skill whenever the user wants Kubernetes health, CPU, memory, pod, or deployment data from
IBM Instana for a Unlimited Systems environment.

> **Status:** access method confirmed 2026-08-03. All 15 Kubernetes clusters in the tenant enumerated and
> their `clusterId`s recorded — see "Clusters" below, this is now a direct lookup instead of a search
> each time. All 9 Squad Herbert namespaces mapped across the 7 production clusters (56 IDs, one service
> — Plans Search — confirmed absent) — see "Namespaces" below. Deployment-level IDs are still not
> pre-scanned (830 namespaces tenant-wide — too many to usefully hardcode); a small "Known deployment IDs"
> cache grows opportunistically instead. Custom time-range selection and one OOM/restart correlation
> example are also confirmed below. **This skill now auto-updates** — see "Growing this skill": any new
> cluster/namespace/deployment ID resolved in a future investigation gets folded in automatically, same
> turn. **Known weak point:** deployment-level multi-environment lookups are still slow via individual
> clicks; the DOM-link-extraction technique (Access step 7) fixes this for *bulk* lookups but a single
> new deployment in a new env still needs the full click-and-wait cycle once.

---

## Access

**Browser-only, via Claude for Chrome. There is no MCP connector and no reachable API from the sandbox**
(same constraint class as Splunk — see `splunk-search` skill). Everything here rides the user's own
authenticated Instana session in their connected Chrome browser:

1. Confirm a browser is connected: `mcp__claude-in-chrome__list_connected_browsers`.
2. Navigate with `mcp__claude-in-chrome__navigate`.
3. Read the page with `mcp__claude-in-chrome__get_page_text` for text/table content (nav labels, tab
   names, numeric summary cards, table rows resolve fine this way).
4. For anything visual — line charts (CPU/memory/pods over time), health indicators rendered as
   colored dots/icons — fall back to `mcp__claude-in-chrome__computer` with `action: "screenshot"` and
   read it visually. There is no fast text/JSON extraction path for chart data the way Splunk's `sid`
   endpoint gives a clean result payload — Instana's dashboard is a heavily client-rendered SPA.
5. **Pages take a few seconds to hydrate from skeleton-loading placeholders to real content.** Always
   `wait` (2-3s) before taking a screenshot or trying to read page text right after a `navigate` or
   click — the first screenshot after navigation is very likely to show gray skeleton boxes, not data.
6. Batch clicks/waits/screenshots into a single `browser_batch` call where possible — Instana navigation
   is otherwise slow (confirmed 2026-08-03, same class of problem as the Cosmos Data Explorer portal
   navigation noted in `cosmos-query`).
7. **For bulk ID collection, extract links from the DOM instead of clicking rows one at a time** —
   confirmed 2026-08-03 doing a 56-row namespace scan. `mcp__claude-in-chrome__read_page` (with
   `filter: "interactive"`) returns every link's actual `href` on the page, including the opaque
   `namespaceId`/`deploymentId` embedded in it — no click, no per-row page load, no hydration wait
   needed. The global search list (`#/kubernetes/namespaces;query={name}` — see "Namespaces" below) is
   **virtualized**: only the rows currently scrolled into view exist in the DOM, so `read_page` only
   returns links for on-screen rows. Pair every `scroll` with a `read_page` call to walk through all
   matches, and cross-check the row order against `get_page_text`'s visible cluster-name labels (both
   calls return items in the same top-to-bottom order) so you know which `namespaceId` belongs to which
   cluster. This is dramatically faster than the click-and-wait-for-hydration approach used earlier —
   reserve individual clicks for when you only need one specific resource, not a batch.

## Base URL

**Confirmed tenant host:** `https://unlmtdsys-unlmtdsys.instana.io`

This is a **single Instana tenant covering all environments** — it is not a per-environment subdomain
like the `sdsh.unlimitedfinancials.{env}` or `king-{env}-sharp-be-cdb` patterns used elsewhere in this
workspace. **Do not expect the user to hand you a different base host per environment** — that part is a
constant. What differs per environment is which **Kubernetes cluster/namespace** you navigate to inside
that one tenant.

Confirmed navigation hierarchy (breadcrumb-based): `Kubernetes > {cluster} > {namespace} > {deployment}`.

## Clusters

**Confirmed 2026-08-03** via the Kubernetes landing page → **Clusters** tab (`#/kubernetes/clusters`) —
15 clusters total in this tenant. Every environment in this workspace's standard env table maps to a
`king-{env}` cluster, confirming the naming convention carries over from Cosmos/Splunk/blob storage.
**Skip the search step and jump straight to a cluster's summary** with:
```
https://unlmtdsys-unlmtdsys.instana.io/#/kubernetes/cluster;clusterId={clusterId}/summary
```

| env | cluster name (as shown in Instana) | clusterId |
|---|---|---|
| ninja | `king-ninja-v3` | `71RDpOYnYpZmY3gE-sXQ0B5zHZg` |
| team | `king-team` | `MX_GUOqnIwP5V7ybI8jiYB9NSEQ` |
| one | `king-one` | `D_vh5sNQIJji9DWCfA79pWiXlUU` |
| exchange (exch) | `king-exchange` | `iMfr4OQ7Xl_XDZ3QYhp_GrT6kTw` |
| app | `king-app` | `Sjft0nlTlzhMfOjzskL06XN4-8M` |
| cloud | `king-cloud` | `x4EBjTM99j2RvIMdFwjlG3BEyk0` |
| care | `king-care-v3` | `616h6EjRLgdTiqo7jZlW_jUklig` |
| space | `king-space` | `spGw_TvGwno1toKtXL-rx2J36Lg` |
| uno | `king-uno` | `Hov-F2vFVXxuOLBMsWkt5n-jvHs` |
| blue | `king-blue-v2` | `e7ax_76Io5AmDuCIYTI4BBzBFNc` |
| live | `king-live-v2` | `Z3ZNUqmgbCwA0ttsw7U28utmqPA` |

Note the `-v2`/`-v3` suffixes on `ninja`, `care`, `blue`, `live` — there was only ever one cluster per env
at scan time (no duplicate unsuffixed `king-ninja` etc. alongside it), so this looks like a cluster
generation/rebuild label baked into the current name rather than two live clusters to choose between.
Don't assume the suffix is stable long-term — if a cluster search by `king-{env}` ever returns zero or
multiple results, re-scan the Clusters tab rather than trusting this table blindly.

**Four more clusters exist that don't fit the `king-{env}` pattern** — purpose not yet confirmed, likely a
different product/team (name `air`, plus a shared `utilities` cluster):

| cluster name | clusterId |
|---|---|
| `air-cloud` | `GS4qfGIylvREtWN0lmW0d6wWms4` |
| `air-ninja` | `XBBOM7YWsUVZNchQjwxJhT3vl5g` |
| `air-team` | `XtMXPxgqs0RBGOKUZv5qBi9Soug` |
| `utilities` | `_t6YczL5301sQaXgC_8cuOfS4sk` |

## Namespaces (Squad Herbert, production — confirmed 2026-08-03)

Full `namespaceId` scan of all 9 Squad Herbert namespaces (per `references/namespaces.md`) across the 7
production clusters, done via the global namespace search + DOM-link-extraction technique above (see
Access step 7). **Direct link once you have a row:**
```
https://unlmtdsys-unlmtdsys.instana.io/#/kubernetes/namespace;namespaceId={namespaceId}/summary
```

| namespace | app | cloud | care | space | uno | blue | live |
|---|---|---|---|---|---|---|---|
| `snowdrop-remittanceprocessing` | `DnKpvgJ9B8MOSKV5GNkm_rXEtQQ` | `N8Fpx5_7jYJMRV6zM20adcuBVQA` | `rqwm3gF3apk0JoPQ76Q00_hFPPs` | `EE4b6_fxwN5oy6YF7dRBDftX0Hw` | `adcW1AAJb7JeVNpSd6124emY_8E` | `KPZJbMegP0l5uKoUvl0tUvdWLsI` | `JQ4ZTqgLAetAqDPEM5FmJaSJ3Xc` |
| `snowdrop-remittance` | `GL_DuC-m4PmMWbPI6bsj-M-SDis` | `6VS5bx3rBmn2c2X6UvDu0A6RAjM` | `nrWTC7wNjqj6Ptqp4Tnc5g9IZLY` | `nUV7rNrxXt1WPiGUrbfuhiYsnS0` | `e3dEj11W1AcZ8qRQUFlF74tVol4` | `bHOlQ-6uHDqrCCpuva3WpPEzYhQ` | `-0qJB-AVTRNC6f5wwC9rxVbcDxo` |
| `snowdrop-payers` | `v2Rjqa_yFoNTAQBZxRBlnkXW2ps` | `uPCdLpnF_SZBxNienilSFs0chfM` | `w2nLChz8J0jfykCsqQFUPwmsPaQ` | `gSMKGF75Weuec0QCxvad5zaoukk` | `FRRCICh76R5Gg59c6gh3b4Cmk6k` | `MKmyuP3lUdOekWCXV6kh053HOkE` | `EOspLRkQliYXI7tPDy4BWpGVYME` |
| `snowdrop-patients-api-be` | `sQtFAZdT8VjUegkcOTT1lZ6E3z0` | `CLYBL7rvAjWuRJD1f-SWC-Y9LKg` | `Kz55DWkZ4XOtgMqBrheatwIQIsk` | `OIZjfrMrskN9N2wWDN5cIDes4gA` | `l6Rvd6YcxRvjfDXiTnV5Xx4YH4U` | `us9jKqpLnLbTz1KQoN9bFGc8rY8` | `B4SySY5-77uQR8LJOMLRVV3yVK8` |
| `snowdrop-charge-masters` | `YH6f7QDYf1lv8gd8PLN7Py2_1So` | `zBDo5sThtclo5sOkNT4TPtYmlCc` | `Lum-tyo0wFXNLSTKRM7Tt7nQZ3k` | `ytXWQ6bDmWzHEbTUt365IkaK0No` | `OTYUoWTLvNL67ZTXINrt51W8Ycs` | `Ds11w7Js83HodrgONc-bv6UaT5w` | `UhmTUia7GqzBMBEbWm7Uj6UPkDs` |
| `snowdrop-resources` | `bUsmTxWqdjW5KU7AJvRmnZhVV0Q` | `6JswGGh-yCroWpvwK04Pnn-MCvs` | `56pfUMWchUe-JiHC56uJJPHch4A` | `fZ071VBVH-xgU1vj1EeqMtZfEuM` | `A14nbkmL0ciezFJ6HTT0psq5iNI` | `12eE6CP4a4o5JAtZ0sPMUVAsyro` | `MsCNv6chG0mUirLr8TBJJE4duVs` |
| `snowdrop-guarantors` | `fiU-rxrkWOrYx6_EKXGoiC7nCSo` | `lko_s3CySDmw9KnWIN7VWno1OZI` | `oh5QtgUK-fyvIUS5ru-H_EfnL2M` | `IyhP5ZEVgQtD6gqRTDqFtkRblPo` | `pYQsSw8P9GnUfjFxeaZmScLZrqQ` | `EuFImfMo4Ik5yoG0vl_tjkrftbU` | `473u_i8gc7O9IOvIdLrSAn7If68` |
| `snowdrop-ledger` | `THKzbdLVqc3xs_Cj5fgw0JR9ruI` | `kLbrg9doUbUzh8uU3KR8QQ_0MQg` | `QcS42w7YA3uAm9K4kVSCvKNsBpI` | `s5RPgF9KH98BO5dL8NQfHFPzqrc` | `HRDJvmOhc4Qj2zyRDw7NCfeGLPM` | `cKaOI1yU689d_uUO9S3qkAbbqpM` | `1F-ytJa8jA8ZIL2qn8nhdyQcOq0` |

**`snowdrop-plans-search` does not exist as a namespace anywhere in the tenant** (searched both the exact
name and the substring `plans` tenant-wide — zero matches in any of the 15 clusters, not just the 7 prod
ones). This lines up with `cosmos-query`'s own note that Plans Search's mapping is still unconfirmed —
either the service isn't deployed under that name, runs inside another squad's namespace, or hasn't
shipped yet. Don't guess an ID for it; ask the user or re-check `references/namespaces.md` before assuming
it should be here.

Non-prod clusters (`ninja`, `team`, `one`, `exchange`) were seen during this scan too but their IDs
weren't recorded — pull them the same way (global namespace search + DOM extraction) if a non-prod
lookup is ever needed.

## Resource IDs below cluster level are opaque — search, don't guess

Deep links to a specific namespace/deployment/pod embed **Instana-internal opaque IDs** in the URL hash,
e.g.:
```
#/kubernetes/namespace;namespaceId=GL_DuC-m4PmMWbPI6bsj-M-SDis/summary...
#/kubernetes/deployment;deploymentId=58D2q02lCnVIZtjOZO1MQWD1SgM/summary...
```
`namespaceId` / `deploymentId` are **not derivable from an environment or service name by substitution or
any known pattern** — they're per-resource Instana identifiers with no naming relationship to the
`king-{env}` / `snowdrop-{service}` conventions used elsewhere. **This confirms the user's expectation is
half right:** you don't need a different *base URL* per environment (the host is constant), but you do
need either (a) a full deeplink the user copies out of their own browser navigation, or (b) to navigate there
yourself starting from the Kubernetes landing page and searching/filtering by name — the UI supports
free-text search (see the `deployment.query` param below), so a fresh resource can usually be found
without needing its ID handed to you.

**Practical default:** navigate to `https://unlmtdsys-unlmtdsys.instana.io/#/kubernetes` (or a known
namespace-level page), click into the **Deployments** (or **Pods** / **K8s Services**) tab, and use the
search box — the URL exposes this as a `deployment.query={substring}` parameter, e.g. `remitt` matched
all `snowdrop-remittance-*` deployments in one list. Click the desired row rather than trying to construct
its URL directly.

## Confirmed example (2026-08-03, env: app / production)

Full URL the user supplied, landing on the `snowdrop-remittance` namespace summary filtered to deployments
matching "remitt":
```
https://unlmtdsys-unlmtdsys.instana.io/#/kubernetes/namespace;namespaceId=GL_DuC-m4PmMWbPI6bsj-M-SDis/summary;podTab=podTab;memoryTab=memoryTab;cpuTab=cpuTab?deployment.orderBy=health&deployment.orderDirection=DESC&deployment.page=1&deployment.pageSize=20&deployment.pageSizes=!20~40~60~80~100~&deployment.query=remitt&deployment.disabledColumns=!~&deployment.enabledColumns=!~
```
Breadcrumb resolved to: `Kubernetes > king-app > snowdrop-remittance`. Six deployments matched the
`remitt` filter: `snowdrop-remittance-erainboundservice`, `-services`, `-api`, `-services-eob`,
`-unlimitedapi-reconcileremittance`, `-catalogs-projector`.

Clicking `snowdrop-remittance-api` landed on:
```
https://unlmtdsys-unlmtdsys.instana.io/#/kubernetes/deployment;deploymentId=58D2q02lCnVIZtjOZO1MQWD1SgM/summary;pendingTab=pendingTab;replicasTab=replicasTab;podTab=podTab;memTab=memTab;cpuTab=cpuTab?...
```
Deployment summary tabs available: Summary, Details, Events, Conditions, K8s Services, Pods. Summary tab
shows CPU/Memory requests & limits, live CPU/Memory/Pods usage-over-time charts, and a Logs panel
(Error/Warn/Info/Fatal/None severity legend) below the charts.

## Known deployment IDs (grow this opportunistically)

`deploymentId` is opaque and per-cluster (the same logical deployment, e.g. `snowdrop-remittance-api`,
has a **different** `deploymentId` in every cluster/env — it is not the same value reused across envs).
With 830 namespaces tenant-wide there is no practical way to pre-scan every deployment the way the
clusters were enumerated, so **don't try to front-load this list**. Instead, every time an investigation
resolves a `deploymentId` via search, record it here so the next investigation into the same
deployment+env skips straight to the deeplink instead of re-searching. Format:

| deployment | env | cluster | deploymentId |
|---|---|---|---|
| `snowdrop-remittance-api` | app | `king-app` | `58D2q02lCnVIZtjOZO1MQWD1SgM` |

Direct link once you have a row: `.../kubernetes/deployment;deploymentId={id}/summary`.

**Reality check from actually trying to do a 5-environment stats pull (2026-08-03):** even with the
cluster IDs pre-recorded, resolving a `deploymentId` in a *new* env still requires the full navigate →
search → click → wait-for-hydration cycle per environment, and Instana's page hydration was slow and
sometimes stalled outright that session. Doing this for more than 2-3 environments in one go via browser
automation is going to feel slow and may not be worth it — **if a request spans several environments and
this table doesn't already have the deploymentIds cached, say so up front and ask the user whether they'd
rather navigate/paste the values themself** (same "Chrome-driven exploration preference" tradeoff noted in
`cosmos-query` for Data Explorer) rather than silently grinding through five slow round-trips.

## Changing the time range

**Confirmed 2026-08-03.** Click the time-range control top-right (shows something like `Aug 03` /
`Last hour` next to the `Live` toggle) to open a panel with **Presets** (Last hour, Last 6 hours, Last 24
hours, Yesterday, etc.) and a manual **Time range** section below it with From/To date and time fields.

To set a custom historical window:
1. Click the pill button (e.g. `Aug 03 / Last hour`) to open the panel.
2. Click the **From** date field — a calendar opens; click the target day.
3. Click the **From** time field (shows e.g. `07:42` with a dropdown chevron) — typing into it does
   **not** work (confirmed — text entry is silently ignored), it's a scrollable 15-minute-increment list.
   Click the chevron to open it, then `scroll` up/down inside the list to reach the target time and click
   it. This is slow (15-min steps) — budget several scroll actions to move a few hours.
4. Repeat steps 2-3 for the **To** date/time fields.
5. Click **Set time**. The URL picks up `timeline.fm`/`timeline.to` (epoch ms) — once you have these for
   a known window, reusing the full URL (not just the deploymentId) skips the whole click sequence on a
   repeat visit to the same window.

## OOM / restart correlation (confirmed 2026-08-03, one example)

Checked the **Events** tab on a deployment during a known Splunk-side `OutOfMemoryException` burst
window. Two findings:
- **There is no literal `OOMKilled` reason in the k8s Events tab for this case** — filtering the Events
  table's `Filter table` box for `OOM` returned zero rows. Don't assume a k8s-level OOM kill is why the
  app restarted just because the app logged a managed-runtime `OutOfMemoryException`.
- What *did* show up: `Normal` / `Killing` events with message "Container {name} failed liveness probe,
  will be restarted", clustered tightly in time and overlapping the memory-usage chart's spike above the
  pod's memory limit. Filter the Events table for `Killing` to find these fast instead of paging through
  everything (confirmed: filtering the Reason/Message column via the same `Filter table` box works for
  any substring, not just `OOM`).
- Interpretation: a managed (.NET-level) OOM inside the process can make it stop responding to health
  checks long enough to fail its liveness probe and get restarted by Kubernetes, without ever triggering
  a hard cgroup-level `OOMKilled`. If you're correlating a Splunk `OutOfMemoryException` against Instana,
  search Events for `Killing`/`Unhealthy`/liveness-probe language, not just `OOM`.

## Open questions

- What the four non-`king` clusters (`air-cloud`, `air-ninja`, `air-team`, `utilities`) actually monitor —
  not yet investigated.
- Whether Instana exposes any authenticated API (vs. UI-only) that a future MCP connector could use
  instead of browser automation — not checked; assume UI-only until proven otherwise. This would resolve
  the multi-environment slowness problem noted above if it exists.
- Whether the Pods tab (as opposed to Events) shows a per-pod numeric "current usage" value (vs. only a
  chart) — attempted 2026-08-03 but the Pods tab failed to hydrate/hung during that session, so this
  wasn't confirmed either way. Worth retrying.

## Growing this skill

**Standing rule (added 2026-08-03, matches the workspace-wide "live skill capture" instruction in the
project `CLAUDE.md`): whenever a new environment, namespace, or deployment ID is resolved during any
future investigation — whether or not collecting it was the point of that investigation — record it in
this file automatically, in the same turn, without waiting to be asked.** A new `clusterId` goes in
"Clusters"; a new `namespaceId` for a namespace not yet in "Namespaces" goes there (add a new row/column
as needed — a non-prod env column, a namespace outside Squad Herbert, etc.); a new `deploymentId` goes in
"Known deployment IDs". This is what keeps the skill's lookup tables actually growing instead of
re-discovering the same IDs investigation after investigation. Only pause to ask first if it's unclear
where a new fact belongs or whether it's actually new information (e.g. don't overwrite a differently-cased
duplicate without checking it isn't a typo of an existing row).

Also fold in other new confirmed facts as they come up — the custom time-range click path, whether
OOM/restart events show directly in the Pods or Events tab, what the `air-*`/`utilities` clusters
monitor, and so on. Follow the same "confirmed twice → written down" discipline as the other skills in
this workspace.
