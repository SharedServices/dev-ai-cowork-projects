﻿# Snowdrop.Interventions.Services.UnlimitedApi - API Dictionary

Repo: snowdrop-interventions-be
Source: Snowdrop.Interventions.Services.UnlimitedApi.json

## Endpoints

### POST /interventions-unlimitedapi
- Tags: InterventionsWrite
- Request body: CreateInterventionRequest
- Response 400: ProblemDetails
- Response 409: ProblemDetails
- Response 429: object

### POST /interventions-unlimitedapi/{interventionId}/comment
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: AddInterventionCommentRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 429: object

### POST /interventions-unlimitedapi/{interventionId}/description
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: UpdateInterventionDescriptionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 429: object

### POST /interventions-unlimitedapi/{interventionId}/escalate
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: EscalateInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 429: object

### POST /interventions-unlimitedapi/{interventionId}/progress
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: ProgressInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 429: object

### POST /interventions-unlimitedapi/{interventionId}/reference-date
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: UpdateInterventionReferenceDateRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 429: object

### POST /interventions-unlimitedapi/{interventionId}/resolve
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: ResolveInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 429: object

## Schemas

**AddInterventionCommentRequest**
  - comment: TaggableInputRequest (required)

**CreateInterventionRequest**
  - interventionId: ['null', 'string'](uuid)
  - entityIdentity: EntityIdentity
  - description: object
  - userGuidance: object
  - interventionTypeId: string(uuid) (required)
  - priority: InterventionPriority (required)
  - assignedToUserId: ['null', 'string'](uuid) (required)
  - progressionStatusId: ['null', 'string'](uuid)
  - referenceDate: Date
  - referenceDateType: ['null', 'string']
  - snooze: object
  - uniqueKey: ['null', 'string']
  - alertOnResolution: ['null', 'array']
  - relatedEntities: ['null', 'array']
  - additionalAttributes: object
  - internalAttributes: object

**Date**
  - (no properties)

**EntityIdentity**
  - type: string
  - id: string

**EscalateInterventionRequest**
  - priority: InterventionPriority (required)
  - comment: object

**InterventionPriority**
  - (no properties)

**MentionRequest**
  - userId: string(uuid)
  - mentionId: ['null', 'string'](uuid)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ProgressInterventionRequest**
  - progressionStatusId: string(uuid) (required)
  - snoozeUntilDate: object
  - snoozeReasonId: ['null', 'string'](uuid)
  - comment: object
  - withoutSnoozeClear: boolean

**ResolveInterventionRequest**
  - comment: object
  - resolutionTypeId: string(uuid) (required)

**SnoozeInterventionRequest**
  - snoozeUntilDate: Date (required)
  - snoozeReasonId: string(uuid) (required)
  - comment: TaggableInputRequest (required)

**TaggableInputRequest**
  - text: ['null', 'string']
  - mentions: ['null', 'array']
  - tags: ['null', 'array']
  - nodeTree: ['null', 'string']

**UpdateInterventionDescriptionRequest**
  - description: object

**UpdateInterventionReferenceDateRequest**
  - referenceDate: Date (required)
  - referenceDateType: ['null', 'string']

