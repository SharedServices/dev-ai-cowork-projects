﻿# Snowdrop.Resources.Services.Administration - API Dictionary

Repo: snowdrop-resources-be
Source: Snowdrop.Resources.Services.Administration.json

## Endpoints

### GET /acceptors
- Tags: Acceptors
- Response 200: Snowdrop.Resources.Contracts.Acceptors.GetAllAcceptorsResponse

### POST /asset-tags/check-uniqueness
- Tags: AssetTag
- Request body: Snowdrop.Resources.Contracts.DuplicateAssetTagSearchRequest
- Response 200: Snowdrop.Resources.Contracts.DuplicateResourceSearchResponse

### GET /companies
- Tags: Companies
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyHeader[]

### GET /companies/{companyId}
- Tags: Companies
- Path params: companyId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### DELETE /companies/{companyId}/acceptors/{acceptorId}
- Tags: Companies
- Path params: companyId: string(uuid), required; acceptorId: string, required
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### DELETE /companies/{companyId}/accounts
- Tags: Companies
- Path params: companyId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /companies/{companyId}/createstripeaccountlink
- Tags: Companies
- Path params: companyId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.Stripe.CreateStripeAccountLinkRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.Stripe.CreateStripeAccountLinkResponse

### PUT /companies/{companyId}/details
- Tags: Companies
- Path params: companyId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.UpdateCompanyDetailsRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse

### GET /companies/{companyId}/divisions
- Tags: Companies
- Path params: companyId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Companies.Divisions.DivisionHeader[]

### GET /companies/{companyId}/divisions/{divisionId}
- Tags: Companies
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Companies.Divisions.Division

### POST /companies/{companyId}/divisions/{divisionId}/createstripeaccountlink
- Tags: Companies
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.Stripe.CreateStripeAccountLinkRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.Stripe.CreateStripeAccountLinkResponse

### GET /companies/{companyId}/divisions/{divisionId}/getstripeloginlink
- Tags: Companies
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Response 200: string

### PUT /companies/{companyId}/divisions/{divisionId}/locations/{locationId}
- Tags: Companies
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required; locationId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.Divisions.SetDivisionLocationAcceptorRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /companies/{companyId}/divisions/{divisionId}/stripeagreement
- Tags: CompanyStripeAgreement
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.Stripe.AcceptStripeAgreementRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /companies/{companyId}/divisions/{divisionId}/stripeagreement/text
- Tags: CompanyStripeAgreement
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Response 200: string
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /companies/{companyId}/divisions/check-uniqueness
- Tags: Companies
- Path params: companyId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.DuplicateNameSearchRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.Divisions.DivisionDuplicateSearchResponse

### GET /companies/{companyId}/getstripeloginlink
- Tags: Companies
- Path params: companyId: string(uuid), required
- Response 200: string

### PUT /companies/{companyId}/remittance
- Tags: Companies
- Path params: companyId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.UpdateCompanyRemittanceRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse

### POST /companies/{companyId}/stripeagreement
- Tags: CompanyStripeAgreement
- Path params: companyId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.Stripe.AcceptStripeAgreementRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /companies/{companyId}/stripeagreement/pdf
- Tags: CompanyStripeAgreement
- Path params: companyId: string(uuid), required
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /companies/{companyId}/stripeagreement/text
- Tags: CompanyStripeAgreement
- Path params: companyId: string(uuid), required
- Response 200: string
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /companies/acceptors
- Tags: Companies
- Request body: Snowdrop.Resources.Contracts.Companies.WorldPay.AddMerchantAcceptorRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /companies/acceptors
- Tags: Companies
- Request body: Snowdrop.Resources.Contracts.Companies.WorldPay.UpdateMerchantAcceptorRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /companies/accounts
- Tags: Companies
- Request body: Snowdrop.Resources.Contracts.Companies.WorldPay.RegisterMerchantAccountRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /companies/divisions
- Tags: Companies
- Request body: Snowdrop.Resources.Contracts.Companies.Divisions.CreateDivisionRequest
- Response 201: Snowdrop.Resources.Contracts.Companies.CompanyResponse

### PUT /companies/divisions
- Tags: Companies
- Request body: Snowdrop.Resources.Contracts.Companies.Divisions.UpdateDivisionHeaderRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse

### POST /companies/divisions/acceptor
- Tags: Companies
- Request body: Snowdrop.Resources.Contracts.Companies.Divisions.SetDivisionAcceptorRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse

### POST /companies/divisions/address
- Tags: Companies
- Request body: Snowdrop.Resources.Contracts.Companies.Divisions.SetDivisionAddressRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse

### POST /companies/divisions/locations
- Tags: Companies
- Request body: Snowdrop.Resources.Contracts.Companies.Divisions.SetDivisionLocationsRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyResponse

### GET /devices/payments
- Tags: PaymentDevices
- Response 200: Snowdrop.Resources.Contracts.Payments.PaymentDeviceHeader[]

