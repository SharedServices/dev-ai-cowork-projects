﻿# Snowdrop.Payers.Api - API Dictionary

Repo: snowdrop-payers-api-be
Source: Snowdrop.Payers.Api.json

## Endpoints

### GET /payers
- Tags: Payers
- Response 200: PayerResponseSlim[]

### POST /payers
- Tags: Payers
- Request body: CreatePayerRequest
- Response 200: PayerIdResponse

### GET /payers/{payerId}
- Tags: Payers
- Path params: payerId: string(uuid), required
- Response 200: PayerResponse

### POST /payers/{payerId}
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: CreatePayerRequest
- Response 200: PayerIdResponse

### PUT /payers/{payerId}
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerRequest
- Response 200: (no body)

### POST /payers/{payerId}/contactpoints
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: AddPayerContactPointRequest
- Response 200: PayerContactPointIdResponse

### PUT /payers/{payerId}/contactpoints/{payerContactPointId}
- Tags: Payers
- Path params: payerId: string(uuid), required; payerContactPointId: string(uuid), required
- Request body: UpdatePayerContactPointRequest
- Response 200: PayerContactPointIdResponse

### DELETE /payers/{payerId}/contactpoints/{payerContactPointId}
- Tags: Payers
- Path params: payerId: string(uuid), required; payerContactPointId: string(uuid), required
- Response 200: PayerContactPointIdResponse

### PUT /payers/{payerId}/contactpoints/order
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: PayerContactPointOrderingRequest
- Response 200: (no body)

### GET /payers/{payerId}/contracts
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Response 200: ContractResponseSlim[]

### POST /payers/{payerId}/contracts
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractCreateRequest
- Response 200: ContractUpsertResponse

### GET /payers/{payerId}/contracts/{contractId}
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Response 200: ContractResponse

### DELETE /payers/{payerId}/contracts/{contractId}
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/{contractId}/divisions
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/facilities
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/insurance/divisions
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/insurance/facilities
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/insurance/plans
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/insurance/providers
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/plans
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/providers
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/restore
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/selfpay/divisions
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/selfpay/facilities
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/selfpay/plans
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/selfpay/providers
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/snfs
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/snfs/divisions
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/snfs/facilities
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/snfs/plans
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### PUT /payers/{payerId}/contracts/{contractId}/snfs/providers
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractAssociation
- Response 200: (no body)

### POST /payers/{payerId}/contracts/{contractId}/thresholds
- Tags: DelinquencyThresholds
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: DelinquencyThresholdsCreateRequest
- Response 200: (no body)

### GET /payers/{payerId}/contracts/{contractId}/thresholds/{claimType}
- Tags: DelinquencyThresholds
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; claimType: ['integer', 'string'](int32), required
- Response 200: DelinquencyThresholdsResponse

### PUT /payers/{payerId}/contracts/{contractId}/thresholds/{claimType}
- Tags: DelinquencyThresholds
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; claimType: ['integer', 'string'](int32), required
- Request body: DelinquencyThresholdsUpdateRequest
- Response 200: (no body)

### POST /payers/{payerId}/contracts/by-name
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractSearchByNameRequest
- Response 200: ContractIdResponse

### GET /payers/{payerId}/contracts/company/{companyId}
- Tags: Contracts
- Path params: payerId: string(uuid), required; companyId: string(uuid), required
- Response 200: ContractResponseSlim[]

### PUT /payers/{payerId}/contracts/company/{companyId}/order
- Tags: Contracts
- Path params: payerId: string(uuid), required; companyId: string(uuid), required
- Request body: CollectionOrderingRequestBase
- Response 200: (no body)

### GET /payers/{payerId}/contracts/discarded
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Response 200: ContractResponseSlim[]

### POST /payers/{payerId}/contracts/insurance
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractCreateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/insurance/{contractId}/effective-dates
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractEffectiveUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/insurance/{contractId}/fromchargemaster-multiplier
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractChargemasterMultiplierRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/insurance/{contractId}/name
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNameUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/insurance/{contractId}/network
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNetworkUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/order
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: CollectionOrderingRequestBase
- Response 200: (no body)

