## Remittance Lifecycle

### What this covers

How long a remittance/check exists before it's effectively retired, and why that bounds the
urgency of per-remittance data-quality problems.

### The fact

Remittances have a definite lifecycle: anywhere from one week to one year, averaging under one month.

### Implications

- Per-remittance data problems (e.g. a bloated event stream) self-sunset on the remittance's own
  timescale — leaving bad historical data in place can be an acceptable interim state, since it
  ages out naturally rather than needing an active repair.
- Worst case is about a year, so "it self-sunsets" is a mitigation-*timing* argument, not a reason
  to treat a fix as low-priority indefinitely.

### How to apply

When deciding whether a data-quality defect needs a stream/data repair versus a forward-only fix,
check whether affected entities are already old enough to be near end-of-life — if so, a
forward-only fix (stop new occurrences, let existing ones age out) is usually sufficient.

**Confirmed:** UF-15648 — used to decide against any stream repair for existing bloated remittance
event streams.

### Where to look for more
- `../../../snowdrop-remittance-be/known-failures/snapshot-replay-oom-cumulative-full-list-events/CLAUDE.md` —
  the known-failure whose fix decision relied on this fact (same fact, different repo).
