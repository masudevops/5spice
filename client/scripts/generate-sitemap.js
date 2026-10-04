// Generates public/sitemap.xml from the location data before each build, so
// the sitemap can never drift out of sync with what's actually visible.
// Hidden locations are excluded automatically (getVisibleLocations).
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { getVisibleLocations, anyVisibleLocationHasFlag } from '../src/data/locations/index.js';

const SITE_URL = 'https://5spicemarket.com';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

const staticRoutes = [
    '/',
    '/locations',
    '/kitchen',
    '/catering',
    '/pickup',
    '/about',
    '/contact',
    ...(anyVisibleLocationHasFlag('hasMarket') ? ['/market'] : []),
    ...(anyVisibleLocationHasFlag('hasWeeklyDeals') ? ['/sales'] : []),
];

const locationRoutes = getVisibleLocations().flatMap((location) => {
    const routes = [`/locations/${location.slug}`];
    if (location.flags.hasKitchen) routes.push(`/locations/${location.slug}/menu`);
    return routes;
});

const allRoutes = [...staticRoutes, ...locationRoutes];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n')}
</urlset>
`;

writeFileSync(outputPath, xml);
console.log(`Generated sitemap.xml with ${allRoutes.length} routes.`);
