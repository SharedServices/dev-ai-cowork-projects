﻿# Snowdrop.Identifiers.Services.Api.Public - API Dictionary

Repo: snowdrop-identifiers-be
Source: Snowdrop.Identifiers.Services.Api.Public.json

## Endpoints

### GET /entity/{entityType}/{entityId}
- Tags: EntityIdentifiers
- Path params: entityType: string, required; entityId: string(uuid), required
- Response 200: EntityIdentifierResponse[]

### POST /entity/{entityType}/{entityId}/identifier/{identifierId}/values
- Tags: EntityIdentifiers
- Path params: entityType: string, required; entityId: string(uuid), required; identifierId: string(uuid), required
- Request body: IdentifierValueRequest[]
- Response 200: IdentifierValueResponse[]
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### POST /entity/{entityType}/{entityId}/values
- Tags: EntityIdentifiers
- Path params: entityType: string, required; entityId: string(uuid), required
- Request body: CreateIdentifiersValuesRequest
- Response 204: (no body)
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### GET /entity/{entityType}/forcreation
- Tags: EntityIdentifiers
- Path params: entityType: string, required
- Response 200: IdentifierResponse[]

### GET /entity/{entityType}/forsearch
- Tags: EntityIdentifiers
- Path params: entityType: string, required
- Response 200: IdentifierResponse[]

### POST /entity/{entityType}/identifier/{identifierId}/search
- Tags: EntityIdentifiers
- Path params: entityType: string, required; identifierId: string(uuid), required
- Request body: SearchByValueRequest
- Response 200: string(uuid)[]

### POST /entity/{entityType}/identifier/{identifierId}/value/isunique
- Tags: EntityIdentifiers
- Path params: entityType: string, required; identifierId: string(uuid), required
- Request body: IsUniqueIdentifierValueRequest
- Response 200: boolean

## Schemas

**CreateIdentifiersValuesRequest**
  - values: ['null', 'array'] (required)

**Date**
  - (no properties)

**EntityIdentifierResponse**
  - identifierId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - editable: boolean (required)
  - enforceUniqueness: boolean (required)
  - scope: IdentifierScope (required)
  - values: ['null', 'array'] (required)
  - isRequired: boolean (required)

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

**IdentifierValue**
  - identifierId: string(uuid) (required)
  - value: ['null', 'string'] (required)
  - startDate: Date (required)

**IdentifierValueRequest**
  - identifierValueId: ['null', 'string'](uuid) (required)
  - value: ['null', 'string'] (required)
  - startDate: object (required)
  - endDate: object (required)

**IdentifierValueResponse**
  - id: string(uuid) (required)
  - value: ['null', 'string'] (required)
  - startDate: object (required)
  - endDate: object (required)

**IsUniqueIdentifierValueRequest**
  - id: ['null', 'string'](uuid) (required)
  - value: ['null', 'string'] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SearchByValueRequest**
  - value: ['null', 'string'] (required)
  - date: Date (required)

