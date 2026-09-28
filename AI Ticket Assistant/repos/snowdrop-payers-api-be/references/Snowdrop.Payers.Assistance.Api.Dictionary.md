﻿# Snowdrop.Payers.Assistance.Api - API Dictionary

Repo: snowdrop-payers-api-be
Source: Snowdrop.Payers.Assistance.Api.json

## Endpoints

### GET /payers/aggregate
- Tags: AggregatePayers
- Response 200: PayerResponseSlim[]

### GET /payers/aggregate/{payerId}
- Tags: AggregatePayers
- Path params: payerId: string(uuid), required
- Response 200: AggregatePayerResponse

### GET /payers/assistance
- Tags: AssistancePayers
- Response 200: AssistancePayerResponseSlim[]

### POST /payers/assistance
- Tags: AssistancePayers
- Request body: CreateAssistancePayerRequest
- Response 200: PayerIdResponse

### GET /payers/assistance/{payerId}
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Response 200: AssistancePayerResponse

### POST /payers/assistance/{payerId}
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Request body: CreateAssistancePayerRequest
- Response 200: PayerIdResponse

### PUT /payers/assistance/{payerId}
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Request body: UpdateAssistancePayerRequest
- Response 200: (no body)

### GET /payers/assistance/{payerId}/contracts
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Response 200: ContractResponseSlim[]

### POST /payers/assistance/{payerId}/contracts
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractCreateRequest
- Response 200: ContractUpsertResponse

### GET /payers/assistance/{payerId}/contracts/{contractId}
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Response 200: ContractResponse

### DELETE /payers/assistance/{payerId}/contracts/{contractId}
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/{contractId}/divisions
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/facilities
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/foundation/divisions
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/foundation/facilities
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/foundation/plans
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/foundation/providers
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/manufacturer/divisions
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/manufacturer/facilities
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/manufacturer/plans
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/manufacturer/providers
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/otherassistance/divisions
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/otherassistance/facilities
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/otherassistance/plans
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/otherassistance/providers
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/plans
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/providers
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/restore
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/contracts/{contractId}/snfs
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### POST /payers/assistance/{payerId}/contracts/{contractId}/thresholds
- Tags: DelinquencyThresholds
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: DelinquencyThresholdsCreateRequest
- Response 200: (no body)

### GET /payers/assistance/{payerId}/contracts/{contractId}/thresholds/{claimType}
- Tags: DelinquencyThresholds
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; claimType: ['integer', 'string'](int32), required
- Response 200: DelinquencyThresholdsResponse

### PUT /payers/assistance/{payerId}/contracts/{contractId}/thresholds/{claimType}
- Tags: DelinquencyThresholds
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; claimType: ['integer', 'string'](int32), required
- Request body: DelinquencyThresholdsUpdateRequest
- Response 200: (no body)

### POST /payers/assistance/{payerId}/contracts/by-name
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractSearchByNameRequest
- Response 200: ContractIdResponse

### GET /payers/assistance/{payerId}/contracts/company/{companyId}
- Tags: Contracts
- Path params: payerId: string(uuid), required; companyId: string(uuid), required
- Response 200: ContractResponseSlim[]

### PUT /payers/assistance/{payerId}/contracts/company/{companyId}/order
- Tags: Contracts
- Path params: payerId: string(uuid), required; companyId: string(uuid), required
- Request body: CollectionOrderingRequestBase
- Response 200: (no body)

### GET /payers/assistance/{payerId}/contracts/discarded
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Response 200: ContractResponseSlim[]

### POST /payers/assistance/{payerId}/contracts/foundation
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractCreateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/foundation/{contractId}/effective-dates
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractEffectiveUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/foundation/{contractId}/fromchargemaster-multiplier
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractChargemasterMultiplierRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/foundation/{contractId}/name
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNameUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/foundation/{contractId}/network
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNetworkUpdateRequest
- Response 200: ContractUpsertResponse

