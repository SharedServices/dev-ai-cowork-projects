# Unlimited Financials AI Ticket Assistant
## How It Works

---

This document explains the mechanics underneath the commands in *How to Use*: what Claude reads, in what order, why the project is laid out the way it is, and where the hard boundaries are. You don't need any of this to work a ticket. It's here for when something behaves unexpectedly, when you want to add knowledge to the project, or when you're deciding which environment suits a given task.

---

### The knowledge surface

The project folder is a library, not a prompt. Exactly one file is loaded automatically at the start of every conversation: the root `CLAUDE.md`. Everything else — `references/`, `repos/`, `business-logic/`, `known-failures/`, `.claude/skills/`, `tickets/`, and the local `memories/` folder and `local/user.md` (your squad and pod) — is on disk waiting to be read when a specific question needs it.

The root `CLAUDE.md` is deliberately a map rather than a knowledge dump. It holds the things every investigation needs regardless of topic: the environment table, the Cosmos and Splunk account naming patterns, the QA-org id convention, the `## Repos` index, the investigation principles, and pointers to where everything else lives. It does not hold any repo's event documentation, business rules, or API routes. Those live in the repo's own folder and are read only once the conversation has resolved which repo is involved.

The reason for this split is cost and accuracy. Every file Claude reads consumes context and competes for attention with the evidence it's actually analyzing. If every repo's event documentation were loaded on every ticket, most of it would be irrelevant noise, the relevant parts would be harder to find, and the conversation would hit context limits sooner. Loading one map and following pointers from it keeps the irrelevant material out entirely.

This also means Claude is instructed **not** to search its way around the folder. The `## Repos` table exists so that "which repo is this about" is a single lookup in an already-loaded file. Claude is told never to run an exploratory sweep across `repos/` to find a repo whose name wasn't given, or to compensate for a manifest that seems thin. If a repo's `CLAUDE.md` genuinely doesn't have what's needed, that's a gap to flag and fix in the manifest — not a reason to start reading sibling repos.

Companion `README.md` files are the one exception to "everything is a library": they're never read during investigation at all. They hold human-facing description and history for whoever maintains the project. The machine-facing files are always `CLAUDE.md` and `SKILL.md`.

---

### Repo isolation

Each backend repository has its own folder under `repos/`, with the same internal shape:

```
repos/snowdrop-payers-api-be/
  CLAUDE.md         — the manifest: identity, streams, and a "where to look for more" list
  README.md         — maintenance notes only, never read during investigation
  references/       — Events.md, EventEnums.md, cosmos_query.md, blob_projections.md, *.Api.Dictionary.md, *.Api.json
  business-logic/   — confirmed rules, one folder per rule (not every repo has this yet)
  known-failures/   — confirmed defect patterns, one folder per pattern (not every repo has this yet)
```

The repo `CLAUDE.md` is the entry point. It states the repo's squad, pod, nickname, Kubernetes namespace, Cosmos database and container(s), the exact StreamId shape for every event stream, and then lists each file under `references/` with one line saying what question it answers. When Claude activates a repo, it reads this one file and nothing else — `references/`, `business-logic/`, and `known-failures/` are opened only when a specific question needs one of them. "What event deletes a contact point" opens `Events.md`. "What does enum value 3 mean" opens `EventEnums.md`, not the OpenAPI spec (the spec declares enums as bare integers). "What's the route for payer search" opens the `.Api.Dictionary.md`, and the full `.Api.json` only if the request/response schema is needed.

The isolation has an organizational purpose as well as a technical one. Each squad owns its repos' folders. Squad Herbert can add a business rule to `snowdrop-ledger-be/business-logic/` without touching anything Platform owns under `snowdrop-commandcenter-be/`, and neither change affects how the other squad's tickets get investigated. Cross-repo facts — things true no matter which repo you're looking from, like what the Nimbus system UserId means — go in the top-level `business-logic/` instead, and the index there labels each one as either genuinely cross-repo or temporarily parked because its repo doesn't have a folder yet.

The `## Repos` table in the root `CLAUDE.md` is what ties this together. It's the only place that maps a name you might say ("Payers", "snowdrop-payers-api-be", "remittance processing") to a folder, and it's what both `activate repo` and the ticket workflow's automatic repo inference resolve against. When a repo folder is added or its scope changes, that table is updated in the same change.

---

### Skills as the mechanism

