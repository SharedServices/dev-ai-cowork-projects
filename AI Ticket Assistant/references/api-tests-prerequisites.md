# API test prerequisites

What must be in place before the automated API tests are run from a local machine. "API tests" here are the tests in a repo's `src/api-tests` project (for example `snowdrop-remittance-processing-be`), which call services that are already deployed to an environment.

## VPN

**A VPN must be connected to run the API tests locally.** Confirm it is connected before starting a run.

**Why:** the tests call deployed services, and those are not reachable from a local machine without the VPN. Without it, a run fails on connection or on collection setup (the shared fixture creates its rules and data first), and that failure looks the same as a rule-setup problem. Rule-setup errors in a collection fixture also fail every test in that collection, so a missing VPN is easy to misread.

**How to apply:**
- Before running API tests, ask the user to confirm the VPN is connected.
- When a run fails at setup or with a connection error, check the VPN before diagnosing the tests.
- Only the local run is confirmed to need the VPN. Which environments need it has not been checked, so do not assume it applies to or is waived for a particular environment.

## Other prerequisites

The deployed build under test must contain the change being tested. The runsettings file, the filter syntax and the collection-fixture behaviour are documented in the repo's own `src/api-tests/CLAUDE.md`, not here.
