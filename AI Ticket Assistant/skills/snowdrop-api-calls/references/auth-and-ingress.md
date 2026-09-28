# Auth & Ingress — details

## The ingress path mapping — TWO patterns, not one

External callers hit an nginx ingress, not the service directly. **The path shape is not uniform** —
confirmed 2026-07-28 by reading every Squad Herbert repo's `k8s-config/**/templates/ingress*.yaml` on a
stable branch. There are two distinct patterns, distinguished by whether the ingress has a
`nginx.ingress.kubernetes.io/rewrite-target` annotation:

**Pattern A — prefix-rewrite** (has `rewrite-target: /$1`, path ends in a regex capture group like
`(.*)` or `?(.*)`): the external path is `/snowdrop/<service>/<route>`, and nginx strips that prefix
before forwarding — the backend only ever sees `/<route>`.

**Pattern B — flat passthrough** (no `rewrite-target` at all): the external path is just the service's
own route segment(s), with **no** `/snowdrop/` prefix, and nginx forwards the exact path unchanged —
what you call is what the backend receives.

Which pattern a service uses is **not predictable from its name or namespace** — you have to check.
Confirmed per-service (Squad Herbert, all from live ingress YAML, ninja host shown but path shape is
env-independent):

| Service (repo) | Pattern | Confirmed external path(s) | Notes |
|---|---|---|---|
| `remittanceprocessing` | A | `/snowdrop/remittanceprocessing/<route>` | single backend. **This row is a mirror, not the source** — canonical copy is `repos/snowdrop-remittance-processing-be/CLAUDE.md`'s identity block (2026-09-18); update there first if this ever changes. |
| `resources` | A | `/snowdrop/resources/<route>` (main); `/snowdrop/resources/administration/<route>`; `/snowdrop/resources/vendor/administration/<route>` (rewrites to `/vendor/<route>` — different upstream path than the others) | three separate backend services under one `/snowdrop/resources` tree |
| `ledger` | **A and B, same repo** | Main: `/ledger/<route>` (flat, Pattern B). Administration: `/snowdrop/ledger/administration/<route>` (Pattern A) | don't assume one pattern for the whole repo — check which endpoint you need |
| `guarantors` | B | `/guarantors/<route>` | |
| `patients` | B | `/population/patients/<route>` (main); `/uapi/population/patients/<route>` (uapi) | two separate backend services |
| `payers` | B | `/payers/<route>` (main); `/payers/aggregate/<route>`; `/payers/assistance/<route>`; `/payers/feeschedules/<route>`; `/payers/search/<route>` | **five** separate backend services, split by sub-path — picking the wrong one 404s even though "payers" is right |
| `remittance` (BE) | B | `/remittance/<route>` | a sibling `/remittance/swagger` ingress has **no auth-url annotation at all** — swagger docs are reachable with no cookie; useful as a no-auth-needed reachability probe, distinct from the data API itself. **This row is a mirror, not the source** — canonical copy is `repos/snowdrop-remittance-be/CLAUDE.md`'s identity block (2026-09-18); update there first if this ever changes. Call recipes (discard/restore) moved to that repo's `references/api-calls.md`. |
| `remittanceprocessing` (fetch-by-id) | A | `/snowdrop/remittanceprocessing/remittances/{remittanceId}` GET | confirmed live 2026-08-12 against uno (UF-15759) — returns `checkNumber`, `checkAmount`, `payerLiteral`, `status`, `claimPayments[]`, etc. This is the correct place to fetch a remittance by id, NOT `remittance` (BE) — don't assume the fetch and the discard live on the same service just because they're both "remittance"-named |
| `charge-masters` | B | `/charge-masters/<route>` | |
| `plans-search` | B | `/plans/search/<route>` | `search` here is a literal path segment, not a route parameter |

