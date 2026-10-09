# Spec 3: Azure Static Web Apps migration

**Status:** Later (scoped now, not scheduled)
**Type:** Infra, not a user-facing feature
**Depends on:** nothing technically, but easier if Spec 2 (content ops) lands
first — fewer moving parts to re-verify on the new host.

## Why

CLAUDE.md §6 already flags this: "Currently deployed on Vercel (free tier).
A move to Azure App Service (low-cost tier) is being considered" and "Keep
the app portable: avoid Vercel-only services." The owner confirmed the
concrete target is **Azure Static Web Apps**, not App Service — which
matters because Static Web Apps is a much closer match to what this app
actually is (a static Vite SPA with no server-side code the deployed client
calls — `server/` is legacy and unused per CLAUDE.md §7).

Note: `/DEPLOYMENT.md` at the repo root currently describes Azure **App
Service** for a Node backend and treats `server/` as something to deploy.
That's stale relative to current CLAUDE.md guidance and should be corrected
as part of this spec, not left as two contradictory deployment docs.

## Goal

Move hosting from Vercel to Azure Static Web Apps with no behavior change
and no downtime, keeping the app portable enough that neither host is
load-bearing in the code.

## Scope

### 1. Inventory Vercel-specific pieces

- `vercel.json` — one rewrite rule (`/(.*)` → `/index.html`) for SPA
  client-side routing. Azure Static Web Apps equivalent is a
  `staticwebapp.config.json` with a `navigationFallback` rule — same idea,
  different file.
- `VITE_APP_SITE_MODE` and any other `client/.env` values — Azure Static
  Web Apps sets build-time env vars through its own GitHub Actions
  workflow config, not a Vercel dashboard. Need to re-enter these as Azure
  "Application settings" / workflow env, and confirm `.env.example` (per
  CLAUDE.md §6, every env var must be documented there) is accurate so
  nothing is missed.
- Confirm nothing else in the client uses a Vercel-only API (CLAUDE.md
  already warns against Vercel KV/Edge Config/middleware — a grep found
  none in use, so this should be a clean move).

### 2. Azure Static Web Apps setup

- Create the Static Web App resource, `App location: /client`,
  `Output location: dist` — same values already sketched in
  `/DEPLOYMENT.md`'s existing (currently backend-focused) Azure section.
- Azure Static Web Apps auto-generates a GitHub Actions workflow on
  creation — review it alongside any existing CI, don't hand-roll a
  competing deploy pipeline.
- Add `client/staticwebapp.config.json` with the SPA fallback route and
  (while we're there) the same security headers Vercel may be applying by
  default, if any are currently relied on.

### 3. Cutover (no downtime)

1. Deploy to Azure in parallel with Vercel still live, using the Azure-
   provided `*.azurestaticapps.net` URL to verify.
2. Full manual pass on the Azure URL: every route in `App.jsx`, both
   locations, nav/footer, sitemap.xml, weekly deals fetch, and (once Spec 2
   lands) the runtime JSON content loads correctly — static hosts sometimes
   differ in how they serve `/public` files or handle trailing slashes.
3. Point DNS (5spicemarket.com) at Azure once verified. Keep Vercel project
   intact and undeleted for a rollback window.
4. After a confirmed stable period, decommission the Vercel project.

### 4. Docs cleanup

- Rewrite `/DEPLOYMENT.md`'s Azure section to match this spec (Static Web
  Apps for the client, drop the App Service/backend instructions unless
  `server/` is revived for a real purpose).
- Update CLAUDE.md §6 once the move is actually done (it currently says the
  move is "being considered" — flip that to reflect reality post-migration).

## Non-goals

- Not reviving `server/` or giving it a deployment target — it's unused by
  the deployed client today, and this migration doesn't change that.
- Not choosing a CDN/custom caching strategy beyond what Azure Static Web
  Apps does by default — out of scope unless a real performance problem
  shows up.

## Acceptance criteria

- [ ] `client/staticwebapp.config.json` exists and SPA routing works on the
      Azure URL (deep-linking to e.g. `/locations/plano/menu` directly,
      not just via in-app navigation).
- [ ] All env vars documented in `.env.example` and set correctly in Azure.
- [ ] Full route/feature pass on the Azure URL matches current Vercel
      behavior.
- [ ] DNS cutover done with a verified rollback path (Vercel project still
      exists and still deploys) for at least one confirmed-stable period
      before decommissioning it.
- [ ] `/DEPLOYMENT.md` and CLAUDE.md §6 updated to reflect the real,
      finished setup.
