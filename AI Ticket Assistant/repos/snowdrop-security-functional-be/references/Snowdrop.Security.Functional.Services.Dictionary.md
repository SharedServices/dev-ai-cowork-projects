﻿# Snowdrop.Security.Functional.Services - API Dictionary

Repo: snowdrop-security-functional-be
Source: Snowdrop.Security.Functional.Services.json

## Endpoints

### GET /snowdrop/security-functional/permissions/{permissionSetId}
- Tags: Permissions
- Path params: permissionSetId: string(uuid), required
- Response 200: AppliedPermissionSet

### GET /snowdrop/security-functional/permissions/admin
- Tags: PermissionsAdmin
- Response 200: AppliedPermissionSetHeaderCollection

### POST /snowdrop/security-functional/permissions/admin
- Tags: PermissionsAdmin
- Request body: CreatePermissionSetRequest
- Response 200: CreatePermissionSetResponse

### POST /snowdrop/security-functional/permissions/admin/{permissionSetId}
- Tags: PermissionsAdmin
- Path params: permissionSetId: string(uuid), required
- Request body: CreatePermissionSetRequest
- Response 200: CreatePermissionSetResponse

### PUT /snowdrop/security-functional/permissions/admin/{permissionSetId}
- Tags: PermissionsAdmin
- Path params: permissionSetId: string(uuid), required
- Request body: UpdatePermissionSetRequest
- Response 200: (no body)

### DELETE /snowdrop/security-functional/permissions/admin/{permissionSetId}
- Tags: PermissionsAdmin
- Path params: permissionSetId: string(uuid), required
- Response 200: (no body)

### GET /snowdrop/security-functional/permissions/admin/empty
- Tags: PermissionsAdmin
- Response 200: AppliedPermissionSet

### GET /snowdrop/security-functional/permissions/admin/ping
- Tags: PermissionsAdmin
- Response 200: (no body)

### GET /snowdrop/security-functional/permissions/me
- Tags: Permissions
- Response 200: PermittedPermissionSetResponse

### GET /snowdrop/security-functional/permissions/me/details
- Tags: Permissions
- Response 200: UserDetailsResponse

### GET /snowdrop/security-functional/permissions/mine
- Tags: Permissions
- Response 200: PermittedPermissionSetResponse

### GET /snowdrop/security-functional/permissions/mine-only
- Tags: Permissions
- Response 200: PermittedPermissionSetResponse

### GET /snowdrop/security-functional/permissions/mine/details
- Tags: Permissions
- Response 200: UserDetailsResponse

### GET /snowdrop/security-functional/permissions/ping
- Tags: Permissions
- Response 200: (no body)

### GET /snowdrop/security-functional/permissions/standard
- Tags: PermissionsStandard
- Response 200: AppliedPermissionSetHeaderCollection

### POST /snowdrop/security-functional/permissions/standard
- Tags: PermissionsStandard
- Request body: CreatePermissionSetRequest
- Response 200: CreatePermissionSetResponse

### POST /snowdrop/security-functional/permissions/standard/{permissionSetId}
- Tags: PermissionsStandard
- Path params: permissionSetId: string(uuid), required
- Request body: CreatePermissionSetRequest
- Response 200: CreatePermissionSetResponse

### PUT /snowdrop/security-functional/permissions/standard/{permissionSetId}
- Tags: PermissionsStandard
- Path params: permissionSetId: string(uuid), required
- Request body: UpdatePermissionSetRequest
- Response 200: (no body)

### DELETE /snowdrop/security-functional/permissions/standard/{permissionSetId}
- Tags: PermissionsStandard
- Path params: permissionSetId: string(uuid), required
- Response 200: (no body)

### GET /snowdrop/security-functional/permissions/standard/empty
- Tags: PermissionsStandard
- Response 200: AppliedPermissionSet

### GET /snowdrop/security-functional/permissions/standard/ping
- Tags: PermissionsStandard
- Response 200: (no body)

## Schemas

**AppliedPermissionAction**
  - securableId: string (nullable)
  - name: string (nullable)
  - securableIdentity: SecurableIdentity
  - globalAdminAlwaysPermitted: boolean
  - isEnabled: boolean
  - isReadonly: boolean

