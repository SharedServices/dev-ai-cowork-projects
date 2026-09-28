﻿# Snowdrop.Patients.Api - API Dictionary

Repo: snowdrop-patients-api-be
Source: Snowdrop.Patients.Api.json

## Endpoints

### POST /population/patients
- Tags: Patients
- Request body: PatientRequest
- Response 200: PatientIdResponse

### GET /population/patients/{id}
- Tags: Patients
- Path params: id: string(uuid), required
- Response 200: PatientResponse
- Response 404: ProblemDetails

### POST /population/patients/{id}
- Tags: Patients
- Path params: id: string(uuid), required
- Request body: PatientRequest
- Response 200: PatientIdResponse
- Response 409: ProblemDetails

### PUT /population/patients/{id}
- Tags: Patients
- Path params: id: string(uuid), required
- Request body: PatientRequest
- Response 200: (no body)

### DELETE /population/patients/{id}
- Tags: Patients
- Path params: id: string(uuid), required
- Response 200: (no body)

### GET /population/patients/{id}/accounts
- Tags: Accounts
- Path params: id: string(uuid), required
- Response 200: Accounts

### GET /population/patients/{id}/accounts/for-charge/{chargeId}
- Tags: Accounts
- Path params: id: string(uuid), required; chargeId: string(uuid), required
- Response 200: Accounts

### POST /population/patients/{id}/accounts/for-charge/{chargeId}
- Tags: Accounts
- Path params: id: string(uuid), required; chargeId: string(uuid), required
- Request body: ChargeBasedAccountSearchRequest
- Response 200: Accounts

### POST /population/patients/{id}/accounts/for-charges
- Tags: Accounts
- Path params: id: string(uuid), required
- Request body: ChargesBasedAccountSearchRequest
- Response 200: Accounts

### GET /population/patients/{id}/Addresses
- Tags: Addresses
- Path params: id: string(uuid), required
- Response 200: AddressResponse[]

### POST /population/patients/{id}/Addresses
- Tags: Addresses
- Path params: id: string(uuid), required
- Request body: AddressRequest
- Response 200: IdResponse

### PUT /population/patients/{id}/Addresses/{addressId}
- Tags: Addresses
- Path params: id: string(uuid), required; addressId: string(uuid), required
- Request body: AddressRequest
- Response 200: (no body)

### DELETE /population/patients/{id}/Addresses/{addressId}
- Tags: Addresses
- Path params: id: string(uuid), required; addressId: string(uuid), required
- Response 200: (no body)

### PUT /population/patients/{id}/Addresses/order
- Tags: Addresses
- Path params: id: string(uuid), required
- Request body: AddressOrderingRequest
- Response 200: (no body)

### GET /population/patients/{id}/ContactPoints
- Tags: ContactPoints
- Path params: id: string(uuid), required
- Response 200: ContactPoint[]
- Response 404: ProblemDetails

### DELETE /population/patients/{id}/ContactPoints/{contactPointId}
- Tags: ContactPoints
- Path params: id: string(uuid), required; contactPointId: string(uuid), required
- Response 200: (no body)

### POST /population/patients/{id}/ContactPoints/email
- Tags: ContactPoints
- Path params: id: string(uuid), required
- Request body: EmailRequest
- Response 200: IdResponse

### PUT /population/patients/{id}/ContactPoints/email/{emailContactPointId}
- Tags: ContactPoints
- Path params: id: string(uuid), required; emailContactPointId: string(uuid), required
- Request body: EmailRequest
- Response 200: (no body)

### POST /population/patients/{id}/ContactPoints/fax
- Tags: ContactPoints
- Path params: id: string(uuid), required
- Request body: FaxRequest
- Response 200: IdResponse

### PUT /population/patients/{id}/ContactPoints/fax/{faxContactPointId}
- Tags: ContactPoints
- Path params: id: string(uuid), required; faxContactPointId: string(uuid), required
- Request body: FaxRequest
- Response 200: (no body)

### PUT /population/patients/{id}/ContactPoints/order
- Tags: ContactPoints
- Path params: id: string(uuid), required
- Request body: ContactPointOrderingRequest
- Response 200: (no body)

### POST /population/patients/{id}/ContactPoints/phone
- Tags: ContactPoints
- Path params: id: string(uuid), required
- Request body: PhoneRequest
- Response 200: IdResponse

