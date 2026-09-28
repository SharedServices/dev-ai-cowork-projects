﻿# Snowdrop.Episodes.Services - API Dictionary

Repo: snowdrop-episodes-be
Source: Snowdrop.Episodes.Services.json

## Endpoints

### GET /crosswalk/rom
- Tags: Crosswalk
- Response 200: RomDiagnosisCrosswalk[]

### GET /crosswalk/rom/download
- Tags: Crosswalk
- Response 200: (no body)

### POST /crosswalk/rom/upload
- Tags: Crosswalk
- Request body: object
- Response 200: (no body)
- Response 400: ProblemDetails

### GET /episode-types
- Tags: EpisodeTypes
- Response 200: EpisodeTypeGridItemResponse[]

### POST /episode-types
- Tags: EpisodeTypes
- Request body: CreateEpisodeTypeRequest
- Response 200: CreateEpisodeTypeResponse
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### GET /episode-types/{episodeTypeId}
- Tags: EpisodeTypes
- Path params: episodeTypeId: string(uuid), required
- Response 200: EpisodeTypeResponse
- Response 404: ProblemDetails

### GET /episode-types/active
- Tags: EpisodeTypes
- Response 200: EpisodeTypeHeaderResponse[]

### POST /episode-types/duplicate-check
- Tags: EpisodeTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 400: ProblemDetails

### PUT /episode-types/name
- Tags: EpisodeTypes
- Request body: UpdateEpisodeTypeNameRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /episode-types/phases
- Tags: EpisodeTypes
- Request body: UpdateEpisodeTypePhasesRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /episode-types/qualifiers
- Tags: EpisodeTypes
- Request body: UpdateEpisodeTypePlanQualifiersRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /episode-types/search
- Tags: EpisodeTypes
- Request body: SearchValidEpisodeTypesRequest
- Response 200: string(uuid)[]
- Response 400: ProblemDetails

### PUT /episode-types/status
- Tags: EpisodeTypes
- Request body: UpdateEpisodeTypeStatusRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /episode-types/termination-criteria
- Tags: EpisodeTypes
- Request body: UpdateEpisodeTypeTerminationCriteriaRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /episodes
- Tags: Episodes
- Request body: CreateEpisodeRequest
- Response 200: CreateEpisodeResponse
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### GET /episodes/{patientId}/{currentDate}/active
- Tags: Episodes
- Path params: patientId: string(uuid), required; currentDate: string, required
- Response 200: PatientActiveEpisodeSummary
- Response 400: ProblemDetails

### GET /episodes/{patientId}/{episodeId}/{currentDate}
- Tags: Episodes
- Path params: patientId: string(uuid), required; episodeId: string(uuid), required; currentDate: string, required
- Response 200: EpisodeResponse
- Response 404: ProblemDetails

### GET /episodes/{patientId}/{episodeTypeId}/{currentDate}/active/count
- Tags: Episodes
- Path params: patientId: string(uuid), required; episodeTypeId: string(uuid), required; currentDate: string, required
- Response 200: ['integer', 'string'](int32)
- Response 400: ProblemDetails

### PUT /episodes/dates
- Tags: Episodes
- Request body: UpdateEpisodeDatesRequest
- Response 200: EditEpisodeResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /episodes/details
- Tags: Episodes
- Request body: UpdateEpisodeDetailsRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /episodes/diagnosis-codes
- Tags: Episodes
- Request body: UpdateEpisodeDiagnosisCodesRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /episodes/phases
- Tags: Episodes
- Request body: UpdateEpisodePhasesRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /episodes/phases/remittance-update
- Tags: Episodes
- Request body: ProcessRemittancePhaseChangeRequest
- Response 200: ProcessRemittancePhaseChangeResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /episodes/restore
- Tags: Episodes
- Request body: RestoreEpisodeRequest
- Response 200: EditEpisodeResponse
- Response 409: ProblemDetails
- Response 404: ProblemDetails

### POST /episodes/search
- Tags: Episodes
- Request body: SearchEpisodesRequest
- Response 200: EpisodeSearchResponse[]
- Response 400: ProblemDetails

### POST /episodes/terminate
- Tags: Episodes
- Request body: TerminateEpisodeRequest
- Response 200: EditEpisodeResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /episodes/validate
- Tags: Episodes
- Request body: ValidateEpisodeRequest
- Response 200: ValidateEpisodeResponse
- Response 400: ProblemDetails

