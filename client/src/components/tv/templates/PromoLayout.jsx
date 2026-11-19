import TvMedia from '../TvMedia';

// Shared frame for every promo slide (TVs 4–6), so all of them keep the same
// margins, logo, and halal note: the photo or video fills the screen, a dark
// overlay on the left keeps the text readable on any image, and the slide's
// own content sits in the middle of the left column.
const PromoLayout = ({ media, logo, location, children }) => (
    <div className="relative h-full overflow-hidden">
        <div className="absolute inset-0">
            <TvMedia media={media} frameClassName="h-full" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(var(--color-ink-900)/0.95)_0%,rgb(var(--color-ink-900)/0.85)_40%,rgb(var(--color-ink-900)/0.35)_62%,rgb(var(--color-ink-900)/0)_78%)]" aria-hidden="true" />
        <div className="relative flex h-full w-[1060px] flex-col px-16 pb-14 pt-12">
            <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="mix-blend-lighten h-[88px] w-auto self-start" />
            <div className="my-auto">{children}</div>
            {location.halal && (
                <p className="flex items-center gap-3 text-[28px] font-semibold text-brand-cream/92">
                    <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
                    100% Zabiha Halal
                </p>
            )}
        </div>
    </div>
);

export default PromoLayout;
