// Restaurant menu for 5Spice Market & Kitchen — Plano.
// Items referenced by id come from shared-items.js; add a `items: [...]`
// array alongside `itemIds` on any category to include location-only dishes.
export const planoMenu = {
    locationSlug: 'plano',
    halalStatement: 'Every dish on this menu is 100% zabiha halal.',
    categories: [
        { name: 'Starters', itemIds: ['veg-samosa', 'chicken-pakora', 'papadum'] },
        { name: 'Biryani & Rice', itemIds: ['kacchi-biryani', 'chicken-biryani', 'vegetable-pulao'] },
        { name: 'Curries', itemIds: ['beef-bhuna', 'fish-curry', 'butter-chicken', 'chana-masala', 'chicken-karahi'] },
        { name: 'Kebabs & Grill', itemIds: ['chicken-tikka-kebab', 'seekh-kebab', 'tandoori-chicken'] },
        { name: 'Breads', itemIds: ['naan', 'garlic-naan', 'paratha'] },
        { name: 'Desserts', itemIds: ['gulab-jamun', 'roshmalai'] },
        { name: 'Drinks', itemIds: ['mango-lassi', 'masala-chai', 'borhani'] },
    ],
};