### POST /payers/assistance/{payerId}/contracts/manufacturer
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractCreateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/manufacturer/{contractId}/effective-dates
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractEffectiveUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/manufacturer/{contractId}/fromchargemaster-multiplier
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractChargemasterMultiplierRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/manufacturer/{contractId}/name
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNameUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/manufacturer/{contractId}/network
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNetworkUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/order
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: CollectionOrderingRequestBase
- Response 200: (no body)

### POST /payers/assistance/{payerId}/contracts/otherassistance
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractCreateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/otherassistance/{contractId}/effective-dates
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractEffectiveUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/otherassistance/{contractId}/fromchargemaster-multiplier
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractChargemasterMultiplierRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/otherassistance/{contractId}/name
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNameUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/contracts/otherassistance/{contractId}/network
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNetworkUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/assistance/{payerId}/foundation/change-name
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerNameRequest
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/manufacturer/change-name
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerNameRequest
- Response 200: (no body)

### PUT /payers/assistance/{payerId}/other/change-name
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerNameRequest
- Response 200: (no body)

### GET /payers/assistance/{payerId}/payer-type
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Response 200: PayerType

### GET /payers/assistance/{payerId}/programs
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Response 200: AssistancePayerProgramsResponse

### POST /payers/assistance/checkpayername
- Tags: AssistancePayers
- Request body: CheckPayerNameRequest
- Response 200: PayerNameCheckResponse

### PUT /payers/assistance/eligibilityconfig/{payerId}
- Tags: AssistancePayers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerEligibilityConfigRequest
- Response 200: (no body)

### POST /payers/assistance/programs
- Tags: Programs
- Request body: CreateAssistanceProgramRequest
- Response 200: PlanIdResponse

### GET /payers/assistance/programs/{id}/keywords
- Tags: ProgramsKeywords
- Path params: id: string(uuid), required
- Response 200: PlanKeyword[]

### POST /payers/assistance/programs/{id}/keywords
- Tags: ProgramsKeywords
- Path params: id: string(uuid), required
- Request body: PlanKeywordRequest
- Response 200: PlanKeywordIdResponse

### GET /payers/assistance/programs/{id}/keywords/{keywordId}
- Tags: ProgramsKeywords
- Path params: id: string(uuid), required; keywordId: string(uuid), required
- Response 200: PlanKeyword

### POST /payers/assistance/programs/{id}/keywords/{keywordId}
- Tags: ProgramsKeywords
- Path params: id: string(uuid), required; keywordId: string(uuid), required
- Request body: PlanKeywordRequest
- Response 200: PlanKeywordIdResponse

### PUT /payers/assistance/programs/{id}/keywords/{keywordId}
- Tags: ProgramsKeywords
- Path params: id: string(uuid), required; keywordId: string(uuid), required
- Request body: PlanKeywordRequest
- Response 200: (no body)

### DELETE /payers/assistance/programs/{id}/keywords/{keywordId}
- Tags: ProgramsKeywords
- Path params: id: string(uuid), required; keywordId: string(uuid), required
- Response 200: (no body)

### PUT /payers/assistance/programs/{id}/keywords/order
- Tags: ProgramsKeywords
- Path params: id: string(uuid), required
- Request body: PlanKeywordOrderingRequest
- Response 200: (no body)

### GET /payers/assistance/programs/{planId}
- Tags: Programs
- Path params: planId: string(uuid), required
- Response 200: ProgramResponse

### POST /payers/assistance/programs/{planId}
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: CreateAssistanceProgramRequest
- Response 200: PlanIdResponse

### PUT /payers/assistance/programs/{planId}
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: UpdateAssistanceProgramRequest
- Response 200: (no body)

### DELETE /payers/assistance/programs/{planId}
- Tags: Programs
- Path params: planId: string(uuid), required
- Response 200: (no body)

### PUT /payers/assistance/programs/{planId}/address
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: UpdatePlanAddressRequest
- Response 200: (no body)

### POST /payers/assistance/programs/{planId}/assistance-program-websites
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: AddAssistanceProgramWebsitesRequest
- Response 200: AssistanceProgramWebsiteIdResponse

