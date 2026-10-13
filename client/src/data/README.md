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

## Publish or hide a menu

Menus are hidden until they're final. To publish a location's menu, open its
file in `locations/` and set `flags.menuPublished` to `true`. That turns on
the "View Menu" buttons, the `/locations/<slug>/menu` page, the sitemap entry,
and the menu link in search-engine data. Set it back to `false` to hide it.

## Catering, dine-in, and take-out status

A location can list each service separately in its `services` block, e.g.

```js
services: { catering: 'open', dineIn: 'coming-soon', takeOut: 'coming-soon' },
```

Use `'open'` or `'coming-soon'`. Each service shows as a badge on the
location card and location page. Any location with `catering: 'open'` is
listed as "Now booking" on the Catering page. Catering requests go to
`catering@5spicemarket.com` (set in `src/config/site.js` as `CATERING_EMAIL`).

## Update weekly deals

Edit `client/public/weekly-deals.json` directly — it's fetched by the
Weekly Deals page at runtime, so no rebuild is required in production. Only
locations with `flags.hasWeeklyDeals: true` show the Weekly Deals nav link
and page.

Leave `"deals": []` empty while no promotions are running. The page then
says deals start when the market opens, rather than showing made-up deals.
When deals are live, add entries like:

```json
{ "id": "basmati-rice", "title": "Basmati Rice", "category": "Pantry",
  "description": "10 lb bags this week.", "badge": "This Week" }
```

## Location status, hours, and order

- `status`: `"open"` (operating now), `"coming-soon"` (announced), or
  `"hidden"`. Open locations get "Now Serving" treatment, phone/call buttons,
  and are where "Order from …" buttons point.
- `statusLabel`: short badge text (e.g. "Now Serving", "Coming Early 2027").
- `openingText`: longer line, e.g. "Opening Early 2027, In Sha Allah".
- `hours`: leave `[]` until hours are confirmed; the site shows `hoursNote`
  instead. Never put estimated hours here — they're published to Google.
- The **first** location in `locations/index.js` is the site-wide default
  (location switcher, Kitchen, Order Online). Keep the operating location
  first.

## Switch a location from hidden to live

Open that location's file in `locations/` and change `status` from
`"hidden"` to `"coming-soon"` or `"open"`. That's it — nav, footer,
`/locations`, the sitemap, and JSON-LD all pick it up automatically.

**Before flipping Murphy specifically**, see the checklist below.

## Before deploying to production

Run through this before any deploy that could make these locations public:

1. ~~Confirm landlord written approval for the 5Spice Kitchen Murphy name.~~
   Confirmed by the owners on 2026-10-13; Murphy is now visible.
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
