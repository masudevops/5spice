# Deploying 5spicemarket.com

The site is a static build (`client/dist`). It has no backend, database, or
server-side code, so it can run on any static host.

## Vercel (current)

Project settings:

- **Framework preset:** Vite
- **Root Directory:** `client`
- **Build command:** `npm run build`. This regenerates `public/sitemap.xml`
  first.
- **Output directory:** `dist`
- **Environment variable:** `VITE_APP_SITE_MODE`, set to `coming_soon` (landing
  page only) or `live` (full site). Changing it requires a redeploy.

How deploys work:

- Merging to `main` deploys to production.
- Any other pushed branch gets a preview URL, which is useful for checking a PR
  before merging.
- `client/vercel.json` rewrites every path to `/index.html`. This lets direct
  links and refreshes on pages like `/catering` work instead of returning 404.
- Vercel Web Analytics loads only on Vercel builds (Vercel sets `VERCEL=1`,
  which `client/vite.config.js` turns into `VITE_ON_VERCEL`). Other hosts
  skip it.

## Azure Static Web Apps, Free plan (prepared, not live yet)

Everything for the move is ready. Follow [`infra/README.md`](infra/README.md).

- **Set up:** `./infra/setup-azure.sh --subscription <id> --site-mode live`
  creates the Static Web App and connects GitHub.
- **Deploys:** `.github/workflows/azure-static-web-apps.yml` builds `client/`
  (lint, then build) and uploads `client/dist`. Pushes to `main` go to
  production, and PRs get preview URLs. It stays off until the repo variable
  `AZURE_SWA_ENABLED` is `true`.
- **Routing:** `client/public/staticwebapp.config.json` sends unknown paths to
  `index.html` (the Azure version of `vercel.json`) and adds caching and
  security headers.
- **Site mode:** the GitHub repo variable `VITE_APP_SITE_MODE`, read at build
  time.
- **Domain:** `./infra/add-custom-domain.sh www.5spicemarket.com`, then the
  root domain.
- **Plan:** Free costs $0/month. To upgrade, re-run setup with
  `--sku Standard`.

Until DNS points to Azure, Vercel keeps serving 5spicemarket.com, and both can
run side by side.
