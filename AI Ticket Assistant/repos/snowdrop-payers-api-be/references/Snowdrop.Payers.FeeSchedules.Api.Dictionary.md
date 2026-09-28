﻿# Snowdrop.Payers.FeeSchedules.Api - API Dictionary

Repo: snowdrop-payers-api-be
Source: Snowdrop.Payers.FeeSchedules.Api.json

## Endpoints

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: FeeScheduleCreateRequest
- Response 200: FeeScheduleIdResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleResponse

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleUpdateRequest
- Response 200: (no body)

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/Allowed
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleAllowedResponse

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/fees
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleFeesUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/foundation/change-name
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleNameUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/foundation/discard
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/foundation/effective-dates
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleEffectiveUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/foundation/restore
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/insurance/change-name
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleNameUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/insurance/discard
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/insurance/effective-dates
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleEffectiveUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/insurance/restore
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/manufacturer/change-name
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleNameUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/manufacturer/discard
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/manufacturer/effective-dates
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleEffectiveUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/manufacturer/restore
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/name
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleNameResponse

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/otherassistance/change-name
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleNameUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/otherassistance/discard
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/otherassistance/effective-dates
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleEffectiveUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/otherassistance/restore
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/selfpay/change-name
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleNameUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/selfpay/discard
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/selfpay/effective-dates
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleEffectiveUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/selfpay/restore
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/snfs/change-name
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleNameUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/snfs/discard
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/snfs/effective-dates
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Request body: FeeScheduleEffectiveUpdateRequest
- Response 200: (no body)

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/{feeScheduleId}/snfs/restore
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: (no body)

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/by-name
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: FeeScheduleSearchByNameRequest
- Response 200: FeeScheduleSearchByNameResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/export/{feeScheduleId}
- Tags: FeeSchedulesSpreadsheetExport
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleImportResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/export/{feeScheduleId}/{fileName}
- Tags: FeeSchedulesSpreadsheetExport
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required; fileName: string, required
- Response 200: FeeScheduleImportResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/export/foundation/{feeScheduleId}
- Tags: FeeSchedulesSpreadsheetExport
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleImportResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/export/insurance/{feeScheduleId}
- Tags: FeeSchedulesSpreadsheetExport
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleImportResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/export/manufacturer/{feeScheduleId}
- Tags: FeeSchedulesSpreadsheetExport
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleImportResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/export/otherassistance/{feeScheduleId}
- Tags: FeeSchedulesSpreadsheetExport
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleImportResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/export/selfpay/{feeScheduleId}
- Tags: FeeSchedulesSpreadsheetExport
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleImportResponse

### GET /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/export/snfs/{feeScheduleId}
- Tags: FeeSchedulesSpreadsheetExport
- Path params: payerId: string(uuid), required; contractId: string(uuid), required; feeScheduleId: string(uuid), required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/foundation
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: FeeScheduleCreateRequest
- Response 200: FeeScheduleIdResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/import
- Tags: FeeSchedulesSpreadsheetImport
- Path params: payerId: string, required; contractId: string, required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/import/{feeScheduleId}
- Tags: FeeSchedulesSpreadsheetImport
- Path params: payerId: string, required; contractId: string, required; feeScheduleId: string, required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/import/foundation
- Tags: FeeSchedulesSpreadsheetImport
- Path params: payerId: string, required; contractId: string, required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/import/insurance
- Tags: FeeSchedulesSpreadsheetImport
- Path params: payerId: string, required; contractId: string, required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/import/manufacturer
- Tags: FeeSchedulesSpreadsheetImport
- Path params: payerId: string, required; contractId: string, required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/import/otherassistance
- Tags: FeeSchedulesSpreadsheetImport
- Path params: payerId: string, required; contractId: string, required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/import/selfpay
- Tags: FeeSchedulesSpreadsheetImport
- Path params: payerId: string, required; contractId: string, required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/import/snfs
- Tags: FeeSchedulesSpreadsheetImport
- Path params: payerId: string, required; contractId: string, required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/insurance
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: FeeScheduleCreateRequest
- Response 200: FeeScheduleIdResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/manufacturer
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: FeeScheduleCreateRequest
- Response 200: FeeScheduleIdResponse

