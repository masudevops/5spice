// Catering menu, shared by every location that offers catering.
//
// Kept separate from the restaurant menus (murphy.js / plano.js) so catering
// and day-to-day dishes can differ. PLACEHOLDER (2026-11-17): for now it's
// the same list as Murphy's restaurant menu; the owners will send catering-
// specific changes.
//
// Same format as the location menus: categories list dish ids from
// shared-items.js, and a category can add catering-only dishes with an
// `items: [...]` array. Set `published` to false to hide the catering menu
// page and its links.
export const cateringMenu = {
    published: true,
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
        { name: 'Snacks', itemIds: ['fuchka', 'piaju', 'puri', 'samusa'] },
        { name: 'Desserts', itemIds: ['firni', 'jarda'] },
        { name: 'Breakfast', itemIds: ['paratha-roti', 'dim-bhaji', 'aloo-bhaji', 'mixed-vegetables', 'dal-gosht', 'halwa'] },
        { name: 'Drinks', itemIds: ['special-chai', 'mango-lassi', 'borhani'] },
    ],
};
