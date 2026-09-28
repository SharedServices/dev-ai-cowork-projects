﻿# Snowdrop.PolicyReferrals.Services - API Dictionary

Repo: snowdrop-policyreferrals-be
Source: Snowdrop.PolicyReferrals.Services.json

## Endpoints

### GET /patients/{patientId}/policies/{policyId}/referrals
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Response 200: ReferralSummary[]

### POST /patients/{patientId}/policies/{policyId}/referrals
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Request body: CreateReferralRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails

### POST /patients/{patientId}/referrals
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: Referral[]

### GET /patients/{patientId}/referrals/{referralId}
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required; referralId: string(uuid), required
- Response 200: Referral
- Response 404: ProblemDetails

### PUT /patients/{patientId}/referrals/{referralId}/activate
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required; referralId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/referrals/{referralId}/deactivate
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required; referralId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/referrals/{referralId}/profile/update
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required; referralId: string(uuid), required
- Request body: UpdateReferralProfileRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/referrals/{referralId}/provider/update
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required; referralId: string(uuid), required
- Request body: UpdateReferralProviderRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/referrals/{referralId}/update
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required; referralId: string(uuid), required
- Request body: UpdateReferralRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /patients/{patientId}/referrals/search
- Tags: PatientPolicyReferrals
- Path params: patientId: string(uuid), required
- Request body: SearchReferralRequest
- Response 200: Referral[]
- Response 400: ProblemDetails

## Schemas

**ActivityQualifier**
  - setQualifier: SetQualifier
  - elementQualifier: ['null', 'string']

**CreateReferralRequest**
  - referralNumber: string
  - providerId: ['null', 'string'](uuid)
  - scheduledActivityQualifier: object
  - renderedActivityQualifier: object
  - authorizedVisits: ['null', 'integer', 'string'](int32)
  - startDate: object
  - endDate: object

**Date**
  - (no properties)

**PatientEncounter**
  - patientEncounterId: PatientEncounterIdentity
  - patientEncounterStatus: PatientEncounterStatus

**PatientEncounterIdentity**
  - locationId: string(uuid)
  - patientId: string(uuid)
  - dateOfService: Date

**PatientEncounterStatus**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**Referral**
  - referralId: string(uuid) (required)
  - referralNumber: string (required)
  - policyId: string(uuid) (required)
  - status: ReferralStatus (required)
  - providerId: ['null', 'string'](uuid) (required)
  - scheduledActivityQualifier: object (required)
  - renderedActivityQualifier: object (required)
  - authorizedVisits: ['null', 'integer', 'string'](int32) (required)
  - completedVisits: ['null', 'integer', 'string'](int32) (required)
  - scheduledVisits: ['null', 'integer', 'string'](int32) (required)
  - remainingVisits: ['null', 'integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - patientEncounters: PatientEncounter[]

**ReferralStatus**
  - (no properties)

**ReferralSummary**
  - referralId: string(uuid) (required)
  - referralNumber: string (required)
  - policyId: string(uuid) (required)
  - status: ReferralStatus (required)
  - providerId: ['null', 'string'](uuid) (required)
  - scheduledActivityQualifier: object (required)
  - renderedActivityQualifier: object (required)
  - authorizedVisits: ['null', 'integer', 'string'](int32) (required)
  - completedVisits: ['null', 'integer', 'string'](int32) (required)
  - scheduledVisits: ['null', 'integer', 'string'](int32) (required)
  - remainingVisits: ['null', 'integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)

**SearchReferralRequest**
  - scheduledActivityCodes: string[]
  - renderedActivityCodes: string[]
  - date: Date

**SetQualifier**
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)

**UpdateReferralProfileRequest**
  - referralNumber: string
  - status: ReferralStatus

**UpdateReferralProviderRequest**
  - providerId: ['null', 'string'](uuid)

**UpdateReferralRequest**
  - startDate: object
  - endDate: object
  - authorizedVisits: ['null', 'integer', 'string'](int32)

