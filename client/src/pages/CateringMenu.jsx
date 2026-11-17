import { Mail } from 'lucide-react';
import NotFound from './NotFound';
import MenuView from '../components/MenuView';
import { CATERING_EMAIL } from '../config/site';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { getCateringMenu } from '../data/menus';

// The catering menu, kept separate from each location's restaurant menu
// (LocationMenu) so the two can change independently. Doesn't link to it.
const CateringMenu = () => {
    const menu = getCateringMenu();

    useDocumentHead(
        menu
            ? {
                title: 'Catering Menu | Halal Bangladeshi Catering in DFW | 5Spice',
                description: `${menu.halalStatement} Browse the 5Spice catering menu of Bangladeshi cuisine and South Asian favorites for weddings, family celebrations, and corporate events.`,
            }
            : { title: 'Menu Not Found | 5Spice', noindex: true }
    );

    if (!menu) {
        return <NotFound />;
    }

    return (
        <MenuView
            menu={menu}
            eyebrow="5Spice Catering"
            title="Catering Menu"
            action={(
                <a
                    href={`mailto:${CATERING_EMAIL}?subject=${encodeURIComponent('5Spice Catering Quote Request')}`}
                    className="inline-flex min-h-11 items-center gap-2 bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light"
                >
                    <Mail size={18} aria-hidden="true" /> Request a Quote
                </a>
            )}
        />
    );
};

export default CateringMenu;
