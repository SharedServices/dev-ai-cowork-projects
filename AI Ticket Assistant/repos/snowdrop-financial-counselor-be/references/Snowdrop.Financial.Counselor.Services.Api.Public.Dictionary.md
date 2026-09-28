﻿# Snowdrop.Financial.Counselor.Services.Api.Public - API Dictionary

Repo: snowdrop-financial-counselor-be
Source: Snowdrop.Financial.Counselor.Services.Api.Public.json

## Endpoints

### GET /engagement/{patientId}
- Tags: Engagement
- Path params: patientId: string(uuid), required
- Query params: MethodId: string(uuid); TopicId: string(uuid); EngagementDate: string; GroupId: string(uuid); Status: EngagementStatus
- Response 200: EngagementResponse[]

### POST /engagement/{patientId}
- Tags: Engagement
- Path params: patientId: string(uuid), required
- Request body: CreateEngagementsRequest
- Response 200: EngagementResponse[]
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### GET /engagement/{patientId}/{engagementId}
- Tags: Engagement
- Path params: patientId: string(uuid), required; engagementId: string(uuid), required
- Response 200: EngagementResponse
- Response 404: ProblemDetails

### PATCH /engagement/{patientId}/{engagementId}
- Tags: Engagement
- Path params: patientId: string(uuid), required; engagementId: string(uuid), required
- Request body: TopicRequest
- Response 200: EngagementResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### DELETE /engagement/{patientId}/{engagementId}
- Tags: Engagement
- Path params: patientId: string(uuid), required; engagementId: string(uuid), required
- Response 200: EngagementResponse

### GET /engagement/{patientId}/latest
- Tags: Engagement
- Path params: patientId: string(uuid), required
- Response 200: EngagementResponse[]

### GET /financial-plan/{patientId}/{portfolioId}
- Tags: FinancialPlan
- Path params: patientId: string(uuid), required; portfolioId: string(uuid), required
- Response 200: FinancialPlanResponse[]

### GET /financial-plan/{patientId}/{portfolioId}/grid
- Tags: FinancialPlan
- Path params: patientId: string(uuid), required; portfolioId: string(uuid), required
- Response 200: FinancialPlanPreviewResponse[]

### POST /financial-plan/{portfolioId}
- Tags: FinancialPlan
- Path params: portfolioId: string(uuid), required
- Request body: FinancialPlanRequest
- Response 200: FinancialPlanResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /financial-plan/{portfolioId}/{brandId}/{financialPlanId}/payment-plans
- Tags: FinancialPlan
- Path params: portfolioId: string(uuid), required; brandId: string(uuid), required; financialPlanId: string(uuid), required
- Response 200: SlimPaymentPlanResponse[]
- Response 404: ProblemDetails

### GET /financial-plan/{portfolioId}/{brandId}/{planId}
- Tags: FinancialPlan
- Path params: portfolioId: string(uuid), required; brandId: string(uuid), required; planId: string(uuid), required
- Response 200: FinancialPlanResponse
- Response 404: ProblemDetails

### DELETE /financial-plan/{portfolioId}/{brandId}/{planId}
- Tags: FinancialPlan
- Path params: portfolioId: string(uuid), required; brandId: string(uuid), required; planId: string(uuid), required
- Response 200: FinancialPlanResponse
- Response 404: ProblemDetails

### GET /financial-plan/{portfolioId}/{brandId}/{planId}/preview
- Tags: FinancialPlan
- Path params: portfolioId: string(uuid), required; brandId: string(uuid), required; planId: string(uuid), required
- Response 200: FinancialPlanPreviewResponse
- Response 404: ProblemDetails

### GET /financial-plan/{portfolioId}/{brandId}/uniquename/{checkName}
- Tags: FinancialPlan
- Path params: portfolioId: string(uuid), required; brandId: string(uuid), required; checkName: string, required
- Response 200: boolean
- Response 404: ProblemDetails

### GET /liability-estimate/{patientId}/{treatmentPlanId}
- Tags: PatientLiabilityEstimation
- Path params: patientId: string(uuid), required; treatmentPlanId: string(uuid), required
- Response 200: SummaryLiabilityEstimateResponse[]
- Response 404: ProblemDetails

