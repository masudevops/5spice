import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Search } from 'lucide-react';

const Supermarket = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const categories = ['All', 'Spices', 'Rice', 'Meat', 'Produce', 'Frozen', 'Bakery'];

    useEffect(() => {
        fetch('http://localhost:5001/api/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching products:", err);
                setLoading(false);
                // Fallback or mock data could go here if server is down
            });
    }, []);

    useEffect(() => {
        let result = products;
        if (activeCategory !== 'All') {
            result = result.filter(p => p.category === activeCategory);
        }
        if (searchQuery) {
            result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setFilteredProducts(result);
    }, [activeCategory, searchQuery, products]);

    return (
        <div className="bg-brand-cream/30 dark:bg-brand-dark min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-brand-red mb-2">Halal Supermarket</h1>
                        <p className="text-gray-600 dark:text-gray-400">Fresh produce, premium meats, and authentic spices.</p>
                    </div>

                    <div className="relative w-full md:w-96 group">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-brand-charcoal border border-gray-200 dark:border-gray-700 rounded-full focus:border-brand-green focus:ring-2 focus:ring-brand-green/20 outline-none transition-all shadow-sm group-hover:shadow-md"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-brand-green transition-colors" size={20} />
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters (Desktop) / Horizontal (Mobile) */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white dark:bg-brand-charcoal p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-gray-800 dark:text-white"><div className="w-1 h-6 bg-brand-gold rounded-full"></div> Categories</h3>
                            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`px-4 py-2 rounded-lg text-left transition-all text-sm font-medium whitespace-nowrap ${activeCategory === cat
                                            ? 'bg-brand-green/10 text-brand-green font-bold border-l-4 border-brand-green'
                                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-grow">
                        {loading ? (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {[1, 2, 3, 4].map(n => (
                                    <div key={n} className="bg-gray-100 dark:bg-gray-800 h-64 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        ) : filteredProducts.length === 0 ? (
                            <div className="text-center py-20 bg-white dark:bg-brand-charcoal rounded-2xl border border-gray-100 dark:border-gray-800">
                                <Search size={48} className="mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 font-medium">No products found matching your search.</p>
                                <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="mt-4 text-brand-red font-bold hover:underline">Clear Filters</button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Supermarket;
