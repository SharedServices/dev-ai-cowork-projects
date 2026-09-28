﻿# Snowdrop.Payments.Services - API Dictionary

Repo: snowdrop-payments-be
Source: Snowdrop.Payments.Services.json

## Endpoints

### GET /encounters/{locationId}/{dateOfService}/summary
- Tags: PaymentEncounters
- Path params: locationId: string(uuid), required; dateOfService: string, required
- Response 200: DailyEncounterSummary

### GET /encounters/{locationId}/{patientId}/{dateOfService}/{companyId}/{accountId}/stripesummary
- Tags: PaymentEncounters
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required; companyId: string(uuid), required; accountId: string, required
- Response 200: StripeAccountSummary
- Response 404: ProblemDetails

### GET /encounters/{locationId}/{patientId}/{dateOfService}/{companyId}/stripesummary
- Tags: PaymentEncounters
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required; companyId: string(uuid), required
- Response 200: StripeAccountSummary
- Response 404: ProblemDetails

### GET /encounters/{locationId}/{patientId}/{dateOfService}/stripesummary
- Tags: PaymentEncounters
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required
- Response 200: StripePaymentEncounterSummary
- Response 404: ProblemDetails

### POST /patients/specifications/process/card/external
- Tags: PatientSpecifications
- Request body: ProcessPatientPaymentRequest
- Response 200: ExternalCardTransaction
- Response 404: ProblemDetails
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### POST /patients/specifications/process/cash
- Tags: PatientSpecifications
- Request body: ProcessPatientCashPaymentRequest
- Response 200: CashTransaction
- Response 404: ProblemDetails
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### POST /patients/specifications/process/check
- Tags: PatientSpecifications
- Request body: ProcessPatientCheckPaymentRequest
- Response 200: CheckTransaction
- Response 404: ProblemDetails
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### POST /patients/specifications/process/creditforward
- Tags: PatientSpecifications
- Request body: ProcessPatientCreditForwardPaymentRequest
- Response 200: CreditForwardTransaction
- Response 404: ProblemDetails
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### GET /receipts/{paymentSpecificationId}
- Tags: Receipts
- Path params: paymentSpecificationId: string(uuid), required
- Response 200: string
- Response 404: ProblemDetails

### POST /receipts/email
- Tags: Receipts
- Request body: SendReceiptRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 500: (no body)

### GET /specifications/{paymentSpecificationId}
- Tags: PaymentSpecifications
- Path params: paymentSpecificationId: string(uuid), required
- Response 200: PaymentSpecification
- Response 404: ProblemDetails

### POST /specifications/{paymentSpecificationId}/setpayout
- Tags: PaymentSpecifications
- Path params: paymentSpecificationId: string(uuid), required
- Request body: SetPaymentSpecificationPayoutDetailsRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /stripe/accounts/attach
- Tags: StripePaymentAccounts
- Request body: AttachPatientStripeAccountRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /stripe/accounts/entity/{paymentAccountOwnerId}
- Tags: StripePaymentAccountsEntities
- Path params: paymentAccountOwnerId: string(uuid), required
- Response 200: StripePaymentAccountsResponse[]
- Response 400: ProblemDetails

### POST /stripe/accounts/entity/attach
- Tags: StripePaymentAccountsEntities
- Request body: AttachEntityStripeAccountRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### DELETE /stripe/accounts/entity/owner/{paymentAccountOwnerId}/account/{paymentAccountId}
- Tags: StripePaymentAccountsEntities
- Path params: paymentAccountOwnerId: string(uuid), required; paymentAccountId: string, required
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /stripe/accounts/entity/setup
- Tags: StripePaymentAccountsEntities
- Request body: SetupEntityStripeCreateAccountRequest
- Response 200: StripeTransactionSetupResponse
- Response 400: ProblemDetails

### GET /stripe/accounts/owner/{paymentAccountOwnerId}
- Tags: StripePaymentAccounts
- Path params: paymentAccountOwnerId: string(uuid), required
- Response 200: StripePaymentAccountsResponse[]
- Response 400: ProblemDetails

