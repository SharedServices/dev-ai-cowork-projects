﻿# Snowdrop.Activities.Services - API Dictionary

Repo: snowdrop-activities-be
Source: Snowdrop.Activities.Services.json

## Endpoints

### GET /activity-rules
- Tags: ActivityRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /activity-rules
- Tags: ActivityRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /activity-rules/{ruleId}
- Tags: ActivityRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /activity-rules/{ruleId}/delete
- Tags: ActivityRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /activity-rules/{ruleId}/update
- Tags: ActivityRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /activity-rules/behaviors
- Tags: ActivityRule
- Response 200: KeyValuePairOfintAndstring[]

### PUT /activity-rules/behaviors/{behaviorCategory}/enable
- Tags: ActivityRule
- Path params: behaviorCategory: BehaviorCategory, required
- Response 200: string(uuid)

### GET /activity-rules/behaviors/manualreview/releaseactions
- Tags: ActivityRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /activity-rules/behaviors/providervalidation/providerreplacementtype
- Tags: ActivityRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /activity-rules/behaviors/providervalidation/providertype
- Tags: ActivityRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /activity-rules/names/isunique
- Tags: ActivityRule
- Query params: name: string
- Response 200: boolean

### GET /activity-rules/qualifiers
- Tags: ActivityRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /activity-rules/ruleactions
- Tags: ActivityRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /activity-sequences
- Tags: ActivitySequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /activity-sequences
- Tags: ActivitySequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /activity-sequences/{sequenceId}
- Tags: ActivitySequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /activity-sequences/{sequenceId}/archive
- Tags: ActivitySequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activity-sequences/{sequenceId}/download
- Tags: ActivitySequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /activity-sequences/{sequenceId}/restore
- Tags: ActivitySequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /activity-sequences/{sequenceId}/rules
- Tags: ActivitySequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /activity-sequences/{sequenceId}/rules/reorder
- Tags: ActivitySequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /activity-sequences/{sequenceId}/update
- Tags: ActivitySequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /activity-sequences/names/isunique
- Tags: ActivitySequence
- Query params: name: string
- Response 200: boolean

### PUT /activity-sequences/reorder
- Tags: ActivitySequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /activity-validation/generate-prequalification
- Tags: ActivityValidation
- Response 200: string

### POST /activity-validation/generate-prequalification/{setId}
- Tags: ActivityValidation
- Path params: setId: string(uuid), required
- Response 200: string

### GET /activity-validation/qualification/{attributeName}
- Tags: ActivityValidation
- Path params: attributeName: string, required
- Response 200: string(uuid)[]

### GET /activity-validation/qualification/{attributeName}/{attributeValue}
- Tags: ActivityValidation
- Path params: attributeName: string, required; attributeValue: string, required
- Response 200: string(uuid)[]

### GET /activity-validation/qualification/activity/{elementId}
- Tags: ActivityValidation
- Path params: elementId: string(uuid), required
- Response 200: string(uuid)[]

### POST /activity-validation/validate
- Tags: ActivityValidation
- Request body: ValidationRequest[]
- Response 200: string

### GET /additional-properties
- Tags: AdditionalProperties
- Response 200: string[]

### POST /additional-properties
- Tags: AdditionalProperties
- Request body: string[]
- Response 200: (no body)

### POST /balance-management/patients/{patientId}
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required
- Request body: BalanceManagementChargeActionRequest[]
- Response 200: BalanceManagementChargeActionResponse[]
- Response 400: ProblemDetails

### GET /balance-management/patients/{patientId}/{currentDate}
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required; currentDate: string, required
- Query params: includeEmptyBalance: boolean
- Response 200: BalanceManagementResponse

### POST /balance-management/patients/{patientId}/charge-assemblies
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required
- Request body: BalanceManagementChargeAssemblyActionRequest[]
- Response 200: BalanceManagementChargeAssemblyActionResponse[]
- Response 400: ProblemDetails

### POST /balance-management/patients/{patientId}/charge-assemblies/{chargeAssemblyId}/refresh
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required; chargeAssemblyId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /balance-management/patients/{patientId}/charges
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required
- Request body: BalanceManagementChargeActionRequest[]
- Response 200: BalanceManagementChargeActionResponse[]
- Response 400: ProblemDetails

### POST /balance-management/patients/{patientId}/charges/{chargeId}/refresh
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required; chargeId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /balance-management/patients/{patientId}/portfolios/{portfolioId}/rebalance
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required; portfolioId: string(uuid), required
- Response 200: BalanceManagementChargeActionResponse[]
- Response 400: ProblemDetails

### POST /balance-management/patients/{patientId}/refresh
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### GET /balance-management/patients/{patientId}/summary
- Tags: BalanceManagement
- Path params: patientId: string(uuid), required
- Response 200: PatientFinancialSummary

### GET /channels/inbound
- Tags: Channel
- Query params: includeDeleted: boolean
- Response 200: ChannelList

### GET /charge-generation-rules
- Tags: ChargeGenerationRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /charge-generation-rules
- Tags: ChargeGenerationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-generation-rules/{ruleId}
- Tags: ChargeGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /charge-generation-rules/{ruleId}/delete
- Tags: ChargeGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /charge-generation-rules/{ruleId}/update
- Tags: ChargeGenerationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /charge-generation-rules/behaviors
- Tags: ChargeGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### PUT /charge-generation-rules/behaviors/{behaviorCategory}/enable
- Tags: ChargeGenerationRule
- Path params: behaviorCategory: BehaviorCategory, required
- Response 200: string(uuid)

### GET /charge-generation-rules/behaviors/manualreview/releaseactions
- Tags: ChargeGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-generation-rules/behaviors/providervalidation/providerreplacementtype
- Tags: ChargeGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-generation-rules/behaviors/providervalidation/providertype
- Tags: ChargeGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-generation-rules/names/isunique
- Tags: ChargeGenerationRule
- Query params: name: string
- Response 200: boolean

### GET /charge-generation-rules/qualifiers
- Tags: ChargeGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-generation-rules/ruleactions
- Tags: ChargeGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-generation-sequences
- Tags: ChargeGenerationSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /charge-generation-sequences
- Tags: ChargeGenerationSequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-generation-sequences/{sequenceId}
- Tags: ChargeGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /charge-generation-sequences/{sequenceId}/archive
- Tags: ChargeGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charge-generation-sequences/{sequenceId}/download
- Tags: ChargeGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /charge-generation-sequences/{sequenceId}/restore
- Tags: ChargeGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-generation-sequences/{sequenceId}/rules
- Tags: ChargeGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /charge-generation-sequences/{sequenceId}/rules/reorder
- Tags: ChargeGenerationSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charge-generation-sequences/{sequenceId}/update
- Tags: ChargeGenerationSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-generation-sequences/names/isunique
- Tags: ChargeGenerationSequence
- Query params: name: string
- Response 200: boolean

### PUT /charge-generation-sequences/reorder
- Tags: ChargeGenerationSequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /charge-generation/generate-prequalification
- Tags: ChargeGeneration
- Response 200: string

### POST /charge-generation/generate-prequalification/{setId}
- Tags: ChargeGeneration
- Path params: setId: string(uuid), required
- Response 200: string

### GET /charge-generation/qualification/{attributeName}
- Tags: ChargeGeneration
- Path params: attributeName: string, required
- Response 200: string(uuid)[]

