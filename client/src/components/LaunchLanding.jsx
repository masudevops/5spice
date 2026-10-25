import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, CalendarDays, HandHeart, MapPin, MapPinned, ShoppingBasket, Truck, Utensils, Users } from 'lucide-react';
import { OFFERINGS } from '../config/site';
import CateringStats from './CateringStats';
import { getCateringOpenLocations, getLocationLabel, getOrderingLocations, getUpcomingLocations, getVisibleLocations } from '../data/locations';
import { useDocumentHead } from '../hooks/useDocumentHead';

const buildServiceCards = (orderLocation) => [
    { title: 'Catering', text: 'Weddings, family celebrations, corporate events, and community gatherings.', href: '/catering', icon: HandHeart },
    orderLocation
        ? { title: 'Order Online', text: `See how to order from ${getLocationLabel(orderLocation)}.`, href: '/pickup', icon: Truck }
        : { title: 'Locations', text: 'Addresses, directions, and contact details for Murphy and Plano.', href: '/locations', icon: MapPinned },
    { title: 'Our Story', text: 'How পাঁচফোড়ন, the Bengali five-spice blend, inspired the 5Spice name.', href: '/about', icon: BookOpen },
].filter(Boolean);

const SERVICE_NAMES = { catering: 'Catering', dineIn: 'Dine-in', takeOut: 'Take-out' };

// e.g. "Catering now · Dine-in & Take-out coming soon", from location.services.
const describeServices = (services) => {
    const names = (status) => Object.entries(services).filter(([, value]) => value === status).map(([key]) => SERVICE_NAMES[key] ?? key);
    const open = names('open');
    const soon = names('coming-soon');
    return [open.length && `${open.join(' & ')} now`, soon.length && `${soon.join(' & ')} coming soon`].filter(Boolean).join(' · ');
};

