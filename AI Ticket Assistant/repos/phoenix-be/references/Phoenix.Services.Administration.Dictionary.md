﻿# Phoenix.Services.Administration - API Dictionary

Repo: phoenix-be
Source: Phoenix.Services.Administration.json

## Endpoints

### GET /channels/list/{channelId}
- Tags: ChannelsList
- Path params: channelId: string(uuid), required
- Response 200: ChannelResponse
- Response 404: ProblemDetails

### GET /channels/list/inbound/types
- Tags: ChannelsList
- Response 200: TypeListResponse

### GET /channels/list/outbound
- Tags: ChannelsList
- Response 200: ChannelListResponse

### POST /channels/systems
- Tags: ChannelsSystems
- Request body: CreateSystemRequest
- Response 409: ProblemDetails
- Response 200: SystemResponse

### GET /channels/systems
- Tags: ChannelsSystems
- Response 200: SystemsListResponse

### GET /channels/systems/{systemId}
- Tags: ChannelsSystems
- Path params: systemId: string(uuid), required
- Response 200: SystemResponse

### GET /channels/systems/{systemId}/channels/{direction}
- Tags: Channels
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required
- Response 200: ChannelListItem[]
- Response 404: ProblemDetails

### GET /channels/systems/{systemId}/channels/{direction}/{channelId}/{version}/yaml
- Tags: Channels
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; version: ['integer', 'string'](int32), required
- Response 200: string
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/assertions
- Tags: ChannelsAssertions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required
- Request body: AssertionRequest
- Response 200: Assertion
- Response 409: ProblemDetails
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /channels/systems/{systemId}/channels/{direction}/{channelId}/assertions/{assertionId}
- Tags: ChannelsAssertions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; assertionId: string(uuid), required
- Request body: AssertionRequest
- Response 200: Assertion
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /channels/systems/{systemId}/channels/{direction}/{channelId}/assertions/{assertionId}
- Tags: ChannelsAssertions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; assertionId: string(uuid), required
- Response 200: Assertion

### DELETE /channels/systems/{systemId}/channels/{direction}/{channelId}/assertions/{assertionId}
- Tags: ChannelsAssertions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; assertionId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/assertions/duplicatecheck
- Tags: ChannelsAssertions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required
- Request body: DuplicateCheckRequest
- Response 200: DuplicateCheckResponse
- Response 404: ProblemDetails

### DELETE /channels/systems/{systemId}/channels/{direction}/{channelId}/conditions/{conditionId}
- Tags: ChannelsConditions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; conditionId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/conditions/{conditionId}/criteria
- Tags: ChannelsCriteria
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; conditionId: string(uuid), required
- Request body: AssertionRequest
- Response 200: Criteria
- Response 409: ProblemDetails
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### PUT /channels/systems/{systemId}/channels/{direction}/{channelId}/conditions/{conditionId}/criteria/{criteriaId}
- Tags: ChannelsCriteria
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; conditionId: string(uuid), required; criteriaId: string(uuid), required
- Request body: AssertionRequest
- Response 200: Criteria
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /channels/systems/{systemId}/channels/{direction}/{channelId}/conditions/{conditionId}/criteria/{criteriaId}
- Tags: ChannelsCriteria
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; conditionId: string(uuid), required; criteriaId: string(uuid), required
- Response 200: Criteria

### DELETE /channels/systems/{systemId}/channels/{direction}/{channelId}/conditions/{conditionId}/criteria/{criteriaId}
- Tags: ChannelsCriteria
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; conditionId: string(uuid), required; criteriaId: string(uuid), required
- Response 204: (no body)
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/conditions/{conditionId}/criteria/duplicatecheck
- Tags: ChannelsCriteria
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; conditionId: string(uuid), required
- Request body: DuplicateCheckRequest
- Response 200: DuplicateCheckResponse
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/conditions/duplicatecheck
- Tags: ChannelsConditions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required
- Request body: DuplicateCheckRequest
- Response 200: DuplicateCheckResponse
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/draft/discard
- Tags: Channels
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required
- Response 404: ProblemDetails
- Response 204: (no body)

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/draft/publish
- Tags: Channels
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required
- Request body: PublishDraftRequest
- Response 404: ProblemDetails
- Response 204: (no body)

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/model
- Tags: Channels
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required
- Request body: UpdateModelChannelRequest
- Response 202: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/restore/{version}
- Tags: Channels
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; version: ['integer', 'string'](int32), required
- Response 200: (no body)

### POST /channels/systems/{systemId}/channels/{direction}/{channelId}/status/{status}
- Tags: Channels
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; status: ChannelStatuses, required
- Response 202: (no body)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /channels/systems/{systemId}/channels/{direction}/{channelId}/versions
- Tags: ChannelsVersions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required
- Response 404: ProblemDetails
- Response 200: ChannelVersions

### GET /channels/systems/{systemId}/channels/{direction}/{channelId}/versions/{version}
- Tags: ChannelsVersions
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required; channelId: string(uuid), required; version: ['integer', 'string'](int32), required
- Response 404: ProblemDetails
- Response 200: ChannelVersionResponse

### POST /channels/systems/{systemId}/channels/{direction}/duplicatecheck
- Tags: Channels
- Path params: systemId: string(uuid), required; direction: ChannelDirections, required
- Request body: DuplicateCheckRequest
- Response 200: DuplicateCheckResponse
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/inbound
- Tags: Channels
- Path params: systemId: string(uuid), required
- Request body: CreateChannelRequest
- Response 200: InboundChannelResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 204: (no body)

### GET /channels/systems/{systemId}/channels/inbound/{channelId}
- Tags: Channels
- Path params: channelId: string(uuid), required; systemId: string, required
- Response 200: InboundChannelResponse
- Response 404: ProblemDetails

