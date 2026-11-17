import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Coffee, CookingPot, HandHeart, Soup, Utensils } from 'lucide-react';
import { MENU_HIGHLIGHTS } from '../config/site';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { getVisibleLocations, hasPublicMenu } from '../data/locations';

const icons = [CookingPot, Soup, Coffee];

const Kitchen = () => {
    const { selectedLocation } = useSelectedLocation();
    // The selected location's restaurant menu, or the first one that's public.
    const menuLocation = hasPublicMenu(selectedLocation) ? selectedLocation : getVisibleLocations().find(hasPublicMenu);

    useDocumentHead({
        title: 'Halal Bangladeshi Kitchen & Catering in Murphy, TX | 5Spice Kitchen',
        description: 'Authentic halal Bangladeshi cuisine alongside Indian and Pakistani favorites from 5Spice Kitchen, opening soon in Murphy, TX. Catering available for your events.',
    });

    return (
        <div className="min-h-screen bg-ink-900 text-brand-cream">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-orange)/0.14),transparent_36%),linear-gradient(135deg,rgb(var(--color-ink-900)),rgb(var(--color-ink-750)))]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Authentic Halal Bangladeshi Cuisine</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Authentic meals for family dinners and quick lunches.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Traditional Bangladeshi favorites and South Asian classics, from kacchi and tehari to rich curries and street snacks, all halal and made with care for every guest at your table.
                    </p>
                    {menuLocation && (
                        <Link to={`/locations/${menuLocation.slug}/menu`} className="mt-8 inline-flex min-h-11 items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light">
                            <BookOpen size={18} aria-hidden="true" /> View Menu
                        </Link>
                    )}
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-5 md:grid-cols-3">
                        {MENU_HIGHLIGHTS.map((item, index) => {
                            const Icon = icons[index];
                            return (
                                <article key={item.title} className="border border-brand-gold-deep/25 bg-ink-800 p-7">
                                    <Icon className="mb-5 text-brand-gold" size={31} strokeWidth={1.35} aria-hidden="true" />
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold/80">{item.category}</p>
                                    <h2 className="font-serif text-3xl font-semibold leading-tight text-white">{item.title}</h2>
                                    <p className="mt-4 leading-7 text-white/62">{item.text}</p>
                                </article>
                            );
                        })}
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Link to="/catering" className="group border border-brand-gold-deep/25 bg-ink-800 p-7 transition-colors hover:border-brand-gold/50">
                            <HandHeart className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Planning an event?</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">Weddings, family celebrations, and corporate catering.</p>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                                Explore Catering <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </Link>
                        <Link to="/pickup" className="group border border-brand-gold-deep/25 bg-ink-800 p-7 transition-colors hover:border-brand-gold/50">
                            <Utensils className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Ordering</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">See current ordering options by location.</p>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                                Order Options <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Kitchen;
