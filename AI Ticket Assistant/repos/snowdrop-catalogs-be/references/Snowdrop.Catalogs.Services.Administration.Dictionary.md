﻿# Snowdrop.Catalogs.Services.Administration - API Dictionary

Repo: snowdrop-catalogs-be
Source: Snowdrop.Catalogs.Services.Administration.json

## Endpoints

### PUT /
- Tags: Custom
- Request body: string
- Response 204: (no body)

### POST /{catalogId}/addelement
- Tags: Custom
- Path params: catalogId: string(uuid), required
- Response 200: string

### PUT /00001122-6D60-46DA-9527-001122334455
- Tags: NationalDrugCodes
- Request body: UpdateNationalDrugCodeRequest
- Response 200: NationalDrugCodeElement
- Response 404: ProblemDetails

### GET /00001122-6D60-46DA-9527-001122334455
- Tags: NationalDrugCodes
- Response 200: CatalogHeader

### PUT /00001122-6D60-46DA-9527-001122334455/factory/connect/{name}
- Tags: NationalDrugCodes
- Path params: name: string, required
- Response 200: NationalDrugCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /00001122-6D60-46DA-9527-001122334455/factory/disconnect/{name}
- Tags: NationalDrugCodes
- Path params: name: string, required
- Response 200: NationalDrugCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /00001122-6D60-46DA-9527-001122334455/factory/import
- Tags: NationalDrugCodes
- Request body: FactoryImportCodesCriteria
- Response 200: (no body)

### POST /00001122-6D60-46DA-9527-001122334455/factory/import/element
- Tags: NationalDrugCodes
- Request body: FactorySyncRequest
- Response 200: NationalDrugCodeElement

### POST /00001122-6D60-46DA-9527-001122334455/factory/import/updates
- Tags: NationalDrugCodes
- Response 200: (no body)

### GET /00001122-6D60-46DA-9527-001122334455/factory/query
- Tags: NationalDrugCodes
- Response 200: FactoryUpdateSummary

### POST /00001122-6D60-46DA-9527-001122334455/factory/search
- Tags: NationalDrugCodes
- Request body: NationalDrugCodeFactorySearchCriteria
- Response 200: NationalDrugCodeFactoryResult[]

### POST /00001122-6D60-46DA-9527-001122334455/factory/sync
- Tags: NationalDrugCodes
- Query params: force: boolean
- Response 200: FactorySyncResponse

### POST /00001122-6D60-46DA-9527-001122334455/factory/sync/{name}
- Tags: NationalDrugCodes
- Path params: name: string, required
- Response 200: NationalDrugCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /00001122-6D60-46DA-9527-001122334455/factory/updates
- Tags: NationalDrugCodes
- Response 200: FactoryUpdatesResult

### PUT /00AA3E98-BCF7-4460-AB06-9751827361CA
- Tags: DiagnosisCodes
- Request body: UpdateDiagnosisCodeRequest
- Response 200: DiagnosisCodeElement
- Response 404: ProblemDetails

### GET /00AA3E98-BCF7-4460-AB06-9751827361CA
- Tags: DiagnosisCodes
- Response 200: CatalogHeader

### PUT /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/connect/{code}/{icdCodeType}
- Tags: DiagnosisCodes
- Path params: code: string, required; icdCodeType: IcdCodeType, required
- Response 200: DiagnosisCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/disconnect/{code}/{icdCodeType}
- Tags: DiagnosisCodes
- Path params: code: string, required; icdCodeType: IcdCodeType, required
- Response 200: DiagnosisCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/import
- Tags: DiagnosisCodes
- Request body: IcdFactoryImportCodesCriteria
- Response 200: (no body)

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/import/element
- Tags: DiagnosisCodes
- Request body: IcdFactorySyncRequest
- Response 200: DiagnosisCodeElement

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/import/updates
- Tags: DiagnosisCodes
- Response 200: (no body)

### GET /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/query
- Tags: DiagnosisCodes
- Response 200: FactoryUpdateSummary

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/search
- Tags: DiagnosisCodes
- Request body: DiagnosisCodeFactorySearchCriteria
- Response 200: DiagnosisCodeFactoryResult[]

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/sync
- Tags: DiagnosisCodes
- Query params: force: boolean
- Response 200: FactorySyncResponse

### POST /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/sync/{code}/{icdCodeType}
- Tags: DiagnosisCodes
- Path params: code: string, required; icdCodeType: IcdCodeType, required
- Response 200: DiagnosisCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /00AA3E98-BCF7-4460-AB06-9751827361CA/factory/updates
- Tags: DiagnosisCodes
- Response 200: FactoryUpdatesResult

### PUT /01f21420-1d75-4923-8952-63a7720ee78e
- Tags: InterventionProgresses
- Response 204: (no body)

### GET /01f21420-1d75-4923-8952-63a7720ee78e
- Tags: InterventionProgresses
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /01f21420-1d75-4923-8952-63a7720ee78e/elements
- Tags: InterventionProgresses
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /01f21420-1d75-4923-8952-63a7720ee78e/elements/{elementId}
- Tags: InterventionProgresses
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /01f21420-1d75-4923-8952-63a7720ee78e/elements/{elementId}
- Tags: InterventionProgresses
- Path params: elementId: string(uuid), required
- Request body: InterventionProgressElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /01f21420-1d75-4923-8952-63a7720ee78e/elements/{elementId}/replace
- Tags: InterventionProgresses
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /01f21420-1d75-4923-8952-63a7720ee78e/elements/add
- Tags: InterventionProgresses
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /01f21420-1d75-4923-8952-63a7720ee78e/elements/duplicate-check
- Tags: InterventionProgresses
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /01f21420-1d75-4923-8952-63a7720ee78e/factory/connect/{elementId}
- Tags: InterventionProgresses
- Path params: elementId: string(uuid), required
- Response 200: InterventionProgressElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /01f21420-1d75-4923-8952-63a7720ee78e/factory/disconnect/{elementId}
- Tags: InterventionProgresses
- Path params: elementId: string(uuid), required
- Response 200: InterventionProgressElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /01f21420-1d75-4923-8952-63a7720ee78e/factory/query
- Tags: InterventionProgresses
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /01f21420-1d75-4923-8952-63a7720ee78e/factory/sync
- Tags: InterventionProgresses
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /01f21420-1d75-4923-8952-63a7720ee78e/factory/sync/{elementId}
- Tags: InterventionProgresses
- Path params: elementId: string(uuid), required
- Response 200: InterventionProgressElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /0387b849-505b-4f37-8e1d-473e0d71c3a3
- Tags: ArrivalStatuses
- Response 204: (no body)

### GET /0387b849-505b-4f37-8e1d-473e0d71c3a3
- Tags: ArrivalStatuses
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /0387b849-505b-4f37-8e1d-473e0d71c3a3/elements
- Tags: ArrivalStatuses
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /0387b849-505b-4f37-8e1d-473e0d71c3a3/elements/{elementId}
- Tags: ArrivalStatuses
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /0387b849-505b-4f37-8e1d-473e0d71c3a3/elements/{elementId}
- Tags: ArrivalStatuses
- Path params: elementId: string(uuid), required
- Request body: UpdateArrivalStatusRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /0387b849-505b-4f37-8e1d-473e0d71c3a3/elements/{elementId}/replace
- Tags: ArrivalStatuses
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /0387b849-505b-4f37-8e1d-473e0d71c3a3/elements/add
- Tags: ArrivalStatuses
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /0387b849-505b-4f37-8e1d-473e0d71c3a3/elements/duplicate-check
- Tags: ArrivalStatuses
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /0387b849-505b-4f37-8e1d-473e0d71c3a3/factory/connect/{elementId}
- Tags: ArrivalStatuses
- Path params: elementId: string(uuid), required
- Response 200: ArrivalStatusElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /0387b849-505b-4f37-8e1d-473e0d71c3a3/factory/disconnect/{elementId}
- Tags: ArrivalStatuses
- Path params: elementId: string(uuid), required
- Response 200: ArrivalStatusElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /0387b849-505b-4f37-8e1d-473e0d71c3a3/factory/query
- Tags: ArrivalStatuses
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /0387b849-505b-4f37-8e1d-473e0d71c3a3/factory/sync
- Tags: ArrivalStatuses
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /0387b849-505b-4f37-8e1d-473e0d71c3a3/factory/sync/{elementId}
- Tags: ArrivalStatuses
- Path params: elementId: string(uuid), required
- Response 200: ArrivalStatusElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /050cc506-ff9d-4438-8819-f796c788aa22
- Tags: Pronouns
- Response 204: (no body)

### GET /050cc506-ff9d-4438-8819-f796c788aa22
- Tags: Pronouns
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /050cc506-ff9d-4438-8819-f796c788aa22/elements
- Tags: Pronouns
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /050cc506-ff9d-4438-8819-f796c788aa22/elements/{elementId}
- Tags: Pronouns
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /050cc506-ff9d-4438-8819-f796c788aa22/elements/{elementId}
- Tags: Pronouns
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /050cc506-ff9d-4438-8819-f796c788aa22/elements/{elementId}/replace
- Tags: Pronouns
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /050cc506-ff9d-4438-8819-f796c788aa22/elements/add
- Tags: Pronouns
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /050cc506-ff9d-4438-8819-f796c788aa22/elements/duplicate-check
- Tags: Pronouns
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /050cc506-ff9d-4438-8819-f796c788aa22/factory/connect/{elementId}
- Tags: Pronouns
- Path params: elementId: string(uuid), required
- Response 200: PronounElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /050cc506-ff9d-4438-8819-f796c788aa22/factory/disconnect/{elementId}
- Tags: Pronouns
- Path params: elementId: string(uuid), required
- Response 200: PronounElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /050cc506-ff9d-4438-8819-f796c788aa22/factory/query
- Tags: Pronouns
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /050cc506-ff9d-4438-8819-f796c788aa22/factory/sync
- Tags: Pronouns
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /050cc506-ff9d-4438-8819-f796c788aa22/factory/sync/{elementId}
- Tags: Pronouns
- Path params: elementId: string(uuid), required
- Response 200: PronounElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /080bf638-8e7f-462d-bdda-69748ab82319
- Tags: GenderIdentities
- Response 204: (no body)

### GET /080bf638-8e7f-462d-bdda-69748ab82319
- Tags: GenderIdentities
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /080bf638-8e7f-462d-bdda-69748ab82319/elements
- Tags: GenderIdentities
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /080bf638-8e7f-462d-bdda-69748ab82319/elements/{elementId}
- Tags: GenderIdentities
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /080bf638-8e7f-462d-bdda-69748ab82319/elements/{elementId}
- Tags: GenderIdentities
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /080bf638-8e7f-462d-bdda-69748ab82319/elements/{elementId}/replace
- Tags: GenderIdentities
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /080bf638-8e7f-462d-bdda-69748ab82319/elements/add
- Tags: GenderIdentities
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /080bf638-8e7f-462d-bdda-69748ab82319/elements/duplicate-check
- Tags: GenderIdentities
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /080bf638-8e7f-462d-bdda-69748ab82319/factory/connect/{elementId}
- Tags: GenderIdentities
- Path params: elementId: string(uuid), required
- Response 200: GenderIdentityElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /080bf638-8e7f-462d-bdda-69748ab82319/factory/disconnect/{elementId}
- Tags: GenderIdentities
- Path params: elementId: string(uuid), required
- Response 200: GenderIdentityElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /080bf638-8e7f-462d-bdda-69748ab82319/factory/query
- Tags: GenderIdentities
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /080bf638-8e7f-462d-bdda-69748ab82319/factory/sync
- Tags: GenderIdentities
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /080bf638-8e7f-462d-bdda-69748ab82319/factory/sync/{elementId}
- Tags: GenderIdentities
- Path params: elementId: string(uuid), required
- Response 200: GenderIdentityElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /08853be8-348a-4d36-a1b1-e8714dd5de1c
- Tags: PlanTypes
- Response 204: (no body)

### GET /08853be8-348a-4d36-a1b1-e8714dd5de1c
- Tags: PlanTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /08853be8-348a-4d36-a1b1-e8714dd5de1c/elements
- Tags: PlanTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /08853be8-348a-4d36-a1b1-e8714dd5de1c/elements/{elementId}
- Tags: PlanTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /08853be8-348a-4d36-a1b1-e8714dd5de1c/elements/{elementId}
- Tags: PlanTypes
- Path params: elementId: string(uuid), required
- Request body: UpdatePlanTypeRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /08853be8-348a-4d36-a1b1-e8714dd5de1c/elements/{elementId}/replace
- Tags: PlanTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /08853be8-348a-4d36-a1b1-e8714dd5de1c/elements/add
- Tags: PlanTypes
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /08853be8-348a-4d36-a1b1-e8714dd5de1c/elements/duplicate-check
- Tags: PlanTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /08853be8-348a-4d36-a1b1-e8714dd5de1c/factory/connect/{elementId}
- Tags: PlanTypes
- Path params: elementId: string(uuid), required
- Response 200: PlanTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /08853be8-348a-4d36-a1b1-e8714dd5de1c/factory/disconnect/{elementId}
- Tags: PlanTypes
- Path params: elementId: string(uuid), required
- Response 200: PlanTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /08853be8-348a-4d36-a1b1-e8714dd5de1c/factory/query
- Tags: PlanTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /08853be8-348a-4d36-a1b1-e8714dd5de1c/factory/sync
- Tags: PlanTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /08853be8-348a-4d36-a1b1-e8714dd5de1c/factory/sync/{elementId}
- Tags: PlanTypes
- Path params: elementId: string(uuid), required
- Response 200: PlanTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E
- Tags: AppointmentCancellationReasons
- Response 204: (no body)

### GET /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E
- Tags: AppointmentCancellationReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/elements
- Tags: AppointmentCancellationReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/elements/{elementId}
- Tags: AppointmentCancellationReasons
- Path params: elementId: string(uuid), required
- Request body: AppointmentCancellationReasonElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/elements/{elementId}
- Tags: AppointmentCancellationReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/elements/{elementId}/replace
- Tags: AppointmentCancellationReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/elements/add
- Tags: AppointmentCancellationReasons
- Request body: AppointmentCancellationReasonElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/elements/duplicate-check
- Tags: AppointmentCancellationReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/factory/connect/{elementId}
- Tags: AppointmentCancellationReasons
- Path params: elementId: string(uuid), required
- Response 200: AppointmentCancellationReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/factory/disconnect/{elementId}
- Tags: AppointmentCancellationReasons
- Path params: elementId: string(uuid), required
- Response 200: AppointmentCancellationReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/factory/query
- Tags: AppointmentCancellationReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/factory/sync
- Tags: AppointmentCancellationReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /08F7A6CA-7F32-4E98-B3F8-3DC8D1B8027E/factory/sync/{elementId}
- Tags: AppointmentCancellationReasons
- Path params: elementId: string(uuid), required
- Response 200: AppointmentCancellationReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /0a324885-007c-4c3a-94c0-5bf72d8db1a4
- Tags: PatientRelationships
- Response 204: (no body)

### GET /0a324885-007c-4c3a-94c0-5bf72d8db1a4
- Tags: PatientRelationships
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /0a324885-007c-4c3a-94c0-5bf72d8db1a4/elements
- Tags: PatientRelationships
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /0a324885-007c-4c3a-94c0-5bf72d8db1a4/elements/{elementId}
- Tags: PatientRelationships
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /0a324885-007c-4c3a-94c0-5bf72d8db1a4/elements/{elementId}
- Tags: PatientRelationships
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /0a324885-007c-4c3a-94c0-5bf72d8db1a4/elements/{elementId}/replace
- Tags: PatientRelationships
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /0a324885-007c-4c3a-94c0-5bf72d8db1a4/elements/add
- Tags: PatientRelationships
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /0a324885-007c-4c3a-94c0-5bf72d8db1a4/elements/duplicate-check
- Tags: PatientRelationships
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /0a324885-007c-4c3a-94c0-5bf72d8db1a4/factory/connect/{elementId}
- Tags: PatientRelationships
- Path params: elementId: string(uuid), required
- Response 200: PatientRelationshipElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /0a324885-007c-4c3a-94c0-5bf72d8db1a4/factory/disconnect/{elementId}
- Tags: PatientRelationships
- Path params: elementId: string(uuid), required
- Response 200: PatientRelationshipElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /0a324885-007c-4c3a-94c0-5bf72d8db1a4/factory/query
- Tags: PatientRelationships
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /0a324885-007c-4c3a-94c0-5bf72d8db1a4/factory/sync
- Tags: PatientRelationships
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /0a324885-007c-4c3a-94c0-5bf72d8db1a4/factory/sync/{elementId}
- Tags: PatientRelationships
- Path params: elementId: string(uuid), required
- Response 200: PatientRelationshipElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /0B0E3304-824B-41D4-AA6C-6445A5D13D95
- Tags: NoncontractualAdjustmentReasons
- Response 204: (no body)

