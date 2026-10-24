# 5Spice feature specs

> **Day-to-day tracking now lives in [`docs/NEXT-STEPS.md`](../NEXT-STEPS.md).**
> This folder keeps the detailed specs; the table below shows where each one stands.

This folder is the spec-driven backlog for 5spicemarket.com. Each file is one
feature: why it exists, what it changes, and how to know it's done. Read
`/CLAUDE.md` first — it's the standing context (brand rules, Murphy rule,
tech stack, working agreement) every spec here must stay consistent with.

## How to use this

1. Pick the next **Now** item below.
2. Read its spec file. If anything is ambiguous, resolve it with the owners
   before writing code — don't guess at content, prices, or dates.
3. Propose the implementation plan (per CLAUDE.md §10) before editing.
4. Build it, check off its acceptance criteria, update its status here.
5. Keep this index current — it's the single place to see what's done, in
   flight, or deferred.

## Status legend

- **Now** — actively being worked, or next up.
- **Next** — scoped and ready, waiting on the current item.
- **Later** — real, but not scoped in detail yet.
- **Deferred** — intentionally parked. Has a spec so it isn't forgotten, but
  nobody should start it without re-confirming it's time.

## Backlog

Status as of 2026-10-23.

| # | Spec | Status | Notes |
|---|------|--------|-------|
| 1 | [Location switcher UI](./05-location-switcher-ui.md) | **Done** | Shipped. Murphy is the default location. |
| 2 | [Murphy go-live safety checklist](./01-murphy-go-live-safety.md) | **Done** | Owners confirmed landlord approval on 2026-10-13, and Murphy is public. |
| 3 | [Content ops: runtime JSON for menus & locations](./02-content-ops-runtime-json.md) | **Later** | Not started. Menus are hidden until final, so there's less pressure now. |
| 4 | [Azure Static Web Apps migration](./03-azure-static-web-apps-migration.md) | **Now** | Prepared on 2026-10-23 (`infra/`, workflow, routing config). Waiting on an Azure subscription, then DNS cutover. |
| 5 | [Catering inquiry form + notifications](./04-catering-inquiry-form.md) | **Deferred** | The Catering page uses a prefilled quote email instead. Owners chose no form for now. |

## Open content questions

Tracked in [`docs/NEXT-STEPS.md`](../NEXT-STEPS.md) §1 (information needed
from the owners).
