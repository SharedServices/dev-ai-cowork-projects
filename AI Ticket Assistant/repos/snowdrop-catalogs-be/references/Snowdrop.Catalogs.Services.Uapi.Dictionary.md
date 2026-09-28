﻿# Snowdrop.Catalogs.Services.Uapi - API Dictionary

Repo: snowdrop-catalogs-be
Source: Snowdrop.Catalogs.Services.Uapi.json

## Endpoints

### POST /34fa5de6-1206-4341-8384-ad330c717138/elements/add
- Tags: Providers
- Request body: UapiCreateProviderRequest
- Response 201: (no body)
- Response 400: ProblemDetails
- Response 401: ProblemDetails
- Response 409: ProblemDetails
- Response 429: ProblemDetails
- Response 503: (no body)

## Schemas

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**UapiCreateProviderRequest**
  - runId: string(uuid) (required)
  - actionId: string(uuid) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'](uuid) (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - addressStateId: ['null', 'string'](uuid) (required)
  - addressCity: ['null', 'string'] (required)
  - addressZipCode: ['null', 'string'] (required)
  - addressCounty: ['null', 'string'] (required)
  - contactPhoneNumber: ['null', 'string'] (required)
  - contactPhoneNumberExtension: ['null', 'string'] (required)
  - contactFaxNumber: ['null', 'string'] (required)
  - contactFaxNumberExtension: ['null', 'string'] (required)

