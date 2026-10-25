import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { isComingSoonMode } from '../config/site';

// Moves keyboard focus to the page content. Handled in JS rather than as a
// plain #main-content link so the URL doesn't pick up a hash.
const skipToContent = (event) => {
    event.preventDefault();
    const main = document.getElementById('main-content');
    main?.focus({ preventScroll: true });
    main?.scrollIntoView();
};

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-ink-900 text-brand-cream transition-colors duration-300 font-sans">
            <a
                href="#main-content"
                data-skip-link
                onClick={skipToContent}
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-brand-gold focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink-900"
            >
                Skip to content
            </a>
            <ScrollToTop />
            <Navbar />
            <main id="main-content" tabIndex={-1} className="flex-grow focus:outline-none">
                {children}
            </main>
            {!isComingSoonMode && <Footer />}
        </div>
    );
};

export default Layout;
