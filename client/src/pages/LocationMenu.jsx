import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Search, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import NotFound from './NotFound';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { getVisibleLocationBySlug, hasPublicMenu, takesRestaurantOrders } from '../data/locations';
import { getMenuByLocationSlug } from '../data/menus';
import { buildSearchIndex, matchesSearch } from '../utils/menuSearch';

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Filter buttons, shown only when at least one dish on the menu has the tag.
const FILTERS = [
    { key: 'special', label: '5Spice Specials', test: (item) => Boolean(item.special) },
    { key: 'vegetarian', label: 'Vegetarian', test: (item) => item.dietary?.includes('vegetarian') },
    { key: 'spicy', label: 'Spicy', test: (item) => item.dietary?.includes('spicy') },
];

const TAG_LABELS = { vegetarian: 'Vegetarian', spicy: 'Spicy' };
const RESTAURANT_ORDER_KEYS = ['toast', 'uberEats', 'doorDash'];

// Height of the site header (where the sticky category bar sticks), and
// where the bar ends once it's stuck; sections scroll to just below it.
const headerOffset = (nav) => (nav ? parseFloat(window.getComputedStyle(nav).top) || 0 : 96);
const stickyOffset = (nav) => headerOffset(nav) + (nav?.offsetHeight ?? 0) + 12;

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LocationMenu = () => {
    const { slug } = useParams();
    const { selectLocation } = useSelectedLocation();

    const location = getVisibleLocationBySlug(slug);
    const menu = hasPublicMenu(location) ? getMenuByLocationSlug(slug) : null;

    useDocumentHead(
        location && menu
            ? {
                title: `${location.displayName} Menu | Halal Bangladeshi Cuisine in ${location.address.city}, TX`,
                description: `${menu.halalStatement} Browse the full ${location.displayName} menu of Bangladeshi cuisine and South Asian favorites.`,
            }
            : { title: 'Menu Not Found | 5Spice', noindex: true }
    );

    const [query, setQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [headerHeight, setHeaderHeight] = useState(null);

    const navRef = useRef(null);
    const chipRowRef = useRef(null);
    const searchRef = useRef(null);
    const scrollLockRef = useRef(null);

    const searchIndex = useMemo(() => {
        const index = new Map();
        menu?.categories.forEach((category) => category.items.forEach((item) => index.set(item.id, buildSearchIndex(item))));
        return index;
    }, [menu]);

    const availableFilters = useMemo(
        () => FILTERS.filter((filter) => menu?.categories.some((category) => category.items.some(filter.test))),
        [menu]
    );

    const isFiltering = query.trim() !== '' || activeFilters.length > 0;

    const visibleCategories = useMemo(() => {
        if (!menu) return [];
        const filters = FILTERS.filter((filter) => activeFilters.includes(filter.key));
        return menu.categories
            .map((category) => ({
                ...category,
                id: slugify(category.name),
                items: category.items.filter(
                    (item) => filters.every((filter) => filter.test(item)) && matchesSearch(searchIndex.get(item.id), query)
                ),
            }))
            .filter((category) => category.items.length > 0);
    }, [menu, activeFilters, query, searchIndex]);

    const resultCount = visibleCategories.reduce((total, category) => total + category.items.length, 0);

    // The site header changes height (it shrinks on scroll on desktop), so
    // the category bar sticks to its measured bottom edge.
    useEffect(() => {
        const header = document.querySelector('header');
        if (!header || typeof ResizeObserver === 'undefined') return undefined;
        const observer = new ResizeObserver(() => setHeaderHeight(Math.round(header.getBoundingClientRect().height)));
        observer.observe(header);
        return () => observer.disconnect();
    }, []);

    // Highlight the category being read.
    useEffect(() => {
        if (visibleCategories.length === 0) return undefined;
        let frame = null;
        const update = () => {
            frame = null;
            if (scrollLockRef.current) return;
            const line = stickyOffset(navRef.current) + 8;
            const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
            let current = visibleCategories[0].id;
            for (const category of visibleCategories) {
                const section = document.getElementById(category.id);
                if (section && section.getBoundingClientRect().top <= line) current = category.id;
            }
            if (atBottom) current = visibleCategories[visibleCategories.length - 1].id;
            setActiveCategory(current);
        };
        const onScroll = () => {
            if (frame === null) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, [visibleCategories]);

    // Keep the highlighted category's button in view in the sideways-scrolling
    // row (centered, but only when it's partly or fully out of view).
    useEffect(() => {
        const row = chipRowRef.current;
        const chip = row?.querySelector(`[data-category="${activeCategory}"]`);
        if (!row || !chip) return;
        const fullyVisible = chip.offsetLeft >= row.scrollLeft && chip.offsetLeft + chip.offsetWidth <= row.scrollLeft + row.clientWidth;
        if (fullyVisible) return;
        const left = chip.offsetLeft - row.clientWidth / 2 + chip.offsetWidth / 2;
        row.scrollTo({ left: Math.max(0, left), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }, [activeCategory]);

    const scrollToCategory = useCallback((id, { focus = true } = {}) => {
        const section = document.getElementById(id);
        if (!section) return;
        setActiveCategory(id);

        // Ignore the highlight updates the scroll itself causes, then move
        // keyboard focus to the category heading once it has arrived.
        window.clearTimeout(scrollLockRef.current);
        const top = section.getBoundingClientRect().top + window.scrollY - stickyOffset(navRef.current);
        window.scrollTo({ top: Math.max(0, top) });
        scrollLockRef.current = window.setTimeout(() => {
            scrollLockRef.current = null;
            if (focus) section.querySelector('h2')?.focus({ preventScroll: true });
        }, prefersReducedMotion() ? 50 : 700);
    }, []);

    useEffect(() => () => window.clearTimeout(scrollLockRef.current), []);

    // Open at the right category for links like /locations/murphy/menu#desserts.
    useEffect(() => {
        const id = window.location.hash.slice(1);
        if (id) window.requestAnimationFrame(() => scrollToCategory(decodeURIComponent(id), { focus: false }));
    }, [scrollToCategory]);

    const onCategoryClick = (event, id) => {
        event.preventDefault();
        window.history.replaceState(window.history.state, '', `#${id}`);
        scrollToCategory(id);
    };

    const toggleFilter = (key) =>
        setActiveFilters((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));

    const clearAll = () => {
        setQuery('');
        setActiveFilters([]);
        searchRef.current?.focus();
    };

    // The search box sits above the sticky bar; the bar's search button
    // brings it back into view.
    const openSearch = () => {
        const toolbar = document.getElementById('menu-tools');
        if (toolbar) window.scrollTo({ top: Math.max(0, toolbar.getBoundingClientRect().top + window.scrollY - headerOffset(navRef.current) - 16) });
        searchRef.current?.focus({ preventScroll: true });
    };

    if (!location || !menu) {
        return <NotFound />;
    }

    const canOrder = takesRestaurantOrders(location) && RESTAURANT_ORDER_KEYS.some((key) => location.orderingLinks?.[key]);
    const orderLabel = `Order from ${location.shortName}`;

    return (
        <div className="min-h-screen bg-ink-900 text-brand-cream">
            <section className="px-5 pt-14 pb-6 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-5xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">{location.displayName}</p>
                    <h1 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">Full Menu</h1>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-green">
                        <ShieldCheck size={18} aria-hidden="true" /> {menu.halalStatement}
                    </p>
                    {canOrder && (
                        <div className="mt-6">
                            <Link
                                to="/pickup"
                                onClick={() => selectLocation(location.slug)}
                                className="inline-flex min-h-11 items-center gap-2 bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light"
                            >
                                <ShoppingBag size={18} aria-hidden="true" /> {orderLabel}
                            </Link>
                        </div>
                    )}

                    <div id="menu-tools" role="search" className="mt-8 flex flex-col gap-3 md:flex-row md:items-center">
                        <div className="relative md:w-80">
                            <label htmlFor="menu-search" className="sr-only">Search the menu</label>
                            <Search size={18} aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-cream/50" />
                            <input
                                ref={searchRef}
                                id="menu-search"
                                type="search"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Search dishes, e.g. biriyani"
                                autoComplete="off"
                                enterKeyHint="search"
                                className="min-h-11 w-full border border-brand-gold-deep/30 bg-ink-800 py-2 pl-10 pr-10 text-base text-white placeholder:text-brand-cream/40 focus:border-brand-gold [&::-webkit-search-cancel-button]:hidden"
                            />
                            {query && (
                                <button
                                    type="button"
                                    onClick={() => { setQuery(''); searchRef.current?.focus(); }}
                                    aria-label="Clear search"
                                    className="absolute right-0 top-0 flex h-full w-11 items-center justify-center text-brand-cream/60 hover:text-brand-gold"
                                >
                                    <X size={18} aria-hidden="true" />
                                </button>
                            )}
                        </div>
                        {availableFilters.length > 0 && (
                            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter dishes">
                                {availableFilters.map((filter) => {
                                    const pressed = activeFilters.includes(filter.key);
                                    return (
                                        <button
                                            key={filter.key}
                                            type="button"
                                            aria-pressed={pressed}
                                            onClick={() => toggleFilter(filter.key)}
                                            className={clsx(
                                                'min-h-11 border px-4 text-xs font-bold uppercase tracking-[0.14em] transition-colors',
                                                pressed
                                                    ? 'border-brand-gold bg-brand-gold text-ink-900'
                                                    : 'border-brand-gold-deep/30 text-brand-cream/78 hover:border-brand-gold hover:text-brand-gold'
                                            )}
                                        >
                                            {filter.label}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <p aria-live="polite" className="mt-3 min-h-5 text-sm text-brand-cream/60">
                        {isFiltering && resultCount > 0 && `${resultCount} ${resultCount === 1 ? 'dish' : 'dishes'} found`}
                    </p>
                </div>
            </section>

            {visibleCategories.length > 0 && (
                <nav
                    ref={navRef}
                    data-fixed-bar
                    aria-label="Menu categories"
                    style={headerHeight ? { top: headerHeight } : undefined}
                    className="sticky top-[64px] z-30 border-y border-brand-gold-deep/20 bg-ink-900/95 backdrop-blur-xl md:top-[104px]"
                >
                    <div className="mx-auto flex max-w-5xl items-center gap-2 px-5 sm:px-8 lg:px-12">
                        <button
                            type="button"
                            onClick={openSearch}
                            aria-label="Search the menu"
                            className="flex h-11 w-11 shrink-0 items-center justify-center border border-brand-gold-deep/25 text-brand-cream/78 hover:border-brand-gold hover:text-brand-gold"
                        >
                            <Search size={18} aria-hidden="true" />
                        </button>
                        <div ref={chipRowRef} className="relative flex flex-1 gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {visibleCategories.map((category) => {
                                const active = category.id === activeCategory;
                                return (
                                    <a
                                        key={category.id}
                                        href={`#${category.id}`}
                                        data-category={category.id}
                                        onClick={(event) => onCategoryClick(event, category.id)}
                                        aria-current={active ? 'true' : undefined}
                                        className={clsx(
                                            'flex min-h-11 shrink-0 items-center whitespace-nowrap border px-4 text-xs font-bold uppercase tracking-[0.14em] transition-colors',
                                            active
                                                ? 'border-brand-gold bg-brand-gold/15 text-brand-gold'
                                                : 'border-brand-gold-deep/25 text-brand-cream/78 hover:border-brand-gold hover:text-brand-gold'
                                        )}
                                    >
                                        {category.name}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </nav>
            )}

            <section className="px-5 py-10 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-5xl space-y-12">
                    {visibleCategories.length === 0 && (
                        <div className="border border-brand-gold-deep/20 bg-ink-800 p-8 text-center">
                            <p className="font-serif text-2xl font-semibold text-white">No dishes match</p>
                            <p className="mt-2 text-sm text-brand-cream/60">Try another spelling, or clear your search and filters.</p>
                            <button
                                type="button"
                                onClick={clearAll}
                                className="mt-5 min-h-11 border border-brand-gold px-5 text-xs font-bold uppercase tracking-[0.14em] text-brand-gold hover:bg-brand-gold hover:text-ink-900"
                            >
                                Show full menu
                            </button>
                        </div>
                    )}

                    {visibleCategories.map((category) => (
                        <section key={category.id} id={category.id} aria-labelledby={`${category.id}-heading`}>
                            <h2 id={`${category.id}-heading`} tabIndex={-1} className="font-serif text-3xl font-semibold text-white focus:outline-none">
                                {category.name}
                            </h2>
                            {/* Phones: a compact list. Larger screens: two columns of cards. */}
                            <div className="mt-4 divide-y divide-brand-gold-deep/15 border-y border-brand-gold-deep/15 sm:mt-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:divide-y-0 sm:border-0">
                                {category.items.map((item) => {
                                    const tags = [
                                        ...(item.special ? [{ key: 'special', label: '5Spice Special', highlight: true }] : []),
                                        ...(item.dietary ?? []).map((tag) => ({ key: tag, label: TAG_LABELS[tag] ?? tag })),
                                        ...(item.available === false ? [{ key: 'unavailable', label: 'Unavailable' }] : []),
                                    ];
                                    return (
                                        <article key={item.id} className="py-4 sm:border sm:border-brand-gold-deep/20 sm:bg-ink-800 sm:p-5">
                                            <div className="flex items-baseline justify-between gap-3">
                                                <h3 className="font-serif text-lg font-semibold text-white sm:text-xl">{item.name}</h3>
                                                <span className="shrink-0 text-sm font-semibold text-brand-gold">
                                                    {item.price != null ? `$${item.price.toFixed(2)}` : 'Price TBD'}
                                                </span>
                                            </div>
                                            {item.description && (
                                                <p className="mt-1 text-sm leading-6 text-white/62 sm:mt-2">{item.description}</p>
                                            )}
                                            {tags.length > 0 && (
                                                <ul className="mt-2 flex flex-wrap gap-2 sm:mt-3" aria-label="Tags">
                                                    {tags.map((tag) => (
                                                        <li
                                                            key={tag.key}
                                                            className={clsx(
                                                                'border px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em]',
                                                                tag.highlight ? 'border-brand-gold/50 text-brand-gold' : 'border-white/10 text-white/50'
                                                            )}
                                                        >
                                                            {tag.label}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </article>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LocationMenu;
