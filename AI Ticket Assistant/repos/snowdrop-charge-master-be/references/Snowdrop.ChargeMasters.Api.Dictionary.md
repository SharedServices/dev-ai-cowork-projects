﻿# Snowdrop.ChargeMasters.Api - API Dictionary

Repo: snowdrop-charge-master-be
Source: Snowdrop.ChargeMasters.Api.json

## Endpoints

### GET /charge-masters
- Tags: ChargeMasters
- Response 200: ChargeMasterWithCompanyNameResponse[]

### GET /charge-masters/companies/{companyId}
- Tags: ChargeMasters
- Path params: companyId: string(uuid), required
- Response 200: ChargeMasterResponse[]

### POST /charge-masters/companies/{companyId}
- Tags: ChargeMasters
- Path params: companyId: string(uuid), required
- Request body: ChargeMasterCreateRequest
- Response 200: ChargeMasterIdResponse

### GET /charge-masters/companies/{companyId}/{chargeMasterId}
- Tags: ChargeMasters
- Path params: companyId: string(uuid), required; chargeMasterId: string(uuid), required
- Response 200: ChargeMasterResponse

### PUT /charge-masters/companies/{companyId}/{chargeMasterId}
- Tags: ChargeMasters
- Path params: companyId: string(uuid), required; chargeMasterId: string(uuid), required
- Request body: ChargeMasterUpdateRequest
- Response 200: (no body)

### DELETE /charge-masters/companies/{companyId}/{chargeMasterId}
- Tags: ChargeMasters
- Path params: companyId: string(uuid), required; chargeMasterId: string(uuid), required
- Response 200: (no body)

### GET /charge-masters/companies/{companyId}/{chargeMasterId}/export
- Tags: ChargeMasterExports
- Path params: companyId: string(uuid), required; chargeMasterId: string(uuid), required
- Response 200: (no body)

### GET /charge-masters/companies/{companyId}/{chargeMasterId}/export/{fileName}
- Tags: ChargeMasterExports
- Path params: companyId: string(uuid), required; chargeMasterId: string(uuid), required; fileName: string, required
- Response 200: (no body)

### PUT /charge-masters/companies/{companyId}/{chargeMasterId}/fees
- Tags: ChargeMasters
- Path params: companyId: string(uuid), required; chargeMasterId: string(uuid), required
- Request body: ChargeMasterFeesUpdateRequest
- Response 200: (no body)

### POST /charge-masters/companies/{companyId}/by-name
- Tags: ChargeMasters
- Path params: companyId: string(uuid), required
- Request body: ChargeMasterSearchByNameRequest
- Response 200: ChargeMasterSearchByNameResponse

### POST /charge-masters/companies/{companyId}/import
- Tags: ChargeMasterImports
- Path params: companyId: string, required
- Response 200: ImportResponse

### POST /charge-masters/companies/{companyId}/import/{chargeMasterId}
- Tags: ChargeMasterImports
- Path params: companyId: string, required; chargeMasterId: string, required
- Response 200: ImportResponse

### PUT /charge-masters/companies/{companyId}/order
- Tags: ChargeMasters
- Path params: companyId: string(uuid), required
- Request body: CollectionOrderingRequestBase
- Response 200: (no body)

### GET /charge-masters/template
- Tags: ChargeMasterTemplates
- Response 200: FileStreamResult

## Schemas

**ChargeMasterCreateRequest**
  - name: ['null', 'string']
  - effectiveStartDate: object
  - effectiveEndDate: object
  - fees: ['null', 'array']

**ChargeMasterFeesUpdateRequest**
  - fees: ['null', 'array']

**ChargeMasterIdResponse**
  - chargeMasterId: string(uuid) (required)

**ChargeMasterResponse**
  - chargeMasterId: string(uuid)
  - name: ['null', 'string']
  - companyId: string(uuid)
  - effectiveStartDate: object
  - effectiveEndDate: object
  - fees: FeeResponse[]

**ChargeMasterSearchByNameRequest**
  - name: ['null', 'string']

**ChargeMasterSearchByNameResponse**
  - chargeMasterId: ['null', 'string'](uuid) (required)

**ChargeMasterUpdateRequest**
  - name: ['null', 'string']
  - effectiveStartDate: Date
  - effectiveEndDate: object

**ChargeMasterWithCompanyNameResponse**
  - chargeMasterId: string(uuid)
  - name: ['null', 'string']
  - companyName: ['null', 'string']
  - companyId: string(uuid)
  - effectiveStartDate: object
  - effectiveEndDate: object

**CollectionOrderingRequestBase**
  - order: ['null', 'array']

**Date**
  - (no properties)

**EntityTagHeaderValue**
  - tag: StringSegment
  - isWeak: boolean

**ErrorCodes**
  - (no properties)

**FeeRequest**
  - chargeCode: ['null', 'string']
  - modifier: ['null', 'string'](uuid)
  - ndc: ['null', 'string']
  - activityCode: ['null', 'string']
  - amount: ['number', 'string'](double)

**FeeResponse**
  - chargeCode: ['null', 'string']
  - modifier: ['null', 'string'](uuid)
  - ndc: ['null', 'string']
  - activityCode: ['null', 'string']
  - amount: ['number', 'string'](double)

**FeeScheduleImportError**
  - rowNumber: string (required)
  - errorCode: ErrorCodes (required)
  - error: string (required)

**FileStreamResult**
  - fileStream: Stream
  - contentType: ['null', 'string']
  - fileDownloadName: ['null', 'string']
  - lastModified: ['null', 'string'](date-time)
  - entityTag: object
  - enableRangeProcessing: boolean

**ImportResponse**
  - chargemasterId: string(uuid) (required)
  - importId: string (required)
  - importedFeeCount: ['integer', 'string'](int32) (required)
  - success: boolean (required)
  - errors: ['null', 'array']

**Stream**
  - (no properties)

**StringSegment**
  - buffer: ['null', 'string']
  - offset: ['integer', 'string'](int32)
  - length: ['integer', 'string'](int32)
  - value: ['null', 'string']
  - hasValue: boolean

