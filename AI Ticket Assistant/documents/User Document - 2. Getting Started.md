# Unlimited Financials AI Ticket Assistant
## Getting Started

---

### Downloading

The content can be downloaded from GitHub here: [https://github.com/SharedServices/dev-ai-cowork-projects](https://github.com/SharedServices/dev-ai-cowork-projects). Either download it as a zip, or clone it with an IDE — either way, transfer the content into your project as described in the next section.

### Create a CoWork Project

Open the Claude app, switch to Cowork, and go to **Projects** in the left panel. Click **+** and pick one of three ways to start:

- **Start from scratch** — creates an empty project with a new, empty folder. Use this if you downloaded a zip: create the project, then copy the downloaded content as-is into the new project folder.
- **Use an existing folder** — points the project at a folder you already have. Use this if you cloned the repository with an IDE: clone it into a folder on your machine first, then create the project pointing at that folder.
- **Import from an existing project** — brings in an existing claude.ai project's files and instructions; not applicable when setting up from the GitHub content.

Whichever way you start, the project needs a folder Cowork can both read from and write to — that folder is where the knowledge base, skills, and ticket history actually live on disk, and you can attach or change it later from the project's settings. Your name and squad are recorded in `local/user.md` (not tracked by git) when you run "initiate project" — a one-time step per local copy.

### Activating Claude for Chrome

**This is optional — but most of this documentation describes work assuming you have it.** Claude for Chrome gives Claude direct control of your browser — not just reading a page, but navigating to URLs, clicking, filling in forms, and extracting page content, network requests, or console output. This shows up in two different ways in this workspace:

- **Direct, in-session control** — Claude drives the browser itself, in the same conversation you're having (used for the ticket workflow's page-capture step and for Splunk searches). This can navigate to a URL and read what loads there, but it can only act on tabs it opens itself — it cannot reach into a tab you already have open and read whatever's currently on screen. If a page needs a login, Claude will notice the redirect and ask you to sign in before continuing.
- **The standalone Claude for Chrome side panel** — a separate chat that runs against whatever tab is currently active in your browser. Because it operates on your actual open tab, this is the way to capture a page's exact on-screen state — unsaved form input, a specific filter or search result you've already built up by hand — that a fresh navigation elsewhere can't reproduce.

It's not required to use any of this — the ticket workflow, repo activation, and data collection all work without it — but the diagnostic flow in particular is written with the assumption that it's available.

To set it up:

1. If you use Claude Desktop, click your initials in the lower-left corner, open **Settings**, and toggle the Chrome connector on — this will prompt you to install the extension if you haven't already.
2. Otherwise, go to the Chrome Web Store, search for "Claude," and add the extension — double-check the publisher is Anthropic, since lookalike extensions exist.
3. Sign in with your Claude account. Note this requires a paid plan (Pro, Max, Team, or Enterprise), and only works in Chrome itself, not other Chromium browsers.
4. Pin the extension to your toolbar so the side panel is easy to open, and grant it permission on the sites you'll use it with.

### Initializing the Project

Before doing anything else in a new local copy — or again after pulling an update from GitHub that adds skills or changes what `CLAUDE.md` expects — say **"initiate project."** This is a one-time (or occasional re-check) step, not something that happens automatically: Claude records your Name and Squad in `local/user.md` if the file is missing or either is blank, checks which of the skills listed in `skills/README.md` are already installed and offers to package up whichever are missing, and smoke-tests both Claude for Chrome and Splunk access so you know on day one whether those surfaces are actually working rather than finding out mid-investigation.

Skipping this isn't fatal — most things will still prompt you for what they need — but your Name/Squad may be unset (which affects squad-scoped defaults elsewhere in the project), and a broken Chrome or Splunk connection won't surface until you happen to hit it.

### Targeting a Repo

Before asking about a specific service, tell Claude which repo you're working in: **"activate repo {name}."** You can use the repo's folder name or its plain nickname (e.g. "Guarantors" or "snowdrop-guarantors-be" both work) — Claude resolves it against the repo index in `CLAUDE.md` and asks rather than guesses if the name is ambiguous or unrecognized.

