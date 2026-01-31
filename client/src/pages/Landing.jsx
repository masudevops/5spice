import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Utensils, Users } from 'lucide-react';

const Landing = () => {
    const siteMode = import.meta.env.VITE_APP_SITE_MODE || 'live';
    const isComingSoon = siteMode === 'coming_soon';
    const isGrandOpening = siteMode === 'grand_opening';

    // 1. COMING SOON MODE (Strict, Locked Version)
    if (isComingSoon) {
        return (
            <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6 relative overflow-hidden">
                {/* Background Ambient Effects (Subtle) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#141414] to-black opacity-90"></div>
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-green/5 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-gold/5 blur-[150px] rounded-full"></div>

                <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center">

                    {/* 1. Brand Logo */}
                    <div className="mb-12 animate-fade-in flex flex-col items-center">
                        <h1 className="font-serif text-3xl md:text-4xl font-bold text-white tracking-widest uppercase">5 Spice</h1>
                        <span className="text-[0.65rem] md:text-xs uppercase tracking-[0.3em] text-brand-gold font-semibold block mt-1.5">
                            Market & Cafe
                        </span>
                    </div>

                    {/* 2. Location Kicker */}
                    <span className="text-brand-gold/80 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-6 block animate-fade-in delay-100">
                        Dallas / Fort Worth
                    </span>

                    {/* 3. Primary Headline */}
                    <h2 className="font-serif text-5xl md:text-7xl font-bold text-white mb-8 leading-[1.1] animate-fade-in delay-200">
                        Coming Soon to DFW
                    </h2>

                    {/* 4. Supporting Subheadline */}
                    <p className="text-lg md:text-2xl text-gray-300 mb-12 leading-relaxed font-light max-w-xl animate-fade-in delay-300">
                        A new destination for fresh halal groceries and authentic South Asian & Middle Eastern flavors.
                    </p>

                    {/* 5. Opening Timeframe Badge */}
                    <div className="inline-block bg-white/5 border border-white/10 backdrop-blur-md px-10 py-4 rounded-full text-brand-gold font-medium tracking-wide animate-fade-in delay-500">
                        Opening Fall 2026
                    </div>
                </div>
            </div>
        );
    }

    // 2. LIVE / GRAND OPENING MODE
    return (
        <div className="flex flex-col bg-brand-cream dark:bg-brand-dark transition-colors duration-500">

            {/* Grand Opening Banner */}
            {isGrandOpening && (
                <div className="bg-brand-green text-white py-3 px-4 text-center text-sm md:text-base font-medium relative overflow-hidden">
                    <div className="absolute inset-0 bg-white/5 skew-x-12 transform -translate-x-full animate-shimmer"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        🎉 Grand Opening! We're excited to welcome the community to 5 Spice Market & Cafe.
                        <Link to="/market" className="underline hover:text-brand-gold transition-colors ml-2 font-bold">Visit Us Today</Link>
                    </span>
                </div>
            )}

            {/* Hero Section - Calm, Premium, Spacious */}
            <section className="relative min-h-[85vh] flex items-center bg-brand-cream dark:bg-brand-charcoal overflow-hidden">
                {/* Split Background */}
                <div className="absolute right-0 top-0 w-full md:w-1/2 h-full bg-brand-green/5 dark:bg-brand-green/10"></div>

                <div className="container mx-auto px-4 z-20 pt-12 md:pt-0">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">

                        {/* Text Content */}
                        <div className="md:w-1/2 animate-fade-in-up">
                            <span className="text-brand-green dark:text-brand-gold font-bold tracking-widest uppercase mb-4 block text-xs md:text-sm">
                                Rooted in Tradition. Crafted for Today.
                            </span>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-brand-charcoal dark:text-white mb-8 leading-[1.1]">
                                Bringing Together the Flavors of Our Heritage.
                            </h1>
                            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed font-light">
                                Experience fresh halal groceries, authentic South Asian & Middle Eastern cuisine, and a community-first shopping experience.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/market" className="bg-brand-green hover:bg-brand-lightGreen text-white px-8 py-4 rounded-full font-bold shadow-md hover:shadow-lg transition-all text-center">
                                    Shop Market
                                </Link>
                                <Link to="/cafe" className="bg-white dark:bg-white/10 text-brand-green dark:text-white border border-brand-green/20 dark:border-white/20 px-8 py-4 rounded-full font-bold hover:bg-brand-green/5 transition-all text-center">
                                    View Cafe Menu
                                </Link>
                            </div>
                        </div>

                        {/* Visual Content - Sprout/Whole Foods Vibe */}
                        <div className="md:w-1/2 relative md:h-[600px] w-full flex items-center justify-center animate-fade-in-up delay-200">
                            <div className="relative w-full max-w-md aspect-square">
                                {/* Decorative circle */}
                                <div className="absolute inset-0 bg-brand-green/10 rounded-full scale-90 blur-3xl"></div>

                                {/* Placeholder for High Quality Lifestyle Image */}
                                <div className="absolute inset-4 bg-white dark:bg-brand-charcoal rounded-[2rem] shadow-2xl overflow-hidden border border-white/50 dark:border-white/10 rotate-2 hover:rotate-0 transition-transform duration-700">
                                    {/* ✅ REPLACE THIS PLACEHOLDER WITH YOUR IMAGE */}
                                    {/* Recommended dimensions: 1000x1000px or square aspect ratio */}
                                    {/* usage: <img src="/path/to/your/image.jpg" alt="..." className="w-full h-full object-cover" /> */}
                                    <div className="w-full h-full bg-brand-green/20 flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-brand-green/30">
                                        <div className="text-brand-green font-bold text-xl mb-2 tracking-widest uppercase">
                                            Upload Image Here
                                        </div>
                                        <p className="text-brand-green/70 text-sm font-light">
                                            Place your store interior photo here.<br />
                                            (1000x1000px Recommended)
                                        </p>
                                    </div>
                                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                                        <p className="text-white font-serif italic text-lg">Fresh. Halal. Local.</p>
                                    </div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -top-4 -right-4 bg-brand-gold text-brand-green w-24 h-24 rounded-full flex items-center justify-center shadow-lg animate-bounce-slow z-20">
                                    <span className="text-center font-bold text-xs uppercase leading-tight">
                                        Zabiha<br />Halal
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights Section */}
            <section className="py-24 bg-white dark:bg-brand-charcoal">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Market Card */}
                        <div className="group p-8 rounded-2xl bg-brand-cream dark:bg-white/5 hover:bg-brand-green/5 transition-colors duration-300">
                            <div className="w-12 h-12 bg-white dark:bg-brand-green rounded-full flex items-center justify-center text-brand-green dark:text-white mb-6 shadow-sm">
                                <ShoppingBag size={24} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brand-charcoal dark:text-white mb-3 group-hover:text-brand-green transition-colors">The Market</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Hand-picked produce, premium zabiha halal meats, and a curated selection of global spices and pantry staples.
                            </p>
                            <Link to="/market" className="text-brand-green font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-wider">
                                Explore Aisles <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Kitchen Card */}
                        <div className="group p-8 rounded-2xl bg-brand-cream dark:bg-white/5 hover:bg-brand-green/5 transition-colors duration-300">
                            <div className="w-12 h-12 bg-white dark:bg-brand-green rounded-full flex items-center justify-center text-brand-green dark:text-white mb-6 shadow-sm">
                                <Utensils size={24} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brand-charcoal dark:text-white mb-3 group-hover:text-brand-green transition-colors">The Kitchen</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                Authentic recipes passed down through generations. From aromatic biryanis to grilled kebabs.
                            </p>
                            <Link to="/cafe" className="text-brand-green font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-wider">
                                View Menu <ArrowRight size={16} />
                            </Link>
                        </div>

                        {/* Community Card */}
                        <div className="group p-8 rounded-2xl bg-brand-cream dark:bg-white/5 hover:bg-brand-green/5 transition-colors duration-300">
                            <div className="w-12 h-12 bg-white dark:bg-brand-green rounded-full flex items-center justify-center text-brand-green dark:text-white mb-6 shadow-sm">
                                <Users size={24} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-brand-charcoal dark:text-white mb-3 group-hover:text-brand-green transition-colors">The Community</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                A gathering place for families. We are proud to serve the diverse communities of Dallas-Fort Worth.
                            </p>
                            <Link to="/about" className="text-brand-green font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm uppercase tracking-wider">
                                Our Story <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
