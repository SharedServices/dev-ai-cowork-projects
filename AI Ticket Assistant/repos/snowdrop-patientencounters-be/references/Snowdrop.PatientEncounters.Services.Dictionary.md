﻿# Snowdrop.PatientEncounters.Services - API Dictionary

Repo: snowdrop-patientencounters-be
Source: Snowdrop.PatientEncounters.Services.json

## Endpoints

### POST /encounter-numbers/generate
- Tags: PatientEncounterNumber
- Request body: string
- Response 200: (no body)
- Response 409: ProblemDetails
- Response 500: (no body)

### GET /encounters/{locationId}/{patientId}/{dateOfService}
- Tags: PatientEncounters
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required
- Response 200: PatientEncounter
- Response 404: ProblemDetails

### GET /encounters/{locationId}/{patientId}/{dateOfService}/encounternumber
- Tags: PatientEncounters
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required
- Response 200: PatientEncounter
- Response 404: ProblemDetails

### PUT /encounters/{locationId}/{patientId}/{dateOfService}/referrals/{referralId}/remove
- Tags: PatientEncounters
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required; referralId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails

### PUT /encounters/{locationId}/{patientId}/{dateOfService}/referrals/add
- Tags: PatientEncounters
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required
- Request body: string(uuid)[]
- Response 200: (no body)
- Response 404: ProblemDetails

### GET /encounters/{patientId}/{date}
- Tags: PatientEncounters
- Path params: patientId: string(uuid), required; date: string, required
- Response 200: PatientEncounterHeader[]

### GET /encounters/{patientId}/{dateOfService}/search
- Tags: PatientEncounters
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Response 200: PatientEncounter[]

### POST /encounters/{patientId}/search
- Tags: PatientEncounters
- Path params: patientId: string(uuid), required
- Request body: PatientEncounterSearchCriteria
- Response 200: PatientEncounterHeader[]

### POST /encountersearch
- Tags: PatientEncounterSearch
- Request body: EncounterSearchCriteria
- Response 200: PatientEncounterSearchResult
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /encountersearch/{locationId}/{patientId}/{dateOfService}/preview
- Tags: PatientEncounterSearch
- Path params: locationId: string(uuid), required; patientId: string(uuid), required; dateOfService: string, required
- Response 200: PatientEncounterPreview
- Response 404: ProblemDetails

### POST /encountersearch/download
- Tags: PatientEncounterSearch
- Request body: EncounterSearchCriteria
- Response 200: FileContentResult
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /encountersearch/parameters
- Tags: PatientEncounterSearch
- Request body: EncounterSearchParameters
- Response 200: PatientEncounterSearchResult
- Response 400: ProblemDetails
- Response 404: ProblemDetails

## Schemas

**AttributeQualifier**
  - elementQualifier: object (required)
  - setQualifier: object (required)

**ChargeStatus**
  - (no properties)

**Date**
  - (no properties)

**ElementQualifier**
  - elementId: string (required)

**EncounterSearchCriteria**
  - encounterSearchId: string(uuid) (required)
  - sortBy: object (required)
  - continuationToken: ['null', 'string'] (required)

**EncounterSearchParameters**
  - encounterNumber: ['null', 'string'] (required)
  - statuses: ['integer', 'string'](int32)[]
  - patientFAN: ['null', 'string'] (required)
  - patientFirstName: ['null', 'string'] (required)
  - patientLastName: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - dateOfServiceFrom: object (required)
  - dateOfServiceTo: object (required)
  - dateLastFiledFrom: object (required)
  - dateLastFiledTo: object (required)
  - locationIds: string(uuid)[]
  - providerIds: string(uuid)[]
  - payerPosition: ['null', 'integer', 'string'](int32) (required)
  - payerIds: string(uuid)[]
  - planIds: string(uuid)[]
  - outstandingBalanceMin: ['null', 'number', 'string'](double) (required)
  - outstandingBalanceMax: ['null', 'number', 'string'](double) (required)
  - invoiceStatuses: ['integer', 'string'](int32)[]
  - activityCode: object (required)
  - activityStatuses: RenderedActivityStatus[]
  - chargeCode: object (required)
  - chargeStatuses: ChargeStatus[]

**EncounterSearchSortBy**
  - column: string (required)
  - order: string (required)

**EntityTagHeaderValue**
  - tag: StringSegment
  - isWeak: boolean

**FileContentResult**
  - fileContents: string(byte)
  - contentType: ['null', 'string']
  - fileDownloadName: ['null', 'string']
  - lastModified: ['null', 'string'](date-time)
  - entityTag: object
  - enableRangeProcessing: boolean

**GridElement**
  - currentValue: string (required)
  - displayValue: string (required)

**InvoiceSummary**
  - invoiceNumber: string (required)
  - invoiceStatus: ['integer', 'string'](int32) (required)
  - invoiceStatusName: string (required)