### PUT /channels/systems/{systemId}/channels/inbound/{channelId}
- Tags: Channels
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: UpdateChannelRequest
- Response 200: InboundChannelResponse
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/inbound/{channelId}/conditions
- Tags: InboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: CreateInboundConditionRequest
- Response 200: InboundCondition
- Response 409: ProblemDetails
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /channels/systems/{systemId}/channels/inbound/{channelId}/conditions
- Tags: InboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Response 200: InboundChannelResponseCondition[]
- Response 404: ProblemDetails

### PUT /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}
- Tags: InboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required; conditionId: string(uuid), required
- Request body: CreateInboundConditionRequest
- Response 200: InboundCondition
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}
- Tags: InboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required; conditionId: string(uuid), required
- Response 200: InboundCondition
- Response 404: ProblemDetails

### PUT /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/forcechoke
- Tags: InboundChannelsConditions
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; systemId: string, required
- Request body: ForceChokeRequest
- Response 200: (no body)

### GET /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/forcechoke
- Tags: InboundChannelsConditions
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; systemId: string, required
- Response 200: ForceChokeResponse

### GET /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/transformations
- Tags: InboundChannelsTransformations
- Path params: systemId: string(uuid), required; channelId: string(uuid), required; conditionId: string(uuid), required
- Response 200: EntitiesListResponse
- Response 404: ProblemDetails

### GET /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/transformations/{objectType}/properties/{propertyName}
- Tags: InboundChannelsTransformations
- Path params: systemId: string(uuid), required; channelId: string(uuid), required; conditionId: string(uuid), required; objectType: string, required; propertyName: string, required
- Response 200: PropertyTransformationResponse

### PUT /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/transformations/{objectType}/properties/{propertyName}
- Tags: InboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; objectType: string, required; propertyName: string, required; systemId: string, required
- Request body: PropertyTransformationRequest
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/transformations/{objectType}/properties/{propertyName}/validate
- Tags: InboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; objectType: string, required; propertyName: string, required; systemId: string, required
- Request body: PropertyTransformationRequest
- Response 400: ProblemDetails
- Response 200: ValidationResponse

### PUT /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/transformations/{type}
- Tags: InboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; type: string, required; systemId: string, required
- Response 200: (no body)

### DELETE /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/transformations/{type}
- Tags: InboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; type: string, required; systemId: string, required
- Response 204: (no body)
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/transformations/{type}
- Tags: InboundChannelsTransformations
- Path params: systemId: string(uuid), required; channelId: string(uuid), required; conditionId: string(uuid), required; type: string, required
- Response 200: EntityTransformationResponse
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/{conditionId}/validateforcechoke
- Tags: InboundChannelsConditions
- Path params: systemId: string, required; channelId: string, required; conditionId: string, required
- Request body: ForceChokeValidateRequest
- Response 200: ValidationResponse
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/inbound/{channelId}/conditions/order
- Tags: InboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: InboundChannelResponseCondition[]
- Response 404: ProblemDetails

### GET /channels/systems/{systemId}/channels/inbound/{channelId}/export
- Tags: ChannelImportExport
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Response 200: InboundChannelExport
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/inbound/{channelId}/import
- Tags: ChannelImportExport
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: InboundChannelExport
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/inbound/{channelId}/importlibrary
- Tags: ChannelImportExport
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: InboundLibraryImportRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/inbound/{channelId}/validate
- Tags: Channels
- Path params: channelId: string(uuid), required; systemId: string, required
- Query params: direction: ChannelDirections
- Request body: ValidateBoolRequest
- Response 200: ValidationResponse

### POST /channels/systems/{systemId}/channels/outbound
- Tags: Channels
- Path params: systemId: string(uuid), required
- Request body: CreateChannelRequest
- Response 200: OutboundChannelResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails
- Response 204: (no body)

### GET /channels/systems/{systemId}/channels/outbound/{channelId}
- Tags: Channels
- Path params: channelId: string(uuid), required; systemId: string, required
- Response 200: OutboundChannelResponse
- Response 404: ProblemDetails

### PUT /channels/systems/{systemId}/channels/outbound/{channelId}
- Tags: Channels
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: UpdateChannelRequest
- Response 200: OutboundChannelResponse
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/conditions
- Tags: OutboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: CreateOutboundConditionRequest
- Response 200: OutboundCondition
- Response 409: ProblemDetails
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/conditions
- Tags: OutboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Response 200: OutboundChannelResponseCondition[]
- Response 404: ProblemDetails

### PUT /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}
- Tags: OutboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required; conditionId: string(uuid), required
- Request body: CreateOutboundConditionRequest
- Response 200: OutboundCondition
- Response 404: ProblemDetails
- Response 409: ProblemDetails

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}
- Tags: OutboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required; conditionId: string(uuid), required
- Response 200: OutboundConditionResponse
- Response 404: ProblemDetails

### PUT /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/forcechoke
- Tags: OutboundChannelsConditions
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; systemId: string, required
- Request body: ForceChokeRequest
- Response 200: (no body)

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/forcechoke
- Tags: OutboundChannelsConditions
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; systemId: string, required
- Response 200: ForceChokeResponse

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; systemId: string, required
- Request body: string[]
- Response 204: (no body)
- Response 404: ProblemDetails

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations
- Tags: OutboundChannelsTransformations
- Path params: systemId: string(uuid), required; channelId: string(uuid), required; conditionId: string(uuid), required
- Response 200: SegmentsListResponse
- Response 404: ProblemDetails

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations/{groupId}
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; groupId: string, required; systemId: string, required
- Response 200: SegmentGroupTransformationResponse
- Response 404: ProblemDetails

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations/{groupId}/{segmentId}/fields/{location}
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; groupId: string, required; segmentId: string, required; location: ['integer', 'string'](int32), required; systemId: string, required
- Response 200: FieldTransformationResponse
- Response 404: ProblemDetails

