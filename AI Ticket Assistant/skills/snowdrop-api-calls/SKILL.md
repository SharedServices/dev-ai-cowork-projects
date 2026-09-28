---
name: snowdrop-api-calls
description: >-
  Generate and run authenticated HTTP calls to Snowdrop / Unlimited Financials Azure-hosted web
  services in any environment — cookie-authenticated APIs behind an nginx ingress, where the path shape
  varies by service (some use a `/snowdrop/{service}/...` prefix, others a flat path with none — the
  skill has the confirmed per-service table). Use whenever the user wants to call, test, hit, exercise,
  or diagnose one of these service APIs — e.g. "call the remittance-processing API", "test the
  guarantors API in team", "hit the transfer-targets endpoint", "why is this API returning 404" — or
  when they paste an `api.unlimitedfinancials.*` URL or a `SharpAuth`/`SharpOrg` cookie. Works in Claude
  Code (PowerShell) and the Claude app (browser). NOT for: Azure Function apps (use function-apis —
  different `king-{env}-*` host, `?code=` auth); Splunk investigation (use splunk-search);
  writing/reviewing the API code itself.
---

# Calling Snowdrop Azure-hosted APIs

Snowdrop services run behind an nginx ingress, but **the external path shape is NOT uniform across
services** — confirmed by scanning all nine Squad Herbert repos' Helm `ingress*.yaml` templates
(2026-07-28). Some services sit behind a `/snowdrop/<service>/...` prefix that gets rewritten away
before the backend sees it; others expose a flat path with no prefix and no rewrite at all. Guessing
wrong is the single biggest source of confusing 404s — always check the per-service table in
`references/auth-and-ingress.md` before building a URL. The other thing that trips people up: **auth is
a browser session cookie**, not a bearer header you set yourself. This skill captures both and gives you
a runnable call in either client.

## Pick your execution mode

You have two ways to make the call. Choose based on which client you're in and what you have:

- **Claude Code (development), or you already have the cookie** → use **PowerShell** (`scripts/Invoke-SnowdropApi.ps1`). Best for scripted, repeatable calls, non-GET verbs, and iterating.
- **Claude app / support diagnostics with a logged-in browser** → drive the **browser** (Claude for Chrome). For a GET you can often just navigate to the URL — the authenticated session sends the cookie automatically. For other verbs or header control, read the request from the network tab.

These aren't exclusive: in Claude Code with the Claude-in-Chrome MCP connected, you can pull the live cookie out of the logged-in browser and then run the PowerShell call — no manual token copying.

## Step 1 — Build the URL (the #1 gotcha)

**There are two ingress patterns, and which one a service uses is not predictable from its name.**
Always check the per-service table in `references/auth-and-ingress.md` (or the repo's own
`k8s-config/**/templates/ingress*.yaml`) before assuming either shape.

- **Pattern A — prefix-rewrite.** External path is `/snowdrop/<service>/<route>`; an
  `nginx.ingress.kubernetes.io/rewrite-target: /$1` annotation strips that prefix before the backend
  ever sees the request. Confirmed for: `remittanceprocessing`, `resources` (main + its administration
  and vendor-administration sub-routes), `ledger`'s **administration** sub-route only, and `catalogs`
  (its `administration` sub-route, at least — see below).
- **Pattern B — flat passthrough.** External path has **no** `/snowdrop/` prefix at all — it's just the
  service's own route segment(s) (e.g. `/guarantors`, `/population/patients`, `/payers/search`), with no
  rewrite, so the backend receives exactly what you called. Confirmed for: `guarantors`, `patients`
  (two backends — main + `uapi`), `payers` (**five** backends split by sub-path: main,
  `/aggregate`, `/assistance`, `/feeschedules`, `/search`), `remittance`, `charge-masters`,
  `plans-search`, and `ledger`'s **main** route (the same repo uses both patterns — see the table).

