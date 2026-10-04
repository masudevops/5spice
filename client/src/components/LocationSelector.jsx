import { MapPin } from 'lucide-react';
import clsx from 'clsx';

// Native <select> so it's accessible and keyboard-usable with zero extra
// dependencies. Renders nothing when there's nothing to choose between.
const LocationSelector = ({ locations, selectedSlug, onSelect, className, label = 'Choose a 5Spice location' }) => {
    if (!locations || locations.length <= 1) return null;

    return (
        <label className={clsx('inline-flex items-center gap-2 text-sm text-[#F0EAD6]/80', className)}>
            <MapPin size={16} className="shrink-0 text-[#D4A84B]" aria-hidden="true" />
            <select
                value={selectedSlug ?? ''}
                onChange={(event) => onSelect(event.target.value)}
                aria-label={label}
                className="border border-[#B88A3D]/30 bg-[#141414] px-2 py-1.5 text-sm text-[#F0EAD6] focus:border-[#D4A84B] focus:outline-none"
            >
                {locations.map((location) => (
                    <option key={location.slug} value={location.slug}>
                        {location.shortName}
                    </option>
                ))}
            </select>
        </label>
    );
};

export default LocationSelector;
