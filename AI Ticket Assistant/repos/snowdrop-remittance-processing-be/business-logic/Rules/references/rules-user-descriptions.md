# Rules — User Guide

This guide explains the rules available in remittance processing, who they're for, and how to configure them. It's written for people setting up automation rules — not for developers.

## What is a rule?

A rule is an automated decision you set up in advance. When a payment comes in from a payer (insurance company, patient, etc.), the system runs each rule against it and lets the rule make a decision: post the payment, transfer it to the guarantor, dispute it with the payer, discard it, and so on. Rules let you turn repetitive manual work — "every time I see this, I do that" — into automation.

Each rule has three parts:

1. **What level it works on.** Some rules look at the whole claim payment (everything the payer sent for one claim). Others look at individual charges within a claim.
2. **What it does.** This is called the **behavior** — for example, *Dispute Denial*, *Suppress Adjudication Code*, *Discard Claim Payment*.
3. **When it should run.** This is the **qualification** — for example, "only on the primary payer," "only for invoice numbers starting with ABC," "only when the paid amount is zero." You can also restrict rules to reconciliation/reprocessing flows so they don't run on first-time receipts.

When you turn a rule on, it runs automatically the moment a matching payment is received.

## Common qualification options

Most rules share these qualifier choices:

- **Which payers.** Apply to all payers, or only to specific positions (primary, secondary, etc.).
- **Invoice number prefix.** Apply only to invoices that start with a given prefix, or *exclude* invoices that match the prefix.
- **Only on reconciliation or reprocessing.** Many rules accept this flag so they don't fire on the very first pass.

These are set per-rule and combine with the behavior-specific filters described below.

---

## Rules that work on individual charges

These rules look at a single charge inside a claim payment. Use them when your decision depends on the charge's amounts, reason codes, payer position, or transfer/adjustment details.

### Suppress Adjudication Code

**What it does.** Removes specific adjustment or transfer reason codes from a charge so they don't appear downstream.

**When to use it.** A payer keeps sending a reason code that you don't want to act on — maybe it's noise, maybe it's a duplicate of something already on the charge, maybe it shouldn't apply once a previous payment has been received.

**You configure:**
- **The reason codes to suppress.**
- **Only when a previous payment was received** — skip suppression on first-pass claims with no payment history.
- **Only if it's a reversal of a previous entry.**
- **Only on reconciliation or reprocessing.**

### Reassign As Adjustment

**What it does.** Takes one or more incoming reason codes and replaces them with a different adjustment reason of your choosing.

**When to use it.** The payer's code is technically correct but you want to track it under your own categorization, or you want to roll several payer codes up to a single adjustment reason.

**You configure:**
- **The category of codes to match** (adjustment or transfer).
- **The incoming reason codes to match.**
- **The replacement adjustment reason.**
- **Only on reconciliation or reprocessing.**

### Reassign As Transfer

**What it does.** Same as *Reassign As Adjustment*, but converts matched codes into a **transfer** rather than an adjustment. The charge ends up with a transfer entry instead of an adjustment.

**When to use it.** The payer marked something as an adjustment, but in your workflow it should move responsibility to another payer or guarantor instead of writing the amount off.

**You configure:** same fields as *Reassign As Adjustment*.

### Transfer To Guarantor

**What it does.** Marks the charge for transfer to the patient/guarantor.

**When to use it.** The payer has finished with this charge and the remaining balance is the patient's responsibility. Skips automatically when the charge already has a transfer pointing at the guarantor or patient account, so the rule is safe to leave on broadly.

**You configure:**
- **Only on reconciliation or reprocessing.**

### Adjust To Zero

**What it does.** Generates an adjustment to bring the charge's balance to zero.

**When to use it.** You have a charge that's never going to be paid further and you want the system to close it out cleanly — for example, leftover small balances after primary and secondary processing, or denials you've decided to write off.

**You configure:**
- **The adjustment reason** to record on the zero-out.
- **Replace existing adjustments** — overwrite anything already there instead of stacking.
- **Only apply when the paid amount is zero** — restrict to fully unpaid charges.
- **Only on reconciliation or reprocessing.**

### Dispute Denial

**What it does.** Flags the charge as a disputed denial.

**When to use it.** A payer denied a charge you believe should have been paid. The rule fires when the charge appears on an EOB, the paid amount is zero, the expected amount is non-zero, and there's no offsetting account balance.

