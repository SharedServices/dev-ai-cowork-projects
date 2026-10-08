# Unlimited Financials AI Ticket Assistant
## How to Use

---

### Commands are the smaller part

This document lists the standard commands and actions this project recognizes — start a ticket, activate a repo, get events, search Splunk, draft a comment. Those phrases exist so the recurring mechanical steps behave the same way every time: the right folder gets created, the right Cosmos account opens, the download lands in the right place, the Jira comment has the right two sections.

They are not the main way the project gets used. Most of a ticket is ordinary conversation, and that is where the value is. The work goes well when two different kinds of knowledge are combined:

- **Yours** — how the system actually behaves, what the customer is really describing, which parts of a ticket are noise, what "should" have happened, and when a result is a defect versus a rule working as designed. Claude does not have this and cannot infer it reliably from data alone.
- **Claude's** — reading several hundred events or log lines without losing track, stitching Cosmos and Splunk into one timeline, noticing an anomaly three events away from the one you asked about, and recalling what is already on file in this project: event documentation, API routes, business rules, known failures, and prior tickets.

You direct the investigation. Ask a question, look at the answer, and steer: "that's not what I expected — what did the event before it say?", "ignore the fee schedule events, I only care about contact points", "what would the API return for this payer right now?", "have we seen this pattern before?", "no, that field comes from the payer's 835, not the invoice." Claude pulls evidence, proposes an interpretation, and tells you plainly when it does not have enough to conclude. When you correct it, the correction can be recorded as a business rule or a known failure so the next ticket starts from there.

Neither side gets to a root cause alone. The commands below are entry points into that conversation, not a substitute for it.

---

*Note: Some of these example commands are more verbose than Claude needs. They are worded for your understanding, not Claude's.*  

### Example ticket commands
- *Start/Resume Ticket UF-12345*
- *Draft a comment to post this conclusion to the Jira ticket*  
- *post it*
- *Flush anything outstanding to the ticket folder for Claude Code for further investigation*

### Example data collection commands
- *activate the repo payers*  
- *collect the event stream for this payer and summarize the timeline*
- *check the Splunk logs for this payer and show a consolidated timeline*
- *call the API to get all payers*
- *fetch the remittance projection from remittance processing blob storage*

### Example investigation commands
- *what information is needed to determine root cause?*
- *does this match what we know of denial rules behavior?*
- *what event is used to delete a policy from a payer?*
- *what is its stream id?*
- *what API would get all of the payers policies?*
- *call that API*
- *have we seen this before?*

### Fixing Claude
- *No, that's not right. blah blah blah is how that works.*  
  Be sure you're right! Claude will generally suggest adding it as a new business rule.
  If it doesn't, just ask.
- *That is a business rule, add it*
- *Record this as a known failure*  
  Use this at the end of a diagnostic ticket where you found that the system did something wrong.
  Claude records the event and Splunk details it has gathered so recurrences can be identified.
  
### Sample conversation

A Diagnostics ticket in the `space` production environment: a customer reports that a payer's phone number "changed on its own." The ids below are illustrative. Claude's responses are summarized, with the parts you will actually copy or act on shown as they would appear.

---

*start ticket UF-12345*

- If the conversation already has unrelated history, Claude first asks "Did you want to start a new session for this ticket?" and waits. In a fresh conversation it skips this.
- Creates `tickets/UF-12345/` and `tickets/UF-12345/downloads/`, pulls the ticket from Jira, and summarizes it in a few sentences: who reported it, what they say happened, what they expected, and which org/payer/environment the description or screenshots name.
- Proposes a category as a single confirmation, not an open question:
  > Reading this as **Diagnostics/Analysis** — a reported symptom with no fix stated. Confirm, or is it Feature/Speckit?
- On your confirmation, writes the initial `summary.md` (title, Jira link, category, status) and gives you the clickable Jira link.
- Scans the description and comments for application links (`sd.unlimitedfinancials.*` only — `api.` links, PR links, and mailto links are dropped). Lists what it found and asks which to capture:
  > Two application links on the ticket:
  > 1. Payer profile — `https://sd.unlimitedfinancials.space/e5b8461b-d2c1-41ec-8fad-f01898850707/payers/payer/a48f60ab-4971-441c-a172-faccf7511915`
  > 2. Payer contact points tab — same payer, `/contacts`
  >
  > Capture 1, 2, or skip?
