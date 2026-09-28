﻿# Snowdrop.Scheduling.Api - API Dictionary

Repo: snowdrop-scheduling-be
Source: Snowdrop.Scheduling.Api.json

## Endpoints

### GET /appointment-validation-rules
- Tags: AppointmentValidationRule
- Response 200: RuleSummary[]

### POST /appointment-validation-rules
- Tags: AppointmentValidationRule
- Request body: CreateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /appointment-validation-rules/{ruleId}
- Tags: AppointmentValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: RuleDetail
- Response 404: ProblemDetails

### PUT /appointment-validation-rules/{ruleId}/delete
- Tags: AppointmentValidationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /appointment-validation-rules/{ruleId}/update
- Tags: AppointmentValidationRule
- Path params: ruleId: string(uuid), required
- Request body: UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /appointment-validation-rules/behaviors
- Tags: AppointmentValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /appointment-validation-rules/behaviors/manualreview/releaseactions
- Tags: AppointmentValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /appointment-validation-rules/names/isunique
- Tags: AppointmentValidationRule
- Query params: name: string
- Response 200: boolean

### GET /appointment-validation-rules/qualifiers
- Tags: AppointmentValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /appointment-validation-rules/ruleactions
- Tags: AppointmentValidationRule
- Response 200: KeyValuePairOfintAndstring[]

### GET /patients/{patientId}
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PatientInformation
- Response 404: ProblemDetails

### GET /patients/{patientId}/schedule
- Tags: Patients
- Path params: patientId: string(uuid), required
- Response 200: PatientSchedule
- Response 404: ProblemDetails

### GET /patients/{patientId}/schedule/{dateOfService}
- Tags: Patients
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Response 200: PatientSchedule
- Response 404: ProblemDetails

### GET /patients/{patientId}/schedule/{dateOfService}/nextappointment
- Tags: Patients
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Response 200: PatientSchedule
- Response 404: ProblemDetails

### GET /resource/{resourceId}
- Tags: Resources
- Path params: resourceId: string(uuid), required
- Response 200: ResourceScheduleHeader

### GET /resource/{resourceId}/locations/{locationId}/dates/{dateOfService}
- Tags: Resources
- Path params: resourceId: string(uuid), required; locationId: string(uuid), required; dateOfService: string, required
- Response 200: ResourceScheduleResponse
- Response 404: ProblemDetails

### PUT /resource/{resourceId}/locations/{locationId}/dates/{dateOfService}
- Tags: Resources
- Path params: resourceId: string(uuid), required; locationId: string(uuid), required; dateOfService: string, required
- Request body: SetResourceScheduleRequest
- Response 200: ResourceScheduleResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /resource/{resourceId}/locations/{locationId}/resources
- Tags: Resources
- Path params: resourceId: string(uuid), required; locationId: string(uuid), required
- Request body: SetResourceSchedulesRequest
- Response 200: ResourceScheduleResponse

### POST /resource/{resourceId}/schedules
- Tags: Resources
- Path params: resourceId: string(uuid), required
- Request body: GetResourceSchedulesRequest
- Response 200: ResourceScheduleResponse[]

### GET /resource/locations/{locationId}
- Tags: Resources
- Path params: locationId: string(uuid), required
- Response 200: ScheduleResource[]
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /resource/locations/{locationId}/dates/{dateOfService}
- Tags: Resources
- Path params: locationId: string(uuid), required; dateOfService: string(date-time), required
- Response 200: ResourceScheduleResponse[]