### POST /payers/{payerId}/contracts/selfpay
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractCreateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/selfpay/{contractId}/effective-dates
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractEffectiveUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/selfpay/{contractId}/fromchargemaster-multiplier
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractChargemasterMultiplierRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/selfpay/{contractId}/name
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNameUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/selfpay/{contractId}/network
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNetworkUpdateRequest
- Response 200: ContractUpsertResponse

### POST /payers/{payerId}/contracts/snfs
- Tags: Contracts
- Path params: payerId: string(uuid), required
- Request body: ContractCreateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/snfs/{contractId}/effective-dates
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractEffectiveUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/snfs/{contractId}/fromchargemaster-multiplier
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractChargemasterMultiplierRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/snfs/{contractId}/name
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNameUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/contracts/Snfs/{contractId}/network
- Tags: Contracts
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: ContractNetworkUpdateRequest
- Response 200: ContractUpsertResponse

### PUT /payers/{payerId}/insurance/change-name
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerNameRequest
- Response 200: (no body)

### PUT /payers/{payerId}/manufacturer/change-name
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerNameRequest
- Response 200: (no body)

### GET /payers/{payerId}/manufacturercopayprograms
- Tags: Payers
- Path params: payerId: string(uuid), required
- Response 200: PayerManufacturerCopayProgramsResponse

### GET /payers/{payerId}/payer-type
- Tags: Payers
- Path params: payerId: string(uuid), required
- Response 200: PayerType

### GET /payers/{payerId}/plans
- Tags: Payers
- Path params: payerId: string(uuid), required
- Response 200: PayerPlansResponse

### PUT /payers/{payerId}/selfpay/change-name
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerNameRequest
- Response 200: (no body)

### POST /payers/{payerId}/selfpay/deactivate
- Tags: Payers
- Path params: payerId: string(uuid), required
- Response 200: (no body)

### GET /payers/{payerId}/snfs
- Tags: Payers
- Path params: payerId: string(uuid), required
- Response 200: PayerSnfsResponse

### PUT /payers/{payerId}/snfs/change-name
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerNameRequest
- Response 200: (no body)

### POST /payers/checkpayername
- Tags: Payers
- Request body: CheckPayerNameRequest
- Response 200: PayerNameCheckResponse

### GET /payers/copayprograms
- Tags: ManufacturerCopayPrograms
- Response 200: ManufacturerCopayProgramResponse[]

### POST /payers/copayprograms
- Tags: ManufacturerCopayPrograms
- Request body: CreateCopayProgramRequest
- Response 200: ManufacturerCopayProgramIdResponse

### GET /payers/copayprograms/{manufacturerCopayProgramId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Response 200: ManufacturerCopayProgramResponse

### PUT /payers/copayprograms/{manufacturerCopayProgramId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: UpdateCopayProgramRequest
- Response 200: (no body)

### DELETE /payers/copayprograms/{manufacturerCopayProgramId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Response 200: (no body)

### PUT /payers/copayprograms/{manufacturerCopayProgramId}/address
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: UpdateCopayProgramAddressRequest
- Response 200: (no body)

### POST /payers/copayprograms/{manufacturerCopayProgramId}/contactpoints
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: AddContactPointRequest
- Response 200: ContactPointIdResponse

### PUT /payers/copayprograms/{manufacturerCopayProgramId}/contactpoints/{copayProgramContactPointId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required; copayProgramContactPointId: string(uuid), required
- Request body: UpdateContactPointRequest
- Response 200: ContactPointIdResponse

### DELETE /payers/copayprograms/{manufacturerCopayProgramId}/contactpoints/{copayProgramContactPointId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required; copayProgramContactPointId: string(uuid), required
- Response 200: ContactPointIdResponse

### PUT /payers/copayprograms/{manufacturerCopayProgramId}/contactpoints/order
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: ContactPointOrderingRequest
- Response 200: (no body)

### POST /payers/copayprograms/{manufacturerCopayProgramId}/coveredservices
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: AddCoveredServiceRequest
- Response 200: CoveredServiceIdResponse

### PUT /payers/copayprograms/{manufacturerCopayProgramId}/coveredservices
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: UpdateCoveredServicesRequest
- Response 200: ManufacturerCopayProgramCoveredServiceContract[]

