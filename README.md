# 5Spice Market & Kitchen

The public website for **5Spice**, live at [5spicemarket.com](https://5spicemarket.com).
It covers authentic halal Bangladeshi cuisine and closely related South Asian
dishes, plus a premium halal grocery market.

| Location | Status |
|---|---|
| **5Spice Kitchen – Murphy**: 222 E FM 544, Suite 200, Murphy, TX 75094 | Catering available now; dine-in and take-out coming soon |
| **5Spice Market & Kitchen – Plano**: 245 Shiloh Rd, Plano, TX 75074 | Opening Early 2027, In Sha Allah |

> **Updating content?** For the menu, menu photos, weekly deals, location
> details, page copy, and prompts for Claude Code, see
> [`docs/MAINTAINER-GUIDE.md`](docs/MAINTAINER-GUIDE.md).
>
> **What's next?** Upcoming work and open questions are tracked in
> [`docs/NEXT-STEPS.md`](docs/NEXT-STEPS.md).
>
> **Working with Claude Code?** Brand rules and project conventions are in
> [`CLAUDE.md`](CLAUDE.md).

## Tech stack

- **React 19 + Vite 7**: a client-side single-page app built to static files.
- **Tailwind CSS 3.4**: brand colors are defined once as tokens in
  `client/src/index.css` and used as `brand-*` / `ink-*` classes.
- **React Router 7** for pages, **lucide-react** for icons,
  **framer-motion** for the location switcher.
- Hosted on **Vercel** (free tier). It's a static build, so it stays portable.

## Getting started

Requires Node.js 20+ and npm.

```bash
cd client
npm install
npm run dev        # http://localhost:5173
```

| Command (run in `client/`) | What it does |
|---|---|
| `npm run dev` | Local dev server with hot reload |
| `npm run lint` | ESLint |
| `npm run build` | Regenerates `public/sitemap.xml`, then builds to `client/dist` |
| `npm run preview` | Serves the production build locally |

## Site mode

`VITE_APP_SITE_MODE` decides what visitors see:

| Value | Result |
|---|---|
| `coming_soon` | Only the landing page (Plano opening plus the Murphy catering card). No menu bar or other pages. |
| `live` (default) | The full site. Any other value, or no value, also means `live`. |

- **Locally:** set it in `client/.env` (copy `client/.env.example`).
- **In production:** set it in Vercel under **Project Settings → Environment
  Variables**, then redeploy. Vercel's value overrides the committed `.env`.

## Project structure

```
client/
├── public/                 # Static files: logos, favicons, sitemap.xml, weekly-deals.json
├── scripts/                # generate-sitemap.js (runs before every build)
├── src/
│   ├── components/         # Navbar, Footer, landing pages, location cards, catering stats…
│   ├── config/site.js      # Contact info, social links, page copy lists, CATERING_STATS
│   ├── data/
│   │   ├── locations/      # One file per location: the single source of truth
│   │   └── menus/          # Menus by location (hidden until published)
│   ├── hooks/              # Page titles/SEO, selected location
│   ├── pages/              # One component per route
│   └── utils/              # Phone links, hours, milestone rounding
├── vercel.json             # Sends every path to index.html (so refreshes don't 404)
└── .env.example            # Documents every environment variable
docs/
├── MAINTAINER-GUIDE.md     # How to update content
├── NEXT-STEPS.md           # Tracking list
└── specs/                  # Feature specs
server/                     # Legacy Express API: not used by the live site
```

**Adding a location** means adding a data file in `client/src/data/locations/`,
not writing new pages. See `client/src/data/README.md`.

## Deployment

On Vercel, the project's **Root Directory** must be `client`, with the Vite
preset. Pushing to `main` deploys to production, and other branches get preview
URLs. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for details and Azure notes.

## Working agreement

- Work on a feature branch and open a PR into `main`. Don't commit directly to
  `main`.
- Run `npm run lint` and `npm run build` before opening a PR.
- Never commit secrets. Document every environment variable in
  `client/.env.example`.
