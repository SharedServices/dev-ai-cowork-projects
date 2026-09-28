﻿# Snowdrop.Ledger.Api.Administration - API Dictionary

Repo: snowdrop-ledger-be
Source: Snowdrop.Ledger.Api.Administration.json

## Endpoints

### GET /vendor/automation/expired-reallocation/configuration
- Tags: ExpiredFundReallocation
- Response 200: ExpiredReservedFundConfigurationResponse[]

### GET /vendor/automation/expired-reallocation/configuration/companies/{companyId}
- Tags: ExpiredFundReallocation
- Path params: companyId: string(uuid), required
- Response 200: ExpiredReservedFundConfigurationResponse

### PUT /vendor/automation/expired-reallocation/configuration/companies/{companyId}
- Tags: ExpiredFundReallocation
- Path params: companyId: string(uuid), required
- Request body: ExpiredReservedFundConfigurationRequest
- Response 200: (no body)

### GET /vendor/automation/expired-reallocation/runs/companies/{companyId}/start
- Tags: ExpiredFundReallocation
- Path params: companyId: string(uuid), required
- Response 200: ExpiredReservedFundConfigurationResponse

### GET /vendor/automation/expired-reallocation/runs/start
- Tags: ExpiredFundReallocation
- Response 200: (no body)

### POST /vendor/bulk-actions/{bulkActionId}/requests
- Tags: BulkActions
- Path params: bulkActionId: string(uuid), required
- Request body: BulkActionRequest
- Response 200: (no body)

### POST /vendor/charges/{chargeId}/{chargeStatus}/{chargeSubStatus}/correct-posting
- Tags: Charges
- Path params: chargeId: string(uuid), required; chargeStatus: ChargeStatusType, required; chargeSubStatus: ChargeSubStatusType, required
- Query params: force: boolean
- Response 200: (no body)

### GET /vendor/charges/{chargeId}/evaluate
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: ActivityChargePreValidation

### GET /vendor/charges/{chargeId}/evaluate/is-valid
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: boolean

### GET /vendor/charges/{chargeId}/failure
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: ChargePostingFailed

### POST /vendor/charges/{chargeId}/negate-batch
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Query params: overrideNegate: boolean
- Request body: ChargeBatchNegatorRequest
- Response 200: ChargeBatchNegatorResponse

### GET /vendor/charges/{chargeId}/projections/snapshot
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: (no body)

### POST /vendor/charges/{chargeId}/rebalance-respond
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeRebalanceResponse
- Response 200: (no body)

### POST /vendor/charges/{chargeId}/recalculate-balance
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Query params: force: boolean
- Response 200: ChargeBalanceRecalculatorResponse

### POST /vendor/charges/{chargeId}/requeue-posting/{eventNumber}
- Tags: Charges
- Path params: chargeId: string(uuid), required; eventNumber: integer(int64), required
- Response 200: (no body)

### GET /vendor/charges/{chargeId}/status.html
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: (no body)

### GET /vendor/charges/{chargeId}/transactions.csv
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: (no body)

### POST /vendor/patients/{patientId}/payments/{paymentId}/adjust/reserve-amount
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Request body: AdjustReserveAmountRequest
- Response 200: (no body)

## Schemas

**ActivityChargePreValidation**
  - log: ['null', 'array'] (required)
  - charge: ChargeCandidate
  - financials: ChargeFinancials
  - posting: ChargePostingResponse
  - guarantor: ChargeGuarantor
  - manufacturerAssociation: object
  - billingUnits: ['number', 'string'](double)
  - currentLedgerDates: LedgerStates
  - calculatedLedgerDate: Date
  - errors: ['null', 'array']
  - selfPayAdjustmentReason: object
  - groupCode: ['null', 'string']
  - reasonCode: ['null', 'string']
  - decisionLog: object
  - chargeId: string(uuid)
  - applyInitialAdjustmentOnChargeCreation: boolean
  - isValid: boolean

