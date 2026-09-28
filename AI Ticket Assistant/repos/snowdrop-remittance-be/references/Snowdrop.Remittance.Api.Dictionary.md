﻿# Snowdrop.Remittance.Api - API Dictionary

Repo: snowdrop-remittance-be
Source: Snowdrop.Remittance.Api.json

## Endpoints

### GET /remittance/eob/claims/{remittanceId}
- Tags: RemittanceEob
- Path params: remittanceId: string(uuid), required
- Response 200: ClaimEobRemittancePdfAttachment[]

### GET /remittance/eob/claims/claim/{claimId}
- Tags: RemittanceEob
- Path params: claimId: string(uuid), required
- Response 200: ClaimEob[]

### GET /remittance/eob/claims/download/{attachmentId}
- Tags: RemittanceEob
- Path params: attachmentId: string(uuid), required
- Response 200: (no body)

### GET /remittance/eob/claims/download/{attachmentId}/test-temp-redirect
- Tags: RemittanceEob
- Path params: attachmentId: string(uuid), required
- Response 200: (no body)

### POST /remittance/eob/claims/regenerate/{remittanceId}
- Tags: RemittanceEob
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### POST /remittance/eob/regenerate/{remittanceId}
- Tags: RemittanceEob
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### GET /remittance/message-blob/{remittanceId}
- Tags: RemittanceMessageBlob
- Path params: remittanceId: string(uuid), required
- Response 200: RemittanceMessage

### POST /remittance/reconciliation/add-assistance-check
- Tags: RemittanceReconciliation
- Request body: AddAssistanceRequestWithDetails
- Response 200: string(uuid)

### POST /remittance/reconciliation/add-check
- Tags: RemittanceReconciliation
- Request body: AddCheckRequest
- Response 200: string(uuid)

### POST /remittance/reconciliation/check-amount
- Tags: RemittanceReconciliation
- Request body: UpdateCheckAmountRequest
- Response 200: (no body)

### POST /remittance/reconciliation/check-date
- Tags: RemittanceReconciliation
- Request body: UpdateCheckDateRequest
- Response 200: (no body)

### POST /remittance/reconciliation/check-number
- Tags: RemittanceReconciliation
- Request body: UpdateCheckNumberRequest
- Response 200: (no body)

### POST /remittance/reconciliation/check-received
- Tags: RemittanceReconciliation
- Request body: UpdateCheckReceivedRequest
- Response 200: (no body)

### POST /remittance/reconciliation/company-can-close/{companyId}
- Tags: RemittanceReconciliation
- Path params: companyId: string(uuid), required
- Request body: MonthYear
- Response 200: CompanyCanCloseResponse

### POST /remittance/reconciliation/company-id
- Tags: RemittanceReconciliation
- Request body: UpdateCompanyIdRequest
- Response 200: (no body)

### POST /remittance/reconciliation/delete-discarded
- Tags: RemittanceReconciliation
- Request body: DeleteDiscardedRemittanceRequest
- Response 200: (no body)

### POST /remittance/reconciliation/deposit-amount
- Tags: RemittanceReconciliation
- Request body: UpdateDepositAmountRequest
- Response 200: (no body)

### POST /remittance/reconciliation/deposit-date
- Tags: RemittanceReconciliation
- Request body: UpdateDepositDateRequest
- Response 200: (no body)

### POST /remittance/reconciliation/discard
- Tags: RemittanceReconciliation
- Request body: DiscardRemittanceRequest
- Response 200: (no body)

### POST /remittance/reconciliation/discard-multiple
- Tags: RemittanceReconciliation
- Request body: DiscardRemittancesRequest
- Response 200: string

### POST /remittance/reconciliation/discarded-check
- Tags: RemittanceReconciliation
- Request body: FindDiscardedCheckRequest
- Response 200: DiscardedRemittanceResponse

### POST /remittance/reconciliation/discarded-checks
- Tags: RemittanceReconciliation
- Request body: FindDiscardedCheckRequest
- Response 200: DiscardedRemittanceResponse[]

