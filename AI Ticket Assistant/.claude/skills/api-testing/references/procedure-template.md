# Procedure template

Copy this to `API Tests/{kebab-case-name}.md` and fill it in. Delete the guidance in square brackets.

---

# Procedure: {short title of the scenario}

| | |
|---|---|
| Original ticket | {key, link, ticket folder path, and the related QA ticket if there is one} |
| Fix or change under test | {branch, commit ids, build or environment where it is deployed} |
| Status | {draft, run once, standardized} |
| Environments run in | {environment and organization, with the date of the run} |
| Environments allowed | Non-production only. See the `api-testing` skill. |
| Related skills | `api-testing`, {others, for example `era-builder`, `splunk-search`, `ticket-workflow`} |
| Last updated | {date} |

How facts are marked: **confirmed** (observed in a run in Appendix A), **from code** (read in the source, not run), **inferred** (a conclusion drawn from those).

## 1. Purpose
[What the test shows, and what it does not show. List each test and what it proves.]

## 2. Scenario-specific safety
[Only what is specific to this scenario: operations that cannot be undone, data that is left behind, anything that affects other users. General rules are in the `api-testing` skill.]

## 3. Prerequisites
[Tools and sessions needed beyond the standard browser setup; data that must exist; permissions.]

## 4. Background knowledge
[Everything a Claude without source access needs: how the component works, the conditions under which each part fires, ids, enum values, request shapes, timing, known pitfalls. Mark each fact as confirmed, from code or inferred.]

## 5. API reference
[The calls the test uses: method, path, body, response fields that matter.]

## 6. Step-by-step procedure
[Numbered steps. State where approval is needed. Include the "investigate existing state" step early.]

## 7. Test definitions
[One block per test: setup, data, expected result, evidence to capture.]

## 8. Reading the results
[What counts as pass, what the evidence can and cannot show, what to say when it does not match.]

## 9. Lessons and gotchas
[Things that were not obvious and cost time.]

## 10. Not verified
[Environments, variants and behaviors that have not been tried.]

## Appendix A. Sample data
[Ids, request bodies, uploaded files and results from a real run, with the date. Add each later run as a new dated block; do not rewrite earlier ones.]

## Appendix B. Scenario-specific snippets
[Code or scripts used only by this scenario. Generic browser snippets are in the `api-testing` skill's `references/browser-api-mechanics.md`.]
