# 5Spice content data

Everything here is plain JavaScript objects — no database, no CMS. Edit a
file, save, and the site picks it up on the next build/dev reload.

## Add a new location

1. Copy `locations/plano.js` or `locations/murphy.js` to a new file, e.g.
   `locations/your-city.js`.
2. Fill in every field. Use the comments in the existing files as a guide —
   anything marked `PLACEHOLDER` must be confirmed with the owners before
   the location goes live.
3. Set `status` to `"hidden"` until the location is ready to announce
   publicly. Hidden locations never appear in navigation, `/locations`, the
   sitemap, or structured data.
4. Open `locations/index.js`, import your new file, and add it to the
   `LOCATIONS` array.
5. Create a matching menu file (see "Edit a menu" below), even if it's a
   placeholder — `/locations/<slug>/menu` needs one to avoid a broken link.

## Edit a menu

- Dishes that appear at more than one location live in `menus/shared-items.js`.
  Edit a dish there and every location using it updates automatically.
- Each location has its own file (`menus/plano.js`, `menus/murphy.js`) that
  lists categories and which shared items belong in each one. To add a
  location-only dish, add an `items: [...]` array next to `itemIds` in that
  category with a full item object (same shape as an entry in
  `shared-items.js`).
- **Never invent prices.** Leave `price: null` until Branding & Marketing /
  the kitchen team confirms real pricing — the menu page shows "Price TBD"
  automatically for any item without a price.
- `halal` is stated once per menu (the `halalStatement` field), not per item.

## Update weekly deals

Edit `client/public/weekly-deals.json` directly — it's fetched by the
Weekly Deals page at runtime, so no rebuild is required in production. Only
locations with `flags.hasWeeklyDeals: true` show the Weekly Deals nav link
and page.

## Switch a location from hidden to live

Open that location's file in `locations/` and change `status` from
`"hidden"` to `"coming-soon"` or `"open"`. That's it — nav, footer,
`/locations`, the sitemap, and JSON-LD all pick it up automatically.

**Before flipping Murphy specifically**, see the checklist below.

## Before deploying to production

Run through this before any deploy that could make these locations public:

1. **Confirm landlord written approval for the 5Spice Kitchen Murphy name.**
   If it hasn't been received yet, set Murphy's `status` to `"hidden"` in
   `locations/murphy.js`. This is a hard rule from CLAUDE.md — do not deploy
   Murphy as visible without it.
2. Fill in real hours, phone numbers, and lat/lng coordinates for every
   visible location.
3. Confirm live ordering platform URLs (Toast, Uber Eats, DoorDash,
   Instacart) for every visible location — empty links are hidden
   automatically, but double check the ones that should be live actually
   are.
4. Replace placeholder hero images with real photography.
5. Build the site (`npm run build` from `client/`) and check the generated
   `client/dist/sitemap.xml` — confirm it lists only the locations you
   intend to publish.
