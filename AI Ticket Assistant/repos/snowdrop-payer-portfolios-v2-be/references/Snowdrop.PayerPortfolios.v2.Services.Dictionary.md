﻿# Snowdrop.PayerPortfolios.v2.Services - API Dictionary

Repo: snowdrop-payer-portfolios-v2-be
Source: Snowdrop.PayerPortfolios.v2.Services.json

## Endpoints

### GET /patients/{patientId}/portfolios/{portfolioId}
- Tags: Patients
- Path params: patientId: string(uuid), required; portfolioId: string(uuid), required
- Response 200: PortfolioWorkspaceResponse
- Response 404: ProblemDetails

### GET /patients/{patientId}/portfolios/active
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PortfolioResponse[]

### DELETE /patients/{patientId}/portfolios/alternates/{alternatePortfolioId}
- Tags: Patients
- Path params: patientId: string(uuid), required; alternatePortfolioId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /patients/{patientId}/portfolios/export
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### GET /patients/{patientId}/portfolios/grid
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PatientPortfoliosResponse

### GET /patients/{patientId}/portfolios/recent
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PortfolioWorkspaceResponse
- Response 404: ProblemDetails

### POST /patients/portfolios
- Tags: Patients
- Request body: AddPortfolioRequest
- Response 200: PortfolioResponse
- Response 409: ProblemDetails

### POST /patients/portfolios/alternates
- Tags: Patients
- Request body: AlternatePortfolioRequest
- Response 200: AlternatePortfolioResponse
- Response 404: ProblemDetails

### PUT /patients/portfolios/alternates/{alternatePortfolioId}
- Tags: Patients
- Path params: alternatePortfolioId: string(uuid), required
- Request body: AlternatePortfolioRequest
- Response 200: AlternatePortfolioResponse

### POST /patients/portfolios/bulk
- Tags: Patients
- Request body: BulkUpdateRequest
- Response 200: (no body)
- Response 202: BulkUpdateAcceptedResponse
- Response 400: ProblemDetails

### POST /patients/portfolios/bulk/effectiveness/validate
- Tags: Patients
- Request body: BulkValidateEffectivenessRequest
- Response 200: BulkValidateEffectivenessResponse
- Response 400: ProblemDetails

### PUT /patients/portfolios/discard
- Tags: Patients
- Request body: UpdateDiscardStatusRequest
- Response 200: UpdatePortfolioResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/portfolios/effectiveness
- Tags: Patients
- Request body: UpdateEffectivenessRequest
- Response 200: UpdatePortfolioResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /patients/portfolios/effectiveness/validate
- Tags: Patients
- Request body: ValidateEffectivenessRequest
- Response 200: EffectivenessValidationResponse
- Response 404: ProblemDetails

### PUT /patients/portfolios/guarantor
- Tags: Patients
- Request body: UpdateGuarantorRequest
- Response 200: UpdatePortfolioResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/portfolios/hold
- Tags: Patients
- Request body: UpdateHoldStatusRequest
- Response 200: UpdatePortfolioResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/portfolios/policies
- Tags: Patients
- Request body: UpdatePoliciesRequest
- Response 200: UpdatePortfolioResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/portfolios/resume
- Tags: Patients
- Request body: UpdateResumeDateRequest
- Response 200: UpdatePortfolioResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /portfolio-types
- Tags: PortfolioTypes
- Response 200: PortfolioTypeResponse[]

## Schemas

