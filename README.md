![Version](https://img.shields.io/badge/version-2027.10.7-blue.svg)
# Unlimited Financials AI Ticket Assistant

A Claude workspace that speeds up diagnostic work on Jira tickets. It helps with each step of an investigation:

- Extracting the problem statement from the ticket.
- Collecting key references (environment, organization, entity ids).
- Determining what did happen, using Cosmos, Splunk, and API data.
- Determining what should have happened, using business rules and known failures kept per repository.
- Correcting the problem in code, when there is one.
- Reporting the outcome to Jira.
- Retaining the context, data, and analysis in a folder tied to the ticket.

Knowledge is organized by repository and knowledge type, so only the files relevant to a ticket are read.

This repo contains a Claude CoWork project you can start with immediately.  

You can use Claude Code after initial setup with both platforms fully supported.  

## Documentation

The user documents are in [`AI Ticket Assistant/documents/`](<AI Ticket Assistant/documents>):

1. [Introduction](<AI Ticket Assistant/documents/User Document - 1. Introduction.md>)
2. [Getting Started](<AI Ticket Assistant/documents/User Document - 2. Getting Started.md>)
3. [How to Use](<AI Ticket Assistant/documents/User Document - 3. How to Use.md>)
4. [How It Works](<AI Ticket Assistant/documents/User Document - 4. How It Works.md>)

## Folder layout

```
AI Ticket Assistant/
├── CLAUDE.md        Workspace instructions Claude reads during normal use
├── documents/       User documents and project maintenance notes
├── repos/           One folder per backend repository: details, business rules, known failures
├── business-logic/  Business rules that apply across repositories
├── known-failures/  Known failure patterns that apply across repositories
├── references/      Shared reference material (e.g. namespaces)
├── skills/          Source for the skills used in the investigation flow
├── templates/       Templates for new repos, business-logic categories, and known failures
├── tickets/         One case folder per ticket: summary log, downloaded evidence, code analysis
├── memories/        Instance-local memories (git-ignored)
└── local/           User-specific settings (git-ignored)
```

## ATTENTION: Upgrade note if installed prior to 10/7/2026

Previous versions installed skills into the Claude Code skills folder.  Starting with this version that is no longer necessary.
The project now has a structured versioning and upgrade mechanism so it is critical that you read the "Getting Started" document again.
You will be running "upgrade project" which will clean out some old skills and properly boot strap versioning.

