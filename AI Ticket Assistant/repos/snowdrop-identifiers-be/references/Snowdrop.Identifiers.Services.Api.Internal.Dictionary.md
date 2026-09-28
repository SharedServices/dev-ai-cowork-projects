﻿# Snowdrop.Identifiers.Services.Api.Internal - API Dictionary

Repo: snowdrop-identifiers-be
Source: Snowdrop.Identifiers.Services.Api.Internal.json

## Endpoints

### POST /configuration/entity/{entityType}/identifiers
- Tags: Configuration
- Path params: entityType: string, required
- Request body: CreateIdentifierRequest
- Response 200: IdentifierResponse
- Response 400: ProblemDetails

### POST /configuration/entity/{entityType}/identifiers/findbyname
- Tags: Configuration
- Path params: entityType: string, required
- Request body: GetIdentifierByNameRequest
- Response 200: IdentifierResponse
- Response 404: ProblemDetails

### POST /values/entity/{entityType}/{entityId}/findbyname
- Tags: Values
- Path params: entityType: string, required; entityId: string(uuid), required
- Request body: GetIdentifierByNameRequest
- Response 200: IdentifierValueResponse[]

### GET /values/entity/{entityType}/{entityId}/identifier/{identifierId}
- Tags: Values
- Path params: entityType: string, required; entityId: string(uuid), required; identifierId: string(uuid), required
- Response 200: IdentifierValueResponse[]

### POST /values/entity/{entityType}/{entityId}/identifier/{identifierId}/value
- Tags: Values
- Path params: entityType: string, required; entityId: string(uuid), required; identifierId: string(uuid), required
- Request body: CreateIdentifierValueRequest
- Response 200: IdentifierValueResponse
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### DELETE /values/entity/{entityType}/{entityId}/identifier/{identifierId}/value/{valueId}
- Tags: Values
- Path params: entityType: string, required; entityId: string(uuid), required; identifierId: string(uuid), required; valueId: string(uuid), required
- Response 204: (no body)

### PUT /values/entity/{entityType}/{entityId}/identifier/{identifierId}/value/{valueId}
- Tags: Values
- Path params: entityType: string, required; entityId: string(uuid), required; identifierId: string(uuid), required; valueId: string(uuid), required
- Request body: CreateIdentifierValueRequest
- Response 200: IdentifierValueResponse
- Response 409: ProblemDetails
- Response 404: ProblemDetails

### POST /values/entity/{entityType}/identifier/{identifierId}/search
- Tags: Values
- Path params: entityType: string, required; identifierId: string(uuid), required
- Request body: SearchByValueRequest
- Response 200: string(uuid)[]

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

**CreateIdentifierValueRequest**
  - value: ['null', 'string'] (required)
  - startDate: object (required)
  - endDate: object (required)

**Date**
  - (no properties)

**GetIdentifierByNameRequest**
  - name: ['null', 'string'] (required)

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

**IdentifierValueResponse**
  - id: string(uuid) (required)
  - value: ['null', 'string'] (required)
  - startDate: object (required)
  - endDate: object (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SearchByValueRequest**
  - value: ['null', 'string'] (required)
  - date: Date (required)

