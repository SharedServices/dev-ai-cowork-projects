﻿# Snowdrop.Security.Services - API Dictionary

Repo: snowdrop-security-be
Source: Snowdrop.Security.Services.json

## Endpoints

### GET /locations
- Tags: Locations
- Response 200: LocationListResponseItem[]

### GET /locations/{locationId}
- Tags: Locations
- Path params: locationId: string(uuid), required
- Response 200: LocationListResponseItem

### GET /locations/clinical
- Tags: Locations
- Response 200: LocationListResponseItem[]

### GET /locations/engagement
- Tags: Locations
- Response 200: LocationListResponseItem[]

### GET /userroles
- Tags: UserRoles
- Query params: userRoleId: string(uuid)
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /users/me
- Tags: Users
- Response 200: UserProfile

### GET /users/me/groups
- Tags: Users
- Response 200: UserGroupAssignment[]

### GET /users/me/locations
- Tags: Users
- Response 200: UserLocationAssignment[]

### GET /users/me/roles
- Tags: Users
- Response 200: UserRoleMembershipOfUserRoleHeader

## Schemas

**Address**
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']
  - county: ['null', 'string']

**LocationListResponseItem**
  - label: ['null', 'string'] (required)
  - value: string(uuid) (required)
  - timeZoneId: ['null', 'string'] (required)
  - tag: ['null', 'string'] (required)
  - removed: boolean (required)
  - locationType: LocationType (required)
  - address: Address (required)
  - phone: Phone (required)

**LocationType**
  - (no properties)

**Phone**
  - phoneType: PhoneType
  - number: ['null', 'string']
  - extension: ['null', 'string']

**PhoneType**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**UserGroupAssignment**
  - userGroupId: string(uuid) (required)

**UserLocationAssignment**
  - locationId: string(uuid) (required)

**UserProfile**
  - userId: string(uuid)
  - locations: ['null', 'array']
  - roles: UserRoleMembershipOfUserRoleHeader

**UserRole**
  - userRoleId: string(uuid)
  - name: ['null', 'string']
  - description: ['null', 'string']
  - createdDate: string(date-time)
  - isSystemGenerated: boolean
  - isArchived: boolean
  - securityGroups: ['null', 'array']
  - users: ['null', 'array']
  - locations: ['null', 'array']
  - permissionSets: ['null', 'array']
  - audienceSegments: ['null', 'array']

**UserRoleHeader**
  - userRoleId: string(uuid)
  - name: ['null', 'string']
  - description: ['null', 'string']
  - isSystemGenerated: boolean
  - isArchived: boolean
  - securityGroupsCount: ['integer', 'string'](int32)

**UserRoleMembershipOfUserRoleHeader**
  - directlyAssigned: ['null', 'array']
  - groupInherited: ['null', 'array']

