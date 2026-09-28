﻿# Snowdrop.Identifiers.Services.Api.Configuration - API Dictionary

Repo: snowdrop-identifiers-be
Source: Snowdrop.Identifiers.Services.Api.Configuration.json

## Endpoints

### POST /entity/{entityType}
- Tags: Entity
- Path params: entityType: string, required
- Request body: CreateIdentifierRequest
- Response 200: IdentifierResponse
- Response 400: ProblemDetails

### GET /entity/{entityType}
- Tags: Entity
- Path params: entityType: string, required
- Response 200: IdentifierResponse[]

### GET /entity/{entityType}/{id}
- Tags: Entity
- Path params: entityType: string, required; id: string(uuid), required
- Response 200: IdentifierResponse
- Response 404: ProblemDetails

### PUT /entity/{entityType}/{identifierId}
- Tags: Entity
- Path params: entityType: string, required; identifierId: string(uuid), required
- Request body: UpdateIdentifierRequest
- Response 200: IdentifierResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /entity/{entityType}/isunique
- Tags: Entity
- Path params: entityType: string, required
- Request body: IsUniqueIdentifierRequest
- Response 200: boolean

## Schemas

**CreateIdentifierRequest**
  - name: ['null', 'string'] (required)
  - enabled: boolean
  - editable: boolean
  - searchable: boolean
  - enforceUniqueness: boolean
  - includeInCreation: boolean
  - scope: IdentifierScope
  - isRequired: boolean

**IdentifierResponse**
  - id: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - enabled: boolean (required)
  - editable: boolean (required)
  - searchable: boolean (required)
  - enforceUniqueness: boolean (required)
  - includeInCreation: boolean (required)
  - scope: IdentifierScope (required)
  - isRequired: boolean (required)

**IdentifierScope**
  - name: ['null', 'string'] (required)
  - identities: ['null', 'array'] (required)

**IsUniqueIdentifierRequest**
  - id: ['null', 'string'](uuid) (required)
  - name: ['null', 'string'] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**UpdateIdentifierRequest**
  - name: ['null', 'string'] (required)
  - enabled: boolean
  - editable: boolean
  - searchable: boolean
  - enforceUniqueness: boolean
  - includeInCreation: boolean
  - scope: IdentifierScope
  - isRequired: boolean