### PUT /population/patients/{id}/ContactPoints/phone/{phoneContactPointId}
- Tags: ContactPoints
- Path params: id: string(uuid), required; phoneContactPointId: string(uuid), required
- Request body: PhoneRequest
- Response 200: (no body)

### GET /population/patients/{id}/Demographics
- Tags: Demographics
- Path params: id: string(uuid), required
- Response 200: Demographics
- Response 404: ProblemDetails

### PUT /population/patients/{id}/Demographics
- Tags: Demographics
- Path params: id: string(uuid), required
- Request body: DemographicsRequest
- Response 200: (no body)

### GET /population/patients/{id}/Demographics/verifications
- Tags: Demographics
- Path params: id: string(uuid), required
- Response 200: DemographicsVerification[]
- Response 404: ProblemDetails

### POST /population/patients/{id}/Demographics/verifications
- Tags: Demographics
- Path params: id: string(uuid), required
- Request body: DemographicsVerificationRequest
- Response 200: (no body)

### GET /population/patients/{id}/Demographics/verifications/last
- Tags: Demographics
- Path params: id: string(uuid), required
- Response 200: DemographicsVerification
- Response 404: ProblemDetails

### GET /population/patients/{id}/Details
- Tags: Details
- Path params: id: string(uuid), required
- Response 200: Details
- Response 404: ProblemDetails

### PUT /population/patients/{id}/Details
- Tags: Details
- Path params: id: string(uuid), required
- Request body: Details
- Response 200: (no body)

### PUT /population/patients/{id}/FinancialAccountNumber
- Tags: Patients
- Path params: id: string(uuid), required
- Request body: FinancialAccountNumberUpdate
- Response 200: (no body)

### GET /population/patients/{id}/Locations
- Tags: Locations
- Path params: id: string(uuid), required
- Response 200: Location[]

### POST /population/patients/{id}/Locations
- Tags: Locations
- Path params: id: string(uuid), required
- Request body: Location
- Response 200: IdResponse

### DELETE /population/patients/{id}/Locations/{locationId}
- Tags: Locations
- Path params: id: string(uuid), required; locationId: string(uuid), required
- Response 200: (no body)

### PUT /population/patients/{id}/Locations/order
- Tags: Locations
- Path params: id: string(uuid), required
- Request body: LocationOrderingRequest
- Response 200: (no body)

### POST /population/patients/{id}/merge
- Tags: Patients
- Path params: id: string(uuid), required
- Request body: PatientSingleMergeRequest
- Response 200: (no body)

### GET /population/patients/{id}/PersonalContacts
- Tags: PersonalContacts
- Path params: id: string(uuid), required
- Response 200: PersonalContact[]

### POST /population/patients/{id}/PersonalContacts
- Tags: PersonalContacts
- Path params: id: string(uuid), required
- Request body: PersonalContactRequest
- Response 200: IdResponse

### PUT /population/patients/{id}/PersonalContacts/{personalContactId}
- Tags: PersonalContacts
- Path params: id: string(uuid), required; personalContactId: string(uuid), required
- Request body: PersonalContactRequest
- Response 200: (no body)

### DELETE /population/patients/{id}/PersonalContacts/{personalContactId}
- Tags: PersonalContacts
- Path params: id: string(uuid), required; personalContactId: string(uuid), required
- Response 200: (no body)

### PUT /population/patients/{id}/PersonalContacts/order
- Tags: PersonalContacts
- Path params: id: string(uuid), required
- Request body: PersonalContactOrderingRequest
- Response 200: (no body)

### GET /population/patients/{id}/preview
- Tags: Patients
- Path params: id: string(uuid), required
- Response 200: PatientPreviewResponse
- Response 404: ProblemDetails

### GET /population/patients/{id}/profile-strength
- Tags: Patients
- Path params: id: string(uuid), required
- Response 200: PatientProfileStrength
- Response 404: ProblemDetails

### GET /population/patients/{id}/snapshot
- Tags: Patients
- Path params: id: string(uuid), required
- Response 200: PatientResponse
- Response 404: ProblemDetails

### GET /population/patients/{id}/Status
- Tags: Status
- Path params: id: string(uuid), required
- Response 200: StatusResponse
- Response 404: ProblemDetails

### PUT /population/patients/{id}/Status
- Tags: Status
- Path params: id: string(uuid), required
- Request body: StatusRequest
- Response 200: (no body)

### PUT /population/patients/{id}/Status/test
- Tags: Status
- Path params: id: string(uuid), required
- Request body: TestStatusRequest
- Response 200: (no body)

