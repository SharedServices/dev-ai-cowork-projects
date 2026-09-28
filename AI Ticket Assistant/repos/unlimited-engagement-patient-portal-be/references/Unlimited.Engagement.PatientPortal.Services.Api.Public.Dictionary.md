﻿# Unlimited.Engagement.PatientPortal.Services.Api.Public - API Dictionary

Repo: unlimited-engagement-patient-portal-be
Source: Unlimited.Engagement.PatientPortal.Services.Api.Public.json

## Endpoints

### GET /communication/settings
- Tags: Communication
- Response 200: PatientSingleBrandCommunicationSettingsRepsonse

### PUT /communication/settings
- Tags: Communication
- Request body: PatientSelfSelectCommunicationSettingsRequest
- Response 200: (no body)

### GET /insecure/config/{prefix}
- Tags: Insecure
- Path params: prefix: string, required
- Response 200: ConfigResponse
- Response 404: ProblemDetails

### POST /insecure/login
- Tags: Insecure
- Request body: LoginRequest
- Response 200: LimitedLoginResponse
- Response 400: ProblemDetails
- Response 401: ProblemDetails

### POST /insecure/quicklogin
- Tags: Insecure
- Request body: QuickLoginRequest
- Response 200: QuickLoginResponse
- Response 400: ProblemDetails
- Response 401: ProblemDetails

### GET /payment-plan/balance
- Tags: PaymentPlan
- Response 200: PatientBalanceResponse

### GET /payment-plan/plan
- Tags: PaymentPlan
- Query params: withSchedule: boolean; activeOnly: boolean
- Response 200: PatientPaymentPlanResponse[]

### POST /payment-plan/plan
- Tags: PaymentPlan
- Request body: PortalPaymentPlanRequest
- Response 200: PatientPaymentPlanResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /payment-plan/plan/{planId}
- Tags: PaymentPlan
- Path params: planId: string(uuid), required
- Response 200: PatientPaymentPlanResponse
- Response 404: ProblemDetails

### DELETE /payment-plan/plan/{planId}
- Tags: PaymentPlan
- Path params: planId: string(uuid), required
- Query params: terminationReason: string, required
- Response 200: PatientPaymentPlanResponse
- Response 404: ProblemDetails

### GET /payment-plan/plan/{planId}/validate
- Tags: PaymentPlan
- Path params: planId: string(uuid), required
- Response 200: SlimPaymentPlanResponse
- Response 404: ProblemDetails

### POST /payment-plan/plan/proposePlan
- Tags: PaymentPlan
- Request body: PortalPaymentPlanRequest
- Response 200: PatientPaymentPlanResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /payment-plan/template
- Tags: PaymentPlan
- Response 200: PaymentPlanTemplateResponse[]

### GET /payment-plan/template/{templateId}
- Tags: PaymentPlan
- Path params: templateId: string(uuid), required
- Response 200: PaymentPlanTemplateResponse
- Response 404: ProblemDetails

### GET /paymenthistory
- Tags: PaymentHistory
- Query params: paymentYear: ['integer', 'string'](int32)
- Response 200: PaymentHistoryResponse
- Response 400: ProblemDetails

### GET /paymenthistory/{paymentId}/receipt
- Tags: PaymentHistory
- Path params: paymentId: string(uuid), required
- Response 200: string
- Response 404: ProblemDetails

### POST /paymenthistory/{paymentId}/receipt/send
- Tags: PaymentHistory
- Path params: paymentId: string(uuid), required
- Request body: PaymentReceiptRequest
- Response 200: (no body)
- Response 404: ProblemDetails

### GET /payments/accounts
- Tags: Payments
- Response 200: StripePaymentAccountsResponse[]
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### DELETE /payments/accounts/{accountId}
- Tags: Payments
- Path params: accountId: string, required
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /payments/accounts/setup/card
- Tags: Payments
- Response 200: StripeTransactionSetupResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /payments/balance/unapplied
- Tags: Payments
- Response 200: UnappliedBalanceResponse

### POST /payments/process/account
- Tags: Payments
- Request body: AccountPaymentRequest
- Response 200: StripeTransactionResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /payments/process/card/note
- Tags: Payments
- Request body: CardPaymentNoteRequest
- Response 204: (no body)

