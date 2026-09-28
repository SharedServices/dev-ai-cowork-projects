﻿# Snowdrop.Resources.Services - API Dictionary

Repo: snowdrop-resources-be
Source: Snowdrop.Resources.Services.json

## Endpoints

### GET /companies
- Tags: Companies
- Query params: includeInactive: boolean
- Response 200: CompanyHeader[]

### GET /companies/{companyId}
- Tags: Companies
- Path params: companyId: string(uuid), required
- Response 200: CompanyResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /companies/{companyId}/divisions
- Tags: Companies
- Path params: companyId: string(uuid), required
- Response 200: DivisionHeaderResponse[]

### GET /companies/{companyId}/divisions/{divisionId}
- Tags: Companies
- Path params: companyId: string(uuid), required; divisionId: string(uuid), required
- Response 200: DivisionResponse

### GET /companies/{companyId}/locations
- Tags: Companies
- Path params: companyId: string(uuid), required
- Response 200: string(uuid)[]

### GET /companies/{companyId}/time
- Tags: Companies
- Path params: companyId: string(uuid), required
- Response 200: CompanyTime

### GET /companies/divisions
- Tags: Companies
- Response 200: DivisionHeaderResponse[]

### GET /companies/paymentseligible
- Tags: Companies
- Response 200: StripePaymentsEligibleCompanyResponse[]

### GET /devices/payments
- Tags: PaymentDevices
- Response 200: PaymentDeviceHeader[]

### GET /devices/payments/{deviceId}
- Tags: PaymentDevices
- Path params: deviceId: string(uuid), required
- Response 200: PaymentDevice
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /devices/payments/stripe/{deviceId}/lastlocation/{locationId}
- Tags: StripePaymentDevices
- Path params: deviceId: string(uuid), required; locationId: string(uuid), required
- Response 200: (no body)

### GET /devices/payments/stripe/location/{locationId}
- Tags: StripePaymentDevices
- Path params: locationId: string(uuid), required
- Response 200: StripePaymentDeviceResponse[]

### GET /facilities
- Tags: Facilities
- Response 200: FacilityHeader[]

### GET /facilities/{facilityId}
- Tags: Facilities
- Path params: facilityId: string(uuid), required
- Response 200: Facility
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /facility-resources
- Tags: FacilityResources
- Response 200: FacilityResourceHeader[]

### GET /facility-resources/{facilityResourceId}
- Tags: FacilityResources
- Path params: facilityResourceId: string(uuid), required
- Response 200: FacilityResourceData
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /human-resources
- Tags: HumanResources
- Response 200: HumanResourceHeader[]

### GET /human-resources/{humanResourceId}
- Tags: HumanResources
- Path params: humanResourceId: string(uuid), required
- Response 200: HumanResourceData
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /monthlyclose/{companyId}
- Tags: MonthlyClose
- Path params: companyId: string(uuid), required
- Response 200: MonthlyCloseViewApiResponse

### GET /monthlyclose/{companyId}/availablemonths
- Tags: MonthlyClose
- Path params: companyId: string(uuid), required
- Response 200: AvailableMonth[]

### POST /monthlyclose/{companyId}/closemonth
- Tags: MonthlyClose
- Path params: companyId: string(uuid), required
- Request body: CloseMonthRequest
- Response 200: (no body)

### POST /monthlyclose/{companyId}/validate-ledgerdate
- Tags: MonthlyClose
- Path params: companyId: string(uuid), required
- Request body: LedgerDateValidationRequest
- Response 200: LedgerDateValidationResponse

### GET /printers/zebra
- Tags: ZebraPrinters
- Response 200: ZebraPrinterInfo[]
- Response 400: ProblemDetails

### GET /providers
- Tags: Providers
- Response 200: ProviderHeaderResponse[]

### GET /providers/{providerId}
- Tags: Providers
- Path params: providerId: string(uuid), required
- Response 200: ProviderResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /time-zones
- Tags: TimeZones
- Response 200: TimeZoneHeader[]

## Schemas

**AcceptorStatus**
  - (no properties)

**AcceptorType**
  - (no properties)

**Address**
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - city: ['null', 'string'] (required)
  - stateId: string(uuid) (required)
  - zipCode: string (required)

**AvailableMonth**
  - monthYear: object
  - canClose: boolean

