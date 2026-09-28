﻿# Snowdrop.Plans.Search.Api - API Dictionary

Repo: snowdrop-plans-search-be
Source: Snowdrop.Plans.Search.Api.json

## Endpoints

### GET /plans/search
- Tags: Search
- Query params: query: string; includeInactive: boolean; top: ['integer', 'string'](int32); skip: ['integer', 'string'](int32)
- Response 200: SearchResponse

### GET /plans/search/all
- Tags: Search
- Query params: includeInactive: boolean; top: ['integer', 'string'](int32); skip: ['integer', 'string'](int32)
- Response 200: SearchResponse

### POST /plans/search/by-payer-types
- Tags: Search
- Query params: query: string; includeInactive: boolean; top: ['integer', 'string'](int32); skip: ['integer', 'string'](int32)
- Request body: PayerTypesRequest
- Response 200: SearchResponse

## Schemas

**Date**
  - (no properties)

**PayerTypesRequest**
  - payerTypes: ['integer', 'string'](int32)[] (required)

**PlanSearchResult**
  - organizationId: string(uuid)
  - payerId: ['null', 'string'](uuid)
  - payerType: ['null', 'integer', 'string'](int32)
  - payerTypeName: ['null', 'string']
  - planId: string(uuid)
  - planSharpId: ['null', 'string']
  - payerName: ['null', 'string']
  - planName: ['null', 'string']
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - addressCity: ['null', 'string']
  - addressStateId: ['null', 'string'](uuid)
  - addressZipCode: ['null', 'string']
  - keywordsExact: ['null', 'string']
  - keywordsFuzzy: ['null', 'string']
  - isPlanInactive: ['null', 'boolean']
  - isPlanDeleted: ['null', 'boolean']
  - isPayerDeleted: ['null', 'boolean']
  - payerCreated: ['null', 'string'](date-time)
  - planCreated: ['null', 'string'](date-time)
  - policyCount: ['null', 'integer', 'string'](int32)

**SearchHit**
  - score: ['number', 'string'](double) (required)
  - plan: PlanSearchResult

**SearchResponse**
  - totalsHits: ['integer', 'string'](int64)
  - includedHits: ['integer', 'string'](int64)
  - results: SearchHit[] (required)