A few things worth knowing:
- Once a repo is activated, it stays in scope for the rest of the conversation.
- Activating a second repo adds it alongside the first rather than replacing it — you can have more than one active at a time.
- You can activate several repos, or a whole squad's worth, in one request — e.g. "activate repo Guarantors and Resources" or "activate repos for all squad Herbert repos."

### Starting a New Ticket

Say **"start ticket UF-XXXXX"**, or just begin investigating a ticket number that doesn't have a folder yet. Claude pulls the ticket's title, link, and current status from Jira and proposes a category:

- **Diagnostics/Analysis** (the default) — a reported symptom, no fix assumed yet.
- **Speckit** — the ticket is already in GitHub Spec Kit's format.
- **Feature** — the ticket already states the solution to build.

Claude proposes one of these based on the ticket's description and asks you to confirm before doing anything category-specific — this determines how the rest of the flow below behaves.

Starting a ticket also creates its own folder — `tickets/{TICKET-ID}/` — and everything related to that investigation lives there from this point on, not just in the conversation. At the top level, that folder holds a running summary of the investigation, a place for downloaded evidence like Cosmos and Splunk exports, and, once Claude Code gets involved, its own notes from the code side. That folder, not the chat, is what you or anyone else comes back to later.

### Working a Diagnostic Ticket

Once a Diagnostics/Analysis ticket is confirmed, Claude looks for an application link (`sd.unlimitedfinancials.*`) on the ticket itself and, if it finds one, offers to capture that page directly — no copy/paste needed, and it'll ask you to log in if the page requires it. If no such link exists, or the page you need depends on unsaved state a fresh navigation can't reproduce (a filter or search result you've already built up by hand), Claude falls back to the Claude for Chrome side-panel prompt described above. From there, the typical flow follows the steps laid out in the Introduction document: extracting the actual problem statement, collecting the environment/organization/entity references, pulling Cosmos/Splunk/API data, checking it against business logic and known failures, correcting the code if a fix is needed, and drafting the two-part Jira comment. Everything found along the way — evidence, analysis, conclusions — is retained automatically in the ticket's own folder, so none of it depends on the conversation surviving.

### Syncing Skills to Claude Code

Some of this project's skills only take effect on the Cowork side until you copy them into Claude Code — the two stores are separate and don't sync automatically, and Claude Code only discovers skills from your local filesystem. Do this once per machine, and again after pulling an update from GitHub that adds or changes a skill:

1. Open Claude Code from inside this project's folder — this matters, because it lets the step below use a plain relative path instead of you having to figure out and type an absolute one.
2. Cut and paste the following into Claude Code:

   ```
   Copy every skill folder under skills/ into ~/.claude/skills/ — create that folder if it doesn't
   exist, and ask before overwriting anything already there.
   ```

This installs them to your personal, cross-project Claude Code skills folder. That's needed (rather than a copy scoped to just this project) because most of these skills — including the one used in the next section — have to trigger while Claude Code is sitting in some other repo's checkout during actual ticket work, not this project's own folder.

### Working a Feature Ticket

Feature tickets keep the Cowork side light on purpose — there's no Chrome-capture prompt, since the actual work happens in Claude Code. Start or confirm the ticket as **Feature** in Cowork first, so it has a home and a folder to hand off from. Then switch over to Claude Code:

1. Say **"activate cowork {name}"** (e.g. "activate cowork AI Ticket Assistant") — the `activate-cowork` skill, which loads this project's root `CLAUDE.md` and auto-activates the matching repo (from the `## Repos` table) if Claude Code happens to already be sitting in one.
2. Say **"reference ticket UF-XXXXX."** Claude Code reads the ticket's `summary.md` and `downloads/` directly, does the implementation work, and writes its own notes into `code-analysis/` — leaving the files Cowork owns untouched.

Anything Claude Code finds is visible back in Cowork the next time that ticket is opened there, and vice versa — each side writes only to its own area of the folder, but both can read everything.
