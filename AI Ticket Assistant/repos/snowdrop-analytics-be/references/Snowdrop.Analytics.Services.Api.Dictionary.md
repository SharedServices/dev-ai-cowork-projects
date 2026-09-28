﻿# Snowdrop.Analytics.Services.Api - API Dictionary

Repo: snowdrop-analytics-be
Source: Snowdrop.Analytics.Services.Api.json

## Endpoints

### GET /datadictionary/tables
- Tags: DataDictionary
- Response 200: DataDictionaryResponseOfDataDictionaryTable

### GET /datadictionary/tables/columns
- Tags: DataDictionary
- Response 200: DataDictionaryResponseOfDataDictionaryColumn

### GET /datadictionary/tables/columns/download
- Tags: DataDictionary
- Response 200: (no body)

### GET /etlstatus
- Tags: EtlStatus
- Response 200: EventEtlStatusResponse
- Response 404: ProblemDetails

### GET /powerbilinks
- Tags: PowerBiLinks
- Response 200: PowerBiLinksResponse
- Response 404: ProblemDetails

### GET /reports
- Tags: Reports
- Response 200: Report[]

### POST /reports
- Tags: Reports
- Request body: PostReportRequest
- Response 200: (no body)

### DELETE /reports/report
- Tags: Reports
- Query params: id: string, required
- Response 404: ProblemDetails
- Response 204: (no body)

### GET /reports/report
- Tags: Reports
- Query params: id: string, required
- Response 404: ProblemDetails

## Schemas

**DataDictionaryColumn**
  - tableName: ['null', 'string'] (required)
  - name: ['null', 'string'] (required)
  - order: ['integer', 'string'](int32) (required)
  - dataType: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - relatedTable: ['null', 'string'] (required)

**DataDictionaryResponseOfDataDictionaryColumn**
  - published: ['null', 'string'](date-time)
  - items: ['null', 'array']

**DataDictionaryResponseOfDataDictionaryTable**
  - published: ['null', 'string'](date-time)
  - items: ['null', 'array']

**DataDictionaryTable**
  - tableName: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)

**EventCategoryEtlStatus**
  - eventCategory: ['null', 'string'] (required)
  - last5Minutes: ['integer', 'string'](int32) (required)
  - last60Minutes: ['integer', 'string'](int32) (required)
  - last12Hours: ['integer', 'string'](int32) (required)

**EventEtlStatusResponse**
  - categories: EventCategoryEtlStatus[] (required)
  - unprocessedEvents: ['integer', 'string'](int32) (required)

**PostReportRequest**
  - fileName: string (required)
  - displayName: string (required)
  - description: string (required)
  - base64Content: string(byte) (required)
  - content: ['null', 'string'](byte)

**PowerBiLinksResponse**
  - customerLink: ['null', 'string'] (required)
  - vendorLink: ['null', 'string'] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**Report**
  - id: string (required)
  - displayName: string (required)
  - lastUpdated: ['null', 'string'](date-time) (required)
  - description: string (required)

