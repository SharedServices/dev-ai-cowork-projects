﻿# Snowdrop.Payments.Services.Administration - API Dictionary

Repo: snowdrop-payments-be
Source: Snowdrop.Payments.Services.Administration.json

## Endpoints

### POST /timeouts
- Tags: Timeout
- Request body: TimeoutRequest
- Response 200: (no body)
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /vendor/patientpayments/convertpaymenttype/{paymentSpecificationId}
- Tags: PatientPayments
- Path params: paymentSpecificationId: string(uuid), required
- Request body: ConvertPaymentTypeRequest
- Response 204: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

## Schemas

**ConvertPaymentTypeRequest**
  - destinationType: PaymentType (required)

**PaymentType**
  - (no properties)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**TimeoutRequest**
  - timeoutMilliseconds: ['integer', 'string'](int32) (required)