### POST /remittance/reconciliation/eob-attachment
- Tags: RemittanceReconciliation
- Request body: SetEobAttachmentRequest
- Response 200: (no body)

### POST /remittance/reconciliation/financial-batch
- Tags: RemittanceReconciliation
- Request body: UpdateFinancialBatchRequest
- Response 200: (no body)

### POST /remittance/reconciliation/force-posted
- Tags: RemittanceReconciliation
- Request body: ForcePostedRequest
- Response 200: (no body)

### GET /remittance/reconciliation/get-totals
- Tags: RemittanceReconciliation
- Response 200: CompanyTotalsResponse[]

### POST /remittance/reconciliation/ledger-date
- Tags: RemittanceReconciliation
- Request body: UpdateLedgerDateRequest
- Response 200: (no body)

### POST /remittance/reconciliation/payer-id
- Tags: RemittanceReconciliation
- Request body: UpdatePayerIdRequest
- Response 200: (no body)

### POST /remittance/reconciliation/payment-type
- Tags: RemittanceReconciliation
- Request body: UpdatePaymentTypeRequest
- Response 200: (no body)

### GET /remittance/reconciliation/pending-checks
- Tags: RemittanceReconciliation
- Response 200: RemittanceCheckGridItem[]

### POST /remittance/reconciliation/reconcile
- Tags: RemittanceReconciliation
- Request body: ReconcileRemittanceRequest
- Response 200: (no body)

### GET /remittance/reconciliation/reconciled-checks
- Tags: RemittanceReconciliation
- Response 200: RemittanceCheckGridItem[]

### POST /remittance/reconciliation/recreate-eob
- Tags: RemittanceReconciliation
- Request body: RecreateEobRequest
- Response 200: (no body)

### GET /remittance/reconciliation/remittance-snapshot/{remittanceId}
- Tags: RemittanceReconciliation
- Path params: remittanceId: string(uuid), required
- Response 200: Remittance

### POST /remittance/reconciliation/unposted-checks/{companyId}
- Tags: RemittanceReconciliation
- Path params: companyId: string(uuid), required
- Request body: MonthYear
- Response 200: UnpostedCheckResponse[]

### POST /remittance/reconciliation/validate-checknumber
- Tags: RemittanceReconciliation
- Request body: ValidateCheckNumberRequest
- Response 200: ValidateCheckNumberResponse

### POST /remittance/support/move/{sourcequeue}/{destinationqueue}/{messages}
- Tags: Support
- Path params: sourcequeue: string, required; destinationqueue: string, required; messages: ['integer', 'string'](int32), required
- Response 200: (no body)

### POST /remittance/support/remittance/{remittanceId}/restore-discarded
- Tags: Support
- Path params: remittanceId: string(uuid), required
- Response 200: (no body)

### GET /remittance/tests/company/{companyId}/taxid
- Tags: RecordProjectionTests
- Path params: companyId: string(uuid), required
- Response 200: string

### GET /remittance/tests/company/{taxid}/companyId
- Tags: RecordProjectionTests
- Path params: taxid: string, required
- Response 200: string(uuid)

### GET /remittance/tests/company/active
- Tags: RecordProjectionTests
- Query params: taxid: string(uuid)
- Response 200: string(uuid)[]

## Schemas

**AddAssistanceRequestWithDetails**
  - checkNumber: string (required)
  - checkAmount: ['number', 'string'](double) (required)
  - checkDate: Date (required)
  - paymentType: PaymentType (required)
  - fullAmount: boolean
  - flatRateAmount: ['number', 'string'](double)
  - transferRemainingBalance: boolean
  - claims: ['null', 'array']

**AddCheckRequest**
  - checkNumber: string (required)
  - checkDate: Date (required)
  - checkAmount: ['number', 'string'](double) (required)
  - payerId: string(uuid) (required)
  - companyId: string(uuid) (required)
  - depositDate: object (required)
  - depositAmount: ['null', 'number', 'string'](double) (required)
  - paymentType: PaymentType (required)

