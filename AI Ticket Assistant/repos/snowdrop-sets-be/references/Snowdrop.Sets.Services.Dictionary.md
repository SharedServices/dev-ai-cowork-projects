﻿# Snowdrop.Sets.Services - API Dictionary

Repo: snowdrop-sets-be
Source: Snowdrop.Sets.Services.json

## Endpoints

### GET /cache/{setId}
- Tags: Cache
- Path params: setId: string(uuid), required
- Response 200: CachedSet

### POST /cache/membership
- Tags: Cache
- Request body: SetMembershipRequest
- Response 200: SetValueMembership[]

### GET /companies/{setId}
- Tags: Companies
- Path params: setId: string(uuid), required
- Response 200: CompanySetResponse
- Response 404: ProblemDetails

### GET /payers/{setId}
- Tags: Payers
- Path params: setId: string(uuid), required
- Response 200: PayerSetResponse
- Response 404: ProblemDetails

### GET /set-factories/{entityType}
- Tags: FactorySets
- Path params: entityType: string, required
- Response 200: FactorySetHeader[]

### GET /set-factories/{entityType}/Summary
- Tags: FactorySets
- Path params: entityType: string, required
- Response 200: FactorySetSummary[]

### GET /set-factories/{setId}/header
- Tags: FactorySets
- Path params: setId: string(uuid), required
- Response 404: ProblemDetails

### GET /set-factories/{setId}/keys
- Tags: FactorySets
- Path params: setId: string(uuid), required
- Response 404: ProblemDetails

### GET /set-factories/{setId}/values
- Tags: FactorySets
- Path params: setId: string(uuid), required
- Response 404: ProblemDetails

### GET /set-factories/Summary
- Tags: FactorySets
- Response 200: FactorySetTypeSummary[]

### GET /set-types/{domain}/{entityType}
- Tags: SetTypes
- Path params: domain: SetDomain, required; entityType: string, required
- Response 200: SetHeader[]

### GET /set-types/list-all
- Tags: SetTypes
- Response 200: SetTypeHeaderResponse[]

### GET /set-values/{domain}/{entityType}/{itemId}
- Tags: SetValueMembership
- Path params: domain: SetDomain, required; entityType: string, required; itemId: string, required
- Response 200: SetLabel[]

### POST /set-values/membership
- Tags: SetValueMembership
- Request body: SetTypeMembershipRequest
- Response 200: SetLabel[]

### GET /sets/{domain}/{entityType}/displayset
- Tags: Sets
- Path params: domain: SetDomain, required; entityType: string, required
- Response 200: DisplaySetResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /sets/{setId}
- Tags: Sets
- Path params: setId: string(uuid), required
- Response 200: SetResponse
- Response 404: ProblemDetails

### GET /sets/{setId}/header
- Tags: Sets
- Path params: setId: string(uuid), required
- Response 200: SetHeader
- Response 404: ProblemDetails

### GET /sets/{setId}/values
- Tags: Sets
- Path params: setId: string(uuid), required
- Response 200: SetValuesResponse
- Response 404: ProblemDetails

## Schemas

**CachedSet**
  - values: ['null', 'array'] (required)

**CachedSetValue**
  - itemId: ['null', 'string'] (required)
  - hyphenatedItemId: ['null', 'string']

**CompanySetResponse**
  - organizationId: string(uuid) (required)
  - setId: string(uuid) (required)
  - setTypeIdentity: object (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - companies: string(uuid)[] (required)
  - divisions: string(uuid)[] (required)

**DisplaySetResponse**
  - allSet: boolean (required)
  - setId: ['null', 'string'](uuid) (required)
  - setValues: SetValueIdentity[]
  - pinnedValues: SetValueIdentity[]

**FactorySetHeader**
  - entityType: ['null', 'string']
  - name: ['null', 'string']
  - description: ['null', 'string']
  - archived: boolean
  - setId: string(uuid)

**FactorySetSummary**
  - name: ['null', 'string']
  - description: ['null', 'string']
  - archived: boolean
  - itemCount: ['integer', 'string'](int32)
  - setId: string(uuid)

**FactorySetTypeSummary**
  - setTypeIdentity: object
  - setCount: ['integer', 'string'](int32)

**PayerHeader**
  - payerId: string(uuid) (required)
  - name: ['null', 'string'] (required)

**PayerSetResponse**
  - organizationId: string(uuid) (required)
  - setId: string(uuid) (required)
  - setTypeIdentity: object (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - payers: PayerHeader[] (required)
  - plans: PlanHeader[] (required)

**PlanHeader**
  - planId: string(uuid) (required)
  - name: ['null', 'string'] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SetDomain**
  - (no properties)

**SetHeader**
  - setId: string(uuid) (required)
  - setTypeIdentity: object (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - isFactory: boolean (required)
  - itemCount: ['integer', 'string'](int32) (required)

**SetKey**
  - partition: ['null', 'string']
  - setId: string(uuid)
  - isFactoryKey: boolean

**SetLabel**
  - setId: string(uuid) (required)
  - setTypeIdentity: SetTypeIdentity (required)
  - name: ['null', 'string'] (required)
  - isFactorySet: boolean (required)

**SetMembershipRequest**
  - valueRequests: SetValueMembershipRequest[]

**SetResponse**
  - organizationId: string(uuid) (required)
  - setId: string(uuid) (required)
  - setTypeIdentity: object (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - setValues: SetValueResponse[] (required)
  - createdDate: string(date-time) (required)

**SetTypeHeaderResponse**
  - setTypeIdentity: SetTypeIdentity (required)
  - domain: string (required)
  - name: string (required)
  - inUse: boolean (required)

**SetTypeIdentity**
  - domain: SetDomain (required)
  - entityType: string (required)

**SetTypeMembershipRequest**
  - domain: SetDomain
  - entityType: ['null', 'string']
  - itemId: ['null', 'string']

**SetValue**
  - setValueIdentity: SetValueIdentity (required)
  - data: ['null', 'object']

**SetValueIdentity**
  - itemId: string
  - hyphenatedItemId: ['null', 'string']

**SetValueKey**
  - key: SetKey (required)
  - itemId: ['null', 'string'] (required)

**SetValueMembership**
  - setValueKey: SetValueKey (required)
  - isInSet: boolean (required)

**SetValueMembershipRequest**
  - setId: string(uuid)
  - itemId: string(uuid)

**SetValueResponse**
  - setValueIdentity: string (required)
  - data: object (required)

**SetValuesResponse**
  - setId: string(uuid) (required)
  - setValues: SetValue[] (required)