### POST /devices/payments
- Tags: PaymentDevices
- Request body: Snowdrop.Resources.Contracts.Payments.CreatePaymentDeviceRequest
- Response 201: Snowdrop.Resources.Contracts.Payments.PaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /devices/payments
- Tags: PaymentDevices
- Request body: Snowdrop.Resources.Contracts.Payments.UpdatePaymentDeviceRequest
- Response 200: Snowdrop.Resources.Contracts.Payments.PaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /devices/payments/{deviceId}
- Tags: PaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Payments.PaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /devices/payments/{deviceId}/deregister
- Tags: PaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Payments.PaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /devices/payments/{deviceId}/firmware
- Tags: PaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: Sharp.WorldPay.Contracts.TriPOS.Lane
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /devices/payments/{deviceId}/locations
- Tags: PaymentDevices
- Path params: deviceId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: Snowdrop.Resources.Contracts.Payments.PaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /devices/payments/{deviceId}/reset
- Tags: PaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: Sharp.WorldPay.Contracts.TriPOS.Lane
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /devices/payments/{deviceId}/status
- Tags: PaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: Sharp.WorldPay.Contracts.TriPOS.ConnectionStatus
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /devices/payments/{deviceId}/status-history
- Tags: PaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: Sharp.WorldPay.Contracts.TriPOS.ConnectionStatus[]
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /devices/payments/stripe
- Tags: StripePaymentDevices
- Response 200: Snowdrop.Resources.Contracts.Payments.StripePaymentDeviceHeader[]

### POST /devices/payments/stripe
- Tags: StripePaymentDevices
- Request body: Snowdrop.Resources.Contracts.Payments.CreatePaymentDeviceRequest
- Response 201: Snowdrop.Resources.Contracts.Payments.StripePaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /devices/payments/stripe
- Tags: StripePaymentDevices
- Request body: Snowdrop.Resources.Contracts.Payments.UpdatePaymentDeviceRequest
- Response 200: Snowdrop.Resources.Contracts.Payments.StripePaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /devices/payments/stripe/{deviceId}
- Tags: StripePaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Payments.StripePaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /devices/payments/stripe/{deviceId}/deregister
- Tags: StripePaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Payments.StripePaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /devices/payments/stripe/{deviceId}/locations
- Tags: StripePaymentDevices
- Path params: deviceId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: Snowdrop.Resources.Contracts.Payments.StripePaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /devices/payments/stripe/{deviceId}/register
- Tags: StripePaymentDevices
- Path params: deviceId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Payments.RegisterStripePaymentDeviceRequest
- Response 200: Snowdrop.Resources.Contracts.Payments.StripePaymentDevice
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /facilities
- Tags: Facilities
- Response 200: Snowdrop.Resources.Contracts.Facilities.FacilityHeader[]

### POST /facilities
- Tags: Facilities
- Request body: Snowdrop.Resources.Contracts.Facilities.CreateFacilityRequest
- Response 201: Snowdrop.Resources.Contracts.Facilities.Facility
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /facilities
- Tags: Facilities
- Request body: Snowdrop.Resources.Contracts.Facilities.UpdateFacilityRequest
- Response 200: Snowdrop.Resources.Contracts.Facilities.Facility
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /facilities/{facilityId}
- Tags: Facilities
- Path params: facilityId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Facilities.Facility
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /facilities/{facilityId}/locations
- Tags: Facilities
- Path params: facilityId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: Snowdrop.Resources.Contracts.Facilities.Facility
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /facilities/claims/prefixes/exclusions
- Tags: Facilities
- Request body: string[]
- Response 200: (no body)

### GET /facilities/claims/prefixes/exclusions
- Tags: Facilities
- Response 200: string[]

### PUT /facilities/details
- Tags: Facilities
- Request body: Snowdrop.Resources.Contracts.Facilities.UpdateFacilityDetailsRequest
- Response 200: Snowdrop.Resources.Contracts.Facilities.Facility
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /facilities/duplicates/address
- Tags: Facilities
- Request body: Snowdrop.Resources.Contracts.Facilities.FacilityAddressDuplicateSearchRequest
- Response 200: Snowdrop.Resources.Contracts.Facilities.FacilityDuplicateSearchResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /facilities/duplicates/name
- Tags: Facilities
- Request body: Snowdrop.Resources.Contracts.DuplicateNameSearchRequest
- Response 200: Snowdrop.Resources.Contracts.Facilities.FacilityDuplicateSearchResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /facility-resources
- Tags: FacilityResources
- Request body: Snowdrop.Resources.Contracts.SchedulingResources.CreateFacilityResourceRequest
- Response 201: Snowdrop.Resources.Contracts.SchedulingResources.FacilityResourceData
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /facility-resources
- Tags: FacilityResources
- Request body: Snowdrop.Resources.Contracts.SchedulingResources.UpdateFacilityResourceRequest
- Response 201: Snowdrop.Resources.Contracts.SchedulingResources.FacilityResourceData
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /facility-resources/duplicates/name
- Tags: FacilityResources
- Request body: Snowdrop.Resources.Contracts.DuplicateNameSearchRequest
- Response 200: Snowdrop.Resources.Contracts.SchedulingResources.FacilityResourceDuplicateSearchResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /human-resources
- Tags: HumanResources
- Request body: Snowdrop.Resources.Contracts.SchedulingResources.CreateHumanResourceRequest
- Response 201: Snowdrop.Resources.Contracts.SchedulingResources.HumanResourceData
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /human-resources
- Tags: HumanResources
- Request body: Snowdrop.Resources.Contracts.SchedulingResources.UpdateHumanResourceRequest
- Response 201: Snowdrop.Resources.Contracts.SchedulingResources.HumanResourceData
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /human-resources/duplicates/name
- Tags: HumanResources
- Request body: Snowdrop.Resources.Contracts.DuplicateNameSearchRequest
- Response 200: Snowdrop.Resources.Contracts.SchedulingResources.HumanResourceDuplicateSearchResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /providers
- Tags: Providers
- Response 200: Snowdrop.Resources.Contracts.Providers.ProviderHeaderResponse[]

