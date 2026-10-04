import { useCallback, useState } from 'react';
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

// Remembers the visitor's chosen location (for Menu / Order Online links)
// across visits, falling back to the first visible location.
export const useSelectedLocation = () => {
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

    return {
        selectedLocation: effectiveSlug ? getVisibleLocationBySlug(effectiveSlug) : null,
        selectedSlug: effectiveSlug,
        selectLocation,
        visibleLocations: getVisibleLocations(),
    };
};