### POST /payments/process/card/setup
- Tags: Payments
- Request body: SetupCardPaymentRequest
- Response 200: StripeTransactionSetupResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /statements
- Tags: Statements
- Query params: count: ['integer', 'string'](int32)
- Response 200: StatementHistoryResponseRecord[]

### GET /statements/{statementId}/download
- Tags: Statements
- Path params: statementId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### GET /statements/next
- Tags: Statements
- Response 200: NextStatementDetailsResponse

### POST /verify/login
- Tags: Verify
- Request body: VerifiedLoginRequest
- Response 200: VerifiedLoginResponse

### POST /verify/start
- Tags: Verify
- Request body: string(uuid)
- Response 200: StartVerifyResponse
- Response 404: ProblemDetails

## Schemas

**AccountPaymentRequest**
  - transactionAmount: ['number', 'string'](double) (required)
  - paymentAccountId: ['null', 'string'] (required)
  - note: ['null', 'string']
  - paymentPlanId: ['null', 'string'](uuid)

**BrandCommunicationSettingsResponse**
  - statements: StatementsCommunicationSettingsResponse (required)
  - paymentPlans: PaymentPlansCommunicationSettingsResponse (required)

**CardPaymentNoteRequest**
  - note: ['null', 'string']
  - transactionAmount: ['number', 'string'](double)

**ConfigResponse**
  - title: ['null', 'string'] (required)
  - helpPhone: ['null', 'string'] (required)
  - brandName: ['null', 'string'] (required)
  - brandId: ['null', 'string'] (required)
  - theme: ThemeResponse (required)
  - logoUrl: ['null', 'string'] (required)
  - clinicalPortalUrl: ['null', 'string'] (required)
  - displayClinicalPortalUrl: boolean (required)
  - savedAccountPolicy: ['null', 'string'] (required)
  - displaySavedAccountPolicy: boolean (required)
  - paymentPolicy: ['null', 'string'] (required)
  - displayPaymentPolicy: boolean (required)
  - messageBannerHeader: ['null', 'string'] (required)
  - messageBanner: ['null', 'string'] (required)
  - displayMessageBanner: boolean (required)
  - displayNoteToOffice: boolean (required)
  - displayPaymentPlans: boolean (required)
  - displayPaymentPlanPolicy: boolean (required)
  - paymentPlanPolicy: ['null', 'string'] (required)
  - displayPaymentPlanCancellationPolicy: boolean (required)
  - paymentPlanCancellationPolicy: ['null', 'string'] (required)

**Date**
  - (no properties)

**LastTransaction**
  - date: string(date-time) (required)
  - amount: ['number', 'string'](double) (required)
  - status: ['null', 'string'] (required)

**LimitedLoginResponse**
  - (no properties)

**LoginRequest**
  - sitePrefix: ['null', 'string'] (required)
  - dateOfBirth: string(date-time) (required)
  - accountNumber: ['null', 'string'] (required)
  - captchaToken: ['null', 'string']

**MethodEnrollment**
  - (no properties)

**NextStatementDetailsResponse**
  - previousStatementBalance: ['number', 'string'](double) (required)
  - newCharges: ['number', 'string'](double) (required)
  - paymentsApplied: ['number', 'string'](double) (required)
  - currentBalance: ['number', 'string'](double) (required)
  - paymentPlanEligibleBalances: object (required)

**OrgCommunicationSettingsResponse**
  - textEnabled: boolean (required)
  - emailEnabled: boolean (required)

**PatientBalanceResponse**
  - totalPlanCurrentBalance: ['number', 'string'](double) (required)
  - statementCurrentBalance: ['number', 'string'](double) (required)
  - nonPlanBalance: ['number', 'string'](double)