### GET /charge-generation/qualification/{attributeName}/{attributeValue}
- Tags: ChargeGeneration
- Path params: attributeName: string, required; attributeValue: string, required
- Response 200: string(uuid)[]

### GET /charge-generation/qualification/activity/{elementId}
- Tags: ChargeGeneration
- Path params: elementId: string(uuid), required
- Response 200: string(uuid)[]

### POST /charge-generation/validate
- Tags: ChargeGeneration
- Request body: ValidationRequest[]
- Response 200: string

### GET /charge-validation-rules
- Tags: ChargeValidationRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /charge-validation-rules
- Tags: ChargeValidationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-validation-rules/{ruleId}
- Tags: ChargeValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /charge-validation-rules/{ruleId}/delete
- Tags: ChargeValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /charge-validation-rules/{ruleId}/update
- Tags: ChargeValidationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /charge-validation-rules/behaviors
- Tags: ChargeValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### PUT /charge-validation-rules/behaviors/{behaviorCategory}/enable
- Tags: ChargeValidationRule
- Path params: behaviorCategory: BehaviorCategory, required
- Response 200: string(uuid)

### GET /charge-validation-rules/behaviors/manualreview/releaseactions
- Tags: ChargeValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-validation-rules/behaviors/providervalidation/providerreplacementtype
- Tags: ChargeValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-validation-rules/behaviors/providervalidation/providertype
- Tags: ChargeValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-validation-rules/names/isunique
- Tags: ChargeValidationRule
- Query params: name: string
- Response 200: boolean

### GET /charge-validation-rules/qualifiers
- Tags: ChargeValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-validation-rules/ruleactions
- Tags: ChargeValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /charge-validation-sequences
- Tags: ChargeValidationSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /charge-validation-sequences
- Tags: ChargeValidationSequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-validation-sequences/{sequenceId}
- Tags: ChargeValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /charge-validation-sequences/{sequenceId}/archive
- Tags: ChargeValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charge-validation-sequences/{sequenceId}/download
- Tags: ChargeValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /charge-validation-sequences/{sequenceId}/restore
- Tags: ChargeValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-validation-sequences/{sequenceId}/rules
- Tags: ChargeValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /charge-validation-sequences/{sequenceId}/rules/reorder
- Tags: ChargeValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charge-validation-sequences/{sequenceId}/update
- Tags: ChargeValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /charge-validation-sequences/names/isunique
- Tags: ChargeValidationSequence
- Query params: name: string
- Response 200: boolean

### PUT /charge-validation-sequences/reorder
- Tags: ChargeValidationSequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

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

### GET /charge-validation/qualification/activity/{elementId}
- Tags: ChargeValidation
- Path params: elementId: string(uuid), required
- Response 200: string(uuid)[]

### POST /charge-validation/validate
- Tags: ChargeValidation
- Request body: ValidationRequest[]
- Response 200: string

### POST /charges
- Tags: Charge
- Request body: CreateChargeRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /charges/{chargeId}
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Response 200: ChargeDetail
- Response 404: ProblemDetails

### PUT /charges/{ChargeId}/ActivityType
- Tags: Charge
- Path params: ChargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: ActivityCodeRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/additional-properties
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: EditChargeAdditionalPropertiesRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/adjustment
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: ChargeAdjustment
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/assistances/manufacturer
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: EditManufacturerAssistanceRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /charges/{chargeId}/assistances/manufacturer
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Response 200: ManufacturerCopayAssistanceResponse[]
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/authorizations/{authorizationId}/remove
- Tags: Charge
- Path params: chargeId: string(uuid), required; authorizationId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/authorizations/add
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/authorizations/update
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: UpdateAuthorizationsRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{ChargeId}/BillingProvider/{billingProviderId}
- Tags: Charge
- Path params: ChargeId: string(uuid), required; billingProviderId: string(uuid), required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/BillingUnits/{billingUnits}
- Tags: Charge
- Path params: chargeId: string(uuid), required; billingUnits: ['number', 'string'](double), required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/ChargeCode/{chargeCode}
- Tags: Charge
- Path params: chargeId: string(uuid), required; chargeCode: string, required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/ChargeStatus/{chargeStatus}/{chargeSubStatus}
- Tags: Charge
- Path params: chargeId: string(uuid), required; chargeStatus: ChargeStatus, required; chargeSubStatus: ChargeSubStatus, required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/DateOfService/{dateOfService}
- Tags: Charge
- Path params: chargeId: string(uuid), required; dateOfService: string, required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/DiagnosisCodes
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: ChangeDiagnosisCodesRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/Division/{divisionId}/{companyId}
- Tags: Charge
- Path params: chargeId: string(uuid), required; divisionId: string(uuid), required; companyId: string(uuid), required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/Edit
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: EditChargeRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/Facility/{facilityId}
- Tags: Charge
- Path params: chargeId: string(uuid), required; facilityId: string(uuid), required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/Financials
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: ChargeFinancials
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/invoicesuppression/{suppressInvoicing}
- Tags: Charge
- Path params: chargeId: string(uuid), required; suppressInvoicing: boolean, required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/LedgerDate/{ledgerDate}
- Tags: Charge
- Path params: chargeId: string(uuid), required; ledgerDate: string, required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/Location/{locationId}
- Tags: Charge
- Path params: chargeId: string(uuid), required; locationId: string(uuid), required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/Modifiers
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: ChangeModifiersRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/modifiers/nonprimary
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: ChangeNonPrimaryModifiersRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/ndc-units/measurement
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: UnitsOfMeasureRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/ndc-units/quantity
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: UnitsQuantityRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/NDC/{NDC}
- Tags: Charge
- Path params: chargeId: string(uuid), required; NDC: string, required
- Query params: ignoreLocking: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/payer
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: EditChargePayerRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /charges/{chargeId}/preview
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Response 200: ChargePreview
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/procedureDetails
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: ProcedureDetailsRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/procedureDetails/description
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: ProcedureDescriptionRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/procedureDetails/note
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: ProcedureNoteRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/providers
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: EditChargeProvidersRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/providers/ordering
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: UpdateProviderRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/providers/supervising
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: UpdateProviderRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/providers/supporting
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Request body: UpdateProvidersRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/status-fields
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: force: boolean
- Request body: UpdateChargeStatusFieldsRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/suppression/disable
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/suppression/enable
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /charges/{chargeId}/Units
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: UnitsRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /charges/{chargeId}/Void
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Query params: ignoreLocking: boolean
- Request body: VoidChargeRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /charges/activity/{renderedActivityId}
- Tags: Charge
- Path params: renderedActivityId: string(uuid), required
- Response 200: ChargeResponse[]
- Response 404: ProblemDetails

### POST /charges/authorizations
- Tags: AccountsReceivable
- Request body: BulkAddAuthorizationRequest
- Response 200: BulkChargeActionResponse
- Response 400: ProblemDetails

### POST /charges/billing-details
- Tags: AccountsReceivable
- Request body: BulkEditBillingDetailsRequest
- Response 200: BulkChargeActionResponse
- Response 400: ProblemDetails

### POST /charges/details
- Tags: Charge
- Request body: GetChargeDetailsRequest
- Response 200: ChargeDetail[]

### POST /charges/diagnosis-codes
- Tags: AccountsReceivable
- Request body: BulkEditDiagnosisCodesRequest
- Response 200: BulkChargeActionResponse
- Response 400: ProblemDetails

