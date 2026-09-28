﻿# Snowdrop.Waypoints.Services - API Dictionary

Repo: snowdrop-waypoints-be
Source: Snowdrop.Waypoints.Services.json

## Endpoints

### POST /activities/activity-code
- Tags: Activities
- Request body: UpdateActivityCodeRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/additional-properties
- Tags: Activities
- Request body: UpdateAdditionalPropertyRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/attending-provider
- Tags: Activities
- Request body: UpdateAttendingProviderRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/dos
- Tags: Activities
- Request body: UpdateDateOfServiceRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/encounters
- Tags: Activities
- Request body: SearchEncounterSummaryRequest
- Response 200: EncounterPagedResultsOfActivityEncounterGridItem

### POST /activities/end
- Tags: Activities
- Request body: UpdateDateEndRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/icd-codes
- Tags: Activities
- Request body: UpdateDiagnosesRequest
- Response 200: (no body)
- Response 409: ProblemDetails

### POST /activities/location
- Tags: Activities
- Request body: UpdateLocationRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/modifiers
- Tags: Activities
- Request body: UpdateModifiersRequest
- Response 200: (no body)
- Response 409: ProblemDetails

### POST /activities/ndc
- Tags: Activities
- Request body: UpdateNdcRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/ordering-provider
- Tags: Activities
- Request body: UpdateOrderingProviderRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/patient
- Tags: Activities
- Request body: UpdatePatientRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/patients
- Tags: Activities
- Request body: SearchPatientSummaryRequest
- Response 200: PatientPagedResultsOfActivityPatientGridItem

### POST /activities/payer
- Tags: Activities
- Request body: UpdatePayerRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/quantity
- Tags: Activities
- Request body: UpdateQuantityRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/referring-provider
- Tags: Activities
- Request body: UpdateReferringProviderRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/release
- Tags: Activities
- Request body: ReleaseItemRequest
- Response 200: ReleaseResult

### POST /activities/start
- Tags: Activities
- Request body: UpdateDateStartRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/supervising-provider
- Tags: Activities
- Request body: UpdateSupervisingProviderRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/supporting-providers
- Tags: Activities
- Request body: UpdateSupportingProvidersRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /activities/units
- Tags: Activities
- Request body: UpdateUnitsRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /behaviors
- Tags: BehaviorCategory
- Response 200: BehaviorCategoryResponse[]

### GET /behaviors/previsit/authorization
- Tags: BehaviorCategory
- Response 200: BehaviorCategoryResponse[]

### GET /behaviors/previsit/referral
- Tags: BehaviorCategory
- Response 200: BehaviorCategoryResponse[]

### POST /charges/additional-properties
- Tags: Charges
- Request body: UpdateAdditionalPropertyRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/billing-provider
- Tags: Charges
- Request body: UpdateBillingProviderRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/billingunits
- Tags: Charges
- Request body: UpdateBillingUnitsRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/charge-code
- Tags: Charges
- Request body: UpdateChargeCodeRequest
- Response 200: (no body)
- Response 409: ProblemDetails

### POST /charges/division
- Tags: Charges
- Request body: UpdateDivisionRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/dos
- Tags: Charges
- Request body: UpdateDateOfServiceRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/encounters
- Tags: Charges
- Request body: SearchEncounterSummaryRequest
- Response 200: EncounterPagedResultsOfChargeEncounterGridItem

### POST /charges/end
- Tags: Charges
- Request body: UpdateDateEndRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/facility
- Tags: Charges
- Request body: UpdateFacilityRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/icd-codes
- Tags: Charges
- Request body: UpdateDiagnosesRequest
- Response 200: (no body)
- Response 409: ProblemDetails

### POST /charges/ledgerdate
- Tags: Charges
- Request body: UpdateLedgerDateRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/location
- Tags: Charges
- Request body: UpdateLocationRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/modifiers
- Tags: Charges
- Request body: UpdateModifiersRequest
- Response 200: (no body)
- Response 409: ProblemDetails

