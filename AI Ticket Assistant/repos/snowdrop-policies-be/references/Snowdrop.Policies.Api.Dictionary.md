﻿# Snowdrop.Policies.Api - API Dictionary

Repo: snowdrop-policies-be
Source: Snowdrop.Policies.Api.json

## Endpoints

### POST /policies
- Tags: Policies
- Query params: bogusData: boolean
- Request body: CreatePolicyRequest
- Response 200: PolicyIdResponse

### GET /policies/{policyId}
- Tags: Policies
- Path params: policyId: string(uuid), required
- Response 200: PolicyResponse

### POST /policies/{policyId}
- Tags: Policies
- Path params: policyId: string(uuid), required
- Query params: bogusData: boolean
- Request body: CreatePolicyRequest
- Response 200: PolicyIdResponse

### PUT /policies/{policyId}
- Tags: Policies
- Path params: policyId: string(uuid), required
- Request body: UpdatePolicyRequest
- Response 200: (no body)

### DELETE /policies/{policyId}
- Tags: Policies
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### GET /policies/{policyId}/isprovisional
- Tags: Policies
- Path params: policyId: string(uuid), required
- Response 200: boolean

### PUT /policies/{policyId}/medical-benefits/in-network-family
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Request body: MedicalBenefitsRequest
- Response 200: (no body)

### POST /policies/{policyId}/medical-benefits/in-network-family/deductible/verify
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### POST /policies/{policyId}/medical-benefits/in-network-family/out-of-pocket/verify
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### PUT /policies/{policyId}/medical-benefits/in-network-individual
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Request body: MedicalBenefitsRequest
- Response 200: (no body)

### POST /policies/{policyId}/medical-benefits/in-network-individual/deductible/verify
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### POST /policies/{policyId}/medical-benefits/in-network-individual/out-of-pocket/verify
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### PUT /policies/{policyId}/medical-benefits/out-of-network-family
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Request body: MedicalBenefitsRequest
- Response 200: (no body)

### POST /policies/{policyId}/medical-benefits/out-of-network-family/deductible/verify
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### POST /policies/{policyId}/medical-benefits/out-of-network-family/out-of-pocket/verify
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### PUT /policies/{policyId}/medical-benefits/out-of-network-individual
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Request body: MedicalBenefitsRequest
- Response 200: (no body)

### POST /policies/{policyId}/medical-benefits/out-of-network-individual/deductible/verify
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### POST /policies/{policyId}/medical-benefits/out-of-network-individual/out-of-pocket/verify
- Tags: MedicalBenefits
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### DELETE /policies/{policyId}/out-of-network
- Tags: Policies
- Path params: policyId: string(uuid), required
- Response 200: PolicyIdResponse

### PUT /policies/{policyId}/restore
- Tags: Policies
- Path params: policyId: string(uuid), required
- Response 200: (no body)

### PUT /policies/{policyId}/service-benefits/in-network
- Tags: ServiceBenefits
- Path params: policyId: string(uuid), required
- Request body: ServiceBenefitsRequest
- Response 200: (no body)

### PUT /policies/{policyId}/service-benefits/out-of-network
- Tags: ServiceBenefits
- Path params: policyId: string(uuid), required
- Request body: ServiceBenefitsOutOfNetworkRequest
- Response 200: (no body)

### POST /policies/eligibility/verification
- Tags: Eligibility
- Request body: CreatePolicyEligibilityVerificationRequest
- Response 200: PolicyEligibilityVerificationIdResponse

### PUT /policies/eligibility/verification/{verificationId}
- Tags: Eligibility
- Path params: verificationId: string(uuid), required
- Request body: UpdatePolicyEligibilityVerificationRequest
- Response 200: (no body)

### GET /policies/eligibility/verification/{verificationId}
- Tags: Eligibility
- Path params: verificationId: string(uuid), required
- Response 200: PolicyEligibilityVerificationResponse

