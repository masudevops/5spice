import { useEffect, useState } from 'react';
import { chicagoNow, isLive, isScheduled, servingStatus } from '../../data/tv/schedule';
import { SLIDE_CHANGE_EVENT } from '../../hooks/useTvDisplay';
import BrandSlide from './templates/BrandSlide';
import { TEMPLATES } from './templates';

const DEFAULT_SLIDE_SECONDS = 8;
// How long a meal special plays while its meal isn't being served.
const OFF_HOURS_SECONDS = 8;
// How often to re-check schedules (campaigns starting or ending).
const SCHEDULE_CHECK_MS = 30 * 1000;
// How long the outgoing slide stays under the incoming one (matches .tv-fade).
const CROSSFADE_MS = 1200;

const servedNow = (slide, now) => Boolean(slide.servingHours) && isScheduled(slide.servingHours, now);

// Where a slide goes in the loop: the meal being served first, then the
// "Today's Specials" summary, meals still to come today, meals served
// another day, and everything else (offers, …) in its usual order.
const loopRank = (slide, now) => {
    if (slide.servingHours) return { now: 0, later: 2 }[servingStatus(slide.servingHours, now)] ?? 3;
    return slide.template === 'meals-summary' ? 1 : 4;
};

const liveSlides = (campaigns, now) => campaigns
    .filter((campaign) => isLive(campaign, now))
    .flatMap((campaign) => campaign.slides)
    .filter((slide) => isLive(slide, now) && TEMPLATES[slide.template] && (slide.dishId ? slide.dish : true))
    .map((slide, order) => ({ slide, order, rank: loopRank(slide, now) }))
    .sort((a, b) => a.rank - b.rank || a.order - b.order)
    .map(({ slide }) => slide);

// A meal special plays its full `duration` while served, briefly otherwise.
const slideSeconds = (slide, now) => {
    if (slide.servingHours && !servedNow(slide, now)) return slide.offHoursDuration ?? OFF_HOURS_SECONDS;
    return slide.duration ?? DEFAULT_SLIDE_SECONDS;
};

// On previews, says when a slide is example content or uses a stock photo,
// so neither is mistaken for the real thing. Never on the live TVs.
const PreviewTag = ({ slide }) => {
    const labels = [slide.sample && 'Sample content', slide.media?.stock && 'Stock photo'].filter(Boolean);
    if (!labels.length) return null;
    return (
        <p className="absolute bottom-8 right-10 bg-ink-900/80 px-4 py-1.5 text-[20px] font-semibold uppercase tracking-[0.14em] text-brand-cream/80">
            {labels.join(' · ')} · preview only
        </p>
    );
};

const Slide = ({ slide, logo, screen, now }) => {
    const Template = TEMPLATES[slide.template];
    return (
        <>
            <Template slide={slide} logo={logo} location={screen.location} now={now} />
            {screen.preview && <PreviewTag slide={slide} />}
        </>
    );
};

// Marketing TV: plays the live slides of the screen's campaigns in order,
// each for its `duration`, then repeats, crossfading between slides (a meal
// special being served leads; see loopRank). With
// none live it plays the screen's `fallback` campaigns, and with nothing at
// all a brand slide. `at` (previews only, e.g. '2026-11-19T08:00') pretends
// it's another time, to check schedules.
const PromoBoard = ({ screen, logo, at }) => {
    const clock = () => chicagoNow(at ? new Date(at) : undefined);
    const [now, setNow] = useState(clock);
    const [index, setIndex] = useState(0);
    const [outgoing, setOutgoing] = useState(null);

    useEffect(() => {
        const timer = setInterval(() => setNow(clock()), SCHEDULE_CHECK_MS);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [at]);

    const primary = liveSlides(screen.campaigns, now);
    const slides = primary.length ? primary : liveSlides(screen.fallback, now);
    const position = slides.length ? index % slides.length : 0;
    const slide = slides[position];
    const seconds = slide ? slideSeconds(slide, now) : DEFAULT_SLIDE_SECONDS;
    const key = slide ? `${slide.id}-${index}` : 'none';

    useEffect(() => {
        if (slides.length < 2) return undefined;
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event(SLIDE_CHANGE_EVENT));
            setOutgoing({ key, slide });
            setIndex(position + 1);
        }, seconds * 1000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position, seconds, slides.length]);

    useEffect(() => {
        if (!outgoing) return undefined;
        const timer = setTimeout(() => setOutgoing(null), CROSSFADE_MS);
        return () => clearTimeout(timer);
    }, [outgoing]);

    // Warm the browser cache with the next slide's photo.
    const next = slides[(position + 1) % (slides.length || 1)];
    useEffect(() => {
        const src = next?.media?.type !== 'video' ? next?.media?.src : null;
        if (src) new Image().src = src;
    }, [next?.media?.src, next?.media?.type]);

    if (!slide) return <BrandSlide logo={logo} location={screen.location} />;
    return (
        <div className="relative h-full">
            {outgoing && (
                <div key={outgoing.key} className="absolute inset-0">
                    <Slide slide={outgoing.slide} logo={logo} screen={screen} now={now} />
                </div>
            )}
            <div key={key} className="tv-fade absolute inset-0">
                <Slide slide={slide} logo={logo} screen={screen} now={now} />
            </div>
        </div>
    );
};

export default PromoBoard;
