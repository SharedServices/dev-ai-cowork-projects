﻿# Snowdrop.Sets.Services.Administration - API Dictionary

Repo: snowdrop-sets-be
Source: Snowdrop.Sets.Services.Administration.json

## Endpoints

### POST /companies
- Tags: Companies
- Request body: CompanySetConfigurationRequest
- Response 200: SetApiResponse

### POST /payers
- Tags: Payers
- Request body: PayerSetConfigurationRequest
- Response 200: SetApiResponse

### POST /sets
- Tags: Sets
- Request body: CreateSetRequest
- Response 200: SetApiResponse
- Response 409: ProblemDetails

### GET /sets/{domain}/{entityType}/displayset
- Tags: Sets
- Path params: domain: SetDomain, required; entityType: string, required
- Response 200: DisplaySet
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /sets/{domain}/{entityType}/displayset
- Tags: Sets
- Path params: domain: SetDomain, required; entityType: string, required
- Request body: DisplaySetRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /sets/duplicates
- Tags: Sets
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 409: ProblemDetails

### POST /sets/import
- Tags: Sets
- Request body: ImportSetValuesRequest
- Response 200: SetApiResponse
- Response 409: ProblemDetails

### PUT /sets/profile
- Tags: Sets
- Request body: UpdateSetProfileRequest
- Response 200: SetApiResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /sets/values
- Tags: Sets
- Request body: UpdateSetValuesRequest
- Response 200: SetApiResponse
- Response 409: ProblemDetails

## Schemas

**CompanySetConfigurationRequest**
  - setId: string(uuid) (required)
  - companies: string(uuid)[] (required)
  - divisions: string(uuid)[] (required)

**CreateSetRequest**
  - setTypeIdentity: SetTypeIdentity (required)
  - name: string (required)
  - description: string (required)
  - createdDate: string(date-time) (required)

**DisplaySet**
  - organizationId: string(uuid) (required)
  - setTypeIdentity: SetTypeIdentity (required)
  - setIdentity: object (required)
  - pinnedValues: PinnedValue[]
  - id: string
  - partition: string

**DisplaySetRequest**
  - setId: ['null', 'string'](uuid) (required)
  - isFactorySet: boolean (required)
  - pinnedValues: SetValueIdentity[] (required)

**DuplicateNameSearchRequest**
  - setTypeIdentity: SetTypeIdentity (required)
  - name: string (required)
  - excludedSetId: ['null', 'string'](uuid) (required)

**DuplicateNameSearchResponse**
  - nameAlreadyInUse: boolean (required)
  - usingSetId: ['null', 'string'](uuid) (required)
  - name: string (required)

**ImportingSourceSet**
  - setId: string(uuid) (required)
  - isFactory: boolean (required)

**ImportSetValuesRequest**
  - setId: string(uuid) (required)
  - setTypeIdentity: SetTypeIdentity (required)
  - importExcelBase64: ['null', 'string'] (required)
  - sourceSets: ImportingSourceSet[] (required)
  - replaceEntireSet: boolean (required)

**PayerHeader**
  - payerId: string(uuid) (required)
  - name: ['null', 'string'] (required)

**PayerSetConfigurationRequest**
  - setId: string(uuid) (required)
  - payers: PayerHeader[] (required)
  - plans: PlanHeader[] (required)

**PinnedValue**
  - value: SetValueIdentity (required)
  - displayOrder: ['integer', 'string'](int32) (required)

**PlanHeader**
  - planId: string(uuid) (required)
  - name: ['null', 'string'] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SetApiResponse**
  - setId: string(uuid) (required)

**SetDomain**
  - (no properties)

**SetIdentity**
  - setId: string(uuid)
  - isFactory: boolean

**SetTypeIdentity**
  - domain: SetDomain (required)
  - entityType: string (required)

**SetValue**
  - setValueIdentity: SetValueIdentity (required)
  - data: ['null', 'object']

**SetValueIdentity**
  - itemId: string
  - hyphenatedItemId: ['null', 'string']

**UpdateSetProfileRequest**
  - setId: string(uuid) (required)
  - setTypeIdentity: SetTypeIdentity (required)
  - name: string (required)
  - description: string (required)

**UpdateSetValuesRequest**
  - setId: string(uuid) (required)
  - setTypeIdentity: SetTypeIdentity (required)
  - setValues: SetValue[] (required)

