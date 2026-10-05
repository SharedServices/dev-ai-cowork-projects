---
name: blob-projection-fetch
description: >
  Fetch a projection blob (e.g. "the remittance projection") from Azure Blob Storage for an Unlimited
  Systems environment and save it into a ticket's downloads/ folder. Claude Code downloads the blob with
  the Azure CLI (`az storage blob download --auth-mode login`). The Claude app (Cowork) cannot reach Azure, so there it resolves the account, container,
  blob path, and destination, then outputs a self-contained "fetch blob projection" block to paste into
  Claude Code. Use when the user says "get/fetch/pull the {name} projection", "blob projection", or pastes
  a block starting with "fetch blob projection". Works in a Claude Code session that is not attached to
  any project when given a pasted block.
---

# Blob Projection Fetch

Projection blobs are JSON snapshots stored by services in Azure Blob Storage. Only Claude Code can read
them (Azure CLI with Entra login). The Azure MCP storage tool cannot download blob content (it returns
properties only), so it is not used for the download. The Claude app resolves everything and hands off; Claude Code downloads and saves.

## The handoff block

A block is self-contained: every value needed to download and save is in it. A Claude Code session with
this skill installed needs no other project knowledge to act on it.

```
fetch blob projection (read-only, Entra login)
tool: az storage blob download --auth-mode login
projection: {name as the user calls it}
env: {env}
subscription: uf-kingdom - {Env}
account: {storage account name}
container: {container}
blob: {blob name, including any folders}
save to: {full absolute destination path, filename included}
```

## On the Claude app (Cowork) — resolve, then hand off

Do not attempt the download; the sandbox cannot reach Azure and no Azure CLI or MCP is available.

1. Resolve the repo through root `CLAUDE.md`'s `## Repos` table, then open that repo's
   `references/blob_projections.md` and find the entry by the name the user used. Do not infer a path for
   a projection with no entry; ask.
2. Take the account type and path template from the entry. Build the account name from root `CLAUDE.md`'s
   "Azure Blob Storage" section (includes the `exchange` exception). The first path segment of the
   template is the container; the rest is the blob name. Fill placeholders in lowercase from known values
   (ticket summary, pasted `sdsh.unlimitedfinancials.{env}` URL). Ask only for values still missing.
3. Subscription is `uf-kingdom - {Env}` with the env name capitalized.
4. Destination: if a ticket is active, `{connected-project-path}\tickets\{TICKET-ID}\downloads\`; otherwise
   `{connected-project-path}\scratch\`. Filename: `{env}_{projection-name-no-spaces}_{id}_{yyyyMMddTHHmmZ}.json`
   with the timestamp from `date -u` in bash, computed fresh. Never reuse a filename. Show the full
   absolute path, with no placeholder tokens left in it.
5. Output the block above in its own code fence with nothing else inside it, and tell the user to paste it
   into Claude Code.
6. When the user reports it is saved, read the file from the destination path and continue. Log it in
   `summary.md` per `ticket-workflow` (filename reference, not contents).

## On Claude Code — fetch

Input is either a pasted block or a direct request ("get the remittance projection for ...").

**From a pasted block:** use the values as given. Do not re-derive or second-guess them.

**From a direct request:** resolve the way the Claude app does (steps 1–4 above), reading root
`CLAUDE.md` and the repo's `references/blob_projections.md` from the AI Ticket Assistant project folder (the
working directory, or the attached folder when Claude Code was started in another repo; if neither is
this project, ask for its path). Destination defaults to the `downloads/` of the ticket being worked in
this session (see `ticket-workflow`), otherwise the project's `scratch/`.

Then:

1. State the subscription, account, container, and blob name that will be used, then download the blob
   with `az storage blob download --auth-mode login --account-name {account} --container-name
   {container} --name "{blob}" --file "{destination}" --no-progress`. The `--subscription` value is
   the block's subscription. Production environments are read-only here; this skill never writes,
   deletes, or overwrites blobs. Optionally call the Azure MCP `storage_blob_get` first to confirm the
   blob exists and get its size and last-modified time; it cannot download content.
2. Save the content exactly as downloaded to the destination path. Do not reformat or edit it. Create the
   destination folder if missing. If the filename already exists, add a new timestamp rather than
   overwriting.
3. Report: the full destination path, size, top-level field names, and blob last-modified time if
   `storage_blob_get` was called. Check the saved file size against the blob size. Do not print the contents unless asked.
4. `az` with `--auth-mode login` (Entra) is the approved method. If it is unavailable or returns an
   authorization error, say so plainly and stop. Do not fall back to account keys, SAS tokens,
   connection strings, `curl`, or other direct HTTP calls.
5. If the blob is not found, report the full account, container, and blob name that was tried. Do not
   guess alternative paths; path shapes differ per projection.

## Write scope

Claude Code writes only the fetched blob file (into `downloads/` or `scratch/`). `summary.md` is written
by the Claude app side only.