### GET /0B0E3304-824B-41D4-AA6C-6445A5D13D95
- Tags: NoncontractualAdjustmentReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /0B0E3304-824B-41D4-AA6C-6445A5D13D95/elements
- Tags: NoncontractualAdjustmentReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /0B0E3304-824B-41D4-AA6C-6445A5D13D95/elements/{elementId}
- Tags: NoncontractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /0B0E3304-824B-41D4-AA6C-6445A5D13D95/elements/{elementId}
- Tags: NoncontractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Request body: NoncontractualAdjustmentReasonUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /0B0E3304-824B-41D4-AA6C-6445A5D13D95/elements/{elementId}/replace
- Tags: NoncontractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /0B0E3304-824B-41D4-AA6C-6445A5D13D95/elements/add
- Tags: NoncontractualAdjustmentReasons
- Request body: NoncontractualAdjustmentReasonAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /0B0E3304-824B-41D4-AA6C-6445A5D13D95/elements/duplicate-check
- Tags: NoncontractualAdjustmentReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /0B0E3304-824B-41D4-AA6C-6445A5D13D95/factory/connect/{elementId}
- Tags: NoncontractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: NoncontractualAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /0B0E3304-824B-41D4-AA6C-6445A5D13D95/factory/disconnect/{elementId}
- Tags: NoncontractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: NoncontractualAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /0B0E3304-824B-41D4-AA6C-6445A5D13D95/factory/query
- Tags: NoncontractualAdjustmentReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /0B0E3304-824B-41D4-AA6C-6445A5D13D95/factory/sync
- Tags: NoncontractualAdjustmentReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /0B0E3304-824B-41D4-AA6C-6445A5D13D95/factory/sync/{elementId}
- Tags: NoncontractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: NoncontractualAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1
- Tags: WebsiteTypes
- Response 204: (no body)

### GET /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1
- Tags: WebsiteTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/elements
- Tags: WebsiteTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/elements/{elementId}
- Tags: WebsiteTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/elements/{elementId}
- Tags: WebsiteTypes
- Path params: elementId: string(uuid), required
- Request body: WebsiteTypeUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/elements/{elementId}/replace
- Tags: WebsiteTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/elements/add
- Tags: WebsiteTypes
- Request body: WebsiteTypeAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/elements/duplicate-check
- Tags: WebsiteTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/factory/connect/{elementId}
- Tags: WebsiteTypes
- Path params: elementId: string(uuid), required
- Response 200: WebsiteTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/factory/disconnect/{elementId}
- Tags: WebsiteTypes
- Path params: elementId: string(uuid), required
- Response 200: WebsiteTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/factory/query
- Tags: WebsiteTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/factory/sync
- Tags: WebsiteTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /0F7F0AA3-9A55-4D25-8A9B-CE492F0A60E1/factory/sync/{elementId}
- Tags: WebsiteTypes
- Path params: elementId: string(uuid), required
- Response 200: WebsiteTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /132fcafc-f31b-4f2f-ba39-80ae03554180
- Tags: OverbookReasons
- Response 204: (no body)

### GET /132fcafc-f31b-4f2f-ba39-80ae03554180
- Tags: OverbookReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /132fcafc-f31b-4f2f-ba39-80ae03554180/elements
- Tags: OverbookReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /132fcafc-f31b-4f2f-ba39-80ae03554180/elements/{elementId}
- Tags: OverbookReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /132fcafc-f31b-4f2f-ba39-80ae03554180/elements/{elementId}
- Tags: OverbookReasons
- Path params: elementId: string(uuid), required
- Request body: OverbookReasonUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /132fcafc-f31b-4f2f-ba39-80ae03554180/elements/{elementId}/replace
- Tags: OverbookReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /132fcafc-f31b-4f2f-ba39-80ae03554180/elements/add
- Tags: OverbookReasons
- Request body: OverbookReasonAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /132fcafc-f31b-4f2f-ba39-80ae03554180/elements/duplicate-check
- Tags: OverbookReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /132fcafc-f31b-4f2f-ba39-80ae03554180/factory/connect/{elementId}
- Tags: OverbookReasons
- Path params: elementId: string(uuid), required
- Response 200: OverbookReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /132fcafc-f31b-4f2f-ba39-80ae03554180/factory/disconnect/{elementId}
- Tags: OverbookReasons
- Path params: elementId: string(uuid), required
- Response 200: OverbookReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /132fcafc-f31b-4f2f-ba39-80ae03554180/factory/query
- Tags: OverbookReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /132fcafc-f31b-4f2f-ba39-80ae03554180/factory/sync
- Tags: OverbookReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /132fcafc-f31b-4f2f-ba39-80ae03554180/factory/sync/{elementId}
- Tags: OverbookReasons
- Path params: elementId: string(uuid), required
- Response 200: OverbookReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /1BC4297B-3093-482E-88F7-664F2442B21C
- Tags: ProviderLevelAdjustmentReasons
- Response 204: (no body)

### GET /1BC4297B-3093-482E-88F7-664F2442B21C
- Tags: ProviderLevelAdjustmentReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /1BC4297B-3093-482E-88F7-664F2442B21C/elements
- Tags: ProviderLevelAdjustmentReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /1BC4297B-3093-482E-88F7-664F2442B21C/elements/{elementId}
- Tags: ProviderLevelAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /1BC4297B-3093-482E-88F7-664F2442B21C/elements/{elementId}
- Tags: ProviderLevelAdjustmentReasons
- Path params: elementId: string(uuid), required
- Request body: ProviderLevelAdjustmentReasonsElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /1BC4297B-3093-482E-88F7-664F2442B21C/elements/{elementId}/replace
- Tags: ProviderLevelAdjustmentReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /1BC4297B-3093-482E-88F7-664F2442B21C/elements/add
- Tags: ProviderLevelAdjustmentReasons
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /1BC4297B-3093-482E-88F7-664F2442B21C/elements/duplicate-check
- Tags: ProviderLevelAdjustmentReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /1BC4297B-3093-482E-88F7-664F2442B21C/factory/connect/{elementId}
- Tags: ProviderLevelAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ProviderLevelAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /1BC4297B-3093-482E-88F7-664F2442B21C/factory/disconnect/{elementId}
- Tags: ProviderLevelAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ProviderLevelAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /1BC4297B-3093-482E-88F7-664F2442B21C/factory/query
- Tags: ProviderLevelAdjustmentReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /1BC4297B-3093-482E-88F7-664F2442B21C/factory/sync
- Tags: ProviderLevelAdjustmentReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /1BC4297B-3093-482E-88F7-664F2442B21C/factory/sync/{elementId}
- Tags: ProviderLevelAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ProviderLevelAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /1DE676A3-1B4F-442C-9C12-54CE6C182C0F
- Tags: VoidReasons
- Response 204: (no body)

### GET /1DE676A3-1B4F-442C-9C12-54CE6C182C0F
- Tags: VoidReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/elements
- Tags: VoidReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/elements/{elementId}
- Tags: VoidReasons
- Path params: elementId: string(uuid), required
- Request body: VoidReasonElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/elements/{elementId}
- Tags: VoidReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/elements/{elementId}/replace
- Tags: VoidReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/elements/add
- Tags: VoidReasons
- Request body: VoidReasonElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/elements/duplicate-check
- Tags: VoidReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/factory/connect/{elementId}
- Tags: VoidReasons
- Path params: elementId: string(uuid), required
- Response 200: VoidReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/factory/disconnect/{elementId}
- Tags: VoidReasons
- Path params: elementId: string(uuid), required
- Response 200: VoidReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/factory/query
- Tags: VoidReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/factory/sync
- Tags: VoidReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /1DE676A3-1B4F-442C-9C12-54CE6C182C0F/factory/sync/{elementId}
- Tags: VoidReasons
- Path params: elementId: string(uuid), required
- Response 200: VoidReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8
- Tags: PrivacyPolicies
- Response 204: (no body)

### GET /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8
- Tags: PrivacyPolicies
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/elements
- Tags: PrivacyPolicies
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/elements/{elementId}
- Tags: PrivacyPolicies
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/elements/{elementId}
- Tags: PrivacyPolicies
- Path params: elementId: string(uuid), required
- Request body: PrivacyPolicyUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/elements/{elementId}/replace
- Tags: PrivacyPolicies
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/elements/add
- Tags: PrivacyPolicies
- Request body: PrivacyPolicyAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/elements/duplicate-check
- Tags: PrivacyPolicies
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/factory/connect/{elementId}
- Tags: PrivacyPolicies
- Path params: elementId: string(uuid), required
- Response 200: PrivacyPolicyElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/factory/disconnect/{elementId}
- Tags: PrivacyPolicies
- Path params: elementId: string(uuid), required
- Response 200: PrivacyPolicyElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/factory/query
- Tags: PrivacyPolicies
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/factory/sync
- Tags: PrivacyPolicies
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /1fdfff4d-0bf2-42ab-8f39-d3059e8ffae8/factory/sync/{elementId}
- Tags: PrivacyPolicies
- Path params: elementId: string(uuid), required
- Response 200: PrivacyPolicyElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /260c0395-0578-48d2-84b3-15d6de9b7877
- Tags: InterventionTypes
- Response 204: (no body)

### GET /260c0395-0578-48d2-84b3-15d6de9b7877
- Tags: InterventionTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /260c0395-0578-48d2-84b3-15d6de9b7877/elements
- Tags: InterventionTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /260c0395-0578-48d2-84b3-15d6de9b7877/elements/{elementId}
- Tags: InterventionTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /260c0395-0578-48d2-84b3-15d6de9b7877/elements/{elementId}
- Tags: InterventionTypes
- Path params: elementId: string(uuid), required
- Request body: InterventionTypesElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /260c0395-0578-48d2-84b3-15d6de9b7877/elements/{elementId}/replace
- Tags: InterventionTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /260c0395-0578-48d2-84b3-15d6de9b7877/elements/add
- Tags: InterventionTypes
- Request body: InterventionTypesElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /260c0395-0578-48d2-84b3-15d6de9b7877/elements/duplicate-check
- Tags: InterventionTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /260c0395-0578-48d2-84b3-15d6de9b7877/factory/connect/{elementId}
- Tags: InterventionTypes
- Path params: elementId: string(uuid), required
- Response 200: InterventionTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /260c0395-0578-48d2-84b3-15d6de9b7877/factory/disconnect/{elementId}
- Tags: InterventionTypes
- Path params: elementId: string(uuid), required
- Response 200: InterventionTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /260c0395-0578-48d2-84b3-15d6de9b7877/factory/query
- Tags: InterventionTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /260c0395-0578-48d2-84b3-15d6de9b7877/factory/sync
- Tags: InterventionTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /260c0395-0578-48d2-84b3-15d6de9b7877/factory/sync/{elementId}
- Tags: InterventionTypes
- Path params: elementId: string(uuid), required
- Response 200: InterventionTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /263C2E27-68AA-4A0E-8D4F-374264767756
- Tags: AlternatePortfolioTypes
- Response 204: (no body)

### GET /263C2E27-68AA-4A0E-8D4F-374264767756
- Tags: AlternatePortfolioTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /263C2E27-68AA-4A0E-8D4F-374264767756/elements
- Tags: AlternatePortfolioTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /263C2E27-68AA-4A0E-8D4F-374264767756/elements/{elementId}
- Tags: AlternatePortfolioTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /263C2E27-68AA-4A0E-8D4F-374264767756/elements/{elementId}
- Tags: AlternatePortfolioTypes
- Path params: elementId: string(uuid), required
- Request body: AlternatePortfolioTypeUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /263C2E27-68AA-4A0E-8D4F-374264767756/elements/{elementId}/replace
- Tags: AlternatePortfolioTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /263C2E27-68AA-4A0E-8D4F-374264767756/elements/add
- Tags: AlternatePortfolioTypes
- Request body: AlternatePortfolioTypeAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /263C2E27-68AA-4A0E-8D4F-374264767756/elements/duplicate-check
- Tags: AlternatePortfolioTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /263C2E27-68AA-4A0E-8D4F-374264767756/factory/connect/{elementId}
- Tags: AlternatePortfolioTypes
- Path params: elementId: string(uuid), required
- Response 200: AlternatePortfolioTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /263C2E27-68AA-4A0E-8D4F-374264767756/factory/disconnect/{elementId}
- Tags: AlternatePortfolioTypes
- Path params: elementId: string(uuid), required
- Response 200: AlternatePortfolioTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /263C2E27-68AA-4A0E-8D4F-374264767756/factory/query
- Tags: AlternatePortfolioTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /263C2E27-68AA-4A0E-8D4F-374264767756/factory/sync
- Tags: AlternatePortfolioTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /263C2E27-68AA-4A0E-8D4F-374264767756/factory/sync/{elementId}
- Tags: AlternatePortfolioTypes
- Path params: elementId: string(uuid), required
- Response 200: AlternatePortfolioTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /2752155b-6697-44be-8cce-86112eae4fcd
- Tags: ClinicalAccessLevels
- Response 204: (no body)

### GET /2752155b-6697-44be-8cce-86112eae4fcd
- Tags: ClinicalAccessLevels
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /2752155b-6697-44be-8cce-86112eae4fcd/elements
- Tags: ClinicalAccessLevels
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /2752155b-6697-44be-8cce-86112eae4fcd/elements/{elementId}
- Tags: ClinicalAccessLevels
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /2752155b-6697-44be-8cce-86112eae4fcd/elements/{elementId}
- Tags: ClinicalAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /2752155b-6697-44be-8cce-86112eae4fcd/elements/{elementId}/replace
- Tags: ClinicalAccessLevels
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /2752155b-6697-44be-8cce-86112eae4fcd/elements/add
- Tags: ClinicalAccessLevels
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /2752155b-6697-44be-8cce-86112eae4fcd/elements/duplicate-check
- Tags: ClinicalAccessLevels
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /2752155b-6697-44be-8cce-86112eae4fcd/factory/connect/{elementId}
- Tags: ClinicalAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: ClinicalAccessLevelElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /2752155b-6697-44be-8cce-86112eae4fcd/factory/disconnect/{elementId}
- Tags: ClinicalAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: ClinicalAccessLevelElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /2752155b-6697-44be-8cce-86112eae4fcd/factory/query
- Tags: ClinicalAccessLevels
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /2752155b-6697-44be-8cce-86112eae4fcd/factory/sync
- Tags: ClinicalAccessLevels
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /2752155b-6697-44be-8cce-86112eae4fcd/factory/sync/{elementId}
- Tags: ClinicalAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: ClinicalAccessLevelElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622
- Tags: RemarkCodes
- Response 204: (no body)

### GET /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622
- Tags: RemarkCodes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/elements
- Tags: RemarkCodes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/elements/{elementId}
- Tags: RemarkCodes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/elements/{elementId}
- Tags: RemarkCodes
- Path params: elementId: string(uuid), required
- Request body: RemarkCodesElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/elements/{elementId}/replace
- Tags: RemarkCodes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/elements/add
- Tags: RemarkCodes
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/elements/duplicate-check
- Tags: RemarkCodes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/factory/connect/{elementId}
- Tags: RemarkCodes
- Path params: elementId: string(uuid), required
- Response 200: RemarkCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/factory/disconnect/{elementId}
- Tags: RemarkCodes
- Path params: elementId: string(uuid), required
- Response 200: RemarkCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/factory/query
- Tags: RemarkCodes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/factory/sync
- Tags: RemarkCodes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /27CDDA49-DDBC-4E20-9C57-0CEE3A6CB622/factory/sync/{elementId}
- Tags: RemarkCodes
- Path params: elementId: string(uuid), required
- Response 200: RemarkCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14
- Tags: Extensions
- Response 204: (no body)

### GET /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14
- Tags: Extensions
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/elements
- Tags: Extensions
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/elements/{elementId}
- Tags: Extensions
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/elements/{elementId}
- Tags: Extensions
- Path params: elementId: string(uuid), required
- Request body: ExtensionUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/elements/{elementId}/replace
- Tags: Extensions
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/elements/add
- Tags: Extensions
- Request body: ExtensionAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/elements/duplicate-check
- Tags: Extensions
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/factory/connect/{elementId}
- Tags: Extensions
- Path params: elementId: string(uuid), required
- Response 200: ExtensionElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/factory/disconnect/{elementId}
- Tags: Extensions
- Path params: elementId: string(uuid), required
- Response 200: ExtensionElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/factory/query
- Tags: Extensions
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/factory/sync
- Tags: Extensions
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /2CAA9FB1-9426-4F0E-8E3E-1C2FE2CDFC14/factory/sync/{elementId}
- Tags: Extensions
- Path params: elementId: string(uuid), required
- Response 200: ExtensionElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /32851526-0ceb-4c50-8584-b28aa2cbcd25
- Tags: DocumentTypes
- Response 204: (no body)

### GET /32851526-0ceb-4c50-8584-b28aa2cbcd25
- Tags: DocumentTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /32851526-0ceb-4c50-8584-b28aa2cbcd25/elements
- Tags: DocumentTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /32851526-0ceb-4c50-8584-b28aa2cbcd25/elements/{elementId}
- Tags: DocumentTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /32851526-0ceb-4c50-8584-b28aa2cbcd25/elements/{elementId}
- Tags: DocumentTypes
- Path params: elementId: string(uuid), required
- Request body: UpdateDocumentTypeElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /32851526-0ceb-4c50-8584-b28aa2cbcd25/elements/{elementId}/replace
- Tags: DocumentTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /32851526-0ceb-4c50-8584-b28aa2cbcd25/elements/add
- Tags: DocumentTypes
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /32851526-0ceb-4c50-8584-b28aa2cbcd25/elements/duplicate-check
- Tags: DocumentTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /32851526-0ceb-4c50-8584-b28aa2cbcd25/factory/connect/{elementId}
- Tags: DocumentTypes
- Path params: elementId: string(uuid), required
- Response 200: DocumentTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /32851526-0ceb-4c50-8584-b28aa2cbcd25/factory/disconnect/{elementId}
- Tags: DocumentTypes
- Path params: elementId: string(uuid), required
- Response 200: DocumentTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /32851526-0ceb-4c50-8584-b28aa2cbcd25/factory/query
- Tags: DocumentTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /32851526-0ceb-4c50-8584-b28aa2cbcd25/factory/sync
- Tags: DocumentTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /32851526-0ceb-4c50-8584-b28aa2cbcd25/factory/sync/{elementId}
- Tags: DocumentTypes
- Path params: elementId: string(uuid), required
- Response 200: DocumentTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61
- Tags: ReleaseInformations
- Response 204: (no body)