A skill is a folder containing a `SKILL.md` file. The file has two parts: a short description at the top that tells Claude *when* to use it (the trigger phrases — "start a ticket for UF-XXXXX", "get events for", "check instana"), and a body that tells Claude *how* — the exact steps, the response shape, the known gotchas, and the things it must not do. When your message matches a skill's trigger, the body is loaded into the conversation and followed. Skills are not code; they're instructions, and they're written to be edited whenever a step proves wrong or incomplete.

This project's skills are: `ticket-workflow`, `cosmos-query`, `splunk-search`, `snowdrop-api-calls`, `instana-query`, `activate-repo`, `blob-projection-fetch`, `api-testing`, `era-builder`, and `logging-correlation`. The full inventory is in `.claude/skills/README.md`. Each skill stays narrow on purpose — `cosmos-query` knows how to build a StreamId query and run it, but defers to the repo's own `references/cosmos_query.md` for which streams exist and what their quirks are. `blob-projection-fetch` works the same way for blob downloads: it knows how to build and run the download, and defers to the repo's `references/blob_projections.md` for which projections exist and where they are stored. That keeps the skill stable while the per-repo knowledge grows.

Project skills are loaded directly from the project's `.claude/skills/` folder. There is nothing to package or save, and a pull from GitHub that changes a skill takes effect in the next session.

When a skill does not trigger, or behaves like an older version, look for a copy of the same skill in a second place. A folder with the same name in `~/.claude/skills/`, or an `anthropic-skills:{name}` entry saved to your Claude account, loads alongside the project copy and may be older. `upgrade project` finds these. It deletes folders only after your OK, and it tells you to delete account copies in the Claude settings yourself.

---

### The ticket folder as source of truth

A conversation's history lives only on your machine and isn't guaranteed to persist — sessions have been lost or truncated. If the chat transcript were the only record of an investigation, a lost session would mean redoing the work. So the record is a folder instead:

```
tickets/UF-12345/
  summary.md       — dated narrative log of what was found and decided
  downloads/       — raw evidence: Cosmos JSON exports, Splunk extracts, page captures, blob projections
  code-analysis/   — notes from the code side, created the first time they are needed
```

`summary.md` is written as prose, not a transcript. Each entry is dated and headed, describes what was checked, what it showed, and what was concluded, and cites evidence by filename in `downloads/` rather than pasting it inline. Entries are appended, never overwritten — a ticket that gets reopened gets a new entry on top of the old resolution, and the header's `Status` line changes to `Reopened`, so the history of the investigation's own thinking is preserved. The header also carries the ticket's `Category` (Diagnostics/Analysis, Speckit, or Feature), which determines which steps the workflow runs.

Claude logs to `summary.md` on its own at natural checkpoints — root cause confirmed, hypothesis ruled out, a decision made, a comment posted — and immediately when you say "log this for the ticket." When you resume a ticket in a new conversation, Claude reads `summary.md` (and `code-analysis/` if present) and recaps before doing anything, so both of you are re-grounded without relying on the old chat.

`downloads/` follows a strict naming discipline: every file gets a fresh name containing the environment, the entity id, a short description, and a timestamp. A ticket often accumulates several exports of the same entity across services, and the name is what tells them apart later.

The Jira comment is sourced from `summary.md`, not from chat memory. This is deliberate: a conversation can pass through a hypothesis that is later revised, and reconstructing from memory risks reintroducing it. The dated log reflects the final state.

**The write boundary.** Every session reads the entire ticket folder. Whichever session is working the ticket writes `summary.md` and `downloads/`, using the same log format and fresh-filename discipline. `code-analysis/` holds notes from code-side investigation and is created the first time there is something to put there. Work a ticket in one session at a time, because neither session sees the other's unsaved context and both append to `summary.md`. Keeping raw evidence in `downloads/` and analysis in `code-analysis/` also makes it clear at a glance which is which. When the Technical Summary for a Jira comment describes a fix, it cites the relevant `code-analysis/` file by name rather than re-deriving the fix.

---

### Environment configurations

The project runs in Claude Code, in the Code tab of the Claude app. A session starts from an **environment**, which fixes the folders the session works in. Three configurations are used (see *Getting Started* for how to create them):

