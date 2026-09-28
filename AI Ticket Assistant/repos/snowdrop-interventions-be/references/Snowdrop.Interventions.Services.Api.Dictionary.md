﻿# Snowdrop.Interventions.Services.Api - API Dictionary

Repo: snowdrop-interventions-be
Source: Snowdrop.Interventions.Services.Api.json

## Endpoints

### POST /interventions
- Tags: InterventionsWrite
- Request body: CreateInterventionRequest
- Response 400: ProblemDetails

### GET /interventions/{interventionId}
- Tags: InterventionsRead
- Path params: interventionId: string(uuid), required
- Response 404: ProblemDetails

### DELETE /interventions/{interventionId}
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Response 200: (no body)

### POST /interventions/{interventionId}/additional-attributes/replace-all
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: SetInterventionAdditionalAttributesRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/additional-attributes/set-single
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: SetInterventionAdditionalAttributeRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /interventions/{interventionId}/aggregate
- Tags: InterventionsRead
- Path params: interventionId: string(uuid), required
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/alerts/on-resolution/add
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: AddAlertOnResolutionRequest
- Response 200: (no body)

### POST /interventions/{interventionId}/alerts/on-resolution/replace
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: SetAlertOnResolutionRequest
- Response 200: (no body)

### POST /interventions/{interventionId}/assign
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: AssignInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /interventions/{interventionId}/attachment/{attachmentId}
- Tags: AttachmentsRead
- Path params: interventionId: string(uuid), required; attachmentId: string(uuid), required
- Response 200: (no body)

### DELETE /interventions/{interventionId}/attachment/{attachmentId}
- Tags: AttachmentsWrite
- Path params: interventionId: string(uuid), required; attachmentId: string(uuid), required
- Response 404: ProblemDetails

### GET /interventions/{interventionId}/attachment/{attachmentId}/download
- Tags: AttachmentsRead
- Path params: interventionId: string(uuid), required; attachmentId: string(uuid), required
- Response 404: ProblemDetails

### GET /interventions/{interventionId}/attachments
- Tags: AttachmentsRead
- Path params: interventionId: string(uuid), required
- Response 200: Attachment[]

### POST /interventions/{interventionId}/clear-snooze
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/comment
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: AddInterventionCommentRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/description
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: UpdateInterventionDescriptionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/entity
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: SetInterventionEntityRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/escalate
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: EscalateInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/internal-attributes/replace-all
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: SetInterventionInternalAttributesRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/internal-attributes/set-single
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: SetInterventionInternalAttributeRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/mentions/{mentionId}/mark-read
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required; mentionId: string(uuid), required
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /interventions/{interventionId}/metadata/{attachmentId}
- Tags: AttachmentsWrite
- Path params: interventionId: string(uuid), required; attachmentId: string(uuid), required
- Request body: InterventionAttachmentMetadataRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /interventions/{interventionId}/order
- Tags: AttachmentsWrite
- Path params: interventionId: string(uuid), required
- Request body: InterventionAttachmentOrderingRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/progress
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: ProgressInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/reference-date
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: UpdateInterventionReferenceDateRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/reopen
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: ReopenInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/resolve
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: ResolveInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/snooze
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: SnoozeInterventionRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/stream
- Tags: AttachmentsWrite
- Path params: interventionId: string(uuid), required
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/stream/{attachmentId}
- Tags: AttachmentsWrite
- Path params: interventionId: string(uuid), required; attachmentId: string(uuid), required
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /interventions/{interventionId}/stream/{attachmentId}/{index}
- Tags: AttachmentsWrite
- Path params: interventionId: string(uuid), required; attachmentId: string(uuid), required; index: ['integer', 'string'](int32), required
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### DELETE /interventions/{interventionId}/tags/{tagId}
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required; tagId: string(uuid), required
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/tags/disable
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: DisableTagsRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/{interventionId}/user-guidance
- Tags: InterventionsWrite
- Path params: interventionId: string(uuid), required
- Request body: UpdateInterventionUserGuidanceRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /interventions/bulk/create
- Tags: AttachmentsWrite
- Request body: CreateInterventionWithExistingAttachmentBulkRequest
- Response 400: ProblemDetails

