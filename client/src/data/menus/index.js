import { SHARED_ITEMS } from './shared-items';
import { planoMenu } from './plano';
import { murphyMenu } from './murphy';

const MENUS_BY_SLUG = {
    plano: planoMenu,
    murphy: murphyMenu,
};

// Resolves a location's menu into fully-populated categories (itemIds ->
// item objects), merging in any location-only `items` defined inline.
export const getMenuByLocationSlug = (slug) => {
    const menu = MENUS_BY_SLUG[slug];
    if (!menu) return null;

    return {
        locationSlug: menu.locationSlug,
        halalStatement: menu.halalStatement,
        categories: menu.categories.map((category) => {
            const sharedItems = (category.itemIds ?? []).map((id) => SHARED_ITEMS[id]).filter(Boolean);
            const localItems = category.items ?? [];
            return {
                name: category.name,
                items: [...sharedItems, ...localItems],
            };
        }),
    };
};
