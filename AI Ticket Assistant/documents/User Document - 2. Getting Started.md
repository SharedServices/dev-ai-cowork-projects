# Unlimited Financials AI Ticket Assistant
## Getting Started

---

### Downloading

The content can be downloaded from GitHub here: [https://github.com/SharedServices/dev-ai-cowork-projects](https://github.com/SharedServices/dev-ai-cowork-projects). Either download it as a zip, or clone it with an IDE — either way, transfer the content into your project as described in the next section.

### Setting Up Claude Code in the Claude App

This project runs in Claude Code, in the **Code** tab of the Claude app. You set it up by creating **environments**. An environment is a saved set of folders and settings. Each session you start from an environment gets those folders.

If you open Visual Studio (or, presumably, another IDE) on the dev-ai-cowork-projects folder, you can check in changes to the AI Ticket Assistant project itself.

#### Choose a configuration

Create one environment for each way you work. The three configurations differ in which folder is primary and which folders are attached as additional folders.

| Configuration | Primary folder | Additional folder | Use it for |
|---|---|---|---|
| **Knowledge Focus** | The **AI Ticket Assistant** project folder | Optional: the source folder that holds your local repositories | Investigating tickets and answering questions. Claude answers from the knowledge base first and reads code as needed. |
| **General Code Focus** | The source folder that holds your local repositories | The **AI Ticket Assistant** project folder | Work across several repositories. Claude answers from the code first and uses the knowledge base for context. |
| **Repository Focus** | One specific repository | The **AI Ticket Assistant** project folder | Work in one repository, including builds and commits. |

The primary folder is the working directory. Claude Code reads the git state, runs commands, and resolves relative paths from it. Additional folders are readable and editable, but they are not the working directory.

#### Create an environment

1. Open the **Code** tab in the Claude app.
2. Open the environment selector under the prompt box and select **New environment** at the bottom of the menu.
3. Select the **Local** tab.
4. Under **Folders**, add the folders for the configuration you chose (see the table above). Make sure the primary folder is the one the table lists.
5. Select **Environment variables** and enter this line:

   ```
   CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1
   ```

6. Select **Done**, then **Create environment**.

Name each environment so you can tell the configurations apart, for example "Knowledge", "Code - all repos", or "Code - Guarantors".

To change an environment later, hover over it in the selector and click the gear icon. Only sessions started from an environment receive its variables, so start a new session after you change one.

#### Why the environment variable is required

By default, Claude Code does not load a `CLAUDE.md` file from an additional folder. It only grants file access. Setting `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` to `1` makes Claude Code load the `CLAUDE.md` of each additional folder.

The project's rules, skills index and repo index are in the `CLAUDE.md` of the **AI Ticket Assistant** folder. In the General Code Focus and Repository Focus configurations that folder is an additional folder, so without the variable Claude does not load those rules. In the Knowledge Focus configuration the variable is needed only if you attach the source folder. Set it in all three environments.

### Activating Claude for Chrome

Claude for Chrome gives Claude direct control of your browser — not just reading a page, but navigating to URLs, clicking, filling in forms, and extracting page content, network requests, or console output. This shows up in two different ways in this workspace:

- **Direct, in-session control** — Claude drives the browser itself, in the same conversation you're having (used for the ticket workflow's page-capture step and for Splunk searches). This can navigate to a URL and read what loads there, but it can only act on tabs it opens itself — it cannot reach into a tab you already have open and read whatever's currently on screen. If a page needs a login, Claude will notice the redirect and ask you to sign in before continuing.
- **The standalone Claude for Chrome side panel** — a separate chat that runs against whatever tab is currently active in your browser. Because it operates on your actual open tab, this is the way to capture a page's exact on-screen state — unsaved form input, a specific filter or search result you've already built up by hand — that a fresh navigation elsewhere can't reproduce.

To set it up:

1. If you use Claude Desktop, click your initials in the lower-left corner, open **Settings**, and toggle the Chrome connector on — this will prompt you to install the extension if you haven't already.
2. Otherwise, go to the Chrome Web Store, search for "Claude," and add the extension — double-check the publisher is Anthropic, since lookalike extensions exist.
3. Sign in with your Claude account. Note that this requires a paid plan (Pro, Max, Team, or Enterprise), and only works in Chrome itself, not other Chromium browsers.
4. Pin the extension to your toolbar so the side panel is easy to open, and grant it permission on the sites you'll use it with.

### Initializing and Upgrading the Project

Before you do anything else in a new local copy, and again after every pull from GitHub, say **"upgrade project."** It is not a skill. Claude reads the instructions from `upgrade/code.md` in the project folder, so a pull always brings the current steps.

