## Rules Engine — Remittance Processing

Many repos have their own rules engine; this content is one specific implementation of it, used by remittance processing only — confirmed repo-specific, not a shared cross-repo concept. Core gotcha this content exists for: the intuitive assumption that a non-matching *behavior* should let the engine fall through to the next rule is wrong for claim payments.

### Bundled reference files (read the one that answers the actual question — don't load all five)

- **`references/rule-behaviors-issue-analysis.md`** — **read this one first for any real production issue/ticket** ("why did/didn't this rule fire on this payment", "why did it produce this result"). Per behavior, gives the exact ordered fire-condition checklist, verbatim skip/failure messages, the precise event(s)/mutation(s) produced on a fire, and a curated "Gotchas for issue analysis" list. Also documents the shared dispatch/qualification framework (`RuleCompletionAction`, `QualificationConfiguration`, the two-level `DiscardClaimPayment` prefix filter).
- **`references/predefined-sequences.md`** — the full table of all 8 predefined sequences with `SequenceId` GUIDs, `NetType`, and `BehaviorCategory` values, plus the enum lookups. Read when a Splunk log or Cosmos event references a `SequenceId` or numeric `NetType`/`BehaviorCategory`.
- **`references/rule-technical-descriptions.md`** — developer-facing catalog of every rule behavior: `NetType`, configuration fields, qualification logic, source file/class. Read for exact field names for a behavior's configuration; for *why* a specific behavior did or didn't fire, use `rule-behaviors-issue-analysis.md` instead.
- **`references/rules-user-descriptions.md`** — plain-language user guide to the same rules, for the people configuring them (not developers).
- **`references/attribute-types.md`** — the `AttributeType` enum (positional/0-relative) used by a rule's top-level `qualifiers[]` and `SuppressedReasons[].AttributeType`. Read when a rule's JSON config references a numeric `attributeType`.

**Confirmed business/domain facts for this repo** live as sibling folders here: `../RemittanceLifecycle/CLAUDE.md` and `../ChargePaymentCardinality/CLAUDE.md` — they're not rules-engine configuration behavior, so they're kept out of this folder.

### Rule organization: sequences, and how a payment moves through them

Rules are organized into 8 **predefined sequences**, each identified by a fixed GUID that is identical across every organization (see `references/predefined-sequences.md`). Each sequence has a `NetType` — `ClaimSequences` (evaluates the whole claim payment) or `ChargeSequences` (evaluates individual charges) — and bundles one or more related `BehaviorCategory` values that execute in a fixed, declared order within that sequence.

Processing order for a single remittance/payment run: the rules engine runs the `ClaimSequences` sequences for the claim payment first, then runs the `ChargeSequences` sequences for each of that claim's charge payments.

Sequences are created lazily per organization — not seeded by an explicit onboarding step. The first call to the sequences API for a given org (`SequenceController` → `GetSequencesAsync`) creates all 8 sequences from the hardcoded `PreDefinedSequences.cs` list if they don't exist yet, and the per-org `SequenceOrderList` (execution order, keyed by org + NetType) is initialized from that same declaration order at that time. Because every org's order list is seeded from the same static declaration order, execution order is consistent across all organizations — see `references/predefined-sequences.md` for the confirmed order and source files.

The "stops on first qualifying rule" behavior described below applies **within a single sequence**, not across the whole rule set. The engine always runs *every* configured sequence for the relevant NetType — it does not skip a sequence just because an earlier sequence had a rule qualify. So "stopped after the first rule" only ever means "stopped after the first qualifying rule *in that sequence*" — check whether other sequences also ran and could have produced the effect the user expected.

### The core distinction: claim payments vs. charge payments

**Claim payments** (`ClaimSequences`): within a given sequence, the rules engine stops at the *first rule that qualifies* — full stop. It does not continue to the next rule in that sequence after a qualifying rule, even if that rule's **behavior** (the action section) doesn't end up doing anything. It does still move on and run the next sequence in full.

**Charge payments** (`ChargeSequences`): the rules engine runs *every rule in the sequence*, regardless of whether earlier rules qualified or triggered a behavior. There is no early exit.

### Why this trips people up

"Qualifies" and "behavior triggers" are two separate concepts:

- **Qualification** = the rule's conditions matched.
- **Behavior** = what the rule's action section does as a result (e.g., add an event, apply a code).

For claim payments, once a rule *qualifies*, the engine stops evaluating further rules in the sequence — independent of whether the behavior section actually produced any effect. It is easy to assume that if the behavior excludes the action (produces no effect), the engine should "fall through" and let the next rule in the sequence have a chance. It does not. The rule having qualified is what stops the sequence, not whether its behavior did something useful.

When investigating a claim payment where a rule "should have" fired further down the sequence, check first whether an earlier rule qualified — if it did, that's why nothing after it ran, even if that earlier rule's behavior looks like a no-op.

There's also a charge-payment version of this same trap, from a different angle: because charge-payment sequences always run every rule, an *earlier* rule in the sequence can consume the data a *later* rule needs. For example, Suppress Adjudication Code removes a reason code before later rules see it, which can prevent a Reassign or Dispute rule from firing on that same code — not because the sequence stopped, but because the data it needed is gone. If a charge-payment rule isn't firing when expected, check whether an earlier rule in the same sequence already removed or changed what it was looking for.

### AdjudicationCodeSuppression sequence: the `OnlyIfReversalOfPrevious` flag