### PUT /payers/assistance/programs/{planId}/assistance-program-websites/{assistancewebsiteId}
- Tags: Programs
- Path params: planId: string(uuid), required; assistancewebsiteId: string(uuid), required
- Request body: UpdateAssistanceWebsiteRequest
- Response 200: AssistanceProgramWebsiteIdResponse

### DELETE /payers/assistance/programs/{planId}/assistance-program-websites/{assistancewebsiteId}
- Tags: Programs
- Path params: planId: string(uuid), required; assistancewebsiteId: string(uuid), required
- Response 200: AssistanceProgramWebsiteIdResponse

### PUT /payers/assistance/programs/{planId}/assistance-program-websites/order
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: OrderingRequest
- Response 200: (no body)

### PUT /payers/assistance/programs/{planId}/change-legal-name
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: UpdateLegalNameRequest
- Response 200: (no body)

### PUT /payers/assistance/programs/{planId}/change-plan-name
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: UpdatePlanNameRequest
- Response 200: (no body)

### PUT /payers/assistance/programs/{planId}/change-plan-type
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: UpdatePlanTypeRequest
- Response 200: (no body)

### POST /payers/assistance/programs/{planId}/contactpoints
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: AddPlanContactPointRequest
- Response 200: PlanContactPointIdResponse

### PUT /payers/assistance/programs/{planId}/contactpoints/{planContactPointId}
- Tags: Programs
- Path params: planId: string(uuid), required; planContactPointId: string(uuid), required
- Request body: UpdatePlanContactPointRequest
- Response 200: PlanContactPointIdResponse

### DELETE /payers/assistance/programs/{planId}/contactpoints/{planContactPointId}
- Tags: Programs
- Path params: planId: string(uuid), required; planContactPointId: string(uuid), required
- Response 200: PlanContactPointIdResponse

### PUT /payers/assistance/programs/{planId}/contactpoints/order
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: OrderingRequest
- Response 200: (no body)

### POST /payers/assistance/programs/{planId}/contactpoints/revert
- Tags: Programs
- Path params: planId: string(uuid), required
- Response 200: PlanContactPoint[]

### POST /payers/assistance/programs/{planId}/covered-services
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: AssistanceProgramCoveredService[]
- Response 200: (no body)

### PUT /payers/assistance/programs/{planId}/reassign-plan
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: ReassignPayerRequest
- Response 200: (no body)

### PUT /payers/assistance/programs/{planId}/undelete
- Tags: Programs
- Path params: planId: string(uuid), required
- Response 200: (no body)

### POST /payers/assistance/programs/checkprogramname
- Tags: Programs
- Request body: CheckPlanNameRequest
- Response 200: PlanNameCheckResponse

### GET /payers/assistance/programs/eligibilityconfig/{planId}
- Tags: Programs
- Path params: planId: string(uuid), required
- Response 200: PlanEligibilityConfigurationResponse

### PUT /payers/assistance/programs/eligibilityconfig/{planId}
- Tags: Programs
- Path params: planId: string(uuid), required
- Request body: UpdatePlanEligibilityConfigRequest
- Response 200: (no body)

### GET /payers/assistance/programs/programs-by-payer/{payerType}
- Tags: Programs
- Path params: payerType: PayerType, required
- Query params: query: string; top: ['integer', 'string'](int32)
- Response 200: ProgramSearchResponse[]

### PUT /payers/assistance/support/change-payer-type/{payerId}/{payerType}
- Tags: Support
- Path params: payerId: string(uuid), required; payerType: PayerType, required
- Response 200: (no body)

### PUT /payers/assistance/support/change-plan-payer-type/{planId}/{payerType}
- Tags: Support
- Path params: planId: string(uuid), required; payerType: PayerType, required
- Response 200: (no body)

### PUT /payers/assistance/support/update-plan-search/{planId}
- Tags: Support
- Path params: planId: string(uuid), required
- Response 200: (no body)

## Schemas

**AddAssistanceProgramWebsitesRequest**
  - websiteTypeId: string(uuid)
  - webAddress: ['null', 'string']
  - description: ['null', 'string']

