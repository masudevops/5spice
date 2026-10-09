import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

// Assigned to plain identifiers (rather than used as `motion.span` /
// `motion.ul` JSX member expressions) so the project's no-unused-vars rule,
// which has no JSX-member-expression awareness, doesn't flag `motion`.
const MotionSpan = motion.span;
const MotionUl = motion.ul;

const typeLabel = (location) => {
    if (location.flags.hasMarket && location.flags.hasKitchen) return 'Market & Kitchen';
    if (location.flags.hasMarket) return 'Market Only';
    return 'Kitchen Only';
};

// Branded replacement for a native <select> — a button that opens a small
// listbox panel styled with the same tokens used across LocationCard,
// Catering, etc. (#141414 panel, #B88A3D/25 borders, #D4A84B gold accent),
// so switching locations reads as part of the site, not a browser control.
// Renders nothing when there's nothing to choose between.
const LocationSwitcher = ({ locations, selectedSlug, onSelect, className, panelClassName }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const listboxId = useId();

    useEffect(() => {
        if (!open) return undefined;

        const handlePointerDown = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    if (!locations || locations.length <= 1) return null;

    const selected = locations.find((location) => location.slug === selectedSlug) ?? locations[0];

    const handleSelect = (slug) => {
        onSelect(slug);
        setOpen(false);
    };

    return (
        <div ref={containerRef} className={clsx('relative inline-block text-left', className)}>
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listboxId}
                className="inline-flex items-center gap-2 border border-[#B88A3D]/30 bg-[#141414] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-[#F0EAD6]/85 transition-colors hover:border-[#D4A84B] hover:text-white focus:border-[#D4A84B] focus:outline-none"
            >
                <MapPin size={14} className="shrink-0 text-[#D4A84B]" aria-hidden="true" />
                <span>{selected.shortName}</span>
                <MotionSpan animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} className="flex">
                    <ChevronDown size={13} />
                </MotionSpan>
            </button>

            <AnimatePresence>
                {open && (
                    <MotionUl
                        id={listboxId}
                        role="listbox"
                        aria-label="Choose a 5Spice location"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.16 }}
                        className={clsx(
                            'absolute z-50 mt-2 w-72 border border-[#B88A3D]/25 bg-[#141414] p-1.5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.45)]',
                            panelClassName || 'left-0'
                        )}
                    >
                        {locations.map((location) => {
                            const isSelected = location.slug === selected.slug;
                            return (
                                <li key={location.slug} role="option" aria-selected={isSelected}>
                                    <button
                                        type="button"
                                        onClick={() => handleSelect(location.slug)}
                                        className={clsx(
                                            'flex w-full flex-col gap-0.5 border-l-2 px-3 py-2.5 text-left transition-colors',
                                            isSelected
                                                ? 'border-[#D4A84B] bg-white/[0.04]'
                                                : 'border-transparent hover:border-[#D4A84B]/50 hover:bg-white/[0.03]'
                                        )}
                                    >
                                        <span className={clsx('font-serif text-base font-semibold', isSelected ? 'text-[#D4A84B]' : 'text-white')}>
                                            {location.shortName}
                                        </span>
                                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/40">
                                            {typeLabel(location)}
                                        </span>
                                        <span className="text-xs text-white/55">{location.openingText}</span>
                                    </button>
                                </li>
                            );
                        })}
                    </MotionUl>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LocationSwitcher;
