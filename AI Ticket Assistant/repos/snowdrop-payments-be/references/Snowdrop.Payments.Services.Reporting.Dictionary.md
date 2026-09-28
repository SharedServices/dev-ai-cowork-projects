﻿# Snowdrop.Payments.Services.Reporting - API Dictionary

Repo: snowdrop-payments-be
Source: Snowdrop.Payments.Services.Reporting.json

## Endpoints

### GET /reporting
- Tags: Reports
- Query params: entity: string
- Response 200: Report[]

### GET /reporting/{reportId}/history/{runId}
- Tags: Reports
- Path params: reportId: string(uuid), required; runId: string(uuid), required
- Response 200: DownloadReportRunResponse

### GET /reporting/{reportId}/history/list/{groupBy}
- Tags: Reports
- Path params: reportId: string(uuid), required; groupBy: string, required
- Query params: limit: ['integer', 'string'](int32), required; continuationToken: string
- Response 200: ReportHistoryPage

### POST /reporting/generate/{reportId}
- Tags: Reports
- Path params: reportId: string(uuid), required
- Request body: ReportOptionsRequest
- Response 200: GenerateResponse

### GET /reporting/paymentremittancereconciliation
- Tags: PaymentRemittanceReconciliation
- Response 200: RemittanceReconciliationResponse

### GET /reporting/paymentremittancereconciliation/download
- Tags: PaymentRemittanceReconciliation
- Response 200: (no body)

## Schemas

**CompanyLocationDate**
  - ledgerDate: Date (required)
  - companyId: string(uuid) (required)
  - companyName: ['null', 'string'] (required)
  - locationId: ['null', 'string'](uuid) (required)
  - locationName: ['null', 'string'] (required)
  - payments: ['null', 'array'] (required)
  - totalReceived: ['number', 'string'](double)
  - fees: ['number', 'string'](double)
  - depositAmount: ['number', 'string'](double)

**Date**
  - (no properties)

**DownloadReportRunResponse**
  - content: ['null', 'string'] (required)
  - date: string(date-time) (required)
  - request: ReportOptionsRequest (required)

**GenerateResponse**
  - runId: string(uuid) (required)
  - content: ['null', 'string'] (required)

**IReportParameter**
  - name: ['null', 'string']
  - required: boolean
  - implicit: boolean
  - parameterType: ReportParameterType

**Payment**
  - paymentSpecificationId: string(uuid) (required)
  - entityId: string(uuid) (required)
  - entityType: ['null', 'string'] (required)
  - account: ['null', 'string'] (required)
  - receivedBy: string(uuid) (required)
  - paymentDetails: ['null', 'string'] (required)
  - totalReceived: ['number', 'string'](double) (required)
  - fees: ['number', 'string'](double) (required)
  - paymentDate: string(date-time) (required)
  - isRefund: boolean (required)
  - depositDate: object (required)
  - payoutId: ['null', 'string'] (required)
  - depositAmount: ['number', 'string'](double)

**RemittanceReconciliationResponse**
  - groupings: ['null', 'array'] (required)

**Report**
  - id: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - entity: ['null', 'string'] (required)
  - path: ['null', 'string'] (required)
  - parameters: ['null', 'array'] (required)

**ReportHistoryListItem**
  - runId: string(uuid) (required)
  - date: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)
  - status: ReportStatus (required)

**ReportHistoryPage**
  - reportRuns: ['null', 'array'] (required)
  - continuationToken: ['null', 'string'] (required)

**ReportOptionsRequest**
  - user: ['null', 'string'] (required)
  - includeCriteria: boolean
  - parameters: ['null', 'array'] (required)

**ReportParameterType**
  - (no properties)

**ReportParameterValue**
  - name: ['null', 'string'] (required)
  - parameterType: ReportParameterType (required)
  - value: ['null', 'object'] (required)

**ReportStatus**
  - (no properties)

