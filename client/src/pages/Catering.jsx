import React from 'react';
import { CheckCircle } from 'lucide-react';

const Catering = () => {
    const popularTrays = [
        { name: "Chicken Biryani Tray", serves: "10-12", price: 80, image: "https://placehold.co/400x300?text=Biryani" },
        { name: "Lamb Curry Tray", serves: "10-12", price: 120, image: "https://placehold.co/400x300?text=Lamb+Curry" },
        { name: "Tandoori Chicken Leg (20pc)", serves: "10", price: 70, image: "https://placehold.co/400x300?text=Tandoori" },
        { name: "Seekh Kabab (25pc)", serves: "10-12", price: 90, image: "https://placehold.co/400x300?text=Seekh+Kabab" },
    ];

    return (
        <div className="bg-brand-cream dark:bg-brand-dark min-h-screen pb-20">
            {/* Hero */}
            <div className="bg-brand-charcoal text-white py-20 text-center relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-4 block">Event Catering</span>
                    <h1 className="text-5xl font-serif font-bold mb-6">Make Your Event Unforgettable</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        From weddings to corporate lunches, let 5 Spice bring authentic South Asian flavors to your guests.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {popularTrays.map((tray, bgIdx) => (
                        <div key={tray.name} className="bg-white dark:bg-brand-charcoal rounded-2xl shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform">
                            <div className="h-48 overflow-hidden">
                                <img src={tray.image} alt={tray.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="p-6">
                                <h3 className="font-bold text-lg mb-2 text-brand-red">{tray.name}</h3>
                                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                                    <span>Serves {tray.serves}</span>
                                    <span className="font-bold text-lg text-brand-green">${tray.price}</span>
                                </div>
                                <button className="w-full border border-brand-red text-brand-red font-bold py-2 rounded-lg hover:bg-brand-red hover:text-white transition-colors">
                                    Add to Request
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-brand-charcoal dark:text-white mb-6">Why Choose 5 Spice Catering?</h2>
                        <ul className="space-y-4">
                            {['100% Zabiha Halal Certified Meat', 'Authentic Family Recipes', 'Flexible Menu Customization', 'Competitive Pricing for Large Orders', 'Delivery & Setup Available'].map(item => (
                                <li key={item} className="flex items-center gap-3 text-lg text-gray-700 dark:text-gray-300">
                                    <CheckCircle className="text-brand-gold" /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white dark:bg-brand-charcoal p-8 rounded-2xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 text-center">Request a Quote</h3>
                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
                                <input type="text" placeholder="Phone Number" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
                            </div>
                            <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="date" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
                                <input type="number" placeholder="Guest Count" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
                            </div>
                            <textarea placeholder="Tell us about your event..." rows="4" className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700"></textarea>
                            <button type="button" className="w-full bg-brand-green text-white font-bold py-4 rounded-lg shadow hover:bg-green-800 transition">
                                Submit Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Catering;
