import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { isComingSoonMode } from '../config/site';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-ink-900 text-brand-cream transition-colors duration-300 font-sans">
            <ScrollToTop />
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {!isComingSoonMode && <Footer />}
        </div>
    );
};

export default Layout;
