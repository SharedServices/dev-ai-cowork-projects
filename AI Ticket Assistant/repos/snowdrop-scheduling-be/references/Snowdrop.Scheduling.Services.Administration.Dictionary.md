﻿# Snowdrop.Scheduling.Services.Administration - API Dictionary

Repo: snowdrop-scheduling-be
Source: Snowdrop.Scheduling.Services.Administration.json

## Endpoints

### GET /templates
- Tags: Template
- Response 200: TemplateHeader[]
- Response 400: ProblemDetails

### POST /templates
- Tags: Template
- Request body: TemplateRequest
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /templates/{templateId}
- Tags: Template
- Path params: templateId: string(uuid), required
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /templates/{templateId}
- Tags: Template
- Path params: templateId: string(uuid), required
- Request body: TemplateRequest
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /templates/{templateId}/activate
- Tags: Template
- Path params: templateId: string(uuid), required
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /templates/{templateId}/appointment-regions
- Tags: Template
- Path params: templateId: string(uuid), required
- Request body: AddAppointmentRegionRequest
- Response 200: AppointmentRegionResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /templates/{templateId}/appointment-regions/{appointmentRegionId}
- Tags: Template
- Path params: templateId: string(uuid), required; appointmentRegionId: string(uuid), required
- Request body: UpdateAppointmentRegionRequest
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### DELETE /templates/{templateId}/appointment-regions/{appointmentRegionId}
- Tags: Template
- Path params: templateId: string(uuid), required; appointmentRegionId: string(uuid), required
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /templates/{templateId}/appointment-regions/validate
- Tags: Template
- Path params: templateId: string(uuid), required
- Request body: AppointmentRegionValidationRequest
- Response 200: boolean
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /templates/{templateId}/copy-from
- Tags: Template
- Path params: templateId: string(uuid), required
- Request body: CopyTemplateRequest
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /templates/{templateId}/deactivate
- Tags: Template
- Path params: templateId: string(uuid), required
- Response 200: TemplateResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /templates/{templateId}/publish
- Tags: Template
- Path params: templateId: string(uuid), required
- Request body: PublishTemplateRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /templates/{templateId}/time-blocks
- Tags: Template
- Path params: templateId: string(uuid), required
- Request body: AddTimeBlockRequest
- Response 200: TimeBlockResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /templates/{templateId}/time-blocks/{timeBlockId}
- Tags: Template
- Path params: templateId: string(uuid), required; timeBlockId: string(uuid), required
- Request body: UpdateTimeBlockRequest
- Response 200: TimeBlockResponse
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### DELETE /templates/{templateId}/time-blocks/{timeBlockId}
- Tags: Template
- Path params: templateId: string(uuid), required; timeBlockId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /templates/{templateId}/time-blocks/validate
- Tags: Template
- Path params: templateId: string(uuid), required
- Request body: TimeBlockValidationRequest
- Response 200: boolean
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /templates/duplicate-check
- Tags: Template
- Request body: DuplicateTemplateCheckRequest
- Response 200: boolean
- Response 404: ProblemDetails
- Response 400: ProblemDetails

## Schemas

**AddAppointmentRegionRequest**
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - appointmentTypeId: string(uuid) (required)
  - isAppointmentTypeSet: boolean (required)
  - color: string (required)
  - userGuidanceNote: string (required)

**AddTimeBlockRequest**
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - blockTypeId: string(uuid) (required)
  - userGuidanceNote: string (required)

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

**AppointmentRegionValidationRequest**
  - startTime: string(time) (required)
  - endTime: string(time) (required)

**CopyTemplateRequest**
  - name: string (required)
  - description: string (required)
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - allowOverbook: ['null', 'boolean'] (required)
  - isOverbookReasonRequired: ['null', 'boolean'] (required)

**DuplicateTemplateCheckRequest**
  - templateName: string (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**PublishTemplateRequest**
  - active: boolean (required)

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

**TemplateRequest**
  - name: string (required)
  - description: string (required)
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - allowOverbook: ['null', 'boolean'] (required)
  - isOverbookReasonRequired: ['null', 'boolean'] (required)

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

**TimeBlockValidationRequest**
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - timeBlockId: ['null', 'string'](uuid) (required)

**UpdateAppointmentRegionRequest**
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - appointmentTypeId: string(uuid) (required)
  - isAppointmentTypeSet: boolean (required)
  - color: ['null', 'string'] (required)
  - userGuidanceNote: string (required)

**UpdateTimeBlockRequest**
  - startTime: string(time) (required)
  - endTime: string(time) (required)
  - blockTypeId: string(uuid) (required)
  - userGuidanceNote: string (required)