### DELETE /stripe/accounts/owner/{paymentAccountOwnerId}/account/{paymentAccountId}
- Tags: StripePaymentAccounts
- Path params: paymentAccountOwnerId: string(uuid), required; paymentAccountId: string, required
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /stripe/accounts/setup
- Tags: StripePaymentAccounts
- Request body: SetupPatientStripeCreateAccountRequest
- Response 200: StripeTransactionSetupResponse
- Response 400: ProblemDetails

### GET /stripe/devices/{readerId}
- Tags: StripeDevices
- Path params: readerId: string, required
- Response 200: ReaderResponse

### POST /stripe/devices/{readerId}/cancelaction
- Tags: StripeDevices
- Path params: readerId: string, required
- Response 204: (no body)

### POST /stripe/devices/{readerId}/processpayment
- Tags: StripeDevices
- Path params: readerId: string, required
- Request body: ProcessDevicePaymentRequest
- Response 400: GenericStatusResponse
- Response 404: ProblemDetails
- Response 200: ReaderResponse

### POST /stripe/devices/{readerId}/processsetup
- Tags: StripeDevices
- Path params: readerId: string, required
- Request body: ProcessDeviceSetupRequest
- Response 400: GenericStatusResponse
- Response 404: ProblemDetails
- Response 200: ReaderResponse

### GET /stripe/devices/terminalconnectiontoken
- Tags: StripeDevices
- Response 200: string

### POST /stripe/payments/process/encounter/account
- Tags: StripeEncounterPayments
- Request body: ProcessEncounterSavedAccountStripePaymentRequest
- Response 200: StripeTransactionResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /stripe/payments/process/encounter/card/external
- Tags: StripeEncounterPayments
- Request body: ProcessEncounterExternalCardStripePaymentRequest
- Response 200: ExternalCardTransaction
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /stripe/payments/process/encounter/cash
- Tags: StripeEncounterPayments
- Request body: ProcessEncounterCashStripePaymentRequest
- Response 200: CashTransaction
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /stripe/payments/process/encounter/check
- Tags: StripeEncounterPayments
- Request body: ProcessEncounterCheckStripePaymentRequest
- Response 200: CheckTransaction
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /stripe/payments/process/encounter/nonpayment
- Tags: StripeEncounterPayments
- Request body: AcceptStripeNonPaymentRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /stripe/payments/process/encounter/refund
- Tags: StripeEncounterPayments
- Request body: RefundEncounterStripePaymentRequest
- Response 200: TransactionRefundResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /stripe/payments/process/encounter/setup
- Tags: StripeEncounterPayments
- Request body: SetupEncounterStripePaymentRequest
- Response 200: StripeTransactionSetupResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### POST /stripe/payments/process/entity/account
- Tags: StripePaymentsEntities
- Request body: ProcessEntitySavedAccountStripePaymentRequest
- Response 200: StripeTransactionResponse
- Response 400: ProblemDetails

### POST /stripe/payments/process/entity/refund
- Tags: StripePaymentsEntities
- Request body: RefundStripePaymentRequest
- Response 200: TransactionRefundResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /stripe/payments/process/entity/setup
- Tags: StripePaymentsEntities
- Request body: SetupEntityStripePaymentRequest
- Response 200: StripeTransactionSetupResponse
- Response 400: ProblemDetails

### POST /stripe/payments/process/patient/account
- Tags: StripePaymentsPatients
- Request body: ProcessPatientSavedAccountStripePaymentRequest
- Response 200: StripeTransactionResponse
- Response 400: ProblemDetails

### POST /stripe/payments/process/patient/refund
- Tags: StripePaymentsPatients
- Request body: RefundStripePaymentRequest
- Response 200: TransactionRefundResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /stripe/payments/process/patient/setup
- Tags: StripePaymentsPatients
- Request body: SetupPatientStripePaymentRequest
- Response 200: StripeTransactionSetupResponse
- Response 400: ProblemDetails

