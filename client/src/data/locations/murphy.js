// 5Spice Kitchen — Murphy
//
// Landlord written approval for the "5Spice Kitchen" name was confirmed by
// the owners on 2026-10-13, so this location is publicly visible.
// Murphy is operating for catering now; dine-in and take-out are coming soon
// (see `services`).

export const murphy = {
    slug: 'murphy',
    displayName: '5Spice Kitchen',
    shortName: 'Murphy',
    type: 'kitchen-only',
    status: 'open',
    // Short badge text, and the longer line used in the location switcher.
    statusLabel: 'Catering Available Now',
    openingText: 'Catering Available Now · Dine-in & Take-out Coming Soon',
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
    hoursNote: 'Restaurant hours will be announced when dine-in opens. For catering, call or email us.',
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
    description: 'Our Murphy kitchen brings authentic halal Bangladeshi cuisine and South Asian favorites to Murphy, Texas. Catering is available now, with dine-in and take-out coming soon.',
    // Location-specific social pages (the brand pages live in config/site.js).
    socialLinks: {
        facebook: 'https://www.facebook.com/5SpiceKitchenMurphy/',
    },
    // PLACEHOLDER: replace with real Murphy photography once available.
    heroImage: '/brand-logo-wide.png',
};