**AppliedPermissionContent**
  - actions: AppliedPermissionAction[] (nullable)
  - securableId: string (nullable)
  - name: string (nullable)
  - securableIdentity: SecurableIdentity
  - globalAdminAlwaysPermitted: boolean
  - isEnabled: boolean
  - isReadonly: boolean

**AppliedPermissionSection**
  - subSections: object[] (nullable)
  - content: AppliedPermissionContent[] (nullable)
  - actions: object[] (nullable)
  - securableId: string (nullable)
  - name: string (nullable)
  - securableIdentity: SecurableIdentity
  - globalAdminAlwaysPermitted: boolean
  - isEnabled: boolean
  - isReadonly: boolean

**AppliedPermissionSet**
  - permissionSetId: string(uuid) (nullable)
  - name: string (nullable)
  - description: string (nullable)
  - isEnabled: boolean
  - isCustom: boolean
  - type: SecurableType
  - createdDateTime: string(date-time) (nullable)
  - createdByUserId: string(uuid) (nullable)
  - lastUpdatedDateTime: string(date-time) (nullable)
  - lastUpdatedByUserId: string(uuid) (nullable)
  - sections: AppliedPermissionSection[] (nullable)

**AppliedPermissionSetHeader**
  - permissionSetId: string(uuid)
  - name: string (nullable)
  - description: string (nullable)
  - roles: string(uuid)[] (nullable)
  - isCustom: boolean
  - isEnabled: boolean
  - lastUpdatedDateTime: string(date-time)
  - lastUpdatedByUserId: string(uuid)

**AppliedPermissionSetHeaderCollection**
  - permissionSets: AppliedPermissionSetHeader[] (nullable)

**CreatePermissionSetRequest**
  - name: string (nullable)
  - description: string (nullable)
  - sections: PermissionSection[] (nullable)
  - isCustom: boolean
  - isEnabled: boolean

**CreatePermissionSetResponse**
  - permissionSetId: string(uuid) (required)

**PermissionAction**
  - securableId: string (nullable)
  - securableIdentity: SecurableIdentity
  - isEnabled: boolean (required)

**PermissionContent**
  - actions: PermissionAction[] (nullable)
  - securableId: string (nullable)
  - securableIdentity: SecurableIdentity
  - isEnabled: boolean (required)

**PermissionSection**
  - subSections: object[] (nullable)
  - content: PermissionContent[] (nullable)
  - actions: object[] (nullable)
  - securableId: string (nullable)
  - securableIdentity: SecurableIdentity
  - isEnabled: boolean (required)

**PermissionSet**
  - permissionSetId: string(uuid) (required)
  - name: string (nullable)
  - description: string (nullable)
  - type: SecurableType
  - isEnabled: boolean
  - isCustom: boolean
  - sections: PermissionSection[] (nullable)
  - createdDateTime: string(date-time)
  - createdByUserId: string(uuid)
  - lastUpdatedDateTime: string(date-time)
  - lastUpdatedByUserId: string(uuid)

**PermittedPermissionSetResponse**
  - securableIds: string[] (nullable)

**SecurableIdentity**
  - value: string (nullable)
  - key: string (nullable)

**SecurableType**
  - (no properties)

**UpdatePermissionSetRequest**
  - name: string (nullable)
  - description: string (nullable)
  - sections: PermissionSection[] (nullable)
  - isCustom: boolean
  - isEnabled: boolean

**UserDetails**
  - groups: string(uuid)[] (nullable)
  - permissionSets: PermissionSet[] (nullable)
  - roles: UserRoleMembershipOfUserRole

**UserDetailsResponse**
  - cached: UserDetails
  - direct: UserDetails

**UserRole**
  - userRoleId: string(uuid)
  - name: string (nullable)
  - description: string (nullable)
  - createdDate: string(date-time)
  - isSystemGenerated: boolean
  - isArchived: boolean
  - securityGroups: string(uuid)[] (nullable)
  - users: string(uuid)[] (nullable)
  - locations: string(uuid)[] (nullable)
  - permissionSets: string(uuid)[] (nullable)
  - audienceSegments: string(uuid)[] (nullable)

**UserRoleMembershipOfUserRole**
  - directlyAssigned: UserRole[] (nullable)
  - groupInherited: object[] (nullable)

