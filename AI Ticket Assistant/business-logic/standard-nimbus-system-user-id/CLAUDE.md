## The "Standard Nimbus" system UserId means automated processing, not a person

**Scope:** genuinely cross-repo — platform-wide, confirmed 2026-09-21.

### What this covers

How to interpret a specific `UserId` that appears on event feeds across repos.

### The fact

`UserId` `daeb914f-1df3-470f-9637-0dae563aa034` is the Standard Nimbus system user — automated background processing, not a real person. Confirmed platform-wide, not tied to any one repo's event feeds.

### How to apply

When this UserId appears on an event (e.g. in `Metadata.SourceMetadata.UserId`), in any repo's feed, attribute the action to system/background processing rather than a human. A different GUID indicates a real user action.
