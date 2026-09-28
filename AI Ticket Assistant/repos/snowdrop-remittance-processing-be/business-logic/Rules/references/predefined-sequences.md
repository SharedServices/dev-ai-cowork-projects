# Predefined Sequences Reference

Reference data for diagnosing events and Splunk logs that reference remittance-processing sequences by `SequenceId`. These 8 sequences are hardcoded (identical GUID across every organization) in `PreDefinedSequences.cs`, in the application repo, not this workspace. They are lazily created per-organization on first read (see `SequenceRepository.ValidateSequences`), not seeded by an explicit org-onboarding step.

**Working a real ticket?** Once you've resolved a `SequenceId`/`BehaviorCategory` here, go to [rule-behaviors-issue-analysis.md](rule-behaviors-issue-analysis.md) for that behavior's ordered fire-condition checklist and known issue-analysis gotchas.

## Sequences

| Order | SequenceId (GUID) | Name | NetType | Behavior Categories |
|---|---|---|---|---|
| 1 | `E6F6AA9E-94F6-4C04-ABC0-EB17F242E506` | Adjudication Code Suppression | ChargeSequences | SuppressAdjudicationCode |
| 2 | `E6F6AA9E-94F6-4C04-ABC0-EB17F242E500` | Adjudication Code Reassignment | ChargeSequences | ReassignAsAdjustment, ReassignAsTransfer, TransferToGuarantor, AdjustToZero |
| 3 | `E6F6AA9E-94F6-4C04-ABC0-EB17F242E501` | Denial Intervention | ChargeSequences | DisputeDenial |
| 4 | `E6F6AA9E-94F6-4C04-ABC0-EB17F242E503` | Transfer Intervention | ChargeSequences | DisputeTransfer |
| 5 | `E6F6AA9E-94F6-4C04-ABC0-EB17F242E502` | Underpayment Intervention | ChargeSequences | DisputeUnderpayment |
| 6 | `E6F6AA9E-94F6-4C04-ABC0-EB17F242E509` | Transition Episode | ChargeSequences | TransitionEpisode |
| 7 | `E6F6AA9E-94F6-4C04-ABC0-EB17F242E504` | Discard Claim Payment | ClaimSequences | DiscardClaimPayment |
| 8 | `E6F6AA9E-94F6-4C04-ABC0-EB17F242E505` | Post Claim Payment | ClaimSequences | AutomaticallyPostRemittance |

**"Order" column note:** this is the fixed, actual execution order — sequences are always created in their declaration order from the static `PreDefinedSequences.Sequences` array, and the per-organization `SequenceOrderList` blob (keyed by `organizationId` + `NetType`) is always created from that same order the first time it's needed. The order is therefore consistent across all organizations.

## NetType enum values

| Value | Name |
|---|---|
| 0 | Unknown |
| 1 | ClaimSequences |
| 2 | ChargeSequences |
| 3 | Aggregate |

## BehaviorCategory enum values

| Value | Name |
|---|---|
| 1 | ReassignAsAdjustment |
| 2 | ReassignAsTransfer |
| 3 | DisputeDenial |
| 4 | DisputeUnderpayment |
| 5 | DisputeTransfer |
| 6 | DiscardClaimPayment |
| 7 | AutomaticallyPostRemittance |
| 8 | SuppressAdjudicationCode |
| 9 | TransitionEpisode |
| 10 | TransferToGuarantor |
| 11 | AdjustToZero |

## Source references

Paths below are in the application repo, not this workspace — not clickable from here.

- `PreDefinedSequences.cs` (`src/rulebehaviors/Contracts/`) — hardcoded GUIDs/names/NetType/BehaviorCategories
- `PreDefinedSequence.cs` (`src/runtime/Contracts/`) — value type definition
- `NetType.cs` (`src/rules/Contracts/Rules/`) — NetType enum
- `BehaviorCategory.cs` (`src/rulebehaviors/Contracts/`) — BehaviorCategory enum
- `SequenceRepository.cs` (`src/runtime/Repositories/`) — lazy per-org creation (`ValidateSequences`, line ~171) and order resolution (`GetSequencesAsync`, line ~63)
- `SequenceController.cs` (`src/services/Controllers/`) — API endpoint that triggers first-touch creation and publishes `SequenceCreated` events
- `Constants.cs` (`src/runtime/Contracts/`) — `NimbusSystemUser` GUID (`DAEB914F-1DF3-470F-9637-0DAE563AA034`) used as creator of auto-seeded sequences