### GET /population/patients/admin/fan
- Tags: FanAdmin
- Response 200: FanStateResponse

### POST /population/patients/admin/fan
- Tags: FanAdmin
- Request body: FanSeedSetRequest
- Response 200: FanStateResponse

### POST /population/patients/admin/fan/configuration
- Tags: FanAdmin
- Request body: FanConfigurationRequest
- Response 200: FanStateResponse

### POST /population/patients/admin/fan/seed
- Tags: FanAdmin
- Request body: FanSeedSetRequest
- Response 200: FanStateResponse

### POST /population/patients/fan/{fan}/release
- Tags: Patients
- Path params: fan: string, required
- Request body: FanReleaseRequest
- Response 200: FanReleaseResponse

### POST /population/patients/fan/{fan}/reserve
- Tags: Patients
- Path params: fan: string, required
- Request body: FanPatientReservationRequest
- Response 200: FanReservationResponse

### POST /population/patients/fan/assign-next
- Tags: Patients
- Request body: FanNextPatientAssignRequest
- Response 200: PatientIdResponse

### POST /population/patients/fan/reserve
- Tags: Patients
- Request body: FanNewPatientReservationRequest
- Response 200: FanNextReservationResponse

### GET /population/patients/mpi/duplicates/{patientId}/candidates
- Tags: Duplicates
- Path params: patientId: string(uuid), required
- Response 200: PatientDuplicateCandidatesResponse

### GET /population/patients/mpi/duplicates/candidates
- Tags: Duplicates
- Response 200: OrganizationDuplicateCandidatesResponse

### GET /population/patients/mpi/duplicates/candidates/stats
- Tags: Duplicates
- Response 200: OrganizationDuplicateCandidateStats

### GET /population/patients/mpi/duplicates/ping
- Tags: Duplicates
- Response 200: (no body)

### POST /population/patients/mpi/duplicates/release
- Tags: Duplicates
- Request body: OrganizationDuplicatesReleaseRequest
- Response 200: (no body)

### POST /population/patients/northside/search/smartix
- Tags: Search
- Request body: NorthsideSearchRequest
- Response 200: SearchResponse

### GET /population/patients/picker
- Tags: Picker
- Query params: query: string; top: ['integer', 'string'](int32); skip: ['integer', 'string'](int32)
- Response 200: PickerResult[]

### POST /population/patients/picker
- Tags: Picker
- Request body: PickerRequest
- Response 200: PickerResult[]

### POST /population/patients/picker/from-ids
- Tags: Picker
- Request body: IdPickerRequest
- Response 200: PickerResult[]

### GET /population/patients/recent/mine
- Tags: Recent
- Query params: maxCount: ['integer', 'string'](int32)
- Response 200: RecentPatient[]
- Response 404: ProblemDetails

### GET /population/patients/recent/mine/ids
- Tags: Recent
- Query params: maxCount: ['integer', 'string'](int32)
- Response 200: string(uuid)[]
- Response 404: ProblemDetails

### GET /population/patients/search
- Tags: Search
- Query params: query: string; top: ['integer', 'string'](int32); skip: ['integer', 'string'](int32)
- Response 200: SearchResponse

### POST /population/patients/search
- Tags: Search
- Request body: SearchRequest
- Response 200: SearchResponse

### GET /population/patients/search/{patientId}/sync-wait
- Tags: Search
- Path params: patientId: string(uuid), required
- Query params: timeout: ['integer', 'string'](int32)
- Response 200: SearchSyncResponse

### POST /population/patients/search/from-dna
- Tags: Search
- Request body: DnaSearchRequest
- Response 200: SearchResponse

### POST /population/patients/search/from-ids
- Tags: Search
- Request body: IdSearchRequest
- Response 200: SearchResponse

### GET /population/patients/utilities/fans/backfill/{organizationId}/patients/{patientId}
- Tags: Utility
- Path params: organizationId: string(uuid), required; patientId: string(uuid), required
- Response 200: (no body)

### GET /population/patients/utilities/fans/backfill/{organizationId}/seed
- Tags: Utility
- Path params: organizationId: string(uuid), required
- Response 200: (no body)

### GET /population/patients/utilities/fans/backfill/all/patients
- Tags: Utility
- Response 200: (no body)

### GET /population/patients/utilities/fans/backfill/all/seed
- Tags: Utility
- Response 200: (no body)