The `SuppressAdjudicationCode` behavior (in the `AdjudicationCodeSuppression` sequence) has a configuration flag called `OnlyIfReversalOfPrevious`, distinct from the similarly-named `OnlyWhenPreviousPaymentReceived` flag (see `references/rule-technical-descriptions.md`). `OnlyIfReversalOfPrevious`'s qualification logic is not obvious from the name alone: a rule with this flag set only qualifies as a "reversal of previous" when the adjudication's amount is *exactly equal* to the charge payment's `BilledAmount`. That equality check is the actual condition the flag was built to enforce, per the original feature requirements, not a generic "is this a reversal" heuristic. When diagnosing why `OnlyIfReversalOfPrevious` did or didn't qualify for a given adjudication, compare the adjudication amount against that charge payment's `BilledAmount` first.

**Gotcha confirmed 2026-08-05 (UF-15495):** `OnlyIfReversalOfPrevious` is a per-rule flag, not a sequence-wide one — don't assume it applies to every rule in the `AdjudicationCodeSuppression` sequence just because one rule in that sequence uses it. On org `20390dc5-616a-456d-bbb6-cb247a4981cb`'s sequence, only order-4 "Suppress Negative Adjustments" (`4fa8debc-edf6-4494-ba54-f93867f15690`) has it set `true`; order-5 "DR - Suppress Transfers (Specialty Pharmacy)" (`1fec8f7c-7067-4a7e-a7e8-ccfb4ccbc858`) — a different rule, easily confused with the first because both deal with small/negative transfer amounts — has it set `false` and qualifies instead on a `TransferReason` set membership plus a `Modifier` `attributeType` qualifier (see `references/attribute-types.md`). Always pull the actual rule's `behaviorConfiguration` JSON (via the `remittance-processing-sequences/{sequenceId}/rules` API — see `snowdrop-api-calls` skill) rather than assuming a flag/explanation from one rule in a sequence carries over to another rule in the same sequence, even when their names or symptoms look similar.

### Tracing this in Splunk

Search the rules-engine logs for these three message patterns to reconstruct the evaluation path for a given payment:

| Splunk message | Meaning |
|---|---|
| `Rule action matched, adding events and skipping remaining rules` | The rule qualified. Logged whether or not the behavior section actually triggered anything. This is the "stop" point in the sequence for claim payments. |
| `Rule action continue, checking next rule` | The rule did **not** qualify. The engine moves on to the next rule in the sequence. |
| `Rule action failed` | The rule failed. |

**Important gotcha for claim payments:** when a rule fails, only the failure message is logged for that rule — you will not see a separate "qualified" or "continue" line alongside it. Expect a run of `Rule action continue, checking next rule` lines followed by either a single `Rule action matched, adding events and skipping remaining rules` (sequence stopped here) or a `Rule action failed` (this rule blew up, and that's the last line you'll see for it).

### How to use this when investigating

1. Confirm whether the payment in question is a **claim payment** or a **charge payment** — the evaluation semantics differ completely.
2. If a `SequenceId` or numeric `NetType`/`BehaviorCategory` shows up in a log or event, resolve it against `references/predefined-sequences.md`.
3. For claim payments, pull the Splunk trace (see `splunk-search` skill for query mechanics) and read the `Rule action ...` messages in order, grouped by sequence.
4. Within each sequence, find the first `Rule action matched, adding events and skipping remaining rules` or `Rule action failed` line — that's where that sequence stopped. Any rules after that point in the same sequence never ran, by design. The engine then moves on and still runs the other sequences in full.
5. If the user expects a later rule to have fired, first check whether it's in a *different* sequence than the one that stopped — different sequences always run regardless of what happened in another sequence. If it's in the *same* sequence, check whether an earlier rule in that sequence qualified (even with a no-op behavior) — that's almost always the answer, not a bug.
6. For charge payments (which always run every rule in the sequence), instead check whether an earlier rule already consumed the data (e.g. a reason code) that the rule in question depends on.
7. For behavior-specific configuration questions, check `references/rule-technical-descriptions.md` for exact field names and qualification logic, or `references/rules-user-descriptions.md` for the plain-language explanation.

### Root-causing a specific production issue report (ticket/support-case workflow)

The steps above establish the general mental model. When the task is a real ticket — "why didn't rule X fire on claim/charge Y" or "why did rule X produce this result on Y" — go straight to `references/rule-behaviors-issue-analysis.md` and work it as a checklist, not from memory:

1. Identify the behavior involved (Part 2 for claim-level, Part 3 for charge-level in that file) and pull its **fire conditions** list.
2. Walk the conditions in order against the payment's actual data (pull the rule's stored JSON config via `snowdrop-api-calls`, and the payment's field values via `cosmos-query`) — the first condition that fails against this specific payment is the root cause. Don't stop at "the rule looks configured correctly"; every condition must be checked against this payment's actual values, not just the rule's setup.
3. Cross-check the corresponding **"Gotchas for issue analysis"** list for that behavior before concluding — several of the most common misdiagnoses are documented there (e.g. `DisputeUnderpayment`'s hardcoded primary-payer-only check silently overriding the rule's own qualification config; a zero-event `ActionMatched` fire on `SuppressAdjudicationCode`/`ReassignAsAdjustment`/`ReassignAsTransfer` being indistinguishable in Splunk from "nothing matched"; the two-level prefix filter on `DiscardClaimPayment`).
4. If the payment's data satisfies every fire condition and the rule still didn't produce the expected effect (or produced it but it never took effect downstream), that is *not* a business-logic explanation — stop and check `../../known-failures/CLAUDE.md` before concluding this is a config/rule question. Its known signatures (event-batch checkpoint drops, no-op reposts) cover exactly this "rule fired correctly but the result never landed" shape.
5. Write the conclusion in terms of the specific failing condition and the payment's actual values, not a general restatement of how the behavior works.
