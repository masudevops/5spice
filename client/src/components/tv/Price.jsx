// A dish price, e.g. "$14.99", or nothing while the dish has no price.
// Never wraps; menu rows line prices up on the right (no dotted leader line).
const Price = ({ price, className = '' }) => (
    price != null
        ? <span className={`shrink-0 whitespace-nowrap font-sans font-bold text-brand-gold ${className}`}>${price.toFixed(2)}</span>
        : null
);

export default Price;
