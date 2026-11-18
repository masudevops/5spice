import { getLocationBySlug } from '../locations/index.js';
import { getMenuItem } from '../menus/index.js';
import { TV_MEDIA } from './media.js';
import { murphyDescribedDishes, murphyTvScreens } from './murphy.js';
import { SAMPLE_PRICES } from './sample-prices.js';

const TV_BY_LOCATION = {
    murphy: { screens: murphyTvScreens, describedDishes: murphyDescribedDishes },
};

// A TV screen ready to render: { location, title, columns: [{ title,
// featured: { item, media }, items: [{ ...dish, showDescription }] }] },
// or null if it isn't set up. Unknown dish ids are skipped so a typo can't
// break the board. `samplePrices` fills missing prices with SAMPLE_PRICES
// (layout previews only).
export const getTvScreen = (locationSlug, screenNumber, { samplePrices = false } = {}) => {
    const location = getLocationBySlug(locationSlug);
    const tv = TV_BY_LOCATION[locationSlug];
    const screen = tv?.screens[screenNumber];
    if (!location || !screen) return null;

    const described = new Set(tv.describedDishes);
    const dish = (id) => {
        const item = getMenuItem(id);
        if (!item) return null;
        return samplePrices && item.price == null ? { ...item, price: SAMPLE_PRICES[id] ?? null } : item;
    };

    return {
        location,
        title: screen.title,
        columns: screen.columns.map((column) => {
            const featuredItem = dish(column.featured);
            return {
                title: column.title,
                featured: featuredItem && {
                    item: featuredItem,
                    media: TV_MEDIA[column.mediaId ?? column.featured] ?? null,
                },
                items: column.itemIds
                    .map(dish)
                    .filter(Boolean)
                    .map((item) => ({ ...item, showDescription: described.has(item.id) })),
            };
        }),
    };
};