**AdjustReserveAmountRequest**
  - ledgerDate: Date (required)
  - amount: ['number', 'string'](double) (required)
  - fromTransactionNumber: ['integer', 'string'](int32) (required)
  - mode: WriteMode (required)

**AllowedAmountDecision**
  - payerId: ['null', 'string'](uuid) (required)
  - payerReason: ['null', 'string'] (required)
  - candidates: ['null', 'array'] (required)
  - matchedContractId: ['null', 'string'](uuid) (required)
  - matchedFeeScheduleId: ['null', 'string'](uuid) (required)

**BulkActionRequest**
  - requestType: BulkActionRequestType (required)
  - templateId: string(uuid) (required)
  - userId: string(uuid) (required)

**BulkActionRequestType**
  - (no properties)

**ChargeAccount**
  - type: ChargeAccountType
  - guarantorId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - payerId: string(uuid)
  - portfolioId: string(uuid)
  - policyPlanId: ['null', 'string'](uuid)
  - policyId: ['null', 'string'](uuid)
  - manufacturer: object

**ChargeAccountType**
  - (no properties)

**ChargeBalanceRecalculatorResponse**
  - chargeId: ChargeIdentity (required)
  - requestId: string(uuid) (required)
  - error: string
  - isValid: boolean

**ChargeBatchNegatorRequest**
  - chargeBatchId: string(uuid)
  - ledgerDate: Date

**ChargeBatchNegatorResponse**
  - chargeId: string(uuid) (required)
  - isValid: boolean (required)
  - errors: ['null', 'array']

**ChargeCandidate**
  - chargeId: string(uuid)
  - patientId: string(uuid)
  - account: ChargeAccount
  - adjustment: object
  - resources: ChargeResources
  - service: ChargeService
  - source: ChargeSource
  - skipLedgerDateValidation: boolean
  - autoProgress: boolean
  - ledgerDate: Date
  - dateOfService: Date
  - dateRangeStart: object
  - dateRangeEnd: object
  - effectiveDateOfServiceEnd: Date
  - createdDate: string(date-time)
  - selfPayDetail: TransactionSelfPayDetail
  - guarantor: object
  - manufacturerAssociation: object
  - transferReasonId: ['null', 'string'](uuid)
  - adjustToExpectedAllowed: ['null', 'boolean']

**ChargeCandidateAdjustment**
  - adjustmentTypeId: string(uuid)
  - isContractual: boolean

**ChargeError**
  - chargeId: string(uuid)
  - code: ChargeErrorCode (required)
  - message: ['null', 'string'] (required)
  - isException: ['null', 'boolean']

**ChargeErrorCode**
  - (no properties)

**ChargeFinancials**
  - fee: ['number', 'string'](double)
  - allowed: ['number', 'string'](double)
  - balance: ['number', 'string'](double)
  - guarantorBalance: ['null', 'number', 'string'](double)
  - expectedAdjustmentApplied: boolean
  - initialAdjustmentApplied: boolean
  - manufacturerBalance: ['null', 'number', 'string'](double)

**ChargeGuarantor**
  - sourcePortfolioPayer: PayerPortfolioDetail
  - guarantorId: string(uuid)
  - patientId: string(uuid)
  - guarantorIsPatient: boolean

**ChargeIdentity**
  - (no properties)

**ChargeManufacturerAssociation**
  - manufacturerCopayProgramId: string(uuid)
  - manufacturerCopayAssistanceAwardId: string(uuid)

**ChargeMasterCandidateDecision**
  - chargeMasterId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - isMatch: boolean (required)
  - reason: ['null', 'string'] (required)

**ChargeMasterDecision**
  - companyId: string(uuid) (required)
  - companyReason: ['null', 'string'] (required)
  - candidates: ['null', 'array'] (required)
  - matchedChargeMasterId: ['null', 'string'](uuid) (required)
  - matchedChargeMasterName: ['null', 'string'] (required)

