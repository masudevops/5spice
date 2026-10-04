import { plano } from './plano.js';
import { murphy } from './murphy.js';

// Add a new location by creating a file next to this one (copy plano.js or
// murphy.js as a starting point) and adding it to this array.
export const LOCATIONS = [plano, murphy];

export const getAllLocations = () => LOCATIONS;

export const getVisibleLocations = () => LOCATIONS.filter((location) => location.status !== 'hidden');

export const getLocationBySlug = (slug) => LOCATIONS.find((location) => location.slug === slug);

export const getVisibleLocationBySlug = (slug) => getVisibleLocations().find((location) => location.slug === slug);

export const getDefaultLocation = () => getVisibleLocations()[0] ?? null;

export const anyVisibleLocationHasFlag = (flagKey) =>
    getVisibleLocations().some((location) => Boolean(location.flags[flagKey]));
