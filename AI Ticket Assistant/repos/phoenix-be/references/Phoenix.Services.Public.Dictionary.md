﻿# Phoenix.Services.Public - API Dictionary

Repo: phoenix-be
Source: Phoenix.Services.Public.json

## Endpoints

### GET /channels/inbound
- Tags: ChannelsInbound
- Response 200: PublicSystemsListResponse

## Schemas

**ChannelListItem**
  - id: string(uuid) (required)
  - name: string (required)

**PublicSystemsListResponse**
  - systems: PublicSystemsListResponseItem[] (required)

**PublicSystemsListResponseItem**
  - id: string(uuid) (required)
  - systemTypeId: string(uuid) (required)
  - name: ['null', 'string'] (required)
  - channels: ChannelListItem[] (required)