### POST /policies/eligibility/verification/async-rte-request
- Tags: Eligibility
- Request body: AsyncRteRequest
- Response 200: (no body)

### GET /policies/eligibility/verification/policy/{policyId}
- Tags: Eligibility
- Path params: policyId: string(uuid), required
- Response 200: PolicyEligibilityVerification[]

### GET /policies/eligibility/verification/policy/{policyId}/lastfour
- Tags: Eligibility
- Path params: policyId: string(uuid), required
- Response 200: PolicyEligibilityVerification[]

### GET /policies/eligibility/verification/policy/{policyId}/limit/{limit}
- Tags: Eligibility
- Path params: policyId: string(uuid), required; limit: integer(int32), required
- Response 200: PolicyEligibilityVerification[]

### POST /policies/eligibility/verification/rte-request
- Tags: Eligibility
- Request body: RteRequest
- Response 200: PolicyEligibilityVerificationIdResponse

### GET /policies/eligibility/verification/testpdf/{verificationId}
- Tags: Eligibility
- Path params: verificationId: string(uuid), required
- Query params: userId: string(uuid)
- Response 200: (no body)

### POST /policies/manufacturercopay/{patientId}
- Tags: ManufacturerCopayAssistanceAward
- Path params: patientId: string(uuid), required
- Request body: CreateManufacturerCopayAssistanceAwardRequest
- Response 200: ManufacturerCopayAssistanceAwardIdResponse

### GET /policies/manufacturercopay/{patientId}
- Tags: ManufacturerCopayAssistanceAward
- Path params: patientId: string(uuid), required
- Response 200: ManufacturerCopayAssistanceAwardResponse[]

### PUT /policies/manufacturercopay/{patientId}/award/{awardId}
- Tags: ManufacturerCopayAssistanceAward
- Path params: patientId: string(uuid), required; awardId: string(uuid), required
- Request body: UpdateManufacturerCopayAssistanceAwardRequest
- Response 200: (no body)

### GET /policies/manufacturercopay/{patientId}/award/{awardId}
- Tags: ManufacturerCopayAssistanceAward
- Path params: patientId: string(uuid), required; awardId: string(uuid), required
- Response 200: ManufacturerCopayAssistanceAwardResponse

### GET /policies/manufacturercopay/counts
- Tags: ManufacturerCopayAssistanceAward
- Response 200: AwardCountResponse[]

### GET /policies/manufacturercopay/counts/program/{programId}
- Tags: ManufacturerCopayAssistanceAward
- Path params: programId: string(uuid), required
- Response 200: AwardCountResponse

### POST /policies/manufacturercopay/counts/programs
- Tags: ManufacturerCopayAssistanceAward
- Request body: ProgramsAwardCountRequest
- Response 200: AwardCountResponse[]

### GET /policies/patients/{patientId}
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PatientPoliciesResponse

### GET /policies/patients/{patientId}/{policyId}
- Tags: Patients
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Response 200: PatientPolicyResponse

### PUT /policies/patients/{patientId}/order
- Tags: Patients
- Path params: patientId: string(uuid), required
- Request body: PatientPoliciesOrderingByPayerTypeRequest
- Response 200: (no body)

### GET /policies/patients/{patientId}/preview
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PatientPoliciesPreviewResponse

### GET /policies/patients/{patientId}/verifications
- Tags: PatientPoliciesVerifications
- Path params: patientId: string(uuid), required
- Response 200: PatientPoliciesVerificationResponse[]
- Response 404: (no body)

### POST /policies/patients/{patientId}/verifications
- Tags: PatientPoliciesVerifications
- Path params: patientId: string(uuid), required
- Request body: PatientPoliciesVerificationRequest
- Response 200: (no body)

### GET /policies/patients/{patientId}/verifications/last
- Tags: PatientPoliciesVerifications
- Path params: patientId: string(uuid), required
- Response 200: PatientPoliciesVerificationResponse
- Response 404: (no body)

