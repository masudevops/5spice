import React from 'react';

const MenuCard = ({ item }) => {
    return (
        <div className="flex bg-white dark:bg-brand-charcoal rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all border border-transparent hover:border-brand-gold group h-full">
            <div className="w-1/3 min-w-[120px] relative overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-bold text-lg text-gray-900 dark:text-white leading-tight">{item.name}</h3>
                        <span className="font-bold text-brand-red">${item.price}</span>
                    </div>
                    {item.spiceLevel > 0 && (
                        <div className="flex mb-2" title={`Spice Level: ${item.spiceLevel}`}>
                            {[...Array(item.spiceLevel)].map((_, i) => (
                                <span key={i} className="text-brand-red text-xs">🌶️</span>
                            ))}
                        </div>
                    )}
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 leading-snug">{item.description}</p>
                </div>
                <button className="mt-3 text-xs font-bold uppercase tracking-wider text-brand-gold hover:text-brand-red transition-colors self-start">
                    + Add to Order
                </button>
            </div>
        </div>
    );
};

export default MenuCard;
