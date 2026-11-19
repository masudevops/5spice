// A dish price, e.g. "$14.99", or nothing while the dish has no price.
// Set right after the dish name (no dotted leader line, which draws the eye
// to comparing prices) and kept on one line with the name's last word.
const Price = ({ price, className = '' }) => (
    price != null
        ? <span className={`ml-4 whitespace-nowrap font-sans font-bold text-brand-gold ${className}`}>${price.toFixed(2)}</span>
        : null
);

export default Price;