**ClosedMonthResponse**
  - month: Month (required)
  - year: ['integer', 'string'](int32) (required)
  - closedBy: ['null', 'string'](uuid) (required)
  - closedOn: ['null', 'string'](date-time) (required)

**CloseMonthRequest**
  - month: Month
  - year: ['integer', 'string'](int32)

**CompanyHeader**
  - companyId: string(uuid) (required)
  - name: string (required)
  - taxId: string (required)
  - applyExpectedAdjustmentOnChargeCreation: boolean (required)
  - autoReconcileOnZeroPayments: boolean (required)
  - merchantAcceptors: MerchantAcceptorHeader[] (required)
  - active: boolean (required)

**CompanyResponse**
  - companyId: string(uuid) (required)
  - name: string (required)
  - taxId: string (required)
  - legalName: ['null', 'string'] (required)
  - npi: ['null', 'string'] (required)
  - divisions: DivisionResponse[] (required)
  - merchantAccount: object (required)
  - merchantAcceptors: MerchantAcceptor[] (required)
  - applyExpectedAdjustmentOnChargeCreation: boolean (required)
  - autoReconcileOnZeroPayments: boolean (required)
  - remittanceInformation: object (required)
  - stripeConfiguration: object (required)
  - stripeAgreementAccepted: boolean (required)
  - skipStripeAgreement: boolean (required)
  - active: boolean (required)
  - createdDate: string(date-time) (required)
  - time: object (required)

**CompanyTime**
  - today: Date (required)
  - timeZoneId: string (required)
  - baseUtcOffset: string (required)

**Date**
  - (no properties)

**DivisionAddress**
  - addressLine1: string (required)
  - addressLine2: string (required)
  - city: string (required)
  - stateId: string(uuid) (required)
  - zipCode: string (required)
  - country: string (required)

**DivisionHeaderResponse**
  - companyId: string(uuid) (required)
  - divisionId: string(uuid) (required)
  - name: string (required)
  - specialtyId: ['null', 'string'](uuid) (required)
  - locations: ['null', 'array'] (required)
  - merchantLocations: ['null', 'array'] (required)

**DivisionResponse**
  - divisionId: string(uuid) (required)
  - name: string (required)
  - npi: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'](uuid) (required)
  - acceptorId: ['null', 'string'] (required)
  - locations: ['null', 'array'] (required)
  - merchantLocations: ['null', 'array'] (required)
  - createdDate: string(date-time) (required)
  - address: object (required)
  - stripeConfiguration: object (required)

**Facility**
  - organizationId: string (required)
  - facilityId: string(uuid) (required)
  - name: string (required)
  - claimPrefix: string (required)
  - npi: string (required)
  - placeOfServiceId: string(uuid) (required)
  - cliaNumber: ['null', 'string'] (required)
  - legalName: ['null', 'string'] (required)
  - address: Address (required)
  - locations: string(uuid)[] (required)
  - createdDate: string(date-time) (required)
  - id: string
  - partition: string

**FacilityHeader**
  - facilityId: string(uuid) (required)
  - name: string (required)
  - address: Address (required)
  - locations: string(uuid)[] (required)

**FacilityResourceData**
  - facilityResourceId: string(uuid) (required)
  - name: string (required)
  - resourceTypeId: string(uuid) (required)
  - locationIds: string(uuid)[] (required)
  - schedulingNotes: string (required)

**FacilityResourceHeader**
  - facilityResourceId: string(uuid) (required)
  - name: string (required)
  - resourceTypeId: string(uuid) (required)
  - locationIds: string(uuid)[] (required)

**HumanResourceData**
  - humanResourceId: string(uuid) (required)
  - name: string (required)
  - resourceTypeId: string(uuid) (required)
  - locationIds: string(uuid)[] (required)
  - schedulingNotes: string (required)

**HumanResourceHeader**
  - humanResourceId: string(uuid) (required)
  - name: string (required)
  - resourceTypeId: string(uuid) (required)
  - locationIds: string(uuid)[] (required)

**LedgerDateValidationRequest**
  - ledgerDate: Date (required)

**LedgerDateValidationResponse**
  - isValid: boolean (required)
  - earliestValidDate: Date (required)
  - ledgerDate: Date (required)

**MerchantAcceptor**
  - acceptorId: string (required)
  - name: string (required)
  - acceptorType: AcceptorType (required)
  - acceptorStatus: AcceptorStatus (required)
  - idleMessage: ['null', 'string'] (required)

