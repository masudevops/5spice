# CLAUDE.md — 5spicemarket.com

This file gives Claude Code standing context for this repository. Read it at the start of every session and follow it unless the user says otherwise in the current task.

---

## 1. Project overview

This is the public website for **5Spice**, live at https://5spicemarket.com.

5Spice is a multi-location brand:

| Location | Type | Address | Status |
|---|---|---|---|
| 5Spice Market & Kitchen – Plano | Halal grocery + restaurant | 245 Shiloh Rd, Plano, TX 75074 | Pre-launch, "Opening Early 2027" |
| 5Spice Kitchen Murphy | Restaurant only | 222 E FM 544, Suite 200, Murphy, TX 75094 | Not yet public (see rule below) |

More locations will be added over time, so the site must stay **data-driven**: adding a location means adding data, not writing new pages.

The site is in a **pre-launch, minimal phase**. Its job right now is to:
- build awareness and trust before opening
- highlight the menu, products, and grocery departments
- send visitors to third-party ordering platforms and social channels

**Murphy rule:** 5Spice Kitchen Murphy must stay `hidden` (not publicly visible, not in nav, sitemap, or structured data) until the owners confirm that written landlord approval for the name change has been received. Build for it, but never flip it live on your own.

---

## 2. Brand rules (non-negotiable)

- Always write **"5Spice"**: one word, no space. Never "5 Spice" or "Five Spice" in site copy. (A legal entity name may appear only in a legal footer if explicitly requested.)
- **Positioning:** "Authentic Halal Bangladeshi Cuisine," complemented by closely related South Asian dishes (Indian and Pakistani).
  - Bangladeshi is always the lead identity. Never drop it to sound broader.
  - Present Indian and Pakistani items as part of the same regional family. Do not describe 5Spice as a generic "Indian restaurant."
  - Pair the specific identity with welcoming language for all guests.
- **Halal:** everything served and sold is halal. State it at the brand or location level, not as a per-item tag.
- **Name origin:** "5Spice" comes from পাঁচফোড়ন (panch phoron), the Bengali five-spice blend. Use this for About/story content.
- **Logo:** a bloom icon in Bangladeshi, Pakistani, and Indian flag colors. Use the provided logo assets only. Never redraw, recolor, or approximate the logo.
- **Tone:** warm, proud of heritage, welcoming, modern. Islamic phrases used in brand sign-offs (e.g. "Opening Early 2027, In Sha Allah") are intentional. Keep them exactly as written and do not "correct" them.

---

## 3. Design system

- Dark theme with gold accents, clean and modern. The structural reference is Green Vine Market, executed in a more modern and polished style.
- Reuse existing design tokens, CSS variables, and components. Do not introduce a new visual language.
- Mobile-first and responsive. Most visitors arrive from Instagram, Facebook, and Google Maps on phones.
- Accessible: semantic headings, alt text, sufficient contrast for gold-on-dark, and keyboard-usable controls.
- Do not restyle existing pages unless the task asks for it.

---

## 4. How the site makes money (business logic)

- **No native checkout yet.** Ordering is routed to third parties:
  - Restaurant: Toast, Uber Eats, DoorDash
  - Grocery: Instacart
  - Hide any ordering button whose link is empty.
- Pickup and close-proximity delivery with a minimum order are being explored. In-house ordering may come in **phase 2**. Keep all ordering links and logic in one place so they can be swapped later.
- **Weekly Deals** must be easy for non-developers to update (simple data file or similar). Low effort to maintain is a hard requirement.
- Existing pages: Home, Market, Kitchen, Weekly Deals, Catering, Order Online.
- Grocery-only content (Market, Weekly Deals) must never appear for kitchen-only locations.

---

## 5. Contact & channels

- Email: info@5spicemarket.com
- Social: @5SpiceMarket on Facebook and Instagram
- Google Business Profile is live for Plano.
- Do not add personal phone numbers or personal emails to the site or repo. Use placeholders until official numbers are provided.

---

## 6. Hosting & deployment

- Currently deployed on **Vercel (free tier)**. A move to **Azure App Service (low-cost tier)** is being considered.
- Keep the app **portable**: avoid Vercel-only services (Vercel KV, Edge Config, Vercel-specific middleware features) unless they are wrapped behind an abstraction and documented.
- No secrets in the repo. Document every environment variable in `.env.example`.
- Prefer static generation where possible: it's cheaper, faster, and portable.

