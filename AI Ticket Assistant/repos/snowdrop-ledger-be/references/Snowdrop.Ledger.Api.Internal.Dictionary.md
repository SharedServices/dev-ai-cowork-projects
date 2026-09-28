﻿# Snowdrop.Ledger.Api.Internal - API Dictionary

Repo: snowdrop-ledger-be
Source: Snowdrop.Ledger.Api.Internal.json

## Endpoints

### GET /charges/{chargeId}/remittances/{remittanceId}
- Tags: Charges
- Path params: chargeId: string(uuid), required; remittanceId: string(uuid), required
- Query params: disputeTransactionNumber: ['integer', 'string'](int32)
- Response 200: ChargeRemittanceDetail

### POST /payers/{payerId}/contracts/{contractId}/allowed
- Tags: Payers
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: PayerContractAllowedRequest
- Response 200: ActivityDetailAllowed[]

### POST /remittances/validate
- Tags: Remittances
- Request body: RemittanceClaimPaymentPosted
- Response 200: RemitValidationResult

## Schemas

**ActivityDetail**
  - chargeCode: ['null', 'string'] (required)
  - modifierId: ['null', 'string'](uuid) (required)
  - ndc: ['null', 'string'] (required)
  - activityCode: ['null', 'string'] (required)
  - dateOfService: Date (required)

**ActivityDetailAllowed**
  - activityDetail: ActivityDetail (required)
  - successful: boolean (required)
  - allowed: ['null', 'number', 'string'](double) (required)

**ChargeRemittanceDetail**
  - remittanceId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - claimPaymentId: string(uuid) (required)
  - chargePaymentId: string(uuid) (required)
  - checkDate: Date (required)
  - checkNumber: ['null', 'string'] (required)
  - depositDate: Date (required)
  - icn: ['null', 'string'] (required)
  - isCrossover: boolean (required)
  - sourceEventNumber: ['integer', 'string'](int64) (required)

**Date**
  - (no properties)

**Exception**
  - targetSite: MethodBase
  - message: ['null', 'string']
  - data: ['null', 'object']
  - innerException: Exception
  - helpLink: ['null', 'string']
  - source: ['null', 'string']
  - hResult: ['integer', 'string'](int32)
  - stackTrace: ['null', 'string']

**MethodBase**
  - (no properties)

**PayerContractAllowedRequest**
  - activityDetails: ['null', 'array'] (required)

**RemittanceClaimPaymentPosted**
  - remittanceId: string(uuid) (required)

**RemitValidationMessage**
  - remittanceId: string(uuid) (required)
  - chargeId: ['null', 'string'](uuid) (required)
  - message: string (required)
  - exception: object

**RemitValidationResult**
  - isValid: boolean (required)
  - messages: RemitValidationMessage[] (required)