Run it in a session started from any of the three environments described in "Setting Up Claude Code in the Claude App". **Knowledge Focus** is the usual choice, because the project folder is the primary folder there. In the other two configurations the project folder is an additional folder, so the `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` variable must be set for Claude to find the instructions.

Claude does the following:

1. **Compares versions.** It compares the project version with the version last recorded in `local/user.md`. If the recorded version is blank or older, Claude runs the one-time cleanup steps for each release you have not yet applied.
2. **Removes duplicate skills.** The project's skills are in the project's `.claude/skills/` folder. A copy with the same name in `~/.claude/skills/` loads as a duplicate and can be older. Claude lists such copies and deletes them only after you approve. It never deletes through a symlink or junction. If a skill list entry named `anthropic-skills:{name}` matches a project skill, Claude tells you to delete it in the Claude settings (**Customize**, then **Skills**), because it cannot do this from Claude Code. Restart Claude Code after any deletion so the skill list reloads.
3. **Checks the environment.** It reports pass or fail, with the fix, for each of these:
   - the project root;
   - whether a source folder is attached;
   - whether the `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD` variable is in effect.
4. **Records who you are and where your source is.** Claude asks for your Squad and Pod, or asks whether the recorded values are still correct. It records them in `local/user.md` with the location of your source code. It reports how many of the project's repositories it finds in the source folder. It warns if the source folder is a single repository instead of the parent folder. Later sessions read this location, so it must stay accurate. `local/user.md` is not committed to Git.
5. **Tests Claude in Chrome and Splunk.** It runs one small check of each, so you know on day one whether they work instead of finding out during an investigation.
6. **Summarizes.** It lists what passed, what failed, and what you need to do next.

Claude records the project version in `local/user.md` only when every cleanup step has finished and none is waiting on you. If a step is waiting on you, say "upgrade project" again after you finish it.

If you set up before 2026-10-07, you previously ran "initiate project", which was a skill saved to your Claude account. That skill still runs the old steps. Delete it (click **Customize**, select both **Skills** and **Yours** in the panel that opens, find `initiate-project`, and delete it), start a new session, and run `upgrade project` again.

Skipping this is not fatal, and most things still prompt you for what they need. However, your Squad and Pod may be unset, which affects squad- and pod-scoped defaults elsewhere in the project. A broken Chrome or Splunk connection will not show up until you use it.

### Targeting a Repo

You usually do not need to tell Claude which repo you are working in. Claude chooses the repos that apply from the context. It does this when you start a ticket that refers to a repo or a service, and when you ask a question that points to one. Claude resolves the name against the repo index in `CLAUDE.md`.

To force this explicitly, say **"activate repo {name}."** Use it when you want to be certain a repo is in scope, or when Claude chose the wrong repo or missed one. You can use the repo's folder name or its plain nickname (for example "Guarantors" or "snowdrop-guarantors-be"). If the name is ambiguous or not recognized, Claude asks instead of guessing.

A few things worth knowing:
- Once a repo is activated, it stays in scope for the rest of the conversation.
- Activating a second repo adds it alongside the first. More than one repo can be active at a time.
- You can activate several repos, or a whole squad's or pod's repos, in one request. Examples: "activate repo Guarantors and Resources", "activate repos for all squad Herbert repos", "activate repos for all pod Quality repos". Pod activation uses each repo's primary pod only.

### Starting a New Ticket

Say **"start ticket UF-XXXXX"**, or just begin investigating a ticket number that does not have a folder yet. Claude does the following:

1. Looks up the ticket in Jira and takes its title, link and status.
2. Proposes a category and asks you to confirm it before doing anything category-specific:
   - **Diagnostics/Analysis** (the default): a reported symptom, with no fix assumed yet.
   - **Speckit**: the ticket is already in GitHub Spec Kit's format.
   - **Feature**: the ticket already states the solution to build.
3. Creates the ticket's folder, `tickets/{TICKET-ID}/`, and attributes the session's telemetry to the ticket.

If the conversation already contains unrelated work, Claude asks whether you want a new session for the ticket.

The ticket folder holds the investigation's running summary, downloaded evidence and code notes. That folder, not the chat, is what you or anyone else comes back to later. If the folder already exists, Claude treats the request as a resume. See "Switching Environments and Resuming a Ticket".

### Ways to Start Work

