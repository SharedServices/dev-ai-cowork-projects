# Unlimited Financials AI Ticket Assistant
## Introduction

---

### Expediting Diagnostic Ticket Workflow

Working a reported issue on a Jira ticket generally follows the same steps, and takes longer than it should, because there are too many earlier tickets and fixes by other people to remember them accurately:

- Extracting the problem statement.
- Collecting key references: environment, organization, entity id.
- Determining what *did* happen: pulling production detail from Cosmos, Splunk, and the APIs.
- Determining what *should have* happened: business logic, code review, checking with teammates.
- Adjusting the code to correct the problem, when there is one.
- Writing and running unit tests.
- Writing and running API tests.
- Reporting the outcome to Jira.
- Saving what remains of the analysis in scattered notes, files, and messages, with no consistent form and no guarantee that it is complete.

Here's how this workspace helps with each one.

**Extracting the problem statement.** Ticket descriptions can be messy: a customer's paraphrase, a support person's notes, a pasted screenshot, a rambling thread often including debunked guesses. Claude reads through these as they stand and pulls out what's actually being reported — the entity involved, the expected versus actual outcome, the parts that matter — summarizing it as a tidy problem statement.

**Collecting key references.** Entering a ticket number pulls in everything already on record — the title, description, environment, customer, and the main entities. Instead of you hunting down and pasting several lengthy GUIDs, Claude pulls what it can from the ticket itself and gets the rest from a screen scrape of the linked application forms. From there, Claude launches straight into the investigation: summarizing what's being reported, checking it against the known failures and business rules already on file, and suggesting where to look next.

**Determining what did happen.** Claude Code does the data collection itself, under your guidance: it runs the Cosmos queries, downloads the blobs, calls the APIs, and searches Splunk through the browser. You decide which entity and data to look at, and you can redirect it at any point. It then analyzes the results, focusing on the issue reported but also catching data anomalies and seemingly unrelated Splunk errors that would otherwise go unnoticed.

**Determining what should have happened.** Every repository's business rules and confirmed known issues are already organized and waiting, so "is this actually broken," "is it working as designed," or "is this a known issue" often has an answer on file rather than requiring a teammate's memory. Claude Code can also review all of the code directly, including other related backends. And when the answer isn't on file — when someone corrects an assumption on the spot — that correction is captured immediately in the right place, so the answer is on file for the *next* ticket too, instead of being re-explained from scratch.

**Adjusting the code.** If a fix is needed, Claude Code steps directly into the same investigation: reading the full analysis gathered so far from the ticket folder, working through the fix itself, and leaving its own summary behind. That summary feeds straight back into the Jira report, so the technical write-up reflects the real fix that was made and how it was tested rather than a guess at what one might look like.

**Writing and running unit tests.** By this point Claude Code knows the problem, what was expected, what actually happened, and any input you have added. It uses that knowledge to write unit tests that cover the main issue and its edge cases. It usually runs those tests against the code without the fix first, to confirm that they fail for the reported reason instead of assuming that they do. It then runs them against the fixed code.

**Writing and running API tests.** When the fix changes what an existing API test checks, Claude Code finds the affected tests and updates them. When a new test is needed, it proposes the design to you before writing it, then builds the test around the main issue and the edge cases that apply, as it does for unit tests. It records which tests it changed and which it checked and left unchanged, and it labels any change that is only a guess at what the fix implies. Claude Code writes the API tests but does not run them. You run them after Claude Code has written them.

**Reporting the outcome to Jira.** Whether the conclusion is "working as designed" or "here's the fix," the write-up is generated automatically. A two-part summary — plain-language for the business side, technical detail with the exact rule, ids, and root cause for engineering — drafts itself from the investigation trail already logged, tracked against the ticket's status and category as the investigation happens rather than reconstructed at the end from memory. Posting it back to Jira is a review-and-confirm away, not a rewrite.

**Retaining it all.** Right now, once a ticket closes, all of that rich context, data, and analysis is usually just gone. This keeps it — in a folder tied to the ticket, alongside all the collected source data behind it. Come back to it in a week or a month, or hand it to someone else entirely, and everything that was found and concluded is still there.

None of this changes *what* you're diagnosing — it just means less of it has to happen the hard way, every single time.

### Other Key Features

#### Configurations

This tool only supports Claude Code, but you can set it up in different configurations depending on your focus. To focus on knowledge, such as working an issue ticket, make this project the primary folder and the folder containing your local source repositories the secondary folder. To focus on source code work, make the folder you want to work in the primary folder and this project the secondary folder. Either way you have full access to both, with the primary folder getting priority for skills and instructions.

#### Organized for Efficiency

One key objective is to minimize reading knowledge files unrelated to the ticket. Knowledge is organized hierarchically by repository and knowledge type, including:

- Repository details: squad, pod, namespace, repo-path.
- Business rules and known failures.
- Cosmos storage access and event documentation.
- Ingress navigation and API documentation.
- Blob storage access.
- Other.