### PUT /payers/copayprograms/{manufacturerCopayProgramId}/coveredservices/{copayProgramCoveredServiceId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required; copayProgramCoveredServiceId: string(uuid), required
- Request body: UpdateCoveredServiceRequest
- Response 200: CoveredServiceIdResponse

### DELETE /payers/copayprograms/{manufacturerCopayProgramId}/coveredservices/{copayProgramCoveredServiceId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required; copayProgramCoveredServiceId: string(uuid), required
- Response 200: CoveredServiceIdResponse

### PUT /payers/copayprograms/{manufacturerCopayProgramId}/legal-name
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: UpdateCopayProgramLegalNameRequest
- Response 200: (no body)

### POST /payers/copayprograms/{manufacturerCopayProgramId}/websites
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: AddWebsiteRequest
- Response 200: WebsiteIdResponse

### PUT /payers/copayprograms/{manufacturerCopayProgramId}/websites/{copayProgramWebsiteId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required; copayProgramWebsiteId: string(uuid), required
- Request body: UpdateWebsiteRequest
- Response 200: WebsiteIdResponse

### DELETE /payers/copayprograms/{manufacturerCopayProgramId}/websites/{copayProgramWebsiteId}
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required; copayProgramWebsiteId: string(uuid), required
- Response 200: WebsiteIdResponse

### PUT /payers/copayprograms/{manufacturerCopayProgramId}/websites/order
- Tags: ManufacturerCopayPrograms
- Path params: manufacturerCopayProgramId: string(uuid), required
- Request body: WebsiteOrderingRequest
- Response 200: (no body)

### GET /payers/eligibilityconfig/{payerId}
- Tags: Payers
- Path params: payerId: string(uuid), required
- Response 200: PayerEligibilityConfigurationResponse

### PUT /payers/eligibilityconfig/{payerId}
- Tags: Payers
- Path params: payerId: string(uuid), required
- Request body: UpdatePayerEligibilityConfigRequest
- Response 200: (no body)

### POST /payers/plans
- Tags: Plans
- Request body: CreatePlanRequest
- Response 200: PlanIdResponse

### GET /payers/plans/{id}/keywords
- Tags: PlanKeywords
- Path params: id: string(uuid), required
- Response 200: PlanKeyword[]

### POST /payers/plans/{id}/keywords
- Tags: PlanKeywords
- Path params: id: string(uuid), required
- Request body: PlanKeywordRequest
- Response 200: PlanKeywordIdResponse

### GET /payers/plans/{id}/keywords/{keywordId}
- Tags: PlanKeywords
- Path params: id: string(uuid), required; keywordId: string(uuid), required
- Response 200: PlanKeyword

### POST /payers/plans/{id}/keywords/{keywordId}
- Tags: PlanKeywords
- Path params: id: string(uuid), required; keywordId: string(uuid), required
- Request body: PlanKeywordRequest
- Response 200: PlanKeywordIdResponse

### PUT /payers/plans/{id}/keywords/{keywordId}
- Tags: PlanKeywords
- Path params: id: string(uuid), required; keywordId: string(uuid), required
- Request body: PlanKeywordRequest
- Response 200: (no body)

### DELETE /payers/plans/{id}/keywords/{keywordId}
- Tags: PlanKeywords
- Path params: id: string(uuid), required; keywordId: string(uuid), required
- Response 200: (no body)

### PUT /payers/plans/{id}/keywords/order
- Tags: PlanKeywords
- Path params: id: string(uuid), required
- Request body: PlanKeywordOrderingRequest
- Response 200: (no body)

### GET /payers/plans/{planId}
- Tags: Plans
- Path params: planId: string(uuid), required
- Response 200: PlanResponse

### POST /payers/plans/{planId}
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: CreatePlanRequest
- Response 200: PlanIdResponse

### PUT /payers/plans/{planId}
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: UpdatePlanRequest
- Response 200: (no body)

### DELETE /payers/plans/{planId}
- Tags: Plans
- Path params: planId: string(uuid), required
- Response 200: (no body)

### PUT /payers/plans/{planId}/address
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: UpdatePlanAddressRequest
- Response 200: (no body)