### POST /charges/ndc
- Tags: Charges
- Request body: UpdateNdcRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/ordering-provider
- Tags: Charges
- Request body: UpdateOrderingProviderRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/patients
- Tags: Charges
- Request body: SearchPatientSummaryRequest
- Response 200: PatientPagedResultsOfChargePatientGridItem

### POST /charges/payer
- Tags: Charges
- Request body: UpdatePayerRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/procedureDescription
- Tags: Charges
- Request body: UpdateProcedureDescriptionRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/procedureNote
- Tags: Charges
- Request body: UpdateProcedureNoteRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/quantity
- Tags: Charges
- Request body: UpdateQuantityRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/release
- Tags: Charges
- Request body: ReleaseItemRequest
- Response 200: ReleaseResult

### POST /charges/start
- Tags: Charges
- Request body: UpdateDateStartRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/supervising-provider
- Tags: Charges
- Request body: UpdateSupervisingProviderRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/supporting-providers
- Tags: Charges
- Request body: UpdateSupportingProvidersRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /charges/units
- Tags: Charges
- Request body: UpdateUnitsRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /nettypes
- Tags: NetType
- Response 200: NetTypeResponse[]

### GET /review/{itemId}/progress
- Tags: ReviewItem
- Path params: itemId: string(uuid), required
- Response 200: ReviewProgress
- Response 404: ProblemDetails

### GET /review/{itemId}/validations/last
- Tags: ReviewItem
- Path params: itemId: string(uuid), required
- Response 200: ValidationState
- Response 404: ProblemDetails

### POST /review/activities/search/grid
- Tags: ReviewItem
- Request body: SearchReviewItemsRequest
- Response 200: PagedResultsOfReviewItemGridItem

### POST /review/charges/search/grid
- Tags: ReviewItem
- Request body: SearchReviewItemsRequest
- Response 200: PagedResultsOfReviewItemGridItem

### POST /review/export
- Tags: ReviewItem
- Request body: SearchReviewItemsRequest
- Response 200: (no body)

### POST /review/patients/{patientId}/activities/{activityId}/rebuild
- Tags: ReviewItem
- Path params: patientId: string(uuid), required; activityId: string(uuid), required
- Response 200: (no body)

### POST /review/patients/{patientId}/charges/{chargeId}/rebuild
- Tags: ReviewItem
- Path params: patientId: string(uuid), required; chargeId: string(uuid), required
- Response 200: (no body)

### POST /review/patients/{patientId}/encounters/{dos}/rebuild
- Tags: ReviewItem
- Path params: patientId: string(uuid), required; dos: string, required
- Response 200: (no body)

### POST /review/release
- Tags: ReviewItem
- Request body: ReleaseItemsRequest
- Response 200: (no body)

### POST /review/search/count
- Tags: ReviewItem
- Request body: SearchReviewItemsRequest
- Response 200: CountResponse

### POST /review/search/grid
- Tags: ReviewItem
- Request body: SearchReviewItemsRequest
- Response 200: PagedResultsOfReviewItemGridItem

### POST /review/search/historical
- Tags: ReviewItem
- Request body: SearchReviewItemsRequest
- Response 200: PagedResultsOfReviewItemPatientGroup

### POST /review/search/summary
- Tags: ReviewItem
- Request body: SearchReviewItemsRequest
- Response 200: PagedResultsOfReviewItemEncounterGroup

### GET /review/workflow/{workflowId}/released
- Tags: ReviewItem
- Path params: workflowId: string(uuid), required
- Response 200: DailyReleasedCount[]

### POST /signalr/groups/{groupType}/users/add
- Tags: Signalr
- Path params: groupType: string, required
- Query params: netType: NetType
- Response 200: (no body)

### POST /signalr/groups/{groupType}/users/remove
- Tags: Signalr
- Path params: groupType: string, required
- Query params: netType: NetType
- Response 200: (no body)

### POST /signalr/waypoints-hub/negotiate
- Tags: Signalr
- Query params: user: string
- Response 200: (no body)

## Schemas