### GET /providers/{providerId}
- Tags: Providers
- Path params: providerId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Providers.ProviderResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /providers/{providerId}/locations
- Tags: Providers
- Path params: providerId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: Snowdrop.Resources.Contracts.Providers.ProviderResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /vendor/companies
- Tags: Vendor
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyHeader[]

### POST /vendor/companies
- Tags: Vendor
- Request body: Snowdrop.Resources.Contracts.Companies.CreateCompanyRequest
- Response 201: Snowdrop.Resources.Contracts.Companies.Company
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /vendor/companies
- Tags: Vendor
- Request body: Snowdrop.Resources.Contracts.Companies.UpdateCompanyHeaderRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.Company
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /vendor/companies/{companyId}
- Tags: Vendor
- Path params: companyId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyVendorResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /vendor/companies/{companyId}/activate
- Tags: Vendor
- Path params: companyId: string(uuid), required
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /vendor/companies/{companyId}/createstripeaccount
- Tags: Vendor
- Path params: companyId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfigurationResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /vendor/companies/{companyId}/deactivate
- Tags: Vendor
- Path params: companyId: string(uuid), required
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /vendor/companies/{companyId}/divisions/{divisionId}/createstripeaccount
- Tags: Vendor
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfigurationResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /vendor/companies/{companyId}/divisions/{divisionId}/removestripeaccount
- Tags: Vendor
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 201: (no body)

### POST /vendor/companies/{companyId}/divisions/{divisionId}/setstripeaccount
- Tags: Vendor
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.Stripe.SetStripeAccountRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfigurationResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /vendor/companies/{companyId}/removestripeaccount
- Tags: Vendor
- Path params: companyId: string(uuid), required
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 201: (no body)

### POST /vendor/companies/{companyId}/setstripeaccount
- Tags: Vendor
- Path params: companyId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.Stripe.SetStripeAccountRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfigurationResponse
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /vendor/companies/{companyId}/skipstripeagreement
- Tags: Vendor
- Path params: companyId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Companies.Stripe.SkipStripeAgreementRequest
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 204: (no body)

### POST /vendor/companies/check-uniqueness
- Tags: Vendor
- Request body: Snowdrop.Resources.Contracts.DuplicateNameSearchRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyDuplicateSearchResponse

### POST /vendor/companies/check-uniqueness/taxid
- Tags: Vendor
- Request body: Snowdrop.Resources.Contracts.DuplicateTaxIdSearchRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.CompanyDuplicateSearchResponse

### PUT /vendor/companies/time-zone
- Tags: Vendor
- Request body: Snowdrop.Resources.Contracts.Companies.UpdateCompanyTimeZoneRequest
- Response 200: Snowdrop.Resources.Contracts.Companies.Company
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /vendor/providers
- Tags: VendorProviders
- Response 200: Snowdrop.Resources.Contracts.Providers.ProviderVendorHeaderResponse[]

### POST /vendor/providers
- Tags: VendorProviders
- Request body: Snowdrop.Resources.Contracts.Providers.CreateProviderRequest
- Response 201: Snowdrop.Resources.Contracts.Providers.ProviderVendorResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /vendor/providers/{providerId}
- Tags: VendorProviders
- Path params: providerId: string(uuid), required
- Response 200: Snowdrop.Resources.Contracts.Providers.ProviderVendorResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /vendor/providers/{providerId}
- Tags: VendorProviders
- Path params: providerId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Providers.ProviderEntitlements
- Response 204: (no body)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /vendor/providers/{providerId}/platformloadfactor
- Tags: VendorProviders
- Path params: providerId: string(uuid), required
- Request body: Snowdrop.Resources.Contracts.Providers.UpdateProviderRequest
- Response 200: Snowdrop.Resources.Contracts.Providers.ProviderVendorResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /vendor/providers/duplicates/catalogElement
- Tags: VendorProviders
- Request body: Snowdrop.Resources.Contracts.Providers.ProviderDuplicateCatalogElementRequest
- Response 200: Snowdrop.Resources.Contracts.Providers.ProviderDuplicateSearchResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /vendor/providers/rre/categories
- Tags: VendorProviders
- Response 200: string[]

### GET /vendor/providers/servicelines
- Tags: VendorProviders
- Response 200: string[]

### DELETE /vendor/stripeaccount/{accountId}
- Tags: Vendor
- Path params: accountId: string, required
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 200: (no body)

## Schemas

**Microsoft.AspNetCore.Mvc.ProblemDetails**
  - type: string (nullable)
  - title: string (nullable)
  - status: integer(int32) (nullable)
  - detail: string (nullable)
  - instance: string (nullable)

**Sharp.Dates.Date**
  - year: integer(int32)
  - month: integer(int32)
  - day: integer(int32)