- **Knowledge Focus:** this project's folder is primary, and the source folder is optionally attached. This is the quickest way to investigate: Claude answers from the knowledge base first and reads code as needed.
- **General Code Focus:** the source folder is primary and this project's folder is attached. Claude answers from the code first and uses the knowledge base for context.
- **Repository Focus:** one repository is primary and this project's folder is attached. This is where fixes are made: Claude can read and change source, build, run tests, and work with branches and commits.

The primary folder is the working directory, so git state, builds and relative paths belong to it. Additional folders are readable and editable but are not the working directory. By default Claude Code does not load an additional folder's `CLAUDE.md`, so each environment sets `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`. That is how the project's root `CLAUDE.md`, with its repo index and rules, loads when the project folder is an additional folder. All three configurations use the same skills and the same ticket folders.

Because the primary folder is set when a session starts, changing focus means starting a new session from a different environment. The ticket folder carries the work across: "log progress" in one session and "resume ticket UF-XXXXX" in the next (see *Getting Started*). Jira comments are drafted from `summary.md` and can be posted from any session.

The same new-session check runs in every environment. A ticket investigation reads best as its own conversation, but Claude cannot open a new session on your behalf. So before starting or resuming a ticket in a conversation that already has unrelated history, Claude asks whether you'd rather start fresh, and waits.

---

### Data-gathering surfaces

Five external systems supply evidence, and the source code adds the logic behind it. Each is reached a different way. Splunk and Instana are reached only through your browser with Claude for Chrome, and so are application pages. Cosmos, Blob Storage and the Snowdrop APIs are reached directly, with Azure tools or authenticated calls.

**Cosmos DB.** Each environment has one account, `king-{env}-sharp-be-cdb`, with identical databases and containers. The accounts are homed in a different Entra tenant (`sharedsvs.onmicrosoft.com`) than the company's. Claude queries them directly: with the Azure Cosmos tool in every environment except ninja, where no data-plane role is assigned, so it gets a read-only key with the Azure CLI and signs a REST request with it. If a call is denied, Data Explorer in the portal is the fallback: Claude opens it for the right account using a confirmed per-environment deeplink, hands you the SQL and an absolute download path as two separate copyable blocks, and reads the file from `downloads/` once you say it's there. Every event container is partitioned on `StreamId`, so the query is always an equality on it: `{namespace}->{organizationId}->{aggregate-type}->{entityId}`, with the exact shape taken from the repo's `CLAUDE.md` because three different conventions exist and the right one isn't predictable from the service's name. When Claude for Chrome is connected, Claude opens Data Explorer for the right account directly using a confirmed per-environment deeplink, then hands you the SQL and an absolute download path as two separate copyable blocks. Typing the query and downloading the result is left to you — the portal editor and the OS save dialog can't be driven reliably — and Claude reads the file from `downloads/` once you say it's there. Every event carries a `Metadata` envelope with `TraceId`, `UserId`, `CorrelationId`, and `TransactionId`, which is how a Cosmos event gets tied back to Splunk.

**Splunk.** Browser only, always. Claude builds the SPL, URL-encodes it into a search URL, navigates your authenticated Splunk tab to it, waits for the job, then pulls the full results as JSON from the search job's REST endpoint using the `sid` in the page URL — because the on-screen results table truncates long values and the page text extraction returns a help article instead of results. The index is `sharp-app-aks-{env}-king`, with one confirmed exception: the `exchange` environment's index uses the alias `exch`, and the wrong name returns zero events silently rather than an error. Trace ids live in three different fields depending on which component wrote the log line, so every trace query ORs all three. Investigations start with the cross-service TraceId pattern and fall back to business-key searches scoped to one namespace when the trace goes cold — some services' background consumers don't propagate trace ids at all, and the skill records which ones. QA organizations (ids starting `00000000-0000-`) can be cached whole into a local file, since they're small and never change; production orgs are never cached without explicit confirmation.

**Instana.** Also browser only — a single tenant covering all environments, navigated as Kubernetes → cluster → namespace → deployment. The dashboard is a client-rendered single-page app, so there's no JSON endpoint to pull from; tables and summary cards are read as page text, and charts are read from screenshots after waiting for the page to hydrate. The skill has every cluster id and every Herbert namespace id across the production clusters pre-recorded, and it folds in new deployment ids as they're resolved so repeat lookups get faster.

