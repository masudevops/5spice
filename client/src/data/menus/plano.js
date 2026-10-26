// Restaurant menu for 5Spice Market & Kitchen — Plano.
// Items referenced by id come from shared-items.js; add a `items: [...]`
// array alongside `itemIds` on any category to include location-only dishes.
export const planoMenu = {
    locationSlug: 'plano',
    halalStatement: 'Every dish on this menu is 100% zabiha halal.',
    categories: [
        { name: 'Snacks', itemIds: ['fuchka', 'chotpoti', 'shingara', 'daal-puri'] },
        { name: 'Rice & Biriyani', itemIds: ['nawabi-beef-tehari', 'special-kachchi-biriyani', 'roast-polao'] },
        { name: 'Curries & Roasts', itemIds: ['royal-bengal-chicken-roast', 'chicken-curry', 'beef-kala-bhuna', 'beef-rezala', 'ilish-fish'] },
        { name: 'Tandoor & Rotisserie', itemIds: ['tandoori', 'special-rotisserie-chicken'] },
        { name: 'Breads & Sides', itemIds: ['porota', 'naan', 'alu-bhaji'] },
        { name: 'Desserts', itemIds: ['firni'] },
        { name: 'Drinks', itemIds: ['royal-desi-chai'] },
    ],
};
