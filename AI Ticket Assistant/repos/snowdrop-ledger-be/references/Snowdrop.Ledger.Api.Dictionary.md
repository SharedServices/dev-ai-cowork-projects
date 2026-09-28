﻿# Snowdrop.Ledger.Api - API Dictionary

Repo: snowdrop-ledger-be
Source: Snowdrop.Ledger.Api.json

## Endpoints

### GET /chargeassemblies/{chargeAssemblyId}/payerassemblies/{payerAssemblyId}
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; payerAssemblyId: string(uuid), required
- Response 200: ChargeAssembly
- Response 404: ChargeAssembly

### PUT /chargeassemblies/{chargeAssemblyId}/payerassemblies/{payerAssemblyId}
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; payerAssemblyId: string(uuid), required
- Request body: ChargeAssemblyChargeUpdateRequest[]
- Response 200: ChargeAssemblyUpdateResponse

### GET /chargeassemblies/{chargeAssemblyId}/payerassemblies/{payerAssemblyId}/summaries
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; payerAssemblyId: string(uuid), required
- Response 200: ChargeAssemblyChargeSummary[]
- Response 404: ChargeAssemblyChargeSummary[]

### GET /chargeassemblies/{chargeAssemblyId}/portfolio
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required
- Response 200: ChargeAssemblyPortfolio
- Response 404: ChargeAssemblyPortfolio

### POST /chargeassemblies/conveyances
- Tags: ChargeAssemblies
- Request body: ChargeAssemblyConveyanceRequest
- Response 200: ChargeAssemblyConveyanceResponse

### POST /chargeportfolios
- Tags: ChargePortfolios
- Request body: ChargePortfoliosRequest
- Response 200: ChargePortfolio[]
- Response 404: ChargePortfolio[]

### GET /chargeportfolios/{chargeId}
- Tags: ChargePortfolios
- Path params: chargeId: string(uuid), required
- Response 200: ChargePortfolio
- Response 404: ChargePortfolio

### GET /chargeportfolios/{chargeId}/ordered
- Tags: ChargePortfolios
- Path params: chargeId: string(uuid), required
- Response 200: ChargePortfolioOrdered
- Response 404: ChargePortfolioOrdered

### POST /chargeportfolios/merged
- Tags: ChargePortfolios
- Request body: ChargePortfoliosRequest
- Response 200: ChargePortfolioMerged
- Response 404: ChargePortfolioMerged

### GET /charges/{chargeId}
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: ChargeResponse
- Response 404: ChargePostingFailed

### PUT /charges/{chargeId}/adjustments
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeAdjustmentRequest
- Response 200: ChargeAdjustmentResponse

### PUT /charges/{chargeId}/adjustments/reverse
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeAdjustmentReversalRequest
- Response 200: ChargeAdjustmentResponse

### GET /charges/{chargeId}/applicable-credits
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: ApplicableFundsResponse

### POST /charges/{chargeId}/apply
- Tags: Apply
- Path params: chargeId: string(uuid), required
- Request body: ApplyRequest
- Response 200: ApplyResponse

### PUT /charges/{chargeId}/apply/reverse
- Tags: Apply
- Path params: chargeId: string(uuid), required
- Request body: ChargePaymentReversalRequest
- Response 200: ReversalResponse

### GET /charges/{chargeId}/charge-portfolio
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: ChargePortfolio
- Response 404: ChargePortfolio

### PUT /charges/{chargeId}/correct
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeCorrectionRequest
- Response 200: ChargeCorrectionResponse

### GET /charges/{chargeId}/correct/post-cleanup
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Query params: ledgerDate: string; writeMode: RequestMode
- Response 200: ChargeCorrectionResponse

### POST /charges/{chargeId}/correct/validate
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeCorrectionValidationRequest
- Response 200: ChargeValidation

### PUT /charges/{chargeId}/corrections
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeTransactionalCorrectionRequest
- Response 200: ChargeTransactionalCorrectionResponse

### GET /charges/{chargeId}/decision-log
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: ChargeDecisionLog
- Response 404: ProblemDetails

### GET /charges/{chargeId}/payers/summary
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: ChargePayersSummary
- Response 404: ChargePostingFailed

### GET /charges/{chargeId}/raw
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Response 200: ChargeResponse
- Response 404: ChargePostingFailed

### PUT /charges/{chargeId}/transfer
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeTransferRequest
- Response 200: ChargeTransferResponse

### PUT /charges/{chargeId}/transfer/reverse
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeTransferReversalRequest
- Response 200: ChargeTransferResponse

### PUT /charges/{chargeId}/void
- Tags: Charges
- Path params: chargeId: string(uuid), required
- Request body: ChargeVoidRequest
- Response 200: ChargeVoidResponse

### GET /charges/activities/{activityId}
- Tags: Activities
- Path params: activityId: string(uuid), required
- Response 200: ActivityResponse

### GET /charges/remits
- Tags: Remittance
- Response 200: (no body)

### PUT /charges/remits/{chargeId}/disputes/resolve
- Tags: Remittance
- Path params: chargeId: string(uuid), required
- Request body: DisputeResolutionRequest
- Response 200: DisputeResolutionResponse

### POST /charges/remits/{organizationId}/validate
- Tags: Remittance
- Path params: organizationId: string(uuid), required
- Request body: RemittanceClaimPaymentPosted
- Response 200: RemitValidationResult

### GET /charges/utilities/ensure-charge-has-summary/{organizationId}/{chargeId}
- Tags: ChargeUtility
- Path params: organizationId: string(uuid), required; chargeId: string(uuid), required
- Query params: force: boolean
- Response 200: (no body)

### GET /charges/utilities/patient-summary-charge-balances-calculated/{organizationId}/{patientId}/{chargeId}/latest
- Tags: ChargeUtility
- Path params: organizationId: string(uuid), required; patientId: string(uuid), required; chargeId: string(uuid), required
- Response 200: ChargeSummary

### PUT /charges/void
- Tags: Charges
- Request body: string(uuid)[]
- Response 200: ChargeVoidResponse[]

### GET /companies/{companyId}/ledger-dates/validate
- Tags: Companies
- Path params: companyId: string(uuid), required
- Query params: ledgerDate: string
- Response 200: PaymentMonthCloseValidationResult

### GET /insurancereservedfunds/{reservedFundsId}
- Tags: InsuranceReservedFunds
- Path params: reservedFundsId: string(uuid), required
- Response 200: InsuranceReservedFund
- Response 404: InsuranceReservedFund

### POST /ledger/p/payers/{payerId}/contracts/{contractId}/allowed
- Tags: Allowed
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: PayerContractAllowedRequest
- Response 200: ActivityDetailAllowed[]

### GET /p/catalogs/activities/{activityTypeId}/service-type-mapping
- Tags: CatalogProjections
- Path params: activityTypeId: string(uuid), required
- Response 200: ActivityServiceTypeMapping

### GET /p/charges/{chargeId}
- Tags: ChargeProjections
- Path params: chargeId: string(uuid), required
- Response 200: (no body)

### GET /p/charges/{chargeId}/build
- Tags: ChargeProjections
- Path params: chargeId: string(uuid), required
- Response 200: ProjectionCoordinatorResultResponse

### GET /p/charges/{chargeId}/snapshot
- Tags: ChargeProjections
- Path params: chargeId: string(uuid), required
- Response 200: ProjectedSnapshotOfCharge

### GET /p/charges/patients/{patientId}
- Tags: ChargeProjections
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### GET /p/charges/patients/{patientId}/summaries
- Tags: ChargeProjections
- Path params: patientId: string(uuid), required
- Response 200: PatientChargeSummaryProjection[]

### GET /p/charges/patients/{patientId}/summaries/{chargeId}
- Tags: ChargeProjections
- Path params: patientId: string(uuid), required; chargeId: string(uuid), required
- Response 200: PatientChargeSummaryProjection

### GET /p/companies/{companyId}/chargemasters/{chargeMasterId}
- Tags: ChargeMasterProjections
- Path params: companyId: string(uuid), required; chargeMasterId: string(uuid), required
- Response 200: ChargeMaster

### GET /p/companies/{companyId}/chargemasters/{chargeMasterId}/fee/{chargeCode}
- Tags: ChargeMasterProjections
- Path params: companyId: string(uuid), required; chargeMasterId: string(uuid), required; chargeCode: string, required
- Query params: modifierId: string(uuid); ndc: string; activityCode: string
- Response 200: Fee

### GET /p/payers/{payerId}
- Tags: PayerProjections
- Path params: payerId: string(uuid), required
- Response 200: PayersPayerV4

### GET /p/payers/{payerId}/contracts
- Tags: PayerProjections
- Path params: payerId: string(uuid), required
- Response 200: PayerContractCollectionV2

### GET /p/payers/{payerId}/contracts/{contractId}
- Tags: PayerProjections
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Response 200: PayerContractDetailV4

### GET /p/payers/fee-schedules/{feeScheduleId}
- Tags: PayerProjections
- Path params: feeScheduleId: string(uuid), required
- Response 200: PayerFeeScheduleV4

### GET /p/payers/fee-schedules/{feeScheduleId}/fees/{chargeCode}
- Tags: PayerProjections
- Path params: feeScheduleId: string(uuid), required; chargeCode: string, required
- Query params: modifierId: string(uuid); ndc: string
- Response 200: PayerFeeV3

### GET /p/payers/manufacturer-copay-programs/{programId}
- Tags: PayerProjections
- Path params: programId: string(uuid), required
- Response 200: PayersManufacturerCopayProgramV2

### GET /p/payers/plans/{planId}
- Tags: PayerProjections
- Path params: planId: string(uuid), required
- Response 200: PayersPlanV3

### GET /p/payers/snf-patients/{snfPatientId}
- Tags: PayerProjections
- Path params: snfPatientId: string(uuid), required
- Response 200: PayersSnfPatientV2

### GET /p/payers/snf/{snfId}
- Tags: PayerProjections
- Path params: snfId: string(uuid), required
- Response 200: PayersSnfV2

### GET /p/payments/{paymentId}
- Tags: PaymentProjections
- Path params: paymentId: string(uuid), required
- Response 200: (no body)

### GET /p/payments/{paymentId}/snapshot
- Tags: PaymentProjections
- Path params: paymentId: string(uuid), required
- Response 200: ProjectedSnapshotOfPayment

### GET /p/payments/patients/{patientId}
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### GET /p/payments/patients/{patientId}/collected
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required
- Response 200: PaymentCollectedProjection[]

### GET /p/payments/patients/{patientId}/collected/{paymentId}
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: PaymentCollectedProjection

### GET /p/payments/patients/{patientId}/list
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required
- Response 200: PatientPaymentListResponse

### GET /p/payments/patients/{patientId}/payments
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required
- Response 200: Payment[]

### GET /p/payments/patients/{patientId}/payments/{paymentId}
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: Payment

### GET /p/payments/patients/{patientId}/payments/{paymentId}/build
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: ProjectionCoordinatorResultResponse

### GET /p/payments/patients/{patientId}/payments/all/build
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required
- Response 200: ProjectionCoordinatorResultResponse[]

### GET /p/payments/patients/{patientId}/summaries
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required
- Response 200: PatientPaymentSummary

### GET /p/payments/patients/{patientId}/summaries/{paymentId}
- Tags: PaymentProjections
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: PaymentSummaryResponse

