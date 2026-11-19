import { useEffect, useState } from 'react';

// TV menu boards are laid out on a fixed 1920×1080 canvas and scaled to fit
// the screen, so they look the same whatever size the TV's browser reports
// (Fire TV browsers often report 960×540).
export const TV_WIDTH = 1920;
export const TV_HEIGHT = 1080;

const UPDATE_CHECK_MS = 5 * 60 * 1000;
// Daily fresh start (local time) to clear memory on long-running TV sticks.
const DAILY_RELOAD_HOUR = 4;

const fitScale = () => Math.min(window.innerWidth / TV_WIDTH, window.innerHeight / TV_HEIGHT);

export const useTvScale = () => {
    const [scale, setScale] = useState(fitScale);
    useEffect(() => {
        const onResize = () => setScale(fitScale());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return scale;
};

// The site's main script file name changes with every deploy (it has a
// content hash), so comparing it tells us a new version is live.
const ENTRY_SCRIPT = /<script[^>]*type="module"[^>]*src="([^"]+)"/;
const currentEntry = () => document.querySelector('script[type="module"][src]')?.getAttribute('src') ?? null;

// Opens the page at a fresh URL. A new address can't be answered from the
// TV browser's cache (e.g. Fully Kiosk's offline cache mode), so it always
// loads the latest files.
const reloadWith = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    window.location.replace(`${window.location.pathname}?${params}`);
};

// Promo boards announce each slide change (PromoBoard), so a reload can wait
// for one instead of cutting a video off mid-play. It never waits longer than
// MAX_RELOAD_WAIT_MS (e.g. a single looping video).
export const SLIDE_CHANGE_EVENT = 'tv:slidechange';
const MAX_RELOAD_WAIT_MS = 2 * 60 * 1000;
const videoPlaying = () => [...document.querySelectorAll('video')].some((video) => !video.paused && !video.ended);
let reloadPending = false;
const reloadWhenIdle = (key, value) => {
    if (reloadPending) return;
    if (!videoPlaying()) {
        reloadWith(key, value);
        return;
    }
    reloadPending = true;
    const go = () => reloadWith(key, value);
    window.addEventListener(SLIDE_CHANGE_EVENT, go, { once: true });
    setTimeout(go, MAX_RELOAD_WAIT_MS);
};

// Reloads the board when a new site version is deployed (checked every few
// minutes) and once a day. Network errors are ignored: the board keeps
// showing what it has and tries again on the next check.
export const useTvAutoUpdate = () => {
    useEffect(() => {
        const running = currentEntry();

        const checkForUpdate = async () => {
            try {
                const response = await fetch(`/index.html?check=${Date.now()}`, { cache: 'no-store' });
                if (!response.ok) return;
                const latest = (await response.text()).match(ENTRY_SCRIPT)?.[1];
                // Skip if we already reloaded for this version and still got the
                // old one (a cache in the way), so the board can't reload in a loop.
                const alreadyTried = new URLSearchParams(window.location.search).get('v') === latest;
                if (latest && running && latest !== running && !alreadyTried) reloadWhenIdle('v', latest);
            } catch { /* offline: try again later */ }
        };
        const interval = setInterval(checkForUpdate, UPDATE_CHECK_MS);

        const next = new Date();
        next.setHours(DAILY_RELOAD_HOUR, 0, 0, 0);
        if (next <= new Date()) next.setDate(next.getDate() + 1);
        const daily = setTimeout(() => reloadWhenIdle('r', Date.now()), next - new Date());

        return () => {
            clearInterval(interval);
            clearTimeout(daily);
        };
    }, []);
};

// Asks the browser to keep the screen on, where supported (the TV's own
// sleep and screensaver settings still need turning off).
export const useWakeLock = () => {
    useEffect(() => {
        let lock = null;
        const request = async () => {
            try {
                if (document.visibilityState === 'visible') lock = await navigator.wakeLock?.request('screen');
            } catch { /* not supported or not allowed */ }
        };
        request();
        document.addEventListener('visibilitychange', request);
        return () => {
            document.removeEventListener('visibilitychange', request);
            lock?.release().catch(() => {});
        };
    }, []);
};

// Fire TV's Silk browser shows its address bar until it goes full screen. A
// web page may only ask for full screen after a button press, so any remote
// press (or click) does it. A kiosk browser, or Silk's own full-screen
// button, needs no press.
export const useFullscreenOnPress = () => {
    useEffect(() => {
        const enter = () => {
            if (document.fullscreenElement) return;
            document.documentElement.requestFullscreen?.().catch(() => { /* not allowed */ });
        };
        window.addEventListener('keydown', enter);
        window.addEventListener('click', enter);
        return () => {
            window.removeEventListener('keydown', enter);
            window.removeEventListener('click', enter);
        };
    }, []);
};