**ActivityEncounterGridItem**
  - itemId: string(uuid)
  - netType: NetType
  - code: EditableFieldOfstring
  - attendingProviderId: EditableFieldOfGuid
  - orderingProviderId: EditableFieldOfGuid
  - supportingProviders: EditableFieldOfGuid[]
  - supervisingProviderId: EditableFieldOfGuid
  - referringProviderId: EditableFieldOfGuid
  - icdCodes: EditableFieldOfIcdCodeIdentity[]
  - amount: EditableFieldOfdouble
  - units: EditableFieldOfGuid
  - modifiers: EditableFieldOfGuid[]
  - ndc: EditableFieldOfstring
  - payer: EditableFieldOfGuid
  - validationStatus: ValidationStatus
  - waypointSummary: object
  - itemStatus: string
  - canArchive: boolean
  - behaviorCategory: object
  - rule: RuleSummaryClass
  - snooze: object
  - description: ['null', 'string']
  - additionalProperties: object

**ActivityPatientGridItem**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - location: EditableFieldOfGuid (required)
  - dateOfService: EditableFieldOfDate (required)
  - dateRangeStart: EditableFieldOfDate (required)
  - dateRangeEnd: EditableFieldOfDate (required)
  - code: EditableFieldOfstring (required)
  - attendingProviderId: EditableFieldOfGuid
  - orderingProviderId: EditableFieldOfGuid
  - supportingProviders: EditableFieldOfGuid[] (required)
  - supervisingProviderId: EditableFieldOfGuid
  - referringProviderId: EditableFieldOfGuid
  - icdCodes: EditableFieldOfIcdCodeIdentity[] (required)
  - amount: EditableFieldOfdouble
  - units: EditableFieldOfGuid
  - modifiers: EditableFieldOfGuid[] (required)
  - ndc: EditableFieldOfstring (required)
  - payer: EditableFieldOfGuid (required)
  - encounterNumber: EditableFieldOfstring (required)
  - validationStatus: ValidationStatus (required)
  - waypointSummary: object (required)
  - itemStatus: string (required)
  - canArchive: boolean (required)
  - behaviorCategory: object
  - rule: RuleSummaryHeader
  - snooze: object (required)
  - additionalProperties: object (required)

**AttributeQualifierRequest**
  - attributeType: AttributeType (required)
  - entityType: EntityType
  - nullQualifier: boolean
  - setQualifiers: ['null', 'array']
  - elementQualifiers: ['null', 'array']

**AttributeType**
  - (no properties)

**BehaviorCategory**
  - (no properties)

**BehaviorCategoryField**
  - currentValue: ['integer', 'string'](int32) (required)
  - displayValue: string (required)

**BehaviorCategoryResponse**
  - value: ['integer', 'string'](int32) (required)
  - displayValue: string (required)
  - netType: NetType (required)

**ChargeEncounterGridItem**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - activityId: ['null', 'string'](uuid) (required)
  - code: EditableFieldOfstring (required)
  - attendingProviderId: EditableFieldOfGuid
  - orderingProviderId: EditableFieldOfGuid
  - supportingProviders: EditableFieldOfGuid[] (required)
  - supervisingProviderId: EditableFieldOfGuid
  - referringProviderId: EditableFieldOfGuid
  - icdCodes: EditableFieldOfIcdCodeIdentity[] (required)
  - amount: EditableFieldOfdouble
  - units: EditableFieldOfGuid
  - modifiers: EditableFieldOfGuid[] (required)
  - ndc: EditableFieldOfstring (required)
  - billingProvider: EditableFieldOfGuid (required)
  - facility: EditableFieldOfGuid (required)
  - division: EditableFieldOfGuid (required)
  - payer: EditableFieldOfGuid (required)
  - ledgerDate: EditableFieldOfDate (required)
  - billingUnits: EditableFieldOfdecimal (required)
  - procedureNote: EditableFieldOfstring (required)
  - procedureDescription: EditableFieldOfstring (required)
  - validationStatus: ValidationStatus (required)
  - waypointSummary: object (required)
  - itemStatus: string (required)
  - policy: ['null', 'string'] (required)
  - snfResidentNumber: ['null', 'string'] (required)
  - behaviorCategory: object
  - rule: RuleSummaryClass
  - itemStatusCode: ['integer', 'string'](int32) (required)
  - itemSubStatusCode: ['integer', 'string'](int32) (required)
  - snooze: object (required)
  - description: ['null', 'string'] (required)
  - additionalProperties: object (required)