## Schemas

**AcceptStripeNonPaymentRequest**
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - stripeAccountSummaryIdentity: StripeAccountSummaryIdentity (required)
  - underpaymentReasonId: string(uuid) (required)
  - createdDate: string(date-time) (required)

**AttachEntityStripeAccountRequest**
  - paymentAccountOwnerId: string(uuid) (required)
  - accountType: SavedAccountType (required)
  - paymentAccountId: ['null', 'string'] (required)
  - name: ['null', 'string'] (required)

**AttachPatientStripeAccountRequest**
  - paymentAccountOwnerId: string(uuid) (required)
  - paymentAccountOwnerType: PaymentAccountOwnerType (required)
  - accountType: SavedAccountType (required)
  - paymentAccountId: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)

**CashTransaction**
  - paymentSpecificationId: string(uuid) (required)
  - paymentType: PaymentType (required)
  - transactionType: TransactionType
  - transactionAmount: ['number', 'string'](double) (required)
  - createdDate: string(date-time) (required)

**CheckTransaction**
  - paymentSpecificationId: string(uuid) (required)
  - paymentType: PaymentType (required)
  - transactionType: TransactionType
  - transactionAmount: ['number', 'string'](double) (required)
  - checkNumber: ['null', 'string'] (required)
  - checkDate: Date (required)
  - authorizationNumber: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)

**CompanyIdentity**
  - companyId: string(uuid) (required)

**CreditCardType**
  - (no properties)

**CreditForwardTransaction**
  - paymentSpecificationId: string(uuid) (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - createdDate: string(date-time) (required)
  - paymentType: PaymentType
  - transactionType: TransactionType

**DailyEncounterSummary**
  - organizationId: ['null', 'string'] (required)
  - identity: DailyLocationIdentity (required)
  - expectedCollection: ['number', 'string'](double) (required)
  - collected: ['number', 'string'](double) (required)
  - uncollected: ['number', 'string'](double) (required)
  - pending: ['number', 'string'](double) (required)
  - id: ['null', 'string']
  - partition: ['null', 'string']

**DailyLocationIdentity**
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)

**Date**
  - (no properties)

**DivisionAllocation**
  - divisionId: string(uuid) (required)
  - amountPaid: ['number', 'string'](double) (required)

**ExternalCardTransaction**
  - paymentSpecificationId: string(uuid) (required)
  - paymentType: PaymentType (required)
  - transactionType: TransactionType
  - transactionAmount: ['number', 'string'](double) (required)
  - creditCardType: CreditCardType (required)
  - lastFour: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)

**GenericStatusResponse**
  - status: ['null', 'string'] (required)
  - message: ['null', 'string'] (required)

**ITransaction**
  - paymentSpecificationId: string(uuid)
  - paymentType: PaymentType
  - transactionType: TransactionType
  - transactionAmount: ['number', 'string'](double)
  - createdDate: string(date-time)

**LastTransaction**
  - date: string(date-time) (required)
  - amount: ['number', 'string'](double) (required)
  - status: ['null', 'string'] (required)

**NonPaymentRecord**
  - underpaymentReasonId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**OutstandingBalance**
  - divisionId: string(uuid) (required)
  - dateOfService: Date (required)
  - dueToday: ['number', 'string'](double) (required)
  - outstanding: ['number', 'string'](double) (required)
  - amountPaid: ['number', 'string'](double) (required)
  - remaining: ['number', 'string'](double)

**OutstandingBalanceAllocation**
  - allocationId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - dateOfService: Date (required)
  - amountPaid: ['number', 'string'](double) (required)
  - uncollectedReasonId: ['null', 'string'](uuid) (required)

**OutstandingBalanceAllocationRequest**
  - divisionId: string(uuid) (required)
  - dateOfService: Date (required)
  - amountPaid: ['number', 'string'](double) (required)
  - uncollectedReasonId: ['null', 'string'](uuid) (required)

**PaymentAccountIdentity**
  - (no properties)

**PaymentAccountOwnerType**
  - (no properties)

