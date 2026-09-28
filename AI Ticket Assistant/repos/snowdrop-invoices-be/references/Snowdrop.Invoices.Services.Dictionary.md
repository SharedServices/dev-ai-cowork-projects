﻿# Snowdrop.Invoices.Services - API Dictionary

Repo: snowdrop-invoices-be
Source: Snowdrop.Invoices.Services.json

## Endpoints

### POST /accounts-receivable/claims/correct
- Tags: AccountsReceivable
- Request body: AccountsReceivableFinalizeClaimsRequest
- Response 200: BulkClaimActionResponse
- Response 400: ProblemDetails

### POST /accounts-receivable/claims/create
- Tags: AccountsReceivable
- Request body: AccountsReceivableNewClaimRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /accounts-receivable/claims/discard
- Tags: AccountsReceivable
- Request body: AccountsReceivableFinalizeClaimsRequest
- Response 200: BulkClaimActionResponse
- Response 400: ProblemDetails

### POST /accounts-receivable/claims/regenerate
- Tags: AccountsReceivable
- Request body: AccountsReceivableFinalizeClaimsRequest
- Response 200: BulkClaimActionResponse
- Response 400: ProblemDetails

### POST /accounts-receivable/claims/void
- Tags: AccountsReceivable
- Request body: AccountsReceivableFinalizeClaimsRequest
- Response 200: BulkClaimActionResponse
- Response 400: ProblemDetails

### GET /bill-generation-rules
- Tags: BillGenerationRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /bill-generation-rules
- Tags: BillGenerationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /bill-generation-rules/{ruleId}
- Tags: BillGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /bill-generation-rules/{ruleId}/delete
- Tags: BillGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /bill-generation-rules/{ruleId}/update
- Tags: BillGenerationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /bill-generation-rules/behaviors
- Tags: BillGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /bill-generation-rules/behaviors/manualreview/releaseactions
- Tags: BillGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /bill-generation-rules/names/isunique
- Tags: BillGenerationRule
- Query params: name: string
- Response 200: boolean

### GET /bill-generation-rules/qualifiers
- Tags: BillGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /bill-generation-rules/ruleactions
- Tags: BillGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /bill-generation-sequences
- Tags: BillGenerationSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /bill-generation-sequences
- Tags: BillGenerationSequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /bill-generation-sequences/{sequenceId}
- Tags: BillGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /bill-generation-sequences/{sequenceId}/archive
- Tags: BillGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /bill-generation-sequences/{sequenceId}/download
- Tags: BillGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /bill-generation-sequences/{sequenceId}/restore
- Tags: BillGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /bill-generation-sequences/{sequenceId}/rules
- Tags: BillGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /bill-generation-sequences/{sequenceId}/rules/reorder
- Tags: BillGenerationSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /bill-generation-sequences/{sequenceId}/update
- Tags: BillGenerationSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /bill-generation-sequences/names/isunique
- Tags: BillGenerationSequence
- Query params: name: string
- Response 200: boolean

### PUT /bill-generation-sequences/reorder
- Tags: BillGenerationSequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /bill-validation-sequences
- Tags: BillGenerationValidation
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /bill-validation-sequences
- Tags: BillGenerationValidation
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /bill-validation-sequences/{sequenceId}
- Tags: BillGenerationValidation
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /bill-validation-sequences/{sequenceId}/archive
- Tags: BillGenerationValidation
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /bill-validation-sequences/{sequenceId}/download
- Tags: BillGenerationValidation
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /bill-validation-sequences/{sequenceId}/restore
- Tags: BillGenerationValidation
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /bill-validation-sequences/{sequenceId}/rules
- Tags: BillGenerationValidation
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /bill-validation-sequences/{sequenceId}/rules/reorder
- Tags: BillGenerationValidation
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /bill-validation-sequences/{sequenceId}/update
- Tags: BillGenerationValidation
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /bill-validation-sequences/names/isunique
- Tags: BillGenerationValidation
- Query params: name: string
- Response 200: boolean

### PUT /bill-validation-sequences/reorder
- Tags: BillGenerationValidation
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /bills
- Tags: Bill
- Request body: CreateBillRequest
- Response 200: CreateBillResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /bills/{billId}
- Tags: Bill
- Path params: billId: string(uuid), required
- Response 200: BillDetailProjection
- Response 404: ProblemDetails

### PUT /bills/{billId}/status/provisional
- Tags: Bill
- Path params: billId: string(uuid), required
- Response 200: ActionResult
- Response 404: ProblemDetails

### PUT /bills/disposition
- Tags: Bill
- Request body: BillDispositionRequest
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /bills/rebrand
- Tags: Bill
- Request body: RebrandBillRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /bills/status
- Tags: Bill
- Request body: BillStatusRequest
- Response 200: ActionResult
- Response 404: ProblemDetails

### POST /charge-assemblies/claims
- Tags: ChargeAssemblies
- Request body: CreateChargeAssemblyClaimRequest
- Response 200: CreateChargeAssemblyClaimResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /charge-assemblies/claims/assign
- Tags: ChargeAssemblies
- Request body: AssignChargeAssemblyClaimRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /charges/{chargeId}/claims/creation/ability
- Tags: Charge
- Path params: chargeId: string(uuid), required
- Response 200: ClaimCreationAbility
- Response 404: ProblemDetails

### GET /charges/{chargeId}/claims/creation/portfolios/{portfolioId}/account
- Tags: Charge
- Path params: chargeId: string(uuid), required; portfolioId: string(uuid), required
- Response 200: ClaimCreationAccount
- Response 404: ProblemDetails

### POST /charges/samebilling/{chargeId}/{startdate}/{enddate}
- Tags: Charge
- Path params: chargeId: string, required; startdate: string, required; enddate: string, required
- Request body: NewClaimChargeSearchRequest
- Response 200: ChargeSummary[]
- Response 404: ProblemDetails

### GET /charges/samebilling/{chargeId}/{startdate}/{enddate}
- Tags: Charge
- Path params: chargeId: string(uuid), required; startDate: string, required; endDate: string, required
- Response 200: ChargeSummary[]
- Response 404: ProblemDetails

### POST /claims
- Tags: Claim
- Request body: CreateClaimRequest
- Response 200: ClaimDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/{claimId}/AttachPDF
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimValidationResult
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /claims/{claimId}/change-healthcare/institutional
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ChangeHealthcareInstitutionalViewProjection
- Response 404: ProblemDetails

### PUT /claims/{claimId}/change-healthcare/institutional/claim-information
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: ClaimInstitutionalRequest
- Response 200: ClaimInformationView
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /claims/{claimId}/change-healthcare/institutional/edi
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimEdiResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /claims/{claimId}/change-healthcare/institutional/generate
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimInstitutionalRequest
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 400: ProblemDetails

### GET /claims/{claimId}/change-healthcare/institutional/request
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimInstitutionalRequest
- Response 404: ProblemDetails

### POST /claims/{claimId}/change-healthcare/institutional/status
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /claims/{claimId}/change-healthcare/institutional/submit
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ProcessClaimResult
- Response 404: ProblemDetails

### POST /claims/{claimId}/change-healthcare/institutional/validate
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimValidationResult
- Response 404: ProblemDetails

### GET /claims/{claimId}/change-healthcare/professional
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ChangeHealthcareProfessionalViewProjection
- Response 404: ProblemDetails

### PUT /claims/{claimId}/change-healthcare/professional/claim-information
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: ClaimProfessionalRequest
- Response 200: ClaimInformationView
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /claims/{claimId}/change-healthcare/professional/diagnoses
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: HealthCareInformation[]
- Response 200: DiagnosesView
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /claims/{claimId}/change-healthcare/professional/edi
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimEdiResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /claims/{claimId}/change-healthcare/professional/generate
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimProfessionalRequest
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 400: ProblemDetails

### PUT /claims/{claimId}/change-healthcare/professional/other-subscribers
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: UpdateProfessionalOtherSubscriberRequest
- Response 200: OtherSubscribersView
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /claims/{claimId}/change-healthcare/professional/request
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimProfessionalRequest
- Response 404: ProblemDetails

### PUT /claims/{claimId}/change-healthcare/professional/service-lines
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: ProfessionalServiceLine
- Response 200: ServiceLinesView
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /claims/{claimId}/change-healthcare/professional/service-lines/order
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: string[]
- Response 200: ServiceLinesView
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/{claimId}/change-healthcare/professional/status
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /claims/{claimId}/change-healthcare/professional/submit
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ProcessClaimResult
- Response 404: ProblemDetails

### POST /claims/{claimId}/change-healthcare/professional/validate
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimValidationResult
- Response 404: ProblemDetails

### GET /claims/{claimId}/cms1500
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimDetails
- Response 404: ProblemDetails

### POST /claims/{claimId}/cms1500/Charges
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: ChargeSetAdjustment
- Response 200: ClaimDetails

### POST /claims/{claimId}/cms1500/charges/fields
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: ChargeFieldRequest
- Response 200: ClaimDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/{claimId}/cms1500/fields
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: FieldRequest[]
- Response 200: ClaimDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/{claimId}/cms1500/Submission
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: SubmissionProperty[]
- Response 200: ClaimDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /claims/{claimId}/cms1500/workspace
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: Cms1500ViewProjection
- Response 404: ProblemDetails

### GET /claims/{claimId}/crossover
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: CrossoverClaimViewProjection
- Response 404: ProblemDetails

### POST /claims/{claimId}/Printed
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimValidationResult
- Response 404: ProblemDetails

### POST /claims/{claimId}/Provision
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### POST /claims/{claimId}/RevertToValidated
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimValidationResult
- Response 404: ProblemDetails

### GET /claims/{claimId}/ub04
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: ClaimDetails
- Response 404: ProblemDetails

### POST /claims/{claimId}/ub04/Charges
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: ChargeSetAdjustment
- Response 200: ClaimDetails

### POST /claims/{claimId}/ub04/charges/fields
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: ChargeFieldRequest
- Response 200: ClaimDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/{claimId}/ub04/fields
- Tags: Claim
- Path params: claimId: string(uuid), required
- Request body: FieldRequest[]
- Response 200: ClaimDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /claims/{claimId}/ub04/workspace
- Tags: Claim
- Path params: claimId: string(uuid), required
- Response 200: Ub04ViewProjection
- Response 404: ProblemDetails

### POST /claims/change-healthcare/institutional/claim-information/validate
- Tags: Claim
- Request body: object
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /claims/change-healthcare/institutional/edi/build
- Tags: Claim
- Request body: ClaimInstitutionalRequest
- Response 200: RawEdiResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /claims/change-healthcare/institutional/schema
- Tags: Claim
- Response 200: object

### POST /claims/change-healthcare/professional/claim-information/validate
- Tags: Claim
- Request body: object
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /claims/change-healthcare/professional/diagnoses/validate
- Tags: Claim
- Request body: object[][][]
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /claims/change-healthcare/professional/edi/build
- Tags: Claim
- Request body: ClaimProfessionalRequest
- Response 200: RawEdiResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /claims/change-healthcare/professional/other-subscribers/validate
- Tags: Claim
- Request body: object
- Response 200: (no body)
- Response 400: ProblemDetails

### GET /claims/change-healthcare/professional/schema
- Tags: Claim
- Response 200: object

### POST /claims/change-healthcare/professional/service-lines/validate
- Tags: Claim
- Request body: object
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /claims/charges
- Tags: Claim
- Request body: EditClaimChargesRequest
- Response 200: IClaimWorkspaceView
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /claims/charges/search
- Tags: Claim
- Request body: SearchCandidateChargesRequest
- Response 200: ChargeSummary[]
- Response 404: ProblemDetails

### POST /claims/claimnumbersearch
- Tags: Claim
- Request body: ClaimNumberSearchRequest
- Response 200: ClaimNumberSearchResult[]
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /claims/cms1500/printconfig
- Tags: Claim
- Response 200: Cms1500PrintConfiguration
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/cms1500/printconfig
- Tags: Claim
- Request body: SaveCMS1500PrintConfigurationRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### GET /claims/cms1500/printconfig/default
- Tags: Claim
- Response 200: Cms1500PrintConfiguration
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/correct
- Tags: Claim
- Request body: ClaimActionRequest
- Response 200: NewClaimResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/correct/charges
- Tags: Claim
- Request body: EditClaimChargesRequest
- Response 200: IClaimWorkspaceView
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /claims/correct/charges/search
- Tags: Claim
- Request body: SearchCandidateChargesRequest
- Response 200: ChargeSummary[]
- Response 404: ProblemDetails

### POST /claims/Discard
- Tags: Claim
- Request body: ClaimActionRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /claims/patient/{patientId}
- Tags: Claim
- Path params: patientId: string(uuid), required
- Response 200: PatientClaimSummary[]

