import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-brand-charcoal text-white pt-16 pb-24 md:pb-12 border-t-4 border-brand-gold">
            <div className="container mx-auto px-4">

                {/* Newsletter Section */}
                <div className="bg-brand-red rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden shadow-2xl transform -translate-y-24 md:-translate-y-32">
                    <div className="absolute top-0 right-0 opacity-10">
                        <svg width="200" height="200" viewBox="0 0 100 100"><path d="M0 0 L100 100 M100 0 L0 100" stroke="white" strokeWidth="2" /></svg>
                    </div>
                    <div className="md:flex justify-between items-center relative z-10">
                        <div className="mb-6 md:mb-0">
                            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Join the Five Spice Family</h2>
                            <p className="text-white/80">Get weekly specials and exclusive offers delivered to your inbox.</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <input type="email" placeholder="Email Address" className="px-4 py-3 rounded-lg text-gray-900 w-full md:w-72 focus:outline-none focus:ring-2 focus:ring-brand-gold" />
                            <button className="bg-brand-charcoal hover:bg-black text-white px-6 py-3 rounded-lg font-bold transition flex items-center gap-2">
                                Subscribe <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 -mt-12 md:-mt-16">
                    <div>
                        <h3 className="text-2xl font-serif font-bold text-brand-gold mb-6">Five Spice</h3>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Your premium destination for authentic Halal groceries and South Asian cuisine. Experience the taste of home in DFW.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold hover:text-brand-charcoal transition"><Facebook size={20} /></a>
                            <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-brand-gold hover:text-brand-charcoal transition"><Instagram size={20} /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-serif font-bold text-lg mb-4 text-brand-gold">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                            <li><Link to="/supermarket" className="hover:text-white transition">Supermarket</Link></li>
                            <li><Link to="/restaurant" className="hover:text-white transition">Restaurant</Link></li>
                            <li><Link to="/sales" className="hover:text-white transition">Weekly Sales</Link></li>
                            <li><Link to="/catering" className="hover:text-white transition">Event Catering</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-brand-red inline-block pb-1">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-brand-gold mt-1 shrink-0" />
                                <span>123 Halal Ave,<br />Dallas, TX 75001</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-brand-gold shrink-0" />
                                <span>(972) 555-0123</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-brand-gold shrink-0" />
                                <span>hello@fivespice.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-brand-red inline-block pb-1">Opening Hours</h4>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li className="flex justify-between border-b border-white/10 pb-2"><span>Mon - Thu</span> <span className="text-white">9:00 AM - 10:00 PM</span></li>
                            <li className="flex justify-between border-b border-white/10 pb-2"><span>Fri</span> <span className="text-white">9:00 AM - 11:00 PM</span></li>
                            <li className="flex justify-between border-b border-white/10 pb-2"><span>Sat</span> <span className="text-white">9:00 AM - 11:00 PM</span></li>
                            <li className="flex justify-between"><span>Sun</span> <span className="text-white">9:00 AM - 10:00 PM</span></li>
                        </ul>
                        <div className="mt-4 bg-brand-gold/20 text-brand-gold px-4 py-2 rounded-lg text-xs font-bold text-center">
                            Jummah Break: 1:00 PM - 2:00 PM
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Five Spice Supermarket & Restaurant. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
