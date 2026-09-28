﻿# Snowdrop.PrevisitValidation.Services - API Dictionary

Repo: snowdrop-previsit-validation-be
Source: Snowdrop.PrevisitValidation.Services.json

## Endpoints

### GET /activities/{scheduledActivityId}
- Tags: ScheduledActivity
- Path params: scheduledActivityId: string(uuid), required
- Response 200: Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /encounters
- Tags: Encounter
- Request body: Snowdrop.PrevisitValidation.API.EncounterRequest
- Response 200: Snowdrop.PrevisitValidation.API.EncounterSummary.Header[]
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /encounters/{patientId}/{dateOfService}
- Tags: Encounter
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Response 200: Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /encounters/{patientId}/{dateOfService}/details
- Tags: Encounter
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Response 200: Snowdrop.PrevisitValidation.API.EncounterDetails.Details
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /encounters/{patientId}/{dateOfService}/reason-release
- Tags: Encounter
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Request body: Snowdrop.PrevisitValidation.API.ReleaseEncounterRequest
- Response 200: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /encounters/{patientId}/{dateOfService}/release
- Tags: Encounter
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Response 200: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /encounters/{patientId}/{dateOfService}/requeue
- Tags: Encounter
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Response 200: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /encounters/{patientId}/{dateOfService}/uphold
- Tags: Encounter
- Path params: patientId: string(uuid), required; dateOfService: string, required
- Response 200: (no body)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /encounters/interventions
- Tags: Encounter
- Response 200: Snowdrop.PrevisitValidation.API.InterventionTypes
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /encounters/rules/v2/enroll
- Tags: Encounter
- Response 200: (no body)

### GET /encounters/rules/v2/enrolled
- Tags: Encounter
- Response 200: boolean

### PUT /encounters/rules/v2/unenroll
- Tags: Encounter
- Response 200: (no body)

### GET /previsit-validation-coverage-verification-rules
- Tags: CoverageVerificationRule
- Response 200: Snowdrop.PrevisitValidation.Rules.RuleSummary[]
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /previsit-validation-coverage-verification-rules
- Tags: CoverageVerificationRule
- Request body: Snowdrop.PrevisitValidation.API.Rules.CreateRuleRequest
- Response 200: string(uuid)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /previsit-validation-coverage-verification-rules/{ruleId}
- Tags: CoverageVerificationRule
- Path params: ruleId: string(uuid), required
- Response 200: Snowdrop.PrevisitValidation.Rules.RuleDetail
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /previsit-validation-coverage-verification-rules/{ruleId}/delete
- Tags: CoverageVerificationRule
- Path params: ruleId: string(uuid), required
- Response 200: string(uuid)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /previsit-validation-coverage-verification-rules/{ruleId}/update
- Tags: CoverageVerificationRule
- Path params: ruleId: string(uuid), required
- Request body: Snowdrop.PrevisitValidation.API.Rules.UpdateRuleRequest
- Response 200: string(uuid)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /previsit-validation-coverage-verification-rules/behaviors/manualreview/releaseactions
- Tags: CoverageVerificationRule
- Response 200: System.Collections.Generic.KeyValuePair`2[[System.Int32, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e],[System.String, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]][]

### GET /previsit-validation-coverage-verification-rules/names/isunique
- Tags: CoverageVerificationRule
- Query params: name: string
- Response 200: boolean

### GET /previsit-validation-coverage-verification-rules/qualifiers
- Tags: CoverageVerificationRule
- Response 200: System.Collections.Generic.KeyValuePair`2[[System.Int32, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e],[System.String, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]][]