### PUT /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations/{groupId}/{segmentId}/fields/{location}
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; groupId: string, required; segmentId: string, required; location: ['integer', 'string'](int32), required; systemId: string, required
- Request body: FieldTransformationRequest
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations/{groupId}/{segmentId}/fields/{location}/validate
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; groupId: string, required; segmentId: string, required; location: ['integer', 'string'](int32), required; systemId: string, required
- Request body: FieldTransformationRequest
- Response 200: ValidationResponse
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations/{groupId}/filter
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; groupId: string, required; systemId: string, required
- Request body: FilterRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 202: (no body)

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations/{groupId}/filter
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; groupId: string, required; systemId: string, required
- Response 200: FilterResponse
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations/{groupId}/filter/validate
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; groupId: string, required; systemId: string, required
- Request body: FilterRequest
- Response 400: ProblemDetails
- Response 404: ProblemDetails
- Response 200: ValidationResponse

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/transformations/{groupId}/inputs
- Tags: OutboundChannelsTransformations
- Path params: channelId: string(uuid), required; conditionId: string(uuid), required; groupId: string, required; systemId: string, required
- Response 200: GroupInputsResponse
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/{conditionId}/validateforcechoke
- Tags: OutboundChannelsConditions
- Path params: channelId: string(uuid), required; systemId: string, required; conditionId: string, required
- Request body: ForceChokeValidateRequest
- Response 200: ValidationResponse
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/conditions/order
- Tags: OutboundChannelsConditions
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: string(uuid)[]
- Response 200: OutboundChannelResponseCondition[]
- Response 404: ProblemDetails

### GET /channels/systems/{systemId}/channels/outbound/{channelId}/export
- Tags: ChannelImportExport
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Response 200: OutboundChannelExport
- Response 404: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/import
- Tags: ChannelImportExport
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: OutboundChannelExport
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/importlibrary
- Tags: ChannelImportExport
- Path params: systemId: string(uuid), required; channelId: string(uuid), required
- Request body: OutboundLibraryImportRequest
- Response 200: string(uuid)
- Response 404: ProblemDetails
- Response 400: ProblemDetails

### POST /channels/systems/{systemId}/channels/outbound/{channelId}/validate
- Tags: Channels
- Path params: channelId: string(uuid), required; systemId: string, required
- Query params: direction: ChannelDirections
- Request body: ValidateBoolRequest
- Response 200: ValidationResponse

### POST /channels/systems/{systemId}/description
- Tags: ChannelsSystems
- Path params: systemId: string(uuid), required
- Request body: UpdateSystemDescriptionRequest
- Response 404: ProblemDetails
- Response 200: SystemResponse

### POST /channels/systems/{systemId}/status/{status}
- Tags: ChannelsSystems
- Path params: systemId: string(uuid), required; status: Statuses, required
- Response 404: ProblemDetails
- Response 200: SystemResponse

### GET /channels/systems/inbound/triggers
- Tags: InboundChannelsConditions
- Response 200: InboundTriggerMappings

### GET /channels/systems/outbound/triggers
- Tags: OutboundChannelsConditions
- Response 200: OutboundTriggerMappings

### GET /external/configuration/hl7/{integrationId}
- Tags: External
- Path params: integrationId: string(uuid), required
- Response 404: ProblemDetails
- Response 200: IntegrationConfigurationResponse

### GET /external/configuration/hl7/{integrationId}/custom
- Tags: External
- Path params: integrationId: string(uuid), required
- Response 404: ProblemDetails
- Response 200: (no body)

### GET /force/history/all
- Tags: ForceHistory
- Query params: next: string
- Response 200: BlobPageOfForceHistoryItem
- Response 400: ProblemDetails

### GET /force/history/batch
- Tags: ForceHistory
- Query params: next: string
- Response 200: BlobPageOfForceHistoryItem
- Response 400: ProblemDetails

### GET /force/history/single
- Tags: ForceHistory
- Query params: next: string
- Response 200: BlobPageOfForceHistoryItem
- Response 400: ProblemDetails

### POST /force/inbound
- Tags: ForceInbound
- Request body: InboundForceRequest
- Response 200: (no body)
- Response 400: ProblemDetails

### POST /force/inbound/gather
- Tags: ForceInbound
- Request body: InboundForceRequest
- Response 200: InboundGatherResponseOfInboundForceResponse
- Response 400: ProblemDetails

### POST /force/outbound/adt/patient
- Tags: ForceOutbound
- Request body: object
- Response 200: (no body)

### POST /force/outbound/adt/patient/gather
- Tags: ForceOutbound
- Request body: object
- Response 200: GatherResponseOfAdtPatientResponse

### POST /force/outbound/mfn/provider
- Tags: ForceOutbound
- Request body: object
- Response 200: (no body)

### POST /force/outbound/mfn/provider/gather
- Tags: ForceOutbound
- Request body: object
- Response 200: GatherResponseOfMfnProviderResponse

### POST /force/outbound/siu/appointment
- Tags: ForceOutbound
- Request body: object
- Response 200: (no body)

### POST /force/outbound/siu/appointment/gather
- Tags: ForceOutbound
- Request body: object
- Response 200: GatherResponseOfSiuAppointmentResponse

### GET /hl7integration/{direction}
- Tags: Hl7Integration
- Path params: direction: Directions, required
- Response 200: IntegrationListItemResponse[]

### POST /hl7integration/{direction}
- Tags: Hl7Integration
- Path params: direction: Directions, required
- Request body: CreateIntegrationRequest
- Response 400: ProblemDetails
- Response 409: ProblemDetails
- Response 201: IntegrationResponse

### PUT /hl7integration/{direction}/{integrationId}
- Tags: Hl7Integration
- Path params: direction: Directions, required; integrationId: string(uuid), required
- Request body: UpdateIntegrationRequest
- Response 409: ProblemDetails
- Response 204: (no body)

### GET /hl7integration/{direction}/{integrationId}
- Tags: Hl7Integration
- Path params: direction: Directions, required; integrationId: string(uuid), required
- Response 200: IntegrationResponse
- Response 404: ProblemDetails

### DELETE /hl7integration/{direction}/{integrationId}
- Tags: Hl7Integration
- Path params: direction: Directions, required; integrationId: string(uuid), required
- Response 404: ProblemDetails
- Response 204: (no body)
- Response 400: ProblemDetails