**Sharp.WorldPay.Contracts.TriPOS.ConnectionStatus**
  - timeStamp: string(date-time)
  - status: string (nullable)

**Sharp.WorldPay.Contracts.TriPOS.Lane**
  - laneId: integer(int32)
  - terminalId: string (nullable)
  - serialNumber: string (nullable)
  - modelNumber: string (nullable)
  - description: string (nullable)
  - applicationVersion1: string (nullable)
  - applicationVersion2: string (nullable)
  - operatingSystemVersion: string (nullable)
  - securityVersion: string (nullable)
  - emvKernelVersion: string (nullable)
  - profile: Sharp.WorldPay.Contracts.TriPOS.Profile
  - connectionStatus: Sharp.WorldPay.Contracts.TriPOS.ConnectionStatus

**Sharp.WorldPay.Contracts.TriPOS.Profile**
  - idleMessage: string (nullable)

**Snowdrop.Resources.Contracts.Acceptors.GetAllAcceptorsResponse**
  - (no properties)

**Snowdrop.Resources.Contracts.Address**
  - addressLine1: string (nullable)
  - addressLine2: string (nullable)
  - city: string (nullable)
  - stateId: string(uuid)
  - zipCode: string (nullable)

**Snowdrop.Resources.Contracts.Companies.Company**
  - id: string (nullable)
  - partition: string (nullable)
  - organizationId: string (nullable)
  - companyId: string(uuid)
  - name: string (nullable)
  - taxId: string (nullable)
  - timeZoneId: string (nullable)
  - legalName: string (nullable)
  - npi: string (nullable)
  - divisions: Snowdrop.Resources.Contracts.Companies.Divisions.Division[] (nullable)
  - merchantAccount: Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAccount
  - applyExpectedAdjustmentOnChargeCreation: boolean
  - autoReconcileOnZeroPayments: boolean
  - merchantAcceptors: Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAcceptor[] (nullable)
  - remittanceInformation: Snowdrop.Resources.Contracts.Companies.RemittanceInformation
  - stripeConfiguration: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfiguration
  - stripeAgreementAcceptance: Snowdrop.Resources.Contracts.Companies.Stripe.StripeAgreementAcceptance
  - skipStripeAgreement: boolean
  - active: boolean
  - createdDate: string(date-time)

**Snowdrop.Resources.Contracts.Companies.CompanyDuplicateSearchResponse**
  - hasDuplicates: boolean
  - duplicates: Snowdrop.Resources.Contracts.Companies.CompanyHeader[] (nullable)

**Snowdrop.Resources.Contracts.Companies.CompanyHeader**
  - companyId: string(uuid)
  - name: string (nullable)
  - taxId: string (nullable)
  - applyExpectedAdjustmentOnChargeCreation: boolean
  - autoReconcileOnZeroPayments: boolean
  - merchantAcceptors: Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAcceptorHeader[] (nullable)
  - active: boolean

**Snowdrop.Resources.Contracts.Companies.CompanyResponse**
  - companyId: string(uuid)
  - name: string (nullable)
  - taxId: string (nullable)
  - legalName: string (nullable)
  - npi: string (nullable)
  - divisions: Snowdrop.Resources.Contracts.Companies.DivisionResponse[] (nullable)
  - merchantAccount: Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAccount
  - merchantAcceptors: Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAcceptor[] (nullable)
  - applyExpectedAdjustmentOnChargeCreation: boolean
  - autoReconcileOnZeroPayments: boolean
  - remittanceInformation: Snowdrop.Resources.Contracts.Companies.RemittanceInformation
  - stripeConfiguration: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfiguration
  - stripeAgreementAccepted: boolean
  - skipStripeAgreement: boolean
  - active: boolean
  - createdDate: string(date-time)
  - time: Snowdrop.Resources.Contracts.Companies.CompanyTime

**Snowdrop.Resources.Contracts.Companies.CompanyTime**
  - today: Sharp.Dates.Date
  - timeZoneId: string (nullable)
  - baseUtcOffset: string(date-span)

**Snowdrop.Resources.Contracts.Companies.CompanyVendorResponse**
  - companyId: string(uuid)
  - name: string (nullable)
  - taxId: string (nullable)
  - timeZoneId: string (nullable)
  - applyExpectedAdjustmentOnChargeCreation: boolean
  - autoReconcileOnZeroPayments: boolean
  - merchantAcceptors: Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAcceptorHeader[] (nullable)
  - active: boolean
  - stripeConfiguration: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfigurationResponse
  - stripeDivisions: Snowdrop.Resources.Contracts.Companies.CompanyVendorResponse+CompanyVendorDivisionResponse[] (nullable)
  - skipStripeAgreement: boolean

**Snowdrop.Resources.Contracts.Companies.CompanyVendorResponse+CompanyVendorDivisionResponse**
  - divisionName: string (nullable)
  - divisionId: string(uuid)
  - stripeConfiguration: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfigurationResponse

**Snowdrop.Resources.Contracts.Companies.CreateCompanyRequest**
  - name: string (required)
  - taxId: string (required)
  - createdDate: string(date-time) (required)
  - timeZoneId: string (nullable)
  - applyExpectedAdjustmentOnChargeCreation: boolean
  - autoReconcileOnZeroPayments: boolean

