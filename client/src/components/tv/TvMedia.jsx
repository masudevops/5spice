import { useEffect, useRef, useState } from 'react';

// A video that hasn't started playing by then is treated as failed.
const VIDEO_START_TIMEOUT_MS = 15000;

// Branded stand-in for a dish without media (or whose media failed).
const Placeholder = ({ logo }) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-[radial-gradient(circle_at_50%_45%,rgb(var(--color-gold-deep)/0.18),transparent_62%)]">
        <div className="flex gap-3" aria-hidden="true">
            {['bg-brand-gold', 'bg-brand-green', 'bg-brand-gold', 'bg-brand-green', 'bg-brand-gold'].map((color, index) => (
                <span key={index} className={`h-2.5 w-2.5 rounded-full ${color}`} />
            ))}
        </div>
        {logo && <img src={logo.src} alt="" className="h-20 w-auto object-contain opacity-60" />}
    </div>
);

// The featured dish's video, GIF, or photo, filling its 16:9 frame.
// Video → fallback photo → placeholder, stepping down whenever a file fails
// to load (or a video doesn't start playing in time). `startDelay` staggers
// when videos begin downloading so a screen doesn't fetch all of them at once.
const TvMedia = ({ media, logo, startDelay = 0 }) => {
    // Which source is showing: 'main', 'fallback', or 'placeholder'.
    const [stage, setStage] = useState(media?.src ? 'main' : 'placeholder');
    const [videoReady, setVideoReady] = useState(startDelay === 0);
    const videoRef = useRef(null);

    const isVideo = media?.type === 'video';
    const fail = () => setStage((current) => (current === 'main' && media?.fallback ? 'fallback' : 'placeholder'));

    useEffect(() => {
        if (!isVideo || videoReady) return undefined;
        const timer = setTimeout(() => setVideoReady(true), startDelay);
        return () => clearTimeout(timer);
    }, [isVideo, videoReady, startDelay]);

    // Give up on a video that never starts (e.g. a stalled download).
    useEffect(() => {
        if (!isVideo || stage !== 'main' || !videoReady) return undefined;
        const video = videoRef.current;
        const timer = setTimeout(() => { if (video?.paused) fail(); }, VIDEO_START_TIMEOUT_MS);
        video?.play().catch(() => { /* autoplay blocked or failed: the timeout steps down */ });
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideo, stage, videoReady]);

    // 2:1 frame: 16:9 footage fills it with a slight top and bottom crop.
    return (
        <div className="relative aspect-[2/1] overflow-hidden bg-ink-950">
            <Placeholder logo={logo} />
            {stage === 'main' && isVideo && videoReady && (
                <video
                    ref={videoRef}
                    src={media.src}
                    poster={media.fallback}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    disablePictureInPicture
                    onError={fail}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}
            {stage === 'main' && !isVideo && (
                <img src={media.src} alt="" decoding="async" onError={fail} className="absolute inset-0 h-full w-full object-cover" />
            )}
            {stage === 'fallback' && (
                <img src={media.fallback} alt="" decoding="async" onError={fail} className="absolute inset-0 h-full w-full object-cover" />
            )}
        </div>
    );
};

export default TvMedia;
