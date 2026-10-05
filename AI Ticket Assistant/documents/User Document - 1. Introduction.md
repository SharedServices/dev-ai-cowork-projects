# Unlimited Financials AI Ticket Assistant
## Introduction

---

### Expediting the Diagnostic Ticket Workflow

Working a reported issue on a Jira ticket generally follows the same steps — and almost always takes longer than it should, because each one tends to start from scratch:

- Extracting the problem statement.
- Collecting key references: environment, organization, entity id.
- Determining what *did* happen: pulling production detail from Cosmos, Splunk, and the APIs.
- Determining what *should have* happened: business logic, code review, checking with teammates.
- Correcting the problem in code, when there is one.
- Reporting the outcome to Jira.
- Abandoning the rich context, data, and analysis just collected.

Here's how this workspace helps with each one.

**Extracting the problem statement.** A ticket description is rarely a clean, precise bug report — it's a customer's paraphrase, a support person's notes, a pasted screenshot, or a rambling thread of often irrelevant or even erroneous ideas. Claude reads through these as they stand and pulls out what's actually being reported — the entity involved, the expected versus actual outcome, the parts that matter — rather than needing it rewritten into a tidy problem statement first.

**Collecting key references.** Entering a ticket number pulls in everything already on record — the title, description, environment, customer, and the main entities. Instead of you hunting down and pasting several lengthy GUIDs, Claude pulls what it can from the ticket itself and gets the rest from a screen scrape of the linked application forms. From there, Claude launches straight into the investigation: summarizing what's being reported, checking it against the known failures and business rules already on file, and suggesting where to look next — so the work starts already in motion instead of from a blank page.

**Determining what did happen.** Claude orchestrates the data collection — generating Cosmos queries, blob paths, and API URLs, and seamlessly tying in Splunk data it reaches out for on its own. It then analyzes those results, focusing on the issue reported but also catching data anomalies and seemingly unrelated Splunk errors that would otherwise go unnoticed.

**Determining what should have happened.** Every repository's business rules and confirmed known issues are already organized and waiting, so "is this actually broken, or is it working as designed" often has an answer on file rather than requiring a teammate's memory. And when it doesn't — when someone corrects an assumption on the spot — that correction is captured immediately in the right place, so it's answered on file for the *next* ticket too, instead of being re-explained from scratch again.

**Correcting the problem in code.** Not every ticket ends with just an explanation — some need an actual fix. When that's the case, Claude Code steps directly into the same investigation: reading the full analysis gathered so far from the ticket folder, working through the fix itself, and leaving its own summary behind. That summary feeds straight back into the Jira report, so the technical write-up reflects the real fix that was made rather than a guess at what one might look like.

**Reporting the outcome to Jira.** Whether the conclusion is "working as designed" or "here's the fix," the write-up doesn't start from a blank page. A two-part summary — plain-language for the business side, technical detail with the exact rule, ids, and root cause for engineering — drafts itself from the investigation trail already logged, tracked against the ticket's status and category as the investigation happens rather than reconstructed at the end from memory. Posting it back to Jira is a review-and-confirm away, not a rewrite.

**Retaining it all.** Right now, once a ticket closes, all of that rich context, data, and analysis is usually just gone. This keeps it — in a folder tied to the ticket, alongside all the source data behind it. Come back to it in a week, a month, or hand it to someone else entirely, and everything that was found and concluded is still there.

None of this changes *what* you're diagnosing — it just means less of it has to happen the hard way, every single time.

### Other Key Features

#### Feature Tickets (Claude Code)

Feature work consists predominantly of working Claude Code against a source branch with little need for support skills. But there is still benefit in starting a ticket in this flow, so ticket work is captured in a consistent location either way. The system distinguishes between diagnostic and feature tickets and minimizes the flow for feature work. Summaries and resolutions are captured in the ticket folder and updated in the ticket.  Also some of Ticket Assistant's' support skills can be useful when live testing.

#### Organized for Efficiency

One key objective is to minimize reading knowledge files unrelated to the ticket. Knowledge is organized hierarchically by repository and knowledge type, including:

- Repository details: squad, namespace, repo-path
- Business rules & Known failures
- Cosmos storage access & Event documentation
- Ingress navigation & API documentation
- Blob storage access
- Others

It's worth calling this out, every backend repository resides in its own folder. This not only isolates knowledge for efficiency but means repositories can be maintained by the owning squad with little overlap between repositories.

