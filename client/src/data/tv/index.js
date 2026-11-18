import { getLocationBySlug } from '../locations/index.js';
import { getMenuItem } from '../menus/index.js';
import { TV_MEDIA } from './media.js';
import { murphyTvScreens } from './murphy.js';

const SCREENS_BY_LOCATION = {
    murphy: murphyTvScreens,
};

// A TV screen ready to render: { location, title, columns: [{ title,
// featured: { item, media }, items }] }, or null if it isn't set up.
// Unknown dish ids are skipped so a typo can't break the board.
export const getTvScreen = (locationSlug, screenNumber) => {
    const location = getLocationBySlug(locationSlug);
    const screen = SCREENS_BY_LOCATION[locationSlug]?.[screenNumber];
    if (!location || !screen) return null;

    return {
        location,
        title: screen.title,
        columns: screen.columns.map((column) => {
            const featuredItem = getMenuItem(column.featured);
            return {
                title: column.title,
                featured: featuredItem && {
                    item: featuredItem,
                    media: TV_MEDIA[column.mediaId ?? column.featured] ?? null,
                },
                items: column.itemIds.map(getMenuItem).filter(Boolean),
            };
        }),
    };
};