### GET /population/patients/utilities/status
- Tags: Utility
- Query params: x: string
- Response 200: StatusResponse

### POST /population/patients/Wristband/print
- Tags: Wristband
- Request body: PrintWristbandRequest
- Response 200: (no body)

### DELETE /population/Support/searchindex/deleteQA/{count}
- Tags: Support
- Path params: count: ['integer', 'string'](int32), required
- Response 200: PatientResponse
- Response 404: ProblemDetails

## Schemas

**Accounts**
  - policies: ['null', 'array']
  - snfPatients: ['null', 'array']
  - copayAwards: ['null', 'array']
  - guarantors: ['null', 'array']

**AccountSearchType**
  - (no properties)

**Address**
  - addressId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)
  - addressType: AddressType
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']
  - county: ['null', 'string']
  - mailType: MailType
  - isRecurring: boolean
  - fromMonth: ['null', 'integer', 'string'](int32)
  - toMonth: ['null', 'integer', 'string'](int32)
  - effective: object

**AddressOrderingRequest**
  - order: ['null', 'array']

**AddressRequest**
  - addressType: AddressType
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']
  - county: ['null', 'string']
  - mailType: MailType
  - isRecurring: boolean
  - fromMonth: ['null', 'integer', 'string'](int32)
  - toMonth: ['null', 'integer', 'string'](int32)
  - effective: object

**AddressResponse**
  - effectiveFormatted: ['null', 'string']
  - addressId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)
  - addressType: AddressType
  - addressLine1: ['null', 'string']
  - addressLine2: ['null', 'string']
  - city: ['null', 'string']
  - stateId: ['null', 'string'](uuid)
  - zipCode: ['null', 'string']
  - county: ['null', 'string']
  - mailType: MailType
  - isRecurring: boolean
  - fromMonth: ['null', 'integer', 'string'](int32)
  - toMonth: ['null', 'integer', 'string'](int32)
  - effective: object

**AddressType**
  - (no properties)

**ChargeBasedAccountSearchRequest**
  - onlyEffective: boolean

**ChargesBasedAccountSearchRequest**
  - chargeIds: ['null', 'array']
  - searchType: AccountSearchType
  - onlyEffective: boolean

**ContactPoint**
  - contactPointId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)
  - contactPointType: ContactPointType
  - phoneType: PhoneType
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - isTextAllowed: boolean
  - isVoicemailAllowed: boolean
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - use: ContactUse

**ContactPointOrderingRequest**
  - order: ['null', 'array']

**ContactPointType**
  - enum values: Phone, Email, Fax

**ContactUse**
  - (no properties)

**CopayAward**
  - payerId: string(uuid)
  - payerName: ['null', 'string']
  - manufacturerCopayProgramId: string(uuid)
  - manufacturerCopayProgramName: ['null', 'string']
  - manufacturerCopayProgramAwardId: string(uuid)
  - assistanceNumber: ['null', 'string']

**Date**
  - (no properties)

**Demographics**
  - firstName: ['null', 'string']
  - middleName: ['null', 'string']
  - lastName: ['null', 'string']
  - suffixName: ['null', 'string']
  - preferredName: ['null', 'string']
  - birthDate: object
  - socialSecurityNumber: ['null', 'string']
  - verification: DemographicsVerification

**DemographicsRequest**
  - verification: DemographicsVerification
  - firstName: ['null', 'string']
  - middleName: ['null', 'string']
  - lastName: ['null', 'string']
  - suffixName: ['null', 'string']
  - preferredName: ['null', 'string']
  - birthDate: object
  - socialSecurityNumber: ['null', 'string']

**DemographicsResponse**
  - birthDateFormatted: ['null', 'string']
  - firstName: ['null', 'string']
  - middleName: ['null', 'string']
  - lastName: ['null', 'string']
  - suffixName: ['null', 'string']
  - preferredName: ['null', 'string']
  - birthDate: object
  - socialSecurityNumber: ['null', 'string']
  - verification: DemographicsVerification

**DemographicsVerification**
  - userId: string(uuid)
  - timestamp: string(date-time)

**DemographicsVerificationRequest**
  - timestamp: string(date-time)

