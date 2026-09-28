﻿# Snowdrop.CustomFields.Services.Api.Configuration - API Dictionary

Repo: snowdrop-custom-fields-be
Source: Snowdrop.CustomFields.Services.Api.Configuration.json

## Endpoints

### GET /
- Tags: CustomFields
- Response 200: FieldResponse[]

### GET /{id}
- Tags: CustomFields
- Path params: id: string(uuid), required
- Response 200: FieldResponse
- Response 404: ProblemDetails

### POST /systems/{systemId}/isunique
- Tags: CustomFields
- Path params: systemId: string(uuid), required
- Request body: IsUniqueCustomFieldRequest
- Response 200: boolean

### POST /systems/{systemId}/sections/{sectionId}
- Tags: CustomFields
- Path params: systemId: string(uuid), required; sectionId: string(uuid), required
- Request body: CreateFieldRequest
- Response 200: FieldResponse
- Response 400: ProblemDetails

### PUT /systems/{systemId}/sections/{sectionId}/fields/{fieldId}
- Tags: CustomFields
- Path params: systemId: string(uuid), required; sectionId: string(uuid), required; fieldId: string(uuid), required
- Request body: UpdateFieldRequest
- Response 200: FieldResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

## Schemas

**CreateFieldRequest**
  - labelName: string (required)
  - enabled: boolean (required)
  - size: FieldSize (required)
  - options: object (required)

**FieldResponse**
  - id: string(uuid) (required)
  - systemId: string(uuid) (required)
  - sectionId: string(uuid) (required)
  - labelName: string (required)
  - enabled: boolean (required)
  - size: FieldSize (required)
  - options: object (required)

**FieldSize**
  - (no properties)

**FieldType**
  - (no properties)

**IFieldTypeOptions**
  - type: FieldType

**IsUniqueCustomFieldRequest**
  - id: ['null', 'string'](uuid) (required)
  - labelName: string (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**UpdateFieldRequest**
  - labelName: string (required)
  - enabled: boolean (required)
  - size: FieldSize (required)
  - options: IFieldTypeOptions (required)