**Adjustment**
  - amount: ['null', 'number', 'string'](double)
  - groupCode: ['null', 'string']
  - reasonCode: ['null', 'string']

**AssistanceClaim**
  - claimId: string(uuid) (required)
  - appliedAmount: ['number', 'string'](double) (required)
  - remainingBalance: ['number', 'string'](double) (required)

**CheckSource**
  - (no properties)

**Claim**
  - claimId: ['null', 'string'](uuid)
  - claimPaymentId: ['null', 'string'](uuid)
  - accountNumber: ['null', 'string']
  - asg: boolean
  - forwardedTo: ['null', 'string']
  - patientHIC: ['null', 'string']
  - secondHIC: ['null', 'string']
  - insuredHIC: ['null', 'string']
  - icn: ['null', 'string']
  - moaRemarkCode1: ['null', 'string']
  - moaRemarkCode2: ['null', 'string']
  - moaRemarkCode3: ['null', 'string']
  - moaRemarkCode4: ['null', 'string']
  - moaRemarkCode5: ['null', 'string']
  - patientNameFirst: ['null', 'string']
  - patientNameLast: ['null', 'string']
  - patientNameMiddle: ['null', 'string']
  - patientNameSuffix: ['null', 'string']
  - insuredNameFirst: ['null', 'string']
  - insuredNameLast: ['null', 'string']
  - insuredNameMiddle: ['null', 'string']
  - insuredNameSuffix: ['null', 'string']
  - statusCode: ['null', 'string']
  - totalBilled: ['null', 'number', 'string'](double)
  - totalPatientResponsibility: ['null', 'number', 'string'](double)
  - totalPayment: ['null', 'number', 'string'](double)
  - serviceProviderID: ['null', 'string']
  - claimDate: object
  - adjustments: Adjustment[]
  - supplementalAmounts: SupplementalAmount[]
  - services: Service[]
  - totalPatientResponsibilityFromClp05: boolean

**ClaimEob**
  - remittanceId: string(uuid) (required)
  - remittanceReceived: string(date-time) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - claimPaymentId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - eobAttachment: EobRemittancePdfAttachment (required)

**ClaimEobRemittancePdfAttachment**
  - claimIdentifier: EobClaimIdentifier (required)
  - eobAttachment: EobRemittancePdfAttachment (required)

**ClaimIdentifier**
  - claimPaymentId: string(uuid)
  - claimNumber: ['null', 'string']
  - claimId: ['null', 'string'](uuid)
  - appliedAmount: ['number', 'string'](double)
  - remainingBalance: ['number', 'string'](double)

**CompanyCanCloseResponse**
  - canClose: boolean (required)

**CompanyTotalsResponse**
  - companyId: string(uuid)
  - unreconciledTotal: ['number', 'string'](double)
  - unpostedTotal: ['number', 'string'](double)
  - postingTotal: ['number', 'string'](double)
  - postedTotal: ['number', 'string'](double)

**Date**
  - (no properties)

**DeleteDiscardedRemittanceRequest**
  - remittanceId: string(uuid) (required)
  - isDiscardedDeleted: boolean

**DiscardedRemittanceResponse**
  - remittanceId: string(uuid) (required)
  - checkNumber: string (required)
  - checkDate: object (required)
  - checkAmount: ['null', 'number', 'string'](double) (required)
  - paymentType: object (required)
  - payerId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - receivedDate: ['null', 'string'](date-time) (required)

**DiscardRemittanceRequest**
  - remittanceId: string(uuid) (required)
  - isDeleted: boolean

**DiscardRemittancesRequest**
  - remittanceIds: string(uuid)[] (required)
  - isDeleted: boolean

