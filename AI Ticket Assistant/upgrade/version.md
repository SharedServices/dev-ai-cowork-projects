# Project version

Current version: 2026.10.7

The single version of this project for `upgrade project`. Each platform records the version it last upgraded to in `local/user.md` (`Upgrade version (Cowork)`, `Upgrade version (Code)`), and is behind when that version is blank or older than the version above. The maintainer sets the version when publishing a release; Claude writes it here when told. Do not change it otherwise.

## Format

`YYYY.M.D` for the first release of a day, `YYYY.M.D.N` for a later one (`2026.10.7`, `2026.10.7.2`, `2026.10.7.3`). Month and day are not zero-padded. Do not write `.1`: it equals no suffix, so the second release of a day is `.2`.

## Comparing versions

Split the version on `.` and compare the parts as whole numbers, left to right: year, month, day, then the optional number after the day. A missing number counts as 1. So `2026.10.7` < `2026.10.7.2` < `2026.10.7.10` < `2026.10.8` < `2026.11.1`. Do not compare as plain text.

## A release with no new instructions

A version can be published with no entry in either platform's document. Upgrading to it only updates the platform's version in `local/user.md`.