- Navigates your browser to the one you pick. If the tab redirects to `hello.unlimited.systems`, it stops and says "Login is now showing, please login," then retries on the same tab once you say you're in.
- Saves the page text to `downloads/space_a48f60ab-4971-441c-a172-faccf7511915_payer-page-capture_20261001T141203Z.md` and reports the keys it now has:
  > Captured. Environment **space**, organization `e5b8461b-d2c1-41ec-8fad-f01898850707`, payer `a48f60ab-4971-441c-a172-faccf7511915` (Aetna, Factory ID 13385). Current phone on the page is 800-555-0142. The ticket says it should be 800-555-0199.
- Mentions once that you may want to rename the conversation to the ticket id. Not required — the folder carries continuity.

---

*get events for that payer*

- Resolves this to the Payers repo from the `## Repos` table and reads `repos/snowdrop-payers-api-be/CLAUDE.md` (if a repo was already activated, it uses that). From there it knows the database is `snowdrop-payers`, the container is `snowdrop-payers-events`, and the stream shape is `Snowdrop.Payers->{OrganizationId}->Snowdrop.Payers.Payer->{PayerId}`.
- Navigates your browser directly to `king-space-sharp-be-cdb`'s Data Explorer using the confirmed deeplink for `space`. The tab stays open until you say the download is done.
- Hands over the query and the save path as two separate copyable blocks, nothing else inside either:
  > I've opened Data Explorer for `king-space-sharp-be-cdb`. Database `snowdrop-payers`, container `snowdrop-payers-events`. Paste this into the query tab:
  >
  > ```sql
  > SELECT * FROM c
  > WHERE c.StreamId = "Snowdrop.Payers->e5b8461b-d2c1-41ec-8fad-f01898850707->Snowdrop.Payers.Payer->a48f60ab-4971-441c-a172-faccf7511915"
  > ORDER BY c.EventNumber ASC
  > ```
  >
  > Run it, then **Download Query Results (JSON)** into:
  >
  > ```
  > C:\Users\jsmith\Claude\Projects\AI Ticket Assistant\tickets\UF-12345\downloads\space_payer_a48f60ab-4971-441c-a172-faccf7511915_20261001-141530.json
  > ```
  >
  > Tell me once it's downloaded.
- The path is always absolute and always has a fresh timestamp — it is meant to be pasted whole into the Save As dialog. You don't need to repeat the filename back; Claude already has it.

---

*the events are downloaded, give me a timeline of what happened on this payer*

- Reads the JSON from `downloads/`, reports the count and span ("47 events, 2024-03-11 to 2026-09-28"), and lays out a table: event number, UTC timestamp, event type, the relevant `Data` fields, and the `SourceMetadata.UserId`.
- Flags what it noticed without being asked:
  > Three `PayerContactPointUpdated` events touch contact point `9c1d4e7a-2b3f-4d8e-a1c5-6f7e8d9a0b1c` (type Phone):
  >
  > | # | ts (UTC) | Event | Phone | UserId |
  > |---|---|---|---|---|
  > | 31 | 2026-09-24 15:02:11 | PayerContactPointUpdated | 800-555-0142 | `3f2a9c14-7d6b-4e5f-9a8b-1c2d3e4f5a6b` |
  > | 32 | 2026-09-24 15:02:40 | PayerContactPointCollectionOrderUpdated | — | `3f2a9c14-7d6b-4e5f-9a8b-1c2d3e4f5a6b` |
  > | 38 | 2026-09-26 13:47:55 | PayerContactPointUpdated | 800-555-0199 | `3f2a9c14-7d6b-4e5f-9a8b-1c2d3e4f5a6b` |
  >
  > Event 38 sets the number the ticket says is "correct." Event 31, two days earlier, set the one the customer saw. Same UserId on all three — a real user, not the Nimbus system id `daeb914f-1df3-470f-9637-0dae563aa034`. No automated process touched contact points in this stream. Each event also carries its own `Metadata.TraceId`, which we can use in Splunk.
- Appends a dated entry to `summary.md` citing the download by filename. It does this at checkpoints like this one on its own; you can also say "log this for the ticket" at any point.

---

*query splunk for this payer around the time of any contact info changes and give me a consolidated single timeline*

