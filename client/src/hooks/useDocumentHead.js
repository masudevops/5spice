import { useEffect } from 'react';

const setMetaTag = (attr, key, content) => {
    if (!content) return;
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
};

const setRobotsTag = (noindex) => {
    let el = document.head.querySelector('meta[name="robots"]');
    if (!noindex) {
        if (el) el.remove();
        return;
    }
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'robots');
        document.head.appendChild(el);
    }
    el.setAttribute('content', 'noindex, nofollow');
};

// Sets per-page title/description/JSON-LD at runtime, restoring the
// previous values on unmount. This is a CSR SPA (no SSR/SSG), so this is
// enough for crawlers that execute JS (Google) but NOT for crawlers that
// don't (Facebook/Instagram link previews) — see CLAUDE.md follow-up notes.
export const useDocumentHead = ({ title, description, jsonLd, noindex = false } = {}) => {
    const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : null;

    useEffect(() => {
        const previousTitle = document.title;
        if (title) {
            document.title = title;
            setMetaTag('property', 'og:title', title);
            setMetaTag('property', 'twitter:title', title);
        }
        if (description) {
            setMetaTag('name', 'description', description);
            setMetaTag('property', 'og:description', description);
            setMetaTag('property', 'twitter:description', description);
        }
        setRobotsTag(noindex);

        let script;
        if (jsonLdString) {
            script = document.createElement('script');
            script.type = 'application/ld+json';
            script.text = jsonLdString;
            document.head.appendChild(script);
        }

        return () => {
            document.title = previousTitle;
            setRobotsTag(false);
            if (script) script.remove();
        };
    }, [title, description, jsonLdString, noindex]);
};
