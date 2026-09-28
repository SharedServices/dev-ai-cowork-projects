﻿# Snowdrop.Guarantors.Api - API Dictionary

Repo: snowdrop-guarantors-be
Source: Snowdrop.Guarantors.Api.json

## Endpoints

### GET /guarantors/patient/{patientId}
- Tags: PatientGuarantors
- Path params: patientId: string(uuid), required
- Response 200: PatientGuarantorResponse[]

### POST /guarantors/patient/{patientId}
- Tags: PatientGuarantors
- Path params: patientId: string(uuid), required
- Request body: CreateGuarantorRequest
- Response 200: CreateGuarantorResponse

### PUT /guarantors/patient/{patientId}
- Tags: PatientGuarantors
- Path params: patientId: string, required
- Request body: UpdateGuarantorRequest
- Response 200: (no body)

### DELETE /guarantors/patient/{patientId}/delete/{guarantorId}
- Tags: PatientGuarantors
- Path params: patientId: string(uuid), required; guarantorId: string(uuid), required
- Response 200: (no body)

## Schemas

**CreateGuarantorRequest**
  - firstName: ['null', 'string']
  - middleName: ['null', 'string']
  - lastName: ['null', 'string']
  - suffixName: ['null', 'string']
  - socialSecurityNumber: ['null', 'string']
  - birthDate: object
  - sex: object
  - patientRelationship: ['null', 'string'](uuid)
  - address: object
  - contactInfo: object

**CreateGuarantorResponse**
  - guarantorId: string(uuid) (required)
  - guarantorFAN: ['null', 'string']

**Date**
  - (no properties)

**EmailUse**
  - (no properties)

**GuarantorAddress**
  - addressLine1: string
  - addressLine2: string
  - stateId: ['null', 'string'](uuid)
  - zipCode: string
  - city: string
  - county: string

**GuarantorContactInfo**
  - phoneType: PhoneType
  - phoneUse: object
  - phoneNumber: ['null', 'string']
  - phoneExtension: ['null', 'string']
  - emailProhibited: boolean
  - emailAddress: ['null', 'string']
  - emailUse: object

**GuarantorStatus**
  - (no properties)

**PatientGuarantorResponse**
  - status: GuarantorStatus
  - organizationId: string(uuid) (required)
  - guarantorId: string(uuid) (required)
  - patientId: string(uuid) (required)
  - guarantorFAN: ['null', 'string']
  - firstName: string
  - middleName: string
  - lastName: string
  - suffixName: string
  - socialSecurityNumber: string
  - birthDate: object
  - sex: object
  - patientRelationship: ['null', 'string'](uuid)
  - address: object
  - contactInfo: object
  - isDeleted: boolean
  - createdBy: ['null', 'string'](uuid)
  - lastModifiedBy: ['null', 'string'](uuid)
  - partition: string
  - id: string
  - eTag: ['null', 'string']
  - timeToLive: ['integer', 'string'](int32)

**PhoneType**
  - (no properties)

**PhoneUse**
  - (no properties)

**SexType**
  - (no properties)

**UpdateGuarantorRequest**
  - guarantorId: string(uuid) (required)
  - firstName: ['null', 'string']
  - middleName: ['null', 'string']
  - lastName: ['null', 'string']
  - suffixName: ['null', 'string']
  - socialSecurityNumber: ['null', 'string']
  - birthDate: object
  - sex: object
  - patientRelationship: ['null', 'string'](uuid)
  - address: object
  - contactInfo: object