### PUT /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/order
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: CollectionOrderingRequestBase
- Response 200: (no body)

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/otherassistance
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: FeeScheduleCreateRequest
- Response 200: FeeScheduleIdResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/selfpay
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: FeeScheduleCreateRequest
- Response 200: FeeScheduleIdResponse

### POST /payers/feeschedules/{payerId}/contracts/{contractId}/fee-schedules/snfs
- Tags: FeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Request body: FeeScheduleCreateRequest
- Response 200: FeeScheduleIdResponse

### PUT /payers/feeschedules/charge-fee-schedules/charge-edit
- Tags: ChargeFeeSchedule
- Request body: ChargeFeeScheduleChargeEditRequest
- Response 200: (no body)

### DELETE /payers/feeschedules/charge-fee-schedules/charge-edit
- Tags: ChargeFeeSchedule
- Request body: ChargeFeeScheduleChargeDeleteRequest
- Response 200: (no body)

### POST /payers/feeschedules/charge-fee-schedules/charge-query-expanded
- Tags: ChargeFeeSchedule
- Request body: ChargeFeeScheduleRequest
- Response 200: ChargeFeeScheduleExpandedResponse[]

### POST /payers/feeschedules/charge-fee-schedules/charge-query-schedule
- Tags: ChargeFeeSchedule
- Request body: ChargeFeeScheduleScheduleRequest
- Response 200: ChargeFeeScheduleScheduleResponse[]

### POST /payers/feeschedules/factoryfeeschedules
- Tags: FactoryFeeSchedule
- Request body: FactoryFeeScheduleKeys
- Response 200: FactoryFeeScheduleResponse

### POST /payers/feeschedules/factoryfeeschedules/chargecode-preview
- Tags: FactoryFeeSchedule
- Request body: ChargeCodePreviewRequest
- Response 200: FeeResponse[]

### POST /payers/feeschedules/factoryfeeschedules/criteria
- Tags: FactoryFeeSchedule
- Request body: CrtiteriaRequest
- Response 200: CriteriaResponse[]

### POST /payers/feeschedules/factoryfeeschedules/export/chargecode-preview
- Tags: FactoryFeeScheduleExport
- Request body: ChargeCodePreviewRequest
- Response 200: FeeResponse[]

### GET /payers/feeschedules/fee-schedules/import/template
- Tags: FeeSchedulesTemplate
- Response 200: (no body)

### GET /payers/feeschedules/globalfeeschedules
- Tags: GlobalFeeSchedules
- Response 200: GlobalFeeScheduleSummaryResponse[]

### POST /payers/feeschedules/globalfeeschedules
- Tags: GlobalFeeSchedules
- Request body: AddGlobalFeeScheduleRequest
- Response 200: GlobalFeeSchedule

### PUT /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required
- Request body: UpdateGlobalFeeScheduleRequest
- Response 200: GlobalFeeSchedule

### DELETE /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required
- Response 200: (no body)

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/allowed-schedule
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required
- Request body: AddAllowedScheduleRequest
- Response 200: AllowedSchedule

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/allowed-schedule-from-factory
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required
- Request body: AddAllowedScheduleFromFactoryRequest
- Response 200: AllowedSchedule

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/allowed-schedule-from-factory-subscription
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required
- Request body: AddAllowedScheduleSubscriptionFromFactoryRequest
- Response 200: FactorySubscription

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/clone
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required
- Request body: CloneAllowedScheduleRequest
- Response 200: AllowedSchedule

### PUT /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/restore
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Request body: UpdateAllowedScheduleRequest
- Response 200: (no body)

### DELETE /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Response 200: (no body)

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}/add-amount
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Request body: FeeRequest
- Response 200: (no body)

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}/discard
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Response 200: (no body)

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}/restore
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Response 200: (no body)

### PUT /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}/set-amount
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Request body: FeeRequest
- Response 200: (no body)

### PUT /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}/set-fees
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Request body: FeeRequest[]
- Response 200: (no body)

### GET /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}/workspace/all-charges
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Response 200: AllowedScheduleResponse

