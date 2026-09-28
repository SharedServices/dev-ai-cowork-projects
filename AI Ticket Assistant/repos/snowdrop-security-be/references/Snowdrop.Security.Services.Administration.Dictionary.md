﻿# Snowdrop.Security.Services.Administration - API Dictionary

Repo: snowdrop-security-be
Source: Snowdrop.Security.Services.Administration.json

## Endpoints

### GET /config/inactivity-timeout
- Tags: SecurityConfiguration
- Response 200: InactivityTimeoutConfiguration

### POST /config/inactivity-timeout
- Tags: SecurityConfiguration
- Request body: UpdateInactivityTimeoutConfigRequest
- Response 200: (no body)

### GET /locations
- Tags: Locations
- Response 200: LocationHeader[]

### POST /locations
- Tags: Locations
- Request body: CreateLocationRequest
- Response 201: Location
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /locations
- Tags: Locations
- Request body: UpdateLocationRequest
- Response 200: Location
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /locations/{locationId}
- Tags: Locations
- Path params: locationId: string(uuid), required
- Response 200: Location
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /locations/{locationId}/activate
- Tags: Locations
- Path params: locationId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PATCH /locations/{locationId}/brand
- Tags: Locations
- Path params: locationId: string(uuid), required
- Request body: UpdateLocationBrandIdRequest
- Response 200: Location
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /locations/{locationId}/deactivate
- Tags: Locations
- Path params: locationId: string(uuid), required
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /locations/bybrand/{brandId}
- Tags: Locations
- Path params: brandId: string(uuid), required
- Response 200: LocationHeader[]

### POST /locations/check-uniqueness
- Tags: Locations
- Request body: LocationDuplicateSearchRequest
- Response 200: LocationDuplicateSearchResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /locations/clinical
- Tags: Locations
- Response 200: LocationHeader[]

### GET /locations/engagement
- Tags: Locations
- Response 200: LocationHeader[]

### PUT /support/location/{locationId}/{locationType}
- Tags: Support
- Path params: locationId: string(uuid), required; locationType: string, required
- Response 200: Location
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /userroles
- Tags: UserRoles
- Request body: CreateUserRoleRequest
- Response 201: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /userroles
- Tags: UserRolesOrganizational
- Response 200: UserRoleHeader[]

### GET /userroles/{userRoleId}
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /userroles/{userRoleId}
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Request body: CreateUserRoleRequest
- Response 201: UserRole
- Response 400: ProblemDetails

### PUT /userroles/{userRoleId}
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Request body: UpdateUserRoleRequest
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /userroles/{userRoleId}/audiencesegments
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Request body: UpdateUserRoleAudienceSegmentsRequest
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /userroles/{userRoleId}/isarchived
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Request body: UpdateUserRoleIsArchivedRequest
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /userroles/{userRoleId}/locations
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Request body: UpdateUserRoleLocationsRequest
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /userroles/{userRoleId}/permissionsets
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Request body: UpdateUserRolePermissionSetsRequest
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /userroles/{userRoleId}/securitygroups
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Request body: UpdateUserRoleSecurityGroupsRequest
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /userroles/{userRoleId}/users
- Tags: UserRoles
- Path params: userRoleId: string(uuid), required
- Request body: UpdateUserRoleUsersRequest
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /userroles/archived
- Tags: UserRolesOrganizational
- Response 200: UserRoleHeader[]

### POST /userroles/check-uniqueness
- Tags: UserRolesOrganizational
- Request body: DuplicateUserRoleSearchRequest
- Response 200: DuplicateUserRoleSearchResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /userroles/uapi-user
- Tags: UserRoles
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /userroles/uapi-user/permissionsets
- Tags: UserRoles
- Request body: UpdateUserRolePermissionSetsRequest
- Response 200: UserRole
- Response 400: ProblemDetails
- Response 404: ProblemDetails

## Schemas

**Address**
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']
  - county: ['null', 'string']

**CreateLocationRequest**
  - name: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)
  - tag: ['null', 'string'] (required)
  - brandId: ['null', 'string'](uuid) (required)
  - locationType: object

**CreateUserRoleRequest**
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)

**DuplicateUserRoleSearchRequest**
  - userRoleName: ['null', 'string'] (required)
  - excludedUserRoleId: ['null', 'string'](uuid) (required)

**DuplicateUserRoleSearchResponse**
  - hasDuplicates: boolean
  - duplicates: ['null', 'array'] (required)

**InactivityTimeoutConfiguration**
  - inactivityTimeoutMinutes: ['integer', 'string'](int32) (required)
  - id: ['null', 'string']
  - partition: ['null', 'string']

**Location**
  - organizationId: ['null', 'string'] (required)
  - locationId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - tag: ['null', 'string'] (required)
  - active: boolean (required)
  - createdDate: string(date-time) (required)
  - brandId: ['null', 'string'](uuid) (required)
  - locationType: LocationType
  - address: Address (required)
  - phone: Phone (required)
  - id: ['null', 'string']
  - partition: ['null', 'string']

**LocationDuplicateSearchRequest**
  - locationName: ['null', 'string'] (required)
  - excludedLocationId: ['null', 'string'](uuid) (required)

**LocationDuplicateSearchResponse**
  - hasDuplicates: boolean
  - duplicates: ['null', 'array']

**LocationHeader**
  - locationId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - tag: ['null', 'string'] (required)
  - active: boolean (required)
  - brandId: ['null', 'string'](uuid) (required)
  - locationType: LocationType
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

**UpdateInactivityTimeoutConfigRequest**
  - inactivityTimeoutMinutes: ['integer', 'string'](int32)

**UpdateLocationBrandIdRequest**
  - brandId: string(uuid) (required)

**UpdateLocationRequest**
  - locationId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - tag: ['null', 'string'] (required)
  - address: Address (required)
  - phone: Phone (required)

**UpdateUserRoleAudienceSegmentsRequest**
  - userRoleId: string(uuid) (required)
  - audienceSegments: ['null', 'array'] (required)

**UpdateUserRoleIsArchivedRequest**
  - userRoleId: string(uuid) (required)
  - isArchived: boolean (required)

**UpdateUserRoleLocationsRequest**
  - userRoleId: string(uuid) (required)
  - locations: ['null', 'array'] (required)

**UpdateUserRolePermissionSetsRequest**
  - userRoleId: string(uuid) (required)
  - permissionSets: ['null', 'array'] (required)

**UpdateUserRoleRequest**
  - userRoleId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)

**UpdateUserRoleSecurityGroupsRequest**
  - userRoleId: string(uuid) (required)
  - securityGroups: ['null', 'array'] (required)

**UpdateUserRoleUsersRequest**
  - userRoleId: string(uuid) (required)
  - users: ['null', 'array'] (required)

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

