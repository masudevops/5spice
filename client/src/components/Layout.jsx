import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    const siteMode = import.meta.env.VITE_APP_SITE_MODE || 'live';
    const isComingSoon = siteMode === 'coming_soon';

    return (
        <div className="min-h-screen flex flex-col bg-brand-cream dark:bg-brand-dark dark:text-gray-100 transition-colors duration-300 font-sans">
            <Navbar />
            <main className="flex-grow">
                {children}
            </main>
            {!isComingSoon && <Footer />}
        </div>
    );
};

export default Layout;
