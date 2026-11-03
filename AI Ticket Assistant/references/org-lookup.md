# Finding the organization from a name

Use it when the user gives an organization by name, by tag, or by part of either, and no organization id is known. Never guess an id and never search the source code for one. The source is Nimbus, the system of record for organizations. The lookup also gives the organization's application host, which tells you the environment and which URL to open in the app tab.

Root `CLAUDE.md` ("Organization name to id") states the rule in short form. This file holds the detail. The `era-builder` skill uses it, and so can any other work that needs an organization id from a name.

## The two APIs

Nimbus has two APIs that list every customer with its organizations. Each serves different environments.

| API | Serves |
|---|---|
| `https://nimbusapi.ucp.ninja/organizations-api/customers` | ninja and team |
| `https://nimbusapi.unlimited.systems/organizations-api/customers` | every other environment: exchange, one, cloud, app, care, space, uno, blue, live |

- No token or header is needed when the browser is signed in. If the tab shows a 401 or a sign-in page, ask the user to sign in and navigate again.
- Choose the API from the environment. If the environment is not stated, search both lists; the application host in the result gives the environment.
- Run the lookup in a tab on the API host itself: open the API URL in a Claude in Chrome tab, then fetch the same path from that tab (`/organizations-api/customers`, no host). A fetch from the app tab to Nimbus is a cross-site request and does not carry the session cookie. Navigating the app tab would also lose any page state (for example the ERA engine and model), so use a second tab (`tabs_create_mcp`).
- The response is an array of customers: `id`, `name`, `note`, `keywords`, and `organizations`, an array of organization objects. The ninja and team list has 10 customers; the other list has 186 customers and 525 organizations (about 220 of them are in exchange). Both lists also hold some organizations whose host ends in `.com`; they were not investigated. Whether an organization can appear in both lists is not confirmed.
- The page may display the JSON as text that is not strict JSON when opened directly, so read the data with `fetch`, not from the page text.

## Organization fields

`id` (the organization id), `name`, `tag` (every tag contains a `-`, for example `SDSH-SHN`), `note`, `type` (`Test` or `Production`), `customerId`, `customerName`, `isActive`, `isLinked`, `kingdomId`, `kingdomName`, `kingdomUrl` (the application host), `subscriptionId`, `subscriptionName`.

The application host is not predictable from the tag: `SDHB-1` has host `sdherbert1`, and `FALC-EXG` has host `sd`. Take it from `kingdomUrl`. An environment's name is the last part of the host (`sdsh.unlimitedfinancials.ninja` is ninja, `sdherbert1.unlimitedfinancials.team` is team, `sd.unlimitedfinancials.exchange` is exchange).

## The lookup

Run in the tab on the API host. It loads the list once (kept on `window.__orgList`), flattens it to organizations, then matches every word of the text against the name, tag and id, case-insensitively. If nothing matches it tries the customer name. It keeps a short result on `window`: start it, then read the result in a second call.

```js
(() => {
  const text = '<NAME, TAG OR ID TEXT>';
  window.__orgRes = { done: false };
  (async () => {
    if (!window.__orgList) {
      const r = await fetch('/organizations-api/customers', { credentials: 'include', headers: { accept: 'application/json' } });
      if (!r.ok) { window.__orgRes = { done: true, status: r.status, error: 'customer list not available' }; return; }
      const customers = await r.json();
      window.__orgList = customers.flatMap(c => (c.organizations || []).map(o => ({ ...o, customerName: o.customerName || c.name })));
    }
    const words = text.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const match = (o, f) => words.every(w => f(o).includes(w));
    let hits = window.__orgList.filter(o => match(o, x => `${x.name || ''} ${x.tag || ''} ${x.id || ''}`.toLowerCase()));
    let by = 'name, tag or id';
    if (!hits.length) { hits = window.__orgList.filter(o => match(o, x => String(x.customerName || '').toLowerCase())); by = 'customer name'; }
    const host = o => String(o.kingdomUrl || '').replace(/^https?:\/\//, '');
    window.__orgRes = { done: true, total: window.__orgList.length, count: hits.length, by, lines: hits.slice(0, 6).map(o => `${o.id} | ${o.name} | ${o.tag} | ${host(o)} | ${o.type}${o.isActive ? '' : ' | inactive'}`) };
  })().catch(e => { window.__orgRes = { done: true, err: String(e) }; });
  return 'started';
})()
```

Read `JSON.stringify(window.__orgRes)`. Each line is `id | name | tag | application host | type`. A partial tag such as `FALC` matches every tag that contains it, so check for an exact tag match before accepting a single result.

## Using the result

- **One match:** confirm it with the user in one line (name, tag, full id, host) and use it.
- **Several matches:** list them with full ids and ask which. More than 6: the script shows the first 6; ask for more of the name or the tag.
- **No match:** say so and ask for a tag, a different part of the name, or the id. A tag the user typed may be slightly wrong (for example one letter off); show the closest matches (try the first part of the tag) and ask rather than guessing.
- **Environment and app host:** the app page for the organization is `https://<application host>/<organization id>/`, and the API base is `https://api.unlimitedfinancials.<environment>`. The API host is confirmed for ninja, team and exchange; for another environment confirm it with the user.
- Whether a write is safe depends on the environment name (root `CLAUDE.md`, "Environments"), not on the organization's `type` (`Test` or `Production`).
- Close the lookup tab (`tabs_close_mcp`) when the lookup is done, unless the user wants to look up another organization.

## Fallback with no Nimbus access

Query `OrganizationCreated` events in the Nimbus Cosmos container (`Data.OrganizationId`, `Data.Name`, `Data.Tag`, `Data.KingdomId`), as `OrganizationQuery` in `snowdrop-charge-master-be` does.

## Confirmed examples

- ninja list: `SDSH-SHN` is `7516f05b-68d9-4095-9edd-348f4b1788c4`, name `Squad Herbert - Ninja`, application host `sdsh.unlimitedfinancials.ninja`, type `Test`.
- ninja list, team organization: `SDHB-1` is `bdeab2ce-cfbc-4280-8338-edce0fcbae06`, name `Herbert Test 1`, application host `sdherbert1.unlimitedfinancials.team`, type `Test`.
- other list, exchange organization: `FALC-EXG` is `aa99843f-d1a2-4629-95b7-22d2ff11486e`, name `EXCHANGE Proof Of Life`, customer `Falcon Oncology (Internal)`, application host `sd.unlimitedfinancials.exchange`, type `Test`. Exactly one organization has this tag.