**ChargePatientGridItem**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - activityId: ['null', 'string'](uuid) (required)
  - location: EditableFieldOfGuid (required)
  - dateOfService: EditableFieldOfDate (required)
  - dateRangeStart: EditableFieldOfDate (required)
  - dateRangeEnd: EditableFieldOfDate (required)
  - code: EditableFieldOfstring (required)
  - attendingProviderId: EditableFieldOfGuid
  - orderingProviderId: EditableFieldOfGuid
  - supportingProviders: EditableFieldOfGuid[] (required)
  - supervisingProviderId: EditableFieldOfGuid
  - referringProviderId: EditableFieldOfGuid
  - icdCodes: EditableFieldOfIcdCodeIdentity[] (required)
  - amount: EditableFieldOfdouble
  - units: EditableFieldOfGuid
  - modifiers: EditableFieldOfGuid[] (required)
  - ndc: EditableFieldOfstring (required)
  - billingProvider: EditableFieldOfGuid (required)
  - facility: EditableFieldOfGuid (required)
  - division: EditableFieldOfGuid (required)
  - payer: EditableFieldOfGuid (required)
  - ledgerDate: EditableFieldOfDate (required)
  - billingUnits: EditableFieldOfdecimal (required)
  - procedureNote: EditableFieldOfstring (required)
  - procedureDescription: EditableFieldOfstring (required)
  - encounterNumber: EditableFieldOfstring (required)
  - validationStatus: ValidationStatus (required)
  - waypointSummary: object (required)
  - itemStatus: string (required)
  - policy: ['null', 'string'] (required)
  - snfResidentNumber: ['null', 'string'] (required)
  - behaviorCategory: object
  - rule: RuleSummaryHeader
  - itemStatusCode: ['integer', 'string'](int32) (required)
  - itemSubStatusCode: ['integer', 'string'](int32) (required)
  - snooze: object (required)
  - additionalProperties: object (required)

**CountResponse**
  - count: ['integer', 'string'](int32) (required)

**DailyReleasedCount**
  - releasedDate: Date (required)
  - releasedCount: ['integer', 'string'](int32) (required)

**Date**
  - (no properties)