**EditableFieldOfDate**
  - currentValue: object (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean

**EditableFieldOfDateTimeOffset**
  - currentValue: ['null', 'string'](date-time) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean

**EditableFieldOfdecimal**
  - currentValue: ['null', 'number', 'string'](double) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean

**EditableFieldOfGuid**
  - currentValue: ['null', 'string'](uuid) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean

**EditableFieldOfPaymentType**
  - currentValue: object (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean

**EditableFieldOfstring**
  - currentValue: ['null', 'string'] (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean

**EobAttachment**
  - noteId: string(uuid)
  - attachmentId: string(uuid)
  - fileName: ['null', 'string']

**EobClaimIdentifier**
  - claimNumber: string (required)
  - claimPaymentId: ['null', 'string'](uuid) (required)

**EobRemittancePdfAttachment**
  - attachmentId: string(uuid) (required)
  - fileName: string (required)

**FindDiscardedCheckRequest**
  - checkNumber: string (required)

**ForcePostedRequest**
  - remittanceIDs: string(uuid)[]

**Header**
  - checkDate: object
  - checkNumber: ['null', 'string']
  - checkAmount: ['null', 'number', 'string'](double)
  - payeeAddressLine1: ['null', 'string']
  - payeeAddressLine2: ['null', 'string']
  - payeeAddressLine3: ['null', 'string']
  - payeeIdCode: ['null', 'string']
  - payeeTaxId: ['null', 'string']
  - payeeName: ['null', 'string']
  - payerAddressLine1: ['null', 'string']
  - payerAddressLine2: ['null', 'string']
  - payerAddressLine3: ['null', 'string']
  - payerName: ['null', 'string']

**Month**
  - (no properties)

**MonthYear**
  - month: Month (required)
  - year: ['integer', 'string'](int32) (required)

**PaymentType**
  - (no properties)

**PostingStatus**
  - (no properties)

**ProviderAdjustment**
  - amount: ['null', 'number', 'string'](double)
  - fiscalPeriodDate: object
  - providerIdentifier: ['null', 'string']
  - reason: ['null', 'string']
  - adjustmentIdentifier: ['null', 'string']

**ReconcileRemittanceRequest**
  - remittanceIds: string(uuid)[]
  - depositDate: object

**RecreateEobRequest**
  - remittanceId: string(uuid)

**Reference**
  - id: ['null', 'string']
  - idQualifier: ['null', 'string']

**Remark**
  - qualifierCode: ['null', 'string']
  - remarkCode: ['null', 'string']

**Remittance**
  - remittanceId: string(uuid)
  - postingStatus: PostingStatus
  - checkNumber: ['null', 'string']
  - checkDate: object
  - checkAmount: ['null', 'number', 'string'](double)
  - payerId: ['null', 'string'](uuid)
  - companyId: ['null', 'string'](uuid)
  - depositDate: object
  - depositAmount: ['null', 'number', 'string'](double)
  - remittanceCheckReceivedDate: ['null', 'string'](date-time)
  - payerLiteral: string
  - eobAttachment: EobAttachment
  - remittanceMessage: RemittanceMessage
  - claimIdentifiers: ClaimIdentifier[]
  - ledgerDate: object
  - isDeleted: boolean
  - checkSource: object
  - paymentType: object
  - reportId: ['null', 'string'](uuid)
  - remittanceMessageStoredInBlobStorage: boolean
  - hasPostedClaimPayments: boolean
  - financialBatch: ['null', 'string']

**RemittanceCheckGridItem**
  - organizationId: string(uuid) (required)
  - remittanceId: string(uuid) (required)
  - postingStatus: PostingStatus (required)
  - checkNumber: EditableFieldOfstring (required)
  - checkDate: EditableFieldOfDate (required)
  - checkAmount: EditableFieldOfdecimal (required)
  - payerId: EditableFieldOfGuid (required)
  - companyId: EditableFieldOfGuid (required)
  - depositDate: EditableFieldOfDate (required)
  - depositAmount: EditableFieldOfdecimal (required)
  - remittanceCheckReceivedDate: EditableFieldOfDateTimeOffset (required)
  - payerLiteral: ['null', 'string'] (required)
  - eobAttachment: object (required)
  - ledgerDate: object (required)
  - paymentType: EditableFieldOfPaymentType (required)
  - hasPostedClaimPayments: boolean (required)
  - hasPostedReservedFunds: boolean (required)
  - financialBatch: EditableFieldOfstring (required)
  - isDiscarded: ['null', 'boolean'] (required)
  - isDiscardedDeleted: ['null', 'boolean'] (required)
  - percentageInUF: ['integer', 'string'](int32) (required)
  - checkNumberDuplicates: string(uuid)[]
  - postedAmount: ['number', 'string'](double) (required)
  - discardedAmount: ['number', 'string'](double) (required)
  - unappliedAmount: ['number', 'string'](double) (required)
  - partition: string
  - id: string
  - eTag: ['null', 'string'] (required)
  - timeToLive: ['integer', 'string'](int32)

**RemittanceMessage**
  - header: object
  - claims: Claim[]
  - providerAdjustments: ProviderAdjustment[]

**Service**
  - allowed: ['null', 'number', 'string'](double)
  - billed: ['null', 'number', 'string'](double)
  - coins: ['null', 'number', 'string'](double)
  - deduct: ['null', 'number', 'string'](double)
  - modifier1: ['null', 'string']
  - modifier2: ['null', 'string']
  - modifier3: ['null', 'string']
  - modifier4: ['null', 'string']
  - procedure: ['null', 'string']
  - providerPaid: ['null', 'number', 'string'](double)
  - qty: ['null', 'number', 'string'](double)
  - renderingProvider: ['null', 'string']
  - sentProcedure: ['null', 'string']
  - sentQuantity: ['null', 'number', 'string'](double)
  - serviceDate: object
  - servicePeriodStartDate: object
  - servicePeriodEndDate: object
  - adjustments: Adjustment[]
  - supplementalAmounts: SupplementalAmount[]
  - references: Reference[]
  - remarks: Remark[]

**SetEobAttachmentRequest**
  - remittanceId: string(uuid)
  - eobAttachment: object

**SupplementalAmount**
  - amount: ['null', 'number', 'string'](double)
  - qualifierCode: ['null', 'string']

**UnpostedCheckResponse**
  - remittanceId: string(uuid) (required)
  - postingStatus: PostingStatus (required)

**UpdateCheckAmountRequest**
  - remittanceId: string(uuid)
  - checkAmount: ['null', 'number', 'string'](double)

**UpdateCheckDateRequest**
  - remittanceId: string(uuid)
  - checkDate: object

**UpdateCheckNumberRequest**
  - remittanceId: string(uuid)
  - checkNumber: ['null', 'string']

**UpdateCheckReceivedRequest**
  - remittanceId: string(uuid)
  - remittanceCheckReceivedDate: ['null', 'string'](date-time)

**UpdateCompanyIdRequest**
  - remittanceId: string(uuid)
  - companyId: ['null', 'string'](uuid)

**UpdateDepositAmountRequest**
  - remittanceId: string(uuid)
  - depositAmount: ['null', 'number', 'string'](double)

**UpdateDepositDateRequest**
  - remittanceId: string(uuid)
  - depositDate: object

**UpdateFinancialBatchRequest**
  - remittanceId: string(uuid)
  - financialBatch: ['null', 'string']

**UpdateLedgerDateRequest**
  - remittanceId: string(uuid)
  - ledgerDate: Date

**UpdatePayerIdRequest**
  - remittanceId: string(uuid)
  - payerId: ['null', 'string'](uuid)

**UpdatePaymentTypeRequest**
  - remittanceId: string(uuid)
  - paymentType: PaymentType

**ValidateCheckNumberRequest**
  - checkNumber: string (required)

**ValidateCheckNumberResponse**
  - isInUse: boolean (required)