### PUT /payers/plans/{planId}/change-legal-name
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: UpdateLegalNameRequest
- Response 200: (no body)

### PUT /payers/plans/{planId}/change-plan-name
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: UpdatePlanNameRequest
- Response 200: (no body)

### PUT /payers/plans/{planId}/change-plan-type
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: UpdatePlanTypeRequest
- Response 200: (no body)

### POST /payers/plans/{planId}/contactpoints
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: AddPlanContactPointRequest
- Response 200: PlanContactPointIdResponse

### PUT /payers/plans/{planId}/contactpoints/{planContactPointId}
- Tags: Plans
- Path params: planId: string(uuid), required; planContactPointId: string(uuid), required
- Request body: UpdatePlanContactPointRequest
- Response 200: PlanContactPointIdResponse

### DELETE /payers/plans/{planId}/contactpoints/{planContactPointId}
- Tags: Plans
- Path params: planId: string(uuid), required; planContactPointId: string(uuid), required
- Response 200: PlanContactPointIdResponse

### PUT /payers/plans/{planId}/contactpoints/order
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: OrderingRequest
- Response 200: (no body)

### POST /payers/plans/{planId}/contactpoints/revert
- Tags: Plans
- Path params: planId: string(uuid), required
- Response 200: PlanContactPoint[]

### PUT /payers/plans/{planId}/reassign-plan
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: ReassignPayerRequest
- Response 200: (no body)

### PUT /payers/plans/{planId}/undelete
- Tags: Plans
- Path params: planId: string(uuid), required
- Response 200: (no body)

### POST /payers/plans/checkplanname
- Tags: Plans
- Request body: CheckPlanNameRequest
- Response 200: PlanNameCheckResponse

### GET /payers/plans/eligibilityconfig/{planId}
- Tags: Plans
- Path params: planId: string(uuid), required
- Response 200: PlanEligibilityConfigurationResponse

### PUT /payers/plans/eligibilityconfig/{planId}
- Tags: Plans
- Path params: planId: string(uuid), required
- Request body: UpdatePlanEligibilityConfigRequest
- Response 200: (no body)

### GET /payers/rte-settings
- Tags: RteSettings
- Response 200: RteSettingsResponse[]

### POST /payers/rte-settings/payer
- Tags: RteSettings
- Request body: SetPayerRteSettingsRequest
- Response 200: (no body)

### GET /payers/rte-settings/payer/{payerId}
- Tags: RteSettings
- Path params: payerId: string(uuid), required
- Response 200: RteSettingsResponse

### DELETE /payers/rte-settings/payer/{payerId}
- Tags: RteSettings
- Path params: payerId: string(uuid), required
- Response 200: (no body)

### POST /payers/rte-settings/plan
- Tags: RteSettings
- Request body: SetPlanRteSettingsRequest
- Response 200: (no body)

### GET /payers/rte-settings/plan/{planId}
- Tags: RteSettings
- Path params: planId: string(uuid), required
- Response 200: PlanRteSettingsResponse

### DELETE /payers/rte-settings/plan/{planId}
- Tags: RteSettings
- Path params: planId: string(uuid), required
- Response 200: (no body)

### POST /payers/rte-settings/search
- Tags: RteSettings
- Request body: RteSettingsSearchRequest
- Response 200: RteSettingsResponse[]

### GET /payers/rte-settings/templates/{rtePayerId}
- Tags: RteSettings
- Path params: rtePayerId: ['integer', 'string'](int64), required
- Response 200: RtePayerTemplate[]

### GET /payers/snfs
- Tags: Snfs
- Response 200: SnfResponse[]

### POST /payers/snfs
- Tags: Snfs
- Request body: CreateSnfRequest
- Response 200: SnfIdResponse

### GET /payers/snfs/{snfId}
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Response 200: SnfResponse

### POST /payers/snfs/{snfId}
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Request body: CreateSnfRequest
- Response 200: SnfIdResponse

### PUT /payers/snfs/{snfId}
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Request body: UpdateSnfRequest
- Response 200: (no body)

### DELETE /payers/snfs/{snfId}
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Response 200: (no body)

### PUT /payers/snfs/{snfId}/address
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Request body: UpdateAddressRequest
- Response 200: (no body)

