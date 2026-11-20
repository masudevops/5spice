// TV screens at 5Spice Kitchen — Murphy, one entry per TV.
// TV 1 is at /tv/murphy/1, TV 2 at /tv/murphy/2, and so on. To add a TV, add
// the next number here.
//
// Each screen has a `type`:
//
//   'menu'      Text-only menu board (large type, two columns).
//               columns: two lists of sections. A section is either
//                 { category: 'Biriyani & Rice Dishes', group: 'Chicken' }
//               which lists that part of the Murphy menu (menus/murphy.js),
//               so new dishes appear automatically, or
//                 { title: 'Our Favorites', itemIds: ['beef-kachchi', ...] }
//               Optional `title` renames a section. Dishes that don't fit
//               are left out whole (never cut in half).
//
//   'promo'     Marketing slides (photos, videos, specials).
//               campaigns: campaign ids from promotions.js, played in order.
//               fallback: optional campaign ids played when none of
//               `campaigns` is live (e.g. outside every meal window).
//               With nothing live at all, a 5Spice brand slide shows.
//
// Dish names, descriptions, and prices come from menus/shared-items.js.
// Prices stay hidden until a dish has one. Menu TVs list only dishes on the
// restaurant menu (menus/murphy.js), never catering-only ones (catering.js).
// Dishes that show their description on menu boards: ones whose name alone
// may not tell guests what they are. The rest stay name-only so the text can
// be large.
export const murphyDescribedDishes = [
    'beef-tehari', 'morog-polao', 'mutton-haji-biryani', 'bhuna-khichuri', 'plain-polao',
    'beef-kala-bhuna', 'dal', 'fuchka', 'piaju', 'puri',
    'dim-bhaji', 'aloo-bhaji', 'dal-gosht', 'jarda', 'borhani', 'special-chai',
];

export const murphyTvScreens = {
    1: {
        type: 'menu',
        title: 'Biriyani & Rice',
        columns: [
            [
                { category: 'Biriyani & Rice Dishes', group: 'Chicken' },
                { category: 'Biriyani & Rice Dishes', group: 'Beef' },
            ],
            [
                { category: 'Biriyani & Rice Dishes', group: 'Mutton' },
                { category: 'Biriyani & Rice Dishes', group: 'Other Rice Dishes', title: 'Rice' },
            ],
        ],
    },
    2: {
        type: 'menu',
        title: 'Curries, Kebabs & Sides',
        columns: [
            [
                { category: 'Chicken Curries & Specialties', title: 'Chicken' },
                { category: 'Beef Curries & Specialties', title: 'Beef' },
            ],
            [
                { category: 'Mutton Curries & Specialties', title: 'Mutton' },
                { category: 'Kebabs' },
                { category: 'Vegetables & Sides' },
            ],
        ],
    },
    3: {
        type: 'menu',
        title: 'Breakfast, Snacks, Sweets & Drinks',
        columns: [
            [
                { category: 'Breakfast' },
                { category: 'Desserts' },
            ],
            [
                { category: 'Snacks' },
                { category: 'Drinks' },
            ],
        ],
    },
    4: {
        type: 'promo',
        title: 'Signature Dishes',
        campaigns: ['signature-dishes'],
    },
    5: {
        type: 'promo',
        title: 'Meal Specials',
        campaigns: ['breakfast', 'lunch', 'dinner', 'todays-specials', 'special-offers', 'seasonal'],
        fallback: ['signature-dishes'],
    },
    6: {
        type: 'promo',
        title: 'Catering & Community',
        campaigns: ['catering', 'community', 'brand'],
    },
};
