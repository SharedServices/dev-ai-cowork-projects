﻿# Snowdrop.ChargeInterventions.Services - API Dictionary

Repo: snowdrop-charge-interventions-be
Source: Snowdrop.ChargeInterventions.Services.json

## Endpoints

### POST /accounts-receivable/actions/batch/create
- Tags: AccountsReceivable
- Request body: CreateBatchActionRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /accounts-receivable/patients/{patientId}/charges/{chargeId}/unsnooze
- Tags: AccountsReceivable
- Path params: patientId: string(uuid), required; chargeId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /accounts-receivable/patients/{patientId}/charges/snooze
- Tags: AccountsReceivable
- Path params: patientId: string(uuid), required
- Request body: BulkSnoozeRequest
- Response 200: BulkChargeActionResponse
- Response 400: ProblemDetails

### POST /accounts-receivable/patients/{patientId}/claims/{claimId}/unsnooze
- Tags: AccountsReceivable
- Path params: patientId: string(uuid), required; claimId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /accounts-receivable/patients/{patientId}/claims/snooze
- Tags: AccountsReceivable
- Path params: patientId: string(uuid), required
- Request body: BulkSnoozeRequest
- Response 200: BulkClaimActionResponse
- Response 400: ProblemDetails

### GET /accounts-receivable/patients/{patientId}/encounters/years
- Tags: AccountsReceivable
- Path params: patientId: string(uuid), required
- Response 200: ['integer', 'string'](int32)[]
- Response 400: ProblemDetails

### POST /accounts-receivable/patients/{patientId}/rebuild
- Tags: AccountsReceivable
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### POST /accounts-receivable/patients/count
- Tags: AccountsReceivable
- Request body: AccountsReceivableWorkflowRequest
- Response 200: ['integer', 'string'](int32)
- Response 400: ProblemDetails

### POST /accounts-receivable/patients/search
- Tags: AccountsReceivable
- Request body: AccountsReceivableWorkflowRequest
- Response 200: AccountsReceivableResponse
- Response 400: ProblemDetails

### POST /accounts-receivable/patients/search/{patientId}
- Tags: AccountsReceivable
- Path params: patientId: string(uuid), required
- Request body: AccountsReceivablePatientWorkflowRequest
- Response 200: AccountsReceivablePatientResponse
- Response 400: ProblemDetails

### GET /ar-intervention-rules
- Tags: ARInterventionRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /ar-intervention-rules
- Tags: ARInterventionRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /ar-intervention-rules/{ruleId}
- Tags: ARInterventionRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /ar-intervention-rules/{ruleId}/delete
- Tags: ARInterventionRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /ar-intervention-rules/{ruleId}/name/update
- Tags: ARInterventionRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleNameRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /ar-intervention-rules/{ruleId}/update
- Tags: ARInterventionRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /ar-intervention-rules/interventionTypes/rules
- Tags: ARInterventionRule
- Response 200: InterventionTypeRules[]

### GET /ar-intervention-rules/names/isunique
- Tags: ARInterventionRule
- Query params: name: string
- Response 200: boolean

### POST /ar-intervention-rules/predefined
- Tags: ARInterventionRule
- Response 200: (no body)
- Response 404: ProblemDetails

### GET /ar-intervention-sequences
- Tags: ARInterventionSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### GET /ar-intervention-sequences/{sequenceId}
- Tags: ARInterventionSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### GET /ar-intervention-sequences/{sequenceId}/behaviors
- Tags: ARInterventionSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /ar-intervention-sequences/{sequenceId}/disable
- Tags: ARInterventionSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /ar-intervention-sequences/{sequenceId}/download
- Tags: ARInterventionSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /ar-intervention-sequences/{sequenceId}/enable
- Tags: ARInterventionSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /ar-intervention-sequences/{sequenceId}/rules
- Tags: ARInterventionSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /ar-intervention-sequences/{sequenceId}/rules/reorder
- Tags: ARInterventionSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /ar-intervention-sequences/predefined
- Tags: ARInterventionSequence
- Response 200: (no body)
- Response 404: ProblemDetails

### POST /ar-intervention-sequences/predefined/disable
- Tags: ARInterventionSequence
- Response 200: (no body)
- Response 404: ProblemDetails

### POST /ar-intervention-sequences/predefined/enable
- Tags: ARInterventionSequence
- Response 200: (no body)
- Response 404: ProblemDetails

### POST /ar-interventions/charges/{chargeId}/interventions/resolve
- Tags: ARInterventions
- Path params: chargeId: string(uuid), required
- Request body: ResolveInterventionsRequest
- Response 200: (no body)

