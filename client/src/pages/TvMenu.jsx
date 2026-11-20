import { useParams, useSearchParams } from 'react-router-dom';
import ListMenuBoard from '../components/tv/ListMenuBoard';
import MenuFrame from '../components/tv/MenuFrame';
import PromoBoard from '../components/tv/PromoBoard';
import { LOGOS } from '../config/site';
import { getTvScreen } from '../data/tv';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { TV_HEIGHT, TV_WIDTH, useFullscreenOnPress, useTvAutoUpdate, useTvScale, useWakeLock } from '../hooks/useTvDisplay';

// Previews (this computer, PR preview links) also play sample promotions
// (marked on screen) so the design can be judged. Never on the live site,
// unless asked for with ?preview=1.
const isPreview = (searchParams) =>
    searchParams.get('preview') === '1'
    || !/(^|\.)5spicemarket\.com$/.test(window.location.hostname);

// Screen backgrounds (the `background` setting in src/data/tv/), as color
// tokens from index.css.
const BACKGROUNDS = { charcoal: '--color-ink-900', black: '--color-ink-black' };

// In-store TV screen at /tv/:slug/:screen (e.g. /tv/murphy/1), drawn on a
// 1920×1080 canvas: a text-only menu board or a promo slideshow, as set up
// in src/data/tv/. Not linked anywhere and kept out of search engines.
const TvMenu = () => {
    const { slug, screen: screenNumber } = useParams();
    const [searchParams] = useSearchParams();
    const preview = isPreview(searchParams);
    const screen = getTvScreen(slug, screenNumber, { preview });
    // Previews can pretend it's another time (?at=2026-11-19T08:00, the
    // TV's local time) to check promo schedules.
    const at = preview ? searchParams.get('at') : null;
    // ?bg=black or ?bg=charcoal tries a background without changing the setting.
    const background = BACKGROUNDS[searchParams.get('bg')] ?? BACKGROUNDS[screen?.background] ?? BACKGROUNDS.charcoal;
    const scale = useTvScale();
    useTvAutoUpdate();
    useWakeLock();
    useFullscreenOnPress();

    useDocumentHead({ title: screen ? `${screen.title} | 5Spice TV` : '5Spice TV', noindex: true });

    // The location's own logo (e.g. 5Spice Kitchen for Murphy), else the brand logo.
    const logo = screen?.location.logo ?? { src: LOGOS.wide, width: LOGOS.wideWidth, height: LOGOS.wideHeight, alt: '5Spice Market & Kitchen' };

    return (
        <div className="tv-bg fixed inset-0 flex cursor-none items-center justify-center overflow-hidden" style={{ '--tv-bg': `var(${background})` }}>
            <div
                className="tv-bg flex shrink-0 flex-col font-sans text-brand-cream"
                style={{ width: TV_WIDTH, height: TV_HEIGHT, transform: `scale(${scale})` }}
            >
                {screen?.type === 'promo' ? (
                    <PromoBoard screen={screen} logo={logo} at={at} />
                ) : (
                    <MenuFrame screen={screen} logo={logo}>
                        {screen?.type === 'menu' && <ListMenuBoard screen={screen} />}
                    </MenuFrame>
                )}
            </div>
        </div>
    );
};

export default TvMenu;
