﻿# Unlimited.Engagement.Brands.Services.Config - API Dictionary

Repo: unlimited-engagement-brands-be
Source: Unlimited.Engagement.Brands.Services.Config.json

## Endpoints

### GET /
- Tags: Config
- Response 200: RegisteredBrand[]

### POST /
- Tags: Config
- Request body: CreateBrandRequest
- Response 200: RegisteredBrand
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /{brandId}
- Tags: Config
- Path params: brandId: string(uuid), required
- Response 200: BrandResponse
- Response 404: ProblemDetails

### PUT /{brandId}
- Tags: Config
- Path params: brandId: string(uuid), required
- Request body: UpdateBrandRequest
- Response 200: RegisteredBrand
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /availability/name
- Tags: Config
- Request body: ValueRequest
- Response 200: boolean

### POST /availability/prefix
- Tags: Config
- Request body: ValueRequest
- Response 200: boolean

## Schemas

**BrandResponse**
  - brandId: string(uuid)
  - prefix: ['null', 'string']
  - name: ['null', 'string']
  - isPortalEnabled: boolean
  - logoUrl: ['null', 'string']
  - theme: ['null', 'string']
  - themeLabel: ['null', 'string']
  - description: ['null', 'string']
  - primaryColor: ['null', 'string']
  - accentColor: ['null', 'string']
  - engagements: ['integer', 'string'](int32)
  - locations: ['integer', 'string'](int32)
  - timeZoneId: ['null', 'string']

**CreateBrandRequest**
  - name: ['null', 'string']
  - enablePortal: boolean
  - prefix: ['null', 'string']
  - timeZoneId: ['null', 'string']

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**RegisteredBrand**
  - id: string(uuid) (required)
  - organizationId: string(uuid) (required)
  - prefix: ['null', 'string'] (required)
  - name: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - isPortalEnabled: boolean (required)
  - logoUrl: ['null', 'string'] (required)

**UpdateBrandRequest**
  - name: ['null', 'string']
  - enablePortal: boolean
  - prefix: ['null', 'string']
  - timeZoneId: ['null', 'string']

**ValueRequest**
  - value: ['null', 'string']