### GET /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/schedule/{allowedScheduleId}/workspace/cataloged-charges
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Response 200: AllowedScheduleResponseWithCatalogFilter

### DELETE /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/subscription/{factorySubscriptionId}
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; factorySubscriptionId: string(uuid), required
- Response 200: (no body)

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/subscription/{factorySubscriptionId}/discard
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; factorySubscriptionId: string(uuid), required
- Response 200: (no body)

### POST /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/subscription/{factorySubscriptionId}/restore
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required; factorySubscriptionId: string(uuid), required
- Response 200: (no body)

### GET /payers/feeschedules/globalfeeschedules/{globalFeeScheduleId}/workspace
- Tags: GlobalFeeSchedules
- Path params: globalFeeScheduleId: string(uuid), required
- Response 200: GlobalFeeScheduleResponse

### POST /payers/feeschedules/globalfeeschedules/checkglobalfeeschedulename
- Tags: GlobalFeeSchedules
- Request body: CheckName
- Response 200: boolean

### GET /payers/feeschedules/globalfeeschedules/export/{globalFeeScheduleId}/schedule/{allowedScheduleId}
- Tags: GlobalFeeSchedulesSpreadsheetExport
- Path params: globalFeeScheduleId: string(uuid), required; allowedScheduleId: string(uuid), required
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/globalfeeschedules/import
- Tags: GlobalFeeScheduleSpreadsheetImport
- Response 200: FeeScheduleImportResponse

### POST /payers/feeschedules/globalfeeschedules/sync/{payerId}/{contractId}
- Tags: GlobalFeeSchedules
- Path params: payerId: string(uuid), required; contractId: string(uuid), required
- Response 200: (no body)

### POST /payers/feeschedules/support/sync-global-feeschedules/{organizationId}
- Tags: Support
- Path params: organizationId: string(uuid), required
- Response 200: (no body)

## Schemas

**AddAllowedScheduleFromFactoryRequest**
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - factoryMultiplier: ['number', 'string'](double) (required)
  - factorySource: ['null', 'string'] (required)
  - factoryScheduleType: ['null', 'string'] (required)
  - factoryPeriod: ['null', 'string'] (required)
  - factoryLocality: ['null', 'string'] (required)
  - factoryPricingType: ['null', 'string'] (required)

**AddAllowedScheduleRequest**
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

**AddAllowedScheduleSubscriptionFromFactoryRequest**
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - factoryMultiplier: ['number', 'string'](double) (required)
  - factorySource: ['null', 'string'] (required)
  - factoryScheduleType: ['null', 'string'] (required)
  - factoryLocality: ['null', 'string'] (required)
  - factoryPricingType: ['null', 'string'] (required)

**AddGlobalFeeScheduleRequest**
  - name: ['null', 'string'] (required)
  - scope: ['null', 'string'] (required)

**AllowedSchedule**
  - allowedScheduleId: string(uuid) (required)
  - effectiveStartDate: Date
  - effectiveEndDate: object
  - isFromFactory: boolean
  - factorySubscriptionId: ['null', 'string'](uuid)
  - factoryMultiplier: ['null', 'number', 'string'](double)
  - factorySource: ['null', 'string']
  - factoryScheduleType: ['null', 'string']
  - factoryPeriod: ['null', 'string']
  - factoryLocality: ['null', 'string']
  - factoryPricingType: ['null', 'string']
  - copiedOn: ['null', 'string'](date-time)
  - lastModified: ['null', 'string'](date-time)
  - modifiedBy: ['null', 'string'](uuid)
  - isDiscarded: boolean
  - isDeleted: boolean
  - timeStamp: string(date-time)

