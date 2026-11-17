// 5Spice Kitchen — Murphy
//
// Landlord written approval for the "5Spice Kitchen" name was confirmed by
// the owners on 2026-10-13, so this location is publicly visible.
// Murphy is opening soon (owners, 2026-11-17). Catering stays on behind the
// scenes (see `services`) so the Catering page keeps listing this location.

export const murphy = {
    slug: 'murphy',
    displayName: '5Spice Kitchen',
    shortName: 'Murphy',
    type: 'kitchen-only',
    status: 'coming-soon',
    // Short badge text, and the longer line used in the location switcher.
    statusLabel: 'Opening Soon',
    openingText: 'Opening Soon',
    cuisineTagline: 'Authentic Halal Bangladeshi Cuisine & South Asian Favorites',
    cuisines: ['Bangladeshi', 'Indian', 'Pakistani'],
    halal: true,
    address: {
        street: '222 E FM 544, Suite 200',
        city: 'Murphy',
        state: 'TX',
        stateName: 'Texas',
        zip: '75094',
        full: '222 E FM 544, Suite 200, Murphy, TX 75094',
    },
    // To be updated: the owners will share the official number. While empty,
    // the site shows "Phone: to be updated" and points people to email and
    // Facebook instead, and every call button stays hidden.
    phone: '',
    email: 'info@5spicemarket.com',
    // PLACEHOLDER: add real hours, e.g. { day: 'Monday', hours: '11:00 AM – 9:00 PM' }.
    // While empty, the site shows `hoursNote` instead of an hours table.
    hours: [],
    hoursNote: 'Hours will be announced closer to opening. For catering, email us or message us on Facebook.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=222%20E%20FM%20544%2C%20Suite%20200%2C%20Murphy%2C%20TX%2075094',
    // PLACEHOLDER: confirm exact coordinates for JSON-LD geo data.
    lat: null,
    lng: null,
    flags: {
        hasMarket: false,
        hasKitchen: true,
        hasWeeklyDeals: false,
        hasCatering: true,
        hasPickup: true,
        // Published 2026-11-02 (prices still to come; see docs/NEXT-STEPS.md).
        menuPublished: true,
    },
    // Per-service status: 'open' or 'coming-soon'. Catering 'open' lists this
    // location on the Catering page and turns on its catering contact links;
    // dine-in or take-out 'open' (with status 'open') turns on ordering.
    services: {
        catering: 'open',
        dineIn: 'coming-soon',
        takeOut: 'coming-soon',
    },
    // PLACEHOLDER: add live storefront URLs as each partner integration goes live.
    orderingLinks: {
        toast: '',
        uberEats: '',
        doorDash: '',
        instacart: '',
    },
    description: 'Our Murphy kitchen brings authentic halal Bangladeshi cuisine and South Asian favorites to Murphy, Texas.',
    // Location-specific social pages (the brand pages live in config/site.js).
    socialLinks: {
        facebook: 'https://www.facebook.com/5SpiceKitchenMurphy/',
    },
    // PLACEHOLDER: replace with real Murphy photography once available.
    heroImage: '/brand-logo-wide.png',
};
