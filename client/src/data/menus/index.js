import { SHARED_ITEMS } from './shared-items';
import { planoMenu } from './plano';
import { murphyMenu } from './murphy';

const MENUS_BY_SLUG = {
    plano: planoMenu,
    murphy: murphyMenu,
};

const resolveItems = ({ itemIds = [], items = [] }) => [
    ...itemIds.map((id) => SHARED_ITEMS[id]).filter(Boolean),
    ...items,
];

// Resolves a location's menu into fully-populated categories (itemIds ->
// item objects), merging in any location-only `items` defined inline.
// Every category comes back with `groups` (one unnamed group when the
// category isn't split into Chicken / Beef / … groups) and `items`, all of
// its dishes in order.
export const getMenuByLocationSlug = (slug) => {
    const menu = MENUS_BY_SLUG[slug];
    if (!menu) return null;

    return {
        locationSlug: menu.locationSlug,
        halalStatement: menu.halalStatement,
        categories: menu.categories.map((category) => {
            const groups = category.groups
                ? category.groups.map((group) => ({ name: group.name, items: resolveItems(group) }))
                : [{ name: null, items: resolveItems(category) }];
            return {
                name: category.name,
                groups,
                items: groups.flatMap((group) => group.items),
            };
        }),
    };
};
