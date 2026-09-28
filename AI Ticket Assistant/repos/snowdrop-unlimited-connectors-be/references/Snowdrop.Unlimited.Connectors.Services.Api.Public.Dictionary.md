﻿# Snowdrop.Unlimited.Connectors.Services.Api.Public - API Dictionary

Repo: snowdrop-unlimited-connectors-be
Source: Snowdrop.Unlimited.Connectors.Services.Api.Public.json

## Endpoints

### GET /administration/connector/{id}
- Tags: Administration
- Path params: id: string(uuid), required
- Response 200: Connector

### PUT /administration/connector/{id}
- Tags: Administration
- Path params: id: string(uuid), required
- Request body: UpdateConnectorStatusRequest
- Response 200: Connector

### GET /administration/connectors
- Tags: Administration
- Response 200: Connector[]

### GET /Connectors
- Tags: Connectors
- Response 200: ConnectorSummary[]

### POST /RxVantage/refresh-token
- Tags: RxVantage
- Request body: RefreshTokenRequest
- Response 200: TokenResponse

### POST /RxVantage/start-auth
- Tags: RxVantage
- Request body: StartAuthRequest
- Response 200: StartAuthResponse

### POST /RxVantage/start-component
- Tags: RxVantage
- Request body: StartComponentRequest
- Response 200: StartComponentResponse

## Schemas

**Configurability**
  - (no properties)

**Connector**
  - id: string(uuid) (required)
  - name: string (required)
  - description: string (required)
  - status: ConnectorStatus (required)
  - vendorOnly: boolean (required)
  - configurability: Configurability (required)
  - legalese: string (required)

**ConnectorStatus**
  - (no properties)

**ConnectorSummary**
  - id: string(uuid) (required)
  - name: string (required)
  - description: string (required)

**FilterLocation**
  - lat: ['null', 'number', 'string'](double) (required)
  - lng: ['null', 'number', 'string'](double) (required)
  - radius: ['integer', 'string'](int32) (required)
  - address: string (required)

**RefreshTokenRequest**
  - refreshToken: string (required)

**RoleFunction**
  - label: string (required)
  - value: ['integer', 'string'](int32) (required)

**StartAuthRequest**
  - name: string (required)
  - email: string (required)
  - facilityId: string(uuid) (required)
  - callbackUrl: string(uri) (required)

**StartAuthResponse**
  - url: string (required)

**StartComponentRequest**
  - accessCode: ['null', 'string']
  - refreshToken: ['null', 'string']
  - facilityId: string(uuid) (required)
  - searchText: ['null', 'string']

**StartComponentResponse**
  - accessToken: string (required)
  - refreshToken: string (required)
  - expiresAt: ['integer', 'string'](int64) (required)
  - rxvantageApiUrl: string (required)
  - defaultFilters: WidgetFilters (required)

**TokenResponse**
  - accessToken: string (required)
  - refreshToken: string (required)
  - expiresAt: ['integer', 'string'](int64) (required)

**UpdateConnectorStatusRequest**
  - status: ConnectorStatus

**WidgetFilters**
  - searchText: ['null', 'string'] (required)
  - roleFunction: RoleFunction (required)
  - location: FilterLocation (required)