### GET /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61
- Tags: ReleaseInformations
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/elements
- Tags: ReleaseInformations
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/elements/{elementId}
- Tags: ReleaseInformations
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/elements/{elementId}
- Tags: ReleaseInformations
- Path params: elementId: string(uuid), required
- Request body: ReleaseInformationUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/elements/{elementId}/replace
- Tags: ReleaseInformations
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/elements/add
- Tags: ReleaseInformations
- Request body: ReleaseInformationAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/elements/duplicate-check
- Tags: ReleaseInformations
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/factory/connect/{elementId}
- Tags: ReleaseInformations
- Path params: elementId: string(uuid), required
- Response 200: ReleaseInformationElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/factory/disconnect/{elementId}
- Tags: ReleaseInformations
- Path params: elementId: string(uuid), required
- Response 200: ReleaseInformationElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/factory/query
- Tags: ReleaseInformations
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/factory/sync
- Tags: ReleaseInformations
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /32C97C0A-FB3F-473F-ABF6-9CEE2F224C61/factory/sync/{elementId}
- Tags: ReleaseInformations
- Path params: elementId: string(uuid), required
- Response 200: ReleaseInformationElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c
- Tags: Races
- Response 204: (no body)

### GET /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c
- Tags: Races
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/elements
- Tags: Races
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/elements/{elementId}
- Tags: Races
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/elements/{elementId}
- Tags: Races
- Path params: elementId: string(uuid), required
- Request body: RaceRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/elements/{elementId}/replace
- Tags: Races
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/elements/add
- Tags: Races
- Request body: RaceRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/elements/duplicate-check
- Tags: Races
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/factory/connect/{elementId}
- Tags: Races
- Path params: elementId: string(uuid), required
- Response 200: RaceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/factory/disconnect/{elementId}
- Tags: Races
- Path params: elementId: string(uuid), required
- Response 200: RaceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/factory/query
- Tags: Races
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/factory/sync
- Tags: Races
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /33d33d69-91fd-4f67-b99f-d4c3aaa7bf6c/factory/sync/{elementId}
- Tags: Races
- Path params: elementId: string(uuid), required
- Response 200: RaceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /34fa5de6-1206-4341-8384-ad330c717138/elements/{elementId}
- Tags: Providers
- Path params: elementId: string(uuid), required
- Request body: UpdateProviderRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /34fa5de6-1206-4341-8384-ad330c717138/elements/{elementId}
- Tags: Providers
- Path params: elementId: string(uuid), required
- Response 200: ProviderElementResponse
- Response 404: ProblemDetails

### PATCH /34fa5de6-1206-4341-8384-ad330c717138/elements/{elementId}/address
- Tags: Providers
- Path params: elementId: string(uuid), required
- Request body: ProviderAddressUpdate
- Response 204: (no body)
- Response 404: ProblemDetails

### PATCH /34fa5de6-1206-4341-8384-ad330c717138/elements/{elementId}/contact
- Tags: Providers
- Path params: elementId: string(uuid), required
- Request body: ProviderContactInformationUpdate
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /34fa5de6-1206-4341-8384-ad330c717138/elements/add
- Tags: Providers
- Request body: CreateProviderRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /34fa5de6-1206-4341-8384-ad330c717138/search
- Tags: Providers
- Request body: ProviderSearchRequest
- Response 200: ProviderSearchResponse[]

### PUT /360a68f3-9640-432c-8dfe-021a97a858f4
- Tags: PaymentPlanTerminationReasons
- Response 204: (no body)

### GET /360a68f3-9640-432c-8dfe-021a97a858f4
- Tags: PaymentPlanTerminationReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /360a68f3-9640-432c-8dfe-021a97a858f4/elements
- Tags: PaymentPlanTerminationReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /360a68f3-9640-432c-8dfe-021a97a858f4/elements/{elementId}
- Tags: PaymentPlanTerminationReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /360a68f3-9640-432c-8dfe-021a97a858f4/elements/{elementId}
- Tags: PaymentPlanTerminationReasons
- Path params: elementId: string(uuid), required
- Request body: PaymentPlanTerminationReasonUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /360a68f3-9640-432c-8dfe-021a97a858f4/elements/{elementId}/replace
- Tags: PaymentPlanTerminationReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /360a68f3-9640-432c-8dfe-021a97a858f4/elements/add
- Tags: PaymentPlanTerminationReasons
- Request body: PaymentPlanTerminationReasonAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /360a68f3-9640-432c-8dfe-021a97a858f4/elements/duplicate-check
- Tags: PaymentPlanTerminationReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /360a68f3-9640-432c-8dfe-021a97a858f4/factory/connect/{elementId}
- Tags: PaymentPlanTerminationReasons
- Path params: elementId: string(uuid), required
- Response 200: PaymentPlanTerminationReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /360a68f3-9640-432c-8dfe-021a97a858f4/factory/disconnect/{elementId}
- Tags: PaymentPlanTerminationReasons
- Path params: elementId: string(uuid), required
- Response 200: PaymentPlanTerminationReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /360a68f3-9640-432c-8dfe-021a97a858f4/factory/query
- Tags: PaymentPlanTerminationReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /360a68f3-9640-432c-8dfe-021a97a858f4/factory/sync
- Tags: PaymentPlanTerminationReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /360a68f3-9640-432c-8dfe-021a97a858f4/factory/sync/{elementId}
- Tags: PaymentPlanTerminationReasons
- Path params: elementId: string(uuid), required
- Response 200: PaymentPlanTerminationReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /37C2861D-D8E6-42AF-8B9E-22A75EA169B5
- Tags: ContractualAdjustmentReasons
- Response 204: (no body)

### GET /37C2861D-D8E6-42AF-8B9E-22A75EA169B5
- Tags: ContractualAdjustmentReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/elements
- Tags: ContractualAdjustmentReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/elements/{elementId}
- Tags: ContractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/elements/{elementId}
- Tags: ContractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Request body: ContractualAdjustmentReasonUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/elements/{elementId}/replace
- Tags: ContractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/elements/add
- Tags: ContractualAdjustmentReasons
- Request body: ContractualAdjustmentReasonAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/elements/duplicate-check
- Tags: ContractualAdjustmentReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/factory/connect/{elementId}
- Tags: ContractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ContractualAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/factory/disconnect/{elementId}
- Tags: ContractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ContractualAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/factory/query
- Tags: ContractualAdjustmentReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/factory/sync
- Tags: ContractualAdjustmentReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /37C2861D-D8E6-42AF-8B9E-22A75EA169B5/factory/sync/{elementId}
- Tags: ContractualAdjustmentReasons
- Path params: elementId: string(uuid), required
- Response 200: ContractualAdjustmentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /3F6645AA-08A1-456A-B50A-DD0D11AE6748
- Tags: SignatureSources
- Response 204: (no body)

### GET /3F6645AA-08A1-456A-B50A-DD0D11AE6748
- Tags: SignatureSources
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /3F6645AA-08A1-456A-B50A-DD0D11AE6748/elements
- Tags: SignatureSources
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /3F6645AA-08A1-456A-B50A-DD0D11AE6748/elements/{elementId}
- Tags: SignatureSources
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /3F6645AA-08A1-456A-B50A-DD0D11AE6748/elements/{elementId}
- Tags: SignatureSources
- Path params: elementId: string(uuid), required
- Request body: SignatureSourceUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /3F6645AA-08A1-456A-B50A-DD0D11AE6748/elements/{elementId}/replace
- Tags: SignatureSources
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /3F6645AA-08A1-456A-B50A-DD0D11AE6748/elements/add
- Tags: SignatureSources
- Request body: SignatureSourceAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /3F6645AA-08A1-456A-B50A-DD0D11AE6748/elements/duplicate-check
- Tags: SignatureSources
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /3F6645AA-08A1-456A-B50A-DD0D11AE6748/factory/connect/{elementId}
- Tags: SignatureSources
- Path params: elementId: string(uuid), required
- Response 200: SignatureSourceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /3F6645AA-08A1-456A-B50A-DD0D11AE6748/factory/disconnect/{elementId}
- Tags: SignatureSources
- Path params: elementId: string(uuid), required
- Response 200: SignatureSourceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /3F6645AA-08A1-456A-B50A-DD0D11AE6748/factory/query
- Tags: SignatureSources
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /3F6645AA-08A1-456A-B50A-DD0D11AE6748/factory/sync
- Tags: SignatureSources
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /3F6645AA-08A1-456A-B50A-DD0D11AE6748/factory/sync/{elementId}
- Tags: SignatureSources
- Path params: elementId: string(uuid), required
- Response 200: SignatureSourceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /4d101c4e-23a3-42ab-9507-942563eaf5e2
- Tags: EngagementMethods
- Response 204: (no body)

### GET /4d101c4e-23a3-42ab-9507-942563eaf5e2
- Tags: EngagementMethods
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /4d101c4e-23a3-42ab-9507-942563eaf5e2/elements
- Tags: EngagementMethods
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /4d101c4e-23a3-42ab-9507-942563eaf5e2/elements/{elementId}
- Tags: EngagementMethods
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /4d101c4e-23a3-42ab-9507-942563eaf5e2/elements/{elementId}
- Tags: EngagementMethods
- Path params: elementId: string(uuid), required
- Request body: EngagementMethodElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /4d101c4e-23a3-42ab-9507-942563eaf5e2/elements/{elementId}/replace
- Tags: EngagementMethods
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /4d101c4e-23a3-42ab-9507-942563eaf5e2/elements/add
- Tags: EngagementMethods
- Request body: EngagementMethodElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /4d101c4e-23a3-42ab-9507-942563eaf5e2/elements/duplicate-check
- Tags: EngagementMethods
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /4d101c4e-23a3-42ab-9507-942563eaf5e2/factory/connect/{elementId}
- Tags: EngagementMethods
- Path params: elementId: string(uuid), required
- Response 200: EngagementMethodElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /4d101c4e-23a3-42ab-9507-942563eaf5e2/factory/disconnect/{elementId}
- Tags: EngagementMethods
- Path params: elementId: string(uuid), required
- Response 200: EngagementMethodElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /4d101c4e-23a3-42ab-9507-942563eaf5e2/factory/query
- Tags: EngagementMethods
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /4d101c4e-23a3-42ab-9507-942563eaf5e2/factory/sync
- Tags: EngagementMethods
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /4d101c4e-23a3-42ab-9507-942563eaf5e2/factory/sync/{elementId}
- Tags: EngagementMethods
- Path params: elementId: string(uuid), required
- Response 200: EngagementMethodElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD
- Tags: ChargeCodes
- Request body: UpdateChargeCodeRequest
- Response 200: ChargeCodeElement
- Response 409: ProblemDetails

### PUT /52889F29-6D60-46DA-9527-B7A67ACE6AAD
- Tags: ChargeCodes
- Request body: UpdateChargeCodeRequest
- Response 200: ChargeCodeElement
- Response 404: ProblemDetails

### GET /52889F29-6D60-46DA-9527-B7A67ACE6AAD
- Tags: ChargeCodes
- Response 200: CatalogHeader

### PUT /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/connect/{name}
- Tags: ChargeCodes
- Path params: name: string, required
- Response 200: ChargeCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/disconnect/{name}
- Tags: ChargeCodes
- Path params: name: string, required
- Response 200: ChargeCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/import
- Tags: ChargeCodes
- Request body: FactoryImportCodesCriteria
- Response 200: (no body)

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/import/element
- Tags: ChargeCodes
- Request body: FactorySyncRequest
- Response 200: ChargeCodeElement

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/import/updates
- Tags: ChargeCodes
- Response 200: (no body)

### GET /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/query
- Tags: ChargeCodes
- Response 200: FactoryUpdateSummary

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/search
- Tags: ChargeCodes
- Request body: ChargeCodeFactorySearchCriteria
- Response 200: ChargeCodeFactoryResult[]

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/sync
- Tags: ChargeCodes
- Query params: force: boolean
- Response 200: FactorySyncResponse

### POST /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/sync/{name}
- Tags: ChargeCodes
- Path params: name: string, required
- Response 200: ChargeCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /52889F29-6D60-46DA-9527-B7A67ACE6AAD/factory/updates
- Tags: ChargeCodes
- Response 200: FactoryUpdatesResult

### PUT /53DA4A4E-CE82-4426-9141-C299CFCF915F
- Tags: TransferReasons
- Response 204: (no body)

### GET /53DA4A4E-CE82-4426-9141-C299CFCF915F
- Tags: TransferReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /53DA4A4E-CE82-4426-9141-C299CFCF915F/elements
- Tags: TransferReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /53DA4A4E-CE82-4426-9141-C299CFCF915F/elements/{elementId}
- Tags: TransferReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /53DA4A4E-CE82-4426-9141-C299CFCF915F/elements/{elementId}
- Tags: TransferReasons
- Path params: elementId: string(uuid), required
- Request body: TransferReasonUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /53DA4A4E-CE82-4426-9141-C299CFCF915F/elements/{elementId}/replace
- Tags: TransferReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /53DA4A4E-CE82-4426-9141-C299CFCF915F/elements/add
- Tags: TransferReasons
- Request body: TransferReasonAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /53DA4A4E-CE82-4426-9141-C299CFCF915F/elements/duplicate-check
- Tags: TransferReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /53DA4A4E-CE82-4426-9141-C299CFCF915F/factory/connect/{elementId}
- Tags: TransferReasons
- Path params: elementId: string(uuid), required
- Response 200: TransferReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /53DA4A4E-CE82-4426-9141-C299CFCF915F/factory/disconnect/{elementId}
- Tags: TransferReasons
- Path params: elementId: string(uuid), required
- Response 200: TransferReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /53DA4A4E-CE82-4426-9141-C299CFCF915F/factory/query
- Tags: TransferReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /53DA4A4E-CE82-4426-9141-C299CFCF915F/factory/sync
- Tags: TransferReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /53DA4A4E-CE82-4426-9141-C299CFCF915F/factory/sync/{elementId}
- Tags: TransferReasons
- Path params: elementId: string(uuid), required
- Response 200: TransferReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /59047997-4341-4D72-89D2-12133A8B106F
- Tags: Units
- Response 204: (no body)

### GET /59047997-4341-4D72-89D2-12133A8B106F
- Tags: Units
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /59047997-4341-4D72-89D2-12133A8B106F/elements
- Tags: Units
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /59047997-4341-4D72-89D2-12133A8B106F/elements/{elementId}
- Tags: Units
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /59047997-4341-4D72-89D2-12133A8B106F/elements/{elementId}
- Tags: Units
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /59047997-4341-4D72-89D2-12133A8B106F/elements/{elementId}/replace
- Tags: Units
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /59047997-4341-4D72-89D2-12133A8B106F/elements/add
- Tags: Units
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /59047997-4341-4D72-89D2-12133A8B106F/elements/duplicate-check
- Tags: Units
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /59047997-4341-4D72-89D2-12133A8B106F/factory/connect/{elementId}
- Tags: Units
- Path params: elementId: string(uuid), required
- Response 200: UnitElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /59047997-4341-4D72-89D2-12133A8B106F/factory/disconnect/{elementId}
- Tags: Units
- Path params: elementId: string(uuid), required
- Response 200: UnitElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /59047997-4341-4D72-89D2-12133A8B106F/factory/query
- Tags: Units
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /59047997-4341-4D72-89D2-12133A8B106F/factory/sync
- Tags: Units
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /59047997-4341-4D72-89D2-12133A8B106F/factory/sync/{elementId}
- Tags: Units
- Path params: elementId: string(uuid), required
- Response 200: UnitElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268
- Tags: ClaimStatusCategoryCodes
- Response 204: (no body)

### GET /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268
- Tags: ClaimStatusCategoryCodes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/elements
- Tags: ClaimStatusCategoryCodes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/elements/{elementId}
- Tags: ClaimStatusCategoryCodes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/elements/{elementId}
- Tags: ClaimStatusCategoryCodes
- Path params: elementId: string(uuid), required
- Request body: ClaimStatusCategoryCodeElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/elements/{elementId}/replace
- Tags: ClaimStatusCategoryCodes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/elements/add
- Tags: ClaimStatusCategoryCodes
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/elements/duplicate-check
- Tags: ClaimStatusCategoryCodes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/factory/connect/{elementId}
- Tags: ClaimStatusCategoryCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusCategoryCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/factory/disconnect/{elementId}
- Tags: ClaimStatusCategoryCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusCategoryCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/factory/query
- Tags: ClaimStatusCategoryCodes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/factory/sync
- Tags: ClaimStatusCategoryCodes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /5A6EFD8E-33E8-40D4-96BC-C3EA7749B268/factory/sync/{elementId}
- Tags: ClaimStatusCategoryCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusCategoryCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5aece4ab-9415-402d-bcb8-0b497a332a5d
- Tags: ConditionCodes
- Response 204: (no body)

