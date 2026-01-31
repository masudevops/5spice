import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Utensils, Info, Phone, Moon, Sun, Menu, X, ChevronDown, Clock, Search } from 'lucide-react';
import clsx from 'clsx';
import useTheme from '../hooks/useTheme';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const siteMode = import.meta.env.VITE_APP_SITE_MODE || 'live';
  const isComingSoon = siteMode === 'coming_soon';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Market', path: '/market' },
    { name: 'Cafe', path: '/cafe' },
    { name: 'Catering', path: '/catering' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // In Coming Soon mode, strictly hide all navigation
  if (isComingSoon) {
    return null;
  }

  return (
    <>
      {/* Top Bar (Info) - Hidden on Mobile */}
      <div className="bg-brand-charcoal text-white text-xs py-2 px-4 hidden md:flex justify-between items-center z-50">
        <div className="container mx-auto flex justify-between">
          <div className="flex gap-6 opacity-90">
            <span className="flex items-center gap-1"><Clock size={12} className="text-brand-gold" /> Daily: 9am - 10pm</span>
            <span className="flex items-center gap-1"><Phone size={12} className="text-brand-gold" /> (123)-456-789</span>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-brand-gold transition-colors">Support</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={clsx(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b border-brand-green/10 backdrop-blur-md",
          isScrolled
            ? "bg-white/95 dark:bg-brand-charcoal/95 shadow-sm py-2"
            : "bg-white dark:bg-brand-charcoal py-4"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex flex-col items-start group">
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-green dark:text-white tracking-tight group-hover:opacity-90 transition-opacity">5 Spice</h1>
            <span className="text-[0.65rem] uppercase tracking-widest text-brand-gold font-semibold">Market & Cafe</span>
          </Link>

          {/* Desktop Nav - Sprouts Style (Clean, Spacious) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "text-sm font-medium tracking-wide transition-colors relative group py-2",
                  location.pathname === link.path ? "text-brand-green font-bold dark:text-brand-gold" : "text-brand-charcoal dark:text-gray-200 hover:text-brand-green dark:hover:text-brand-gold"
                )}
              >
                {link.name}
                <span className={clsx(
                  "absolute bottom-0 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full",
                  location.pathname === link.path ? "w-full" : ""
                )}></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-gray-400 hover:text-brand-gold transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/market" className="bg-brand-green hover:bg-brand-lightGreen text-white px-6 py-2.5 rounded-full font-bold shadow-sm hover:shadow-md transition-all text-sm">
              Shop Market
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2 text-brand-charcoal dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-brand-charcoal z-30 pt-24 px-6 lg:hidden animate-fade-in">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="text-xl font-serif font-bold text-brand-charcoal dark:text-white border-b border-gray-100 dark:border-gray-800 pb-4">
                {link.name}
              </Link>
            ))}
            <Link to="/market" onClick={() => setMobileMenuOpen(false)} className="bg-brand-green text-white py-3 rounded-full font-bold text-lg mt-4 block mx-auto w-full shadow-lg">Shop Market</Link>
          </nav>
        </div>
      )}

      {/* Mobile Bottom Nav (Sticky) - Hidden in specific modes or scroll states if desired, but kept for utility */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-brand-charcoal/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={clsx("flex flex-col items-center p-2", location.pathname === '/' ? "text-brand-green" : "text-gray-400")}>
            <ShoppingBag size={20} /> <span className="text-[10px] mt-1 font-medium">Home</span>
          </Link>
          <Link to="/market" className={clsx("flex flex-col items-center p-2", location.pathname === '/market' ? "text-brand-green" : "text-gray-400")}>
            <Search size={20} /> <span className="text-[10px] mt-1 font-medium">Market</span>
          </Link>
          {/* Center Action Button */}
          <div className="relative -top-5">
            <Link to="/market" className="bg-brand-green text-white p-4 rounded-full shadow-lg border-4 border-white dark:border-brand-charcoal block">
              <ShoppingBag size={24} />
            </Link>
          </div>
          <Link to="/cafe" className={clsx("flex flex-col items-center p-2", location.pathname === '/cafe' ? "text-brand-green" : "text-gray-400")}>
            <Utensils size={20} /> <span className="text-[10px] mt-1 font-medium">Cafe</span>
          </Link>
          <Link to="/contact" className={clsx("flex flex-col items-center p-2", location.pathname === '/contact' ? "text-brand-green" : "text-gray-400")}>
            <Info size={20} /> <span className="text-[10px] mt-1 font-medium">Info</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
