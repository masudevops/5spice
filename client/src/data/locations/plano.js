// 5Spice Market & Kitchen — Plano
// This is the flagship market + restaurant location. See /src/data/README.md
// for how to edit this file safely.

export const plano = {
    slug: 'plano',
    displayName: '5Spice Market & Kitchen',
    shortName: 'Plano',
    type: 'market-and-kitchen',
    status: 'coming-soon',
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
    // PLACEHOLDER: confirm real opening-day hours closer to launch.
    hours: [
        { day: 'Monday', hours: '9:00 AM – 10:00 PM' },
        { day: 'Tuesday', hours: '9:00 AM – 10:00 PM' },
        { day: 'Wednesday', hours: '9:00 AM – 10:00 PM' },
        { day: 'Thursday', hours: '9:00 AM – 10:00 PM' },
        { day: 'Friday', hours: '9:00 AM – 11:00 PM' },
        { day: 'Saturday', hours: '9:00 AM – 11:00 PM' },
        { day: 'Sunday', hours: '9:00 AM – 10:00 PM' },
    ],
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=245%20Shiloh%20Rd%2C%20Plano%2C%20TX%2075074',
    // PLACEHOLDER: confirm exact coordinates for JSON-LD geo data.
    lat: null,
    lng: null,
    flags: {
        hasMarket: true,
        hasKitchen: true,
        hasWeeklyDeals: true,
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
    description: 'Our flagship halal grocery and restaurant, bringing premium zabiha halal meat, fresh fish, farm-fresh produce, and authentic Bangladeshi cuisine to Plano, Texas.',
    // PLACEHOLDER: replace with real Plano photography once available.
    heroImage: '/brand-logo-wide.png',
};
