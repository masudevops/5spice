# 5Spice website: next steps

Tracking list for upcoming website work. Tick items off as they ship, and add
new ones at the bottom of the right section. Most recent update: 2026-11-18.

**Who:** *Owners* = business decision or information needed. *Marketing* =
Branding & Marketing team. *Dev* = code change (can be done with Claude Code).

---

## 1. Information needed from the owners

These block accurate content. Nothing on the site is invented in the meantime.

- [ ] **Official phone line** (Owners). Murphy shows "Phone: to be updated"
  for now (since 2026-11-02), and visitors are pointed to email and Facebook.
  Send the official number and it goes in `client/src/data/locations/murphy.js`
  (`phone`); call buttons and Google's listing data come back automatically.
- [ ] **Murphy map coordinates** (Owners/Dev). Exact `lat` / `lng` so Google
  Maps and Search place the address correctly. Same file (`lat`, `lng`).
- [ ] **Murphy hours** (Owners). Add them when dine-in and take-out open.
  Same file (`hours`).
- [ ] **Ordering links** (Owners). Toast, Uber Eats, and DoorDash storefront URLs
  for Murphy when they go live. Same file (`orderingLinks`). The "Order from
  Murphy" buttons come back automatically once dine-in or take-out is set to
  `'open'` in `services`.
- [ ] **Catering totals** (Owners). Send verified totals every few weeks.
  File: `client/src/config/site.js` (`CATERING_STATS`). Add
  `eventsCompleted` when there's a verified count.


## 2. Content review

- [ ] **Copy review** (Marketing). Review the copy written during launch prep:
  homepage, Kitchen, Catering, Order Online, Contact, About hero, and the
  coming-soon landing page.
- [ ] **About story wording** (Marketing). "Aroma" appears more than once in
  the পাঁচফোড়ন story. Optional tweak.
- [ ] **Menu details** (Owners/Marketing). The Murphy menu is public since
  2026-11-02 and says "Prices coming soon". More dishes are coming. Every
  dish has a short description (2026-11-03): two written by the owners, the
  rest general descriptions of each dish that Marketing may want to refine.
  Still needed: prices, and any tags to show (5Spice Specials, vegetarian,
  spicy). See `docs/MAINTAINER-GUIDE.md` §3.
- [ ] **Catering menu** (Owners, later). Decide whether catering offers the
  full menu or a set list of trays. If it's a set list, mark those dishes
  in the same menu data rather than keeping a second menu.

## 3. Website improvements

- [ ] **Make coming-soon mode fully private** (Dev, small; only matters if the
  site ever goes back to coming-soon mode). In `coming_soon`
  mode every page is still reachable by typing its address, and the sitemap
  still lists them, so Google can index pages that aren't ready. Plan: redirect
  every route to the landing page in that mode, and generate a sitemap with the
  homepage only.
- [ ] **Remove Vercel** (Dev, around 2026-10-31). Azure has been serving the
  site since 2026-10-24; Vercel is the fallback until then. Remove the domain
  and disconnect Git in the Vercel project, later delete it, then remove
  `client/vercel.json` (see `DEPLOYMENT.md`).
- [ ] **One main address** (Dev, optional). Both `5spicemarket.com` and
  `www.5spicemarket.com` serve the site. Consider redirecting `www` to the root
  domain, which the sitemap already uses.
- [ ] **Food photos** (Owners provide photos, then Dev). Real photos only, never
  stock or AI.
  - Kitchen page: turn the three highlight cards into 3–6 signature dish photos
    (name plus optional origin tag; no prices until the menu is final).
  - Catering page: 3–4 tray, buffet, or event photos near the quote button.
    Check with Marketing first, because the original brief said no photos.
  - Homepage: optional single row of 3–4 dishes, later.
  - Format: `.webp`, about 1200 px wide, 4:3, under 200 KB, placed in
    `client/public/images/dishes/`. Listed in one data file, and each section
    stays hidden until it has photos.
  - Get consent before using photos that show guests.
