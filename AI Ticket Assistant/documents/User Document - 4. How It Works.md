# Unlimited Financials AI Ticket Assistant
## How It Works

---

This document explains the mechanics underneath the commands in *How to Use*: what Claude reads, in what order, why the project is laid out the way it is, and where the hard boundaries are. You don't need any of this to work a ticket. It's here for when something behaves unexpectedly, when you want to add knowledge to the project, or when you're deciding whether a given task belongs in Cowork or Claude Code.

---

### The knowledge surface

The project folder is a library, not a prompt. Exactly one file is loaded automatically at the start of every conversation: the root `CLAUDE.md`. Everything else — `references/`, `repos/`, `business-logic/`, `known-failures/`, `skills/`, `tickets/`, and the local `memories/` folder and `local/user.md` (your squad and pod) — is on disk waiting to be read when a specific question needs it.

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

This project's skills are: `ticket-workflow`, `cosmos-query`, `splunk-search`, `snowdrop-api-calls`, `instana-query`, `activate-repo`, `initiate-project` (Cowork only), and `blob-projection-fetch` (which works on both platforms, with a different role on each). Every skill listed in `skills/README.md` is installed the same way, as described below. Each skill stays narrow on purpose — `cosmos-query` knows how to build a StreamId query and open Data Explorer, but defers to the repo's own `references/cosmos_query.md` for which streams exist and what their quirks are. `blob-projection-fetch` works the same way for blob downloads: it knows how to build the download and hand it off, and defers to the repo's `references/blob_projections.md` for which projections exist and where they are stored. That keeps the skill stable while the per-repo knowledge grows.

There is a distinction between a skill's **source** and its **installed** copy that matters when something doesn't trigger:

- **Source** — the folder under this project's `skills/`. This is the version under source control, the one that gets edited and pulled from GitHub. On its own it does nothing; Claude doesn't read `skills/` during investigation.
- **Installed** — skills are installed only through Cowork. `initiate project` packages each skill as a `.skill` card, and saving the card installs the skill into your Claude account. Account skills load in both Cowork and Claude Code (desktop app) as `anthropic-skills:{name}`, so one saved card serves both products. A folder with the same name in `~/.claude/skills/` loads as a duplicate and may be older, so setup lists those for removal.

The installed copy doesn't sync with the source. After pulling an update from GitHub that changes a skill, the card needs to be re-packaged and re-saved. Running `initiate project` in Cowork re-presents the cards; saving them updates both Cowork and Claude Code. When a skill misbehaves, the first thing to check is whether the saved card is out of date or a duplicate copy in `~/.claude/skills/` has drifted from the source.

---

### The ticket folder as source of truth

Cowork's conversation history lives only on your machine and isn't guaranteed to persist — sessions have been lost or truncated. If the chat transcript were the only record of an investigation, a lost session would mean redoing the work. So the record is a folder instead:

```
tickets/UF-12345/
  summary.md       — dated narrative log of what was found and decided
  downloads/       — raw evidence: Cosmos JSON exports, Splunk extracts, page captures, blob projections
  code-analysis/   — Claude Code's notes from the code side (created by Claude Code, not Cowork)
```

`summary.md` is written as prose, not a transcript. Each entry is dated and headed, describes what was checked, what it showed, and what was concluded, and cites evidence by filename in `downloads/` rather than pasting it inline. Entries are appended, never overwritten — a ticket that gets reopened gets a new entry on top of the old resolution, and the header's `Status` line changes to `Reopened`, so the history of the investigation's own thinking is preserved. The header also carries the ticket's `Category` (Diagnostics/Analysis, Speckit, or Feature), which determines which steps the workflow runs.

Claude logs to `summary.md` on its own at natural checkpoints — root cause confirmed, hypothesis ruled out, a decision made, a comment posted — and immediately when you say "log this for the ticket." When you resume a ticket in a new conversation, Claude reads `summary.md` (and `code-analysis/` if present) and recaps before doing anything, so both of you are re-grounded without relying on the old chat.

`downloads/` follows a strict naming discipline: every file gets a fresh name containing the environment, the entity id, a short description, and a timestamp. Two things drive this. One is that the sandbox's filesystem layer can pin the first-seen size of a file, so re-saving over an existing name can read back stale content. The other is that a ticket often accumulates several exports of the same entity across services, and the name is what tells them apart later.