### POST /ar-interventions/claims/{claimId}/interventions/resolve
- Tags: ARInterventions
- Path params: claimId: string(uuid), required
- Request body: ResolveInterventionsRequest
- Response 200: (no body)

### POST /charge-validation/generate-prequalification
- Tags: ChargeValidation
- Response 200: string

### POST /charge-validation/generate-prequalification/{setId}
- Tags: ChargeValidation
- Path params: setId: string(uuid), required
- Response 200: string

### GET /charge-validation/qualification/{attributeName}
- Tags: ChargeValidation
- Path params: attributeName: string, required
- Response 200: string(uuid)[]

### GET /charge-validation/qualification/{attributeName}/{attributeValue}
- Tags: ChargeValidation
- Path params: attributeName: string, required; attributeValue: string, required
- Response 200: string(uuid)[]

### GET /charge-validation/qualification/charge/{chargeId}
- Tags: ChargeValidation
- Path params: chargeId: string(uuid), required
- Response 200: string(uuid)[]

### POST /charge-validation/validate
- Tags: ChargeValidation
- Request body: ARValidationRequest[]
- Response 200: string

### POST /claim-validation/generate-prequalification
- Tags: ClaimValidation
- Response 200: string

### POST /claim-validation/generate-prequalification/{setId}
- Tags: ClaimValidation
- Path params: setId: string(uuid), required
- Response 200: string

### GET /claim-validation/qualification/{attributeName}
- Tags: ClaimValidation
- Path params: attributeName: string, required
- Response 200: string(uuid)[]

### GET /claim-validation/qualification/{attributeName}/{attributeValue}
- Tags: ClaimValidation
- Path params: attributeName: string, required; attributeValue: string, required
- Response 200: string(uuid)[]

### GET /claim-validation/qualification/claim/{claimId}
- Tags: ClaimValidation
- Path params: claimId: string(uuid), required
- Response 200: string(uuid)[]

### POST /claim-validation/validate
- Tags: ClaimValidation
- Request body: ARValidationRequest[]
- Response 200: string

### POST /intervention-management/charges/{chargeId}/interventions/create
- Tags: InterventionManagement
- Path params: chargeId: string(uuid), required
- Request body: InterventionManagementRequest
- Response 200: (no body)

### POST /intervention-management/charges/{chargeId}/interventions/process
- Tags: InterventionManagement
- Path params: chargeId: string(uuid), required
- Request body: InterventionManagementRequest
- Response 200: (no body)

### POST /intervention-management/charges/{chargeId}/interventions/resolve
- Tags: InterventionManagement
- Path params: chargeId: string(uuid), required
- Request body: InterventionManagementRequest
- Response 200: (no body)

### POST /intervention-management/claims/{claimId}/interventions/create
- Tags: InterventionManagement
- Path params: claimId: string(uuid), required
- Request body: InterventionManagementRequest
- Response 200: (no body)

### POST /intervention-management/claims/{claimId}/interventions/process
- Tags: InterventionManagement
- Path params: claimId: string(uuid), required
- Request body: InterventionManagementRequest
- Response 200: (no body)

### POST /intervention-management/claims/{claimId}/interventions/resolve
- Tags: InterventionManagement
- Path params: claimId: string(uuid), required
- Request body: InterventionManagementRequest
- Response 200: (no body)

### GET /patients/{patientId}/chargebalances
- Tags: PatientCharge
- Path params: patientId: string(uuid), required
- Response 200: PatientChargeBalance[]

### POST /patients/{patientId}/chargebalances/download
- Tags: PatientCharge
- Path params: patientId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /signalr/chargeinterventions-hub/negotiate
- Tags: Signalr
- Response 200: (no body)

### POST /signalr/patients/{patientId}/users/add
- Tags: Signalr
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### POST /signalr/patients/{patientId}/users/remove
- Tags: Signalr
- Path params: patientId: string(uuid), required
- Response 200: (no body)

## Schemas

**AccountBalanceBreakdownsResponse**
  - accountBreakdowns: AccountBreakdown[] (required)

**AccountBreakdown**
  - displayName: ['null', 'string'] (required)
  - lessThanThirtyDays: ['number', 'string'](double) (required)
  - thirtyOneToSixtyDays: ['number', 'string'](double) (required)
  - sixtyOneToNinetyDays: ['number', 'string'](double) (required)
  - ninetyOneToOneTwentyDays: ['number', 'string'](double) (required)
  - oneTwentyPlusDays: ['number', 'string'](double) (required)
  - totalBalance: ['number', 'string'](double)