**AllowedScheduleResponse**
  - globalFeeSchedule: string(uuid) (required)
  - allowedScheduleId: string(uuid) (required)
  - globalFeeScheduleName: ['null', 'string'] (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - lastModified: ['null', 'string'](date-time) (required)
  - modifiedBy: ['null', 'string'](uuid) (required)
  - numberOfAmounts: ['integer', 'string'](int32) (required)
  - isDiscarded: boolean (required)
  - isFromFactory: boolean (required)
  - factorySubscriptionId: ['null', 'string'](uuid) (required)
  - factoryMultiplier: ['null', 'number', 'string'](double) (required)
  - factorySource: ['null', 'string'] (required)
  - factoryScheduleType: ['null', 'string'] (required)
  - factoryPeriod: ['null', 'string'] (required)
  - factoryLocality: ['null', 'string'] (required)
  - factoryPricingType: ['null', 'string'] (required)
  - copiedOn: ['null', 'string'](date-time) (required)
  - amounts: ['null', 'array'] (required)

**AllowedScheduleResponseWithCatalogFilter**
  - globalFeeSchedule: string(uuid) (required)
  - allowedScheduleId: string(uuid) (required)
  - globalFeeScheduleName: ['null', 'string'] (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - lastModified: ['null', 'string'](date-time) (required)
  - modifiedBy: ['null', 'string'](uuid) (required)
  - numberOfAmounts: ['integer', 'string'](int32) (required)
  - numberWithCatalogCharges: ['integer', 'string'](int32) (required)
  - isDiscarded: boolean (required)
  - isFromFactory: boolean (required)
  - factorySubscriptionId: ['null', 'string'](uuid) (required)
  - factoryMultiplier: ['null', 'number', 'string'](double) (required)
  - factorySource: ['null', 'string'] (required)
  - factoryScheduleType: ['null', 'string'] (required)
  - factoryPeriod: ['null', 'string'] (required)
  - factoryLocality: ['null', 'string'] (required)
  - factoryPricingType: ['null', 'string'] (required)
  - copiedOn: ['null', 'string'](date-time) (required)
  - amounts: ['null', 'array'] (required)

**ChargeCodePreviewRequest**
  - source: ['null', 'string'] (required)
  - scheduleType: ['null', 'string'] (required)
  - period: ['null', 'string'] (required)
  - locality: ['null', 'string'] (required)
  - pricingType: ['null', 'string'] (required)
  - chargeCode: ['null', 'string'] (required)

**ChargeFeeScheduleChargeDeleteRequest**
  - payerId: string(uuid) (required)
  - contractId: string(uuid) (required)
  - feeScheduleId: string(uuid) (required)
  - feeIdentifier: FeeIdentity (required)

**ChargeFeeScheduleChargeEditRequest**
  - payerId: string(uuid) (required)
  - contractId: string(uuid) (required)
  - feeScheduleId: string(uuid) (required)
  - feeIdentifier: FeeIdentity (required)
  - allowedAmount: ['number', 'string'](double) (required)

**ChargeFeeScheduleExpandedResponse**
  - payerId: string(uuid) (required)
  - payerName: ['null', 'string'] (required)
  - contractId: string(uuid) (required)
  - contractName: ['null', 'string'] (required)
  - feeScheduleId: string(uuid) (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)
  - name: ['null', 'string'] (required)
  - feeIdentity: FeeIdentity (required)
  - activityCode: ['null', 'string'] (required)
  - modifier: ['null', 'string'](uuid) (required)
  - ndc: ['null', 'string'] (required)
  - allowedAmount: ['null', 'number', 'string'](double) (required)
  - feeScheduleType: FeeScheduleType (required)

**ChargeFeeScheduleRequest**
  - chargeCode: ['null', 'string'] (required)
  - activityCode: ['null', 'string'] (required)
  - modifier: ['null', 'string'](uuid) (required)
  - ndc: ['null', 'string'] (required)
  - onlyCurrentAndFuture: boolean (required)
  - onlyFromUpload: boolean (required)

**ChargeFeeScheduleScheduleRequest**
  - onlyCurrentAndFuture: boolean (required)
  - onlyFromUpload: boolean (required)

**ChargeFeeScheduleScheduleResponse**
  - payerId: string(uuid) (required)
  - payerName: ['null', 'string'] (required)
  - contractId: string(uuid) (required)
  - contractName: ['null', 'string'] (required)
  - feeScheduleId: string(uuid) (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)
  - name: ['null', 'string'] (required)
  - feeScheduleType: FeeScheduleType (required)

**CheckName**
  - name: ['null', 'string'] (required)

**CloneAllowedScheduleRequest**
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - multiplier: ['number', 'string'](double) (required)
  - globalFeeScheduleId: string(uuid) (required)
  - allowedFeeScheduleId: string(uuid) (required)

**CollectionOrderingRequestBase**
  - order: ['null', 'array']

**CriteriaResponse**
  - source: ['null', 'string'] (required)
  - scheduleType: ['null', 'string'] (required)
  - period: ['null', 'string'] (required)
  - locality: ['null', 'string'] (required)
  - pricingType: ['null', 'string'] (required)

**CrtiteriaRequest**
  - source: ['null', 'string'] (required)
  - scheduleType: ['null', 'string'] (required)
  - period: ['null', 'string'] (required)
  - locality: ['null', 'string'] (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

**Date**
  - (no properties)

**FactoryFeeScheduleKeys**
  - source: ['null', 'string'] (required)
  - scheduleType: ['null', 'string'] (required)
  - period: ['null', 'string'] (required)
  - locality: ['null', 'string'] (required)
  - pricingType: ['null', 'string'] (required)

**FactoryFeeScheduleResponse**
  - source: ['null', 'string'] (required)
  - scheduleType: ['null', 'string'] (required)
  - period: ['null', 'string'] (required)
  - locality: ['null', 'string'] (required)
  - pricingType: ['null', 'string'] (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - fees: ['null', 'array'] (required)

**FactorySubscription**
  - factorySubscriptionId: string(uuid) (required)
  - effectiveStartDate: Date
  - effectiveEndDate: object
  - multiplier: ['number', 'string'](double)
  - source: ['null', 'string']
  - scheduleType: ['null', 'string']
  - locality: ['null', 'string']
  - pricingType: ['null', 'string']
  - lastModified: ['null', 'string'](date-time)
  - modifiedBy: ['null', 'string'](uuid)
  - isDiscarded: boolean
  - isDeleted: boolean
  - timeStamp: string(date-time)

**Fee**
  - feeIdentifier: FeeIdentity
  - allowedAmount: ['number', 'string'](double)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**FeeIdentity**
  - chargeCode: ['null', 'string']
  - modifier: ['null', 'string'](uuid)
  - ndc: ['null', 'string']
  - activityCode: ['null', 'string']

**FeeRequest**
  - chargeCode: ['null', 'string'] (required)
  - modifier: ['null', 'string'](uuid)
  - ndc: ['null', 'string']
  - activityCode: ['null', 'string']
  - allowedAmount: ['number', 'string'](double)
  - isDeleted: ['null', 'boolean']

**FeeResponse**
  - chargeCode: ['null', 'string']
  - modifier: ['null', 'string'](uuid)
  - ndc: ['null', 'string']
  - activityCode: ['null', 'string']
  - allowedAmount: ['number', 'string'](double)

**FeeScheduleAllowedResponse**
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - feeResponse: FeeResponse (required)

**FeeScheduleCreateRequest**
  - name: ['null', 'string']
  - effectiveStartDate: Date
  - effectiveEndDate: object
  - globalFeeScheduleId: ['null', 'string'](uuid)
  - globalFeeScheduleMultiplier: ['null', 'number', 'string'](double)
  - chargeCodeScopeSetId: ['null', 'string'](uuid)
  - fees: ['null', 'array']

**FeeScheduleEffectiveUpdateRequest**
  - effectiveStartDate: Date
  - effectiveEndDate: object

**FeeScheduleFeesUpdateRequest**
  - fees: ['null', 'array']

**FeeScheduleIdResponse**
  - feeScheduleId: string(uuid) (required)

**FeeScheduleImportError**
  - rowNumber: ['null', 'string'] (required)
  - error: ['null', 'string'] (required)

**FeeScheduleImportResponse**
  - feeScheduleId: string(uuid) (required)
  - importId: ['null', 'string'] (required)
  - importedFeeCount: ['integer', 'string'](int32) (required)
  - success: boolean (required)
  - errors: ['null', 'array']

**FeeScheduleNameResponse**
  - contractName: ['null', 'string'] (required)
  - feeScheduleName: ['null', 'string'] (required)

**FeeScheduleNameUpdateRequest**
  - name: ['null', 'string']

**FeeScheduleResponse**
  - feeScheduleId: string(uuid)
  - globalFeeScheduleId: string(uuid)
  - globalFeeScheduleName: ['null', 'string']
  - globalFeeScheduleMultiplier: ['number', 'string'](double)
  - chargeCodeScopeSetId: ['null', 'string'](uuid)
  - name: ['null', 'string']
  - effectiveStartDate: Date
  - effectiveEndDate: object
  - contractEffectiveStartDate: object
  - contractEffectiveEndDate: object
  - fees: ['null', 'array']
  - isDeleted: boolean

**FeeScheduleSearchByNameRequest**
  - name: ['null', 'string']

**FeeScheduleSearchByNameResponse**
  - feeScheduleId: ['null', 'string'](uuid) (required)

**FeeScheduleType**
  - (no properties)

**FeeScheduleUpdateRequest**
  - name: ['null', 'string']
  - effectiveStartDate: Date
  - effectiveEndDate: object
  - globalFeeScheduleId: ['null', 'string'](uuid)
  - globalFeeScheduleMultiplier: ['null', 'number', 'string'](double)
  - chargeCodeScopeSetId: ['null', 'string'](uuid)

**GlobalFeeSchedule**
  - globalFeeScheduleId: string(uuid)
  - name: ['null', 'string']
  - scope: ['null', 'string']
  - allowedSchedules: OrderedCollectionOfGuidAndAllowedSchedule
  - factorySubscriptions: OrderedCollectionOfGuidAndFactorySubscription
  - isDeleted: boolean

**GlobalFeeScheduleResponse**
  - globalFeeScheduleId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - scope: ['null', 'string'] (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)
  - allowedSchedules: ['null', 'array'] (required)
  - subscriptions: ['null', 'array'] (required)
  - linkedContracts: ['null', 'array'] (required)

**GlobalFeeScheduleResponse_AllowedSchedule**
  - allowedScheduleId: string(uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)
  - numberOfAmounts: ['integer', 'string'](int32) (required)
  - isDiscarded: boolean (required)
  - isFromFactory: boolean (required)
  - factorySubscriptionId: ['null', 'string'](uuid) (required)
  - factoryMultiplier: ['null', 'number', 'string'](double) (required)
  - factorySource: ['null', 'string'] (required)
  - factoryScheduleType: ['null', 'string'] (required)
  - factoryPeriod: ['null', 'string'] (required)
  - factoryLocality: ['null', 'string'] (required)
  - factoryPricingType: ['null', 'string'] (required)
  - lastModified: ['null', 'string'](date-time) (required)
  - modifiedBy: ['null', 'string'](uuid) (required)
  - timestamp: string(date-time) (required)

**GlobalFeeScheduleResponse_LinkedContract**
  - contractId: string(uuid) (required)
  - contractName: ['null', 'string'] (required)
  - payerId: string(uuid) (required)
  - payerName: ['null', 'string'] (required)
  - companyId: string(uuid) (required)
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

**GlobalFeeScheduleResponse_Subscription**
  - factorySubscriptionId: string(uuid) (required)
  - factoryMultiplier: ['number', 'string'](double) (required)
  - factorySource: ['null', 'string'] (required)
  - factoryScheduleType: ['null', 'string'] (required)
  - factoryLocality: ['null', 'string'] (required)
  - factoryPricingType: ['null', 'string'] (required)

**GlobalFeeScheduleSummaryResponse**
  - globalFeeScheduleId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - scope: ['null', 'string'] (required)
  - effectiveStartDate: object (required)
  - effectiveEndDate: object (required)

**OrderedCollectionOfGuidAndAllowedSchedule**
  - order: ['null', 'array']
  - collection: ['null', 'object']

**OrderedCollectionOfGuidAndFactorySubscription**
  - order: ['null', 'array']
  - collection: ['null', 'object']

**UpdateAllowedScheduleRequest**
  - effectiveStartDate: Date (required)
  - effectiveEndDate: object (required)

**UpdateGlobalFeeScheduleRequest**
  - name: ['null', 'string'] (required)
  - scope: ['null', 'string'] (required)