**Snowdrop APIs.** The services sit behind an nginx ingress with two different path patterns — some prefixed `/snowdrop/{service}/...` with the prefix rewritten away, others flat with no prefix — and which pattern a service uses isn't predictable from its name. The skill has the confirmed table, and the per-repo `.Api.Dictionary.md` files have every route. Authentication is a browser session cookie (`SharpAuth`/`SharpOrg`), not a bearer token, and the `SharpOrg` cookie is scoped to whichever org you logged into. A GET can be made by navigating the authenticated browser to the URL, or by a PowerShell script that makes the call with the cookie, which can be lifted from the logged-in browser if Claude for Chrome is connected.

**Blob Storage.** Many services store JSON projections of their entities in Azure Blob Storage. Each environment has three accounts — standard, premium, and feeschedule — in the Azure subscription `uf-kingdom - {Env}`, with names built by a fixed pattern (the `exchange` environment is the one exception, as with Splunk). Each repo's `references/blob_projections.md` lists its projections by the name people use for them, the account type that holds each, and the path template, container first. Claude resolves the entry and fills in the ids, but never infers a path for a projection with no entry. Blob storage is readable with your own Entra login, so Claude downloads with `az storage blob download --auth-mode login`. The Azure MCP storage tool is not used for the download because it returns blob properties only, not content. Account keys, SAS tokens, and connection strings are never used, and production blobs are read-only.

**Source code.** The source repositories are not part of this project. You attach the parent folder that contains them (one subfolder per repository, named as the repository) to your environment, or make a single repository the primary folder, and `upgrade project` records its path in `local/user.md`, which Claude reads when it needs source. Searches go inside a named repository's subfolder, because a sweep of the whole tree times out.

The reason none of these takes a shortcut is partly that the shortcuts don't exist — there's no working Splunk or Instana MCP — and partly that the browser path rides your own authenticated session, so Claude never holds credentials. No function keys, account keys, or cookies are stored anywhere in the project.

---

### Testing through the APIs

Besides reading evidence, the project can create it. Two skills do this, and both run from your signed-in browser tab through Claude for Chrome, so they use your session and Claude never holds credentials.

**`era-builder`** builds an ERA (X12 835) and uploads it to the Remittance ERA upload endpoint. The ERA is held as a small model in a JavaScript engine that runs inside the browser tab, so it can build ERAs with thousands of claims. Claims, payers, companies and patients can be filled from the target organization's real data, because a claim number that does not exist in the organization uploads but is not linked, and rules do not run on unlinked claims. The skill checks the result after upload, since an upload can report success and the remittance can still be discarded.

**`api-testing`** holds the rules for repeating a test through the deployed APIs, and the `API Tests/` folder holds one procedure per scenario. The split is deliberate. The skill carries what is the same for every test: non-production environments and organizations only, your approval before each write, reading existing state before changing anything (existing rules can change a result), reading results twice because read models lag, naming created data with the ticket key, and saving evidence in the ticket's `downloads/`. A procedure carries what is specific to one scenario: the background knowledge a Claude without source access needs, the API calls and bodies, the steps, the expected results, and sample data from a real run. If the two disagree, the skill's safety and approval rules win.

A procedure starts as a test run by hand for a ticket. The first, `API Tests/rule-sequence-order.md`, came from UF-16594: two rules (a reassignment and a transfer dispute) are created in a test organization, an ERA is uploaded, and the claim payment is read back to show that the reassignment ran before the dispute. A control run switches the reassignment rule off by changing a qualifier, and the dispute then appears, which shows the dispute rule would have fired if the order were wrong. Splunk lines from the same run are read through the same browser path as in an investigation. Every fact in a procedure is marked as confirmed (seen in a run), from code (read in the source), or inferred.

---

### The investigation-principles logic

When the event history says something should have happened and it didn't, there is a specific order of checks before anything is called a bug:

1. **Resolve the repo(s)** involved, from the `## Repos` table or by asking.
2. **Check that repo's `business-logic/`** (and the top-level `business-logic/` for cross-repo facts). If a documented rule explains the result exactly as the system is configured, that's expected behavior — the conclusion is "working as designed," and the Jira comment says so.
3. **Only if the rules don't explain it** — every documented condition was met and the effect still didn't land — **check `known-failures/`** for a confirmed defect matching the pattern.
4. **Only if neither matches** is the conclusion "no explanation on file yet." That's a real finding — it means either a new rule nobody has written down, or a new defect — and it's the point at which your judgment decides which.