The Jira comment is sourced from `summary.md`, not from chat memory. This is deliberate: a conversation can pass through a hypothesis that is later revised, and reconstructing from memory risks reintroducing it. The dated log reflects the final state.

**The write boundary.** Both Cowork and Claude Code read the entire ticket folder. Either platform writes `summary.md` and `downloads/`, whichever one is working the ticket, using the same log format and fresh-filename discipline. Only Claude Code writes `code-analysis/`; Cowork never writes into it or pre-creates it, and Claude Code creates it the first time it has something to put there. Claude Code also saves fetched evidence that only it can reach, such as blob projections fetched with `blob-projection-fetch`, into `downloads/`. Work a ticket in one platform at a time, because neither session sees the other's unsaved context and both append to `summary.md`. Keeping raw evidence in `downloads/` and analysis in `code-analysis/` also makes it clear at a glance which is which. When Cowork drafts the Technical Summary for a Jira comment and a fix was made, it cites the relevant `code-analysis/` file by name rather than re-deriving the fix.

---

### Cowork vs. Claude Code

The two platforms have different capabilities, and the workflow is built around the split rather than pretending it doesn't exist.

**Cowork** has the connectors: Jira (reading tickets, posting comments) and Claude for Chrome (navigating to pages, reading rendered content, running Splunk searches, opening Data Explorer, reading Instana dashboards). It also has this project folder mounted, so it can read and write ticket folders and the knowledge library. It can read the service's source code from the source folder attached to the project, but its sandbox cannot reach Azure endpoints at all. Cowork is where evidence is gathered and interpreted.

**Claude Code** is usually started inside a repository checkout. It can read and change source, build, run tests, and trace a stack frame to a line. It has full Jira access as well, but it doesn't drive the browser. Started in a source repository on its own, it has no awareness that this project exists or that the repo has curated knowledge somewhere else on disk, unless you attach this project's folder (see *Getting Started*). Claude Code is where fixes are made and code-level analysis is done.

Either platform can post to Jira. The convention in this workflow is to post from Cowork, so there is one consistent path from `summary.md` to the ticket and the comment is sourced from the folder rather than from whichever conversation happened to be open. That's a preference for consistency, not a capability limit — if you're already in Claude Code and want to post from there, nothing prevents it.

Claude Code started in this project folder loads the same root `CLAUDE.md` and the same skills as Cowork, so no bridging skill is needed. "Resume ticket UF-XXXXX" in Claude Code reads the ticket's `summary.md` and `downloads/` and recaps, so it starts from the evidence already gathered rather than cold. Anything it writes for code analysis goes into `code-analysis/`.

Cowork cannot start or message Claude Code, so any task only Claude Code can do needs a manual hand-off. Fetching a blob projection is the worked example. The `blob-projection-fetch` skill has Cowork do all the resolving — which repo, which storage account, container, blob path, and an absolute save path in the ticket's `downloads/` — and output a self-contained block you paste into Claude Code. The block carries every value needed, so it works in a Claude Code session that isn't attached to this project. Claude Code only has to download and save. Once you say it's saved, Cowork reads the file from `downloads/`.

The hand-off in the other direction needs no step at all. Anything Claude Code writes to `code-analysis/` is a plain file in the project folder, and Cowork reads it the next time the ticket is resumed. "Flush anything outstanding to the ticket folder" on the Cowork side just makes sure `summary.md` and `downloads/` are current before you switch.

The same new-session check runs on both platforms. A ticket investigation reads best as its own conversation, but neither platform can open a new session on your behalf — so before starting or resuming a ticket in a conversation that already has unrelated history, Claude asks whether you'd rather start fresh, and waits.

---

### Data-gathering surfaces

Five external systems supply evidence, and the source code adds the logic behind it. Each is reached a different way, and none of them is reached through a shortcut from Claude's sandbox. The sandbox is isolated — it cannot reach Azure, Splunk, Instana, or the service ingresses — so every path either goes through your browser via Claude for Chrome, hands you something to run yourself, or hands a block to Claude Code.