### PUT /payers/snfs/{snfId}/legal-name
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Request body: UpdateLegalNameRequest
- Response 200: (no body)

### PUT /payers/snfs/{snfId}/name
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Request body: UpdateSnfNameRequest
- Response 200: (no body)

### PUT /payers/snfs/{snfId}/reassign
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Request body: ReassignPayerRequest
- Response 200: (no body)

### PUT /payers/snfs/{snfId}/undelete
- Tags: Snfs
- Path params: snfId: string(uuid), required
- Response 200: (no body)

### POST /payers/snfs/patient/{patientId}
- Tags: SnfPatient
- Path params: patientId: string(uuid), required
- Request body: CreateSnfPatientRequest
- Response 200: SnfPatientIdResponse

### GET /payers/snfs/patient/{patientId}
- Tags: SnfPatient
- Path params: patientId: string(uuid), required
- Response 200: SnfPatientResponse[]

### PUT /payers/snfs/patient/{patientId}/snfpatient/{snfPatientId}
- Tags: SnfPatient
- Path params: patientId: string(uuid), required; snfPatientId: string(uuid), required
- Request body: UpdateSnfPatientRequest
- Response 200: (no body)

### PUT /payers/support/rebuild-plan-search/{organizationId}
- Tags: Support
- Path params: organizationId: string(uuid), required
- Response 200: (no body)

### PUT /payers/support/set-sharpids/{organizationId}/{sharpId}
- Tags: Support
- Path params: organizationId: string(uuid), required; sharpId: string, required
- Request body: WithDuplicateSharpIds
- Response 200: (no body)

### GET /payers/support/sharpid-duplicates/{organizationId}
- Tags: Support
- Path params: organizationId: string(uuid), required
- Response 200: WithDuplicateSharpIds

### PUT /payers/support/update-plan-search/{planId}
- Tags: Support
- Path params: planId: string(uuid), required
- Response 200: (no body)

### PUT /vendor/PatientAssistance/disable
- Tags: VendorManagement
- Response 200: (no body)

### PUT /vendor/PatientAssistance/enable
- Tags: VendorManagement
- Response 200: (no body)

### GET /vendor/PatientAssistance/enabled
- Tags: VendorManagement
- Response 200: boolean

## Schemas

**AddContactPointRequest**
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)

**AddCoveredServiceRequest**
  - chargeCode: ManufacturerCopayProgramCoveredServiceChargeCodeCriteriaContract
  - modifier: ManufacturerCopayProgramCoveredServiceModifierCriteriaContract
  - ndc: ManufacturerCopayProgramCoveredServiceNdcCriteriaContract
  - diagnosis: ManufacturerCopayProgramCoveredServiceDiagnosisCriteriaContract
  - isDeleted: boolean
  - timeStamp: string(date-time)

**AddPayerContactPointRequest**
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)

**AddPlanContactPointRequest**
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)

**AddWebsiteRequest**
  - websiteTypeId: string(uuid)
  - webAddress: ['null', 'string']
  - description: ['null', 'string']

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

**ContactPointIdResponse**
  - copayProgramContactPointId: string(uuid)

**ContactPointOrderingRequest**
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

**CoveredServiceIdResponse**
  - copayProgramCoveredServiceId: string(uuid)

**CreateCopayProgramRequest**
  - payerId: string(uuid)
  - manufacturerCopayProgramId: ['null', 'string'](uuid)
  - sharpId: ['null', 'string']
  - name: ['null', 'string']
  - address: ManufacturerCopayProgramAddress
  - legalName: ['null', 'string']
  - status: object
  - manufacturerAttributes: ManufacturerAttributes

**CreatePayerRequest**
  - name: PayerName
  - classification: PayerClassification
  - payerType: PayerType
  - payerStatus: PayerStatus
  - manufacturerAttributes: ManufacturerAttributes
  - autoAdjustmentReasonId: ['null', 'string'](uuid)
  - autoAdjustmentReasonType: object
  - isDeleted: ['null', 'boolean']

**CreatePlanRequest**
  - payer: PlanPayerId
  - name: PlanName
  - address: PlanAddress
  - status: PlanStatus
  - type: PlanType
  - isDeleted: ['null', 'boolean']
  - legalName: PlanLegalName
  - sharpId: ['null', 'string']

