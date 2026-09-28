﻿# Snowdrop.ChangeHealthcare.Services - API Dictionary

Repo: snowdrop-change-healthcare-be
Source: Snowdrop.ChangeHealthcare.Services.json

## Endpoints

### GET /configuration
- Tags: Configuration
- Response 200: DwellerConfiguration

### POST /reports
- Tags: Report
- Request body: UploadReportRequest
- Response 200: (no body)

### PUT /reports
- Tags: Report
- Request body: UploadReportRequest
- Response 200: (no body)
- Response 404: ProblemDetails

### GET /reports/{organizationId}/{fileType}/{reportId}
- Tags: Report
- Path params: organizationId: string(uuid), required; fileType: string, required; reportId: string(uuid), required
- Response 200: ReportResponse
- Response 404: ProblemDetails

### PUT /reports/blob
- Tags: Report
- Request body: UploadReportRequest
- Response 200: (no body)
- Response 404: ProblemDetails

## Schemas

**DwellerConfiguration**
  - splunkHost: string (required)
  - splunkToken: string (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ReportResponse**
  - organizationId: string(uuid) (required)
  - reportId: string(uuid) (required)
  - submitterId: ['null', 'string'] (required)
  - fileType: ['null', 'string'] (required)
  - fileName: ['null', 'string'] (required)
  - data: ['null', 'string'] (required)
  - fileReceived: string(date-time) (required)

**UploadReportRequest**
  - organizationId: string(uuid) (required)
  - reportId: string(uuid) (required)
  - submitterId: ['null', 'string']
  - fileName: ['null', 'string'] (required)
  - fileType: ['null', 'string'] (required)
  - data: ['null', 'string'] (required)
  - fileReceived: ['null', 'string'](date-time)

