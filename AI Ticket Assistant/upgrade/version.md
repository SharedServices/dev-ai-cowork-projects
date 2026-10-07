# Project version

Current version: 2026-10-07

The single version of this project for `upgrade project`. Each platform records the version it last upgraded to in `local/user.md` (`Upgrade version (Cowork)`, `Upgrade version (Code)`), and is behind when that version is blank or older than the version above. The maintainer sets the version when publishing a release; Claude writes it here when told. Do not change it otherwise.

## Format

`YYYY-MM-DD` for the first release of a day, `YYYY-MM-DD-N` for a later one (`2026-10-07-2`, `2026-10-07-3`). The date is zero-padded.

## Comparing versions

Compare the date first, then the number after it. A version with no number counts as 1. So `2026-10-07` < `2026-10-07-2` < `2026-10-07-10` < `2026-10-08`. Do not compare as plain text.

## A release with no new instructions

A version can be published with no entry in either platform's document. Upgrading to it only updates the platform's version in `local/user.md`.
