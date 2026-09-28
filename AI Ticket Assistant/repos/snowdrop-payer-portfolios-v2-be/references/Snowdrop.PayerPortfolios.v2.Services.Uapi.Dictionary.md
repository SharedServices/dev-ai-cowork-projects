﻿# Snowdrop.PayerPortfolios.v2.Services.Uapi - API Dictionary

Repo: snowdrop-payer-portfolios-v2-be
Source: Snowdrop.PayerPortfolios.v2.Services.Uapi.json

## Endpoints

### POST /portfolios
- Tags: Portfolios
- Request body: UapiAddPortfolioRequest
- Response 201: (no body)
- Response 400: ProblemDetails
- Response 409: ProblemDetails
- Response 429: ProblemDetails
- Response 503: (no body)

### GET /portfolios/{portfolioId}
- Tags: Portfolios
- Path params: portfolioId: string(uuid), required
- Response 200: PortfolioAggregate
- Response 404: ProblemDetails
- Response 429: ProblemDetails
- Response 503: (no body)

## Schemas

**Date**
  - (no properties)

**PortfolioAggregate**
  - portfolioId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - portfolioType: PortfolioType (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)
  - orderedPolicies: string(uuid)[] (required)
  - selfPayPayerId: ['null', 'string'](uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorIsPatient: boolean (required)
  - resumeDate: object (required)
  - holdReasonId: ['null', 'string'](uuid) (required)
  - isUnderPermanentHold: boolean (required)
  - parentPortfolioId: ['null', 'string'](uuid) (required)
  - alternatePortfolioTypeId: ['null', 'string'](uuid) (required)
  - isDiscarded: boolean (required)
  - isLocked: boolean (required)
  - removed: boolean (required)

**PortfolioType**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**UapiAddPortfolioRequest**
  - portfolioId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - portfolioType: PortfolioType (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - orderedPolicies: ['null', 'array'] (required)
  - selfPayPayerId: ['null', 'string'](uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - guarantorIsPatient: boolean (required)
  - runId: string(uuid) (required)
  - actionId: string(uuid) (required)

