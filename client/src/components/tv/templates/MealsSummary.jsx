import { formatHours, isLive, servingStatus } from '../../../data/tv/schedule';

const WHEN = { later: 'Later today', tomorrow: '', other: '' };

// Promo template 'meals-summary' ("Today's Specials"): every meal side by
// side with its hours and dishes, so guests learn about all of them at any
// time of day. The meal being served is highlighted.
const MealsSummary = ({ slide, logo, location, now }) => {
    const meals = slide.meals.filter((meal) => isLive(meal, now));
    if (!meals.length) return null;
    return (
        <div className="flex h-full flex-col bg-ink-900 px-16 pb-14 pt-12">
            <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="mix-blend-lighten h-[88px] w-auto self-start" />
            <div className="my-auto">
                <p className="font-serif text-[52px] italic text-brand-gold">{slide.eyebrow ?? 'Every Day'}</p>
                <h1 className="mt-2 font-serif text-[96px] font-bold leading-[1.04] text-white">{slide.title ?? "Today's Specials"}</h1>
                <div className="mt-12 grid auto-cols-fr grid-flow-col gap-10">
                    {meals.map((meal) => {
                        const status = servingStatus(meal.servingHours, now);
                        const serving = status === 'now';
                        return (
                            <section key={meal.label} className={`flex flex-col border-t-[6px] bg-ink-800 px-10 pb-10 pt-8 ${serving ? 'border-brand-green' : 'border-brand-gold-deep/50'}`}>
                                <div className="flex items-baseline justify-between gap-6">
                                    <h2 className="font-serif text-[56px] font-bold text-white">{meal.label}</h2>
                                    {serving
                                        ? <p className="flex items-center gap-3 text-[26px] font-semibold uppercase tracking-[0.14em] text-brand-green"><span className="h-3.5 w-3.5 rounded-full bg-brand-green" aria-hidden="true" />Now serving</p>
                                        : WHEN[status] && <p className="text-[26px] font-semibold uppercase tracking-[0.14em] text-brand-cream/80">{WHEN[status]}</p>}
                                </div>
                                <p className="mt-2 text-[32px] font-semibold text-brand-gold">{formatHours(meal.servingHours)}</p>
                                {meal.headline && <p className="mt-6 font-serif text-[40px] italic leading-snug text-brand-cream">{meal.headline}</p>}
                                <ul className="mt-4 space-y-2">
                                    {meal.dishes.map((dish) => <li key={dish.id} className="text-[32px] leading-snug text-white/90">{dish.name}</li>)}
                                </ul>
                            </section>
                        );
                    })}
                </div>
            </div>
            {location.halal && (
                <p className="flex items-center gap-3 text-[28px] font-semibold text-brand-cream/92">
                    <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
                    100% Zabiha Halal
                </p>
            )}
        </div>
    );
};

export default MealsSummary;