The order matters because the two wrong conclusions have different costs. Calling a working-as-designed result a bug sends an engineer into code that isn't broken and tells a customer something false. Calling a defect "expected" leaves it in production. Checking rules first catches the more common case (the system did what it was told; the ticket's expectation was wrong) and leaves the rarer case properly isolated.

A related principle: changing a published event's shape or meaning is a last resort, not a routine fix. Events are consumed by other services and other teams, outside the producing team's visibility. Any proposal to alter one needs an explicit impact assessment and consumer sign-off, and read-side fixes are exhausted first.

---

### Memory and the feedback loop

Corrections made during a ticket are supposed to survive it. There are three places a correction can land, and which one depends on what kind of fact it is:

**A business rule.** When you tell Claude "no — that modifier comes from the payer's 835, not the original invoice," and that's a standing truth about how the system works, Claude will suggest recording it. On "that is a business rule, add it," a folder is created under the relevant repo's `business-logic/` (or the top-level one if it's cross-repo) with a `CLAUDE.md` stating the fact, its scope, when it was confirmed, and how to apply it. The repo's `business-logic/CLAUDE.md` index gets a line. Next time a ticket touches that behavior, step 2 above finds it.

**A known failure.** At the end of a diagnostic ticket where the system was genuinely wrong, "record this as a known failure" writes the confirmed pattern under `known-failures/` — with the event types, Splunk signatures, and ids already gathered — so the next occurrence is recognized in step 3 rather than re-diagnosed.

**A memory.** Smaller operational facts — "the `exchange` env's Splunk index is `exch`," "Data Explorer on `blue` lands on Overview and needs a click" — are recorded as a memory, and the relevant skill is updated in the same turn. Three similar-sounding things are easy to confuse, so they are kept separate:

- **App memory** is Claude's own per-user store, kept by the Claude app or Claude Code outside the project folder. It is not part of the project.
- **The project's `memories/` folder** holds memories local to your instance of the project, one file per memory plus an index. Git ignores it, so nothing in it is committed, and a new instance created from GitHub starts with it empty.
- **`references/`** holds published, tracked lookup material (event documentation, API dictionaries, shared tables). It is not edited in place. A memory worth sharing is promoted by writing it into a tracked location such as a reference, a business rule, a known failure, or a skill.

In practice most corrections also end up as an edit to a skill, because the skill is where the step that went wrong is written. Several passages in the current skills are dated notes of exactly this kind: a failure that happened on a specific ticket, what the right behavior was, and the rule that prevents it recurring. That's the intended way the project improves — not a periodic review, but each ticket leaving the next one slightly better instructed.

---

### Environments and safety rails

Eleven environments share identical infrastructure, differing only by name:

| Tier | Environments |
|---|---|
| dev | `ninja` |
| QA | `team` |
| release | `one` |
| hotfix release | `exchange` (alias `exch` — used in the Splunk index name and in two of the three blob account names, but not in the Cosmos account) |
| production | `cloud`, `app`, `care`, `space`, `uno`, `blue`, `live` |

`prod` is a grouping label for the production tier, not an environment of its own. Every account and index name derives from the environment name by a fixed pattern — `king-{env}-sharp-be-cdb`, `sharp-app-aks-{env}-king`, `king{env}feeschedulesstg` — so once the environment is known, the right account is known. Claude extracts the environment from any application URL you paste (`sdsh.unlimitedfinancials.{env}/...`) along with the organization and entity ids in the path, so you don't restate them.

Within any environment, an `organizationId` beginning `00000000-0000-` is a QA/test organization; real customer organizations never use that prefix. This is what lets Claude filter QA noise out of a production query, or confirm that caching an org's whole Splunk history is safe.

Three rails apply to production environments specifically. Read-only queries — `SELECT` in Cosmos, any Splunk search, any GET — are fine. Any write, delete, update, or upsert against a production environment must be explicitly confirmed with you before it runs, every time, and approval for one environment never carries to another: confirming a change in `team` says nothing about `cloud`. And `CONTAINS()` on `StreamId` — which forces a scan across every partition — is never run against production once a real StreamId shape is known.

Two rails apply everywhere. GUIDs and other ids are always shown in full, never abbreviated, because a truncated id can't be pasted back into Cosmos or Splunk or matched against another system. And a file path handed to you is never allowed to contain a literal placeholder like `{timestamp}` or `{TICKET-ID}` — Claude computes the real value fresh every time. Echoing the documentation's own placeholder notation into a real path has happened before, and the skills call it out as something to check before sending.
