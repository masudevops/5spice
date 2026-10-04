import React from 'react';
import { ExternalLink, Mail, MapPin, PackageCheck, ShieldCheck, ShoppingBasket, Store, Utensils } from 'lucide-react';
import { CONTACT, ORDER_PLATFORMS } from '../config/site';

const orderGroups = [
    {
        title: 'Restaurant Pickup & Delivery',
        text: 'Order fresh meals, quick lunches, and family favorites through restaurant partner apps as service becomes available.',
        icon: Utensils,
        platforms: ['Toast', 'Uber Eats', 'DoorDash'],
    },
    {
        title: 'Grocery Delivery',
        text: 'Shop grocery favorites, pantry staples, fresh items, and household essentials through grocery delivery partners.',
        icon: ShoppingBasket,
        platforms: ['Instacart'],
    },
];

const Pickup = () => {
    const platformsByName = Object.fromEntries(ORDER_PLATFORMS.map((platform) => [platform.name, platform]));

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,106,63,0.16),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <Store className="mb-5 text-[#D4A84B]" size={34} strokeWidth={1.4} />
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Order Online</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
                        Simple ordering through trusted storefronts.
                    </h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Choose restaurant pickup, meal delivery, grocery shopping, and nearby office delivery options as each service becomes available.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-5 lg:grid-cols-2">
                        {orderGroups.map((group) => {
                            const Icon = group.icon;
                            return (
                                <section key={group.title} className="border border-[#B88A3D]/25 bg-[#141414] p-7 md:p-9">
                                    <Icon className="mb-5 text-[#D4A84B]" size={32} strokeWidth={1.35} />
                                    <h2 className="font-serif text-3xl font-semibold leading-tight text-white">{group.title}</h2>
                                    <p className="mt-4 leading-7 text-white/62">{group.text}</p>
                                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                        {group.platforms.map((name) => {
                                            const platform = platformsByName[name];
                                            const isReady = Boolean(platform.url);
                                            const Tag = isReady ? 'a' : 'div';
                                            return (
                                                <Tag
                                                    key={platform.name}
                                                    href={isReady ? platform.url : undefined}
                                                    target={isReady ? '_blank' : undefined}
                                                    rel={isReady ? 'noreferrer' : undefined}
                                                    aria-disabled={!isReady}
                                                    className={`border border-white/10 bg-[#101010] p-5 ${isReady ? 'transition-colors hover:border-[#D4A84B]' : 'opacity-82'}`}
                                                >
                                                    <PackageCheck className="mb-4 text-[#D4A84B]" size={23} strokeWidth={1.35} />
                                                    <h3 className="font-serif text-2xl font-semibold text-white">{platform.name}</h3>
                                                    <p className="mt-3 text-sm leading-6 text-white/58">{platform.description}</p>
                                                    <span className={`mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] ${isReady ? 'text-[#D4A84B]' : 'text-white/38'}`}>
                                                        {isReady ? platform.label : 'Link coming soon'}
                                                        {isReady && <ExternalLink size={15} />}
                                                    </span>
                                                </Tag>
                                            );
                                        })}
                                    </div>
                                </section>
                            );
                        })}
                    </div>

                    <div className="mt-8 border border-[#B88A3D]/25 bg-[#101010] p-7 md:p-10">
                        <ShieldCheck className="mb-5 text-[#D4A84B]" size={32} strokeWidth={1.35} />
                        <h2 className="font-serif text-3xl font-semibold text-[#D4A84B]">Need help with an order?</h2>
                        <p className="mt-4 max-w-3xl leading-7 text-white/62">
                            For office meals, catering, or special requests, email the 5Spice team directly and we will help route you to the right option.
                        </p>
                        <a href={`mailto:${CONTACT.email}?subject=5%20Spice%20Order%20Question`} className="mt-7 inline-flex items-center gap-3 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                            <Mail size={18} /> Email Us
                        </a>
                    </div>

                    <div className="mt-8 border border-[#B88A3D]/25 bg-[#141414] p-7 md:p-10">
                        <MapPin className="mb-5 text-[#D4A84B]" size={32} strokeWidth={1.35} />
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A84B]/80">Local Office Delivery</p>
                        <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">Planned delivery support for nearby offices.</h2>
                        <p className="mt-4 max-w-3xl leading-7 text-white/62">
                            A limited 2-3 mile office delivery option can be offered for qualifying orders over $50 after launch details are finalized. Exact availability will depend on staffing, distance, timing, and partner storefront setup.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pickup;
