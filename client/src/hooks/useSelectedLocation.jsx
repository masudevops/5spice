import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { getDefaultLocation, getVisibleLocationBySlug, getVisibleLocations } from '../data/locations';

const STORAGE_KEY = '5spice:selectedLocationSlug';

const readStoredSlug = () => {
    try {
        return window.localStorage.getItem(STORAGE_KEY);
    } catch {
        return null;
    }
};

const writeStoredSlug = (slug) => {
    try {
        window.localStorage.setItem(STORAGE_KEY, slug);
    } catch {
        // localStorage unavailable (private browsing, disabled storage, etc.) — ignore.
    }
};

const SelectedLocationContext = createContext(null);

// One shared instance of the visitor's chosen location, provided once near
// the app root. Every useSelectedLocation() call below reads the same
// state, so switching location in the Navbar is reflected immediately on
// Market/Kitchen/Pickup — not just in whichever component changed it.
export const SelectedLocationProvider = ({ children }) => {
    const [selectedSlug, setSelectedSlug] = useState(() => {
        const stored = readStoredSlug();
        if (stored && getVisibleLocationBySlug(stored)) return stored;
        return getDefaultLocation()?.slug ?? null;
    });

    const selectLocation = useCallback((slug) => {
        if (!getVisibleLocationBySlug(slug)) return;
        setSelectedSlug(slug);
        writeStoredSlug(slug);
    }, []);

    // Falls back to the default location at render time (rather than via a
    // setState effect) if the stored slug stops being valid — e.g. a
    // location was hidden after the visitor's last session.
    const effectiveSlug = selectedSlug && getVisibleLocationBySlug(selectedSlug)
        ? selectedSlug
        : getDefaultLocation()?.slug ?? null;

    const value = useMemo(() => ({
        selectedLocation: effectiveSlug ? getVisibleLocationBySlug(effectiveSlug) : null,
        selectedSlug: effectiveSlug,
        selectLocation,
        visibleLocations: getVisibleLocations(),
    }), [effectiveSlug, selectLocation]);

    return (
        <SelectedLocationContext.Provider value={value}>
            {children}
        </SelectedLocationContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components -- context + provider + hook live together deliberately; only costs a full reload on edits to this file during dev, not a correctness issue.
export const useSelectedLocation = () => {
    const context = useContext(SelectedLocationContext);
    if (!context) {
        throw new Error('useSelectedLocation must be used within a SelectedLocationProvider');
    }
    return context;
};