**AddPlanContactPointRequest**
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)

**AggregatePayerResponse**
  - payerId: string(uuid)
  - name: PayerName
  - classification: PayerClassification
  - payerType: PayerType
  - payerStatus: PayerStatus
  - plans: ['null', 'array']
  - programs: ['null', 'array']
  - policyCount: ['integer', 'string'](int32)
  - awardCount: ['integer', 'string'](int32)
  - activePlanCount: ['integer', 'string'](int32)
  - activeProgramCount: ['integer', 'string'](int32)
  - inactivePlanCount: ['integer', 'string'](int32)
  - inactiveProgramCount: ['integer', 'string'](int32)
  - isInactive: boolean
  - contactPoints: ['null', 'array']
  - autoAdjustmentReasonId: ['null', 'string'](uuid)
  - autoAdjustmentReasonType: object

**AssistancePayerProgramResponse**
  - programId: string(uuid)
  - programName: string
  - programSharpId: string
  - awardCount: ['integer', 'string'](int32)
  - isInactive: boolean
  - payerId: ['null', 'string'](uuid)
  - coveredServices: AssistanceProgramCoveredService[]

**AssistancePayerProgramResponseSlim**
  - programId: string(uuid)
  - programName: ['null', 'string']
  - programSharpId: ['null', 'string']
  - awardCount: ['integer', 'string'](int32)
  - isInactive: boolean
  - payerId: ['null', 'string'](uuid)

**AssistancePayerProgramsResponse**
  - awardCount: ['integer', 'string'](int32)
  - programs: ['null', 'array']

**AssistancePayerResponse**
  - payerId: string(uuid)
  - name: PayerName
  - payerType: PayerType
  - payerStatus: PayerStatus
  - programs: ['null', 'array']
  - awardCount: ['integer', 'string'](int32)
  - activeProgramCount: ['integer', 'string'](int32)
  - inactiveProgramCount: ['integer', 'string'](int32)
  - isInactive: boolean

**AssistancePayerResponseSlim**
  - payerId: ['null', 'string'](uuid)
  - payerName: ['null', 'string']
  - programs: ['null', 'array']
  - awardCount: ['integer', 'string'](int32)
  - activeProgramCount: ['integer', 'string'](int32)
  - inactiveProgramCount: ['integer', 'string'](int32)
  - isInactive: boolean
  - payerType: PayerType

**AssistanceProgramCoveredService**
  - assistanceProgramCoveredServiceId: string(uuid) (required)
  - chargeCode: AssistanceProgramCoveredServiceChargeCodeCriteria (required)
  - activityCode: object
  - modifier: object
  - ndc: object
  - diagnosis: object

**AssistanceProgramCoveredServiceActivityCodeCriteria**
  - elementId: ['null', 'string']
  - setId: ['null', 'string'](uuid)
  - isFactorySet: boolean

**AssistanceProgramCoveredServiceChargeCodeCriteria**
  - elementId: ['null', 'string']
  - setId: ['null', 'string'](uuid)
  - isFactorySet: boolean

**AssistanceProgramCoveredServiceDiagnosisCriteria**
  - elementId: object
  - setId: ['null', 'string'](uuid)
  - isFactorySet: boolean

**AssistanceProgramCoveredServiceModifierCriteria**
  - elementId: ['null', 'string'](uuid)
  - setId: ['null', 'string'](uuid)
  - isFactorySet: boolean

**AssistanceProgramCoveredServiceNdcCriteria**
  - elementId: ['null', 'string']
  - setId: ['null', 'string'](uuid)
  - isFactorySet: ['null', 'boolean']

**AssistanceProgramWebsite**
  - assistanceProgramWebsiteId: string(uuid)
  - websiteTypeId: string(uuid)
  - webAddress: ['null', 'string']
  - description: ['null', 'string']
  - isDeleted: boolean
  - timeStamp: string(date-time)

**AssistanceProgramWebsiteIdResponse**
  - assistanceProgramWebsiteId: string(uuid)

**AutoAdjustmentReasonTypes**
  - (no properties)