### POST /charges/guidance
- Tags: Charge
- Request body: ChangeUserGuidanceRequest
- Response 200: (no body)

### POST /charges/snooze
- Tags: Charge
- Request body: SnoozeRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /charges/void
- Tags: Charge
- Query params: ignoreLocking: boolean
- Request body: VoidChargesRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /detached/bulk
- Tags: DetachedActivity
- Request body: BulkUpdateRequest
- Response 200: (no body)
- Response 202: BulkUpdateAcceptedResponse
- Response 400: ProblemDetails
- Response 500: (no body)

### POST /detached/count
- Tags: DetachedActivity
- Request body: SearchDetachedActivitiesRequest
- Response 200: DetachedActivityCountResponse

### POST /detached/discard
- Tags: DetachedActivity
- Request body: DiscardDetachedActivitiesRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /detached/dos
- Tags: DetachedActivity
- Request body: UpdateDetachedActivityDateOfServiceRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /detached/end
- Tags: DetachedActivity
- Request body: UpdateDetachedActivityDateRangeEndRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /detached/export
- Tags: DetachedActivity
- Request body: ExportDetachedActivitiesRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /detached/location
- Tags: DetachedActivity
- Request body: UpdateDetachedActivityLocationRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /detached/patient
- Tags: DetachedActivity
- Request body: UpdateDetachedActivityPatientRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /detached/release
- Tags: DetachedActivity
- Request body: ReleaseDetachedActivitiesRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /detached/search
- Tags: DetachedActivity
- Request body: SearchDetachedActivitiesRequest
- Response 200: PagedResultsOfDetachedActivityHeader

### POST /detached/search-all
- Tags: DetachedActivity
- Request body: SearchDetachedActivitiesRequest
- Response 200: DetachedActivityHeader[]

### PUT /detached/start
- Tags: DetachedActivity
- Request body: UpdateDetachedActivityDateRangeStartRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /draftactivities
- Tags: DraftActivity
- Request body: CreateDraftActivityRequest
- Response 200: DraftActivityResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/activityCode
- Tags: DraftActivity
- Path params: activityId: string(uuid), required
- Request body: ActivityCodeRequest
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/attendingprovider/{attendingProviderId}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; attendingProviderId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/dateofservice/{dateOfService}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; dateOfService: string, required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/diagnosiscodes
- Tags: DraftActivity
- Path params: activityId: string(uuid), required
- Request body: IcdCodeIdentity[]
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/end/{endDate}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; endDate: string, required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/hospitalization/admission/{admissionDate}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; admissionDate: string, required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/hospitalization/discharge/{dischargeDate}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; dischargeDate: string, required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/hospitalization/facility/{facilityId}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; facilityId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/location/{locationId}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; locationId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/modifiers
- Tags: DraftActivity
- Path params: activityId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/ndc
- Tags: DraftActivity
- Path params: activityId: string(uuid), required
- Request body: UpdateDraftActivityNDCRequest
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/orderingprovider/{orderingProviderId}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; orderingProviderId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/patient/{patientId}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; patientId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/referringprovider/{referringProviderId}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; referringProviderId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/start/{startDate}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; startDate: string, required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/supervisingprovider/{supervisingProviderId}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; supervisingProviderId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/supportingproviders
- Tags: DraftActivity
- Path params: activityId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/unitsofmeasure/{unitsOfMeasureId}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; unitsOfMeasureId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /draftactivities/{activityId}/unitsquantity/{unitsQuantity}
- Tags: DraftActivity
- Path params: activityId: string(uuid), required; unitsQuantity: ['number', 'string'](double), required
- Response 200: (no body)
- Response 404: ProblemDetails

### POST /draftactivities/delete
- Tags: DraftActivity
- Request body: string(uuid)[]
- Response 200: string
- Response 404: ProblemDetails

### POST /draftactivities/release
- Tags: DraftActivity
- Request body: string(uuid)[]
- Response 200: (no body)

### POST /draftactivities/search
- Tags: DraftActivity
- Request body: SearchDraftActivitiesRequest
- Response 200: DraftActivityResponse[]
- Response 404: ProblemDetails

### POST /import/activities
- Tags: ActivityImport
- Request body: object
- Response 200: string(uuid)
- Response 400: ProblemDetails

### GET /import/activities/template
- Tags: ActivityImport
- Response 200: (no body)

### POST /import/activity
- Tags: ActivityImport
- Request body: CreateActivityRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails

### POST /import/draftactivities
- Tags: ActivityImport
- Request body: object
- Response 200: DraftActivityResponse
- Response 400: ProblemDetails

### GET /import/draftactivities/template
- Tags: ActivityImport
- Response 200: (no body)

### GET /patients/{patientId}/testresults/recent
- Tags: PatientTestResult
- Path params: patientId: string(uuid), required
- Response 200: TestResultProjection[]

### GET /patients/{patientId}/testresults/type/{testResultTypeId}
- Tags: PatientTestResult
- Path params: patientId: string(uuid), required; testResultTypeId: string(uuid), required
- Response 200: TestResultProjection[]

### POST /patients/{patientId}/testresults/type/{testResultTypeId}
- Tags: PatientTestResult
- Path params: patientId: string(uuid), required; testResultTypeId: string(uuid), required
- Request body: UpdatePatientTestResultsRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails

### POST /RenderedActivities
- Tags: RenderedActivity
- Request body: CreateRenderedActivityRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /RenderedActivities/{RenderedActivityId}
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Response 200: RenderedActivityResponse
- Response 404: ProblemDetails

### DELETE /RenderedActivities/{RenderedActivityId}
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/ActivityStatus/{ActivityStatus}
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required; ActivityStatus: RenderedActivityStatus, required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/ActivityType
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Request body: ActivityCodeRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{renderedActivityId}/additional-properties
- Tags: RenderedActivity
- Path params: renderedActivityId: string(uuid), required
- Request body: ChangeAdditionalPropertiesRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/archive
- Tags: RenderedActivity
- Path params: renderedActivityId: string(uuid), required
- Query params: force: boolean
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/DateOfRecord/{DateOfRecord}
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required; DateOfRecord: string, required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/DateOfService/{DateOfService}
- Tags: RenderedActivity
- Path params: renderedActivityId: string(uuid), required; dateOfService: string, required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /RenderedActivities/{RenderedActivityId}/details
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Response 200: RenderedActivityDetail
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/Details
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Request body: ChangeDetailsRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/DiagnosisCodes
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Request body: ChangeDiagnosisCodesRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{renderedActivityId}/export
- Tags: RenderedActivity
- Path params: renderedActivityId: string(uuid), required
- Query params: exportPending: boolean
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/hospitalization
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Request body: ChangeHospitalizationRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/Location/{LocationId}
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required; LocationId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/MainDetails
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Request body: ChangeMainDetailsRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/Modifiers
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Request body: ChangeModifiersRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/NDCUnits
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Request body: ChangeNDCUnitsRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/Patient/{PatientId}
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required; PatientId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/Providers
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Request body: ChangeProvidersRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/status-fields
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Query params: force: boolean
- Request body: UpdateRenderedActivityStatusFieldsRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/validation/disable
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{RenderedActivityId}/validation/enable
- Tags: RenderedActivity
- Path params: RenderedActivityId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /RenderedActivities/{renderedActivityId}/validationstatus/complete
- Tags: RenderedActivity
- Path params: renderedActivityId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### POST /RenderedActivities/archive
- Tags: RenderedActivity
- Request body: string(uuid)[]
- Response 200: string(uuid)

