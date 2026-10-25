# Moving 5spicemarket.com to Azure Static Web Apps (Free)

> **Done on 2026-10-24.** The site is live on Azure; current resources and
> settings are in [`DEPLOYMENT.md`](../DEPLOYMENT.md). This walkthrough is kept
> for rebuilding the setup or moving to a new subscription.

These scripts set up Azure hosting for the site. Nothing here affects the live
site until you change DNS (step 4), so you can set up and test Azure first,
then switch, keeping the old host as a fallback for a few days.

| File | What it does |
|---|---|
| `config.env` | Names, region, plan, and GitHub repo. Not secret. |
| `setup-azure.sh` | Creates the resource group and Static Web App, then connects GitHub Actions. Safe to re-run. |
| `add-custom-domain.sh` | Connects `www.5spicemarket.com` and `5spicemarket.com`, showing the exact DNS records to add. |
| `../.github/workflows/azure-static-web-apps.yml` | Builds and deploys on every push to `main`; PRs get preview URLs. Stays off until setup has run. |
| `../client/public/staticwebapp.config.json` | Azure's routing rules, so `/catering` and refreshes work (replaces `vercel.json` on Azure). |

**Cost:** the Free plan is $0/month. It includes a custom domain (2 per app),
free SSL, and 100 GB of traffic a month. To move to Standard later, run
`./infra/setup-azure.sh --subscription <id> --sku Standard`.

---

## Before you start

1. **An Azure subscription.** Create one at https://portal.azure.com. The Free
   plan needs no paid resources. Copy the **Subscription ID**: in the portal,
   search for "Subscriptions" and open yours.
2. **Azure CLI:** `brew install azure-cli`
3. **GitHub CLI (recommended):** `brew install gh`, then `gh auth login`. This
   lets the script set the GitHub secret for you. Without it, the script tells
   you what to paste into GitHub settings.
4. **Access to your DNS provider** for 5spicemarket.com (needed for step 4).

## 1. Create the Azure resources

From the repo root:

```bash
./infra/setup-azure.sh --subscription <SUBSCRIPTION_ID> --site-mode live
```

Use `--site-mode coming_soon` if the site should show only the landing page.
It becomes the GitHub repo variable `VITE_APP_SITE_MODE`, which you can change
later without re-running setup.

The script signs you in to Azure if needed and creates:

- resource group `rg-5spice-web`
- Static Web App `swa-5spice-web` (Free)

Then it sets these in GitHub:

- secret `AZURE_STATIC_WEB_APPS_API_TOKEN`
- variable `VITE_APP_SITE_MODE`
- variable `AZURE_SWA_ENABLED=true`

At the end it prints a temporary address like
`https://<random-name>.azurestaticapps.net`.

## 2. First deploy

Deploys run from GitHub Actions. Either merge anything to `main`, or go to
GitHub → **Actions** → **Azure Static Web Apps**, open the latest `main` run,
and click **Re-run all jobs** (runs skipped before setup deploy on re-run).

## 3. Test on the temporary address

Check these before touching DNS:

- [ ] The home page loads in the right mode (live or coming soon).
- [ ] `/catering`, `/kitchen`, `/pickup`, and `/locations/murphy` load directly,
  and still work after a refresh.
- [ ] An unknown path like `/xyz` shows the site's "page not found" page.
- [ ] `/sitemap.xml`, `/robots.txt`, and `/weekly-deals.json` load as files.
- [ ] It looks right on a phone.

## 4. Switch the domain (this is the actual cutover)

Do `www` first, then the root domain:

```bash
./infra/add-custom-domain.sh www.5spicemarket.com
./infra/add-custom-domain.sh 5spicemarket.com
```

The script prints each DNS record to create and waits while you add it.

- **www:** a `CNAME` record pointing to the Azure address.
- **Root domain:** a `TXT` record to prove ownership, then an `ALIAS`/`ANAME`
  (or flattened `CNAME`) record pointing to the Azure address. If your DNS
  provider doesn't support those, redirect `5spicemarket.com` →
  `www.5spicemarket.com` at the provider instead.

**Cloudflare:** set both records to **DNS only** (grey cloud), not Proxied, or
Azure can't validate the domain or issue SSL. Cloudflare can't keep a CNAME next
to an `A` record for `@`, so delete the old `A @` record and add the `CNAME @`
right after. Keep the `_dnsauth` TXT record afterwards; Azure uses it to renew
the certificate. Don't touch the email records (`MX`, SPF/`MS=` TXT).

Azure issues SSL certificates automatically. Allow up to an hour.

## 5. After the switch

- Keep the Vercel project for about a week as a fallback. Pointing DNS back to
  Vercel undoes the move.
- Then disconnect or delete the Vercel project so `main` deploys only to Azure.
- **Analytics:** Vercel Web Analytics only runs on Vercel builds, so it turns
  off automatically on Azure. A replacement is tracked in `docs/NEXT-STEPS.md`.
- Update Google Search Console if the main address changes (e.g. to `www`).

## Undo / remove

To delete everything Azure-side (DNS changes aside):

```bash
az group delete --name rg-5spice-web
```
