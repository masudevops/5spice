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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Supermarket', path: '/supermarket' },
    { name: 'Restaurant', path: '/restaurant' },
    { name: 'Weekly Sales', path: '/sales', isNew: true },
    { name: 'Catering', path: '/catering' },
  ];

  return (
    <>
      {/* Top Bar (Info) */}
      <div className="bg-brand-charcoal text-white text-xs py-2 px-4 hidden md:flex justify-between items-center z-50 relative">
        <div className="container mx-auto flex justify-between">
          <div className="flex gap-6">
            <span className="flex items-center gap-1 opacity-80 hover:opacity-100 transition"><Clock size={12} /> Open Daily: 9am - 10pm</span>
            <span className="flex items-center gap-1 opacity-80 hover:opacity-100 transition"><Phone size={12} /> (972) 555-0123</span>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-brand-gold transition">Contact Support</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={clsx(
          "sticky top-0 z-40 w-full transition-all duration-300 border-b border-white/10 backdrop-blur-md",
          isScrolled
            ? "bg-white/95 dark:bg-brand-charcoal/95 shadow-md py-2"
            : "bg-white dark:bg-brand-charcoal py-4"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <h1 className="font-serif text-3xl font-bold text-brand-red tracking-tight group-hover:scale-105 transition-transform">Five Spice</h1>
            <span className="text-[0.65rem] uppercase tracking-widest text-brand-green dark:text-brand-gold font-semibold">Supermarket & Restaurant</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "text-sm font-medium tracking-wide transition-colors relative group",
                  location.pathname === link.path ? "text-brand-red font-bold" : "text-gray-700 dark:text-gray-200 hover:text-brand-red"
                )}
              >
                {link.name}
                {link.isNew && <span className="absolute -top-3 -right-3 text-[0.5rem] bg-brand-gold text-brand-charcoal px-1 rounded font-bold">NEW</span>}
                <span className={clsx(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full",
                  location.pathname === link.path ? "w-full" : ""
                )}></span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:text-brand-gold transition-colors">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/pickup" className="bg-brand-red hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 text-sm">
              Order Online – Pickup & Delivery
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white dark:bg-brand-charcoal z-30 pt-24 px-6 lg:hidden animate-fade-in">
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map(link => (
              <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif font-bold text-brand-charcoal dark:text-white">
                {link.name}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-xl text-brand-red">Contact Us</Link>
            <Link to="/pickup" onClick={() => setMobileMenuOpen(false)} className="bg-brand-red text-white py-3 rounded-xl font-bold text-xl mt-4 block mx-auto w-full">Order Online – Pickup & Delivery</Link>
          </nav>
        </div>
      )}

      {/* Mobile Bottom Nav (Sticky) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-brand-charcoal/90 backdrop-blur-lg border-t border-gray-200 dark:border-gray-800 z-50 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={clsx("flex flex-col items-center p-2", location.pathname === '/' ? "text-brand-red" : "text-gray-400")}>
            <ShoppingBag size={20} /> <span className="text-[10px] mt-1">Home</span>
          </Link>
          <Link to="/supermarket" className={clsx("flex flex-col items-center p-2", location.pathname === '/supermarket' ? "text-brand-red" : "text-gray-400")}>
            <Search size={20} /> <span className="text-[10px] mt-1">Supermarket</span>
          </Link>
          <div className="relative -top-5">
            <Link to="/pickup" className="bg-brand-red text-white p-4 rounded-full shadow-lg border-4 border-white dark:border-brand-charcoal block">
              <Utensils size={24} />
            </Link>
          </div>
          <Link to="/restaurant" className={clsx("flex flex-col items-center p-2", location.pathname === '/restaurant' ? "text-brand-red" : "text-gray-400")}>
            <Utensils size={20} /> <span className="text-[10px] mt-1">Menu</span>
          </Link>
          <Link to="/collection" className="flex flex-col items-center p-2 text-gray-400">
            <Menu size={20} onClick={() => setMobileMenuOpen(true)} /> <span className="text-[10px] mt-1">More</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
