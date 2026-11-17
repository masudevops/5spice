import React from 'react';
import CateringMetrics from './CateringMetrics';
import { getCateringMetrics } from '../utils/cateringStats';

const CateringStats = () => {
    const metrics = getCateringMetrics();

    if (metrics.length === 0) return null;

    return (
        <section className="relative z-10 px-5 py-8 sm:px-8 lg:px-12" aria-labelledby="catering-stats-heading">
            <div className="mx-auto max-w-7xl border-y border-brand-gold-deep/25 bg-ink-850/80 px-6 py-10 text-center md:px-10">
                <div className="flex flex-col items-center gap-7">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Proudly Serving Our Community</p>
                        <h2 id="catering-stats-heading" className="mt-3 font-serif text-3xl font-semibold text-white md:text-4xl">Every Gathering Matters.</h2>
                        <p className="mt-3 font-serif text-lg italic text-white/60">Made with care. Shared with our community.</p>
                    </div>
                    <CateringMetrics metrics={metrics} className="justify-center text-left" />
                </div>
            </div>
        </section>
    );
};

export default CateringStats;