### POST /policies/support/sync/patient/{patientId}/policy/{policyId}
- Tags: Support
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Response 200: PatientPoliciesResponse

### GET /policies/tests/companyname/{companyId}
- Tags: RecordProjectionTests
- Path params: companyId: string(uuid), required
- Response 200: string

### GET /policies/tests/patients/{patientId}
- Tags: RecordProjectionTests
- Path params: patientId: string(uuid), required
- Response 200: StringStringStringDateNullableValueTuple

### GET /policies/tests/plans/{planId}
- Tags: RecordProjectionTests
- Path params: planId: string(uuid), required
- Response 200: StringGuidNullableStringGuidNullableValueTuple

### GET /policies/tests/plantype/{plantypeId}
- Tags: RecordProjectionTests
- Path params: plantypeId: string(uuid), required
- Response 200: string

### GET /policies/tests/providers/{providerId}
- Tags: RecordProjectionTests
- Path params: providerId: string(uuid), required
- Response 200: StringStringValueTuple

### GET /policies/tests/relationship/{relationshipId}
- Tags: RecordProjectionTests
- Path params: relationshipId: string(uuid), required
- Response 200: string

### GET /policies/tests/servicetypes
- Tags: RecordProjectionTests
- Response 200: string(uuid)[]

## Schemas

**AssistanceAwardDetails**
  - assistanceNumber: string (nullable)
  - awardAmount: number(double)
  - awardDate: string
  - lookbackDays: integer(int32)

**AsyncRteRequest**
  - verificationId: string(uuid)
  - payerId: string(uuid)
  - planId: string(uuid)
  - policyId: string(uuid)
  - patientId: string(uuid)
  - providerNpi: string (nullable)
  - providerFirstName: string (nullable)
  - providerLastName: string (nullable)
  - subscriberMemberId: string (nullable)
  - subscriberDob: string(date-time)
  - dateOfService: string(date-time)
  - serviceTypes: string(uuid)[] (nullable)
  - companyId: string(uuid)
  - trustVerification: boolean
  - setDOSToTransmissionDate: boolean

**AwardCountResponse**
  - awardCount: integer(int32)
  - manufacturerCopayProgramId: string(uuid)

**CoverageOrderType**
  - enum values: 0, 1, 2

**CreateManufacturerCopayAssistanceAwardRequest**
  - manufacturerCopayProgramId: string(uuid)
  - startDate: string
  - endDate: string (nullable)
  - assistanceNumber: string (nullable)

**CreatePolicyEligibilityVerificationRequest**
  - policyId: string(uuid)
  - plan: PolicyPlan
  - verificationStatus: EligibilityVerificationStatusType
  - practice: VerifyingPractice
  - dateOfService: string (nullable)
  - verificationDateOfService: string (nullable)
  - provider: VerifyingProvider
  - responsibleProvider: VerifyingProvider
  - callInformation: VerificationCallInformation
  - policyDetails: VerificationPolicyDetails
  - benefits: VerificationBenefits
  - physician: VerificationPrimaryCarePhysician
  - serviceBenefits: VerificationServiceBenefit[] (nullable)
  - notes: VerificationNotes
  - verificationType: EligibilityVerificationType
  - rteInformation: VerificationRteInformation

**CreatePolicyRequest**
  - policyId: string(uuid)
  - payerType: PayerType
  - patientId: string(uuid)
  - identification: PolicyIdentification
  - plan: PolicyPlan
  - provisionalPlan: PolicyProvisionalPlan
  - policyHolder: PolicyHolder
  - pharmacyPolicy: PharmacyPolicy
  - effectiveness: PolicyEffectiveness
  - benefitsServices: ServiceBenefits[] (nullable)
  - outOfNetworkBenefitsEnabled: boolean
  - benefitsServicesOutOfNetwork: ServiceBenefits[] (nullable)
  - medicareSecondaryAttributes: MedicareSecondaryAttributes

**DeductibleResponse**
  - remaining: number(double) (nullable)

