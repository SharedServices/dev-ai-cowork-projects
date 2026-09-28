﻿# Snowdrop.Intake.Api - API Dictionary

Repo: snowdrop-intake-be
Source: Snowdrop.Intake.Api.json

## Endpoints

### POST /intake/activities
- Tags: Activities
- Request body: CreateActivityRequest
- Response 200: ActivityIdResponse

### GET /intake/activities/{id}
- Tags: Activities
- Path params: id: string(uuid), required
- Response 200: Activity
- Response 404: (no body)

### POST /intake/activities/{id}
- Tags: Activities
- Path params: id: string(uuid), required
- Request body: CreateActivityRequest
- Response 200: ActivityIdResponse
- Response 409: (no body)

### PUT /intake/activities/{id}
- Tags: Activities
- Path params: id: string(uuid), required
- Request body: UpdateActivityRequest
- Response 200: ActivityIdResponse

### PUT /intake/activities/{id}/appointment
- Tags: Activities
- Path params: id: string(uuid), required
- Request body: ChangeActivityAppointmentRequest
- Response 200: ActivityIdResponse

### PUT /intake/activities/{id}/cancel
- Tags: Activities
- Path params: id: string(uuid), required
- Response 200: (no body)

### PUT /intake/activities/{id}/dateofservice
- Tags: Activities
- Path params: id: string(uuid), required
- Request body: RescheduleActivityRequest
- Response 200: (no body)

### PUT /intake/activities/{id}/location
- Tags: Activities
- Path params: id: string(uuid), required
- Request body: ChangeActivityLocationRequest
- Response 200: (no body)

### PUT /intake/activities/{id}/uphold
- Tags: Activities
- Path params: id: string(uuid), required
- Response 200: (no body)

### GET /intake/activities/hello-world
- Tags: Activities
- Response 200: (no body)

### GET /intake/encounters/{locationId}/{patientId}/{dateOfService}
- Tags: Encounters
- Path params: patientId: string(uuid), required; dateOfService: string, required; locationId: string(uuid), required
- Response 200: EncounterResponseWithPatient

### PUT /intake/encounters/{locationId}/{patientId}/{dateOfService}/status
- Tags: Encounters
- Path params: patientId: string(uuid), required; dateOfService: string, required; locationId: string(uuid), required
- Request body: EncounterStatusRequest
- Response 200: (no body)

### GET /intake/encounters/{locationId}/{patientId}/{dateOfService}/summary
- Tags: Encounters
- Path params: patientId: string(uuid), required; dateOfService: string, required; locationId: string(uuid), required
- Response 200: EncounterResponseWithPatient

### GET /intake/encounters/hello-world
- Tags: Encounters
- Response 200: (no body)

### POST /intake/locations/{locationId}/reservation-settings
- Tags: Locations
- Path params: locationId: string(uuid), required
- Request body: ReservationSettings
- Response 200: ReservationSettings

### GET /intake/locations/{locationId}/reservation-settings
- Tags: Locations
- Path params: locationId: string(uuid), required
- Response 200: ReservationSettings
- Response 404: (no body)

### GET /intake/locations/{locationId}/stats
- Tags: Locations
- Path params: locationId: string(uuid), required
- Response 200: LocationStatsResponse

### GET /intake/locations/hello-world
- Tags: Locations
- Response 200: (no body)

### GET /intake/schedules/{locationId}/{date}
- Tags: Schedules
- Path params: locationId: string(uuid), required; date: string, required
- Response 200: ScheduleResponse

### GET /intake/schedules/{locationId}/today
- Tags: Schedules
- Path params: locationId: string(uuid), required
- Response 200: ScheduleResponse

### GET /intake/schedules/{locationId}/today/arrival-volume
- Tags: Schedules
- Path params: locationId: string(uuid), required
- Response 200: ArrivalVolumeResponse

### GET /intake/schedules/{locationId}/today/status-counts
- Tags: Schedules
- Path params: locationId: string(uuid), required
- Response 200: StatusCountResponse

### GET /intake/schedules/hello-world
- Tags: Schedules
- Response 200: (no body)

### GET /intake/utilities/encounters/{locationId}/{date}/{patientId}/rebuild
- Tags: Utilities
- Path params: locationId: string(uuid), required; date: string, required; patientId: string(uuid), required
- Response 200: ScheduleResponse

### GET /intake/utilities/hello-world
- Tags: Utilities
- Response 200: (no body)

### GET /intake/utilities/schedules/{locationId}/{date}/rebuild
- Tags: Utilities
- Path params: locationId: string(uuid), required; date: string, required
- Response 200: ScheduleResponse

### GET /intake/utilities/thread-pool/minimums
- Tags: Utilities
- Query params: requestedWorkerThreads: integer(int32); requestedCompletionThreads: integer(int32)
- Response 200: ScheduleResponse