### POST /interventions/bulk/create/existing
- Tags: AttachmentsWrite
- Request body: CreateInterventionWithExistingAttachmentsBulkRequest
- Response 400: ProblemDetails

### GET /interventions/entities/{entityType}/{entityId}
- Tags: InterventionsRead
- Path params: entityType: string, required; entityId: string, required
- Query params: maxCount: ['integer', 'string'](int32); continuationToken: string
- Response 200: EntityInterventionsResponse

### POST /interventions/multipleattachments
- Tags: AttachmentsWrite
- Response 400: ProblemDetails

### POST /interventions/search
- Tags: InterventionsRead
- Request body: SearchRequest
- Response 400: ProblemDetails

### GET /interventions/search/unique-key
- Tags: InterventionsRead
- Query params: uniqueKey: string
- Response 200: UniqueKeySearchResponse

### POST /interventions/services/end-expired-snoozes
- Tags: InterventionsWrite
- Response 200: (no body)

### POST /interventions/singleattachment
- Tags: AttachmentsWrite
- Response 400: ProblemDetails

### GET /interventions/unread-mentions
- Tags: InterventionsRead
- Query params: maxCount: ['integer', 'string'](int32); continuationToken: string
- Response 200: UserUnreadMentionsResponse

### GET /interventions/utilities/identities/{organizationId}/{interventionId}/assign
- Tags: Utility
- Path params: organizationId: string(uuid), required; interventionId: string(uuid), required
- Response 200: (no body)

### GET /interventions/utilities/related-entities/{organizationId}/{interventionId}/assign
- Tags: Utility
- Path params: organizationId: string(uuid), required; interventionId: string(uuid), required
- Response 200: (no body)

## Schemas

**AddAlertOnResolutionRequest**
  - alertOnResolution: string(uuid)[]

**AddInterventionCommentRequest**
  - comment: TaggableInputRequest (required)

**AdditionalValue**
  - key: string (required)
  - value: string (required)
  - createdByUserId: string(uuid) (required)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**AssignInterventionRequest**
  - assignedToUserId: ['null', 'string'](uuid) (required)
  - comment: object

**Assignment**
  - assignmentId: string(uuid)
  - assignedToUserId: ['null', 'string'](uuid)
  - comment: TaggableInput (required)
  - timeStamp: string(date-time)

**Attachment**
  - attachmentId: string(uuid) (required)
  - metadata: AttachmentMetadata (required)
  - blobNames: string[] (required)
  - acquisitionUserId: string(uuid) (required)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**AttachmentInfoRequest**
  - fileName: string (required)
  - blobName: string (required)

**AttachmentMetadata**
  - fileNames: string[] (required)
  - documentType: string(uuid) (required)

**BulkAttachmentRequest**
  - attachmentId: string(uuid) (required)
  - documentType: string(uuid) (required)
  - attachmentInfos: AttachmentInfoRequest[] (required)

**BulkExistingAttachment**
  - attachmentId: string(uuid) (required)
  - documentType: string(uuid) (required)
  - fileNames: string[] (required)

**CatalogCriteriaPayload**
  - elementId: string(uuid)
  - exclusionary: boolean

**CommentRecord**
  - commentId: string(uuid) (required)
  - comment: TaggableInput (required)
  - createdByUserId: string(uuid) (required)
  - isDeleted: boolean
  - timeStamp: string(date-time)

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

**CreateInterventionWithExistingAttachmentBulkRequest**
  - attachmentRequest: BulkAttachmentRequest (required)
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

**CreateInterventionWithExistingAttachmentsBulkRequest**
  - interventionId: string(uuid) (required)
  - attachmentRequests: BulkExistingAttachment[] (required)
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