**DeductibleUpdatedFields**
  - totalDeductibleUpdated: boolean
  - deductibleRemainingUpdated: boolean
  - deductibleMetUpdated: boolean

**EffectiveDateRange**
  - start: string (nullable)
  - end: string (nullable)

**EffectiveDollarAmount**
  - value: number(double) (nullable)
  - verified: string(date-time) (nullable)
  - verifiedByUserId: string(uuid) (nullable)

**EligibilityPolicyHolder**
  - firstName: string (nullable)
  - middleName: string (nullable)
  - lastName: string (nullable)
  - suffixName: string (nullable)
  - dateOfBirth: string (nullable)
  - relationshipId: string(uuid) (nullable)
  - relationshipString: string (nullable)
  - addressLine1: string (nullable)
  - addressLine2: string (nullable)
  - city: string (nullable)
  - stateId: string(uuid) (nullable)
  - zipCode: string (nullable)
  - county: string (nullable)
  - socialSecurityNumber: string (nullable)
  - sex: NonPatientHolderSexType

**EligibilityVerificationStatusType**
  - enum values: 0, 1, 2, 3, 4, 5, 6, 7, 8

**EligibilityVerificationType**
  - enum values: 0, 1

**InsuranceCardStatus**
  - status: InsuranceCardStatusType

**InsuranceCardStatusType**
  - enum values: 0, 1, 2, 3

**ManufacturerCopayAssistanceAwardIdResponse**
  - manufacturerCopayAssistanceAwardId: string(uuid)

**ManufacturerCopayAssistanceAwardResponse**
  - manufacturerCopayAssistanceAwardId: string(uuid)
  - patientId: string(uuid)
  - manufacturerCopayProgramId: string(uuid)
  - startDate: string
  - endDate: string (nullable)
  - assistanceNumber: string (nullable)

**MedicalBenefits**
  - totalDeductible: number(double) (nullable)
  - totalOutOfPocket: number(double) (nullable)
  - deductibleRemaining: EffectiveDollarAmount
  - outOfPocketRemaining: EffectiveDollarAmount
  - deductibleMet: number(double) (nullable)
  - oopMet: number(double) (nullable)
  - periodMaximum: number(double) (nullable)
  - nextRecalculationDate: string (nullable)
  - referralRequired: boolean
  - deductibleIncludedInOop: boolean
  - copayRequiredAfterOop: boolean
  - preExistingCondition: boolean
  - recalculationPeriod: RecalculationPeriodType
  - recalculationMonth: RecalculationMonthType

**MedicalBenefitsDetail**
  - totalDeductible: number(double) (nullable)
  - totalOutOfPocket: number(double) (nullable)
  - deductibleRemaining: number(double) (nullable)
  - outOfPocketRemaining: number(double) (nullable)
  - deductibleMet: number(double) (nullable)
  - oopMet: number(double) (nullable)
  - periodMaximum: number(double) (nullable)
  - deductibleIncludedInOop: boolean
  - copayRequiredAfterOop: boolean
  - preExistingCondition: boolean
  - recalculationPeriod: RecalculationPeriodType
  - recalculationMonth: RecalculationMonthType
  - referralRequired: boolean

**MedicalBenefitsRequest**
  - benefits: MedicalBenefitsDetail

**MedicareSecondaryAttributes**
  - mspInsuranceTypeId: string(uuid) (nullable)

**NonPatientHolder**
  - firstName: string (nullable)
  - middleName: string (nullable)
  - lastName: string (nullable)
  - suffixName: string (nullable)
  - addressLine1: string (nullable)
  - addressLine2: string (nullable)
  - city: string (nullable)
  - stateId: string(uuid) (nullable)
  - zipCode: string (nullable)
  - county: string (nullable)
  - policyHolderRelationshipId: string(uuid) (nullable)
  - socialSecurityNumber: string (nullable)
  - sex: NonPatientHolderSexType
  - dateOfBirth: string (nullable)

