import { getDefaultLocation } from '../data/locations';

export const SITE_MODE = import.meta.env.VITE_APP_SITE_MODE || 'live';

export const isComingSoonMode = SITE_MODE === 'coming_soon';
export const isGrandOpeningMode = SITE_MODE === 'grand_opening';

export const LOGOS = {
    square: '/brand-logo-square.png',
    wide: '/brand-logo-wide.png',
};

export const SOCIAL_LINKS = {
    facebook: 'https://facebook.com/5SpiceMarket',
    instagramUrl: 'https://instagram.com/5SpiceMarket',
    instagramHandle: '@5SpiceMarket',
    email: 'info@5spicemarket.com',
};

// Dedicated inbox for catering requests (Catering page, location pages).
export const CATERING_EMAIL = 'catering@5spicemarket.com';

// CONTACT describes the primary/default visible location (the first entry in
// /src/data/locations), so this file stays a single source of truth.
const primaryLocation = getDefaultLocation();

export const CONTACT = primaryLocation
    ? {
        city: `${primaryLocation.address.city}, ${primaryLocation.address.stateName}`,
        shortCity: `${primaryLocation.address.city}, ${primaryLocation.address.state}`,
        streetAddress: primaryLocation.address.street,
        postalAddress: primaryLocation.address.full,
        website: '5spicemarket.com',
        email: primaryLocation.email || SOCIAL_LINKS.email,
        phoneLabel: primaryLocation.phone || 'Phone coming soon',
        mapsUrl: primaryLocation.googleMapsUrl,
    }
    : {
        city: '',
        shortCity: '',
        streetAddress: '',
        postalAddress: '',
        website: '5spicemarket.com',
        email: SOCIAL_LINKS.email,
        phoneLabel: 'Phone coming soon',
        mapsUrl: '',
    };

export const ORDER_PLATFORMS = [
    {
        name: 'Toast',
        label: 'Order on Toast',
        url: '',
        description: 'Order restaurant favorites for pickup through our Toast storefront.',
    },
    {
        name: 'Uber Eats',
        label: 'Order on Uber Eats',
        url: '',
        description: 'Get 5Spice Kitchen meals delivered through Uber Eats.',
    },
    {
        name: 'DoorDash',
        label: 'Order on DoorDash',
        url: '',
        description: 'Get 5Spice Kitchen meals delivered through DoorDash.',
    },
    {
        name: 'Instacart',
        label: 'Shop on Instacart',
        url: '',
        description: 'Shop 5Spice Market groceries for delivery through Instacart.',
    },
];

export const MARKET_DEPARTMENTS = [
    {
        title: 'Premium Zabiha Halal Meat',
        text: 'Fresh cuts selected for everyday cooking, family meals, and special gatherings.',
        items: ['Chicken, beef, goat, and lamb', 'Family-pack cuts', 'Grill-ready selections'],
    },
    {
        title: 'Fresh Fish & Seafood',
        text: 'Whole fish and seafood essentials for South Asian, Middle Eastern, and family-style cooking.',
        items: ['Whole fish', 'Seafood staples', 'Curry-ready favorites'],
    },
    {
        title: 'Farm-Fresh Produce',
        text: 'Vegetables, herbs, fruits, and seasonal produce for the recipes your family makes at home.',
        items: ['Fresh vegetables', 'Herbs and chilies', 'Seasonal fruit'],
    },
    {
        title: 'Rice, Spices & Pantry',
        text: 'Basmati rice, spice blends, lentils, oils, snacks, frozen items, and specialty groceries.',
        items: ['Rice and lentils', 'Spices and oils', 'Snacks and pantry staples'],
    },
    {
        title: 'Frozen Favorites',
        text: 'Frozen snacks, breads, vegetables, ready-to-cook items, and family freezer staples.',
        items: ['Frozen snacks', 'Breads and paratha', 'Ready-to-cook staples'],
    },
    {
        title: 'Sweets & Snacks',
        text: 'Sweet treats, savory snacks, tea-time favorites, and small bites for family visits.',
        items: ['Traditional sweets', 'Savory snacks', 'Tea-time favorites'],
    },
];

export const MENU_HIGHLIGHTS = [
    {
        category: 'Bangladeshi Favorites',
        title: 'Biryani, Curry & Comfort Dishes',
        text: 'Traditional flavors that taste like home, served generously.',
    },
    {
        category: 'Grill & Family Meals',
        title: 'Fresh Grills, Kebabs & Shareable Plates',
        text: 'Family-style dishes made for weeknight dinners and weekend gatherings.',
    },
    {
        category: 'Snacks, Sides & Drinks',
        title: 'Everyday Restaurant Favorites',
        text: 'Tea, drinks, snacks, and sides to round out any meal.',
    },
];

export const OFFERINGS = [
    {
        title: 'Premium Halal Market',
        shortTitle: 'Halal Market',
        text: 'Coming to Plano in early 2027: Zabiha halal meat, fresh seafood, farm-fresh produce, and specialty groceries under one roof.',
    },
    {
        title: 'Authentic Bangladeshi Kitchen',
        shortTitle: 'Restaurant',
        text: 'Biryani, curries, grills, and the family favorites you grew up with. Catering is available now from our Murphy kitchen.',
    },
    {
        title: 'Serving the DFW Community',
        shortTitle: 'DFW Community',
        text: 'Rooted in Bangladeshi tradition and proud to welcome Pakistani, Indian, Middle Eastern, and all DFW families.',
    },
];
