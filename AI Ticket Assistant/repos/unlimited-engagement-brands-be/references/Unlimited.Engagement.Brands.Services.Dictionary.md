﻿# Unlimited.Engagement.Brands.Services - API Dictionary

Repo: unlimited-engagement-brands-be
Source: Unlimited.Engagement.Brands.Services.json

## Endpoints

### GET /
- Tags: Resources
- Response 200: BrandResponse[]

### GET /{brandId}
- Tags: Resources
- Path params: brandId: string(uuid), required
- Response 200: BrandDetailResponse
- Response 404: ProblemDetails

### PUT /{brandId}
- Tags: Resources
- Path params: brandId: string(uuid), required
- Request body: UpdateDescriptionRequest
- Response 200: BrandResponse
- Response 404: ProblemDetails

### POST /{brandId}/generate
- Tags: Resources
- Path params: brandId: string(uuid), required
- Request body: AlphaSplitDetail
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 409: ProblemDetails
- Response 500: (no body)

### GET /{brandId}/locations
- Tags: Security
- Path params: brandId: string(uuid), required
- Response 200: LocationResponse[]

### POST /{brandId}/locations
- Tags: Security
- Path params: brandId: string(uuid), required
- Request body: CreateLocationRequest
- Response 200: LocationResponse

### PUT /{brandId}/locations
- Tags: Security
- Path params: brandId: string(uuid), required
- Request body: UpdateLocationRequest
- Response 200: LocationResponse

### GET /{brandId}/locations/{locationId}
- Tags: Security
- Path params: brandId: string(uuid), required; locationId: string(uuid), required
- Response 200: SecurityLocation
- Response 404: ProblemDetails

### GET /{brandId}/locations/availability/{name}
- Tags: Security
- Path params: brandId: string(uuid), required; name: string, required
- Response 200: boolean

### GET /{brandId}/portal/{engagementId}
- Tags: Engagement
- Path params: brandId: string(uuid), required; engagementId: string(uuid), required
- Response 200: EngagementPortalResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /{brandId}/portal/{engagementId}
- Tags: Engagement
- Path params: brandId: string(uuid), required; engagementId: string(uuid), required
- Request body: EngagementPortalRequest
- Response 200: EngagementPortalResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /{brandId}/portal/{engagementId}/check/{name}
- Tags: Engagement
- Path params: brandId: string(uuid), required; engagementId: string(uuid), required; name: string, required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /{brandId}/portal/{engagementId}/location
- Tags: Engagement
- Path params: brandId: string(uuid), required; engagementId: string(uuid), required
- Request body: EngagementLocationRequest
- Response 200: EngagementPortalResponse
- Response 404: ProblemDetails

### PUT /{brandId}/receipt
- Tags: Resources
- Path params: brandId: string(uuid), required
- Request body: UpdateReceiptRequest
- Response 200: UpdateReceiptResponse
- Response 404: ProblemDetails

### POST /{brandId}/sample
- Tags: Resources
- Path params: brandId: string(uuid), required
- Request body: AlphaSplitDetail
- Response 200: (no body)
- Response 400: ProblemDetails
- Response 409: ProblemDetails
- Response 500: (no body)

### GET /{brandId}/split
- Tags: Resources
- Path params: brandId: string(uuid), required
- Response 200: AlphaSplitResponse
- Response 404: ProblemDetails

### GET /{brandId}/split/summary
- Tags: Resources
- Path params: brandId: string(uuid), required
- Response 200: AlphaSplit[]
- Response 404: ProblemDetails

### PUT /{brandId}/statement
- Tags: Resources
- Path params: brandId: string(uuid), required
- Request body: UpdateStatementRequest
- Response 200: UpdateStatementResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /{brandId}/theme
- Tags: Resources
- Path params: brandId: string(uuid), required
- Response 200: UpdateThemeResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### PUT /{brandId}/timing
- Tags: Resources
- Path params: brandId: string(uuid), required
- Request body: UpdateTimingRequest
- Response 200: UpdateTimingResponse
- Response 404: ProblemDetails

