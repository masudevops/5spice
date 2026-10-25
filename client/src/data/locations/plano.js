// 5Spice Market & Kitchen — Plano
// This is the flagship market + restaurant location. See /src/data/README.md
// for how to edit this file safely.

export const plano = {
    slug: 'plano',
    displayName: '5Spice Market & Kitchen',
    shortName: 'Plano',
    type: 'market-and-kitchen',
    status: 'coming-soon',
    // Short badge text, and the longer line used across the site.
    statusLabel: 'Coming Early 2027',
    openingText: 'Opening Early 2027, In Sha Allah',
    cuisineTagline: 'Authentic Halal Bangladeshi Cuisine & South Asian Favorites',
    cuisines: ['Bangladeshi', 'Indian', 'Pakistani'],
    halal: true,
    address: {
        street: '245 Shiloh Rd',
        city: 'Plano',
        state: 'TX',
        stateName: 'Texas',
        zip: '75074',
        full: '245 Shiloh Rd, Plano, TX 75074',
    },
    // PLACEHOLDER: confirm official Plano phone number before launch.
    phone: '',
    email: 'info@5spicemarket.com',
    // PLACEHOLDER: add confirmed opening-day hours closer to launch, e.g.
    // { day: 'Monday', hours: '9:00 AM – 10:00 PM' }. While empty, the site
    // shows `hoursNote` instead of an hours table.
    hours: [],
    hoursNote: 'Hours will be announced closer to opening.',
    googleMapsUrl: 'https://maps.app.goo.gl/3gQk43jHohFboJWV9',
    // PLACEHOLDER: confirm exact coordinates for JSON-LD geo data.
    lat: null,
    lng: null,
    flags: {
        hasMarket: true,
        hasKitchen: true,
        hasWeeklyDeals: true,
        hasCatering: true,
        hasPickup: true,
        // Turn on once the Plano menu is final.
        menuPublished: false,
    },
    // PLACEHOLDER: add live storefront URLs as each partner integration goes live.
    orderingLinks: {
        toast: '',
        uberEats: '',
        doorDash: '',
        instacart: '',
    },
    description: 'Our upcoming flagship halal grocery and restaurant will bring Zabiha halal meat, fresh seafood, farm-fresh produce, specialty groceries, and authentic Bangladeshi cuisine with South Asian favorites to Plano, Texas.',
    // PLACEHOLDER: replace with real Plano photography once available.
    heroImage: '/brand-logo-wide.png',
};
