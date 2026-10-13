import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, ExternalLink, HandHeart, Mail, MapPin, Navigation, PackageCheck, Phone, ShoppingBasket, Store, Utensils } from 'lucide-react';
import { CONTACT, ORDER_PLATFORMS } from '../config/site';
import { useSelectedLocation } from '../hooks/useSelectedLocation';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { getLocationLabel, getOpenLocations } from '../data/locations';
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
    const openLocations = getOpenLocations();

    useDocumentHead({
        title: 'Order Online | 5Spice Kitchen – Murphy, TX',
        description: 'Order authentic halal Bangladeshi and South Asian food from 5Spice Kitchen in Murphy, TX. Grocery and restaurant ordering for our Plano location begins when it opens in early 2027.',
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
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,106,63,0.16),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <Store className="mb-5 text-[#D4A84B]" size={34} strokeWidth={1.4} aria-hidden="true" />
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Order Online</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
                        Order your 5Spice favorites.
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Choose a location to see how to order.
                    </p>

                    {visibleLocations.length > 1 && (
                        <div className="mt-7 inline-flex flex-wrap items-center gap-3 border border-[#B88A3D]/30 bg-[#141414] px-5 py-4">
                            <span className="text-sm font-semibold uppercase tracking-[0.14em] text-white/70">Ordering from:</span>
                            <LocationSwitcher locations={visibleLocations} selectedSlug={selectedSlug} onSelect={selectLocation} />
                        </div>
                    )}
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    {!selectedLocation && (
                        <div className="border border-[#B88A3D]/25 bg-[#141414] p-7 text-white/68">
                            Ordering isn't available yet. Check back soon.
                        </div>
                    )}

                    {selectedLocation && isOpen && (
                        <div className="border border-[#B88A3D]/25 bg-[#141414] p-7 md:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#1CA433]">{selectedLocation.statusLabel}</p>
                            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">{getLocationLabel(selectedLocation)}</h2>
                            <p className="mt-3 flex items-start gap-2 text-white/68">
                                <MapPin size={18} className="mt-1 shrink-0 text-[#D4A84B]" aria-hidden="true" />
                                {selectedLocation.address.full}
                            </p>

                            {livePlatformGroups.map((group) => {
                                const Icon = group.icon;
                                return (
                                    <div key={group.title} className="mt-8">
                                        <h3 className="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
                                            <Icon size={22} className="text-[#D4A84B]" aria-hidden="true" /> {group.title}
                                        </h3>
                                        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {group.platforms.map((platform) => (
                                                <a
                                                    key={platform.key}
                                                    href={selectedLocation.orderingLinks[platform.key]}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="border border-white/10 bg-[#101010] p-5 transition-colors hover:border-[#D4A84B]"
                                                >
                                                    <PackageCheck className="mb-4 text-[#D4A84B]" size={23} strokeWidth={1.35} aria-hidden="true" />
                                                    <h4 className="font-serif text-xl font-semibold text-white">{platform.name}</h4>
                                                    <p className="mt-2 text-sm leading-6 text-white/58">{platform.description}</p>
                                                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#D4A84B]">
                                                        {platform.label} <ExternalLink size={15} aria-hidden="true" />
                                                    </span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="mt-8 border-t border-white/10 pt-7">
                                {selectedLocation.phone && (
                                    <p className="leading-7 text-white/68">
                                        {livePlatformGroups.length > 0
                                            ? 'Prefer to order by phone? Give us a call.'
                                            : 'Call to place your order. Online ordering through partner apps is coming soon.'}
                                    </p>
                                )}
                                <div className="mt-5 flex flex-wrap gap-3">
                                    {selectedLocation.phone && (
                                        <a href={toTelHref(selectedLocation.phone)} className="inline-flex items-center gap-2 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                                            <Phone size={17} aria-hidden="true" /> Call {selectedLocation.phone}
                                        </a>
                                    )}
                                    <a href={selectedLocation.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#B88A3D]/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white">
                                        <Navigation size={17} aria-hidden="true" /> Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedLocation && !isOpen && (
                        <div className="border border-[#B88A3D]/25 bg-[#141414] p-7 md:p-9">
                            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A84B]">
                                <CalendarDays size={15} aria-hidden="true" /> {selectedLocation.openingText}
                            </p>
                            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">{getLocationLabel(selectedLocation)}</h2>
                            <p className="mt-3 max-w-3xl leading-7 text-white/62">
                                {selectedLocation.flags.hasMarket
                                    ? 'Restaurant and grocery ordering will begin when this location opens.'
                                    : 'Ordering will begin when this location opens.'}
                            </p>
                            {openLocations.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {openLocations.map((location) => (
                                        <button
                                            key={location.slug}
                                            type="button"
                                            onClick={() => selectLocation(location.slug)}
                                            className="inline-flex items-center gap-2 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]"
                                        >
                                            Order from {getLocationLabel(location)} <ArrowRight size={17} aria-hidden="true" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-8 grid gap-5 md:grid-cols-2">
                        <Link to="/catering" className="group border border-[#B88A3D]/25 bg-[#101010] p-7 transition-colors hover:border-[#D4A84B]/50">
                            <HandHeart className="mb-4 text-[#D4A84B]" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Ordering for an event?</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">Request a personalized catering quote.</p>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D4A84B]">
                                Explore Catering <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                            </span>
                        </Link>
                        <a href={`mailto:${CONTACT.email}?subject=5Spice%20Order%20Question`} className="group border border-[#B88A3D]/25 bg-[#101010] p-7 transition-colors hover:border-[#D4A84B]/50">
                            <Mail className="mb-4 text-[#D4A84B]" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Questions about an order?</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">{CONTACT.email}</p>
                            <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D4A84B]">
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
