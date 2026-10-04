import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import NotFound from './NotFound';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { getVisibleLocationBySlug } from '../data/locations';
import { getMenuByLocationSlug } from '../data/menus';

const ORIGIN_FILTERS = ['All', 'Bangladeshi', 'Indian', 'Pakistani'];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const matchesOriginFilter = (item, filter) => filter === 'All' || !item.origin || item.origin === filter;

const LocationMenu = () => {
    const { slug } = useParams();
    const [originFilter, setOriginFilter] = useState('All');

    const location = getVisibleLocationBySlug(slug);
    const menu = location ? getMenuByLocationSlug(slug) : null;

    useDocumentHead(
        location && menu
            ? {
                title: `${location.displayName} Menu | Halal Bangladeshi Cuisine in ${location.address.city}, TX`,
                description: `${menu.halalStatement} Browse the full ${location.displayName} menu of Bangladeshi, Indian, and Pakistani favorites.`,
            }
            : { title: 'Menu Not Found | 5Spice', noindex: true }
    );

    if (!location || !menu) {
        return <NotFound />;
    }

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="px-5 pt-14 pb-8 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-5xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">{location.displayName}</p>
                    <h1 className="mt-4 font-serif text-4xl font-bold text-white md:text-5xl">Full Menu</h1>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#1CA433]">
                        <ShieldCheck size={18} /> {menu.halalStatement}
                    </p>
                </div>
            </section>

            <nav
                aria-label="Menu categories"
                className="sticky top-[64px] z-30 border-y border-[#B88A3D]/20 bg-[#0E0E0E]/95 backdrop-blur-xl md:top-[104px]"
            >
                <div className="mx-auto flex max-w-5xl gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-12">
                    {menu.categories.map((category) => (
                        <a
                            key={category.name}
                            href={`#${slugify(category.name)}`}
                            className="shrink-0 whitespace-nowrap border border-[#B88A3D]/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[#F0EAD6]/78 transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B]"
                        >
                            {category.name}
                        </a>
                    ))}
                </div>
                <div className="mx-auto flex max-w-5xl flex-wrap gap-2 px-5 pb-3 sm:px-8 lg:px-12" role="group" aria-label="Filter by origin">
                    {ORIGIN_FILTERS.map((filter) => (
                        <button
                            key={filter}
                            type="button"
                            onClick={() => setOriginFilter(filter)}
                            aria-pressed={originFilter === filter}
                            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                                originFilter === filter
                                    ? 'bg-[#D4A84B] text-[#0E0E0E]'
                                    : 'border border-white/10 text-white/55 hover:border-[#D4A84B]/50 hover:text-white'
                            }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </nav>

            <section className="px-5 py-10 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-5xl space-y-12">
                    {menu.categories.map((category) => {
                        const items = category.items.filter((item) => matchesOriginFilter(item, originFilter));
                        if (items.length === 0) return null;

                        return (
                            <section key={category.name} id={slugify(category.name)} className="scroll-mt-32">
                                <h2 className="font-serif text-3xl font-semibold text-white">{category.name}</h2>
                                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                                    {items.map((item) => (
                                        <article key={item.id} className="border border-[#B88A3D]/20 bg-[#141414] p-5">
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="font-serif text-xl font-semibold text-white">{item.name}</h3>
                                                <span className="shrink-0 text-sm font-semibold text-[#D4A84B]">
                                                    {item.price != null ? `$${item.price.toFixed(2)}` : 'Price TBD'}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-sm leading-6 text-white/62">{item.description}</p>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {item.origin && (
                                                    <span className="border border-[#B88A3D]/30 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-[#D4A84B]/80">
                                                        {item.origin}
                                                    </span>
                                                )}
                                                {item.dietary?.map((tag) => (
                                                    <span key={tag} className="border border-white/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/50">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {!item.available && (
                                                    <span className="border border-white/10 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-white/40">
                                                        Unavailable
                                                    </span>
                                                )}
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </section>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default LocationMenu;