- [ ] **Working automated tests** (Dev, needs approval). `npm test` can't run:
  `@playwright/test` isn't installed and the existing specs in `client/e2e`
  are out of date. Add the package as a dev dependency and rewrite a small set
  of tests covering each route, location status, links, and both site modes.
- [ ] **Social share preview** (Dev). Check that `og-preview.png` and the page
  titles and descriptions look right when links are shared on Facebook and
  WhatsApp.

## 3a. In-store TV screens (Murphy)

Six TVs. TVs 1–3 are text-only menu boards; TVs 4–6 are promo slideshows.
How it works, editing, media rules, Fire TV setup, and the test checklist:
`docs/TV-MENU-BOARDS.md`.

Status (2026-11-19): **live** (PR #30): all six screens. TVs 1–3 text menus
(restaurant menu only, text grows to fit up to 1.5×, owner-confirmed prices), TV 4 signature dishes, TV 5 meal specials (sample content shows on
previews only; the live TV 5 plays menu highlights, dishes and prices from
the menu, until real specials are in), TV 6 catering and community. Photos: 5Spice's own Chicken Roast and
Tehari, the rest temporary stock photos, shown live by the owner's decision.

- [ ] **Test the redesign on the real TVs** (Dev/Owners) via the PR preview
  link: full screen (Silk toolbar was showing in the 2026-11-17 photos), TV
  picture mode (blacks looked gray-blue), readability at 10–15 ft.
- [ ] **Full screen that survives reloads** (Dev/Owners). Check whether Silk's
  own full-screen setting survives a page reload; if not, use a kiosk browser
  (e.g. Fully Kiosk, launch on boot).
- [ ] **Replace the stock photos** (Owners): 11 temporary stock photos on
  TVs 4–6, live (list, sources, and licenses in `docs/TV-MENU-BOARDS.md`).
  Send 5Spice's own photos/videos, TV 4 dishes first (Kacchi, Kala Bhuna,
  Fuchka, Chai). Chicken Roast and Tehari already use 5Spice's own.
- [ ] **Approved restaurant menu** (Owners): smaller than the catering menu.
  Then finalize TVs 1–3 categories (the text grows automatically with fewer
  dishes). Today TV 3 leaves out Shahi Jarda at the smallest size; don't
  shrink text, wait for the final menu.
- [ ] **TV 5 specials** (Owners): real breakfast/lunch/dinner serving hours
  (`servingHours`), dishes, and wording, any offers; then remove `sample`
  from those campaigns and `todays-specials`.
- [ ] **TV 6** (Owners): confirm wording; send event/community photos.
- [ ] **Real dish media** (Owners) for TV 4 (and 5–6): MP4 preferred
  (1920×1080, 5–10 s, about 3–5 MB) or 1920×1080 photos. Files in `client/public/tv-media/`,
  one line each in `TV_MEDIA` in `media.js` (replacing its stock photo), new
  file name for every replacement. Move to Azure Blob Storage only if the
  library grows a lot.
- [x] **Prices** (Owners, 2026-11-19): Murphy restaurant prices set in
  `client/src/data/menus/shared-items.js` (TVs and website menu; not on the
  catering menu). New dishes need a price there.
- [ ] **Confirm TV assignments** (Owners): which categories on TVs 1–3, and
  which dishes keep a description (`murphyDescribedDishes`).
- [ ] **5Spice Special badge** (Owners). Removed from the Tehari and Chai names
  (2026-11-17). Add `special: true` to both if they should still be marked.
- [ ] **Biriyani and search** (Owners/Marketing, optional). Optionally keep
  "biryani" in hidden page descriptions for Google.
- [ ] **Later:** QR code to the Catering page; Toast POS sync for names and
  prices (`getMenuItem()` / `getMenuByLocationSlug()`, server-side job), with
  promotions and media staying team-managed.

## 4. Housekeeping

- [ ] **Old feature specs** (Dev). `docs/specs/02` (runtime JSON content) and
  `04` (catering inquiry form) are still open ideas. Close or refresh them
  when they come up.

## 5. Later

