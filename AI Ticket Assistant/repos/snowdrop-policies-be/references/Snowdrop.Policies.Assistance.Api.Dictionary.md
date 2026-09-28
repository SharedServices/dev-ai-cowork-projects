﻿# Snowdrop.Policies.Assistance.Api - API Dictionary

Repo: snowdrop-policies-be
Source: Snowdrop.Policies.Assistance.Api.json

## Endpoints

### POST /policies/assistance
- Tags: Awards
- Request body: CreateAwardRequest
- Response 200: PolicyIdResponse

### GET /policies/assistance/{policyId}
- Tags: Awards
- Path params: policyId: string(uuid), required
- Response 200: AwardResponse

### POST /policies/assistance/{policyId}
- Tags: Awards
- Path params: policyId: string(uuid), required
- Request body: CreateAwardRequest
- Response 200: PolicyIdResponse

### PUT /policies/assistance/{policyId}
- Tags: Awards
- Path params: policyId: string(uuid), required
- Request body: UpdateAwardRequest
- Response 200: (no body)

### DELETE /policies/assistance/{policyId}
- Tags: Awards
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### PUT /policies/assistance/{policyId}/restore
- Tags: Awards
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### PUT /policies/assistance/{policyId}/update-assistance-covered-services
- Tags: Awards
- Path params: policyId: string(uuid), required
- Request body: UpdateCoveredServicesRequest
- Response 200: EnrollmentResponse

### PUT /policies/assistance/{policyId}/update-assistance-external-amount
- Tags: Awards
- Path params: policyId: string(uuid), required
- Request body: UpdateExternalAmountRequest
- Response 200: EnrollmentResponse

### PUT /policies/assistance/{policyId}/update-assistance-program
- Tags: Awards
- Path params: policyId: string(uuid), required
- Request body: UpdateAwardProgramRequest
- Response 200: EnrollmentResponse

### GET /policies/assistance/patients/{patientId}
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PatientAwardsResponse

### GET /policies/assistance/patients/{patientId}/enrollments/grid
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: EnrollmentResponse[]

### POST /policies/assistance/support/sync/patient/{patientId}/policy/{policyId}
- Tags: Support
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Response 200: PatientPoliciesResponse

## Schemas

**AssistanceAwardBalance**
  - amountPosted: number(double)
  - amountPending: number(double)

**AssistanceAwardDetails**
  - assistanceNumber: string (nullable)
  - awardAmount: number(double)
  - awardDate: string
  - lookbackDays: integer(int32)

**AssistanceProgramCoveredService**
  - assistanceProgramCoveredServiceId: string(uuid)
  - chargeCode: AssistanceProgramCoveredServiceChargeCodeCriteria
  - activityCode: AssistanceProgramCoveredServiceActivityCodeCriteria
  - modifier: AssistanceProgramCoveredServiceModifierCriteria
  - ndc: AssistanceProgramCoveredServiceNdcCriteria
  - diagnosis: AssistanceProgramCoveredServiceDiagnosisCriteria

**AssistanceProgramCoveredServiceActivityCodeCriteria**
  - elementId: string (nullable)
  - setId: string(uuid) (nullable)
  - isFactorySet: boolean

**AssistanceProgramCoveredServiceChargeCodeCriteria**
  - elementId: string (nullable)
  - setId: string(uuid) (nullable)
  - isFactorySet: boolean

**AssistanceProgramCoveredServiceDiagnosisCriteria**
  - elementId: IcdCodeIdentity
  - setId: string(uuid) (nullable)
  - isFactorySet: boolean

**AssistanceProgramCoveredServiceModifierCriteria**
  - elementId: string(uuid) (nullable)
  - setId: string(uuid) (nullable)
  - isFactorySet: boolean

**AssistanceProgramCoveredServiceNdcCriteria**
  - elementId: string (nullable)
  - setId: string(uuid) (nullable)
  - isFactorySet: boolean

**AwardResponse**
  - policyId: string(uuid)
  - payerType: PayerType
  - patientId: string(uuid)
  - plan: PlanResponse
  - payer: PayerResponse
  - status: PolicyStatus
  - effectiveness: PolicyEffectiveness
  - assistanceAwardDetails: AssistanceAwardDetails
  - assistanceAwardBalance: AssistanceAwardBalance
  - externalAmount: number(double)
  - assistanceProgramCoveredServices: AssistanceProgramCoveredService[] (nullable)

