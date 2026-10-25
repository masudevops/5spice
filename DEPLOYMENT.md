# Deploying 5spicemarket.com

The site is a static build (`client/dist`). It has no backend, database, or
server-side code, so it can run on any static host.

## Azure Static Web Apps, Free plan (current, live since 2026-10-24)

`5spicemarket.com` and `www.5spicemarket.com` are served by Azure. Setup
details are in [`infra/README.md`](infra/README.md).

| What | Value |
|---|---|
| Subscription | `5Spice-Production` (5spicemarket.com directory) |
| Resource group | `rg-5spice-web` (Central US) |
| Static Web App | `swa-5spice-web`, Free plan |
| Azure address | https://lemon-mushroom-0ef168b10.3.azurestaticapps.net |
| DNS | Cloudflare. `@` and `www` are CNAMEs to the Azure address, set to **DNS only** (grey cloud) |
| SSL | Issued and renewed by Azure. Keep the `_dnsauth` TXT record in Cloudflare; Azure uses it for the root domain |

How deploys work:

- `.github/workflows/azure-static-web-apps.yml` installs, lints, and builds
  `client/`, then uploads `client/dist`.
- Merging to `main` deploys to production.
- Each pull request gets a preview URL (posted as a PR comment), removed when
  the PR closes.
- To redeploy without a code change: GitHub → **Actions** → **Azure Static Web
  Apps** → open the latest `main` run → **Re-run all jobs**.
- `client/public/staticwebapp.config.json` sends unknown paths to `index.html`,
  so direct links and refreshes on pages like `/catering` work. It also sets
  caching and security headers.

GitHub settings (repo → **Settings → Secrets and variables → Actions**):

| Name | Kind | Purpose |
|---|---|---|
| `VITE_APP_SITE_MODE` | variable | `coming_soon` or `live`, read at build time |
| `AZURE_SWA_ENABLED` | variable | `true` turns the workflow on |
| `VITE_CF_ANALYTICS_TOKEN` | variable | Cloudflare Web Analytics token (public). Empty turns analytics off |
| `AZURE_STATIC_WEB_APPS_API_TOKEN` | secret | Deployment token. Set by `infra/setup-azure.sh`; never commit it |

**Change the site mode:**

```bash
gh variable set VITE_APP_SITE_MODE --repo masudevops/5spice --body live
```

Then re-run the latest `main` deploy (see above).

**Plan:** Free costs $0/month. To upgrade, run
`./infra/setup-azure.sh --subscription <id> --sku Standard`.

## Analytics: Cloudflare Web Analytics

Visitor numbers (visits, page views, top pages, referrers, countries, devices,
page speed) are in Cloudflare → **Analytics & Logs → Web analytics** →
`5spicemarket.com`. It's free and uses no cookies.

- The site is set to **Enable with JS Snippet installation**. Automatic
  injection doesn't work because our DNS records are "DNS only", not proxied.
- `client/src/main.jsx` adds the script when `VITE_CF_ANALYTICS_TOKEN` is set,
  and only on `5spicemarket.com` / `www`, so local dev and PR previews aren't
  counted.
- Azure's own metrics (portal → Static Web App → Metrics) count requests, not
  visitors.

## Vercel (old host, fallback until about 2026-10-31)

Vercel served the site until 2026-10-24 and is kept for a week as a fallback.
It still builds every push to `main`, but no domain points to it.

- **Fallback:** in Cloudflare, replace the `@` CNAME with `A @ 216.198.79.1`.
  Vercel serves the site again within about 5 minutes.
- **Remove after the fallback week:**
  1. Vercel → Project → **Settings → Domains**: remove `5spicemarket.com`.
  2. **Settings → Git**: disconnect the repo, so `main` deploys only to Azure.
  3. Later, delete the project, then remove `client/vercel.json`.
- Past Vercel Web Analytics numbers stay in the Vercel project until it's
  deleted. Visitor counts since 2026-10-25 are in Cloudflare (see above).
