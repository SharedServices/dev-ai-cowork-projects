![Version](https://img.shields.io/badge/version-2026.10.21-blue.svg)
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

This repo contains a Claude Cowork project you can start with immediately. Claude Code is also supported, in three configurations:

- Claude Cowork, started in this project, with the source repositories attached.
- Claude Code, started in this project, with the source repositories at the path recorded by `upgrade project`.
- Claude Code, started in a source repository, with this project added as a second folder or brought in with the `activate-cowork` skill ("activate cowork {name}", Claude Code only).

## Getting started

1. Download or clone this repo from [GitHub](https://github.com/SharedServices/dev-ai-cowork-projects).
2. Create a Cowork project from the `AI Ticket Assistant` folder and attach the parent folder that contains your source repositories.
3. Say "upgrade project" in Cowork, then in Claude Code. Repeat it after every pull from GitHub.

The Getting Started document has the details, including the Claude for Chrome setup that Splunk, Instana, and page capture depend on.

## Documentation

The user documents are in [`AI Ticket Assistant/documents/`](<AI Ticket Assistant/documents>):

1. [Introduction](<AI Ticket Assistant/documents/User Document - 1. Introduction.md>): what the workspace does and the platform configurations.
2. [Getting Started](<AI Ticket Assistant/documents/User Document - 2. Getting Started.md>): download, project setup, Claude for Chrome, `upgrade project`, and starting a ticket.
3. [How to Use](<AI Ticket Assistant/documents/User Document - 3. How to Use.md>): the commands and a sample conversation.
4. [How It Works](<AI Ticket Assistant/documents/User Document - 4. How It Works.md>): skills, the ticket folder, data-gathering surfaces, API testing, and safety rules.

The same folder holds maintenance notes (`project-maintenance.md`, `workspace-plan.md`) and plans for known-failure detection. These are for people changing the workspace, not for using it.

## Folder layout

```
AI Ticket Assistant/
├── CLAUDE.md        Workspace instructions Claude reads during normal use
├── README.md        History and context for CLAUDE.md; maintenance only, not read during investigations
├── API Tests/       One procedure per API test scenario
├── business-logic/  Business rules that apply across repositories
├── documents/       User documents, project maintenance notes, and plans
├── ERAs/            Saved test ERA files (git-ignored)
├── known-failures/  Known failure patterns that apply across repositories
├── local/           User-specific settings (git-ignored)
├── memories/        Instance-local memories (git-ignored)
├── references/      Shared reference material (e.g. namespaces, Nimbus organization lookup)
├── repos/           One folder per backend repository: details, business rules, known failures
├── scratch/         Disposable one-off scripts
├── skills/          Source for the skills used in the investigation flow, including activate-cowork
├── templates/       Templates for new repos, business-logic categories, and known failures
├── tickets/         One case folder per ticket: summary log, downloaded evidence, code analysis
└── upgrade/         The project version and the per-platform steps that "upgrade project" runs
```

## Upgrading

The project has one version, set in `upgrade/version.md` and shown in the badge above. Each platform records the version it last upgraded to in `local/user.md`. After a pull, say "upgrade project" in Cowork and in Claude Code: each runs only the steps newer than its recorded version, and tells you when the other platform is behind.

Skills are saved to your Claude account from the cards that `upgrade project` presents in Cowork. A saved card does not update when the skill source changes, so re-save the cards after a pull that changes a skill.

### If you installed before 10/7/2026

Earlier versions installed skills into the Claude Code skills folder. That is no longer needed. Read the Getting Started document again: `upgrade project` replaces the earlier `initiate project` step, removes old copies of the skills, and sets up versioning.

### Version 2026.10.21

Adds the `api-testing` and `era-builder` skills and the `API Tests/` folder. Run "upgrade project" in Cowork and save the new cards, then run it in Claude Code to remove any personal copies of the two skills.