### GET /previsit-validation-coverage-verification-rules/ruleactions
- Tags: CoverageVerificationRule
- Response 200: System.Collections.Generic.KeyValuePair`2[[System.Int32, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e],[System.String, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]][]

### GET /previsit-validation-sequences
- Tags: PrevisitValidationSequence
- Response 200: Snowdrop.PrevisitValidation.Sequences.SequenceHeader[]
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /previsit-validation-sequences/{sequenceId}
- Tags: PrevisitValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: Snowdrop.PrevisitValidation.Sequences.SequenceHeader
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /previsit-validation-sequences/{sequenceId}/archive
- Tags: PrevisitValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /previsit-validation-sequences/{sequenceId}/behaviors
- Tags: PrevisitValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### POST /previsit-validation-sequences/{sequenceId}/download
- Tags: PrevisitValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: (no body)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /previsit-validation-sequences/{sequenceId}/restore
- Tags: PrevisitValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: string(uuid)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

### GET /previsit-validation-sequences/{sequenceId}/rules
- Tags: PrevisitValidationSequence
- Path params: sequenceId: string(uuid), required
- Response 200: Snowdrop.PrevisitValidation.Rules.RuleSummary[]
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /previsit-validation-sequences/{sequenceId}/rules/reorder
- Tags: PrevisitValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: Snowdrop.PrevisitValidation.Rules.RuleOrder[]
- Response 200: string(uuid)
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails

### PUT /previsit-validation-sequences/{sequenceId}/update
- Tags: PrevisitValidationSequence
- Path params: sequenceId: string(uuid), required
- Request body: Snowdrop.PrevisitValidation.API.Sequences.UpdateSequenceRequest
- Response 200: string(uuid)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 404: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 409: Microsoft.AspNetCore.Mvc.ProblemDetails

## Schemas

**Microsoft.AspNetCore.Mvc.ProblemDetails**
  - type: string (nullable)
  - title: string (nullable)
  - status: integer(int32) (nullable)
  - detail: string (nullable)
  - instance: string (nullable)

**Snowdrop.Policies.Model.Eligibility.EligibilityVerificationStatusType**
  - enum values: 0, 1, 2, 3, 4, 5, 6, 7, 8

**Snowdrop.Policies.Model.Eligibility.EligibilityVerificationType**
  - enum values: 0, 1

**Snowdrop.PrevisitValidation.API.EncounterDetails.Appointment**
  - time: string(date-span) (nullable)
  - appointmentType: string(uuid) (nullable)
  - facilityId: string(uuid) (nullable)
  - duration: string(date-span) (nullable)

**Snowdrop.PrevisitValidation.API.EncounterDetails.AppointmentGroup**
  - serviceTypeId: string(uuid) (nullable)
  - providerId: string(uuid) (nullable)
  - appointments: Snowdrop.PrevisitValidation.API.EncounterDetails.Appointment[] (nullable)

**Snowdrop.PrevisitValidation.API.EncounterDetails.Details**
  - patientId: string(uuid)
  - dateOfService: string
  - interventions: Snowdrop.PrevisitValidation.API.EncounterDetails.Intervention[] (nullable)
  - locations: Snowdrop.PrevisitValidation.API.EncounterDetails.Location[] (nullable)
  - policies: Snowdrop.PrevisitValidation.API.EncounterDetails.Policy[] (nullable)
  - rteFaults: string[] (nullable)

**Snowdrop.PrevisitValidation.API.EncounterDetails.Intervention**
  - type: string (nullable)
  - guidance: string (nullable)

**Snowdrop.PrevisitValidation.API.EncounterDetails.Location**
  - encounterNumber: string (nullable)
  - locationId: string(uuid)
  - appointmentGroups: Snowdrop.PrevisitValidation.API.EncounterDetails.AppointmentGroup[] (nullable)

**Snowdrop.PrevisitValidation.API.EncounterDetails.Policy**
  - policyId: string(uuid)
  - planId: string(uuid) (nullable)
  - payerId: string(uuid) (nullable)
  - ruleFailures: Snowdrop.PrevisitValidation.API.EncounterDetails.RuleFailure[] (nullable)

**Snowdrop.PrevisitValidation.API.EncounterDetails.RuleFailure**
  - name: string (nullable)
  - guidance: string (nullable)
  - verificationLink: string (nullable)
  - rteFailure: boolean

**Snowdrop.PrevisitValidation.API.EncounterRequest**
  - interventionTypes: string[] (nullable)
  - minDays: integer(int32) (nullable)
  - maxDays: integer(int32) (nullable)
  - alphaSplitStart: string (nullable)
  - alphaSplitEnd: string (nullable)
  - qualifiers: Snowdrop.PrevisitValidation.Rules.AttributeQualifiers[] (nullable)

**Snowdrop.PrevisitValidation.API.EncounterSummary.Header**
  - dateOfService: string
  - startTime: string(date-span) (nullable)
  - patientId: string(uuid)
  - patientDetails: Snowdrop.PrevisitValidation.API.EncounterSummary.PatientDetails
  - serviceTypes: string(uuid)[] (nullable)
  - locations: Snowdrop.PrevisitValidation.API.EncounterSummary.Location[] (nullable)
  - interventions: Snowdrop.PrevisitValidation.API.EncounterSummary.Intervention[] (nullable)

**Snowdrop.PrevisitValidation.API.EncounterSummary.Intervention**
  - name: string (nullable)
  - failures: integer(int32)

**Snowdrop.PrevisitValidation.API.EncounterSummary.Location**
  - encounterNumber: string (nullable)
  - locationId: string(uuid)
  - providerId: string(uuid) (nullable)

**Snowdrop.PrevisitValidation.API.EncounterSummary.PatientDetails**
  - firstName: string (nullable)
  - lastName: string (nullable)
  - dob: string (nullable)
  - fan: string (nullable)

**Snowdrop.PrevisitValidation.API.InterventionOption**
  - label: string (nullable)
  - value: string (nullable)

**Snowdrop.PrevisitValidation.API.InterventionSection**
  - name: string (nullable)
  - options: Snowdrop.PrevisitValidation.API.InterventionOption[] (nullable)

**Snowdrop.PrevisitValidation.API.InterventionTypes**
  - sections: Snowdrop.PrevisitValidation.API.InterventionSection[] (nullable)

**Snowdrop.PrevisitValidation.API.ReleaseEncounterRequest**
  - reason: string (nullable)
  - comment: string (nullable)

**Snowdrop.PrevisitValidation.API.Rules.CreateRuleRequest**
  - sequenceId: string(uuid) (required)
  - name: string (required)
  - description: string (nullable)
  - userGuidance: string (nullable)
  - behaviorCategory: integer(int32) (required)
  - serviceTypes: string(uuid)[] (nullable)
  - startDate: string (nullable)
  - endDate: string (nullable)
  - qualifiers: Snowdrop.PrevisitValidation.Rules.AttributeQualifiers[] (nullable)
  - sameDateOfServiceQualifiers: Snowdrop.PrevisitValidation.Rules.AttributeQualifiers[] (nullable)
  - ruleAction: Snowdrop.PrevisitValidation.Rules.RuleAction
  - releaseType: Snowdrop.PrevisitValidation.Rules.ReleaseType
  - behaviorConfiguration: object (nullable)
  - qualificationConfiguration: object (nullable)
  - modifiedDate: string(date-time) (nullable)

**Snowdrop.PrevisitValidation.API.Rules.UpdateRuleRequest**
  - modifiedDate: string(date-time) (nullable)
  - ruleId: string(uuid) (required)
  - name: string (required)
  - description: string (nullable)
  - userGuidance: string (nullable)
  - behaviorCategory: integer(int32) (required)
  - serviceTypes: string(uuid)[] (nullable)
  - startDate: string (nullable)
  - endDate: string (nullable)
  - qualifiers: Snowdrop.PrevisitValidation.Rules.AttributeQualifiers[] (nullable)
  - sameDateOfServiceQualifiers: Snowdrop.PrevisitValidation.Rules.AttributeQualifiers[] (nullable)
  - ruleAction: Snowdrop.PrevisitValidation.Rules.RuleAction
  - releaseType: Snowdrop.PrevisitValidation.Rules.ReleaseType
  - behaviorConfiguration: object (nullable)
  - qualificationConfiguration: object (nullable)

**Snowdrop.PrevisitValidation.API.Sequences.UpdateSequenceRequest**
  - sequenceId: string(uuid) (required)
  - name: string (nullable)
  - enabled: boolean

**Snowdrop.PrevisitValidation.Rules.AttributeQualifiers**
  - attributeType: Snowdrop.Waypoints.Contracts.Rules.AttributeType
  - setQualifiers: Snowdrop.PrevisitValidation.Rules.SetQualifier[] (nullable)
  - elementQualifiers: Snowdrop.PrevisitValidation.Rules.ElementQualifier[] (nullable)

**Snowdrop.PrevisitValidation.Rules.ElementQualifier**
  - elementId: string (nullable)
  - exclusionary: boolean

**Snowdrop.PrevisitValidation.Rules.NetType**
  - enum values: 0, 1, 2, 3, 9

**Snowdrop.PrevisitValidation.Rules.QualifierHeader**
  - attributeType: Snowdrop.Waypoints.Contracts.Rules.AttributeType
  - id: string (nullable)
  - isSet: boolean
  - exclusionary: boolean

**Snowdrop.PrevisitValidation.Rules.ReleaseType**
  - enum values: 0, 1, 2, 3, 4

**Snowdrop.PrevisitValidation.Rules.RuleAction**
  - enum values: 1, 2, 3

**Snowdrop.PrevisitValidation.Rules.RuleDetail**
  - sequenceId: string(uuid)
  - ruleId: string(uuid)
  - name: string (nullable)
  - description: string (nullable)
  - userGuidance: string (nullable)
  - behaviorCategory: integer(int32)
  - startDate: string (nullable)
  - endDate: string (nullable)
  - qualifiers: Snowdrop.PrevisitValidation.Rules.AttributeQualifiers[] (nullable)
  - sameDateOfServiceQualifiers: Snowdrop.PrevisitValidation.Rules.AttributeQualifiers[] (nullable)
  - behaviorConfiguration: object (nullable)
  - qualificationConfiguration: object (nullable)
  - reviewRequired: boolean
  - ruleAction: Snowdrop.PrevisitValidation.Rules.RuleAction
  - releaseType: Snowdrop.PrevisitValidation.Rules.ReleaseType
  - netType: Snowdrop.PrevisitValidation.Rules.NetType
  - createdByUserId: string(uuid)
  - createdDate: string(date-time)
  - lastModifiedByUserId: string(uuid)
  - lastModifiedDate: string(date-time)

**Snowdrop.PrevisitValidation.Rules.RuleHeader**
  - ruleId: string(uuid)
  - name: string (nullable)

**Snowdrop.PrevisitValidation.Rules.RuleOrder**
  - ruleId: string(uuid)
  - order: integer(int32)

**Snowdrop.PrevisitValidation.Rules.RuleSummary**
  - ruleId: string(uuid)
  - sequenceId: string(uuid)
  - order: integer(int32)
  - name: string (nullable)
  - description: string (nullable)
  - userGuidance: string (nullable)
  - behaviorCategory: integer(int32)
  - startDate: string (nullable)
  - endDate: string (nullable)
  - qualifiers: Snowdrop.PrevisitValidation.Rules.QualifierHeader[] (nullable)
  - sameDateOfServiceQualifiers: Snowdrop.PrevisitValidation.Rules.QualifierHeader[] (nullable)
  - ruleAction: Snowdrop.PrevisitValidation.Rules.RuleAction
  - releaseType: Snowdrop.PrevisitValidation.Rules.ReleaseType
  - behaviorConfiguration: object (nullable)

**Snowdrop.PrevisitValidation.Rules.SetQualifier**
  - setType: string (nullable)
  - setId: string(uuid)
  - isFactorySet: boolean
  - exclusionary: boolean

**Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection**
  - organizationId: string(uuid)
  - data: Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+DateEncounter
  - version: integer(int32)
  - hasFaults: boolean
  - needsReview: boolean
  - partition: string (nullable)
  - id: string (nullable)
  - _etag: string (nullable)
  - ttl: integer(int32)

**Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+DateEncounter**
  - patientId: string(uuid)
  - dateOfService: string
  - companyId: string(uuid) (nullable)
  - responsibleProviderId: string(uuid) (nullable)
  - activities: Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection+ScheduledActivity[] (nullable)
  - policies: Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+Policy[] (nullable)
  - evaluated: boolean
  - released: boolean
  - selfPayPayer: boolean

**Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+Eligibility**
  - verificationId: string(uuid)
  - verificationType: Snowdrop.Policies.Model.Eligibility.EligibilityVerificationType
  - verificationStatus: Snowdrop.Policies.Model.Eligibility.EligibilityVerificationStatusType
  - serviceTypes: string(uuid)[] (nullable)
  - rteError: string (nullable)
  - previouslyExisting: boolean

**Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+Policy**
  - policyId: string(uuid)
  - planId: string(uuid) (nullable)
  - payerId: string(uuid) (nullable)
  - ruleAssignment: Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+RuleAssignment
  - eligibility: Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+Eligibility
  - ruleAssignments: Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+RuleAssignmentV2[] (nullable)
  - ruleVerifications: Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+Eligibility[] (nullable)
  - verificationLinks: Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+VerificationReport[] (nullable)

**Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+RuleAssignment**
  - sequenceId: string(uuid)
  - ruleId: string(uuid)
  - verificationDate: string
  - earliestEligibility: string
  - latestEligibility: string
  - serviceTypes: string(uuid)[] (nullable)
  - useRTE: boolean
  - trustRTE: boolean
  - setDOSToTransmissionDate: boolean
  - checkUnverifiedServiceTypes: boolean

**Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+RuleAssignmentV2**
  - sequenceId: string(uuid)
  - ruleId: string(uuid)
  - verificationDate: string
  - earliestEligibility: string
  - latestEligibility: string
  - serviceTypes: string(uuid)[] (nullable)
  - useRTE: boolean
  - trustRTE: boolean
  - setDOSToTransmissionDate: boolean
  - checkUnverifiedServiceTypes: boolean
  - verificationId: string(uuid) (nullable)

**Snowdrop.PrevisitValidation.Runtime.Contracts.EncounterProjection+VerificationReport**
  - verificationId: string(uuid)
  - verificationLink: string (nullable)

**Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection**
  - organizationId: string(uuid)
  - data: Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection+ScheduledActivity
  - id: string (nullable)
  - partition: string (nullable)

**Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection+Appointment**
  - time: string(date-span)
  - duration: string(date-span)
  - providerId: string(uuid) (nullable)

**Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection+AppointmentType**
  - appointmentTypeId: string(uuid)
  - serviceTypeId: string(uuid) (nullable)
  - divisionId: string(uuid) (nullable)
  - companyId: string(uuid) (nullable)

**Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection+ScheduledActivity**
  - scheduledActivityId: string(uuid)
  - patientId: string(uuid)
  - dateOfService: string
  - locationId: string(uuid)
  - encounterNumber: string (nullable)
  - facilityId: string(uuid)
  - activityTypeId: string(uuid)
  - activityCode: string (nullable)
  - appointmentType: Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection+AppointmentType
  - appointment: Snowdrop.PrevisitValidation.Runtime.Contracts.ScheduledActivityProjection+Appointment
  - isCanceled: boolean

**Snowdrop.PrevisitValidation.Sequences.SequenceHeader**
  - sequenceId: string(uuid)
  - order: integer(int32)
  - name: string (nullable)
  - rules: Snowdrop.PrevisitValidation.Rules.RuleHeader[] (nullable)
  - sequenceStatus: Snowdrop.PrevisitValidation.Sequences.SequenceStatus
  - createdByUserId: string(uuid)
  - createdDate: string(date-time)
  - lastModifiedByUserId: string(uuid)
  - lastModifiedDate: string(date-time)

**Snowdrop.PrevisitValidation.Sequences.SequenceStatus**
  - enum values: 0, 1, 2

**Snowdrop.Waypoints.Contracts.Rules.AttributeType**
  - enum values: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25

**System.Collections.Generic.KeyValuePair`2[[System.Int32, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e],[System.String, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]]**
  - key: integer(int32)
  - value: string (nullable)