**ChargePostingFailed**
  - chargeId: string(uuid) (required)
  - isPosted: boolean
  - sourceChargeEventId: ['integer', 'string'](int64)
  - errors: ['null', 'array'] (required)
  - chargeStatus: ChargeStatusType
  - chargeSubStatus: ChargeSubStatusType

**ChargePostingResponse**
  - chargemasterId: string(uuid)
  - chargemasterCompanyId: string(uuid)
  - chargemasterName: ['null', 'string']
  - contractId: string(uuid)
  - feeScheduleId: string(uuid)

**ChargeRebalanceResponse**
  - requestId: string(uuid) (required)
  - isValid: boolean (required)

**ChargeResources**
  - companyId: string(uuid)
  - locationId: string(uuid)
  - divisionId: string(uuid)
  - facilityId: string(uuid)
  - billingProviderId: string(uuid)

**ChargeService**
  - chargeCode: ['null', 'string']
  - modifierId: ['null', 'string'](uuid)
  - ndc: ['null', 'string']
  - billingUnits: ['number', 'string'](double)
  - activityTypeId: ['null', 'string'](uuid)
  - activityCode: ['null', 'string']
  - serviceTypeId: ['null', 'string'](uuid)
  - chargeMasterId: ['null', 'string'](uuid)
  - chargeMasterCompanyId: ['null', 'string'](uuid)
  - chargeMasterOverridden: boolean

**ChargeSource**
  - chargeId: string(uuid)
  - type: ChargeSourceType
  - renderedActivityId: ['null', 'string'](uuid)
  - sourceChargeEventId: ['integer', 'string'](int64)

**ChargeSourceType**
  - (no properties)

**ChargeStatusType**
  - (no properties)

**ChargeSubStatusType**
  - (no properties)

**ChargeValidationDecision**
  - capturedAt: string(date-time) (required)
  - isCorrection: boolean (required)
  - chargeMaster: ChargeMasterDecision (required)
  - allowedAmount: AllowedAmountDecision (required)

**ContractCandidateDecision**
  - contractId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - isMatch: boolean (required)
  - reason: ['null', 'string'] (required)
  - feeSchedules: ['null', 'array'] (required)

**Date**
  - (no properties)

**ExpiredReservedFundConfigurationRequest**
  - runMode: RunMode
  - dateOfServiceLag: ['integer', 'string'](int32)
  - minimumAutomatedRunIntervalMinutes: ['integer', 'string'](int32)
  - isDivisionClearingEnabled: boolean
  - isServiceTypeClearingEnabled: boolean
  - isProviderClearingEnabled: boolean

**ExpiredReservedFundConfigurationResponse**
  - companyId: string(uuid) (required)
  - runMode: RunMode (required)
  - dateOfServiceLag: ['null', 'integer', 'string'](int32) (required)
  - isDivisionClearingEnabled: ['null', 'boolean'] (required)
  - isServiceTypeClearingEnabled: ['null', 'boolean'] (required)
  - isProviderClearingEnabled: ['null', 'boolean'] (required)
  - minimumAutomatedRunIntervalMinutes: ['null', 'integer', 'string'](int32) (required)
  - minimumDateOfServiceLag: ['integer', 'string'](int32)

**FeeScheduleCandidateDecision**
  - feeScheduleId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - isMatch: boolean (required)
  - reason: ['null', 'string'] (required)

**LedgerState**
  - ledgerDate: Date (required)
  - closedTimestamp: string(date-time) (required)
  - closedByUserId: string(uuid) (required)

**LedgerStates**
  - chargeLedger: LedgerState
  - paymentLedger: LedgerState

**PayerPortfolioDetail**
  - payerId: string(uuid)
  - portfolioId: string(uuid)

**RunMode**
  - (no properties)

**SelfPayAdjustmentReason**
  - selfPayAdjustmentReasonId: string(uuid) (required)
  - isContractualAdjustment: boolean

**TransactionSelfPayDetail**
  - isSelfPay: boolean
  - selfPayPayerId: string(uuid) (required)
  - portfolioId: string(uuid) (required)

**WriteMode**
  - (no properties)