**PaymentEncounterIdentity**
  - locationId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - isPast: boolean

**PaymentOrigin**
  - paymentAccountOwnerId: string(uuid)
  - paymentAccountOwnerType: PaymentAccountOwnerType

**PaymentSpecification**
  - organizationId: ['null', 'string'] (required)
  - paymentSpecificationId: string(uuid) (required)
  - paymentAccountOwnerId: string(uuid)
  - paymentAccountOwnerType: PaymentAccountOwnerType
  - patientId: string(uuid)
  - entityId: ['null', 'string'](uuid) (required)
  - entityType: ['null', 'string'] (required)
  - locationId: string(uuid)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - stripeAccountSummaryIdentity: StripeAccountSummaryIdentity (required)
  - isEncounterPayment: boolean (required)
  - paymentType: PaymentType (required)
  - transactionAmount: ['null', 'number', 'string'](double) (required)
  - userId: ['null', 'string'](uuid) (required)
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - serviceTypeAllocations: ['null', 'array'] (required)
  - outstandingBalanceAllocations: ['null', 'array'] (required)
  - transaction: ITransaction (required)
  - transactionRefund: TransactionRefund (required)
  - createdDate: string(date-time) (required)
  - feeAmount: ['null', 'number', 'string'](double)
  - paymentAccountIdentity: object
  - reserveWithoutDivisions: boolean
  - successfullyProcessed: boolean
  - refunded: boolean
  - canRefund: boolean
  - lastFour: ['null', 'string']
  - cardLogo: ['null', 'string']
  - isStripeTransaction: boolean
  - id: ['null', 'string']
  - partition: ['null', 'string']

**PaymentSpecificationHeader**
  - organizationId: ['null', 'string'] (required)
  - paymentSpecificationId: string(uuid) (required)
  - totalAmount: ['number', 'string'](double) (required)
  - paymentType: PaymentType (required)
  - lastFour: ['null', 'string'] (required)
  - cardLogo: ['null', 'string'] (required)
  - userId: ['null', 'string'](uuid) (required)
  - successfullyProcessed: boolean (required)
  - refunded: boolean (required)
  - canRefund: boolean (required)
  - refundHeader: RefundHeader (required)
  - divisionAllocations: ['null', 'array'] (required)
  - createdDate: string(date-time) (required)

**PaymentType**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ProcessDevicePaymentRequest**
  - paymentIntentId: ['null', 'string'] (required)

**ProcessDeviceSetupRequest**
  - setupIntentId: ['null', 'string'] (required)

**ProcessEncounterCashStripePaymentRequest**
  - cashTendered: ['number', 'string'](double) (required)
  - paymentOrigin: PaymentOrigin (required)
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentType: PaymentType
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - stripeAccountSummaryIdentity: StripeAccountSummaryIdentity (required)
  - transactionAmount: ['number', 'string'](double)
  - serviceTypeAllocations: ['null', 'array'] (required)
  - outstandingBalanceAllocations: ['null', 'array'] (required)
  - reserveWithoutDivisions: boolean (required)

**ProcessEncounterCheckStripePaymentRequest**
  - checkNumber: ['null', 'string'] (required)
  - checkDate: Date (required)
  - authorizationNumber: ['null', 'string'] (required)
  - paymentOrigin: PaymentOrigin (required)
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentType: PaymentType
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - stripeAccountSummaryIdentity: StripeAccountSummaryIdentity (required)
  - transactionAmount: ['number', 'string'](double)
  - serviceTypeAllocations: ['null', 'array'] (required)
  - outstandingBalanceAllocations: ['null', 'array'] (required)
  - reserveWithoutDivisions: boolean (required)

**ProcessEncounterExternalCardStripePaymentRequest**
  - paymentOrigin: PaymentOrigin (required)
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentType: PaymentType
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - stripeAccountSummaryIdentity: StripeAccountSummaryIdentity (required)
  - serviceTypeAllocations: ['null', 'array'] (required)
  - outstandingBalanceAllocations: ['null', 'array'] (required)
  - reserveWithoutDivisions: boolean (required)
  - transactionAmount: ['number', 'string'](double)
  - creditCardType: CreditCardType (required)
  - lastFour: ['null', 'string'] (required)

