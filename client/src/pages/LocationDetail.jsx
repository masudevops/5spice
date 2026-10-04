import { Link, useParams } from 'react-router-dom';
import {
    ArrowRight,
    BadgePercent,
    Clock,
    ExternalLink,
    HandHeart,
    Mail,
    MapPin,
    Navigation,
    ShoppingBasket,
} from 'lucide-react';
import NotFound from './NotFound';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { getVisibleLocationBySlug } from '../data/locations';
import { ORDER_PLATFORMS } from '../config/site';

const ORDERING_KEY_TO_PLATFORM_NAME = {
    toast: 'Toast',
    uberEats: 'Uber Eats',
    doorDash: 'DoorDash',
    instacart: 'Instacart',
};

const KITCHEN_ORDERING_KEYS = ['toast', 'uberEats', 'doorDash'];
const MARKET_ORDERING_KEYS = ['instacart'];

const buildJsonLd = (location) => {
    const address = {
        '@type': 'PostalAddress',
        streetAddress: location.address.street,
        addressLocality: location.address.city,
        addressRegion: location.address.state,
        postalCode: location.address.zip,
        addressCountry: 'US',
    };
    const geo = location.lat != null && location.lng != null
        ? { geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng } }
        : {};
    const openingHoursSpecification = location.hours
        .filter((entry) => entry.hours && !/coming soon/i.test(entry.hours))
        .map((entry) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: `https://schema.org/${entry.day}`,
            description: entry.hours,
        }));

    const restaurant = {
        '@type': 'Restaurant',
        name: location.displayName,
        servesCuisine: ['Bangladeshi', 'Indian', 'Pakistani', 'Halal'],
        address,
        ...geo,
        url: `https://5spicemarket.com/locations/${location.slug}`,
        hasMenu: `https://5spicemarket.com/locations/${location.slug}/menu`,
        ...(openingHoursSpecification.length ? { openingHoursSpecification } : {}),
    };

    if (!location.flags.hasMarket) {
        return { '@context': 'https://schema.org', ...restaurant };
    }

    return {
        '@context': 'https://schema.org',
        '@graph': [
            restaurant,
            {
                '@type': 'GroceryStore',
                name: location.displayName,
                address,
                ...geo,
                url: `https://5spicemarket.com/locations/${location.slug}`,
            },
        ],
    };
};