### POST /claims/patient/{patientId}/download
- Tags: Claim
- Path params: patientId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: (no body)
- Response 400: ProblemDetails

### GET /claims/patient/{patientId}/policies/{policyId}
- Tags: Claim
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Response 200: PatientPolicyClaimResponse[]

### POST /claims/regenerate
- Tags: Claim
- Request body: ClaimActionRequest
- Response 200: NewClaimResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/status
- Tags: Claim
- Request body: UpdateClaimStatusRequest
- Response 200: ClaimValidationResult
- Response 404: ProblemDetails

### DELETE /claims/submission/config/delete
- Tags: Claim
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/submission/config/update
- Tags: Claim
- Request body: ClaimSubmissionConfigRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /claims/void
- Tags: Claim
- Request body: ClaimActionRequest
- Response 200: NewClaimResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /denial-prediction/config
- Tags: DenialPrediction
- Response 200: DenialPredictionModelConfig[]

### POST /denial-prediction/config
- Tags: DenialPrediction
- Request body: DenialPredictionModelConfigRequest[]
- Response 200: (no body)

### GET /denial-prediction/enablement
- Tags: DenialPrediction
- Response 200: DenialPredictionEnablementResponse

### POST /denial-prediction/enablement
- Tags: DenialPrediction
- Request body: SetDenialPredictionEnablementRequest
- Response 200: (no body)

### POST /denial-prediction/predict
- Tags: DenialPrediction
- Request body: PredictDenialRequest
- Response 200: PredictDenialResponse
- Response 404: ProblemDetails

### GET /invoices/charge/{chargeId}
- Tags: Invoice
- Path params: chargeId: string(uuid), required
- Response 200: InvoiceSummary[]
- Response 404: ProblemDetails

### POST /ledger/charges/{chargeId}/transactions/rebuild
- Tags: Ledger
- Path params: chargeId: string(uuid), required
- Response 200: (no body)

### PUT /linked-encounters
- Tags: LinkedEncounter
- Request body: LinkedEncounterItems
- Response 200: (no body)

### PUT /linked-encounters/activities
- Tags: LinkedEncounter
- Request body: RenderedActivity
- Response 200: (no body)

### GET /linked-encounters/activities/{activityId}
- Tags: LinkedEncounter
- Path params: activityId: string(uuid), required
- Response 200: LinkedEncounterItems

### PUT /linked-encounters/charges
- Tags: LinkedEncounter
- Request body: ChargeIdentity
- Response 200: (no body)

### GET /linked-encounters/charges/{chargeId}
- Tags: LinkedEncounter
- Path params: chargeId: string(uuid), required
- Response 200: LinkedEncounterItems

### GET /linked-encounters/claims/{claimId}
- Tags: LinkedEncounter
- Path params: claimId: string(uuid), required
- Response 200: LinkedEncounterItems[]

### GET /margins/cms1500
- Tags: Margins
- Response 200: PdfMargins

### POST /margins/cms1500
- Tags: Margins
- Request body: SavePdfMarginsRequest
- Response 200: (no body)

### GET /margins/ub04
- Tags: Margins
- Response 200: PdfMargins

### POST /margins/ub04
- Tags: Margins
- Request body: SavePdfMarginsRequest
- Response 200: (no body)

### GET /primary-claim-generation-rules
- Tags: PrimaryClaimGenerationRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /primary-claim-generation-rules
- Tags: PrimaryClaimGenerationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /primary-claim-generation-rules/{ruleId}
- Tags: PrimaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /primary-claim-generation-rules/{ruleId}/delete
- Tags: PrimaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /primary-claim-generation-rules/{ruleId}/update
- Tags: PrimaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /primary-claim-generation-rules/behaviors
- Tags: PrimaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /primary-claim-generation-rules/behaviors/manualreview/releaseactions
- Tags: PrimaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /primary-claim-generation-rules/names/isunique
- Tags: PrimaryClaimGenerationRule
- Query params: name: string
- Response 200: boolean

### GET /primary-claim-generation-rules/qualifiers
- Tags: PrimaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /primary-claim-generation-rules/ruleactions
- Tags: PrimaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /primary-claim-generation-sequences
- Tags: PrimaryClaimGenerationSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /primary-claim-generation-sequences
- Tags: PrimaryClaimGenerationSequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /primary-claim-generation-sequences/{sequenceId}
- Tags: PrimaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /primary-claim-generation-sequences/{sequenceId}/archive
- Tags: PrimaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /primary-claim-generation-sequences/{sequenceId}/download
- Tags: PrimaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /primary-claim-generation-sequences/{sequenceId}/restore
- Tags: PrimaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /primary-claim-generation-sequences/{sequenceId}/rules
- Tags: PrimaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /primary-claim-generation-sequences/{sequenceId}/rules/reorder
- Tags: PrimaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /primary-claim-generation-sequences/{sequenceId}/update
- Tags: PrimaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /primary-claim-generation-sequences/names/isunique
- Tags: PrimaryClaimGenerationSequence
- Query params: name: string
- Response 200: boolean

### PUT /primary-claim-generation-sequences/reorder
- Tags: PrimaryClaimGenerationSequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /primary-claim-validation-rules
- Tags: PrimaryClaimValidationRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /primary-claim-validation-rules
- Tags: PrimaryClaimValidationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /primary-claim-validation-rules/{ruleId}
- Tags: PrimaryClaimValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /primary-claim-validation-rules/{ruleId}/delete
- Tags: PrimaryClaimValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /primary-claim-validation-rules/{ruleId}/update
- Tags: PrimaryClaimValidationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /primary-claim-validation-rules/behaviors
- Tags: PrimaryClaimValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /primary-claim-validation-rules/behaviors/manualreview/releaseactions
- Tags: PrimaryClaimValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /primary-claim-validation-rules/names/isunique
- Tags: PrimaryClaimValidationRule
- Query params: name: string
- Response 200: boolean

### GET /primary-claim-validation-rules/qualifiers
- Tags: PrimaryClaimValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /primary-claim-validation-rules/ruleactions
- Tags: PrimaryClaimValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### POST /primary-claim-validation-rules/script/validate
- Tags: PrimaryClaimValidationRule
- Request body: ValidateScriptRequest
- Response 200: ValidateScriptResponse
- Response 400: ProblemDetails

### GET /primary-claim-validation-sequences
- Tags: PrimaryClaimValidationSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /primary-claim-validation-sequences
- Tags: PrimaryClaimValidationSequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /primary-claim-validation-sequences/{sequenceId}
- Tags: PrimaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /primary-claim-validation-sequences/{sequenceId}/archive
- Tags: PrimaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /primary-claim-validation-sequences/{sequenceId}/download
- Tags: PrimaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /primary-claim-validation-sequences/{sequenceId}/restore
- Tags: PrimaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /primary-claim-validation-sequences/{sequenceId}/rules
- Tags: PrimaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /primary-claim-validation-sequences/{sequenceId}/rules/reorder
- Tags: PrimaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /primary-claim-validation-sequences/{sequenceId}/update
- Tags: PrimaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /primary-claim-validation-sequences/names/isunique
- Tags: PrimaryClaimValidationSequence
- Query params: name: string
- Response 200: boolean

### PUT /primary-claim-validation-sequences/reorder
- Tags: PrimaryClaimValidationSequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /review/{claimId}
- Tags: ClaimReviewItem
- Path params: claimId: string(uuid), required
- Response 200: ReviewItemDetails

### POST /review/guidance
- Tags: ClaimReviewItem
- Request body: UpdateUserGuidanceRequest
- Response 200: (no body)

### POST /review/release
- Tags: ClaimReviewItem
- Request body: ReleaseItemsRequest
- Response 200: (no body)

### GET /rules/behaviors
- Tags: Rules
- Response 200: KeyValuePairOfintAndstring[]

### GET /secondary-claim-generation-rules
- Tags: SecondaryClaimGenerationRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /secondary-claim-generation-rules
- Tags: SecondaryClaimGenerationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /secondary-claim-generation-rules/{ruleId}
- Tags: SecondaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /secondary-claim-generation-rules/{ruleId}/delete
- Tags: SecondaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /secondary-claim-generation-rules/{ruleId}/update
- Tags: SecondaryClaimGenerationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /secondary-claim-generation-rules/behaviors
- Tags: SecondaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /secondary-claim-generation-rules/behaviors/manualreview/releaseactions
- Tags: SecondaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /secondary-claim-generation-rules/names/isunique
- Tags: SecondaryClaimGenerationRule
- Query params: name: string
- Response 200: boolean

### GET /secondary-claim-generation-rules/qualifiers
- Tags: SecondaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /secondary-claim-generation-rules/ruleactions
- Tags: SecondaryClaimGenerationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /secondary-claim-generation-sequences
- Tags: SecondaryClaimGenerationSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /secondary-claim-generation-sequences
- Tags: SecondaryClaimGenerationSequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /secondary-claim-generation-sequences/{sequenceId}
- Tags: SecondaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /secondary-claim-generation-sequences/{sequenceId}/archive
- Tags: SecondaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /secondary-claim-generation-sequences/{sequenceId}/download
- Tags: SecondaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /secondary-claim-generation-sequences/{sequenceId}/restore
- Tags: SecondaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /secondary-claim-generation-sequences/{sequenceId}/rules
- Tags: SecondaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /secondary-claim-generation-sequences/{sequenceId}/rules/reorder
- Tags: SecondaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /secondary-claim-generation-sequences/{sequenceId}/update
- Tags: SecondaryClaimGenerationSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /secondary-claim-generation-sequences/names/isunique
- Tags: SecondaryClaimGenerationSequence
- Query params: name: string
- Response 200: boolean

### PUT /secondary-claim-generation-sequences/reorder
- Tags: SecondaryClaimGenerationSequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /secondary-claim-validation-rules
- Tags: SecondaryClaimValidationRule
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### POST /secondary-claim-validation-rules
- Tags: SecondaryClaimValidationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /secondary-claim-validation-rules/{ruleId}
- Tags: SecondaryClaimValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /secondary-claim-validation-rules/{ruleId}/delete
- Tags: SecondaryClaimValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /secondary-claim-validation-rules/{ruleId}/update
- Tags: SecondaryClaimValidationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /secondary-claim-validation-rules/behaviors
- Tags: SecondaryClaimValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /secondary-claim-validation-rules/behaviors/manualreview/releaseactions
- Tags: SecondaryClaimValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /secondary-claim-validation-rules/names/isunique
- Tags: SecondaryClaimValidationRule
- Query params: name: string
- Response 200: boolean

### GET /secondary-claim-validation-rules/qualifiers
- Tags: SecondaryClaimValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /secondary-claim-validation-rules/ruleactions
- Tags: SecondaryClaimValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### POST /secondary-claim-validation-rules/script/validate
- Tags: SecondaryClaimValidationRule
- Request body: ValidateScriptRequest
- Response 200: ValidateScriptResponse
- Response 400: ProblemDetails

### GET /secondary-claim-validation-sequences
- Tags: SecondaryClaimValidationSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /secondary-claim-validation-sequences
- Tags: SecondaryClaimValidationSequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /secondary-claim-validation-sequences/{sequenceId}
- Tags: SecondaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /secondary-claim-validation-sequences/{sequenceId}/archive
- Tags: SecondaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /secondary-claim-validation-sequences/{sequenceId}/download
- Tags: SecondaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /secondary-claim-validation-sequences/{sequenceId}/restore
- Tags: SecondaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /secondary-claim-validation-sequences/{sequenceId}/rules
- Tags: SecondaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /secondary-claim-validation-sequences/{sequenceId}/rules/reorder
- Tags: SecondaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /secondary-claim-validation-sequences/{sequenceId}/update
- Tags: SecondaryClaimValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /secondary-claim-validation-sequences/names/isunique
- Tags: SecondaryClaimValidationSequence
- Query params: name: string
- Response 200: boolean

### PUT /secondary-claim-validation-sequences/reorder
- Tags: SecondaryClaimValidationSequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### GET /users/cms1500/layout
- Tags: Users
- Response 200: PdfFieldLayoutResponse[]
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /users/cms1500/layout
- Tags: Users
- Request body: PdfFieldOffsets[]
- Response 200: (no body)

### GET /users/ub04/layout
- Tags: Users
- Response 200: PdfFieldLayoutResponse[]
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /users/ub04/layout
- Tags: Users
- Request body: PdfFieldOffsets[]
- Response 200: (no body)

### POST /validation/bills/generate
- Tags: Validation
- Request body: BillGenerationRequest
- Response 200: (no body)

### POST /validation/bills/provision
- Tags: Validation
- Request body: BillProvisionRequest
- Response 200: (no body)

### POST /validation/bills/validate
- Tags: Validation
- Request body: BillValidationRequest
- Response 200: (no body)

