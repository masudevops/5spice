import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, HandHeart, ShoppingBasket, Utensils } from 'lucide-react';
import { OFFERINGS } from '../config/site';
import CateringStats from './CateringStats';
import { anyVisibleLocationHasFlag, getLocationLabel, getOrderingLocations, getUpcomingLocations } from '../data/locations';
import { useDocumentHead } from '../hooks/useDocumentHead';

// The three things 5Spice does, each linking to its page. Market and Kitchen
// copy is shared with the coming-soon page (OFFERINGS in config/site.js).
const buildOfferingCards = () => [
    anyVisibleLocationHasFlag('hasMarket') && { title: OFFERINGS[0].title, text: OFFERINGS[0].text, href: '/market', cta: 'Explore the Market', icon: ShoppingBasket },
    { title: OFFERINGS[1].title, text: OFFERINGS[1].text, href: '/kitchen', cta: 'Explore the Kitchen', icon: Utensils },
    { title: 'Catering', text: 'Weddings, family celebrations, corporate events, and community gatherings.', href: '/catering', cta: 'Explore Catering', icon: HandHeart },
].filter(Boolean);

// Five dots, one for each spice in পাঁচফোড়ন (same mark as the About page).
const SpiceDots = ({ className = '' }) => (
    <div className={`flex items-center justify-center gap-2.5 ${className}`} aria-hidden="true">
        {['bg-brand-gold', 'bg-brand-green', 'bg-brand-gold', 'bg-brand-green', 'bg-brand-gold'].map((color, index) => (
            <span key={index} className={`h-1.5 w-1.5 rounded-full ${color}`} />
        ))}
    </div>
);

const LaunchLanding = () => {
    const orderingLocations = getOrderingLocations();
    const upcomingLocations = getUpcomingLocations();
    const upcomingMarket = upcomingLocations.find((location) => location.flags.hasMarket);

    useDocumentHead({
        title: '5Spice Market & Kitchen | Halal Grocery & Authentic Bangladeshi Cuisine in DFW',
        description: 'Authentic halal Bangladeshi cuisine and catering from 5Spice Kitchen, opening soon in Murphy, TX. 5Spice Market & Kitchen, a premium halal grocery and restaurant, is coming to Plano in early 2027, In Sha Allah.',
    });

    return (
        <div className="relative overflow-hidden bg-ink-900 text-brand-cream">
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-gold-deep)/0.12),transparent_34%),linear-gradient(135deg,rgb(var(--color-ink-900))_0%,rgb(var(--color-ink-750))_56%,rgb(var(--color-ink-900))_100%)]" />
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.75)_1px,transparent_0)] [background-size:22px_22px]" />


            <section className="relative z-10 px-5 py-16 sm:px-8 md:py-20 lg:px-12">
                {/* Centered while there's no imagery. A food & grocery photo slideshow
                    can go here later (e.g. behind or below the text). */}
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto max-w-4xl animate-fade-in-up text-center">
                        <SpiceDots />
                        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                            Authentic Halal Bangladeshi Cuisine · Halal Grocery
                        </p>
                        <h1 className="mt-5 text-balance font-serif text-5xl font-bold leading-[0.98] text-white sm:text-6xl xl:text-7xl">
                            Your Neighborhood Destination for Halal Groceries &amp; Authentic Flavors.
                        </h1>
                        <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg leading-8 text-white/70">
                            Bringing premium halal meats, fresh seafood, everyday groceries, and authentic Bangladeshi cuisine with South Asian favorites together under one roof.
                        </p>
                        {upcomingMarket && (
                            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border border-brand-gold-deep/35 bg-ink-700/70 px-5 py-3 text-brand-gold">
                                <CalendarDays size={20} aria-hidden="true" />
                                <span className="font-semibold tracking-wide">{upcomingMarket.openingText}</span>
                                <span className="text-sm text-white/55">{upcomingMarket.address.city}, {upcomingMarket.address.state}</span>
                            </div>
                        )}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                            <Link to="/market" className="bg-brand-green px-7 py-4 text-center font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light">
                                Explore the Market
                            </Link>
                            <Link to="/locations" className="border border-brand-gold-deep/50 px-7 py-4 text-center font-bold uppercase tracking-[0.16em] text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold">
                                Our Locations
                            </Link>
                        </div>
                        {orderingLocations.map((location) => (
                            <p key={location.slug} className="mt-6 text-sm text-white/62">
                                <Utensils size={16} className="mr-2 inline text-brand-green" aria-hidden="true" />
                                Craving it now?{' '}
                                <Link to={`/locations/${location.slug}`} className="font-semibold text-brand-gold underline decoration-brand-gold-deep/40 underline-offset-4 hover:text-white">
                                    {getLocationLabel(location)}
                                </Link>{' '}
                                is now serving.
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <CateringStats />

            <section className="relative z-10 px-5 py-16 sm:px-8 lg:px-12" aria-labelledby="offerings-heading">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-10 max-w-3xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Five spices. One home.</p>
                        <h2 id="offerings-heading" className="mt-4 text-balance font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Built for grocery runs, family meals, and community gatherings.
                        </h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {buildOfferingCards().map((card) => {
                            const Icon = card.icon;
                            return (
                                <Link key={card.href} to={card.href} className="group flex flex-col border border-brand-gold-deep/25 bg-ink-800/86 p-7 transition-colors hover:border-brand-gold/60">
                                    <Icon className="mb-5 text-brand-gold" size={30} strokeWidth={1.35} aria-hidden="true" />
                                    <h3 className="font-serif text-2xl font-semibold text-white">{card.title}</h3>
                                    <p className="mt-4 flex-1 text-sm leading-7 text-white/62">{card.text}</p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                                        {card.cta} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden="true" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative z-10 px-5 pb-20 pt-8 sm:px-8 lg:px-12" aria-labelledby="story-heading">
                <div className="mx-auto max-w-7xl border-y border-brand-gold-deep/25 bg-ink-850/80 px-6 py-14 text-center md:px-10 md:py-16">
                    <div className="mx-auto max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Our Story</p>
                        <h2 id="story-heading" className="mt-5">
                            <span lang="bn" className="block font-bengali text-5xl font-semibold leading-[1.35] text-brand-gold sm:text-6xl">
                                পাঁচফোড়ন
                            </span>
                            <span className="mt-2 block font-serif text-2xl font-semibold text-white sm:text-3xl">The Aroma of Home</span>
                        </h2>
                        <SpiceDots className="mt-7" />
                        <p className="mt-7 text-pretty text-lg leading-8 text-white/70">
                            Inspired by <span lang="bn" className="font-bengali text-brand-gold">পাঁচফোড়ন</span>, the traditional five-spice blend of Bengali cooking,
                            5Spice was born from a simple idea: to bring the flavors, warmth, and traditions of home closer to our community.
                        </p>
                        <p className="mt-4 text-pretty leading-7 text-white/58">{OFFERINGS[2].text}</p>
                        <Link to="/about" className="mt-8 inline-flex min-h-11 items-center gap-2 border border-brand-gold-deep/50 px-7 py-4 font-bold uppercase tracking-[0.16em] text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold">
                            Read Our Story <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LaunchLanding;
