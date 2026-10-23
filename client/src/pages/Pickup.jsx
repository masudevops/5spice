import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, ExternalLink, HandHeart, Mail, MapPin, Navigation, PackageCheck, Phone, ShoppingBasket, Store, Utensils } from 'lucide-react';
import { CONTACT, ORDER_PLATFORMS } from '../config/site';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import ServiceStatusList from '../components/ServiceStatusList';
import { getCateringOpenLocations, getLocationLabel, getOrderingLocations, takesRestaurantOrders } from '../data/locations';
import LocationSwitcher from '../components/LocationSwitcher';
import { toTelHref } from '../utils/phone';

const ORDERING_KEY_TO_PLATFORM_NAME = {
    toast: 'Toast',
    uberEats: 'Uber Eats',
    doorDash: 'DoorDash',
    instacart: 'Instacart',
};

const Pickup = () => {
    const { selectedLocation, selectedSlug, selectLocation, visibleLocations } = useSelectedLocation();
    const platformsByName = Object.fromEntries(ORDER_PLATFORMS.map((platform) => [platform.name, platform]));
    const isOpen = selectedLocation?.status === 'open';
    const takingOrders = takesRestaurantOrders(selectedLocation);
    const cateringNow = selectedLocation?.services?.catering === 'open';
    const orderingLocations = getOrderingLocations();
    const cateringLocations = getCateringOpenLocations();

    useDocumentHead({
        title: 'Order Online | 5Spice Kitchen – Murphy & 5Spice Market – Plano',
        description: 'Ordering options for 5Spice. Catering is available now from 5Spice Kitchen in Murphy, TX, with dine-in and take-out coming soon. Plano ordering begins when it opens in early 2027.',
    });

    // Only platforms with a real, configured storefront link are shown.
    const orderGroups = selectedLocation
        ? [
            selectedLocation.flags.hasKitchen && {
                title: 'Restaurant Orders',
                icon: Utensils,
                keys: ['toast', 'uberEats', 'doorDash'],
            },
            selectedLocation.flags.hasMarket && {
                title: 'Grocery Delivery',
                icon: ShoppingBasket,
                keys: ['instacart'],
            },
        ]
            .filter(Boolean)
            .map((group) => ({
                ...group,
                platforms: group.keys
                    .filter((key) => selectedLocation.orderingLinks[key])
                    .map((key) => ({ key, ...platformsByName[ORDERING_KEY_TO_PLATFORM_NAME[key]] })),
            }))
        : [];
    const livePlatformGroups = orderGroups.filter((group) => group.platforms.length > 0);

    return (
        <div className="min-h-screen bg-ink-900 text-brand-cream">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-forest)/0.16),transparent_34%),linear-gradient(135deg,rgb(var(--color-ink-900)),rgb(var(--color-ink-750)))]" />
                <div className="relative mx-auto max-w-7xl">
                    <Store className="mb-5 text-brand-gold" size={34} strokeWidth={1.4} aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Order Online</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
                        Order your 5Spice favorites.
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Choose a location to see how to order.
                    </p>

                    {visibleLocations.length > 1 && (
                        <div className="mt-7 inline-flex flex-wrap items-center gap-3 border border-brand-gold-deep/30 bg-ink-800 px-5 py-4">
                            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Ordering from:</span>
                            <LocationSwitcher locations={visibleLocations} selectedSlug={selectedSlug} onSelect={selectLocation} />
                        </div>
                    )}
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {!selectedLocation && (
                        <div className="border border-brand-gold-deep/25 bg-ink-800 p-7 text-white/68">
                            Ordering isn't available yet. Check back soon.
                        </div>
                    )}

                    {selectedLocation && isOpen && (
                        <div className="border border-brand-gold-deep/25 bg-ink-800 p-7 md:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-green">{selectedLocation.statusLabel}</p>
                            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">{getLocationLabel(selectedLocation)}</h2>
                            <p className="mt-3 flex items-start gap-2 text-white/68">
                                <MapPin size={18} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" />
                                {selectedLocation.address.full}
                            </p>
                            <ServiceStatusList services={selectedLocation.services} className="mt-4" />

                            {livePlatformGroups.map((group) => {
                                const Icon = group.icon;
                                return (
                                    <div key={group.title} className="mt-8">
                                        <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
                                            <Icon size={22} className="text-brand-gold" aria-hidden="true" /> {group.title}
                                        </h3>
                                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {group.platforms.map((platform) => (
                                                <a
                                                    key={platform.key}
                                                    href={selectedLocation.orderingLinks[platform.key]}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="border border-white/10 bg-ink-850 p-5 transition-colors hover:border-brand-gold"
                                                >
                                                    <PackageCheck className="mb-4 text-brand-gold" size={23} strokeWidth={1.35} aria-hidden="true" />
                                                    <h4 className="font-serif text-xl font-semibold text-white">{platform.name}</h4>
                                                    <p className="mt-2 text-sm leading-6 text-white/58">{platform.description}</p>
                                                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-gold">
                                                        {platform.label} <ExternalLink size={15} aria-hidden="true" />
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="mt-8 border-t border-white/10 pt-7">
                                <p className="leading-7 text-white/68">
                                    {takingOrders
                                        ? (livePlatformGroups.length > 0
                                            ? 'Prefer to order by phone? Give us a call.'
                                            : 'Call to place your order. Online ordering through partner apps is coming soon.')
                                        : `Dine-in and take-out are coming soon to ${selectedLocation.shortName}.${cateringNow ? ' Catering is available now for weddings, family celebrations, and corporate events.' : ''}`}
                                </p>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    {!takingOrders && cateringNow && (
                                        <Link to="/catering" className="inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light">
                                            <HandHeart size={17} aria-hidden="true" /> Request Catering
                                        </Link>
                                    )}
                                    {selectedLocation.phone && (
                                        <a
                                            href={toTelHref(selectedLocation.phone)}
                                            className={takingOrders
                                                ? 'inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light'
                                                : 'inline-flex items-center gap-2 border border-brand-gold-deep/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white'}
                                        >
                                            <Phone size={17} aria-hidden="true" /> Call {selectedLocation.phone}
                                        </a>
                                    )}
                                    <a href={selectedLocation.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-brand-gold-deep/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white">
                                        <Navigation size={17} aria-hidden="true" /> Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedLocation && !isOpen && (
                        <div className="border border-brand-gold-deep/25 bg-ink-800 p-7 md:p-9">
                            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-gold">
                                <CalendarDays size={15} aria-hidden="true" /> {selectedLocation.openingText}
                            </p>
                            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">{getLocationLabel(selectedLocation)}</h2>
                            <p className="mt-3 max-w-3xl leading-7 text-white/62">
                                {selectedLocation.flags.hasMarket
                                    ? 'Restaurant and grocery ordering will begin when this location opens.'
                                    : 'Ordering will begin when this location opens.'}
                            </p>
                            {orderingLocations.length > 0 ? (
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {orderingLocations.map((location) => (
                                        <button
                                            key={location.slug}
                                            type="button"
                                            onClick={() => selectLocation(location.slug)}
                                            className="inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light"
                                        >
                                            Order from {getLocationLabel(location)} <ArrowRight size={17} aria-hidden="true" />
                                        </button>
                                    ))}
                                </div>
                            ) : cateringLocations.length > 0 && (
                                <div className="mt-6">
                                    <p className="leading-7 text-white/62">
                                        Planning an event? Catering is available now from {cateringLocations.map(getLocationLabel).join(' and ')}.
                                    </p>
                                    <Link to="/catering" className="mt-5 inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light">
                                        <HandHeart size={17} aria-hidden="true" /> Request Catering
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Link to="/catering" className="group border border-brand-gold-deep/25 bg-ink-850 p-7 transition-colors hover:border-brand-gold/50">
                            <HandHeart className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Ordering for an event?</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">Request a personalized catering quote.</p>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                                Explore Catering <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </Link>
                        <a href={`mailto:${CONTACT.email}?subject=5Spice%20Order%20Question`} className="group border border-brand-gold-deep/25 bg-ink-850 p-7 transition-colors hover:border-brand-gold/50">
                            <Mail className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Questions about an order?</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">{CONTACT.email}</p>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                                Email Us <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pickup;
