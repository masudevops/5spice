import React from 'react';
import { Plus } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 group">
            <div className="relative h-48 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {product.popular && (
                    <span className="absolute top-2 right-2 bg-brand-gold text-brand-charcoal text-xs font-bold px-2 py-1 rounded-full shadow">
                        Popular
                    </span>
                )}
                {product.onSale && (
                    <span className="absolute top-2 left-2 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded-full shadow">
                        SALE
                    </span>
                )}
            </div>
            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{product.category}</span>
                    <span className="text-brand-green font-bold">
                        {product.onSale ? (
                            <span className="flex gap-2 items-center">
                                <span className="line-through text-gray-400 text-xs">${product.price.toFixed(2)}</span>
                                <span className="text-brand-red">${product.salePrice.toFixed(2)}</span>
                            </span>
                        ) : (
                            `$${product.price.toFixed(2)}`
                        )}
                    </span>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-2 truncate" title={product.name}>{product.name}</h3>
                <div className="flex justify-end items-center mt-3">
                    <button className="bg-gray-100 dark:bg-gray-700 hover:bg-brand-red hover:text-white dark:hover:bg-brand-red text-gray-800 dark:text-white p-2 rounded-full transition-colors">
                        <Plus size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