### POST /signalr/episode-types/{episodeTypeId}/users/add
- Tags: Signalr
- Path params: episodeTypeId: string(uuid), required
- Response 200: (no body)

### POST /signalr/episode-types/{episodeTypeId}/users/remove
- Tags: Signalr
- Path params: episodeTypeId: string(uuid), required
- Response 200: (no body)

### POST /signalr/episodes-hub/negotiate
- Tags: Signalr
- Query params: user: string
- Response 200: (no body)

## Schemas

**AttributeQualifier**
  - elementQualifier: object (required)
  - setQualifier: object (required)
  - exclusionary: boolean (required)

**AttributeQualifierView**
  - elementQualifier: object (required)
  - setQualifier: object (required)
  - exclusionary: boolean (required)

**CreateEpisodeRequest**
  - patientId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - startDate: Date (required)
  - endDate: object
  - providerId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - diagnosisCodes: IcdCodeIdentity[] (required)
  - createdDate: string(date-time) (required)
  - phases: EpisodePhase[]

**CreateEpisodeResponse**
  - episodeId: string(uuid) (required)
  - episodeStatus: string (required)

**CreateEpisodeTypeRequest**
  - name: string (required)
  - createdDate: string(date-time) (required)

**CreateEpisodeTypeResponse**
  - episodeTypeId: string(uuid) (required)

**Date**
  - (no properties)

**DiagnosisCodeHeader**
  - icdCodeIdentity: IcdCodeIdentity (required)
  - shortDescription: ['null', 'string'] (required)

**DuplicateNameSearchRequest**
  - name: string (required)
  - episodeTypeId: ['null', 'string'](uuid)

**DuplicateNameSearchResponse**
  - nameAlreadyExists: boolean (required)

**EditEpisodeResponse**
  - episodeId: string(uuid) (required)
  - episodeStatus: string (required)

**ElementQualifier**
  - elementId: string(uuid) (required)

**ElementQualifierView**
  - elementId: string(uuid) (required)
  - elementName: ['null', 'string'] (required)

**EpisodeHeaderResponse**
  - episodeId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - episodeTypeName: ['null', 'string'] (required)
  - startDate: Date (required)
  - endDate: object (required)
  - terminationReason: TerminationReason (required)
  - episodeStatus: string (required)
  - phases: EpisodePhaseView[] (required)
  - scheduledTerminationReason: TerminationReason (required)
  - scheduledTerminationDate: object (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)

**EpisodePhase**
  - phaseId: string(uuid) (required)
  - startDate: object (required)

**EpisodePhaseView**
  - phaseId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - description: string (required)
  - startDate: object (required)
  - isActive: boolean (required)

**EpisodeResponse**
  - episodeId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - episodeTypeName: ['null', 'string'] (required)
  - startDate: Date (required)
  - endDate: object (required)
  - diagnosisCodes: DiagnosisCodeHeader[] (required)
  - phases: EpisodePhaseView[] (required)
  - providerId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - terminationReason: TerminationReason (required)
  - episodeStatus: string (required)
  - scheduledTerminationReason: TerminationReason
  - scheduledTerminationDate: object (required)

**EpisodeSearchResponse**
  - episodeId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - episodeTypeName: ['null', 'string'] (required)
  - startDate: Date (required)
  - endDate: object (required)
  - providerId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - terminationReason: TerminationReason (required)
  - episodeStatus: string (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)

**EpisodeTypeGridItemResponse**
  - episodeTypeId: string(uuid) (required)
  - isSystemType: boolean (required)
  - name: string (required)
  - plans: string[] (required)
  - phases: EpisodeTypePhase[] (required)
  - status: EpisodeTypeStatus (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)
  - modifiedDate: ['null', 'string'](date-time) (required)
  - modifiedByUserId: ['null', 'string'](uuid) (required)

**EpisodeTypeHeaderResponse**
  - episodeTypeId: string(uuid) (required)
  - isSystemType: boolean (required)
  - name: string (required)
  - planQualifiers: AttributeQualifierView[] (required)
  - phases: EpisodeTypePhase[] (required)
  - status: EpisodeTypeStatus (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)

**EpisodeTypePhase**
  - phaseId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - description: string (required)

