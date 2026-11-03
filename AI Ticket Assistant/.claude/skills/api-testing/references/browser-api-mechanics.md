# Browser API mechanics

How an API test is run from the browser with Claude in Chrome. Confirmed on ninja. Other environments are expected to behave the same way.

## Setup

- Tools: `mcp__claude-in-chrome__tabs_context_mcp`, `navigate`, `javascript_tool` (and `read_network_requests`, `get_page_text` when needed). If they are deferred, load them together with ToolSearch.
- Get the tab context with `createIfEmpty: true` and use a tab from the current group. A tab id that is not in the group is rejected; get the context again.
- Navigate the tab to the organization's application page: `https://sd.unlimitedfinancials.{env}/{organizationId}/` (the host prefix can differ by organization, for example `sdsh`; the organization lookup gives it). The page should show the dashboard. If it lands on a sign-in page (host `hello.unlimited.systems`), tell the user "Login is required" and wait; then navigate the same tab again.
- Make API calls from that tab so the session cookie rides along: `fetch(url, { credentials: 'include', headers })`. The API host is `https://api.unlimitedfinancials.{env}` (confirmed for ninja; confirm it for another environment).
- Every call needs the header `org-id-req: {organizationId}`. Without it calls can fail with 401.
- Do not run calls from a tab on the API origin (the page is an error page and the fetch fails). Do not copy cookies or tokens out of the browser.
- PowerShell `Invoke-WebRequest` is rejected by the gateway. If PowerShell is needed, use `curl.exe` as described in the `snowdrop-api-calls` skill.
- A single tab is enough. Navigating to another site (for example Splunk) clears any state kept on the page; navigate back before the next API call.

## Tool limits

- `javascript_tool` times out after about 45 seconds.
- The tool returns the value of the last expression. An async function that is not awaited returns `{}`. Use `await (async () => { ... })()` and `return` inside it. A bare top-level `return` can make the result undefined.
- Output is cut off at about 1 to 2 KB. Return compact JSON or joined strings.
- A filter blocks output that looks like cookie or query-string data and long runs of digits. Do not return raw log text, full URLs with a `sid`, or long digit strings. Return selected fields.
- Page state (`window.*`) survives between calls on the same page until the page navigates.

## Patterns

**GET or POST with the session**
```js
await (async () => {
  const B = 'https://api.unlimitedfinancials.{env}', ORG = '<organization id>';
  const H = { 'accept': 'application/json', 'content-type': 'application/json', 'org-id-req': ORG };
  const r = await fetch(B + '/<path>', { credentials: 'include', headers: H });
  return JSON.stringify({ status: r.status, body: (await r.text()).slice(0, 800) });
})()
```

**Create, then poll the read-back.** A GET sent right after a create can return 404 for a few seconds. Poll every 3 seconds, up to about 8 times, until 200.

**Start, then poll (for work longer than about 40 seconds)**
```js
(() => { window.__r = { done: false };
  (async () => { /* long work; write results into window.__r */ window.__r.done = true; })()
    .catch(e => { window.__r.err = String(e); window.__r.done = true; });
  return 'started'; })()
```
Then in a second call: `await new Promise(r => setTimeout(r, 30000)); JSON.stringify(window.__r)`.

**Upload a file as multipart**
```js
const fd = new FormData();
fd.append('file', new Blob([text], { type: 'text/plain' }), 'name.txt');
const r = await fetch(B + '/<upload path>', { method: 'POST', credentials: 'include', headers: { 'accept': 'application/json', 'org-id-req': ORG }, body: fd });
```
Never set `Content-Type` yourself; the browser adds the boundary. Check the size of the text before sending (`new Blob([text]).size`) and compare it with the size of the file you showed the user.

**Read a Splunk search.** Short form of the `sid` method in the `splunk-search` skill; that skill is the source for index names and field conventions, and wins if the two differ.
1. Navigate the tab to `https://unlimitedsystems.splunkcloud.com/en-US/app/search/search?q=search%20<URL-encoded SPL>&earliest=-4h&latest=now&display.page.search.mode=fast`. The index pattern is `sharp-app-aks-{env}-king` (for `exchange` the index uses `exch`). The `splunk-search` skill has the field conventions.
2. Wait about 12 seconds, then read the job's results through its id, without displaying the id:
```js
await (async () => {
  const sid = new URLSearchParams(location.search).get('sid');
  const r = await fetch('/en-US/splunkd/__raw/services/search/jobs/' + sid + '/results?output_mode=json&count=0', { headers: { 'X-Requested-With': 'XMLHttpRequest' } });
  const ev = (await r.json()).results.map(x => { const o = JSON.parse(x._raw), p = o.Properties || {};
    return (p.Timestamp || '').slice(11, 23) + '|' + (p.SourceContext || '').split('.').pop() + '|' + (p.RuleId || '') + '|' + o.MessageTemplate; });
  return JSON.stringify(ev.sort());
})()
```
3. Return only selected fields (message template, source, timestamp, ids). Raw `_raw` text and request-logging lines can be blocked by the content filter.

## Read results twice

Read models are written asynchronously. After a write or an upload, read the result, wait 6 to 8 seconds, and read it again before judging. Follow the procedure's own timing notes.

## When a connector fails

If a Jira or other connector call fails, check whether the write took effect before trying again (for example, read the ticket's comments), and keep the text of the intended write in a file so it can be pasted by hand.
