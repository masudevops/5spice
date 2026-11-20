import { useEffect, useRef, useState } from 'react';

// A video that hasn't started playing by then is treated as failed.
const VIDEO_START_TIMEOUT_MS = 15000;
// A playing video whose picture hasn't moved for this long is treated as
// frozen (e.g. a decoder hiccup on a long-running TV stick).
const VIDEO_STALL_TIMEOUT_MS = 15000;
const STALL_CHECK_MS = 5000;

// Plain dark background for a slide without media (or whose media failed):
// the slide's text carries it, with no stand-in artwork.
const Placeholder = () => <div className="absolute inset-0 bg-ink-850" />;

// A dish's video, GIF, or photo, filling its frame (2:1 by default; pass
// `frameClassName` for another shape, e.g. 'aspect-video').
// Video → fallback photo → plain background, stepping down whenever a file fails
// to load (or a video doesn't start playing in time). `startDelay` staggers
// when videos begin downloading so a screen doesn't fetch all of them at once.
const TvMedia = ({ media, startDelay = 0, frameClassName = 'aspect-[2/1]' }) => {
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

    // Step down to the fallback photo if a playing video freezes.
    useEffect(() => {
        if (!isVideo || stage !== 'main' || !videoReady) return undefined;
        let lastTime = -1;
        let stuckSince = Date.now();
        const timer = setInterval(() => {
            const video = videoRef.current;
            if (!video || video.paused) return;
            if (video.currentTime !== lastTime) {
                lastTime = video.currentTime;
                stuckSince = Date.now();
            } else if (Date.now() - stuckSince > VIDEO_STALL_TIMEOUT_MS) {
                fail();
            }
        }, STALL_CHECK_MS);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVideo, stage, videoReady]);

    // In the 2:1 frame, 16:9 footage fills it with a slight top and bottom crop.
    return (
        <div className={`relative overflow-hidden bg-ink-950 ${frameClassName}`}>
            <Placeholder />
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