**PatientPaymentPlanResponse**
  - patientPaymentPlanId: string(uuid)
  - parentPaymentPlanTemplateId: ['null', 'string'](uuid)
  - parentPaymentPlanTemplateName: string
  - brandId: string(uuid)
  - brandName: string
  - brandLogoUrl: string
  - guarantorId: string(uuid)
  - patientId: string(uuid)
  - startDate: Date
  - endDate: Date
  - duration: ['integer', 'string'](int32)
  - defaultPaymentMethodId: string
  - defaultPaymentAccountInfo: object
  - startingBalance: ['number', 'string'](double)
  - currentBalance: ['number', 'string'](double)
  - delinquentAmount: ['number', 'string'](double)
  - periodicPaymentAmount: ['number', 'string'](double)
  - createdDate: string(date-time)
  - createdById: string(uuid)
  - terminationReason: ['null', 'string']
  - status: PaymentPlanStatus
  - isActive: boolean
  - paymentSchedule: PaymentPlanPaymentResponse[]
  - isSelf: boolean
  - updatedDate: ['null', 'string'](date-time)
  - updatedById: ['null', 'string'](uuid)
  - autoLastPaid: object
  - paymentGraceDays: ['integer', 'string'](int32)
  - terminationDate: ['null', 'string'](date-time)
  - terminationUserId: ['null', 'string'](uuid)
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean
  - nextPaymentDate: Date

**PatientPaymentPlansCommunicationSettingsRequest**
  - textEnabled: boolean (required)
  - emailEnabled: boolean (required)

**PatientPaymentPlansCommunicationSettingsResponse**
  - textEnabled: ['null', 'boolean'] (required)
  - emailEnabled: ['null', 'boolean'] (required)

**PatientSelfSelectCommunicationSettingsRequest**
  - statements: PatientSelfSelectStatementsCommunicationSettingsRequest (required)
  - paymentPlans: PatientPaymentPlansCommunicationSettingsRequest (required)

**PatientSelfSelectStatementsCommunicationSettingsRequest**
  - textEnabled: boolean (required)
  - emailEnabled: boolean (required)

**PatientSimpleCommunicationSettingsResponse**
  - statements: PatientStatementsCommunicationSettingsResponse (required)
  - paymentPlans: PatientPaymentPlansCommunicationSettingsResponse (required)

**PatientSingleBrandCommunicationSettingsRepsonse**
  - lastChangedByPatient: boolean (required)
  - cellPhone: ['null', 'string'] (required)
  - email: ['null', 'string'] (required)
  - patientSettings: PatientSimpleCommunicationSettingsResponse (required)
  - brandSettings: BrandCommunicationSettingsResponse (required)
  - orgSettings: OrgCommunicationSettingsResponse (required)

**PatientStatementsCommunicationSettingsResponse**
  - textEnabled: ['null', 'boolean'] (required)
  - emailEnabled: ['null', 'boolean'] (required)
  - paperMailEnabled: ['null', 'boolean'] (required)

**PaymentDetailResponse**
  - paymentMethodId: string (required)
  - defermentReasonId: ['null', 'string'](uuid) (required)
  - amountPaid: ['number', 'string'](double) (required)
  - datePaid: Date (required)
  - paymentType: PaymentType (required)
  - transactionType: TransactionType (required)
  - lastFour: string (required)
  - cardType: string (required)
  - paymentSpecificationId: ['null', 'string'](uuid) (required)

**PaymentHistory**
  - paymentId: string(uuid) (required)
  - paidOn: string(date-time) (required)
  - paymentType: PaymentType (required)
  - paymentStatus: PaymentStatus (required)
  - lastFour: ['null', 'string'] (required)
  - cardLogo: ['null', 'string'] (required)
  - amount: ['number', 'string'](double) (required)

**PaymentHistoryResponse**
  - histories: ['null', 'array'] (required)

**PaymentPlanEligibleBalancesResponse**
  - zeroTo29Balance: ['number', 'string'](double)
  - thirtyTo59Balance: ['number', 'string'](double)
  - sixtyTo89Balance: ['number', 'string'](double)
  - ninetyTo119Balance: ['number', 'string'](double)
  - oneTwentyTo179Balance: ['number', 'string'](double)
  - oneEightyPlusBalance: ['number', 'string'](double)

**PaymentPlanFrequency**
  - (no properties)