### POST /validation/claims/generate/primary
- Tags: Validation
- Request body: PrimaryClaimGenerationRequest
- Response 200: (no body)

### POST /validation/claims/provision/primary
- Tags: Validation
- Request body: PrimaryClaimProvisionRequest
- Response 200: (no body)

### POST /validation/claims/validate/primary
- Tags: Validation
- Request body: ClaimValidationRequest
- Response 200: (no body)

### POST /validation/claims/validate/secondary
- Tags: Validation
- Request body: ClaimValidationRequest
- Response 200: (no body)

## Schemas

**AccountsReceivableFinalizeClaimsRequest**
  - patientId: string(uuid) (required)
  - claims: string(uuid)[] (required)
  - claimUpdateReasonId: string(uuid) (required)
  - correlationId: ['null', 'string'](uuid)
  - icn: ['null', 'string']

**AccountsReceivableNewClaimRequest**
  - claimType: ClaimType (required)
  - patientId: string(uuid) (required)
  - charges: string(uuid)[] (required)
  - payerId: string(uuid) (required)
  - planId: ['null', 'string'](uuid)
  - policyId: ['null', 'string'](uuid)
  - snfId: ['null', 'string'](uuid)
  - snfPatientId: ['null', 'string'](uuid)
  - createdDate: string(date-time) (required)
  - correlationId: ['null', 'string'](uuid)

**ActionResult**
  - (no properties)

**Address**
  - address1: ['null', 'string']
  - address2: ['null', 'string']
  - city: ['null', 'string']
  - state: ['null', 'string']
  - postalCode: ['null', 'string']
  - countryCode: ['null', 'string']
  - countrySubDivisionCode: ['null', 'string']

**AdmittingDiagnosis**
  - admittingDiagnosisCode: ['null', 'string']
  - qualifierCode: ['null', 'string']

**AffectedCharge**
  - chargeCode: ['null', 'string'] (required)
  - lineOrdinal: ['integer', 'string'](int32) (required)
  - probability: ['number', 'string'](double) (required)

**AmbulanceCertification**
  - certificationConditionIndicator: ['null', 'string']
  - conditionCodes: ['null', 'array']

**AmbulanceTransportInformation**
  - ambulanceTransportReasonCode: ['null', 'string']
  - patientWeightInPounds: ['null', 'string']
  - roundTripPurposeDescription: ['null', 'string']
  - stretcherPurposeDescription: ['null', 'string']
  - transportDistanceInMiles: ['null', 'string']

**AssignChargeAssemblyClaimRequest**
  - patientId: string(uuid) (required)
  - chargeAssemblyId: string(uuid) (required)
  - claimId: string(uuid) (required)

**AttributeQualifiers**
  - attributeType: AttributeType (required)
  - entityType: EntityType
  - nullQualifier: boolean
  - setQualifiers: ['null', 'array']
  - elementQualifiers: ['null', 'array']

**AttributeType**
  - (no properties)

**BillDetailProjection**
  - organizationId: string(uuid) (required)
  - billId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - invoiceNumber: ['integer', 'string'](int64) (required)
  - patient: PatientHeader (required)
  - guarantor: object (required)
  - brand: object (required)
  - locationId: string(uuid) (required)
  - billStatus: string (required)
  - billStatusDate: Date (required)
  - billDisposition: string (required)
  - billDispositionDate: object (required)
  - charges: ChargeListItem[]
  - validationStatus: ValidationStatus (required)
  - invoiceTotal: ['number', 'string'](double) (required)
  - createdDate: string(date-time) (required)
  - invoicePayerSummaries: InvoicePayerSummaryResponse[]
  - contractualAdjustments: ContractualAdjustmentResponse[]
  - nonContractualAdjustments: NonContractualAdjustmentResponse[]
  - partition: string
  - id: string

**BillDisposition**
  - (no properties)

**BillDispositionRequest**
  - billId: string(uuid) (required)
  - disposition: BillDisposition (required)

**BillGenerationRequest**
  - organizationId: string(uuid) (required)
  - chargeId: string(uuid) (required)
  - enqueuedTime: ['null', 'string'](date-time)
  - initialVisibilityDelay: ['null', 'string']

**BillingPayToAddressName**
  - address: Address
  - entityTypeQualifier: ['null', 'string']

**BillingPayToPlanName**
  - address: Address
  - claimOfficeNumber: ['null', 'string']
  - identificationCode: ['null', 'string']
  - identificationCodeQualifier: ['null', 'string']
  - naic: ['null', 'string']
  - organizationName: ['null', 'string']
  - payerIdentificationNumber: ['null', 'string']
  - taxId: ['null', 'string']

**BillProvisionRequest**
  - organizationId: string(uuid) (required)
  - billId: string(uuid) (required)
  - enqueuedTime: ['null', 'string'](date-time)
  - initialVisibilityDelay: ['null', 'string']

**BillStatus**
  - (no properties)

**BillStatusRequest**
  - billId: string(uuid) (required)
  - status: BillStatus (required)

**BillValidationRequest**
  - organizationId: string(uuid) (required)
  - billId: string(uuid) (required)
  - currentSequenceId: ['null', 'string'](uuid) (required)
  - currentRuleId: ['null', 'string'](uuid) (required)
  - releaseType: ReleaseType (required)
  - releasedTime: ['null', 'string'](date-time)
  - enqueuedTime: ['null', 'string'](date-time)
  - initialVisibilityDelay: ['null', 'string']

**BrandHeader**
  - brandId: string(uuid) (required)
  - name: string (required)
  - logoUrl: ['null', 'string'] (required)

**BulkClaimActionResponse**
  - claimResponses: ClaimActionResponse[] (required)

**CauseOfInjury**
  - externalCauseOfInjury: ['null', 'string']
  - presentOnAdmissionIndicator: ['null', 'string']
  - qualifierCode: ['null', 'string']

**ChangeHealthcareDiagnosisPointer**
  - icdCodeIdentity: object (required)
  - pointer: string (required)
  - code: string (required)
  - description: ['null', 'string'] (required)

**ChangeHealthcareError**
  - code: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - field: ['null', 'string'] (required)
  - followupAction: ['null', 'string'] (required)
  - location: ['null', 'string'] (required)
  - value: ['null', 'string'] (required)

**ChangeHealthcareInstitutionalViewProjection**
  - organizationId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - invoiceNumber: ['null', 'string'] (required)
  - claimStatus: string (required)
  - claimStatusDate: Date (required)
  - claimDisposition: ['null', 'string'] (required)
  - claimDispositionDate: object (required)
  - discardReasonId: ['null', 'string'](uuid) (required)
  - patient: object (required)
  - policy: object (required)
  - company: object (required)
  - division: object (required)
  - facility: object (required)
  - billingProvider: object (required)
  - charges: ChargeListItem[] (required)
  - claimInformation: ClaimInformationView (required)
  - changeHealthcareData: object (required)
  - previousVersions: ClaimVersionSummary[] (required)
  - canDiscard: boolean (required)
  - canRegenerate: boolean (required)
  - canCorrect: boolean (required)
  - canVoid: boolean (required)
  - claimFrequency: ['null', 'string'] (required)
  - hasChargesEdited: boolean (required)
  - icn: ['null', 'string'] (required)
  - chargeAssemblyId: ['null', 'string'](uuid) (required)
  - chargeAssemblyNumber: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)
  - invoiceTotal: ['number', 'string'](double)
  - partition: ['null', 'string']
  - id: ['null', 'string']

**ChangeHealthcareProfessionalViewProjection**
  - organizationId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - invoiceNumber: ['null', 'string'] (required)
  - claimStatus: string (required)
  - claimStatusDate: Date (required)
  - claimDisposition: ['null', 'string'] (required)
  - claimDispositionDate: object (required)
  - discardReasonId: ['null', 'string'](uuid) (required)
  - patient: object (required)
  - policy: object (required)
  - company: object (required)
  - division: object (required)
  - facility: object (required)
  - billingProvider: object (required)
  - charges: ChargeListItem[] (required)
  - claimInformation: ClaimInformationView (required)
  - diagnoses: DiagnosesView (required)
  - serviceLines: ServiceLinesView (required)
  - otherSubscribersView: OtherSubscribersView (required)
  - changeHealthcareData: object (required)
  - previousVersions: ClaimVersionSummary[] (required)
  - canDiscard: boolean (required)
  - canRegenerate: boolean (required)
  - canCorrect: boolean (required)
  - canVoid: boolean (required)
  - claimFrequency: ['null', 'string'] (required)
  - hasChargesEdited: boolean (required)
  - icn: ['null', 'string'] (required)
  - chargeAssemblyId: ['null', 'string'](uuid) (required)
  - chargeAssemblyNumber: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)
  - denialPrediction: object
  - invoiceTotal: ['number', 'string'](double)
  - partition: ['null', 'string']
  - id: ['null', 'string']

**ChangeHealthcareProvider**
  - address: Address
  - commercialNumber: ['null', 'string']
  - contactInformation: ContactInformation
  - employerId: ['null', 'string']
  - etin: ['null', 'string']
  - firstName: ['null', 'string']
  - lastName: ['null', 'string']
  - locationNumber: ['null', 'string']
  - middleName: ['null', 'string']
  - npi: ['null', 'string']
  - organizationName: ['null', 'string']
  - providerType: ['null', 'string']
  - providerUpinNumber: ['null', 'string']
  - ssn: ['null', 'string']
  - secondaryIdentificationQualifierCode: ['null', 'string']
  - secondaryIdentifier: ['null', 'string']
  - stateLicenseNumber: ['null', 'string']
  - suffix: ['null', 'string']
  - taxId: ['null', 'string']
  - taxonomyCode: ['null', 'string']

