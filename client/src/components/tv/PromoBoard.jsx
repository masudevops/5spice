import { useEffect, useState } from 'react';
import { chicagoNow, isLive } from '../../data/tv/schedule';
import BrandSlide from './templates/BrandSlide';
import { TEMPLATES } from './templates';

const DEFAULT_SLIDE_SECONDS = 8;
// How often to re-check schedules (campaigns starting or ending).
const SCHEDULE_CHECK_MS = 30 * 1000;

// Marketing TV: plays the live slides of the screen's campaigns in order,
// each for its `duration`, then repeats. Falls back to a brand slide when
// nothing is live.
const PromoBoard = ({ screen, logo }) => {
    const [now, setNow] = useState(chicagoNow);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setNow(chicagoNow()), SCHEDULE_CHECK_MS);
        return () => clearInterval(timer);
    }, []);

    const slides = screen.campaigns
        .filter((campaign) => isLive(campaign, now))
        .flatMap((campaign) => campaign.slides)
        .filter((slide) => isLive(slide, now) && TEMPLATES[slide.template] && (slide.dishId ? slide.dish : true));
    const position = slides.length ? index % slides.length : 0;
    const slide = slides[position];
    const seconds = slide?.duration ?? DEFAULT_SLIDE_SECONDS;

    useEffect(() => {
        if (slides.length < 2) return undefined;
        const timer = setTimeout(() => setIndex(position + 1), seconds * 1000);
        return () => clearTimeout(timer);
    }, [position, seconds, slides.length]);

    // Warm the browser cache with the next slide's photo or GIF.
    const next = slides[(position + 1) % (slides.length || 1)];
    useEffect(() => {
        const src = next?.media?.type !== 'video' ? next?.media?.src : null;
        if (src) new Image().src = src;
    }, [next?.media?.src, next?.media?.type]);

    if (!slide) return <BrandSlide logo={logo} location={screen.location} />;
    const Template = TEMPLATES[slide.template];
    return (
        <div key={`${slide.id}-${index}`} className="tv-fade h-full">
            <Template slide={slide} logo={logo} location={screen.location} />
        </div>
    );
};

export default PromoBoard;