**Snowdrop.Resources.Contracts.Companies.DivisionResponse**
  - divisionId: string(uuid)
  - name: string (nullable)
  - npi: string (nullable)
  - specialtyId: string(uuid) (nullable)
  - acceptorId: string (nullable)
  - locations: string(uuid)[] (nullable)
  - merchantLocations: Snowdrop.Resources.Contracts.Companies.Divisions.MerchantLocation[] (nullable)
  - createdDate: string(date-time)
  - address: Snowdrop.Resources.Contracts.Companies.Divisions.DivisionAddress
  - stripeConfiguration: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfiguration

**Snowdrop.Resources.Contracts.Companies.Divisions.CreateDivisionRequest**
  - companyId: string(uuid) (required)
  - name: string (required)
  - npi: string (nullable)
  - specialtyId: string(uuid) (nullable)
  - createdDate: string(date-time) (required)

**Snowdrop.Resources.Contracts.Companies.Divisions.Division**
  - divisionId: string(uuid)
  - name: string (nullable)
  - npi: string (nullable)
  - specialtyId: string(uuid) (nullable)
  - acceptorId: string (nullable)
  - locations: string(uuid)[] (nullable)
  - merchantLocations: Snowdrop.Resources.Contracts.Companies.Divisions.MerchantLocation[] (nullable)
  - createdDate: string(date-time)
  - address: Snowdrop.Resources.Contracts.Companies.Divisions.DivisionAddress
  - stripeConfiguration: Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfiguration

**Snowdrop.Resources.Contracts.Companies.Divisions.DivisionAddress**
  - addressLine1: string (nullable)
  - addressLine2: string (nullable)
  - city: string (nullable)
  - stateId: string(uuid)
  - zipCode: string (nullable)
  - country: string (nullable)

**Snowdrop.Resources.Contracts.Companies.Divisions.DivisionDuplicateSearchResponse**
  - hasDuplicates: boolean
  - duplicates: Snowdrop.Resources.Contracts.Companies.Divisions.DivisionHeader[] (nullable)

**Snowdrop.Resources.Contracts.Companies.Divisions.DivisionHeader**
  - companyId: string(uuid)
  - divisionId: string(uuid)
  - name: string (nullable)
  - specialtyId: string(uuid) (nullable)
  - locations: string(uuid)[] (nullable)
  - merchantLocations: Snowdrop.Resources.Contracts.Companies.Divisions.MerchantLocation[] (nullable)

**Snowdrop.Resources.Contracts.Companies.Divisions.MerchantLocation**
  - locationId: string(uuid)
  - acceptorId: string (nullable)

**Snowdrop.Resources.Contracts.Companies.Divisions.SetDivisionAcceptorRequest**
  - companyId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - acceptorId: string (nullable)

**Snowdrop.Resources.Contracts.Companies.Divisions.SetDivisionAddressRequest**
  - companyId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - address: Snowdrop.Resources.Contracts.Companies.Divisions.DivisionAddress (required)

**Snowdrop.Resources.Contracts.Companies.Divisions.SetDivisionLocationAcceptorRequest**
  - acceptorId: string (nullable)

**Snowdrop.Resources.Contracts.Companies.Divisions.SetDivisionLocationsRequest**
  - companyId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - locations: string(uuid)[] (required)

**Snowdrop.Resources.Contracts.Companies.Divisions.UpdateDivisionHeaderRequest**
  - companyId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - name: string (required)
  - npi: string (nullable)
  - specialtyId: string(uuid) (nullable)

**Snowdrop.Resources.Contracts.Companies.RemittanceInformation**
  - submittedByLastName: string (nullable)
  - submittedByFirstName: string (nullable)
  - phoneNumber: string (nullable)
  - addressLine1: string (nullable)
  - addressLine2: string (nullable)
  - city: string (nullable)
  - stateId: string(uuid)
  - zipCode: string (nullable)
  - country: string (nullable)

**Snowdrop.Resources.Contracts.Companies.Stripe.AcceptStripeAgreementRequest**
  - (no properties)

**Snowdrop.Resources.Contracts.Companies.Stripe.CreateStripeAccountLinkRequest**
  - refreshUrl: string (required)
  - returnUrl: string (required)

**Snowdrop.Resources.Contracts.Companies.Stripe.CreateStripeAccountLinkResponse**
  - (no properties)

**Snowdrop.Resources.Contracts.Companies.Stripe.SetStripeAccountRequest**
  - accountId: string (required)

**Snowdrop.Resources.Contracts.Companies.Stripe.SkipStripeAgreementRequest**
  - skipStripeAgreement: boolean

**Snowdrop.Resources.Contracts.Companies.Stripe.StripeAgreementAcceptance**
  - stripeAccountId: string (nullable)
  - divisionId: string(uuid) (nullable)
  - userId: string(uuid)
  - signerName: string (nullable)
  - signerIpAddress: string (nullable)
  - signerOrgTag: string (nullable)
  - agreementDate: Sharp.Dates.Date
  - created: string(date-time)

**Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfiguration**
  - (no properties)

**Snowdrop.Resources.Contracts.Companies.Stripe.StripeConfigurationResponse**
  - (no properties)

**Snowdrop.Resources.Contracts.Companies.UpdateCompanyDetailsRequest**
  - companyId: string(uuid) (required)
  - legalName: string (required)
  - npi: string (required)

