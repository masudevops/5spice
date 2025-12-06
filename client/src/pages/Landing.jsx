import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Utensils, Award, Users } from 'lucide-react';

const Landing = () => {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center bg-brand-charcoal overflow-hidden">
                <div className="absolute inset-0 bg-hero-pattern opacity-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal via-brand-charcoal/90 to-transparent z-10"></div>
                {/* Abstract Shapes/Images would go here */}

                <div className="container mx-auto px-4 z-20 text-center md:text-left pt-20 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 mb-10 md:mb-0 z-10 animate-fade-in-up">
                        <span className="text-brand-gold font-bold tracking-widest uppercase mb-4 block">COMING SOON TO DFW</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                            Bringing Together the Flavors of Our Heritage.
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 max-w-lg leading-relaxed show-shadow">
                            Experience fresh halal groceries, authentic South Asian & Middle Eastern cuisine, and a community-first shopping experience.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/supermarket" className="bg-brand-red hover:bg-red-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg">
                                Shop Groceries
                            </Link>
                            <Link to="/restaurant" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold transition-all text-lg">
                                View Menu
                            </Link>
                        </div>
                    </div>

                    {/* Hero Image/Graphic */}
                    <div className="md:w-1/2 relative z-10 animate-fade-in-up delay-200">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-brand-gold/20 rounded-full blur-3xl animate-pulse"></div>
                            <img src="https://placehold.co/600x600?text=Grand+Opening" alt="Grand Opening" className="relative rounded-3xl shadow-2xl border-4 border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-700" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Preview */}
            <section className="py-24 bg-brand-cream dark:bg-brand-dark">
                <div className="container mx-auto px-4 -mt-16 md:-mt-24 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white dark:bg-brand-charcoal p-8 rounded-2xl shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-brand-green">
                                <ShoppingBag size={32} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-white mb-3">Premium Supermarket</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Fresh styling, hand-picked produce, and zabiha halal meats.</p>
                            <Link to="/supermarket" className="text-brand-green font-bold flex items-center gap-1 hover:gap-2 transition-all">Explore Supermarket <ArrowRight size={16} /></Link>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white dark:bg-brand-charcoal p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-b-4 border-brand-red">
                            <div className="bg-brand-red/10 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-brand-red">
                                <Utensils size={28} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-white mb-3">Authentic Kitchen</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">Savor the taste of tradition with our Kacchi Biryani, Karahi, and grilled specialties.</p>
                            <Link to="/restaurant" className="text-brand-red font-bold flex items-center gap-1 hover:gap-2 transition-all">See Menu <ArrowRight size={16} /></Link>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white dark:bg-brand-charcoal p-8 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-b-4 border-brand-gold">
                            <div className="bg-brand-gold/10 w-14 h-14 rounded-full flex items-center justify-center mb-6 text-brand-gold">
                                <Award size={28} />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-gray-800 dark:text-white mb-3">Halal Certified</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">100% Zabiha Halal meat and ingredients you can trust for your family.</p>
                            <Link to="/about" className="text-brand-gold font-bold flex items-center gap-1 hover:gap-2 transition-all">Our Promise <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Section */}
            <section className="py-24 bg-white dark:bg-black/20">
                <div className="container mx-auto px-4 text-center">
                    <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">Our Community</span>
                    <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">Serving DFW with Love</h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
                        Five Spice is more than a store; it's a gathering place for the Bangladeshi, Pakistani, Indian, and Arab communities in Dallas-Fort Worth.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-brand-gold mb-2">100%</div>
                            <div className="text-gray-500 font-medium">Halal Certified</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-brand-gold mb-2">500+</div>
                            <div className="text-gray-500 font-medium">Global Products</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-brand-gold mb-2">24/7</div>
                            <div className="text-gray-500 font-medium">Support</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-brand-gold mb-2">5k+</div>
                            <div className="text-gray-500 font-medium">Happy Customers</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
