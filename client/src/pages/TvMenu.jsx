import { useLayoutEffect, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import TvMedia from '../components/tv/TvMedia';
import { LOGOS, SOCIAL_LINKS } from '../config/site';
import { getTvScreen } from '../data/tv';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { TV_HEIGHT, TV_WIDTH, useTvAutoUpdate, useTvScale, useWakeLock } from '../hooks/useTvDisplay';

// Seconds between each column's video starting to download.
const VIDEO_STAGGER_MS = 1500;

const formatPrice = (price) => (price != null ? `$${price.toFixed(2)}` : null);

// Price set right after the dish name (no dotted leader line, which draws the
// eye to comparing prices). Kept on one line with the name's last word.
const Price = ({ price, className }) => (price ? <span className={`ml-4 whitespace-nowrap font-sans font-bold text-brand-gold ${className}`}>{price}</span> : null);

// The dish list under a featured dish. Dishes that don't fit are left out
// whole (never cut in half), so adding one too many to a column is harmless.
const ItemList = ({ items }) => {
    const listRef = useRef(null);

    useLayoutEffect(() => {
        const fit = () => {
            const list = listRef.current;
            if (!list) return;
            for (const row of list.children) row.hidden = false;
            for (const row of list.children) {
                if (row.offsetTop + row.offsetHeight > list.clientHeight) row.hidden = true;
            }
        };
        fit();
        // Refit when the space changes (e.g. the featured cards above are
        // evened out) and once the web fonts arrive.
        const observer = new ResizeObserver(fit);
        observer.observe(listRef.current);
        document.fonts?.ready.then(fit);
        return () => observer.disconnect();
    }, [items]);

    return (
        <ul ref={listRef} className="relative mt-3 min-h-0 flex-1 overflow-hidden">
            {items.map((item) => {
                const price = formatPrice(item.price);
                return (
                    <li key={item.id} className="border-b border-white/[0.07] py-[9px]">
                        <p className="text-[34px] font-semibold leading-tight text-white">
                            {item.name}
                            <Price price={price} className="text-[34px]" />
                        </p>
                        {item.showDescription && item.description && <p className="mt-0.5 text-[23px] leading-snug text-brand-cream/86">{item.description}</p>}
                    </li>
                );
            })}
        </ul>
    );
};

const FeaturedDish = ({ item, media, logo, startDelay }) => {
    const price = formatPrice(item.price);
    return (
        <div className="mt-4 border border-brand-gold-deep/35 bg-ink-800">
            <div className="relative">
                <TvMedia media={media} logo={logo} startDelay={startDelay} />
                {item.special && (
                    <span className="absolute right-4 top-4 bg-brand-gold px-3 py-1.5 text-[15px] font-bold uppercase tracking-[0.15em] text-ink-900">
                        5Spice Special
                    </span>
                )}
            </div>
            <div data-feature-info className="px-6 pb-4 pt-4">
                <p className="font-serif text-[36px] font-bold leading-[1.12] text-white">
                    {item.name}
                    <Price price={price} className="text-[36px]" />
                </p>
                {item.description && <p className="mt-1.5 text-[23px] leading-snug text-brand-cream/86">{item.description}</p>}
            </div>
        </div>
    );
};

// In-store TV menu board at /tv/:slug/:screen (e.g. /tv/murphy/1), drawn on
// a 1920×1080 canvas. Not linked anywhere and kept out of search engines;
// screens are set up in src/data/tv/.
const TvMenu = () => {
    const { slug, screen: screenNumber } = useParams();
    // ?samplePrices=1 fills missing prices with sample ones (layout previews).
    const [searchParams] = useSearchParams();
    const screen = getTvScreen(slug, screenNumber, { samplePrices: searchParams.get('samplePrices') === '1' });
    const scale = useTvScale();
    useTvAutoUpdate();
    useWakeLock();

    useDocumentHead({ title: screen ? `${screen.title} | 5Spice TV Menu` : '5Spice TV Menu', noindex: true });

    // Give the three featured cards the same height (the tallest one's), so
    // the columns line up whatever the dish name and description lengths.
    const mainRef = useRef(null);
    const samplePrices = searchParams.get('samplePrices') === '1';
    useLayoutEffect(() => {
        const equalize = () => {
            const infos = [...(mainRef.current?.querySelectorAll('[data-feature-info]') ?? [])];
            for (const info of infos) info.style.minHeight = '';
            const tallest = Math.max(0, ...infos.map((info) => info.offsetHeight));
            for (const info of infos) info.style.minHeight = `${tallest}px`;
        };
        equalize();
        document.fonts?.ready.then(equalize);
    }, [slug, screenNumber, samplePrices]);

    // The location's own logo (e.g. 5Spice Kitchen for Murphy), else the brand logo.
    const logo = screen?.location.logo ?? { src: LOGOS.wide, width: LOGOS.wideWidth, height: LOGOS.wideHeight, alt: '5Spice Market & Kitchen' };

    return (
        <div className="fixed inset-0 flex cursor-none items-center justify-center overflow-hidden bg-ink-950">
            <div
                className="flex shrink-0 flex-col bg-ink-900 font-sans text-brand-cream bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-gold-deep)/0.12),transparent_40%),linear-gradient(135deg,rgb(var(--color-ink-900))_0%,rgb(var(--color-ink-750))_56%,rgb(var(--color-ink-900))_100%)]"
                style={{ width: TV_WIDTH, height: TV_HEIGHT, transform: `scale(${scale})` }}
            >
                <header className="grid h-[96px] shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-brand-gold-deep/30 px-14">
                    <img src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-[76px] w-auto" />
                    {screen && <h1 className="text-center font-serif text-[50px] font-bold leading-tight text-white">{screen.title}</h1>}
                    {screen?.location.halal && (
                        <p className="flex items-center justify-self-end gap-3 text-[24px] font-semibold text-brand-cream/92">
                            <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
                            100% Zabiha Halal
                        </p>
                    )}
                </header>

                {screen && (
                    <main ref={mainRef} className="grid min-h-0 flex-1 grid-cols-3 gap-10 px-14 pb-4 pt-6">
                        {screen.columns.map((column, index) => (
                            <section key={column.title} className="flex min-h-0 flex-col">
                                <h2 className="flex items-center gap-4 font-serif text-[36px] font-semibold leading-tight text-brand-gold after:h-px after:flex-1 after:bg-brand-gold-deep/40">
                                    {column.title}
                                </h2>
                                {column.featured && <FeaturedDish {...column.featured} logo={logo} startDelay={index * VIDEO_STAGGER_MS} />}
                                <ItemList items={column.items} />
                            </section>
                        ))}
                    </main>
                )}

                {/* Short enough to read from across the room. */}
                <footer className="mt-auto flex h-[60px] shrink-0 items-center justify-between border-t border-brand-gold-deep/30 px-14 text-[24px] text-brand-cream/86">
                    <p>Order at the counter · <span className="font-semibold text-brand-gold">Catering available</span>, ask our team</p>
                    <p className="font-semibold text-brand-gold">{SOCIAL_LINKS.instagramHandle}</p>
                </footer>
            </div>
        </div>
    );
};

export default TvMenu;