### GET /hl7integration/{direction}/{integrationId}/custom
- Tags: Hl7Integration
- Path params: direction: Directions, required; integrationId: string(uuid), required
- Response 404: ProblemDetails
- Response 204: (no body)

### PUT /hl7integration/{direction}/{integrationId}/custom
- Tags: Hl7Integration
- Path params: direction: Directions, required; integrationId: string(uuid), required
- Response 404: ProblemDetails
- Response 204: (no body)

### PUT /hl7integration/{direction}/{integrationId}/servicename
- Tags: Hl7Integration
- Path params: direction: Directions, required; integrationId: string(uuid), required
- Request body: UpdateIntegrationServiceNameRequest
- Response 404: ProblemDetails
- Response 204: (no body)

### POST /hl7integration/{direction}/duplicatecheck
- Tags: Hl7Integration
- Path params: direction: Directions, required
- Request body: DuplicateCheckRequest
- Response 200: DuplicateCheckResponse

### GET /hl7integration/executable/download
- Tags: DwellerExecutable
- Response 404: ProblemDetails
- Response 200: (no body)

### GET /hl7integration/executable/version
- Tags: DwellerExecutable
- Response 404: ProblemDetails
- Response 200: Hl7ExecutableResponse

### GET /library/channels/inbound/{channelId}/versions
- Tags: LibraryChannels
- Path params: channelId: string(uuid), required
- Response 200: LibraryChannelVersionResponse[]

### GET /library/channels/inbound/{channelId}/versions/{version}/strings
- Tags: LibraryChannels
- Path params: channelId: string(uuid), required; version: ['integer', 'string'](int32), required
- Response 200: object
- Response 404: ProblemDetails

### GET /library/channels/inbound/{channelId}/versions/{version}/yaml
- Tags: LibraryChannels
- Path params: channelId: string(uuid), required; version: ['integer', 'string'](int32), required
- Response 200: string
- Response 404: ProblemDetails

### GET /library/channels/inbound/codesearch
- Tags: LibraryChannels
- Query params: messageType: MessageType; transformationType: string; propertyName: string; search: string
- Response 200: InboundCodeSearchResult[]

### GET /library/channels/outbound/{channelId}/versions
- Tags: LibraryChannels
- Path params: channelId: string(uuid), required
- Response 200: LibraryChannelVersionResponse[]

### GET /library/channels/outbound/{channelId}/versions/{version}/conditions
- Tags: LibraryChannels
- Path params: channelId: string(uuid), required; version: ['integer', 'string'](int32), required
- Response 200: string[]
- Response 404: ProblemDetails

### GET /library/channels/outbound/{channelId}/versions/{version}/strings
- Tags: LibraryChannels
- Path params: channelId: string(uuid), required; version: ['integer', 'string'](int32), required
- Response 200: object
- Response 404: ProblemDetails

### GET /library/channels/outbound/{channelId}/versions/{version}/yaml
- Tags: LibraryChannels
- Path params: channelId: string(uuid), required; version: ['integer', 'string'](int32), required
- Response 200: string
- Response 404: ProblemDetails

### GET /library/channels/outbound/codesearch
- Tags: LibraryChannels
- Query params: messageType: MessageType; trigger: string; transformationType: string; segment: string; field: ['integer', 'string'](int32); search: string
- Response 200: OutboundCodeSearchResult[]

### GET /library/channels/search
- Tags: LibraryChannels
- Query params: Type: MessageType; Direction: ChannelDirections; ModelOnly: boolean; OrganizationId: string(uuid); SystemId: string(uuid); UserId: string(uuid)
- Response 200: LibraryChannelResponse[]

### GET /message-log/message/{messageId}/channels
- Tags: MessageLog
- Path params: messageId: string(uuid), required
- Response 200: ChannelResult[]
- Response 400: ProblemDetails

### GET /message-log/message/{messageId}/content
- Tags: MessageLog
- Path params: messageId: string(uuid), required
- Response 200: MessageContent
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /message-log/message/{messageId}/force
- Tags: MessageLog
- Path params: messageId: string(uuid), required
- Response 200: MessageForceHistory
- Response 400: ProblemDetails

### POST /message-log/message/{messageId}/force
- Tags: MessageLog
- Path params: messageId: string(uuid), required
- Request body: string
- Response 200: MessageIdentity
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /message-log/message/{messageId}/summary
- Tags: MessageLog
- Path params: messageId: string(uuid), required
- Response 200: MessageDetails
- Response 400: ProblemDetails
- Response 404: ProblemDetails

### GET /message-log/search/{query}
- Tags: MessageLog
- Path params: query: string, required
- Query params: next: string
- Response 200: MessageDetailsSearchResult
- Response 400: ProblemDetails

### POST /scripting/test/inbound
- Tags: Scripting
- Request body: TestRequest
- Response 200: TestResponse
- Response 400: ProblemDetails

### POST /scripting/validate
- Tags: Scripting
- Request body: ValidationRequest
- Response 200: ValidationResponse
- Response 404: ProblemDetails

### POST /support/adt/{patientId}/portfolio/{portfolioId}/discarded
- Tags: Support
- Path params: patientId: string(uuid), required; portfolioId: string(uuid), required
- Request body: DiscardRequest
- Response 200: (no body)

### DELETE /support/test-orgs/queues
- Tags: Support
- Query params: olderThanDays: ['integer', 'string'](int32)
- Response 200: QueueCleanupResult

### GET /systems
- Tags: GlobalSystems
- Response 200: object

## Schemas

**Activity**
  - eventId: string (required)
  - type: ActivityTypes (required)
  - userId: ['null', 'string'](uuid) (required)
  - date: string(date-time) (required)

**ActivityTypes**
  - (no properties)