### GET /p/policies/{policyId}
- Tags: PoliciesProjection
- Path params: policyId: string(uuid), required
- Response 200: Policy

### POST /p/policies/{policyId}/build
- Tags: PoliciesProjection
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### GET /p/reserved-funds/{paymentId}/{companyId}
- Tags: ReservedFundProjections
- Path params: paymentId: string(uuid), required; companyId: string(uuid), required
- Query params: dateOfService: string; divisionId: string(uuid); serviceType: string(uuid)
- Response 200: (no body)

### GET /p/reserved-funds/{paymentId}/build
- Tags: ReservedFundProjections
- Path params: paymentId: string(uuid), required
- Response 200: ProjectionCoordinatorResultResponse[]

### GET /p/reserved-funds/patients/{patientId}
- Tags: ReservedFundProjections
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### GET /p/reserved-funds/patients/{patientId}/summaries
- Tags: ReservedFundProjections
- Path params: patientId: string(uuid), required
- Response 200: PaymentReservedFundBalanceProjection[]

### GET /p/reserved-funds/payments/{paymentId}/snapshots/{companyId}
- Tags: ReservedFundProjections
- Path params: paymentId: string(uuid), required; companyId: string(uuid), required
- Query params: dateOfService: string; divisionId: string(uuid); serviceType: string(uuid)
- Response 200: ProjectedSnapshotOfPaymentReservedFund

### GET /p/resources/companies/{companyId}
- Tags: CompanyProjections
- Path params: companyId: string(uuid), required
- Response 200: ResourceCompanyV2

### GET /p/resources/companies/{companyId}/divisions
- Tags: CompanyProjections
- Path params: companyId: string(uuid), required
- Response 200: object

### GET /p/resources/companies/{companyId}/divisions/{divisionId}
- Tags: CompanyProjections
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Response 200: ResourceDivision

### GET /p/resources/companies/{companyId}/month-end
- Tags: CompanyProjections
- Path params: companyId: string(uuid), required
- Response 200: ResourceMonthClosed[]

### GET /p/resources/companies/{companyId}/month-end/{year}/{month}
- Tags: CompanyProjections
- Path params: companyId: string(uuid), required; year: ['integer', 'string'](int32), required; month: Month, required
- Response 200: ResourceMonthClosed[]

### GET /p/resources/companies/{companyId}/month-end/last
- Tags: CompanyProjections
- Path params: companyId: string(uuid), required
- Response 200: ResourceMonthClosed

### GET /p/resources/companies/{companyId}/time-zone-id
- Tags: CompanyProjections
- Path params: companyId: string(uuid), required
- Response 200: string

### GET /p/resources/divisions/{divisionId}
- Tags: DivisionProjections
- Path params: divisionId: string(uuid), required
- Response 200: ResourceDivisionLedgerV2

### GET /p/resources/divisions/{divisionId}/ledgers
- Tags: DivisionProjections
- Path params: divisionId: string(uuid), required
- Response 200: ResourceDivisionLedgerV2

### POST /patients/{patientId}/payments
- Tags: Payments
- Path params: patientId: string(uuid), required
- Request body: PaymentRequest
- Response 200: PaymentCreatedResponse

### GET /patients/{patientId}/payments/{paymentId}
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: PaymentResponse

### PUT /patients/{patientId}/payments/{paymentId}
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Request body: PaymentRequest
- Response 200: PaymentCreatedResponse

### POST /patients/{patientId}/payments/{paymentId}/change-date
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Request body: PaymentLedgerDateChangeRequest
- Response 200: PatientPaymentSummary

### POST /patients/{patientId}/payments/{paymentId}/change-date/validate
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Request body: PaymentLedgerDateChangeRequest
- Response 200: PaymentLedgerDateChangeValidationResponse

### GET /patients/{patientId}/payments/{paymentId}/fix-missing-payment-applied
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Query params: chargeId: string(uuid); patientPaymentChargeApplicationId: string(uuid); ledgerDate: string; writeMode: WriteMode
- Response 200: ApplyResult

### GET /patients/{patientId}/payments/{paymentId}/fix-missing-transactions
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: Result

### GET /patients/{patientId}/payments/{paymentId}/list-summary
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: PaymentSummaryResponse

### GET /patients/{patientId}/payments/{paymentId}/raw
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: Payment

### POST /patients/{patientId}/payments/{paymentId}/refund
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Request body: PaymentRefundRequest
- Response 200: PatientPaymentSummary

### POST /patients/{patientId}/payments/{paymentId}/refund/stage
- Tags: Payments
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Request body: PaymentRefundStagedRequest
- Response 200: (no body)

### GET /patients/{patientId}/payments/list
- Tags: Payments
- Path params: patientId: string(uuid), required
- Response 200: PatientPaymentListResponse

### POST /patients/{patientId}/payments/reallocate
- Tags: Payments
- Path params: patientId: string(uuid), required
- Request body: ReallocationRequest
- Response 200: PatientReservesResponse

### POST /patients/{patientId}/payments/refund
- Tags: Payments
- Path params: patientId: string(uuid), required
- Request body: RefundRequest
- Response 200: PatientReservesResponse

### GET /patients/{patientId}/payments/summary
- Tags: Payments
- Path params: patientId: string(uuid), required
- Response 200: PatientPaymentSummary

### GET /patients/{patientId}/reserves
- Tags: Reserves
- Path params: patientId: string(uuid), required
- Response 200: PatientReservesResponse

### POST /patients/{patientId}/reserves/reallocate
- Tags: Payments
- Path params: patientId: string(uuid), required
- Request body: ReallocationRequest
- Response 200: PatientReservesResponse

### POST /patients/{patientId}/reserves/refund
- Tags: Payments
- Path params: patientId: string(uuid), required
- Request body: RefundRequest
- Response 200: PatientReservesResponse

### GET /patients/{patientId}/reserves/summary
- Tags: Reserves
- Path params: patientId: string(uuid), required
- Response 200: PatientReservesSummaryResponse

### GET /patients/{patientId}/summary
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PatientSummaryResponse

### GET /patients/cleanup/{patientId}/corrupt-applications/{paymentId}
- Tags: Cleanup
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: CorruptApplications

### GET /patients/cleanup/{patientId}/corrupt-applications/{paymentId}/reverse
- Tags: Cleanup
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Query params: requestMode: RequestMode
- Response 200: ApplicationReversalResponse

### GET /patients/cleanup/{patientId}/corrupt-applications/all
- Tags: Cleanup
- Path params: patientId: string(uuid), required
- Response 200: CorruptApplications[]

### GET /patients/cleanup/{patientId}/corrupt-applications/all/reverse
- Tags: Cleanup
- Path params: patientId: string(uuid), required
- Query params: requestMode: RequestMode
- Response 200: ApplicationReversalResponse[]

### GET /patients/cleanup/{patientId}/payment-balance-recalculation/{paymentId}
- Tags: Cleanup
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Response 200: PaymentBalanceCorrected

### GET /patients/cleanup/{patientId}/payment-balance-recalculation/all
- Tags: Cleanup
- Path params: patientId: string(uuid), required
- Response 200: PaymentBalanceCorrected[]

### PUT /patients/cleanup/{patientId}/reverse-applications/{paymentId}
- Tags: Cleanup
- Path params: patientId: string(uuid), required; paymentId: string(uuid), required
- Request body: ChargeApplicationReversalRequest
- Response 200: ApplicationReversalApplication

### GET /patients/payments/retry-external-event/{organizationId}/{paymentId}/{eventNumber}
- Tags: Payments
- Path params: organizationId: string(uuid), required; paymentId: string(uuid), required; eventNumber: ['integer', 'string'](int32), required
- Response 200: (no body)

### POST /signalr/charges/{chargeId}/users/add
- Tags: Signalr
- Path params: chargeId: string(uuid), required
- Response 200: (no body)

### POST /signalr/charges/{chargeId}/users/remove
- Tags: Signalr
- Path params: chargeId: string(uuid), required
- Response 200: (no body)

### POST /signalr/charges/negotiate
- Tags: Signalr
- Response 200: (no body)

### POST /signalr/patient-payments/{patientId}/users/add
- Tags: Signalr
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### POST /signalr/patient-payments/{patientId}/users/remove
- Tags: Signalr
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### POST /signalr/patient-payments/negotiate
- Tags: Signalr
- Response 200: (no body)

### GET /utility/auto-apply/patients/{patientId}
- Tags: AutoApplying
- Path params: patientId: string(uuid), required
- Query params: organizationId: string(uuid); mode: WriteMode
- Response 200: (no body)

### GET /utility/auto-apply/patients/{patientId}/report
- Tags: AutoApplying
- Path params: patientId: string(uuid), required
- Query params: organizationId: string(uuid); includePaymentsWithoutFunds: boolean; includeChargesWithoutBalance: boolean
- Response 200: AutoApplyReport

### GET /utility/feed/continuation-tokens
- Tags: Utility
- Query params: asOfDateTimeUtc: string(date-time)
- Response 200: (no body)

### GET /utility/import/patients
- Tags: Import
- Query params: sourceOrganizationId: string(uuid); sourcePatientId: string(uuid); targetPatientId: string(uuid); targetOrganizationId: string(uuid); configurationPrefix: string
- Response 200: ImportPatientResults

### PUT /utility/import/patients
- Tags: Import
- Request body: ImportPatientRequest
- Response 200: ImportPatientResults

### GET /utility/projections/charges/set-missing-tags
- Tags: Projections
- Query params: maxUpdates: ['integer', 'string'](int32)
- Response 200: (no body)

### GET /utility/projections/payments/set-missing-tags
- Tags: Projections
- Query params: maxUpdates: ['integer', 'string'](int32)
- Response 200: (no body)

### GET /utility/projections/reserved-funds/build
- Tags: Projections
- Query params: resetManualContinuationToken: boolean
- Response 200: (no body)

### GET /utility/projections/reserved-funds/set-missing-tags
- Tags: Projections
- Query params: maxUpdates: ['integer', 'string'](int32)
- Response 200: (no body)

### GET /utility/projections/reserved-funds/stop
- Tags: Projections
- Response 200: (no body)

## Schemas

**AccountBalance**
  - account: TransactionAccount (required)
  - balance: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)

