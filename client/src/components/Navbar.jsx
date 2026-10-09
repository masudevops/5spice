import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BadgePercent, HandHeart, Mail, MapPinned, Menu, Search, Utensils, X } from 'lucide-react';
import clsx from 'clsx';
import { CONTACT, isComingSoonMode, LOGOS } from '../config/site';
import { anyVisibleLocationHasFlag } from '../data/locations';
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isComingSoonMode) {
    return null;
  }

  const navLinks = buildNavLinks();
  const bottomLinks = buildBottomLinks();
  const hasWeeklyDeals = anyVisibleLocationHasFlag('hasWeeklyDeals');
  const centerAction = hasWeeklyDeals
    ? { to: '/sales', label: 'Weekly Deals', icon: BadgePercent }
    : { to: '/locations', label: 'Locations', icon: MapPinned };
  const midpoint = Math.ceil(bottomLinks.length / 2);

  return (
    <>
      <div className="hidden border-b border-[#B88A3D]/15 bg-[#0E0E0E] text-xs text-[#F0EAD6]/70 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2">
          {visibleLocations.length > 1 ? (
            <LocationSwitcher locations={visibleLocations} selectedSlug={selectedSlug} onSelect={selectLocation} />
          ) : (
            <span className="uppercase tracking-[0.28em] text-[#D4A84B]">{CONTACT.city}</span>
          )}
          <span>Premium Halal Grocery · Fresh Fish · Fresh Restaurant</span>
        </div>
      </div>

      <header
        className={clsx(
          'sticky top-0 z-40 border-b backdrop-blur-xl transition-all duration-300',
          isScrolled
            ? 'border-[#B88A3D]/25 bg-[#0E0E0E]/92 shadow-[0_18px_60px_rgba(0,0,0,0.28)]'
            : 'border-[#B88A3D]/12 bg-[#0E0E0E]/82'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          <Link to="/" className="flex items-center" aria-label="5Spice Market & Kitchen home">
            <img
              src={LOGOS.wide}
              alt="5Spice Market & Kitchen"
              className="h-12 w-auto object-contain transition-opacity hover:opacity-90 md:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={clsx(
                    'relative py-2 text-sm font-medium tracking-[0.16em] transition-colors',
                    isActive ? 'text-[#D4A84B]' : 'text-[#F0EAD6]/74 hover:text-white'
                  )}
                >
                  {link.name}
                  <span
                    className={clsx(
                      'absolute inset-x-0 -bottom-1 h-px bg-[#D4A84B] transition-transform',
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/pickup"
              className="bg-[#1CA433] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]"
            >
              Order Online
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center border border-[#B88A3D]/30 text-[#F0EAD6] transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B] lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0E0E0E]/98 px-6 pb-24 pt-28 lg:hidden">
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
                className="border border-[#B88A3D]/20 px-5 py-4 font-serif text-xl font-semibold text-[#F0EAD6] transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B]"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/pickup" onClick={() => setMobileMenuOpen(false)} className="mt-3 bg-[#1CA433] px-5 py-4 font-bold uppercase tracking-[0.18em] text-white">
              Order Online
            </Link>
          </nav>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#B88A3D]/20 bg-[#0E0E0E]/95 pb-safe shadow-[0_-18px_60px_rgba(0,0,0,0.32)] backdrop-blur-xl md:hidden" aria-label="Mobile quick navigation">
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-center">
          {bottomLinks.slice(0, midpoint).map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className={clsx('flex flex-col items-center gap-1 text-[0.68rem] font-medium', isActive ? 'text-[#D4A84B]' : 'text-[#F0EAD6]/55')}>
                <Icon size={19} />
                {link.name}
              </Link>
            );
          })}
          <Link to={centerAction.to} aria-label={centerAction.label} className="mx-auto -mt-7 flex h-14 w-14 items-center justify-center rounded-full border-4 border-[#0E0E0E] bg-[#1CA433] text-white shadow-lg">
            <centerAction.icon size={24} />
          </Link>
          {bottomLinks.slice(midpoint).map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} className={clsx('flex flex-col items-center gap-1 text-[0.68rem] font-medium', isActive ? 'text-[#D4A84B]' : 'text-[#F0EAD6]/55')}>
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
