// TV menu boards at 5Spice Kitchen — Murphy, one entry per TV.
// TV 1 is at /tv/murphy/1, TV 2 at /tv/murphy/2, and so on. To add a TV, add
// the next number here.
//
// Each screen has a title and three columns. Each column has:
//   title      heading shown above the column
//   featured   dish id shown large, with its photo or video (see media.js)
//   mediaId    optional: use this media entry instead of the dish's own
//   itemIds    dishes listed below it (4 fit with descriptions)
//
// Dish ids, names, descriptions, and prices come from menus/shared-items.js.
// Prices stay hidden until a dish has one.
// The dish groupings below are a starting point for the owners to adjust.
export const murphyTvScreens = {
    1: {
        title: 'Biryani, Curries & Snacks',
        columns: [
            {
                title: 'Biryani & Rice',
                featured: 'beef-kachchi',
                itemIds: ['chicken-biryani', 'beef-tehari', 'morog-polao', 'shahi-chicken-biryani'],
            },
            {
                title: 'Curries & Specialties',
                featured: 'chicken-roast',
                itemIds: ['beef-kala-bhuna', 'chicken-korma', 'karahi-chicken', 'beef-bhuna'],
            },
            {
                title: 'Snacks & Drinks',
                featured: 'fuchka',
                itemIds: ['piaju', 'samusa', 'special-chai', 'mango-lassi'],
            },
        ],
    },
    2: {
        title: 'Biryani, Curries & Kebabs',
        columns: [
            {
                title: 'Beef & Mutton Biryani',
                featured: 'mutton-kachchi',
                itemIds: ['beef-biryani', 'shahi-beef-biryani', 'mutton-biryani', 'mutton-haji-biryani'],
            },
            {
                title: 'Home-Style Curries',
                featured: 'mutton-bhuna',
                itemIds: ['chicken-curry', 'chicken-bhuna', 'beef-curry', 'mutton-curry'],
            },
            {
                title: 'Kebabs & Snacks',
                featured: 'beef-tikka-kebab',
                itemIds: ['puri', 'samusa', 'piaju', 'fuchka'],
            },
        ],
    },
    3: {
        title: 'Breakfast, Sides & Sweets',
        columns: [
            {
                title: 'Breakfast',
                featured: 'paratha-roti',
                itemIds: ['dim-bhaji', 'aloo-bhaji', 'dal-gosht', 'halwa'],
            },
            {
                title: 'Rice & Sides',
                featured: 'bhuna-khichuri',
                itemIds: ['plain-polao', 'dal', 'mixed-vegetables', 'chinese-vegetables-with-shrimp'],
            },
            {
                title: 'Desserts & Drinks',
                featured: 'firni',
                itemIds: ['jarda', 'borhani', 'mango-lassi', 'special-chai'],
            },
        ],
    },
};
