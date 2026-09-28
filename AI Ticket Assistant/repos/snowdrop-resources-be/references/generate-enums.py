#!/usr/bin/env python3
"""
generate-enums.py (v2 -- multi-format)

Generates an EventEnums.md reference file from a repo's Events.md by extracting whichever
enum documentation format that repo's Events.md actually uses. Three formats are confirmed
across the seven Herbert repos that have an Events.md (2026-09-24 survey):

  Format 1 -- grouped, comma-list style: a single "### Enums" heading (nested under
    "## Model Types") followed by "#### `Name`" blocks, each with a free-text/table body.
    Confirmed on: snowdrop-remittance-processing-be, snowdrop-payers-api-be,
    snowdrop-remittance-be, snowdrop-resources-be.

  Format 2 -- scattered inline style: enums are individual "### `Name` _(enum)_" headings
    mixed in among non-enum types under "## Model Types" (no dedicated Enums heading at all).
    Confirmed on: snowdrop-guarantors-be.

  Format 3 -- grouped table style: a dedicated top-level "## Enums" heading (a sibling of
    "## Model Types", not nested inside it) containing only "### `Name`" sub-headings, each
    with its own markdown table. Confirmed on: snowdrop-patients-api-be.

A repo's Events.md may also have ZERO enums (confirmed: snowdrop-charge-master-be) -- that's
not an error, just nothing to generate; main() exits cleanly without writing a file.

Events.md is published as a single physical line for every repo checked so far, so all parsing
works on markdown markers ("#### `", "### `", "## ", "---") rather than on line breaks -- it
will keep working if a future publish re-wraps a file with real line breaks too, since the same
markers are still present either way.

This is a GENERATOR, not a hand-maintained reference file. Never hand-edit the output --
regenerate it from Events.md instead, the same way references/ files are refreshed elsewhere
in this project (root CLAUDE.md's "References folders" convention: publish-only, refresh by
re-mirroring the source of truth).

Usage:
    python3 generate-enums.py <path-to-Events.md> <path-to-output-EventEnums.md>
    python3 generate-enums.py <path-to-Events.md> <path-to-output-EventEnums.md> --format 1|2|3

The --format override exists for the rare case auto-detection picks the wrong format (e.g. a
file that happens to contain both a "### Enums" heading AND stray "_(enum)_" tags) -- auto
detection checks for Format 1 first, then Format 3, then Format 2, and prints which one it
picked, so a wrong guess is visible immediately in the script's own output, not just silently
wrong.
"""
import re
import sys
from datetime import date


TRUE_H2 = re.compile(r"(?<!#)##(?!#)\s")  # a real level-2 heading, not '###' or '####'


def find_next_true_h2(text: str, start: int) -> int:
    m = TRUE_H2.search(text, start)
    return m.start() if m else len(text)


# ---------- Format 1: grouped "### Enums", comma-list/table bodies under "#### `Name`" ----------

def extract_format1(text: str):
    start_marker = "### Enums"
    start = text.find(start_marker)
    if start == -1:
        return None
    start += len(start_marker)
    rest = text[start:]
    end_match = re.search(r"---###\s", rest)
    if end_match:
        section = rest[: end_match.start()]
    else:
        next_heading = re.search(r"###\s", rest)
        section = rest[: next_heading.start()] if next_heading else rest
    section = section.strip()

    parts = re.split(r"####\s*`", section)
    blocks = []
    for part in parts[1:]:
        name_match = re.match(r"([^`]+)`", part)
        if not name_match:
            continue
        name = name_match.group(1).strip()
        remainder = part[name_match.end():]
        qualifier = ""
        qual_match = re.match(r"\s*(\([^()]*(?:\([^()]*\)[^()]*)*\))", remainder)
        if qual_match:
            qualifier = qual_match.group(1).strip()
            remainder = remainder[qual_match.end():]
        body = remainder.strip().rstrip("-").strip()
        blocks.append((name, qualifier, body))
    return blocks


# ---------- Format 3: dedicated "## Enums" heading, "### `Name`" sub-headings, table bodies ----------

def extract_format3(text: str):
    start = text.find("## Enums")
    if start == -1:
        return None
    section_start = start + len("## Enums")
    section_end = find_next_true_h2(text, section_start)
    section = text[section_start:section_end].strip()

    blocks = []
    for m in re.finditer(r"###\s*`([^`]+)`(.*?)(?=###\s*`|\Z)", section, re.DOTALL):
        name = m.group(1).strip()
        remainder = m.group(2).strip()
        # A handful of format-3 entries carry a leading italic qualifier, e.g.
        # "_(serialised as string)_| Value | Description |..." -- split it out the same way
        # format 1 splits its bare-parenthesis qualifier, so it doesn't run straight into the
        # table with no separating newline.
        qualifier = ""
        qual_match = re.match(r"(_\([^)]*\)_)\s*", remainder)
        if qual_match:
            qualifier = qual_match.group(1).strip()
            remainder = remainder[qual_match.end():]
        body = remainder.strip().rstrip("-").strip()
        blocks.append((name, qualifier, body))
    return blocks if blocks else None


# ---------- Format 2: "### `Name` _(enum)_" headings scattered under "## Model Types" ----------

