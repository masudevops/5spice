# Spec 1: Murphy go-live safety checklist

**Status:** Later — the rule only bites at the next real production deploy.
Nothing here blocks ongoing local build/dev work right now (owner confirmed
2026-10-07: the site isn't live-deployed yet, so building with Murphy as
`coming-soon` is fine in the meantime).
**Type:** Correctness / risk fix, not a new feature
**Depends on:** nothing

## Why

CLAUDE.md §1 states a hard rule:

> 5Spice Kitchen Murphy must stay `hidden` (not publicly visible, not in nav,
> sitemap, or structured data) until the owners confirm that written landlord
> approval for the name change has been received. Build for it, but never
> flip it live on your own.

The rule is about what's publicly reachable on 5spicemarket.com, not about
local builds or an un-deployed repo state. Since nothing has been pushed
live yet, `murphy.js` staying at `status: 'coming-soon'` and `client/.env`
staying at `VITE_APP_SITE_MODE=live` are both fine for continued local
build/dev — there's no public surface yet for Murphy to leak onto.

What this spec is actually guarding against is the moment that changes: the
first time this repo is deployed to a real, public host (Vercel today,
Azure Static Web Apps per Spec 3 later). At that point the same repo state
would make Murphy publicly visible, nav-linked, sitemapped, and in
structured data — which is exactly what CLAUDE.md prohibits absent written
landlord approval. `client/src/data/README.md` already documents a "Before
deploying to production" checklist for this, but it's manual and easy to
forget in the moment of actually shipping.

## Goal

Make it structurally difficult to accidentally publish Murphy *at the point
of a real deploy*, while keeping the existing single-source-of-truth data
model (`src/data/locations/`), not adding a backend or new dependency, and
not getting in the way of ongoing local work before then.

## Scope

1. **Before the first real production deploy (not now):** confirm with the
   owner whether written landlord approval has been received.
   - If **not received**: set `murphy.js` `status` to `'hidden'` before
     that deploy, and don't ship `client/.env` with `VITE_APP_SITE_MODE=live`
     while Murphy is anything but `hidden`.
   - If **received**: keep `status: 'coming-soon'`, and note the approval
     (date, who confirmed) in this spec's changelog section below so there's
     a record of why it was safe to ship.
2. **Deploy-time guard, not a dev-build guard.** Add a check (e.g. a small
   script run from `prebuild`, alongside the existing
   `scripts/generate-sitemap.js`) that warns — or fails, if run in a CI/deploy
   context specifically — when a location is visible without a recorded
   approval. Simplest implementation: a single `approvedForLaunch: false`
   field on `murphy.js` that the script checks. Keep it a warning for plain
   local `npm run build` so day-to-day work isn't blocked; only treat it as
   hard-fail in whatever script actually ships to Vercel/Azure.
3. **Sitemap/JSON-LD spot check.** Confirm `scripts/generate-sitemap.js` and
   any JSON-LD generation already exclude non-visible locations (per
   `getVisibleLocations()` in `locations/index.js`) — this should already be
   true, just verify with a build and inspect `client/dist/sitemap.xml`.

## Non-goals

- No admin UI or approval workflow — this is a single boolean plus a
  pre-deploy check, consistent with CLAUDE.md's "low effort to maintain"
  requirement elsewhere in the site.
- Not re-deciding the Murphy rule itself — it's fixed by CLAUDE.md. Only the
  *timing* of when it's enforced (deploy, not every local build) is this
  spec's call.

## Acceptance criteria

- [ ] Before the first production deploy: owner has explicitly confirmed
      (in writing, e.g. Slack/email) whether landlord approval was
      received, and that's recorded in this file's changelog.
- [ ] `murphy.js` `status` and `client/.env` `VITE_APP_SITE_MODE` are
      consistent with that answer before *that* deploy — not required to
      change anything right now.
- [ ] A deploy-time check exists that catches Murphy being visible without
      recorded approval, without blocking routine local builds.
- [ ] At deploy time, build output (`client/dist/sitemap.xml` and rendered
      nav) reflects the correct visibility.

## Changelog

- 2026-10-07: Spec written.
- 2026-10-07: Owner confirmed the site isn't live-deployed yet and it's
  fine to keep building with Murphy as `coming-soon` in the meantime. Rule
  re-scoped to apply at the next real production deploy, not to current
  local state. Landlord approval status still unconfirmed — must be
  resolved before that deploy.
