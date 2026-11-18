import { useLayoutEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import TvMedia from '../components/tv/TvMedia';
import { CATERING_EMAIL, LOGOS, SOCIAL_LINKS } from '../config/site';
import { getTvScreen } from '../data/tv';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { TV_HEIGHT, TV_WIDTH, useTvAutoUpdate, useTvScale, useWakeLock } from '../hooks/useTvDisplay';

// Seconds between each column's video starting to download.
const VIDEO_STAGGER_MS = 1500;

const formatPrice = (price) => (price != null ? `$${price.toFixed(2)}` : null);

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
        // Text sizes change once the web fonts arrive.
        document.fonts?.ready.then(fit);
    }, [items]);

    return (
        <ul ref={listRef} className="relative mt-3 min-h-0 flex-1 overflow-hidden">
            {items.map((item) => {
                const price = formatPrice(item.price);
                return (
                    <li key={item.id} className="border-b border-white/[0.07] py-[11px]">
                        <div className="flex items-baseline gap-3">
                            <span className="text-[28px] font-semibold leading-tight text-white">{item.name}</span>
                            {price && (
                                <>
                                    <span className="min-w-6 flex-1 -translate-y-1.5 border-b-2 border-dotted border-brand-gold-deep/45" aria-hidden="true" />
                                    <span className="whitespace-nowrap text-[30px] font-bold text-brand-gold">{price}</span>
                                </>
                            )}
                        </div>
                        {item.description && <p className="mt-0.5 text-[19px] leading-snug text-brand-cream/62">{item.description}</p>}
                    </li>
                );
            })}
        </ul>
    );
};

const FeaturedDish = ({ item, media, startDelay }) => {
    const price = formatPrice(item.price);
    return (
        <div className="mt-4 border border-brand-gold-deep/35 bg-ink-800">
            <div className="relative">
                <TvMedia media={media} startDelay={startDelay} />
                {item.special && (
                    <span className="absolute right-4 top-4 bg-brand-gold px-3 py-1.5 text-[15px] font-bold uppercase tracking-[0.15em] text-ink-900">
                        5Spice Special
                    </span>
                )}
            </div>
            {/* Tall enough for a two-line name, so the three cards line up. */}
            <div className="min-h-[144px] px-6 pb-4 pt-4">
                <div className="flex items-start justify-between gap-5">
                    <p className="font-serif text-[34px] font-bold leading-[1.15] text-white">{item.name}</p>
                    {price && <p className="whitespace-nowrap text-[36px] font-bold leading-[1.15] text-brand-gold">{price}</p>}
                </div>
                {item.description && <p className="mt-1.5 text-[21px] leading-snug text-brand-cream/72">{item.description}</p>}
            </div>
        </div>
    );
};

// In-store TV menu board at /tv/:slug/:screen (e.g. /tv/murphy/1), drawn on
// a 1920×1080 canvas. Not linked anywhere and kept out of search engines;
// screens are set up in src/data/tv/.
const TvMenu = () => {
    const { slug, screen: screenNumber } = useParams();
    const screen = getTvScreen(slug, screenNumber);
    const scale = useTvScale();
    useTvAutoUpdate();
    useWakeLock();

    useDocumentHead({ title: screen ? `${screen.title} | 5Spice TV Menu` : '5Spice TV Menu', noindex: true });

    return (
        <div className="fixed inset-0 flex cursor-none items-center justify-center overflow-hidden bg-ink-950">
            <div
                className="flex shrink-0 flex-col bg-ink-900 font-sans text-brand-cream bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-gold-deep)/0.12),transparent_40%),linear-gradient(135deg,rgb(var(--color-ink-900))_0%,rgb(var(--color-ink-750))_56%,rgb(var(--color-ink-900))_100%)]"
                style={{ width: TV_WIDTH, height: TV_HEIGHT, transform: `scale(${scale})` }}
            >
                <header className="grid h-[108px] shrink-0 grid-cols-[1fr_auto_1fr] items-center border-b border-brand-gold-deep/30 px-14">
                    <img src={LOGOS.wide} alt="5Spice Market & Kitchen" width={LOGOS.wideWidth} height={LOGOS.wideHeight} className="h-[76px] w-auto" />
                    {screen && (
                        <div className="text-center">
                            <p className="text-[18px] font-semibold uppercase tracking-[0.3em] text-brand-gold">
                                {screen.location.displayName} · {screen.location.shortName}
                            </p>
                            <h1 className="mt-1 font-serif text-[46px] font-bold leading-tight text-white">{screen.title}</h1>
                        </div>
                    )}
                    {screen?.location.halal && (
                        <p className="flex items-center justify-self-end gap-3 text-[21px] font-semibold text-brand-cream/86">
                            <span className="h-3 w-3 rounded-full bg-brand-green" aria-hidden="true" />
                            100% Zabiha Halal
                        </p>
                    )}
                </header>

                {screen && (
                    <main className="grid min-h-0 flex-1 grid-cols-3 gap-10 px-14 pb-4 pt-6">
                        {screen.columns.map((column, index) => (
                            <section key={column.title} className="flex min-h-0 flex-col">
                                <h2 className="flex items-center gap-4 font-serif text-[36px] font-semibold leading-tight text-brand-gold after:h-px after:flex-1 after:bg-brand-gold-deep/40">
                                    {column.title}
                                </h2>
                                {column.featured && <FeaturedDish {...column.featured} startDelay={index * VIDEO_STAGGER_MS} />}
                                <ItemList items={column.items} />
                            </section>
                        ))}
                    </main>
                )}

                <footer className="mt-auto flex h-16 shrink-0 items-center justify-between border-t border-brand-gold-deep/30 px-14 text-[21px] text-brand-cream/72">
                    <p>Order at the counter · Catering: <span className="font-semibold text-brand-gold">{CATERING_EMAIL}</span></p>
                    <p><span className="font-semibold text-brand-gold">{SOCIAL_LINKS.instagramHandle}</span> · 5spicemarket.com</p>
                </footer>
            </div>
        </div>
    );
};

export default TvMenu;