### GET /schedule/locations/{locationId}/dates/{dateOfService}
- Tags: Schedule
- Path params: locationId: string(uuid), required; dateOfService: string, required
- Response 200: ScheduleHeader
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /schedule/locations/{locationId}/dates/{dateOfService}
- Tags: Schedule
- Path params: locationId: string(uuid), required; dateOfService: string, required
- Request body: GetScheduleRequest
- Response 200: ScheduleHeader
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /schedule/locations/{locationId}/dates/{dateOfService}/appointments
- Tags: Schedule
- Path params: locationId: string(uuid), required; dateOfService: string, required
- Request body: AddAppointmentRequest
- Response 200: AppointmentResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /schedule/locations/{locationId}/dates/{dateOfService}/appointments/{appointmentId}
- Tags: Schedule
- Path params: locationId: string(uuid), required; dateOfService: string, required; appointmentId: string(uuid), required
- Response 200: AppointmentResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /schedule/locations/{locationId}/dates/{dateOfService}/appointments/{appointmentId}
- Tags: Schedule
- Path params: locationId: string(uuid), required; dateOfService: string, required; appointmentId: string(uuid), required
- Request body: UpdateAppointmentRequest
- Response 200: AppointmentResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /schedule/locations/{locationId}/dates/{dateOfService}/appointments/{appointmentId}/cancel
- Tags: Schedule
- Path params: locationId: string(uuid), required; dateOfService: string, required; appointmentId: string(uuid), required
- Request body: CancelAppointmentRequest
- Response 200: AppointmentResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /schedule/locations/{locationId}/dates/{dateOfService}/appointments/validate
- Tags: Schedule
- Path params: locationId: string(uuid), required; dateOfService: string, required
- Request body: ScheduleTemplateValidationRequest
- Response 200: ScheduleTemplateValidationResponse
- Response 400: ProblemDetails

### POST /schedule/locations/{locationId}/dates/{dateOfService}/appointments/validate-rules
- Tags: Schedule
- Path params: locationId: string(uuid), required; dateOfService: string, required
- Request body: ScheduleRuleValidationRequest
- Response 200: RuleValidationResponse
- Response 400: ProblemDetails

### GET /scheduling-validation-sequences
- Tags: AppointmentValidationSequence
- Response 200: SequenceHeader[]
- Response 404: ProblemDetails

### POST /scheduling-validation-sequences
- Tags: AppointmentValidationSequence
- Request body: CreateSequenceRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /scheduling-validation-sequences/{sequenceId}
- Tags: AppointmentValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: SequenceHeader
- Response 404: ProblemDetails

### PUT /scheduling-validation-sequences/{sequenceId}/archive
- Tags: AppointmentValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /scheduling-validation-sequences/{sequenceId}/download
- Tags: AppointmentValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /scheduling-validation-sequences/{sequenceId}/restore
- Tags: AppointmentValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /scheduling-validation-sequences/{sequenceId}/rules
- Tags: AppointmentValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: RuleSummary[]
- Response 404: ProblemDetails

### PUT /scheduling-validation-sequences/{sequenceId}/rules/reorder
- Tags: AppointmentValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: RuleOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### PUT /scheduling-validation-sequences/{sequenceId}/update
- Tags: AppointmentValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: UpdateSequenceRequest
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /scheduling-validation-sequences/behaviors
- Tags: AppointmentValidationSequence
- Response 200: KeyValuePairOfintAndstring[]

### GET /scheduling-validation-sequences/names/isunique
- Tags: AppointmentValidationSequence
- Query params: name: string
- Response 200: boolean

### PUT /scheduling-validation-sequences/reorder
- Tags: AppointmentValidationSequence
- Request body: SequenceOrder[]
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /signalr/schedule/location/{locationId}/users/add
- Tags: Signalr
- Path params: locationId: string(uuid), required
- Response 200: (no body)

### POST /signalr/schedule/location/{locationId}/users/remove
- Tags: Signalr
- Path params: locationId: string(uuid), required
- Response 200: (no body)

### POST /signalr/schedule/patient/{patientId}/users/add
- Tags: Signalr
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### POST /signalr/schedule/patient/{patientId}/users/remove
- Tags: Signalr
- Path params: patientId: string(uuid), required
- Response 200: (no body)

### POST /signalr/scheduling-hub/negotiate
- Tags: Signalr
- Response 200: (no body)

### GET /templates
- Tags: Templates
- Response 200: TemplateHeader[]
- Response 400: ProblemDetails

### GET /templates/{templateId}
- Tags: Templates
- Path params: templateId: string(uuid), required
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

## Schemas