### POST /RenderedActivities/guidance
- Tags: RenderedActivity
- Request body: ChangeUserGuidanceRequest
- Response 200: (no body)

### POST /RenderedActivities/portfolios/reassign
- Tags: RenderedActivity
- Request body: PortfolioReassignmentRequest[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /RenderedActivities/portfolios/reassign/{locationId}/{patientId}/{dateOfService}
- Tags: RenderedActivity
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required
- Response 200: PatientEncounter

### POST /RenderedActivities/search/patient/dates
- Tags: RenderedActivity
- Request body: PatientDateRangeSearchRequest
- Response 200: PatientActivitySearchResponse[]

### POST /RenderedActivities/snooze
- Tags: RenderedActivity
- Request body: SnoozeRequest
- Response 200: string(uuid)

### POST /RenderedActivities/unsnooze
- Tags: RenderedActivity
- Request body: string(uuid)[]
- Response 200: string(uuid)

### POST /signalr/activities-hub/negotiate
- Tags: Signalr
- Query params: user: string
- Response 200: (no body)

### POST /signalr/groups/{groupType}/users/add
- Tags: Signalr
- Path params: groupType: SignalrGroupType, required
- Response 200: (no body)

### POST /signalr/groups/{groupType}/users/remove
- Tags: Signalr
- Path params: groupType: SignalrGroupType, required
- Response 200: (no body)

## Schemas

**ActivityCodeRequest**
  - code: string (required)

**AssistanceOption**
  - copayProgramId: string(uuid) (required)
  - awardId: string(uuid) (required)
  - displayName: ['null', 'string'] (required)
  - payerName: ['null', 'string'] (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - coveredChargeCodeSets: string(uuid)[] (required)
  - coveredChargeCodes: string[] (required)

**AttributeQualifiers**
  - attributeType: AttributeType (required)
  - entityType: EntityType
  - nullQualifier: boolean
  - setQualifiers: ['null', 'array']
  - elementQualifiers: ['null', 'array']

**AttributeType**
  - (no properties)

**BalanceManagementAction**
  - action: ChargeBalanceManagementAction (required)
  - portfolioId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)

**BalanceManagementChargeActionRequest**
  - chargeId: string(uuid)
  - chargeAssemblyId: string(uuid)
  - portfolioId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - manufacturerCopayProgramId: ['null', 'string'](uuid)
  - manufacturerCopayAssistanceAwardId: ['null', 'string'](uuid)
  - isManufacturerRemoved: ['null', 'boolean']
  - action: ChargeBalanceManagementAction

**BalanceManagementChargeActionResponse**
  - chargeId: string(uuid) (required)
  - chargeAssemblyId: string(uuid) (required)
  - statusCode: HttpStatusCode (required)
  - errorMessage: ['null', 'string']

**BalanceManagementChargeAssemblyActionRequest**
  - chargeAssemblyId: string(uuid)
  - portfolioId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - manufacturerCopayProgramId: ['null', 'string'](uuid)
  - manufacturerCopayAssistanceAwardId: ['null', 'string'](uuid)
  - isManufacturerRemoved: ['null', 'boolean']
  - action: ChargeBalanceManagementAction

**BalanceManagementChargeAssemblyActionResponse**
  - chargeAssemblyId: ['null', 'string'](uuid) (required)
  - statusCode: HttpStatusCode (required)
  - chargeActionResponses: BalanceManagementChargeActionResponse[]
  - errorMessage: ['null', 'string']

**BalanceManagementChargeAssemblyGridItem**
  - chargeAssemblyId: string(uuid) (required)
  - chargeAssembly: EditableFieldOfGuid (required)
  - chargeCodes: EditableFieldOfGuid[] (required)
  - dateRange: EditableFieldOfstring (required)
  - currentAccount: EditableFieldOfGuid (required)
  - primaryAccount: EditableFieldOfGuid (required)
  - balance: EditableFieldOfdecimal (required)
  - paid: EditableFieldOfdecimal (required)
  - portfolio: PortfolioField (required)
  - division: EditableFieldOfGuid (required)
  - facility: EditableFieldOfGuid (required)
  - billingProvider: EditableFieldOfGuid (required)
  - portfolios: PortfolioOption[] (required)
  - quickAction: object (required)
  - isProcessing: boolean (required)
  - isErrored: boolean (required)

**BalanceManagementChargeGridItem**
  - activityId: ['null', 'string'](uuid) (required)
  - chargeId: string(uuid) (required)
  - chargeCodeWithModifiers: EditableFieldOfstring (required)
  - dateOfService: EditableFieldOfDate (required)
  - dateRange: EditableFieldOfstring (required)
  - currentAccount: EditableFieldOfGuid (required)
  - primaryAccount: EditableFieldOfGuid (required)
  - balance: EditableFieldOfdecimal (required)
  - paid: EditableFieldOfdecimal (required)
  - portfolio: PortfolioField (required)
  - assistance: EditableFieldOfGuid (required)
  - division: EditableFieldOfGuid (required)
  - facility: EditableFieldOfGuid (required)
  - billingProvider: EditableFieldOfGuid (required)
  - chargeAssembly: EditableFieldOfGuid (required)
  - portfolios: PortfolioOption[] (required)
  - quickAction: object (required)
  - isProcessing: boolean (required)
  - isErrored: boolean (required)

**BalanceManagementPatientResponse**
  - firstName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - fan: ['null', 'string'] (required)
  - birthDate: object (required)
  - primaryPayer: ['null', 'string'] (required)
  - primaryPlan: ['null', 'string'] (required)
  - primaryResponsibleProvider: ['null', 'string'] (required)

**BalanceManagementResponse**
  - patient: object (required)
  - charges: BalanceManagementChargeGridItem[] (required)
  - chargeAssemblies: BalanceManagementChargeAssemblyGridItem[] (required)
  - assistances: AssistanceOption[] (required)
  - relevantChargeCodeSets: KeyValuePairOfGuidAndString[][] (required)

**BehaviorCategory**
  - (no properties)

**BulkAddAuthorizationRequest**
  - patientId: string(uuid) (required)
  - charges: string(uuid)[] (required)
  - authorizationId: string(uuid) (required)
  - correlationId: ['null', 'string'](uuid)

**BulkChargeActionResponse**
  - chargeResponses: ChargeActionResponse[] (required)

**BulkEditBillingDetailsRequest**
  - patientId: string(uuid) (required)
  - charges: string(uuid)[] (required)
  - unitsOfMeasure: ['null', 'string'](uuid)
  - quantity: ['null', 'number', 'string'](double)
  - procedureNote: ['null', 'string']
  - procedureDescription: ['null', 'string']
  - correlationId: ['null', 'string'](uuid)

**BulkEditDiagnosisCodesRequest**
  - patientId: string(uuid) (required)
  - charges: string(uuid)[] (required)
  - diagnosisCodes: IcdCodeIdentity[] (required)
  - correlationId: ['null', 'string'](uuid)

**BulkEntityChange**
  - operationType: BulkOperationType
  - value: object[][][]

**BulkEntityUpdate**
  - entityId: string(uuid) (required)
  - changes: BulkEntityChange[] (required)

**BulkOperationType**
  - (no properties)

**BulkUpdateAcceptedResponse**
  - correlationId: string(uuid) (required)
  - totalUpdates: ['integer', 'string'](int32) (required)

**BulkUpdateRequest**
  - updates: BulkEntityUpdate[] (required)

**ChangeAdditionalPropertiesRequest**
  - additionalProperties: object

**ChangeDetailsRequest**
  - ndc: ['null', 'string'] (required)
  - units: Units (required)

**ChangeDiagnosisCodesRequest**
  - diagnosisCodes: IcdCodeIdentity[] (required)

**ChangeHospitalizationRequest**
  - admissionDate: object (required)
  - dischargeDate: object (required)
  - hospitalFacilityId: ['null', 'string'](uuid) (required)

**ChangeMainDetailsRequest**
  - spansMultipleDates: boolean
  - patientId: object
  - locationId: object
  - dateOfService: object
  - dateRangeStart: object
  - dateRangeEnd: object
  - activityTypeId: object
  - ndc: object
  - units: object
  - admissionDate: object
  - dischargeDate: object
  - hospitalFacilityId: object

**ChangeModifiersRequest**
  - modifiers: string(uuid)[] (required)

**ChangeNDCUnitsRequest**
  - unitOfMeasure: string(uuid) (required)
  - amount: ['number', 'string'](double) (required)

**ChangeNonPrimaryModifiersRequest**
  - modifiers: string(uuid)[] (required)

**ChangeProvidersRequest**
  - attendingProviderId: string(uuid) (required)
  - orderingProviderId: ['null', 'string'](uuid) (required)
  - supportingProviders: string(uuid)[] (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)
  - referringProviderId: ['null', 'string'](uuid) (required)

**ChangeUserGuidanceRequest**
  - chargeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - userGuidance: ['null', 'string'] (required)

**Channel**
  - id: string(uuid) (required)
  - name: string (required)
  - isDeleted: boolean (required)

**ChannelList**
  - systems: System[] (required)

**ChargeActionResponse**
  - chargeId: string(uuid) (required)
  - statusCode: HttpStatusCode (required)

**ChargeAdjustment**
  - adjustmentCatalogId: string(uuid) (required)
  - adjustmentTypeId: string(uuid) (required)

**ChargeBalanceManagementAction**
  - (no properties)

**ChargeDetail**
  - chargeId: string(uuid) (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - ledgerDate: Date (required)
  - locationId: string(uuid) (required)
  - channelId: ['null', 'string'](uuid) (required)
  - activityTypeId: ['null', 'string'] (required)
  - chargeCode: string (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - attendingProviderId: ['null', 'string'](uuid) (required)
  - orderingProviderId: ['null', 'string'](uuid) (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)
  - supportingProviders: string(uuid)[] (required)
  - referringProviderId: ['null', 'string'](uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - policyPlanId: ['null', 'string'](uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerMode: object (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - manufacturerCopayProgramId: ['null', 'string'](uuid) (required)
  - manufacturerCopayAssistanceAwardId: ['null', 'string'](uuid) (required)
  - ndc: ['null', 'string'] (required)
  - modifiers: Modifier[] (required)
  - icdCodes: DiagnosisCode[] (required)
  - units: object (required)
  - ndcUnits: object (required)
  - billingUnits: ['null', 'number', 'string'](double) (required)
  - admissionDate: object (required)
  - dischargeDate: object (required)
  - hospitalFacilityId: ['null', 'string'](uuid) (required)
  - chargeStatus: ChargeStatus
  - chargeSubStatus: ChargeSubStatus
  - voidReason: ['null', 'string'](uuid) (required)
  - validationStatus: ValidationStatus (required)
  - validationType: ValidationType (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)
  - financials: object (required)
  - authorizations: string(uuid)[]
  - suppressionEnabled: boolean (required)
  - adjustment: object (required)
  - suppressInvoicing: boolean (required)
  - procedureNote: ['null', 'string'] (required)
  - procedureDescription: ['null', 'string'] (required)
  - lastFiledDate: object (required)
  - isLocked: boolean
  - additionalProperties: object (required)
  - chargeAssemblyId: ['null', 'string'](uuid) (required)
  - spansMultipleDates: boolean
  - dna: ChargeDNA

**ChargeDNA**
  - portfolioId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)

**ChargeFinancials**
  - fee: ['number', 'string'](double) (required)
  - allowed: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - expectedAdjustmentApplied: boolean (required)

**ChargePreview**
  - chargeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - chargeCode: string (required)
  - billingUnits: ['null', 'number', 'string'](double) (required)
  - status: ChargeStatus (required)
  - subStatus: ChargeSubStatus (required)
  - balance: ['number', 'string'](double) (required)

**ChargeResponse**
  - organizationId: string(uuid) (required)
  - chargeId: string(uuid) (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - ledgerDate: Date (required)
  - locationId: string(uuid) (required)
  - channelId: ['null', 'string'](uuid) (required)
  - activityTypeId: ['null', 'string'] (required)
  - chargeCode: ['null', 'string'] (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - attendingProviderId: ['null', 'string'](uuid) (required)
  - orderingProviderId: ['null', 'string'](uuid) (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)
  - supportingProviders: string(uuid)[] (required)
  - referringProviderId: ['null', 'string'](uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - policyPlanId: ['null', 'string'](uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerMode: object (required)
  - ndc: ['null', 'string'] (required)
  - modifiers: Modifier[] (required)
  - icdCodes: IcdCodeIdentity[] (required)
  - units: object (required)
  - ndcUnits: object (required)
  - billingUnits: ['null', 'number', 'string'](double) (required)
  - admissionDate: object (required)
  - dischargeDate: object (required)
  - hospitalFacilityId: ['null', 'string'](uuid) (required)
  - chargeStatus: ChargeStatus (required)
  - chargeSubStatus: ChargeSubStatus (required)
  - voidReason: ['null', 'string'](uuid) (required)
  - validationStatus: ValidationStatus (required)
  - validationType: ValidationType (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)
  - financials: object (required)
  - authorizations: string(uuid)[] (required)
  - lastFiledDate: object (required)

**ChargeStatus**
  - (no properties)

**ChargeSubStatus**
  - (no properties)

**CreateActivityRequest**
  - channelId: ['null', 'string'](uuid)
  - channel: ['null', 'string']
  - patientId: ['null', 'string'](uuid)
  - patientFAN: ['null', 'string']
  - dosStart: ['null', 'string']
  - dosEnd: ['null', 'string']
  - dateOfService: ['null', 'string']
  - location: ['null', 'string']
  - locationId: ['null', 'string'](uuid)
  - activityType: ['null', 'string']
  - dateOfRecord: ['null', 'string']
  - attendingProvider: ['null', 'string']
  - orderingProvider: ['null', 'string']
  - supportingProviders: ['null', 'string']
  - supervisingProvider: ['null', 'string']
  - referringProvider: ['null', 'string']
  - modifiers: ['null', 'string']
  - ndc: ['null', 'string']
  - diagnosisCodes: ['null', 'string']
  - unitsMeasure: ['null', 'string']
  - unitsMeasureId: ['null', 'string'](uuid)
  - unitsQuantity: ['null', 'string']
  - hospitalizationFacility: ['null', 'string']
  - hospitalizationFacilityId: ['null', 'string'](uuid)
  - fromDate: ['null', 'string']
  - toDate: ['null', 'string']
  - additionalProperties: object

**CreateChargeRequest**
  - renderedActivityId: ['null', 'string'](uuid)
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - dateRangeStart: Date
  - dateRangeEnd: Date
  - ledgerDate: object
  - locationId: ['null', 'string'](uuid)
  - channelId: ['null', 'string'](uuid)
  - activityTypeId: ['null', 'string']
  - chargeCode: ['null', 'string'] (required)
  - divisionId: ['null', 'string'](uuid)
  - companyId: ['null', 'string'](uuid)
  - facilityId: ['null', 'string'](uuid)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - attendingProviderId: ['null', 'string'](uuid)
  - orderingingProviderId: ['null', 'string'](uuid)
  - supportingProviders: string(uuid)[]
  - supervisingProviderId: ['null', 'string'](uuid)
  - referringProviderId: ['null', 'string'](uuid)
  - portfolioId: ['null', 'string'](uuid)
  - policyId: ['null', 'string'](uuid)
  - policyPlanId: ['null', 'string'](uuid)
  - payerId: ['null', 'string'](uuid)
  - payerMode: object
  - guarantorId: ['null', 'string'](uuid)
  - guarantorIsPatient: ['null', 'boolean']
  - ndc: ['null', 'string']
  - modifiers: Modifier[]
  - icdCodes: IcdCodeIdentity[]
  - units: object
  - billingUnits: ['null', 'number', 'string'](double)
  - chargeStatus: ChargeStatus (required)
  - chargeSubStatus: ChargeSubStatus (required)
  - createdDate: string(date-time)
  - chargeAssemblyId: ['null', 'string'](uuid)
  - runChargeValidation: boolean

**CreateDraftActivityRequest**
  - activityCode: EditableFieldOfstring (required)
  - locationId: EditableFieldOfGuid (required)
  - dateOfService: EditableFieldOfDate (required)
  - dateRangeStart: EditableFieldOfDate (required)
  - dateRangeEnd: EditableFieldOfDate (required)
  - patientId: EditableFieldOfGuid (required)
  - attendingProviderId: EditableFieldOfGuid (required)
  - orderingProviderId: EditableFieldOfGuid (required)
  - supportingProviders: EditableFieldOfListOfGuid (required)
  - supervisingProviderId: EditableFieldOfGuid (required)
  - referringProviderId: EditableFieldOfGuid (required)
  - modifiers: EditableFieldOfListOfGuid (required)
  - diagnosisCodes: EditableFieldOfListOfIcdCodeIdentity (required)
  - unitsOfMeasureId: EditableFieldOfGuid (required)
  - quantity: EditableFieldOfdouble (required)
  - hospitalizationFacilityId: EditableFieldOfGuid (required)
  - fromDate: EditableFieldOfDate (required)
  - toDate: object (required)
  - ndc: object (required)
  - workflowId: string(uuid) (required)
  - channelId: ['null', 'string'](uuid) (required)

**CreateRenderedActivityRequest**
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - activityTypeId: string (required)
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - dateRangeStart: Date
  - dateRangeEnd: Date
  - patientId: string(uuid) (required)
  - dateOfRecord: Date (required)
  - attendingProviderId: string(uuid) (required)
  - orderingProviderId: ['null', 'string'](uuid) (required)
  - supportingProviders: string(uuid)[] (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)
  - referringProviderId: ['null', 'string'](uuid) (required)
  - modifiers: string(uuid)[] (required)
  - ndc: ['null', 'string'] (required)
  - diagnosisCodes: IcdCodeIdentity[] (required)
  - units: Units (required)
  - activityStatus: RenderedActivityStatus (required)
  - scheduledActivityId: ['null', 'string'](uuid) (required)
  - channelId: ['null', 'string'](uuid) (required)
  - chargeAssemblyId: ['null', 'string'](uuid) (required)
  - hospitalization: object (required)

**CreateRuleRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: BehaviorCategory (required)
  - startDate: object (required)
  - endDate: object (required)
  - selectAllChannels: boolean (required)
  - channels: string(uuid)[] (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualificationConfiguration: ['null', 'object']

**CreateSequenceRequest**
  - name: string (required)

**Date**
  - (no properties)

**DetachedActivityCountResponse**
  - detachedActivityCount: ['integer', 'string'](int32) (required)

**DetachedActivityHeader**
  - activityId: string(uuid) (required)
  - detachedPatient: DetachedPatient (required)
  - detachedLocation: DetachedLocation (required)
  - detachedDateRangeStart: DetachedDateRangeStart (required)
  - detachedDateRangeEnd: DetachedDateRangeEnd (required)
  - activityTypeId: ['null', 'string'] (required)
  - attendingProviderId: string(uuid) (required)
  - attendingProviderName: ['null', 'string'] (required)
  - channelId: string(uuid) (required)
  - receivedDate: string(date-time) (required)

**DetachedDateRangeEnd**
  - dateRangeEnd: object (required)
  - isInvalid: boolean
  - currentValue: object
  - displayValue: ['null', 'string']
  - custom: ['null', 'object']
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid)
  - isFixed: boolean
  - isEdited: boolean

**DetachedDateRangeStart**
  - dateRangeStart: object (required)
  - isInvalid: boolean
  - currentValue: object
  - displayValue: ['null', 'string']
  - custom: ['null', 'object']
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid)
  - isFixed: boolean
  - isEdited: boolean

**DetachedLocation**
  - locationId: ['null', 'string'](uuid) (required)
  - isInvalid: boolean
  - currentValue: ['null', 'string'](uuid)
  - displayValue: ['null', 'string']
  - custom: ['null', 'object']
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid)
  - isFixed: boolean
  - isEdited: boolean

**DetachedPatient**
  - patientId: ['null', 'string'](uuid) (required)
  - patientName: ['null', 'string'] (required)
  - isInvalid: boolean
  - currentValue: ['null', 'string'](uuid)
  - displayValue: ['null', 'string']
  - custom: ['null', 'object']
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid)
  - isFixed: boolean
  - isEdited: boolean

**DiagnosisCode**
  - id: ['null', 'string']
  - code: ['null', 'string']
  - icdCodeType: ['null', 'string']
  - definition: ['null', 'string']

**DiscardDetachedActivitiesRequest**
  - activities: string(uuid)[] (required)

**DraftActivityResponse**
  - activityId: string(uuid) (required)
  - activityCode: EditableFieldOfstring (required)
  - locationId: EditableFieldOfGuid (required)
  - dateOfService: EditableFieldOfDate (required)
  - dateRangeStart: EditableFieldOfDate (required)
  - dateRangeEnd: EditableFieldOfDate (required)
  - patientId: EditableFieldOfGuid (required)
  - attendingProviderId: EditableFieldOfGuid (required)
  - orderingProviderId: EditableFieldOfGuid (required)
  - supportingProviders: EditableFieldOfListOfGuid (required)
  - supervisingProviderId: EditableFieldOfGuid (required)
  - referringProviderId: EditableFieldOfGuid (required)
  - modifiers: EditableFieldOfListOfGuid (required)
  - diagnosisCodes: EditableFieldOfListOfIcdCodeIdentity (required)
  - unitsOfMeasureId: EditableFieldOfGuid (required)
  - quantity: EditableFieldOfdouble (required)
  - hospitalizationFacilityId: EditableFieldOfGuid (required)
  - fromDate: EditableFieldOfDate (required)
  - toDate: EditableFieldOfDate (required)
  - ndc: EditableFieldOfstring (required)

**EditableFieldOfDate**
  - currentValue: Date (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfdecimal**
  - currentValue: ['number', 'string'](double) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfdouble**
  - currentValue: ['null', 'number', 'string'](double) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfGuid**
  - currentValue: string(uuid) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfGuid[]**
  - currentValue: ['null', 'array'] (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfListOfGuid**
  - currentValue: ['null', 'array'] (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfListOfIcdCodeIdentity**
  - currentValue: ['null', 'array'] (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfstring**
  - currentValue: ['null', 'string'] (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditChargeAdditionalPropertiesRequest**
  - additionalProperties: object

**EditChargePayerRequest**
  - payerId: ['null', 'string'](uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - planId: ['null', 'string'](uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)

**EditChargeProvidersRequest**
  - orderingProviderId: ['null', 'string'](uuid) (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)
  - supportingProviders: string(uuid)[] (required)

**EditChargeRequest**
  - chargeCode: string (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - ndc: ['null', 'string'] (required)
  - modifiers: ['null', 'array'] (required)
  - billingUnits: ['null', 'number', 'string'](double) (required)
  - adjustment: object (required)
  - suppressInvoicing: boolean (required)
  - ndcUnits: object (required)
  - procedureNote: ['null', 'string'] (required)
  - procedureDescription: ['null', 'string'] (required)
  - admissionDate: object (required)
  - dischargeDate: object (required)
  - hospitalFacilityId: ['null', 'string'](uuid) (required)

**EditManufacturerAssistanceRequest**
  - manufacturerCopayProgramId: ['null', 'string'](uuid) (required)
  - manufacturerCopayAssistanceAwardId: ['null', 'string'](uuid) (required)

**ElementQualifier**
  - elementId: string (required)
  - exclusionary: boolean (required)

**EntityIdentity**
  - patientId: string(uuid) (required)
  - id: string(uuid) (required)

**EntityType**
  - (no properties)

**EpisodeQualifier**
  - allEpisodes: boolean (required)
  - episodeTypes: string(uuid)[] (required)
  - phases: string(uuid)[] (required)
  - exclusionary: boolean (required)

**ExportDetachedActivitiesRequest**
  - cinderChannels: string(uuid)[] (required)
  - selectAllChannels: boolean (required)

**GetChargeDetailsRequest**
  - chargeIds: string(uuid)[] (required)

**Hospitalization**
  - facilityId: ['null', 'string'](uuid) (required)
  - admissionDate: object (required)
  - dischargeDate: object (required)

**HttpStatusCode**
  - (no properties)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**IFormFile**
  - (no properties)

**KeyValuePairOfGuidAndString[]**
  - key: string(uuid) (required)
  - value: ['null', 'array'] (required)

**KeyValuePairOfintAndstring**
  - key: ['integer', 'string'](int32) (required)
  - value: ['null', 'string'] (required)

**ManufacturerCopayAssistanceResponse**
  - manufacturerCopayProgramId: ['null', 'string'](uuid) (required)
  - manufacturerCopayAssistanceAwardId: ['null', 'string'](uuid) (required)
  - programName: ['null', 'string'] (required)
  - assistanceNumber: ['null', 'string'] (required)

**Modifier**
  - modifierId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)

**ModifierName**
  - modifierId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - order: ['integer', 'string'](int32) (required)

**NDCUnits**
  - unitsOfMeasure: ['null', 'string'](uuid) (required)
  - quantity: ['null', 'number', 'string'](double) (required)

**NetType**
  - (no properties)

**PagedResultsOfDetachedActivityHeader**
  - results: DetachedActivityHeader[] (required)
  - continuation: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)

**PatientActivitySearchResponse**
  - activityId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - activityCode: ['null', 'string'] (required)
  - dateOfService: Date (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - units: object (required)
  - attendingProvider: object (required)
  - modifiers: ModifierName[] (required)
  - icdCodes: IcdCodeIdentity[] (required)

**PatientDateRangeSearchRequest**
  - patientId: string(uuid)
  - startDate: Date
  - endDate: Date

**PatientEncounter**
  - organizationId: string(uuid) (required)
  - patientEncounterId: PatientEncounterIdentity (required)
  - patientEncounterNumber: ['null', 'string']
  - scheduledActivities: string(uuid)[]
  - renderedActivities: string(uuid)[]
  - id: string
  - partition: string

**PatientEncounterIdentity**
  - locationId: string(uuid)
  - patientId: string(uuid)
  - dateOfService: Date

**PatientFinancialSummary**
  - organizationId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - insuranceBalance: ['number', 'string'](double) (required)
  - patientBalance: ['number', 'string'](double) (required)
  - assistanceBalance: ['number', 'string'](double) (required)
  - insuranceOldestCharge: object (required)
  - patientOldestCharge: object (required)
  - assistanceOldestCharge: object (required)
  - id: ['null', 'string']
  - partition: ['null', 'string']

**PayerMode**
  - (no properties)

**PortfolioField**
  - snfId: ['null', 'string'](uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - currentValue: ['null', 'string'](uuid) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**PortfolioOption**
  - id: string(uuid) (required)
  - name: string (required)
  - portfolioType: string (required)
  - policies: string[] (required)
  - isSnf: boolean (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - isAlternatePortfolio: boolean (required)
  - validActions: ChargeBalanceManagementAction[] (required)

**PortfolioReassignmentRequest**
  - portfolioId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - planId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - payerMode: PayerMode (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorIsPatient: ['null', 'boolean'] (required)
  - activities: string(uuid)[]

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ProcedureDescriptionRequest**
  - procedureDescription: ['null', 'string'] (required)

**ProcedureDetailsRequest**
  - procedureNote: ['null', 'string'] (required)
  - procedureDescription: ['null', 'string'] (required)

**ProcedureNoteRequest**
  - procedureNote: ['null', 'string'] (required)

**ProviderName**
  - providerId: string(uuid) (required)
  - name: ['null', 'string'] (required)

**QualifierHeader**
  - attributeType: AttributeType (required)
  - entityType: EntityType (required)
  - id: string (required)
  - isSet: boolean (required)
  - exclusionary: boolean (required)

**ReleaseDetachedActivitiesRequest**
  - activities: string(uuid)[] (required)

**ReleaseType**
  - (no properties)

**RenderedActivityDetail**
  - renderedActivityId: string(uuid) (required)
  - activityTypeId: ['null', 'string'] (required)
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - dateRangeStart: Date
  - dateRangeEnd: Date
  - patientId: string(uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - policyPlanId: ['null', 'string'](uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - dateOfRecord: Date (required)
  - attendingProviderId: string(uuid) (required)
  - orderingProviderId: ['null', 'string'](uuid) (required)
  - supportingProviders: string(uuid)[] (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)
  - referringProviderId: ['null', 'string'](uuid) (required)
  - modifiers: string(uuid)[] (required)
  - ndc: ['null', 'string'] (required)
  - diagnosisCodes: DiagnosisCode[] (required)
  - units: Units (required)
  - ndcUnits: NDCUnits (required)
  - activityStatus: ['null', 'string']
  - scheduledActivityId: ['null', 'string'](uuid) (required)
  - encounterNumber: ['null', 'string'] (required)
  - admissionDate: object (required)
  - dischargeDate: object (required)
  - hospitalFacilityId: ['null', 'string'](uuid) (required)
  - createdDate: string(date-time) (required)
  - receivedDate: string(date-time) (required)
  - isArchived: boolean (required)
  - complete: boolean
  - editable: boolean
  - additionalProperties: object (required)
  - spansMultipleDates: boolean

**RenderedActivityResponse**
  - organizationId: string(uuid) (required)
  - renderedActivityId: string(uuid) (required)
  - activityTypeId: ['null', 'string'] (required)
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - dateRangeStart: Date
  - dateRangeEnd: Date
  - patientId: string(uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - policyPlanId: ['null', 'string'](uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerMode: object (required)
  - dateOfRecord: Date (required)
  - attendingProviderId: string(uuid) (required)
  - orderingProviderId: ['null', 'string'](uuid) (required)
  - supportingProviders: string(uuid)[] (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)
  - referringProviderId: ['null', 'string'](uuid) (required)
  - modifiers: string(uuid)[] (required)
  - ndc: ['null', 'string'] (required)
  - diagnosisCodes: IcdCodeIdentity[] (required)
  - units: object (required)
  - activityStatus: RenderedActivityStatus (required)
  - scheduledActivityId: ['null', 'string'](uuid) (required)
  - encounterNumber: ['null', 'string'] (required)
  - admissionDate: object (required)
  - dischargeDate: object (required)
  - hospitalFacilityId: ['null', 'string'](uuid) (required)
  - createdDate: string(date-time) (required)
  - validationStatus: ValidationStatus (required)
  - validationType: ValidationType (required)
  - channelId: ['null', 'string'](uuid) (required)
  - receivedDate: string(date-time) (required)
  - validationSnoozeId: ['null', 'string'](uuid) (required)
  - isArchived: boolean (required)
  - additionalProperties: object (required)
  - spansMultipleDates: boolean

**RenderedActivityStatus**
  - (no properties)

**RuleAction**
  - (no properties)

**RuleDetail**
  - sequenceId: string(uuid) (required)
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string']
  - userGuidance: ['null', 'string']
  - behaviorCategory: BehaviorCategory (required)
  - startDate: object
  - endDate: object
  - selectAllChannels: boolean
  - channels: ['null', 'array']
  - qualifiers: ['null', 'array']
  - sameDateOfServiceQualifiers: ['null', 'array']
  - episodeQualifier: object
  - qualificationConfiguration: ['null', 'object']
  - behaviorConfiguration: ['null', 'object']
  - reviewRequired: boolean
  - ruleAction: RuleAction
  - releaseType: ReleaseType
  - netType: NetType (required)
  - createdByUserId: string(uuid)
  - createdDate: string(date-time)
  - lastModifiedByUserId: string(uuid)
  - lastModifiedDate: string(date-time)

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
  - selectAllChannels: boolean (required)
  - channels: string(uuid)[] (required)
  - qualifiers: QualifierHeader[] (required)
  - sameDateOfServiceQualifiers: QualifierHeader[] (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)

**SearchDetachedActivitiesRequest**
  - cinderChannels: string(uuid)[] (required)
  - selectAllChannels: boolean (required)
  - continuation: ['null', 'string'] (required)

**SearchDraftActivitiesRequest**
  - workflowId: string(uuid) (required)
  - userId: ['null', 'string'](uuid) (required)
  - activityIds: ['null', 'array'] (required)

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

**SequenceOrder**
  - sequenceId: string(uuid) (required)
  - status: SequenceStatus (required)
  - order: ['integer', 'string'](int32) (required)

**SequenceStatus**
  - (no properties)

**SetQualifier**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**SignalrGroupType**
  - (no properties)

**SnoozeRequest**
  - ids: EntityIdentity[] (required)
  - reason: string(uuid) (required)
  - endDate: Date (required)

**System**
  - id: string(uuid) (required)
  - name: string (required)
  - channels: Channel[]

**TestResultProjection**
  - testResultId: string(uuid) (required)
  - testResultTypeId: string(uuid) (required)
  - testResultValue: ['number', 'string'](double) (required)
  - testResultDate: Date (required)
  - testResultEnteredDate: Date (required)

**TestResultRequest**
  - testResultId: ['null', 'string'](uuid) (required)
  - testResultValue: ['number', 'string'](double) (required)
  - testResultDate: Date (required)

**TrackPropertyOfDate**
  - value: Date (required)
  - changed: boolean (required)

**TrackPropertyOfGuid**
  - value: string(uuid) (required)
  - changed: boolean (required)

**TrackPropertyOfstring**
  - value: ['null', 'string'] (required)
  - changed: boolean (required)

**TrackPropertyOfUnits**
  - value: object (required)
  - changed: boolean (required)

**Units**
  - unitsOfMeasure: string(uuid) (required)
  - quantity: ['number', 'string'](double) (required)

**UnitsOfMeasureRequest**
  - unitId: ['null', 'string'](uuid)

**UnitsQuantityRequest**
  - quantity: ['null', 'number', 'string'](double)

**UnitsRequest**
  - units: Units (required)

**UpdateAuthorizationsRequest**
  - authorizations: string(uuid)[] (required)

**UpdateChargeStatusFieldsRequest**
  - chargeStatus: object (required)
  - chargeSubStatus: object (required)
  - validationType: object (required)
  - validationStatus: object (required)

**UpdateDetachedActivityDateOfServiceRequest**
  - activityId: string(uuid) (required)
  - dateOfService: Date (required)

**UpdateDetachedActivityDateRangeEndRequest**
  - activityId: string(uuid) (required)
  - dateRangeEnd: Date (required)

**UpdateDetachedActivityDateRangeStartRequest**
  - activityId: string(uuid) (required)
  - dateRangeStart: Date (required)

**UpdateDetachedActivityLocationRequest**
  - activityId: string(uuid) (required)
  - locationId: string(uuid) (required)

**UpdateDetachedActivityPatientRequest**
  - activityId: string(uuid) (required)
  - patientId: string(uuid) (required)

**UpdateDraftActivityNDCRequest**
  - ndc: ['null', 'string'] (required)

**UpdatePatientTestResultsRequest**
  - testResultRequests: TestResultRequest[]

**UpdateProviderRequest**
  - providerId: ['null', 'string'](uuid) (required)

**UpdateProvidersRequest**
  - providers: string(uuid)[] (required)

**UpdateRenderedActivityStatusFieldsRequest**
  - status: object (required)
  - validationType: object (required)
  - validationStatus: object (required)

**UpdateRuleRequest**
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: BehaviorCategory (required)
  - startDate: object (required)
  - endDate: object (required)
  - selectAllChannels: boolean (required)
  - channels: string(uuid)[] (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualificationConfiguration: ['null', 'object']

**UpdateSequenceRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - enabled: boolean (required)

**ValidationRequest**
  - elementId: string(uuid) (required)
  - currentSequenceId: ['null', 'string'](uuid) (required)
  - currentRuleId: ['null', 'string'](uuid) (required)
  - releaseType: ReleaseType (required)
  - validationType: ValidationType (required)
  - chargeGenerationId: ['null', 'string'](uuid)
  - skipGlobalDuplicateDetection: ['null', 'boolean']

**ValidationStatus**
  - (no properties)

**ValidationType**
  - (no properties)

**VoidChargeRequest**
  - voidReason: string(uuid) (required)
  - ledgerDate: object (required)
  - resolved: boolean

**VoidChargesRequest**
  - chargeIds: string(uuid)[]
  - voidReason: string(uuid) (required)