**NonPatientHolderSexType**
  - enum values: 0, 1, 2, 3

**OopUpdatedFields**
  - totalOopUpdated: boolean
  - oopRemainingUpdated: boolean
  - oopMetUpdated: boolean

**PatientAwardResponse**
  - policyId: string(uuid)
  - payerType: PayerType
  - program: PlanResponse
  - payer: PayerResponse
  - identification: PolicyIdentification
  - status: PolicyStatus
  - effectiveness: PolicyEffectiveness
  - assistanceAwardDetails: AssistanceAwardDetails

**PatientPoliciesAlerts**
  - activePolicyCountAttentionNeeded: boolean
  - activeInsuranceCardAttentionNeeded: boolean
  - activePolicyVerificationAgeAttentionNeeded: boolean

**PatientPoliciesOrderingByPayerTypeRequest**
  - payerType: PayerType
  - order: string(uuid)[]

**PatientPoliciesPreviewResponse**
  - patientId: string(uuid)
  - primary: PatientPolicyPreviewResponse

**PatientPoliciesResponse**
  - patientId: string(uuid)
  - verification: PatientPolicyVerification
  - alerts: PatientPoliciesAlerts
  - policies: PatientPolicyResponse[] (nullable)
  - awards: PatientAwardResponse[] (nullable)

**PatientPoliciesVerificationRequest**
  - timestamp: string(date-time)

**PatientPoliciesVerificationResponse**
  - userId: string(uuid)
  - timestamp: string(date-time)

**PatientPolicyPreviewResponse**
  - policyId: string(uuid)
  - plan: PlanResponse
  - payer: PayerResponse
  - identification: PolicyIdentification

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

**PharmacyPolicy**
  - rxBinId: string (nullable)
  - rxGroupId: string (nullable)
  - rxPcnId: string (nullable)

**PlanResponse**
  - planId: string(uuid) (nullable)
  - name: string (nullable)
  - legalName: string (nullable)

**PolicyCoverageStatusType**
  - enum values: 0, 1, 2, 3, 4, 5

**PolicyEffectiveness**
  - dateRanges: EffectiveDateRange[] (nullable)

**PolicyEligibilityVerification**
  - verificationType: EligibilityVerificationType
  - verificationId: string(uuid)
  - policyId: string(uuid)
  - plan: PolicyPlan
  - verificationStatus: EligibilityVerificationStatusType
  - practice: VerifyingPractice
  - dateOfService: string (nullable)
  - verificationDateOfService: string (nullable)
  - provider: VerifyingProvider
  - responsibleProvider: VerifyingProvider
  - callInformation: VerificationCallInformation
  - policyDetails: VerificationPolicyDetails
  - benefits: VerificationBenefits
  - physician: VerificationPrimaryCarePhysician
  - serviceBenefits: VerificationServiceBenefit[] (nullable)
  - notes: VerificationNotes
  - verificationPdf: VerificationPdfType
  - rteInformation: VerificationRteInformation
  - createdBy: string(uuid)
  - lastModifiedBy: string(uuid)
  - created: string(date-time)
  - lastModified: string(date-time)

**PolicyEligibilityVerificationIdResponse**
  - verificationId: string(uuid)

**PolicyEligibilityVerificationResponse**
  - verificationType: EligibilityVerificationType
  - verificationId: string(uuid)
  - policyId: string(uuid)
  - plan: PolicyPlan
  - verificationStatus: EligibilityVerificationStatusType
  - practice: VerifyingPractice
  - dateOfService: string (nullable)
  - verificationDateOfService: string (nullable)
  - provider: VerifyingProvider
  - responsibleProvider: VerifyingProvider
  - callInformation: VerificationCallInformation
  - policyDetails: VerificationPolicyDetails
  - benefits: VerificationBenefits
  - physician: VerificationPrimaryCarePhysician
  - serviceBenefits: VerificationServiceBenefit[] (nullable)
  - notes: VerificationNotes
  - verificationPdf: VerificationPdfType
  - rteInformation: VerificationRteInformation
  - createdBy: string(uuid)
  - lastModifiedBy: string(uuid)
  - created: string(date-time)
  - lastModified: string(date-time)

