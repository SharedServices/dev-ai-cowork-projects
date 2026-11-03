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
- *log progress*

### Example data collection commands
- *activate the repo payers*  
- *collect the event stream for this payer and summarize the timeline*
- *check the Splunk logs for this payer and show a consolidated timeline*
- *call the API to get all payers*
- *fetch the remittance projection from remittance processing blob storage*

### Example test commands
- *build an ERA with two claims for claim COMP1000357A1 and send it to ninja for org Squad Herbert*
- *run the rule sequence order API test in ninja*
- *write up how to repeat this test*

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
- Runs the query against `king-space-sharp-be-cdb` through the Azure Cosmos tool. There is no browser step and nothing for you to paste or download:
  > ```sql
  > SELECT * FROM c
  > WHERE c.StreamId = "Snowdrop.Payers->e5b8461b-d2c1-41ec-8fad-f01898850707->Snowdrop.Payers.Payer->a48f60ab-4971-441c-a172-faccf7511915"
  > ORDER BY c.EventNumber ASC
  > ```
- Saves the result to `downloads/space_payer_a48f60ab-4971-441c-a172-faccf7511915_20261001-141530.json` and reports the file name and the event count.

---

*give me a timeline of what happened on this payer*

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
- Pulls results through the search job's JSON endpoint rather than the on-screen table (the table truncates long values), and keeps to `MessageTemplate` plus a short allow-list of properties, so the results are not blocked by the content filter.
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
- Appends a dated entry to `summary.md` noting the comment was posted.
- Drafts the separate Testing comment (unit testing, automated API testing, how to test manually) and shows it to you. It is posted only after you approve it.
- Asks whether to close the ticket (which sets the `summary.md` status to Resolved — the folder and its downloads stay in place for later).

### Commands / Actions

*The lead-in phrases below are what trigger each behavior. Wording can vary a little — these are the recognized patterns, not the only exact words that work.*

#### Project & repo setup

##### upgrade project
- *upgrade project* / *initiate project* / *set up this project* / *onboard me* / *first-time setup*
- Sets up a fresh copy of this project and brings it up to date after a pull. It compares the project version with the version last recorded in `local/user.md` and runs the one-time cleanups for each release you have not applied, such as removing duplicate copies of the project skills (after you approve). It checks the environment (project root, attached source folder, `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD`), asks for and records your squad and pod and the location of your source folder, smoke-tests Claude for Chrome and Splunk access, and records the project version. See "Initializing and Upgrading the Project" in the Getting Started document.

##### activate repo
- *activate repo {name}*
- *activate repo {name} and {name}*
- *activate repos for all squad {squad name} repos*
- *activate repos for all pod {pod name} repos* (primary pod only)
- Sets the investigation scope to one or more repo folders under `repos/`, matched by folder name or nickname from the `## Repos` table in the root `CLAUDE.md`.
- Activations accumulate for the rest of the session — activating another repo adds it to scope, it does not replace the repo(s) already active.
- Claude normally picks the repos that apply from the ticket or the question. Use this command to force a repo into scope, or when Claude chose the wrong one.

#### Ticket workflow

##### start a ticket
- *start a ticket for UF-XXXXX*, or simply beginning sustained investigation on a ticket number with no folder yet
- Creates `tickets/{TICKET-ID}/`, pulls the Jira ticket's title/status/description, confirms the ticket's category (Diagnostics/Analysis, Speckit, or Feature), writes the initial `summary.md`, and attributes the session's telemetry to the ticket. See "Ways to Start Work" in the Getting Started document for the environment that suits each category.

##### resume a ticket
- *resume/continue work on UF-XXXXX*, or naming a ticket number that already has a folder
- Reads `summary.md` (and `code-analysis/` if present), recaps status/category/last entry, and checks whether Jira shows any status change since. It works in any environment. To switch environments, say *log progress* in the current session, start a new session from the other environment, and say *resume ticket UF-XXXXX* (see "Switching Environments and Resuming a Ticket" in the Getting Started document).

##### log progress
- *log progress* / *log this for the ticket* / *summarize this for the ticket*
- Appends a dated entry to `summary.md` that stands on its own: current status, what was found, what was ruled out, open questions and the next step. Evidence not yet in `downloads/` is saved first. "Log progress" is a complete request; Claude does not ask which ticket. The reply ends with the real ticket id and the line to continue in a new session ("resume ticket UF-XXXXX"), so this is the first step when you switch environments. It also happens automatically at natural checkpoints (root cause confirmed, hypothesis ruled out, a comment posted).

##### close a ticket
- *the ticket is resolved* / *close out UF-XXXXX*
- Appends a final dated entry and updates the `summary.md` status line to Resolved.

