﻿# Snowdrop.PolicyAuthorizations.Services - API Dictionary

Repo: snowdrop-policyauthorizations-be
Source: Snowdrop.PolicyAuthorizations.Services.json

## Endpoints

### POST /patients/{patientId}/authorizations
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: Authorization[]

### GET /patients/{patientId}/authorizations/{authorizationId}
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Response 200: Authorization
- Response 404: ProblemDetails

### GET /patients/{patientId}/authorizations/{authorizationId}/charges/view-all/grid
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Response 200: AuthorizationChargesGridResponse
- Response 400: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/charges/view-all/grid/que-request/{chargeId}/{requestType}
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required; chargeId: string(uuid), required; requestType: ChargeGridViewRequestType, required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/details/update
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationDetailsRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/discard
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Response 200: Authorization
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/dosage-amounts
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationDosageAmountsRequest
- Response 200: Authorization
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/authorization-number
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationNumberRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/diagnosis
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationQualifierRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/division
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationQualifierRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/effective-dates
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateEffectiveDatesRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/facility
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationQualifierRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/modifier
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationQualifierRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/rendering-provider
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationQualifierRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/units
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAllowedUnitsRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/grid/visits
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAllowedVisitsRequest
- Response 200: Authorization
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/restore
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Response 200: Authorization
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /patients/{patientId}/authorizations/{authorizationId}/update
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: UpdateAuthorizationRequest
- Response 200: Authorization
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /patients/{patientId}/authorizations/search
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required
- Request body: SearchAuthorizationRequest
- Response 200: Authorization[]
- Response 400: ProblemDetails

### GET /patients/{patientId}/policies/{policyId}/authorizations
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Response 200: Authorization[]

### POST /patients/{patientId}/policies/{policyId}/authorizations
- Tags: PatientPolicyAuthorizations
- Path params: patientId: string(uuid), required; policyId: string(uuid), required
- Request body: CreatePolicyAuthorizationRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails

## Schemas

**AttributeQualifier**
  - setQualifier: SetQualifier
  - elementQualifier: ['null', 'string']

**AttributeQualifierDisplayRecord**
  - setQualifier: SetQualifier (required)
  - elementQualifier: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)

**Authorization**
  - authorizationId: string(uuid) (required)
  - authorizationNumber: string (required)
  - patientId: string(uuid) (required)
  - policyId: string(uuid) (required)
  - policyNumber: ['null', 'string'] (required)
  - planName: ['null', 'string'] (required)
  - payerName: ['null', 'string'] (required)
  - status: TimeZoneAuthStatus (required)
  - activityQualifier: object (required)
  - modifierQualifier: object (required)
  - diagnosisQualifier: object (required)
  - renderingProviderQualifier: object (required)
  - divisionQualifier: object (required)
  - facilityQualifier: object (required)
  - allowedUnits: ['null', 'number', 'string'](double) (required)
  - billedUnits: ['null', 'number', 'string'](double) (required)
  - remainingUnits: ['null', 'number', 'string'](double) (required)
  - allowedVisits: ['null', 'number', 'string'](double) (required)
  - billedVisits: ['null', 'number', 'string'](double) (required)
  - remainingVisits: ['null', 'number', 'string'](double) (required)
  - startDate: object (required)
  - endDate: object (required)
  - dosageAmounts: object (required)
  - createdDate: string(date-time) (required)

**AuthorizationChargesGridItemResponse**
  - chargeId: string(uuid) (required)
  - chargeCode: string (required)
  - chargeDescription: ['null', 'string'] (required)
  - status: ChargeStatus (required)
  - subStatus: ChargeSubStatus (required)
  - chargeAssembly: DisplayValueRecordOfGuid (required)
  - dateOfService: DisplayValueRecordOfDate (required)
  - modifiers: DisplayValueRecordOfGuid[] (required)
  - billingUnits: DisplayValueRecordOfdecimal (required)
  - icdCodes: DisplayValueRecordOfIcdCodeIdentity[] (required)
  - ndc: DisplayValueRecordOfstring (required)
  - renderingProvider: DisplayValueRecordOfGuid (required)
  - division: DisplayValueRecordOfGuid (required)
  - facility: DisplayValueRecordOfGuid (required)
  - amount: DisplayValueRecordOfdouble (required)
  - units: DisplayValueRecordOfGuid (required)
  - balance: DisplayValueRecordOfdecimal (required)

**AuthorizationChargesGridResponse**
  - authorizationId: string(uuid) (required)
  - totalPaid: ['null', 'number', 'string'](double) (required)
  - totalBalance: ['null', 'number', 'string'](double) (required)
  - authorizationCharges: AuthorizationChargesGridItemResponse[] (required)

**ChargeGridViewRequestType**
  - (no properties)

**ChargeStatus**
  - (no properties)

**ChargeSubStatus**
  - (no properties)

**CreateAuthorizationRequest**
  - activityQualifier: object
  - modifierQualifier: object
  - diagnosisQualifier: object
  - renderingProviderQualifier: object
  - divisionQualifier: object
  - facilityQualifier: object
  - allowedUnits: ['null', 'number', 'string'](double)
  - allowedVisits: ['null', 'number', 'string'](double)

**CreatePolicyAuthorizationRequest**
  - authorizationNumber: string (required)
  - startDate: object
  - endDate: object
  - createAuthorizationRequests: CreateAuthorizationRequest[]
  - date: object

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

**DisplayValueRecordOfIcdCodeIdentity[]**
  - currentValue: ['null', 'array']
  - displayValue: ['null', 'string']

**DisplayValueRecordOfstring**
  - currentValue: ['null', 'string']
  - displayValue: ['null', 'string']

**DosageAmounts**
  - approvedDosageAmount: ['null', 'string'] (required)
  - maximumDosageAmount: ['null', 'string'] (required)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SearchAuthorizationRequest**
  - activityCodes: string[]
  - modifiers: string(uuid)[]
  - diagnosisCodes: string[]
  - renderingProviders: string(uuid)[]
  - divisions: string(uuid)[]
  - facilities: string(uuid)[]
  - portfolioId: ['null', 'string'](uuid)
  - date: Date

**SetQualifier**
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)

**TimeZoneAuthStatus**
  - (no properties)

**UpdateAllowedUnitsRequest**
  - allowedUnits: ['null', 'number', 'string'](double) (required)

**UpdateAllowedVisitsRequest**
  - allowedVisits: ['null', 'number', 'string'](double) (required)

**UpdateAuthorizationDetailsRequest**
  - authorizationNumber: string (required)
  - activityQualifier: object
  - modifierQualifier: object
  - diagnosisQualifier: object

**UpdateAuthorizationDosageAmountsRequest**
  - approvedDosageAmount: ['null', 'string']
  - maximumDosageAmount: ['null', 'string']

**UpdateAuthorizationNumberRequest**
  - authorizationNumber: string (required)

**UpdateAuthorizationQualifierRequest**
  - attributeQualifier: object (required)

**UpdateAuthorizationRequest**
  - startDate: object
  - endDate: object
  - allowedUnits: ['null', 'number', 'string'](double)
  - allowedVisits: ['null', 'number', 'string'](double)
  - renderingProviderQualifier: object
  - divisionQualifier: object
  - facilityQualifier: object

**UpdateEffectiveDatesRequest**
  - startDate: object (required)
  - endDate: object (required)