**PolicyHolder**
  - isPatient: boolean
  - nonPatientHolder: NonPatientHolder

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

**PolicyResponse**
  - policyId: string(uuid)
  - patientId: string(uuid)
  - payerType: PayerType
  - identification: PolicyIdentification
  - plan: PlanResponse
  - payer: PayerResponse
  - cobra: boolean
  - selfFunded: boolean
  - coverageOrder: CoverageOrderType
  - medicareSecondaryAttributes: MedicareSecondaryAttributes
  - provisionalPlan: PolicyProvisionalPlan
  - policyHolder: PolicyHolder
  - pharmacyPolicy: PharmacyPolicy
  - effectiveness: PolicyEffectiveness
  - benefitsIndividual: MedicalBenefits
  - benefitsFamily: MedicalBenefits
  - benefitsServices: ServiceBenefits[] (nullable)
  - outOfNetworkBenefitsEnabled: boolean
  - benefitsServicesOutOfNetwork: ServiceBenefits[] (nullable)
  - benefitsFamilyOutOfNetwork: MedicalBenefits
  - benefitsIndividualOutOfNetwork: MedicalBenefits
  - lastEligibilityVerification: string(date-time) (nullable)
  - policyCoverageStatus: PolicyCoverageStatusType
  - insuranceCardStatus: InsuranceCardStatus
  - status: PolicyStatus
  - strengthMeter: PolicyStrengthMeter

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

**PrimaryOrSecondaryType**
  - enum values: 0, 1, 2

**ProgramsAwardCountRequest**
  - manufacturerCopayProgramIds: string(uuid)[] (nullable)

**RecalculationMonthType**
  - enum values: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12

**RecalculationPeriodType**
  - enum values: 0, 1, 2

**RteRequest**
  - validationId: string(uuid) (nullable)
  - payerId: string(uuid)
  - planId: string(uuid)
  - policyId: string(uuid)
  - providerNpi: string (nullable)
  - providerFirstName: string (nullable)
  - providerLastName: string (nullable)
  - subscriberMemberId: string (nullable)
  - subscriberDob: string(date-time)
  - dateOfService: string(date-time)
  - serviceTypes: string(uuid)[] (nullable)
  - companyId: string(uuid)

**ServiceBenefitAuthorizationType**
  - enum values: 0, 1, 2

**ServiceBenefits**
  - serviceTypeId: string(uuid)
  - coInsurancePercentage: number(double) (nullable)
  - copay: number(double) (nullable)
  - authorizationRequired: boolean (nullable)
  - hasNoCoverage: boolean

**ServiceBenefitsOutOfNetworkRequest**
  - outOfNetworkBenefitsEnabled: boolean
  - benefits: ServiceBenefits[] (nullable)

**ServiceBenefitsRequest**
  - benefits: ServiceBenefits[] (nullable)

**ServiceBenefitUpdatedFields**
  - serviceTypeId: string(uuid)
  - hasCoverageUpdated: boolean
  - coInsuranceUpdated: boolean
  - coPayUpdated: boolean

**StringGuidNullableStringGuidNullableValueTuple**
  - item1: string (nullable)
  - item2: string(uuid) (nullable)
  - item3: string (nullable)
  - item4: string(uuid) (nullable)

**StringStringStringDateNullableValueTuple**
  - item1: string (nullable)
  - item2: string (nullable)
  - item3: string (nullable)
  - item4: string (nullable)

**StringStringValueTuple**
  - item1: string (nullable)
  - item2: string (nullable)

**UpdateManufacturerCopayAssistanceAwardRequest**
  - startDate: string (nullable)
  - endDate: string (nullable)
  - assistanceNumber: string (nullable)