### GET /distributors
- Tags: Resources
- Response 200: BrandDistributor[]

### GET /themes
- Tags: Resources
- Response 200: ThemeResponse

## Schemas

**Address**
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - city: ['null', 'string'] (required)
  - stateId: ['null', 'string'](uuid) (required)
  - zipCode: ['null', 'string'] (required)
  - county: ['null', 'string'] (required)

**AlphaSplit**
  - label: ['null', 'string']
  - dayOfMonth: ['integer', 'string'](int32)
  - percentage: ['null', 'string']
  - count: ['number', 'string'](double)
  - total: ['number', 'string'](double)

**AlphaSplitDetail**
  - start: ['integer', 'string'](int32)
  - end: ['integer', 'string'](int32)
  - day: ['integer', 'string'](int32)

**AlphaSplitResponse**
  - timing: StatementTiming
  - guarantorAlpha: ['null', 'array']
  - alphaSplit: ['null', 'array']
  - totalGuarantors: ['integer', 'string'](int32)

**BrandDetailResponse**
  - brandId: ['null', 'string']
  - prefix: ['null', 'string']
  - name: ['null', 'string']
  - isPortalEnabled: boolean
  - logoUrl: ['null', 'string']
  - theme: ['null', 'string']
  - themeLabel: ['null', 'string']
  - description: ['null', 'string']
  - primaryColor: ['null', 'string']
  - accentColor: ['null', 'string']
  - merchantName: ['null', 'string']
  - practiceUrl: ['null', 'string']
  - displayHelpText: boolean
  - helpText: ['null', 'string']
  - timing: StatementTiming
  - daysBetweenStatements: ['integer', 'string'](int32)
  - minimumBalance: ['number', 'string'](double)
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - state: ['null', 'string'](uuid)
  - zip: ['null', 'string']
  - county: ['null', 'string']
  - distributorId: ['null', 'string'](uuid)
  - distributor: ['null', 'string']
  - securityLocations: ['null', 'array']
  - engagementLocations: ['null', 'array']

**BrandDistributor**
  - id: string(uuid) (required)
  - name: ['null', 'string'] (required)

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

**CreateLocationRequest**
  - name: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - isEngagement: boolean

**EngagementLocation**
  - id: string(uuid) (required)
  - isOnline: boolean (required)
  - description: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - type: EngagementLocationType (required)

**EngagementLocationRequest**
  - locationId: ['null', 'string'](uuid) (required)

**EngagementLocationType**
  - (no properties)

**EngagementPortalRequest**
  - title: ['null', 'string']
  - description: ['null', 'string']
  - timeZoneId: ['null', 'string']
  - isOnline: boolean
  - phone: ['null', 'string']
  - companyId: ['null', 'string'](uuid)
  - divisionId: ['null', 'string'](uuid)
  - displayClinicalPortal: boolean
  - clinicalPortalUrl: ['null', 'string']
  - displayAccountPolicy: boolean
  - accountPolicy: ['null', 'string']
  - displayOnlinePolicy: boolean
  - onlinePolicy: ['null', 'string']
  - displayPatientMessageBanner: boolean
  - patientMessageBannerHeader: ['null', 'string']
  - patientMessageBanner: ['null', 'string']
  - displayPaymentNoteToOffice: boolean
  - paymentNoteToOffice: ['null', 'string']
  - displayPaymentPlans: boolean
  - displayPaymentPlanPolicy: boolean
  - paymentPlanPolicy: ['null', 'string']
  - displayPaymentPlanCancellationPolicy: boolean
  - paymentPlanCancellationPolicy: ['null', 'string']

