import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Navigation, Phone } from 'lucide-react';
import ServiceStatusList from './ServiceStatusList';
import { getLocationLabel, hasPublicMenu } from '../data/locations';
import { toTelHref } from '../utils/phone';

const TYPE_LABELS = {
    'market-and-kitchen': 'Market & Kitchen',
    'kitchen-only': 'Restaurant & Catering',
};


const LocationCard = ({ location }) => {
    return (
        <article className="flex flex-col border border-brand-gold-deep/25 bg-ink-800 p-7">
            <div className="flex flex-wrap items-center gap-2">
                <span className="bg-brand-green/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-brand-green">
                    {TYPE_LABELS[location.type] ?? location.type}
                </span>
                {location.statusLabel && (
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${location.status === 'open' ? 'bg-brand-green/15 text-brand-green' : 'bg-brand-gold/15 text-brand-gold'}`}>
                        {location.statusLabel}
                    </span>
                )}
            </div>

            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white">{getLocationLabel(location)}</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-brand-gold/80">{location.cuisineTagline}</p>

            {location.services ? (
                <ServiceStatusList services={location.services} className="mt-4" />
            ) : (
                location.status === 'coming-soon' && location.openingText && (
                    <p className="mt-3 text-sm font-semibold text-brand-gold">{location.openingText}</p>
                )
            )}

            <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-white/62">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                {location.address.full}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
                {hasPublicMenu(location) && (
                    <Link
                        to={`/locations/${location.slug}/menu`}
                        className="inline-flex items-center gap-2 bg-brand-green px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-green-dark"
                    >
                        View Menu <ArrowRight size={15} />
                    </Link>
                )}
                {location.status === 'open' && location.phone && (
                    <a
                        href={toTelHref(location.phone)}
                        className="inline-flex items-center gap-2 bg-brand-green px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-green-dark"
                    >
                        <Phone size={15} aria-hidden="true" /> Call
                    </a>
                )}
                <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-brand-gold-deep/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white"
                >
                    <Navigation size={15} /> Directions
                </a>
                <Link
                    to={`/locations/${location.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
                >
                    View Details <ArrowRight size={15} />
                </Link>
            </div>
        </article>
    );
};

export default LocationCard;