**UpdatePolicyEligibilityVerificationRequest**
  - plan: PolicyPlan
  - verificationStatus: EligibilityVerificationStatusType
  - practice: VerifyingPractice
  - dateOfService: string (nullable)
  - verificationDateOfService: string (nullable)
  - provider: VerifyingProvider
  - responsibleProvider: VerifyingProvider
  - callInformation: VerificationCallInformation
  - policyDetails: VerificationPolicyDetails
  - benefits: VerificationBenefits
  - physician: VerificationPrimaryCarePhysician
  - serviceBenefits: VerificationServiceBenefit[] (nullable)
  - notes: VerificationNotes

**UpdatePolicyRequest**
  - identification: PolicyIdentification
  - plan: PolicyPlan
  - provisionalPlan: PolicyProvisionalPlan
  - policyHolder: PolicyHolder
  - pharmacyPolicy: PharmacyPolicy
  - effectiveness: PolicyEffectiveness
  - medicareSecondaryAttributes: MedicareSecondaryAttributes
  - coverageOrder: CoverageOrderType
  - cobra: boolean (nullable)
  - selfFunded: boolean (nullable)

**VerificationBenefits**
  - totalDeductible: number(double) (nullable)
  - deductibleMet: number(double) (nullable)
  - deductibleRemaining: number(double) (nullable)
  - totalOop: number(double) (nullable)
  - oopMet: number(double) (nullable)
  - oopRemaining: number(double) (nullable)
  - periodMaximum: number(double) (nullable)
  - recalculationPeriod: RecalculationPeriodType
  - recalculationMonth: RecalculationMonthType
  - deductibleIncludedInOop: boolean
  - copayRequiredAfterOop: boolean
  - preExistingCondition: boolean
  - referralRequired: boolean

**VerificationCallInformation**
  - payerRepresentative: string (nullable)
  - confirmationNumber: string (nullable)

**VerificationNotes**
  - notes: string (nullable)

**VerificationPdfType**
  - noteId: string(uuid)
  - attachmentId: string(uuid)

**VerificationPolicyDetails**
  - policyHolderSameAsPatient: boolean
  - eligibilityPolicyHolder: EligibilityPolicyHolder
  - policyNumber: string (nullable)
  - groupNumber: string (nullable)
  - primaryOrSecondary: PrimaryOrSecondaryType
  - mspInsuranceType: string(uuid) (nullable)
  - inNetwork: boolean
  - startDate: string (nullable)
  - endDate: string (nullable)
  - neverActive: boolean
  - cobra: boolean
  - selfFunded: boolean

**VerificationPrimaryCarePhysician**
  - npi: string (nullable)
  - physicianName: string (nullable)
  - physicianSpecialty: string (nullable)

**VerificationRteInformation**
  - rteResponse: string (nullable)
  - rteResult: VerificationRteResult
  - rteRequestNoteId: string(uuid)
  - rteRequestAttachmentId: string(uuid)
  - rteResponseNoteId: string(uuid)
  - rteResponseAttachmentId: string(uuid)
  - errors: string[] (nullable)
  - updatedFields: VerificationRteUpdatedFields

**VerificationRteResult**
  - enum values: 0, 1, 2, 3

**VerificationRteUpdatedFields**
  - deductibleUpdatedFields: DeductibleUpdatedFields
  - oopUpdatedFields: OopUpdatedFields
  - serviceBenefitsUpdatedFields: ServiceBenefitUpdatedFields[] (nullable)

**VerificationServiceBenefit**
  - serviceType: string(uuid)
  - serviceTypeName: string (nullable)
  - coverage: boolean
  - coinsurance: number(double) (nullable)
  - copay: number(double) (nullable)
  - authorization: ServiceBenefitAuthorizationType

**VerifyingPractice**
  - companyId: string(uuid) (nullable)
  - companyName: string (nullable)
  - companyTin: string (nullable)

**VerifyingProvider**
  - providerId: string(uuid)
  - providerName: string (nullable)
  - providerNpi: string (nullable)

