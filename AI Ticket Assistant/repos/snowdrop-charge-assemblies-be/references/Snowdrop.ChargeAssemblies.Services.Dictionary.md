﻿# Snowdrop.ChargeAssemblies.Services - API Dictionary

Repo: snowdrop-charge-assemblies-be
Source: Snowdrop.ChargeAssemblies.Services.json

## Endpoints

### POST /charge-assembly-generation-rules
- Tags: PrimaryClaimGenerationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-assembly-generation-rules/{ruleId}
- Tags: PrimaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleResponse
- Response 404: ProblemDetails

### PUT /charge-assembly-generation-rules/{ruleId}/delete
- Tags: PrimaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /charge-assembly-generation-rules/{ruleId}/update
- Tags: PrimaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /charge-assembly-generation-rules/behaviors
- Tags: PrimaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-assembly-generation-rules/behaviors/manualreview/releaseactions
- Tags: PrimaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-assembly-generation-rules/names/isunique
- Tags: PrimaryClaimGenerationRule
- Query params: name: string
- Response 200: boolean

### GET /charge-assembly-generation-rules/qualifiers
- Tags: PrimaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-assembly-generation-rules/ruleactions
- Tags: PrimaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-assembly-generation-sequences
- Tags: ChargeAssemblyGenerationSequences
- Response 200: SequenceResponse[]

### POST /charge-assembly-generation-sequences
- Tags: ChargeAssemblyGenerationSequences
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails

### GET /charge-assembly-generation-sequences/{sequenceId}
- Tags: ChargeAssemblyGenerationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceResponse
- Response 404: ProblemDetails

### PUT /charge-assembly-generation-sequences/{sequenceId}/archive
- Tags: ChargeAssemblyGenerationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /charge-assembly-generation-sequences/{sequenceId}/download
- Tags: ChargeAssemblyGenerationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /charge-assembly-generation-sequences/{sequenceId}/restore
- Tags: ChargeAssemblyGenerationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-assembly-generation-sequences/{sequenceId}/rules
- Tags: ChargeAssemblyGenerationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummaryResponse[]

### PUT /charge-assembly-generation-sequences/{sequenceId}/rules/reorder
- Tags: ChargeAssemblyGenerationSequences
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charge-assembly-generation-sequences/{sequenceId}/update
- Tags: ChargeAssemblyGenerationSequences
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /charge-assembly-generation-sequences/names/isunique
- Tags: ChargeAssemblyGenerationSequences
- Query params: name: string
- Response 200: boolean

### PUT /charge-assembly-generation-sequences/reorder
- Tags: ChargeAssemblyGenerationSequences
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 409: ProblemDetails

### POST /charge-assembly-validation-rules
- Tags: ChargeAssemblyValidationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-assembly-validation-rules/{ruleId}
- Tags: ChargeAssemblyValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleResponse
- Response 404: ProblemDetails

### PUT /charge-assembly-validation-rules/{ruleId}/delete
- Tags: ChargeAssemblyValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /charge-assembly-validation-rules/{ruleId}/update
- Tags: ChargeAssemblyValidationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /charge-assembly-validation-rules/behaviors
- Tags: ChargeAssemblyValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-assembly-validation-rules/behaviors/manualreview/releaseactions
- Tags: ChargeAssemblyValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-assembly-validation-rules/names/isunique
- Tags: ChargeAssemblyValidationRule
- Query params: name: string
- Response 200: boolean

### GET /charge-assembly-validation-rules/qualifiers
- Tags: ChargeAssemblyValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-assembly-validation-rules/ruleactions
- Tags: ChargeAssemblyValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-assembly-validation-sequences
- Tags: ChargeAssemblyValidationSequences
- Response 200: SequenceResponse[]

### POST /charge-assembly-validation-sequences
- Tags: ChargeAssemblyValidationSequences
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails

### GET /charge-assembly-validation-sequences/{sequenceId}
- Tags: ChargeAssemblyValidationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceResponse
- Response 404: ProblemDetails

### PUT /charge-assembly-validation-sequences/{sequenceId}/archive
- Tags: ChargeAssemblyValidationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /charge-assembly-validation-sequences/{sequenceId}/download
- Tags: ChargeAssemblyValidationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /charge-assembly-validation-sequences/{sequenceId}/restore
- Tags: ChargeAssemblyValidationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-assembly-validation-sequences/{sequenceId}/rules
- Tags: ChargeAssemblyValidationSequences
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummaryResponse[]

### PUT /charge-assembly-validation-sequences/{sequenceId}/rules/reorder
- Tags: ChargeAssemblyValidationSequences
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charge-assembly-validation-sequences/{sequenceId}/update
- Tags: ChargeAssemblyValidationSequences
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /charge-assembly-validation-sequences/names/isunique
- Tags: ChargeAssemblyValidationSequences
- Query params: name: string
- Response 200: boolean