**Snowdrop.Resources.Contracts.Companies.UpdateCompanyHeaderRequest**
  - companyId: string(uuid) (required)
  - name: string (required)
  - taxId: string (required)
  - timezoneId: string (required)
  - applyExpectedAdjustmentOnChargeCreation: boolean (required)
  - autoReconcileOnZeroPayments: boolean

**Snowdrop.Resources.Contracts.Companies.UpdateCompanyRemittanceRequest**
  - submittedByLastName: string (nullable)
  - submittedByFirstName: string (nullable)
  - phoneNumber: string (nullable)
  - addressLine1: string (required)
  - addressLine2: string (nullable)
  - city: string (required)
  - stateId: string(uuid) (required)
  - zipCode: string (required)
  - country: string (nullable)

**Snowdrop.Resources.Contracts.Companies.UpdateCompanyTimeZoneRequest**
  - companyId: string(uuid) (required)
  - timeZoneId: string (required)

**Snowdrop.Resources.Contracts.Companies.WorldPay.AcceptorStatus**
  - enum values: 0, 1

**Snowdrop.Resources.Contracts.Companies.WorldPay.AcceptorType**
  - enum values: 0, 1

**Snowdrop.Resources.Contracts.Companies.WorldPay.AddMerchantAcceptorRequest**
  - companyId: string(uuid) (required)
  - acceptorId: string (required)
  - name: string (required)
  - acceptorType: Snowdrop.Resources.Contracts.Companies.WorldPay.AcceptorType
  - idleMessage: string (nullable)

**Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAcceptor**
  - acceptorId: string (nullable)
  - name: string (nullable)
  - acceptorType: Snowdrop.Resources.Contracts.Companies.WorldPay.AcceptorType
  - acceptorStatus: Snowdrop.Resources.Contracts.Companies.WorldPay.AcceptorStatus
  - idleMessage: string (nullable)

**Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAcceptorHeader**
  - acceptorId: string (nullable)
  - name: string (nullable)
  - acceptorType: Snowdrop.Resources.Contracts.Companies.WorldPay.AcceptorType

**Snowdrop.Resources.Contracts.Companies.WorldPay.MerchantAccount**
  - accountId: string (nullable)
  - accountToken: string (nullable)
  - terminalId: string (nullable)

**Snowdrop.Resources.Contracts.Companies.WorldPay.RegisterMerchantAccountRequest**
  - companyId: string(uuid) (required)
  - accountId: string (required)
  - accountToken: string (required)
  - terminalId: string (nullable)

**Snowdrop.Resources.Contracts.Companies.WorldPay.UpdateMerchantAcceptorRequest**
  - companyId: string(uuid) (required)
  - acceptorId: string (required)
  - name: string (required)
  - idleMessage: string (nullable)

**Snowdrop.Resources.Contracts.DuplicateAssetTagSearchRequest**
  - assetTag: string (required)
  - excludedResourceId: string(uuid) (nullable)

**Snowdrop.Resources.Contracts.DuplicateNameSearchRequest**
  - resourceName: string (required)
  - excludedResourceId: string(uuid) (nullable)

**Snowdrop.Resources.Contracts.DuplicateResourceSearchResponse**
  - hasDuplicates: boolean
  - duplicates: Snowdrop.Resources.Contracts.ResourceHeader[] (nullable)

**Snowdrop.Resources.Contracts.DuplicateTaxIdSearchRequest**
  - taxId: string (nullable)
  - excludedResourceId: string(uuid) (nullable)

**Snowdrop.Resources.Contracts.Facilities.CreateFacilityRequest**
  - name: string (required)
  - addressLine1: string (required)
  - addressLine2: string (nullable)
  - city: string (required)
  - stateId: string(uuid) (required)
  - zipCode: string (required)
  - claimPrefix: string (required)
  - npi: string (required)
  - placeOfServiceId: string(uuid) (required)
  - cliaNumber: string (nullable)
  - legalName: string (nullable)
  - createdDate: string(date-time) (required)

**Snowdrop.Resources.Contracts.Facilities.Facility**
  - id: string (nullable)
  - partition: string (nullable)
  - organizationId: string (nullable)
  - facilityId: string(uuid)
  - name: string (nullable)
  - claimPrefix: string (nullable)
  - npi: string (nullable)
  - placeOfServiceId: string(uuid)
  - cliaNumber: string (nullable)
  - legalName: string (nullable)
  - address: Snowdrop.Resources.Contracts.Address
  - locations: string(uuid)[] (nullable)
  - createdDate: string(date-time)

**Snowdrop.Resources.Contracts.Facilities.FacilityAddressDuplicateSearchRequest**
  - facilityId: string(uuid) (nullable)
  - addressLine1: string (nullable)
  - addressLine2: string (nullable)
  - city: string (nullable)
  - stateId: string(uuid)
  - zipCode: string (nullable)

**Snowdrop.Resources.Contracts.Facilities.FacilityDuplicateSearchResponse**
  - hasDuplicates: boolean
  - duplicates: Snowdrop.Resources.Contracts.Facilities.FacilityHeader[] (nullable)