| You want to | Say | Environment to use | What happens |
|---|---|---|---|
| Investigate a reported symptom | "start ticket UF-XXXXX" and confirm **Diagnostics/Analysis** | Knowledge Focus | Claude offers to capture the page linked from the ticket, then follows the diagnostic flow. |
| Build a change the ticket already describes | "start ticket UF-XXXXX" and confirm **Feature** | Repository Focus for the service you are changing | Claude goes straight to scoping and implementation. |
| Review and implement a ticket written in Spec Kit format | "start ticket UF-XXXXX" and confirm **Speckit** | Repository Focus for the service you are changing | The Spec Kit commands run in Claude Code. Claude reviews the spec, plan and tasks. |
| Continue a ticket that has a folder | "resume ticket UF-XXXXX" | The one that suits the next piece of work | Claude reads the folder, recaps it, and continues. |
| Ask a question with no ticket | Ask it. Say "activate repo {name}" to force a repo into scope. | Any | Claude answers from the knowledge base or the code, depending on the environment. |

A ticket can change category part-way. The usual case is Diagnostics becoming a Feature once the cause is found. Say so plainly ("let's fix this by...", "let's turn this into a feature"). Claude asks you to confirm the new category and logs the change in `summary.md`. It does not infer the change from tone.

### Working a Diagnostic Ticket

Once a Diagnostics/Analysis ticket is confirmed, Claude looks for an application link (`sd.unlimitedfinancials.*`) on the ticket itself. If it finds one, it offers to capture that page directly. You do not need to copy and paste, and Claude asks you to log in if the page requires it. If no such link exists, or the page you need depends on unsaved state that a fresh navigation cannot reproduce (a filter or search result you built by hand), Claude falls back to the Claude for Chrome side-panel prompt described above.

From there, the flow follows the steps in the Introduction document. Everything found along the way is kept in the ticket's folder, so none of it depends on the conversation surviving.

### Working a Feature Ticket

A Feature ticket already states the solution, so there is nothing to investigate and no page-capture step. Work in a Repository Focus environment for the service you are changing:

1. Start the session from that environment.
2. Say **"start ticket UF-XXXXX"** and confirm **Feature**, or say **"resume ticket UF-XXXXX"** if the ticket has a folder.
3. Claude scopes and implements the change, and writes its notes into `code-analysis/`.

If a change affects what an API test checks, Claude updates the affected API tests as part of the same work and says which ones changed.

### Working a Speckit Ticket

A Speckit ticket is being run through GitHub Spec Kit. Claude recognizes it when the Jira description is already in the `/specify` output shape (a Feature Specification, Acceptance Scenarios, FR-XXX requirements and `[NEEDS CLARIFICATION]` markers), or when you say so.

Work in a Repository Focus environment for the service you are changing. The Spec Kit commands (`/specify`, `/clarify`, `/plan`, `/tasks`, `/implement`) run in Claude Code. Claude's role is research and review:
- flag gaps in `spec.md`, `plan.md` and `tasks.md`;
- help resolve the `[NEEDS CLARIFICATION]` markers;
- keep the ticket's `summary.md` current.

There is no page-capture step.

### Switching Environments and Resuming a Ticket

A ticket often needs more than one environment. For example, you investigate in Knowledge Focus, then move to Repository Focus once the fix is clear. You can also move the other way, from a repository back to the knowledge base. The primary folder is set when a session starts, so you switch by starting a new session from the other environment. The ticket folder carries the work across.

1. **In the current session, say "log progress."** Claude writes a dated entry that stands on its own: current status, what was found, what was ruled out, open questions and the next step. It ends with a line giving the real ticket id and the command to continue. Evidence is saved in `downloads/` first.
2. **Start a new session** from the environment you want. Select it in the environment selector under the prompt box.
3. **Say "resume ticket UF-XXXXX."** If the new environment's primary folder is a repository, you can also say "activate repo {name}", although Claude usually picks the repo from the ticket.

Claude reads the ticket folder and recaps where the ticket stands before it continues. It adds a new dated section for the session and never rewrites earlier entries.

Rules for working across sessions:
- Work a ticket in one session at a time. A second session does not see the first one's unsaved context, and both append to `summary.md`.
- Any session may write `summary.md` and `downloads/`. Notes about code go in `code-analysis/`.
- When the project folder is an additional folder, Claude gives you file paths built from that session's project root. Use the path it gives you now, not one from an earlier session.

Resuming also works when you come back days later, or when someone else picks up the ticket from the same project copy.

### Closing a Ticket

Say **"close out UF-XXXXX"** when the ticket is resolved. Claude adds a final dated entry and sets the status to `Resolved`. It does not delete the folder, so you can reopen the ticket with "resume ticket".

When you ask for the Jira comments, Claude drafts one comment with a summary line, a Business Summary and a Technical Summary. After it is posted, Claude drafts a second, separate "Testing" comment. Claude posts each only after you approve it. See "draft a Jira comment" and "post it" in the How to Use document.
