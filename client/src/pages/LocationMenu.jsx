import { Link, useParams } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import NotFound from './NotFound';
import MenuView from '../components/MenuView';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { getVisibleLocationBySlug, hasPublicMenu, takesRestaurantOrders } from '../data/locations';
import { getMenuByLocationSlug } from '../data/menus';

const RESTAURANT_ORDER_KEYS = ['toast', 'uberEats', 'doorDash'];

// A location's day-to-day restaurant menu. The catering menu is separate
// (CateringMenu, /catering/menu) and the two don't link to each other.
const LocationMenu = () => {
    const { slug } = useParams();
    const { selectLocation } = useSelectedLocation();

    const location = getVisibleLocationBySlug(slug);
    const menu = hasPublicMenu(location) ? getMenuByLocationSlug(slug) : null;

    useDocumentHead(
        location && menu
            ? {
                title: `${location.displayName} Menu | Halal Bangladeshi Cuisine in ${location.address.city}, TX`,
                description: `${menu.halalStatement} Browse the full ${location.displayName} menu of Bangladeshi cuisine and South Asian favorites.`,
            }
            : { title: 'Menu Not Found | 5Spice', noindex: true }
    );

    if (!location || !menu) {
        return <NotFound />;
    }

    const canOrder = takesRestaurantOrders(location) && RESTAURANT_ORDER_KEYS.some((key) => location.orderingLinks?.[key]);

    return (
        <MenuView
            menu={menu}
            eyebrow={location.displayName}
            title="Full Menu"
            action={canOrder && (
                <Link
                    to="/pickup"
                    onClick={() => selectLocation(location.slug)}
                    className="inline-flex min-h-11 items-center gap-2 bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light"
                >
                    <ShoppingBag size={18} aria-hidden="true" /> Order from {location.shortName}
                </Link>
            )}
        />
    );
};

export default LocationMenu;
