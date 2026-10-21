import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, FlameKindling, HandHeart, MapPin, Navigation, Phone, Soup, Utensils } from 'lucide-react';
import { MENU_HIGHLIGHTS } from '../config/site';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import ServiceStatusList from '../components/ServiceStatusList';
import { getLocationLabel, getOpenLocations, hasPublicMenu, takesRestaurantOrders } from '../data/locations';
import { toTelHref } from '../utils/phone';

const icons = [Soup, FlameKindling, Utensils];

const Kitchen = () => {
    const { selectedLocation, selectLocation } = useSelectedLocation();
    const isOpen = selectedLocation?.status === 'open';
    const openKitchens = getOpenLocations().filter((location) => location.flags.hasKitchen);
    const anyTakingOrders = openKitchens.some(takesRestaurantOrders);

    useDocumentHead({
        title: 'Halal Bangladeshi Kitchen & Catering in Murphy, TX | 5Spice Kitchen',
        description: 'Authentic halal Bangladeshi cuisine alongside Indian and Pakistani favorites. Catering available now from 5Spice Kitchen in Murphy, TX, with dine-in and take-out coming soon.',
    });

    return (
        <div className="min-h-screen bg-ink-900 text-brand-cream">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-orange)/0.14),transparent_36%),linear-gradient(135deg,rgb(var(--color-ink-900)),rgb(var(--color-ink-750)))]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Authentic Halal Bangladeshi Cuisine</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Authentic meals for family dinners and quick lunches.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Traditional Bangladeshi favorites alongside Indian and Pakistani classics, all halal and made with care for every guest at your table.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {selectedLocation && (
                        <div className="mb-8 border border-brand-gold-deep/25 bg-ink-850 p-7 md:p-9">
                            {isOpen ? (
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-green">{selectedLocation.statusLabel}</p>
                                        <h2 className="mt-3 font-serif text-3xl font-semibold text-white">{getLocationLabel(selectedLocation)}</h2>
                                        <p className="mt-3 flex items-start gap-2 text-white/68">
                                            <MapPin size={18} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" />
                                            {selectedLocation.address.full}
                                        </p>
                                        <ServiceStatusList services={selectedLocation.services} className="mt-4" />
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {!takesRestaurantOrders(selectedLocation) && selectedLocation.services?.catering === 'open' && (
                                            <Link to="/catering" className="inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-green-dark">
                                                <HandHeart size={17} aria-hidden="true" /> Request Catering
                                            </Link>
                                        )}
                                        {selectedLocation.phone && (
                                            <a
                                                href={toTelHref(selectedLocation.phone)}
                                                className={takesRestaurantOrders(selectedLocation)
                                                    ? 'inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-green-dark'
                                                    : 'inline-flex items-center gap-2 border border-brand-gold-deep/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white'}
                                            >
                                                <Phone size={17} aria-hidden="true" /> {selectedLocation.phone}
                                            </a>
                                        )}
                                        <a href={selectedLocation.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-brand-gold-deep/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white">
                                            <Navigation size={17} aria-hidden="true" /> Directions
                                        </a>
                                        {hasPublicMenu(selectedLocation) && (
                                            <Link to={`/locations/${selectedLocation.slug}/menu`} className="inline-flex items-center gap-2 border border-brand-gold-deep/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white">
                                                View Full Menu <ArrowRight size={17} aria-hidden="true" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
                                        <CalendarDays size={15} aria-hidden="true" /> {selectedLocation.openingText}
                                    </p>
                                    <h2 className="mt-3 font-serif text-3xl font-semibold text-white">{getLocationLabel(selectedLocation)}</h2>
                                    <p className="mt-3 max-w-3xl leading-7 text-white/62">
                                        Our {selectedLocation.shortName} restaurant isn't open yet.
                                        {openKitchens.length > 0 && (anyTakingOrders
                                            ? ' In the meantime, you can enjoy 5Spice at our operating kitchen.'
                                            : ' In the meantime, our Murphy kitchen is taking catering orders.')}
                                    </p>
                                    {openKitchens.length > 0 && (
                                        <div className="mt-6 flex flex-wrap gap-3">
                                            {openKitchens.map((location) => (
                                                <button
                                                    key={location.slug}
                                                    type="button"
                                                    onClick={() => selectLocation(location.slug)}
                                                    className="inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-green-dark"
                                                >
                                                    See {getLocationLabel(location)} <ArrowRight size={17} aria-hidden="true" />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="grid gap-5 md:grid-cols-3">
                        {MENU_HIGHLIGHTS.map((item, index) => {
                            const Icon = icons[index];
                            return (
                                <article key={item.title} className="border border-brand-gold-deep/25 bg-ink-800 p-7">
                                    <Icon className="mb-5 text-brand-gold" size={31} strokeWidth={1.35} aria-hidden="true" />
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-brand-gold/80">{item.category}</p>
                                    <h2 className="font-serif text-3xl font-semibold leading-tight text-white">{item.title}</h2>
                                    <p className="mt-4 leading-7 text-white/62">{item.text}</p>
                                </article>
                            );
                        })}
                    </div>

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Link to="/catering" className="group border border-brand-gold-deep/25 bg-ink-800 p-7 transition-colors hover:border-brand-gold/50">
                            <HandHeart className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Planning an event?</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">Weddings, family celebrations, and corporate catering.</p>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                                Explore Catering <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </Link>
                        <Link to="/pickup" className="group border border-brand-gold-deep/25 bg-ink-800 p-7 transition-colors hover:border-brand-gold/50">
                            <Utensils className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Ordering</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">See current ordering options by location.</p>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                                Order Options <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Kitchen;