**AddAppointmentRequest**
  - patientId: string(uuid) (required)
  - appointmentTypeId: string(uuid) (required)
  - resourceType: AppointmentResourceType (required)
  - resourceId: string(uuid) (required)
  - resourceTypeId: string(uuid) (required)
  - startTime: string(time) (required)
  - duration: string (required)
  - appointmentDescription: ['null', 'string'] (required)
  - correlationId: ['null', 'string'](uuid) (required)
  - templateId: ['null', 'string'](uuid) (required)
  - overbookReasonId: ['null', 'string'](uuid) (required)
  - treatmentPlanId: ['null', 'string'](uuid) (required)

**AppointmentBookingFailedReason**
  - (no properties)

**AppointmentHeader**
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - appointmentId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffixName: ['null', 'string'] (required)
  - birthDate: object (required)
  - appointmentTypeId: string(uuid) (required)
  - appointmentTypeName: string (required)
  - appointmentTypeColor: string (required)
  - resourceType: AppointmentResourceType (required)
  - resourceId: string(uuid) (required)
  - resourceTypeId: string(uuid) (required)
  - resourceName: ['null', 'string'] (required)
  - resourceColor: ['null', 'string'] (required)
  - startTime: string(time) (required)
  - duration: string (required)
  - overbooked: boolean (required)
  - assignedRegionId: ['null', 'string'](uuid) (required)
  - appointmentDescription: ['null', 'string'] (required)
  - overbookReasonId: ['null', 'string'](uuid) (required)
  - overbookReasonDisplay: ['null', 'string'] (required)
  - treatmentPlan: object (required)

**AppointmentRegionResponse**
  - appointmentRegionId: string(uuid) (required)
  - name: string (required)
  - color: string (required)
  - schedulingLane: ['integer', 'string'](int32) (required)
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - appointmentTypeId: string(uuid) (required)
  - isAppointmentTypeSet: boolean (required)
  - appointmentTypeElementIds: ['null', 'array'] (required)
  - userGuidanceNote: string (required)

**AppointmentResourceType**
  - (no properties)

**AppointmentResponse**
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - appointmentId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - fan: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffixName: ['null', 'string'] (required)
  - primaryPhone: ['null', 'string'] (required)
  - extension: ['null', 'string'] (required)
  - birthDate: object (required)
  - appointmentTypeId: string(uuid) (required)
  - appointmentTypeName: ['null', 'string'] (required)
  - appointmentTypeColor: ['null', 'string'] (required)
  - resourceType: AppointmentResourceType (required)
  - resourceId: string(uuid) (required)
  - resourceTypeId: string(uuid) (required)
  - resourceName: ['null', 'string'] (required)
  - resourceColor: ['null', 'string'] (required)
  - startTime: string(time) (required)
  - duration: string (required)
  - canceled: boolean (required)
  - cancellationReasonId: ['null', 'string'](uuid) (required)
  - overbooked: boolean (required)
  - assignedRegionId: ['null', 'string'](uuid) (required)
  - overbookReasonId: ['null', 'string'](uuid) (required)
  - overbookReasonDisplay: ['null', 'string'] (required)
  - appointmentDescription: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)
  - createdUser: ['null', 'string'](uuid) (required)
  - lastModifiedDate: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)
  - treatmentPlan: object (required)
  - modelError: ['null', 'string']

**AttributeQualifiers**
  - attributeType: AttributeType (required)
  - entityType: EntityType
  - nullQualifier: boolean
  - setQualifiers: ['null', 'array']
  - elementQualifiers: ['null', 'array']

**AttributeType**
  - (no properties)

**CancelAppointmentRequest**
  - cancellationReasonId: string(uuid) (required)
  - correlationId: ['null', 'string'](uuid) (required)
  - templateId: ['null', 'string'](uuid) (required)

**CreateRuleRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)
  - qualificationConfiguration: ['null', 'object'] (required)

**CreateSequenceRequest**
  - name: string (required)

**Date**
  - (no properties)

**ElementQualifier**
  - elementId: string (required)
  - exclusionary: boolean (required)

**EntityType**
  - (no properties)

**EpisodeQualifier**
  - allEpisodes: boolean (required)
  - episodeTypes: string(uuid)[] (required)
  - phases: string(uuid)[] (required)
  - exclusionary: boolean (required)

**GetResourceSchedulesRequest**
  - startDate: Date (required)
  - endDate: Date (required)