### PUT /charge-assembly-validation-sequences/reorder
- Tags: ChargeAssemblyValidationSequences
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 409: ProblemDetails

### POST /generation/enqueue
- Tags: Generation
- Request body: PatientChargeRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /migration/generation/rules
- Tags: Migration
- Response 200: (no body)

### POST /patients/{patientId}/charge-assemblies
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required
- Request body: CreateChargeAssemblyRequest
- Response 200: CreateChargeAssemblyResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /patients/{patientId}/charge-assemblies/{chargeAssemblyId}
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Response 200: ChargeAssemblyWorkspaceResponse
- Response 404: ProblemDetails

### POST /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/accounts/refresh
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Response 200: (no body)

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/charges/add
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Request body: AddChargeAssemblyChargesRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/charges/balances/refresh
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Response 200: (no body)

### GET /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/charges/grid
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; patientId: string, required
- Response 200: ChargeGridItemResponse[]
- Response 404: ProblemDetails

### POST /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/charges/grid/refresh
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; patientId: string, required
- Response 200: (no body)

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/charges/remove
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Request body: RemoveChargeAssemblyChargesRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/charges/reorder
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Request body: ReorderChargeAssemblyChargesRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/icn
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Request body: UpdateICNRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/institutional-details
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Request body: UpdateInstitutionalDetailsRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/lock-state
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Request body: UpdateLockStateRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/ownership
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Request body: UpdateOwnershipRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/payer-assemblies/{payerAssemblyId}/remit-details
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required; payerAssemblyId: string(uuid), required
- Request body: UpdatePayerAssemblyRemittanceDetailsRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/preview
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Response 200: ChargeAssemblyPreviewResponse
- Response 404: ProblemDetails

### POST /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/rebuild
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Response 200: (no body)

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/statuses/provisional
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; patientId: string, required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/statuses/refresh
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; patientId: string, required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/validation/status/pending
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; patientId: string, required
- Query params: force: boolean
- Request body: ValidationStatusUpdateRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /patients/{patientId}/charge-assemblies/{chargeAssemblyId}/validation/status/validated
- Tags: ChargeAssemblies
- Path params: chargeAssemblyId: string(uuid), required; patientId: string, required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /patients/{patientId}/charge-assemblies/patient-encounters/rebuild
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required
- Request body: object
- Response 200: (no body)

### PUT /patients/{patientId}/charge-assemblies/payer-assemblies-remit-details
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required
- Request body: UpdatePayerAssembliesRemittanceDetailsRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 400: ProblemDetails

### GET /patients/{patientId}/charge-assemblies/payer-assemblies/claims/{policyId}
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Response 200: ClaimPolicySearchResponse[]

### POST /patients/{patientId}/charge-assemblies/rebuild
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### POST /patients/{patientId}/charge-assemblies/search
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required
- Request body: object
- Response 200: PatientChargeAssemblyResponse[]

### POST /patients/{patientId}/charge-assemblies/split
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required
- Request body: SplitChargeAssemblyChargesRequest
- Response 200: SplitChargeAssemblyChargesResponse
- Response 404: ProblemDetails

### GET /patients/{patientId}/charge-assemblies/summary
- Tags: ChargeAssemblies
- Path params: patientId: string(uuid), required
- Response 200: PatientChargeAssembliesSummaryResponse

### GET /rules/behaviors
- Tags: Rules
- Response 200: KeyValuePairOfintAndstring[]

### POST /search/{chargeAssemblyId}/rebuild
- Tags: Search
- Path params: chargeAssemblyId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### POST /search/assemblies
- Tags: Search
- Request body: SearchRequest
- Response 200: SearchResponsePage
- Response 404: ProblemDetails

### POST /search/assemblies/download
- Tags: Search
- Request body: SearchRequest
- Response 200: FileContentResult
- Response 404: ProblemDetails

### POST /search/parameters
- Tags: Search
- Request body: SearchParameters
- Response 200: SearchParametersIdentityResponse

### GET /search/parameters/{searchId}
- Tags: Search
- Path params: searchId: string(uuid), required
- Response 200: SearchParameters
- Response 404: ProblemDetails

### GET /search/parameters/{searchId}/summary
- Tags: Search
- Path params: searchId: string(uuid), required
- Response 200: SearchParametersSummary
- Response 404: ProblemDetails

### POST /signalr/charge-assemblies/{chargeAssemblyId}/users/add
- Tags: Signalr
- Path params: chargeAssemblyId: string(uuid), required
- Response 200: (no body)

### POST /signalr/charge-assemblies/{chargeAssemblyId}/users/remove
- Tags: Signalr
- Path params: chargeAssemblyId: string(uuid), required
- Response 200: (no body)

### POST /signalr/chargeassemblies-hub/negotiate
- Tags: Signalr
- Response 200: (no body)

## Schemas