**MerchantAcceptorHeader**
  - acceptorId: string (required)
  - name: string (required)
  - acceptorType: AcceptorType (required)

**MerchantAccount**
  - accountId: string (required)
  - accountToken: string (required)
  - terminalId: ['null', 'string'] (required)

**MerchantLocation**
  - locationId: string(uuid) (required)
  - acceptorId: ['null', 'string'] (required)

**Month**
  - (no properties)

**MonthlyCloseViewApiResponse**
  - organizationId: string(uuid) (required)
  - companyId: string(uuid) (required)
  - averageDaysToCloseMonth: ['null', 'number', 'string'](double) (required)
  - sixMonthCloseHistory: ClosedMonthResponse[] (required)

**MonthYear**
  - month: Month (required)
  - year: ['integer', 'string'](int32) (required)

**PaymentDevice**
  - organizationId: string (required)
  - deviceId: string(uuid) (required)
  - laneId: ['null', 'integer', 'string'](int32) (required)
  - deviceName: string (required)
  - assetTag: string (required)
  - serialNumber: ['null', 'string'] (required)
  - modelNumber: ['null', 'string'] (required)
  - terminalId: ['null', 'string'] (required)
  - registrationStatus: PaymentDeviceRegistrationStatus (required)
  - locations: string(uuid)[] (required)
  - companyId: ['null', 'string'](uuid) (required)
  - merchantAccountId: ['null', 'string'] (required)
  - merchantAccountToken: ['null', 'string'] (required)
  - acceptorId: ['null', 'string'] (required)
  - createdDate: string(date-time) (required)
  - registrationError: ['null', 'string']
  - id: string
  - partition: string

**PaymentDeviceHeader**
  - deviceId: string(uuid)
  - laneId: ['null', 'integer', 'string'](int32)
  - deviceName: string
  - assetTag: string
  - serialNumber: ['null', 'string']
  - registrationStatus: PaymentDeviceRegistrationStatus
  - locations: string(uuid)[]
  - companyId: ['null', 'string'](uuid)
  - acceptorId: ['null', 'string']
  - createdDate: string(date-time)

**PaymentDeviceRegistrationStatus**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ProviderCatalogElements**
  - npi: string (required)
  - firstName: string (required)
  - middleName: ['null', 'string'] (required)
  - lastName: string (required)
  - suffix: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'](uuid) (required)

**ProviderHeaderResponse**
  - providerId: string(uuid) (required)
  - locations: string(uuid)[] (required)
  - catalogElements: ProviderCatalogElements (required)

**ProviderResponse**
  - organizationId: string (required)
  - providerId: string(uuid) (required)
  - locations: string(uuid)[] (required)
  - createdDate: string(date-time) (required)
  - catalogElements: ProviderCatalogElements (required)

**RemittanceInformation**
  - submittedByLastName: ['null', 'string'] (required)
  - submittedByFirstName: ['null', 'string'] (required)
  - phoneNumber: ['null', 'string'] (required)
  - addressLine1: string (required)
  - addressLine2: ['null', 'string'] (required)
  - city: string (required)
  - stateId: string(uuid) (required)
  - zipCode: string (required)
  - country: ['null', 'string'] (required)

**StripeConfiguration**
  - (no properties)

**StripePaymentDeviceResponse**
  - deviceId: string(uuid)
  - deviceName: ['null', 'string']
  - assetTag: ['null', 'string']
  - terminalId: ['null', 'string']
  - lastUsed: boolean

**StripePaymentsEligibleCompanyDivisionResponse**
  - divisionId: string(uuid) (required)
  - divisionName: string (required)
  - stripeConfiguration: object (required)

**StripePaymentsEligibleCompanyResponse**
  - companyId: string(uuid) (required)
  - companyName: string (required)
  - active: boolean (required)
  - stripeConfiguration: object (required)
  - divisions: StripePaymentsEligibleCompanyDivisionResponse[] (required)

**StripePaymentsEligibleConfigurationResponse**
  - accountId: string (required)
  - chargesEnabled: boolean (required)

**TimeZoneHeader**
  - id: string (required)
  - baseUtcOffset: string (required)
  - displayName: string (required)
  - shortDisplayName: string (required)

**ZebraPrinterInfo**
  - name: string (required)
  - serialNumber: string (required)