### POST /liability-estimate/{patientId}/{treatmentPlanId}
- Tags: PatientLiabilityEstimation
- Path params: patientId: string(uuid), required; treatmentPlanId: string(uuid), required
- Request body: LiabilityEstimateRequest
- Response 200: LiabilityEstimateResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /liability-estimate/{patientId}/{treatmentPlanId}/{estimateId}
- Tags: PatientLiabilityEstimation
- Path params: patientId: string(uuid), required; treatmentPlanId: string(uuid), required; estimateId: string(uuid), required
- Response 200: LiabilityEstimateResponse
- Response 404: ProblemDetails

### DELETE /liability-estimate/{patientId}/{treatmentPlanId}/{estimateId}
- Tags: PatientLiabilityEstimation
- Path params: patientId: string(uuid), required; treatmentPlanId: string(uuid), required; estimateId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /liability-estimate/{patientId}/{treatmentPlanId}/{estimateId}/timeline
- Tags: PatientLiabilityEstimation
- Path params: patientId: string(uuid), required; treatmentPlanId: string(uuid), required; estimateId: string(uuid), required
- Response 200: TimeLineResponse
- Response 404: ProblemDetails

### PATCH /liability-estimate/{patientId}/{treatmentPlanId}/save-review/{estimateId}
- Tags: PatientLiabilityEstimation
- Path params: patientId: string(uuid), required; treatmentPlanId: string(uuid), required; estimateId: string(uuid), required
- Response 200: LiabilityEstimateResponse
- Response 404: ProblemDetails

### POST /liability-estimate/{patientId}/{treatmentPlanId}/update-review/{estimateId}
- Tags: PatientLiabilityEstimation
- Path params: patientId: string(uuid), required; treatmentPlanId: string(uuid), required; estimateId: string(uuid), required
- Request body: ChargeReviewRequest
- Response 200: LiabilityEstimateResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /treatment-plan/{patientId}
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required
- Response 200: TreatmentPlanResponse[]

### POST /treatment-plan/{patientId}
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required
- Request body: TreatmentPlanAddRequest
- Response 200: TreatmentPlanResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /treatment-plan/{patientId}/{planId}
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Response 200: TreatmentPlanResponse
- Response 404: ProblemDetails

### POST /treatment-plan/{patientId}/{planId}
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Query params: discardOthers: boolean
- Request body: TreatmentPlanUpdateRequest
- Response 200: TreatmentPlanResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/{patientId}/{planId}/{cycleId}
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required; cycleId: string(uuid), required
- Request body: TreatmentPlanCycleUpdateRequest
- Response 200: TreatmentPlanCycleResponse
- Response 404: ProblemDetails

### DELETE /treatment-plan/{patientId}/{planId}/{cycleId}
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required; cycleId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### DELETE /treatment-plan/{patientId}/{planId}/{cycleId}/{activityId}
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required; cycleId: string(uuid), required; activityId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /treatment-plan/{patientId}/{planId}/{cycleId}/activities
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required; cycleId: string(uuid), required
- Request body: TreatmentPlanActivityRequest[]
- Response 200: TreatmentPlanActivityResponse[]
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/{patientId}/{planId}/{cycleId}/activity
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required; cycleId: string(uuid), required
- Request body: TreatmentPlanActivityRequest
- Response 200: TreatmentPlanActivityResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /treatment-plan/{patientId}/{planId}/check
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Response 200: TreatmentPlanInterceptFunctionResponse
- Response 500: (no body)