**ProcessEncounterSavedAccountStripePaymentRequest**
  - paymentOrigin: PaymentOrigin (required)
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentType: PaymentType
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - stripeAccountSummaryIdentity: StripeAccountSummaryIdentity (required)
  - paymentAccountId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - serviceTypeAllocations: ['null', 'array'] (required)
  - outstandingBalanceAllocations: ['null', 'array'] (required)
  - reserveWithoutDivisions: boolean (required)
  - paymentPlanId: ['null', 'string'](uuid) (required)
  - transactionAmount: ['number', 'string'](double)

**ProcessEntitySavedAccountStripePaymentRequest**
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentOrigin: PaymentOrigin (required)
  - paymentAccountId: ['null', 'string'] (required)
  - entityId: string(uuid) (required)
  - entityType: ['null', 'string'] (required)
  - locationId: ['null', 'string'](uuid) (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - paymentType: PaymentType (required)

**ProcessPatientCashPaymentRequest**
  - cashTendered: ['number', 'string'](double) (required)
  - paymentPlanId: ['null', 'string'](uuid) (required)
  - paymentAccountOwnerId: string(uuid)
  - paymentAccountOwnerType: PaymentAccountOwnerType
  - patientId: ['null', 'string'](uuid) (required)
  - locationId: string(uuid) (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - acceptorSummaryIdentity: CompanyIdentity (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - createdDate: string(date-time) (required)

**ProcessPatientCheckPaymentRequest**
  - checkNumber: ['null', 'string'] (required)
  - checkDate: Date (required)
  - authorizationNumber: ['null', 'string'] (required)
  - paymentPlanId: ['null', 'string'](uuid) (required)
  - paymentAccountOwnerId: string(uuid)
  - paymentAccountOwnerType: PaymentAccountOwnerType
  - patientId: ['null', 'string'](uuid) (required)
  - locationId: string(uuid) (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - acceptorSummaryIdentity: CompanyIdentity (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - createdDate: string(date-time) (required)

**ProcessPatientCreditForwardPaymentRequest**
  - amountTendered: ['number', 'string'](double) (required)
  - paymentAccountOwnerId: string(uuid)
  - paymentAccountOwnerType: PaymentAccountOwnerType
  - patientId: ['null', 'string'](uuid) (required)
  - locationId: string(uuid) (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - acceptorSummaryIdentity: CompanyIdentity (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - createdDate: string(date-time) (required)

**ProcessPatientPaymentRequest**
  - creditCardType: CreditCardType (required)
  - lastFour: ['null', 'string'] (required)
  - paymentPlanId: ['null', 'string'](uuid) (required)
  - paymentAccountOwnerId: string(uuid)
  - paymentAccountOwnerType: PaymentAccountOwnerType
  - patientId: ['null', 'string'](uuid) (required)
  - locationId: string(uuid) (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - acceptorSummaryIdentity: CompanyIdentity (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - createdDate: string(date-time) (required)

**ProcessPatientSavedAccountStripePaymentRequest**
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentOrigin: PaymentOrigin (required)
  - paymentAccountId: ['null', 'string'] (required)
  - patientId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - paymentType: PaymentType (required)
  - paymentPlanId: ['null', 'string'](uuid) (required)

**ReaderResponse**
  - id: ['null', 'string'] (required)
  - status: ['null', 'string'] (required)
  - deviceType: ['null', 'string'] (required)
  - ipAddress: ['null', 'string'] (required)
  - serialNumber: ['null', 'string'] (required)
  - action: object (required)

**ReaderResponseAction**
  - type: ['null', 'string']
  - status: ['null', 'string']
  - failureCode: ['null', 'string']
  - failureMessage: ['null', 'string']

**RefundEncounterStripePaymentRequest**
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSpecificationId: string(uuid) (required)
  - refundReasonId: ['null', 'string'](uuid) (required)
  - refundOriginalMethod: boolean (required)

**RefundHeader**
  - refundAmount: ['number', 'string'](double) (required)
  - refundDate: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)
  - refundReasonId: ['null', 'string'](uuid) (required)

**RefundStripePaymentRequest**
  - paymentSpecificationId: string(uuid) (required)
  - refundReasonId: ['null', 'string'](uuid) (required)
  - refundOriginalMethod: boolean (required)
  - correlationId: ['null', 'string'] (required)

**SavedAccountType**
  - (no properties)

**SaveEntityPaymentAccountDetails**
  - name: ['null', 'string']

**SavePatientPaymentAccountDetails**
  - firstName: ['null', 'string']
  - lastName: ['null', 'string']

**SendReceiptRequest**
  - paymentSpecificationId: string(uuid) (required)
  - emailAddress: ['null', 'string'] (required)

**ServiceType**
  - serviceTypeId: string(uuid) (required)
  - companyId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - coPay: ['number', 'string'](double) (required)
  - additional: ['number', 'string'](double) (required)
  - amountPaid: ['number', 'string'](double) (required)
  - totalExpected: ['number', 'string'](double)
  - remaining: ['number', 'string'](double)

**ServiceTypeAllocation**
  - allocationId: string(uuid) (required)
  - serviceTypeId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - amountPaid: ['number', 'string'](double) (required)
  - uncollectedReasonId: ['null', 'string'](uuid) (required)
  - activities: ['null', 'array'] (required)

**ServiceTypeAllocationRequest**
  - serviceTypeId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - amountPaid: ['number', 'string'](double) (required)
  - uncollectedReasonId: ['null', 'string'](uuid) (required)

**SetPaymentSpecificationPayoutDetailsRequest**
  - payoutDate: string(date-time) (required)

**SetupEncounterStripePaymentRequest**
  - patientId: string(uuid) (required)
  - paymentOrigin: PaymentOrigin (required)
  - savePaymentAccount: object (required)
  - paymentSource: ['null', 'string'] (required)
  - paymentType: PaymentType (required)
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - stripeAccountSummaryIdentity: StripeAccountSummaryIdentity (required)
  - serviceTypeAllocations: ['null', 'array'] (required)
  - outstandingBalanceAllocations: ['null', 'array'] (required)
  - reserveWithoutDivisions: boolean (required)
  - transactionAmount: ['number', 'string'](double)

**SetupEntityStripeCreateAccountRequest**
  - paymentAccountOwnerId: string(uuid) (required)
  - accountType: SavedAccountType (required)
  - name: ['null', 'string'] (required)

**SetupEntityStripePaymentRequest**
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentOrigin: PaymentOrigin (required)
  - savePaymentAccount: object (required)
  - entityId: string(uuid) (required)
  - entityType: ['null', 'string'] (required)
  - locationId: ['null', 'string'](uuid) (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - paymentType: PaymentType (required)

**SetupPatientStripeCreateAccountRequest**
  - paymentAccountOwnerId: string(uuid) (required)
  - paymentAccountOwnerType: PaymentAccountOwnerType (required)
  - accountType: SavedAccountType (required)
  - firstName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)

**SetupPatientStripePaymentRequest**
  - paymentAccountIdentity: PaymentAccountIdentity (required)
  - paymentOrigin: PaymentOrigin (required)
  - savePaymentAccount: object (required)
  - patientId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - transactionAmount: ['number', 'string'](double) (required)
  - paymentType: PaymentType (required)
  - paymentPlanId: ['null', 'string'](uuid) (required)

**StripeAccountPaymentHeader**
  - stripeAccountSummaryIdentity: StripeAccountSummaryIdentity (required)
  - divisions: ['null', 'array'] (required)
  - totalExpected: ['number', 'string'](double) (required)
  - amountPaid: ['number', 'string'](double) (required)
  - remainingBalance: ['number', 'string'](double) (required)
  - totalOutstandingBalance: ['number', 'string'](double) (required)
  - paymentSpecifications: ['null', 'array'] (required)
  - nonPaymentRecord: NonPaymentRecord (required)

**StripeAccountSummary**
  - identity: StripeAccountSummaryIdentity (required)
  - note: ['null', 'string'] (required)
  - divisions: ['null', 'array'] (required)
  - paymentSpecifications: ['null', 'array'] (required)
  - serviceTypes: ['null', 'array'] (required)
  - outstandingBalances: ['null', 'array'] (required)
  - serviceTypeAllocationHistory: ['null', 'array'] (required)
  - outstandingBalanceAllocationHistory: ['null', 'array'] (required)
  - nonPaymentRecord: NonPaymentRecord (required)
  - serviceTypesTotalExpected: ['number', 'string'](double)
  - serviceTypesCoPays: ['number', 'string'](double)
  - outstandingBalancesDueToday: ['number', 'string'](double)
  - totalOutstandingBalance: ['number', 'string'](double)
  - totalExpected: ['number', 'string'](double)
  - serviceTypesAmountPaid: ['number', 'string'](double)
  - outstandingBalancesAmountPaid: ['number', 'string'](double)
  - amountPaid: ['number', 'string'](double)
  - serviceTypesRemaining: ['number', 'string'](double)
  - outstandingBalancesRemaining: ['number', 'string'](double)
  - remainingBalance: ['number', 'string'](double)
  - canAcceptNonPayment: boolean

**StripeAccountSummaryIdentity**
  - (no properties)

**StripePaymentAccountsResponse**
  - paymentAccountId: ['null', 'string'] (required)
  - accountType: ['null', 'string'] (required)
  - cardType: ['null', 'string'] (required)
  - accountLastFour: ['null', 'string'] (required)
  - lastTransaction: LastTransaction (required)

**StripePaymentEncounterSummary**
  - organizationId: ['null', 'string'] (required)
  - paymentEncounterIdentity: PaymentEncounterIdentity (required)
  - collectionAmountFixed: boolean (required)
  - divisions: ['null', 'array'] (required)
  - totalExpected: ['number', 'string'](double) (required)
  - amountPaid: ['number', 'string'](double) (required)
  - remainingBalance: ['number', 'string'](double) (required)
  - stripeAccountPaymentHeaders: ['null', 'array'] (required)
  - lastPaymentUserId: ['null', 'string'](uuid)
  - lastPaymentDate: ['null', 'string'](date-time)
  - createdDate: string(date-time) (required)

**StripeTransactionResponse**
  - paymentSpecificationId: string(uuid) (required)
  - paymentId: ['null', 'string'] (required)
  - transactionDateTime: string(date-time) (required)
  - status: ['null', 'string'] (required)
  - paymentType: PaymentType (required)
  - success: boolean (required)
  - error: ['null', 'string']

**StripeTransactionSetupResponse**
  - clientSecret: ['null', 'string'] (required)
  - paymentSpecificationId: string(uuid) (required)
  - stripeId: ['null', 'string'] (required)
  - success: boolean (required)
  - error: ['null', 'string'] (required)

**TransactionRefund**
  - paymentSpecificationId: string(uuid) (required)
  - patientId: ['null', 'string'](uuid) (required)
  - entityId: ['null', 'string'](uuid)
  - entityType: ['null', 'string']
  - correlationId: ['null', 'string'] (required)
  - paymentSource: ['null', 'string'] (required)
  - refundAmount: ['number', 'string'](double) (required)
  - refundDate: string(date-time) (required)
  - refundReasonId: ['null', 'string'](uuid) (required)
  - userId: ['null', 'string'](uuid) (required)

**TransactionRefundResponse**
  - paymentSpecificationId: string(uuid) (required)
  - refundAmount: ['number', 'string'](double) (required)
  - refundReasonId: ['null', 'string'](uuid) (required)
  - success: boolean (required)
  - responseMessage: ['null', 'string'] (required)
  - refundDate: string(date-time) (required)

**TransactionType**
  - (no properties)

