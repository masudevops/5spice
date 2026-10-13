import { MapPinned } from 'lucide-react';
import LocationCard from '../components/LocationCard';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { anyVisibleLocationHasFlag, getVisibleLocations } from '../data/locations';

const Locations = () => {
    const visibleLocations = getVisibleLocations();
    const hasAnyMarket = anyVisibleLocationHasFlag('hasMarket');

    useDocumentHead({
        title: '5Spice Locations | Halal Bangladeshi Restaurants & Market in Texas',
        description: '5Spice Kitchen in Murphy, TX offers halal Bangladeshi catering now, with dine-in and take-out coming soon. 5Spice Market & Kitchen, a halal grocery and restaurant, opens in Plano in early 2027.',
    });

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <MapPinned className="mb-5 text-[#D4A84B]" size={34} strokeWidth={1.4} />
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Our Locations</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
                        {hasAnyMarket
                            ? 'Halal grocery and authentic Bangladeshi cuisine, closer to you.'
                            : 'Authentic Halal Bangladeshi Cuisine, closer to you.'}
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Authentic halal Bangladeshi cuisine and South Asian favorites
                        {hasAnyMarket ? ', with a full halal grocery market coming to Plano' : ''}. Find addresses, directions, and contact details below.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {visibleLocations.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2">
                            {visibleLocations.map((location) => (
                                <LocationCard key={location.slug} location={location} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/62">No locations are available to show yet. Check back soon.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Locations;