**Do NOT copy the swagger `servers:` URL verbatim either way** — it's always the app's internal
address, regardless of which ingress pattern applies to that service.

How to find the real path for a service you haven't confirmed yet, in priority order:
1. Check `references/auth-and-ingress.md`'s per-service table — most Herbert services are already confirmed there.
2. **Check the checked-in API references** at `repos/{repo}/references/` in the Support project. Two
   file types live there, and they serve different purposes — see `references/auth-and-ingress.md`'s
   "Checked-in API references" table for the confirmed per-repo file list:
   - **`*.Api.Dictionary.md`** — a condensed lookup: every route, method, tags, path params, and
     request/response type names, no schema bodies. **Read this first** — it's small enough to read in
     full and almost always answers "does this route exist / what does it take" in one shot.
   - **`*.Api.json`** — the full OpenAPI document behind that dictionary. Drop down to this only when you
     need the full request/response **schema** (property names/types on a request or response model) —
     grep it by the schema name the dictionary gave you, or by tag/keyword if you're starting from
     scratch.
   Multi-spec repos (`ledger-be`, `payers-api-be`, `resources-be`, `remittance-processing-be`) have one
   pair per sub-service — match the dictionary/json pair by filename (e.g. `Snowdrop.Payers.Assistance.Api.*`
   is the `assistance` sub-service, not main `payers`).

   **Every checked-in OpenAPI spec must have a matching `.Dictionary.md` — generate one on the spot if it's
   missing, don't just read the raw json and move on.** Five specs across three repos were found missing
   their dictionary (resources-be's two Services specs, ledger-be's Administration and Internal specs,
   remittance-processing-be's main spec) before this rule existed — a spec added to a repo's `references/`
   without its dictionary silently regresses the next person back to reading raw json. Generate the
   dictionary in the exact format already used by every other file in this family: `# {title} - API
   Dictionary` header, `Repo:`/`Source:` lines, an `## Endpoints` section (one `### {METHOD} {path}` block
   per operation — Tags, Path params, Query params, Request body, one `Response {code}:` line per response,
   `(no body)` where there's no content), then a `## Schemas` section (every schema in the spec's
   `components.schemas`, alphabetical, one bullet per property with `(required)`/`(nullable)` markers where
   they apply, `enum values: ...` for enum schemas, `(no properties)` for empty ones). Add the new file to
   the repo's own `CLAUDE.md` "Where to look for more" list in the same turn — that list is a generated
   rollup, not independently maintained.
3. Read the repo's own ingress template(s): `k8s-config/**/templates/ingress*.yaml`. The `path:` under
   `spec.rules[].http.paths[]` is the answer, and whether `rewrite-target` is present tells you which
   pattern it is. Watch for repos with **multiple** ingress files (resources, ledger, patients, and
   payers all have more than one) — each can route to a different backend or use a different pattern.
4. From a running app: DevTools → Network tab on the real request.

## Step 2 — Get auth (cookie)

**No active session to pull a cookie from? Trigger login via the org's own base URL, not a bare login
page and not a ticket-specific deep screen.** Hitting `https://hello.unlimited.systems` directly does get
a login form to show, but the `SharpOrg` cookie set on completing it is whatever org that bare login
defaults to — **not necessarily the org the API call needs.** Confirmed behavior: clicking an org-scoped
application link redirects to the login gate, and logging in from there redirects back to that same
org-scoped URL, which is what actually establishes `SharpOrg` for the right org. So the minimal
equivalent is the org's own root — no need for a ticket's specific remittance/payer/etc. screen, just the
env+org segment of the URL:

```
https://sd.unlimitedfinancials.{env}/{organizationId}/
```

Navigate here whenever there's no already-open, authenticated browser session to pull a cookie from (a
fresh Claude-in-Chrome tab, or a pasted cookie that's since expired with no browser open to refresh it
from), using the `env`/`organizationId` already known for this call — **then check what actually loaded,
rather than assuming a login form will appear:**
- **Lands straight on a signed-in page** (e.g. a "Work Dashboard" greeting the user by name) — proceed
  straight to the cookie extraction below from that same tab; there's nothing to wait on. **This is the
  common case, not an edge case** — confirmed repeatedly 2026-09-30 (org
  `e8a5f9c4-23df-4045-83d8-8a0d1eef5f71`, env `cloud`), including after the user closed and reopened the
  browser entirely and it still landed signed-in both times with zero redirect-to-login network activity
  either time. The underlying session cookie evidently outlives a browser restart (or there's a silent
  SSO re-auth happening) — don't read "no login form showed" as something having gone wrong, and don't
  tell the user a login happened when it didn't.
