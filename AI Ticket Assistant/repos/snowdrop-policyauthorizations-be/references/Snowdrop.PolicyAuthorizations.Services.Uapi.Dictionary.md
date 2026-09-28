﻿# Snowdrop.PolicyAuthorizations.Services.Uapi - API Dictionary

Repo: snowdrop-policyauthorizations-be
Source: Snowdrop.PolicyAuthorizations.Services.Uapi.json

## Endpoints

### PUT /patients/{patientId}/authorizations/{authorizationId}/simplified-update
- Tags: SimplifiedAuthorizationUpdates
- Path params: patientId: string(uuid), required; authorizationId: string(uuid), required
- Request body: SimplifiedUpdateAuthorizationRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

## Schemas

**AttributeQualifier**
  - setQualifier: SetQualifier
  - elementQualifier: ['null', 'string']

**Date**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SetQualifier**
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)

**SimplifiedUpdateAuthorizationRequest**
  - authorizationNumber: ['null', 'string']
  - activityQualifier: object
  - modifierQualifier: object
  - diagnosisQualifier: object
  - renderingProviderQualifier: object
  - divisionQualifier: object
  - facilityQualifier: object
  - startDate: object
  - endDate: object
  - allowedUnits: ['null', 'number', 'string'](double)
  - allowedVisits: ['null', 'number', 'string'](double)
  - approvedDosageAmount: ['null', 'string']
  - maximumDosageAmount: ['null', 'string']