### GET /5aece4ab-9415-402d-bcb8-0b497a332a5d
- Tags: ConditionCodes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /5aece4ab-9415-402d-bcb8-0b497a332a5d/elements
- Tags: ConditionCodes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /5aece4ab-9415-402d-bcb8-0b497a332a5d/elements/{elementId}
- Tags: ConditionCodes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /5aece4ab-9415-402d-bcb8-0b497a332a5d/elements/{elementId}
- Tags: ConditionCodes
- Path params: elementId: string(uuid), required
- Request body: ConditionCodeUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /5aece4ab-9415-402d-bcb8-0b497a332a5d/elements/{elementId}/replace
- Tags: ConditionCodes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /5aece4ab-9415-402d-bcb8-0b497a332a5d/elements/add
- Tags: ConditionCodes
- Request body: ConditionCodeAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /5aece4ab-9415-402d-bcb8-0b497a332a5d/elements/duplicate-check
- Tags: ConditionCodes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /5aece4ab-9415-402d-bcb8-0b497a332a5d/factory/connect/{elementId}
- Tags: ConditionCodes
- Path params: elementId: string(uuid), required
- Response 200: ConditionCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5aece4ab-9415-402d-bcb8-0b497a332a5d/factory/disconnect/{elementId}
- Tags: ConditionCodes
- Path params: elementId: string(uuid), required
- Response 200: ConditionCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /5aece4ab-9415-402d-bcb8-0b497a332a5d/factory/query
- Tags: ConditionCodes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /5aece4ab-9415-402d-bcb8-0b497a332a5d/factory/sync
- Tags: ConditionCodes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /5aece4ab-9415-402d-bcb8-0b497a332a5d/factory/sync/{elementId}
- Tags: ConditionCodes
- Path params: elementId: string(uuid), required
- Response 200: ConditionCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5aff7783-0f87-4fd4-8dee-4e1ba929b797
- Tags: Specialties
- Response 204: (no body)

### GET /5aff7783-0f87-4fd4-8dee-4e1ba929b797
- Tags: Specialties
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /5aff7783-0f87-4fd4-8dee-4e1ba929b797/elements
- Tags: Specialties
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /5aff7783-0f87-4fd4-8dee-4e1ba929b797/elements/{elementId}
- Tags: Specialties
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /5aff7783-0f87-4fd4-8dee-4e1ba929b797/elements/{elementId}
- Tags: Specialties
- Path params: elementId: string(uuid), required
- Request body: UpdateSpecialtyRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /5aff7783-0f87-4fd4-8dee-4e1ba929b797/elements/{elementId}/replace
- Tags: Specialties
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /5aff7783-0f87-4fd4-8dee-4e1ba929b797/elements/add
- Tags: Specialties
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /5aff7783-0f87-4fd4-8dee-4e1ba929b797/elements/duplicate-check
- Tags: Specialties
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /5aff7783-0f87-4fd4-8dee-4e1ba929b797/factory/connect/{elementId}
- Tags: Specialties
- Path params: elementId: string(uuid), required
- Response 200: SpecialtyElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5aff7783-0f87-4fd4-8dee-4e1ba929b797/factory/disconnect/{elementId}
- Tags: Specialties
- Path params: elementId: string(uuid), required
- Response 200: SpecialtyElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /5aff7783-0f87-4fd4-8dee-4e1ba929b797/factory/query
- Tags: Specialties
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /5aff7783-0f87-4fd4-8dee-4e1ba929b797/factory/sync
- Tags: Specialties
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /5aff7783-0f87-4fd4-8dee-4e1ba929b797/factory/sync/{elementId}
- Tags: Specialties
- Path params: elementId: string(uuid), required
- Response 200: SpecialtyElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5ca22ada-75d0-4f93-aa07-0583fb497d02
- Tags: MaritalStatuses
- Response 204: (no body)

### GET /5ca22ada-75d0-4f93-aa07-0583fb497d02
- Tags: MaritalStatuses
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /5ca22ada-75d0-4f93-aa07-0583fb497d02/elements
- Tags: MaritalStatuses
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /5ca22ada-75d0-4f93-aa07-0583fb497d02/elements/{elementId}
- Tags: MaritalStatuses
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /5ca22ada-75d0-4f93-aa07-0583fb497d02/elements/{elementId}
- Tags: MaritalStatuses
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /5ca22ada-75d0-4f93-aa07-0583fb497d02/elements/{elementId}/replace
- Tags: MaritalStatuses
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /5ca22ada-75d0-4f93-aa07-0583fb497d02/elements/add
- Tags: MaritalStatuses
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /5ca22ada-75d0-4f93-aa07-0583fb497d02/elements/duplicate-check
- Tags: MaritalStatuses
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /5ca22ada-75d0-4f93-aa07-0583fb497d02/factory/connect/{elementId}
- Tags: MaritalStatuses
- Path params: elementId: string(uuid), required
- Response 200: MaritalStatusElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5ca22ada-75d0-4f93-aa07-0583fb497d02/factory/disconnect/{elementId}
- Tags: MaritalStatuses
- Path params: elementId: string(uuid), required
- Response 200: MaritalStatusElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /5ca22ada-75d0-4f93-aa07-0583fb497d02/factory/query
- Tags: MaritalStatuses
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /5ca22ada-75d0-4f93-aa07-0583fb497d02/factory/sync
- Tags: MaritalStatuses
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /5ca22ada-75d0-4f93-aa07-0583fb497d02/factory/sync/{elementId}
- Tags: MaritalStatuses
- Path params: elementId: string(uuid), required
- Response 200: MaritalStatusElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5e67f38a-f942-4e93-b592-3540f8d8125c
- Tags: RefundReasons
- Response 204: (no body)

### GET /5e67f38a-f942-4e93-b592-3540f8d8125c
- Tags: RefundReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /5e67f38a-f942-4e93-b592-3540f8d8125c/elements
- Tags: RefundReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /5e67f38a-f942-4e93-b592-3540f8d8125c/elements/{elementId}
- Tags: RefundReasons
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /5e67f38a-f942-4e93-b592-3540f8d8125c/elements/{elementId}
- Tags: RefundReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /5e67f38a-f942-4e93-b592-3540f8d8125c/elements/{elementId}/replace
- Tags: RefundReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /5e67f38a-f942-4e93-b592-3540f8d8125c/elements/add
- Tags: RefundReasons
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /5e67f38a-f942-4e93-b592-3540f8d8125c/elements/duplicate-check
- Tags: RefundReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /5e67f38a-f942-4e93-b592-3540f8d8125c/factory/connect/{elementId}
- Tags: RefundReasons
- Path params: elementId: string(uuid), required
- Response 200: RefundReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /5e67f38a-f942-4e93-b592-3540f8d8125c/factory/disconnect/{elementId}
- Tags: RefundReasons
- Path params: elementId: string(uuid), required
- Response 200: RefundReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /5e67f38a-f942-4e93-b592-3540f8d8125c/factory/query
- Tags: RefundReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /5e67f38a-f942-4e93-b592-3540f8d8125c/factory/sync
- Tags: RefundReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /5e67f38a-f942-4e93-b592-3540f8d8125c/factory/sync/{elementId}
- Tags: RefundReasons
- Path params: elementId: string(uuid), required
- Response 200: RefundReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /605ecf5d-eee1-4618-804f-5d72e2d28db2
- Tags: SexualOrientations
- Response 204: (no body)

### GET /605ecf5d-eee1-4618-804f-5d72e2d28db2
- Tags: SexualOrientations
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /605ecf5d-eee1-4618-804f-5d72e2d28db2/elements
- Tags: SexualOrientations
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /605ecf5d-eee1-4618-804f-5d72e2d28db2/elements/{elementId}
- Tags: SexualOrientations
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /605ecf5d-eee1-4618-804f-5d72e2d28db2/elements/{elementId}
- Tags: SexualOrientations
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /605ecf5d-eee1-4618-804f-5d72e2d28db2/elements/{elementId}/replace
- Tags: SexualOrientations
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /605ecf5d-eee1-4618-804f-5d72e2d28db2/elements/add
- Tags: SexualOrientations
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /605ecf5d-eee1-4618-804f-5d72e2d28db2/elements/duplicate-check
- Tags: SexualOrientations
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /605ecf5d-eee1-4618-804f-5d72e2d28db2/factory/connect/{elementId}
- Tags: SexualOrientations
- Path params: elementId: string(uuid), required
- Response 200: SexualOrientationElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /605ecf5d-eee1-4618-804f-5d72e2d28db2/factory/disconnect/{elementId}
- Tags: SexualOrientations
- Path params: elementId: string(uuid), required
- Response 200: SexualOrientationElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /605ecf5d-eee1-4618-804f-5d72e2d28db2/factory/query
- Tags: SexualOrientations
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /605ecf5d-eee1-4618-804f-5d72e2d28db2/factory/sync
- Tags: SexualOrientations
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /605ecf5d-eee1-4618-804f-5d72e2d28db2/factory/sync/{elementId}
- Tags: SexualOrientations
- Path params: elementId: string(uuid), required
- Response 200: SexualOrientationElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd
- Tags: UnderpaymentReasons
- Response 204: (no body)

### GET /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd
- Tags: UnderpaymentReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/elements
- Tags: UnderpaymentReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/elements/{elementId}
- Tags: UnderpaymentReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/elements/{elementId}
- Tags: UnderpaymentReasons
- Path params: elementId: string(uuid), required
- Request body: UnderpaymentReasonRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/elements/{elementId}/replace
- Tags: UnderpaymentReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/elements/add
- Tags: UnderpaymentReasons
- Request body: UnderpaymentReasonRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/elements/duplicate-check
- Tags: UnderpaymentReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/factory/connect/{elementId}
- Tags: UnderpaymentReasons
- Path params: elementId: string(uuid), required
- Response 200: UnderpaymentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/factory/disconnect/{elementId}
- Tags: UnderpaymentReasons
- Path params: elementId: string(uuid), required
- Response 200: UnderpaymentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/factory/query
- Tags: UnderpaymentReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/factory/sync
- Tags: UnderpaymentReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /66cf53c9-8c83-4db0-a2eb-bb913a6ad0cd/factory/sync/{elementId}
- Tags: UnderpaymentReasons
- Path params: elementId: string(uuid), required
- Response 200: UnderpaymentReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /6939e857-66a3-4013-87c7-121d21ccc377
- Tags: Ethnicities
- Response 204: (no body)

### GET /6939e857-66a3-4013-87c7-121d21ccc377
- Tags: Ethnicities
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /6939e857-66a3-4013-87c7-121d21ccc377/elements
- Tags: Ethnicities
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /6939e857-66a3-4013-87c7-121d21ccc377/elements/{elementId}
- Tags: Ethnicities
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /6939e857-66a3-4013-87c7-121d21ccc377/elements/{elementId}
- Tags: Ethnicities
- Path params: elementId: string(uuid), required
- Request body: EthnicityRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /6939e857-66a3-4013-87c7-121d21ccc377/elements/{elementId}/replace
- Tags: Ethnicities
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /6939e857-66a3-4013-87c7-121d21ccc377/elements/add
- Tags: Ethnicities
- Request body: EthnicityRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /6939e857-66a3-4013-87c7-121d21ccc377/elements/duplicate-check
- Tags: Ethnicities
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /6939e857-66a3-4013-87c7-121d21ccc377/factory/connect/{elementId}
- Tags: Ethnicities
- Path params: elementId: string(uuid), required
- Response 200: EthnicityElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /6939e857-66a3-4013-87c7-121d21ccc377/factory/disconnect/{elementId}
- Tags: Ethnicities
- Path params: elementId: string(uuid), required
- Response 200: EthnicityElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /6939e857-66a3-4013-87c7-121d21ccc377/factory/query
- Tags: Ethnicities
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /6939e857-66a3-4013-87c7-121d21ccc377/factory/sync
- Tags: Ethnicities
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /6939e857-66a3-4013-87c7-121d21ccc377/factory/sync/{elementId}
- Tags: Ethnicities
- Path params: elementId: string(uuid), required
- Response 200: EthnicityElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /6969ac9e-a016-447b-b915-c220dc6a8413
- Tags: AppointmentTypes
- Response 204: (no body)

### GET /6969ac9e-a016-447b-b915-c220dc6a8413
- Tags: AppointmentTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /6969ac9e-a016-447b-b915-c220dc6a8413/elements
- Tags: AppointmentTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /6969ac9e-a016-447b-b915-c220dc6a8413/elements/{elementId}
- Tags: AppointmentTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /6969ac9e-a016-447b-b915-c220dc6a8413/elements/{elementId}
- Tags: AppointmentTypes
- Path params: elementId: string(uuid), required
- Request body: UpdateAppointmentTypeRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PATCH /6969ac9e-a016-447b-b915-c220dc6a8413/elements/{elementId}/activitytypes
- Tags: AppointmentTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)[]
- Response 204: (no body)

### POST /6969ac9e-a016-447b-b915-c220dc6a8413/elements/{elementId}/replace
- Tags: AppointmentTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 204: (no body)

### POST /6969ac9e-a016-447b-b915-c220dc6a8413/elements/add
- Tags: AppointmentTypes
- Request body: CreateAppointmentTypeRequest
- Response 200: string
- Response 404: ProblemDetails

### POST /6969ac9e-a016-447b-b915-c220dc6a8413/elements/duplicate-check
- Tags: AppointmentTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /6969ac9e-a016-447b-b915-c220dc6a8413/factory/connect/{elementId}
- Tags: AppointmentTypes
- Path params: elementId: string(uuid), required
- Response 200: AppointmentTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /6969ac9e-a016-447b-b915-c220dc6a8413/factory/disconnect/{elementId}
- Tags: AppointmentTypes
- Path params: elementId: string(uuid), required
- Response 200: AppointmentTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /6969ac9e-a016-447b-b915-c220dc6a8413/factory/query
- Tags: AppointmentTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /6969ac9e-a016-447b-b915-c220dc6a8413/factory/sync
- Tags: AppointmentTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /6969ac9e-a016-447b-b915-c220dc6a8413/factory/sync/{elementId}
- Tags: AppointmentTypes
- Path params: elementId: string(uuid), required
- Response 200: AppointmentTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /78678933-b550-415e-94db-e69b6c284b68
- Tags: ActivityTypes
- Response 200: CatalogHeader

### POST /78678933-b550-415e-94db-e69b6c284b68/costs/{date}
- Tags: ActivityCodeCost
- Path params: date: string, required
- Request body: ActivityCodeRequest
- Response 200: CostSummary[]
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /78678933-b550-415e-94db-e69b6c284b68/costs/location/{locationId}
- Tags: ActivityCodeCost
- Path params: locationId: string(uuid), required
- Request body: ActivityCodeRequest
- Response 200: Cost[]

### POST /78678933-b550-415e-94db-e69b6c284b68/costs/location/{locationId}/update
- Tags: ActivityCodeCost
- Path params: locationId: string(uuid), required
- Request body: UpdateActivityCodeCostsRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /78678933-b550-415e-94db-e69b6c284b68/elements
- Tags: ActivityTypes
- Response 200: ActivityTypeElementResponse[]
- Response 404: ProblemDetails

### PUT /78678933-b550-415e-94db-e69b6c284b68/elements
- Tags: ActivityTypes
- Request body: UpdateActivityCodeRequest
- Response 204: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /78678933-b550-415e-94db-e69b6c284b68/elements/{elementId}
- Tags: ActivityTypes
- Path params: elementId: string(uuid), required
- Response 200: ActivityTypeElementResponse
- Response 404: ProblemDetails

### PUT /78678933-b550-415e-94db-e69b6c284b68/elements/{elementId}
- Tags: ActivityTypes
- Path params: elementId: string(uuid), required
- Request body: UpdateActivityCodeRequest
- Response 204: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /78678933-b550-415e-94db-e69b6c284b68/elements/add
- Tags: ActivityTypes
- Request body: AddActivityCodeRequest
- Response 200: string
- Response 400: ProblemDetails
- Response 409: ProblemDetails

### POST /78678933-b550-415e-94db-e69b6c284b68/elements/code
- Tags: ActivityTypes
- Request body: ActivityCodeRequest
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails

### PUT /78678933-b550-415e-94db-e69b6c284b68/factory/connect
- Tags: ActivityTypes
- Request body: ActivityCodeRequest
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /78678933-b550-415e-94db-e69b6c284b68/factory/connect/{elementId}
- Tags: ActivityTypes
- Path params: elementId: string(uuid), required
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /78678933-b550-415e-94db-e69b6c284b68/factory/disconnect
- Tags: ActivityTypes
- Request body: ActivityCodeRequest
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /78678933-b550-415e-94db-e69b6c284b68/factory/disconnect/{elementId}
- Tags: ActivityTypes
- Path params: elementId: string(uuid), required
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /78678933-b550-415e-94db-e69b6c284b68/factory/import
- Tags: ActivityTypes
- Request body: FactoryImportCodesCriteria
- Response 200: (no body)

### POST /78678933-b550-415e-94db-e69b6c284b68/factory/import/element
- Tags: ActivityTypes
- Request body: FactorySyncRequest
- Response 200: ActivityTypeElement

### POST /78678933-b550-415e-94db-e69b6c284b68/factory/import/updates
- Tags: ActivityTypes
- Response 200: (no body)

### GET /78678933-b550-415e-94db-e69b6c284b68/factory/query
- Tags: ActivityTypes
- Response 200: FactoryUpdateSummary

### POST /78678933-b550-415e-94db-e69b6c284b68/factory/search
- Tags: ActivityTypes
- Request body: ActivityCodeFactorySearchCriteria
- Response 200: ActivityCodeFactoryResult[]

### POST /78678933-b550-415e-94db-e69b6c284b68/factory/sync
- Tags: ActivityTypes
- Query params: force: boolean
- Response 200: FactorySyncResponse

