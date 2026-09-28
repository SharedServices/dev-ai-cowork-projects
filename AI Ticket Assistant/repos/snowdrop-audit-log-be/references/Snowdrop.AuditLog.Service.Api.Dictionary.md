﻿# Snowdrop.AuditLog.Service.Api - API Dictionary

Repo: snowdrop-audit-log-be
Source: Snowdrop.AuditLog.Service.Api.json

## Endpoints

### GET /{entityType}/{entityId}/details
- Tags: AuditLog
- Path params: entityType: string, required; entityId: string, required
- Query params: sortOrder: SortOrder; continuationToken: string
- Response 200: AuditLogDetails
- Response 404: ProblemDetails

### GET /{entityType}/{entityId}/search
- Tags: AuditLog
- Path params: entityType: string, required; entityId: string, required
- Query params: query: string; sortOrder: SortOrder; continuationToken: string
- Response 200: AuditLogDetails
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /{entityType}/{entityId}/summary
- Tags: AuditLog
- Path params: entityType: string, required; entityId: string, required
- Response 200: AuditLogSummary
- Response 404: ProblemDetails

### GET /{entityType}/related
- Tags: AuditLog
- Path params: entityType: string, required
- Response 200: RelatedEntity[]
- Response 404: ProblemDetails

### GET /lookup/guid/{lookupValue}
- Tags: GuidLookup
- Path params: lookupValue: string(uuid), required
- Response 200: GuidLookupResult
- Response 404: ProblemDetails

## Schemas

**AuditLogDetails**
  - auditLogEntries: ['null', 'array'] (required)
  - continuationToken: ['null', 'string'] (required)

**AuditLogEntry**
  - eventSummary: EventSummary (required)
  - data: ['null', 'object'] (required)

**AuditLogSummary**
  - firstEvent: EventSummary (required)
  - mostRecent: ['null', 'array'] (required)

**EventSummary**
  - name: ['null', 'string'] (required)
  - timestamp: string(date-time) (required)
  - userId: ['null', 'string'] (required)
  - number: ['integer', 'string'](int64) (required)

**GuidLookupResult**
  - entityLabel: ['null', 'string'] (required)
  - entityType: ['null', 'string'] (required)
  - kingdom: ['null', 'string'] (required)
  - sourceStream: ['null', 'string'] (required)
  - link: ['null', 'string'] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**RelatedEntity**
  - entityType: ['null', 'string'] (required)
  - displayName: ['null', 'string'] (required)

**SortOrder**
  - (no properties)