**Not yet scanned:** any non-Herbert service (e.g. `waypoints`, referenced in an older confirmed example
below but its repo wasn't part of this scan — verify its pattern before relying on it for a new service).

Historical confirmed example (pattern not re-verified against this table, kept for the reachable
example it gives): `https://api.unlimitedfinancials.ninja/snowdrop/waypoints/behaviors`.

**The swagger `servers:` URL is never the answer, under either pattern.** Each service's swagger
document advertises a `servers:` URL that looks like an absolute external URL but is actually the
**internal** service address, e.g.:

```
https://api.unlimitedfinancials.ninja/snowdrop-remittanceprocessing-services.snowdrop-remittanceprocessing/snowdrop/remittanceprocessing
```

Don't copy that verbatim regardless of which ingress pattern the target service uses.

## Environment hosts

The path shape (Pattern A or B, per service) is the same across environments; only `<api-host>` changes.

- **ninja** → `api.unlimitedfinancials.ninja` (confirmed).
- Other environments (team, one, exch, cloud, app, care, space, uno, …) swap the host. The exact
  host string is not assumed here — confirm it for the target environment. The most reliable source
  is the address bar / a real request in a browser already logged into that environment. If unsure,
  ask the user rather than guessing.

## Checked-in API references (`repos/{repo}/references/`)

Each repo folder holds the full OpenAPI document(s) (`*.Api.json`) and a matching condensed
`*.Api.Dictionary.md` (routes/methods/tags/params/type names, no schema bodies — read this first).
**Every spec has a dictionary now — generate one on the spot if a future addition is ever missing one**
(see `SKILL.md` Step 1). Confirmed contents per repo:

| Repo | Dictionary file(s) | Full OpenAPI json | Notes |
|---|---|---|---|
| `snowdrop-charge-master-be` | `Snowdrop.ChargeMasters.Api.Dictionary.md` | `Snowdrop.ChargeMasters.Api.json` | |
| `snowdrop-commandcenter-be` | `Snowdrop.CommandCenter.Api.Dictionary.md` | `Snowdrop.CommandCenter.Api.json` | Platform squad, not Herbert; not yet in the ingress-pattern table above — pattern unconfirmed, check its own `ingress*.yaml` before calling |
| `snowdrop-guarantors-be` | `Snowdrop.Guarantors.Api.Dictionary.md` | `Snowdrop.Guarantors.Api.json` | |
| `snowdrop-ledger-be` | `Snowdrop.Ledger.Api.Dictionary.md`, `Snowdrop.Ledger.Api.Administration.Dictionary.md`, `Snowdrop.Ledger.Api.Internal.Dictionary.md` | matching `*.Api*.json` per dictionary | three specs (main, Administration, Internal), each with its own dictionary |
| `snowdrop-patients-api-be` | `Snowdrop.Patients.Api.Dictionary.md` | `Snowdrop.Patients.Api.json` | |
| `snowdrop-payers-api-be` | `Snowdrop.Payers.Api.Dictionary.md`, `Snowdrop.Payers.Assistance.Api.Dictionary.md`, `Snowdrop.Payers.FeeSchedules.Api.Dictionary.md` | matching `*.Api.json` per dictionary | three of the five payers sub-services have specs (main, assistance, feeschedules) — `aggregate` and `search` don't yet |
| `snowdrop-remittance-be` | `Snowdrop.Remittance.Api.Dictionary.md` | `Snowdrop.Remittance.Api.json` | see that repo's `references/api-calls.md` for the reconciliation fetch/discard workflow |
| `snowdrop-remittance-processing-be` | `Snowdrop.RemittanceProcessing.Services.Dictionary.md` | `Snowdrop.RemittanceProcessing.Services.json` | confirms the `remittanceprocessing` service also exposes cookie-auth orchestration routes — see that repo's `references/api-calls.md` |
| `snowdrop-resources-be` | `Snowdrop.Resources.Ledger.Api.Dictionary.md`, `Snowdrop.Resources.Services.Dictionary.md`, `Snowdrop.Resources.Services.Administration.Dictionary.md` | matching `*.json` per dictionary | three specs (ledger sub-route, main Services, Services Administration), each with its own dictionary |

Treat this table as the index — when a new spec or dictionary is added, add a row/cell here rather than
leaving it to be rediscovered by `ls`.

## Finding the path for a service not yet in the table above

**From the repo** (development / Claude Code, most reliable): read
`k8s-config/**/templates/ingress*.yaml` in that service's repo. The `path:` under
`spec.rules[].http.paths[]` is the literal external path; the presence of `rewrite-target` tells you
Pattern A vs B. Check for **more than one** ingress file — several Herbert repos have 2-5 of them, each
potentially a different backend or pattern (see `resources`, `ledger`, `patients`, `payers` above).

**From source code**, for the route *segment* once you know the service uses Pattern A (or to find the
Pattern-B service's own base route in its controller):
- Swagger base = `[SwaggerBaseUrl("...")]` on the service's `Startup`.
- Route = the controller's `[ApiController, Route("...")]` plus the action's `[HttpGet/Post, Route("...")]`.
  - Example: `TransferTargetController` has `[Route("transfer-targets")]` and an action `[HttpGet, Route("{chargeAssemblyId}")]` → `transfer-targets/{chargeAssemblyId}`.

**From a running app** (support / Claude app): Open the feature in the browser, then DevTools →
Network, and read the actual request URL. That is the ingress path already resolved for you — no need
to figure out which pattern applies. "Copy as cURL" also captures the working URL + cookie.

## Authentication: SharpAuth + SharpOrg

Auth is cookie-based, sourced from a logged-in browser session:

- **`SharpAuth`** — a JWT. Short-lived (observed ~45 minutes; the JWT's `exp`/`iat` are ~2700s apart).
  When it expires you get `401`; re-grab it from a live session.
- **`SharpOrg`** — the acting organization GUID. **Data is scoped to this org.** A charge assembly /
  remittance / etc. must belong to this org or you'll get `404`.

### Acting-org vs home-tenant
`SharpOrg` can differ from the `Tenant` claim inside the `SharpAuth` JWT. That's expected: `SharpOrg`
is the org you're currently acting in (used for data scoping), while the JWT `Tenant` is the user's
home tenant. Always scope your test ids to `SharpOrg`.

### Cookie → header translation
Confirmed directly in every scanned ingress's annotations (2026-07-28), not just inferred from backend
code: `nginx.ingress.kubernetes.io/auth-url` points at a "star_road" auth endpoint (`{star_road_endpoint}/auth/authenticate`, or a `/auth/nimbus/authenticate` variant for the nimbus-administration
sub-route on `resources`), and `nginx.ingress.kubernetes.io/auth-response-headers: "Org-Id, User-Id"`
tells nginx to forward those two headers — returned by the auth subrequest — on to the backend. The
apps then read them as `Org-Id`/`User-Id` request headers (case-insensitive; code-level accessors like
`ClaimsPrincipalExtensions.GetOrganizationId`/`GetUserId` read the same headers). That's why an external
caller only needs to send the **`Cookie`** header — the ingress's `auth-url` subrequest does the
cookie-to-header translation for you; setting `Org-Id`/`User-Id` yourself is unnecessary through the
front door (and only useful as a fallback if you ever bypass it entirely).

One exception seen so far: `remittance` (BE)'s `/remittance/swagger` ingress has **no** `auth-url`
annotation at all — that specific sub-route is unauthenticated.

### Obtaining the cookie
- Browser DevTools → Application → Cookies (domain = the api host), or "Copy as cURL" on a request.
- Claude-in-Chrome MCP: `read_network_requests` on a request the app already issued, then lift the
  `Cookie` header value.
- Direct paste from the user.
