# 5Spice feature specs

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

| # | Spec | Status | Why it's at that priority |
|---|------|--------|---------------------------|
| 1 | [Location switcher UI](./05-location-switcher-ui.md) | **Now** | Top of backlog per owner (2026-10-07) — user-friendly, on-brand way to choose between Plano/Murphy, surfaced site-wide instead of buried on `/pickup`. Built, including the Market empty-state follow-up; needs manual browser sign-off (desktop + mobile). |
| 2 | [Content ops: runtime JSON for menus & locations](./02-content-ops-runtime-json.md) | **Next** | Directly requested — menu/location edits currently require a code change + redeploy. No new dependencies, portable to Azure. |
| 3 | [Murphy go-live safety checklist](./01-murphy-go-live-safety.md) | **Later** | Hard rule in CLAUDE.md, but only bites at the first real production deploy — site isn't live-deployed yet, so building with Murphy as `coming-soon` is fine for now (owner confirmed 2026-10-07). Must be resolved before that deploy. |
| 4 | [Azure Static Web Apps migration](./03-azure-static-web-apps-migration.md) | **Later** | Planned but not scheduled yet. Worth scoping now so later decisions (e.g. spec 2's data loading) don't quietly create Azure-incompatible assumptions. |
| 5 | [Catering inquiry form + notifications](./04-catering-inquiry-form.md) | **Deferred** | Explicitly parked by the owner pending bandwidth. Spec captures the recommended low-complexity approach so it's a quick pickup later. |

## Open content questions (not blocking, but unresolved)

These came up while auditing the site for this backlog. They're content/business
decisions for the owners, not engineering decisions — flagging here instead of
guessing:

- **Plano placeholders**: phone number, real hours, lat/lng, hero photography,
  and live ordering platform URLs are all still placeholders in
  `client/src/data/locations/plano.js`. None of this blocks the specs above,
  but all of it must be filled in before Plano is fully "live" rather than
  "coming soon."
- **Murphy opening timeline**: `openingText: 'Opening Soon'` is a placeholder
  per the file's own comment. The street address itself is confirmed (per
  owner, 2026-10-07) — only the timing copy is soft.