### GET /intake/work/workflows
- Tags: Workflow
- Response 200: WorkflowResponse[]

### POST /intake/work/workflows
- Tags: Workflow
- Request body: WorkflowRequest
- Response 200: WorkflowIdResponse

### GET /intake/work/workflows/{workflowId}
- Tags: Workflow
- Path params: workflowId: string(uuid), required
- Response 200: WorkflowResponse

### POST /intake/work/workflows/{workflowId}
- Tags: Workflow
- Path params: workflowId: string(uuid), required
- Request body: WorkflowRequest
- Response 200: WorkflowIdResponse

### PUT /intake/work/workflows/{workflowId}
- Tags: Workflow
- Path params: workflowId: string(uuid), required
- Request body: WorkflowRequest
- Response 200: (no body)

### DELETE /intake/work/workflows/{workflowId}
- Tags: Workflow
- Path params: workflowId: string(uuid), required
- Response 200: (no body)

### GET /intake/work/workflows/{workflowId}/stats
- Tags: Workflow
- Path params: workflowId: string(uuid), required
- Response 200: WorkflowResponse

### GET /intake/work/workflows/hello-world
- Tags: Workflow
- Response 200: (no body)

### GET /intake/work/workflows/stats
- Tags: Workflow
- Response 200: WorkflowWithStatsResponse[]

## Schemas

**Activity**
  - activityId: string(uuid)
  - dateOfService: string
  - patientId: string(uuid)
  - locationId: string(uuid)
  - appointment: ActivityAppointment
  - duration: string(date-span)
  - activityStatusId: string(uuid)
  - activityTypeId: string(uuid)
  - facilityId: string(uuid)
  - notes: string (nullable)
  - isCanceled: boolean

**ActivityAppointment**
  - time: string(date-span)
  - providerId: string(uuid)

**ActivityIdResponse**
  - activityId: string(uuid)

**ActivityResponse**
  - activityId: string(uuid)
  - activityCode: string (nullable)
  - notFoundFromCatalogs: boolean
  - errorFromCatalogs: boolean
  - dateOfService: string
  - patientId: string(uuid)
  - locationId: string(uuid)
  - appointment: ActivityAppointment
  - duration: string(date-span)
  - activityStatusId: string(uuid)
  - activityTypeId: string(uuid)
  - facilityId: string(uuid)
  - notes: string (nullable)
  - isCanceled: boolean

**Address**
  - AddressId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)
  - addressType: AddressType
  - addressLine1: string (nullable)
  - addressLine2: string (nullable)
  - city: string (nullable)
  - stateId: string(uuid) (nullable)
  - zipCode: string (nullable)
  - county: string (nullable)
  - mailType: MailType
  - isRecurring: boolean
  - fromMonth: integer(int32) (nullable)
  - toMonth: integer(int32) (nullable)
  - effective: string (nullable)

**AddressType**
  - enum values: 0, 1

**Appointment**
  - appointmentId: string(uuid)
  - time: string(date-span)
  - providerId: string(uuid)
  - primaryActivityTypeId: string(uuid)
  - appointmentTypeId: string(uuid) (nullable)
  - notes: string (nullable)
  - activityIds: string(uuid)[]
  - isDeleted: boolean

**ArrivalVolumeResponse**
  - locationId: string(uuid)
  - dateOfService: string
  - appointmentsPerHour: object (nullable)

**ChangeActivityAppointmentRequest**
  - appointment: ActivityAppointment

**ChangeActivityLocationRequest**
  - locationId: string(uuid)

**ContactPoint**
  - ContactPointId: string(uuid)
  - isDeleted: boolean
  - timeStamp: string(date-time)
  - contactPointType: ContactPointType
  - phoneType: PhoneType
  - number: string (nullable)
  - extension: string (nullable)
  - isTextAllowed: boolean
  - isVoicemailAllowed: boolean
  - emailAddress: string (nullable)
  - isEmailAllowed: boolean
  - use: ContactUse

**ContactPointType**
  - enum values: Phone, Email, Fax

**ContactUse**
  - enum values: 0, 1

**CreateActivityRequest**
  - activityId: string(uuid)
  - dateOfService: string
  - patientId: string(uuid)
  - locationId: string(uuid)
  - appointment: ActivityAppointment
  - duration: string(date-span)
  - activityStatusId: string(uuid)
  - activityTypeId: string(uuid)
  - facilityId: string(uuid)
  - notes: string (nullable)
  - isCanceled: boolean

**Demographics**
  - firstName: string (nullable)
  - middleName: string (nullable)
  - lastName: string (nullable)
  - suffixName: string (nullable)
  - preferredName: string (nullable)
  - birthDate: string (nullable)
  - socialSecurityNumber: string (nullable)
  - verification: DemographicsVerification