### POST /78678933-b550-415e-94db-e69b6c284b68/factory/sync/{elementId}
- Tags: ActivityTypes
- Path params: elementId: string(uuid), required
- Response 200: ActivityTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /78678933-b550-415e-94db-e69b6c284b68/factory/updates
- Tags: ActivityTypes
- Response 200: FactoryUpdatesResult

### PUT /798073ba-fc25-4819-b80c-78bfde9be05a
- Tags: ScheduleBlockTypes
- Response 204: (no body)

### GET /798073ba-fc25-4819-b80c-78bfde9be05a
- Tags: ScheduleBlockTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /798073ba-fc25-4819-b80c-78bfde9be05a/elements
- Tags: ScheduleBlockTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /798073ba-fc25-4819-b80c-78bfde9be05a/elements/{elementId}
- Tags: ScheduleBlockTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /798073ba-fc25-4819-b80c-78bfde9be05a/elements/{elementId}
- Tags: ScheduleBlockTypes
- Path params: elementId: string(uuid), required
- Request body: UpdateScheduleBlockTypeRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /798073ba-fc25-4819-b80c-78bfde9be05a/elements/{elementId}/replace
- Tags: ScheduleBlockTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /798073ba-fc25-4819-b80c-78bfde9be05a/elements/add
- Tags: ScheduleBlockTypes
- Request body: CreateScheduleBlockTypeRequest
- Response 200: string
- Response 404: ProblemDetails

### POST /798073ba-fc25-4819-b80c-78bfde9be05a/elements/duplicate-check
- Tags: ScheduleBlockTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /798073ba-fc25-4819-b80c-78bfde9be05a/elements/expire/{elementId}
- Tags: ScheduleBlockTypes
- Path params: elementId: string(uuid), required
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /798073ba-fc25-4819-b80c-78bfde9be05a/factory/connect/{elementId}
- Tags: ScheduleBlockTypes
- Path params: elementId: string(uuid), required
- Response 200: ScheduleBlockTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /798073ba-fc25-4819-b80c-78bfde9be05a/factory/disconnect/{elementId}
- Tags: ScheduleBlockTypes
- Path params: elementId: string(uuid), required
- Response 200: ScheduleBlockTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /798073ba-fc25-4819-b80c-78bfde9be05a/factory/query
- Tags: ScheduleBlockTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /798073ba-fc25-4819-b80c-78bfde9be05a/factory/sync
- Tags: ScheduleBlockTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /798073ba-fc25-4819-b80c-78bfde9be05a/factory/sync/{elementId}
- Tags: ScheduleBlockTypes
- Path params: elementId: string(uuid), required
- Response 200: ScheduleBlockTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /7982a29b-e426-41d0-a2d2-e1f98d806119
- Tags: Tags
- Response 204: (no body)

### GET /7982a29b-e426-41d0-a2d2-e1f98d806119
- Tags: Tags
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /7982a29b-e426-41d0-a2d2-e1f98d806119/elements
- Tags: Tags
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /7982a29b-e426-41d0-a2d2-e1f98d806119/elements/{elementId}
- Tags: Tags
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /7982a29b-e426-41d0-a2d2-e1f98d806119/elements/{elementId}
- Tags: Tags
- Path params: elementId: string(uuid), required
- Request body: TagUpdateElementRequest
- Response 204: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /7982a29b-e426-41d0-a2d2-e1f98d806119/elements/{elementId}/replace
- Tags: Tags
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /7982a29b-e426-41d0-a2d2-e1f98d806119/elements/add
- Tags: Tags
- Request body: TagAddElementRequest
- Response 200: string(uuid)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /7982a29b-e426-41d0-a2d2-e1f98d806119/elements/duplicate-check
- Tags: Tags
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /7982a29b-e426-41d0-a2d2-e1f98d806119/factory/connect/{elementId}
- Tags: Tags
- Path params: elementId: string(uuid), required
- Response 200: TagElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /7982a29b-e426-41d0-a2d2-e1f98d806119/factory/disconnect/{elementId}
- Tags: Tags
- Path params: elementId: string(uuid), required
- Response 200: TagElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /7982a29b-e426-41d0-a2d2-e1f98d806119/factory/query
- Tags: Tags
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /7982a29b-e426-41d0-a2d2-e1f98d806119/factory/sync
- Tags: Tags
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /7982a29b-e426-41d0-a2d2-e1f98d806119/factory/sync/{elementId}
- Tags: Tags
- Path params: elementId: string(uuid), required
- Response 200: TagElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA
- Tags: BenefitAssignments
- Response 204: (no body)

### GET /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA
- Tags: BenefitAssignments
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/elements
- Tags: BenefitAssignments
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/elements/{elementId}
- Tags: BenefitAssignments
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/elements/{elementId}
- Tags: BenefitAssignments
- Path params: elementId: string(uuid), required
- Request body: BenefitAssignmentUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/elements/{elementId}/replace
- Tags: BenefitAssignments
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/elements/add
- Tags: BenefitAssignments
- Request body: BenefitAssignmentAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/elements/duplicate-check
- Tags: BenefitAssignments
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/factory/connect/{elementId}
- Tags: BenefitAssignments
- Path params: elementId: string(uuid), required
- Response 200: BenefitAssignmentElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/factory/disconnect/{elementId}
- Tags: BenefitAssignments
- Path params: elementId: string(uuid), required
- Response 200: BenefitAssignmentElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/factory/query
- Tags: BenefitAssignments
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/factory/sync
- Tags: BenefitAssignments
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /7DCCD0B2-14A4-418A-88CA-379D42FE5BBA/factory/sync/{elementId}
- Tags: BenefitAssignments
- Path params: elementId: string(uuid), required
- Response 200: BenefitAssignmentElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /877fbaf8-a61b-425d-96ef-436f56858415
- Tags: Modifiers
- Response 204: (no body)

### GET /877fbaf8-a61b-425d-96ef-436f56858415
- Tags: Modifiers
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /877fbaf8-a61b-425d-96ef-436f56858415/elements
- Tags: Modifiers
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /877fbaf8-a61b-425d-96ef-436f56858415/elements/{elementId}
- Tags: Modifiers
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /877fbaf8-a61b-425d-96ef-436f56858415/elements/{elementId}
- Tags: Modifiers
- Path params: elementId: string(uuid), required
- Request body: ModifiersElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /877fbaf8-a61b-425d-96ef-436f56858415/elements/{elementId}/replace
- Tags: Modifiers
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /877fbaf8-a61b-425d-96ef-436f56858415/elements/add
- Tags: Modifiers
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /877fbaf8-a61b-425d-96ef-436f56858415/elements/duplicate-check
- Tags: Modifiers
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /877fbaf8-a61b-425d-96ef-436f56858415/factory/connect/{elementId}
- Tags: Modifiers
- Path params: elementId: string(uuid), required
- Response 200: ModifierElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /877fbaf8-a61b-425d-96ef-436f56858415/factory/disconnect/{elementId}
- Tags: Modifiers
- Path params: elementId: string(uuid), required
- Response 200: ModifierElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /877fbaf8-a61b-425d-96ef-436f56858415/factory/query
- Tags: Modifiers
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /877fbaf8-a61b-425d-96ef-436f56858415/factory/sync
- Tags: Modifiers
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /877fbaf8-a61b-425d-96ef-436f56858415/factory/sync/{elementId}
- Tags: Modifiers
- Path params: elementId: string(uuid), required
- Response 200: ModifierElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /8EE44620-B3ED-4DD4-8DA3-044B768D0113
- Tags: ClaimStatusCodes
- Response 204: (no body)

### GET /8EE44620-B3ED-4DD4-8DA3-044B768D0113
- Tags: ClaimStatusCodes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /8EE44620-B3ED-4DD4-8DA3-044B768D0113/elements
- Tags: ClaimStatusCodes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /8EE44620-B3ED-4DD4-8DA3-044B768D0113/elements/{elementId}
- Tags: ClaimStatusCodes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /8EE44620-B3ED-4DD4-8DA3-044B768D0113/elements/{elementId}
- Tags: ClaimStatusCodes
- Path params: elementId: string(uuid), required
- Request body: ClaimStatusCodesElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /8EE44620-B3ED-4DD4-8DA3-044B768D0113/elements/{elementId}/replace
- Tags: ClaimStatusCodes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /8EE44620-B3ED-4DD4-8DA3-044B768D0113/elements/add
- Tags: ClaimStatusCodes
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /8EE44620-B3ED-4DD4-8DA3-044B768D0113/elements/duplicate-check
- Tags: ClaimStatusCodes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /8EE44620-B3ED-4DD4-8DA3-044B768D0113/factory/connect/{elementId}
- Tags: ClaimStatusCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /8EE44620-B3ED-4DD4-8DA3-044B768D0113/factory/disconnect/{elementId}
- Tags: ClaimStatusCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /8EE44620-B3ED-4DD4-8DA3-044B768D0113/factory/query
- Tags: ClaimStatusCodes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /8EE44620-B3ED-4DD4-8DA3-044B768D0113/factory/sync
- Tags: ClaimStatusCodes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /8EE44620-B3ED-4DD4-8DA3-044B768D0113/factory/sync/{elementId}
- Tags: ClaimStatusCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /8F67CBA4-16AC-457D-8C19-99D551083A10
- Tags: Departments
- Response 204: (no body)

### GET /8F67CBA4-16AC-457D-8C19-99D551083A10
- Tags: Departments
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /8F67CBA4-16AC-457D-8C19-99D551083A10/elements
- Tags: Departments
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /8F67CBA4-16AC-457D-8C19-99D551083A10/elements/{elementId}
- Tags: Departments
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /8F67CBA4-16AC-457D-8C19-99D551083A10/elements/{elementId}
- Tags: Departments
- Path params: elementId: string(uuid), required
- Request body: DepartmentUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /8F67CBA4-16AC-457D-8C19-99D551083A10/elements/{elementId}/replace
- Tags: Departments
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /8F67CBA4-16AC-457D-8C19-99D551083A10/elements/add
- Tags: Departments
- Request body: DepartmentAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /8F67CBA4-16AC-457D-8C19-99D551083A10/elements/duplicate-check
- Tags: Departments
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /8F67CBA4-16AC-457D-8C19-99D551083A10/factory/connect/{elementId}
- Tags: Departments
- Path params: elementId: string(uuid), required
- Response 200: DepartmentElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /8F67CBA4-16AC-457D-8C19-99D551083A10/factory/disconnect/{elementId}
- Tags: Departments
- Path params: elementId: string(uuid), required
- Response 200: DepartmentElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /8F67CBA4-16AC-457D-8C19-99D551083A10/factory/query
- Tags: Departments
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /8F67CBA4-16AC-457D-8C19-99D551083A10/factory/sync
- Tags: Departments
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /8F67CBA4-16AC-457D-8C19-99D551083A10/factory/sync/{elementId}
- Tags: Departments
- Path params: elementId: string(uuid), required
- Response 200: DepartmentElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /9AE4022F-5CBD-4439-8853-2D327AA88D35
- Tags: ContactUses
- Response 204: (no body)

### GET /9AE4022F-5CBD-4439-8853-2D327AA88D35
- Tags: ContactUses
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /9AE4022F-5CBD-4439-8853-2D327AA88D35/elements
- Tags: ContactUses
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /9AE4022F-5CBD-4439-8853-2D327AA88D35/elements/{elementId}
- Tags: ContactUses
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /9AE4022F-5CBD-4439-8853-2D327AA88D35/elements/{elementId}
- Tags: ContactUses
- Path params: elementId: string(uuid), required
- Request body: ContactUseUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /9AE4022F-5CBD-4439-8853-2D327AA88D35/elements/{elementId}/replace
- Tags: ContactUses
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /9AE4022F-5CBD-4439-8853-2D327AA88D35/elements/add
- Tags: ContactUses
- Request body: ContactUseAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /9AE4022F-5CBD-4439-8853-2D327AA88D35/elements/duplicate-check
- Tags: ContactUses
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /9AE4022F-5CBD-4439-8853-2D327AA88D35/factory/connect/{elementId}
- Tags: ContactUses
- Path params: elementId: string(uuid), required
- Response 200: ContactUseElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /9AE4022F-5CBD-4439-8853-2D327AA88D35/factory/disconnect/{elementId}
- Tags: ContactUses
- Path params: elementId: string(uuid), required
- Response 200: ContactUseElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /9AE4022F-5CBD-4439-8853-2D327AA88D35/factory/query
- Tags: ContactUses
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /9AE4022F-5CBD-4439-8853-2D327AA88D35/factory/sync
- Tags: ContactUses
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /9AE4022F-5CBD-4439-8853-2D327AA88D35/factory/sync/{elementId}
- Tags: ContactUses
- Path params: elementId: string(uuid), required
- Response 200: ContactUseElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /9D2E5938-0D44-4EB1-95D0-51126257D0FB
- Tags: TestResultTypes
- Response 204: (no body)

### GET /9D2E5938-0D44-4EB1-95D0-51126257D0FB
- Tags: TestResultTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /9D2E5938-0D44-4EB1-95D0-51126257D0FB/elements
- Tags: TestResultTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /9D2E5938-0D44-4EB1-95D0-51126257D0FB/elements/{elementId}
- Tags: TestResultTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /9D2E5938-0D44-4EB1-95D0-51126257D0FB/elements/{elementId}
- Tags: TestResultTypes
- Path params: elementId: string(uuid), required
- Request body: TestResultTypeUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /9D2E5938-0D44-4EB1-95D0-51126257D0FB/elements/{elementId}/replace
- Tags: TestResultTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /9D2E5938-0D44-4EB1-95D0-51126257D0FB/elements/add
- Tags: TestResultTypes
- Request body: TestResultTypeAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /9D2E5938-0D44-4EB1-95D0-51126257D0FB/elements/duplicate-check
- Tags: TestResultTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /9D2E5938-0D44-4EB1-95D0-51126257D0FB/factory/connect/{elementId}
- Tags: TestResultTypes
- Path params: elementId: string(uuid), required
- Response 200: TestResultTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /9D2E5938-0D44-4EB1-95D0-51126257D0FB/factory/disconnect/{elementId}
- Tags: TestResultTypes
- Path params: elementId: string(uuid), required
- Response 200: TestResultTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /9D2E5938-0D44-4EB1-95D0-51126257D0FB/factory/query
- Tags: TestResultTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /9D2E5938-0D44-4EB1-95D0-51126257D0FB/factory/sync
- Tags: TestResultTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /9D2E5938-0D44-4EB1-95D0-51126257D0FB/factory/sync/{elementId}
- Tags: TestResultTypes
- Path params: elementId: string(uuid), required
- Response 200: TestResultTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /9E388CAC-F291-4183-9D84-655FE2663484
- Tags: PlaceOfServices
- Response 204: (no body)

### GET /9E388CAC-F291-4183-9D84-655FE2663484
- Tags: PlaceOfServices
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /9E388CAC-F291-4183-9D84-655FE2663484/elements
- Tags: PlaceOfServices
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /9E388CAC-F291-4183-9D84-655FE2663484/elements/{elementId}
- Tags: PlaceOfServices
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /9E388CAC-F291-4183-9D84-655FE2663484/elements/{elementId}
- Tags: PlaceOfServices
- Path params: elementId: string(uuid), required
- Request body: PlaceOfServiceUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /9E388CAC-F291-4183-9D84-655FE2663484/elements/{elementId}/replace
- Tags: PlaceOfServices
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /9E388CAC-F291-4183-9D84-655FE2663484/elements/add
- Tags: PlaceOfServices
- Request body: PlaceOfServiceAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /9E388CAC-F291-4183-9D84-655FE2663484/elements/duplicate-check
- Tags: PlaceOfServices
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /9E388CAC-F291-4183-9D84-655FE2663484/factory/connect/{elementId}
- Tags: PlaceOfServices
- Path params: elementId: string(uuid), required
- Response 200: PlaceOfServiceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /9E388CAC-F291-4183-9D84-655FE2663484/factory/disconnect/{elementId}
- Tags: PlaceOfServices
- Path params: elementId: string(uuid), required
- Response 200: PlaceOfServiceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /9E388CAC-F291-4183-9D84-655FE2663484/factory/query
- Tags: PlaceOfServices
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /9E388CAC-F291-4183-9D84-655FE2663484/factory/sync
- Tags: PlaceOfServices
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /9E388CAC-F291-4183-9D84-655FE2663484/factory/sync/{elementId}
- Tags: PlaceOfServices
- Path params: elementId: string(uuid), required
- Response 200: PlaceOfServiceElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /ab4bfa75-5eae-4091-9c47-8d27360366f7
- Tags: SnoozeReasons
- Response 204: (no body)

### GET /ab4bfa75-5eae-4091-9c47-8d27360366f7
- Tags: SnoozeReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /ab4bfa75-5eae-4091-9c47-8d27360366f7/elements
- Tags: SnoozeReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /ab4bfa75-5eae-4091-9c47-8d27360366f7/elements/{elementId}
- Tags: SnoozeReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /ab4bfa75-5eae-4091-9c47-8d27360366f7/elements/{elementId}
- Tags: SnoozeReasons
- Path params: elementId: string(uuid), required
- Request body: SnoozeReasonUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /ab4bfa75-5eae-4091-9c47-8d27360366f7/elements/{elementId}/replace
- Tags: SnoozeReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /ab4bfa75-5eae-4091-9c47-8d27360366f7/elements/add
- Tags: SnoozeReasons
- Request body: SnoozeReasonAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /ab4bfa75-5eae-4091-9c47-8d27360366f7/elements/duplicate-check
- Tags: SnoozeReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /ab4bfa75-5eae-4091-9c47-8d27360366f7/factory/connect/{elementId}
- Tags: SnoozeReasons
- Path params: elementId: string(uuid), required
- Response 200: SnoozeReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /ab4bfa75-5eae-4091-9c47-8d27360366f7/factory/disconnect/{elementId}
- Tags: SnoozeReasons
- Path params: elementId: string(uuid), required
- Response 200: SnoozeReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /ab4bfa75-5eae-4091-9c47-8d27360366f7/factory/query
- Tags: SnoozeReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /ab4bfa75-5eae-4091-9c47-8d27360366f7/factory/sync
- Tags: SnoozeReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /ab4bfa75-5eae-4091-9c47-8d27360366f7/factory/sync/{elementId}
- Tags: SnoozeReasons
- Path params: elementId: string(uuid), required
- Response 200: SnoozeReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /abcbc8fa-e827-4850-ba16-faa944ab819a
- Tags: EntityOwners
- Response 204: (no body)