**AdtPatientDetailResponse**
  - organizationId: string(uuid) (required)
  - locationIds: string(uuid)[] (required)
  - patientId: string(uuid) (required)
  - financialAccountNumber: string (required)
  - patientStatus: string (required)
  - firstName: ['null', 'string'] (required)
  - preferredName: ['null', 'string'] (required)
  - lastName: ['null', 'string'] (required)
  - suffixName: ['null', 'string'] (required)
  - phone: ['null', 'string'] (required)
  - birthDate: ['null', 'string'] (required)
  - addressLine1: ['null', 'string'] (required)
  - addressLine2: ['null', 'string'] (required)
  - addressCity: ['null', 'string'] (required)
  - addressState: ['null', 'string'](uuid) (required)
  - addressZipCode: ['null', 'string'] (required)

**AdtPatientResponse**
  - patient: AdtPatientDetailResponse (required)

**AdtPatientStatusType**
  - (no properties)

**Assertion**
  - id: string(uuid) (required)
  - name: string (required)
  - code: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**AssertionExport**
  - name: string (required)
  - code: string (required)

**AssertionRequest**
  - name: string (required)
  - code: string (required)

**BlobPageOfForceHistoryItem**
  - page: ForceHistoryItem[] (required)
  - next: ['null', 'string'] (required)

**ChannelDirections**
  - (no properties)

**ChannelImportOrigin**
  - organizationId: string(uuid) (required)
  - systemId: string(uuid) (required)
  - channelId: string(uuid) (required)
  - channelName: string (required)
  - version: ['integer', 'string'](int32) (required)
  - published: string(date-time) (required)
  - publishedBy: ['null', 'string'](uuid) (required)
  - isModel: boolean (required)
  - modelDescription: ['null', 'string'] (required)

**ChannelListChannelItem**
  - id: string(uuid) (required)
  - name: string (required)
  - type: MessageType (required)

**ChannelListItem**
  - id: string(uuid) (required)
  - name: string (required)
  - version: ['integer', 'string'](int32) (required)
  - type: MessageType (required)
  - status: ChannelStatuses (required)
  - direction: ChannelDirections (required)
  - isModel: boolean (required)
  - updated: ['null', 'string'](date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**ChannelListResponse**
  - systems: ChannelListSystemItem[] (required)

**ChannelListSystemItem**
  - id: string(uuid) (required)
  - systemTypeId: string(uuid) (required)
  - name: string (required)
  - channels: ChannelListChannelItem[] (required)

**ChannelPublishDetails**
  - version: ['integer', 'string'](int32) (required)
  - comment: string (required)
  - date: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**ChannelResponse**
  - id: string(uuid) (required)
  - name: string (required)
  - systemName: string (required)
  - direction: ChannelDirections (required)
  - type: MessageType (required)

**ChannelResponseAssertion**
  - id: string(uuid) (required)
  - name: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)
  - code: string (required)

**ChannelResult**
  - systemId: string(uuid) (required)
  - channelId: string(uuid) (required)
  - resultJson: string (required)

**ChannelStatuses**
  - (no properties)

**ChannelVersionItem**
  - version: ['integer', 'string'](int32) (required)
  - publishNotes: string (required)
  - userId: ['null', 'string'](uuid) (required)
  - date: string(date-time) (required)
  - origin: object (required)

**ChannelVersionResponse**
  - userId: ['null', 'string'](uuid) (required)
  - publishDate: string(date-time) (required)
  - publishNotes: string (required)
  - version: ['integer', 'string'](int32) (required)
  - fromVersion: ['null', 'integer', 'string'](int32)
  - activities: Activity[] (required)
  - origin: object

**ChannelVersions**
  - partition: string (required)
  - channelId: string(uuid) (required)
  - versions: ChannelVersionItem[] (required)
  - id: ['null', 'string']

**CreateChannelRequest**
  - name: string (required)
  - type: MessageType (required)

**CreateInboundConditionRequest**
  - name: string (required)
  - triggers: TriggerEvents[] (required)

**CreateIntegrationRequest**
  - nickname: string (required)
  - orgTag: string (required)
  - fileStorageDirectory: ['null', 'string'] (required)
  - retentionWeeks: ['integer', 'string'](int32) (required)
  - domainSuffix: string (required)
  - transitMode: TransitModes (required)
  - socketConfiguration: object (required)
  - fileConfiguration: object (required)
  - system: ['null', 'string'](uuid) (required)
  - disableDuplicateChecking: boolean (required)
  - duplicateCheckWindowMinutes: ['null', 'integer', 'string'](int32) (required)

**CreateOutboundConditionRequest**
  - name: string (required)
  - trigger: string (required)
  - events: OutboundEvent[] (required)
  - dwellerInstanceId: string(uuid) (required)

**CreateSystemRequest**
  - systemTypeId: string(uuid) (required)
  - description: string

**Criteria**
  - id: string(uuid) (required)
  - name: string (required)
  - code: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**CriteriaExport**
  - name: string (required)
  - code: string (required)

**Date**
  - (no properties)

**Directions**
  - (no properties)

**DiscardRequest**
  - isDiscarded: boolean (required)

**DuplicateCheckRequest**
  - id: ['null', 'string'](uuid) (required)
  - name: string (required)

**DuplicateCheckResponse**
  - found: boolean (required)

**EntitiesListResponse**
  - entities: EntityListItem[] (required)

**EntityListItem**
  - name: string (required)
  - type: string (required)
  - enabled: boolean (required)

**EntityTransformationResponse**
  - name: ['null', 'string'] (required)
  - type: string (required)
  - properties: PropertyTransformationItem[] (required)

**FailureResponse**
  - code: string (required)
  - message: string (required)
  - startLine: ['integer', 'string'](int32) (required)
  - startPosition: ['integer', 'string'](int32) (required)