**ChangeHealthcareServiceLine**
  - chargeId: ['null', 'string'](uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - modifiers: string[] (required)
  - units: ['null', 'string'] (required)
  - chargeAmount: ['null', 'number', 'string'](double) (required)
  - ndc: ['null', 'string'] (required)

**ChargeFieldRequest**
  - index: ['integer', 'string'](int32) (required)
  - chargeId: string(uuid) (required)
  - fields: FieldRequest[] (required)

**ChargeFieldsResponse**
  - chargeId: string(uuid) (required)
  - index: ['integer', 'string'](int32) (required)
  - page: ['integer', 'string'](int32) (required)
  - fields: FieldResponse[] (required)

**ChargeIdentity**
  - organizationId: string(uuid) (required)
  - chargeId: string(uuid) (required)
  - chargeCode: string (required)
  - chargeStatus: ChargeStatus (required)
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - policyId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - activityCode: ['null', 'string'] (required)
  - complete: boolean
  - partition: string
  - id: string

**ChargeListItem**
  - chargeId: string(uuid) (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)
  - chargeCode: string (required)
  - modifiers: string[] (required)
  - dateOfService: Date (required)
  - balance: ['null', 'number', 'string'](double) (required)
  - fee: ['null', 'number', 'string'](double) (required)
  - ndc: ['null', 'string'] (required)

**ChargeProbability**
  - lineOrdinal: ['integer', 'string'](int32) (required)
  - chargeCode: ['null', 'string'] (required)
  - probability: ['number', 'string'](double) (required)

**ChargeSetAdjustment**
  - addCharges: ['null', 'array'] (required)
  - removeCharges: ['null', 'array'] (required)

**ChargeSetReference**
  - chargeId: string(uuid) (required)

**ChargeStatus**
  - (no properties)

**ChargeSubStatus**
  - (no properties)

**ChargeSummary**
  - chargeId: string(uuid) (required)
  - chargeCode: string (required)
  - dateOfService: Date (required)
  - fee: ['null', 'number', 'string'](double) (required)
  - balance: ['null', 'number', 'string'](double) (required)
  - modifiers: string(uuid)[] (required)
  - ndc: ['null', 'string'] (required)
  - chargeStatus: ChargeStatus (required)
  - chargeSubStatus: ChargeSubStatus (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)

**ClaimActionRequest**
  - claimId: string(uuid) (required)
  - claimUpdateReasonId: string(uuid) (required)
  - icn: ['null', 'string']

**ClaimActionResponse**
  - claimId: string(uuid) (required)
  - statusCode: HttpStatusCode (required)

**ClaimAdjustmentDetails**
  - adjustmentAmount: ['null', 'string']
  - adjustmentQuantity: ['null', 'string']
  - adjustmentReasonCode: ['null', 'string']

**ClaimChargeSummary**
  - chargeId: string(uuid) (required)
  - chargeCode: string (required)
  - modifiers: string(uuid)[] (required)
  - dateOfService: Date (required)
  - renderedActivityId: ['null', 'string'](uuid) (required)

**ClaimCodeInformation**
  - admissionSourceCode: ['null', 'string']
  - admissionTypeCode: ['null', 'string']
  - patientStatusCode: ['null', 'string']

**ClaimContractInformation**
  - contractAmount: ['null', 'string']
  - contractCode: ['null', 'string']
  - contractPercentage: ['null', 'string']
  - contractTypeCode: ['null', 'string']
  - contractVersionIdentifier: ['null', 'string']
  - termsDiscountPercentage: ['null', 'string']

**ClaimCreationAbility**
  - chargeId: string(uuid) (required)
  - canAddClaim: boolean (required)

**ClaimCreationAccount**
  - chargeId: string(uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)

**ClaimDenialPredictionView**
  - title: string (required)
  - header: string (required)
  - flaggedModels: FlaggedModelPrediction[] (required)
  - incompleteRuns: IncompleteModelPrediction[] (required)

**ClaimDetails**
  - claimId: string(uuid) (required)
  - claimType: string (required)
  - invoiceNumber: ['null', 'string'] (required)
  - patientId: string(uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - payerId: string(uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - companyId: string(uuid) (required)
  - facilityId: string(uuid) (required)
  - billingProviderId: string(uuid) (required)
  - invoiceTotal: ['number', 'string'](double) (required)
  - claimStatus: string (required)
  - claimStatusDate: Date (required)
  - claimDisposition: ['null', 'string'] (required)
  - claimDispositionDate: object (required)
  - charges: ClaimChargeSummary[] (required)
  - properties: SubmissionProperty[] (required)
  - pdfNoteId: ['null', 'string'](uuid)
  - pdfAttachmentId: ['null', 'string'](uuid) (required)

**ClaimEdiResponse**
  - organizationId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - edi: string (required)

**ClaimFrequency**
  - (no properties)

**ClaimInformationOrganization**
  - organizationName: ['null', 'string'] (required)
  - npi: ['null', 'string'] (required)
  - serviceFacilityName: ['null', 'string'] (required)

**ClaimInformationPayer**
  - payerName: ['null', 'string'] (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - city: ['null', 'string'] (required)
  - state: ['null', 'string'] (required)
  - zipCode: ['null', 'string'] (required)
  - phoneNumber: ['null', 'string'] (required)

**ClaimInformationSubscriber**
  - firstName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - relationship: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)

**ClaimInformationView**
  - subscriber: ClaimInformationSubscriber (required)
  - payer: object (required)
  - organization: ClaimInformationOrganization (required)

**ClaimInstitutionalRequest**
  - claimId: string(uuid)
  - attending: ChangeHealthcareProvider
  - billing: ChangeHealthcareProvider
  - billingPayToAddressName: BillingPayToAddressName
  - billingPayToPlanName: BillingPayToPlanName
  - claimInformation: InstitutionalClaimInformation
  - controlNumber: ['null', 'string']
  - dependent: Dependent
  - operatingPhysician: OperatingPhysician
  - otherOperatingPhysician: OperatingPhysician
  - payerAddress: Address
  - providers: ['null', 'array']
  - receiver: Receiver
  - referring: ChangeHealthcareProvider
  - rendering: ChangeHealthcareProvider
  - submitter: Submitter
  - subscriber: Subscriber
  - tradingPartnerId: ['null', 'string']
  - tradingPartnerName: ['null', 'string']
  - tradingPartnerServiceId: ['null', 'string']
  - usageIndicator: ['null', 'string']
  - claimNumber: ['null', 'string']

**ClaimNumberSearchChargeResult**
  - chargeId: string(uuid) (required)
  - chargeCode: string (required)
  - chargeStatus: string (required)
  - chargeSubStatus: string (required)
  - fee: ['null', 'number', 'string'](double) (required)
  - balance: ['null', 'number', 'string'](double) (required)

**ClaimNumberSearchRequest**
  - claimNumber: string (required)

**ClaimNumberSearchResult**
  - claimId: string(uuid) (required)
  - invoiceNumber: string (required)
  - invoiceType: string (required)
  - claimStatus: string (required)
  - claimStatusDate: Date (required)
  - claimDisposition: string (required)
  - claimDispositionDate: object (required)
  - planId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - claimTotal: ['number', 'string'](double) (required)
  - chargeBalance: ['number', 'string'](double) (required)
  - dateOfService: Date (required)
  - submittedDate: object (required)
  - createdDate: Date (required)
  - createdByUserId: ['null', 'string'](uuid) (required)
  - chargeIds: ClaimNumberSearchChargeResult[] (required)

**ClaimPricingInformation**
  - exceptionCode: ['null', 'string']
  - policyComplianceCode: ['null', 'string']
  - pricingMethodologyCode: ['null', 'string']
  - productOrServiceIDQualifier: ['null', 'string']
  - rejectReasonCode: ['null', 'string']
  - repricedAllowedAmount: ['null', 'string']
  - repricedApprovedAmount: ['null', 'string']
  - repricedApprovedDRGCode: ['null', 'string']
  - repricedApprovedHCPCSCode: ['null', 'string']
  - repricedApprovedRevenueCode: ['null', 'string']
  - repricedApprovedServiceUnitCode: ['null', 'string']
  - repricedApprovedServiceUnitCount: ['null', 'string']
  - repricedOrgIdentifier: ['null', 'string']
  - repricedPerDiem: ['null', 'string']
  - repricedSavingAmount: ['null', 'string']

**ClaimPricingRepricingInformation**
  - exceptionCode: ['null', 'string']
  - policyComplianceCode: ['null', 'string']
  - pricingMethodologyCode: ['null', 'string']
  - rejectReasonCode: ['null', 'string']
  - repricedAllowedAmount: ['null', 'string']
  - repricedApprovedAmbulatoryPatientGroupAmount: ['null', 'string']
  - repricedApprovedAmbulatoryPatientGroupCode: ['null', 'string']
  - repricedSavingAmount: ['null', 'string']
  - repricingOrganizationIdentifier: ['null', 'string']
  - repricingPerDiemOrFlatRateAmoung: ['null', 'string']

**ClaimProfessionalRequest**
  - claimId: string(uuid)
  - billing: ChangeHealthcareProvider
  - claimInformation: ProfessionalClaimInformation
  - controlNumber: ['null', 'string']
  - dependent: Dependent
  - ordering: ChangeHealthcareProvider
  - partnerId: ['null', 'boolean']
  - payToAddress: Address
  - payToPlan: PayToPlan
  - payerAddress: Address
  - providers: ['null', 'array']
  - receiver: Receiver
  - referring: ChangeHealthcareProvider
  - rendering: ChangeHealthcareProvider
  - submitter: Submitter
  - subscriber: Subscriber
  - supervising: ChangeHealthcareProvider
  - tradingPartnerId: ['null', 'string']
  - tradingPartnerName: ['null', 'string']
  - tradingPartnerServiceId: ['null', 'string']
  - usageIndicator: ['null', 'string']
  - payerSecondaryIdentifier: PayerSecondaryIdentification
  - claimNumber: ['null', 'string']

**ClaimStatus**
  - (no properties)

**ClaimSubmissionConfigRequest**
  - claimTypes: ['null', 'array']
  - payerSubmissions: PayerSubmission[]

**ClaimType**
  - (no properties)

**ClaimValidationRequest**
  - organizationId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - currentSequenceId: ['null', 'string'](uuid) (required)
  - currentRuleId: ['null', 'string'](uuid) (required)
  - releaseType: ReleaseType (required)
  - snoozeId: ['null', 'string'](uuid) (required)
  - snoozeEndTime: ['null', 'string'](date-time)
  - releasedTime: ['null', 'string'](date-time)
  - enqueuedTime: ['null', 'string'](date-time)
  - initialVisibilityDelay: ['null', 'string']

**ClaimValidationResult**
  - claimId: string(uuid) (required)
  - controlNumber: string (required)
  - status: ['null', 'string'] (required)
  - tradingPartnerId: ['null', 'string'] (required)
  - tradingPartnerServiceId: ['null', 'string'] (required)
  - claimType: ['null', 'string'] (required)
  - correlationId: ['null', 'string'] (required)
  - customerClaimNumber: ['null', 'string'] (required)
  - patientControlNumber: ['null', 'string'] (required)
  - submitterId: ['null', 'string'] (required)
  - timeOfResponse: ['null', 'string'](date-time) (required)
  - errors: ChangeHealthcareError[] (required)

**ClaimVersionSummary**
  - claimId: string(uuid) (required)
  - invoiceNumber: ['integer', 'string'](int64) (required)
  - claimType: string (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - chargeCount: ['integer', 'string'](int32) (required)
  - invoiceTotal: ['number', 'string'](double) (required)
  - status: ['null', 'string'] (required)
  - statusDate: ['null', 'string'](date-time) (required)

**Cms1500PrintConfiguration**
  - (no properties)

**Cms1500ViewProjection**
  - organizationId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - invoiceNumber: string (required)
  - claimStatus: string (required)
  - claimStatusDate: Date (required)
  - claimDisposition: ['null', 'string'] (required)
  - claimDispositionDate: object (required)
  - discardReasonId: ['null', 'string'](uuid) (required)
  - invoiceTotal: ['number', 'string'](double) (required)
  - patient: object (required)
  - policy: object (required)
  - company: object (required)
  - facility: object (required)
  - division: object (required)
  - billingProvider: object (required)
  - charges: ChargeListItem[] (required)
  - properties: SubmissionProperty[] (required)
  - claimContent: PdfClaimContentResponse (required)
  - pdfNoteId: ['null', 'string'](uuid) (required)
  - pdfAttachmentId: ['null', 'string'](uuid) (required)
  - previousVersions: ClaimVersionSummary[] (required)
  - canDiscard: boolean (required)
  - canRegenerate: boolean (required)
  - canCorrect: boolean (required)
  - canVoid: boolean (required)
  - claimFrequency: ['null', 'string'] (required)
  - hasChargesEdited: boolean (required)
  - icn: ['null', 'string'] (required)
  - chargeAssemblyId: ['null', 'string'](uuid) (required)
  - chargeAssemblyNumber: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)
  - partition: ['null', 'string']
  - id: ['null', 'string']

**CompanyHeader**
  - companyId: string(uuid) (required)
  - companyName: string (required)

**CompositeDiagnosisCodePointers**
  - diagnosisCodePointers: ['null', 'array']

**ConditionIndicatorDurableMedicalEquipment**
  - certificationConditionIndicator: ['null', 'string']
  - conditionIndicator: ['null', 'string']
  - conditionIndicatorCode: ['null', 'string']

**ConditionInformation**
  - conditionCodes: ['null', 'array']

**ContactInformation**
  - email: ['null', 'string']
  - faxNumber: ['null', 'string']
  - name: ['null', 'string']
  - phoneNumber: ['null', 'string']
  - validContact: ['null', 'boolean']

**ContractInformation**
  - contractAmount: ['null', 'string']
  - contractCode: ['null', 'string']
  - contractPercentage: ['null', 'string']
  - contractTypeCode: ['null', 'string']
  - contractVersionIdentifier: ['null', 'string']
  - termsDiscountPercentage: ['null', 'string']

**ContractualAdjustmentResponse**
  - contractualAdjustmentReasonId: ['null', 'string'](uuid) (required)
  - expected: ['null', 'boolean'] (required)
  - reasonName: ['null', 'string'] (required)
  - reasonDescription: ['null', 'string'] (required)
  - amount: ['number', 'string'](double) (required)

**CreateBillRequest**
  - organizationId: string(uuid)
  - chargeId: string(uuid)

**CreateBillResponse**
  - billId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - chargeId: string(uuid) (required)
  - guarantorIdentity: GuarantorIdentity (required)
  - brandId: string(uuid) (required)

**CreateChargeAssemblyClaimRequest**
  - patientId: string(uuid) (required)
  - chargeAssemblyId: string(uuid) (required)
  - payerAssemblyId: string(uuid) (required)
  - claimType: ClaimType (required)
  - claimFrequency: ClaimFrequency (required)
  - previousClaimId: ['null', 'string'](uuid)
  - icn: ['null', 'string']
  - reasonId: ['null', 'string'](uuid)
  - charges: string(uuid)[]
  - discardPreviousClaims: boolean

**CreateChargeAssemblyClaimResponse**
  - claimId: string(uuid) (required)

**CreateClaimRequest**
  - claimType: ClaimType (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - patientId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - companyId: string(uuid) (required)
  - facilityId: string(uuid) (required)
  - billingProviderId: string(uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - policyPlanId: ['null', 'string'](uuid) (required)
  - payerId: string(uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - primaryClaimId: ['null', 'string'](uuid) (required)
  - createdDate: string(date-time) (required)
  - charges: string(uuid)[] (required)

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
  - behaviorConfiguration: object (required)
  - qualificationConfiguration: ['null', 'object'] (required)

**CreateSequenceRequest**
  - name: string (required)

**CrossoverClaimViewProjection**
  - organizationId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - invoiceNumber: ['null', 'string'] (required)
  - claimStatus: string (required)
  - claimStatusDate: Date (required)
  - claimDisposition: ['null', 'string'] (required)
  - claimDispositionDate: object (required)
  - patient: object (required)
  - policy: object (required)
  - company: object (required)
  - division: object (required)
  - facility: object (required)
  - billingProvider: object (required)
  - charges: ChargeListItem[] (required)
  - previousVersions: ClaimVersionSummary[] (required)
  - canDiscard: boolean (required)
  - canRegenerate: boolean (required)
  - canCorrect: boolean (required)
  - canVoid: boolean (required)
  - claimFrequency: ['null', 'string'] (required)
  - hasChargesEdited: boolean (required)
  - chargeAssemblyId: ['null', 'string'](uuid) (required)
  - chargeAssemblyNumber: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)
  - invoiceTotal: ['number', 'string'](double)
  - partition: string
  - id: string

**Date**
  - (no properties)

**DenialPredictionEnablementResponse**
  - enabled: boolean (required)

**DenialPredictionModel**
  - (no properties)

**DenialPredictionModelConfig**
  - model: DenialPredictionModel (required)
  - displayName: string (required)
  - description: string (required)
  - enabled: boolean (required)
  - scoreThreshold: ['number', 'string'](double) (required)

**DenialPredictionModelConfigRequest**
  - model: DenialPredictionModel
  - enabled: boolean
  - scoreThreshold: ['number', 'string'](double)

**Dependent**
  - address: Address
  - contactInformation: ContactInformation
  - dateOfBirth: ['null', 'string']
  - firstName: ['null', 'string']
  - gender: ['null', 'string']
  - lastName: ['null', 'string']
  - middleName: ['null', 'string']
  - suffix: ['null', 'string']
  - relationshipToSubscriberCode: ['null', 'string']
  - ssn: ['null', 'string']

**DiagnosesView**
  - diagnosisPointers: ChangeHealthcareDiagnosisPointer[] (required)

**DiagnosisRelatedGroupInformation**
  - drugRelatedGroupCode: ['null', 'string']

**DivisionView**
  - divisionId: ['null', 'string'](uuid) (required)
  - companyId: ['null', 'string'](uuid) (required)
  - divisionName: ['null', 'string'] (required)
  - companyName: ['null', 'string'] (required)
  - npi: ['null', 'string'] (required)
  - taxId: ['null', 'string'] (required)

**DrugIdentification**
  - linkSequenceNumber: ['null', 'string']
  - measurementUnitCode: ['null', 'string']
  - nationalDrugCode: ['null', 'string']
  - nationalDrugUnitCount: ['null', 'string']
  - pharmacyPrescriptionNumber: ['null', 'string']
  - serviceIdQualifier: ['null', 'string']
  - validDrugIdentification: ['null', 'boolean']

**DurableMedicalEquipmentCertificateOfMedicalNecessity**
  - attachmentTransmissionCode: ['null', 'string']

**DurableMedicalEquipmentCertification**
  - certificationTypeCode: ['null', 'string']
  - durableMedicalEquipmentDurationInMonths: ['null', 'string']

**DurableMedicalEquipmentService**
  - days: ['null', 'string']
  - frequencyCode: ['null', 'string']
  - purchasePrice: ['null', 'string']
  - rentalPrice: ['null', 'string']

**EditClaimChargesRequest**
  - claimId: string(uuid) (required)
  - charges: string(uuid)[] (required)

**ElementQualifier**
  - elementId: string (required)
  - exclusionary: boolean (required)

**EntityType**
  - (no properties)

**EpisodeQualifier**
  - allEpisodes: boolean (required)
  - episodeTypes: string(uuid)[] (required)
  - phases: string(uuid)[] (required)
  - exclusionary: boolean (required)

**EpsdtReferral**
  - certificationConditionCodeAppliesIndicator: ['null', 'string']
  - conditionCodes: ['null', 'array']

**FacilityHeader**
  - facilityId: string(uuid) (required)
  - facilityName: ['null', 'string'] (required)
  - claimPrefix: ['null', 'string'] (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - city: ['null', 'string'] (required)
  - stateId: ['null', 'string'](uuid) (required)
  - zipCode: ['null', 'string'] (required)
  - npi: ['null', 'string'] (required)

**FieldLabel**
  - formNumber: string (required)
  - name: string (required)

**FieldRequest**
  - fieldId: string (required)
  - value: ['null', 'string'] (required)

**FieldResponse**
  - fieldId: string (required)
  - label: FieldLabel (required)
  - value: ['null', 'string'] (required)

**FlaggedModelPrediction**
  - model: DenialPredictionModel (required)
  - displayName: string (required)
  - description: string (required)
  - claimProbability: ['number', 'string'](double) (required)
  - threshold: ['number', 'string'](double) (required)
  - affectedCharges: AffectedCharge[] (required)

**FormIdentification**
  - formIdentifier: ['null', 'string']
  - formTypeCode: ['null', 'string']
  - supportingDocumentation: ['null', 'array']

**GuarantorHeader**
  - guarantorId: ['null', 'string'](uuid) (required)
  - firstName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - guarantorIsPatient: boolean (required)
  - relationship: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - financialAccountNumber: ['null', 'string'] (required)

**GuarantorIdentity**
  - guarantorId: ['null', 'string'](uuid)
  - patientId: ['null', 'string'](uuid)
  - guarantorIsPatient: boolean

**HealthCareInformation**
  - diagnosisTypeCode: ['null', 'string']
  - diagnosisCode: ['null', 'string']

**HttpStatusCode**
  - (no properties)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**IClaimWorkspaceView**
  - claimId: string(uuid)
  - invoiceNumber: ['null', 'string']
  - claimStatus: ['null', 'string']
  - claimStatusDate: Date
  - claimDisposition: ['null', 'string']
  - claimDispositionDate: Date
  - patient: PatientHeader
  - policy: PolicyHeader
  - company: CompanyHeader
  - facility: FacilityHeader
  - billingProvider: ProviderHeader
  - charges: ['null', 'array']
  - previousVersions: ['null', 'array']
  - canDiscard: boolean
  - canRegenerate: boolean
  - canCorrect: boolean
  - canVoid: boolean
  - invoiceTotal: ['number', 'string'](double)
  - claimFrequency: ['null', 'string']
  - hasChargesEdited: boolean
  - createdDate: string(date-time)

**IncompleteModelPrediction**
  - model: DenialPredictionModel (required)
  - displayName: string (required)
  - errorMessage: ['null', 'string'] (required)

**InstitutionalClaimAdjustment**
  - adjustmentGroupCode: ['null', 'string']
  - claimAdjustmentDetails: ['null', 'array']
  - hasAdjustments: boolean

**InstitutionalClaimDateInformation**
  - admissionDateAndHour: ['null', 'string']
  - dischargeHour: ['null', 'string']
  - repricerReceivedDate: ['null', 'string']
  - statementBeginDate: ['null', 'string']
  - statementEndDate: ['null', 'string']

**InstitutionalClaimInformation**
  - admittingDiagnosis: AdmittingDiagnosis
  - benefitsAssignmentCertificationIndicator: ['null', 'string']
  - billingNote: ['null', 'string']
  - claimChargeAmount: ['null', 'string']
  - claimCodeInformation: ClaimCodeInformation
  - claimContractInformation: ClaimContractInformation
  - claimDateInformation: InstitutionalClaimDateInformation
  - claimFilingCode: ['null', 'string']
  - claimFrequencyCode: ['null', 'string']
  - claimNotes: InstitutionalClaimNotes
  - claimPricingInformation: ClaimPricingInformation
  - claimSupplementalInformation: InstitutionalClaimSupplementalInformation
  - conditionCodes: ['null', 'array']
  - conditionCodesList: ['null', 'array']
  - delayReasonCode: ['null', 'string']
  - diagnosisRelatedGroupInformation: DiagnosisRelatedGroupInformation
  - epsdtReferral: EpsdtReferral
  - externalCauseOfInjuries: ['null', 'array']
  - fileInformation: ['null', 'array']
  - occurrenceInformationList: ['null', 'array']
  - occurrenceSpanInformations: ['null', 'array']
  - otherDiagnosisInformationList: ['null', 'array']
  - otherProcedureInformationList: ['null', 'array']
  - otherSubscriberInformation: InstitutionalOtherSubscriberInformation
  - patientAmountPaid: ['null', 'string']
  - patientControlNumber: ['null', 'string']
  - patientEstimatedAmountDue: ['null', 'string']
  - patientReasonForVisits: ['null', 'array']
  - patientWeight: ['null', 'string']
  - placeOfServiceCode: ['null', 'string']
  - planParticipationCode: ['null', 'string']
  - principalDiagnosis: PrincipalDiagnosis
  - principalProcedureInformation: PrincipalProcedureInformation
  - propertyCasualtyClaimNumber: ['null', 'string']
  - releaseInformationCode: ['null', 'string']
  - serviceFacilityLocation: InstitutionalServiceFacilityLocation
  - serviceLines: ['null', 'array']
  - signatureIndicator: ['null', 'string']
  - treatmentCodeInformationList: ['null', 'array']
  - valueInformationList: ['null', 'array']

**InstitutionalClaimNotes**
  - additionalInformation: ['null', 'array']
  - allergies: ['null', 'array']
  - diagnosisDescription: ['null', 'array']
  - dme: ['null', 'array']
  - functionalLimitsOrReasonHomebound: ['null', 'array']
  - goalRehabOrDischargePlans: ['null', 'array']
  - medications: ['null', 'array']
  - nutritionalRequirments: ['null', 'array']
  - ordersForDiscipLinesAndTreatments: ['null', 'array']
  - reasonsPatientLeavesHome: ['null', 'array']
  - safetyMeasures: ['null', 'array']
  - supplementalPlanOfTreatment: ['null', 'array']
  - timesAndReasonsPatientNotAtHome: ['null', 'array']
  - unusualHomeOrSocialEnv: ['null', 'array']
  - updatedInformation: ['null', 'array']

**InstitutionalClaimSupplementalInformation**
  - adjustedRepricedClaimRefNumber: ['null', 'string']
  - autoAccidentState: ['null', 'string']
  - claimControlNumber: ['null', 'string']
  - claimNumber: ['null', 'string']
  - demoProjectIdentifier: ['null', 'string']
  - investigationalDeviceExemptionNumber: ['null', 'string']
  - medicalRecordNumber: ['null', 'string']
  - peerReviewAuthorizationNumber: ['null', 'string']
  - priorAuthorizationNumber: ['null', 'string']
  - referralNumber: ['null', 'string']
  - reportInformation: ReportInformation
  - repricedClaimNumber: ['null', 'string']
  - serviceAuthorizationExceptionCode: ['null', 'string']

**InstitutionalConditionCode**
  - conditionCode: ['null', 'string']

**InstitutionalLineAdjudicationInformation**
  - adjudicationOrPaymentDate: ['null', 'string']
  - bundledLineNumber: ['null', 'string']
  - bundledOrUnbundledLineNumber: ['null', 'string']
  - lineAdjustment: ['null', 'array']
  - otherPayerPrimaryIdentifier: ['null', 'string']
  - paidServiceUnitCount: ['null', 'string']
  - procedureCode: ['null', 'string']
  - procedureCodeDescription: ['null', 'string']
  - procedureModifier: ['null', 'array']
  - productOrServiceIDQualifier: ['null', 'string']
  - remainingPatientLiability: ['null', 'string']
  - serviceLinePaidAmount: ['null', 'string']
  - serviceLineRevenueCode: ['null', 'string']

**InstitutionalOtherSubscriberInformation**
  - policyId: string(uuid)
  - benefitsAssignmentCertificationIndicator: ['null', 'string']
  - claimFilingIndicatorCode: ['null', 'string']
  - claimLevelAdjustments: ['null', 'array']
  - groupNumber: ['null', 'string']
  - individualRelationshipCode: ['null', 'string']
  - medicareInpatientAdjudication: MedicareInpatientAdjudication
  - medicareOutpatientAdjudication: MedicareOutpatientAdjudication
  - nonCoveredChargeAmount: ['null', 'string']
  - otherInsuredGroupName: ['null', 'string']
  - otherPayerAttendingProvider: OtherPayerAttendingProvider
  - otherPayerBillingProvider: OtherPayerBillingProvider
  - otherPayerName: OtherPayerName
  - otherPayerOperatingPhysician: OtherPayerOperatingPhysician
  - otherPayerOtherOperatingPhysician: OtherPayerOtherOperatingPhysician
  - otherPayerReferringProvider: OtherPayerReferringProvider
  - otherPayerRenderingProvider: OtherPayerRenderingProvider
  - otherPayerServiceFacilityLocation: OtherPayerServiceFacilityLocation
  - otherSubscriberName: OtherSubscriberName
  - payerPaidAmount: ['null', 'string']
  - paymentResponsibilityLevelCode: ['null', 'string']
  - policyNumber: ['null', 'string']
  - releaseOfInformationCode: ['null', 'string']
  - remainingPatientLiability: ['null', 'string']

**InstitutionalService**
  - description: ['null', 'string']
  - lineItemChargeAmount: ['null', 'string']
  - measurementUnit: ['null', 'string']
  - nonCoveredChargeAmount: ['null', 'string']
  - procedureCode: ['null', 'string']
  - procedureIdentifier: ['null', 'string']
  - procedureModifiers: ['null', 'array']
  - serviceLineRevenueCode: ['null', 'string']
  - serviceUnitCount: ['null', 'string']

**InstitutionalServiceFacilityLocation**
  - address: Address
  - identificationCode: ['null', 'string']
  - organizationName: ['null', 'string']
  - secondaryIdentificationQualifierCode: ['null', 'string']
  - secondaryIdentifier: ['null', 'string']

**InstitutionalServiceLine**
  - adjustedRepricedLineItemReferenceNumber: ['null', 'string']
  - assignedNumber: ['null', 'string']
  - description: ['null', 'string']
  - drugIdentification: DrugIdentification
  - facilityTaxAmount: ['null', 'string']
  - institutionalService: InstitutionalService
  - lineAdjudicationInformation: ['null', 'array']
  - lineAdjustmentInformation: LineAdjustmentInformation
  - lineItemControlNumber: ['null', 'string']
  - lineNoteText: ['null', 'string']
  - linePricingInformation: LinePricingInformation
  - lineRepricingInformation: ClaimPricingInformation
  - lineSupplementInformation: InstitutionalClaimSupplementalInformation
  - operatingPhysician: OperatingPhysician
  - otherOperatingPhysician: OperatingPhysician
  - referringProvider: ServiceLineProvider
  - renderingProvider: ServiceLineProvider
  - repricedLineItemReferenceNumber: ['null', 'string']
  - serviceDate: ['null', 'string']
  - serviceDateEnd: ['null', 'string']
  - serviceLineDateInformation: ServiceLineDateInformation
  - serviceLineReferenceInformation: ServiceLineReferenceInformation
  - serviceLineSupplementalInformation: ServiceLineSupplementalInformation
  - serviceTaxAmount: ['null', 'string']
  - thirdPartyOrganizationNotes: ['null', 'string']
  - chargeId: string(uuid)

**InvoicePayerSummaryResponse**
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - planId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - policyId: ['null', 'string'](uuid) (required)
  - policyNumber: ['null', 'string'] (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorName: ['null', 'string'] (required)
  - type: TransactionAccountType (required)
  - paid: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - manufacturerCopayProgramId: ['null', 'string'](uuid) (required)
  - copayProgramName: ['null', 'string'] (required)
  - manufacturerCopayAssistanceAwardId: ['null', 'string'](uuid) (required)
  - copayAssistanceNumber: ['null', 'string'] (required)
  - hasTransactions: boolean (required)
  - showOnWorkspace: boolean

**InvoiceSummary**
  - invoiceId: string(uuid) (required)
  - invoiceType: string (required)
  - invoiceNumber: string (required)
  - policyId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - snfName: ['null', 'string'] (required)
  - snfResidentNumber: ['null', 'string'] (required)
  - invoiceTotal: ['number', 'string'](double) (required)
  - chargeBalance: ['number', 'string'](double) (required)
  - invoiceStatus: string (required)
  - invoiceStatusDate: Date (required)
  - invoiceDisposition: ['null', 'string'] (required)
  - invoiceDispositionDate: object (required)
  - chargeCodes: string[] (required)
  - submittedDate: object (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)

**KeyValuePairOfintAndstring**
  - key: ['integer', 'string'](int32) (required)
  - value: ['null', 'string'] (required)

**LineAdjustmentInformation**
  - bundledOrUnbundledLineNumber: ['null', 'string']
  - claimAdjustment: ProfessionalClaimAdjustment
  - claimPaidDate: ['null', 'string']
  - otherPayerPrimaryIdentifier: ['null', 'string']
  - paidServiceUnitCount: ['null', 'string']
  - procedureCode: ['null', 'string']
  - procedureCodeDescription: ['null', 'string']
  - procedureModifiers: ['null', 'array']
  - remainingPatientLiability: ['null', 'string']
  - serviceIdQualifier: ['null', 'string']
  - serviceLinePaidAmount: ['null', 'string']

**LinePricingInformation**
  - apgAmount: ['null', 'string']
  - apgCode: ['null', 'string']
  - exceptionCode: ['null', 'string']
  - flatRateAmount: ['null', 'string']
  - measurementUnitCode: ['null', 'string']
  - policyComplianceCode: ['null', 'string']
  - pricingMethodologyCode: ['null', 'string']
  - rejectReasonCode: ['null', 'string']
  - repricedAllowedAmount: ['null', 'string']
  - repricedApprovedHCPCSCode: ['null', 'string']
  - repricedApprovedServiceUnitCount: ['null', 'string']
  - repricedOrganizationIdentifier: ['null', 'string']
  - repricedSavingAmount: ['null', 'string']
  - serviceIdQualifier: ['null', 'string']

**LinkedChargeAttributes**
  - chargeId: string(uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - activityCode: ['null', 'string'] (required)
  - status: ChargeStatus (required)
  - complete: boolean (required)

**LinkedEncounterIdentity**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)

**LinkedEncounterItems**
  - organizationId: string(uuid) (required)
  - identity: LinkedEncounterIdentity (required)
  - chargeAttributes: LinkedChargeAttributes[] (required)
  - renderedActivityAttributes: LinkedRenderedActivityAttributes[] (required)
  - scheduledActivityAttributes: LinkedScheduledActivityAttributes[] (required)
  - testResultAttributes: LinkedTestResultAttributes[] (required)
  - referralAttributes: LinkedReferralAttributes[] (required)
  - partition: string
  - id: string

**LinkedReferralAttributes**
  - referralId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - policyId: string(uuid) (required)

**LinkedRenderedActivityAttributes**
  - renderedActivityId: string(uuid) (required)
  - activityCode: ['null', 'string'] (required)
  - status: ['integer', 'string'](int32) (required)
  - isArchived: boolean (required)
  - isDeleted: boolean (required)
  - complete: boolean (required)

**LinkedScheduledActivityAttributes**
  - scheduledActivityId: string(uuid) (required)
  - activityCode: ['null', 'string'] (required)
  - isCancelled: boolean (required)

**LinkedTestResultAttributes**
  - testResultId: string(uuid) (required)
  - testResultTypeId: string(uuid) (required)
  - testResultValue: ['number', 'string'](double) (required)

**MarginUnit**
  - (no properties)

**Measurements**
  - measurementQualifier: ['null', 'string']
  - measurementReferenceIdentificationCode: ['null', 'string']
  - testResults: ['null', 'string']

**MedicareInpatientAdjudication**
  - capitalExceptionAmount: ['null', 'string']
  - capitalHSPDRGAmount: ['null', 'string']
  - claimDRGAmount: ['null', 'string']
  - claimDisproportionateShareAmount: ['null', 'string']
  - claimIndirectTeachingAmount: ['null', 'string']
  - claimMspPassThroughAmount: ['null', 'string']
  - claimPaymentRemarkCode: ['null', 'array']
  - claimPpsCapitalAmount: ['null', 'string']
  - claimPpsCapitalOutlierAmmount: ['null', 'string']
  - costReportDayCount: ['null', 'string']
  - coveredDaysOrVisitsCount: ['null', 'string']
  - lifetimePsychiatricDaysCount: ['null', 'string']
  - nonPayableProfessionalComponentBilledAmount: ['null', 'string']
  - ppsCapitalDshDrgAmount: ['null', 'string']
  - ppsCapitalHspDrgAmount: ['null', 'string']
  - ppsCapitalImeAmount: ['null', 'string']
  - ppsOperatingFederalSpecificDrgAmount: ['null', 'string']
  - ppsOperatingHospitalSpecificDrgAmount: ['null', 'string']
  - oldCapitalAmount: ['null', 'string']

**MedicareOutpatientAdjudication**
  - claimPaymentRemarkCode: ['null', 'array']
  - endStageRenalDiseasePaymentAmount: ['null', 'string']
  - hcpcsPayableAmount: ['null', 'string']
  - nonPayableProfessionalComponentBilledAmount: ['null', 'string']
  - reimbursementRate: ['null', 'string']

**NetType**
  - (no properties)

**NewClaimChargeSearchRequest**
  - chargeId: string(uuid) (required)
  - startDate: Date (required)
  - endDate: Date (required)
  - policyId: ['null', 'string'](uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)

**NewClaimResponse**
  - originalClaimId: string(uuid) (required)
  - newClaimId: string(uuid) (required)

**NonContractualAdjustmentResponse**
  - nonContractualAdjustmentReasonId: ['null', 'string'](uuid) (required)
  - expected: ['null', 'boolean'] (required)
  - reasonName: ['null', 'string'] (required)
  - reasonDescription: ['null', 'string'] (required)
  - amount: ['number', 'string'](double) (required)

**OccurrenceInformationItem**
  - occurrenceSpanCode: ['null', 'string']
  - occurrenceSpanCodeDate: ['null', 'string']

**OccurrenceSpanInformation**
  - occurrenceSpanCode: ['null', 'string']
  - occurrenceSpanCodeStartDate: ['null', 'string']
  - occurrenceSpanCodeEndDate: ['null', 'string']

**OperatingPhysician**
  - firstName: ['null', 'string']
  - identificationQualifierCode: ['null', 'string']
  - lastName: ['null', 'string']
  - middleName: ['null', 'string']
  - npi: ['null', 'string']
  - organizationName: ['null', 'string']
  - secondaryIdentifier: ['null', 'string']
  - suffix: ['null', 'string']

**OtherDiagnosisInformation**
  - otherDiagnosisCode: ['null', 'string']
  - presentOnAdmissionIndicator: ['null', 'string']
  - qualifierCode: ['null', 'string']

**OtherPayerAddress**
  - address1: ['null', 'string']
  - address2: ['null', 'string']
  - city: ['null', 'string']
  - state: ['null', 'string']
  - postalCode: ['null', 'string']
  - countryCode: ['null', 'string']
  - countrySubDivisionCode: ['null', 'string']
  - otherPayerAdjudicationOrPaymentDate: ['null', 'string']
  - otherPayerSecondaryIdentifier: ['null', 'array']

**OtherPayerAttendingProvider**
  - otherPayerAttendingProviderIdentifier: ['null', 'array']

**OtherPayerBillingProvider**
  - entityTypeQualifier: ['null', 'string']
  - otherPayerBillingProviderIdentifier: ['null', 'array']

**OtherPayerName**
  - otherInsuredAdditionalIdentifier: ['null', 'string']
  - otherPayerAddress: OtherPayerAddress
  - otherPayerAdjudicationOrPaymentDate: ['null', 'string']
  - otherPayerClaimAdjustmentIndicator: ['null', 'boolean']
  - otherPayerClaimControlNumber: ['null', 'string']
  - otherPayerIdentifier: ['null', 'string']
  - otherPayerIdentifierTypeCode: ['null', 'string']
  - otherPayerOrganizationName: ['null', 'string']
  - otherPayerPriorAuthorizationNumber: ['null', 'string']
  - otherPayerPriorAuthorizationOrReferralNumber: ['null', 'string']
  - otherPayerSecondaryIdentifier: ['null', 'array']

**OtherPayerOperatingPhysician**
  - otherPayerOperatingPhysicianIdentifier: ['null', 'array']

**OtherPayerOtherOperatingPhysician**
  - otherPayerOtherOperatingPhysicianIdentifier: ['null', 'array']

**OtherPayerReferringProvider**
  - otherPayerReferringProviderIdentifier: ['null', 'array']

**OtherPayerRenderingProvider**
  - entityTypeQualifier: ['null', 'string']
  - otherPayerRenderingProviderSecondaryIdentifier: ['null', 'array']
  - otherPayerRenderingProviderIdentifier: ['null', 'array']

**OtherPayerServiceFacilityLocation**
  - otherPayerServiceFacilityLocationIdentifier: ['null', 'array']
  - otherPayerServiceFacilityLocationSecondaryIdentifier: ['null', 'array']

**OtherPayerSupervisingProvider**
  - otherPayerSupervisingProviderIdentifier: ['null', 'array']

**OtherProcedureInformation**
  - otherProcedureCode: ['null', 'string']
  - otherProcedureDate: ['null', 'string']
  - qualifierCode: ['null', 'string']

**OtherSubscriber**
  - policyId: string(uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - policyIndex: ['integer', 'string'](int32) (required)
  - paid: ['null', 'string'] (required)
  - internalControlNumber: ['null', 'string'] (required)
  - isCurrentTarget: boolean (required)

**OtherSubscriberName**
  - address: Address
  - firstName: ['null', 'string']
  - otherInsuredAdditionalIdentifier: ['null', 'array']
  - otherInsuredAddress: Address
  - otherInsuredFirstName: ['null', 'string']
  - otherInsuredIdentifier: ['null', 'string']
  - otherInsuredIdentifierTypeCode: ['null', 'string']
  - otherInsuredLastName: ['null', 'string']
  - otherInsuredMiddleName: ['null', 'string']
  - otherInsuredSuffix: ['null', 'string']
  - otherInsuredQualifier: ['null', 'string']

**OtherSubscribersView**
  - otherSubscribers: OtherSubscriber[] (required)

**PatientClaimCharge**
  - chargeId: string(uuid) (required)
  - dateOfService: Date (required)
  - locationId: string(uuid)
  - chargeCode: string (required)
  - fee: ['null', 'number', 'string'](double) (required)
  - allowed: ['null', 'number', 'string'](double) (required)
  - balance: ['null', 'number', 'string'](double) (required)
  - chargeStatus: ChargeStatus (required)
  - chargeSubStatus: ChargeSubStatus (required)

**PatientClaimSummary**
  - claimId: string(uuid) (required)
  - claimType: string (required)
  - claimFrequency: string (required)
  - dosFrom: object (required)
  - invoiceNumber: string (required)
  - policyId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - billingProviderId: ['null', 'string'](uuid) (required)
  - facilityId: ['null', 'string'](uuid) (required)
  - divisionId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - snfFacilityName: ['null', 'string'] (required)
  - snfResidentNumber: ['null', 'string'] (required)
  - invoiceTotal: ['number', 'string'](double) (required)
  - chargeBalance: ['number', 'string'](double) (required)
  - claimStatus: string (required)
  - claimStatusDate: Date (required)
  - claimDisposition: string (required)
  - claimDispositionDate: object (required)
  - chargeCodes: string[]
  - submittedDate: object (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)

**PatientConditionInformationVision**
  - certificationConditionIndicator: ['null', 'string']
  - codeCategory: ['null', 'string']
  - conditionCodes: ['null', 'array']

**PatientHeader**
  - patientId: string(uuid) (required)
  - firstName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - financialAccountNumber: ['null', 'string'] (required)

**PatientPolicyClaimResponse**
  - claimId: string(uuid) (required)
  - claimType: ClaimType (required)
  - patientId: string(uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - dateOfService: Date (required)
  - claimNumber: ['null', 'string'] (required)
  - balance: ['null', 'number', 'string'](double) (required)
  - charges: PatientClaimCharge[] (required)

**PatientReasonForVisit**
  - patientReasonForVisitCode: ['null', 'string']
  - qualifierCode: ['null', 'string']

**PayerSecondaryIdentification**
  - payerSecondaryIdentifier: ['null', 'string']
  - payerSecondaryIdentifierQualifier: ['null', 'string']

**PayerSubmission**
  - payerId: string(uuid) (required)
  - claimTypes: ClaimType[] (required)

**PayToPlan**
  - address: Address
  - organizationName: ['null', 'string']
  - primaryIdentifier: ['null', 'string']
  - primaryIdentifierTypeCode: ['null', 'string']
  - secondaryIdentifier: ['null', 'string']
  - secondaryIdentifierTypeCode: ['null', 'string']
  - taxIdentificationNumber: ['null', 'string']

**PdfClaimContentResponse**
  - header: FieldResponse[] (required)
  - charges: ChargeFieldsResponse[] (required)
  - footer: FieldResponse[] (required)

**PdfCoordinate**
  - default: ['integer', 'string'](int32) (required)
  - offset: ['integer', 'string'](int32) (required)
  - updated: ['integer', 'string'](int32)

**PdfFieldLayoutResponse**
  - fieldId: string (required)
  - fieldNumber: string (required)
  - fieldType: string (required)
  - xCoordinate: PdfCoordinate (required)
  - yCoordinate: PdfCoordinate (required)

**PdfFieldOffsets**
  - fieldId: string (required)
  - xOffset: ['integer', 'string'](int32) (required)
  - yOffset: ['integer', 'string'](int32) (required)

**PdfMargins**
  - top: ['number', 'string'](double) (required)
  - left: ['number', 'string'](double) (required)
  - marginUnit: MarginUnit (required)

**PolicyHeader**
  - policyId: ['null', 'string'](uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - planId: ['null', 'string'](uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - city: ['null', 'string'] (required)
  - state: ['null', 'string'] (required)
  - zipCode: ['null', 'string'] (required)
  - phoneNumber: ['null', 'string'] (required)
  - snfName: ['null', 'string'] (required)
  - snfResidentNumber: ['null', 'string'] (required)

**PredictDenialRequest**
  - claimId: string(uuid)
  - model: DenialPredictionModel

**PredictDenialResponse**
  - claimId: string(uuid) (required)
  - model: DenialPredictionModel (required)
  - cpid: string (required)
  - succeeded: boolean (required)
  - claimProbability: ['null', 'number', 'string'](double) (required)
  - scoreThreshold: ['number', 'string'](double) (required)
  - exceeded: boolean (required)
  - charges: ChargeProbability[] (required)
  - errorMessage: ['null', 'string'] (required)

**PrimaryClaimGenerationRequest**
  - organizationId: string(uuid) (required)
  - chargeId: string(uuid) (required)
  - enqueuedTime: ['null', 'string'](date-time)

**PrimaryClaimProvisionRequest**
  - organizationId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - enqueuedTime: ['null', 'string'](date-time)
  - initialVisibilityDelay: ['null', 'string']

**PrincipalDiagnosis**
  - presentOnAdmissionIndicator: ['null', 'string']
  - principalDiagnosisCode: ['null', 'string']
  - qualifierCode: ['null', 'string']

**PrincipalProcedureInformation**
  - principalProcedureCode: ['null', 'string']
  - principalProcedureDate: ['null', 'string']
  - qualifierCode: ['null', 'string']

**PriorAuthorization**
  - otherPayerPrimaryIdentifier: ['null', 'string']
  - priorAuthorizationOrReferralNumber: ['null', 'string']

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ProcessClaimResult**
  - submissionSuccessful: boolean (required)
  - noResponseReturned: boolean (required)
  - errors: ChangeHealthcareError[] (required)

**ProfessionalClaimAdjustment**
  - adjustmentGroupCode: ['null', 'string']
  - adjustmentDetails: ['null', 'array']
  - hasAdjustments: boolean

**ProfessionalClaimDateInformation**
  - accidentDate: ['null', 'string']
  - acuteManifestationDate: ['null', 'string']
  - admissionDate: ['null', 'string']
  - assumedAndRelinquishedCareBeginDate: ['null', 'string']
  - assumedAndRelinquishedCareEndDate: ['null', 'string']
  - authorizedReturnToWorkDate: ['null', 'string']
  - disabilityBeginDate: ['null', 'string']
  - disabilityEndDate: ['null', 'string']
  - dischargeDate: ['null', 'string']
  - firstContactDate: ['null', 'string']
  - hearingAndVisionPrescriptionDate: ['null', 'string']
  - initialTreatmentDate: ['null', 'string']
  - lastMenstrualPeriodDate: ['null', 'string']
  - lastSeenDate: ['null', 'string']
  - lastWorkedDate: ['null', 'string']
  - lastXRayDate: ['null', 'string']
  - repricerReceivedDate: ['null', 'string']
  - symptomDate: ['null', 'string']

**ProfessionalClaimInformation**
  - ambulanceCertification: ['null', 'array']
  - ambulanceDropOffLocation: Address
  - ambulancePickUpLocation: Address
  - ambulanceTransportInformation: AmbulanceTransportInformation
  - anesthesiaRelatedSurgicalProcedure: ['null', 'array']
  - benefitsAssignmentCertificationIndicator: ['null', 'string']
  - claimChargeAmount: ['null', 'string']
  - claimContractInformation: ClaimContractInformation
  - claimDateInformation: ProfessionalClaimDateInformation
  - claimFilingCode: ['null', 'string']
  - claimFrequencyCode: ['null', 'string']
  - claimNote: ProfessionalClaimNotes
  - claimPricingRepricingInformation: ClaimPricingRepricingInformation
  - claimSupplementalInformation: ProfessionalClaimSupplementalInformation
  - conditionInformation: ['null', 'array']
  - delayReasonCode: ['null', 'string']
  - epsdtReferral: EpsdtReferral
  - fileInformation: ['null', 'string']
  - healthCareCodeInformation: ['null', 'array']
  - homeboundIndicator: ['null', 'boolean']
  - otherSubscriberInformation: ['null', 'array']
  - patientAmountPaid: ['null', 'string']
  - patientConditionInformationVision: ['null', 'array']
  - patientControlNumber: ['null', 'string']
  - patientSignatureSourceCode: ['null', 'string']
  - patientWeight: ['null', 'string']
  - placeOfServiceCode: ['null', 'string']
  - planParticipationCode: ['null', 'string']
  - propertyCasualtyClaimNumber: ['null', 'string']
  - relatedCausesCode: ['null', 'array']
  - releaseInformationCode: ['null', 'string']
  - serviceFacilityLocation: ProfessionalServiceFacilityLocation
  - serviceLines: ['null', 'array']
  - signatureIndicator: ['null', 'string']
  - specialProgramCode: ['null', 'string']
  - spinalManipulationServiceInformation: SpinalManipulationServiceInformation

**ProfessionalClaimNotes**
  - additionalInformation: ['null', 'string']
  - certificationNarrative: ['null', 'string']
  - diagnosisDescription: ['null', 'string']
  - goalRehabOrDischargePlans: ['null', 'string']
  - thirdPartOrgNotes: ['null', 'string']
  - validNote: ['null', 'boolean']

**ProfessionalClaimSupplementalInformation**
  - adjustedRepricedClaimNumber: ['null', 'string']
  - carePlanOversightNumber: ['null', 'string']
  - claimControlNumber: ['null', 'string']
  - claimNumber: ['null', 'string']
  - cliaNumber: ['null', 'string']
  - demoProjectIdentifier: ['null', 'string']
  - investigationalDeviceExemptionNumber: ['null', 'string']
  - mammographyCertificationNumber: ['null', 'string']
  - medicalRecordNumber: ['null', 'string']
  - medicareCrossoverReferenceId: ['null', 'string']
  - priorAuthorizationNumber: ['null', 'string']
  - referralNumber: ['null', 'string']
  - reportInformation: ReportInformation
  - repricedClaimNumber: ['null', 'string']
  - serviceAuthorizationExceptionCode: ['null', 'string']

**ProfessionalLineAdjudicationInformation**
  - adjudicationOrPaymentDate: ['null', 'string']
  - bundledLineNumber: ['null', 'string']
  - bundledOrUnbundledLineNumber: ['null', 'string']
  - claimAdjustmentInformation: ['null', 'array']
  - otherPayerPrimaryIdentifier: ['null', 'string']
  - paidServiceUnitCount: ['null', 'string']
  - procedureCode: ['null', 'string']
  - procedureCodeDescription: ['null', 'string']
  - procedureModifier: ['null', 'array']
  - remainingPatientLiability: ['null', 'string']
  - serviceIdQualifier: ['null', 'string']
  - serviceLinePaidAmount: ['null', 'string']
  - serviceLineRevenueCode: ['null', 'string']

**ProfessionalOtherSubscriberInformation**
  - policyId: string(uuid)
  - benefitsAssignmentCertificationIndicator: ['null', 'string']
  - claimFilingIndicatorCode: ['null', 'string']
  - claimLevelAdjustments: ['null', 'array']
  - individualRelationshipCode: ['null', 'string']
  - insuranceGroupOrPolicyNumber: ['null', 'string']
  - insuranceTypeCode: ['null', 'string']
  - medicareOutpatientAdjudication: MedicareOutpatientAdjudication
  - nonCoveredChargeAmount: ['null', 'string']
  - otherInsuredGroupName: ['null', 'string']
  - otherPayerBillingProvider: ['null', 'array']
  - otherPayerName: OtherPayerName
  - otherPayerReferringProvider: ['null', 'array']
  - otherPayerRenderingProvider: ['null', 'array']
  - otherPayerServiceFacilityLocation: OtherPayerServiceFacilityLocation
  - otherPayerSupervisingProvider: OtherPayerSupervisingProvider
  - otherSubscriberName: OtherSubscriberName
  - patientSignatureGeneratedForPatient: ['null', 'boolean']
  - payerPaidAmount: ['null', 'string']
  - paymentResponsibilityLevelCode: ['null', 'string']
  - policyNumber: ['null', 'string']
  - releaseOfInformationCode: ['null', 'string']
  - remainingPatientLiability: ['null', 'string']

**ProfessionalService**
  - compositeDiagnosisCodePointers: CompositeDiagnosisCodePointers
  - copayStatusCode: ['null', 'string']
  - description: ['null', 'string']
  - emergencyIndicator: ['null', 'string']
  - epsdtIndicator: ['null', 'string']
  - familyPlanningIndicator: ['null', 'string']
  - lineItemChargeAmount: ['null', 'string']
  - measurementUnit: ['null', 'string']
  - placeOfServiceCode: ['null', 'string']
  - procedureCode: ['null', 'string']
  - procedureIdentifier: ['null', 'string']
  - procedureModifiers: ['null', 'array']
  - serviceUnitCount: ['null', 'string']

**ProfessionalServiceFacilityLocation**
  - address: Address
  - npi: ['null', 'string']
  - organizationName: ['null', 'string']
  - phoneExtension: ['null', 'string']
  - phoneName: ['null', 'string']
  - phoneNumber: ['null', 'string']
  - secondaryIdentifier: ['null', 'array']

**ProfessionalServiceLine**
  - additionalNotes: ['null', 'string']
  - ambulanceCertification: ['null', 'array']
  - ambulanceDropOffLocation: Address
  - ambulancePatientCount: ['null', 'integer', 'string'](int32)
  - ambulancePickUpLocation: Address
  - ambulanceTransportInformation: AmbulanceTransportInformation
  - assignedNumber: ['null', 'string']
  - conditionIndicatorDurableMedicalEquipment: ConditionIndicatorDurableMedicalEquipment
  - contractInformation: ContractInformation
  - drugIdentification: DrugIdentification
  - durableMedicalEquipmentCertificateOfMedicalNecessity: DurableMedicalEquipmentCertificateOfMedicalNecessity
  - durableMedicalEquipmentCertification: DurableMedicalEquipmentCertification
  - durableMedicalEquipmentService: DurableMedicalEquipmentService
  - fileInformation: ['null', 'array']
  - formIdentification: ['null', 'array']
  - goalRehabOrDischargePlans: ['null', 'string']
  - hospiceEmployeeIndicator: ['null', 'boolean']
  - lineAdjudicationInformation: ['null', 'array']
  - linePricingRepricingInformation: ClaimPricingRepricingInformation
  - obstetricAnesthesiaAdditionalUnits: ['null', 'integer', 'string'](int32)
  - orderingProvider: ServiceLineProvider
  - postageTaxAmount: ['null', 'string']
  - primaryCareProvider: ServiceLineProvider
  - professionalService: ProfessionalService
  - providerControlNumber: ['null', 'string'] (required)
  - purchasedServiceInformation: PurchasedServiceInformation
  - purchasedServiceProvider: ServiceLineProvider
  - referringProvider: ServiceLineProvider
  - renderingProvider: ServiceLineProvider
  - salesTaxAmount: ['null', 'string']
  - serviceDate: ['null', 'string']
  - serviceDateEnd: ['null', 'string']
  - serviceFacilityLocation: ProfessionalServiceFacilityLocation
  - serviceLineDateInformation: ServiceLineDateInformation
  - serviceLineReferenceInformation: ServiceLineReferenceInformation
  - serviceLineSupplementalInformation: ['null', 'array']
  - supervisingProvider: ServiceLineProvider
  - testResults: ['null', 'array']
  - thirdPartyOrganizationNotes: ['null', 'string']

**ProviderHeader**
  - providerId: string(uuid) (required)
  - npi: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)
  - specialty: ['null', 'string'] (required)
  - taxonomy: ['null', 'string'] (required)

**PurchasedServiceInformation**
  - purchasedServiceChargeAmount: ['null', 'string']
  - purchasedServiceProviderIdentifier: ['null', 'string']

**QualifierHeader**
  - attributeType: AttributeType (required)
  - entityType: EntityType (required)
  - id: string (required)
  - isSet: boolean (required)
  - exclusionary: boolean (required)

**RawEdiResponse**
  - edi: ['null', 'string'] (required)

**RebrandBillRequest**
  - billId: string(uuid) (required)
  - chargeId: string(uuid) (required)
  - brandId: string(uuid) (required)

**Receiver**
  - organizationName: ['null', 'string']
  - taxId: ['null', 'string']

**ReferenceIdentification**
  - identifier: ['null', 'string']
  - otherIdentifier: ['null', 'string']
  - qualifier: ['null', 'string']

**ReleaseItemsRequest**
  - items: string(uuid)[] (required)
  - releasedDate: string(date-time) (required)

**ReleaseType**
  - (no properties)

**RenderedActivity**
  - organizationId: string(uuid) (required)
  - renderedActivityId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - activityCode: ['null', 'string'] (required)
  - activityStatus: ['integer', 'string'](int32) (required)
  - isArchived: boolean (required)
  - isDeleted: boolean (required)
  - isComplete: boolean (required)
  - referringProviderId: ['null', 'string'](uuid) (required)
  - partition: string
  - id: string

**ReportInformation**
  - attachmentControlNumber: ['null', 'string']
  - attachmentReportTypeCode: ['null', 'string']
  - attachmentTransmissionCode: ['null', 'string']

**ReviewItemDetails**
  - claimId: string(uuid) (required)
  - claimType: string (required)
  - invoiceDate: Date (required)
  - invoiceNumber: ['integer', 'string'](int64) (required)
  - patientId: string(uuid) (required)
  - companyId: string(uuid) (required)
  - facilityId: string(uuid) (required)
  - billingProviderId: string(uuid) (required)
  - payerId: string(uuid) (required)
  - claimStatus: string (required)
  - claimDisposition: ['null', 'string'] (required)
  - validationState: string (required)
  - invoiceTotal: ['number', 'string'](double) (required)
  - ruleName: ['null', 'string'] (required)
  - behaviorCategory: ['null', 'integer', 'string'](int32)
  - userGuidance: ['null', 'string'] (required)
  - denialPrediction: object

**RuleAction**
  - (no properties)

**RuleDetail**
  - sequenceId: string(uuid) (required)
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
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
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: QualifierHeader[] (required)
  - sameDateOfServiceQualifiers: QualifierHeader[] (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)

**SaveCMS1500PrintConfigurationRequest**
  - leftCoordinates: object
  - topCoordinates: object

**SavePdfMarginsRequest**
  - top: ['number', 'string'](double) (required)
  - left: ['number', 'string'](double) (required)
  - marginUnit: MarginUnit (required)

**SearchCandidateChargesRequest**
  - claimId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)

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

**ServiceLineDateInformation**
  - beginServiceDate: ['null', 'string']
  - beginTherapyDate: ['null', 'string']
  - certificationRevisionOrRecertificationDate: ['null', 'string']
  - endServiceDate: ['null', 'string']
  - hemoglobinTestDate: ['null', 'string']
  - initialTreatmentDate: ['null', 'string']
  - lastCertificationDate: ['null', 'string']
  - lastXRayDate: ['null', 'string']
  - prescriptionDate: ['null', 'string']
  - serumCreatineTestDate: ['null', 'string']
  - serviceDate: ['null', 'string']
  - shippedDate: ['null', 'string']
  - treatmentOrTherapyDate: ['null', 'string']
  - validDateInformation: ['null', 'boolean']

**ServiceLineProvider**
  - address: Address
  - commercialNumber: ['null', 'string']
  - contactInformation: ContactInformation
  - employerId: ['null', 'string']
  - firstName: ['null', 'string']
  - lastName: ['null', 'string']
  - locationNumber: ['null', 'string']
  - middleName: ['null', 'string']
  - npi: ['null', 'string']
  - organizationName: ['null', 'string']
  - providerType: ['null', 'string']
  - providerUpinNumber: ['null', 'string']
  - referenceIdentification: ['null', 'array']
  - secondaryIdentifier: ['null', 'array']
  - ssn: ['null', 'string']
  - stateLicenseNumber: ['null', 'string']
  - suffix: ['null', 'string']
  - taxonomyCode: ['null', 'string']

**ServiceLineReferenceInformation**
  - adjustedRepricedLineItemReferenceNumber: ['null', 'string']
  - clinicalLaboratoryImprovementAmendmentNumber: ['null', 'string']
  - immunizationBatchNumber: ['null', 'string']
  - mammographyCertificationNumber: ['null', 'string']
  - priorAuthorization: ['null', 'array']
  - providerControlNumber: ['null', 'string']
  - referralNumber: ['null', 'array']
  - referringCliaNumber: ['null', 'string']
  - repricedLineItemReferenceNumber: ['null', 'string']

**ServiceLineSupplementalInformation**
  - attachmentControlNumber: ['null', 'string']
  - attachmentReportTypeCode: ['null', 'string']
  - attachmentTransmissionCode: ['null', 'string']

**ServiceLinesView**
  - serviceLines: ChangeHealthcareServiceLine[] (required)

**SetDenialPredictionEnablementRequest**
  - enabled: boolean

**SetQualifier**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**SpinalManipulationServiceInformation**
  - patientConditionCode: ['null', 'string']
  - patientConditionDescription1: ['null', 'string']
  - patientConditionDescription2: ['null', 'string']

**SubmissionProperty**
  - name: string (required)
  - value: ['null', 'string'] (required)
  - position: ['null', 'string']

**Submitter**
  - contactInformation: ContactInformation
  - organizationName: ['null', 'string']
  - taxId: ['null', 'string']

**Subscriber**
  - address: Address
  - contactInformation: ContactInformation
  - dateOfBirth: ['null', 'string']
  - firstName: ['null', 'string']
  - gender: ['null', 'string']
  - groupNumber: ['null', 'string']
  - insuranceTypeCode: ['null', 'string']
  - lastName: ['null', 'string']
  - memberId: ['null', 'string']
  - middleName: ['null', 'string']
  - suffix: ['null', 'string']
  - paymentResponsibilityLevelCode: ['null', 'string']
  - policyNumber: ['null', 'string']
  - ssn: ['null', 'string']
  - standardHealthId: ['null', 'string']
  - subscriberGroupName: ['null', 'string']

**SupportingDocumentation**
  - questionNumber: ['null', 'string']
  - questionResponse: ['null', 'string']
  - questionResponseAsDate: ['null', 'string']
  - questionResponseAsPercent: ['null', 'string']
  - questionResponseCode: ['null', 'string']

**TransactionAccountType**
  - (no properties)

**Ub04ViewProjection**
  - organizationId: string(uuid) (required)
  - claimId: string(uuid) (required)
  - dateRangeStart: Date (required)
  - dateRangeEnd: Date (required)
  - invoiceNumber: string (required)
  - claimStatus: string (required)
  - claimStatusDate: Date (required)
  - claimDisposition: ['null', 'string'] (required)
  - claimDispositionDate: object (required)
  - discardReasonId: ['null', 'string'](uuid) (required)
  - invoiceTotal: ['number', 'string'](double) (required)
  - patient: object (required)
  - policy: object (required)
  - company: object (required)
  - facility: object (required)
  - division: object (required)
  - billingProvider: object (required)
  - charges: ChargeListItem[] (required)
  - properties: SubmissionProperty[] (required)
  - claimContent: PdfClaimContentResponse (required)
  - pdfNoteId: ['null', 'string'](uuid) (required)
  - pdfAttachmentId: ['null', 'string'](uuid) (required)
  - previousVersions: ClaimVersionSummary[] (required)
  - canDiscard: boolean (required)
  - canRegenerate: boolean (required)
  - canCorrect: boolean (required)
  - canVoid: boolean (required)
  - claimFrequency: ['null', 'string'] (required)
  - hasChargesEdited: boolean (required)
  - icn: ['null', 'string'] (required)
  - chargeAssemblyId: ['null', 'string'](uuid) (required)
  - chargeAssemblyNumber: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)
  - partition: ['null', 'string']
  - id: ['null', 'string']

**UpdateClaimStatusRequest**
  - claimId: string(uuid) (required)
  - status: ClaimStatus (required)
  - statusDate: string(date-time) (required)
  - claimUpdateReasonId: string(uuid) (required)

**UpdateProfessionalOtherSubscriberRequest**
  - subscriberIndex: ['integer', 'string'](int32) (required)
  - otherSubscriber: ProfessionalOtherSubscriberInformation (required)

**UpdateRuleRequest**
  - ruleId: string(uuid) (required)
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
  - qualificationConfiguration: object (required)

**UpdateSequenceRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - enabled: boolean (required)

**UpdateUserGuidanceRequest**
  - claimId: string(uuid) (required)
  - userGuidance: string (required)

**ValidateScriptRequest**
  - claimType: ClaimType
  - script: string

**ValidateScriptResponse**
  - compilationSucceeded: boolean (required)
  - failures: string[] (required)

**ValidationStatus**
  - (no properties)

**ValueInformation**
  - valueCode: ['null', 'string']
  - valueCodeAmount: ['null', 'string']

