import { plano } from './plano.js';
import { murphy } from './murphy.js';

// Add a new location by creating a file next to this one (copy plano.js or
// murphy.js as a starting point) and adding it to this array.
// Order matters: the first visible location is the site-wide default (location
// switcher, Order Online, Kitchen), so the operating location goes first.
export const LOCATIONS = [murphy, plano];

export const getAllLocations = () => LOCATIONS;

export const getVisibleLocations = () => LOCATIONS.filter((location) => location.status !== 'hidden');

export const getLocationBySlug = (slug) => LOCATIONS.find((location) => location.slug === slug);

export const getVisibleLocationBySlug = (slug) => getVisibleLocations().find((location) => location.slug === slug);

export const getDefaultLocation = () => getVisibleLocations()[0] ?? null;

export const anyVisibleLocationHasFlag = (flagKey) =>
    getVisibleLocations().some((location) => Boolean(location.flags[flagKey]));

// A location's full menu page is public only when it has a kitchen AND the
// owners have turned on `flags.menuPublished`. While it's false, every
// "View Menu" link, the /locations/<slug>/menu page, the sitemap entry, and
// the JSON-LD `hasMenu` field are hidden.
export const hasPublicMenu = (location) => Boolean(location?.flags.hasKitchen && location.flags.menuPublished);

// Locations currently open to customers (status 'open').
export const getOpenLocations = () => getVisibleLocations().filter((location) => location.status === 'open');

// True when a location takes everyday restaurant orders (dine-in or
// take-out), not just catering. Drives "Order from …" buttons and the
// call-to-order prompts.
export const takesRestaurantOrders = (location) =>
    location?.status === 'open'
    && (!location.services || location.services.dineIn === 'open' || location.services.takeOut === 'open');

export const getOrderingLocations = () => getVisibleLocations().filter(takesRestaurantOrders);

// Locations announced but not yet open (status 'coming-soon').
export const getUpcomingLocations = () => getVisibleLocations().filter((location) => location.status === 'coming-soon');

// Locations currently taking catering orders (services.catering === 'open').
export const getCateringOpenLocations = () =>
    getVisibleLocations().filter((location) => location.services?.catering === 'open');

// Customer-facing name, e.g. "5Spice Kitchen – Murphy".
export const getLocationLabel = (location) => `${location.displayName} – ${location.shortName}`;

// Locations with at least one verified catering milestone to show
// (see `cateringStats` in the location file).
export const getCateringStatsLocations = () =>
    getVisibleLocations().filter((location) => location.cateringStats
        && (location.cateringStats.guestsServed != null || location.cateringStats.eventsCompleted != null));
