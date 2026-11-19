import PromoLayout from './PromoLayout';

// Promo template 'dish-showcase': one dish (or story) at a time over its
// full-screen photo or video, with a short label and the name. Minimal copy:
// no description or price.
const DishShowcase = ({ slide, logo, location }) => {
    const { dish, media, eyebrow, tagline } = slide;
    const title = slide.title ?? dish?.name;
    if (!title) return null;
    return (
        <PromoLayout media={media} logo={logo} location={location}>
            {eyebrow && <p className="font-serif text-[52px] italic text-brand-gold">{eyebrow}</p>}
            <h1 className="mt-3 font-serif text-[108px] font-bold leading-[1.04] text-white">{title}</h1>
            <span className="mt-10 block h-[6px] w-44 rounded-full bg-brand-green" aria-hidden="true" />
            {tagline && <p className="mt-8 max-w-[880px] text-[40px] leading-snug text-brand-cream/90">{tagline}</p>}
        </PromoLayout>
    );
};

export default DishShowcase;