### GET /abcbc8fa-e827-4850-ba16-faa944ab819a
- Tags: EntityOwners
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /abcbc8fa-e827-4850-ba16-faa944ab819a/elements
- Tags: EntityOwners
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /abcbc8fa-e827-4850-ba16-faa944ab819a/elements/{elementId}
- Tags: EntityOwners
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /abcbc8fa-e827-4850-ba16-faa944ab819a/elements/{elementId}
- Tags: EntityOwners
- Path params: elementId: string(uuid), required
- Request body: EntityOwnerUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /abcbc8fa-e827-4850-ba16-faa944ab819a/elements/{elementId}/replace
- Tags: EntityOwners
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /abcbc8fa-e827-4850-ba16-faa944ab819a/elements/add
- Tags: EntityOwners
- Request body: EntityOwnerAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /abcbc8fa-e827-4850-ba16-faa944ab819a/elements/duplicate-check
- Tags: EntityOwners
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /abcbc8fa-e827-4850-ba16-faa944ab819a/factory/connect/{elementId}
- Tags: EntityOwners
- Path params: elementId: string(uuid), required
- Response 200: EntityOwnerElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /abcbc8fa-e827-4850-ba16-faa944ab819a/factory/disconnect/{elementId}
- Tags: EntityOwners
- Path params: elementId: string(uuid), required
- Response 200: EntityOwnerElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /abcbc8fa-e827-4850-ba16-faa944ab819a/factory/query
- Tags: EntityOwners
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /abcbc8fa-e827-4850-ba16-faa944ab819a/factory/sync
- Tags: EntityOwners
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /abcbc8fa-e827-4850-ba16-faa944ab819a/factory/sync/{elementId}
- Tags: EntityOwners
- Path params: elementId: string(uuid), required
- Response 200: EntityOwnerElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be
- Tags: HumanResourceTypes
- Response 204: (no body)

### GET /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be
- Tags: HumanResourceTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/elements
- Tags: HumanResourceTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/elements/{elementId}
- Tags: HumanResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/elements/{elementId}
- Tags: HumanResourceTypes
- Path params: elementId: string(uuid), required
- Request body: HumanResourceTypeUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/elements/{elementId}/replace
- Tags: HumanResourceTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/elements/add
- Tags: HumanResourceTypes
- Request body: HumanResourceTypeAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/elements/duplicate-check
- Tags: HumanResourceTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/factory/connect/{elementId}
- Tags: HumanResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: HumanResourceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/factory/disconnect/{elementId}
- Tags: HumanResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: HumanResourceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/factory/query
- Tags: HumanResourceTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/factory/sync
- Tags: HumanResourceTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /b4fc0ba9-7cbb-4dc0-9f65-b81da83c82be/factory/sync/{elementId}
- Tags: HumanResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: HumanResourceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /b79d0186-983d-44ae-9516-498201dc5172
- Tags: InterventionResolutionTypes
- Response 204: (no body)

### GET /b79d0186-983d-44ae-9516-498201dc5172
- Tags: InterventionResolutionTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /b79d0186-983d-44ae-9516-498201dc5172/elements
- Tags: InterventionResolutionTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /b79d0186-983d-44ae-9516-498201dc5172/elements/{elementId}
- Tags: InterventionResolutionTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /b79d0186-983d-44ae-9516-498201dc5172/elements/{elementId}
- Tags: InterventionResolutionTypes
- Path params: elementId: string(uuid), required
- Request body: InterventionResolutionTypeElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /b79d0186-983d-44ae-9516-498201dc5172/elements/{elementId}/replace
- Tags: InterventionResolutionTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /b79d0186-983d-44ae-9516-498201dc5172/elements/add
- Tags: InterventionResolutionTypes
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /b79d0186-983d-44ae-9516-498201dc5172/elements/duplicate-check
- Tags: InterventionResolutionTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /b79d0186-983d-44ae-9516-498201dc5172/factory/connect/{elementId}
- Tags: InterventionResolutionTypes
- Path params: elementId: string(uuid), required
- Response 200: InterventionResolutionTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /b79d0186-983d-44ae-9516-498201dc5172/factory/disconnect/{elementId}
- Tags: InterventionResolutionTypes
- Path params: elementId: string(uuid), required
- Response 200: InterventionResolutionTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /b79d0186-983d-44ae-9516-498201dc5172/factory/query
- Tags: InterventionResolutionTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /b79d0186-983d-44ae-9516-498201dc5172/factory/sync
- Tags: InterventionResolutionTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /b79d0186-983d-44ae-9516-498201dc5172/factory/sync/{elementId}
- Tags: InterventionResolutionTypes
- Path params: elementId: string(uuid), required
- Response 200: InterventionResolutionTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /BE6A4628-F42E-4E00-8303-1025408DEED1
- Tags: ClaimUpdateReasons
- Response 204: (no body)

### GET /BE6A4628-F42E-4E00-8303-1025408DEED1
- Tags: ClaimUpdateReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /BE6A4628-F42E-4E00-8303-1025408DEED1/elements
- Tags: ClaimUpdateReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /BE6A4628-F42E-4E00-8303-1025408DEED1/elements/{elementId}
- Tags: ClaimUpdateReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /BE6A4628-F42E-4E00-8303-1025408DEED1/elements/{elementId}
- Tags: ClaimUpdateReasons
- Path params: elementId: string(uuid), required
- Request body: ClaimUpdateReasonUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /BE6A4628-F42E-4E00-8303-1025408DEED1/elements/{elementId}/replace
- Tags: ClaimUpdateReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /BE6A4628-F42E-4E00-8303-1025408DEED1/elements/add
- Tags: ClaimUpdateReasons
- Request body: ClaimUpdateReasonAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /BE6A4628-F42E-4E00-8303-1025408DEED1/elements/duplicate-check
- Tags: ClaimUpdateReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /BE6A4628-F42E-4E00-8303-1025408DEED1/factory/connect/{elementId}
- Tags: ClaimUpdateReasons
- Path params: elementId: string(uuid), required
- Response 200: ClaimUpdateReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /BE6A4628-F42E-4E00-8303-1025408DEED1/factory/disconnect/{elementId}
- Tags: ClaimUpdateReasons
- Path params: elementId: string(uuid), required
- Response 200: ClaimUpdateReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /BE6A4628-F42E-4E00-8303-1025408DEED1/factory/query
- Tags: ClaimUpdateReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /BE6A4628-F42E-4E00-8303-1025408DEED1/factory/sync
- Tags: ClaimUpdateReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /BE6A4628-F42E-4E00-8303-1025408DEED1/factory/sync/{elementId}
- Tags: ClaimUpdateReasons
- Path params: elementId: string(uuid), required
- Response 200: ClaimUpdateReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /c52bf578-c7c5-4549-8c23-fa1dbf547152
- Tags: DeferReasons
- Response 204: (no body)

### GET /c52bf578-c7c5-4549-8c23-fa1dbf547152
- Tags: DeferReasons
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /c52bf578-c7c5-4549-8c23-fa1dbf547152/elements
- Tags: DeferReasons
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /c52bf578-c7c5-4549-8c23-fa1dbf547152/elements/{elementId}
- Tags: DeferReasons
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /c52bf578-c7c5-4549-8c23-fa1dbf547152/elements/{elementId}
- Tags: DeferReasons
- Path params: elementId: string(uuid), required
- Request body: DeferReasonUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /c52bf578-c7c5-4549-8c23-fa1dbf547152/elements/{elementId}/replace
- Tags: DeferReasons
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /c52bf578-c7c5-4549-8c23-fa1dbf547152/elements/add
- Tags: DeferReasons
- Request body: DeferReasonAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /c52bf578-c7c5-4549-8c23-fa1dbf547152/elements/duplicate-check
- Tags: DeferReasons
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /c52bf578-c7c5-4549-8c23-fa1dbf547152/factory/connect/{elementId}
- Tags: DeferReasons
- Path params: elementId: string(uuid), required
- Response 200: DeferReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /c52bf578-c7c5-4549-8c23-fa1dbf547152/factory/disconnect/{elementId}
- Tags: DeferReasons
- Path params: elementId: string(uuid), required
- Response 200: DeferReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /c52bf578-c7c5-4549-8c23-fa1dbf547152/factory/query
- Tags: DeferReasons
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /c52bf578-c7c5-4549-8c23-fa1dbf547152/factory/sync
- Tags: DeferReasons
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /c52bf578-c7c5-4549-8c23-fa1dbf547152/factory/sync/{elementId}
- Tags: DeferReasons
- Path params: elementId: string(uuid), required
- Response 200: DeferReasonElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /cc095e38-a8ff-411a-8096-6b827e585f12
- Tags: FacilityResourceTypes
- Response 204: (no body)

### GET /cc095e38-a8ff-411a-8096-6b827e585f12
- Tags: FacilityResourceTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /cc095e38-a8ff-411a-8096-6b827e585f12/elements
- Tags: FacilityResourceTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /cc095e38-a8ff-411a-8096-6b827e585f12/elements/{elementId}
- Tags: FacilityResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /cc095e38-a8ff-411a-8096-6b827e585f12/elements/{elementId}
- Tags: FacilityResourceTypes
- Path params: elementId: string(uuid), required
- Request body: FacilityResourceTypeUpdateElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /cc095e38-a8ff-411a-8096-6b827e585f12/elements/{elementId}/replace
- Tags: FacilityResourceTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /cc095e38-a8ff-411a-8096-6b827e585f12/elements/add
- Tags: FacilityResourceTypes
- Request body: FacilityResourceTypeAddElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /cc095e38-a8ff-411a-8096-6b827e585f12/elements/duplicate-check
- Tags: FacilityResourceTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /cc095e38-a8ff-411a-8096-6b827e585f12/factory/connect/{elementId}
- Tags: FacilityResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: FacilityResourceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /cc095e38-a8ff-411a-8096-6b827e585f12/factory/disconnect/{elementId}
- Tags: FacilityResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: FacilityResourceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /cc095e38-a8ff-411a-8096-6b827e585f12/factory/query
- Tags: FacilityResourceTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /cc095e38-a8ff-411a-8096-6b827e585f12/factory/sync
- Tags: FacilityResourceTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /cc095e38-a8ff-411a-8096-6b827e585f12/factory/sync/{elementId}
- Tags: FacilityResourceTypes
- Path params: elementId: string(uuid), required
- Response 200: FacilityResourceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /dc6e9634-e485-4239-a520-478ee4f1f37f
- Tags: EngagementTopics
- Response 204: (no body)

### GET /dc6e9634-e485-4239-a520-478ee4f1f37f
- Tags: EngagementTopics
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /dc6e9634-e485-4239-a520-478ee4f1f37f/elements
- Tags: EngagementTopics
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /dc6e9634-e485-4239-a520-478ee4f1f37f/elements/{elementId}
- Tags: EngagementTopics
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /dc6e9634-e485-4239-a520-478ee4f1f37f/elements/{elementId}
- Tags: EngagementTopics
- Path params: elementId: string(uuid), required
- Request body: EngagementTopicElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /dc6e9634-e485-4239-a520-478ee4f1f37f/elements/{elementId}/replace
- Tags: EngagementTopics
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /dc6e9634-e485-4239-a520-478ee4f1f37f/elements/add
- Tags: EngagementTopics
- Request body: EngagementTopicElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /dc6e9634-e485-4239-a520-478ee4f1f37f/elements/duplicate-check
- Tags: EngagementTopics
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /dc6e9634-e485-4239-a520-478ee4f1f37f/factory/connect/{elementId}
- Tags: EngagementTopics
- Path params: elementId: string(uuid), required
- Response 200: EngagementTopicElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /dc6e9634-e485-4239-a520-478ee4f1f37f/factory/disconnect/{elementId}
- Tags: EngagementTopics
- Path params: elementId: string(uuid), required
- Response 200: EngagementTopicElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /dc6e9634-e485-4239-a520-478ee4f1f37f/factory/query
- Tags: EngagementTopics
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /dc6e9634-e485-4239-a520-478ee4f1f37f/factory/sync
- Tags: EngagementTopics
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /dc6e9634-e485-4239-a520-478ee4f1f37f/factory/sync/{elementId}
- Tags: EngagementTopics
- Path params: elementId: string(uuid), required
- Response 200: EngagementTopicElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /de624d38-4c54-4b7f-9bde-dff572f4fcc0
- Tags: FinancialAccessLevels
- Response 204: (no body)

### GET /de624d38-4c54-4b7f-9bde-dff572f4fcc0
- Tags: FinancialAccessLevels
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /de624d38-4c54-4b7f-9bde-dff572f4fcc0/elements
- Tags: FinancialAccessLevels
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /de624d38-4c54-4b7f-9bde-dff572f4fcc0/elements/{elementId}
- Tags: FinancialAccessLevels
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /de624d38-4c54-4b7f-9bde-dff572f4fcc0/elements/{elementId}
- Tags: FinancialAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /de624d38-4c54-4b7f-9bde-dff572f4fcc0/elements/{elementId}/replace
- Tags: FinancialAccessLevels
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /de624d38-4c54-4b7f-9bde-dff572f4fcc0/elements/add
- Tags: FinancialAccessLevels
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /de624d38-4c54-4b7f-9bde-dff572f4fcc0/elements/duplicate-check
- Tags: FinancialAccessLevels
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /de624d38-4c54-4b7f-9bde-dff572f4fcc0/factory/connect/{elementId}
- Tags: FinancialAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: FinancialAccessLevelElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /de624d38-4c54-4b7f-9bde-dff572f4fcc0/factory/disconnect/{elementId}
- Tags: FinancialAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: FinancialAccessLevelElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /de624d38-4c54-4b7f-9bde-dff572f4fcc0/factory/query
- Tags: FinancialAccessLevels
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /de624d38-4c54-4b7f-9bde-dff572f4fcc0/factory/sync
- Tags: FinancialAccessLevels
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /de624d38-4c54-4b7f-9bde-dff572f4fcc0/factory/sync/{elementId}
- Tags: FinancialAccessLevels
- Path params: elementId: string(uuid), required
- Response 200: FinancialAccessLevelElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /de855cac-e4dc-43f9-a561-8ee71c3a09fc
- Tags: ContactRelationships
- Response 204: (no body)

### GET /de855cac-e4dc-43f9-a561-8ee71c3a09fc
- Tags: ContactRelationships
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /de855cac-e4dc-43f9-a561-8ee71c3a09fc/elements
- Tags: ContactRelationships
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /de855cac-e4dc-43f9-a561-8ee71c3a09fc/elements/{elementId}
- Tags: ContactRelationships
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /de855cac-e4dc-43f9-a561-8ee71c3a09fc/elements/{elementId}
- Tags: ContactRelationships
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /de855cac-e4dc-43f9-a561-8ee71c3a09fc/elements/{elementId}/replace
- Tags: ContactRelationships
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /de855cac-e4dc-43f9-a561-8ee71c3a09fc/elements/add
- Tags: ContactRelationships
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /de855cac-e4dc-43f9-a561-8ee71c3a09fc/elements/duplicate-check
- Tags: ContactRelationships
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /de855cac-e4dc-43f9-a561-8ee71c3a09fc/factory/connect/{elementId}
- Tags: ContactRelationships
- Path params: elementId: string(uuid), required
- Response 200: ContactRelationshipElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /de855cac-e4dc-43f9-a561-8ee71c3a09fc/factory/disconnect/{elementId}
- Tags: ContactRelationships
- Path params: elementId: string(uuid), required
- Response 200: ContactRelationshipElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /de855cac-e4dc-43f9-a561-8ee71c3a09fc/factory/query
- Tags: ContactRelationships
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /de855cac-e4dc-43f9-a561-8ee71c3a09fc/factory/sync
- Tags: ContactRelationships
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /de855cac-e4dc-43f9-a561-8ee71c3a09fc/factory/sync/{elementId}
- Tags: ContactRelationships
- Path params: elementId: string(uuid), required
- Response 200: ContactRelationshipElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /E0889B88-9738-430D-9B3C-FA136E427454
- Tags: MSPInsuranceTypes
- Response 204: (no body)