**GetScheduleRequest**
  - resourceTypeIds: ['null', 'array'] (required)
  - resourceIds: ['null', 'array'] (required)

**KeyValuePairOfintAndstring**
  - key: ['integer', 'string'](int32) (required)
  - value: ['null', 'string'] (required)

**NetType**
  - (no properties)

**PatientAppointment**
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - appointmentId: string(uuid) (required)
  - appointmentTypeId: string(uuid) (required)
  - appointmentTypeName: string (required)
  - appointmentTypeColor: string (required)
  - resourceType: AppointmentResourceType (required)
  - resourceId: string(uuid) (required)
  - resourceTypeId: string(uuid) (required)
  - resourceName: ['null', 'string'] (required)
  - resourceColor: ['null', 'string'] (required)
  - startTime: string(time) (required)
  - duration: string (required)
  - appointmentDescription: ['null', 'string'] (required)
  - treatmentPlanId: ['null', 'string'](uuid) (required)

**PatientInformation**
  - patientId: string(uuid) (required)
  - fan: string (required)
  - firstName: string (required)
  - middleName: string (required)
  - lastName: string (required)
  - suffixName: string (required)
  - birthDate: Date (required)
  - primaryPhone: string (required)
  - extension: string (required)

**PatientSchedule**
  - patientId: string(uuid) (required)
  - fan: string (required)
  - firstName: string (required)
  - middleName: string (required)
  - lastName: string (required)
  - suffixName: string (required)
  - birthDate: Date (required)
  - primaryPhone: string (required)
  - extension: string (required)
  - appointments: PatientAppointment[] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**QualifierHeader**
  - attributeType: AttributeType (required)
  - id: string (required)
  - isSet: boolean (required)
  - exclusionary: boolean (required)

**ReleaseType**
  - (no properties)

**ResourceScheduleHeader**
  - lastAppliedTemplateDate: object (required)

**ResourceScheduleResponse**
  - resourceId: string(uuid) (required)
  - resourceType: TemplateResourceType (required)
  - resourceTypeId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - templateId: string(uuid) (required)

**ResourceTemplateDate**
  - dateOfService: Date (required)
  - oldTemplateId: ['null', 'string'](uuid) (required)
  - templateId: ['null', 'string'](uuid) (required)

**RuleAction**
  - (no properties)

**RuleDetail**
  - sequenceId: string(uuid) (required)
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - behaviorConfiguration: ['null', 'object'] (required)
  - qualificationConfiguration: ['null', 'object'] (required)
  - reviewRequired: boolean
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - netType: NetType (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)

**RuleHeader**
  - ruleId: string(uuid) (required)
  - name: string (required)

**RuleOrder**
  - ruleId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)

**RuleSummary**
  - ruleId: string(uuid) (required)
  - sequenceId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: QualifierHeader[] (required)
  - sameDateOfServiceQualifiers: QualifierHeader[] (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)

**RuleValidationResponse**
  - validation: boolean (required)
  - errors: ['null', 'array'] (required)

**ScheduleHeader**
  - locationId: string(uuid) (required)
  - dateOfService: Date (required)
  - appointments: AppointmentHeader[] (required)

**ScheduleResource**
  - resourceType: AppointmentResourceType (required)
  - resourceTypeId: string(uuid) (required)
  - resourceTypeName: string (required)
  - resourceId: string(uuid) (required)
  - resourceName: string (required)
  - resourceInitials: string (required)
  - resourceColor: string (required)
  - effectiveDateBegin: object (required)
  - effectiveDateEnd: object (required)
  - notes: string (required)
  - hasSchedulingEntitlement: boolean (required)

**ScheduleRuleValidationRequest**
  - appointmentId: ['null', 'string'](uuid) (required)
  - patientId: string(uuid) (required)
  - appointmentTypeId: string(uuid) (required)
  - resourceType: AppointmentResourceType (required)
  - resourceTypeId: string(uuid) (required)
  - resourceId: string(uuid) (required)
  - startTime: string(time) (required)
  - duration: string (required)
  - treatmentPlanId: ['null', 'string'](uuid) (required)

