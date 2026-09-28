﻿# Snowdrop.Workflows.Services - API Dictionary

Repo: snowdrop-workflows-be
Source: Snowdrop.Workflows.Services.json

## Endpoints

### GET /userroles/{userRoleId}/ownerships
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Response 200: WorkflowTypeHeader[]

### PUT /userroles/ownerships/breakpoints
- Tags: UserRoles
- Request body: UpdateWorkflowOwnershipsRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### PUT /userroles/ownerships/workflow-types
- Tags: UserRoles
- Request body: UpdateWorkflowOwnershipsRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### GET /users/{userId}/ownerships
- Tags: Users
- Path params: userId: string(uuid), required
- Response 200: UserWorkflowTypeResponse[]

### GET /workflow-types
- Tags: WorkflowTypes
- Response 200: WorkflowTypeHeader[]

### GET /workflow-types/{workflowType}/managers
- Tags: WorkflowTypes
- Path params: workflowType: WorkflowType, required
- Response 200: string[]

### POST /workflows
- Tags: Workflows
- Request body: CreateWorkflowRequest
- Response 202: (no body)
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### PUT /workflows
- Tags: Workflows
- Request body: UpdateWorkflowRequest
- Response 202: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /workflows/{workflowId}
- Tags: Workflows
- Path params: workflowId: string(uuid), required
- Response 200: Workflow
- Response 404: ProblemDetails

### DELETE /workflows/{workflowId}
- Tags: Workflows
- Path params: workflowId: string(uuid), required
- Response 202: (no body)
- Response 404: ProblemDetails

### POST /workflows/{workflowId}/clone
- Tags: Workflows
- Path params: workflowId: string(uuid), required
- Response 202: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /workflows/{workflowId}/favorite
- Tags: Workflows
- Path params: workflowId: string(uuid), required
- Response 202: (no body)
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### PUT /workflows/{workflowId}/unfavorite
- Tags: Workflows
- Path params: workflowId: string(uuid), required
- Response 202: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /workflows/users/{userId}
- Tags: Workflows
- Path params: userId: string(uuid), required
- Response 200: UserWorkflowHeader[]

## Schemas

**CreateWorkflowRequest**
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - configuration: ['null', 'object'] (required)
  - workflowType: WorkflowType (required)
  - users: ['null', 'array'] (required)
  - favoritedByUsers: ['null', 'array'] (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**UpdateWorkflowOwnershipsRequest**
  - userRoleId: string(uuid) (required)
  - workflowTypes: ['null', 'array'] (required)

**UpdateWorkflowRequest**
  - workflowId: string(uuid) (required)
  - userId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - configuration: ['null', 'object'] (required)
  - users: ['null', 'array'] (required)
  - favoritedByUsers: ['null', 'array'] (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)

**UserWorkflowHeader**
  - workflowId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - configuration: ['null', 'object'] (required)
  - workflowType: WorkflowType (required)
  - isFavorite: boolean (required)
  - isManager: boolean (required)
  - users: ['null', 'array'] (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)

**UserWorkflowTypeResponse**
  - name: ['null', 'string'] (required)
  - workflowType: WorkflowType (required)
  - isBreakpointWorkflow: boolean (required)
  - userRoles: ['null', 'array'] (required)

**Workflow**
  - organizationId: string(uuid) (required)
  - workflowId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - configuration: ['null', 'object'] (required)
  - workflowType: WorkflowType (required)
  - users: ['null', 'array'] (required)
  - favoritedByUsers: ['null', 'array'] (required)
  - lastModifiedByUserId: string(uuid) (required)
  - lastModifiedDate: string(date-time) (required)
  - createdByUserId: string(uuid) (required)
  - createdDate: string(date-time) (required)
  - isDeleted: boolean
  - id: ['null', 'string']
  - partition: ['null', 'string']

**WorkflowType**
  - (no properties)

**WorkflowTypeHeader**
  - name: ['null', 'string'] (required)
  - workflowType: WorkflowType (required)
  - isBreakpointWorkflow: boolean (required)