- [ ] **Orange accent trial** (Marketing/Dev). Preview the logo's orange as a
  small accent, such as the labels above headings on one page. Marketing
  decides before anything changes site-wide. Colors are now one-line edits in
  `client/src/index.css`.
- [ ] **Plano launch** (Dev, near opening). Switch Plano to `status: 'open'`
  and add hours, ordering links, and the Instacart link, then start weekly deals
  in `client/public/weekly-deals.json`.
- [ ] **Phase 2: in-house ordering** (Owners/Dev). Pickup and nearby delivery
  with a minimum order. Ordering links are kept in one place, so they can be
  swapped later.

---

## Done

- [x] Hosting moved to Azure Static Web Apps (Free) on 2026-10-24:
  `swa-5spice-web` in `5Spice-Production`, deployed by GitHub Actions, DNS on
  Cloudflare, SSL for both `5spicemarket.com` and `www`.
- [x] UX and accessibility review fixes (2026-10-25):
  - keyboard: skip link, mobile menu focus and Escape, location dropdown arrow keys, focus kept clear of the header and bottom bar
  - phones: 44px bottom bar with 12px labels, larger footer and contact tap areas, no sideways scroll at 320px or with large text
  - speed: logo 354 KB → 43 KB (WebP copy), Bengali font ~105 KB → ~7 KB, pages load on demand, size-matched fallback fonts, Weekly Deals no longer jumps
  - reduced motion respected
- [x] Full site live (2026-11-02): GitHub variable `VITE_APP_SITE_MODE` set to
  `live`, Murphy menu published, Murphy phone shown as "Phone: to be updated"
  until the official number arrives.
- [x] Menu page upgrade (2026-10-25): search that handles different
  spellings, filter buttons (5Spice Specials, Vegetarian, Spicy), a category
  bar that highlights where you are, a compact list on phones, and an
  "Order from …" button once ordering is open. Headed groups within a
  category (Chicken / Beef / Mutton). No Bangladeshi/Indian/Pakistani labels.
- [x] Cloudflare Web Analytics replaces Vercel Web Analytics (2026-10-25).
- [x] Murphy published: catering available now; dine-in and take-out coming soon.
- [x] Plano shown as "Opening Early 2027" ("In Sha Allah" removed from site copy 2026-11-17).
- [x] Menus hidden until final.
- [x] Catering page refresh with a prefilled quote email.
- [x] About page story section (পাঁচফোড়ন — The Aroma of Home).
- [x] Coming-soon landing page shows Murphy catering.
- [x] Catering milestone (1,600+ guests as of 2026-11-17) on the homepage and Catering page.
- [x] Brand colors centralized as tokens; green buttons meet WCAG AA contrast.
- [x] Larger header logo.
- [x] Site modes simplified to `coming_soon` and `live`.
- [x] Maintainer guide: `docs/MAINTAINER-GUIDE.md`.
- [x] In-store TV menu boards for Murphy, TVs 1–3 (2026-11-17): 5Spice
  Kitchen logo, three columns with a featured dish (video, GIF, or photo with
  fallbacks), large text for reading at a distance, prices hidden until set,
  auto-reload after deploys and daily.
- [x] "Biriyani" spelling site-wide; "Nawabi Beef Tehari" and "Royal Bengal
  Chai" renamed (2026-11-17).
- [x] "Chinese Vegetables with Shrimp" removed from every menu and TV 3;
  Basmati Rice added to TV 3's Rice & Sides (2026-11-17).
- [x] Catering menu separate from the restaurant menu (`/catering/menu`);
  location cards only on location pages; Contact page is contact channels
  only; homepage centered and tightened; mobile menu readable (2026-11-17).
- [x] Housekeeping:
  - rewrote `README.md`, `DEPLOYMENT.md`, and `TESTING.md`
  - removed unused files: `App.css`, `react.svg`, `useTheme.js`, the Vite
    template README, the empty root lockfile, and `.vade-report`
  - removed the unused `tailwind-merge` package
  - removed the unused legacy `server/` (Express API) and `manage_app.sh`.
    Both are in git history if phase 2 needs them.
