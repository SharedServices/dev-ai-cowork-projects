﻿# Snowdrop.CommandCenter.Api - API Dictionary

Repo: snowdrop-commandcenter-be
Source: Snowdrop.CommandCenter.Api.json

## Endpoints

### POST /bulkactions
- Tags: BulkAction
- Response 200: Snowdrop.CommandCenter.API.SubmitBulkActionResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /bulkactions
- Tags: BulkAction
- Response 200: Snowdrop.CommandCenter.API.BulkActionListProgressResponse

### GET /bulkactions/{bulkActionId}
- Tags: BulkAction
- Path params: bulkActionId: string(uuid), required
- Response 200: Snowdrop.CommandCenter.API.BulkActionDetailResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /bulkactions/{bulkActionId}/completion-report
- Tags: BulkAction
- Path params: bulkActionId: string(uuid), required
- Response 200: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /bulkactions/{bulkActionId}/json
- Tags: BulkAction
- Path params: bulkActionId: string(uuid), required
- Response 200: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /bulkactions/{bulkActionId}/spreadsheet
- Tags: BulkAction
- Path params: bulkActionId: string(uuid), required
- Response 200: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /bulkactions/all
- Tags: BulkAction
- Response 200: Snowdrop.CommandCenter.API.BulkActionListProgressResponse

### POST /bulkactions/cancel
- Tags: BulkAction
- Request body: Snowdrop.CommandCenter.API.CancelBulkActionRequest
- Response 200: Snowdrop.CommandCenter.API.CancelBulkActionResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /bulkactions/json
- Tags: BulkAction
- Request body: Snowdrop.CommandCenter.API.SubmitBulkActionJsonRequest
- Response 200: Snowdrop.CommandCenter.API.SubmitBulkActionResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /sqlactions/{actionId}
- Tags: SqlAction
- Path params: actionId: string(uuid), required
- Response 200: Snowdrop.CommandCenter.API.BulkActionDetailResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /sqlactions/{actionId}/completion-report
- Tags: SqlAction
- Path params: actionId: string(uuid), required
- Response 200: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /templates
- Tags: Templates
- Query params: includeVendorOnly: boolean
- Response 200: Snowdrop.CommandCenter.API.GetTemplatesResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /templates/{templateId}
- Tags: Templates
- Path params: templateId: string(uuid), required
- Response 200: (no body)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /tokens
- Tags: Token
- Request body: Snowdrop.CommandCenter.API.GenerateTokenRequest
- Response 200: Snowdrop.CommandCenter.API.GenerateTokenResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /tokentypes
- Tags: TokenTypes
- Response 200: Snowdrop.CommandCenter.API.GetTokenTypesResponse

### POST /utilities/templates/{templateId}/hidden
- Tags: Utilities
- Path params: templateId: string(uuid), required
- Response 200: boolean
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

## Schemas

**Microsoft.AspNetCore.Mvc.ProblemDetails**
  - type: string (nullable)
  - title: string (nullable)
  - status: integer(int32) (nullable)
  - detail: string (nullable)
  - instance: string (nullable)

**Snowdrop.CommandCenter.API.BulkActionDetailResponse**
  - bulkActionId: string(uuid)
  - templateId: string(uuid)
  - templateName: string (nullable)
  - startTime: string(date-time)
  - endTime: string(date-time) (nullable)
  - status: Snowdrop.CommandCenter.Contracts.BulkActionStatusEnum
  - runUserId: string(uuid) (nullable)
  - cancelUserId: string(uuid) (nullable)
  - cancellationReason: string (nullable)
  - description: string (nullable)
  - failureCount: integer(int32)
  - successCount: integer(int32)
  - totalCount: integer(int32)
  - actionType: Snowdrop.CommandCenter.Contracts.ActionType

**Snowdrop.CommandCenter.API.BulkActionListProgressResponse**
  - processing: Snowdrop.CommandCenter.API.BulkActionProgressLineResponse[] (nullable)
  - completed: Snowdrop.CommandCenter.API.BulkActionProgressLineResponse[] (nullable)

**Snowdrop.CommandCenter.API.BulkActionProgressLineResponse**
  - templateName: string (nullable)
  - runUserId: string(uuid) (nullable)
  - startTime: string(date-time)
  - bulkActionId: string(uuid)
  - failureCount: integer(int32)
  - successCount: integer(int32)
  - progress: integer(int32) (nullable)
  - status: Snowdrop.CommandCenter.Contracts.BulkActionStatusEnum
  - runTime: string(date-span)
  - actionType: Snowdrop.CommandCenter.Contracts.ActionType

**Snowdrop.CommandCenter.API.CancelBulkActionRequest**
  - bulkActionId: string(uuid)
  - cancelReason: string (nullable)
  - userName: string (nullable)

**Snowdrop.CommandCenter.API.CancelBulkActionResponse**
  - bulkActionId: string(uuid)

**Snowdrop.CommandCenter.API.GenerateTokenRequest**
  - tokenTypeId: string(uuid)

**Snowdrop.CommandCenter.API.GenerateTokenResponse**
  - tokenId: string(uuid)
  - userId: string(uuid) (nullable)
  - expirationDate: string(date-time)

**Snowdrop.CommandCenter.API.GetTemplatesResponse**
  - templates: Snowdrop.CommandCenter.API.TemplateResponseItem[] (nullable)

**Snowdrop.CommandCenter.API.GetTokenTypesResponse**
  - types: Snowdrop.CommandCenter.API.TokenTypesResponseItem[] (nullable)

**Snowdrop.CommandCenter.API.SubmitBulkActionJsonRequest**
  - templateId: string(uuid)
  - description: string (nullable)
  - jsonDocument: string (nullable)

**Snowdrop.CommandCenter.API.SubmitBulkActionResponse**
  - bulkActionId: string(uuid)

**Snowdrop.CommandCenter.API.TemplateResponseItem**
  - templateId: string(uuid)
  - templateName: string (nullable)
  - guidance: string (nullable)

**Snowdrop.CommandCenter.API.TokenTypesResponseItem**
  - typeId: string(uuid)
  - name: string (nullable)

**Snowdrop.CommandCenter.Contracts.ActionType**
  - enum values: 0, 1, 2

**Snowdrop.CommandCenter.Contracts.BulkActionStatusEnum**
  - enum values: 0, 1, 2, 3, 4, 5

