import { getLocationBySlug } from '../locations/index.js';
import { getMenuByLocationSlug, getMenuItem } from '../menus/index.js';
import { STOCK_MEDIA, TV_MEDIA } from './media.js';
import { murphyDescribedDishes, murphyTvScreens } from './murphy.js';
import { PROMO_CAMPAIGNS } from './promotions.js';
import { SAMPLE_PRICES } from './sample-prices.js';

const TV_BY_LOCATION = {
    murphy: { screens: murphyTvScreens, describedDishes: murphyDescribedDishes },
};

// A TV screen ready to render, or null if it isn't set up. Always has
// { location, type, title, preview }, plus by type (see tv/murphy.js):
//   menu      columns: [[{ title, items }]]
//   promo     campaigns, fallback: [{ enabled, schedule, slides: [{ ..., dish, dishes, media }] }]
// Unknown dish ids are skipped so a typo can't break a board. `preview`
// (layout previews only) fills missing prices with SAMPLE_PRICES, uses
// STOCK_MEDIA photos where 5Spice has none yet, and includes `sample`
// campaigns. The live TVs get none of these.
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
    const base = { location, type: screen.type, title: screen.title, preview };

    if (screen.type === 'menu') {
        // Restaurant menu only: catering-only dishes never reach a menu TV.
        const menu = getMenuByLocationSlug(locationSlug);
        const onMenu = new Set(menu?.categories.flatMap((category) => category.items.map((item) => item.id)));
        const sectionIds = (section) => {
            if (section.itemIds) return section.itemIds.filter((id) => onMenu.has(id));
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
        const media = (slide) => {
            const key = slide.mediaKey ?? slide.dishId;
            return slide.media ?? TV_MEDIA[key] ?? (preview ? STOCK_MEDIA[key] : null) ?? null;
        };
        const campaigns = (ids = []) => ids
            .map((id) => PROMO_CAMPAIGNS[id])
            .filter((campaign) => campaign && (preview || !campaign.sample))
            .map((campaign) => ({
                ...campaign,
                slides: campaign.slides
                    .filter((slide) => preview || !slide.sample)
                    .map((slide) => ({
                        ...slide,
                        sample: Boolean(campaign.sample || slide.sample),
                        dish: slide.dishId ? dish(slide.dishId) : null,
                        dishes: slide.dishIds ? dishes(slide.dishIds) : [],
                        endDate: slide.schedule?.endDate ?? campaign.schedule?.endDate ?? null,
                        media: media(slide),
                    })),
            }));
        return { ...base, campaigns: campaigns(screen.campaigns), fallback: campaigns(screen.fallback) };
    }

    return null;
};
