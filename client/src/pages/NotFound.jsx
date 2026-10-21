import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import { useDocumentHead } from '../hooks/useDocumentHead';

const NotFound = () => {
    useDocumentHead({
        title: 'Page Not Found | 5Spice',
        noindex: true,
    });

    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center bg-ink-900 px-5 text-center text-brand-cream">
            <Compass className="mb-5 text-brand-gold" size={40} strokeWidth={1.3} />
            <h1 className="font-serif text-4xl font-bold text-white">Page not found.</h1>
            <p className="mt-4 max-w-md text-white/62">
                That page doesn't exist, or isn't available yet. Try our locations page or head back home.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link to="/locations" className="bg-brand-green px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light">
                    View Locations
                </Link>
                <Link to="/" className="border border-brand-gold-deep/35 px-6 py-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