**CreateSnfPatientRequest**
  - snfId: string(uuid)
  - startDate: Date
  - endDate: object
  - residentNumber: ['null', 'string']

**CreateSnfRequest**
  - payerId: string(uuid)
  - name: ['null', 'string']
  - address: SnfAddress
  - isDeleted: ['null', 'boolean']
  - legalName: ['null', 'string']
  - sharpId: ['null', 'string']
  - status: object

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

**ManufacturerAttributes**
  - manufacturerDataSource: object (required)
  - sourceInfoLink: ['null', 'string'] (required)

**ManufacturerCopayProgramAddress**
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']
  - county: ['null', 'string']

**ManufacturerCopayProgramContactPoint**
  - copayProgramContactPointId: string(uuid)
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**ManufacturerCopayProgramCoveredServiceChargeCodeCriteriaContract**
  - elementId: ['null', 'string']
  - setId: ['null', 'string'](uuid)
  - isFactorySet: ['null', 'boolean']

**ManufacturerCopayProgramCoveredServiceContract**
  - copayProgramCoveredServiceId: ['null', 'string'](uuid)
  - chargeCode: ManufacturerCopayProgramCoveredServiceChargeCodeCriteriaContract
  - modifier: ManufacturerCopayProgramCoveredServiceModifierCriteriaContract
  - ndc: ManufacturerCopayProgramCoveredServiceNdcCriteriaContract
  - diagnosis: ManufacturerCopayProgramCoveredServiceDiagnosisCriteriaContract
  - isDeleted: boolean
  - timeStamp: string(date-time)

**ManufacturerCopayProgramCoveredServiceDiagnosisCriteriaContract**
  - elementId: object
  - setId: ['null', 'string'](uuid)
  - isFactorySet: ['null', 'boolean']

**ManufacturerCopayProgramCoveredServiceModifierCriteriaContract**
  - elementId: ['null', 'string'](uuid)
  - setId: ['null', 'string'](uuid)
  - isFactorySet: ['null', 'boolean']

**ManufacturerCopayProgramCoveredServiceNdcCriteriaContract**
  - elementId: ['null', 'string']
  - setId: ['null', 'string'](uuid)
  - isFactorySet: ['null', 'boolean']

**ManufacturerCopayProgramIdResponse**
  - manufacturerCopayProgramId: string(uuid) (required)
  - manufacturerCopayProgramSharpId: ['null', 'string'] (required)

**ManufacturerCopayProgramPayerInfo**
  - copayProgramCount: ['integer', 'string'](int32)
  - totalAwardCount: ['integer', 'string'](int32) (required)

**ManufacturerCopayProgramResponse**
  - manufacturerCopayProgramId: string(uuid)
  - sharpId: ['null', 'string']
  - name: ['null', 'string']
  - payerId: string(uuid)
  - previousPayerId: ['null', 'string'](uuid)
  - address: ManufacturerCopayProgramAddress
  - status: ManufacturerCopayProgramStatusType
  - isDeleted: boolean
  - legalName: ['null', 'string']
  - websites: ['null', 'array']
  - contactPoints: ['null', 'array']
  - coveredServices: ['null', 'array']
  - awardCount: ['integer', 'string'](int32)
  - manufacturerAttributes: ManufacturerAttributes

**ManufacturerCopayProgramStatusType**
  - (no properties)

**ManufacturerCopayProgramWebsite**
  - copayProgramWebsiteId: string(uuid)
  - websiteTypeId: string(uuid)
  - webAddress: ['null', 'string']
  - description: ['null', 'string']
  - isDeleted: boolean
  - timeStamp: string(date-time)

**ManufacturerDataSource**
  - (no properties)

**OrderedCollectionOfGuidAndAssistanceProgramWebsite**
  - order: ['null', 'array']
  - collection: ['null', 'object']

**OrderedCollectionOfGuidAndPayerContactPoint**
  - order: ['null', 'array']
  - collection: ['null', 'object']

**OrderedCollectionOfGuidAndPlanContactPoint**
  - order: ['null', 'array']
  - collection: ['null', 'object']

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

**PayerContactPointIdResponse**
  - payerContactPointId: string(uuid)