### GET /E0889B88-9738-430D-9B3C-FA136E427454
- Tags: MSPInsuranceTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /E0889B88-9738-430D-9B3C-FA136E427454/elements
- Tags: MSPInsuranceTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /E0889B88-9738-430D-9B3C-FA136E427454/elements/{elementId}
- Tags: MSPInsuranceTypes
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /E0889B88-9738-430D-9B3C-FA136E427454/elements/{elementId}
- Tags: MSPInsuranceTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /E0889B88-9738-430D-9B3C-FA136E427454/elements/{elementId}/replace
- Tags: MSPInsuranceTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /E0889B88-9738-430D-9B3C-FA136E427454/elements/add
- Tags: MSPInsuranceTypes
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /E0889B88-9738-430D-9B3C-FA136E427454/elements/duplicate-check
- Tags: MSPInsuranceTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /E0889B88-9738-430D-9B3C-FA136E427454/factory/connect/{elementId}
- Tags: MSPInsuranceTypes
- Path params: elementId: string(uuid), required
- Response 200: MSPInsuranceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /E0889B88-9738-430D-9B3C-FA136E427454/factory/disconnect/{elementId}
- Tags: MSPInsuranceTypes
- Path params: elementId: string(uuid), required
- Response 200: MSPInsuranceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /E0889B88-9738-430D-9B3C-FA136E427454/factory/query
- Tags: MSPInsuranceTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /E0889B88-9738-430D-9B3C-FA136E427454/factory/sync
- Tags: MSPInsuranceTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /E0889B88-9738-430D-9B3C-FA136E427454/factory/sync/{elementId}
- Tags: MSPInsuranceTypes
- Path params: elementId: string(uuid), required
- Response 200: MSPInsuranceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /ed6724ec-1e3a-40ba-89f0-619bf956419d
- Tags: Languages
- Response 204: (no body)

### GET /ed6724ec-1e3a-40ba-89f0-619bf956419d
- Tags: Languages
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /ed6724ec-1e3a-40ba-89f0-619bf956419d/elements
- Tags: Languages
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### PUT /ed6724ec-1e3a-40ba-89f0-619bf956419d/elements/{elementId}
- Tags: Languages
- Path params: elementId: string(uuid), required
- Request body: ElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /ed6724ec-1e3a-40ba-89f0-619bf956419d/elements/{elementId}
- Tags: Languages
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### POST /ed6724ec-1e3a-40ba-89f0-619bf956419d/elements/{elementId}/replace
- Tags: Languages
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /ed6724ec-1e3a-40ba-89f0-619bf956419d/elements/add
- Tags: Languages
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /ed6724ec-1e3a-40ba-89f0-619bf956419d/elements/duplicate-check
- Tags: Languages
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /ed6724ec-1e3a-40ba-89f0-619bf956419d/factory/connect/{elementId}
- Tags: Languages
- Path params: elementId: string(uuid), required
- Response 200: LanguageElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /ed6724ec-1e3a-40ba-89f0-619bf956419d/factory/disconnect/{elementId}
- Tags: Languages
- Path params: elementId: string(uuid), required
- Response 200: LanguageElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /ed6724ec-1e3a-40ba-89f0-619bf956419d/factory/query
- Tags: Languages
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /ed6724ec-1e3a-40ba-89f0-619bf956419d/factory/sync
- Tags: Languages
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /ed6724ec-1e3a-40ba-89f0-619bf956419d/factory/sync/{elementId}
- Tags: Languages
- Path params: elementId: string(uuid), required
- Response 200: LanguageElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /f0f5f6b0-6693-4290-9639-eda97db5711e
- Tags: ReservedFundCategories
- Response 204: (no body)

### GET /f0f5f6b0-6693-4290-9639-eda97db5711e
- Tags: ReservedFundCategories
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /f0f5f6b0-6693-4290-9639-eda97db5711e/elements
- Tags: ReservedFundCategories
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /f0f5f6b0-6693-4290-9639-eda97db5711e/elements/{elementId}
- Tags: ReservedFundCategories
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /f0f5f6b0-6693-4290-9639-eda97db5711e/elements/{elementId}
- Tags: ReservedFundCategories
- Path params: elementId: string(uuid), required
- Request body: ReservedFundCategoryElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /f0f5f6b0-6693-4290-9639-eda97db5711e/elements/{elementId}/replace
- Tags: ReservedFundCategories
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /f0f5f6b0-6693-4290-9639-eda97db5711e/elements/add
- Tags: ReservedFundCategories
- Request body: ReservedFundCategoryElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /f0f5f6b0-6693-4290-9639-eda97db5711e/elements/duplicate-check
- Tags: ReservedFundCategories
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /f0f5f6b0-6693-4290-9639-eda97db5711e/factory/connect/{elementId}
- Tags: ReservedFundCategories
- Path params: elementId: string(uuid), required
- Response 200: ReservedFundCategoryElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /f0f5f6b0-6693-4290-9639-eda97db5711e/factory/disconnect/{elementId}
- Tags: ReservedFundCategories
- Path params: elementId: string(uuid), required
- Response 200: ReservedFundCategoryElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /f0f5f6b0-6693-4290-9639-eda97db5711e/factory/query
- Tags: ReservedFundCategories
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /f0f5f6b0-6693-4290-9639-eda97db5711e/factory/sync
- Tags: ReservedFundCategories
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /f0f5f6b0-6693-4290-9639-eda97db5711e/factory/sync/{elementId}
- Tags: ReservedFundCategories
- Path params: elementId: string(uuid), required
- Response 200: ReservedFundCategoryElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /F4F28CCC-0EFE-4E82-B188-B69759112CCB
- Tags: ClaimStatusResponseCodes
- Response 204: (no body)

### GET /F4F28CCC-0EFE-4E82-B188-B69759112CCB
- Tags: ClaimStatusResponseCodes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /F4F28CCC-0EFE-4E82-B188-B69759112CCB/elements
- Tags: ClaimStatusResponseCodes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /F4F28CCC-0EFE-4E82-B188-B69759112CCB/elements/{elementId}
- Tags: ClaimStatusResponseCodes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /F4F28CCC-0EFE-4E82-B188-B69759112CCB/elements/{elementId}
- Tags: ClaimStatusResponseCodes
- Path params: elementId: string(uuid), required
- Request body: ClaimStatusResponseCodeElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /F4F28CCC-0EFE-4E82-B188-B69759112CCB/elements/{elementId}/replace
- Tags: ClaimStatusResponseCodes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /F4F28CCC-0EFE-4E82-B188-B69759112CCB/elements/add
- Tags: ClaimStatusResponseCodes
- Request body: ElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /F4F28CCC-0EFE-4E82-B188-B69759112CCB/elements/duplicate-check
- Tags: ClaimStatusResponseCodes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /F4F28CCC-0EFE-4E82-B188-B69759112CCB/factory/connect/{elementId}
- Tags: ClaimStatusResponseCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusResponseCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /F4F28CCC-0EFE-4E82-B188-B69759112CCB/factory/disconnect/{elementId}
- Tags: ClaimStatusResponseCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusResponseCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /F4F28CCC-0EFE-4E82-B188-B69759112CCB/factory/query
- Tags: ClaimStatusResponseCodes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /F4F28CCC-0EFE-4E82-B188-B69759112CCB/factory/sync
- Tags: ClaimStatusResponseCodes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /F4F28CCC-0EFE-4E82-B188-B69759112CCB/factory/sync/{elementId}
- Tags: ClaimStatusResponseCodes
- Path params: elementId: string(uuid), required
- Response 200: ClaimStatusResponseCodeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /f7179087-fb3d-484d-8188-a03849f0f779
- Tags: ServiceTypes
- Response 204: (no body)

### GET /f7179087-fb3d-484d-8188-a03849f0f779
- Tags: ServiceTypes
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /f7179087-fb3d-484d-8188-a03849f0f779/elements
- Tags: ServiceTypes
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /f7179087-fb3d-484d-8188-a03849f0f779/elements/{elementId}
- Tags: ServiceTypes
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /f7179087-fb3d-484d-8188-a03849f0f779/elements/{elementId}
- Tags: ServiceTypes
- Path params: elementId: string(uuid), required
- Request body: ServiceTypeRequest
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /f7179087-fb3d-484d-8188-a03849f0f779/elements/{elementId}/replace
- Tags: ServiceTypes
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /f7179087-fb3d-484d-8188-a03849f0f779/elements/add
- Tags: ServiceTypes
- Request body: ServiceTypeRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /f7179087-fb3d-484d-8188-a03849f0f779/elements/duplicate-check
- Tags: ServiceTypes
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /f7179087-fb3d-484d-8188-a03849f0f779/factory/connect/{elementId}
- Tags: ServiceTypes
- Path params: elementId: string(uuid), required
- Response 200: ServiceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /f7179087-fb3d-484d-8188-a03849f0f779/factory/disconnect/{elementId}
- Tags: ServiceTypes
- Path params: elementId: string(uuid), required
- Response 200: ServiceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /f7179087-fb3d-484d-8188-a03849f0f779/factory/query
- Tags: ServiceTypes
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /f7179087-fb3d-484d-8188-a03849f0f779/factory/sync
- Tags: ServiceTypes
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /f7179087-fb3d-484d-8188-a03849f0f779/factory/sync/{elementId}
- Tags: ServiceTypes
- Path params: elementId: string(uuid), required
- Response 200: ServiceTypeElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /FactoryCodeSystems/CustomValues/{catalogId}
- Tags: FactoryCodeSystems
- Path params: catalogId: string(uuid), required
- Response 200: ShowValues[]
- Response 404: ProblemDetails

### GET /FactoryCodeSystems/DB
- Tags: FactoryCodeSystemsDB
- Response 200: DBCodeSystem
- Response 404: ProblemDetails

### GET /FactoryCodeSystems/DB/Codes/{codeSystemId}
- Tags: FactoryCodeSystemsDB
- Path params: codeSystemId: string(uuid), required
- Response 200: DBCodeMapping
- Response 404: ProblemDetails

### GET /FactoryCodeSystems/DB/Codes/{codeSystemId}/{catalog}
- Tags: FactoryCodeSystemsDB
- Path params: codeSystemId: string(uuid), required; catalog: string, required
- Response 200: DBCodeMapping
- Response 404: ProblemDetails

### GET /FactoryCodeSystems/DB/CustomCodeCatalogs
- Tags: FactoryCodeSystemsDB
- Response 200: DBCustomCodeCatalog
- Response 404: ProblemDetails

### GET /FactoryCodeSystems/FactoryValues/{catalogId}
- Tags: FactoryCodeSystems
- Path params: catalogId: string(uuid), required
- Response 200: ShowValues[]
- Response 404: ProblemDetails

### POST /FactoryCodeSystems/FactoryValues/{catalogId}/element/find
- Tags: FactoryCodeSystems
- Path params: catalogId: string(uuid), required
- Request body: FactoryCodeSystemElementRequest
- Response 200: ShowValues[]
- Response 404: ProblemDetails

### POST /FactoryCodeSystems/id/{catalogId}/element/find
- Tags: FactoryCodeSystems
- Path params: catalogId: string(uuid), required
- Request body: FactoryCodeSystemElementIdRequest
- Response 200: string

### POST /FactoryCodeSystems/value/{catalogId}/element/find
- Tags: FactoryCodeSystems
- Path params: catalogId: string(uuid), required
- Request body: FactoryCodeSystemElementValueRequest
- Response 200: string

### PUT /FactoryCodeSystems/Values/{catalogId}/element
- Tags: FactoryCodeSystems
- Path params: catalogId: string(uuid), required
- Request body: FactoryCodeSystemCustomValues
- Response 200: ShowValues[]
- Response 404: ProblemDetails

### POST /FactoryCodeSystems/Values/{catalogId}/element/find
- Tags: FactoryCodeSystems
- Path params: catalogId: string(uuid), required
- Request body: FactoryCodeSystemElementRequest
- Response 200: ShowValues[]
- Response 404: ProblemDetails

### PUT /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30
- Tags: States
- Response 204: (no body)

### GET /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30
- Tags: States
- Response 200: CatalogHeader
- Response 404: ProblemDetails

### GET /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/elements
- Tags: States
- Response 200: ElementListResponseBase[]
- Response 404: ProblemDetails

### GET /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/elements/{elementId}
- Tags: States
- Path params: elementId: string(uuid), required
- Response 200: ElementResponse
- Response 404: ProblemDetails

### PUT /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/elements/{elementId}
- Tags: States
- Path params: elementId: string(uuid), required
- Request body: StatesElementRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/elements/{elementId}/replace
- Tags: States
- Path params: elementId: string(uuid), required
- Request body: string(uuid)
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/elements/add
- Tags: States
- Request body: StatesElementRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails

### POST /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/elements/duplicate-check
- Tags: States
- Request body: DuplicateNameSearchRequest
- Response 200: DuplicateNameSearchResponse
- Response 404: ProblemDetails

### PUT /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/factory/connect/{elementId}
- Tags: States
- Path params: elementId: string(uuid), required
- Response 200: StateElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### PUT /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/factory/disconnect/{elementId}
- Tags: States
- Path params: elementId: string(uuid), required
- Response 200: StateElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/factory/query
- Tags: States
- Response 200: FactoryUpdateSummary
- Response 404: ProblemDetails

### POST /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/factory/sync
- Tags: States
- Query params: force: boolean
- Response 200: ElementListResponseBase[]

### POST /fe5dc3ef-33c4-45d1-acde-8ebb4d8fff30/factory/sync/{elementId}
- Tags: States
- Path params: elementId: string(uuid), required
- Response 200: StateElement
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /list
- Tags: Catalogs
- Response 201: CatalogsList

### GET /Vendor/FactoryCodeSystems
- Tags: Vendor
- Response 200: FactoryCodeSystem
- Response 404: ProblemDetails

### PUT /Vendor/FactoryCodeSystems/SetStatus
- Tags: Vendor
- Request body: FactoryCodeSystemStatus[]
- Response 200: (no body)
- Response 404: ProblemDetails

## Schemas

**ActivityCodeFactoryResult**
  - code: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - appointmentTypeId: ['null', 'string'](uuid) (required)
  - unitId: string(uuid) (required)
  - departmentId: ['null', 'string'](uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - ndc: ['null', 'string'] (required)
  - modifierId: ['null', 'string'](uuid) (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - syncStatus: ComplexCatalogSyncStatus (required)
  - isExpired: boolean (required)
  - hasUpdates: boolean (required)
  - lastSyncTime: ['null', 'string'](date-time) (required)

**ActivityCodeFactorySearchCriteria**
  - code: ['null', 'string'] (required)
  - shortDescriptionSearch: ['null', 'string']
  - appointmentTypes: ['null', 'array'] (required)
  - includeExpired: boolean (required)
  - factorySearchType: FacorySearchType (required)
  - factorySetId: ['null', 'string'](uuid) (required)

**ActivityCodeRequest**
  - code: ['null', 'string'] (required)

**ActivityTypeElement**
  - appointmentTypeId: ['null', 'string'](uuid)
  - shortDescription: ['null', 'string']
  - unitId: string(uuid)
  - departmentId: ['null', 'string'](uuid)
  - portfolioType: PortfolioType
  - chargeCode: ['null', 'string']
  - ndc: ['null', 'string']
  - modifierId: ['null', 'string'](uuid)
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ActivityTypeElementResponse**
  - elementId: string(uuid) (required)
  - appointmentTypes: ['null', 'array'] (required)
  - shortDescription: ['null', 'string'] (required)
  - unitId: string(uuid) (required)
  - departmentId: ['null', 'string'](uuid) (required)
  - chargeCode: ['null', 'string'] (required)
  - ndc: ['null', 'string'] (required)
  - modifierId: ['null', 'string'](uuid) (required)
  - isExpired: boolean (required)
  - appointmentTypeId: ['null', 'string'](uuid)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**AddActivityCodeRequest**
  - name: ['null', 'string'] (required)
  - unitId: string(uuid) (required)
  - portfolioType: PortfolioType
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**AlternatePortfolioTypeAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**AlternatePortfolioTypeElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**AlternatePortfolioTypeUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**AppointmentCancellationReasonElement**
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**AppointmentCancellationReasonElementRequest**
  - elementName: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**AppointmentTypeElement**
  - description: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - durationHours: ['null', 'integer', 'string'](int32) (required)
  - durationMinutes: ['null', 'integer', 'string'](int32) (required)
  - serviceTypeId: ['null', 'string'](uuid) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ArrivalStatusElement**
  - description: ['null', 'string'] (required)
  - intakeCategory: IntakeCategory (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**BenefitAssignmentAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**BenefitAssignmentElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**BenefitAssignmentUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**CatalogHeader**
  - catalogId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - custom: boolean (required)
  - elementName: ['null', 'string'] (required)
  - lastSyncTime: ['null', 'string'](date-time) (required)
  - syncStatus: FactorySyncStatus (required)

**CatalogListItem**
  - (no properties)

**CatalogsList**
  - organizationId: ['null', 'string'] (required)
  - items: ['null', 'array']
  - id: ['null', 'string']
  - partition: ['null', 'string']

**ChargeCodeElement**
  - name: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - type: ['null', 'string'] (required)
  - departmentId: ['null', 'string'](uuid) (required)
  - shortDescription: ['null', 'string'] (required)
  - section: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - isDisconnected: boolean (required)
  - isRemoved: boolean (required)
  - isExpired: boolean (required)
  - createdDate: string(date-time) (required)

**ChargeCodeFactoryResult**
  - code: ['null', 'string'] (required)
  - type: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - section: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - syncStatus: ComplexCatalogSyncStatus (required)
  - isExpired: boolean (required)
  - hasUpdates: boolean (required)
  - lastSyncTime: ['null', 'string'](date-time) (required)

**ChargeCodeFactorySearchCriteria**
  - code: ['null', 'string'] (required)
  - shortDescriptionSearch: ['null', 'string']
  - includeExpired: boolean (required)
  - factorySearchType: FacorySearchType (required)
  - factorySetId: ['null', 'string'](uuid) (required)

**ClaimStatusCategoryCodeElement**
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ClaimStatusCategoryCodeElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)

**ClaimStatusCodeElement**
  - definition: ['null', 'string']
  - shortDescription: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ClaimStatusCodesElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)

**ClaimStatusResponseCodeElement**
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ClaimStatusResponseCodeElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)

**ClaimUpdateReasonAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**ClaimUpdateReasonElement**
  - shortDescription: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ClaimUpdateReasonUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - shortDescription: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)

**ClinicalAccessLevelElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ComplexCatalogSyncStatus**
  - (no properties)

**ConditionCodeAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**ConditionCodeElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ConditionCodeUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**ContactRelationshipElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ContactUseAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**ContactUseElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ContactUseUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**ContractualAdjustmentReasonAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)

**ContractualAdjustmentReasonElement**
  - shortDescription: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ContractualAdjustmentReasonUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - shortDescription: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)

**Cost**
  - costId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - value: ['number', 'string'](double) (required)
  - startDate: object (required)
  - endDate: object (required)

**CostRequest**
  - costId: ['null', 'string'](uuid) (required)
  - value: ['number', 'string'](double) (required)
  - startDate: object (required)
  - endDate: object (required)

**CostSummary**
  - costId: string(uuid) (required)
  - locationId: string(uuid) (required)
  - value: ['number', 'string'](double) (required)
  - startDate: object (required)
  - endDate: object (required)
  - isActive: boolean (required)

**CreateAppointmentTypeRequest**
  - color: ['null', 'string'] (required)
  - durationHours: ['null', 'integer', 'string'](int32) (required)
  - durationMinutes: ['null', 'integer', 'string'](int32) (required)
  - serviceTypeId: string(uuid) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**CreateProviderRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'](uuid) (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - addressStateId: ['null', 'string'](uuid) (required)
  - addressCity: ['null', 'string'] (required)
  - addressZipCode: ['null', 'string'] (required)
  - addressCounty: ['null', 'string'] (required)
  - contactPhoneNumber: ['null', 'string'] (required)
  - contactPhoneNumberExtension: ['null', 'string'] (required)
  - contactFaxNumber: ['null', 'string'] (required)
  - contactFaxNumberExtension: ['null', 'string'] (required)

**CreateScheduleBlockTypeRequest**
  - description: ['null', 'string']
  - color: ['null', 'string'] (required)
  - durationHours: ['null', 'integer', 'string'](int32) (required)
  - durationMinutes: ['null', 'integer', 'string'](int32) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**Date**
  - (no properties)

**DBCodeMapping**
  - catalog: ['null', 'string'] (required)
  - catalogKey: ['null', 'string'] (required)
  - codeSystemValue: ['null', 'string'] (required)

**DBCodeSystem**
  - codeSystemId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - archived: boolean (required)

**DBCustomCodeCatalog**
  - codeSystemId: string(uuid) (required)
  - catalog: ['null', 'string'] (required)

**DeferReasonAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**DeferReasonElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**DeferReasonUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**DepartmentAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**DepartmentElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**DepartmentUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**DiagnosisCodeElement**
  - id: ['null', 'string'] (required)
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - definition: ['null', 'string'] (required)
  - category: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - isDisconnected: boolean (required)
  - isRemoved: boolean (required)
  - isExpired: boolean (required)
  - createdDate: string(date-time) (required)

**DiagnosisCodeFactoryResult**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - definition: ['null', 'string'] (required)
  - category: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - syncStatus: ComplexCatalogSyncStatus (required)
  - isExpired: boolean (required)
  - hasUpdates: boolean (required)

**DiagnosisCodeFactorySearchCriteria**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType
  - shortDescriptionSearch: ['null', 'string']
  - includeExpired: boolean (required)
  - factorySearchType: FacorySearchType (required)
  - factorySetId: ['null', 'string'](uuid) (required)

**DocumentTypeElement**
  - description: ['null', 'string'] (required)
  - expirationPeriod: ExpirationPeriods (required)
  - expirationValue: ['integer', 'string'](int32) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**DuplicateNameSearchRequest**
  - elementName: ['null', 'string'] (required)
  - excludedElementId: ['null', 'string'](uuid) (required)

**DuplicateNameSearchResponse**
  - hasDuplicates: boolean
  - duplicates: ['null', 'array'] (required)

**ElementListResponseBase**
  - elementId: string(uuid) (required)
  - elementName: ['null', 'string'] (required)
  - isExpired: boolean (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)

**ElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**ElementResponse**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**EngagementMethodElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**EngagementMethodElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**EngagementTopicElement**
  - color: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**EngagementTopicElementRequest**
  - elementName: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**EntityOwnerAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']
  - color: ['null', 'string']

**EntityOwnerElement**
  - description: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**EntityOwnerUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']
  - color: ['null', 'string']

**EthnicityElement**
  - aggregateEthnicity: ['null', 'string'](uuid) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**EthnicityRequest**
  - aggregateEthnicity: ['null', 'string'](uuid) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**ExpirationPeriods**
  - (no properties)

**ExtensionAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**ExtensionElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ExtensionUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**FacilityResourceTypeAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']
  - color: ['null', 'string']

**FacilityResourceTypeElement**
  - description: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**FacilityResourceTypeUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']
  - color: ['null', 'string']

**FacorySearchType**
  - (no properties)

**FactoryCodeSystem**
  - codeSystemId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - enabled: boolean (required)

**FactoryCodeSystemCustomValues**
  - elementKey: ['null', 'string'] (required)
  - setValues: ['null', 'array'] (required)

**FactoryCodeSystemElementIdRequest**
  - elementValue: ['null', 'string'] (required)
  - codeSystemName: ['null', 'string'] (required)

**FactoryCodeSystemElementRequest**
  - elementKey: ['null', 'string']

**FactoryCodeSystemElementValueRequest**
  - elementKey: ['null', 'string']
  - codeSystemName: ['null', 'string'] (required)

**FactoryCodeSystemStatus**
  - codeSystemId: string(uuid) (required)
  - enabled: boolean (required)

**FactoryImportCodesCriteria**
  - codes: ['null', 'array'] (required)

**FactorySyncRequest**
  - code: ['null', 'string'] (required)

**FactorySyncResponse**
  - catalogId: string(uuid) (required)
  - status: FactorySyncStatus (required)

**FactorySyncStatus**
  - (no properties)

**FactoryUpdatesResult**
  - lastUpdateTime: ['null', 'string'](date-time) (required)
  - updateCount: ['integer', 'string'](int32) (required)
  - hasUpdates: boolean

**FactoryUpdateSummary**
  - catalogId: string(uuid) (required)
  - updatedElementCount: ['integer', 'string'](int32) (required)
  - lastSyncTime: ['null', 'string'](date-time) (required)

**FinancialAccessLevelElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**GenderIdentityElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**HumanResourceTypeAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']
  - color: ['null', 'string']

**HumanResourceTypeElement**
  - description: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**HumanResourceTypeUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']
  - color: ['null', 'string']

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**IcdFactoryImportCodesCriteria**
  - icdCodes: ['null', 'array'] (required)

**IcdFactorySyncRequest**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)

**IntakeCategory**
  - (no properties)

**InterventionProgressElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**InterventionProgressElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - shortDescription: ['null', 'string'] (required)

**InterventionResolutionTypeElement**
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**InterventionResolutionTypeElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)

**InterventionTypeElement**
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - snoozeReasonSet: object (required)
  - orderedInterventionResolutionTypes: ['null', 'array'] (required)
  - orderedProgresses: ['null', 'array'] (required)
  - autoCloseDays: ['integer', 'string'](int32) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**InterventionTypesElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - snoozeReasonSet: object (required)
  - orderedInterventionResolutionTypes: ['null', 'array'] (required)
  - orderedProgresses: ['null', 'array'] (required)
  - autoCloseDays: ['integer', 'string'](int32) (required)

**LanguageElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**MaritalStatusElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ModifierElement**
  - definition: ['null', 'string']
  - shortDescription: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ModifiersElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)

**MSPInsuranceTypeElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**NationalDrugCodeElement**
  - name: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - unit: ['null', 'string'](uuid) (required)
  - amount: ['null', 'number', 'string'](double) (required)
  - unitConversionFactor: ['null', 'number', 'string'](double) (required)
  - shortDescription: ['null', 'string'] (required)
  - brandName: ['null', 'string'] (required)
  - genericName: ['null', 'string'] (required)
  - chargeCode: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - isDisconnected: boolean (required)
  - isRemoved: boolean (required)
  - isExpired: boolean (required)
  - createdDate: string(date-time) (required)

**NationalDrugCodeFactoryResult**
  - code: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - unit: ['null', 'string'](uuid) (required)
  - amount: ['null', 'number', 'string'](double) (required)
  - unitConversionFactor: ['null', 'number', 'string'](double) (required)
  - shortDescription: ['null', 'string'] (required)
  - brandName: ['null', 'string'] (required)
  - genericName: ['null', 'string'] (required)
  - chargeCode: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - syncStatus: ComplexCatalogSyncStatus (required)
  - isExpired: boolean (required)
  - hasUpdates: boolean (required)

**NationalDrugCodeFactorySearchCriteria**
  - code: ['null', 'string'] (required)
  - shortDescriptionSearch: ['null', 'string']
  - includeExpired: boolean (required)
  - factorySearchType: FacorySearchType (required)
  - factorySetId: ['null', 'string'](uuid) (required)

**NoncontractualAdjustmentReasonAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**NoncontractualAdjustmentReasonElement**
  - shortDescription: ['null', 'string'] (required)
  - isBadDebt: boolean (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**NoncontractualAdjustmentReasonUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - shortDescription: ['null', 'string'] (required)
  - isBadDebt: boolean (required)

**OverbookReasonAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**OverbookReasonElement**
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**OverbookReasonUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**PatientRelationshipElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**PaymentPlanTerminationReasonAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**PaymentPlanTerminationReasonElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**PaymentPlanTerminationReasonUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**PlaceOfServiceAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**PlaceOfServiceElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**PlaceOfServiceUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**PlanTypeElement**
  - requiresMSPInsuranceType: boolean (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**PortfolioType**
  - (no properties)

**PrivacyPolicyAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**PrivacyPolicyElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**PrivacyPolicyUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**PronounElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ProviderAddressUpdate**
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - addressStateId: ['null', 'string'](uuid) (required)
  - addressCity: ['null', 'string'] (required)
  - addressZipCode: ['null', 'string'] (required)
  - addressCounty: ['null', 'string'] (required)

**ProviderContactInformationUpdate**
  - contactPhoneNumber: ['null', 'string'] (required)
  - contactPhoneNumberExtension: ['null', 'string'] (required)
  - contactFaxNumber: ['null', 'string'] (required)
  - contactFaxNumberExtension: ['null', 'string'] (required)

**ProviderElementResponse**
  - elementId: string(uuid) (required)
  - elementName: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'](uuid) (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - addressStateId: ['null', 'string'](uuid) (required)
  - addressCity: ['null', 'string'] (required)
  - addressZipCode: ['null', 'string'] (required)
  - addressCounty: ['null', 'string'] (required)
  - contactPhoneNumber: ['null', 'string'] (required)
  - contactPhoneNumberExtension: ['null', 'string'] (required)
  - contactFaxNumber: ['null', 'string'] (required)
  - contactFaxNumberExtension: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - removed: boolean

**ProviderLevelAdjustmentReasonElement**
  - definition: ['null', 'string']
  - shortDescription: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ProviderLevelAdjustmentReasonsElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)

**ProviderSearchRequest**
  - npi: ['null', 'string']
  - specialtyId: ['null', 'string'](uuid)
  - searchExpired: boolean
  - firstName: ['null', 'string']
  - lastName: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']

**ProviderSearchResponse**
  - id: ['null', 'string'] (required)
  - npi: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - city: ['null', 'string'] (required)
  - stateId: ['null', 'string'] (required)
  - zipCode: ['null', 'string'] (required)
  - expired: boolean (required)

**RaceElement**
  - aggregateRace: ['null', 'string'](uuid) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**RaceRequest**
  - aggregateRace: ['null', 'string'](uuid) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**RefundReasonElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ReleaseInformationAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**ReleaseInformationElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ReleaseInformationUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**RemarkCodeElement**
  - definition: ['null', 'string']
  - shortDescription: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**RemarkCodesElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - definition: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)

**ReservedFundCategoryElement**
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**ReservedFundCategoryElementRequest**
  - elementName: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**ScheduleBlockTypeElement**
  - description: ['null', 'string']
  - shortDescription: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - durationHours: ['null', 'integer', 'string'](int32) (required)
  - durationMinutes: ['null', 'integer', 'string'](int32) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ServiceTypeElement**
  - divisionId: ['null', 'string'](uuid) (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ServiceTypeRequest**
  - divisionId: string(uuid) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**SetQualifier**
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)

**SetQualifierRequest**
  - setId: string(uuid)
  - isFactorySet: boolean

**SetValues**
  - codeSystemId: string(uuid) (required)
  - value: ['null', 'string'] (required)

**SexualOrientationElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**ShowValues**
  - codeSystemId: string(uuid) (required)
  - name: ['null', 'string']
  - key: ['null', 'string']
  - value: ['null', 'string']

**SignatureSourceAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**SignatureSourceElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**SignatureSourceUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**SnoozeReasonAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**SnoozeReasonElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**SnoozeReasonUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**SpecialtyElement**
  - taxonomyCode: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**StateElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**StatesElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - stateName: ['null', 'string']

**TagAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**TagElement**
  - description: ['null', 'string'] (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**TagUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**TestResultTypeAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**TestResultTypeElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**TestResultTypeUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**TransferReasonAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - description: ['null', 'string'] (required)

**TransferReasonElement**
  - shortDescription: ['null', 'string'] (required)
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**TransferReasonUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - shortDescription: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)

**UnderpaymentReasonElement**
  - serviceType: boolean (required)
  - outstandingBalance: boolean (required)
  - nonPayment: boolean (required)
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**UnderpaymentReasonRequest**
  - serviceType: boolean (required)
  - outstandingBalance: boolean (required)
  - nonPayment: boolean (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**UnitElement**
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - replaces: ['null', 'array'] (required)
  - custom: boolean (required)
  - isDisconnected: boolean (required)
  - removed: boolean (required)

**UpdateActivityCodeCostsRequest**
  - code: ['null', 'string'] (required)
  - costRequests: ['null', 'array']
  - date: object (required)

**UpdateActivityCodeRequest**
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - appointmentTypeId: ['null', 'string'](uuid) (required)
  - departmentId: ['null', 'string'](uuid) (required)
  - shortDescription: ['null', 'string'] (required)
  - unitId: string(uuid) (required)
  - portfolioType: object (required)
  - chargeCode: ['null', 'string'] (required)
  - ndc: ['null', 'string'] (required)
  - modifierId: ['null', 'string'](uuid) (required)

**UpdateAppointmentTypeRequest**
  - serviceTypeId: string(uuid) (required)
  - description: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - durationHours: ['null', 'integer', 'string'](int32) (required)
  - durationMinutes: ['null', 'integer', 'string'](int32) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**UpdateArrivalStatusRequest**
  - description: ['null', 'string'] (required)
  - intakeCategory: IntakeCategory (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**UpdateChargeCodeRequest**
  - name: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - departmentId: ['null', 'string'](uuid) (required)
  - shortDescription: ['null', 'string'] (required)
  - section: ['null', 'string'] (required)
  - type: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**UpdateDiagnosisCodeRequest**
  - icdCodeIdentity: IcdCodeIdentity (required)
  - definition: ['null', 'string'] (required)
  - category: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**UpdateDocumentTypeElementRequest**
  - description: ['null', 'string'] (required)
  - isExpirationEnabled: boolean (required)
  - expirationPeriod: ['null', 'string'] (required)
  - expirationValue: ['integer', 'string'](int32) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**UpdateNationalDrugCodeRequest**
  - name: ['null', 'string'] (required)
  - definition: ['null', 'string'] (required)
  - unit: ['null', 'string'](uuid) (required)
  - amount: ['null', 'number', 'string'](double) (required)
  - unitConversionFactor: ['null', 'number', 'string'](double) (required)
  - shortDescription: ['null', 'string'] (required)
  - brandName: ['null', 'string'] (required)
  - genericName: ['null', 'string'] (required)
  - chargeCode: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**UpdatePlanTypeRequest**
  - requiresMSPInsuranceType: boolean (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**UpdateProviderRequest**
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)
  - firstName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)
  - specialtyId: ['null', 'string'](uuid) (required)

**UpdateScheduleBlockTypeRequest**
  - description: ['null', 'string'] (required)
  - shortDescription: ['null', 'string'] (required)
  - color: ['null', 'string'] (required)
  - durationHours: ['null', 'integer', 'string'](int32) (required)
  - durationMinutes: ['null', 'integer', 'string'](int32) (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**UpdateSpecialtyRequest**
  - taxonomyCode: ['null', 'string'] (required)
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)

**VoidReasonElement**
  - description: ['null', 'string']
  - elementId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**VoidReasonElementRequest**
  - elementName: ['null', 'string'] (required)
  - description: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time) (required)

**WebsiteTypeAddElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

**WebsiteTypeElement**
  - description: ['null', 'string']
  - elementId: string(uuid)
  - name: ['null', 'string']
  - effectiveDateBegin: string(date-time)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - replaces: ['null', 'array']
  - custom: boolean
  - isDisconnected: boolean
  - removed: boolean

**WebsiteTypeUpdateElementRequest**
  - elementName: ['null', 'string'] (required)
  - effectiveDateBegin: string(date-time) (required)
  - effectiveDateEnd: ['null', 'string'](date-time)
  - description: ['null', 'string']

