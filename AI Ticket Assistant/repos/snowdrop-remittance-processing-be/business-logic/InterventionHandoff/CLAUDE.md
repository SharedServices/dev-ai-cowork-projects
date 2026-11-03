# Intervention handoff — how remittance processing hands dispute flags to the interventions services

## What this covers

How the intervention-type rule sequences in remittance processing (RP) relate to the interventions that users work. RP evaluates rules and posts; separate services own interventions. Confidence: the rule and event facts come from the repo's Rules references; the handoff facts come from a team discussion and are not verified in code.

## Key concepts / vocabulary

- **Intervention sequences (RP):** Denial Intervention (`DisputeDenial`), Transfer Intervention (`DisputeTransfer`) and Underpayment Intervention (`DisputeUnderpayment`). All three are `ChargeSequences`, so they run against each charge payment. See `../Rules/references/predefined-sequences.md` for ids and order.
- **Dispute event and flag:** when one of these behaviors fires, RP emits a dispute event that carries `chargePaymentId`, `isDisputed` and `disputeTypes` (`Denial`, `Transfer` or `Underpayment`), and sets the matching `ChargePaymentFlags` value (`DenialDispute`, `TransferDispute`, `UnderpaymentDispute`). Event shapes: `../Rules/references/rule-behaviors-issue-analysis.md` sections 3.3 to 3.5, and `../../references/Events.md`.
- **Charge Interventions (`snowdrop-charge-interventions-be`):** a separate service, owned by another squad, that sits between RP and the interventions service.
- **Interventions (`snowdrop-interventions-be`):** the service that holds intervention entities. Users edit, reassign and close interventions there, not in RP.

## How the handoff works (not verified in code)

- Charge Interventions consumes RP's posting and reversal events, manages interventions from them, and coordinates with several other backends that are outside RP.
- RP does not track intervention state. It publishes data keyed by `ChargePaymentId` and does not learn whether an intervention was created, changed or closed.
- For Denial, a reversal is another event with the same `ChargePaymentId`; Charge Interventions decides what a reversal means for the intervention. A repeat posting against the same id is treated as an update to, or creation of, the intervention entity.
- Replacing Charge Interventions with an RP-owned orchestrator is not an option.

## Known gotchas / non-obvious behavior

### Interventions are not created by RP
A dispute flag or event in RP does not by itself mean an intervention exists. Check the interventions services for the entity; RP only supplies the trigger data.

### ChargePaymentId is the key
Dispute events reference a charge payment, not a charge. See `../ChargePaymentCardinality/CLAUDE.md` for why a search by `ChargeId` alone can miss events.

### DenialDispute suppresses Underpayment disputes
`DisputeUnderpayment` skips a charge already flagged `DenialDispute`. Reusing that flag for another purpose would change Underpayment behavior.

## Not yet documented

- Which field or flag makes a disputed charge post with $0 adjustment and transfer amounts.
- Which event carries intervention data at posting time, and its fields.
- What Charge Interventions does on a repeat post for an existing intervention, and what triggers auto-resolve and removal on reversal.

## Where to look for more

- `../Rules/CLAUDE.md` — rules engine, claim versus charge payment semantics, processing order.
- `../Rules/references/rule-behaviors-issue-analysis.md` — fire conditions and effects for each intervention behavior.
- `../../../snowdrop-charge-interventions-be/CLAUDE.md` and `../../../snowdrop-interventions-be/CLAUDE.md` — the receiving services (API specs only).
