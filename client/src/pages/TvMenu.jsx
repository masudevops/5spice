import { useParams, useSearchParams } from 'react-router-dom';
import ListMenuBoard from '../components/tv/ListMenuBoard';
import MenuFrame from '../components/tv/MenuFrame';
import PromoBoard from '../components/tv/PromoBoard';
import { LOGOS } from '../config/site';
import { getTvScreen } from '../data/tv';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { TV_HEIGHT, TV_WIDTH, useFullscreenOnPress, useTvAutoUpdate, useTvScale, useWakeLock } from '../hooks/useTvDisplay';

// Sample prices fill in missing ones on previews (this computer, PR preview
// links) so the layout can be judged with prices. Never on the live site,
// unless asked for with ?samplePrices=1.
const showSamplePrices = (searchParams) =>
    searchParams.get('samplePrices') === '1' || !/(^|\.)5spicemarket\.com$/.test(window.location.hostname);

// In-store TV screen at /tv/:slug/:screen (e.g. /tv/murphy/1), drawn on a
// 1920×1080 canvas: a text-only menu board or a promo slideshow, as set up
// in src/data/tv/. Not linked anywhere and kept out of search engines.
const TvMenu = () => {
    const { slug, screen: screenNumber } = useParams();
    const [searchParams] = useSearchParams();
    const screen = getTvScreen(slug, screenNumber, { samplePrices: showSamplePrices(searchParams) });
    const scale = useTvScale();
    useTvAutoUpdate();
    useWakeLock();
    useFullscreenOnPress();

    useDocumentHead({ title: screen ? `${screen.title} | 5Spice TV` : '5Spice TV', noindex: true });

    // The location's own logo (e.g. 5Spice Kitchen for Murphy), else the brand logo.
    const logo = screen?.location.logo ?? { src: LOGOS.wide, width: LOGOS.wideWidth, height: LOGOS.wideHeight, alt: '5Spice Market & Kitchen' };

    return (
        <div className="fixed inset-0 flex cursor-none items-center justify-center overflow-hidden bg-ink-950">
            <div
                className="flex shrink-0 flex-col bg-ink-900 font-sans text-brand-cream bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-gold-deep)/0.12),transparent_40%),linear-gradient(135deg,rgb(var(--color-ink-900))_0%,rgb(var(--color-ink-750))_56%,rgb(var(--color-ink-900))_100%)]"
                style={{ width: TV_WIDTH, height: TV_HEIGHT, transform: `scale(${scale})` }}
            >
                {screen?.type === 'promo' ? (
                    <PromoBoard screen={screen} logo={logo} />
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
