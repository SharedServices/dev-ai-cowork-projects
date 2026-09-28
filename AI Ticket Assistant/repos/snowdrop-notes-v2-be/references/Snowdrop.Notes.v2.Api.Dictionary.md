﻿# Snowdrop.Notes.v2.Api - API Dictionary

Repo: snowdrop-notes-v2-be
Source: Snowdrop.Notes.v2.Api.json

## Endpoints

### POST /signalr/groups/entitytype/{entityType}/entity/{entityId}/users/add
- Tags: Signalr
- Path params: entityType: string, required; entityId: string, required
- Response 200: (no body)

### POST /signalr/groups/entitytype/{entityType}/entity/{entityId}/users/remove
- Tags: Signalr
- Path params: entityType: string, required; entityId: string, required
- Response 200: (no body)

### POST /signalr/notes-v2-hub/negotiate
- Tags: Signalr
- Query params: user: string
- Response 200: (no body)

## Schemas

