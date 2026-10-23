# Plan: Restructure the auto-post ArePosting append lost known failure

Status: proposed, not built. Maintenance-only document; not read during normal investigative use.

Subject: `repos/snowdrop-remittance-processing-be/known-failures/auto-post-arePosting-append-lost-leaves-claim-payment-initialized/CLAUDE.md` (the pattern file). The scheduler calls this pattern `KF-AUTOPOST-INIT`.

This is the pilot for build step 2 of `documents/known-failure-detection-plan.md`. It does not change the schedule or any skill.

## Inputs reviewed

- `documents/known-failure-detection-plan.md`: required sections (Signature, Detection, Verification with `scheduler-safe` / `interactive-only` marks, Analysis), single-source rule, Cosmos and API constraints.
- The pattern file as it stands: sections What happens, Detection signature, Consequence variants, Confirmed occurrences, Fix status. The Detection signature section mixes detection, verification and tell-apart guidance in one bullet list.
- The `known-failure-detection-daily` task prompt (`C:\Users\JamesMoorhouse\.claude\scheduled-tasks\known-failure-detection-daily\SKILL.md`): holds the only SPL for this pattern, the pattern id, Jira, namespace and the dedup assumption.
- `templates/known-failure-pattern-template/CLAUDE.md`: current skeleton, which lacks the new sections.

## Findings

1. The scheduler's SPL is not in the pattern file. The pattern file describes the signals in prose only. The scheduler detects one signal: the Timers Error "The claim payment action expired and is being removed" with `PriorState=Initialized`. Moving this SPL into the pattern file is the core change.
2. The pattern id (`KF-AUTOPOST-INIT`), Jira (UF-17129) and Splunk namespace (`snowdrop-remittanceprocessing`) exist only in the schedule prompt and the Status page. The pattern file and the parent `known-failures/CLAUDE.md` index have none of them. "analyze known failure KF-AUTOPOST-INIT" cannot be resolved to a folder from project files today.
3. The scheduler SPL groups by `env` and organization id and keeps only a sample line. It does not return the TransactionId or remittance id. Every verification step needs the TransactionId, so verification currently cannot start from the detection output.
4. The hit is the late signal. The expiry fires about 4h21m after the auto-post, so the evidence for verification is earlier than the hit. Verification searches must start at least 5 hours before the hit time. The 24-hour detection window does not cover this.
5. Expiry of an `Initialized` row can have causes other than the lost append (for example an exception in the activity). The scheduler therefore reports false hits. The "no Warning or Error names it" criterion in the current signature distinguishes them and can be checked in Splunk.
6. A ticket session may arrive before the expiry (a user reports an unposted claim payment within 4 hours) or after Splunk retention. The expiry-based Detection does not find the first case.
7. The scheduler's QA-org exclusion is part of its prompt. If it is written into the pattern's SPL, ticket sessions on QA orgs (ninja, team) would exclude the evidence. The exclusion belongs to the scheduler, not to the pattern.
8. No dedup key is defined. The scheduler currently treats every row as new. This is acceptable with non-overlapping 24-hour windows, but the pattern should name its occurrence key.

## Target structure of the pattern file

Keep the opening title line (the parent index pulls its description). Sections, in order:

### Header block (new, short)

- Pattern id: `KF-AUTOPOST-INIT`
- Jira: UF-17129
- Splunk namespace: `snowdrop-remittanceprocessing`
- Occurrence key: TransactionId of the claim payment action (one expired `Initialized` row is one occurrence). Fallback if TransactionId is absent: remittance id plus claim payment id.

These values match the Status page columns, so the skill can build the row from the pattern file.

### Signature

What the failure is, in plain terms. Source: the first paragraph of the current "What happens" (reviews queue single-claim requests, delayed processing releases them together, `InitiatePosting` commits `Initialized`, the append is lost, the row expires). Include the tell-apart sentence versus the event-batch checkpoint skip. Keep the suspected-mechanism paragraph out of here; it moves to Analysis.

### Detection

Safe to run unattended. One parameterised SPL, used by the scheduler and by ticket sessions.

