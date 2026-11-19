import DishShowcase from './DishShowcase';
import DishSpotlight from './DishSpotlight';

// Promo slide templates by name (the `template` field in promotions.js).
// Add a template by building its component here and registering it.
export const TEMPLATES = {
    'dish-showcase': DishShowcase,
    'dish-spotlight': DishSpotlight,
};
