import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Sales = () => {
    const [activeCategory, setActiveCategory] = useState('All');

    // Mock Sale Data (In a real app, this would come from the API)
    const saleProducts = [
        { id: 101, name: "Shan Chicken Tikka Masala", category: "Spices", price: 2.99, salePrice: 1.99, onSale: true, image: "https://placehold.co/400x300?text=Tikka+Masala", popular: true },
        { id: 102, name: "Premium Basmati Rice 20lb", category: "Rice", price: 29.99, salePrice: 24.99, onSale: true, image: "https://placehold.co/400x300?text=Basmati+20lb" },
        { id: 103, name: "Halal Lamb Chops", category: "Meat", price: 12.99, salePrice: 9.99, onSale: true, image: "https://placehold.co/400x300?text=Lamb+Chops", popular: true },
        { id: 104, name: "Fresh Mangoes (Box)", category: "Produce", price: 15.99, salePrice: 11.99, onSale: true, image: "https://placehold.co/400x300?text=Mangoes" },
        { id: 105, name: "Frozen Samosas (50pc)", category: "Frozen", price: 25.00, salePrice: 19.99, onSale: true, image: "https://placehold.co/400x300?text=Samosas" },
        { id: 106, name: "National Pickle Mixed", category: "Spices", price: 4.99, salePrice: 3.50, onSale: true, image: "https://placehold.co/400x300?text=Mixed+Pickle" },
    ];

    const categories = ['All', 'Meat', 'Rice', 'Spices', 'Produce', 'Frozen'];

    const filteredProducts = activeCategory === 'All'
        ? saleProducts
        : saleProducts.filter(p => p.category === activeCategory);

    return (
        <div className="bg-brand-cream/50 dark:bg-brand-dark min-h-screen">
            {/* Banner */}
            <div className="bg-brand-red text-white py-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <h1 className="text-4xl font-serif font-bold mb-2 relative z-10">Weekly Specials</h1>
                <p className="text-white/80 relative z-10">Exclusive deals valid until Sunday. Stock up and save!</p>
            </div>

            <div className="container mx-auto px-4 py-8">

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                        <Filter size={20} /> Filter Deals:
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeCategory === cat
                                    ? 'bg-brand-green text-white font-bold shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20 text-gray-500">No deals found in this category.</div>
                )}
            </div>
        </div>
    );
};

export default Sales;
