// 5Spice Kitchen — Murphy
//
// IMPORTANT: status is "coming-soon" right now ONLY for local review purposes.
// Per CLAUDE.md, this location must stay "hidden" in any real/production
// deployment until the owners confirm written landlord approval for the name
// change. See the "Before deploying to production" checklist in
// /src/data/README.md — do not skip it.

export const murphy = {
    slug: 'murphy',
    displayName: '5Spice Kitchen',
    shortName: 'Murphy',
    type: 'kitchen-only',
    status: 'coming-soon',
    // PLACEHOLDER: confirm real opening timeframe.
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