**AccountsReceivablePatient**
  - patientId: string(uuid) (required)
  - startDate: Date (required)
  - endDate: Date (required)
  - balance: ['number', 'string'](double) (required)
  - interventionStartDate: Date (required)
  - interventionEndDate: Date (required)
  - interventionBalance: ['number', 'string'](double) (required)
  - patient: object (required)
  - balanceBreakdown: AccountBalanceBreakdownsResponse (required)
  - failureSummary: FailureSummaryResponse (required)

**AccountsReceivablePatientChargeResponse**
  - chargeId: string(uuid) (required)
  - activityId: ['null', 'string'](uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - ndc: ['null', 'string'] (required)
  - units: ['number', 'string'](double) (required)
  - dateOfService: Date (required)
  - locationId: string(uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - billSentDate: object (required)
  - icdCodes: IcdCodeIdentity[] (required)
  - modifiers: string[] (required)
  - chargeStatus: string (required)
  - chargeSubStatus: string (required)
  - balance: ['number', 'string'](double) (required)
  - isKidnapped: boolean (required)
  - recentlyModifiedByUser: boolean (required)
  - isOnSecondaryClaimOrLater: boolean (required)
  - snoozed: boolean (required)
  - claimGroupingHash: string (required)
  - chargeAssembly: object (required)
  - interventions: InterventionWaypointResponse[] (required)
  - accounts: AccountSummaryItemResponse[] (required)

**AccountsReceivablePatientEncounterResponse**
  - organizationId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - locationId: string(uuid) (required)
  - encounterNumber: ['null', 'string'] (required)
  - encounterStatus: ['null', 'string'] (required)
  - locationName: ['null', 'string'] (required)
  - invoices: AccountsReceivablePatientInvoiceResponse[] (required)
  - unbilled: AccountsReceivablePatientUnbilledChargesResponse[] (required)

**AccountsReceivablePatientInvoiceResponse**
  - invoiceType: DetailedInvoiceType (required)
  - invoiceId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - invoiceNumber: ['null', 'string'] (required)
  - status: ['null', 'string'] (required)
  - disposition: ['null', 'string'] (required)
  - billingNpi: ['null', 'string'] (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - guarantorName: ['null', 'string'] (required)
  - position: string (required)
  - totalBilled: ['number', 'string'](double) (required)
  - invoiceBalance: ['number', 'string'](double) (required)
  - ageBucket: string (required)
  - policyNumber: ['null', 'string'] (required)
  - recentlyModifiedByUser: boolean (required)
  - snoozed: boolean (required)
  - claimFrequency: ['null', 'integer', 'string'](int32) (required)
  - icn: ['null', 'string'] (required)
  - chargeAssembly: object (required)
  - claimPhoneNumbers: ClaimSupportPhoneNumberResponse[] (required)
  - interventions: InterventionWaypointResponse[] (required)
  - charges: AccountsReceivablePatientChargeResponse[] (required)

**AccountsReceivablePatientResponse**
  - encounters: AccountsReceivablePatientEncounterResponse[] (required)
  - hasMoreResults: boolean (required)
  - continuationToken: ['null', 'string'] (required)

**AccountsReceivablePatientUnbilledChargesResponse**
  - dateOfService: Date (required)
  - balance: ['number', 'string'](double) (required)
  - ageBucket: AgeBuckets (required)
  - status: string (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - position: ['null', 'string'] (required)
  - charges: AccountsReceivablePatientChargeResponse[] (required)

**AccountsReceivablePatientWorkflowRequest**
  - currentDate: Date
  - interventionTypes: InterventionType[]
  - qualifiers: AttributeQualifierRequest[]
  - ageBuckets: AgeBuckets[]
  - chargeCode: ['null', 'string']
  - rules: string(uuid)[]
  - payers: string(uuid)[]
  - plans: string(uuid)[]
  - skilledNursingFacilities: string(uuid)[]
  - manufacturerCopayPrograms: string(uuid)[]
  - policies: string(uuid)[]
  - patientSkilledNursingFacilities: string(uuid)[]
  - manufacturerCopayAwards: string(uuid)[]
  - guarantors: string(uuid)[]
  - closedEncounterSearchType: ClosedEncounterSearchType
  - closedEncounterYear: ['null', 'integer', 'string'](int32)
  - onlyCurrentUserItems: boolean
  - showSnoozedItems: boolean
  - continuation: ['null', 'string']

**AccountsReceivableResponse**
  - patients: AccountsReceivablePatient[] (required)
  - hasMoreResults: boolean (required)
  - continuationToken: ['null', 'string'] (required)

**AccountsReceivableWorkflowRequest**
  - currentDate: Date
  - showAllInterventionTypes: boolean
  - interventionTypes: InterventionType[]
  - qualifiers: AttributeQualifierRequest[]
  - alphaSplitStart: ['null', 'string'](char)
  - alphaSplitEnd: ['null', 'string'](char)
  - ageBuckets: AgeBuckets[]
  - chargeCode: ['null', 'string']
  - patientSearch: ['null', 'string']
  - rules: string(uuid)[]
  - payers: string(uuid)[]
  - plans: string(uuid)[]
  - skilledNursingFacilities: string(uuid)[]
  - manufacturerCopayPrograms: string(uuid)[]
  - onlyCurrentUserItems: boolean
  - showSnoozedItems: boolean
  - continuation: ['null', 'string']

**AccountSummaryItemResponse**
  - payerDisplayName: ['null', 'string'] (required)
  - planDisplayName: ['null', 'string'] (required)
  - paid: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)

**AgeBuckets**
  - (no properties)

**ARValidationRequest**
  - patientId: string(uuid) (required)
  - itemId: string(uuid) (required)
  - ruleIds: ['null', 'array']

**AttributeQualifierRequest**
  - attributeType: AttributeType
  - entityType: EntityType
  - setQualifiers: SetQualifierRequest[]
  - elementQualifiers: ElementQualifierRequest[]

**AttributeQualifiers**
  - attributeType: AttributeType (required)
  - setQualifiers: ['null', 'array']
  - elementQualifiers: ['null', 'array']
  - entityType: EntityType

**AttributeType**
  - (no properties)

**BehaviorCategory**
  - (no properties)

**BulkChargeActionResponse**
  - chargeResponses: ChargeActionResponse[] (required)

**BulkClaimActionResponse**
  - claimResponses: ClaimActionResponse[] (required)

**BulkSnoozeRequest**
  - items: string(uuid)[] (required)
  - snoozeReasonId: string(uuid) (required)
  - snoozeExpiryDate: Date (required)
  - correlationId: ['null', 'string'](uuid)

**ChargeActionResponse**
  - chargeId: string(uuid) (required)
  - statusCode: HttpStatusCode (required)

**ChargeAssemblyResponse**
  - chargeAssemblyId: string(uuid) (required)
  - chargeAssemblyNumber: string (required)

**ChargeManufacturerAssociation**
  - manufacturerCopayProgramId: string(uuid)
  - manufacturerCopayAssistanceAwardId: string(uuid)

**ChargeTransactionAccount**
  - type: TransactionAccountType
  - guarantorId: ['null', 'string'](uuid)
  - policyId: ['null', 'string'](uuid)
  - payerId: ['null', 'string'](uuid)
  - portfolioId: ['null', 'string'](uuid)
  - policyPlanId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - manufacturer: ChargeManufacturerAssociation

**ClaimActionResponse**
  - claimId: string(uuid) (required)
  - statusCode: HttpStatusCode (required)

**ClaimSupportPhoneNumberResponse**
  - phoneNumber: ['null', 'string'] (required)
  - extension: ['null', 'string'] (required)

**ClosedEncounterSearchType**
  - (no properties)

**CreateBatchActionRequest**
  - arCorrelationId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - userId: ['null', 'string'](uuid)
  - charges: string(uuid)[]
  - claims: string(uuid)[]
  - bills: string(uuid)[]

**CreateRuleRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: BehaviorCategory (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction
  - releaseType: ReleaseType
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualificationConfiguration: ['null', 'object'] (required)
  - modifiedDate: ['null', 'string'](date-time)

**Date**
  - (no properties)

**DetailedInvoiceType**
  - (no properties)

**ElementQualifier**
  - elementId: string (required)
  - exclusionary: boolean (required)

**ElementQualifierRequest**
  - elementId: string (required)
  - exclusionary: boolean (required)

**EntityType**
  - (no properties)

**EpisodeQualifier**
  - allEpisodes: boolean (required)
  - episodeTypes: string(uuid)[] (required)
  - phases: string(uuid)[] (required)
  - exclusionary: boolean (required)

**FailureSummaryResponse**
  - failures: InterventionFailureCount[] (required)

**GuarantorBalance**
  - guarantorId: string(uuid) (required)
  - name: string (required)
  - balance: ['number', 'string'](double) (required)

**HttpStatusCode**
  - (no properties)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**InterventionFailureCount**
  - interventionType: ['null', 'string'] (required)
  - failureCount: ['integer', 'string'](int32) (required)

**InterventionIdentity**
  - interventionType: InterventionType
  - chargeId: ['null', 'string'](uuid)
  - claimId: ['null', 'string'](uuid)
  - chargePaymentId: ['null', 'string'](uuid)
  - ruleId: ['null', 'string'](uuid)
  - chargeTransactionAccount: object

**InterventionManagementRequest**
  - interventionTypes: InterventionType[] (required)

**InterventionType**
  - (no properties)

**InterventionTypeRules**
  - interventionType: InterventionType (required)
  - rules: RuleHeader[]

**InterventionWaypointResponse**
  - behavior: InterventionType (required)
  - ruleId: ['null', 'string'](uuid) (required)
  - name: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)

**InvoiceChargeAssemblyResponse**
  - chargeAssemblyId: string(uuid) (required)
  - chargeAssemblyNumber: string (required)
  - payerAssemblyId: string(uuid) (required)
  - payerAssemblyNumber: string (required)

**ManufacturerBalance**
  - manufacturerCopayProgramId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - manufacturerCopayProgramName: ['null', 'string'] (required)
  - manufacturerPayerName: ['null', 'string'] (required)
  - balance: ['number', 'string'](double) (required)

**Modifier**
  - modifierId: string(uuid) (required)
  - name: string (required)

**NetType**
  - (no properties)

**PatientChargeBalance**
  - chargeId: string(uuid) (required)
  - chargeCode: string (required)
  - activityId: string(uuid) (required)
  - chargeStatus: ['integer', 'string'](int32) (required)
  - chargeSubStatus: ['integer', 'string'](int32) (required)
  - dateOfService: Date (required)
  - divisionId: string(uuid) (required)
  - facilityId: string(uuid) (required)
  - billingProviderId: string(uuid) (required)
  - billingUnits: ['number', 'string'](double) (required)
  - ndc: string (required)
  - billSentDate: object (required)
  - modifiers: Modifier[]
  - policies: PolicyBalance[]
  - guarantor: object (required)
  - snf: object (required)
  - manufacturerBalance: object

**PatientSummary**
  - firstName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - primaryPayerId: ['null', 'string'](uuid) (required)
  - primaryPayerName: ['null', 'string'] (required)
  - primaryPlanId: ['null', 'string'](uuid) (required)
  - primaryPlanName: ['null', 'string'] (required)
  - primaryResponsibleProviderId: ['null', 'string'](uuid) (required)
  - primaryResponsibleProviderName: ['null', 'string'] (required)
  - displayName: ['null', 'string']
  - lastNameFirstCharacter: ['null', 'string']

**PolicyBalance**
  - policyId: string(uuid) (required)
  - planId: ['null', 'string'](uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - balance: ['number', 'string'](double) (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**QualifierHeader**
  - attributeType: AttributeType (required)
  - id: string (required)
  - isSet: boolean (required)
  - exclusionary: boolean (required)

**ReleaseType**
  - (no properties)

**ResolveInterventionsRequest**
  - interventions: ['null', 'array']
  - interventionTypes: ['null', 'array']

**RuleAction**
  - (no properties)

**RuleDetail**
  - sequenceId: string(uuid) (required)
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: BehaviorCategory (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualificationConfiguration: ['null', 'object'] (required)
  - reviewRequired: boolean
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - netType: NetType (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)

**RuleHeader**
  - ruleId: string(uuid) (required)
  - name: string (required)

**RuleOrder**
  - ruleId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)

**RuleSummary**
  - ruleId: string(uuid) (required)
  - sequenceId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: BehaviorCategory (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: QualifierHeader[] (required)
  - sameDateOfServiceQualifiers: QualifierHeader[] (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)

**SequenceHeader**
  - sequenceId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - rules: RuleHeader[]
  - sequenceStatus: SequenceStatus (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)

**SequenceStatus**
  - (no properties)

**SetQualifier**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**SetQualifierRequest**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**SnfBalance**
  - snfPatientId: string(uuid) (required)
  - snfId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - snfResidentNumber: ['null', 'string'] (required)
  - snfFacilityName: ['null', 'string'] (required)
  - snfPayerName: ['null', 'string'] (required)
  - balance: ['number', 'string'](double) (required)

**TransactionAccountType**
  - (no properties)

**UpdateRuleNameRequest**
  - name: string (required)

**UpdateRuleRequest**
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: BehaviorCategory (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction
  - releaseType: ReleaseType
  - behaviorConfiguration: object (required)
  - qualificationConfiguration: ['null', 'object'] (required)

