import React, { useEffect, useState } from 'react';
import { BadgePercent, CalendarDays, Facebook, Instagram, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '../config/site';
import { getLocationLabel, getVisibleLocations } from '../data/locations';
import { useDocumentHead } from '../hooks/useDocumentHead';

// Never show made-up deals: if the file is missing or empty, the page shows
// the "deals start at opening" message instead.
const emptyDeals = { updatedLabel: '', note: '', deals: [] };

const Sales = () => {
    const [weeklyDeals, setWeeklyDeals] = useState(emptyDeals);
    const [loaded, setLoaded] = useState(false);
    const dealLocations = getVisibleLocations().filter((location) => location.flags.hasWeeklyDeals);
    const upcomingDealLocations = dealLocations.filter((location) => location.status !== 'open');
    const hasDeals = weeklyDeals.deals?.length > 0;

    useDocumentHead({
        title: 'Weekly Deals | 5Spice Market & Kitchen – Plano',
        description: 'Weekly halal grocery deals from 5Spice Market & Kitchen in Plano, TX begin when the market opens in early 2027, In Sha Allah.',
    });

    useEffect(() => {
        // Edit public/weekly-deals.json to publish current specials.
        fetch('/weekly-deals.json')
            .then((res) => (res.ok ? res.json() : emptyDeals))
            .then((data) => setWeeklyDeals({ ...emptyDeals, ...data }))
            .catch(() => setWeeklyDeals(emptyDeals))
            .finally(() => setLoaded(true));
    }, []);

    return (
        <div className="min-h-screen bg-ink-900 text-brand-cream">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,57,53,0.14),transparent_34%),linear-gradient(135deg,rgb(var(--color-ink-900)),rgb(var(--color-ink-750)))]" />
                <div className="relative mx-auto max-w-7xl">
                    <BadgePercent className="mb-5 text-brand-gold" size={34} strokeWidth={1.4} />
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Weekly Deals</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Fresh finds and family favorites every week.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Weekly grocery deals from {dealLocations.map(getLocationLabel).join(' and ') || '5Spice Market & Kitchen'}.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {loaded && !hasDeals && (
                        <div className="border border-brand-gold-deep/25 bg-ink-800 p-7 md:p-9">
                            <CalendarDays className="mb-5 text-brand-gold" size={30} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-3xl font-semibold text-white">Weekly deals start when our market opens.</h2>
                            <p className="mt-4 max-w-3xl leading-7 text-white/62">
                                {upcomingDealLocations.length > 0
                                    ? `${upcomingDealLocations.map((location) => `${getLocationLabel(location)}: ${location.openingText}.`).join(' ')} Follow us for opening news and our first weekly specials.`
                                    : 'There are no deals running right now. Follow us to hear about the next ones.'}
                            </p>
                        </div>
                    )}

                    {hasDeals && (weeklyDeals.updatedLabel || weeklyDeals.note) && (
                        <div className="mb-7 border border-brand-gold-deep/25 bg-ink-850 p-5">
                            <div className="flex items-start gap-3">
                                <Sparkles className="mt-1 shrink-0 text-brand-gold" size={22} aria-hidden="true" />
                                <div>
                                    {weeklyDeals.updatedLabel && <p className="font-semibold text-white">{weeklyDeals.updatedLabel}</p>}
                                    {weeklyDeals.note && <p className="mt-1 text-sm leading-6 text-white/58">{weeklyDeals.note}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid gap-5 md:grid-cols-3">
                        {weeklyDeals.deals.map((deal) => (
                            <article key={deal.id} className="border border-brand-gold-deep/25 bg-ink-800 p-7">
                                <span className="inline-flex bg-brand-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-ink-900">
                                    {deal.badge}
                                </span>
                                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold/80">{deal.category}</p>
                                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">{deal.title}</h2>
                                <p className="mt-4 leading-7 text-white/62">{deal.description}</p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 border border-brand-gold-deep/25 bg-ink-850 p-7 md:flex md:items-center md:justify-between md:gap-8">
                        <div>
                            <h2 className="font-serif text-3xl font-semibold text-white">Follow for the latest specials.</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
                                {hasDeals ? 'Deals vary by availability and while supplies last.' : 'Opening news and first deals will be shared on Facebook and Instagram.'}
                            </p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3 md:mt-0 md:shrink-0">
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="5Spice Market on Facebook" className="inline-flex items-center gap-3 border border-brand-gold-deep/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white">
                                <Facebook size={18} aria-hidden="true" /> Facebook
                            </a>
                            <a href={SOCIAL_LINKS.instagramUrl} target="_blank" rel="noreferrer" aria-label={`${SOCIAL_LINKS.instagramHandle} on Instagram`} className="inline-flex items-center gap-3 border border-brand-gold-deep/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white">
                                <Instagram size={18} aria-hidden="true" /> {SOCIAL_LINKS.instagramHandle}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sales;