**CheckPayerNameRequest**
  - payerName: ['null', 'string']
  - payerType: PayerType

**CheckPlanNameRequest**
  - planName: ['null', 'string']
  - payerId: ['null', 'string'](uuid)

**CollectionOrderingRequestBase**
  - order: ['null', 'array']

**ContactPointType**
  - (no properties)

**ContractAssociation**
  - all: boolean
  - ids: ['null', 'array']

**ContractChargemasterMultiplierRequest**
  - chargemasterMultiplier: ['number', 'string'](double) (required)

**ContractCreateRequest**
  - name: ['null', 'string']
  - companyId: string(uuid)
  - inNetwork: boolean
  - effectiveStartDate: object
  - effectiveEndDate: object
  - feeScheduleType: FeeScheduleType
  - chargemasterMultiplier: ['number', 'string'](double)

**ContractDelinquencyThresholds**
  - isDeleted: boolean
  - timeStamp: string(date-time)

**ContractEffectiveUpdateRequest**
  - effectiveStartDate: object
  - effectiveEndDate: object

**ContractFeeScheduleResponse**
  - feeScheduleId: string(uuid) (required)
  - fromChargemasterId: ['null', 'string'](uuid) (required)
  - globalFeeScheduleId: ['null', 'string'](uuid) (required)
  - globalFeeScheduleMultiplier: ['null', 'number', 'string'](double) (required)
  - globalFeeScheduleName: ['null', 'string'] (required)
  - name: ['null', 'string'] (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - isDeleted: boolean (required)

**ContractIdResponse**
  - contractId: ['null', 'string'](uuid)

**ContractNameUpdateRequest**
  - name: ['null', 'string']

**ContractNetworkUpdateRequest**
  - inNetwork: boolean

**ContractResponse**
  - plans: ContractAssociation
  - divisions: ContractAssociation
  - providers: ContractAssociation
  - facilities: ContractAssociation
  - skilledNursingFacilities: ContractAssociation
  - feeSchedules: ['null', 'array']
  - deliquencySettings: ['null', 'array']
  - contractId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - name: ['null', 'string']
  - companyId: string(uuid)
  - inNetwork: boolean
  - effectiveStartDate: object
  - effectiveEndDate: object
  - feeScheduleType: FeeScheduleType
  - chargeMasterMultiplier: ['number', 'string'](double)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**ContractResponseSlim**
  - contractId: string(uuid)
  - name: ['null', 'string']
  - companyId: string(uuid)
  - inNetwork: boolean
  - effectiveStartDate: object
  - effectiveEndDate: object
  - isDeleted: boolean
  - feeScheduleType: FeeScheduleType
  - chargeMasterMultiplier: ['number', 'string'](double)

**ContractSearchByNameRequest**
  - name: ['null', 'string']

**ContractUpdateRequest**
  - name: ['null', 'string']
  - companyId: string(uuid)
  - inNetwork: boolean
  - effectiveStartDate: object
  - effectiveEndDate: object
  - plans: ContractAssociation
  - divisions: ContractAssociation
  - providers: ContractAssociation
  - facilities: ContractAssociation
  - skilledNursingFacilities: ContractAssociation

**ContractUpsertResponse**
  - contractId: string(uuid)

**CreateAssistancePayerRequest**
  - name: PayerName
  - payerType: PayerType

**CreateAssistanceProgramRequest**
  - payer: PlanPayerId
  - name: PlanName
  - legalName: PlanLegalName
  - sharpId: ['null', 'string']

**Date**
  - (no properties)

**DelinquencyThresholdsCreateRequest**
  - claimType: ['integer', 'string'](int32)
  - claimTypeTitle: ['null', 'string']
  - claimSentDays: ['integer', 'string'](int32)
  - claimAcknowledgedDays: ['integer', 'string'](int32)
  - claimAcceptedDays: ['integer', 'string'](int32)
  - claimSentStatusCheck: boolean
  - claimAcknowledgedStatusCheck: boolean
  - claimAcceptedStatusCheck: boolean

**DelinquencyThresholdsResponse**
  - claimType: ['integer', 'string'](int32)
  - claimSentDays: ['integer', 'string'](int32)
  - claimAcknowledgedDays: ['integer', 'string'](int32)
  - claimAcceptedDays: ['integer', 'string'](int32)
  - claimSentStatusCheck: boolean
  - claimAcknowledgedStatusCheck: boolean
  - claimAcceptedStatusCheck: boolean

**DelinquencyThresholdsUpdateRequest**
  - claimSentDays: ['integer', 'string'](int32)
  - claimAcknowledgedDays: ['integer', 'string'](int32)
  - claimAcceptedDays: ['integer', 'string'](int32)
  - claimSentStatusCheck: boolean
  - claimAcknowledgedStatusCheck: boolean
  - claimAcceptedStatusCheck: boolean

**FeeScheduleType**
  - (no properties)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**ManufacturerCopayProgramPayerInfo**
  - copayProgramCount: ['integer', 'string'](int32)
  - totalAwardCount: ['integer', 'string'](int32) (required)

**OrderingRequest**
  - order: ['null', 'array']

**PayerClassification**
  - isInsurancePayer: boolean

**PayerContactPoint**
  - payerContactPointId: string(uuid)
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**PayerIdResponse**
  - payerId: string(uuid) (required)

**PayerName**
  - display: ['null', 'string']

**PayerNameCheckResponse**
  - name: ['null', 'string']
  - nameIsUnique: boolean

**PayerPlanResponse**
  - planId: string(uuid)
  - planName: ['null', 'string']
  - planSharpId: ['null', 'string']
  - policyCount: ['integer', 'string'](int32)
  - isInactive: boolean

**PayerPrograms**
  - planId: string(uuid)
  - name: PlanName
  - sharpId: ['null', 'string']

**PayerResponseSlim**
  - payerId: ['null', 'string'](uuid)
  - payerName: ['null', 'string']
  - plans: ['null', 'array']
  - policyCount: ['integer', 'string'](int32)
  - activePlanCount: ['integer', 'string'](int32)
  - inactivePlanCount: ['integer', 'string'](int32)
  - isInactive: boolean
  - payerType: PayerType
  - snfPayerInfo: SnfPayerInfo
  - manufacturerCopayProgramPayerInfo: ManufacturerCopayProgramPayerInfo

**PayerStatus**
  - (no properties)

**PayerType**
  - (no properties)

**PlanAddress**
  - addressId: string(uuid)
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']
  - county: ['null', 'string']
  - isRecurring: boolean
  - fromMonth: ['null', 'integer', 'string'](int32)
  - toMonth: ['null', 'integer', 'string'](int32)
  - effective: ['null', 'string'](date-time)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**PlanContactPoint**
  - planContactPointId: string(uuid)
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**PlanContactPointIdResponse**
  - planContactPointId: string(uuid)

**PlanEligibilityConfigurationResponse**
  - planId: string(uuid)
  - payerId: string(uuid)
  - inheritPreferencesFromPayer: boolean
  - enableRTE: boolean
  - preferredVerificationMethod: PreferredVerificationMethod
  - verificationInterval: VerificationInterval
  - inheritVerificationSourceFromPayer: boolean
  - verificationUrl: ['null', 'string']
  - verificationUserName: ['null', 'string']
  - verificationPassword: ['null', 'string']
  - verificationPhone: ['null', 'string']
  - extension: ['null', 'string']
  - verificationInstructions: ['null', 'string']

**PlanIdResponse**
  - planId: string(uuid) (required)

**PlanKeyword**
  - keywordId: string(uuid)
  - keyword: ['null', 'string']
  - description: ['null', 'string']
  - isFuzzySearchEnabled: boolean
  - isDeleted: boolean
  - timeStamp: string(date-time)

**PlanKeywordIdResponse**
  - keywordId: string(uuid) (required)

**PlanKeywordOrderingRequest**
  - order: ['null', 'array']

**PlanKeywordRequest**
  - keywordId: string(uuid)
  - keyword: ['null', 'string']
  - description: ['null', 'string']
  - isFuzzySearchEnabled: boolean
  - isDeleted: boolean
  - timeStamp: string(date-time)

**PlanKeywords**
  - order: ['null', 'array']
  - collection: ['null', 'object']

**PlanLegalName**
  - legalName: ['null', 'string']

**PlanName**
  - display: ['null', 'string']

**PlanNameCheckResponse**
  - name: ['null', 'string']
  - nameIsUnique: boolean

**PlanPayer**
  - name: ['null', 'string'] (required)
  - payerType: PayerType
  - isDeleted: ['null', 'boolean']
  - payerId: string(uuid) (required)

**PlanPayerId**
  - payerId: string(uuid) (required)

**PlanStatus**
  - name: ['null', 'string']
  - type: PlanStatusType

**PlanStatusType**
  - (no properties)

**PlanType**
  - planTypeId: ['null', 'string'](uuid)

**PreferredVerificationMethod**
  - (no properties)

**ProgramResponse**
  - awardCount: ['integer', 'string'](int32)
  - contactPoints: ['null', 'array']
  - websites: ['null', 'array']
  - planId: string(uuid)
  - sharpId: ['null', 'string']
  - name: PlanName
  - payer: PlanPayer
  - address: PlanAddress
  - keywords: PlanKeywords
  - status: PlanStatus
  - type: PlanType
  - isDeleted: boolean
  - legalName: PlanLegalName
  - inheritContactPointsFromPayer: ['null', 'boolean']
  - coveredServices: ['null', 'array']

**ProgramSearchResponse**
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - programId: string(uuid) (required)
  - programName: ['null', 'string'] (required)
  - programSharpId: ['null', 'string'] (required)
  - awardCount: ['integer', 'string'](int32) (required)

**ReassignPayerRequest**
  - payer: PlanPayerId

**SnfPayerInfo**
  - facilityCount: ['integer', 'string'](int32) (required)
  - totalResidency: ['integer', 'string'](int32) (required)

**UpdateAssistancePayerRequest**
  - name: PayerName
  - isDeleted: ['null', 'boolean']
  - payerStatus: object
  - autoAdjustmentReasonId: ['null', 'string'](uuid)
  - autoAdjustmentReasonType: object

**UpdateAssistanceProgramRequest**
  - name: PlanName
  - address: PlanAddress
  - payer: PlanPayerId
  - status: PlanStatus
  - isDeleted: ['null', 'boolean']
  - legalName: PlanLegalName
  - sharpId: ['null', 'string']

**UpdateAssistanceWebsiteRequest**
  - websiteTypeId: string(uuid)
  - webAddress: ['null', 'string']
  - description: ['null', 'string']

**UpdateLegalNameRequest**
  - legalName: PlanLegalName

**UpdatePayerEligibilityConfigRequest**
  - enableRTE: boolean
  - preferredVerificationMethod: PreferredVerificationMethod
  - verificationInterval: VerificationInterval
  - verificationUrl: ['null', 'string']
  - verificationUserName: ['null', 'string']
  - verificationPassword: ['null', 'string']
  - verificationPhone: ['null', 'string']
  - extension: ['null', 'string']
  - verificationInstructions: ['null', 'string']

**UpdatePayerNameRequest**
  - name: PayerName

**UpdatePlanAddressRequest**
  - address: PlanAddress

**UpdatePlanContactPointRequest**
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)

**UpdatePlanEligibilityConfigRequest**
  - inheritPreferencesFromPayer: boolean
  - enableRTE: boolean
  - preferredVerificationMethod: PreferredVerificationMethod
  - verificationInterval: VerificationInterval
  - inheritVerificationSourceFromPayer: boolean
  - verificationUrl: ['null', 'string']
  - verificationUserName: ['null', 'string']
  - verificationPassword: ['null', 'string']
  - verificationPhone: ['null', 'string']
  - extension: ['null', 'string']
  - verificationInstructions: ['null', 'string']

**UpdatePlanNameRequest**
  - name: PlanName

**UpdatePlanTypeRequest**
  - planType: PlanType

**VerificationInterval**
  - (no properties)