##### draft a Jira comment
- *draft a comment to post this conclusion to the jira ticket* / *comments for the jira ticket*
- Drafts one Jira comment that opens with a one-line Summary (an outcome label such as Resolved, Known Issue, or Not a Defect, plus a few words on the finding), followed by a Business Summary (plain language, customer-facing) and a Technical Summary (investigation trail, root cause, fix). Only posts once you confirm.
- After the resolution comment is posted, Claude drafts a second, separate comment titled **Testing**. It has these sections: Unit testing, Automated API testing, Claude API testing (only if you had Claude test the change through the deployed APIs), and How to Test Manually. The sections are written from `summary.md` and the committed change, not from chat history. If the fix cannot be tested by hand, the comment says so and why. It is also posted only once you confirm.

##### post it
- *post it*
- Posts the previously drafted Jira comment, once you've approved it. Claude then drafts the separate Testing comment (see "draft a Jira comment").

#### Data collection — Cosmos DB

##### query cosmos
- *query cosmos* / *look in cosmos* / *cosmos query* / *data explorer* / *find this remittance/org in cosmos*, or pasting a `sdsh.unlimitedfinancials.{env}/...` remittance URL. *get events for that payer* (or any entity) follows the same path.
- Claude queries Cosmos directly in every environment, with nothing to open, paste or download. In most environments it uses the Azure Cosmos tool. On ninja, which has no data-plane role, it runs Azure commands to get a read-only key and queries with that. Claude resolves the repo's database, container and stream id, runs the query, saves the result to the active ticket's `downloads/` (or `cosmos-access/results/` if no ticket is active), and reports the file name and the number of events or documents returned.

#### Data collection — Blob storage

##### fetch a blob projection
- *fetch the remittance projection from remittance processing blob storage* / *get the {name} projection* / *blob projection*
- Many services store a JSON snapshot ("projection") of an entity in Azure Blob Storage. Claude fetches it directly:
  1. Claude looks the projection up in the repo's `references/blob_projections.md` and works out the storage account, container and blob path. The environment and ids come from the ticket or a pasted application URL; Claude asks only for what is missing.
  2. Claude downloads the blob read-only with `az storage blob download --auth-mode login` and saves it to the active ticket's `downloads/` (or `scratch/` if no ticket is active). It reports the path, size and top-level fields, and does not print the contents.
- This needs the Azure CLI (`az`) installed and signed in with `az login`, and the `blob-projection-fetch` skill installed.
- If the blob is not found, Claude reports the exact account, container and blob it tried and stops. It does not guess other paths, and it never falls back to account keys or SAS tokens.

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
- Resolves the correct ingress path and auth, then runs an authenticated call against a Snowdrop service, or hands you a ready-to-run call.

##### give me the prompt for {API name}
- *give me the prompt for {API name}*
- Gives you the copy-paste text for the Claude for Chrome side panel to call that API and return raw JSON.

#### Testing — ERA files and API tests

##### build and send a test ERA
- *build an ERA with two claims* / *make an ERA like this sample* / *deny the second claim with CO-50* / *make an ERA with 5,000 claims* / *show me the ERA so far* / *send it to ninja for org {name}*, or `/era-builder`
- Builds an ERA (X12 835) from plain instructions and uploads it to the Remittance ERA upload endpoint from your signed-in browser tab (Claude for Chrome). It starts from an empty ERA, a standard template, a saved file, a pasted ERA, or an earlier upload, and can fill the payee, payer, patient and claims from the organization's real data (organization name, claim number, company, payer, patient name, or random real claims).
- Before sending, Claude shows the ERA as tables with a balance check (billed minus paid must equal the adjustments). After sending, it reports whether each remittance is live or was discarded, because an upload can report Created and then be discarded (for example when the payee tax id matches no company in the organization).
- Production environments need your explicit confirmation naming the environment and organization before every upload. A check number that already exists is withheld as a duplicate and nothing is created.
- Saved ERA files are recipe files (the starting point plus your edits), kept in `ERAs/` when you save them there. They can hold test data from an organization and are not committed to git.

##### run an API test
- *run the {name} API test* / *repeat the rule order test* / *test this through the API*, or pointing at a file in `API Tests/`
- Runs a written procedure from the `API Tests/` folder against a non-production environment. Use it to confirm a fix, or to check later that a behavior still holds, by repeating a scenario through the deployed APIs. Each file is one scenario (for example `rule-sequence-order.md`, from UF-16594) with its own background, API calls, steps, expected results and sample data. The general rules are the same for every procedure: non-production environments and organizations only, you approve every write before it is sent, existing data is investigated first, results are read back, and evidence goes into the active ticket's `downloads/` with a `summary.md` entry.
- Claude states, for each statement in its report, whether it was confirmed in the run, read from code, or inferred. It stops and asks when the environment is unclear or a result differs from the procedure's expectation.
- Test rules and remittances created by a run stay in the organization until you decide what to do with them. Rule deletion cannot be undone, so control runs switch a rule off by changing a qualifier instead.

##### write up an API test procedure
- *write up how to repeat this test* / *create an API test procedure*
- After a test has been run by hand, Claude writes it as a new file in `API Tests/` from the standard template: the original ticket, the fix under test, the API calls and request bodies, ids, expected results, and the sample data from the run. Later runs add dated sample-data blocks to the same file instead of replacing earlier ones.

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

