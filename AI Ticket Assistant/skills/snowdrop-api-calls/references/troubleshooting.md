# Troubleshooting Snowdrop API calls

Work from the status code. The goal is to separate **transport/auth/path** problems (our side) from
**routing/data** problems (the service's side).

## First: confirm auth + routing with a known-good call
Before deep-diagnosing a failing call, hit an endpoint you're confident exists on the **same
service** — ideally parameterless — with the **same cookie**. The path shape for the probe must match
that service's actual pattern (see `auth-and-ingress.md`'s table — don't assume `/snowdrop/<service>/`,
most Herbert services are flat).

If the probe returns `200`, then auth + the cookie translation + ingress routing to that host all
work, and the failing call's problem is narrowed to its path, its deployment, or its data.

## 401 Unauthorized
- `SharpAuth` is missing, malformed, or **expired** (~45 min lifetime).
- Fix: re-grab `SharpAuth` (and `SharpOrg`) from a live, logged-in browser session and retry.
- If a brand-new token still 401s, check you're sending it as a **`Cookie` header** (`SharpAuth=…; SharpOrg=…`), not as `Authorization`.
- **If PowerShell 401s but the identical cookie works from a browser or `curl.exe`**, this is not an
  expired-token problem — it's the WAF rejecting `Invoke-WebRequest`/`HttpClient` at the transport level
  (confirmed 2026-08-12, UF-15759). The response looks like a bare nginx `401 Authorization Required`
  rather than the app's own 401 body. Fix: use `curl.exe` instead (see `scripts/Invoke-SnowdropApi.ps1`
  and `SKILL.md`'s "WAF blocks Invoke-WebRequest" section) — don't waste time adding more headers to
  `Invoke-WebRequest`, that isn't the layer where this is failing. Confirm by testing the exact same
  cookie with `curl.exe` directly (or from a browser network tab); if that succeeds where
  `Invoke-WebRequest` doesn't, it's this issue.

## 404 Not Found
Three distinct causes — check in this order:

1. **Wrong ingress pattern assumed (most common).** Two things can go wrong here, both covered in
   `auth-and-ingress.md`'s per-service table: (a) you added a `/snowdrop/<service>/` prefix to a
   flat-passthrough service that doesn't use one (most Herbert services are flat, not prefixed — this
   is the more common mistake), or dropped the prefix from a service that needs it; (b) you copied the
   swagger `servers:` URL instead of either ingress shape. Rebuild the URL from the table and retry —
   this alone accounts for most "but the endpoint exists!" 404s. If the service has multiple ingress
   files (resources, ledger, patients, payers), also double check you picked the right one — each can
   route to a different backend.
2. **Route not deployed in this environment.** New endpoints 404 until the build that contains them
   is deployed to that environment. Confirm the route exists in the deployed build (not just in your
   branch). A known-good probe returning `200` while your route 404s on the correct path points here.
3. **No data for that id/org.** The route exists but the controller returned `NotFound()` because
   nothing matches — often the id belongs to a **different org** than `SharpOrg`, or the underlying
   projection hasn't been populated yet. Verify the id belongs to the `SharpOrg` you're sending.

Distinguishing (2) vs (3) from the outside is hard — both are bare 404s. If the probe works and the
path is definitely correct, suspect (3) first (wrong org / unpopulated data), then (2).

## `curl: ... config file option '' is unknown` (PowerShell/curl.exe calls only)
Only relevant if you're using the curl.exe config-file approach from `scripts/Invoke-SnowdropApi.ps1`
(see SKILL.md's "WAF blocks Invoke-WebRequest"). Cause: a header or body value passed to the config file
contains a literal, unescaped newline — most commonly a POST body built with `ConvertTo-Json` **without**
`-Compress`, which pretty-prints across multiple lines. Those embedded newlines split the single
`data-raw = "..."` config line into several physical lines, and curl parses the continuation lines as
garbage config options with an empty option name. Fix: always build JSON bodies with
`ConvertTo-Json -Compress` (confirmed 2026-08-12, UF-15759 — hit on the remittance discard POST body).
The script's `Escape-CurlConfigValue` helper also strips any stray `\r`/`\n` as a backstop, but don't rely
on that — fix it at the source.

## 403 Forbidden
Authenticated but not authorized — the logged-in user lacks permission for that resource/action, or
`SharpOrg` is an org the user can't act in. Use an account/org with the right role.

## 5xx
A genuine server-side error. Capture the response body and correlate with service logs (Splunk) for
that environment and time window.

## Connectivity / TLS / name resolution errors
- Wrong/typo'd `<api-host>`, or the environment host is different from what you assumed. Reconfirm the
  host (see `auth-and-ingress.md` → Environment hosts).
- Corporate network/VPN required to reach the environment.

## Empty/partial fields in a 200 response
A successful call can still return blank fields if the underlying projection wasn't fully populated
(e.g. a backfill gap or an event that was never consumed). That's a data/pipeline question, not an
API-call problem — the call itself worked.
