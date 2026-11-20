// Template 'brand', and what a promo TV shows when nothing is live (all
// campaigns switched off or out of schedule), so the screen is never blank.
const BrandSlide = ({ logo, location }) => (
    <div className="tv-bg flex h-full flex-col items-center justify-center text-center">
        <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="mix-blend-lighten h-[260px] w-auto" />
        <span className="mt-12 block h-[6px] w-44 rounded-full bg-brand-green" aria-hidden="true" />
        <p className="mt-12 max-w-[1600px] font-serif text-[64px] font-semibold text-white">{location.cuisineTagline ?? 'Authentic Halal Bangladeshi Cuisine'}</p>
        {location.halal && <p className="mt-6 text-[36px] font-semibold text-brand-gold">100% Zabiha Halal</p>}
    </div>
);

export default BrandSlide;
