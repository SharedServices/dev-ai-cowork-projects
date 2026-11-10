![Version](https://img.shields.io/badge/version-2026.11.10-blue.svg)
# Unlimited Financials AI Ticket Assistant

A Claude workspace that speeds up diagnostic work on Jira tickets. It helps with each step of an investigation:

- Extracting the problem statement from the ticket.
- Collecting key references (environment, organization, entity ids).
- Determining what did happen, using Cosmos, Splunk, blob storage, Instana, and API data.
- Determining what should have happened, using business rules and known failures kept per repository.
- Correcting and testing the problem in code, when there is one.
- Reporting the outcome to Jira.
- Retaining the context, data, and analysis in a folder tied to the ticket.

Knowledge is organized by repository and knowledge type, so only the files relevant to a ticket are read.

This repo contains a Claude Code workspace. You run it in the Code tab of the Claude app, from environments that choose which folder is primary:

- **Knowledge Focus:** the `AI Ticket Assistant` folder is primary, and your source repositories folder is optionally attached.
- **General Code Focus:** your source repositories folder is primary, and `AI Ticket Assistant` is attached.
- **Repository Focus:** one repository is primary, and `AI Ticket Assistant` is attached.

Each environment sets `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1`, so Claude loads the workspace instructions from an attached folder.

## Getting started

1. Download or clone this repo from [GitHub](https://github.com/SharedServices/dev-ai-cowork-projects). A clone lets `git pull` bring updates.
2. In the Claude app's Code tab, create an environment for the configuration you want (Knowledge Focus is the usual start). Set `CLAUDE_CODE_ADDITIONAL_DIRECTORIES_CLAUDE_MD=1` in it.
3. Start a session from that environment and say "upgrade project". Repeat it after every pull from GitHub.

The Getting Started document has the details, including the Claude for Chrome setup that Splunk, Instana, and page capture depend on.

## Documentation

The user documents are in [`AI Ticket Assistant/documents/`](<AI Ticket Assistant/documents>):

1. [Introduction](<AI Ticket Assistant/documents/User Document - 1. Introduction.md>): what the workspace does and its configurations.
2. [Getting Started](<AI Ticket Assistant/documents/User Document - 2. Getting Started.md>): download, environment setup, Claude for Chrome, `upgrade project`, and starting a ticket.
3. [How to Use](<AI Ticket Assistant/documents/User Document - 3. How to Use.md>): the commands and a sample conversation.
4. [How It Works](<AI Ticket Assistant/documents/User Document - 4. How It Works.md>): skills, the ticket folder, data-gathering surfaces, API testing, and safety rules.

The same folder holds `project-maintenance.md`, for people changing the workspace. It is not for using the workspace.

## Folder layout

```
AI Ticket Assistant/
├── .claude/skills/  Skills used in the investigation flow
├── CLAUDE.md        Workspace instructions Claude reads during normal use
├── README.md        History and context for CLAUDE.md; maintenance only, not read during investigations
├── API Tests/       One procedure per API test scenario
├── business-logic/  Business rules that apply across repositories
├── documents/       User documents and project maintenance notes
├── ERAs/            Saved test ERA files (git-ignored)
├── known-failures/  Known failure patterns that apply across repositories
├── local/           User-specific settings (git-ignored)
├── memories/        Instance-local memories (git-ignored)
├── references/      Shared reference material (e.g. namespaces, Nimbus organization lookup)
├── repos/           One folder per backend repository: details, business rules, known failures
├── scratch/         Disposable one-off scripts
├── templates/       Templates for new repos, business-logic categories, and known failures
├── tickets/         One case folder per ticket: summary log, downloaded evidence, code analysis
└── upgrade/         The project version and the steps that "upgrade project" runs
```

## Upgrading

The project has one version, set in `upgrade/version.md` and shown in the badge above. `local/user.md` records the version you last upgraded to. After a pull, say "upgrade project": it runs only the steps newer than your recorded version.

Skills load directly from `.claude/skills/`, so nothing needs saving. If a skill behaves like an older version, look for a duplicate copy in `~/.claude/skills/` or an `anthropic-skills:` entry in your Claude account. `upgrade project` finds these.

### If you installed before 10/7/2026

Earlier versions installed skills into the Claude Code skills folder. That is no longer needed. Read the Getting Started document again: `upgrade project` replaces the earlier `initiate project` step, removes old copies of the skills, and sets up versioning.

### Version 2026.11.10

Retires Claude Cowork. The workspace now runs only in Claude Code, from the environments described above. Run "upgrade project" after pulling: it removes duplicate copies of the project skills, including the retired `activate-cowork`, tells you to delete any `anthropic-skills:` copies in your Claude settings, and offers to remove the two Cowork sections from your global `~/.claude/CLAUDE.md`.

### Version 2026.10.21

Adds the `api-testing` and `era-builder` skills and the `API Tests/` folder. Run "upgrade project" in Cowork and save the new cards, then run it in Claude Code to remove any personal copies of the two skills.
