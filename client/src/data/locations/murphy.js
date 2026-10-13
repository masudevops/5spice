// 5Spice Kitchen — Murphy
//
// Landlord written approval for the "5Spice Kitchen" name was confirmed by
// the owners on 2026-10-13, so this location is publicly visible.
// Murphy is the currently operating restaurant (see `services`).

export const murphy = {
    slug: 'murphy',
    displayName: '5Spice Kitchen',
    shortName: 'Murphy',
    type: 'kitchen-only',
    status: 'open',
    // Short badge text, and the longer line used in the location switcher.
    statusLabel: 'Now Serving',
    openingText: 'Now Serving',
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
    // Provided by the owners on 2026-10-13 as the Murphy kitchen/catering line.
    phone: '(917) 355-6995',
    email: 'info@5spicemarket.com',
    // PLACEHOLDER: add real hours, e.g. { day: 'Monday', hours: '11:00 AM – 9:00 PM' }.
    // While empty, the site shows `hoursNote` instead of an hours table.
    hours: [],
    hoursNote: 'Please call for current hours.',
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
        // Turn on once the Murphy menu is final.
        menuPublished: false,
    },
    // Per-service status: 'open' or 'coming-soon'. Shown as badges on the
    // location card and location page; catering 'open' also lists this
    // location on the Catering page.
    services: {
        dineIn: 'open',
        takeOut: 'open',
        catering: 'open',
    },
    // PLACEHOLDER: add live storefront URLs as each partner integration goes live.
    orderingLinks: {
        toast: '',
        uberEats: '',
        doorDash: '',
        instacart: '',
    },
    description: 'Our Murphy kitchen is now serving authentic halal Bangladeshi cuisine and South Asian favorites, with catering for weddings, family celebrations, and corporate events.',
    // PLACEHOLDER: replace with real Murphy photography once available.
    heroImage: '/brand-logo-wide.png',
};
