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

export const CONTACT = {
    city: 'Plano, Texas',
    shortCity: 'Plano, TX',
    streetAddress: '245 Shiloh Rd',
    postalAddress: '245 Shiloh Rd, Plano, TX 75074',
    website: '5spicemarket.com',
    email: SOCIAL_LINKS.email,
    phoneLabel: 'Phone coming soon',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=245%20Shiloh%20Rd%2C%20Plano%2C%20TX%2075074',
};

export const HOURS = [
    { days: 'Mon - Thu', time: '9:00 AM - 10:00 PM' },
    { days: 'Fri - Sat', time: '9:00 AM - 11:00 PM' },
    { days: 'Sun', time: '9:00 AM - 10:00 PM' },
];

export const ORDER_PLATFORMS = [
    {
        name: 'Toast',
        label: 'Order on Toast',
        url: '',
        description: 'Order restaurant favorites for convenient pickup when our Toast storefront is available.',
    },
    {
        name: 'Uber Eats',
        label: 'Order on Uber Eats',
        url: '',
        description: 'Get 5Spice Kitchen meals delivered through Uber Eats when service begins.',
    },
    {
        name: 'DoorDash',
        label: 'Order on DoorDash',
        url: '',
        description: 'Enjoy delivery from 5Spice Kitchen through DoorDash when service begins.',
    },
    {
        name: 'Instacart',
        label: 'Shop on Instacart',
        url: '',
        description: 'Shop grocery favorites through Instacart when 5Spice Market delivery is available.',
    },
];

export const TRUST_SIGNALS = [
    'Zabiha Halal',
    'Fresh Fish',
    'Plano, Texas',
    'Catering Available',
    'Office Lunch Available',
    'Grocery + Restaurant',
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
        text: 'Traditional flavors prepared for families who want food that feels familiar and generous.',
    },
    {
        category: 'Grill & Family Meals',
        title: 'Fresh Grills, Kababs & Shareable Plates',
        text: 'Prepared meals and family-style options designed for easy weeknight dinners and gatherings.',
    },
    {
        category: 'Snacks, Sides & Drinks',
        title: 'Everyday Restaurant Favorites',
        text: 'Tea, drinks, snacks, sides, and familiar bites to pair with market trips or family meals.',
    },
];

export const QUICK_MEAL_ITEMS = [
    'One-bowl meals',
    'Meat shawarma over rice',
    'Meat shawarma sandwich',
    'Meat shawarma roll',
    'Wings',
    'Fries, nuggets, and salad sides',
    'Half shawarma meals without sides',
    'Fast lunch bundles for office teams',
];

export const SIGNATURE_ADD_ONS = [
    '5Spice sweets',
    'Spring rolls',
    'Extra rice or naan',
];

export const OFFERINGS = [
    {
        title: 'Premium Halal Market',
        shortTitle: 'Halal Market',
        text: 'Premium zabiha halal meat, fresh fish, farm-fresh produce, and carefully sourced specialty groceries—all under one roof.',
    },
    {
        title: 'Fresh Restaurant',
        shortTitle: 'Restaurant',
        text: 'Freshly prepared meals, family favorites, quick lunches, and the flavors your family remembers.',
    },
    {
        title: 'Serving the DFW Community',
        shortTitle: 'DFW Community',
        text: 'Proudly serving the Bangladeshi, Pakistani, Indian, Middle Eastern, and Greater DFW communities.',
    },
];