**EpisodeTypeResponse**
  - episodeTypeId: string(uuid) (required)
  - isSystemType: boolean (required)
  - name: string (required)
  - status: EpisodeTypeStatus (required)
  - plans: PlanQualifierHeader[] (required)
  - planQualifiers: AttributeQualifierView[] (required)
  - phases: EpisodeTypePhase[] (required)
  - terminationCriteria: TerminationReason (required)
  - createdDate: string(date-time) (required)
  - createdByUserId: ['null', 'string'](uuid) (required)
  - modifiedDate: ['null', 'string'](date-time) (required)
  - modifiedByUserId: ['null', 'string'](uuid) (required)

**EpisodeTypeStatus**
  - (no properties)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**IFormFile**
  - (no properties)

**PatientActiveEpisodeSummary**
  - activeEpisodes: EpisodeHeaderResponse[] (required)
  - hasOnlyInactiveEpisodes: boolean (required)

**PlanQualifierHeader**
  - payerNames: string[] (required)
  - qualifierName: ['null', 'string'] (required)
  - exclusionary: boolean (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ProcessRemittancePhaseChangeRequest**
  - patientId: string(uuid) (required)
  - episodeId: string(uuid) (required)
  - phaseId: string(uuid) (required)
  - phaseStartDate: Date (required)
  - remittanceId: ['null', 'string'](uuid)
  - claimPaymentId: ['null', 'string'](uuid)

**ProcessRemittancePhaseChangeResponse**
  - updateSuccessful: boolean (required)

**RestoreEpisodeRequest**
  - currentDate: Date (required)
  - episodeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)

**RomDiagnosisCrosswalk**
  - icdCode: IcdCodeIdentity (required)
  - mCode: ['null', 'string'] (required)
  - split: ['null', 'string'] (required)
  - disease: ['null', 'string'] (required)
  - rate: ['number', 'string'](double) (required)

**ScheduledTerminationRequest**
  - scheduledTerminationReason: TerminationReason
  - scheduledTerminationDate: Date

**SearchEpisodesRequest**
  - patientId: string(uuid) (required)
  - currentDate: Date (required)
  - fromDate: object
  - toDate: object

**SearchValidEpisodeTypesRequest**
  - patientId: string(uuid) (required)
  - startDate: Date (required)

**SetQualifier**
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)

**SetQualifierView**
  - setId: string(uuid) (required)
  - setName: ['null', 'string'] (required)
  - isFactorySet: boolean (required)

**TerminateEpisodeRequest**
  - currentDate: Date (required)
  - episodeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - terminationReason: TerminationReason (required)

**TerminationReason**
  - (no properties)

**UpdateEpisodeDatesRequest**
  - currentDate: Date (required)
  - episodeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - startDate: Date (required)
  - endDate: object
  - scheduledTerminationRequest: object

**UpdateEpisodeDetailsRequest**
  - episodeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - providerId: string(uuid) (required)
  - locationId: string(uuid) (required)

**UpdateEpisodeDiagnosisCodesRequest**
  - episodeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - diagnosisCodes: IcdCodeIdentity[] (required)

**UpdateEpisodePhasesRequest**
  - currentDate: Date (required)
  - episodeId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - phases: EpisodePhase[]
  - scheduledTerminationRequest: object

**UpdateEpisodeTypeNameRequest**
  - episodeTypeId: string(uuid) (required)
  - name: string (required)

**UpdateEpisodeTypePhasesRequest**
  - episodeTypeId: string(uuid) (required)
  - phases: EpisodeTypePhase[]

**UpdateEpisodeTypePlanQualifiersRequest**
  - episodeTypeId: string(uuid) (required)
  - planQualifiers: AttributeQualifier[]

**UpdateEpisodeTypeStatusRequest**
  - episodeTypeId: string(uuid) (required)
  - status: EpisodeTypeStatus (required)

**UpdateEpisodeTypeTerminationCriteriaRequest**
  - episodeTypeId: string(uuid) (required)
  - terminationCriteria: TerminationReason

**ValidateEpisodeRequest**
  - episodeId: ['null', 'string'](uuid)
  - patientId: string(uuid) (required)
  - episodeTypeId: string(uuid) (required)
  - startDate: Date (required)
  - endDate: Date

**ValidateEpisodeResponse**
  - isEpisodeTypeValid: ['null', 'boolean'] (required)
  - isDateRangeValid: boolean (required)
  - isProjectionValid: boolean (required)