**FieldTransformation**
  - location: ['integer', 'string'](int32) (required)
  - code: string (required)
  - repeating: boolean (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**FieldTransformationRequest**
  - code: ['null', 'string'] (required)
  - repeating: boolean (required)

**FieldTransformationResponse**
  - location: ['integer', 'string'](int32) (required)
  - codePreview: string (required)
  - repeating: boolean (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**FileTransitConfiguration**
  - path: string (required)
  - extension: string (required)

**FileTransitConfigurationRequest**
  - path: string (required)
  - extension: string (required)

**FilterRequest**
  - code: ['null', 'string'] (required)

**FilterResponse**
  - code: string (required)

**ForceChoke**
  - code: string (required)
  - name: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**ForceChokeExport**
  - name: string (required)
  - code: string (required)

**ForceChokeRequest**
  - code: ['null', 'string'] (required)
  - name: ['null', 'string'] (required)

**ForceChokeResponse**
  - code: string (required)
  - name: string (required)

**ForceChokeValidateRequest**
  - code: string (required)

**ForceHistoryItem**
  - forceType: ForceType (required)
  - direction: ChannelDirections (required)
  - batchId: string(uuid) (required)
  - forced: string(date-time) (required)
  - forcedBy: string(uuid) (required)
  - reason: string (required)
  - query: ['null', 'string'] (required)
  - parentMessageId: ['null', 'string'](uuid) (required)
  - childMessageId: ['null', 'string'](uuid) (required)
  - eventType: object (required)
  - rangeStart: ['null', 'string'](date-time) (required)
  - rangeEnd: ['null', 'string'](date-time) (required)
  - forceImpact: object (required)

**ForceType**
  - (no properties)

**GatherResponseOfAdtPatientResponse**
  - totalItems: ['integer', 'string'](int64) (required)
  - results: AdtPatientResponse[] (required)

**GatherResponseOfMfnProviderResponse**
  - totalItems: ['integer', 'string'](int64) (required)
  - results: MfnProviderResponse[] (required)

**GatherResponseOfSiuAppointmentResponse**
  - totalItems: ['integer', 'string'](int64) (required)
  - results: SiuAppointmentResponse[] (required)

**GroupInputsResponse**
  - (no properties)

**Hl7ExecutableResponse**
  - version: ['null', 'string'] (required)
  - file: ['null', 'string'] (required)

**IFormFile**
  - (no properties)

**InboundChannelExport**
  - name: string (required)
  - type: MessageType (required)
  - systemTypeId: string(uuid) (required)
  - assertions: AssertionExport[] (required)
  - conditions: InboundConditionExport[] (required)

**InboundChannelResponse**
  - channelId: string(uuid) (required)
  - systemId: string(uuid) (required)
  - name: string (required)
  - type: MessageType (required)
  - status: ChannelStatuses (required)
  - publish: ChannelPublishDetails (required)
  - isDraft: boolean (required)
  - draftLastModified: ['null', 'string'](date-time) (required)
  - draftLastModifiedUserId: ['null', 'string'](uuid) (required)
  - isModel: boolean (required)
  - modelDescription: ['null', 'string'] (required)
  - assertions: ChannelResponseAssertion[] (required)
  - conditions: InboundChannelResponseCondition[] (required)

**InboundChannelResponseCondition**
  - id: string(uuid) (required)
  - name: string (required)
  - triggers: TriggerEvents[] (required)
  - order: ['integer', 'string'](int32) (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**InboundCodeSearchResult**
  - organizationId: string(uuid)
  - channelId: string(uuid)
  - type: MessageType
  - version: ['integer', 'string'](int32)
  - conditionName: string
  - transformationType: string
  - property: InboundPropertyTransformationExport

**InboundCondition**
  - id: string(uuid) (required)
  - name: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)
  - criterias: Criteria[] (required)
  - transformations: ObjectTransformation[] (required)
  - forceChoke: ForceChoke (required)
  - triggers: TriggerEvents[] (required)

**InboundConditionExport**
  - name: string (required)
  - triggers: TriggerEvents[] (required)
  - criteria: CriteriaExport[] (required)
  - transformations: InboundObjectTransformationExport[] (required)
  - forceChoke: object (required)

**InboundForceRequest**
  - systemId: string(uuid) (required)
  - messageType: MessageType[] (required)
  - rangeStart: string(date-time) (required)
  - rangeEnd: string(date-time) (required)
  - messageFilter: ['null', 'string'] (required)
  - forceReason: ['null', 'string'] (required)

**InboundForceResponse**
  - messageId: string(uuid) (required)
  - received: ['null', 'string'](date-time) (required)
  - messageType: object (required)

**InboundGatherResponseOfInboundForceResponse**
  - query: string (required)
  - totalItems: ['integer', 'string'](int64) (required)
  - results: InboundForceResponse[] (required)

**InboundLibraryImportRequest**
  - channelId: string(uuid)
  - version: ['integer', 'string'](int32)
  - stringReplacements: ['null', 'object']

**InboundObjectTransformationExport**
  - type: string (required)
  - properties: InboundPropertyTransformationExport[] (required)

**InboundPropertyTransformationExport**
  - name: string (required)
  - code: string (required)
  - continueOnError: boolean (required)

**InboundTriggerMappings**
  - typeTriggers: object (required)
  - triggerNames: object (required)

**InputType**
  - (no properties)

**IntegrationConfigurationResponse**
  - integrationId: string(uuid) (required)
  - nickname: string (required)
  - serviceName: string (required)
  - fileStorageDirectory: string (required)
  - retentionWeeks: ['integer', 'string'](int32) (required)
  - direction: Directions (required)
  - transit: TransitDetails (required)
  - splunkHost: ['null', 'string'] (required)
  - splunkToken: ['null', 'string'] (required)

**IntegrationListItemResponse**
  - integrationId: string(uuid) (required)
  - nickname: string (required)
  - serviceName: string (required)
  - installationCommand: string (required)
  - system: ['null', 'string'](uuid) (required)
  - isUsedInChannel: boolean (required)

**IntegrationResponse**
  - integrationId: string(uuid) (required)
  - nickname: string (required)
  - serviceName: string (required)
  - fileStorageDirectory: ['null', 'string'] (required)
  - retentionWeeks: ['integer', 'string'](int32) (required)
  - transit: TransitDetails (required)
  - installationCommand: string (required)
  - system: ['null', 'string'](uuid) (required)
  - channels: ['null', 'array'] (required)
  - disableDuplicateChecking: boolean (required)
  - duplicateCheckWindowMinutes: ['null', 'integer', 'string'](int32) (required)

**LibraryChannelResponse**
  - channelId: string(uuid)
  - name: string
  - systemId: string(uuid)
  - organizationId: string(uuid)
  - isModel: boolean
  - modelDescription: ['null', 'string']
  - userId: ['null', 'string'](uuid)
  - publishDate: string(date-time)
  - publishNotes: string
  - version: ['integer', 'string'](int32)

**LibraryChannelVersionResponse**
  - version: ['integer', 'string'](int32)
  - userId: ['null', 'string'](uuid)
  - publishDate: string(date-time)
  - publishNotes: string

**MessageContent**
  - content: string (required)

**MessageDetails**
  - id: MessageIdentity (required)
  - sender: MessageSender (required)
  - system: ['null', 'string'](uuid) (required)
  - metadata: MessageMetadata (required)
  - patientIdentity: PatientIdentity (required)

**MessageDetailsSearchResult**
  - details: MessageDetails[] (required)
  - next: ['null', 'string'] (required)

**MessageForce**
  - id: MessageIdentity (required)
  - details: MessageForceDetails (required)

**MessageForceDetails**
  - batchId: string(uuid) (required)
  - forced: string(date-time) (required)
  - forcedBy: string(uuid) (required)
  - reason: string (required)

**MessageForceHistory**
  - parent: MessageForce (required)
  - children: MessageForce[] (required)

**MessageIdentity**
  - organizationId: string(uuid) (required)
  - messageId: string(uuid)
  - eventId: string(uuid) (required)

**MessageMetadata**
  - type: MessageType (required)
  - triggerEvent: string (required)
  - messageControlId: ['null', 'string'] (required)

**MessageSender**
  - userId: string(uuid) (required)
  - dwellerInstanceId: string(uuid) (required)
  - received: string(date-time) (required)
  - direction: ChannelDirections (required)
  - forced: boolean

**MessageType**
  - (no properties)

**MfnProviderAddress**
  - line1: ['null', 'string'] (required)
  - line2: ['null', 'string'] (required)
  - city: ['null', 'string'] (required)
  - state: ['null', 'string'](uuid) (required)
  - zipCode: ['null', 'string'] (required)
  - county: ['null', 'string'] (required)

**MfnProviderContact**
  - phone: ['null', 'string'] (required)
  - phoneExtension: ['null', 'string'] (required)
  - fax: ['null', 'string'] (required)
  - faxExtension: ['null', 'string'] (required)

**MfnProviderName**
  - first: ['null', 'string'] (required)
  - middle: ['null', 'string'] (required)
  - last: ['null', 'string'] (required)
  - suffix: ['null', 'string'] (required)

**MfnProviderResponse**
  - id: string(uuid) (required)
  - npi: string (required)
  - name: MfnProviderName (required)
  - address: MfnProviderAddress (required)
  - contact: MfnProviderContact (required)
  - specialty: ['null', 'string'](uuid) (required)

**ObjectTransformation**
  - type: string (required)
  - properties: ['null', 'array']

**OutboundChannelExport**
  - name: string (required)
  - type: MessageType (required)
  - systemTypeId: string(uuid) (required)
  - assertions: AssertionExport[] (required)
  - conditions: OutboundConditionExport[] (required)

**OutboundChannelResponse**
  - channelId: string(uuid) (required)
  - systemId: string(uuid) (required)
  - name: string (required)
  - type: MessageType (required)
  - status: ChannelStatuses (required)
  - publish: ChannelPublishDetails (required)
  - isDraft: boolean (required)
  - draftLastModified: ['null', 'string'](date-time) (required)
  - draftLastModifiedUserId: ['null', 'string'](uuid) (required)
  - isModel: boolean (required)
  - modelDescription: ['null', 'string'] (required)
  - assertions: ChannelResponseAssertion[] (required)
  - conditions: OutboundChannelResponseCondition[] (required)

**OutboundChannelResponseCondition**
  - id: string(uuid) (required)
  - name: string (required)
  - order: ['integer', 'string'](int32) (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)
  - trigger: string (required)
  - events: OutboundEvent[] (required)
  - dwellerInstanceId: string(uuid) (required)

**OutboundCodeSearchResult**
  - organizationId: string(uuid)
  - channelId: string(uuid)
  - type: MessageType
  - version: ['integer', 'string'](int32)
  - conditionName: string
  - conditionTrigger: string
  - transformationType: string
  - segmentName: string
  - field: OutboundFieldTransformationExport

**OutboundCondition**
  - id: string(uuid) (required)
  - name: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)
  - criterias: Criteria[] (required)
  - transformations: SegmentGroupTransformation[] (required)
  - forceChoke: ForceChoke (required)
  - trigger: string (required)
  - events: OutboundEvent[] (required)
  - dwellerInstanceId: string(uuid) (required)

**OutboundConditionExport**
  - name: string (required)
  - trigger: string (required)
  - events: OutboundEvent[] (required)
  - dwellerInstanceId: string(uuid) (required)
  - criteria: CriteriaExport[] (required)
  - transformations: OutboundSegmentGroupTransformationExport[] (required)
  - forceChoke: object (required)

**OutboundConditionResponse**
  - id: string(uuid) (required)
  - name: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)
  - trigger: string (required)
  - events: OutboundEvent[] (required)
  - dwellerInstanceId: string(uuid) (required)
  - forceChoke: object (required)
  - criterias: OutboundConditionResponseCriteria[] (required)