**EditableFieldOfDate**
  - currentValue: Date (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfdecimal**
  - currentValue: ['null', 'number', 'string'](double) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfdouble**
  - currentValue: ['number', 'string'](double) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfGuid**
  - currentValue: string(uuid) (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfGuid[]**
  - currentValue: ['null', 'array'] (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfIcdCodeIdentity[]**
  - currentValue: ['null', 'array'] (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**EditableFieldOfstring**
  - currentValue: ['null', 'string'] (required)
  - displayValue: ['null', 'string'] (required)
  - isInvalid: boolean (required)
  - custom: ['null', 'object'] (required)
  - originalValue: ['null', 'string'] (required)
  - lastModifiedBy: ['null', 'string'](uuid) (required)
  - isFixed: boolean
  - isEdited: boolean

**ElementQualifierRequest**
  - elementId: string (required)
  - exclusionary: boolean (required)

**EncounterHeaderOfActivityEncounterGridItem**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - locationId: string(uuid) (required)
  - encounterNumber: ['null', 'string'] (required)
  - reviewItems: ActivityEncounterGridItem[] (required)

**EncounterHeaderOfChargeEncounterGridItem**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - locationId: string(uuid) (required)
  - encounterNumber: ['null', 'string'] (required)
  - reviewItems: ChargeEncounterGridItem[] (required)

**EncounterLabel**
  - encounterNumber: ['null', 'string'] (required)
  - locationId: string(uuid) (required)
  - attendingProviderId: string(uuid) (required)
  - attendingProviderName: ['null', 'string'] (required)
  - additionalAttendingCount: ['integer', 'string'](int32) (required)
  - activityCodes: string[] (required)

**EncounterPagedResultsOfActivityEncounterGridItem**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - patient: object (required)
  - waypoints: WaypointSummary[] (required)
  - cumulativeRuleIndex: ['integer', 'string'](int32) (required)
  - cumulativeRuleCount: ['integer', 'string'](int32) (required)
  - results: EncounterHeaderOfActivityEncounterGridItem[]
  - continuation: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)
  - maxRequestCharge: ['number', 'string'](double) (required)

**EncounterPagedResultsOfChargeEncounterGridItem**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - patient: object (required)
  - waypoints: WaypointSummary[] (required)
  - cumulativeRuleIndex: ['integer', 'string'](int32) (required)
  - cumulativeRuleCount: ['integer', 'string'](int32) (required)
  - results: EncounterHeaderOfChargeEncounterGridItem[]
  - continuation: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)
  - maxRequestCharge: ['number', 'string'](double) (required)

**EntityType**
  - (no properties)

**IcdCodeIdentity**
  - code: ['null', 'string'] (required)
  - icdCodeType: IcdCodeType (required)
  - isInvalidIcdCode: boolean

**IcdCodeType**
  - (no properties)

**InsuranceLabel**
  - payerId: ['null', 'string'](uuid) (required)
  - planName: ['null', 'string'] (required)
  - payerName: ['null', 'string'] (required)
  - policyNumber: ['null', 'string'] (required)
  - sharpId: ['null', 'string'] (required)
  - chargeCount: ['integer', 'string'](int32) (required)
  - isSelfPay: boolean (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)
  - snfName: ['null', 'string'] (required)
  - snfResidentNumber: ['null', 'string'] (required)
  - isSnf: boolean

**NetType**
  - (no properties)

**NetTypeResponse**
  - netType: NetType (required)
  - displayValue: string (required)

**PagedResultsOfReviewItemEncounterGroup**
  - results: ReviewItemEncounterGroup[] (required)
  - continuation: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)
  - maxRequestCharge: ['number', 'string'](double) (required)

**PagedResultsOfReviewItemGridItem**
  - results: ReviewItemGridItem[] (required)
  - continuation: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)
  - maxRequestCharge: ['number', 'string'](double) (required)

**PagedResultsOfReviewItemPatientGroup**
  - results: ReviewItemPatientGroup[] (required)
  - continuation: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)
  - maxRequestCharge: ['number', 'string'](double) (required)

**PatientHeader**
  - firstName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - dateOfBirth: object (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - displayName: ['null', 'string']
  - lastNameFirstCharacter: ['null', 'string'](char)

**PatientPagedResultsOfActivityPatientGridItem**
  - patientId: string(uuid) (required)
  - patient: object (required)
  - waypoints: WaypointSummary[] (required)
  - results: ActivityPatientGridItem[] (required)
  - continuation: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)
  - maxRequestCharge: ['number', 'string'](double) (required)