def extract_format2(text: str):
    start = text.find("## Model Types")
    if start == -1:
        # Enums could in principle be scattered under a different heading name; fall back to
        # scanning the whole document rather than assuming "## Model Types" is always present.
        start = 0
        section_end = len(text)
    else:
        section_start = start + len("## Model Types")
        section_end = find_next_true_h2(text, section_start)
        start = section_start
    section = text[start:section_end]

    blocks = []
    for m in re.finditer(r"###\s*`([^`]+)`\s*_\(enum\)_(.*?)(?=###\s*`|\Z)", section, re.DOTALL):
        name = m.group(1).strip()
        body = m.group(2).strip().rstrip("-").strip()
        blocks.append((name, "", body))
    return blocks if blocks else None


FORMAT_EXTRACTORS = {1: extract_format1, 2: extract_format2, 3: extract_format3}
DETECTION_ORDER = [1, 3, 2]  # most-specific/least-ambiguous marker first


def extract_blocks(text: str, forced_format=None):
    if forced_format:
        blocks = FORMAT_EXTRACTORS[forced_format](text)
        return blocks, forced_format
    for fmt in DETECTION_ORDER:
        blocks = FORMAT_EXTRACTORS[fmt](text)
        if blocks:
            return blocks, fmt
    return None, None


def strip_dangling_links(body: str) -> str:
    """
    Enum bodies occasionally cross-reference a type documented elsewhere in Events.md (e.g.
    '[`ReservedFundsEntry`](#reservedfundsentry)'). That anchor only resolves inside the full
    Events.md, not in this enums-only file, so a link here would be silently broken. Downgrade
    to a plain code span instead of shipping a dead link.
    """
    return re.sub(r"\[`([^`]+)`\]\(#[a-z0-9]+\)", r"`\1`", body)


def fix_flattened_tables(body: str) -> str:
    """
    Events.md is published as a single physical line, so a markdown table's row breaks collapse
    into a bare '||' where one row's trailing pipe touches the next row's leading pipe (checked
    against the raw source for every repo that has table-shaped enum bodies: guarantors-api-be,
    patients-api-be, payers-api-be, resources-be, remittance-be -- confirmed no '|||' triple-pipe
    edge case exists anywhere in those files, so this split is unambiguous). Without this, the
    emitted table has every row concatenated onto one line and doesn't render as a table at all.
    Re-inserting a newline at each '||' boundary restores one row per line; harmless no-op on
    non-table bodies, which don't contain '||' at all.
    """
    return body.replace("||", "|\n|")


MISSING_PROSE_BREAK = re.compile(r"`(?=[A-Z][a-z]+ [a-z])")


def fix_missing_prose_breaks(body: str) -> str:
    """
    Same root cause as fix_flattened_tables (Events.md's single-physical-line publishing loses
    paragraph breaks), but for a closing code-span backtick running straight into the next
    sentence with no space at all -- confirmed as a one-off in snowdrop-remittance-be's
    PostingStatus body: '...`Archived = 9`An extension method `PostingStatusExtensions...'. The
    pattern (backtick immediately followed by a capitalized word then a lowercase word, with zero
    intervening whitespace) doesn't occur anywhere else across any of the six repos' enum bodies
    checked on 2026-09-24, so this is safe as a general rule rather than a per-repo special case.
    """
    return MISSING_PROSE_BREAK.sub("`\n\n", body)


def render(blocks, source_repo: str, fmt: int) -> str:
    today = date.today().isoformat()
    lines = []
    lines.append("# Event Enums -- " + source_repo)
    lines.append("")
    lines.append(
        "**Generated file -- do not hand-edit.** Produced by `generate-enums.py` from this "
        "repo's own `references/Events.md`. Regenerate by re-running the script against a "
        "refreshed `Events.md`; never patch this file directly, same convention as every other "
        "file under `references/`."
    )
    lines.append("")
    lines.append(f"Last generated: {today}. Source: `references/Events.md` (format {fmt} of 3 -- see the generator script's own docstring for what that means).")
    lines.append("")
    lines.append("## Index")
    lines.append("")
    for name, _, _ in blocks:
        anchor = re.sub(r"[^a-z0-9]+", "", name.lower())
        lines.append(f"- [`{name}`](#{anchor})")
    lines.append("")
    lines.append("---")
    lines.append("")
    for name, qualifier, body in blocks:
        lines.append(f"## `{name}`")
        lines.append("")
        if qualifier:
            lines.append(qualifier)
            lines.append("")
        lines.append(fix_missing_prose_breaks(fix_flattened_tables(strip_dangling_links(body))))
        lines.append("")
        lines.append("---")
        lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def main():
    args = sys.argv[1:]
    forced_format = None
    if "--format" in args:
        idx = args.index("--format")
        forced_format = int(args[idx + 1])
        del args[idx : idx + 2]
    if len(args) != 2:
        print("Usage: python3 generate-enums.py <path-to-Events.md> <path-to-output-EventEnums.md> [--format 1|2|3]")
        sys.exit(1)
    events_path, out_path = args

    text = open(events_path, encoding="utf-8").read()
    blocks, fmt = extract_blocks(text, forced_format)

    m = re.search(r"repos[\\/]+([^\\/]+)[\\/]+references", events_path)
    repo_name = m.group(1) if m else "unknown-repo"

    if not blocks:
        print(f"No enums found in {events_path} (checked formats 1, 3, 2 in that order). "
              f"Not an error -- some repos genuinely document none. No file written.")
        return

    output = render(blocks, repo_name, fmt)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(output)

    print(f"Format {fmt} detected. Wrote {len(blocks)} enums to {out_path}")
    for name, qualifier, _ in blocks:
        print(f"  - {name}" + (f"  {qualifier}" if qualifier else ""))


if __name__ == "__main__":
    main()
