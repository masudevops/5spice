import React, { useEffect, useState } from 'react';
import { BadgePercent, Instagram, Sparkles } from 'lucide-react';
import { SOCIAL_LINKS } from '../config/site';

const fallbackDeals = {
    updatedLabel: 'Fresh weekly picks',
    note: 'Check back for rotating grocery highlights, seasonal produce, and family meal offers.',
    deals: [
        {
            id: 'market-highlights',
            title: 'Market Favorites',
            category: 'Market',
            description: 'Fresh produce, halal meat, fish, pantry staples, and seasonal grocery favorites selected for the week.',
            badge: 'Weekly Pick',
        },
    ],
};

const Sales = () => {
    const [weeklyDeals, setWeeklyDeals] = useState(fallbackDeals);

    useEffect(() => {
        // Update weekly deal content in public/weekly-deals.json when current specials are ready.
        fetch('/weekly-deals.json')
            .then((res) => res.ok ? res.json() : fallbackDeals)
            .then((data) => setWeeklyDeals(data))
            .catch(() => setWeeklyDeals(fallbackDeals));
    }, []);

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(229,57,53,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <BadgePercent className="mb-5 text-[#D4A84B]" size={34} strokeWidth={1.4} />
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Weekly Deals</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Fresh finds and family favorites every week.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Browse rotating grocery highlights, seasonal produce, pantry picks, and family meal features from 5Spice Market & Kitchen.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-7 border border-[#B88A3D]/25 bg-[#101010] p-5">
                        <div className="flex items-start gap-3">
                            <Sparkles className="mt-1 shrink-0 text-[#D4A84B]" size={22} />
                            <div>
                                <p className="font-semibold text-white">{weeklyDeals.updatedLabel}</p>
                                <p className="mt-1 text-sm leading-6 text-white/58">{weeklyDeals.note}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        {weeklyDeals.deals.map((deal) => (
                            <article key={deal.id} className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                                <span className="inline-flex bg-[#D4A84B] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#0E0E0E]">
                                    {deal.badge}
                                </span>
                                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A84B]/80">{deal.category}</p>
                                <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">{deal.title}</h2>
                                <p className="mt-4 leading-7 text-white/62">{deal.description}</p>
                            </article>
                        ))}
                    </div>

                    <div className="mt-8 border border-[#B88A3D]/25 bg-[#101010] p-7 md:flex md:items-center md:justify-between md:gap-8">
                        <div>
                            <h2 className="font-serif text-3xl font-semibold text-white">Follow for the latest specials.</h2>
                            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/58">
                                Weekly deals, fresh arrivals, and seasonal favorites may vary by availability and while supplies last.
                            </p>
                        </div>
                        <a href={SOCIAL_LINKS.instagramUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-3 border border-[#B88A3D]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white md:mt-0">
                            <Instagram size={18} /> Instagram
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Sales;
