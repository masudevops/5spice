import React from 'react';
import { Truck, MapPin, ShoppingBag, Clock } from 'lucide-react';

const Pickup = () => {
    return (
        <div className="bg-brand-cream dark:bg-brand-dark min-h-screen">
            {/* Hero */}
            <div className="bg-brand-green text-white py-16 text-center">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-serif font-bold mb-4">Grocery Pickup & Delivery</h1>
                    <p className="text-xl opacity-90">Enjoy Five Spice quality from the comfort of your home.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
                    <div className="text-center p-6 bg-white dark:bg-brand-charcoal rounded-xl shadow-md">
                        <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-red">
                            <ShoppingBag size={32} />
                        </div>
                        <h3 className="font-bold text-xl mb-2">1. Shop Online</h3>
                        <p className="text-gray-500">Browse our full catalogue of groceries, meats, and prepared foods.</p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-brand-charcoal rounded-xl shadow-md">
                        <div className="bg-brand-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-gold">
                            <Clock size={32} />
                        </div>
                        <h3 className="font-bold text-xl mb-2">2. Choose a Slot</h3>
                        <p className="text-gray-500">Select a convenient pickup time or delivery window.</p>
                    </div>
                    <div className="text-center p-6 bg-white dark:bg-brand-charcoal rounded-xl shadow-md">
                        <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green">
                            <Truck size={32} />
                        </div>
                        <h3 className="font-bold text-xl mb-2">3. We Deliver</h3>
                        <p className="text-gray-500">Our team carefully packs your order and brings it to your door.</p>
                    </div>
                </div>

                {/* Delivery Map / Zones */}
                <div className="flex flex-col md:flex-row gap-8 items-center bg-white dark:bg-brand-charcoal rounded-2xl shadow-xl overflow-hidden">
                    <div className="md:w-1/2 h-80 bg-gray-200 relative">
                        {/* Placeholder for Map */}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-bold bg-gray-300 dark:bg-gray-800">
                            <MapPin size={48} className="mr-2" /> Interactive Delivery Map Area
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8">
                        <h2 className="text-3xl font-serif font-bold mb-4 text-brand-red">We Deliver to DFW</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Currently serving Plano, Richardson, Frisco, Garland, and North Dallas. Check your zip code to see if you are in our delivery zone.
                        </p>
                        <div className="flex gap-4 mb-4">
                            <input type="text" placeholder="Enter Zip Code" className="border p-3 rounded-lg flex-grow dark:bg-gray-700 dark:border-gray-600" />
                            <button className="bg-brand-charcoal text-white px-6 py-3 rounded-lg font-bold">Check</button>
                        </div>
                        <p className="text-sm text-gray-400 italic">*Delivery fees may apply based on distance.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pickup;