**EngagementPortalResponse**
  - engagementId: ['null', 'string'](uuid)
  - title: ['null', 'string']
  - description: ['null', 'string']
  - timeZoneId: ['null', 'string']
  - prefix: ['null', 'string']
  - isOnline: boolean
  - phone: ['null', 'string']
  - companyId: ['null', 'string'](uuid)
  - divisionId: ['null', 'string'](uuid)
  - locationId: ['null', 'string'](uuid)
  - displayClinicalPortal: boolean
  - clinicalPortalUrl: ['null', 'string']
  - displayAccountPolicy: boolean
  - accountPolicy: ['null', 'string']
  - displayOnlinePolicy: boolean
  - onlinePolicy: ['null', 'string']
  - displayPatientMessageBanner: boolean
  - patientMessageBannerHeader: ['null', 'string']
  - patientMessageBanner: ['null', 'string']
  - displayPaymentNoteToOffice: boolean
  - paymentNoteToOffice: ['null', 'string']
  - displayPaymentPlans: boolean
  - displayPaymentPlanPolicy: boolean
  - paymentPlanPolicy: ['null', 'string']
  - displayPaymentPlanCancellationPolicy: boolean
  - paymentPlanCancellationPolicy: ['null', 'string']
  - type: EngagementLocationType

**GuarantorAlpha**
  - index: ['integer', 'string'](int32)
  - label: ['null', 'string']
  - count: ['integer', 'string'](int32)

**LocationResponse**
  - label: ['null', 'string'] (required)
  - value: string(uuid) (required)
  - timeZoneId: ['null', 'string'] (required)
  - tag: ['null', 'string'] (required)
  - removed: boolean (required)
  - address: object (required)
  - phone: object (required)

**LocationType**
  - (no properties)

**Phone**
  - phoneType: PhoneType (required)
  - number: string (required)
  - extension: string (required)

**PhoneType**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SecurityLocation**
  - locationId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - tag: ['null', 'string'] (required)
  - active: boolean (required)
  - createdDate: ['null', 'string'](date-time) (required)
  - brandId: ['null', 'string'](uuid) (required)
  - locationType: object (required)
  - address: object (required)
  - phone: object (required)
  - updatedDate: ['null', 'string'](date-time) (required)

**StatementTiming**
  - (no properties)

**Theme**
  - label: ['null', 'string']
  - primary: ['null', 'string']
  - secondary: ['null', 'string']
  - value: ['null', 'string']

**ThemeResponse**
  - themes: ['null', 'array']

**UpdateDescriptionRequest**
  - description: ['null', 'string']

**UpdateLocationRequest**
  - locationId: ['null', 'string'](uuid) (required)
  - name: ['null', 'string'] (required)
  - timeZoneId: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - address: object
  - phone: object

**UpdateReceiptRequest**
  - merchantName: ['null', 'string']
  - practiceUrl: ['null', 'string']
  - displayHelpText: boolean
  - helpText: ['null', 'string']

**UpdateReceiptResponse**
  - merchantName: ['null', 'string']
  - practiceUrl: ['null', 'string']
  - displayHelpText: boolean
  - helpText: ['null', 'string']

**UpdateStatementRequest**
  - distributorId: ['null', 'string'](uuid)
  - daysBetweenStatements: ['integer', 'string'](int32)
  - minimumBalance: ['number', 'string'](double)
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - state: ['null', 'string'](uuid)
  - zip: ['null', 'string']
  - county: ['null', 'string']

**UpdateStatementResponse**
  - distributorId: ['null', 'string'](uuid)
  - distributor: ['null', 'string']
  - daysBetweenStatements: ['integer', 'string'](int32)
  - minimumBalance: ['number', 'string'](double)
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - state: ['null', 'string'](uuid)
  - zip: ['null', 'string']
  - county: ['null', 'string']

**UpdateThemeResponse**
  - logoUrl: ['null', 'string']
  - theme: ['null', 'string']

**UpdateTimingRequest**
  - timing: StatementTiming
  - alphaSplit: ['null', 'array']

**UpdateTimingResponse**
  - timing: StatementTiming
  - alphaSplit: ['null', 'array']

