﻿# Snowdrop.Notes.v2.UnlimitedApi - API Dictionary

Repo: snowdrop-notes-v2-be
Source: Snowdrop.Notes.v2.UnlimitedApi.json

## Endpoints

### GET /entitytype/{entityType}/entity/{entityId}
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required
- Response 200: NoteResponse[]
- Response 429: object

### POST /entitytype/{entityType}/entity/{entityId}
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required
- Request body: CreateNoteRequest
- Response 200: NoteIdResponse
- Response 429: object

### GET /entitytype/{entityType}/entity/{entityId}/acknowledgement-required
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required
- Response 200: NoteResponse[]
- Response 429: object

### POST /entitytype/{entityType}/entity/{entityId}/bulk/create
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required
- Request body: CreateNoteRequest
- Response 200: NoteCreatedResponse
- Response 429: object

### GET /entitytype/{entityType}/entity/{entityId}/documents
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required
- Response 200: DocumentsResponse
- Response 429: object

### GET /entitytype/{entityType}/entity/{entityId}/documents/alerts
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required
- Response 200: DocumentAlertsResponse
- Response 429: object

### GET /entitytype/{entityType}/entity/{entityId}/note/{noteId}
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required; noteId: string(uuid), required
- Response 200: NoteResponse
- Response 429: object

### PUT /entitytype/{entityType}/entity/{entityId}/note/{noteId}
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required; noteId: string(uuid), required
- Request body: UpdateNoteRequest
- Response 200: NoteIdResponse
- Response 429: object

### DELETE /entitytype/{entityType}/entity/{entityId}/note/{noteId}
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required; noteId: string(uuid), required
- Response 200: (no body)
- Response 429: object

### POST /entitytype/{entityType}/entity/{entityId}/note/{noteId}/move
- Tags: Notes
- Path params: entityType: string, required; entityId: string, required; noteId: string(uuid), required
- Request body: MoveNoteRequest
- Response 200: (no body)
- Response 429: object

## Schemas

**CreateNoteRequest**
  - text: NoteText (required)
  - context: string (required)
  - effectiveness: NoteEffectiveness (required)
  - audience: NoteAudience (required)

**Date**
  - (no properties)

**DocumentAlertsResponse**
  - documentTypes: DocumentTypeAlertsCollection[] (required)

**DocumentsResponse**
  - documents: DocumentTypeResponse[] (required)

**DocumentTypeAlerts**
  - isMissingDocumentTypeAttentionNeeded: boolean
  - isArchivedDocumentTypeAttentionNeeded: boolean
  - isDocumentTypeAttentionNeeded: boolean

**DocumentTypeAlertsCollection**
  - documentTypeId: string(uuid) (required)
  - alerts: DocumentTypeAlerts (required)

**DocumentTypeResponse**
  - noteId: string(uuid) (required)
  - documentTypeId: string(uuid) (required)
  - latestAttachment: LatestAttachment (required)
  - documentTypeAlerts: DocumentTypeAlerts[] (required)
  - timeStamp: string(date-time) (required)

**LatestAttachment**
  - attachmentId: string(uuid) (required)
  - archivalDate: object (required)
  - acquisitionTimestamp: string(date-time) (required)
  - acquisitionByUserId: string(uuid) (required)

**MoveNoteRequest**
  - newEntityType: string (required)
  - newEntityId: string (required)

**NoteAttachmentMetadataResponse**
  - fileName: string (required)
  - fileExtension: string (required)
  - documentType: string(uuid) (required)

**NoteAttachmentResponse**
  - noteAttachmentId: string(uuid) (required)
  - fileName: string (required)
  - fileExtension: string (required)
  - documentType: string(uuid) (required)
  - metadata: NoteAttachmentMetadataResponse (required)
  - blobName: string (required)
  - isDeleted: boolean
  - timeStamp: string(date-time) (required)
  - acquisitionUserId: string(uuid) (required)

**NoteAudience**
  - requiresAcknowledgement: boolean (required)

**NoteComment**
  - noteCommentId: string(uuid) (required)
  - text: string (required)
  - date: Date (required)
  - createdByUserId: string(uuid) (required)
  - timeStamp: string(date-time) (required)
  - isDeleted: boolean (required)

**NoteCreatedResponse**
  - entityType: string (required)
  - entityId: string (required)
  - noteId: string(uuid) (required)

**NoteEffectiveness**
  - effectiveDate: object (required)
  - expirationDate: object (required)

**NoteIdResponse**
  - noteId: string(uuid) (required)

**NoteResponse**
  - entityType: string (required)
  - entityId: string (required)
  - noteId: string(uuid) (required)
  - context: ['null', 'string'] (required)
  - text: ['null', 'string']
  - effectiveness: NoteEffectiveness (required)
  - audience: NoteAudience (required)
  - comments: NoteComment[] (required)
  - attachments: NoteAttachmentResponse[] (required)
  - created: string(date-time) (required)
  - createdByUserId: string(uuid) (required)
  - lastUpdatedByUserId: ['null', 'string'](uuid) (required)
  - lastUpdated: ['null', 'string'](date-time) (required)
  - isDeleted: boolean (required)
  - taggableNoteText: NoteText

**NoteText**
  - value: string (required)
  - tags: ['null', 'array']
  - nodeTree: ['null', 'string']

**Tag**
  - tagId: string(uuid) (required)

**UpdateNoteRequest**
  - context: ['null', 'string']
  - text: object
  - effectiveness: object
  - audience: object