**You configure:**
- Just the qualifier (payer position, invoice prefix, etc.). The behavior itself has no extra settings — it's the qualification that decides which denials you want to dispute.

### Dispute Underpayment

**What it does.** Flags the charge as a disputed underpayment when what the payer paid is less than what was expected. Optionally also flags overpayments.

**When to use it.** The payer is paying less (or sometimes more) than the contract calls for and you want exceptions flagged for review. This rule runs against the primary payer only.

**You configure:**
- **Underpayment percentage threshold** — e.g., dispute when paid is less than 95% of expected.
- **Underpayment amount threshold** — e.g., dispute when underpaid by more than $25.
- **Combine the two with AND or OR.**
- **Compare against allowed amount instead of expected.**
- **Also dispute overpayments** — with symmetric percent threshold, amount threshold, AND/OR, and allowed-vs-expected choices.

### Dispute Transfer

**What it does.** Flags the charge as a disputed transfer when the total amount transferred is at or above a threshold.

**When to use it.** Catch unexpectedly large transfers that you want a human to look at instead of letting them pass through silently.

**You configure:**
- **Amount threshold** — minimum transfer total that triggers the dispute.

### Transition Episode

**What it does.** Moves the charge into a specific episode type and phase.

**When to use it.** You're modeling care episodes (e.g., bundled-payment workflows) and a particular charge marks the transition into a new phase of that episode.

**You configure:**
- **Episode type** to transition into.
- **Phase** within the episode.

---

## Rules that work on the whole claim payment

These rules look at the claim payment as a single unit. Use them when the decision is about whether the whole claim should be posted, discarded, etc.

### Discard Claim Payment

**What it does.** Discards the claim payment so it doesn't get posted.

**When to use it.** You don't want to process claim payments matching certain criteria — perhaps test data, claims from a discontinued payer, or a specific invoice-number prefix tied to claims you handle out-of-band. Won't re-discard a claim that's already discarded.

**You configure:**
- **Invoice number prefix** to match.
- **Exclude claims with matching prefix** — invert the match (discard everything *except* the matching prefix).
- **Start date of service / end date of service** — only discard claims with a DOS in this window.

### Automatically Post Remittance

**What it does.** Posts the claim payment automatically when it looks clean.

**When to use it.** You want hands-off posting for claim payments that don't have problems, while still catching exceptions for human review. By default, anything with an exception is held back.

**You configure:**
- **Allow partial posting** — let claim payments through even if they have exceptions, as long as those exceptions are in your allowed list.
- **Excluded exceptions** — the list of exception types that don't block posting when partial posting is enabled.

---

## How rules are organized

The system groups related behaviors into **sequences** that run together when a claim payment is evaluated. You don't need to manage the sequences directly — they're predefined — but the grouping is useful to understand because rules within the same sequence run in a known order.

| Sequence | Behaviors in the group |
|----------|------------------------|
| Adjudication Code Suppression | Suppress Adjudication Code |
| Adjudication Code Reassignment | Reassign As Adjustment, Reassign As Transfer, Transfer To Guarantor, Adjust To Zero |
| Denial Intervention | Dispute Denial |
| Underpayment Intervention | Dispute Underpayment |
| Transfer Intervention | Dispute Transfer |
| Transition Episode | Transition Episode |
| Discard Claim Payment | Discard Claim Payment |
| Post Claim Payment | Automatically Post Remittance |

## A few practical tips

- **Test on reprocessing first.** Turn on *Only on reconciliation or reprocessing* before flipping a rule on for live receipts. You can validate the behavior on a known set of claims before it affects new ones.
- **Be specific with qualifiers.** Rules with no qualifier restrictions run against everything. Start narrow — a specific payer position, a specific invoice prefix — and broaden once you're confident.
- **Combine rules thoughtfully.** Multiple rules can affect the same charge. For example, *Suppress Adjudication Code* removes a reason code before later rules see it, which can prevent a *Reassign* or *Dispute* rule from firing on that code. If a rule isn't firing when you expect it to, check whether an earlier rule in the same sequence is removing the data it needs.
- **Review periodically.** Disputes and discards can accumulate quickly. Build a habit of reviewing what each rule produced in the prior week and adjust thresholds or qualifiers as your payer mix changes.