**DisableTagsRequest**
  - tagIds: string(uuid)[]

**EntityIdentity**
  - type: string
  - id: string

**EntityInterventionsResponse**
  - resultCount: ['integer', 'string'](int32) (required)
  - continuationToken: string (required)
  - results: InterventionProjection[] (required)

**EscalateInterventionRequest**
  - priority: InterventionPriority (required)
  - comment: object

**Escalation**
  - escalationId: string(uuid)
  - comment: TaggableInput (required)
  - escalatedByUserId: string(uuid) (required)
  - timeStamp: string(date-time)

**InterventionAttachmentMetadataRequest**
  - fileName: string (required)
  - documentType: string(uuid) (required)

**InterventionAttachmentOrderingRequest**
  - interventionAttachmentsOrder: string(uuid)[]

**InterventionPriority**
  - (no properties)

**InterventionProjection**
  - associatedEntityTypes: string[]
  - associatedEntityTypeIds: string[]
  - mentionedUserIds: string(uuid)[]
  - unreadMentionedUserIds: string(uuid)[]
  - tagIds: string(uuid)[]
  - interventionId: string(uuid)
  - interventionIdentity: ['integer', 'string'](int64)
  - entityIdentity: EntityIdentity
  - status: InterventionStatus
  - progressionStatusId: ['null', 'string'](uuid)
  - interventionTypeId: string(uuid)
  - priority: InterventionPriority
  - description: TaggableInput
  - userGuidance: TaggableInput
  - assignedToUserId: ['null', 'string'](uuid)
  - referenceDate: Date
  - referenceDateType: ['null', 'string']
  - snooze: object
  - alertOnResolution: ['null', 'array']
  - relatedEntities: OrderableCollectionOfstringAndRelatedEntity
  - assignments: OrderableCollectionOfGuidAndAssignment
  - escalations: OrderableCollectionOfGuidAndEscalation
  - progressions: OrderableCollectionOfGuidAndProgression
  - snoozes: OrderableCollectionOfGuidAndSnooze
  - resolutions: OrderableCollectionOfGuidAndResolution
  - reopenings: OrderableCollectionOfGuidAndReopening
  - additionalAttributes: OrderableCollectionOfstringAndAdditionalValue
  - internalAttributes: OrderableCollectionOfstringAndAdditionalValue
  - comments: OrderableCollectionOfGuidAndCommentRecord
  - attachments: OrderableCollectionOfGuidAndAttachment
  - mentions: OrderableCollectionOfGuidAndMentionReadable
  - tags: OrderableCollectionOfGuidAndTagDisableable
  - uniqueKey: ['null', 'string']
  - createdByRuleName: ['null', 'string']
  - updatedByUserId: string(uuid)
  - updatedTimeStamp: string(date-time)
  - createdByUserId: string(uuid)
  - createdTimeStamp: string(date-time)

**InterventionStatus**
  - (no properties)

**Mention**
  - mentionId: string(uuid) (required)
  - userId: string(uuid) (required)

**MentionReadable**
  - mentionId: string(uuid) (required)
  - userId: string(uuid) (required)
  - source: MentionSource (required)
  - sourceId: ['null', 'string'](uuid)
  - isRead: boolean
  - readTimeStamp: ['null', 'string'](date-time)
  - timeStamp: string(date-time) (required)
  - isDeleted: boolean

**MentionRequest**
  - userId: string(uuid)
  - mentionId: ['null', 'string'](uuid)

**MentionSource**
  - (no properties)

**OrderableCollectionOfGuidAndAssignment**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndAttachment**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndCommentRecord**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndEscalation**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndMentionReadable**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndProgression**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndReopening**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndResolution**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndSnooze**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndTagDisableable**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfstringAndAdditionalValue**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfstringAndRelatedEntity**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

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

