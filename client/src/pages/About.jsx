import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-3xl mx-auto text-center mb-12">
                <h1 className="text-4xl font-bold text-brand-red mb-4">Our Story</h1>
                <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
                <p className="text-xl text-gray-600">
                    Serving the Dallas-Fort Worth community with premium Halal groceries and authentic cuisine since 2024.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                    <img
                        src="https://placehold.co/600x400?text=Five+Spice+Storefront"
                        alt="5 Spice Storefront"
                        className="rounded-lg shadow-xl"
                    />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">A Culinary Journey</h2>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                        5 Spice Market & Cafe was born from a desire to bring the vibrant flavors of South Asia and the Middle East to the heart of Texas. We recognized a need for a place where families could not only shop for the freshest Halal ingredients but also enjoy the comfort of home-cooked meals.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Our mission is simple: <strong>Quality, Affordability, and Community.</strong> Whether you are looking for the perfect spice blend for your Biryani or craving a plate of hot Butter Chicken, 5 Spice is your destination.
                    </p>
                </div>
            </div>

            <div className="bg-brand-red text-white rounded-xl p-8 md:p-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Certified Halal</h2>
                <p className="mb-6 max-w-2xl mx-auto">
                    We take pride in serving 100% Zabiha Halal meat. Our butchers are trained to provide the best cuts for your daily cooking needs.
                </p>
                <div className="flex justify-center gap-6">
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                        <span className="block text-2xl font-bold text-brand-gold">100%</span>
                        <span className="text-sm">Halal Certified</span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                        <span className="block text-2xl font-bold text-brand-gold">Fresh</span>
                        <span className="text-sm">Daily Produce</span>
                    </div>
                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                        <span className="block text-2xl font-bold text-brand-gold">Local</span>
                        <span className="text-sm">DFW Favorite</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