**Details**
  - honorificName: ['null', 'string']
  - preferredPronounId: ['null', 'string'](uuid)
  - languagesSpokenIds: ['null', 'array']
  - preferredLanguageId: ['null', 'string'](uuid)
  - currentSex: object
  - birthSex: object
  - genderIdentityId: ['null', 'string'](uuid)
  - sexualOrientationId: ['null', 'string'](uuid)
  - raceIds: ['null', 'array']
  - ethnicityIds: ['null', 'array']
  - maritalStatusId: ['null', 'string'](uuid)

**DnaContactPoint**
  - number: ['null', 'string']

**DnaDemographics**
  - firstName: ['null', 'string']
  - lastName: ['null', 'string']
  - preferredName: ['null', 'string']
  - birthDate: object

**DnaSearchRequest**
  - demographics: DnaDemographics
  - contactPoints: ['null', 'array']
  - locationIds: string(uuid)[]

**DuplicateCandidateEncounters**
  - scheduledEncounters: ['integer', 'string'](int32) (required)
  - completedEncounters: ['integer', 'string'](int32) (required)
  - nextEncounter: object (required)
  - previousEncounter: object (required)

**DuplicateCandidateFinancials**
  - totalBalance: ['number', 'string'](double) (required)
  - guarantorBalance: ['number', 'string'](double) (required)

**DuplicateCriteriaField**
  - enum values: Name, BirthDate, Address, PatientPhone, Email, PersonalContact, InsurancePolicy, SocialSecurityNumber

**DuplicatePatientCandidateResponse**
  - duplicateIdentificationTimeStamp: string(date-time)
  - patientId: string(uuid)
  - financialAccountNumber: ['null', 'string']
  - status: StatusResponse
  - profileStrength: ['number', 'string'](double)
  - demographics: Demographics
  - primaryPhone: ContactPoint
  - encounters: DuplicateCandidateEncounters
  - financials: DuplicateCandidateFinancials
  - created: string(date-time)
  - isPrimaryDefault: boolean
  - createdBy: string(uuid)

**DuplicatePatientResponse**
  - patientId: string(uuid)
  - financialAccountNumber: ['null', 'string']
  - status: StatusResponse
  - profileStrength: ['number', 'string'](double)
  - demographics: Demographics
  - primaryPhone: ContactPoint
  - encounters: DuplicateCandidateEncounters
  - financials: DuplicateCandidateFinancials
  - created: string(date-time)
  - isPrimaryDefault: boolean
  - createdBy: string(uuid)

**DuplicateReleaseRequest**
  - primaryPatientId: string(uuid) (required)
  - sourcePatientIds: ['null', 'array'] (required)

**EmailRequest**
  - emailAddress: ['null', 'string']
  - isEmailAllowed: boolean
  - use: ['null', 'string']

**FanConfiguration**
  - partition: ['null', 'string']
  - makeEditable: boolean
  - includeInPatientCreation: boolean

**FanConfigurationRequest**
  - makeEditable: boolean
  - includeInPatientCreation: boolean
  - seed: ['null', 'integer', 'string'](int64)

**FanNewPatientReservationRequest**
  - patientId: ['null', 'string'](uuid) (required)

**FanNextPatientAssignRequest**
  - patientId: string(uuid) (required)

**FanNextReservationResponse**
  - patientId: string(uuid) (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - configuration: FanConfiguration (required)

**FanPatientReservationRequest**
  - patientId: string(uuid) (required)

**FanReleaseRequest**
  - patientId: string(uuid) (required)

**FanReleaseResponse**
  - success: boolean (required)
  - type: FanReleaseResultType (required)

**FanReleaseResultType**
  - enum values: Released, NotFound, AssignmentCannotBeReleased, OwnerMismatch, DatabaseRecordDeletionFailed, UnknownError

**FanReservationResponse**
  - patientId: string(uuid) (required)
  - financialAccountNumber: ['null', 'string'] (required)

**FanSeedSetRequest**
  - seed: ['integer', 'string'](int64)

**FanStateResponse**
  - current: ['integer', 'string'](int64) (required)
  - nextAssigned: ['integer', 'string'](int64) (required)
  - isSeed: boolean (required)
  - makeEditable: boolean (required)
  - includeInPatientCreation: boolean (required)

**FaxRequest**
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - use: ContactUse

**FinancialAccountNumberUpdate**
  - financialAccountNumber: ['null', 'string']

**Guarantor**
  - guarantorId: string(uuid)
  - guarantorIsPatient: boolean
  - guarantorFAN: ['null', 'string']
  - firstName: ['null', 'string']
  - middleName: ['null', 'string']
  - lastName: ['null', 'string']
  - suffixName: ['null', 'string']

**IdPickerRequest**
  - patientIds: ['null', 'array'] (required)
  - top: ['integer', 'string'](int32)
  - skip: ['integer', 'string'](int32)

**IdResponse**
  - id: string(uuid) (required)

**IdSearchRequest**
  - patientIds: ['null', 'array'] (required)
  - top: ['integer', 'string'](int32) (required)
  - skip: ['integer', 'string'](int32) (required)
  - locationIds: string(uuid)[]

**Location**
  - locationId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)