**Snowdrop.Resources.Contracts.Facilities.FacilityHeader**
  - facilityId: string(uuid)
  - name: string (nullable)
  - address: Snowdrop.Resources.Contracts.Address
  - locations: string(uuid)[] (nullable)

**Snowdrop.Resources.Contracts.Facilities.UpdateFacilityDetailsRequest**
  - facilityId: string(uuid) (required)
  - claimPrefix: string (required)
  - npi: string (required)
  - placeOfServiceId: string(uuid) (required)
  - cliaNumber: string (nullable)
  - legalName: string (nullable)

**Snowdrop.Resources.Contracts.Facilities.UpdateFacilityRequest**
  - facilityId: string(uuid) (required)
  - name: string (required)
  - addressLine1: string (required)
  - addressLine2: string (nullable)
  - city: string (required)
  - stateId: string(uuid) (required)
  - zipCode: string (required)

**Snowdrop.Resources.Contracts.Payments.CreatePaymentDeviceRequest**
  - deviceName: string (required)
  - assetTag: string (required)
  - locationId: string(uuid) (nullable)
  - createdDate: string(date-time) (required)

**Snowdrop.Resources.Contracts.Payments.PaymentDevice**
  - id: string (nullable)
  - partition: string (nullable)
  - organizationId: string (nullable)
  - deviceId: string(uuid)
  - laneId: integer(int32) (nullable)
  - deviceName: string (nullable)
  - assetTag: string (nullable)
  - serialNumber: string (nullable)
  - modelNumber: string (nullable)
  - terminalId: string (nullable)
  - registrationStatus: Snowdrop.Resources.Contracts.Payments.PaymentDeviceRegistrationStatus
  - locations: string(uuid)[] (nullable)
  - companyId: string(uuid) (nullable)
  - merchantAccountId: string (nullable)
  - merchantAccountToken: string (nullable)
  - acceptorId: string (nullable)
  - createdDate: string(date-time)
  - registrationError: string (nullable)

**Snowdrop.Resources.Contracts.Payments.PaymentDeviceHeader**
  - deviceId: string(uuid)
  - laneId: integer(int32) (nullable)
  - deviceName: string (nullable)
  - assetTag: string (nullable)
  - serialNumber: string (nullable)
  - registrationStatus: Snowdrop.Resources.Contracts.Payments.PaymentDeviceRegistrationStatus
  - locations: string(uuid)[] (nullable)
  - companyId: string(uuid) (nullable)
  - acceptorId: string (nullable)
  - createdDate: string(date-time)

**Snowdrop.Resources.Contracts.Payments.PaymentDeviceRegistrationStatus**
  - enum values: 0, 1, 2, 3

**Snowdrop.Resources.Contracts.Payments.RegisterStripePaymentDeviceRequest**
  - readerId: string (nullable)

**Snowdrop.Resources.Contracts.Payments.StripePaymentDevice**
  - id: string (nullable)
  - partition: string (nullable)
  - deviceId: string(uuid)
  - organizationId: string (nullable)
  - deviceName: string (nullable)
  - assetTag: string (nullable)
  - serialNumber: string (nullable)
  - modelNumber: string (nullable)
  - terminalId: string (nullable)
  - stripeLocationId: string (nullable)
  - registrationStatus: Snowdrop.Resources.Contracts.Payments.PaymentDeviceRegistrationStatus
  - locations: string(uuid)[] (nullable)
  - createdDate: string(date-time)
  - registrationError: string (nullable)

**Snowdrop.Resources.Contracts.Payments.StripePaymentDeviceHeader**
  - deviceId: string(uuid)
  - deviceName: string (nullable)
  - assetTag: string (nullable)
  - serialNumber: string (nullable)
  - terminalId: string (nullable)
  - registrationStatus: Snowdrop.Resources.Contracts.Payments.PaymentDeviceRegistrationStatus
  - locations: string(uuid)[] (nullable)
  - createdDate: string(date-time)

**Snowdrop.Resources.Contracts.Payments.UpdatePaymentDeviceRequest**
  - deviceId: string(uuid) (required)
  - deviceName: string (required)
  - assetTag: string (required)

**Snowdrop.Resources.Contracts.Providers.CreateProviderRequest**
  - providersCatalogElementId: string(uuid) (required)
  - npi: string (required)
  - firstName: string (required)
  - middleName: string (nullable)
  - lastName: string (required)
  - suffix: string (nullable)
  - specialtyId: string(uuid) (nullable)
  - platformLoadFactor: number(double)
  - authorizationNumber: string (nullable)
  - inventoryNote: string (nullable)
  - rreCategory: string (nullable)
  - rreActivation: Sharp.Dates.Date
  - serviceLine: string (nullable)

**Snowdrop.Resources.Contracts.Providers.ProviderCatalogElements**
  - npi: string (nullable)
  - firstName: string (nullable)
  - middleName: string (nullable)
  - lastName: string (nullable)
  - suffix: string (nullable)
  - specialtyId: string(uuid) (nullable)

**Snowdrop.Resources.Contracts.Providers.ProviderDuplicateCatalogElementRequest**
  - providerId: string(uuid)

**Snowdrop.Resources.Contracts.Providers.ProviderDuplicateSearchResponse**
  - hasDuplicates: boolean
  - duplicates: Snowdrop.Resources.Contracts.Providers.ProviderHeader[] (nullable)