const LaunchLanding = () => {
    const orderingLocations = getOrderingLocations();
    const cateringLocations = getCateringOpenLocations();
    const upcomingLocations = getUpcomingLocations();
    const upcomingMarket = upcomingLocations.find((location) => location.flags.hasMarket);

    useDocumentHead({
        title: '5Spice Market & Kitchen | Halal Grocery & Authentic Bangladeshi Cuisine in DFW',
        description: 'Authentic halal Bangladeshi catering from 5Spice Kitchen in Murphy, TX, with dine-in and take-out coming soon. 5Spice Market & Kitchen, a premium halal grocery and restaurant, is coming to Plano in early 2027, In Sha Allah.',
    });

    return (
        <div className="relative overflow-hidden bg-ink-900 text-brand-cream">
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-gold-deep)/0.12),transparent_34%),linear-gradient(135deg,rgb(var(--color-ink-900))_0%,rgb(var(--color-ink-750))_56%,rgb(var(--color-ink-900))_100%)]" />
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.75)_1px,transparent_0)] [background-size:22px_22px]" />


            <section className="relative z-10 px-5 py-16 sm:px-8 md:py-20 lg:px-12">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.82fr]">
                    <div className="animate-fade-in-up">
                        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[0.98] text-white sm:text-6xl xl:text-7xl">
                            Your Neighborhood Destination for Halal Groceries &amp; Authentic Flavors.
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
                            Bringing premium halal meats, fresh seafood, everyday groceries, and authentic Bangladeshi cuisine with South Asian favorites together under one roof.
                        </p>
                        {upcomingMarket && (
                            <div className="mt-7 inline-flex flex-wrap items-center gap-x-3 gap-y-1 border border-brand-gold-deep/35 bg-ink-700/70 px-5 py-3 text-brand-gold">
                                <CalendarDays size={20} aria-hidden="true" />
                                <span className="font-semibold tracking-wide">{upcomingMarket.openingText}</span>
                                <span className="text-sm text-white/55">{upcomingMarket.address.city}, {upcomingMarket.address.state}</span>
                            </div>
                        )}
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link to="/market" className="bg-brand-green px-7 py-4 text-center font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light">
                                Explore the Market
                            </Link>
                            <Link to="/locations" className="border border-brand-gold-deep/50 px-7 py-4 text-center font-bold uppercase tracking-[0.16em] text-brand-cream transition-colors hover:border-brand-gold hover:text-brand-gold">
                                Our Locations
                            </Link>
                        </div>
                        {orderingLocations.length > 0
                            ? orderingLocations.map((location) => (
                                <p key={location.slug} className="mt-6 text-sm text-white/62">
                                    <Utensils size={16} className="mr-2 inline text-brand-green" aria-hidden="true" />
                                    Craving it now?{' '}
                                    <Link to={`/locations/${location.slug}`} className="font-semibold text-brand-gold underline decoration-brand-gold-deep/40 underline-offset-4 hover:text-white">
                                        {getLocationLabel(location)}
                                    </Link>{' '}
                                    is now serving.
                                </p>
                            ))
                            : cateringLocations.map((location) => (
                                <p key={location.slug} className="mt-6 text-sm text-white/62">
                                    <HandHeart size={16} className="mr-2 inline text-brand-green" aria-hidden="true" />
                                    Planning an event?{' '}
                                    <Link to="/catering" className="font-semibold text-brand-gold underline decoration-brand-gold-deep/40 underline-offset-4 hover:text-white">
                                        Catering is available now
                                    </Link>{' '}
                                    from {getLocationLabel(location)}.
                                </p>
                            ))}
                    </div>

                    <div className="grid gap-4 animate-fade-in-up">
                        {getVisibleLocations().map((location) => {
                            const isOpen = location.status === 'open';
                            const Icon = location.flags.hasMarket ? ShoppingBasket : Utensils;
                            return (
                                <Link key={location.slug} to={`/locations/${location.slug}`} className="group border border-brand-gold-deep/28 bg-ink-700/82 p-7 shadow-[0_22px_70px_rgba(0,0,0,0.25)] transition-colors hover:border-brand-gold/65">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-brand-gold-deep/40 text-brand-gold">
                                            <Icon size={26} strokeWidth={1.4} aria-hidden="true" />
                                        </div>
                                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] ${isOpen ? 'bg-brand-green/15 text-brand-green' : 'bg-brand-gold/15 text-brand-gold'}`}>
                                            {location.statusLabel}
                                        </span>
                                    </div>
                                    <h2 className="mt-6 font-serif text-3xl font-semibold text-white">{getLocationLabel(location)}</h2>
                                    <p className="mt-3 text-sm leading-7 text-white/64">
                                        {location.flags.hasMarket ? 'Halal grocery market & restaurant' : 'Restaurant & catering'}
                                        {location.services && (
                                            <span className="block text-white/50">{describeServices(location.services)}</span>
                                        )}
                                    </p>
                                    <p className="mt-1 flex items-start gap-2 text-sm text-white/55">
                                        <MapPin size={16} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                                        {location.address.full}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-gold">
                                        Learn More <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <CateringStats />

            <section className="relative z-10 px-5 py-14 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">Five spices. One home.</p>
                        <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Built for grocery runs, family meals, and community gatherings.
                        </h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {OFFERINGS.map((offering, index) => {
                            const icons = [ShoppingBasket, Utensils, Users];
                            const Icon = icons[index];
                            return (
                                <article key={offering.title} className="border border-brand-gold-deep/25 bg-ink-800/86 p-7">
                                    <Icon className="mb-5 text-brand-gold" size={30} strokeWidth={1.35} aria-hidden="true" />
                                    <h3 className="font-serif text-2xl font-semibold text-white">{offering.title}</h3>
                                    <p className="mt-4 text-sm leading-7 text-white/62">{offering.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative z-10 px-5 pb-20 pt-8 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-5 md:grid-cols-3">
                        {buildServiceCards(orderingLocations[0]).map((service) => {
                            const Icon = service.icon;
                            return (
                                <Link key={service.title} to={service.href} className="group border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-brand-gold/50">
                                    <Icon className="mb-4 text-brand-gold" size={27} strokeWidth={1.4} aria-hidden="true" />
                                    <h3 className="font-serif text-2xl font-semibold text-white">{service.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-white/58">{service.text}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">
                                        Learn more <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LaunchLanding;