**ScheduleTemplateValidationRequest**
  - appointmentId: ['null', 'string'](uuid) (required)
  - appointmentTypeId: string(uuid) (required)
  - resourceId: string(uuid) (required)
  - startTime: string(time) (required)
  - duration: string (required)
  - templateId: string(uuid) (required)

**ScheduleTemplateValidationResponse**
  - isValid: boolean (required)
  - reason: object (required)

**SequenceHeader**
  - sequenceId: string(uuid) (required)
  - order: ['integer', 'string'](int32) (required)
  - name: string (required)
  - rules: RuleHeader[]
  - sequenceStatus: SequenceStatus (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)

**SequenceOrder**
  - sequenceId: string(uuid) (required)
  - status: SequenceStatus (required)
  - order: ['integer', 'string'](int32) (required)

**SequenceStatus**
  - (no properties)

**SetQualifier**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**SetResourceScheduleRequest**
  - resourceType: TemplateResourceType (required)
  - resourceTypeId: string(uuid) (required)
  - oldTemplateId: ['null', 'string'](uuid) (required)
  - templateId: ['null', 'string'](uuid) (required)

**SetResourceSchedulesRequest**
  - resourceType: TemplateResourceType (required)
  - resourceTypeId: string(uuid) (required)
  - templateDates: ResourceTemplateDate[] (required)

**TemplateHeader**
  - isActive: boolean (required)
  - templateId: string(uuid) (required)
  - name: string (required)
  - description: string (required)
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - allowOverbook: ['null', 'boolean'] (required)
  - isOverbookReasonRequired: ['null', 'boolean'] (required)
  - hasPendingUpdates: ['null', 'boolean'] (required)
  - isUpdating: ['null', 'boolean'] (required)
  - lastPublishedDate: ['null', 'string'](date-time) (required)

**TemplateResourceType**
  - (no properties)

**TemplateResponse**
  - isActive: boolean (required)
  - templateId: string(uuid) (required)
  - name: string (required)
  - description: string (required)
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - lastPublishedDate: ['null', 'string'](date-time) (required)
  - allowOverbook: ['null', 'boolean'] (required)
  - isOverbookReasonRequired: ['null', 'boolean'] (required)
  - hasPendingUpdates: ['null', 'boolean'] (required)
  - isUpdating: ['null', 'boolean'] (required)
  - appointmentRegions: AppointmentRegionResponse[] (required)
  - timeBlocks: TimeBlockResponse[] (required)

**TimeBlockResponse**
  - timeBlockId: string(uuid) (required)
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - blockTypeId: string(uuid) (required)
  - blockTypeName: string (required)
  - userGuidanceNote: string (required)

**TreatmentPlan**
  - treatmentPlanId: string(uuid) (required)
  - treatmentPlanName: string (required)

**UpdateAppointmentRequest**
  - locationId: ['null', 'string'](uuid) (required)
  - dateOfService: object (required)
  - appointmentTypeId: string(uuid) (required)
  - resourceType: AppointmentResourceType (required)
  - resourceId: string(uuid) (required)
  - resourceTypeId: string(uuid) (required)
  - startTime: string(time) (required)
  - duration: string (required)
  - appointmentDescription: ['null', 'string'] (required)
  - correlationId: ['null', 'string'](uuid) (required)
  - oldTemplateId: ['null', 'string'](uuid) (required)
  - templateId: ['null', 'string'](uuid) (required)
  - overbookReasonId: ['null', 'string'](uuid) (required)
  - treatmentPlanId: ['null', 'string'](uuid) (required)

**UpdateRuleRequest**
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: ['integer', 'string'](int32) (required)
  - startDate: object (required)
  - endDate: object (required)
  - qualifiers: AttributeQualifiers[] (required)
  - sameDateOfServiceQualifiers: AttributeQualifiers[] (required)
  - episodeQualifier: object (required)
  - ruleAction: RuleAction (required)
  - releaseType: ReleaseType (required)
  - behaviorConfiguration: object (required)
  - qualificationConfiguration: ['null', 'object'] (required)

**UpdateSequenceRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - enabled: boolean (required)

**ValidationError**
  - error: string (required)
  - guidance: string (required)
  - blocking: boolean (required)
  - previous: boolean (required)
  - minimum: boolean (required)

