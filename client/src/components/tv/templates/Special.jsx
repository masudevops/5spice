import Price from '../Price';
import PromoLayout from './PromoLayout';

const formatEndDate = (date) => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

// Promo template 'special': a breakfast, lunch, or dinner special, or a
// limited-time offer. A gold badge, the headline (or the dish's name), and
// optionally up to three dishes with their menu prices, a line of details,
// and the campaign's end date. Prices always come from the menu.
const Special = ({ slide, logo, location }) => {
    const { badge, tagline, details, dish, dishes, media, showEndDate, endDate } = slide;
    const headline = slide.headline ?? dish?.name;
    if (!headline) return null;
    return (
        <PromoLayout media={media} logo={logo} location={location}>
            {badge && (
                <p className="inline-block bg-brand-gold px-7 py-2 font-serif text-[44px] font-semibold italic text-ink-900">{badge}</p>
            )}
            <h1 className="mt-8 font-serif text-[104px] font-bold leading-[1.04] text-white">{headline}</h1>
            {tagline && <p className="mt-6 max-w-[880px] text-[40px] leading-snug text-brand-cream/90">{tagline}</p>}
            {!dishes.length && dish?.price != null && (
                <p className="mt-8"><Price price={dish.price} className="text-[60px]" /></p>
            )}
            {dishes.length > 0 && (
                <ul className="mt-10 max-w-[880px] border-t border-brand-gold-deep/40">
                    {dishes.slice(0, 3).map((item) => (
                        <li key={item.id} className="flex items-baseline justify-between gap-8 border-b border-brand-gold-deep/40 py-4">
                            <span className="font-serif text-[46px] font-bold leading-tight text-white">{item.name}</span>
                            <Price price={item.price} className="text-[42px]" />
                        </li>
                    ))}
                </ul>
            )}
            {details && <p className="mt-8 max-w-[880px] text-[34px] leading-snug text-brand-cream/90">{details}</p>}
            {showEndDate && endDate && (
                <p className="mt-8 text-[30px] font-semibold uppercase tracking-[0.18em] text-brand-gold">Through {formatEndDate(endDate)}</p>
            )}
        </PromoLayout>
    );
};

export default Special;