- **A login form shows** — tell the user plainly, "Login is required before I can make this API call —
  please log in," and wait. Once they confirm, retry the cookie extraction on that **same** tab (not a
  new one, so the just-established, org-scoped session is the one read).
- **It 404s or renders something unexpected** — the org-root URL shape needs adjusting for that
  env/org combination; fall back to any known deeper application link for that env+org (e.g. one already
  present on the ticket), same as the `ticket-workflow` skill's page-capture flow does.

This is the standard response any time an API call is requested and no valid session exists — not a
fallback reached only after a failed call.

Auth is a **cookie** carrying two values from a logged-in session:

- `SharpAuth` — the JWT bearer. **Short-lived (~45 min).** On `401`, it's expired — refresh from the browser.
- `SharpOrg` — the **acting organization** GUID. Data is scoped to this org. (It can legitimately differ from the JWT's embedded `Tenant` — acting-org vs home-tenant.)

The gateway translates these cookies into the internal `Org-Id` / `User-Id` headers the apps read, so you send the **`Cookie` header**, not those headers. This is now confirmed directly in every service's ingress annotations (`auth-url` pointing at a `star_road` auth endpoint, `auth-response-headers: "Org-Id, User-Id"`), not just inferred from backend code.

To obtain it:
- **From a logged-in browser** (preferred): DevTools → Application → Cookies, or copy a request "as cURL". With the Claude-in-Chrome MCP, use `read_network_requests` on a request the app already made and lift the `Cookie` header.
- The user may also paste it directly.

## Step 3 — Make the call

### PowerShell (Claude Code)
Use the bundled helper — pass the **full path** you determined in Step 1 (don't assume a `/snowdrop/`
prefix; include it only if that service uses Pattern A):
```powershell
./scripts/Invoke-SnowdropApi.ps1 `
  -ApiHost "api.unlimitedfinancials.ninja" `
  -Path    "/snowdrop/remittanceprocessing/transfer-targets/007bcbe7-a44a-4cd5-8dbe-2823ae946d8a" `
  -SharpOrg "<ORG_GUID>" -SharpAuth "<JWT>"
```
```powershell
./scripts/Invoke-SnowdropApi.ps1 `
  -ApiHost "api.unlimitedfinancials.ninja" `
  -Path    "/guarantors/007bcbe7-a44a-4cd5-8dbe-2823ae946d8a" `
  -SharpOrg "<ORG_GUID>" -SharpAuth "<JWT>"
```
It prints the status code and pretty-prints JSON. Supports `-Method`/`-Body` for non-GET verbs. See the script header for all parameters.

Set `SharpAuth` into a variable once per session rather than re-pasting the long JWT into every command:
```powershell
$SharpAuth = "<JWT>"
./scripts/Invoke-SnowdropApi.ps1 -ApiHost "api.unlimitedfinancials.uno" -Path "/snowdrop/remittanceprocessing/remittances/007bcbe7-a44a-4cd5-8dbe-2823ae946d8a" -SharpOrg "<ORG_GUID>" -SharpAuth $SharpAuth
```

**Under the hood this shells out to `curl.exe`, not `Invoke-WebRequest` — see "WAF blocks Invoke-WebRequest" below before you modify or reimplement this script.**

### Browser (Claude app / Chrome)
For a **GET** against a service you're logged into, navigate the authenticated browser straight to
`https://<api-host><path>` (the exact path from Step 1 — with or without `/snowdrop/`, per that
service's pattern) — the session cookie rides along and the JSON renders. For non-GET or when you need
to inspect headers/body, use the Network tab (or an in-page `fetch` with `credentials: "include"`).

**When the user asks "give me the prompt for [some API]"**, they mean the copy-paste text for the sandboxed
Claude in Chrome extension panel — not a URL to open themself. Give them the URL plus this exact wrapper, in
its own cut-and-paste block (confirmed 2026-08-05 — a bare "call this URL" request made that panel return
a prose summary/description of the response instead of the raw JSON, which is useless for pasting back
for analysis):

```
Call this API and return the full response as raw JSON in a single cut-and-pastable code block — no summary, no paraphrasing, and no truncation of any fields or array entries: <URL>
```

## Remittance reconciliation — fetch, validate, discard

**Migrated 2026-09-18 to `repos/snowdrop-remittance-processing-be/references/api-calls.md`** — the fetch call is this repo's own; moved there rather than left here since that repo now has a folder. Read that file for the full recipe (fetch/discard/restore endpoints, safety note on the production-write policy).

## Catalogs — resolving attribute GUIDs (e.g. Modifiers)

The `catalogs` service's `administration` sub-route lists the actual elements (with human-readable
names/codes) behind a catalog GUID — useful for resolving a GUID seen in a rules-engine `qualifiers[]`
entry (see `repos/snowdrop-remittance-processing-be/business-logic/Rules/references/attribute-types.md` for the `AttributeType` enum
that tells you *which* catalog a given GUID belongs to — the `business-logic-expert` skill this used to cite was removed 2026-09-21; that file was always the actual source). Confirmed 2026-08-05 (org
`20390dc5-616a-456d-bbb6-cb247a4981cb`, env `space`) for the **Modifiers** catalog:

```
https://api.unlimitedfinancials.space/snowdrop/catalogs/administration/877fbaf8-a61b-425d-96ef-436f56858415/elements
```

The GUID after `/administration/` selects **which catalog** (Modifiers, Charge Codes, etc. — same
`AttributeType` concept as the rules engine) — swap it for other attribute types once their catalog GUIDs
are confirmed. See `references/catalogs.md` for the full endpoint shape and confirmed catalog GUIDs.

## Remittance orchestration is also reachable via cookie auth

**Migrated 2026-09-18 to `repos/snowdrop-remittance-processing-be/references/api-calls.md`** — entirely specific to that repo's service. Read that file for the full route list and how it relates to `function-apis`'s Azure Function endpoints.

## WAF blocks `Invoke-WebRequest` — use `curl.exe` for PowerShell calls

Confirmed 2026-08-12 (UF-15759, org `852756eb-73b2-4c46-b0f0-c8ec4d29acde`, env `uno`). A byte-for-byte
correct, unexpired `SharpAuth`/`SharpOrg` cookie sent via PowerShell's `Invoke-WebRequest` (or raw
`HttpClient`) got a bare nginx `401 Authorization Required` — not the app's own 401, an ingress-level
rejection — no matter how many browser-fingerprint headers (`Origin`, `Referer`, `User-Agent`,
`sec-fetch-*`, `sec-ch-ua*`, `org-id-req`) were added. The exact same cookie and headers, sent via
`curl.exe` instead, succeeded immediately. This points to something below the HTTP layer — most likely
the Barracuda WAF fingerprinting the TLS/JA3 handshake and distinguishing .NET's HTTP stack from a real
browser or curl — which no amount of header-matching from `Invoke-WebRequest` can work around.

