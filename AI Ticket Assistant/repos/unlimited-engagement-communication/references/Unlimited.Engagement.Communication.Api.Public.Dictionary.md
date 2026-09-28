﻿# Unlimited.Engagement.Communication.Api.Public - API Dictionary

Repo: unlimited-engagement-communication
Source: Unlimited.Engagement.Communication.Api.Public.json

## Endpoints

### GET /config/brands/{brandId}
- Tags: Brand
- Path params: brandId: string(uuid), required
- Response 200: BrandCommunicationSettingsResponse

### PUT /config/brands/{brandId}
- Tags: Brand
- Path params: brandId: string(uuid), required
- Request body: BrandCommunicationSettingsRequest
- Response 204: (no body)

### POST /config/quicklink
- Tags: PortalQuickLink
- Request body: CreatePortalQuickLinkRequest
- Response 200: CreatePortalQuickLinkResponse

### GET /config/quicklink/{brandId}/{linkId}
- Tags: PortalQuickLink
- Path params: brandId: string(uuid), required; linkId: string(uuid), required
- Response 200: PortalQuickLinkContextResponse

### GET /public/patient/{patientId}
- Tags: Patient
- Path params: patientId: string(uuid), required
- Response 200: PatientCommunicationSettingsResponse

### GET /public/patient/{patientId}/brand/{brandId}
- Tags: Patient
- Path params: patientId: string(uuid), required; brandId: string(uuid), required
- Response 200: PatientSingleBrandCommunicationSettingsRepsonse

### PUT /public/patient/{patientId}/brand/{brandId}
- Tags: Patient
- Path params: patientId: string(uuid), required; brandId: string(uuid), required
- Request body: PatientBrandCommunicationSettingsRequest
- Response 204: (no body)

### PUT /public/patient/{patientId}/brand/{brandId}/selfselect
- Tags: Patient
- Path params: patientId: string(uuid), required; brandId: string(uuid), required
- Request body: PatientSelfSelectCommunicationSettingsRequest
- Response 204: (no body)

### GET /vendor/organization
- Tags: Vendor
- Response 200: OrgCommunicationSettingsResponse

### PUT /vendor/organization
- Tags: Vendor
- Request body: OrgCommunicationSettingsRequest
- Response 204: (no body)

## Schemas

**BrandCommunicationSettingsRequest**
  - statements: StatementEngagementSettingsRequest (required)
  - paymentPlans: PaymentPlansEngagementSettingsRequest (required)

**BrandCommunicationSettingsResponse**
  - statements: StatementsCommunicationSettingsResponse (required)
  - paymentPlans: PaymentPlansCommunicationSettingsResponse (required)

**CreatePortalQuickLinkRequest**
  - brandId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - statementId: ['null', 'string'](uuid) (required)

**CreatePortalQuickLinkResponse**
  - linkId: string(uuid) (required)
  - expiration: string(date-time) (required)

**MethodEnrollment**
  - (no properties)

**OrgCommunicationSettingsRequest**
  - textEnabled: boolean (required)
  - emailEnabled: boolean (required)

**OrgCommunicationSettingsResponse**
  - textEnabled: boolean (required)
  - emailEnabled: boolean (required)

**PatientBrandCommunicationSettingsRequest**
  - statements: PatientStatementsCommunicationSettingsRequest (required)
  - paymentPlans: PatientPaymentPlansCommunicationSettingsRequest (required)

**PatientBrandCommunicationSettingsResponse**
  - brandId: string(uuid) (required)
  - brandName: ['null', 'string'] (required)
  - lastChangedByPatient: boolean (required)
  - statements: PatientStatementsCommunicationSettingsResponse (required)
  - paymentPlans: PatientPaymentPlansCommunicationSettingsResponse (required)

**PatientCommunicationSettingsResponse**
  - cellPhone: ['null', 'string'] (required)
  - email: ['null', 'string'] (required)
  - brandSettings: PatientBrandCommunicationSettingsResponse[] (required)

**PatientPaymentPlansCommunicationSettingsRequest**
  - textEnabled: boolean (required)
  - emailEnabled: boolean (required)

**PatientPaymentPlansCommunicationSettingsResponse**
  - textEnabled: ['null', 'boolean'] (required)
  - emailEnabled: ['null', 'boolean'] (required)

**PatientSelfSelectCommunicationSettingsRequest**
  - statements: PatientSelfSelectStatementsCommunicationSettingsRequest (required)
  - paymentPlans: PatientPaymentPlansCommunicationSettingsRequest (required)

**PatientSelfSelectStatementsCommunicationSettingsRequest**
  - textEnabled: boolean (required)
  - emailEnabled: boolean (required)

**PatientSimpleCommunicationSettingsResponse**
  - statements: PatientStatementsCommunicationSettingsResponse (required)
  - paymentPlans: PatientPaymentPlansCommunicationSettingsResponse (required)

**PatientSingleBrandCommunicationSettingsRepsonse**
  - lastChangedByPatient: boolean (required)
  - cellPhone: ['null', 'string'] (required)
  - email: ['null', 'string'] (required)
  - patientSettings: PatientSimpleCommunicationSettingsResponse (required)
  - brandSettings: BrandCommunicationSettingsResponse (required)
  - orgSettings: OrgCommunicationSettingsResponse (required)

**PatientStatementsCommunicationSettingsRequest**
  - textEnabled: boolean (required)
  - emailEnabled: boolean (required)
  - paperMailEnabled: boolean (required)

**PatientStatementsCommunicationSettingsResponse**
  - textEnabled: ['null', 'boolean'] (required)
  - emailEnabled: ['null', 'boolean'] (required)
  - paperMailEnabled: ['null', 'boolean'] (required)

**PaymentPlansCommunicationSettingsResponse**
  - text: object (required)
  - email: object (required)

**PaymentPlansEngagementSettingsRequest**
  - text: MethodEnrollment (required)
  - email: MethodEnrollment (required)

**PortalQuickLinkContextResponse**
  - patientId: string(uuid) (required)
  - statementId: ['null', 'string'](uuid) (required)

**StatementEngagementSettingsRequest**
  - text: MethodEnrollment (required)
  - email: MethodEnrollment (required)

**StatementsCommunicationSettingsResponse**
  - text: object (required)
  - email: object (required)

