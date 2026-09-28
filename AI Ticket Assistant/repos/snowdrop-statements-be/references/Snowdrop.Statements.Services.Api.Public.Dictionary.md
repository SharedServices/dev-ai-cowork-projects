﻿# Snowdrop.Statements.Services.Api.Public - API Dictionary

Repo: snowdrop-statements-be
Source: Snowdrop.Statements.Services.Api.Public.json

## Endpoints

### GET /{patientId}
- Tags: Patient
- Path params: patientId: string(uuid), required
- Response 200: PatientResponse
- Response 404: ProblemDetails

### POST /{patientId}/disablestatements
- Tags: Patient
- Path params: patientId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /{patientId}/enablestatements
- Tags: Patient
- Path params: patientId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /history/bill/{billId}
- Tags: History
- Path params: billId: string(uuid), required
- Response 200: StatementHistoryResponseRecord[]
- Response 404: ProblemDetails

### GET /history/brand/{brandId}
- Tags: History
- Path params: brandId: string(uuid), required
- Response 200: BrandStatementBatchRecord[]

### GET /history/brand/{brandId}/batch/{batchId}
- Tags: History
- Path params: brandId: string(uuid), required; batchId: string(uuid), required
- Response 200: StatementBatchDetailsResponse
- Response 404: ProblemDetails

### GET /history/guarantor/{guarantorId}/brand/{brandId}/{count}
- Tags: History
- Path params: guarantorId: string(uuid), required; brandId: string(uuid), required; count: integer(int32), required
- Response 200: StatementHistoryResponseRecord[]

### GET /history/patient/{patientId}
- Tags: History
- Path params: patientId: string(uuid), required
- Response 200: StatementHistoryResponseRecord[]

### GET /statement-vendors
- Tags: Vendors
- Response 200: StatementVendorsResponse
- Response 404: ProblemDetails

### GET /statement/{statementId}
- Tags: Statement
- Path params: statementId: string(uuid), required
- Response 200: StatementDetailResponse
- Response 404: ProblemDetails

### GET /statement/{statementId}/download
- Tags: Statement
- Path params: statementId: string(uuid), required
- Response 404: ProblemDetails
- Response 200: (no body)

### GET /statement/batch/{statementBatchId}/download
- Tags: Statement
- Path params: statementBatchId: string(uuid), required
- Response 404: ProblemDetails
- Response 200: (no body)

### GET /statement/nextdetails/guarantor/{guarantorId}/brand/{brandId}
- Tags: Statement
- Path params: guarantorId: string(uuid), required; brandId: string(uuid), required
- Response 200: NextStatementDetailsResponse

### GET /statement/patient/{patientId}/{statementId}
- Tags: Statement
- Path params: patientId: string(uuid), required; statementId: string(uuid), required
- Response 200: StatementDetailResponse
- Response 404: ProblemDetails

## Schemas

**Bill**
  - billId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - dateOfService: Date (required)
  - age: BillAge (required)
  - billNumber: ['integer', 'string'](int64) (required)
  - chargedAmount: ['number', 'string'](double) (required)
  - adjustedAmount: ['number', 'string'](double) (required)
  - paidAmount: ['number', 'string'](double) (required)
  - balanceAmount: ['number', 'string'](double) (required)
  - charges: ['null', 'array'] (required)

**BillAge**
  - (no properties)

**BrandStatementBatchRecord**
  - statementBatchId: string(uuid) (required)
  - runDate: string(date-time) (required)
  - batchType: StatementBatchType (required)
  - runType: StatementRunType (required)
  - batchDescription: ['null', 'string'] (required)
  - statementCount: ['integer', 'string'](int32) (required)
  - isSampleRun: boolean (required)
  - status: StatementBatchStatus (required)

**Charge**
  - chargeId: string(uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - chargeDate: string(date-time) (required)
  - activityId: ['null', 'string'](uuid) (required)
  - amount: ['number', 'string'](double) (required)
  - insurancePayments: ['number', 'string'](double) (required)
  - guarantorPayments: ['number', 'string'](double) (required)
  - insuranceAdjustments: ['number', 'string'](double) (required)
  - guarantorAdjustments: ['number', 'string'](double) (required)

**Date**
  - (no properties)

**NextStatementDetailsResponse**
  - previousStatementBalance: ['number', 'string'](double) (required)
  - newCharges: ['number', 'string'](double) (required)
  - paymentsApplied: ['number', 'string'](double) (required)
  - currentBalance: ['number', 'string'](double) (required)
  - paymentPlanEligibleBalances: object (required)

**PatientResponse**
  - patientId: string(uuid) (required)
  - statementsEnabled: boolean (required)
  - disabledStatusUserId: ['null', 'string'](uuid) (required)
  - disabledStatusDate: ['null', 'string'](date-time) (required)

**PaymentPlanEligibleBalancesResponse**
  - zeroTo29Balance: ['number', 'string'](double)
  - thirtyTo59Balance: ['number', 'string'](double)
  - sixtyTo89Balance: ['number', 'string'](double)
  - ninetyTo119Balance: ['number', 'string'](double)
  - oneTwentyTo179Balance: ['number', 'string'](double)
  - oneEightyPlusBalance: ['number', 'string'](double)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**StatementBatchDetailsResponse**
  - statementBatchId: string(uuid) (required)
  - runDate: string(date-time) (required)
  - batchType: StatementBatchType (required)
  - batchDescription: ['null', 'string'] (required)
  - status: object (required)
  - runType: StatementRunType (required)
  - distributorId: string(uuid) (required)
  - statementCount: ['integer', 'string'](int32) (required)
  - userId: ['null', 'string'](uuid) (required)
  - isSampleRun: boolean (required)
  - isSuperBatch: boolean (required)
  - batches: ['null', 'array'] (required)

**StatementBatchStatus**
  - (no properties)

**StatementBatchType**
  - (no properties)

**StatementDetailResponse**
  - statementId: string(uuid) (required)
  - statementTotal: ['number', 'string'](double) (required)
  - statementNumber: ['integer', 'string'](int64) (required)
  - date: string(date-time) (required)
  - guarantorFirst: ['null', 'string'] (required)
  - guarantorLast: ['null', 'string'] (required)
  - status: StatementStatus (required)
  - sampleRun: boolean (required)
  - bills: ['null', 'array'] (required)

**StatementHistoryResponseRecord**
  - statementId: string(uuid) (required)
  - date: string(date-time) (required)
  - statementNumber: ['integer', 'string'](int64) (required)
  - guarantorLast: ['null', 'string'] (required)
  - guarantorFirst: ['null', 'string'] (required)
  - brandName: ['null', 'string'] (required)
  - chargeTotal: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - status: StatementStatus (required)
  - sampleRun: boolean (required)
  - runType: StatementTiming (required)
  - isPaid: boolean (required)
  - isNoMail: boolean (required)

**StatementRunType**
  - (no properties)

**StatementStatus**
  - (no properties)

**StatementTiming**
  - (no properties)

**StatementVendor**
  - vendorName: ['null', 'string']
  - applicationName: ['null', 'string']
  - displayName: ['null', 'string']
  - applicationId: string(uuid)

**StatementVendorsResponse**
  - statementVendors: ['null', 'array']

**SubBatchDetail**
  - subBatchId: string(uuid) (required)
  - batchDescription: ['null', 'string'] (required)
  - statementCount: ['integer', 'string'](int32) (required)
  - status: StatementBatchStatus (required)

