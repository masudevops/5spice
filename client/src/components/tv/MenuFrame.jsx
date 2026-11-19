import { SOCIAL_LINKS } from '../../config/site';

// Header and footer around a menu board: logo, screen title, halal note, and
// a short footer readable from across the room. (On every TV logo,
// mix-blend-lighten lets the background show through the logo file's black
// surround, so no box edge shows; the artwork itself is untouched.)
const MenuFrame = ({ screen, logo, children }) => (
    <>
        <header className="flex h-[96px] shrink-0 items-center gap-10 border-b border-brand-gold-deep/30 px-16">
            <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="mix-blend-lighten h-[80px] w-auto" />
            <span className="h-[60px] w-px bg-brand-gold-deep/60" aria-hidden="true" />
            {screen && <h1 className="flex-1 font-serif text-[58px] font-bold leading-tight text-white">{screen.title}</h1>}
            {screen?.location.halal && (
                <p className="ml-auto flex items-center gap-3 text-[28px] font-semibold text-brand-cream/92">
                    <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
                    100% Zabiha Halal
                </p>
            )}
        </header>
        {children}
        <footer className="mt-auto flex h-[56px] shrink-0 items-center justify-between border-t border-brand-gold-deep/30 px-16 text-[27px] text-brand-cream/86">
            <p>Order at the counter <span className="mx-4 text-brand-gold-deep/70" aria-hidden="true">|</span> <span className="font-semibold text-brand-gold">Catering available</span>, ask our team</p>
            <p className="font-semibold text-brand-gold">{SOCIAL_LINKS.instagramHandle}</p>
        </footer>
    </>
);

export default MenuFrame;