Parameters: `{index}` (default `sharp-app-aks-*-king`; `exch` is the exchange environment's index suffix), `{organizationId}` (optional), `earliest`, `latest`.

Draft SPL (the scheduler's current search, with these changes: no QA exclusion, optional organization filter, per-TransactionId rows, `PriorState` match unchanged):

```spl
index="{index}" namespace="snowdrop-remittanceprocessing"
    "The claim payment action expired and is being removed"
| search "PriorState=Initialized" OR Properties.PriorState="Initialized"
| eval env=replace(index, "^sharp-app-aks-(.+)-king$", "\1")
| fillnull value="(none)" Properties.OrganizationId Properties.TransactionId
| search Properties.OrganizationId="{organizationId or *}"
| table _time env Properties.OrganizationId Properties.TransactionId _raw
| sort - _time
```

Before this goes into the file, the property names (`Properties.OrganizationId`, `Properties.TransactionId`, any remittance id field) and the `namespace` value must be confirmed with one real search on the Timers log line. Use UF-17116 (uno, 2026-10) if still within retention; otherwise use any current hit from the Status page history.

Notes to write beside the SPL:

- The scheduler adds `NOT Properties.OrganizationId="00000000-0000-*"` and its own grouping. A ticket session uses the ticket's organization and time range, and does not exclude QA organizations.
- Detection returns the expiry, which is about 4h21m after the auto-post.
- Ticket variant for a report before the expiry (interactive-only, listed under Verification): search the claim payment's TransactionId or remittance id for `PostingFlowOrchestrator` state `Initialized` with no later `Working`.

### Verification

Each step is marked. Steps use the TransactionId and remittance id from the Detection row. Time scope for Splunk steps: from 5 hours before the expiry time to the expiry time.

| # | Step | Mark | Pass criterion |
|---|---|---|---|
| V1 | Splunk: lines for the TransactionId show "Trigger AutoPosting for remittance" and `PostingFlowOrchestrator` state added (`Initialized`). | scheduler-safe | Both present. |
| V2 | Splunk: no `Working` state change for the TransactionId between V1 and the expiry. | scheduler-safe | No `Initialized` -> `Working` line. |
| V3 | Splunk: no Warning or Error names the TransactionId before the expiry line. | scheduler-safe | None found. A hit here points to a different cause; report as "not confirmed". |
| V4 | Splunk: the Timers line is followed by state `Deleted` for the TransactionId. | scheduler-safe | Present. |
| V5 | Splunk: sibling claim payments of the same remittance changed `Initialized` -> `Working` within a few seconds of V1 (needs remittance id from the V1 line). | scheduler-safe | At least one sibling. Absence is not disqualifying (a single-claim case is possible); record as "no siblings". |
| V6 | Splunk (`RemittanceValidationMediator`): queued requests with `Claims = 1` seconds apart, then no `Begin EvaluateClaimPaymentActivity` until a burst within about 100 ms. | interactive-only | Burst found. Multi-query and requires judgment on the gap. |
| V7 | Cosmos (`cosmos-query`, remittance-processing stream): no `RemittanceClaimPaymentsArePosting` lists the claim payment; no posted, discarded, removed or `RemittanceClaimPaymentsHaveFailedPosting` event for it; siblings' ArePosting events are within a few hundred ms. | scheduler-safe | Read-only query by StreamId (organization id and remittance id from the Detection row), projecting only needed fields. Verified from a scheduled task on uno only (`cosmos-uno-smoke-test`, 2026-10-13, PASS); every other environment is unverified, so a Cosmos access failure on any other environment is reported as "unverified", not as an error in the pattern. |
| V8 | Claim payment was reviewed and is eligible (linked claim and charge, not disputed, not excluded). | interactive-only | Needs reading the events. |
| V9 | Check status is `Posting` with other claim payments posted; system-user `RemittanceStatusChanged` Posting events near the timer time carry no claim payment activity. | interactive-only | Cosmos or projection read. |
| V10 | Function host and Application Insights around the burst show a host start or scale-out. | interactive-only | Needs Azure access and judgment. |
| V11 | Orchestration `isevaluating` false and `state` 404 at remittance and claim payment level. | interactive-only | Function keys are not stored in this project. Calls from an unattended routine (Function/Orchestration and the Snowdrop API) are expected to work but are unverified. They stay interactive-only for security reasons even if verified; changing this needs an explicit decision. |

Scheduler reporting from V1-V5 and V7: "confirmed" (V1, V2, V3, V4 pass and, where Cosmos access is verified, V7 passes), "not confirmed" (any of V1-V4 fails or V3 finds a Warning/Error), or "unverified" (a search could not be run). The skill defines how these appear in Slack and on the Status page; the pattern file defines only the criteria.

### Analysis

For use in a session. Receives, unchanged in meaning: the suspected mechanism paragraph, "Consequence variants", "Confirmed occurrences", "Fix status" including candidate fixes and the still-to-do list.

Two additions:

- Still-to-do item reworded: a read-only bulk check for `Initialized` rows without a matching ArePosting event. Record that the action table's storage is not described in this file, so it cannot yet be written as Detection.
- Add the date and environment of any new occurrence found by the scheduler to Confirmed occurrences when the user confirms it.

## Content mapping from the current file

| Current content | New location |
|---|---|
| Title line | Unchanged |
| What happens, paragraph 1 | Signature |
| What happens, paragraph 2 (suspected mechanism, retry limit, `HandleLateInitialized` TODO) | Analysis |
| Detection signature: Cosmos bullet | V7, V8 |
| Detection signature: Splunk message-sequence bullet | V1, V2, V3 |
| Detection signature: expiry about 4h21m bullet | Detection (SPL and note), V4 |
| Detection signature: check status bullet | V9 |
| Detection signature: request timing bullet | V6, V10 |
| Detection signature: `isevaluating` / `state` bullet | V11 |
| Tell-apart paragraph (versus event-batch checkpoint skip) | Signature |
| Consequence variants, Confirmed occurrences, Fix status | Analysis |
| Scheduler SPL (in task prompt only) | Detection |
| Pattern id, Jira, namespace (in task prompt and Status page only) | Header block |

No existing statement is dropped.

## Ticket diagnosis continuity

- A ticket session reads the whole file. Section order matches the diagnosis order: Signature, Detection with the ticket's organization and time range, Verification (scheduler-safe steps first, then interactive-only), Analysis.
- The Detection SPL has no QA exclusion and takes an organization id, so it works for a ticket on any environment including ninja and team.
- For a report before the expiry, the pre-expiry variant note in Detection plus V1 and V2 find the claim payment by TransactionId or remittance id without waiting for the timer.
- The existing request "analyze known failure {pattern id} for org {id} in {env}" resolves the id through the header block and the parent index (see next section).
- No step is deleted. Steps that were prose become numbered, so a ticket session can cite them in `summary.md`.

## Related edits outside the pattern file

Each is a separate, small edit made only after approval.

1. Parent index `repos/snowdrop-remittance-processing-be/known-failures/CLAUDE.md`: add the pattern id to the bullet for this folder (for example `KF-AUTOPOST-INIT`). The file is marked system-generated, so confirm that the generator keeps a second field before editing by hand.
2. `templates/known-failure-pattern-template/CLAUDE.md`: add the header block, Detection, Verification table and Analysis sections (detection plan step 2). This plan's structure is the proposed shape.
3. The scheduler prompt and the `known-failure-detection` skill are not changed by this plan. After the pattern file is restructured, a later step (detection plan step 4 and 7) removes the SPL from the prompt.

## Build steps

1. Run the draft SPL once in Splunk (Chrome flow) against a known occurrence and confirm field names, namespace and that V1-V4 searches return the expected lines. Adjust the SPL and V1-V5 wording to match.
2. Restructure the pattern file per the target structure and mapping table.
3. Update the template (Related edits 2).
4. Update the parent index (Related edits 1) if the generator allows.
5. Dry run, no schedule change: in a new session, say "analyze known failure KF-AUTOPOST-INIT for org {uno org of UF-17116} in uno" and confirm the session reaches Detection, V1-V5 and Analysis from the file alone.
6. Compare the Detection SPL output with the schedule prompt's output for the same window. Differences should be only the added per-TransactionId rows and the missing QA exclusion.

## Risks

- The field names in the draft SPL are not verified. Build step 1 is required before anything is committed.
- Splunk retention may no longer hold the UF-17116 evidence. Then V1-V5 are verified against a newer occurrence or marked unverified in the file.
- V7 is scheduler-safe, but Cosmos access from a scheduled task is verified on uno only. On environments not yet verified, V7 can fail with an access error; the scheduler records that as "unverified". Verify each environment with the same smoke test before relying on V7 there.
- Splunk is reached through Claude in Chrome. API and Function (Orchestration) calls from a routine are expected to work but are unverified, and are kept interactive-only for security reasons.
- Hand-editing the system-generated parent index may be overwritten.

## Open decisions for the maintainer

1. Where the pattern id lives: header block in each pattern file (proposed) or only in the parent index.
2. Whether the occurrence key is TransactionId (proposed) or remittance id plus claim payment id.
3. Whether V5 (siblings) should be a pass criterion or informational (proposed: informational).
4. Whether to add a Detection variant for the case before the expiry now, or leave it as a verification note (proposed: note only).
