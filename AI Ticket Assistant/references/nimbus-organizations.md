# Nimbus organizations lookup

Resolves an organization name or tag to its `organizationId`. Nimbus is the system of record for organizations; no repo in this workspace implements it.

## Endpoints

Two APIs list every customer with its organizations. Each serves different environments.

| API | Serves |
|---|---|
| `GET https://nimbusapi.ucp.ninja/organizations-api/customers` | ninja and team |
| `GET https://nimbusapi.unlimited.systems/organizations-api/customers` | exchange, one, cloud, app, care, space, uno, blue, live |

- No token or header is needed when called from a signed-in Chrome browser; the sandbox cannot reach either host.
- Open the URL in a Claude for Chrome tab and fetch the same path from that tab (`fetch('/organizations-api/customers', { credentials: 'include' })`). A fetch from the application tab is cross-site and does not carry the session cookie.
- Returns a JSON array of customers: `id`, `name`, `note`, `keywords`, `organizations[]`. Filter the organizations in the page by tag, name, id or customer name. The ninja and team list has 10 customers; the other list has 186 customers and 525 organizations.
- The filtering script, matching rules and examples are in the `era-builder` skill's `reference/org-lookup.md`.

## Organization fields

| Field | Meaning |
|---|---|
| `id` | **organizationId** |
| `name` | Organization name |
| `tag` | Short tag, e.g. `SDSH-SHN`; always contains `-` |
| `type` | `Test` or `Production` |
| `customerId`, `customerName` | Owning customer |
| `isActive`, `isLinked` | Status flags |
| `kingdomId`, `kingdomName`, `kingdomUrl` | Environment the organization lives in; `kingdomUrl` is the application host (e.g. `https://sdsh.unlimitedfinancials.ninja`) and is not predictable from the tag |
| `subscriptionId`, `subscriptionName` | Subscription |
| `note` | Free text |

Confirmed examples: `SDSH-SHN` is `7516f05b-68d9-4095-9edd-348f4b1788c4` (ninja, `Squad Herbert - Ninja`); `SDHB-1` is `bdeab2ce-cfbc-4280-8338-edce0fcbae06` (team, `Herbert Test 1`); `FALC-EXG` is `aa99843f-d1a2-4629-95b7-22d2ff11486e` (exchange, `EXCHANGE Proof Of Life`).

## Not confirmed

- Both lists also hold some organizations whose host ends in `.com`; what these are was not investigated.
- Whether an organization can appear in both lists.

## Related

- Fallback with no Nimbus access: query `OrganizationCreated` events in the Nimbus Cosmos container (`Data.OrganizationId`, `Data.Name`, `Data.Tag`, `Data.KingdomId`), as `OrganizationQuery` in `snowdrop-charge-master-be` does.
