# Testing 5spicemarket.com

## Before every PR

Run these in `client/`:

```bash
npm run lint
npm run build
npm run preview   # then click through the pages you changed, on desktop and phone widths
```

## Automated end-to-end tests: currently not working

The project is set up for [Playwright](https://playwright.dev/) tests
(`client/playwright.config.js` and `client/e2e/navigation.spec.js`). They
can't run yet, for two reasons:

- `@playwright/test` isn't installed, so `npm test` fails.
- `e2e/navigation.spec.js` was written for an earlier version of the site. It
  expects the old "5 Spice" titles and pages that have changed.

Fixing this is tracked in `docs/NEXT-STEPS.md` under "Working automated tests".
The plan is to add `@playwright/test` as a dev dependency and rewrite a small
set of tests covering:

- each route
- location status (Murphy and Plano)
- links
- both site modes

After that, the commands will be:

```bash
cd client
npm install
npx playwright install   # one-time browser download
npm run build            # tests run against the production build
npm test                 # serves it on :4173 and runs the tests
```