**Snowdrop.Resources.Contracts.Providers.ProviderEntitlement**
  - isEnabled: boolean
  - effectiveStart: Sharp.Dates.Date
  - effectiveEnd: Sharp.Dates.Date

**Snowdrop.Resources.Contracts.Providers.ProviderEntitlements**
  - scheduling: Snowdrop.Resources.Contracts.Providers.ProviderEntitlement
  - claims: Snowdrop.Resources.Contracts.Providers.ProviderEntitlement

**Snowdrop.Resources.Contracts.Providers.ProviderHeader**
  - providerId: string(uuid)
  - locations: string(uuid)[] (nullable)
  - catalogElements: Snowdrop.Resources.Contracts.Providers.ProviderCatalogElements
  - platformLoadFactor: number(double) (nullable)

**Snowdrop.Resources.Contracts.Providers.ProviderHeaderResponse**
  - providerId: string(uuid)
  - locations: string(uuid)[] (nullable)
  - catalogElements: Snowdrop.Resources.Contracts.Providers.ProviderCatalogElements

**Snowdrop.Resources.Contracts.Providers.ProviderResponse**
  - organizationId: string (nullable)
  - providerId: string(uuid)
  - locations: string(uuid)[] (nullable)
  - createdDate: string(date-time)
  - catalogElements: Snowdrop.Resources.Contracts.Providers.ProviderCatalogElements

**Snowdrop.Resources.Contracts.Providers.ProviderVendorHeaderResponse**
  - providerId: string(uuid)
  - catalogElements: Snowdrop.Resources.Contracts.Providers.ProviderCatalogElements
  - platformLoadFactor: number(double)

**Snowdrop.Resources.Contracts.Providers.ProviderVendorResponse**
  - organizationId: string (nullable)
  - providerId: string(uuid)
  - catalogElements: Snowdrop.Resources.Contracts.Providers.ProviderCatalogElements
  - platformLoadFactor: number(double)
  - authorizationNumber: string (nullable)
  - inventoryNote: string (nullable)
  - rreCategory: string (nullable)
  - rreActivation: Sharp.Dates.Date
  - entitlements: Snowdrop.Resources.Contracts.Providers.ProviderEntitlements
  - serviceLine: string (nullable)
  - createdDate: string(date-time)
  - createdBy: string(uuid) (nullable)
  - updatedDate: string(date-time) (nullable)
  - updatedBy: string(uuid) (nullable)

**Snowdrop.Resources.Contracts.Providers.UpdateProviderRequest**
  - platformLoadFactor: number(double)
  - authorizationNumber: string (nullable)
  - inventoryNote: string (nullable)
  - rreCategory: string (nullable)
  - rreActivation: Sharp.Dates.Date
  - serviceLine: string (nullable)

**Snowdrop.Resources.Contracts.ResourceHeader**
  - resourceId: string(uuid)
  - resourceName: string (nullable)
  - resourceType: Snowdrop.Resources.Contracts.ResourceType

**Snowdrop.Resources.Contracts.ResourceType**
  - enum values: 0, 1, 2

**Snowdrop.Resources.Contracts.SchedulingResources.CreateFacilityResourceRequest**
  - name: string (nullable)
  - resourceTypeId: string(uuid)
  - locationIds: string(uuid)[] (nullable)
  - schedulingNotes: string (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.CreateHumanResourceRequest**
  - name: string (nullable)
  - resourceTypeId: string(uuid)
  - locationIds: string(uuid)[] (nullable)
  - schedulingNotes: string (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.FacilityResourceData**
  - facilityResourceId: string(uuid)
  - name: string (nullable)
  - resourceTypeId: string(uuid)
  - locationIds: string(uuid)[] (nullable)
  - schedulingNotes: string (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.FacilityResourceDuplicateSearchResponse**
  - hasDuplicates: boolean
  - duplicates: Snowdrop.Resources.Contracts.SchedulingResources.FacilityResourceHeader[] (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.FacilityResourceHeader**
  - facilityResourceId: string(uuid)
  - name: string (nullable)
  - resourceTypeId: string(uuid)
  - locationIds: string(uuid)[] (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.HumanResourceData**
  - humanResourceId: string(uuid)
  - name: string (nullable)
  - resourceTypeId: string(uuid)
  - locationIds: string(uuid)[] (nullable)
  - schedulingNotes: string (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.HumanResourceDuplicateSearchResponse**
  - hasDuplicates: boolean
  - duplicates: Snowdrop.Resources.Contracts.SchedulingResources.HumanResourceHeader[] (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.HumanResourceHeader**
  - humanResourceId: string(uuid)
  - name: string (nullable)
  - resourceTypeId: string(uuid)
  - locationIds: string(uuid)[] (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.UpdateFacilityResourceRequest**
  - facilityResourceId: string(uuid)
  - name: string (nullable)
  - resourceTypeId: string(uuid)
  - locationIds: string(uuid)[] (nullable)
  - schedulingNotes: string (nullable)

**Snowdrop.Resources.Contracts.SchedulingResources.UpdateHumanResourceRequest**
  - humanResourceId: string(uuid)
  - name: string (nullable)
  - resourceTypeId: string(uuid)
  - locationIds: string(uuid)[] (nullable)
  - schedulingNotes: string (nullable)