**AddPortfolioRequest**
  - patientId: string(uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - orderedPolicies: string(uuid)[] (required)
  - selfPayPayerId: ['null', 'string'](uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorIsPatient: boolean (required)
  - alternatePortfolios: ['null', 'array']
  - previousPortfolioId: ['null', 'string'](uuid)
  - previousPortfolioEndDate: object
  - portfolioId: string(uuid)

**AlternatePortfolioInformation**
  - alternatePortfolioId: string(uuid) (required)
  - alternatePortfolioTypeId: string(uuid) (required)

**AlternatePortfolioRequest**
  - patientId: string(uuid) (required)
  - orderedPolicies: string(uuid)[] (required)
  - selfPayPayerId: ['null', 'string'](uuid) (required)
  - alternatePortfolioTypeId: string(uuid) (required)
  - parentPortfolioId: string(uuid) (required)

**AlternatePortfolioResponse**
  - portfolioId: string(uuid) (required)
  - alternatePortfolioTypeId: string(uuid) (required)
  - policies: PolicyListItemResponse[] (required)
  - selfPayPayer: object (required)
  - guarantor: object (required)
  - isLocked: boolean (required)

**AwardDetails**
  - assistanceNumber: string (required)
  - awardAmount: ['number', 'string'](double) (required)
  - awardDate: Date (required)
  - lookbackDays: ['integer', 'string'](int32) (required)

**BulkEntityChange**
  - operationType: BulkOperationType
  - value: object[][][]

**BulkEntityUpdate**
  - patientId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - changes: BulkEntityChange[] (required)

**BulkOperationType**
  - (no properties)

**BulkUpdateAcceptedResponse**
  - correlationId: string(uuid) (required)
  - totalUpdates: ['integer', 'string'](int32) (required)

**BulkUpdateRequest**
  - updates: BulkEntityUpdate[] (required)

**BulkValidateEffectivenessItem**
  - portfolioId: string(uuid) (required)
  - effectiveStartDate: Date
  - effectiveEndDate: object

**BulkValidateEffectivenessRequest**
  - patientId: string(uuid) (required)
  - portfolios: BulkValidateEffectivenessItem[] (required)

**BulkValidateEffectivenessResponse**
  - datesValid: boolean
  - invalidPortfolios: string(uuid)[] (required)

**CoveredServiceCriteriaOfGuid**
  - elementId: ['null', 'string'](uuid) (required)
  - setId: ['null', 'string'](uuid) (required)
  - isFactorySet: boolean (required)

**CoveredServiceCriteriaOfIcdCodeIdentity**
  - elementId: object (required)
  - setId: ['null', 'string'](uuid) (required)
  - isFactorySet: boolean (required)

**CoveredServiceCriteriaOfstring**
  - elementId: ['null', 'string'] (required)
  - setId: ['null', 'string'](uuid) (required)
  - isFactorySet: boolean (required)

**Date**
  - (no properties)

**EffectiveDateRange**
  - start: object (required)
  - end: object (required)

**EffectivenessValidationResponse**
  - datesValid: boolean (required)

**GuarantorResponse**
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorIsPatient: boolean (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - patientRelationship: ['null', 'string'] (required)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**PatientPortfoliosResponse**
  - patientId: string(uuid) (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - portfolios: PortfolioResponse[] (required)

**PayerName**
  - payerId: ['null', 'string'](uuid) (required)
  - name: ['null', 'string'] (required)

**PayerType**
  - (no properties)

**PlanName**
  - planId: ['null', 'string'](uuid) (required)
  - name: ['null', 'string'] (required)

**PolicyEffectiveness**
  - dateRanges: EffectiveDateRange[] (required)

**PolicyIdentificationResponse**
  - policyNumber: string (required)

**PolicyListItemResponse**
  - policyId: string(uuid) (required)
  - plan: object (required)
  - payer: object (required)
  - payerType: PayerType (required)
  - provisionalPlan: object (required)
  - effectiveness: object (required)
  - identification: object (required)
  - status: object (required)
  - awardDetails: object (required)
  - coveredServices: ProgramCoveredService[] (required)
  - cpid: ['null', 'string'] (required)
  - strengthMeter: PolicyStrengthMeter

**PolicyResponse**
  - policyIndex: ['integer', 'string'](int32) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - payerName: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - payerType: PayerType (required)

**PolicyStatus**
  - (no properties)

**PolicyStatusResponse**
  - statusType: PolicyStatus (required)

**PolicyStrengthMeter**
  - strength: ['null', 'string'] (required)

**PortfolioResponse**
  - portfolioId: string(uuid) (required)
  - portfolioType: PortfolioTypeResponse (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)
  - guarantorFirstName: ['null', 'string'] (required)
  - guarantorMiddleName: ['null', 'string'] (required)
  - guarantorLastName: ['null', 'string'] (required)
  - guarantorRelationship: ['null', 'string'] (required)
  - policies: PolicyResponse[] (required)
  - selfPayPayer: ['null', 'string'] (required)
  - guarantorIsPatient: ['null', 'boolean'] (required)
  - resumeDate: object (required)
  - status: PortfolioStatus (required)
  - isLocked: boolean (required)
  - alternatePortfolios: AlternatePortfolioInformation[] (required)
  - portfolioName: ['null', 'string']

**PortfolioStatus**
  - (no properties)

**PortfolioType**
  - (no properties)

**PortfolioTypeResponse**
  - portfolioType: PortfolioType (required)
  - description: string (required)

**PortfolioWorkspaceResponse**
  - portfolioId: string(uuid) (required)
  - portfolioType: PortfolioTypeResponse (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)
  - policies: PolicyListItemResponse[] (required)
  - selfPayPayer: object (required)
  - guarantor: object (required)
  - resumeDate: object (required)
  - status: PortfolioStatus (required)
  - isLocked: boolean (required)
  - parentPortfolioId: ['null', 'string'](uuid) (required)
  - alternatePortfolioTypeId: ['null', 'string'](uuid) (required)
  - alternatePortfolios: AlternatePortfolioResponse[] (required)
  - portfolioName: ['null', 'string']
  - isActive: boolean

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ProgramCoveredService**
  - chargeCode: object (required)
  - activityCode: object (required)
  - modifier: object (required)
  - ndc: object (required)
  - diagnosisCode: object (required)

**ProvisionalPlan**
  - payerName: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)

**SelfPayInformation**
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)

**UpdateDiscardStatusRequest**
  - patientId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - isDiscarded: boolean (required)

**UpdateEffectivenessRequest**
  - patientId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

**UpdateGuarantorRequest**
  - patientId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorIsPatient: boolean (required)

**UpdateHoldStatusRequest**
  - patientId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - resumeDate: object (required)
  - holdReasonId: ['null', 'string'](uuid) (required)
  - isUnderPermanentHold: boolean

**UpdatePoliciesRequest**
  - patientId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - orderedPolicies: string(uuid)[] (required)
  - selfPayPayerId: ['null', 'string'](uuid) (required)

**UpdatePortfolioResponse**
  - portfolioId: string(uuid) (required)
  - portfolioType: PortfolioTypeResponse (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)
  - policies: PolicyListItemResponse[] (required)
  - selfPayPayer: object (required)
  - guarantor: object (required)
  - resumeDate: object (required)
  - status: PortfolioStatus (required)
  - isLocked: boolean (required)
  - portfolioName: ['null', 'string']
  - isActive: boolean

**UpdateResumeDateRequest**
  - patientId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - resumeDate: Date (required)

**ValidateEffectivenessRequest**
  - patientId: string(uuid) (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

