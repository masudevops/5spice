import React from 'react';
import CateringMetrics from './CateringMetrics';
import { getCateringMetrics } from '../utils/cateringStats';

const CateringStats = () => {
    const metrics = getCateringMetrics();

    if (metrics.length === 0) return null;

    return (
        <section className="relative z-10 px-5 py-4 sm:px-8 sm:py-6 lg:px-12" aria-labelledby="catering-stats-heading">
            {/* Stacked and centered on phones; one centered row on desktop. */}
            <div className="mx-auto max-w-7xl border-y border-brand-gold-deep/25 bg-ink-850/80 px-5 py-7 sm:px-6 sm:py-8 md:px-10">
                <div className="flex flex-col items-center gap-5 text-center sm:gap-6 md:flex-row md:justify-center md:gap-12 md:text-left">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-gold min-[390px]:tracking-[0.2em] sm:tracking-[0.3em]">Proudly Serving Our Community</p>
                        <h2 id="catering-stats-heading" className="mt-3 font-serif text-2xl font-semibold text-white sm:text-3xl md:text-4xl">Every Gathering Matters.</h2>
                        <p className="mt-2 font-serif text-base italic text-white/60 sm:text-lg">Made with care. Shared with our community.</p>
                    </div>
                    <CateringMetrics metrics={metrics} className="justify-center text-left" />
                </div>
            </div>
        </section>
    );
};

export default CateringStats;
