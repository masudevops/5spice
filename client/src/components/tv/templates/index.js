import BrandSlide from './BrandSlide';
import Catering from './Catering';
import DishShowcase from './DishShowcase';
import Special from './Special';

// Promo slide templates by name (the `template` field in promotions.js).
// Add a template by building its component here (most use PromoLayout, so
// every slide shares the same frame) and registering it.
export const TEMPLATES = {
    'dish-showcase': DishShowcase,
    special: Special,
    catering: Catering,
    brand: BrandSlide,
};