**AccountIdentity**
  - accountType: AccountType (required)
  - accountId: string(uuid) (required)

**AccountType**
  - (no properties)

**AddChargeAssemblyChargesRequest**
  - charges: string(uuid)[]

**AttributeQualifiers**
  - attributeType: AttributeType (required)
  - nullQualifier: boolean (required)
  - entityType: EntityType (required)
  - setQualifiers: SetQualifier[] (required)
  - elementQualifiers: ElementQualifier[] (required)

**AttributeType**
  - (no properties)

**BalanceAccountType**
  - (no properties)

**BillItemPreviewResponse**
  - billId: string(uuid) (required)
  - billNumber: string (required)
  - statusText: string (required)
  - statusDate: Date (required)
  - disposition: ['integer', 'string'](int32) (required)

**ChargeAssemblyActivityResponse**
  - renderedActivityId: string(uuid) (required)
  - activityCode: string (required)
  - activityCodeDescription: ['null', 'string'] (required)
  - status: ['integer', 'string'](int32) (required)
  - ndc: ['null', 'string'] (required)
  - units: object (required)
  - modifiers: string[] (required)
  - diagnosisCodes: string[] (required)

**ChargeAssemblyChargeResponse**
  - chargeId: string(uuid) (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - dateOfService: Date (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - locationId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - invalid: boolean (required)
  - voided: boolean (required)
  - suppressed: boolean (required)
  - complete: boolean (required)
  - chargeCode: string (required)
  - chargeCodeDescription: ['null', 'string'] (required)
  - dna: ChargeAssemblyDNA (required)
  - dnaHash: string (required)
  - attendingProviderId: ['null', 'string'](uuid) (required)
  - activityCode: ['null', 'string'] (required)
  - status: ['integer', 'string'](int32) (required)
  - subStatus: ['integer', 'string'](int32) (required)
  - fee: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - billingUnits: ['null', 'number', 'string'](double) (required)
  - units: object (required)
  - ndc: ['null', 'string'] (required)
  - modifiers: string[] (required)
  - diagnosisCodes: string[] (required)

**ChargeAssemblyDNA**
  - portfolioId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)

**ChargeAssemblyOwnershipResponse**
  - ownerId: ['null', 'string'](uuid) (required)
  - ownerName: ['null', 'string'] (required)
  - ownerColor: ['null', 'string'] (required)
  - summary: ['null', 'string'] (required)

**ChargeAssemblyPreviewResponse**
  - chargeAssemblyId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - patientName: string (required)
  - patientFAN: string (required)
  - patientDOB: Date (required)
  - chargeAssemblyNumber: string (required)
  - primaryPayer: ['null', 'string'] (required)
  - currentPayer: ['null', 'string'] (required)
  - currentPayerBalance: ['null', 'number', 'string'](double) (required)
  - dateRangeStart: object (required)
  - dateRangeEnd: object (required)
  - status: ChargeAssemblyStatus (required)
  - statusText: string (required)
  - payers: PayerAssemblyPreviewResponse[] (required)

**ChargeAssemblySearchResponse**
  - chargeAssemblyId: string(uuid) (required)
  - chargeAssemblyNumber: string (required)
  - status: ChargeAssemblyStatus (required)
  - validationStatus: ChargeAssemblyValidationStatus (required)
  - validationRuleId: ['null', 'string'](uuid) (required)
  - dateOfService: DisplayValueRecordOfDate (required)
  - patient: DisplayValueRecordOfGuid (required)
  - dateOfBirth: DisplayValueRecordOfDate (required)
  - lastFiled: DisplayValueRecordOfDate (required)
  - lastTouchedDate: ['null', 'string'](date-time) (required)
  - lastTouchDays: ['null', 'number', 'string'](double) (required)
  - lastTouchedUserId: ['null', 'string'](uuid) (required)
  - lastTouchType: DisplayValueRecordOfLastTouchType (required)
  - company: DisplayValueRecordOfGuid (required)
  - division: DisplayValueRecordOfGuid (required)
  - facility: DisplayValueRecordOfGuid (required)
  - provider: DisplayValueRecordOfGuid (required)
  - owner: DisplayValueRecordOfGuid (required)
  - primaryPayer: ['null', 'string'] (required)
  - primaryPayerType: LedgerAccountType (required)
  - primaryPayerAssemblyId: ['null', 'string'](uuid) (required)
  - currentPayer: ['null', 'string'] (required)
  - currentPayerType: LedgerAccountType (required)
  - currentPayerAssemblyId: ['null', 'string'](uuid) (required)
  - totalBalance: ['number', 'string'](double) (required)
  - insuranceBalance: ['number', 'string'](double) (required)
  - otherBalance: ['number', 'string'](double) (required)
  - patientBalance: ['number', 'string'](double) (required)
  - assistanceBalance: ['number', 'string'](double) (required)
  - insurance: ['null', 'string'] (required)
  - otherPayer: ['null', 'string'] (required)
  - assistancePayer: ['null', 'string'] (required)
  - rejectionMessage: ['null', 'string'] (required)
  - summary: ['null', 'string'] (required)
  - currentInvoice: object (required)
  - invoiceInProgress: boolean (required)
  - interventionTypes: ['null', 'string'] (required)
  - interventionTags: ['null', 'string'] (required)

**ChargeAssemblyStatus**
  - (no properties)

**ChargeAssemblyValidationRuleResponse**
  - ruleId: string(uuid) (required)
  - name: string (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - behaviorCategoryText: string (required)
  - description: ['null', 'string']
  - userGuidance: ['null', 'string']

**ChargeAssemblyValidationStatus**
  - (no properties)

**ChargeAssemblyWorkspaceResponse**
  - organizationId: string(uuid) (required)
  - chargeAssemblyId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - chargeAssemblyNumber: string (required)
  - status: ChargeAssemblyStatus (required)
  - statusText: string (required)
  - statusAdditionalText: ['null', 'string'] (required)
  - validationStatus: ChargeAssemblyValidationStatus (required)
  - validationStatusText: string (required)
  - validationRule: object (required)
  - primaryPayer: ['null', 'string'] (required)
  - primaryPlan: ['null', 'string'] (required)
  - currentPayer: ['null', 'string'] (required)
  - currentPlan: ['null', 'string'] (required)
  - balance: ['number', 'string'](double) (required)
  - dna: ChargeAssemblyDNA (required)
  - dnaHash: string (required)
  - canRelease: boolean (required)
  - ownership: object (required)
  - isUnlocked: boolean (required)
  - resources: ResourcesResponse (required)
  - institutionalDetails: InstitutionalDetails (required)
  - activities: ChargeAssemblyActivityResponse[] (required)
  - charges: ChargeAssemblyChargeResponse[] (required)
  - payerAssemblies: PayerAssemblyResponse[] (required)
  - inactivePayerAssemblies: PayerAssemblyResponse[] (required)
  - relatedAssemblies: RelatedChargeAssemblyResponse[] (required)
  - encounters: EncounterResponse[] (required)
  - renderedActivities: RenderedActivityGroupResponse[] (required)
  - scheduledActivities: ScheduledActivityGroupResponse[] (required)

**ChargeFinancials**
  - allowed: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - fee: ['number', 'string'](double) (required)

**ChargeGridItemResponse**
  - chargeId: string(uuid) (required)
  - activityCode: ['null', 'string'] (required)
  - chargeCode: string (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - amount: DisplayValueRecordOfdouble (required)
  - billingProvider: DisplayValueRecordOfGuid (required)
  - authorizations: DisplayValueRecordOfGuid[] (required)
  - billingUnits: DisplayValueRecordOfdecimal (required)
  - company: DisplayValueRecordOfGuid (required)
  - division: DisplayValueRecordOfGuid (required)
  - facility: DisplayValueRecordOfGuid (required)
  - financials: ChargeFinancials (required)
  - icdCodes: DisplayValueRecordOfIcdCodeRecord[] (required)
  - modifiers: DisplayValueRecordOfGuid[] (required)
  - ndc: DisplayValueRecordOfstring (required)
  - orderingProvider: DisplayValueRecordOfGuid (required)
  - procedureNote: ['null', 'string'] (required)
  - procedureDescription: ['null', 'string'] (required)
  - referringProvider: ['null', 'string'] (required)
  - supervisingProvider: DisplayValueRecordOfGuid (required)
  - supportingProviders: DisplayValueRecordOfGuid[] (required)
  - units: DisplayValueRecordOfGuid (required)

**ClaimEobAttachmentPreviewResponse**
  - attachmentId: ['null', 'string'](uuid) (required)
  - fileName: ['null', 'string'] (required)
  - checkNumber: string (required)
  - remittanceId: string(uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)

**ClaimItemPreviewResponse**
  - claimId: string(uuid) (required)
  - claimNumber: string (required)
  - claimType: ClaimType (required)
  - statusText: string (required)
  - statusDate: Date (required)
  - disposition: ['integer', 'string'](int32) (required)

**ClaimPolicySearchResponse**
  - claimId: string(uuid) (required)
  - chargeAssemblyId: string(uuid) (required)
  - payerAssemblyId: string(uuid) (required)
  - claimType: ['integer', 'string'](int32) (required)
  - dateOfService: Date (required)
  - claimNumber: ['null', 'string'] (required)
  - payerAssemblyBalance: ['null', 'number', 'string'](double) (required)
  - charges: string[] (required)

**ClaimType**
  - (no properties)

**CreateChargeAssemblyRequest**
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - portfolioId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - companyId: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - customPrefix: ['null', 'string']
  - charges: string(uuid)[]

**CreateChargeAssemblyResponse**
  - chargeAssemblyId: string(uuid) (required)

**CreateRuleRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualificationConfiguration: ['null', 'object'] (required)

**CreateSequenceRequest**
  - name: string (required)

**CurrentInvoiceResponse**
  - invoiceId: string(uuid) (required)
  - payerAssemblyId: ['null', 'string'](uuid) (required)
  - invoiceNumber: ['null', 'string'] (required)
  - invoiceType: ['integer', 'string'](int32) (required)
  - claimFrequency: ['null', 'integer', 'string'](int32) (required)
  - status: ['integer', 'string'](int32) (required)
  - statusDate: Date (required)
  - icn: ['null', 'string'] (required)
  - accountType: LedgerAccountType (required)
  - provisionalRule: ['null', 'string'] (required)

**Date**
  - (no properties)

**DisplayValueRecordOfDate**
  - currentValue: Date
  - displayValue: ['null', 'string']

**DisplayValueRecordOfdecimal**
  - currentValue: ['null', 'number', 'string'](double)
  - displayValue: ['null', 'string']

**DisplayValueRecordOfdouble**
  - currentValue: ['null', 'number', 'string'](double)
  - displayValue: ['null', 'string']

**DisplayValueRecordOfGuid**
  - currentValue: ['null', 'string'](uuid)
  - displayValue: ['null', 'string']

**DisplayValueRecordOfGuid[]**
  - currentValue: ['null', 'array']
  - displayValue: ['null', 'string']

**DisplayValueRecordOfIcdCodeRecord[]**
  - currentValue: ['null', 'array']
  - displayValue: ['null', 'string']

**DisplayValueRecordOfLastTouchType**
  - currentValue: LastTouchType
  - displayValue: ['null', 'string']

**DisplayValueRecordOfstring**
  - currentValue: ['null', 'string']
  - displayValue: ['null', 'string']

**ElementQualifier**
  - elementId: string (required)
  - exclusionary: boolean (required)

**EncounterResponse**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - locationId: string(uuid) (required)
  - locationName: ['null', 'string'] (required)
  - encounterNumber: ['null', 'string'] (required)
  - statusText: string (required)
  - attendingProvider: ['null', 'string'] (required)

**EntityTagHeaderValue**
  - tag: StringSegment
  - isWeak: boolean

**EntityType**
  - (no properties)

**EpisodeQualifier**
  - allEpisodes: boolean (required)
  - exclusionary: boolean (required)
  - episodeTypes: string(uuid)[] (required)
  - phases: string(uuid)[] (required)

**FileContentResult**
  - fileContents: string(byte)
  - contentType: ['null', 'string']
  - fileDownloadName: ['null', 'string']
  - lastModified: ['null', 'string'](date-time)
  - entityTag: object
  - enableRangeProcessing: boolean

**IcdCodeRecord**
  - icdCodeType: IcdCodeType
  - code: string

**IcdCodeType**
  - (no properties)

**InstitutionalDetails**
  - conditionCodes: string[] (required)
  - remarks: string[] (required)

**KeyValuePairOfintAndstring**
  - key: ['integer', 'string'](int32) (required)
  - value: ['null', 'string'] (required)

**LastTouchType**
  - (no properties)

**LedgerAccountType**
  - (no properties)

**NetType**
  - (no properties)

**PatientChargeAssembliesSearchRequest**
  - dateRangeStart: object (required)
  - dateRangeEnd: object (required)
  - dna: object (required)
  - policyId: ['null', 'string'](uuid) (required)

**PatientChargeAssembliesSummaryResponse**
  - patientId: string(uuid) (required)
  - totalBuilding: ['number', 'string'](double) (required)
  - totalOpenBalance: ['number', 'string'](double) (required)
  - totalClosedPaid: ['number', 'string'](double) (required)

**PatientChargeAssemblyResponse**
  - chargeAssemblyId: string(uuid) (required)
  - chargeAssemblyNumber: string (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - status: ChargeAssemblyStatus (required)
  - statusText: string (required)
  - statusAdditionalText: ['null', 'string'] (required)
  - charges: string[] (required)
  - primaryPayerAccount: object (required)
  - primaryPayer: ['null', 'string'] (required)
  - primaryPlan: ['null', 'string'] (required)
  - currentPayerAccount: object (required)
  - currentPayer: ['null', 'string'] (required)
  - currentPayerBalance: ['number', 'string'](double) (required)
  - insuranceBalance: ['number', 'string'](double) (required)
  - assistanceBalance: ['number', 'string'](double) (required)
  - guarantorBalance: ['number', 'string'](double) (required)
  - totalBalance: ['number', 'string'](double) (required)
  - totalPaid: ['number', 'string'](double) (required)
  - openWithPrimary: boolean (required)
  - openWithSecondary: boolean (required)
  - openWithPayer: boolean (required)
  - openWithSNF: boolean (required)
  - openWithAssistance: boolean (required)
  - openWithGuarantor: boolean (required)
  - resources: object (required)
  - payerAssemblies: PayerAssemblyResponse[] (required)

**PatientChargeRequest**
  - patientId: string(uuid) (required)
  - chargeId: string(uuid) (required)

**PatientEncounterIdentity**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - locationId: string(uuid) (required)

**PayerAccount**
  - accountType: AccountType
  - payerId: ['null', 'string'](uuid)
  - planId: ['null', 'string'](uuid)
  - policyId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - guarantorId: ['null', 'string'](uuid)
  - isAssistanceAccount: boolean
  - id: AccountIdentity
  - accountId: string(uuid)

**PayerAssemblyBillResponse**
  - billId: string(uuid) (required)
  - billNumber: string (required)
  - status: ['integer', 'string'](int32) (required)
  - firstStatementDate: object (required)
  - lastStatementDate: object (required)
  - chargeCount: ['integer', 'string'](int32) (required)

**PayerAssemblyChargeResponse**
  - chargeId: string(uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - chargeCodeDescription: ['null', 'string'] (required)
  - order: ['integer', 'string'](int32) (required)
  - invalid: boolean (required)
  - suppressed: boolean (required)
  - voided: boolean (required)
  - hasActiveInterventions: boolean (required)
  - hasSnoozedInterventions: boolean (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - allowed: ['number', 'string'](double) (required)
  - expected: ['number', 'string'](double) (required)
  - adjusted: ['number', 'string'](double) (required)
  - userAdjusted: ['number', 'string'](double) (required)
  - transferred: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - isCovered: boolean (required)
  - modifiers: string[] (required)

**PayerAssemblyClaimResponse**
  - claimId: string(uuid) (required)
  - claimNumber: string (required)
  - claimType: ['integer', 'string'](int32) (required)
  - status: ['integer', 'string'](int32) (required)
  - statusDate: Date (required)
  - statusAge: ['integer', 'string'](int32) (required)
  - disposition: ['null', 'integer', 'string'](int32) (required)
  - sentDate: object (required)
  - chargeCount: ['integer', 'string'](int32) (required)

**PayerAssemblyPreviewResponse**
  - payerAssemblyId: string(uuid) (required)
  - payerResponsibilityIndex: ['integer', 'string'](int32) (required)
  - accountType: AccountType (required)
  - payerName: ['null', 'string'] (required)
  - plan: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - snf: ['null', 'string'] (required)
  - snfFacility: ['null', 'string'] (required)
  - assistance: ['null', 'string'] (required)
  - assistanceService: ['null', 'string'] (required)
  - guarantor: ['null', 'string'] (required)
  - paid: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - claims: ['null', 'array'] (required)
  - bills: ['null', 'array'] (required)
  - claimEobAttachments: ['null', 'array'] (required)

**PayerAssemblyRemittanceDetails**
  - chargeAssemblyId: string(uuid) (required)
  - payerAssemblyId: string(uuid) (required)
  - icn: string (required)
  - checkDate: object

**PayerAssemblyRemittanceResponse**
  - attachmentId: ['null', 'string'](uuid) (required)
  - fileName: ['null', 'string'] (required)
  - claimPaymentId: string(uuid) (required)
  - remittanceId: ['null', 'string'](uuid) (required)
  - checkNumber: string (required)
  - receivedDate: Date (required)
  - isCheckNumberLink: boolean (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)

**PayerAssemblyResponse**
  - payerAssemblyId: string(uuid) (required)
  - payerAssemblyNumber: string (required)
  - order: ['integer', 'string'](int32) (required)
  - account: PayerAccount (required)
  - status: PayerAssemblyStatus (required)
  - icn: ['null', 'string'] (required)
  - checkDate: object (required)
  - payer: ['null', 'string'] (required)
  - plan: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - snf: ['null', 'string'] (required)
  - snfFacility: ['null', 'string'] (required)
  - guarantor: ['null', 'string'] (required)
  - billed: ['number', 'string'](double) (required)
  - paid: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - charges: PayerAssemblyChargeResponse[] (required)
  - claims: PayerAssemblyClaimResponse[] (required)
  - bills: PayerAssemblyBillResponse[] (required)
  - remittances: PayerAssemblyRemittanceResponse[] (required)
  - coveredCharges: string(uuid)[] (required)

**PayerAssemblyStatus**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**QualifierHeader**
  - attributeType: AttributeType (required)
  - entityType: EntityType (required)
  - id: string (required)
  - isSet: boolean (required)
  - exclusionary: boolean (required)

**RelatedChargeAssemblyResponse**
  - chargeAssemblyId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - chargeAssemblyNumber: string (required)
  - status: ChargeAssemblyStatus (required)
  - statusText: string (required)
  - statusAdditionalText: ['null', 'string'] (required)
  - primaryPayer: ['null', 'string'] (required)
  - primaryPlan: ['null', 'string'] (required)
  - currentPayer: ['null', 'string'] (required)
  - charges: string[] (required)
  - balance: ['number', 'string'](double) (required)

**ReleaseType**
  - (no properties)

**RemoveChargeAssemblyChargesRequest**
  - charges: string(uuid)[]

**RenderedActivityGroupResponse**
  - attendingProviderId: ['null', 'string'](uuid) (required)
  - attendingProvider: ['null', 'string'] (required)
  - appointmentTypeId: ['null', 'string'](uuid) (required)
  - appointmentType: ['null', 'string'] (required)
  - renderedActivities: RenderedActivityResponse[] (required)

**RenderedActivityResponse**
  - renderedActivityId: string(uuid) (required)
  - activityCode: ['null', 'string'] (required)
  - activityCodeDescription: ['null', 'string'] (required)
  - statusText: ['null', 'string'] (required)

**ReorderChargeAssemblyChargesRequest**
  - charges: string(uuid)[]

**ResourcesResponse**
  - company: ['null', 'string'] (required)
  - facility: ['null', 'string'] (required)
  - division: ['null', 'string'] (required)
  - renderingProvider: ['null', 'string'] (required)

**RuleAction**
  - (no properties)

**RuleHeader**
  - ruleId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - order: ['integer', 'string'](int32) (required)

**RuleOrder**
  - ruleId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)

**RuleResponse**
  - sequenceId: string(uuid) (required)
  - ruleId: string(uuid) (required)
  - name: string (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - netType: NetType (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - startDate: object (required)
  - endDate: object (required)
  - episodeQualifier: object (required)
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualificationConfiguration: ['null', 'object'] (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - createdByUserId: ['null', 'string'](uuid) (required)
  - createdDate: string(date-time) (required)
  - lastModifiedByUserId: ['null', 'string'](uuid) (required)
  - lastModifiedDate: string(date-time) (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - reviewRequired: boolean

**RuleSummaryResponse**
  - ruleId: string(uuid) (required)
  - sequenceId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualifiers: QualifierHeader[] (required)
  - sameDateOfServiceQualifiers: QualifierHeader[] (required)

**ScheduledActivityGroupResponse**
  - attendingProviderId: ['null', 'string'](uuid) (required)
  - attendingProvider: ['null', 'string'] (required)
  - appointmentTypeId: ['null', 'string'](uuid) (required)
  - appointmentType: ['null', 'string'] (required)
  - order: ['integer', 'string'](int32) (required)
  - scheduledActivities: ScheduledActivityResponse[] (required)

**ScheduledActivityResponse**
  - scheduledActivityId: string(uuid) (required)
  - activityType: ['null', 'string'] (required)
  - appointmentTime: ['null', 'string'](date-time) (required)
  - duration: string (required)
  - facility: ['null', 'string'] (required)

**SearchInvoiceStatus**
  - (no properties)

**SearchParameters**
  - financialAccountNumber: ['null', 'string']
  - lastName: ['null', 'string']
  - firstName: ['null', 'string']
  - dateOfBirth: object
  - chargeAssemblyNumber: ['null', 'string']
  - statuses: ChargeAssemblyStatus[]
  - checkNumber: ['null', 'string']
  - dateOfServiceFrom: object
  - dateOfServiceTo: object
  - balanceAccountType: BalanceAccountType
  - outstandingBalanceMin: ['null', 'number', 'string'](double)
  - outstandingBalanceMax: ['null', 'number', 'string'](double)
  - policyNumber: ['null', 'string']
  - invoiceStatuses: SearchInvoiceStatus[]
  - invoiceNumber: ['null', 'string']
  - icn: ['null', 'string']
  - lastFiledFrom: object
  - lastFiledTo: object
  - rejectionMessage: ['null', 'string']
  - summary: ['null', 'string']
  - activityCode: ['null', 'string']
  - chargeCode: ['null', 'string']
  - lastTouchedDaysMin: ['null', 'integer', 'string'](int32)
  - lastTouchedDaysMax: ['null', 'integer', 'string'](int32)
  - modifiers: string(uuid)[]
  - diagnosisCodes: IcdCodeRecord[]
  - companies: string(uuid)[]
  - divisions: string(uuid)[]
  - facilities: string(uuid)[]
  - providers: string(uuid)[]
  - owners: string(uuid)[]
  - primaryPayers: string(uuid)[]
  - primaryPlans: string(uuid)[]
  - currentPayers: string(uuid)[]
  - currentPlans: string(uuid)[]
  - rules: string(uuid)[]
  - sortColumn: SearchSortColumn
  - sortOrder: SortOrder
  - maxNumberOfResults: ['integer', 'string'](int32)
  - interventionTypes: string(uuid)[]
  - interventionTags: string(uuid)[]
  - hideSnoozedInterventions: boolean

**SearchParametersIdentityResponse**
  - searchId: string(uuid) (required)

**SearchParametersSummary**
  - financialAccountNumber: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - chargeAssemblyNumber: ['null', 'string'] (required)
  - statuses: ChargeAssemblyStatus[] (required)
  - checkNumber: ['null', 'string'] (required)
  - dateOfServiceFrom: object (required)
  - dateOfServiceTo: object (required)
  - companies: string[] (required)
  - divisions: string[] (required)
  - facilities: string[] (required)
  - providers: string[] (required)
  - owners: string[] (required)
  - lastTouchedDaysMin: ['null', 'string'] (required)
  - lastTouchedDaysMax: ['null', 'string'] (required)
  - primaryPayers: string[] (required)
  - primaryPlans: string[] (required)
  - currentPayers: string[] (required)
  - currentPlans: string[] (required)
  - balanceAccountType: BalanceAccountType (required)
  - outstandingBalanceMin: ['null', 'number', 'string'](double) (required)
  - outstandingBalanceMax: ['null', 'number', 'string'](double) (required)
  - policyNumber: ['null', 'string'] (required)
  - invoiceNumber: ['null', 'string'] (required)
  - icn: ['null', 'string'] (required)
  - lastFiledFrom: object (required)
  - lastFiledTo: object (required)
  - rules: string[] (required)
  - invoiceStatuses: SearchInvoiceStatus[] (required)
  - rejectionMessage: ['null', 'string'] (required)
  - summary: ['null', 'string'] (required)
  - activityCode: ['null', 'string'] (required)
  - chargeCode: ['null', 'string'] (required)
  - modifiers: string[] (required)
  - diagnosisCodes: string[] (required)
  - sortColumn: SearchSortColumn (required)
  - sortOrder: SortOrder (required)
  - maxNumberOfResults: ['integer', 'string'](int32) (required)
  - interventionTypes: string[] (required)
  - interventionTags: string[] (required)
  - hideSnoozedInterventions: boolean (required)

**SearchRequest**
  - searchId: string(uuid)
  - currentDate: string(date-time)

**SearchResponsePage**
  - chargeAssemblies: ChargeAssemblySearchResponse[] (required)
  - continuationToken: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)

**SearchSortColumn**
  - (no properties)

**SequenceOrder**
  - sequenceId: string(uuid) (required)
  - status: SequenceStatus (required)
  - order: ['integer', 'string'](int32) (required)

**SequenceResponse**
  - sequenceId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: ['null', 'string'] (required)
  - sequenceStatus: SequenceStatus (required)
  - createdByUserId: ['null', 'string'](uuid) (required)
  - createdDate: string(date-time) (required)
  - lastModifiedByUserId: ['null', 'string'](uuid) (required)
  - lastModifiedDate: string(date-time) (required)
  - rules: RuleHeader[] (required)

**SequenceStatus**
  - (no properties)

**SetQualifier**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**SortOrder**
  - (no properties)

**SplitChargeAssemblyChargesRequest**
  - sourceChargeAssemblyId: string(uuid) (required)
  - destinationChargeAssemblyId: ['null', 'string'](uuid)
  - charges: string(uuid)[]

**SplitChargeAssemblyChargesResponse**
  - sourceChargeAssemblyId: string(uuid) (required)
  - destinationChargeAssemblyId: ['null', 'string'](uuid) (required)
  - chargesSuccessfullyRemoved: boolean (required)
  - chargesSuccessfullyAdded: boolean (required)

**StringSegment**
  - buffer: ['null', 'string']
  - offset: ['integer', 'string'](int32)
  - length: ['integer', 'string'](int32)
  - value: ['null', 'string']
  - hasValue: boolean

**UnitsResponse**
  - unitsOfMeasure: ['null', 'string'](uuid) (required)
  - unitsOfMeasureText: ['null', 'string'] (required)
  - quantity: ['null', 'number', 'string'](double) (required)

**UpdateICNRequest**
  - payerAssemblyId: string(uuid) (required)
  - icn: string (required)

**UpdateInstitutionalDetailsRequest**
  - conditionCodes: string[]
  - remarks: string[]

**UpdateLockStateRequest**
  - isUnlocked: boolean (required)

**UpdateOwnershipRequest**
  - ownerId: ['null', 'string'](uuid) (required)
  - summary: ['null', 'string'] (required)

**UpdatePayerAssembliesRemittanceDetailsRequest**
  - sourcePayerAssembly: PayerAssemblyRemittanceDetails (required)
  - targetPayerAssembly: PayerAssemblyRemittanceDetails (required)

**UpdatePayerAssemblyRemittanceDetailsRequest**
  - icn: string (required)
  - checkDate: object (required)

**UpdateRuleRequest**
  - ruleId: string(uuid) (required)
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)
  - qualificationConfiguration: ['null', 'object'] (required)

**UpdateSequenceRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - enabled: boolean (required)

**ValidationStatusUpdateRequest**
  - ruleId: string(uuid) (required)

