﻿# Snowdrop.PatientAgreements.Services - API Dictionary

Repo: snowdrop-patientagreements-be
Source: Snowdrop.PatientAgreements.Services.json

## Endpoints

### GET /patients/{patientId}/agreements/{date}
- Tags: PatientAgreement
- Path params: patientId: string(uuid), required; date: string, required
- Response 200: AgreementSummary[]
- Response 404: ProblemDetails

### GET /patients/{patientId}/agreements/{date}/status
- Tags: PatientAgreement
- Path params: patientId: string(uuid), required; date: string, required
- Response 200: PatientAgreementsStatus
- Response 404: ProblemDetails

### POST /patients/{patientId}/agreements/editall
- Tags: PatientAgreement
- Path params: patientId: string(uuid), required
- Request body: UpdateAllPatientAgreementsRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 400: UpdateAllPatientAgreementsValidationErrors

### GET /patients/{patientId}/agreements/status
- Tags: PatientAgreement
- Path params: patientId: string(uuid), required
- Response 200: PatientAgreementsStatus
- Response 404: ProblemDetails

### GET /patients/{patientId}/agreements/type/{agreementTypeId}
- Tags: PatientAgreement
- Path params: patientId: string(uuid), required; agreementTypeId: string(uuid), required
- Response 200: Agreement[]

### POST /patients/{patientId}/agreements/type/{agreementTypeId}
- Tags: PatientAgreement
- Path params: patientId: string(uuid), required; agreementTypeId: string(uuid), required
- Request body: UpdatePatientAgreementsRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

## Schemas

**AddPatientAgreementRequest**
  - agreementTypeId: string(uuid) (required)
  - agreementId: string(uuid) (required)
  - responseId: string(uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

**AddUpdateAgreementRequest**
  - agreementId: ['null', 'string'](uuid) (required)
  - responseId: string(uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

**Agreement**
  - agreementId: ['null', 'string'](uuid) (required)
  - agreementTypeId: string(uuid) (required)
  - agreementType: string (required)
  - responseId: ['null', 'string'](uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

**AgreementSummary**
  - agreementId: ['null', 'string'](uuid) (required)
  - agreementTypeId: string(uuid) (required)
  - agreementType: string (required)
  - responseId: ['null', 'string'](uuid) (required)
  - isActive: ['null', 'boolean'] (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)

**Date**
  - (no properties)

**EarliestEffectiveDate**
  - agreementTypeId: string(uuid) (required)
  - earliestDate: Date (required)

**PatientAgreementsStatus**
  - agreementsNeeded: boolean (required)
  - earliestEffectiveDates: EarliestEffectiveDate[] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**UpdateAllPatientAgreementsRequest**
  - agreements: AddPatientAgreementRequest[] (required)

**UpdateAllPatientAgreementsValidationError**
  - reason: string (required)
  - agreementTypeId: string(uuid) (required)
  - agreementId: string(uuid) (required)

**UpdateAllPatientAgreementsValidationErrors**
  - failures: UpdateAllPatientAgreementsValidationError[] (required)
  - isValid: boolean

**UpdatePatientAgreementsRequest**
  - agreementRequests: AddUpdateAgreementRequest[]
  - modifiedDate: object (required)