**PatientPagedResultsOfChargePatientGridItem**
  - patientId: string(uuid) (required)
  - patient: object (required)
  - waypoints: WaypointSummary[] (required)
  - results: ChargePatientGridItem[] (required)
  - continuation: ['null', 'string'] (required)
  - hasMoreResults: boolean (required)
  - maxRequestCharge: ['number', 'string'](double) (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**ReleaseItemRequest**
  - itemId: string(uuid) (required)
  - ruleId: string(uuid) (required)

**ReleaseItemsRequest**
  - items: string(uuid)[] (required)
  - releasedDate: string(date-time) (required)

**ReleaseResult**
  - succeeded: boolean (required)
  - ruleNotFound: boolean (required)
  - validatedEventNotFound: boolean (required)
  - canRetry: boolean

**ReleaseType**
  - (no properties)

**ReviewItemEncounterGroup**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - patient: object (required)
  - waypoints: WaypointSummary[] (required)
  - encounters: EncounterLabel[] (required)
  - insurances: InsuranceLabel[] (required)
  - progress: ['integer', 'string'](int32) (required)
  - activitiesInReview: ['integer', 'string'](int32) (required)
  - chargesInReview: ['integer', 'string'](int32) (required)
  - activitiesRendered: ['integer', 'string'](int32) (required)

**ReviewItemGridItem**
  - itemId: string(uuid) (required)
  - activityId: ['null', 'string'](uuid) (required)
  - chargeId: ['null', 'string'](uuid) (required)
  - netType: NetType (required)
  - patient: EditableFieldOfGuid (required)
  - dateOfService: EditableFieldOfDate (required)
  - dateRangeStart: EditableFieldOfDate (required)
  - dateRangeEnd: EditableFieldOfDate (required)
  - location: EditableFieldOfGuid (required)
  - code: EditableFieldOfstring (required)
  - behaviorCategory: object
  - rule: RuleSummaryClass
  - attendingProviderId: EditableFieldOfGuid (required)
  - orderingProviderId: EditableFieldOfGuid (required)
  - supportingProviders: EditableFieldOfGuid[] (required)
  - supervisingProviderId: EditableFieldOfGuid (required)
  - referringProviderId: EditableFieldOfGuid (required)
  - icdCodes: EditableFieldOfIcdCodeIdentity[] (required)
  - amount: EditableFieldOfdouble (required)
  - units: EditableFieldOfGuid (required)
  - modifiers: EditableFieldOfGuid[] (required)
  - ndc: EditableFieldOfstring (required)
  - billingProvider: EditableFieldOfGuid (required)
  - facility: EditableFieldOfGuid (required)
  - division: EditableFieldOfGuid (required)
  - payer: EditableFieldOfGuid (required)
  - billingUnits: object (required)
  - encounterNumber: EditableFieldOfstring (required)
  - itemStatus: string (required)
  - policy: ['null', 'string'] (required)
  - snfResidentNumber: ['null', 'string'] (required)
  - canArchive: boolean (required)
  - procedureNote: EditableFieldOfstring (required)
  - procedureDescription: EditableFieldOfstring (required)
  - itemStatusCode: ['integer', 'string'](int32) (required)
  - itemSubStatusCode: ['integer', 'string'](int32) (required)
  - snooze: object (required)
  - description: ['null', 'string'] (required)
  - additionalProperties: object (required)

**ReviewItemPatientGroup**
  - patientId: string(uuid) (required)
  - startDate: object (required)
  - endDate: object (required)
  - newestDateOfService: object (required)
  - oldestDateOfService: object (required)
  - patient: object (required)

**ReviewProgress**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - ruleId: ['null', 'string'](uuid) (required)
  - ruleName: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)
  - behaviorCategory: BehaviorCategory (required)
  - validationStatus: ValidationStatus (required)
  - progress: ['integer', 'string'](int32)
  - complete: boolean (required)

**RollingWindowType**
  - (no properties)

**RuleSummaryClass**
  - name: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)

**RuleSummaryHeader**
  - name: ['null', 'string'] (required)
  - userGuidance: ['null', 'string'] (required)

**SearchEncounterSummaryRequest**
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - hideSnoozedItems: boolean (required)
  - continuation: ['null', 'string'] (required)

**SearchPatientSummaryRequest**
  - patientId: string(uuid) (required)
  - continuation: ['null', 'string'] (required)

**SearchReviewItemsRequest**
  - alphaSplitStart: ['null', 'string'](char) (required)
  - alphaSplitEnd: ['null', 'string'](char) (required)
  - dateOfServiceFrom: object (required)
  - dateOfServiceTo: object (required)
  - netTypes: NetType[] (required)
  - allBehaviors: boolean
  - behaviors: BehaviorCategory[] (required)
  - rollingWindowLength: ['null', 'integer', 'string'](int32) (required)
  - rollingWindowType: object (required)
  - qualifiers: AttributeQualifierRequest[] (required)
  - itemIds: ['null', 'array'] (required)
  - hideSnoozedItems: boolean (required)
  - continuation: ['null', 'string'] (required)

