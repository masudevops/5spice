import { getLocationBySlug } from '../locations/index.js';
import { getMenuByLocationSlug, getMenuItem } from '../menus/index.js';
import { TV_MEDIA } from './media.js';
import { murphyDescribedDishes, murphyTvScreens } from './murphy.js';
import { PROMO_CAMPAIGNS } from './promotions.js';
import { SAMPLE_PRICES } from './sample-prices.js';

const TV_BY_LOCATION = {
    murphy: { screens: murphyTvScreens, describedDishes: murphyDescribedDishes },
};

// A TV screen ready to render, or null if it isn't set up. Always has
// { location, type, title }, plus by type (see tv/murphy.js):
//   menu      columns: [[{ title, items }]]
//   promo     campaigns: [{ enabled, schedule, slides: [{ ..., dish, media }] }]
// A promo slide without its own `media` uses the dish's entry in media.js.
// Unknown dish ids are skipped so a typo can't break a board. `preview`
// (layout previews only) fills missing prices with SAMPLE_PRICES.
export const getTvScreen = (locationSlug, screenNumber, { preview = false } = {}) => {
    const location = getLocationBySlug(locationSlug);
    const tv = TV_BY_LOCATION[locationSlug];
    const screen = tv?.screens[screenNumber];
    if (!location || !screen) return null;

    const described = new Set(tv.describedDishes);
    const dish = (id) => {
        const item = getMenuItem(id);
        if (!item) return null;
        return preview && item.price == null ? { ...item, price: SAMPLE_PRICES[id] ?? null } : item;
    };
    const dishes = (ids) => ids
        .map(dish)
        .filter(Boolean)
        .map((item) => ({ ...item, showDescription: described.has(item.id) }));
    const base = { location, type: screen.type, title: screen.title };

    if (screen.type === 'menu') {
        const menu = getMenuByLocationSlug(locationSlug);
        const sectionIds = (section) => {
            if (section.itemIds) return section.itemIds;
            const category = menu?.categories.find((entry) => entry.name === section.category);
            const source = section.group ? category?.groups.find((group) => group.name === section.group) : category;
            return source?.items.map((item) => item.id) ?? [];
        };
        return {
            ...base,
            columns: screen.columns.map((sections) => sections.map((section) => ({
                title: section.title ?? section.group ?? section.category,
                items: dishes(sectionIds(section)),
            }))),
        };
    }

    if (screen.type === 'promo') {
        return {
            ...base,
            campaigns: screen.campaigns
                .map((id) => PROMO_CAMPAIGNS[id])
                .filter(Boolean)
                .map((campaign) => ({
                    ...campaign,
                    slides: campaign.slides.map((slide) => ({
                        ...slide,
                        dish: slide.dishId ? dish(slide.dishId) : null,
                        media: slide.media ?? TV_MEDIA[slide.dishId] ?? null,
                    })),
                })),
        };
    }

    return null;
};
