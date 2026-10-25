import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HandHeart, Mail, MapPinned, Menu, Search, ShoppingBag, Utensils, X } from 'lucide-react';
import clsx from 'clsx';
import { CONTACT, isComingSoonMode, LOGOS } from '../config/site';
import { anyVisibleLocationHasFlag, getCateringOpenLocations, getOrderingLocations } from '../data/locations';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import LocationSwitcher from './LocationSwitcher';

const buildNavLinks = () => [
  ...(anyVisibleLocationHasFlag('hasMarket') ? [{ name: 'Market', path: '/market' }] : []),
  { name: 'Kitchen', path: '/kitchen' },
  { name: 'Catering', path: '/catering' },
  { name: 'Locations', path: '/locations' },
  ...(anyVisibleLocationHasFlag('hasWeeklyDeals') ? [{ name: 'Weekly Deals', path: '/sales' }] : []),
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

// Kept separate from the center FAB slot below so the 2 + center + 2 mobile
// tab bar layout stays symmetric.
const buildBottomLinks = () => [
  ...(anyVisibleLocationHasFlag('hasMarket') ? [{ name: 'Market', path: '/market', icon: Search }] : []),
  { name: 'Kitchen', path: '/kitchen', icon: Utensils },
  { name: 'Catering', path: '/catering', icon: HandHeart },
  { name: 'Contact', path: '/contact', icon: Mail },
];

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { selectedSlug, selectLocation, visibleLocations } = useSelectedLocation();
  const menuButtonRef = useRef(null);
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const bottomBarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard focus never ends up hidden behind the sticky header or the
  // phone bottom bar: if it lands under either, scroll it into the clear.
  useEffect(() => {
    const keepClear = (target) => {
      const header = headerRef.current;
      const bar = bottomBarRef.current;
      const rect = target.getBoundingClientRect();
      // Large regions (e.g. <main> after "Skip to content") position themselves.
      if (rect.height > window.innerHeight / 2) return;
      const gap = 12;
      if (bar && getComputedStyle(bar).display !== 'none') {
        const overlap = rect.bottom + gap - bar.getBoundingClientRect().top;
        if (overlap > 0) {
          window.scrollBy({ top: overlap });
          return;
        }
      }
      if (header) {
        const overlap = header.getBoundingClientRect().bottom + gap - rect.top;
        if (overlap > 0) window.scrollBy({ top: -overlap });
      }
    };
    const handleFocusIn = (event) => {
      const target = event.target;
      if (!(target instanceof Element) || target.closest('header, [data-fixed-bar], #mobile-menu, [data-skip-link]')) return;
      // The browser scrolls a newly focused element into view itself (smoothly,
      // with scroll-behavior: smooth), so check after the next frame and again
      // once that scroll has settled.
      const check = () => {
        if (document.activeElement === target) keepClear(target);
      };
      requestAnimationFrame(check);
      setTimeout(check, 400);
    };
    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, []);

  // Keyboard support for the full-screen mobile menu: focus moves into it,
  // Tab stays inside it (plus the close button), and Escape closes it.
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const menu = menuRef.current;
    const focusable = () => [menuButtonRef.current, ...menu.querySelectorAll('a[href], button')].filter(Boolean);
    menu.querySelector('a[href], button')?.focus();

    const handleKeyDown = (event) => {
      // An open location dropdown inside the menu handles Escape itself.
      if (event.defaultPrevented) return;
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusable();
      const first = items[0];
      const last = items[items.length - 1];
      if (!items.includes(document.activeElement)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  if (isComingSoonMode) {
    return null;
  }

  const navLinks = buildNavLinks();
  const bottomLinks = buildBottomLinks();
  // The primary button points at the first location taking restaurant
  // orders. Until one exists, it offers catering (if any location is
  // booking) rather than an ordering page with nothing to order.
  const orderLocation = getOrderingLocations()[0];
  const cateringOpen = getCateringOpenLocations().length > 0;
  const primaryAction = orderLocation
    ? { to: '/pickup', label: `Order from ${orderLocation.shortName}` }
    : cateringOpen
      ? { to: '/catering', label: 'Request Catering' }
      : { to: '/pickup', label: 'Order Online' };
  const selectOrderLocation = () => {
    if (orderLocation) selectLocation(orderLocation.slug);
  };
  const centerAction = orderLocation
    ? { to: '/pickup', label: primaryAction.label, icon: ShoppingBag, onClick: selectOrderLocation }
    : { to: '/locations', label: 'Locations', icon: MapPinned };
  const statusLine = visibleLocations
    .map((loc) => `${loc.shortName}: ${loc.openingText}`)
    .join('  |  ');
  const midpoint = Math.ceil(bottomLinks.length / 2);

  return (
    <>
      <div className="hidden border-b border-brand-gold-deep/15 bg-ink-900 text-xs text-brand-cream/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2">
          {visibleLocations.length > 1 ? (
            <LocationSwitcher locations={visibleLocations} selectedSlug={selectedSlug} onSelect={selectLocation} />
          ) : (
            <span className="uppercase tracking-[0.28em] text-brand-gold">{CONTACT.city}</span>
          )}
          <span>{statusLine}</span>
        </div>
      </div>

      <header
        ref={headerRef}
        className={clsx(
          'sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300',
          isScrolled
            ? 'border-brand-gold-deep/25 bg-ink-900/92 shadow-[0_18px_60px_rgba(0,0,0,0.28)]'
            : 'border-brand-gold-deep/12 bg-ink-900/82'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center" aria-label="5Spice Market & Kitchen home">
            <img
              src={LOGOS.wide}
              width={LOGOS.wideWidth}
              height={LOGOS.wideHeight}
              alt="5Spice Market & Kitchen"
              className="h-14 w-auto object-contain transition-opacity hover:opacity-90 xl:h-[4.75rem]"
            />
          </Link>

          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-current={isActive ? 'page' : undefined}
                  className={clsx(
                    'relative whitespace-nowrap py-2 text-sm font-medium tracking-[0.08em] transition-colors xl:tracking-[0.16em]',
                    isActive ? 'text-brand-gold' : 'text-brand-cream/74 hover:text-white'
                  )}
                >
                  {link.name}
                  <span
                    className={clsx(
                      'absolute inset-x-0 -bottom-1 h-px bg-brand-gold transition-transform',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to={primaryAction.to}
              onClick={selectOrderLocation}
              className="whitespace-nowrap bg-brand-green px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink-900 transition-colors hover:bg-brand-green-light xl:px-5 xl:tracking-[0.16em]"
            >
              {primaryAction.label}
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-brand-gold-deep/30 text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div id="mobile-menu" ref={menuRef} className="fixed inset-0 z-30 overflow-y-auto bg-ink-900/98 px-6 pb-24 pt-28 lg:hidden">
          <nav className="mx-auto flex max-w-sm flex-col gap-3 text-center" aria-label="Mobile navigation">
            {visibleLocations.length > 1 && (
              <div className="mb-2 flex justify-center">
                <LocationSwitcher
                  locations={visibleLocations}
                  selectedSlug={selectedSlug}
                  onSelect={selectLocation}
                  panelClassName="left-1/2 -translate-x-1/2"
                />
              </div>
            )}
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="border border-brand-gold-deep/20 px-5 py-4 font-serif text-xl font-semibold text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold"
              >
                {link.name}
              </Link>
            ))}
            <Link to={primaryAction.to} onClick={() => { selectOrderLocation(); setMobileMenuOpen(false); }} className="mt-3 bg-brand-green px-5 py-4 font-bold uppercase tracking-[0.18em] text-ink-900">
              {primaryAction.label}
            </Link>
          </nav>
        </div>
      )}

      <nav ref={bottomBarRef} data-fixed-bar className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-gold-deep/20 bg-ink-900/95 pb-safe shadow-[0_-18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl md:hidden" aria-label="Mobile quick navigation">
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-stretch">
          {bottomLinks.slice(0, midpoint).map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} aria-current={isActive ? 'page' : undefined} className={clsx('flex h-full flex-col items-center justify-center gap-1 text-xs font-medium', isActive ? 'text-brand-gold' : 'text-brand-cream/55')}>
                <Icon size={19} />
                {link.name}
              </Link>
            );
          })}
          <Link to={centerAction.to} onClick={centerAction.onClick} aria-label={centerAction.label} className="mx-auto -mt-7 flex h-14 w-14 self-center items-center justify-center rounded-full border-4 border-ink-900 bg-brand-green text-ink-900 shadow-lg">
            <centerAction.icon size={24} />
          </Link>
          {bottomLinks.slice(midpoint).map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} aria-current={isActive ? 'page' : undefined} className={clsx('flex h-full flex-col items-center justify-center gap-1 text-xs font-medium', isActive ? 'text-brand-gold' : 'text-brand-cream/55')}>
                <Icon size={19} />
                {link.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
