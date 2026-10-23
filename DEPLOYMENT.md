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
- Vercel Web Analytics is loaded in `client/src/main.jsx` via
  `@vercel/analytics`. It does nothing on other hosts.

## Azure Static Web Apps (possible future move)

See `docs/specs/03-azure-static-web-apps-migration.md`. In short:

- **App location:** `/client`. **Output location:** `dist`.
- Set `VITE_APP_SITE_MODE` as a build-time setting. Vite reads it during the
  build, not at runtime.
- Replace the `vercel.json` rewrite with a `staticwebapp.config.json`
  navigation fallback to `/index.html`.
- Decide whether to keep Vercel Analytics or swap it for another analytics tool.
