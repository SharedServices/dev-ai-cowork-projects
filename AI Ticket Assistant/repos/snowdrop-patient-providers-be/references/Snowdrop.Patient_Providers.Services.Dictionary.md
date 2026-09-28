﻿# Snowdrop.Patient_Providers.Services - API Dictionary

Repo: snowdrop-patient-providers-be
Source: Snowdrop.Patient_Providers.Services.json

## Endpoints

### PUT /patients/{patientId}/primarycareprovider
- Tags: PrimaryCareProvider
- Path params: patientId: string(uuid), required
- Request body: Snowdrop.Patient_Providers.Contracts.API.SetPrimaryCareProviderRequest
- Response 204: (no body)

### DELETE /patients/{patientId}/primarycareprovider
- Tags: PrimaryCareProvider
- Path params: patientId: string(uuid), required
- Response 204: (no body)

### GET /patients/{patientId}/primarycareprovider
- Tags: PrimaryCareProvider
- Path params: patientId: string(uuid), required
- Response 200: Snowdrop.Patient_Providers.Contracts.PrimaryCareProvider

### PUT /patients/{patientId}/responsibleproviders
- Tags: ResponsibleProviders
- Path params: patientId: string(uuid), required
- Request body: Snowdrop.Patient_Providers.Contracts.API.AddResponsibleProviderRequest
- Response 201: Snowdrop.Patient_Providers.Contracts.ResponsibleProvider
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /patients/{patientId}/responsibleproviders
- Tags: ResponsibleProviders
- Path params: patientId: string(uuid), required
- Response 200: Snowdrop.Patient_Providers.Contracts.ResponsibleProvider[]

### PUT /patients/{patientId}/responsibleproviders/{responsibleProviderId}
- Tags: ResponsibleProviders
- Path params: patientId: string(uuid), required; responsibleProviderId: string(uuid), required
- Request body: Snowdrop.Patient_Providers.Contracts.API.UpdateResponsibleProviderRequest
- Response 204: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /patients/{patientId}/responsibleproviders/{responsibleProviderId}
- Tags: ResponsibleProviders
- Path params: patientId: string(uuid), required; responsibleProviderId: string(uuid), required
- Response 200: Snowdrop.Patient_Providers.Contracts.ResponsibleProvider

### DELETE /patients/{patientId}/responsibleproviders/{responsibleProviderId}
- Tags: ResponsibleProviders
- Path params: patientId: string(uuid), required; responsibleProviderId: string(uuid), required
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 204: (no body)

### POST /patients/{patientId}/responsibleproviders/reorder
- Tags: ResponsibleProviders
- Path params: patientId: string(uuid), required
- Request body: string(uuid)[]
- Response 204: (no body)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /responsibleproviders/referring/{responsibleProviderResourceId}/frequent/{count}
- Tags: ResponsibleProviders
- Path params: responsibleProviderResourceId: string(uuid), required; count: integer(int32), required
- Response 200: string[]

## Schemas

**Microsoft.AspNetCore.Mvc.ProblemDetails**
  - type: string (nullable)
  - title: string (nullable)
  - status: integer(int32) (nullable)
  - detail: string (nullable)
  - instance: string (nullable)

**Snowdrop.Patient_Providers.Contracts.API.AddResponsibleProviderRequest**
  - providerResourceId: string(uuid) (required)
  - referringProviderCatalogId: string(uuid) (nullable)

**Snowdrop.Patient_Providers.Contracts.API.SetPrimaryCareProviderRequest**
  - providerCatalogId: string(uuid) (required)

**Snowdrop.Patient_Providers.Contracts.API.UpdateResponsibleProviderRequest**
  - providerResourceId: string(uuid) (required)
  - referringProviderCatalogId: string(uuid) (nullable)

**Snowdrop.Patient_Providers.Contracts.PrimaryCareProvider**
  - providerCatalogId: string(uuid)
  - id: string (nullable)
  - partition: string (nullable)

**Snowdrop.Patient_Providers.Contracts.ResponsibleProvider**
  - responsibleProviderId: string(uuid)
  - providerResourceId: string(uuid)
  - referringProviderCatalogId: string(uuid) (nullable)

