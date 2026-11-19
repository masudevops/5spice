import Price from '../Price';
import TvMedia from '../TvMedia';

// Promo template 'dish-spotlight': a dish's photo or video beside its name,
// description, and price, all from the menu (the price stays hidden until
// the dish has one).
const DishSpotlight = ({ slide, logo, location }) => {
    const { dish, media, eyebrow } = slide;
    if (!dish) return null;
    return (
        <div className="grid h-full grid-cols-[620px_1fr] items-center gap-16 px-20 py-16">
            <div className="flex h-full flex-col">
                <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="mix-blend-lighten h-[96px] w-auto self-start" />
                <div className="my-auto">
                    {eyebrow && <p className="text-[30px] font-semibold uppercase tracking-[0.22em] text-brand-gold">{eyebrow}</p>}
                    <h1 className="mt-5 font-serif text-[84px] font-bold leading-[1.05] text-white">{dish.name}</h1>
                    {dish.description && <p className="mt-6 text-[38px] leading-snug text-brand-cream/86">{dish.description}</p>}
                    {dish.price != null && <p className="mt-8"><Price price={dish.price} className="!ml-0 text-[64px]" /></p>}
                </div>
                {location.halal && (
                    <p className="flex items-center gap-3 text-[28px] font-semibold text-brand-cream/92">
                        <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
                        100% Zabiha Halal
                    </p>
                )}
            </div>
            <div className="border border-brand-gold-deep/40">
                <TvMedia media={media} logo={logo} frameClassName="aspect-video" />
            </div>
        </div>
    );
};

export default DishSpotlight;
