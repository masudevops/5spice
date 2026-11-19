// Shown on a promo TV when no campaign is live (all switched off or out of
// schedule), so the screen is never blank.
const BrandSlide = ({ logo, location }) => (
    <div className="flex h-full flex-col items-center justify-center gap-10 text-center">
        <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="mix-blend-lighten h-[260px] w-auto" />
        <div className="flex gap-4" aria-hidden="true">
            {['bg-brand-gold', 'bg-brand-green', 'bg-brand-gold', 'bg-brand-green', 'bg-brand-gold'].map((color, index) => (
                <span key={index} className={`h-4 w-4 rounded-full ${color}`} />
            ))}
        </div>
        <p className="max-w-[1600px] font-serif text-[52px] font-semibold text-white">{location.cuisineTagline ?? 'Authentic Halal Bangladeshi Cuisine'}</p>
        {location.halal && <p className="text-[36px] font-semibold text-brand-gold">100% Zabiha Halal</p>}
    </div>
);

export default BrandSlide;