**CreateAwardRequest**
  - payerType: PayerType
  - patientId: string(uuid)
  - plan: PolicyPlan
  - effectiveness: PolicyEffectiveness
  - assistanceAwardDetails: AssistanceAwardDetails
  - assistanceProgramCoveredServices: AssistanceProgramCoveredService[] (nullable)

**DeductibleResponse**
  - remaining: number(double) (nullable)

**EffectiveDateRange**
  - start: string (nullable)
  - end: string (nullable)

**EnrollmentResponse**
  - policyId: string(uuid)
  - planId: string(uuid) (nullable)
  - planName: string (nullable)
  - payerId: string(uuid) (nullable)
  - payerName: string (nullable)
  - payerType: PayerType
  - assistanceNumber: string (nullable)
  - effectiveDateRange: EffectiveDateRange
  - awardAmount: number(double)
  - status: PolicyStatus

**IcdCodeIdentity**
  - code: string (nullable)
  - icdCodeType: IcdCodeType
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - enum values: 0, 1

**InsuranceCardStatus**
  - status: InsuranceCardStatusType

**InsuranceCardStatusType**
  - enum values: 0, 1, 2, 3

**PatientAwardResponse**
  - policyId: string(uuid)
  - payerType: PayerType
  - program: PlanResponse
  - payer: PayerResponse
  - identification: PolicyIdentification
  - status: PolicyStatus
  - effectiveness: PolicyEffectiveness
  - assistanceAwardDetails: AssistanceAwardDetails

**PatientAwardsResponse**
  - patientId: string(uuid)
  - awards: PatientAwardResponse[] (nullable)

**PatientPoliciesAlerts**
  - activePolicyCountAttentionNeeded: boolean
  - activeInsuranceCardAttentionNeeded: boolean
  - activePolicyVerificationAgeAttentionNeeded: boolean

**PatientPoliciesResponse**
  - patientId: string(uuid)
  - verification: PatientPolicyVerification
  - alerts: PatientPoliciesAlerts
  - policies: PatientPolicyResponse[] (nullable)
  - awards: PatientAwardResponse[] (nullable)

**PatientPolicyResponse**
  - policyId: string(uuid)
  - plan: PlanResponse
  - provisionalPlan: PolicyProvisionalPlan
  - payer: PayerResponse
  - identification: PolicyIdentification
  - deductible: DeductibleResponse
  - strengthMeter: PolicyStrengthMeter
  - insuranceCardStatus: InsuranceCardStatus
  - status: PolicyStatus
  - effectiveness: PolicyEffectiveness
  - policyCoverageStatus: PolicyCoverageStatusType

**PatientPolicyVerification**
  - userId: string(uuid)
  - timestamp: string(date-time)

**PayerResponse**
  - payerId: string(uuid) (nullable)
  - name: string (nullable)

**PayerType**
  - enum values: 0, 4, 5, 6

**PlanResponse**
  - planId: string(uuid) (nullable)
  - name: string (nullable)
  - legalName: string (nullable)

**PolicyCoverageStatusType**
  - enum values: 0, 1, 2, 3, 4, 5

**PolicyEffectiveness**
  - dateRanges: EffectiveDateRange[] (nullable)

**PolicyIdentification**
  - policyNumber: string (nullable)
  - groupNumber: string (nullable)
  - otherInsuredId: string (nullable)

**PolicyIdResponse**
  - policyId: string(uuid)

**PolicyPlan**
  - planId: string(uuid) (nullable)

**PolicyProvisionalPlan**
  - payerName: string (nullable)
  - planName: string (nullable)
  - phoneNumber: string (nullable)
  - extension: string (nullable)
  - addressLine1: string (nullable)
  - addressLine2: string (nullable)
  - city: string (nullable)
  - stateId: string(uuid) (nullable)
  - zipCode: string (nullable)
  - county: string (nullable)
  - note: string (nullable)

**PolicyStatus**
  - statusType: PolicyStatusType

**PolicyStatusType**
  - enum values: 0, 1, 2

**PolicyStrengthMeter**
  - planAssigned: boolean
  - policyNumber: boolean
  - policyHolder: boolean
  - insuranceCard: boolean
  - policyEffectiveDates: boolean
  - strength: string (nullable)

**UpdateAwardProgramRequest**
  - planId: string(uuid) (nullable)

**UpdateAwardRequest**
  - effectiveness: PolicyEffectiveness
  - assistanceAwardDetails: AssistanceAwardDetails

**UpdateCoveredServicesRequest**
  - coveredServices: AssistanceProgramCoveredService[] (nullable)

**UpdateExternalAmountRequest**
  - externalAmount: number(double)