**Cosmos DB.** Each environment has one account, `king-{env}-sharp-be-cdb`, with identical databases and containers. The accounts are homed in a different Entra tenant (`sharedsvs.onmicrosoft.com`) than the company's, which is why `az login` tokens from your identity are rejected and why Data Explorer in the portal works anyway — it uses the account key under the hood. Every event container is partitioned on `StreamId`, so the query is always an equality on it: `{namespace}->{organizationId}->{aggregate-type}->{entityId}`, with the exact shape taken from the repo's `CLAUDE.md` because three different conventions exist and the right one isn't predictable from the service's name. When Claude for Chrome is connected, Claude opens Data Explorer for the right account directly using a confirmed per-environment deeplink, then hands you the SQL and an absolute download path as two separate copyable blocks. Typing the query and downloading the result is left to you — the portal editor and the OS save dialog can't be driven reliably — and Claude reads the file from `downloads/` once you say it's there. Every event carries a `Metadata` envelope with `TraceId`, `UserId`, `CorrelationId`, and `TransactionId`, which is how a Cosmos event gets tied back to Splunk.

**Splunk.** Browser only, always. Claude builds the SPL, URL-encodes it into a search URL, navigates your authenticated Splunk tab to it, waits for the job, then pulls the full results as JSON from the search job's REST endpoint using the `sid` in the page URL — because the on-screen results table truncates long values and the page text extraction returns a help article instead of results. The index is `sharp-app-aks-{env}-king`, with one confirmed exception: the `exchange` environment's index uses the alias `exch`, and the wrong name returns zero events silently rather than an error. Trace ids live in three different fields depending on which component wrote the log line, so every trace query ORs all three. Investigations start with the cross-service TraceId pattern and fall back to business-key searches scoped to one namespace when the trace goes cold — some services' background consumers don't propagate trace ids at all, and the skill records which ones. QA organizations (ids starting `00000000-0000-`) can be cached whole into a local file, since they're small and never change; production orgs are never cached without explicit confirmation.

**Instana.** Also browser only — a single tenant covering all environments, navigated as Kubernetes → cluster → namespace → deployment. The dashboard is a client-rendered single-page app, so there's no JSON endpoint to pull from; tables and summary cards are read as page text, and charts are read from screenshots after waiting for the page to hydrate. The skill has every cluster id and every Herbert namespace id across the production clusters pre-recorded, and it folds in new deployment ids as they're resolved so repeat lookups get faster.

**Snowdrop APIs.** The services sit behind an nginx ingress with two different path patterns — some prefixed `/snowdrop/{service}/...` with the prefix rewritten away, others flat with no prefix — and which pattern a service uses isn't predictable from its name. The skill has the confirmed table, and the per-repo `.Api.Dictionary.md` files have every route. Authentication is a browser session cookie (`SharpAuth`/`SharpOrg`), not a bearer token, and the `SharpOrg` cookie is scoped to whichever org you logged into. In Cowork, a GET is usually just navigating the authenticated browser to the URL. In Claude Code, a PowerShell script makes the call with the cookie, which can be lifted from the logged-in browser if Claude for Chrome is connected.

**Blob Storage.** Many services store JSON projections of their entities in Azure Blob Storage. Each environment has three accounts — standard, premium, and feeschedule — in the Azure subscription `uf-kingdom - {Env}`, with names built by a fixed pattern (the `exchange` environment is the one exception, as with Splunk). Each repo's `references/blob_projections.md` lists its projections by the name people use for them, the account type that holds each, and the path template, container first. Claude resolves the entry and fills in the ids, but never infers a path for a projection with no entry. Unlike Cosmos, blob storage is readable with your own Entra login, so Claude Code downloads with `az storage blob download --auth-mode login`. The Azure MCP storage tool is not used for the download because it returns blob properties only, not content. Account keys, SAS tokens, and connection strings are never used, and production blobs are read-only.

**Source code.** The source repositories are not part of this project. You attach the parent folder that contains them (one subfolder per repository, named as the repository) in the Cowork project settings, and `initiate project` records its path in `local/user.md`. Cowork reads source through the attachment; Claude Code reads it at the recorded path. Only Claude Code can build or run tests. Searches go inside a named repository's subfolder, because a sweep of the whole tree times out.

The reason none of these takes a shortcut is partly that the shortcuts don't exist — there's no working Splunk or Instana MCP, the sandbox has no network path to Azure — and partly that the browser path rides your own authenticated session, so Claude never holds credentials. No function keys, account keys, or cookies are stored anywhere in the project.

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
