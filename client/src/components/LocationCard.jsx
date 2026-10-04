import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Navigation } from 'lucide-react';

const TYPE_LABELS = {
    'market-and-kitchen': 'Market & Kitchen',
    'kitchen-only': 'Kitchen Only',
};

const STATUS_LABELS = {
    'coming-soon': 'Coming Soon',
    open: 'Open',
};

const LocationCard = ({ location }) => {
    return (
        <article className="flex flex-col border border-[#B88A3D]/25 bg-[#141414] p-7">
            <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#1CA433]/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#1CA433]">
                    {TYPE_LABELS[location.type] ?? location.type}
                </span>
                <span className="bg-[#D4A84B]/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-[#D4A84B]">
                    {STATUS_LABELS[location.status] ?? location.status}
                </span>
            </div>

            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white">{location.displayName}</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-[#D4A84B]/80">{location.cuisineTagline}</p>

            {location.status === 'coming-soon' && location.openingText && (
                <p className="mt-3 text-sm font-semibold text-[#D4A84B]">{location.openingText}</p>
            )}

            <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-white/62">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[#D4A84B]" aria-hidden="true" />
                {location.address.full}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
                {location.flags.hasKitchen && (
                    <Link
                        to={`/locations/${location.slug}/menu`}
                        className="inline-flex items-center gap-2 bg-[#1CA433] px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]"
                    >
                        View Menu <ArrowRight size={15} />
                    </Link>
                )}
                <a
                    href={location.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-[#B88A3D]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white"
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
