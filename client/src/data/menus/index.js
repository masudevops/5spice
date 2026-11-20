import { SHARED_ITEMS } from './shared-items.js';
import { planoMenu } from './plano.js';
import { murphyMenu } from './murphy.js';
import { cateringMenu } from './catering.js';

const MENUS_BY_SLUG = {
    plano: planoMenu,
    murphy: murphyMenu,
};

const resolveItems = ({ itemIds = [], items = [] }) => [
    ...itemIds.map((id) => SHARED_ITEMS[id]).filter(Boolean),
    ...items,
];

// Resolves a menu into fully-populated categories (itemIds -> item objects),
// merging in any menu-only `items` defined inline. Every category comes back
// with `groups` (one unnamed group when the category isn't split into
// Chicken / Beef / … groups) and `items`, all of its dishes in order.
const resolveMenu = (menu) => ({
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
});

// A location's day-to-day restaurant menu.
export const getMenuByLocationSlug = (slug) => {
    const menu = MENUS_BY_SLUG[slug];
    if (!menu) return null;
    return { locationSlug: menu.locationSlug, ...resolveMenu(menu) };
};

// The catering menu is public when it's published (see catering.js).
export const hasPublicCateringMenu = () => Boolean(cateringMenu.published);

// The catering menu (separate from the restaurant menus), or null when it's
// not published.
// One dish (name, description, price, tags) by id, or null. The TV menu
// boards read dishes only through this, so it's the one place to switch them
// to Toast POS data later.
export const getMenuItem = (id) => SHARED_ITEMS[id] ?? null;

// Restaurant prices never show on the catering menu: catering is priced by
// quote (catering-specific prices can be added here later).
const withoutPrices = (menu) => ({
    ...menu,
    categories: menu.categories.map((category) => ({
        ...category,
        groups: category.groups.map((group) => ({ ...group, items: group.items.map((item) => ({ ...item, price: null })) })),
        items: category.items.map((item) => ({ ...item, price: null })),
    })),
});

export const getCateringMenu = () => (hasPublicCateringMenu() ? withoutPrices(resolveMenu(cateringMenu)) : null);
