import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Candy, Fish, Instagram, Leaf, MapPin, PackageSearch, Snowflake, ShoppingBasket } from 'lucide-react';
import { MARKET_DEPARTMENTS, SOCIAL_LINKS } from '../config/site';
import { getLocationLabel, getVisibleLocations } from '../data/locations';
import { useDocumentHead } from '../hooks/useDocumentHead';

const icons = [ShoppingBasket, Fish, Leaf, PackageSearch, Snowflake, Candy];

const Market = () => {
    // The market content always describes the market location(s), whichever
    // location is selected in the switcher (Murphy is restaurant-only).
    const marketLocations = getVisibleLocations().filter((location) => location.flags.hasMarket);
    const upcomingMarkets = marketLocations.filter((location) => location.status !== 'open');

    useDocumentHead({
        title: 'Halal Grocery Market in Plano, TX | 5Spice Market & Kitchen',
        description: 'Zabiha halal meat, fresh seafood, farm-fresh produce, and specialty South Asian groceries. 5Spice Market & Kitchen opens at 245 Shiloh Rd, Plano in early 2027, In Sha Allah.',
    });

    return (
        <div className="min-h-screen bg-ink-900 text-brand-cream">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-forest)/0.18),transparent_34%),linear-gradient(135deg,rgb(var(--color-ink-900)),rgb(var(--color-ink-750)))]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Premium Halal Market</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Everything your family kitchen needs, coming to Plano.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Zabiha halal meat, fresh seafood, farm-fresh produce, and specialty groceries, all under one roof.
                    </p>
                    {upcomingMarkets.map((location) => (
                        <div key={location.slug} className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                            <span className="inline-flex items-center gap-2 border border-brand-gold-deep/35 bg-ink-700/70 px-4 py-2 font-semibold text-brand-gold">
                                <CalendarDays size={17} aria-hidden="true" /> {location.openingText}
                            </span>
                            <Link to={`/locations/${location.slug}`} className="inline-flex items-center gap-2 text-white/68 underline decoration-brand-gold-deep/40 underline-offset-4 hover:text-white">
                                <MapPin size={16} className="text-brand-gold" aria-hidden="true" /> {getLocationLabel(location)}, {location.address.full}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {MARKET_DEPARTMENTS.map((department, index) => {
                            const Icon = icons[index];
                            return (
                                <article key={department.title} className="border border-brand-gold-deep/25 bg-ink-800 p-7">
                                    <Icon className="mb-5 text-brand-gold" size={31} strokeWidth={1.35} />
                                    <h2 className="font-serif text-3xl font-semibold leading-tight text-white">{department.title}</h2>
                                    <p className="mt-4 leading-7 text-white/62">{department.text}</p>
                                    <div className="mt-6 border-t border-white/10 pt-5">
                                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold/75">What we'll carry</p>
                                        <ul className="mt-3 space-y-2 text-sm text-white/60">
                                            {department.items.map((item) => (
                                                <li key={item} className="flex gap-2">
                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className="mt-8 border border-brand-gold-deep/25 bg-ink-850 p-7 md:p-10">
                        <h2 className="font-serif text-3xl font-semibold text-brand-gold">Follow our journey to opening day.</h2>
                        <p className="mt-4 max-w-3xl leading-7 text-white/62">
                            Get opening news and first looks at the market on Instagram. Planning an event before then? Our Murphy kitchen is taking catering orders now.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a href={SOCIAL_LINKS.instagramUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-green-dark">
                                <Instagram size={17} aria-hidden="true" /> {SOCIAL_LINKS.instagramHandle}
                            </a>
                            <Link to="/catering" className="inline-flex items-center gap-2 border border-brand-gold-deep/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white">
                                Explore Catering <ArrowRight size={17} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Market;