**PayerContactPointOrderingRequest**
  - order: ['null', 'array']

**PayerEligibilityConfigurationResponse**
  - payerId: string(uuid)
  - enableRTE: boolean
  - preferredVerificationMethod: PreferredVerificationMethod
  - verificationInterval: VerificationInterval
  - verificationUrl: ['null', 'string']
  - verificationUserName: ['null', 'string']
  - verificationPassword: ['null', 'string']
  - verificationPhone: ['null', 'string']
  - extension: ['null', 'string']
  - verificationInstructions: ['null', 'string']

**PayerIdResponse**
  - payerId: string(uuid) (required)

**PayerManufacturerCopayProgramsResponse**
  - copayPrograms: ['null', 'array']

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

**PayerPlans**
  - policyCount: ['integer', 'string'](int32)
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
  - contactPoints: OrderedCollectionOfGuidAndPlanContactPoint
  - inheritContactPointsFromPayer: ['null', 'boolean']
  - websites: OrderedCollectionOfGuidAndAssistanceProgramWebsite
  - coveredServices: ['null', 'array']

**PayerPlansResponse**
  - policyCount: ['integer', 'string'](int32)
  - plans: ['null', 'array']
  - payerId: string(uuid)
  - name: PayerName
  - classification: PayerClassification
  - payerType: PayerType
  - payerStatus: PayerStatus
  - manufacturerAttributes: ManufacturerAttributes
  - contactPoints: OrderedCollectionOfGuidAndPayerContactPoint
  - autoAdjustmentReasonId: ['null', 'string'](uuid)
  - autoAdjustmentReasonType: object
  - isDeleted: boolean

**PayerResponse**
  - payerId: string(uuid)
  - name: PayerName
  - classification: PayerClassification
  - payerType: PayerType
  - payerStatus: PayerStatus
  - plans: ['null', 'array']
  - policyCount: ['integer', 'string'](int32)
  - activePlanCount: ['integer', 'string'](int32)
  - inactivePlanCount: ['integer', 'string'](int32)
  - isInactive: boolean
  - contactPoints: ['null', 'array']
  - manufacturerAttributes: ManufacturerAttributes
  - autoAdjustmentReasonId: ['null', 'string'](uuid)
  - autoAdjustmentReasonType: object

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

**PayerSnfsResponse**
  - facilities: ['null', 'array']

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

**PlanResponse**
  - policyCount: ['integer', 'string'](int32)
  - contactPoints: ['null', 'array']
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
  - websites: OrderedCollectionOfGuidAndAssistanceProgramWebsite
  - coveredServices: ['null', 'array']

**PlanRteSettingsResponse**
  - inheritedFromPayer: boolean
  - superNimbusId: ['integer', 'string'](int32)
  - serviceProviderPayerName: ['null', 'string']
  - payerId: ['null', 'string']
  - serviceProviderCpid: ['null', 'string']
  - serviceProviderRteId: ['null', 'string']
  - claimStatusPayerId: ['null', 'string']

**PlanStatus**
  - name: ['null', 'string']
  - type: PlanStatusType

**PlanStatusType**
  - (no properties)

**PlanType**
  - planTypeId: ['null', 'string'](uuid)

**PreferredVerificationMethod**
  - (no properties)

**ReassignPayerRequest**
  - payer: PlanPayerId

**RtePayerTemplate**
  - superNimbusId: ['integer', 'string'](int64)
  - rtePayerId: ['integer', 'string'](int64)
  - templateId: ['integer', 'string'](int32)

**RteSettingsResponse**
  - superNimbusId: ['integer', 'string'](int32)
  - serviceProviderPayerName: ['null', 'string']
  - payerId: ['null', 'string']
  - serviceProviderCpid: ['null', 'string']
  - serviceProviderRteId: ['null', 'string']
  - claimStatusPayerId: ['null', 'string']

**RteSettingsSearchRequest**
  - rteSettingsSearchString: ['null', 'string']

**SetPayerRteSettingsRequest**
  - payerId: string(uuid)
  - superNimbusRteSettingsId: ['integer', 'string'](int32)

