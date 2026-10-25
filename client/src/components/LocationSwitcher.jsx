import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import clsx from 'clsx';

// Assigned to plain identifiers (rather than used as `motion.span` /
// `motion.ul` JSX member expressions) so the project's no-unused-vars rule,
// which has no JSX-member-expression awareness, doesn't flag `motion`.
const MotionSpan = motion.span;
const MotionUl = motion.ul;

const typeLabel = (location) => {
    if (location.flags.hasMarket && location.flags.hasKitchen) return 'Market & Kitchen';
    if (location.flags.hasMarket) return 'Market Only';
    return 'Restaurant & Catering';
};

// Branded replacement for a native <select> — a button that opens a small
// panel of location buttons (a disclosure: arrow keys move between them,
// Escape closes and returns focus to the button), styled with the same tokens used across LocationCard,
// Catering, etc. (ink-800 panel, brand-gold-deep/25 borders, brand-gold accent),
// so switching locations reads as part of the site, not a browser control.
// Renders nothing when there's nothing to choose between.
const LocationSwitcher = ({ locations, selectedSlug, onSelect, className, panelClassName }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const buttonRef = useRef(null);
    const panelId = useId();

    useEffect(() => {
        if (!open) return undefined;

        const handlePointerDown = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handlePointerDown);
        return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [open]);

    if (!locations || locations.length <= 1) return null;

    const selected = locations.find((location) => location.slug === selectedSlug) ?? locations[0];

    const handleSelect = (slug) => {
        onSelect(slug);
        setOpen(false);
        buttonRef.current?.focus();
    };

    const optionButtons = () => [...(containerRef.current?.querySelectorAll('[data-location-option]') ?? [])];
    const focusOption = (index) => {
        const options = optionButtons();
        options[(index + options.length) % options.length]?.focus();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && open) {
            // Marked handled so an enclosing menu doesn't also close.
            event.preventDefault();
            setOpen(false);
            buttonRef.current?.focus();
            return;
        }
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        const options = optionButtons();
        const current = options.indexOf(document.activeElement);
        if (!open) {
            setOpen(true);
            // Focus the selected location once the panel has rendered.
            requestAnimationFrame(() => {
                const opened = optionButtons();
                opened[Math.max(0, locations.findIndex((location) => location.slug === selected.slug))]?.focus();
            });
            return;
        }
        if (event.key === 'Home') focusOption(0);
        else if (event.key === 'End') focusOption(-1);
        else if (current === -1) focusOption(event.key === 'ArrowUp' ? -1 : 0);
        else focusOption(current + (event.key === 'ArrowDown' ? 1 : -1));
    };

    // Close when keyboard focus leaves the switcher entirely.
    const handleBlur = (event) => {
        if (open && !containerRef.current?.contains(event.relatedTarget)) setOpen(false);
    };

    return (
        <MotionConfig reducedMotion="user">
            <div ref={containerRef} onKeyDown={handleKeyDown} onBlur={handleBlur} className={clsx('relative inline-block text-left', className)}>
                <button
                    ref={buttonRef}
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    aria-label={`Location: ${selected.shortName}. Change location`}
                    className="tap-area inline-flex items-center gap-2 border border-brand-gold-deep/30 bg-ink-800 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-brand-cream/85 transition-colors hover:border-brand-gold hover:text-white focus:border-brand-gold focus:outline-none"
                >
                    <MapPin size={14} className="shrink-0 text-brand-gold" aria-hidden="true" />
                    <span>{selected.shortName}</span>
                    <MotionSpan animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }} className="flex" aria-hidden="true">
                        <ChevronDown size={13} />
                    </MotionSpan>
                </button>

                <AnimatePresence>
                    {open && (
                        <MotionUl
                            id={panelId}
                            aria-label="Choose a 5Spice location"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.16 }}
                            className={clsx(
                                'absolute z-50 mt-2 w-72 border border-brand-gold-deep/25 bg-ink-800 p-1.5 text-left shadow-[0_18px_50px_rgba(0,0,0,0.45)]',
                                panelClassName || 'left-0'
                            )}
                        >
                            {locations.map((location) => {
                                const isSelected = location.slug === selected.slug;
                                return (
                                    <li key={location.slug}>
                                        <button
                                            type="button"
                                            data-location-option
                                            aria-current={isSelected ? 'true' : undefined}
                                            onClick={() => handleSelect(location.slug)}
                                            className={clsx(
                                                'flex w-full flex-col gap-0.5 border-l-2 px-3 py-2.5 text-left transition-colors',
                                                isSelected
                                                    ? 'border-brand-gold bg-white/[0.04]'
                                                    : 'border-transparent hover:border-brand-gold/50 hover:bg-white/[0.03]'
                                            )}
                                        >
                                            <span className={clsx('font-serif text-base font-semibold', isSelected ? 'text-brand-gold' : 'text-white')}>
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
        </MotionConfig>
    );
};

export default LocationSwitcher;