**LocationOrderingRequest**
  - order: ['null', 'array']

**LocationResponse**
  - locationId: string(uuid)

**MailType**
  - (no properties)

**NorthsideSearchRequest**
  - firstName: ['null', 'string']
  - lastName: ['null', 'string']
  - phoneNumber: ['null', 'string']
  - sexType: object
  - birthDate: object
  - maxResults: ['null', 'integer', 'string'](int32)
  - threshold: ['null', 'integer', 'string'](int32)

**OrderableCollectionOfGuidAndProbableDuplicate**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderableCollectionOfGuidAndProbableDuplicatePrimaryRelationship**
  - collection: ['null', 'object']
  - order: ['null', 'array']
  - relativeAddSequence: ['null', 'object']
  - count: ['integer', 'string'](int32)

**OrderedCollectionOfGuidAndPatientMergeDetail**
  - order: ['null', 'array']
  - collection: ['null', 'object']

**OrganizationDuplicateCandidateResponse**
  - patientId: string(uuid) (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - demographics: Demographics (required)
  - duplicateIdentificationTimeStamp: string(date-time) (required)
  - probableDuplicates: ['null', 'array'] (required)

**OrganizationDuplicateCandidatesResponse**
  - count: ['integer', 'string'](int32) (required)
  - candidates: ['null', 'array'] (required)

**OrganizationDuplicateCandidateStats**
  - count: ['integer', 'string'](int64) (required)

**OrganizationDuplicatesReleaseRequest**
  - primaryPatients: ['null', 'array'] (required)

**PatientCreationDetail**
  - created: string(date-time) (required)
  - createdByUserId: string(uuid) (required)

**PatientDuplicateCandidatesResponse**
  - anchorPatient: DuplicatePatientResponse (required)
  - candidates: ['null', 'array'] (required)
  - matchedFields: ['null', 'array'] (required)

**PatientIdResponse**
  - patientId: string(uuid) (required)
  - financialAccountNumber: ['null', 'string'] (required)

**PatientMergeDetail**
  - targetPatientId: string(uuid) (required)
  - targetFinancialAccountNumber: ['null', 'string'] (required)
  - sourcePatientId: string(uuid) (required)
  - sourceFinancialAccountNumber: ['null', 'string'] (required)
  - sourceDemographics: Demographics (required)
  - mergeEffectiveDate: Date (required)
  - mergeReasonDescription: ['null', 'string'] (required)
  - mergedByUserId: string(uuid) (required)
  - timeStamp: string(date-time) (required)

**PatientPreviewResponse**
  - patientId: string(uuid)
  - financialAccountNumber: ['null', 'string']
  - demographics: Demographics
  - primaryAddress: Address
  - primaryPhone: Phone
  - statusName: ['null', 'string']
  - statusEffectiveDate: object
  - isDeceased: boolean
  - isMerged: boolean
  - testStatus: TestStatus
  - testStatusEffectiveDate: Date
  - isTestPatient: boolean
  - locations: ['null', 'array']

**PatientProfileStrength**
  - hasFirstName: boolean
  - hasLastName: boolean
  - hasDateOfBirth: boolean
  - hasPhoneNumber: boolean
  - hasAddress: boolean
  - hasFacility: boolean
  - hasSex: boolean
  - hasPersonalContact: boolean
  - profileStrength: ['number', 'string'](double)

**PatientRequest**
  - patientId: string(uuid)
  - addresses: ['null', 'array']
  - locations: ['null', 'array']
  - contactPoints: ['null', 'array']
  - personalContacts: ['null', 'array']
  - financialAccountNumber: ['null', 'string']
  - demographics: Demographics
  - details: Details
  - probableDuplicates: OrderableCollectionOfGuidAndProbableDuplicate
  - probableDuplicateRelationships: OrderableCollectionOfGuidAndProbableDuplicatePrimaryRelationship
  - policiesSnapshot: PoliciesSnapshot
  - mergeSources: OrderedCollectionOfGuidAndPatientMergeDetail
  - mergeDetail: PatientMergeDetail
  - creationDetail: PatientCreationDetail
  - status: Status
  - testStatus: TestStatus
  - isMerged: boolean
  - isDismissed: boolean
  - isDeleted: boolean
  - effectiveStatus: StatusType
  - effectiveStatusDescription: ['null', 'string']
  - isTestPatient: boolean

**PatientResponse**
  - patientId: string(uuid) (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - status: Status (required)
  - testStatus: TestStatus (required)
  - isDismissed: boolean (required)
  - mergeDetail: PatientMergeDetail (required)
  - isDeleted: boolean (required)
  - demographics: DemographicsResponse (required)
  - details: Details (required)
  - locations: ['null', 'array'] (required)
  - addresses: ['null', 'array'] (required)
  - contactPoints: ['null', 'array'] (required)
  - personalContacts: ['null', 'array'] (required)
  - mergeSources: ['null', 'array'] (required)
  - profileStrength: PatientProfileStrength (required)
  - creationDetail: PatientCreationDetail (required)
  - isDeceased: boolean
  - isMerged: boolean
  - isTestPatient: boolean
  - deceasedStatusEffectiveDate: Date
  - mergeStatusEffectiveDate: Date
  - testStatusEffectiveDate: Date

**PatientResult**
  - organizationId: string(uuid) (required)
  - locationIds: ['null', 'array'] (required)
  - patientId: string(uuid) (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - patientStatus: ['null', 'string'] (required)
  - patientStatusId: StatusType (required)
  - firstName: ['null', 'string'] (required)
  - preferredName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffixName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - phone: ['null', 'string'] (required)
  - birthDate: object (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - addressCity: ['null', 'string'] (required)
  - addressState: ['null', 'string'] (required)
  - addressZipCode: ['null', 'string'] (required)
  - isMerged: boolean (required)
  - isTestPatient: boolean (required)
  - patientCreatedTimeStampUnix: ['integer', 'string'](int64) (required)

**PatientSingleMergeRequest**
  - targetPatientId: string(uuid) (required)
  - mergeReasonDescription: ['null', 'string'] (required)
  - effectiveDate: object (required)

**PersonalContact**
  - personalContactId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)
  - demographics: Demographics
  - phone: PersonalContactPhone
  - roles: PersonalContactRoles
  - personalContactRelationshipId: string(uuid)

**PersonalContactOrderingRequest**
  - order: ['null', 'array']

**PersonalContactPhone**
  - phoneType: PersonalContactPhoneType
  - number: ['null', 'string']
  - use: ContactUse
  - extension: ['null', 'string']
  - isTextAllowed: boolean
  - isVoicemailAllowed: boolean

**PersonalContactPhoneType**
  - (no properties)

**PersonalContactRequest**
  - demographics: Demographics
  - phone: PersonalContactPhone
  - roles: PersonalContactRoles
  - personalContactRelationshipId: string(uuid)

**PersonalContactRoles**
  - isStandard: boolean
  - isEmergency: boolean
  - isPowerOfAttorney: boolean
  - isBlacklisted: boolean
  - financialAccessId: ['null', 'string'](uuid)
  - clinicalAccessId: ['null', 'string'](uuid)

**Phone**
  - phoneType: PhoneType
  - number: ['null', 'string']
  - use: ContactUse
  - extension: ['null', 'string']
  - isTextAllowed: boolean
  - isVoicemailAllowed: boolean

**PhoneRequest**
  - phoneType: ['null', 'string']
  - number: ['null', 'string']
  - extension: ['null', 'string']
  - isTextAllowed: boolean
  - isVoicemailAllowed: boolean
  - use: ['null', 'string']

**PhoneType**
  - (no properties)

**PickerRequest**
  - query: ['null', 'string'] (required)
  - top: ['null', 'integer', 'string'](int32)
  - skip: ['null', 'integer', 'string'](int32)

**PickerResult**
  - patientId: string(uuid) (required)
  - financialAccountNumber: ['null', 'string'] (required)
  - firstName: ['null', 'string'] (required)
  - preferredName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffixName: ['null', 'string'] (required)
  - middleName: ['null', 'string'] (required)
  - birthDate: object (required)

**PoliciesSnapshot**
  - policies: ['null', 'array']
  - sourceStreamEventNumber: ['integer', 'string'](int64)
  - sourceStreamUnixTimestamp: ['integer', 'string'](int64)

**Policy**
  - payerId: ['null', 'string'](uuid)
  - payerName: ['null', 'string']
  - planId: ['null', 'string'](uuid)
  - planName: ['null', 'string']
  - policyId: string(uuid)
  - policyNumber: ['null', 'string']
  - isProvisionalPolicy: boolean

**PolicySnapshot**
  - policyId: string(uuid) (required)
  - planId: ['null', 'string'](uuid) (required)
  - policyNumber: ['null', 'string'] (required)
  - groupNumber: ['null', 'string'] (required)

**PrintWristbandRequest**
  - printerSerialNumber: ['null', 'string'] (required)
  - patientId: string(uuid) (required)

**ProbableDuplicate**
  - patientId: string(uuid) (required)
  - probableDuplicatePatientId: string(uuid) (required)
  - matchedFields: ProbableMatchedField[] (required)
  - timeStamp: string(date-time) (required)
  - reciprocalDetails: object (required)
  - isDeleted: boolean (required)

**ProbableDuplicatePrimaryRelationship**
  - probableDuplicatePatientId: string(uuid) (required)
  - isPatientPrimary: boolean (required)
  - timeStamp: string(date-time) (required)

**ProbableDuplicateResponse**
  - probableDuplicatePatientId: string(uuid) (required)
  - matchedFields: ['null', 'array'] (required)
  - timeStamp: string(date-time) (required)

**ProbableMatchedField**
  - name: ['null', 'string'] (required)
  - values: ['null', 'array'] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**RecentPatient**
  - patientId: string(uuid)
  - financialAccountNumber: ['null', 'string']
  - demographics: Demographics
  - primaryAddress: Address
  - primaryPhone: Phone
  - statusName: ['null', 'string']
  - isTestPatient: boolean
  - isMerged: boolean
  - isDeleted: boolean
  - status: Status

**ReciprocalDetails**
  - reciprocalMode: ReciprocalMode (required)
  - eventNumber: ['null', 'integer', 'string'](int64) (required)

**ReciprocalMode**
  - (no properties)

**SearchHit**
  - score: ['number', 'string'](double) (required)
  - patient: PatientResult (required)

**SearchRequest**
  - query: ['null', 'string'] (required)
  - top: ['null', 'integer', 'string'](int32)
  - skip: ['null', 'integer', 'string'](int32)
  - locationIds: string(uuid)[]

**SearchResponse**
  - totalsHits: ['integer', 'string'](int64) (required)
  - includedHits: ['integer', 'string'](int64) (required)
  - results: ['null', 'array'] (required)
  - searchText: ['null', 'string']

**SearchSyncResponse**
  - patientVersion: ['integer', 'string'](int64) (required)
  - patientTimestampUnix: ['integer', 'string'](int64) (required)
  - patientTimestamp: string(date-time) (required)
  - searchRecordVersion: ['null', 'integer', 'string'](int64) (required)
  - searchRecordTimestampUnix: ['null', 'integer', 'string'](int64) (required)
  - searchRecordTimestamp: ['null', 'string'](date-time) (required)
  - timeoutExceeded: boolean (required)
  - result: SearchSyncResult

**SearchSyncResult**
  - enum values: PatientNewer, SearchIndexNewer, InSync

**SexType**
  - (no properties)

**SnfPatient**
  - payerId: string(uuid)
  - payerName: ['null', 'string']
  - snfId: string(uuid)
  - snfName: ['null', 'string']
  - snfPatientId: string(uuid)
  - residentNumber: ['null', 'string']

**Status**
  - name: ['null', 'string']
  - type: StatusType
  - effectiveDate: object
  - statusChangedByUserId: ['null', 'string'](uuid)

**StatusRequest**
  - name: ['null', 'string']
  - type: object
  - effectiveDate: Date

**StatusResponse**
  - testStatus: TestStatus
  - name: ['null', 'string']
  - type: StatusType
  - effectiveDate: object
  - statusChangedByUserId: ['null', 'string'](uuid)

**StatusType**
  - (no properties)

**TestStatus**
  - isTestPatient: boolean (required)
  - effectiveDate: Date (required)
  - changedByUserId: string(uuid) (required)
  - timestamp: string(date-time) (required)

**TestStatusRequest**
  - isTestPatient: boolean
  - effectiveDate: Date