- Takes the `Metadata.TraceId` from events 31 and 38 and runs the cross-service trace pattern first, in your browser against `sharp-app-aks-space-king` — all three trace fields OR'd, no namespace filter, so any hop into another service shows up. Says plainly if it comes back empty (trace-id coverage in `space` is not confirmed for every namespace) and then falls back to the business key: `namespace="snowdrop-payers" Properties.metadata.EntityId="a48f60ab-4971-441c-a172-faccf7511915"` in a window around each event.
- Pulls results through the search job's JSON endpoint rather than the on-screen table (the table truncates long values), and keeps to `MessageTemplate` plus a short allow-list of properties, so nothing trips the content filter.
- Merges Cosmos events and Splunk lines into one timeline ordered by timestamp, labelling the source of each row:
  > | ts (UTC) | Source | What |
  > |---|---|---|
  > | 2026-09-24 15:02:09 | Splunk `snowdrop-payer-api` | `PUT /payers/{payerId}/contact-points/{id}` — RequestLoggingFilter Handled in 184ms, TraceId `4a1f0b9e3c7d2e8f6b5a4c3d2e1f0a9b` |
  > | 2026-09-24 15:02:11 | Cosmos #31 | `PayerContactPointUpdated` → 800-555-0142, UserId `3f2a9c14-7d6b-4e5f-9a8b-1c2d3e4f5a6b` |
  > | 2026-09-26 13:47:53 | Splunk `snowdrop-payer-api` | `PUT /payers/{payerId}/contact-points/{id}` — Handled in 171ms, TraceId `b7c2d3e4f5a60718293a4b5c6d7e8f90` |
  > | 2026-09-26 13:47:55 | Cosmos #38 | `PayerContactPointUpdated` → 800-555-0199, same UserId |
  >
  > Both writes came in as ordinary authenticated PUT requests from the Payers API and completed successfully. No errors, warnings, or background-consumer activity against this payer in the window. Nothing in Ledger or Remittance Processing reacted to these events, which is expected — contact points don't propagate.
- States what it can and can't conclude: the data shows two deliberate user edits by the same account; it cannot tell you *why* the user made the first one.

---

*it appears a user did change the phone number and then changed it back 2 days later. That is the issue.*

- Agrees that the evidence supports it and says what it checked before agreeing: there is no business rule on file for payer contact points under `repos/snowdrop-payers-api-be/business-logic/` or the top-level `business-logic/`, and nothing matching under `known-failures/`. So this is user action, not a defect and not a known pattern.
- Asks one question rather than assuming:
  > Should I resolve the ticket as "not a system defect — user edit," or do you want to look up who `3f2a9c14-7d6b-4e5f-9a8b-1c2d3e4f5a6b` is first?
- Logs the conclusion to `summary.md` as a root-cause entry.

---

*draft a comment for the jira ticket explaining that. Be sure to include the times and the user id*

- Drafts one comment with two headed sections, sourced from `summary.md` rather than chat memory, and shows it to you before anything is posted:
  > **Summary:** **Not a Defect** — payer phone number was changed by a user and changed back; no system fault.
  >
  > **Business Summary**
  >
  > We investigated the report that the Aetna payer's phone number changed unexpectedly. The record shows the number was changed by a user in your organization on September 24, 2026 at 3:02 PM UTC, and changed back by the same user on September 26, 2026 at 1:47 PM UTC. Both changes were made through the normal payer edit screen. No automated process modified this payer. **Conclusion: this is not a system defect.** The current value matches what the ticket describes as correct.
  >
  > **Technical Summary**
  >
  > Payer `a48f60ab-4971-441c-a172-faccf7511915`, organization `e5b8461b-d2c1-41ec-8fad-f01898850707`, environment space. Cosmos stream `Snowdrop.Payers->e5b8461b-d2c1-41ec-8fad-f01898850707->Snowdrop.Payers.Payer->a48f60ab-4971-441c-a172-faccf7511915`, events 31 (2026-09-24T15:02:11Z, `PayerContactPointUpdated` → 800-555-0142) and 38 (2026-09-26T13:47:55Z, `PayerContactPointUpdated` → 800-555-0199), both with `SourceMetadata.UserId` `3f2a9c14-7d6b-4e5f-9a8b-1c2d3e4f5a6b`. Splunk (`sharp-app-aks-space-king`, namespace `snowdrop-payers`) shows the matching `PUT /payers/{payerId}/contact-points/{id}` requests completing successfully at 15:02:09Z (TraceId `4a1f0b9e3c7d2e8f6b5a4c3d2e1f0a9b`) and 13:47:53Z (TraceId `b7c2d3e4f5a60718293a4b5c6d7e8f90`). No errors, no consumer activity, no code change required.
  >
  > Post this, or adjust anything first?
