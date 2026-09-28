﻿# Snowdrop.Resources.Ledger.Api - API Dictionary

Repo: snowdrop-resources-be
Source: Snowdrop.Resources.Ledger.Api.json

## Endpoints

### GET /snowdrop/resources/ledger/divisions/{divisionId}
- Tags: Ledger
- Path params: divisionId: string(uuid), required
- Response 200: DivisionLedgersResponse

### PUT /snowdrop/resources/ledger/divisions/{divisionId}
- Tags: Ledger
- Path params: divisionId: string(uuid), required
- Request body: DivisionLedgersPutRequest
- Response 200: DivisionLedgersResponse

## Schemas

**Date**
  - (no properties)

**DivisionLedgersPutRequest**
  - chargeLedger: object
  - paymentLedger: object

**DivisionLedgersResponse**
  - chargeLedger: object
  - paymentLedger: object

**LedgerPutRequest**
  - ledgerDate: Date (required)

**LedgerResponse**
  - ledgerDate: Date
  - closedTimestamp: string(date-time)
  - closedByUserId: string(uuid)