**Practical takeaway: every PowerShell call to these APIs must go through `curl.exe`, not
`Invoke-WebRequest`/`HttpClient`.** `scripts/Invoke-SnowdropApi.ps1` already does this — if you're writing
a new one-off script instead of using it, copy its `Invoke-ApiCall` pattern: build a curl `-K` config file
(not raw argv — header values like `sec-ch-ua` contain embedded double quotes that get mangled by
Windows argument-escaping when passed directly), write it with `-Encoding ascii` (Windows PowerShell
5.1's `-Encoding utf8` always adds a BOM that curl's config parser chokes on), shell out with
`& curl.exe -K $configPath`, and always include the full browser-fingerprint header set plus fresh
per-call `request-id`/`x-instana-l/s/t` tracing ids (a real browser mints new ones every request).

If this stops working again (WAF rules change, curl itself gets blocked, etc.), re-diagnose from a fresh
confirmed-working "Copy as cURL" capture out of a logged-in browser network tab, exactly as this one was
found — don't assume the old header set still matches.

## Step 4 — If it doesn't work

Read `references/troubleshooting.md`. Quick version:

- **401 from PowerShell despite a fresh, valid cookie** → check you're using `curl.exe`, not
  `Invoke-WebRequest` — see "WAF blocks Invoke-WebRequest" above. This is a distinct failure mode from
  an actually-expired token.