- If you ask for edits ("drop the Factory ID", "say 'a user' not 'a user in your organization'"), it revises and shows the draft again. Nothing goes to Jira until you say so.

---

*post it*

- Posts the single comment to UF-12345 and reports back the comment id and link.
- Appends a dated entry to `summary.md` noting the comment was posted, and asks whether to close the ticket (which sets the `summary.md` status to Resolved — the folder and its downloads stay in place for later).

### Commands / Actions

*The lead-in phrases below are what trigger each behavior. Wording can vary a little — these are the recognized patterns, not the only exact words that work.*

#### Project & repo setup

##### upgrade project
- *upgrade project* / *initiate project* / *set up this project* / *onboard me* / *first-time setup*
- Cowork and Claude Code. Sets up a fresh copy of this project and brings it up to date after a pull. In Cowork: asks for and records your squad and pod, and the location of the attached source folder (warning if none is attached), packages the skills as cards to save (they then load in Cowork and Claude Code), and smoke-tests Claude for Chrome and Splunk access. In Claude Code: runs the one-time cleanups that apply to Code, such as removing personal copies of the skills. Each platform records the project version it last upgraded to and says when to run it on the other.

##### activate repo
- *activate repo {name}*
- *activate repo {name} and {name}*
- *activate repos for all squad {squad name} repos*
- *activate repos for all pod {pod name} repos* (primary pod only)
- Sets the investigation scope to one or more repo folders under `repos/`, matched by folder name or nickname from the `## Repos` table in the root `CLAUDE.md`.
- Activations accumulate for the rest of the session — activating another repo adds it to scope, it does not replace the repo(s) already active.

#### Ticket workflow

##### start a ticket
- *start a ticket for UF-XXXXX*, or simply beginning sustained investigation on a ticket number with no folder yet
- Creates `tickets/{TICKET-ID}/`, pulls the Jira ticket's title/status/description, confirms the ticket's category (Diagnostics/Analysis, Speckit, or Feature), and writes the initial `summary.md`.

##### resume a ticket
- *resume/continue work on UF-XXXXX*, or naming a ticket number that already has a folder
- Reads `summary.md` (and `code-analysis/` if present), recaps status/category/last entry, and checks whether Jira shows any status change since. Works the same in Cowork and in Claude Code started in this project.

##### log progress
- *log this for the ticket* / *summarize this for the ticket*
- Appends a dated entry to `summary.md` describing what was found or decided. Happens automatically at natural checkpoints too (root cause confirmed, hypothesis ruled out, a comment posted).

##### close a ticket
- *the ticket is resolved* / *close out UF-XXXXX*
- Appends a final dated entry and updates the `summary.md` status line to Resolved.

##### draft a Jira comment
- *draft a comment to post this conclusion to the jira ticket* / *comments for the jira ticket*
- Drafts one Jira comment that opens with a one-line Summary (an outcome label such as Resolved, Known Issue, or Not a Defect, plus a few words on the finding), followed by a Business Summary (plain language, customer-facing) and a Technical Summary (investigation trail, root cause, fix). Only posts once you confirm.

##### post it
- *post it*
- Posts the previously drafted Jira comment, once you've approved it.

##### flush to Claude Code
- *flush anything outstanding to the ticket folder for Claude Code for further investigation*
- Writes any outstanding findings into the ticket's `summary.md`/`downloads/` so a Claude Code session can pick up code-level analysis via "resume ticket UF-XXXXX."

#### Data collection — Cosmos DB

##### query cosmos
- *query cosmos* / *look in cosmos* / *cosmos query* / *data explorer* / *find this remittance/org in cosmos*, or pasting a `sdsh.unlimitedfinancials.{env}/...` remittance URL. *get events for that payer* (or any entity) follows the same path.
- Cosmos can't be reached from Claude's sandbox, so this is always a hand-off — Claude prepares everything and (when Claude for Chrome is connected) opens the browser to the right place for you. Standard steps:
  1. Claude navigates your browser directly to that environment's Cosmos account in the Azure portal, landing on Data Explorer — no searching for the right account yourself. (If Claude for Chrome isn't connected, or that environment's account details aren't confirmed yet, Claude falls back to just giving you the URL to open yourself.)
  2. Paste in the Cosmos query Claude supplied, and run it.
  3. Click Download Query Results (JSON).
  4. Save using the exact file path Claude supplied.
  5. Tell Claude once it's downloaded — not the filename, just that it's done. Claude already gave you the path, and will read from there (or look for whatever new file shows up, if you saved under a different name).
  - The browser tab Claude opened stays open until you confirm the download — it won't get closed out from under you mid-task.

