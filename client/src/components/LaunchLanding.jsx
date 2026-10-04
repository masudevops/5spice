import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, HandHeart, MapPin, PackageCheck, ShoppingBasket, Truck, Utensils, Users } from 'lucide-react';
import { CONTACT, isGrandOpeningMode, OFFERINGS, ORDER_PLATFORMS, TRUST_SIGNALS } from '../config/site';

const primaryPaths = [
    {
        title: 'Premium Halal Market',
        text: 'Explore department highlights: fresh fish, zabiha halal meat, farm-fresh produce, spices, rice, frozen favorites, and specialty groceries.',
        href: '/market',
        action: 'Explore Market',
        icon: ShoppingBasket,
    },
    {
        title: 'Fresh Restaurant',
        text: 'Explore restaurant highlights: family-style meals, quick lunches, grills, drinks, and comforting flavors made with care.',
        href: '/kitchen',
        action: 'View Kitchen Menu',
        icon: Utensils,
    },
];

const serviceCards = [
    { title: 'Weekly Specials', text: 'Browse launch offers and seasonal grocery features.', href: '/sales', icon: PackageCheck },
    { title: 'Event Catering', text: 'Plan family gatherings, office meals, weddings, and community events.', href: '/catering', icon: HandHeart },
    { title: 'Order Online', text: 'Find pickup, delivery, and grocery shopping options through our partner storefronts.', href: '/pickup', icon: Truck },
];

const LaunchLanding = () => {
    return (
        <div className="relative overflow-hidden bg-[#0E0E0E] text-[#F0EAD6]">
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.12),transparent_34%),linear-gradient(135deg,#0E0E0E_0%,#161616_56%,#0E0E0E_100%)]" />
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.045] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.75)_1px,transparent_0)] [background-size:22px_22px]" />

            {isGrandOpeningMode && (
                <div className="relative z-10 border-b border-[#B88A3D]/25 bg-[#1CA433] px-4 py-3 text-center text-sm font-semibold text-white">
                    Grand Opening: welcome to 5Spice Market & Kitchen in Plano.
                    <Link to="/contact" className="ml-2 underline decoration-white/50 underline-offset-4 hover:text-[#D4A84B]">Plan your visit</Link>
                </div>
            )}

            <section className="relative z-10 px-5 py-16 sm:px-8 md:py-20 lg:px-12">
                <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_0.82fr]">
                    <div className="animate-fade-in-up">
                        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[0.98] text-white sm:text-6xl xl:text-7xl">
                            Premium halal grocery and fresh restaurant under one roof.
                        </h1>
                        <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
                            A refined home for everyday groceries, fresh fish, zabiha halal meat, family meals, and the flavors the Greater DFW community craves.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link to="/market" className="bg-[#1CA433] px-7 py-4 text-center font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                                Explore Departments
                            </Link>
                            <Link to="/kitchen" className="border border-[#B88A3D]/50 px-7 py-4 text-center font-bold uppercase tracking-[0.16em] text-[#F0EAD6] transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B]">
                                View Menu Highlights
                            </Link>
                            <Link to="/pickup" className="border border-[#B88A3D]/50 px-7 py-4 text-center font-bold uppercase tracking-[0.16em] text-[#F0EAD6] transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B]">
                                Order Online
                            </Link>
                        </div>
                        <div className="mt-7 inline-flex items-center gap-3 border border-[#B88A3D]/35 bg-[#1A1A1A]/70 px-5 py-3 text-[#D4A84B]">
                            <CalendarDays size={20} aria-hidden="true" />
                            <span className="font-semibold tracking-wide">Opening Early 2027, In Sha Allah</span>
                        </div>
                        <div className="mt-4 flex flex-col gap-3 text-sm text-white/62 sm:flex-row sm:items-center">
                            <span className="inline-flex items-center gap-2">
                                <MapPin size={17} className="text-[#D4A84B]" aria-hidden="true" />
                                {CONTACT.postalAddress}
                            </span>
                            <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#D4A84B] underline decoration-[#B88A3D]/40 underline-offset-4 hover:text-white">
                                Open map
                            </a>
                        </div>
                    </div>

                    <div className="grid gap-4 animate-fade-in-up">
                        {primaryPaths.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link key={item.title} to={item.href} className="group border border-[#B88A3D]/28 bg-[#1A1A1A]/82 p-7 shadow-[0_22px_70px_rgba(0,0,0,0.25)] transition-colors hover:border-[#D4A84B]/65">
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-[#B88A3D]/40 text-[#D4A84B]">
                                        <Icon size={26} strokeWidth={1.4} />
                                    </div>
                                    <h2 className="font-serif text-3xl font-semibold text-white">{item.title}</h2>
                                    <p className="mt-4 text-sm leading-7 text-white/64">{item.text}</p>
                                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#D4A84B]">
                                        {item.action} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative z-10 px-5 pb-8 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="border border-[#B88A3D]/25 bg-[#101010]/82 p-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A84B]">Visit Us</p>
                        <h2 className="mt-4 font-serif text-3xl font-semibold text-white">Opening in East Plano.</h2>
                        <p className="mt-4 leading-7 text-white/62">{CONTACT.postalAddress}</p>
                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <Link to="/contact" className="bg-[#1CA433] px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                                Plan Your Visit
                            </Link>
                            <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="border border-[#B88A3D]/35 px-5 py-3 text-center text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white">
                                View Map
                            </a>
                        </div>
                    </div>
                    <div className="border border-[#B88A3D]/20 bg-white/[0.03] p-7">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A84B]">What Customers Can Count On</p>
                        <div className="mt-5 flex flex-wrap gap-3">
                            {TRUST_SIGNALS.map((signal) => (
                                <span key={signal} className="border border-white/10 bg-[#141414] px-4 py-2 text-sm font-semibold text-white/72">
                                    {signal}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative z-10 px-5 py-14 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A84B]">Five spices. One home.</p>
                        <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-white md:text-5xl">
                            Built for grocery runs, family meals, and community gatherings.
                        </h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {OFFERINGS.map((offering, index) => {
                            const icons = [ShoppingBasket, Utensils, Users];
                            const Icon = icons[index];
                            return (
                                <article key={offering.title} className="border border-[#B88A3D]/25 bg-[#141414]/86 p-7">
                                    <Icon className="mb-5 text-[#D4A84B]" size={30} strokeWidth={1.35} />
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
                        {serviceCards.map((service) => {
                            const Icon = service.icon;
                            return (
                                <Link key={service.title} to={service.href} className="group border border-white/10 bg-white/[0.035] p-6 transition-colors hover:border-[#D4A84B]/50">
                                    <Icon className="mb-4 text-[#D4A84B]" size={27} strokeWidth={1.4} />
                                    <h3 className="font-serif text-2xl font-semibold text-white">{service.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-white/58">{service.text}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D4A84B]">
                                        Learn more <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="relative z-10 px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl border border-[#B88A3D]/25 bg-[#101010]/82 p-7 md:p-10">
                    <div className="mb-7 max-w-3xl">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#D4A84B]">Order through trusted partners</p>
                        <h2 className="mt-4 font-serif text-4xl font-semibold text-white">Order from the apps you already use.</h2>
                        <p className="mt-4 leading-7 text-white/62">
                            Choose from restaurant pickup, meal delivery, and grocery delivery options as each 5Spice storefront becomes available.
                        </p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        {ORDER_PLATFORMS.map((platform) => (
                            <Link
                                key={platform.name}
                                to="/pickup"
                                className="border border-[#B88A3D]/25 px-5 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white"
                            >
                                {platform.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LaunchLanding;
