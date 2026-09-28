﻿# Snowdrop.Payments.Services.PaymentPlans - API Dictionary

Repo: snowdrop-payments-be
Source: Snowdrop.Payments.Services.PaymentPlans.json

## Endpoints

### GET /payment-plan/plan/{patientId}
- Tags: PatientPaymentPlan
- Path params: patientId: string(uuid), required
- Query params: withSchedule: boolean
- Response 200: PatientPaymentPlanResponse[]
- Response 500: (no body)

### POST /payment-plan/plan/{patientId}
- Tags: PatientPaymentPlan
- Path params: patientId: string(uuid), required
- Request body: PatientPaymentPlanRequest
- Response 200: PatientPaymentPlanResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 500: (no body)

### GET /payment-plan/plan/{patientId}/{brandId}/{planId}
- Tags: PatientPaymentPlan
- Path params: patientId: string(uuid), required; brandId: string(uuid), required; planId: string(uuid), required
- Query params: withSchedule: boolean
- Response 200: PatientPaymentPlanResponse
- Response 404: ProblemDetails
- Response 500: (no body)

### DELETE /payment-plan/plan/{patientId}/{brandId}/{planId}
- Tags: PatientPaymentPlan
- Path params: patientId: string(uuid), required; brandId: string(uuid), required; planId: string(uuid), required
- Query params: terminationReason: string, required
- Response 200: PatientPaymentPlanResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 500: (no body)

### GET /payment-plan/plan/{patientId}/{brandId}/{planId}/validate
- Tags: PatientPaymentPlan
- Path params: patientId: string(uuid), required; brandId: string(uuid), required; planId: string(uuid), required
- Response 200: SlimPaymentPlanResponse
- Response 404: ProblemDetails
- Response 500: (no body)

### POST /payment-plan/plan/{patientId}/proposePlan
- Tags: PatientPaymentPlan
- Path params: patientId: string(uuid), required
- Request body: PatientPaymentPlanRequest
- Response 200: PatientPaymentPlanResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 500: (no body)

### GET /payment-plan/template/{brandId}
- Tags: PaymentPlanTemplates
- Path params: brandId: string(uuid), required
- Query params: activeOnly: boolean
- Response 200: PaymentPlanTemplateResponse[]
- Response 500: (no body)

### GET /payment-plan/template/{brandId}/{templateId}
- Tags: PaymentPlanTemplates
- Path params: brandId: string(uuid), required; templateId: string(uuid), required
- Response 200: PaymentPlanTemplateResponse
- Response 404: ProblemDetails
- Response 500: (no body)

### DELETE /payment-plan/template/{brandId}/{templateId}
- Tags: PaymentPlanTemplates
- Path params: brandId: string(uuid), required; templateId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 500: (no body)

### POST /payment-plan/template/{brandId}/{templateId}/update
- Tags: PaymentPlanTemplates
- Path params: brandId: string(uuid), required; templateId: string(uuid), required
- Request body: PaymentPlanTemplateRequest
- Response 200: PaymentPlanTemplateResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 500: (no body)

### POST /payment-plan/template/{brandId}/add
- Tags: PaymentPlanTemplates
- Path params: brandId: string(uuid), required
- Request body: PaymentPlanTemplateRequest
- Response 200: PaymentPlanTemplateResponse
- Response 409: ProblemDetails
- Response 500: (no body)

## Schemas

**Date**
  - (no properties)

**LastTransaction**
  - date: string(date-time) (required)
  - amount: ['number', 'string'](double) (required)
  - status: ['null', 'string'] (required)

**PatientPaymentPlanRequest**
  - patientPaymentPlanId: ['null', 'string'](uuid)
  - brandId: ['null', 'string'](uuid) (required)
  - guarantorId: ['null', 'string'](uuid) (required)
  - startDate: object (required)
  - duration: ['null', 'integer', 'string'](int32)
  - defaultPaymentMethodId: ['null', 'string'] (required)
  - startingBalance: ['null', 'number', 'string'](double) (required)
  - periodicPaymentAmount: ['null', 'number', 'string'](double)
  - status: object (required)
  - parentPaymentPlanTemplateId: ['null', 'string'](uuid)
  - paymentGraceDays: ['null', 'integer', 'string'](int32)
  - isActive: boolean
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean

**PatientPaymentPlanResponse**
  - patientPaymentPlanId: string(uuid)
  - parentPaymentPlanTemplateId: ['null', 'string'](uuid)
  - parentPaymentPlanTemplateName: string
  - brandId: string(uuid)
  - brandName: string
  - brandLogoUrl: string
  - guarantorId: string(uuid)
  - patientId: string(uuid)
  - startDate: Date
  - endDate: Date
  - duration: ['integer', 'string'](int32)
  - defaultPaymentMethodId: string
  - defaultPaymentAccountInfo: object
  - startingBalance: ['number', 'string'](double)
  - currentBalance: ['number', 'string'](double)
  - delinquentAmount: ['number', 'string'](double)
  - periodicPaymentAmount: ['number', 'string'](double)
  - createdDate: string(date-time)
  - createdById: string(uuid)
  - terminationReason: ['null', 'string']
  - status: PaymentPlanStatus
  - isActive: boolean
  - paymentSchedule: PaymentPlanPaymentResponse[]
  - isSelf: boolean
  - updatedDate: ['null', 'string'](date-time)
  - updatedById: ['null', 'string'](uuid)
  - autoLastPaid: object
  - paymentGraceDays: ['integer', 'string'](int32)
  - terminationDate: ['null', 'string'](date-time)
  - terminationUserId: ['null', 'string'](uuid)
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean
  - nextPaymentDate: Date

**PaymentDetailResponse**
  - paymentMethodId: string (required)
  - defermentReasonId: ['null', 'string'](uuid) (required)
  - amountPaid: ['number', 'string'](double) (required)
  - datePaid: Date (required)
  - paymentType: PaymentType (required)
  - transactionType: TransactionType (required)
  - lastFour: string (required)
  - cardType: string (required)
  - paymentSpecificationId: ['null', 'string'](uuid) (required)

**PaymentPlanFrequency**
  - (no properties)

**PaymentPlanPaymentResponse**
  - paymentPlanPaymentId: string(uuid) (required)
  - dateDue: Date (required)
  - amountDue: ['number', 'string'](double) (required)
  - startingBalance: ['number', 'string'](double) (required)
  - status: PaymentPlanPaymentStatus (required)
  - updatedDate: ['null', 'string'](date-time) (required)
  - amountPaid: ['number', 'string'](double)
  - amountRemaining: ['number', 'string'](double)
  - paymentDetails: ['null', 'array'] (required)

**PaymentPlanPaymentStatus**
  - (no properties)

**PaymentPlanSelfSelectAgeOptions**
  - (no properties)

**PaymentPlanStatus**
  - (no properties)

**PaymentPlanTemplateRequest**
  - name: ['null', 'string'] (required)
  - description: ['null', 'string']
  - duration: ['null', 'integer', 'string'](int32) (required)
  - minimum: ['null', 'integer', 'string'](int32) (required)
  - maximum: ['null', 'integer', 'string'](int32) (required)
  - selfSelectAgeOption: object (required)
  - active: ['null', 'boolean'] (required)
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean

**PaymentPlanTemplateResponse**
  - paymentPlanTemplateId: string(uuid)
  - name: string
  - description: ['null', 'string']
  - duration: ['integer', 'string'](int32)
  - minimum: ['integer', 'string'](int32)
  - maximum: ['integer', 'string'](int32)
  - selfSelectAgeOption: PaymentPlanSelfSelectAgeOptions
  - createdDate: string(date-time)
  - createdById: string(uuid)
  - updatedDate: ['null', 'string'](date-time)
  - updatedById: ['null', 'string'](uuid)
  - active: boolean
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean

**PaymentType**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**SlimPaymentPlanResponse**
  - patientPaymentPlanId: string(uuid)
  - brandId: string(uuid)
  - guarantorId: string(uuid)
  - patientId: string(uuid)
  - startDate: Date
  - endDate: Date
  - duration: ['integer', 'string'](int32)
  - startingBalance: ['number', 'string'](double)
  - currentBalance: ['number', 'string'](double)
  - delinquentAmount: ['number', 'string'](double)
  - periodicPaymentAmount: ['number', 'string'](double)
  - status: PaymentPlanStatus
  - frequency: PaymentPlanFrequency
  - splitPaymentsEvenly: boolean
  - isActive: boolean

**StripePaymentAccountsResponse**
  - paymentAccountId: ['null', 'string'] (required)
  - accountType: ['null', 'string'] (required)
  - cardType: ['null', 'string'] (required)
  - accountLastFour: ['null', 'string'] (required)
  - lastTransaction: LastTransaction (required)

**TransactionType**
  - (no properties)