#### Data collection — Blob storage

##### fetch a blob projection
- *fetch the remittance projection from remittance processing blob storage* / *get the {name} projection* / *blob projection*
- Many services store a JSON snapshot ("projection") of an entity in Azure Blob Storage. Claude in Cowork cannot reach Azure and cannot trigger Claude Code, so this is a hand-off through a paste block:
  1. Claude looks the projection up in the repo's `references/blob_projections.md`, works out the storage account, container, blob path, and an absolute save path in the active ticket's `downloads/` (or `scratch/` if no ticket is active), and gives you one copyable block starting with `fetch blob projection`. The environment and ids come from the ticket or a pasted application URL; Claude asks only for what is missing.
  2. Paste the block into Claude Code. It downloads the blob read-only with `az storage blob download --auth-mode login` and saves it to the path in the block. Claude Code reports the path, size, and top-level fields, and does not print the contents. This needs the Azure CLI (`az`) installed and signed in with `az login`, and the `blob-projection-fetch` skill installed in Claude Code.
  3. Tell Claude in Cowork it's saved. Claude reads the file from the ticket's `downloads/`.
- In Claude Code, asking directly ("get the remittance projection for ...") does the whole thing in one step. In an unattached Claude Code session, pasting the block is the way to do it, because the block carries every value needed.
- If the blob is not found, Claude Code reports the exact account, container, and blob it tried and stops. It does not guess other paths, and it never falls back to account keys or SAS tokens.

#### Data collection — Splunk

##### search Splunk
- *search Splunk* / *check logs* / *look in Splunk* / *find errors in* / *trace this request*, or any mention of an environment name (for example ninja, team, or space) together with a log/error/exception/trace signal
- Builds and runs an SPL query via Claude for Chrome, then extracts and summarizes results.

##### download splunk logs
- *download splunk logs* / *how do I download splunk logs*
- Walks through exporting a bulk/whole-org Splunk pull to a file for Claude to read and process locally.

##### cache org
- *cache org {id}* / *cache QA org {id}*
- Pulls an entire QA organization's Splunk messages into a local file so later questions about that org are answered from the cache instead of re-querying.

##### recache org
- *recache org {id}*
- Forces a fresh pull of a previously cached org.

#### Data collection — Instana

##### check instana
- *check instana* / *look in instana* / *instana metrics*, pasting a `*.instana.io` URL, or asking to check memory/CPU/health/restarts for a named deployment or namespace
- Navigates Instana via Claude for Chrome to pull Kubernetes/APM health, CPU, memory, and pod-restart data.

#### Data collection — Snowdrop APIs

##### call the API
- *call the remittance-processing API* / *test the guarantors API in team* / *hit the transfer-targets endpoint* / *why is this API returning 404*, pasting an `api.unlimitedfinancials.*` URL, or pasting a `SharpAuth`/`SharpOrg` cookie
- Resolves the correct ingress path and auth, then runs (or hands you a ready-to-run) authenticated call against a Snowdrop service.

##### give me the prompt for {API name}
- *give me the prompt for {API name}*
- Gives you the copy-paste text for the Claude for Chrome side panel to call that API and return raw JSON.

#### Fixing Claude

##### correct a conclusion
- *No, that's not right. {correction}*
- Claude revises its understanding; if the correction reflects a standing rule rather than a one-off, it will generally suggest recording it as a business rule.

##### add it as a business rule
- *That is a business rule, add it*
- Confirms the correction is a genuine, durable business rule (not a one-off), then scaffolds or updates a `business-logic/{fact-name}/CLAUDE.md` entry for it.

##### record this as a known failure
- *Record this as a known failure*
- At the end of a diagnostic ticket where the system was found to behave incorrectly, records the confirmed defect pattern (with the event/Splunk details already gathered) under `known-failures/`, so future investigations can recognize the same pattern.