### POST /treatment-plan/{patientId}/{planId}/cycle
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Query params: position: ['integer', 'string'](int32)
- Request body: TreatmentPlanCycleAddRequest
- Response 200: TreatmentPlanCycleResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/{patientId}/{planId}/cycle/copy
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Request body: TreatmentPlanCopyActivitiesRequest
- Response 200: TreatmentPlanResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/{patientId}/{planId}/cycle/reorder
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Request body: object
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PATCH /treatment-plan/{patientId}/{planId}/endDate
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Request body: TreatmentPlanEndDateRequest
- Response 200: TreatmentPlanResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /treatment-plan/{patientId}/{planId}/financialclearance
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Response 200: FinancialClearanceResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/{patientId}/{planId}/reassign
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Request body: TreatmentPlanReassignTemplateRequest
- Response 200: TreatmentPlanResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PATCH /treatment-plan/{patientId}/{planId}/referringProvider
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required; planId: string(uuid), required
- Request body: TreatmentPlanReferringProviderRequest
- Response 200: TreatmentPlanResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /treatment-plan/{patientId}/discard
- Tags: TreatmentPlan
- Path params: patientId: string(uuid), required
- Request body: TreatmentPlanDiscardRequest
- Response 204: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/template
- Tags: TreatmentPlanTemplate
- Request body: TreatmentPlanAddRequest
- Response 200: TreatmentPlanResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /treatment-plan/template/{templateId}
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required
- Response 200: TreatmentPlanResponse
- Response 404: ProblemDetails

### POST /treatment-plan/template/{templateId}
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required
- Request body: TreatmentPlanUpdateRequest
- Response 200: TreatmentPlanResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/template/{templateId}/{cycleId}
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required; cycleId: string(uuid), required
- Request body: TreatmentPlanCycleUpdateRequest
- Response 200: TreatmentPlanCycleResponse
- Response 404: ProblemDetails

### DELETE /treatment-plan/template/{templateId}/{cycleId}
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required; cycleId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### DELETE /treatment-plan/template/{templateId}/{cycleId}/{activityId}
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required; cycleId: string(uuid), required; activityId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /treatment-plan/template/{templateId}/{cycleId}/activities
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required; cycleId: string(uuid), required
- Request body: TreatmentPlanActivityRequest[]
- Response 200: TreatmentPlanActivityResponse[]
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/template/{templateId}/{cycleId}/activity
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required; cycleId: string(uuid), required
- Request body: TreatmentPlanActivityRequest
- Response 200: TreatmentPlanActivityResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/template/{templateId}/cycle
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required
- Query params: position: ['integer', 'string'](int32)
- Request body: TreatmentPlanCycleAddRequest
- Response 200: TreatmentPlanCycleResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/template/{templateId}/cycle/copy
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required
- Request body: TreatmentPlanCopyActivitiesRequest
- Response 200: TreatmentPlanResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /treatment-plan/template/{templateId}/cycle/reorder
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required
- Request body: object
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PATCH /treatment-plan/template/{templateId}/deactivate
- Tags: TreatmentPlanTemplate
- Path params: templateId: string(uuid), required
- Response 204: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /treatment-plan/template/quick/{diagnosisCode}
- Tags: TreatmentPlanTemplate
- Path params: diagnosisCode: string, required
- Response 200: object

### POST /treatment-plan/template/search
- Tags: TreatmentPlanTemplate
- Request body: TreatmentPlanTemplateSearchRequest
- Response 200: TreatmentPlanResponse[]
- Response 400: ProblemDetails

### GET /treatment-plan/template/uniquename/{checkName}
- Tags: TreatmentPlanTemplate
- Path params: checkName: string, required
- Response 200: boolean

## Schemas

**ActivityChargeRequest**
  - activityCode: ['null', 'string'] (required)
  - totalDeductible: ['null', 'number', 'string'](double) (required)
  - totalCopay: ['null', 'number', 'string'](double) (required)
  - totalCoinsurance: ['null', 'number', 'string'](double) (required)
  - totalPassedThrough: ['null', 'number', 'string'](double) (required)
  - edited: ['null', 'boolean'] (required)

**ActivityCost**
  - activityCode: string (required)
  - serviceTypeId: ['null', 'string'](uuid) (required)
  - totalUnits: ['number', 'string'](double) (required)
  - originalCost: TotalCost (required)
  - editedCost: object (required)

**ActivityPlanDetailResponse**
  - planId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - paid: ['number', 'string'](double) (required)
  - deductible: ['number', 'string'](double) (required)
  - copay: ['number', 'string'](double) (required)
  - additionalCopay: ['number', 'string'](double) (required)
  - coinsurance: ['number', 'string'](double) (required)
  - passedThrough: ['number', 'string'](double) (required)