**PaymentPlanPaymentResponse**
  - paymentPlanPaymentId: string(uuid) (required)
  - dateDue: Date (required)
  - amountDue: ['number', 'string'](double) (required)
  - startingBalance: ['number', 'string'](double) (required)
  - status: PaymentPlanPaymentStatus (required)
  - updatedDate: ['null', 'string'](date-time) (required)
  - amountPaid: ['number', 'string'](double)
  - amountRemaining: ['number', 'string'](double)
  - paymentDetails: ['null', 'array'] (required)

**PaymentPlanPaymentStatus**
  - (no properties)

**PaymentPlansCommunicationSettingsResponse**
  - text: object (required)
  - email: object (required)

**PaymentPlanSelfSelectAgeOptions**
  - (no properties)

**PaymentPlanStatus**
  - (no properties)

**PaymentPlanTemplateResponse**
  - paymentPlanTemplateId: string(uuid)
  - name: string
  - description: ['null', 'string']
  - duration: ['integer', 'string'](int32)
  - minimum: ['integer', 'string'](int32)
  - maximum: ['integer', 'string'](int32)
  - selfSelectAgeOption: PaymentPlanSelfSelectAgeOptions
  - createdDate: string(date-time)
  - createdById: string(uuid)
  - updatedDate: ['null', 'string'](date-time)
  - updatedById: ['null', 'string'](uuid)
  - active: boolean
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean

**PaymentReceiptRequest**
  - emailAddress: ['null', 'string'] (required)

**PaymentStatus**
  - (no properties)

**PaymentType**
  - (no properties)

**PortalPaymentPlanRequest**
  - patientPaymentPlanId: ['null', 'string'](uuid)
  - startDate: object (required)
  - duration: ['null', 'integer', 'string'](int32)
  - defaultPaymentMethodId: ['null', 'string'] (required)
  - startingBalance: ['null', 'number', 'string'](double) (required)
  - periodicPaymentAmount: ['null', 'number', 'string'](double)
  - status: object (required)
  - parentPaymentPlanTemplateId: ['null', 'string'](uuid)
  - paymentGraceDays: ['null', 'integer', 'string'](int32)
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**QuickLoginRequest**
  - quickLinkId: string(uuid) (required)
  - sitePrefix: string (required)

**QuickLoginResponse**
  - (no properties)

**SetupCardPaymentRequest**
  - transactionAmount: ['number', 'string'](double) (required)
  - savePaymentAccount: boolean
  - paymentPlanId: ['null', 'string'](uuid)

**SlimPaymentPlanResponse**
  - patientPaymentPlanId: string(uuid)
  - brandId: string(uuid)
  - guarantorId: string(uuid)
  - patientId: string(uuid)
  - startDate: Date
  - endDate: Date
  - duration: ['integer', 'string'](int32)
  - startingBalance: ['number', 'string'](double)
  - currentBalance: ['number', 'string'](double)
  - delinquentAmount: ['number', 'string'](double)
  - periodicPaymentAmount: ['number', 'string'](double)
  - status: PaymentPlanStatus
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean
  - isActive: boolean

**StartVerifyResponse**
  - statusCode: Status
  - errorMessage: ['null', 'string']
  - referenceId: ['null', 'string']
  - expirationSeconds: ['integer', 'string'](int32)

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

**StatementsCommunicationSettingsResponse**
  - text: object (required)
  - email: object (required)

**StatementStatus**
  - (no properties)

**StatementTiming**
  - (no properties)

**Status**
  - (no properties)

**StripePaymentAccountsResponse**
  - paymentAccountId: ['null', 'string'] (required)
  - accountType: ['null', 'string'] (required)
  - cardType: ['null', 'string'] (required)
  - accountLastFour: ['null', 'string'] (required)
  - lastTransaction: LastTransaction (required)

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

**ThemeResponse**
  - name: ['null', 'string'] (required)
  - primary: ['null', 'object'] (required)
  - accent: ['null', 'object'] (required)

**TransactionType**
  - (no properties)

**UnappliedBalanceResponse**
  - unappliedBalance: ['number', 'string'](double) (required)

**VerifiedLoginRequest**
  - referenceId: ['null', 'string'] (required)
  - code: ['null', 'string'] (required)

**VerifiedLoginResponse**
  - (no properties)

