// 5Spice Kitchen — Murphy
//
// Landlord written approval for the "5Spice Kitchen" name was confirmed by
// the owners on 2026-10-13, so this location is publicly visible.
// Catering is open now; dine-in and take-out are coming soon (see `services`).

export const murphy = {
    slug: 'murphy',
    displayName: '5Spice Kitchen',
    shortName: 'Murphy',
    type: 'kitchen-only',
    status: 'coming-soon',
    // PLACEHOLDER: confirm wording with Branding & Marketing.
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
    // PLACEHOLDER: confirm official Murphy phone number before launch.
    phone: '',
    email: 'info@5spicemarket.com',
    // PLACEHOLDER: confirm real hours closer to launch.
    hours: [
        { day: 'Monday', hours: 'Hours coming soon' },
        { day: 'Tuesday', hours: 'Hours coming soon' },
        { day: 'Wednesday', hours: 'Hours coming soon' },
        { day: 'Thursday', hours: 'Hours coming soon' },
        { day: 'Friday', hours: 'Hours coming soon' },
        { day: 'Saturday', hours: 'Hours coming soon' },
        { day: 'Sunday', hours: 'Hours coming soon' },
    ],
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
    description: 'A dedicated 5Spice Kitchen bringing authentic halal Bangladeshi cuisine and South Asian favorites to Murphy, Texas.',
    // PLACEHOLDER: replace with real Murphy photography once available.
    heroImage: '/brand-logo-wide.png',
};
