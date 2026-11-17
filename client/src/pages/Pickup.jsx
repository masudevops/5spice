import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, HandHeart, Mail, PackageCheck, Phone, ShoppingBasket, Store, Utensils } from 'lucide-react';
import { CONTACT, ORDER_PLATFORMS } from '../config/site';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { getLocationLabel, getOrderingLocations, takesRestaurantOrders } from '../data/locations';
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
    const takingOrders = takesRestaurantOrders(selectedLocation);
    const orderingLocations = getOrderingLocations();

    useDocumentHead({
        title: 'Order Online | 5Spice Kitchen – Murphy & 5Spice Market – Plano',
        description: 'Ordering options for 5Spice. 5Spice Kitchen in Murphy, TX is opening soon, and Plano ordering begins when it opens in early 2027. Catering is available for your events.',
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
            {/* No overflow-hidden here: it would clip the location dropdown. z-10
                keeps the open dropdown above the section below. */}
            <section className="relative z-10 px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-forest)/0.16),transparent_34%),linear-gradient(135deg,rgb(var(--color-ink-900)),rgb(var(--color-ink-750)))]" />
                <div className="relative mx-auto max-w-7xl">
                    <Store className="mb-5 text-brand-gold" size={34} strokeWidth={1.4} aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Order Online</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
                        Order your 5Spice favorites.
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        {orderingLocations.length > 0
                            ? 'Choose a location to see how to order.'
                            : 'Online ordering is coming soon. Planning an event? Request a catering quote below.'}
                    </p>

                    {orderingLocations.length > 0 && visibleLocations.length > 1 && (
                        <div className="mt-7 inline-flex flex-wrap items-center gap-3 border border-brand-gold-deep/30 bg-ink-800 px-5 py-4">
                            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Ordering from:</span>
                            <LocationSwitcher locations={visibleLocations} selectedSlug={selectedSlug} onSelect={selectLocation} />
                        </div>
                    )}
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {/* Ordering options only; addresses and directions live on the location pages. */}
                    {takingOrders && (
                        <div className="mb-8">
                            {livePlatformGroups.map((group) => {
                                const Icon = group.icon;
                                return (
                                    <div key={group.title} className="mb-8">
                                        <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
                                            <Icon size={22} className="text-brand-gold" aria-hidden="true" /> {group.title}
                                        </h2>
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
                                                    <h3 className="font-serif text-xl font-semibold text-white">{platform.name}</h3>
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
                            {livePlatformGroups.length === 0 && (
                                <p className="leading-7 text-white/68">
                                    {selectedLocation.phone
                                        ? 'Call to place your order. Online ordering through partner apps is coming soon.'
                                        : `Online ordering through partner apps is coming soon. Email ${CONTACT.email} with questions in the meantime.`}
                                </p>
                            )}
                            {selectedLocation.phone && (
                                <a
                                    href={toTelHref(selectedLocation.phone)}
                                    className="mt-5 inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light"
                                >
                                    <Phone size={17} aria-hidden="true" /> Call {selectedLocation.phone}
                                </a>
                            )}
                        </div>
                    )}

                    {/* The selected location isn't taking orders yet, but another one is. */}
                    {!takingOrders && orderingLocations.length > 0 && (
                        <div className="mb-8 flex flex-wrap gap-3">
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
                    )}

                    <div className="grid gap-5 md:grid-cols-2">
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