**DemographicsVerification**
  - userId: string(uuid)
  - timestamp: string(date-time)

**EncounterAlerts**
  - showDemographicsAlert: boolean
  - showPoliciesAlert: boolean
  - hasRecentPolicyValidation: boolean
  - hasActivePolicy: boolean

**EncounterBalance**
  - totalDue: number(double)
  - amountPaid: number(double)
  - totalRemaining: number(double)
  - hasUnderpaidBalancesRemaining: boolean
  - hasNonPaymentApplied: boolean

**EncounterResponseSansActivitiesWithPatient**
  - patient: PatientResponse
  - alerts: EncounterAlerts
  - startTime: string(date-span) (nullable)
  - appointmentTypeId: string(uuid) (nullable)
  - activityCount: integer(int32)
  - appointmentCount: integer(int32)
  - appointments: Appointment[] (nullable)
  - encounterId: string
  - encounterStatusId: string(uuid)
  - balance: EncounterBalance

**EncounterResponseWithPatient**
  - patient: PatientResponse
  - alerts: EncounterAlerts
  - nextEncounter: EncounterSlimResponse
  - previousEncounter: EncounterSlimResponse
  - activities: ActivityResponse[] (nullable)
  - appointments: Appointment[]
  - encounterId: string
  - encounterStatusId: string(uuid)
  - balance: EncounterBalance
  - appointmentTypeId: string(uuid) (nullable)
  - startTime: string(date-span) (nullable)
  - activityCount: integer(int32)
  - appointmentCount: integer(int32)

**EncounterSlimResponse**
  - encounterId: string
  - dateOfService: string
  - startTime: string(date-span)
  - appointmentTypeIds: string(uuid)[] (nullable)

**EncounterStatusRequest**
  - statusId: string(uuid)

**LocationStatisticsResponse**
  - arrivals: ArrivalVolumeResponse
  - statusCounts: StatusCountResponse

**LocationStatsResponse**
  - statistics: LocationStatisticsResponse

**MailType**
  - enum values: 0, 1, 2

**PatientProfileStrength**
  - hasFirstName: boolean
  - hasLastName: boolean
  - hasDateOfBirth: boolean
  - hasPhoneNumber: boolean
  - hasAddress: boolean
  - hasFacility: boolean
  - hasSex: boolean
  - hasPersonalContact: boolean
  - profileStrength: number(double)

**PatientResponse**
  - patientId: string(uuid)
  - demographics: Demographics
  - financialAccountNumber: string (nullable)
  - primaryPhone: Phone
  - primaryAddress: Address
  - primaryEmail: ContactPoint
  - primaryResponsibleProvider: string (nullable)
  - primaryInsurancePlan: string (nullable)
  - primaryInsurancePayer: string (nullable)
  - secondaryInsurancePlan: string (nullable)
  - secondaryInsurancePayer: string (nullable)
  - tertiaryInsurancePlan: string (nullable)
  - tertiaryInsurancePayer: string (nullable)
  - profileStrength: PatientProfileStrength

**Phone**
  - phoneType: PhoneType
  - number: string (nullable)
  - use: ContactUse
  - extension: string (nullable)
  - isTextAllowed: boolean
  - isVoicemailAllowed: boolean

**PhoneType**
  - enum values: 0, 1, 2

**RescheduleActivityRequest**
  - dateOfService: string

**ReservationSettings**
  - reserveWithoutDivisions: boolean

**ScheduleResponse**
  - date: string
  - locationId: string(uuid)
  - encounterCount: integer(int32)
  - encounters: EncounterResponseSansActivitiesWithPatient[] (nullable)

**StatusCountResponse**
  - locationId: string(uuid)
  - dateOfService: string
  - statusCounts: object (nullable)

**UpdateActivityRequest**
  - activityId: string(uuid)
  - dateOfService: string
  - patientId: string(uuid)
  - locationId: string(uuid)
  - appointment: ActivityAppointment
  - duration: string(date-span)
  - activityStatusId: string(uuid)
  - activityTypeId: string(uuid)
  - facilityId: string(uuid)
  - notes: string (nullable)
  - isCanceled: boolean

**WorkflowIdResponse**
  - workflowId: string(uuid)

**WorkflowRequest**
  - name: string (nullable)
  - description: string (nullable)
  - isFavorite: boolean
  - locationId: string(uuid)

**WorkflowResponse**
  - workflowId: string(uuid)
  - name: string (nullable)
  - description: string (nullable)
  - isFavorite: boolean
  - locationId: string(uuid)

**WorkflowWithStatsResponse**
  - workflowId: string(uuid)
  - statistics: LocationStatisticsResponse
  - name: string (nullable)
  - description: string (nullable)
  - isFavorite: boolean
  - locationId: string(uuid)