---

## 7. Tech stack

> **Claude: on your first session, inspect the repo and fill in this section, then keep it current.**

- Framework / version: **React 19.2 + Vite 7** (client-side rendered SPA only — no SSR/SSG). `server/` is a legacy Express 5 API that the deployed client does not call; treat it as unused unless a task says otherwise.
- Language: JavaScript (JSX). No TypeScript (no `.ts`/`.tsx` files; `@types/react` is dev-only tooling).
- Styling approach: Tailwind CSS 3.4 (utility classes) + CSS custom properties for brand colors (`--color-brand-green`, `--color-accent-gold`, etc., consumed via `tailwind.config.js`). Some hand-written CSS in `App.css` / `index.css`.
- Package manager: npm. Three independent trees with their own lockfiles: repo root, `client/`, `server/`.
- Dev command: `cd client && npm run dev` (Vite dev server). The Express API (`cd server && node index.js`) is not required for the client to run.
- Build command: `cd client && npm run build` → outputs `client/dist` (static files, deployed as-is).
- Lint / typecheck / test commands: `cd client && npm run lint` (ESLint flat config, `eslint.config.js`). No typecheck script (plain JS). `cd client && npm test` runs Playwright e2e specs in `client/e2e`.
- Key folders and what they contain:
  - `client/src/pages/` — one component per route (Landing, Market, Kitchen, Sales, Catering, Pickup, About, Contact).
  - `client/src/components/` — Navbar, Footer, Layout, and the two landing variants (`ComingSoonLanding`, `LaunchLanding`) selected by `SITE_MODE`.
  - `client/src/config/site.js` — hardcoded site-wide constants (contact info, hours, nav copy, order platform links, etc.) — currently single-location, see Section 8 work.
  - `client/src/hooks/` — small hooks (e.g. `useTheme`).
  - `client/public/` — static assets served as-is, including `weekly-deals.json` (fetched client-side by the Sales page).
  - `server/data/*.json` — legacy sample data (menu, products, store info); not wired into the deployed client.
- Routing: `react-router-dom` v7, client-side only (`BrowserRouter`), rewritten to `index.html` for all paths via `client/vercel.json`.
- Site mode switch: `VITE_APP_SITE_MODE` (`coming_soon` | `grand_opening` | `live`) in `client/.env` controls whether Nav/Footer/full site render at all (`coming_soon` shows only the stealth landing page).

---

## 8. Data & content conventions

- Location data: `/data/locations` (single source of truth for every location)
- Menus: `/data/menus/<location-slug>.json`, with shared items in a shared file
- Weekly deals: keep in a simple, non-developer-editable data file
- `/data/README.md` explains in plain language how to add a location, edit a menu, update deals, and switch a location from hidden to live.
- Menus are organized by course (Starters, Biryani & Rice, Curries, Kebabs & Grill, Breads, Desserts, Drinks…), not by cuisine. Items may carry an optional `origin` tag: Bangladeshi, Indian, or Pakistani.

---

## 9. SEO

- Unique title and meta description per page. Location pages include "Halal Bangladeshi" plus the city name.
- JSON-LD per visible location: `Restaurant` (plus `GroceryStore` for market locations) with address, geo, hours, menu URL, and `servesCuisine` = ["Bangladeshi", "Indian", "Pakistani", "Halal"].
- Keep the sitemap in sync with visible routes. Hidden locations are excluded.

---

## 10. Working agreement

- Work on a feature branch. Never commit directly to `main`.
- For anything non-trivial, **propose a plan first** and wait for approval before editing.
- Make small, focused commits with clear messages.
- Before saying a task is done, run build, lint, and typecheck (and tests if present), and fix what breaks.
- **Ask before:** adding dependencies, changing hosting/deploy config, deleting files, or changing the URL structure of existing pages.
- When finished, summarize the files changed and any follow-ups the owners need to do (e.g. fill in real hours, phone numbers, ordering links).
- The site owner is the 5Spice IT & Systems lead. Brand and copy direction comes from the Branding & Marketing team. When unsure about wording, flag it rather than inventing claims (no made-up awards, reviews, prices, or dish details).