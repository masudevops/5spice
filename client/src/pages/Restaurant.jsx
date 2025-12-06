import React, { useEffect, useState } from 'react';
import MenuCard from '../components/MenuCard';

const Restaurant = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('Bangladeshi');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5001/api/menu')
            .then(res => res.json())
            .then(data => {
                setMenuItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching menu:", err);
                setLoading(false);
            });
    }, []);

    // Group items by category
    const categories = ['Bangladeshi', 'Pakistani', 'Indian', 'Arab', 'Grill', 'Drinks'];
    const groupedMenu = categories.reduce((acc, cat) => {
        const items = menuItems.filter(item => item.category === cat || (cat === 'Grill' && item.category === 'Arab')); // Simple grouping logic
        if (items.length > 0) acc[cat] = items;
        return acc;
    }, {});

    // Effect to filter items based on active category
    useEffect(() => {
        if (menuItems.length > 0) {
            const itemsForCategory = groupedMenu[activeCategory] || [];
            setFilteredItems(itemsForCategory);
        }
    }, [activeCategory, menuItems, groupedMenu]);


    return (
        <div className="bg-brand-cream dark:bg-brand-dark min-h-screen">
            {/* Hero */}
            <div className="bg-brand-charcoal text-white py-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <span className="text-brand-gold font-bold uppercase tracking-widest text-sm mb-2 block">Authentic Flavors</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">The Five Spice Kitchen</h1>
                    <p className="text-gray-300 max-w-2xl mx-auto">From sizzling Tandoori platters to aromatic Biryanis, experience the true taste of South Asia.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Category Navigation (Sticky) */}
                <div className="sticky top-[73px] md:top-20 z-30 bg-brand-cream/95 dark:bg-brand-dark/95 backdrop-blur py-4 mb-8 border-b border-gray-200 dark:border-gray-800 overflow-x-auto">
                    <div className="flex gap-2 min-w-max px-2">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2 rounded-full whitespace-nowrap transition-all text-sm font-bold ${activeCategory === cat
                                    ? 'bg-brand-red text-white shadow-lg transform scale-105'
                                    : 'bg-white dark:bg-brand-charcoal text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20 flex flex-col items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-red mb-4"></div>
                        <p>Preparing the menu...</p>
                    </div>
                ) : (
                    <>
                        {/* Active Category Header */}
                        <h2 className="text-3xl font-bold text-brand-dark dark:text-brand-cream mb-8 text-center">
                            {activeCategory} Specialties
                        </h2>

                        {filteredItems.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredItems.map(item => (
                                    <MenuCard key={item.id} item={{ ...item, spiceLevel: item.category === 'Entrees' ? 2 : 0 }} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center text-gray-600 dark:text-gray-400 py-10">
                                No items found for {activeCategory}. Please check back later!
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Restaurant;