**PatientEncounter**
  - organizationId: string(uuid) (required)
  - patientEncounterId: PatientEncounterIdentity (required)
  - patientEncounterNumber: ['null', 'string'] (required)
  - patientEncounterStatus: PatientEncounterStatus (required)
  - intakeStatusId: string(uuid)
  - referrals: string(uuid)[]
  - scheduledActivityGroups: ScheduledActivityGroup[]
  - renderedActivityGroups: RenderedActivityGroup[]

**PatientEncounterHeader**
  - patientEncounterNumber: ['null', 'string'] (required)
  - patientId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - patientEncounterStatus: PatientEncounterStatus (required)
  - intakeStatusId: string(uuid) (required)
  - providerIds: string(uuid)[] (required)
  - scheduledActivityCount: ['integer', 'string'](int32) (required)
  - provisionalActivityCount: ['integer', 'string'](int32) (required)
  - renderedActivityCount: ['integer', 'string'](int32) (required)
  - chargedActivityCount: ['integer', 'string'](int32) (required)
  - billedActivityCount: ['integer', 'string'](int32) (required)

**PatientEncounterIdentity**
  - locationId: string(uuid)
  - patientId: string(uuid)
  - dateOfService: Date

**PatientEncounterPreview**
  - encounterNumber: ['null', 'string'] (required)
  - status: ['integer', 'string'](int32) (required)
  - statusName: string (required)
  - patientId: string(uuid) (required)
  - patientFAN: string (required)
  - patientFirstName: string (required)
  - patientLastName: string (required)
  - dateOfBirth: Date (required)
  - dateOfService: Date (required)
  - locationId: string(uuid) (required)
  - locationName: string (required)
  - payerSummaries: PayerSummary[]

**PatientEncounterSearchCriteria**
  - startDate: object (required)
  - endDate: object (required)

**PatientEncounterSearchGridResult**
  - encounterNumber: GridElement (required)
  - status: GridElement (required)
  - patient: GridElement (required)
  - dateOfBirth: GridElement (required)
  - dateOfService: GridElement (required)
  - dateLastFiled: GridElement (required)
  - location: GridElement (required)
  - provider: GridElement (required)
  - insuranceBalance: GridElement (required)
  - otherBalance: GridElement (required)
  - patientBalance: GridElement (required)
  - insurance: GridElement (required)
  - other: GridElement (required)

**PatientEncounterSearchResult**
  - searchParameters: EncounterSearchParameters (required)
  - sortBy: object (required)
  - encounters: PatientEncounterSearchGridResult[]
  - count: ['null', 'integer', 'string'](int32) (required)
  - continuationToken: ['null', 'string'] (required)

**PatientEncounterStatus**
  - (no properties)

**PayerSummary**
  - payerId: ['null', 'string'](uuid) (required)
  - payerName: ['null', 'string'] (required)
  - planId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorName: ['null', 'string'] (required)
  - paid: ['number', 'string'](double) (required)
  - balance: ['number', 'string'](double) (required)
  - invoiceSummaries: InvoiceSummary[]

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**RenderedActivity**
  - renderedActivityId: string(uuid) (required)
  - activityTypeId: ['null', 'string'] (required)
  - activityTypeDescription: ['null', 'string'] (required)
  - appointmentTypeId: ['null', 'string'](uuid) (required)
  - dateOfRecord: object (required)
  - attendingProviderId: ['null', 'string'](uuid) (required)
  - orderingProviderId: ['null', 'string'](uuid) (required)
  - supportingProviders: string(uuid)[] (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)
  - modifiers: string[] (required)
  - ndc: ['null', 'string'] (required)
  - diagnosisCodes: string[] (required)
  - units: object (required)
  - activityStatus: ['null', 'string'] (required)
  - scheduledActivityId: ['null', 'string'](uuid) (required)
  - createdDate: string(date-time) (required)
  - isArchived: boolean (required)

**RenderedActivityGroup**
  - providerId: string(uuid) (required)
  - appointmentTypeId: ['null', 'string'](uuid) (required)
  - renderedActivities: RenderedActivity[]

**RenderedActivityStatus**
  - (no properties)

**ScheduledActivity**
  - scheduledActivityId: string(uuid) (required)
  - duration: string (required)
  - activityTypeId: ['null', 'string'] (required)
  - appointmentTypeId: string(uuid) (required)
  - providerId: string(uuid) (required)
  - appointmentTime: string(date-time) (required)
  - facilityId: string(uuid) (required)
  - isCancelled: boolean (required)
  - createdDate: string(date-time) (required)

**ScheduledActivityGroup**
  - providerId: string(uuid) (required)
  - appointmentTypeId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - scheduledActivities: ScheduledActivity[]

**SetQualifier**
  - setId: string(uuid) (required)

**StringSegment**
  - buffer: ['null', 'string']
  - offset: ['integer', 'string'](int32)
  - length: ['integer', 'string'](int32)
  - value: ['null', 'string']
  - hasValue: boolean

**Units**
  - unitsOfMeasure: string (required)
  - quantity: ['number', 'string'](double) (required)