const LocationDetail = () => {
    const { slug } = useParams();
    const location = getVisibleLocationBySlug(slug);

    useDocumentHead(
        location
            ? {
                title: `${location.displayName} | Halal Bangladeshi Cuisine in ${location.address.city}, TX`,
                description: `${location.cuisineTagline}. ${location.description}`,
                jsonLd: buildJsonLd(location),
            }
            : { title: 'Location Not Found | 5Spice', noindex: true }
    );

    if (!location) {
        return <NotFound />;
    }

    const kitchenPlatforms = location.flags.hasKitchen
        ? KITCHEN_ORDERING_KEYS
            .filter((key) => location.orderingLinks[key])
            .map((key) => ({ key, ...ORDER_PLATFORMS.find((p) => p.name === ORDERING_KEY_TO_PLATFORM_NAME[key]) }))
        : [];
    const marketPlatforms = location.flags.hasMarket
        ? MARKET_ORDERING_KEYS
            .filter((key) => location.orderingLinks[key])
            .map((key) => ({ key, ...ORDER_PLATFORMS.find((p) => p.name === ORDERING_KEY_TO_PLATFORM_NAME[key]) }))
        : [];
    const hasAnyOrderingLink = kitchenPlatforms.length > 0 || marketPlatforms.length > 0;

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">{location.cuisineTagline}</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">{location.displayName}</h1>
                    {location.status === 'coming-soon' && location.openingText && (
                        <p className="mt-4 text-lg font-semibold text-[#D4A84B]">{location.openingText}</p>
                    )}
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">{location.description}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        {location.flags.hasKitchen && (
                            <Link to={`/locations/${location.slug}/menu`} className="inline-flex items-center gap-2 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                                View Menu <ArrowRight size={17} />
                            </Link>
                        )}
                        <a href={location.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#B88A3D]/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white">
                            <Navigation size={17} /> Directions
                        </a>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1fr]">
                    <article className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                        <Clock className="mb-4 text-[#D4A84B]" size={28} strokeWidth={1.4} />
                        <h2 className="font-serif text-3xl font-semibold text-white">Hours</h2>
                        <ul className="mt-5 space-y-3 text-white/62">
                            {location.hours.map((entry) => (
                                <li key={entry.day} className="flex justify-between gap-4 border-b border-white/8 pb-3">
                                    <span>{entry.day}</span>
                                    <span className="text-white/82">{entry.hours}</span>
                                </li>
                            ))}
                        </ul>
                    </article>

                    <article className="border border-[#B88A3D]/25 bg-[#101010] p-7">
                        <MapPin className="mb-4 text-[#D4A84B]" size={28} strokeWidth={1.4} />
                        <h2 className="font-serif text-3xl font-semibold text-[#D4A84B]">Visit</h2>
                        <p className="mt-4 text-white/72">{location.address.full}</p>
                        <a href={location.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] underline decoration-[#B88A3D]/40 underline-offset-4 hover:text-white">
                            Open in Maps
                        </a>

                        <div className="mt-7 grid gap-3">
                            {location.phone ? (
                                <a href={`tel:${location.phone}`} className="flex items-center gap-3 border border-[#B88A3D]/30 px-5 py-3 text-white/78 transition-colors hover:border-[#D4A84B] hover:text-white">
                                    {location.phone}
                                </a>
                            ) : (
                                <p className="text-sm text-white/45">Phone coming soon</p>
                            )}
                            <a href={`mailto:${location.email}`} className="flex items-center gap-3 border border-[#B88A3D]/30 px-5 py-3 text-white/78 transition-colors hover:border-[#D4A84B] hover:text-white">
                                <Mail size={18} className="text-[#D4A84B]" />
                                {location.email}
                            </a>
                        </div>
                    </article>
                </div>

                {hasAnyOrderingLink && (
                    <div className="mx-auto mt-5 max-w-7xl border border-[#B88A3D]/25 bg-[#141414] p-7 md:p-10">
                        <h2 className="font-serif text-3xl font-semibold text-white">Order Online</h2>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            {[...kitchenPlatforms, ...marketPlatforms].map((platform) => (
                                <a
                                    key={platform.key}
                                    href={location.orderingLinks[platform.key]}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center justify-between gap-2 border border-[#B88A3D]/30 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white"
                                >
                                    {platform.label} <ExternalLink size={15} />
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mx-auto mt-5 max-w-7xl grid gap-5 md:grid-cols-3">
                    {location.flags.hasMarket && (
                        <Link to="/market" className="border border-[#B88A3D]/25 bg-[#101010] p-6 transition-colors hover:border-[#D4A84B]/50">
                            <ShoppingBasket className="mb-4 text-[#D4A84B]" size={26} strokeWidth={1.4} />
                            <h3 className="font-serif text-2xl font-semibold text-white">Market</h3>
                            <p className="mt-2 text-sm leading-6 text-white/58">Premium halal grocery departments.</p>
                        </Link>
                    )}
                    {location.flags.hasWeeklyDeals && (
                        <Link to="/sales" className="border border-[#B88A3D]/25 bg-[#101010] p-6 transition-colors hover:border-[#D4A84B]/50">
                            <BadgePercent className="mb-4 text-[#D4A84B]" size={26} strokeWidth={1.4} />
                            <h3 className="font-serif text-2xl font-semibold text-white">Weekly Deals</h3>
                            <p className="mt-2 text-sm leading-6 text-white/58">Rotating grocery highlights and features.</p>
                        </Link>
                    )}
                    {location.flags.hasCatering && (
                        <Link to="/catering" className="border border-[#B88A3D]/25 bg-[#101010] p-6 transition-colors hover:border-[#D4A84B]/50">
                            <HandHeart className="mb-4 text-[#D4A84B]" size={26} strokeWidth={1.4} />
                            <h3 className="font-serif text-2xl font-semibold text-white">Catering</h3>
                            <p className="mt-2 text-sm leading-6 text-white/58">Plan events, office meals, and gatherings.</p>
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
};

export default LocationDetail;
