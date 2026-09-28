﻿# Snowdrop.CustomFields.Services.Api.Public - API Dictionary

Repo: snowdrop-custom-fields-be
Source: Snowdrop.CustomFields.Services.Api.Public.json

## Endpoints

### GET /entities/{entityId}/systems/{systemId}/sections/{sectionId}/fields
- Tags: CustomFields
- Path params: entityId: string(uuid), required; systemId: string(uuid), required; sectionId: string(uuid), required
- Response 200: FieldValueResponse[]

### POST /entities/{entityId}/systems/{systemId}/sections/{sectionId}/setfields
- Tags: CustomFields
- Path params: entityId: string(uuid), required; systemId: string(uuid), required; sectionId: string(uuid), required
- Request body: SetFieldValuesForSectionRequest
- Response 204: (no body)
- Response 400: ProblemDetails

## Schemas

**FieldSize**
  - (no properties)

**FieldType**
  - (no properties)

**FieldValueRequest**
  - fieldId: string(uuid) (required)
  - value: ['null', 'string'] (required)

**FieldValueResponse**
  - fieldId: string(uuid) (required)
  - labelName: string (required)
  - size: FieldSize (required)
  - value: ['null', 'string'] (required)
  - options: object (required)

**IFieldTypeOptions**
  - type: FieldType

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SetFieldValuesForSectionRequest**
  - values: FieldValueRequest[] (required)