**SetPlanRteSettingsRequest**
  - planId: string(uuid)
  - superNimbusRteSettingsId: ['null', 'integer', 'string'](int32)

**SnfAddress**
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']
  - county: ['null', 'string']

**SnfIdResponse**
  - snfId: string(uuid) (required)
  - snfSharpId: ['null', 'string'] (required)

**SnfPatientIdResponse**
  - snfPatientId: string(uuid) (required)

**SnfPatientResponse**
  - snfPatientId: string(uuid)
  - patientId: string(uuid)
  - snfId: string(uuid)
  - startDate: Date
  - endDate: object
  - residentNumber: ['null', 'string']

**SnfPayerInfo**
  - facilityCount: ['integer', 'string'](int32) (required)
  - totalResidency: ['integer', 'string'](int32) (required)

**SnfResponse**
  - residency: ['integer', 'string'](int32)
  - snfId: string(uuid)
  - sharpId: ['null', 'string']
  - name: ['null', 'string']
  - payerId: string(uuid)
  - previousPayerId: ['null', 'string'](uuid)
  - address: SnfAddress
  - status: SnfStatusType
  - isDeleted: boolean
  - legalName: ['null', 'string']

**SnfStatusType**
  - (no properties)

**UpdateAddressRequest**
  - address: SnfAddress

**UpdateContactPointRequest**
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)

**UpdateCopayProgramAddressRequest**
  - address: ManufacturerCopayProgramAddress

**UpdateCopayProgramLegalNameRequest**
  - legalName: ['null', 'string']

**UpdateCopayProgramRequest**
  - name: ['null', 'string']
  - address: ManufacturerCopayProgramAddress
  - payerId: ['null', 'string'](uuid)
  - status: object
  - legalName: ['null', 'string']
  - manufacturerAttributes: ManufacturerAttributes

**UpdateCoveredServiceRequest**
  - chargeCode: ManufacturerCopayProgramCoveredServiceChargeCodeCriteriaContract
  - modifier: ManufacturerCopayProgramCoveredServiceModifierCriteriaContract
  - ndc: ManufacturerCopayProgramCoveredServiceNdcCriteriaContract
  - diagnosis: ManufacturerCopayProgramCoveredServiceDiagnosisCriteriaContract

**UpdateCoveredServicesRequest**
  - coveredServices: ['null', 'array']

**UpdateLegalNameRequest**
  - legalName: PlanLegalName

**UpdatePayerContactPointRequest**
  - contactPointType: ContactPointType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - contactUseId: string(uuid)

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

**UpdatePayerRequest**
  - name: PayerName
  - classification: PayerClassification
  - isDeleted: ['null', 'boolean']
  - payerStatus: object
  - manufacturerAttributes: ManufacturerAttributes
  - autoAdjustmentReasonId: ['null', 'string'](uuid)
  - autoAdjustmentReasonType: object

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

**UpdatePlanRequest**
  - name: PlanName
  - address: PlanAddress
  - payer: PlanPayerId
  - status: PlanStatus
  - type: PlanType
  - isDeleted: ['null', 'boolean']
  - legalName: PlanLegalName
  - sharpId: ['null', 'string']

**UpdatePlanTypeRequest**
  - planType: PlanType

**UpdateSnfNameRequest**
  - name: ['null', 'string']

**UpdateSnfPatientRequest**
  - snfId: ['null', 'string'](uuid)
  - startDate: object
  - endDate: object
  - residentNumber: ['null', 'string']

**UpdateSnfRequest**
  - name: ['null', 'string']
  - address: SnfAddress
  - payerId: ['null', 'string'](uuid)
  - status: object
  - isDeleted: ['null', 'boolean']
  - legalName: ['null', 'string']

**UpdateWebsiteRequest**
  - websiteTypeId: string(uuid)
  - webAddress: ['null', 'string']
  - description: ['null', 'string']

**VerificationInterval**
  - (no properties)

**WebsiteIdResponse**
  - copayProgramWebsiteId: string(uuid)

**WebsiteOrderingRequest**
  - order: ['null', 'array']

**WithDuplicateSharpIds**
  - planIds: ['null', 'array'] (required)
  - snfIds: ['null', 'array'] (required)
  - manufacturerCopayProgramIds: ['null', 'array'] (required)