**OutboundConditionResponseCriteria**
  - id: string(uuid) (required)
  - name: string (required)
  - codePreview: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**OutboundConditionResponseForceChoke**
  - codePreview: string (required)
  - name: string (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**OutboundEvent**
  - (no properties)

**OutboundFieldTransformationExport**
  - location: ['integer', 'string'](int32) (required)
  - code: string (required)
  - repeating: boolean (required)

**OutboundLibraryImportRequest**
  - channelId: string(uuid)
  - version: ['integer', 'string'](int32)
  - stringReplacements: ['null', 'object']
  - dwellerMapping: ['null', 'object']

**OutboundSegmentGroupTransformationExport**
  - type: string (required)
  - segments: OutboundSegmentTransformationExport[] (required)
  - filterCode: ['null', 'string'] (required)

**OutboundSegmentTransformationExport**
  - segmentName: string (required)
  - fields: OutboundFieldTransformationExport[] (required)

**OutboundTriggerMappings**
  - typeTriggers: object (required)
  - triggerEvents: object (required)
  - eventNames: object (required)

**PatientIdentity**
  - id: string(uuid) (required)
  - financialAccountNumber: ['null', 'string'] (required)

**ProblemDetails**
  - type: ['null', 'string']
  - title: ['null', 'string']
  - status: ['null', 'integer', 'string'](int32)
  - detail: ['null', 'string']
  - instance: ['null', 'string']

**PropertyTransformation**
  - name: string (required)
  - code: string (required)
  - continueOnError: boolean (required)
  - updated: string(date-time) (required)
  - userId: ['null', 'string'](uuid) (required)

**PropertyTransformationItem**
  - name: string (required)
  - shortType: string (required)
  - required: boolean (required)
  - code: string (required)
  - continueOnError: boolean (required)

**PropertyTransformationRequest**
  - code: ['null', 'string']
  - continueOnError: boolean

**PropertyTransformationResponse**
  - name: string (required)
  - type: string (required)
  - shortType: string (required)
  - typeFormat: string (required)
  - required: boolean (required)
  - code: ['null', 'string'] (required)
  - continueOnError: boolean (required)

**PublishDraftRequest**
  - comment: string (required)

**QueueCleanupResult**
  - deletedQueues: string[] (required)
  - errors: string[] (required)

**SegmentGroupListItem**
  - groupId: string (required)
  - description: string (required)
  - enabled: boolean (required)
  - hasFilter: boolean (required)
  - segments: SegmentListItem[] (required)

**SegmentGroupTransformation**
  - type: string (required)
  - segments: SegmentTransformation[] (required)
  - filterCode: ['null', 'string'] (required)

**SegmentGroupTransformationResponse**
  - isFilterable: boolean (required)
  - hasFilter: boolean (required)
  - segments: SegmentTransformationResponse[] (required)

**SegmentListItem**
  - segmentId: string (required)
  - description: string (required)

**SegmentsListResponse**
  - transformations: SegmentGroupListItem[] (required)

**SegmentTransformation**
  - segmentId: ['null', 'string']
  - fields: ['null', 'array']

**SegmentTransformationResponse**
  - segmentId: string (required)
  - description: string (required)
  - fields: FieldTransformationResponse[] (required)

**SiuAppointmentResponse**
  - id: string(uuid) (required)
  - patientId: string(uuid) (required)
  - dateOfService: Date (required)
  - startTime: object(time) (required)

**SocketTransitConfiguration**
  - ipAddress: string (required)
  - port: string (required)
  - sendAcknowledgements: boolean (required)

**SocketTransitConfigurationRequest**
  - ipAddress: string (required)
  - port: string (required)
  - sendAcknowledgements: boolean (required)

**Statuses**
  - (no properties)

**SystemResponse**
  - id: string(uuid) (required)
  - systemTypeId: string(uuid) (required)
  - description: string (required)
  - status: Statuses (required)
  - inboundChannels: ChannelListItem[] (required)
  - outboundChannels: ChannelListItem[] (required)

**SystemsListResponse**
  - systems: SystemsListResponseItem[] (required)

**SystemsListResponseItem**
  - systemId: string(uuid) (required)
  - systemTypeId: string(uuid) (required)
  - status: Statuses (required)
  - description: string (required)
  - channelsInboundOn: ['integer', 'string'](int32) (required)
  - channelsInboundOff: ['integer', 'string'](int32) (required)
  - channelsOutboundOn: ['integer', 'string'](int32) (required)
  - channelsOutboundOff: ['integer', 'string'](int32) (required)

**TestRequest**
  - code: string (required)
  - returnType: string (required)
  - hl7Message: string (required)

**TestResponse**
  - compilation: object (required)
  - result: ['null', 'string'] (required)
  - exception: ['null', 'string'] (required)

**TransitDetails**
  - mode: TransitModes (required)
  - socket: object (required)
  - file: object (required)

**TransitModes**
  - (no properties)

**TriggerEvents**
  - (no properties)

**TypeListResponse**
  - systems: TypeListSystemItem[] (required)

**TypeListSystemItem**
  - id: string(uuid) (required)
  - systemTypeId: string(uuid) (required)
  - name: string (required)
  - types: MessageType[] (required)

**UpdateChannelRequest**
  - name: string (required)

**UpdateIntegrationRequest**
  - nickname: string (required)
  - fileStorageDirectory: ['null', 'string'] (required)
  - retentionWeeks: ['integer', 'string'](int32) (required)
  - domainSuffix: string (required)
  - transitMode: TransitModes (required)
  - socketConfiguration: object (required)
  - fileConfiguration: object (required)
  - system: ['null', 'string'](uuid) (required)
  - disableDuplicateChecking: boolean (required)
  - duplicateCheckWindowMinutes: ['null', 'integer', 'string'](int32) (required)

**UpdateIntegrationServiceNameRequest**
  - orgTag: string (required)

**UpdateModelChannelRequest**
  - isModel: boolean
  - description: ['null', 'string']

**UpdateSystemDescriptionRequest**
  - description: string

**UsedByChannel**
  - channelId: string(uuid) (required)
  - channelName: string (required)

**ValidateBoolRequest**
  - code: string (required)

**ValidationRequest**
  - code: string (required)
  - returnType: string (required)
  - inputType: InputType (required)

**ValidationResponse**
  - success: boolean (required)
  - failures: FailureResponse[] (required)

