# 5Spice website: next steps

Tracking list for upcoming website work. Tick items off as they ship, and add
new ones at the bottom of the right section. Most recent update: 2026-10-23.

**Who:** *Owners* = business decision or information needed. *Marketing* =
Branding & Marketing team. *Dev* = code change (can be done with Claude Code).

---

## 1. Information needed from the owners

These block accurate content. Nothing on the site is invented in the meantime.

- [ ] **Official phone line** (Owners). Confirm (917) 355-6995 is the official
  business number. It appears on every page and in the information Google reads.
  File: `client/src/data/locations/murphy.js` (`phone`).
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
- [ ] **Menu** (Owners/Marketing). When a menu is final, follow
  `docs/MAINTAINER-GUIDE.md` §3 and set `flags.menuPublished: true`.

## 3. Website improvements

- [ ] **Make coming-soon mode fully private** (Dev, small). In `coming_soon`
  mode every page is still reachable by typing its address, and the sitemap
  still lists them, so Google can index pages that aren't ready. Plan: redirect
  every route to the landing page in that mode, and generate a sitemap with the
  homepage only.
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

## 4. Housekeeping

- [ ] **Legacy `server/` folder and `manage_app.sh`** (Owners/Dev). The old
  Express API isn't used by the site, and `manage_app.sh` mainly starts it.
  Decide whether to keep them for phase 2 or remove them. (Its `node_modules`
  folder is no longer committed to git.)
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
- [ ] **Hosting move** (Owners/Dev). Possible move from Vercel to Azure App
  Service. The site is a static build, so it's portable. The `/(.*)` →
  `/index.html` rewrite in `client/vercel.json` needs an Azure equivalent.
- [ ] **Phase 2: in-house ordering** (Owners/Dev). Pickup and nearby delivery
  with a minimum order. Ordering links are kept in one place, so they can be
  swapped later.

---

## Done

- [x] Murphy published: catering available now; dine-in and take-out coming soon.
- [x] Plano shown as "Opening Early 2027, In Sha Allah".
- [x] Menus hidden until final.
- [x] Catering page refresh with a prefilled quote email.
- [x] About page story section (পাঁচফোড়ন — The Aroma of Home).
- [x] Coming-soon landing page shows Murphy catering.
- [x] Catering milestone (1,000+ guests) on the homepage and Catering page.
- [x] Brand colors centralized as tokens; green buttons meet WCAG AA contrast.
- [x] Larger header logo.
- [x] Site modes simplified to `coming_soon` and `live`.
- [x] Maintainer guide: `docs/MAINTAINER-GUIDE.md`.
- [x] Housekeeping:
  - rewrote `README.md`, `DEPLOYMENT.md`, and `TESTING.md`
  - removed unused files: `App.css`, `react.svg`, `useTheme.js`, the Vite
    template README, the empty root lockfile, and `.vade-report`
  - removed the unused `tailwind-merge` package
  - stopped tracking `server/node_modules` in git
