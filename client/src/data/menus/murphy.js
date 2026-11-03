// Restaurant menu for 5Spice Kitchen — Murphy.
// Items referenced by id come from shared-items.js; add a `items: [...]`
// array alongside `itemIds` on any category to include location-only dishes.
// A category can be split into smaller headed groups (e.g. Chicken, Beef) with
// `groups: [{ name, itemIds }]` instead of `itemIds`.
export const murphyMenu = {
    locationSlug: 'murphy',
    halalStatement: 'Every dish on this menu is 100% zabiha halal.',
    categories: [
        {
            name: 'Biryani & Rice Dishes',
            groups: [
                { name: 'Chicken', itemIds: ['chicken-biryani', 'morog-polao', 'shahi-chicken-biryani'] },
                { name: 'Beef', itemIds: ['beef-tehari', 'beef-biryani', 'shahi-beef-biryani', 'beef-kachchi', 'beef-haji-biryani'] },
                { name: 'Mutton', itemIds: ['mutton-kachchi', 'mutton-biryani', 'mutton-haji-biryani', 'shahi-mutton-biryani'] },
                { name: 'Other Rice Dishes', itemIds: ['plain-polao', 'bhuna-khichuri', 'basmati-rice'] },
            ],
        },
        { name: 'Chicken Curries & Specialties', itemIds: ['chicken-curry', 'chicken-bhuna', 'chicken-roast', 'karahi-chicken', 'chicken-korma'] },
        { name: 'Beef Curries & Specialties', itemIds: ['beef-curry', 'beef-bhuna', 'beef-kala-bhuna'] },
        { name: 'Mutton Curries & Specialties', itemIds: ['mutton-curry', 'mutton-bhuna'] },
        { name: 'Vegetables & Sides', itemIds: ['mixed-vegetables', 'chinese-vegetables-with-shrimp', 'dal'] },
        { name: 'Kebabs', itemIds: ['beef-tikka-kebab'] },
        { name: 'Desserts', itemIds: ['firni', 'jarda'] },
        { name: 'Breakfast', itemIds: ['paratha-roti', 'dim-bhaji', 'aloo-bhaji', 'mixed-vegetables', 'dal-gosht', 'halwa'] },
        { name: 'Drinks', itemIds: ['special-chai', 'mango-lassi', 'borhani'] },
    ],
};
