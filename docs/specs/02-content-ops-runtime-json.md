# Spec 2: Content ops — runtime JSON for menus & locations

**Status:** Next
**Type:** Feature (content ops / maintainability)
**Depends on:** nothing (can ship independently of Spec 1 and 3)

## Why

Menu and location data today lives in `.js` modules under
`client/src/data/locations/` and `client/src/data/menus/`. Any content
change — a new dish, a price, an hours update, a phone number — requires
editing JS, a local build, a commit, and a redeploy. That's the "random
things here and there" workflow the owner wants to move away from for
content, even though it's fine for actual code.

CLAUDE.md already requires this pattern for Weekly Deals (§4: "must be easy
for non-developers to update... low effort to maintain is a hard
requirement") and it's already implemented there: `client/public/weekly-deals.json`
is fetched at runtime by `Sales.jsx`, so editing it needs no rebuild. This
spec extends that exact pattern to locations and menus, which currently
don't have it.

## Goal

Editing a location's hours/phone/status or a menu's items/prices should mean
editing one JSON file and pushing it — no code change, no new build
pipeline, no new dependency. Framework code (how locations/menus are
rendered, validated, and defaulted) stays in `src/`; data moves to
`client/public/data/`.

## Non-goals

- Not building an admin UI or CMS in this pass — see this spec's "Future
  option" section for why that's a separate, later decision.
- Not changing the menu/location *schema* — the shapes in
  `src/data/locations/plano.js` and `src/data/menus/plano.js` are good;
  they're just moving from JS literals to JSON files.
- Not giving restaurant staff direct editing access yet (they'd still need
  someone comfortable editing JSON + pushing to GitHub). That's the
  Google-Sheet-backed option noted below, intentionally deferred.

## Design

### File layout

```
client/public/data/
  locations/
    plano.json
    murphy.json
  menus/
    shared-items.json
    plano.json
    murphy.json
```

Same shapes as today's `.js` exports, just as JSON (drop the `export const
x =` wrapper; JS-only things like comments become a `_notes` field or move
to `data/README.md`).

### Loading

- Add a small loader (e.g. `src/data/loadLocations.js`,
  `src/data/loadMenus.js`) that `fetch()`s these JSON files at app start,
  mirroring what `Sales.jsx` already does for `weekly-deals.json`.
- Replace the current static imports (`locations/index.js`,
  `menus/index.js`) with versions backed by the fetched data, keeping the
  same exported function names (`getAllLocations`, `getVisibleLocations`,
  `getLocationBySlug`, `getMenuByLocationSlug`, etc.) so consuming
  components (`Footer`, `Navbar`, `LocationDetail`, `LocationMenu`,
  `Pickup`, `config/site.js`) don't need to change.
- `config/site.js` currently calls `getDefaultLocation()` synchronously at
  module load time to build `CONTACT`/`HOURS`. Moving to `fetch()` makes
  this async — needs a loading state (e.g. a root-level data provider that
  renders nothing/a skeleton until the first fetch resolves, similar to how
  `Sales.jsx` already falls back to `fallbackDeals` while loading). This is
  the main structural change this spec introduces.
- Keep a hardcoded fallback (last-known-good or minimal placeholder) for
  fetch failure, same pattern as `fallbackDeals` in `Sales.jsx`.

### Validation

- Keep `price: null` → "Price TBD" behavior (CLAUDE.md: never invent
  prices).
- Add a lightweight schema check (plain JS, no new dependency) that runs in
  `prebuild` (alongside `scripts/generate-sitemap.js`) and fails the build
  if a location/menu JSON file is missing a required field or references an
  `itemId` that doesn't exist in `shared-items.json`. This catches typos
  before they reach production, since there's no code review of JSON
  content the way there would be of a PR touching `.jsx`.

### Editing workflow (end state)

1. Open the relevant file in `client/public/data/...` (via GitHub's web
   editor or a local checkout).
2. Edit the JSON.
3. Commit/push. No local build or `npm run build` required for the content
   to go live after deploy — the host just needs to serve the updated
   static file. (On Vercel/Azure Static Web Apps, that still means a
   redeploy of the static assets, but with zero code changes and zero risk
   of breaking app logic.)

## Future option (not in this pass)

If restaurant staff need to edit content directly without touching JSON or
GitHub, the next step would be a Google Sheet as the source of truth, with a
sync step that regenerates these same JSON files. That's a bigger decision
(who owns the sheet, how often it syncs, what happens on a bad edit) and is
deliberately left for a later spec once this JSON step has been live for a
while and the pain point is still there.

## Acceptance criteria

- [ ] `client/public/data/locations/*.json` and `client/public/data/menus/*.json`
      exist with the same content as today's `.js` modules.
- [ ] All consuming components render identically to before (manual check:
      Home, Market, Kitchen, Locations, LocationDetail, LocationMenu,
      Pickup, Footer, Navbar, Contact).
- [ ] Editing a JSON file and reloading the dev server (no rebuild) shows
      the change — proves it's truly runtime-loaded, not inlined at build
      time.
- [ ] `npm run build` fails with a clear error if a menu references a
      missing shared item id, or a location is missing a required field.
- [ ] `client/src/data/README.md` updated to describe the new file
      locations and the still-true rules (never invent prices, Murphy rule
      for `status`, etc.).
- [ ] Old `.js` data modules removed once the JSON versions are confirmed
      working (no dead code left behind).
