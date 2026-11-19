import { Check } from 'lucide-react';
import { CATERING_EMAIL } from '../../../config/site';
import { getCateringMetrics } from '../../../utils/cateringStats';
import PromoLayout from './PromoLayout';

const CATERING_WEB = '5spicemarket.com/catering';

// Promo template 'catering': catering call to action over a photo, with the
// catering email and web address (config/site.js) and, if asked for, the
// confirmed guest total (CATERING_STATS, shown only once it's verified).
const Catering = ({ slide, logo, location }) => {
    const { eyebrow, headline, subhead, points = [], showGuestCount, media } = slide;
    const guests = showGuestCount ? getCateringMetrics().find((metric) => metric.key === 'guestsServed') : null;
    return (
        <PromoLayout media={media} logo={logo} location={location}>
            {eyebrow && <p className="font-serif text-[52px] italic text-brand-gold">{eyebrow}</p>}
            <h1 className="mt-3 font-serif text-[96px] font-bold leading-[1.04] text-white">{headline}</h1>
            {subhead && <p className="mt-5 text-[40px] leading-snug text-brand-cream/90">{subhead}</p>}
            {points.length > 0 && (
                <ul className="mt-9 space-y-4">
                    {points.map((point) => (
                        <li key={point} className="flex items-center gap-5 text-[40px] text-white">
                            <Check className="shrink-0 text-brand-green" size={44} strokeWidth={3} aria-hidden="true" />
                            {point}
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-12 flex items-end gap-14">
                <div className="border-l-[6px] border-brand-gold pl-7">
                    <p className="text-[26px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Request a quote</p>
                    <p className="mt-2 text-[42px] font-bold text-white">{CATERING_EMAIL}</p>
                    <p className="text-[32px] text-brand-cream/90">{CATERING_WEB}</p>
                </div>
                {guests && (
                    <div>
                        <p className="font-serif text-[64px] font-bold leading-none text-brand-gold">{guests.value}</p>
                        <p className="mt-2 text-[24px] uppercase tracking-[0.14em] text-brand-cream/90">Guests served</p>
                    </div>
                )}
            </div>
        </PromoLayout>
    );
};

export default Catering;