**ActivityPolicyPlanResponse**
  - activityCodeId: string(uuid) (required)
  - activityCode: string (required)
  - policyDetails: PolicyPlanResponse[] (required)

**AttributeQualifierResponse**
  - setQualifier: object (required)
  - elementQualifier: ['null', 'string'] (required)

**AttributeQualifiers**
  - attributeType: AttributeType (required)
  - entityType: EntityType
  - nullQualifier: boolean
  - setQualifiers: ['null', 'array']
  - elementQualifiers: ['null', 'array']

**AttributeType**
  - (no properties)

**AuthorizationsResponse**
  - policyAuthorizations: PolicyAuthorizationResponse[] (required)

**AuthorizationStatus**
  - (no properties)

**ChargeReviewRequest**
  - assistance: ['null', 'number', 'string'](double) (required)
  - patientDiscountPct: ['null', 'number', 'string'](double) (required)
  - assistanceNote: ['null', 'string']
  - edited: ['null', 'boolean'] (required)
  - activityCharges: ['null', 'array']
  - hasEdits: boolean

**CreateEngagementsRequest**
  - methodId: ['null', 'string'](uuid) (required)
  - engagementDate: ['null', 'string'](date-time) (required)
  - topics: ['null', 'array'] (required)

**CycleDayResponse**
  - day: ['integer', 'string'](int32)
  - date: Date
  - cycleDayPaid: ['number', 'string'](double)
  - cycleDayDeductible: ['number', 'string'](double)
  - cycleDayCopay: ['number', 'string'](double)
  - cycleDayAdditionalCopay: ['number', 'string'](double)
  - cycleDayCoinsurance: ['number', 'string'](double)
  - cycleDayPassedThrough: ['number', 'string'](double)
  - dayActivities: DayActivityResponse[]

**CycleResponse**
  - cyclePosition: ['integer', 'string'](int32) (required)
  - cycleId: string(uuid) (required)
  - cycleDays: CycleDayResponse[] (required)

**Date**
  - (no properties)

**DayActivityResponse**
  - activityCode: string (required)
  - units: ['integer', 'string'](int32) (required)
  - notes: string (required)
  - dayActivityPaid: ['number', 'string'](double) (required)
  - dayActivityDeductible: ['number', 'string'](double) (required)
  - dayActivityCopay: ['number', 'string'](double) (required)
  - dayActivityAdditionalCopay: ['number', 'string'](double) (required)
  - dayActivityCoinsurance: ['number', 'string'](double) (required)
  - dayActivityPassedThrough: ['number', 'string'](double) (required)
  - activityPlanDetails: ActivityPlanDetailResponse[] (required)

**ElementQualifier**
  - elementId: string (required)
  - exclusionary: boolean (required)

**EligibilityResponse**
  - policySummaries: PolicySummaryResponse[] (required)

**EngagementResponse**
  - engagementId: string(uuid) (required)
  - methodId: string(uuid) (required)
  - engagementDate: string(date-time) (required)
  - groupId: ['null', 'string'](uuid) (required)
  - topicId: string(uuid) (required)
  - topicNote: string (required)
  - createdDate: string(date-time) (required)
  - createdById: string(uuid) (required)
  - updatedDate: ['null', 'string'](date-time) (required)
  - updatedById: ['null', 'string'](uuid) (required)
  - status: EngagementStatus (required)

**EngagementStatus**
  - (no properties)

**EntityType**
  - (no properties)

**EstimateCosts**
  - copay: ['number', 'string'](double) (required)
  - additionalCopays: ['number', 'string'](double) (required)
  - deductible: ['number', 'string'](double) (required)
  - coinsurance: ['number', 'string'](double) (required)
  - oopRemaining: ['number', 'string'](double) (required)
  - afterDeductible: ['number', 'string'](double) (required)
  - dueFromPatientAfterPrimary: ['number', 'string'](double) (required)
  - coveredBySecondary: ['number', 'string'](double) (required)
  - passedThrough: ['number', 'string'](double) (required)
  - totalCost: ['number', 'string'](double) (required)

**FinancialClearanceResponse**
  - overview: object (required)
  - authorizations: object (required)
  - eligibility: object (required)
  - treatmentPlan: TreatmentPlanResponse (required)
  - isSelfPay: boolean
  - validPortfolio: boolean
  - inValidPortfolioReason: ['null', 'string']