- **401** → `SharpAuth` missing or expired. Refresh it from the browser — if there's no authenticated
  session to refresh from, use the login-trigger flow in Step 2 above (navigate to the org's own
  `https://sd.unlimitedfinancials.{env}/{organizationId}/` root) rather than a bare login page or a
  ticket-specific deep screen — the org-scoped URL is what gets `SharpOrg` set correctly on login.
- **404** → one of: (1) **wrong ingress pattern assumed** — you added a `/snowdrop/` prefix a flat-passthrough service doesn't have, dropped one a prefix-rewrite service needs, or copied the swagger `servers:` URL — recheck Step 1's table first, this is now the most common cause; (2) the route isn't deployed in that environment's build; (3) no data for that id/org (the controller's own `NotFound`). Disambiguate by calling a **known-good endpoint** (e.g. a parameterless list on the same service) with the same cookie — if that succeeds, auth + routing are fine and you're down to path or data.

## Safety

`SharpAuth` is a live session credential. Don't paste it into commits, tickets, or any persistent/shared store, and don't reuse it past its ~45-minute expiry. It only grants what the logged-in user already has.

## Reference files

- `references/auth-and-ingress.md` — the two ingress patterns in depth, the confirmed per-service path table, the checked-in API reference file index, cookie→header translation, environment hosts.
- `references/troubleshooting.md` — status-code diagnosis playbook.
- `references/catalogs.md` — the `catalogs` service's `administration/{catalogId}/elements` endpoint, confirmed catalog GUIDs (e.g. Modifiers), and how it pairs with the rules-engine `AttributeType` enum (now at `repos/snowdrop-remittance-processing-be/business-logic/Rules/references/attribute-types.md`). Stays bundled here, not moved — `catalogs` is its own service/repo with no `repos/` folder yet, so this isn't remittance-processing's content to claim even though that's its only confirmed consumer so far.
- `scripts/Invoke-SnowdropApi.ps1` — parameterized PowerShell caller.
- `repos/snowdrop-remittance-processing-be/references/api-calls.md` — that repo's own call recipes (orchestration-via-cookie, reconciliation fetch/discard), moved out of this skill 2026-09-18 since that repo now has a folder.
- `../../repos/{repo}/references/*.Api.Dictionary.md` and `*.Api.json` — checked-in per-service API
  references (inside each repo's own folder, not bundled inside this skill — see the index in
  `auth-and-ingress.md`). Dictionary first, full OpenAPI json for schema depth. Generate the dictionary
  on the spot if a spec is missing one — see Step 1 above.