**Progression**
  - progressionId: string(uuid)
  - progressionStatusId: string(uuid) (required)
  - comment: object
  - progressedByUserId: string(uuid) (required)
  - timeStamp: string(date-time)

**RelatedEntity**
  - entityId: string (required)
  - entityType: string (required)
  - createdByUserId: string(uuid) (required)
  - timeStamp: string(date-time)

**Reopening**
  - progressionStatusId: string(uuid)
  - reopeningId: string(uuid)
  - comment: TaggableInput (required)
  - reopenedByUserId: string(uuid) (required)
  - timeStamp: string(date-time)

**ReopenInterventionRequest**
  - progressionStatusId: string(uuid) (required)
  - comment: object

**Resolution**
  - resolutionId: string(uuid)
  - resolutionTypeId: string(uuid) (required)
  - comment: TaggableInput (required)
  - resolvedByUserId: string(uuid) (required)
  - timeStamp: string(date-time)

**ResolveInterventionRequest**
  - comment: object
  - resolutionTypeId: string(uuid) (required)

**SearchRequest**
  - maxCount: ['integer', 'string'](int32)
  - continuationToken: ['null', 'string']
  - interventionTypes: ['null', 'array']
  - progressionStatuses: ['null', 'array']
  - priorities: ['null', 'array']
  - associatedEntityTypes: ['null', 'array']
  - associatedEntities: ['null', 'array']
  - assignedToUserIds: ['null', 'array']
  - entityType: ['null', 'string']
  - excludeSnoozed: boolean
  - showResolved: boolean
  - currentDate: ['null', 'string'](date-time)
  - mentionedUserIds: ['null', 'array']
  - tags: ['null', 'array']

**SetAlertOnResolutionRequest**
  - alertOnResolution: string(uuid)[]

**SetInterventionAdditionalAttributeRequest**
  - key: string (required)
  - value: string (required)

**SetInterventionAdditionalAttributesRequest**
  - additionalAttributes: object

**SetInterventionEntityRequest**
  - entityIdentity: EntityIdentity (required)

**SetInterventionInternalAttributeRequest**
  - key: string (required)
  - value: string (required)

**SetInterventionInternalAttributesRequest**
  - internalAttributes: object

**Snooze**
  - snoozeId: string(uuid)
  - snoozeUntilDate: Date (required)
  - snoozeReasonId: string(uuid) (required)
  - comment: TaggableInput (required)
  - snoozedByUserId: string(uuid) (required)
  - snoozedByProgressionId: ['null', 'string'](uuid)
  - timeStamp: string(date-time)

**SnoozeInterventionRequest**
  - snoozeUntilDate: Date (required)
  - snoozeReasonId: string(uuid) (required)
  - comment: TaggableInputRequest (required)

**Tag**
  - tagId: string(uuid) (required)

**TagDisableable**
  - tagId: string(uuid) (required)
  - isDisabled: boolean
  - disabledTimestamp: ['null', 'string'](date-time)
  - timeStamp: string(date-time)
  - isDeleted: boolean

**TaggableInput**
  - text: ['null', 'string']
  - mentions: Mention[]
  - tags: Tag[]
  - nodeTree: ['null', 'string']

**TaggableInputRequest**
  - text: ['null', 'string']
  - mentions: ['null', 'array']
  - tags: ['null', 'array']
  - nodeTree: ['null', 'string']

**UniqueKeySearchResponse**
  - uniqueKey: string (required)
  - interventionId: ['null', 'string'](uuid) (required)
  - found: boolean (required)

**UpdateInterventionDescriptionRequest**
  - description: object

**UpdateInterventionReferenceDateRequest**
  - referenceDate: Date (required)
  - referenceDateType: ['null', 'string']

**UpdateInterventionUserGuidanceRequest**
  - userGuidance: object

**UserUnreadMentionsResponse**
  - resultCount: ['integer', 'string'](int32) (required)
  - continuationToken: string (required)
  - results: InterventionProjection[] (required)