**SetQualifierRequest**
  - setType: string (required)
  - setId: string(uuid) (required)
  - isFactorySet: boolean (required)
  - exclusionary: boolean (required)

**Snooze**
  - isSnoozed: boolean (required)
  - endDate: ['null', 'string'](date-time) (required)
  - reason: ['null', 'string'](uuid) (required)
  - snoozedBy: ['null', 'string'](uuid) (required)
  - snoozedOn: ['null', 'string'](date-time) (required)

**UpdateActivityCodeRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - activityTypeId: string (required)

**UpdateAdditionalPropertyRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - key: string (required)
  - value: ['null', 'string'] (required)

**UpdateAttendingProviderRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - attendingProviderId: string(uuid) (required)

**UpdateBillingProviderRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - billingProviderId: string(uuid) (required)

**UpdateBillingUnitsRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - billingUnits: ['number', 'string'](double) (required)

**UpdateChargeCodeRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - chargeCode: string (required)

**UpdateDateEndRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - dateRangeEnd: Date (required)

**UpdateDateOfServiceRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - dateOfService: Date (required)

**UpdateDateStartRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - dateRangeStart: Date (required)

**UpdateDiagnosesRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - icdCodes: IcdCodeIdentity[] (required)

**UpdateDivisionRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - divisionId: string(uuid) (required)
  - companyId: string(uuid) (required)

**UpdateFacilityRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - facilityId: string(uuid) (required)

**UpdateLedgerDateRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - ledgerDate: Date (required)

**UpdateLocationRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - locationId: string(uuid) (required)

**UpdateModifiersRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - modifiers: string(uuid)[] (required)

**UpdateNdcRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - ndc: ['null', 'string'] (required)

**UpdateOrderingProviderRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - orderingProviderId: ['null', 'string'](uuid) (required)

**UpdatePatientRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - patientId: string(uuid) (required)

**UpdatePayerRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - portfolioId: ['null', 'string'](uuid) (required)
  - policyId: ['null', 'string'](uuid) (required)
  - policyPlanId: ['null', 'string'](uuid) (required)
  - payerId: ['null', 'string'](uuid) (required)
  - snfId: ['null', 'string'](uuid) (required)
  - snfPatientId: ['null', 'string'](uuid) (required)

**UpdateProcedureDescriptionRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - procedureDescription: ['null', 'string'] (required)

**UpdateProcedureNoteRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - procedureNote: ['null', 'string'] (required)

**UpdateQuantityRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - quantity: ['number', 'string'](double) (required)

**UpdateReferringProviderRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - referringProviderId: ['null', 'string'](uuid) (required)

**UpdateSupervisingProviderRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - supervisingProviderId: ['null', 'string'](uuid) (required)

**UpdateSupportingProvidersRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - supportingProviders: string(uuid)[] (required)

**UpdateUnitsRequest**
  - itemId: string(uuid) (required)
  - netType: NetType (required)
  - unitId: string(uuid) (required)

**ValidationState**
  - itemId: string(uuid) (required)
  - validationId: ['null', 'string'](uuid) (required)
  - sequenceId: ['null', 'string'](uuid) (required)
  - ruleId: ['null', 'string'](uuid) (required)
  - validationType: object (required)
  - validationStatus: object (required)
  - validationMessage: ['null', 'string'] (required)

**ValidationStatus**
  - (no properties)

**ValidationType**
  - (no properties)

**WaypointSummary**
  - validationId: string(uuid) (required)
  - itemId: string(uuid) (required)
  - sequenceId: ['null', 'string'](uuid) (required)
  - ruleId: ['null', 'string'](uuid) (required)
  - name: ['null', 'string'] (required)
  - behaviorCategory: BehaviorCategory (required)
  - userGuidance: ['null', 'string'] (required)
  - releaseType: ReleaseType (required)
  - parentRuleId: ['null', 'string'](uuid)