**AccountSummary**
  - type: TransactionAccountType (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - balance: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - account: TransactionAccount (required)

**ActivityChargeResponse**
  - chargeId: string(uuid)
  - chargeCode: ['null', 'string']
  - ndc: ['null', 'string']
  - billingUnits: ['number', 'string'](double)
  - balance: ['number', 'string'](double)
  - chargeStatus: ChargeStatusType
  - chargeSubStatus: ChargeSubStatusType

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

**ActivityResponse**
  - activityId: string(uuid) (required)
  - charges: ['null', 'array'] (required)

**ActivityServiceTypeMapping**
  - activityTypeId: string(uuid) (required)
  - serviceTypeId: ['null', 'string'](uuid) (required)

**AddressFamily**
  - (no properties)

**AdjustmentDetails**
  - isContractual: boolean (required)
  - selfPayDetail: TransactionSelfPayDetail
  - expected: ['null', 'boolean']
  - initial: ['null', 'boolean']
  - disputed: ['null', 'boolean']
  - groupCode: ['null', 'string']
  - reasonCode: ['null', 'string']
  - isInterestAdjustment: boolean
  - adjustmentReasonId: ['null', 'string'](uuid)
  - reversedChargeTransactionId: ['null', 'string'](uuid)
  - chargeDNA: ChargeDNA
  - voidReasonId: ['null', 'string'](uuid)

**AllocationBatchResponse**
  - batchId: string(uuid) (required)
  - batchNumber: ['integer', 'string'](int32) (required)
  - type: PaymentBatchType (required)
  - ledgerDate: Date (required)
  - timeStamp: string(date-time) (required)
  - batchManipulatedAmount: ['number', 'string'](double) (required)
  - endingAppliedBalance: ['number', 'string'](double) (required)
  - endingUnappliedBalance: ['number', 'string'](double) (required)
  - sourceReserveBatchId: ['null', 'string'](uuid) (required)
  - applications: ['null', 'array']
  - createdByUserId: string(uuid) (required)

**AllocationRefundDetailResponse**
  - refundReasonId: string(uuid) (required)

**AllowedAmountDecision**
  - payerId: ['null', 'string'](uuid) (required)
  - payerReason: ['null', 'string'] (required)
  - candidates: ['null', 'array'] (required)
  - matchedContractId: ['null', 'string'](uuid) (required)
  - matchedFeeScheduleId: ['null', 'string'](uuid) (required)

**ApplicableFundsResponse**
  - chargeCredits: ['null', 'array'] (required)
  - reserveFundsTotal: ['number', 'string'](double) (required)

**ApplicationChargeDetails**
  - chargeId: string(uuid) (required)
  - dateOfService: Date (required)
  - divisionId: string(uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - chargeIdentity: ChargeIdentity

**ApplicationReversalApplication**
  - patientPaymentApplicationsReversedEventNumber: ['null', 'integer', 'string'](int32) (required)
  - patientPaymentApplicationsReversedEvent: PatientPaymentApplicationsReversed (required)
  - paymentAppliedEvent: PaymentApplied (required)

**ApplicationReversalResponse**
  - applications: ApplicationReversalApplication[] (required)
  - applied: ['number', 'string'](double) (required)
  - reserved: ['number', 'string'](double) (required)

**ApplicationSource**
  - type: ApplicationSourceType (required)
  - chargeId: ['null', 'string'](uuid) (required)
  - amount: ['number', 'string'](double) (required)
  - amountIsBestEffortRequest: boolean

**ApplicationSourceType**
  - (no properties)

**ApplicationSummaryResponse**
  - companyId: string(uuid) (required)
  - paymentAppliedAllocationId: PaymentBatchIdentity (required)
  - paymentUnappliedAllocationId: PaymentBatchIdentity (required)
  - allocationId: PaymentBatchIdentity
  - dateOfService: Date (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - amount: ['number', 'string'](double) (required)
  - ledgerDate: Date (required)
  - serviceType: ['null', 'string'](uuid)
  - providerId: ['null', 'string'](uuid)
  - isApplied: boolean (required)
  - createdByUserId: string(uuid) (required)
  - refundDetail: AllocationRefundDetailResponse (required)
  - timeStamp: string(date-time) (required)
  - appliedCharge: PaymentChargeApplicationResponse (required)

**ApplyRequest**
  - ledgerDate: Date (required)
  - sources: ['null', 'array'] (required)

**ApplyResponse**
  - batch: TransactionBatchSummary (required)

**ApplyResult**
  - status: ApplyResultStatus (required)
  - paymentApplicationBatchId: PaymentApplicationBatchIdentity (required)
  - patientPaymentApplicationsPostedEvent: PatientPaymentApplicationsPosted (required)
  - paymentAppliedEvents: PaymentApplied[] (required)
  - paymentApplicationConveyedEvents: PaymentApplicationConveyed[] (required)
  - patientPaymentChargeApplications: PatientPaymentChargeApplication[] (required)

**ApplyResultStatus**
  - (no properties)

**AsnEncodedData**
  - oid: object
  - rawData: string(byte)

**AsymmetricAlgorithm**
  - keySize: ['integer', 'string'](int32)
  - legalKeySizes: legalKeySizes
  - signatureAlgorithm: ['null', 'string']
  - keyExchangeAlgorithm: ['null', 'string']

**AutoApplyReport**
  - organizationId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - triggers: AutoApplyReportTrigger[] (required)
  - matches: AutoApplyReportPaymentChargeMatch[] (required)
  - charges: AutoApplyReportCharge[] (required)
  - payments: AutoApplyReportPayment[] (required)
  - lastOutcome: object
  - greeting: ['null', 'string']

**AutoApplyReportCharge**
  - chargeId: string(uuid) (required)
  - companyId: string(uuid) (required)
  - dateOfService: Date (required)
  - divisionId: string(uuid) (required)
  - serviceType: ['null', 'string'](uuid) (required)
  - guarantorBalance: ['number', 'string'](double) (required)
  - lastEventTimestamp: string(date-time) (required)

**AutoApplyReportOutcome**
  - correlationId: string(uuid) (required)
  - source: ['null', 'string'] (required)
  - completedAt: string(date-time) (required)
  - result: ['null', 'string'] (required)
  - appliedAmount: ['number', 'string'](double) (required)

**AutoApplyReportPayment**
  - paymentId: string(uuid) (required)
  - reservedFundsBalance: ['number', 'string'](double) (required)
  - reservedFunds: AutoApplyReportReservedFund[] (required)
  - lastEventTimestamp: string(date-time) (required)

**AutoApplyReportPaymentChargeMatch**
  - chargeId: string(uuid) (required)
  - paymentId: string(uuid) (required)
  - applicableAmount: ['number', 'string'](double) (required)
  - companyId: string(uuid) (required)
  - dateOfService: object
  - divisionId: ['null', 'string'](uuid)
  - serviceType: ['null', 'string'](uuid)
  - providerId: ['null', 'string'](uuid)

**AutoApplyReportReservedFund**
  - balance: ['number', 'string'](double) (required)
  - timestamp: string(date-time) (required)
  - companyId: string(uuid) (required)
  - dateOfService: object
  - divisionId: ['null', 'string'](uuid)
  - serviceType: ['null', 'string'](uuid)
  - providerId: ['null', 'string'](uuid)

**AutoApplyReportTrigger**
  - eventType: ['null', 'string'] (required)
  - timestamp: string(date-time) (required)

**AutomationSource**
  - (no properties)

**BalanceSummary**
  - guarantorBalance: ['number', 'string'](double) (required)
  - outstandingBalance: ['number', 'string'](double) (required)
  - expectedAdjustmentSum: ['number', 'string'](double) (required)
  - accounts: ['null', 'array'] (required)
  - version: SummaryRecordVersion (required)

**CancellationToken**
  - isCancellationRequested: boolean
  - canBeCanceled: boolean
  - waitHandle: WaitHandle

**Charge**
  - chargeId: string(uuid) (required)
  - chargeSharpId: ['null', 'string']
  - chargeIdentity: ChargeIdentity
  - patientId: string(uuid)
  - patientIdentity: PatientIdentity
  - account: ChargeAccount
  - resources: ChargeResources
  - service: ChargeService
  - source: ChargeSource
  - posting: ChargePosting (required)
  - guarantor: object (required)
  - manufacturerAssociation: object (required)
  - chargeLedgerDate: Date
  - dateOfService: Date
  - dateRangeStart: object
  - dateRangeEnd: object
  - createdDate: string(date-time)
  - financials: ChargeFinancials (required)
  - isPosted: boolean (required)
  - voidReason: ['null', 'string'](uuid)
  - isVoid: boolean
  - transactionNumber: ['integer', 'string'](int32)
  - chargeStatus: ChargeStatusType
  - chargeSubStatus: ChargeSubStatusType
  - remitExpectedDeterminations: OrderableCollectionOfGuidAndRemitExpectedDetermination
  - remitDecisionsAccepted: OrderableCollectionOfGuidAndRemitDisputeDecisionAccepted
  - transactions: OrderableCollectionOfGuidAndChargeTransaction
  - guarantorPaymentTransactions: ['null', 'array']

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

**ChargeAdjustmentRequest**
  - from: TransactionAccountRequest (required)
  - ledgerDate: Date
  - amount: ['null', 'number', 'string'](double)
  - contractualAdjustmentReasonId: ['null', 'string'](uuid)
  - noncontractualAdjustmentReasonId: ['null', 'string'](uuid)
  - groupCode: ['null', 'string']
  - reasonCode: ['null', 'string']

**ChargeAdjustmentResponse**
  - chargeId: string(uuid) (required)
  - isValid: boolean (required)
  - transactionId: object
  - errors: ['null', 'array']

**ChargeAdjustmentReversalRequest**
  - transactionId: ChargeTransactionIdentity
  - from: TransactionAccountRequest (required)
  - ledgerDate: Date

**ChargeApplicationReversalRequest**
  - chargeId: ChargeIdentity (required)
  - paymentId: PaymentIdentity (required)
  - ledgerDate: Date (required)
  - reversalApplicationType: ReversalApplicationType (required)
  - patientPaymentApplicationIds: string(uuid)[] (required)

**ChargeAssembly**
  - chargeAssemblyId: string(uuid) (required)
  - payerAssemblyId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - payerResponsibilityIndex: ['integer', 'string'](int32) (required)
  - chargeAssemblyNumber: ['null', 'string'] (required)
  - payerAssemblyNumber: ['null', 'string'] (required)
  - charges: ['null', 'array'] (required)
  - transferOptions: ['null', 'array'] (required)

**ChargeAssemblyCharge**
  - chargeId: string(uuid) (required)
  - renderedActivityId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - ledgerDate: Date (required)
  - chargeCode: ['null', 'string'] (required)
  - chargeCodeDescription: ['null', 'string'] (required)
  - modifiers: ['null', 'array'] (required)
  - modifierName: ['null', 'string'] (required)
  - billingUnits: ['number', 'string'](double) (required)
  - billed: ['number', 'string'](double) (required)
  - allowed: ['null', 'number', 'string'](double) (required)
  - expected: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - interest: ['number', 'string'](double) (required)
  - isVoid: boolean (required)
  - contractualAdjustment: ChargeAssemblyChargeAdjustment (required)
  - additionalAdjustments: ['null', 'array'] (required)
  - transfers: ['null', 'array'] (required)
  - transferOptions: ['null', 'array']

**ChargeAssemblyChargeAdjustment**
  - adjustmentReasonId: ['null', 'string'](uuid) (required)
  - adjustmentReasonDisplay: ['null', 'string'] (required)
  - amount: ['number', 'string'](double) (required)

**ChargeAssemblyChargeSummary**
  - chargeId: string(uuid) (required)
  - ledgerDate: Date (required)
  - chargeCode: ['null', 'string'] (required)
  - modifiers: ['null', 'array'] (required)
  - billingUnits: ['number', 'string'](double) (required)
  - billed: ['number', 'string'](double) (required)
  - expected: ['number', 'string'](double) (required)
  - allowed: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - adjustments: ['number', 'string'](double) (required)
  - transfers: ['number', 'string'](double) (required)
  - transferOptions: ['null', 'array']

**ChargeAssemblyChargeTransfer**
  - toAccountType: TransactionAccountType (required)
  - toAccountId: string(uuid) (required)
  - transferReasonId: ['null', 'string'](uuid) (required)
  - transferReasonDisplay: ['null', 'string'] (required)
  - amount: ['number', 'string'](double) (required)

**ChargeAssemblyChargeUpdateRequest**
  - chargeId: string(uuid) (required)
  - ledgerDate: Date (required)
  - paid: ['number', 'string'](double) (required)
  - contractualAdjustment: ChargeAssemblyChargeAdjustment (required)
  - additionalAdjustments: ['null', 'array'] (required)
  - transfers: ['null', 'array'] (required)

**ChargeAssemblyChargeUpdateResponse**
  - chargeId: string(uuid) (required)
  - successful: boolean (required)
  - errors: ['null', 'array'] (required)

**ChargeAssemblyConveyanceRequest**
  - sourceAssemblyRequest: ChargeAssemblyUpdateRequest (required)
  - targetAssemblyRequest: ChargeAssemblyUpdateRequest (required)

**ChargeAssemblyConveyanceResponse**
  - sourceChargeAssemblyId: string(uuid) (required)
  - sourcePayerAssemblyId: string(uuid) (required)
  - targetChargeAssemblyId: string(uuid) (required)
  - targetPayerAssemblyId: string(uuid) (required)
  - chargeResponses: ['null', 'array'] (required)

**ChargeAssemblyPortfolio**
  - chargeAssemblyId: string(uuid) (required)
  - accounts: ['null', 'array'] (required)

**ChargeAssemblyPortfolioAccount**
  - accountType: TransactionAccountType (required)
  - accountId: string(uuid) (required)
  - displayName: ['null', 'string'] (required)
  - active: boolean (required)

**ChargeAssemblyTransferOption**
  - accountType: TransactionAccountType (required)
  - accountId: string(uuid) (required)

**ChargeAssemblyUpdateRequest**
  - chargeAssemblyId: string(uuid) (required)
  - payerAssemblyId: string(uuid) (required)
  - requests: ['null', 'array'] (required)

**ChargeAssemblyUpdateResponse**
  - chargeAssemblyId: string(uuid) (required)
  - chargeResponses: ['null', 'array'] (required)

**ChargeBatchIdentity**
  - (no properties)

**ChargeBatchType**
  - (no properties)

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

**ChargeCorrectionRequest**
  - ledgerDate: object
  - requestedModifierIds: ['null', 'array']
  - billingUnits: ['null', 'number', 'string'](double)
  - ndc: ['null', 'string']
  - modifierId: ['null', 'string'](uuid)
  - companyId: ['null', 'string'](uuid)
  - divisionId: ['null', 'string'](uuid)
  - facilityId: ['null', 'string'](uuid)
  - billingProviderId: ['null', 'string'](uuid)
  - allowed: ['null', 'number', 'string'](double)
  - fee: ['null', 'number', 'string'](double)

**ChargeCorrectionResponse**
  - chargeId: string(uuid) (required)
  - isValid: boolean (required)
  - errors: ['null', 'array']

**ChargeCorrectionValidationRequest**
  - billingUnits: ['null', 'number', 'string'](double)
  - ndc: ['null', 'string']
  - modifierId: ['null', 'string'](uuid)
  - companyId: ['null', 'string'](uuid)
  - divisionId: ['null', 'string'](uuid)
  - facilityId: ['null', 'string'](uuid)
  - billingProviderId: ['null', 'string'](uuid)
  - allowed: ['null', 'number', 'string'](double)
  - fee: ['null', 'number', 'string'](double)

**ChargeCreditSummary**
  - chargeId: string(uuid)
  - encounterId: IntakeEncounterIdentity
  - chargeCode: ['null', 'string']
  - ndc: ['null', 'string']
  - dateOfService: Date
  - chargeBalance: ['number', 'string'](double)
  - guarantorBalance: ['number', 'string'](double)
  - creditAmount: ['number', 'string'](double)
  - isUnresolved: boolean
  - source: ChargeSource

**ChargeDecisionLog**
  - organizationId: string(uuid) (required)
  - chargeId: string(uuid) (required)
  - entries: ChargeDecisionLogEntry[] (required)
  - partition: string
  - id: string

**ChargeDecisionLogEntry**
  - capturedAt: string(date-time) (required)
  - isCorrection: boolean (required)
  - chargeMaster: ChargeMasterDecision (required)
  - allowedAmount: AllowedAmountDecision (required)

**ChargeDNA**
  - chargeCode: ['null', 'string']
  - companyId: string(uuid)
  - divisionId: string(uuid)
  - facilityId: string(uuid)
  - billingProviderId: string(uuid)
  - billingUnits: ['number', 'string'](double)
  - ndc: ['null', 'string']
  - modifierId: ['null', 'string'](uuid)

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

**ChargeFinancialSummary**
  - fee: ['number', 'string'](double) (required)
  - allowed: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - guarantorBalance: ['number', 'string'](double) (required)
  - guarantorAppliedPaymentTotal: ['number', 'string'](double) (required)
  - guarantorOverpayment: ['number', 'string'](double) (required)
  - expectedAdjustmentApplied: boolean (required)
  - accounts: ['null', 'array'] (required)

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

**ChargeMaster**
  - organizationId: string(uuid) (required)
  - chargeMasterId: string(uuid) (required)
  - fees: ['null', 'array'] (required)

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

**ChargePayersSummary**
  - payers: ['null', 'array'] (required)

**ChargePayerSummary**
  - account: TransactionAccount (required)
  - paid: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - firstPayment: Date (required)

**ChargePaymentReversalRequest**
  - chargeTransactionId: string(uuid)
  - amount: ['number', 'string'](double)
  - ledgerDate: Date
  - dateOfService: object
  - serviceTypeId: ['null', 'string'](uuid)
  - divisionId: ['null', 'string'](uuid)
  - providerId: ['null', 'string'](uuid)

**ChargePortfolio**
  - chargeId: string(uuid) (required)
  - policies: ['null', 'array'] (required)
  - snfPatients: ['null', 'array'] (required)
  - copayAwards: ['null', 'array'] (required)
  - guarantors: ['null', 'array'] (required)

**ChargePortfolioMerged**
  - policies: ['null', 'array'] (required)
  - snfPatients: ['null', 'array'] (required)
  - copayAwards: ['null', 'array'] (required)
  - guarantors: ['null', 'array'] (required)

**ChargePortfolioOrdered**
  - chargeId: string(uuid) (required)
  - accounts: ['null', 'array'] (required)

**ChargePortfolioOrderedAccount**
  - accountType: TransactionAccountType (required)
  - accountId: string(uuid) (required)
  - displayName: ['null', 'string'] (required)
  - active: boolean (required)

**ChargePortfoliosRequest**
  - chargeIds: ['null', 'array'] (required)

**ChargePosting**
  - chargemasterId: string(uuid)
  - chargemasterCompanyId: ['null', 'string'](uuid)
  - contractId: string(uuid)
  - feeScheduleId: string(uuid)

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

**ChargeResources**
  - companyId: string(uuid)
  - locationId: string(uuid)
  - divisionId: string(uuid)
  - facilityId: string(uuid)
  - billingProviderId: string(uuid)

**ChargeResponse**
  - chargeId: string(uuid)
  - chargeSharpId: ['null', 'string']
  - ledgerDate: Date
  - patientId: string(uuid)
  - dateOfService: Date
  - dateRangeStart: object
  - dateRangeEnd: object
  - account: ChargeAccount
  - source: ChargeSource
  - companyId: string(uuid)
  - locationId: string(uuid)
  - chargeCode: ['null', 'string']
  - divisionId: string(uuid)
  - facilityId: string(uuid)
  - billingProviderId: string(uuid)
  - ndc: ['null', 'string']
  - billingUnits: ['number', 'string'](double)
  - createdDate: string(date-time)
  - modifierId: ['null', 'string'](uuid)
  - fee: ['number', 'string'](double)
  - allowed: ['number', 'string'](double)
  - expectedAdjustmentApplied: boolean
  - balance: ['number', 'string'](double)
  - isPosted: boolean
  - voidReason: ['null', 'string'](uuid)
  - isVoid: boolean
  - transactionNumber: ['integer', 'string'](int32)
  - chargeStatus: ChargeStatusType
  - chargeSubStatus: ChargeSubStatusType
  - batches: ['null', 'array']
  - accounts: ['null', 'array']
  - posting: ChargePostingResponse
  - isSnf: boolean
  - isManufacturer: boolean
  - manufacturer: object

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

**ChargeSummary**
  - chargeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - balances: BalanceSummary (required)
  - timeStamp: string(date-time) (required)

**ChargeTransaction**
  - chargeTransactionId: ChargeTransactionIdentity (required)
  - chargeBatchId: ChargeBatchIdentity (required)
  - transactionNumber: ['integer', 'string'](int32) (required)
  - ledgerDate: Date (required)
  - amount: ['number', 'string'](double) (required)
  - disputedAmount: ['null', 'number', 'string'](double) (required)
  - billingUnits: ['null', 'number', 'string'](double) (required)
  - account: TransactionAccount (required)
  - batchType: ChargeBatchType (required)
  - type: ChargeTransactionType (required)
  - isReversal: boolean
  - userReasonDescription: ['null', 'string']
  - isMonetaryInterest: boolean
  - adjustmentDetails: AdjustmentDetails
  - conveyanceDetails: ConveyanceDetails
  - reservationApplicationDetails: ReservationApplicationDetails
  - remittanceDetails: RemittanceDetails
  - paymentDetails: PaymentDetails
  - postingDetails: PostingDetails
  - transferDetails: TransferDetails
  - voidDetails: VoidDetails
  - requestId: ['null', 'string'](uuid)
  - createdByUserId: string(uuid) (required)
  - timeStamp: string(date-time) (required)

**ChargeTransactionalCorrection**
  - from: TransactionAccountRequest (required)
  - ledgerDate: Date (required)
  - amount: ['number', 'string'](double) (required)
  - type: ChargeTransactionalCorrectionType (required)
  - to: TransactionAccountRequest
  - isInterestPayment: ['null', 'boolean']
  - noncontractualAdjustmentReasonId: ['null', 'string'](uuid)
  - transferReasonId: string(uuid)
  - groupCode: ['null', 'string']
  - reasonCode: ['null', 'string']
  - isGeneralAdjustment: ['null', 'boolean']
  - isContractualAdjustment: ['null', 'boolean']
  - contractualAdjustmentReasonId: ['null', 'string'](uuid)
  - billingUnits: ['null', 'number', 'string'](double)

**ChargeTransactionalCorrectionRequest**
  - correctionReason: ['null', 'string'] (required)
  - transactions: ['null', 'array'] (required)

**ChargeTransactionalCorrectionResponse**
  - chargeId: string(uuid) (required)
  - isValid: boolean (required)
  - chargeBatchId: object (required)
  - errors: ['null', 'array']

**ChargeTransactionalCorrectionType**
  - (no properties)

**ChargeTransactionIdentity**
  - (no properties)

**ChargeTransactionType**
  - (no properties)

**ChargeTransferRequest**
  - from: TransactionAccountRequest (required)
  - to: TransactionAccountRequest (required)
  - ledgerDate: Date
  - amount: ['null', 'number', 'string'](double)
  - transferReasonId: ['null', 'string'](uuid)
  - groupCode: ['null', 'string']
  - reasonCode: ['null', 'string']

**ChargeTransferResponse**
  - chargeId: string(uuid) (required)
  - isValid: boolean (required)
  - transactionId: object
  - errors: ['null', 'array']

**ChargeTransferReversalRequest**
  - transferChargeBatchId: ChargeBatchIdentity
  - fromTransactionId: object
  - toTransactionId: object
  - transferId: string(uuid)
  - ledgerDate: Date

**ChargeValidation**
  - charge: ChargeCandidate (required)
  - financials: ChargeFinancials (required)
  - posting: ChargePostingResponse (required)
  - guarantor: ChargeGuarantor (required)
  - manufacturerAssociation: object (required)
  - billingUnits: ['number', 'string'](double) (required)
  - currentLedgerDates: LedgerStates (required)
  - calculatedLedgerDate: Date (required)
  - errors: ['null', 'array'] (required)
  - selfPayAdjustmentReason: object (required)
  - groupCode: ['null', 'string'] (required)
  - reasonCode: ['null', 'string'] (required)
  - decisionLog: object
  - chargeId: string(uuid)
  - applyInitialAdjustmentOnChargeCreation: boolean
  - isValid: boolean

**ChargeValidationDecision**
  - capturedAt: string(date-time) (required)
  - isCorrection: boolean (required)
  - chargeMaster: ChargeMasterDecision (required)
  - allowedAmount: AllowedAmountDecision (required)

**ChargeVoidRequest**
  - ledgerDate: Date
  - voidReasonId: string(uuid)
  - activityRequeueRequested: boolean

**ChargeVoidResponse**
  - chargeId: string(uuid) (required)
  - isValid: boolean (required)
  - errors: ['null', 'array']

**Claim**
  - issuer: ['null', 'string']
  - originalIssuer: ['null', 'string']
  - properties: ['null', 'object']
  - subject: ClaimsIdentity
  - type: ['null', 'string']
  - value: ['null', 'string']
  - valueType: ['null', 'string']

**ClaimsIdentity**
  - authenticationType: ['null', 'string']
  - isAuthenticated: boolean
  - actor: object
  - bootstrapContext: object
  - claims: ['null', 'array']
  - label: ['null', 'string']
  - name: ['null', 'string']
  - nameClaimType: ['null', 'string']
  - roleClaimType: ['null', 'string']

**ClaimsPrincipal**
  - claims: ['null', 'array']
  - identities: ['null', 'array']
  - identity: IIdentity

**CompanyBalance**
  - companyId: string(uuid) (required)
  - balanceReserved: ['number', 'string'](double)
  - balanceOutstanding: ['number', 'string'](double)
  - divisionsDictionary: ['null', 'object']
  - divisions: ['null', 'array']

**ConnectionInfo**
  - id: string
  - remoteIpAddress: object
  - remotePort: ['integer', 'string'](int32)
  - localIpAddress: object
  - localPort: ['integer', 'string'](int32)
  - clientCertificate: object

**ContractCandidateDecision**
  - contractId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - isMatch: boolean (required)
  - reason: ['null', 'string'] (required)
  - feeSchedules: ['null', 'array'] (required)

**ContributingPaymentResponse**
  - paymentId: PaymentIdentity (required)
  - paymentDate: Date (required)
  - amount: ['number', 'string'](double) (required)

**ConveyanceDetails**
  - paymentId: string(uuid) (required)
  - paymentApplicationBatchId: PaymentApplicationBatchIdentity (required)
  - paymentIdentity: PaymentIdentity
  - patientPaymentChargeApplicationId: PatientPaymentChargeApplicationIdentity (required)
  - sourceFundIdentity: ReservedFundIdentity (required)
  - reversedChargeTransactionId: ['null', 'string'](uuid)
  - reversalType: ReversalApplicationType

**ConveyanceType**
  - (no properties)

**CopayAward**
  - manufacturerCopayProgramAwardId: string(uuid) (required)
  - assistanceNumber: ['null', 'string'] (required)
  - manufacturerCopayProgramId: string(uuid) (required)
  - manufacturerCopayProgramName: ['null', 'string'] (required)
  - payerId: string(uuid) (required)
  - payerName: ['null', 'string'] (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - balance: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - firstPayment: object (required)
  - active: boolean (required)

**CorruptApplications**
  - results: FinderResults (required)
  - requests: ChargeApplicationReversalRequest[] (required)

**CreditConveyanceDetails**
  - conveyanceType: ConveyanceType (required)
  - patientPaymentChargeApplicationId: PatientPaymentChargeApplicationIdentity (required)
  - paymentApplicationBatchId: PaymentApplicationBatchIdentity (required)
  - charge: ApplicationChargeDetails (required)
  - ledgerDate: Date (required)

**Criteria**
  - organizationId: OrganizationIdentity (required)
  - patientId: PatientIdentity (required)
  - paymentId: PaymentIdentity (required)

**Date**
  - (no properties)

**DateBalance**
  - dateOfService: Date (required)
  - balanceOutstanding: ['number', 'string'](double)

**DisputeResolutionRequest**
  - chargeBatchId: ChargeBatchIdentity
  - chargePaymentId: string(uuid)
  - resolutionType: RemittanceDisputeResolutionType
  - eventNumber: ['integer', 'string'](int64)

**DisputeResolutionResponse**
  - chargeBatchId: ChargeBatchIdentity (required)

**DivisionBalance**
  - divisionId: string(uuid) (required)
  - datesDictionary: ['null', 'object']
  - dates: ['null', 'array']
  - balanceOutstanding: ['number', 'string'](double)

**Exception**
  - targetSite: MethodBase
  - message: ['null', 'string']
  - data: ['null', 'object']
  - innerException: Exception
  - helpLink: ['null', 'string']
  - source: ['null', 'string']
  - hResult: ['integer', 'string'](int32)
  - stackTrace: ['null', 'string']

**Fee**
  - feeIdentifier: ['null', 'string'] (required)
  - chargeCode: ['null', 'string'] (required)
  - activityCode: ['null', 'string'] (required)
  - modifier: ['null', 'string'](uuid) (required)
  - ndc: ['null', 'string'] (required)
  - amount: ['number', 'string'](double) (required)

**FeeScheduleCandidateDecision**
  - feeScheduleId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - isMatch: boolean (required)
  - reason: ['null', 'string'] (required)

**FinderResults**
  - criteria: Criteria (required)
  - charges: ResultCharge[] (required)

**FundResponse**
  - fundIdentity: ReservedFundIdentity (required)
  - amount: ['number', 'string'](double) (required)
  - contributingPayments: ['null', 'array']

**Guarantor**
  - guarantorId: string(uuid) (required)
  - guarantorIsPatient: boolean (required)
  - guarantorFAN: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffixName: ['null', 'string'] (required)
  - balance: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - firstPayment: object (required)
  - active: boolean (required)

**HostString**
  - value: ['null', 'string']
  - hasValue: boolean
  - host: ['null', 'string']
  - port: ['null', 'integer', 'string'](int32)

**HttpContext**
  - features: ['null', 'array']
  - request: HttpRequest
  - response: HttpResponse
  - connection: ConnectionInfo
  - webSockets: WebSocketManager
  - user: ClaimsPrincipal
  - items: object
  - requestServices: IServiceProvider
  - requestAborted: CancellationToken
  - traceIdentifier: string
  - session: ISession

**HttpRequest**
  - httpContext: HttpContext
  - method: string
  - scheme: string
  - isHttps: boolean
  - host: HostString
  - pathBase: PathString
  - path: PathString
  - queryString: QueryString
  - query: KeyValuePairOfstringAndStringValues[]
  - protocol: string
  - headers: ['null', 'object']
  - cookies: KeyValuePairOfstringAndstring[]
  - contentLength: ['null', 'integer', 'string'](int64)
  - contentType: ['null', 'string']
  - body: Stream
  - bodyReader: PipeReader
  - hasFormContentType: boolean
  - form: KeyValuePairOfstringAndStringValues[]
  - routeValues: object

**HttpResponse**
  - httpContext: HttpContext
  - statusCode: ['integer', 'string'](int32)
  - headers: ['null', 'object']
  - body: Stream
  - bodyWriter: PipeWriter
  - contentLength: ['null', 'integer', 'string'](int64)
  - contentType: ['null', 'string']
  - cookies: IResponseCookies
  - hasStarted: boolean

**IIdentity**
  - name: ['null', 'string']
  - authenticationType: ['null', 'string']
  - isAuthenticated: boolean

**ImportPatientRequest**
  - sourceOrganizationId: string(uuid) (required)
  - sourcePatientId: string(uuid) (required)
  - targetOrganizationId: ['null', 'string'](uuid)
  - targetPatientId: ['null', 'string'](uuid)
  - configurationPrefix: string

**ImportPatientResults**
  - sourceOrganizationId: OrganizationIdentity (required)
  - sourcePatientId: PatientIdentity (required)
  - targetOrganizationId: OrganizationIdentity (required)
  - targetPatientId: PatientIdentity (required)
  - sourceToTargetChargeMap: object (required)
  - sourceToTargetPaymentMap: object (required)

**InsuranceReservedFund**
  - organizationId: string(uuid) (required)
  - reservedFundsId: string(uuid) (required)
  - remittanceId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - ledgerDate: Date (required)
  - hicn: ['null', 'string'] (required)
  - otherId: ['null', 'string'] (required)
  - reasonCodeId: ['null', 'string'](uuid) (required)
  - divisionId: string(uuid) (required)
  - categoryId: ['null', 'string'](uuid) (required)
  - isPosted: boolean (required)
  - transactions: ['null', 'array'] (required)

**InsuranceReservedFundBatchIdentity**
  - (no properties)

**InsuranceReservedFundBatchType**
  - (no properties)

**InsuranceReservedFundTransaction**
  - transactionId: InsuranceReservedFundTransactionIdentity (required)
  - transactionType: InsuranceReservedFundTransactionType (required)
  - batchId: InsuranceReservedFundBatchIdentity (required)
  - batchType: InsuranceReservedFundBatchType (required)
  - ledgerDate: Date (required)
  - transactionNumber: ['integer', 'string'](int32) (required)
  - amount: ['number', 'string'](double) (required)
  - isReversal: boolean (required)
  - reversedTransactionId: ['null', 'string'](uuid) (required)
  - createdByUserId: string(uuid) (required)
  - timeStamp: string(date-time) (required)

**InsuranceReservedFundTransactionIdentity**
  - (no properties)

**InsuranceReservedFundTransactionType**
  - (no properties)

**IntakeEncounterIdentity**
  - locationId: string(uuid)
  - patientId: string(uuid)
  - dateOfService: Date

**IPAddress**
  - addressFamily: AddressFamily
  - scopeId: ['integer', 'string'](int64)
  - isIPv6Multicast: boolean
  - isIPv6LinkLocal: boolean
  - isIPv6SiteLocal: boolean
  - isIPv6Teredo: boolean
  - isIPv6UniqueLocal: boolean
  - isIPv4MappedToIPv6: boolean
  - address: ['integer', 'string'](int64)

**IResponseCookies**
  - (no properties)

**IServiceProvider**
  - (no properties)

**ISession**
  - isAvailable: boolean
  - id: ['null', 'string']
  - keys: ['null', 'array']

**KeySizes**
  - minSize: ['integer', 'string'](int32) (required)
  - maxSize: ['integer', 'string'](int32) (required)
  - skipSize: ['integer', 'string'](int32) (required)

**KeyValuePairOfstringAndstring**
  - key: ['null', 'string'] (required)
  - value: ['null', 'string'] (required)

**KeyValuePairOfstringAndStringValues**
  - key: ['null', 'string'] (required)
  - value: string[] (required)

**KeyValuePairOfTypeAndObject**
  - key: Type (required)
  - value: object (required)

**LedgerState**
  - ledgerDate: Date (required)
  - closedTimestamp: string(date-time) (required)
  - closedByUserId: string(uuid) (required)

**LedgerStates**
  - chargeLedger: LedgerState
  - paymentLedger: LedgerState

**MethodBase**
  - (no properties)

**Month**
  - (no properties)

**Oid**
  - value: ['null', 'string']
  - friendlyName: ['null', 'string']

**OrderableCollectionOfGuidAndChargeTransaction**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndPatientPaymentChargeApplication**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndPatientPaymentTransaction**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndPaymentBatch**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndPaymentChargeApplicationBatch**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndRemitDisputeDecisionAccepted**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndRemitExpectedDetermination**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrganizationIdentity**
  - id: string(uuid) (required)

**PathString**
  - value: ['null', 'string']
  - hasValue: boolean

**PatientAllocatedSummaryCompany**
  - companyId: string(uuid) (required)
  - unapplied: ['number', 'string'](double) (required)

**PatientChargeSummaryProjection**
  - chargeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - chargeAccount: object (required)
  - financialSummary: ChargeFinancialSummary (required)
  - resources: ChargeResources (required)
  - service: ChargeService (required)
  - source: ChargeSource (required)
  - dateOfService: Date (required)
  - ledgerDate: Date (required)
  - timeStamp: string(date-time) (required)
  - lastAppliedEventNumber: ['integer', 'string'](int64) (required)

**PatientIdentity**
  - (no properties)

**PatientPaymentApplicationBatchType**
  - (no properties)

**PatientPaymentApplicationsPosted**
  - patientId: string(uuid) (required)
  - ledgerDate: Date (required)
  - chargeId: ChargeIdentity (required)
  - chargeApplications: OrderableCollectionOfGuidAndPatientPaymentChargeApplication (required)
  - patientIdentity: PatientIdentity

**PatientPaymentApplicationsReversed**
  - patientId: string(uuid)
  - ledgerDate: Date
  - chargeId: ChargeIdentity
  - reversalApplicationType: ReversalApplicationType
  - chargeApplications: OrderableCollectionOfGuidAndPatientPaymentChargeApplication
  - dateOfService: Date
  - serviceTypeId: ['null', 'string'](uuid)
  - divisionId: ['null', 'string'](uuid)
  - patientIdentity: PatientIdentity

**PatientPaymentApplicationType**
  - (no properties)

**PatientPaymentChargeApplication**
  - patientPaymentChargeApplicationId: PatientPaymentChargeApplicationIdentity
  - paymentApplicationBatchId: PaymentApplicationBatchIdentity
  - targetPaymentCharge: PaymentCharge
  - ledgerDate: Date
  - type: PatientPaymentApplicationType
  - paymentId: PaymentIdentity
  - targetChargeId: ChargeIdentity
  - appliedAmount: ['number', 'string'](double)
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)
  - reversalApplicationType: object
  - reversedChargeTransactionId: ['null', 'string'](uuid)
  - sourceFundIdentity: ReservedFundIdentity
  - sourceChargeId: ChargeIdentity

**PatientPaymentChargeApplicationIdentity**
  - (no properties)

**PatientPaymentFinancialsUpdate**
  - applied: ['number', 'string'](double)
  - reserved: ['number', 'string'](double)

**PatientPaymentListResponse**
  - patientId: string(uuid)
  - payments: ['null', 'array']

**PatientPaymentSummary**
  - patientId: string(uuid)
  - payments: ['null', 'array']

**PatientPaymentTransaction**
  - creditConveyanceDetails: CreditConveyanceDetails
  - reservationDetails: ReservationDetails
  - reservationApplicationDetails: ReservationApplicationDetails
  - postingApplicationDetails: PostingApplicationDetails
  - paymentId: PaymentIdentity
  - patientPaymentTransactionId: PatientPaymentTransactionIdentity
  - paymentBatchId: PaymentBatchIdentity
  - amount: ['number', 'string'](double)
  - type: PaymentTransactionType
  - automationSource: AutomationSource
  - automationSourceDescription: ['null', 'string']
  - transactionNumber: ['integer', 'string'](int32)
  - createdByUserId: string(uuid)
  - ledgerDate: Date
  - timeStamp: string(date-time)

**PatientPaymentTransactionIdentity**
  - (no properties)

**PatientReservesResponse**
  - funds: ['null', 'array'] (required)

**PatientReservesSummaryResponse**
  - companies: ['null', 'array']

**PatientSummaryResponse**
  - companies: ['null', 'array']

**PayerAssistanceProgramCoveredService**
  - assistanceProgramCoveredServiceId: string(uuid) (required)
  - chargeCode: PayerAssistanceProgramCoveredServiceCriteria (required)
  - activityCode: object
  - modifier: object
  - ndc: object
  - diagnosis: object

**PayerAssistanceProgramCoveredServiceCriteria**
  - elementId: string (required)
  - setId: ['null', 'string'](uuid) (required)
  - isFactorySet: ['null', 'boolean'] (required)

**PayerContractAllowedRequest**
  - activityDetails: ['null', 'array'] (required)

**PayerContractAssociation**
  - ids: string(uuid)[] (required)
  - all: boolean

**PayerContractCollectionV2**
  - payerId: string(uuid) (required)
  - contracts: PayerContractV2[] (required)
  - partition: string (required)
  - id: string

**PayerContractDetailV4**
  - payerId: string(uuid) (required)
  - contractId: string(uuid) (required)
  - plans: PayerContractAssociation (required)
  - divisions: PayerContractAssociation (required)
  - providers: PayerContractAssociation (required)
  - facilities: PayerContractAssociation (required)
  - feeSchedules: PayerContractFeeScheduleV2[] (required)
  - activeFeeSchedules: ['null', 'array']
  - partition: string (required)
  - id: string

**PayerContractFeeScheduleV2**
  - feeScheduleId: string(uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - isDeleted: boolean (required)
  - name: ['null', 'string'] (required)

**PayerContractV2**
  - contractId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - companyId: string(uuid) (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)
  - isDeleted: boolean (required)
  - name: ['null', 'string'] (required)

**PayerFeeScheduleV4**
  - feeScheduleId: string(uuid) (required)
  - fees: PayerFeeV3[] (required)
  - partition: string (required)
  - id: string

**PayerFeeV3**
  - feeIdentifier: string (required)
  - chargeCode: string (required)
  - activityCode: ['null', 'string'] (required)
  - modifier: ['null', 'string'](uuid) (required)
  - ndc: ['null', 'string'] (required)
  - allowedAmount: ['number', 'string'](double) (required)

**PayerPortfolioDetail**
  - payerId: string(uuid)
  - portfolioId: string(uuid)

**PayersManufacturerCopayProgramV2**
  - programId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - isDeleted: boolean (required)
  - partition: string (required)
  - id: string

**PayersPayerV4**
  - payerId: string(uuid) (required)
  - payerType: PayerType (required)
  - autoAdjustmentReasonId: ['null', 'string'](uuid) (required)
  - isContractual: ['null', 'boolean'] (required)
  - name: ['null', 'string'] (required)
  - partition: string (required)
  - id: string

**PayersPlanV3**
  - planId: string(uuid) (required)
  - planName: ['null', 'string'] (required)
  - isActive: boolean (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - payerType: object (required)
  - isPayerDeleted: boolean (required)
  - isDeleted: boolean (required)
  - coveredService: PayerAssistanceProgramCoveredService[] (required)
  - partition: string (required)
  - id: string

**PayersSnfPatientV2**
  - snfPatientId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - residentNumber: string (required)
  - snfId: string(uuid) (required)
  - snfName: ['null', 'string'] (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - partition: string (required)
  - id: string

**PayersSnfV2**
  - snfId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - isDeleted: boolean (required)
  - partition: string (required)
  - id: string

**PayerType**
  - (no properties)

**Payment**
  - paymentId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - paymentIdentity: PaymentIdentity
  - patientIdentity: PatientIdentity
  - account: PaymentAccount (required)
  - batchNumber: ['integer', 'string'](int32) (required)
  - transactionNumber: ['integer', 'string'](int32) (required)
  - companyId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - ledgerDate: Date
  - financials: PaymentFinancials (required)
  - acceptance: PaymentAcceptance
  - paymentBatches: OrderableCollectionOfGuidAndPaymentBatch
  - chargeApplicationBatches: OrderableCollectionOfGuidAndPaymentChargeApplicationBatch (required)
  - transactions: OrderableCollectionOfGuidAndPatientPaymentTransaction (required)

**PaymentAcceptance**
  - paymentSpecificationId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - patientIdentity: PatientIdentity
  - type: PaymentMethodType (required)
  - paymentSource: ['null', 'string'] (required)
  - acceptedAmount: ['number', 'string'](double) (required)
  - cardLogo: ['null', 'string']
  - checkNumber: ['null', 'string']
  - checkDate: object
  - unlimitedApiId: ['null', 'string']
  - lastFour: ['null', 'string']
  - acceptanceDate: string(date-time) (required)

**PaymentAcceptanceResponse**
  - paymentSpecificationId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - type: PaymentMethodType (required)
  - acceptedAmount: ['number', 'string'](double) (required)
  - cardLogo: ['null', 'string']
  - checkNumber: ['null', 'string']
  - lastFour: ['null', 'string']
  - acceptanceDate: string(date-time) (required)

**PaymentAccount**
  - type: PaymentAccountType
  - patientId: string(uuid)

**PaymentAccountType**
  - (no properties)

**PaymentAllocationResponse**
  - paymentAppliedAllocationId: object
  - paymentUnappliedAllocationId: object
  - paymentBatchId: PaymentBatchIdentity
  - sourceReserveBatchId: PaymentBatchIdentity
  - allocationId: string(uuid)
  - batchNumber: ['integer', 'string'](int32)
  - companyId: ['null', 'string'](uuid)
  - dateOfService: object
  - divisionId: ['null', 'string'](uuid)
  - providerId: ['null', 'string'](uuid)
  - amount: ['number', 'string'](double)
  - batch: PaymentBatch
  - serviceType: ['null', 'string'](uuid)
  - refundDetail: AllocationRefundDetailResponse
  - isApplied: boolean
  - isReversal: boolean
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)

**PaymentApplicationBatchIdentity**
  - (no properties)

**PaymentApplicationConveyed**
  - type: PaymentBatchType
  - chargeApplicationBatches: OrderableCollectionOfGuidAndPaymentChargeApplicationBatch (required)
  - paymentId: string(uuid) (required)
  - paymentBatchId: PaymentBatchIdentity (required)
  - batchNumber: ['integer', 'string'](int32) (required)
  - transactionNumber: ['integer', 'string'](int32) (required)
  - patientId: string(uuid) (required)
  - ledgerDate: Date (required)
  - createdByUserId: string(uuid) (required)
  - timeStamp: string(date-time) (required)
  - paymentBatches: OrderableCollectionOfGuidAndPaymentBatch (required)
  - transactions: OrderableCollectionOfGuidAndPatientPaymentTransaction (required)
  - paymentIdentity: PaymentIdentity

**PaymentApplicationRequest**
  - dateOfService: Date (required)
  - divisionId: string(uuid) (required)
  - amount: ['number', 'string'](double) (required)

**PaymentApplied**
  - financials: PatientPaymentFinancialsUpdate (required)
  - type: PaymentBatchType
  - chargeApplicationBatches: OrderableCollectionOfGuidAndPaymentChargeApplicationBatch (required)
  - paymentId: string(uuid) (required)
  - paymentBatchId: PaymentBatchIdentity (required)
  - batchNumber: ['integer', 'string'](int32) (required)
  - transactionNumber: ['integer', 'string'](int32) (required)
  - patientId: string(uuid) (required)
  - ledgerDate: Date (required)
  - createdByUserId: string(uuid) (required)
  - timeStamp: string(date-time) (required)
  - paymentBatches: OrderableCollectionOfGuidAndPaymentBatch (required)
  - transactions: OrderableCollectionOfGuidAndPatientPaymentTransaction (required)
  - paymentIdentity: PaymentIdentity

**PaymentBalanceCorrected**
  - paymentId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - financials: PatientPaymentFinancialsUpdate (required)
  - createdByUserId: string(uuid) (required)
  - timeStamp: string(date-time) (required)
  - paymentIdentity: PaymentIdentity

**PaymentBatch**
  - paymentBatchId: PaymentBatchIdentity
  - batchNumber: ['integer', 'string'](int32)
  - type: PaymentBatchType
  - ledgerDate: Date
  - batchManipulatedAmount: ['number', 'string'](double)
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)

**PaymentBatchIdentity**
  - (no properties)

**PaymentBatchType**
  - (no properties)

**PaymentCharge**
  - chargeId: string(uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - dateOfService: Date (required)
  - companyId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - chargeIdentity: ChargeIdentity

**PaymentChargeApplicationBatch**
  - paymentApplicationBatchId: PaymentApplicationBatchIdentity
  - patientPaymentChargeApplicationId: PatientPaymentChargeApplicationIdentity
  - paymentBatchId: PaymentBatchIdentity
  - batchType: PatientPaymentApplicationBatchType
  - dateOfService: Date
  - companyId: string(uuid)
  - divisionId: string(uuid)
  - amount: ['number', 'string'](double)
  - batchManipulatedAmount: ['number', 'string'](double)
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)

**PaymentChargeApplicationResponse**
  - chargeId: string(uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - appliedAmount: ['number', 'string'](double) (required)

**PaymentClassification**
  - (no properties)

**PaymentCollectedProjection**
  - patientId: PatientIdentity (required)
  - paymentId: PaymentIdentity (required)
  - paymentBatchId: PaymentBatchIdentity (required)
  - account: PaymentAccount (required)
  - companyId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - financials: PaymentFinancials (required)
  - acceptance: PaymentAcceptance (required)
  - ledgerDate: Date (required)
  - eventTimeStamp: string(date-time) (required)
  - systemTimeStamp: string(date-time) (required)
  - createdByUserId: string(uuid) (required)
  - paymentCollectedEventNumber: ['integer', 'string'](int64) (required)

**PaymentCreatedResponse**
  - paymentSource: ['null', 'string']
  - paymentId: PaymentIdentity
  - correlationId: ['null', 'string']

**PaymentDetails**
  - paymentId: string(uuid) (required)
  - paymentApplicationBatchId: PaymentApplicationBatchIdentity (required)
  - paymentIdentity: PaymentIdentity
  - patientPaymentChargeApplicationId: PatientPaymentChargeApplicationIdentity (required)
  - sourceFundIdentity: ReservedFundIdentity (required)
  - reversedChargeTransactionId: ['null', 'string'](uuid)
  - reversalType: ReversalApplicationType
  - classification: PaymentClassification

**PaymentFinancials**
  - paymentAmount: ['number', 'string'](double)
  - applied: ['number', 'string'](double)
  - reserved: ['number', 'string'](double)

**PaymentFinancialsResponse**
  - paymentAmount: ['number', 'string'](double) (required)
  - applied: ['number', 'string'](double) (required)
  - reserved: ['number', 'string'](double) (required)

**PaymentIdentity**
  - (no properties)

**PaymentLedgerDateChangeRequest**
  - ledgerDate: Date (required)

**PaymentLedgerDateChangeValidationResponse**
  - isValid: boolean (required)
  - ledgerDate: Date (required)
  - earliestValidDate: object (required)
  - errorMessage: ['null', 'string'] (required)

**PaymentListItem**
  - paymentId: string(uuid)
  - locationId: string(uuid)
  - companyId: ['null', 'string'](uuid)
  - amount: ['number', 'string'](double)
  - applied: ['number', 'string'](double)
  - unapplied: ['number', 'string'](double)
  - isRefund: boolean
  - isRefundable: boolean
  - refundReasonId: ['null', 'string'](uuid)
  - acceptance: PaymentListItemAcceptance
  - ledgerDate: Date
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)
  - lastAppliedEventNumber: ['integer', 'string'](int64)

**PaymentListItemAcceptance**
  - paymentSpecificationId: string(uuid)
  - type: ['null', 'integer', 'string'](int32)
  - cardLogo: ['null', 'string']
  - lastFour: ['null', 'string']
  - checkNumber: ['null', 'string']

**PaymentMethodType**
  - (no properties)

**PaymentMonthCloseValidationResult**
  - companyFound: boolean
  - companyTimeFound: boolean
  - requestedLedgerValidAgainstCompanyDate: boolean
  - failureReason: ['null', 'string']
  - valid: boolean
  - earliestValidDate: Date

**PaymentRefundRequest**
  - amount: ['number', 'string'](double) (required)
  - ledgerDate: Date (required)
  - refundReasonId: string(uuid) (required)

**PaymentRefundStagedRequest**
  - ledgerDate: Date (required)
  - refundReasonId: string(uuid) (required)

**PaymentRequest**
  - companyId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - amount: ['number', 'string'](double) (required)
  - ledgerDate: Date (required)
  - applications: PaymentApplicationRequest[] (required)
  - reservations: ReservationRequest[] (required)

**PaymentReservedFund**
  - paymentReservedFundId: PaymentReservedFundIdentity (required)
  - fundIdentity: ReservedFundIdentity (required)
  - patientId: PatientIdentity (required)
  - paymentId: PaymentIdentity (required)
  - paymentAcceptanceDate: Date (required)
  - balance: ['number', 'string'](double) (required)

**PaymentReservedFundBalanceProjection**
  - paymentReservedFundId: PaymentReservedFundIdentity (required)
  - fundIdentity: ReservedFundIdentity (required)
  - paymentId: PaymentIdentity (required)
  - balance: ['number', 'string'](double) (required)
  - paymentAcceptanceDate: Date (required)
  - lastAppliedEventNumber: ['integer', 'string'](int64) (required)

**PaymentReservedFundIdentity**
  - value: string(uuid)

**PaymentResponse**
  - paymentId: PaymentIdentity
  - companyId: string(uuid)
  - locationId: string(uuid)
  - account: PaymentAccount
  - financials: PaymentFinancialsResponse
  - acceptance: PaymentAcceptanceResponse
  - allocations: ['null', 'array']
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)
  - ledgerDate: Date

**PaymentSummaryResponse**
  - paymentId: string(uuid)
  - companyId: string(uuid)
  - locationId: string(uuid)
  - account: PaymentAccount
  - financials: PaymentFinancialsResponse
  - acceptance: PaymentAcceptanceResponse
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)
  - batches: ['null', 'array']
  - lastAppliedEventNumber: ['integer', 'string'](int64)

**PaymentTransactionType**
  - (no properties)

**PipeReader**
  - (no properties)

**PipeWriter**
  - canGetUnflushedBytes: boolean
  - unflushedBytes: ['integer', 'string'](int64)

**Policy**
  - policyId: string(uuid) (required)
  - policyNumber: ['null', 'string'] (required)
  - planId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - payerType: object (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - isProvisionalPolicy: boolean (required)
  - balance: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - firstPayment: object (required)
  - active: boolean (required)

**PostingApplicationDetails**
  - patientPaymentChargeApplicationId: PatientPaymentChargeApplicationIdentity (required)
  - paymentApplicationBatchId: PaymentApplicationBatchIdentity (required)
  - charge: ApplicationChargeDetails (required)
  - ledgerDate: Date (required)

**PostingDetails**
  - chargeDNA: ChargeDNA (required)
  - selfPayDetail: TransactionSelfPayDetail (required)
  - reversedChargeTransactionId: ['null', 'string'](uuid)
  - correctionLogicVersion: ['null', 'integer', 'string'](int32)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ProjectedMetadata**
  - sourceApplication: ['null', 'string']
  - tenantId: ['null', 'string']
  - entityId: ['null', 'string']
  - entityTypeName: ['null', 'string']
  - correlationId: string(uuid)
  - sourceMetadata: ProjectedSourceMetadata

**ProjectedSnapshotOfCharge**
  - data: object
  - isEmpty: boolean
  - eventsAppliedCount: ['integer', 'string'](int64)
  - firstProjectedEventDate: string(date-time)
  - lastAppliedEventNumber: ['integer', 'string'](int64)
  - readTimeEventStreamVersion: ['integer', 'string'](int64)
  - lastProjectedEventDate: string(date-time)
  - source: ProjectedSnapshotSource
  - created: string(date-time)
  - metadata: ProjectedMetadata

**ProjectedSnapshotOfPayment**
  - data: object
  - isEmpty: boolean
  - eventsAppliedCount: ['integer', 'string'](int64)
  - firstProjectedEventDate: string(date-time)
  - lastAppliedEventNumber: ['integer', 'string'](int64)
  - readTimeEventStreamVersion: ['integer', 'string'](int64)
  - lastProjectedEventDate: string(date-time)
  - source: ProjectedSnapshotSource
  - created: string(date-time)
  - metadata: ProjectedMetadata

**ProjectedSnapshotOfPaymentReservedFund**
  - data: object
  - isEmpty: boolean
  - eventsAppliedCount: ['integer', 'string'](int64)
  - firstProjectedEventDate: string(date-time)
  - lastAppliedEventNumber: ['integer', 'string'](int64)
  - readTimeEventStreamVersion: ['integer', 'string'](int64)
  - lastProjectedEventDate: string(date-time)
  - source: ProjectedSnapshotSource
  - created: string(date-time)
  - metadata: ProjectedMetadata

**ProjectedSnapshotSource**
  - (no properties)

**ProjectedSourceMetadata**
  - writer: ['null', 'string']
  - userId: ['null', 'string']
  - data: object

**ProjectionCoordinatorResultResponse**
  - projectorCount: ['integer', 'string'](int32)
  - skipped: ['integer', 'string'](int32)
  - created: ['integer', 'string'](int32)
  - upserted: ['integer', 'string'](int32)
  - tagged: ['integer', 'string'](int32)
  - projectorsTotalElapsed: string
  - projectorsAverageElapsed: string
  - handlerElapsed: string

**PublicKey**
  - encodedKeyValue: AsnEncodedData
  - encodedParameters: AsnEncodedData
  - key: AsymmetricAlgorithm
  - oid: Oid

**QueryString**
  - value: ['null', 'string']
  - hasValue: boolean

**ReadOnlyMemoryOfbyte**
  - (no properties)

**ReallocationRequest**
  - sources: ['null', 'array'] (required)
  - targets: ['null', 'array'] (required)

**ReallocationTargetRequest**
  - companyId: string(uuid) (required)
  - dateOfService: Date (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - serviceType: ['null', 'string'](uuid) (required)
  - providerId: ['null', 'string'](uuid) (required)
  - amount: ['number', 'string'](double) (required)

**RefundRequest**
  - source: ReservedFundIdentity (required)
  - ledgerDate: Date (required)
  - amount: ['number', 'string'](double) (required)
  - refundReasonId: string(uuid) (required)

**RemitChargePaymentDisputeSummary**
  - remittanceId: string(uuid)
  - chargePaymentId: string(uuid)
  - disputed: boolean
  - disputeResolved: boolean
  - disputeResolvedByUserId: ['null', 'string'](uuid)
  - disputeResolvedTimestamp: ['null', 'string'](date-time)
  - resolutionType: object

**RemitDisputeDecisionAccepted**
  - chargeBatchId: ChargeBatchIdentity (required)
  - disputedChargeBatchId: string(uuid) (required)
  - remittanceId: string(uuid)
  - claimId: string(uuid)
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)
  - isDeleted: boolean

**RemitExpectedDetermination**
  - chargeBatchId: ChargeBatchIdentity (required)
  - disputedChargeBatchId: string(uuid) (required)
  - remitExpectedDeterminationId: string(uuid)
  - remittanceId: string(uuid)
  - claimId: string(uuid)
  - disputeTransactionNumber: ['integer', 'string'](int32)
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)
  - isDeleted: boolean

**RemittanceClaimPaymentPosted**
  - remittanceId: string(uuid) (required)

**RemittanceDetails**
  - remittanceId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - claimPaymentId: string(uuid) (required)
  - chargePaymentId: string(uuid) (required)
  - checkDate: Date (required)
  - checkNumber: ['null', 'string'] (required)
  - depositDate: Date (required)
  - icn: ['null', 'string'] (required)
  - isCrossover: boolean (required)
  - disputeDetails: RemittanceDisputeDetails (required)
  - sourceEventNumber: ['integer', 'string'](int64) (required)
  - reversedChargeTransactionId: ['null', 'string'](uuid)

**RemittanceDisputeDetails**
  - isDisputePayment: boolean
  - isDisputeResolution: boolean
  - resolutionType: object

**RemittanceDisputeResolutionType**
  - (no properties)

**RemitValidationMessage**
  - remittanceId: string(uuid) (required)
  - chargeId: ['null', 'string'](uuid) (required)
  - message: ['null', 'string'] (required)
  - exception: object

**RemitValidationResult**
  - isValid: boolean (required)
  - messages: RemitValidationMessage[] (required)

**RequestMode**
  - (no properties)

**ReservationApplicationDetails**
  - reservationApplicationType: ReservationApplicationType (required)
  - reversedChargeTransactionId: ['null', 'string'](uuid) (required)
  - reversalType: ReversalApplicationType (required)
  - patientPaymentChargeApplicationId: PatientPaymentChargeApplicationIdentity (required)
  - paymentApplicationBatchId: PaymentApplicationBatchIdentity (required)
  - charge: ApplicationChargeDetails (required)
  - ledgerDate: Date (required)

**ReservationApplicationType**
  - (no properties)

**ReservationDetails**
  - dateOfService: Date (required)
  - companyId: string(uuid) (required)
  - serviceType: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - providerId: ['null', 'string'](uuid) (required)
  - refundDetail: ReserveRefundDetail (required)
  - sourceFundIdentity: ReservedFundIdentity

**ReservationRequest**
  - dateOfService: object (required)
  - serviceType: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - providerId: ['null', 'string'](uuid) (required)
  - amount: ['number', 'string'](double) (required)

**ReservedFundIdentity**
  - companyId: string(uuid)
  - dateOfService: object
  - divisionId: ['null', 'string'](uuid)
  - serviceType: ['null', 'string'](uuid)
  - providerId: ['null', 'string'](uuid)

**ReserveRefundDetail**
  - refundReasonId: string(uuid) (required)

**ResourceCompanyV2**
  - companyId: string(uuid) (required)
  - timeZoneId: string (required)
  - applyExpected: boolean (required)
  - divisionIds: string(uuid)[] (required)
  - locationIds: string(uuid)[] (required)
  - partition: string (required)
  - id: string

**ResourceDivision**
  - divisionId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - partition: string (required)
  - id: string

**ResourceDivisionLedgerV2**
  - divisionId: string(uuid) (required)
  - chargeLedger: object (required)
  - paymentLedger: object (required)
  - divisionName: ['null', 'string'] (required)
  - partition: string (required)
  - id: string

**ResourceLedger**
  - ledgerDate: Date (required)
  - closedTimestamp: string(date-time) (required)
  - closedByUserId: string(uuid) (required)

**ResourceMonthClosed**
  - month: Month (required)
  - year: ['integer', 'string'](int32) (required)
  - closedOn: string(date-time) (required)

**Result**
  - transactionsWrittenCount: ['integer', 'string'](int32)

**ResultCharge**
  - chargeId: ChargeIdentity (required)
  - suggestedLedgerDate: Date (required)
  - suggestedReversalType: ReversalApplicationType (required)
  - applications: TargetChargeApplication[] (required)

**ReversalApplicationType**
  - (no properties)

**ReversalResponse**
  - batch: TransactionBatchSummary (required)

**SafeWaitHandle**
  - isInvalid: boolean
  - isClosed: boolean

**SelfPayAdjustmentReason**
  - selfPayAdjustmentReasonId: string(uuid) (required)
  - isContractualAdjustment: boolean

**SnfPatient**
  - snfPatientId: string(uuid) (required)
  - residentNumber: ['null', 'string'] (required)
  - snfId: string(uuid) (required)
  - snfName: ['null', 'string'] (required)
  - payerId: ['null', 'string'](uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - balance: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - firstPayment: object (required)
  - active: boolean (required)

**Stream**
  - (no properties)

**SummaryRecordVersion**
  - asOfEventNumber: ['integer', 'string'](int64) (required)
  - asOfTimestamp: string(date-time) (required)

**TargetChargeApplication**
  - chargeId: ChargeIdentity (required)
  - patientPaymentChargeApplicationId: PatientPaymentChargeApplicationIdentity (required)

**TransactionAccount**
  - type: TransactionAccountType
  - guarantorId: ['null', 'string'](uuid)
  - payerId: ['null', 'string'](uuid)
  - portfolioId: ['null', 'string'](uuid)
  - policyPlanId: ['null', 'string'](uuid)
  - policyId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - manufacturer: object

**TransactionAccountRequest**
  - type: TransactionAccountType (required)
  - payerId: ['null', 'string'](uuid)
  - portfolioId: ['null', 'string'](uuid)
  - policyPlanId: ['null', 'string'](uuid)
  - policyId: ['null', 'string'](uuid)
  - guarantorId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - manufacturer: ChargeManufacturerAssociation

**TransactionAccountType**
  - (no properties)

**TransactionBatchSummary**
  - batchId: string(uuid)
  - chargePreBatch: object
  - chargePostBatch: object
  - chargePreTransactionId: object
  - chargePostTransactionId: object
  - remittanceBatchSummary: RemitChargePaymentDisputeSummary
  - userReasonDescription: ['null', 'string']
  - paymentApplicationBatchId: object
  - patientPaymentChargeApplicationId: object
  - type: ChargeBatchType
  - endingChargeBalance: ['number', 'string'](double)
  - timeStamp: string(date-time)
  - createdByUserId: string(uuid)
  - transactions: ['null', 'array']
  - accountBalances: ['null', 'array']

**TransactionDetail**
  - transferReasonId: ['null', 'string'](uuid)
  - transferFrom: object
  - transferTo: object
  - contractualAdjustmentReasonId: ['null', 'string'](uuid)
  - noncontractualAdjustmentReasonId: ['null', 'string'](uuid)
  - isGeneralAdjustment: ['null', 'boolean']
  - voidReasonId: ['null', 'string'](uuid)
  - expected: ['null', 'boolean']
  - initial: ['null', 'boolean']
  - isMonetaryInterest: boolean
  - remitDetails: RemittanceDetails
  - paymentClassification: PaymentClassification
  - groupCode: ['null', 'string']
  - reasonCode: ['null', 'string']

**TransactionSelfPayDetail**
  - isSelfPay: boolean
  - selfPayPayerId: string(uuid) (required)
  - portfolioId: string(uuid) (required)

**TransactionSummary**
  - chargeTransactionId: ChargeTransactionIdentity
  - chargeBatchId: ChargeBatchIdentity
  - reversedChargeTransactionId: object
  - reversingChargeTransactionIds: ['null', 'array']
  - reversalApplicationType: object
  - amount: ['number', 'string'](double)
  - disputedAmount: ['null', 'number', 'string'](double)
  - ledgerDate: Date
  - account: TransactionAccount
  - detail: TransactionDetail
  - type: ChargeTransactionType
  - sourcePaymentId: object
  - selfPayDetail: TransactionSelfPayDetail
  - isContractualAdjustment: ['null', 'boolean']
  - transactionNumber: ['integer', 'string'](int32)
  - transferId: ['null', 'string'](uuid)
  - chargeDNA: object
  - createdByUserId: string(uuid)
  - timeStamp: string(date-time)
  - transactionId: ChargeTransactionIdentity
  - reversedTransactionId: ChargeTransactionIdentity

**TransferDetails**
  - transferReasonId: ['null', 'string'](uuid) (required)
  - groupCode: ['null', 'string']
  - reasonCode: ['null', 'string']
  - to: TransactionAccount (required)
  - from: TransactionAccount (required)
  - transferId: string(uuid) (required)
  - disputed: ['null', 'boolean']
  - reversedChargeTransactionId: ['null', 'string'](uuid)
  - voidReasonId: ['null', 'string'](uuid)
  - isRebalance: ['null', 'boolean']

**Type**
  - (no properties)

**UserIdentity**
  - id: string(uuid) (required)

**VoidDetails**
  - chargeDNA: ChargeDNA (required)
  - voidReasonId: string(uuid) (required)

**WaitHandle**
  - handle: object
  - safeWaitHandle: object

**WebSocketManager**
  - isWebSocketRequest: boolean
  - webSocketRequestedProtocols: ['null', 'array']

**WriteMode**
  - (no properties)

**X500DistinguishedName**
  - name: ['null', 'string']
  - oid: object
  - rawData: string(byte)

**X509Certificate2**
  - archived: boolean
  - extensions: ['null', 'array']
  - friendlyName: string
  - hasPrivateKey: boolean
  - privateKey: object
  - issuerName: X500DistinguishedName
  - notAfter: string(date-time)
  - notBefore: string(date-time)
  - publicKey: PublicKey
  - rawData: ['null', 'string'](byte)
  - rawDataMemory: ReadOnlyMemoryOfbyte
  - serialNumber: ['null', 'string']
  - signatureAlgorithm: Oid
  - subjectName: X500DistinguishedName
  - thumbprint: ['null', 'string']
  - version: ['integer', 'string'](int32)
  - handle: object
  - issuer: ['null', 'string']
  - subject: ['null', 'string']
  - serialNumberBytes: ReadOnlyMemoryOfbyte

**X509Extension**
  - critical: boolean
  - oid: object
  - rawData: string(byte)

