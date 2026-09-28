﻿# Snowdrop.Rte.Api - API Dictionary

Repo: snowdrop-rte-be
Source: Snowdrop.Rte.Api.json

## Endpoints

### POST /rte/createasyncrequest
- Tags: Rte
- Request body: Snowdrop.Rte.Api.Model.AsyncRteRequest
- Response 200: (no body)
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 500: (no body)

### POST /rte/createrequest
- Tags: Rte
- Request body: Snowdrop.Rte.Api.Model.RteRequest
- Response 200: Snowdrop.Rte.Api.Model.RteResponse
- Response 400: Microsoft.AspNetCore.Mvc.ProblemDetails
- Response 500: (no body)

## Schemas

**Microsoft.AspNetCore.Mvc.ProblemDetails**
  - type: string (nullable)
  - title: string (nullable)
  - status: integer(int32) (nullable)
  - detail: string (nullable)
  - instance: string (nullable)

**Snowdrop.Rte.Api.Model.AsyncRteRequest**
  - verificationId: string(uuid)
  - payerId: string(uuid)
  - planId: string(uuid)
  - policyId: string(uuid)
  - patientId: string(uuid)
  - providerNpi: string (nullable)
  - providerFirstName: string (nullable)
  - providerLastName: string (nullable)
  - subscriberMemberId: string (nullable)
  - subscriberDob: string(date-time)
  - dateOfService: string(date-time)
  - serviceTypes: string(uuid)[] (nullable)
  - setDosToTransmissionDate: boolean

**Snowdrop.Rte.Api.Model.DeductibleInformation**
  - totalDeductible: number(double) (nullable)
  - deductibleRemaining: number(double) (nullable)
  - deductibleMet: number(double) (nullable)

**Snowdrop.Rte.Api.Model.OopInformation**
  - totalOop: number(double) (nullable)
  - oopRemaining: number(double) (nullable)
  - oopMet: number(double) (nullable)

**Snowdrop.Rte.Api.Model.RteRequest**
  - validationId: string(uuid)
  - payerId: string(uuid)
  - planId: string(uuid)
  - policyId: string(uuid)
  - patientId: string(uuid)
  - providerNpi: string (nullable)
  - providerFirstName: string (nullable)
  - providerLastName: string (nullable)
  - subscriberMemberId: string (nullable)
  - subscriberDob: string(date-time)
  - dateOfService: string(date-time)
  - serviceTypes: string(uuid)[] (nullable)

**Snowdrop.Rte.Api.Model.RteResponse**
  - policyId: string(uuid)
  - dateOfService: string(date-time)
  - policyStatus: Snowdrop.Rte.Api.Model.RteStatus
  - providerNpi: string (nullable)
  - errors: string[] (nullable)
  - requestJson: string (nullable)
  - responseJson: string (nullable)
  - deductibleInformation: Snowdrop.Rte.Api.Model.DeductibleInformation
  - oopInformation: Snowdrop.Rte.Api.Model.OopInformation
  - serviceBenefits: Snowdrop.Rte.Api.Model.ServiceBenefit[] (nullable)

**Snowdrop.Rte.Api.Model.RteStatus**
  - enum values: 0, 1, 2, 3

**Snowdrop.Rte.Api.Model.ServiceBenefit**
  - serviceTypeId: string(uuid)
  - hasCoverage: boolean (nullable)
  - coInsurance: number(double) (nullable)
  - coPay: number(double) (nullable)

