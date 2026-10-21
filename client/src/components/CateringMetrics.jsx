import React from 'react';

// Milestone figures (gold number, green rule, small label), shared by the
// homepage section and the Catering page.
const CateringMetrics = ({ metrics, className = '' }) => (
    <dl className={`flex flex-wrap gap-x-12 gap-y-6 ${className}`}>
        {metrics.map((metric) => (
            <div key={metric.key} className="flex flex-col gap-1 border-l-2 border-brand-green pl-4">
                <dt className="max-w-[12rem] text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-white/60">{metric.label}</dt>
                <dd className="order-first font-serif text-4xl font-bold text-brand-gold md:text-5xl">{metric.value}</dd>
            </div>
        ))}
    </dl>
);

export default CateringMetrics;