**FinancialPlanPreviewResponse**
  - financialPlanId: string(uuid) (required)
  - brandId: string(uuid) (required)
  - brandName: ['null', 'string'] (required)
  - planName: string (required)
  - counselorId: string (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - startDateIsInherited: boolean (required)
  - endDateIsInherited: boolean (required)
  - isActive: boolean (required)

**FinancialPlanRequest**
  - financialPlanId: ['null', 'string'](uuid)
  - brandId: ['null', 'string'](uuid) (required)
  - guarantorId: ['null', 'string'](uuid)
  - patientId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - counselorId: ['null', 'string'] (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object
  - startDateIsInherited: ['null', 'boolean'] (required)
  - endDateIsInherited: ['null', 'boolean'] (required)
  - familySize: ['null', 'integer', 'string'](int32)
  - householdIncome: ['null', 'number', 'string'](double)
  - isEmployed: ['null', 'boolean']
  - isUsCitizen: ['null', 'boolean']
  - isDisabled: ['null', 'boolean']

**FinancialPlanResponse**
  - financialPlanId: string(uuid) (required)
  - portfolioId: string(uuid) (required)
  - portfolioEffectiveStartDate: object (required)
  - portfolioEffectiveEndDate: object (required)
  - brandId: string(uuid) (required)
  - brandName: ['null', 'string'] (required)
  - patientId: string(uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - planName: string (required)
  - counselorId: string (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - startDateIsInherited: boolean (required)
  - endDateIsInherited: boolean (required)
  - familySize: ['null', 'integer', 'string'](int32) (required)
  - householdIncome: ['null', 'number', 'string'](double) (required)
  - isEmployed: ['null', 'boolean'] (required)
  - isUsCitizen: ['null', 'boolean'] (required)
  - isDisabled: ['null', 'boolean'] (required)
  - createdDate: string(date-time) (required)
  - createdById: string(uuid) (required)
  - updatedDate: ['null', 'string'](date-time) (required)
  - updatedById: ['null', 'string'](uuid) (required)
  - isTerminated: boolean (required)
  - isActive: boolean (required)

**KeyValuePairOfAttributeQualifiersAndint**
  - key: AttributeQualifiers (required)
  - value: ['integer', 'string'](int32) (required)

**LiabilityEstimateRequest**
  - estimateId: ['null', 'string'](uuid)
  - brandId: ['null', 'string'](uuid) (required)
  - selectedCycleIds: ['null', 'array']
  - portfolio: object (required)

**LiabilityEstimateResponse**
  - estimateId: string(uuid) (required)
  - brandId: string(uuid) (required)
  - assistance: ['number', 'string'](double) (required)
  - patientDiscountPct: ['number', 'string'](double) (required)
  - patientDiscount: ['number', 'string'](double) (required)
  - assistanceNote: ['null', 'string'] (required)
  - originalCosts: EstimateCosts (required)
  - editedCosts: object (required)
  - createdDate: string(date-time) (required)
  - createdById: string(uuid) (required)
  - updatedDate: ['null', 'string'](date-time) (required)
  - updatedById: ['null', 'string'](uuid) (required)
  - allCycles: boolean (required)
  - activityCosts: ['null', 'array'] (required)
  - warningMessage: ['null', 'string'] (required)
  - status: LiabilityEstimateStatus (required)

**LiabilityEstimateStatus**
  - (no properties)

**MedicalBenefitsRequest**
  - totalDeductible: ['null', 'number', 'string'](double) (required)
  - totalOutOfPocket: ['null', 'number', 'string'](double) (required)
  - deductibleRemaining: ['null', 'number', 'string'](double) (required)
  - outOfPocketRemaining: ['null', 'number', 'string'](double) (required)
  - copayRequiredAfterOop: ['null', 'boolean'] (required)
  - copayDoesNotCountTowardOop: ['null', 'boolean'] (required)
  - recalculationPeriod: object (required)
  - recalculationMonth: object (required)

**PaymentPlanFrequency**
  - (no properties)

**PaymentPlanStatus**
  - (no properties)

**PolicyAuthorizationResponse**
  - policyId: string(uuid) (required)
  - policyNumber: ['null', 'string'] (required)
  - planId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - authorizationId: string(uuid) (required)
  - authorizationNumber: string (required)
  - activityCodeQualifiers: object (required)
  - modifierQualifiers: object (required)
  - diagnosisCodeQualifiers: object (required)
  - renderingProviderQualifiers: object (required)
  - divisionQualifiers: object (required)
  - facilityQualifiers: object (required)
  - allowedUnits: ['null', 'number', 'string'](double) (required)
  - allowedVisits: ['null', 'number', 'string'](double) (required)
  - startDate: object (required)
  - endDate: object (required)
  - billedUnits: ['number', 'string'](double) (required)
  - remainingUnits: ['number', 'string'](double) (required)
  - billedVisits: ['number', 'string'](double) (required)
  - remainingVisits: ['number', 'string'](double) (required)

**PolicyPlanResponse**
  - policyId: string(uuid) (required)
  - policyNumber: ['null', 'string'] (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - serviceBenefits: object (required)
  - authorizationStatus: AuthorizationStatus (required)

**PolicyRequest**
  - policyId: ['null', 'string'](uuid) (required)
  - order: ['null', 'integer', 'string'](int32) (required)
  - planId: ['null', 'string'](uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - selected: ['null', 'boolean'] (required)
  - medicalBenefitsIndividual: object (required)
  - serviceBenefits: ['null', 'array'] (required)
  - isPrimary: boolean
  - isSecondary: boolean
  - isTertiary: boolean

**PolicySummaryResponse**
  - policyId: string(uuid) (required)
  - policyNumber: ['null', 'string'] (required)
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - isInAlternatePortfolio: boolean (required)
  - deductibleRemaining: ['null', 'number', 'string'](double) (required)
  - outOfPocketRemaining: ['null', 'number', 'string'](double) (required)
  - policyWarnings: ['null', 'string'] (required)

**PortfolioRequest**
  - portfolioId: ['null', 'string'](uuid) (required)
  - selectedContractId: ['null', 'string'](uuid) (required)
  - selfPay: object
  - policies: ['null', 'array']
  - effectiveStartDate: object (required)
  - effectiveEndDate: object
  - resumeDate: object
  - isValid: boolean

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**RecalculationMonthType**
  - (no properties)

**RecalculationPeriodType**
  - (no properties)

**SelfPayRequest**
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)

**ServiceBenefits**
  - serviceTypeId: ['null', 'string'](uuid) (required)
  - coInsurancePct: ['null', 'number', 'string'](double) (required)
  - copay: ['null', 'number', 'string'](double) (required)
  - hasCoverage: ['null', 'boolean'] (required)
  - authorizationRequired: ['null', 'boolean'] (required)

**ServiceBenefitsRequest**
  - serviceTypeId: ['null', 'string'](uuid) (required)
  - coInsurancePct: ['null', 'number', 'string'](double) (required)
  - copay: ['null', 'number', 'string'](double) (required)
  - hasCoverage: ['null', 'boolean'] (required)
  - authorizationRequired: ['null', 'boolean']

**SetQualifier**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**SetQualifierResponse**
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)

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

**SummaryLiabilityEstimateResponse**
  - treatmentPlanId: string(uuid) (required)
  - estimateId: string(uuid) (required)
  - brandId: string(uuid) (required)
  - primaryPlanName: ['null', 'string'] (required)
  - contractName: ['null', 'string'] (required)
  - totalEstimateCost: ['number', 'string'](double) (required)
  - createdDate: string(date-time) (required)
  - createdById: string(uuid) (required)
  - updatedDate: ['null', 'string'](date-time) (required)
  - updatedById: ['null', 'string'](uuid) (required)
  - selectedCyclePositions: ['null', 'array'] (required)
  - status: LiabilityEstimateStatus (required)

**TimeLineResponse**
  - cycles: CycleResponse[] (required)

**TopicRequest**
  - topicId: ['null', 'string'](uuid) (required)
  - topicNote: ['null', 'string'] (required)

**TotalCost**
  - deductible: ['number', 'string'](double) (required)
  - copay: ['number', 'string'](double) (required)
  - coinsurance: ['number', 'string'](double) (required)
  - passedThrough: ['number', 'string'](double) (required)

**TreatmentOverviewResponse**
  - activityPolicyPlans: ActivityPolicyPlanResponse[] (required)

**TreatmentPlanActivityRequest**
  - activityId: ['null', 'string'](uuid)
  - activityCode: ['null', 'string'] (required)
  - units: ['null', 'integer', 'string'](int32) (required)
  - days: ['null', 'string'] (required)

**TreatmentPlanActivityResponse**
  - activityId: string(uuid) (required)
  - activityCode: string (required)
  - units: ['integer', 'string'](int32) (required)
  - days: string (required)

**TreatmentPlanAddRequest**
  - cycles: ['null', 'object']
  - name: ['null', 'string'] (required)
  - qualifiers: ['null', 'array']
  - defaultCycleLength: ['null', 'integer', 'string'](int32) (required)
  - patientInfo: object

**TreatmentPlanCopyActivitiesRequest**
  - fromCycleId: ['null', 'string'](uuid) (required)
  - toCycleIds: ['null', 'array'] (required)

**TreatmentPlanCycleAddRequest**
  - activities: ['null', 'array']
  - length: ['null', 'integer', 'string'](int32) (required)

**TreatmentPlanCycleResponse**
  - cycleId: string(uuid) (required)
  - length: ['integer', 'string'](int32) (required)
  - activities: TreatmentPlanActivityResponse[] (required)

**TreatmentPlanCycleUpdateRequest**
  - length: ['null', 'integer', 'string'](int32) (required)

**TreatmentPlanDiscardRequest**
  - discardIds: ['null', 'array'] (required)

**TreatmentPlanEndDateRequest**
  - effectiveEndDate: object

**TreatmentPlanInterceptFunctionResponse**
  - orgId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - treatmentPlanId: string(uuid) (required)
  - isValid: boolean (required)
  - errorMessage: ['null', 'string'] (required)

**TreatmentPlanPatientInfoRequest**
  - guarantorId: ['null', 'string'](uuid)
  - copiedFromTemplateId: ['null', 'string'](uuid)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object
  - terminatedDate: object
  - status: object (required)
  - referringProviderId: ['null', 'string'](uuid)

**TreatmentPlanPatientInfoResponse**
  - copiedFromTemplateName: ['null', 'string'] (required)
  - patientId: string(uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - copiedFromTemplateId: ['null', 'string'](uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - terminatedDate: object (required)
  - status: TreatmentPlanStatus (required)
  - referringProviderId: ['null', 'string'](uuid) (required)

**TreatmentPlanReassignTemplateRequest**
  - newTemplateId: ['null', 'string'](uuid) (required)

**TreatmentPlanReferringProviderRequest**
  - referringProviderId: ['null', 'string'](uuid) (required)

**TreatmentPlanResponse**
  - id: string(uuid) (required)
  - name: string (required)
  - qualifiers: AttributeQualifiers[] (required)
  - defaultCycleLength: ['integer', 'string'](int32) (required)
  - createdDate: string(date-time) (required)
  - createdById: string(uuid) (required)
  - updatedDate: ['null', 'string'](date-time) (required)
  - updatedById: ['null', 'string'](uuid) (required)
  - cycles: object (required)
  - templateInfo: object (required)
  - patientInfo: object (required)

**TreatmentPlanStatus**
  - (no properties)

**TreatmentPlanTemplateInfoResponse**
  - status: TreatmentPlanTemplateStatus (required)
  - timesUsedPerQualifierDictionary: ['null', 'object']
  - timesUsedPerQualifier: KeyValuePairOfAttributeQualifiersAndint[] (required)

**TreatmentPlanTemplateSearchRequest**
  - templateName: ['null', 'string']
  - activityCode: ['null', 'string']
  - qualifiers: ['null', 'array']

**TreatmentPlanTemplateStatus**
  - (no properties)

**TreatmentPlanUpdateRequest**
  - name: ['null', 'string'] (required)
  - qualifiers: ['null', 'array']
  - defaultCycleLength: ['null', 'integer', 'string'](int32) (required)
  - patientInfo: object

