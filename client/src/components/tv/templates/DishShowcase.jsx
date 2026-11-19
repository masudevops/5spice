import TvMedia from '../TvMedia';

// Promo template 'dish-showcase': one dish (or campaign) at a time, its photo
// or video filling the screen under a dark overlay on the left, with a short
// label and the name. Minimal copy: no description or price.
const DishShowcase = ({ slide, logo, location }) => {
    const { dish, media, eyebrow, tagline } = slide;
    const title = slide.title ?? dish?.name;
    if (!title) return null;
    return (
        <div className="relative h-full overflow-hidden">
            <div className="absolute inset-0">
                <TvMedia media={media} logo={logo} frameClassName="h-full" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--color-ink-900)/0.94)_0%,rgb(var(--color-ink-900)/0.8)_40%,rgb(var(--color-ink-900)/0)_68%)]" aria-hidden="true" />
            <div className="relative flex h-full w-[1000px] flex-col px-24 py-20">
                <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="mix-blend-lighten h-[96px] w-auto self-start" />
                <div className="my-auto">
                    {eyebrow && <p className="font-serif text-[52px] italic text-brand-gold">{eyebrow}</p>}
                    <h1 className="mt-3 font-serif text-[108px] font-bold leading-[1.04] text-white">{title}</h1>
                    <span className="mt-10 block h-[6px] w-44 rounded-full bg-brand-green" aria-hidden="true" />
                    {tagline && <p className="mt-8 text-[40px] leading-snug text-brand-cream/90">{tagline}</p>}
                </div>
                {location.halal && (
                    <p className="flex items-center gap-3 text-[28px] font-semibold text-brand-cream/92">
                        <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
                        100% Zabiha Halal
                    </p>
                )}
            </div>
        </div>
    );
};

export default DishShowcase;
