import { getDefaultLocation } from '../data/locations';
import { summarizeHours } from '../utils/hours';

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

// CONTACT and HOURS describe the primary/default visible location, derived
// from /src/data/locations so this file stays a single source of truth.
// They keep their original shape so existing consumers (Footer, Navbar,
// Contact, Pickup, LaunchLanding) don't need to change.
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

export const HOURS = primaryLocation ? summarizeHours(primaryLocation.hours) : [];

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
