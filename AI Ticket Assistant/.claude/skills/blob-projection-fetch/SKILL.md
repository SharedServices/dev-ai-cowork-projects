---
name: blob-projection-fetch
description: >
  Fetch a projection blob (e.g. "the remittance projection") from Azure Blob Storage for an Unlimited
  Systems environment and save it into a ticket's downloads/ folder. The blob is downloaded with
  the Azure CLI (`az storage blob download`, `--auth-mode login`, or `key` on ninja). Use when the user
  says "get/fetch/pull the {name} projection" or "blob projection".
---

# Blob Projection Fetch

Projection blobs are JSON snapshots stored by services in Azure Blob Storage. They are read with the Azure CLI
(Entra login, or the account key on ninja). The Azure MCP storage tool cannot download blob content (it returns
properties only), so it is not used for the download.

## Resolve

1. Resolve the repo through root `CLAUDE.md`'s `## Repos` table, then open that repo's
   `references/blob_projections.md` and find the entry by the name the user used. Do not infer a path for
   a projection with no entry; ask.
2. Take the account type and path template from the entry. Build the account name from root `CLAUDE.md`'s
   "Azure Blob Storage" section (includes the `exchange` exception). The first path segment of the
   template is the container; the rest is the blob name. Fill placeholders in lowercase from known values
   (ticket summary, pasted application URL). Ask only for values still missing.
3. Subscription is `uf-kingdom - {Env}` with the env name capitalized.
4. Destination: if a ticket is active, `{project-path}\tickets\{TICKET-ID}\downloads\`; otherwise
   `{project-path}\scratch\` (see `ticket-workflow`). Filename: `{env}_{projection-name-no-spaces}_{id}_{yyyyMMddTHHmmZ}.json`
   with the timestamp from `date -u` in bash, computed fresh. Never reuse a filename. Show the full
   absolute path, with no placeholder tokens left in it.

## Fetch

Input is a direct request ("get the remittance projection for ..."). Resolve as above, reading root
`CLAUDE.md` and the repo's `references/blob_projections.md` from the project root (root `CLAUDE.md`,
"Folder locations").

Then:

1. State the subscription, account, container, and blob name that will be used, then download the blob
   with `az storage blob download --auth-mode {mode} --account-name {account} --container-name
   {container} --name "{blob}" --file "{destination}" --no-progress`, where `{mode}` is `login` for every
   env except ninja and `key` for ninja (see item 4). The `--subscription` value is
   the resolved subscription. Production environments are read-only here; this skill never writes,
   deletes, or overwrites blobs. Optionally call the Azure MCP `storage_blob_get` first to confirm the
   blob exists and get its size and last-modified time; it cannot download content (on envs other than
   ninja it works with the signed-in identity; on ninja it returns 403).

   On ninja, `--auth-mode key` makes `az` look up the account key itself, which can take longer than two
   minutes. If it is slow, fetch the key once and pass it through the environment instead (never print it
   or write it to a file in the project):
   `export AZURE_STORAGE_KEY="$(az storage account keys list --account-name {account} -g {resource-group} --subscription "{subscription}" --query "[0].value" -o tsv)"`,
   then run the same download command. This took about 3 seconds. The resource group of
   `kingninjasharpsdstg` is `king-ninja-rg-sharp-snowdrop-ue`; look up another account's with
   `az storage account list --subscription "{subscription}" --query "[?name=='{account}'].resourceGroup" -o tsv`.
2. Save the content exactly as downloaded to the destination path. Do not reformat or edit it. Create the
   destination folder if missing. If the filename already exists, add a new timestamp rather than
   overwriting.
3. Report: the full destination path, size, top-level field names, and blob last-modified time if
   `storage_blob_get` was called. Check the saved file size against the blob size. Do not print the contents unless asked.
4. Auth method by env:
   - **Every env except ninja:** `--auth-mode login` (Entra). The signed-in account holds Storage Blob Data
     Reader on the subscription of each of these envs, and a blob listing with login auth succeeded on all
     ten. Do not use account keys here: `listKeys` on the storage accounts is denied on all ten
     (`AuthorizationFailed`).
   - **ninja:** `--auth-mode key`. The signed-in account has no Storage Blob Data role there (login auth and
     the Azure MCP `storage` tool both fail, 403 `AuthorizationPermissionMismatch`), but it can list the
     storage account keys. The key is used read-only, only to download.
   If the method for the env returns an authorization error, say so plainly and stop. Do not fall back to
   SAS tokens, connection strings, `curl`, or other direct HTTP calls, and do not use a different auth mode
   than the one listed for the env.
5. If the blob is not found, report the full account, container, and blob name that was tried. Do not
   guess alternative paths; path shapes differ per projection.

## Write scope

This skill writes only the fetched blob file (into `downloads/` or `scratch/`). Logging it in `summary.md`
(filename reference, not contents) follows `ticket-workflow`.
