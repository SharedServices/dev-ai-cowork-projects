﻿# Phoenix.Services.Hl7Messaging - API Dictionary

Repo: phoenix-be
Source: Phoenix.Services.Hl7Messaging.json

## Endpoints

### POST /inbound
- Tags: InboundHl7Message
- Request body: InboundHl7MessageRequest
- Response 200: InboundHl7MessageRequest
- Response 400: ProblemDetails

### GET /outbound/{dwellerId}
- Tags: OutboundHl7Message
- Path params: dwellerId: string(uuid), required
- Response 200: OutboundMessage
- Response 204: (no body)
- Response 400: ProblemDetails

### POST /outbound/{dwellerId}
- Tags: OutboundHl7Message
- Path params: dwellerId: string(uuid), required
- Request body: string(uuid)
- Response 200: string(uuid)
- Response 400: ProblemDetails

## Schemas

**ChannelDirections**
  - (no properties)

**InboundHl7MessageRequest**
  - dwellerInstanceId: string(uuid) (required)
  - messageId: string(uuid) (required)
  - message: ['null', 'string'] (required)

**MessageIdentity**
  - organizationId: string(uuid) (required)
  - messageId: string(uuid)
  - eventId: string(uuid) (required)

**MessageSender**
  - userId: string(uuid) (required)
  - dwellerInstanceId: string(uuid) (required)
  - received: string(date-time) (required)
  - direction: ChannelDirections (required)
  - forced: boolean

**OutboundMessage**
  - id: MessageIdentity (required)
  - sender: MessageSender (required)
  - message: string (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

