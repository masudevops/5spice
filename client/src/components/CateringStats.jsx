import React from 'react';
import { CATERING_STATS } from '../config/site';
import { toMilestone } from '../utils/milestone';

// Each metric shows only once its verified total reaches `minimum`.
const METRICS = [
    { key: 'guestsServed', label: 'Guests Served Through Catering', minimum: 100 },
    { key: 'eventsCompleted', label: 'Catering Events Completed', minimum: 10 },
];

const CateringStats = () => {
    const metrics = METRICS
        .map((metric) => ({ ...metric, value: toMilestone(CATERING_STATS[metric.key], metric.minimum) }))
        .filter((metric) => metric.value);

    if (metrics.length === 0) return null;

    return (
        <section className="relative z-10 px-5 py-8 sm:px-8 lg:px-12" aria-labelledby="catering-stats-heading">
            <div className="mx-auto max-w-7xl border-y border-[#B88A3D]/25 bg-[#101010]/80 px-6 py-9 md:px-10">
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A84B]">Proudly Serving Our Community</p>
                        <h2 id="catering-stats-heading" className="mt-3 font-serif text-3xl font-semibold text-white md:text-4xl">Every Gathering Matters.</h2>
                        <p className="mt-3 font-serif text-lg italic text-white/60">Made with care. Shared with our community.</p>
                    </div>
                    <dl className="flex flex-wrap gap-x-12 gap-y-6">
                        {metrics.map((metric) => (
                            <div key={metric.key} className="flex flex-col gap-1 border-l-2 border-[#1CA433] pl-4">
                                <dt className="max-w-[12rem] text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-white/60">{metric.label}</dt>
                                <dd className="order-first font-serif text-4xl font-bold text-[#D4A84B] md:text-5xl">{metric.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    );
};

export default CateringStats;
