import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BriefcaseBusiness, FlameKindling, Soup, Utensils } from 'lucide-react';
import { MENU_HIGHLIGHTS, QUICK_MEAL_ITEMS, SIGNATURE_ADD_ONS } from '../config/site';

const icons = [Soup, FlameKindling, Utensils];

const Kitchen = () => {
    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,80,10,0.14),transparent_36%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Fresh Restaurant</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Authentic meals for family dinners and quick lunches.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Enjoy traditional Bangladeshi favorites, family-style dishes, shawarma meals, snacks, sides, and office-friendly lunch options prepared fresh with bold flavor.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-5 md:grid-cols-3">
                        {MENU_HIGHLIGHTS.map((item, index) => {
                            const Icon = icons[index];
                            return (
                                <article key={item.title} className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                                    <Icon className="mb-5 text-[#D4A84B]" size={31} strokeWidth={1.35} />
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4A84B]/80">{item.category}</p>
                                    <h2 className="font-serif text-3xl font-semibold leading-tight text-white">{item.title}</h2>
                                    <p className="mt-4 leading-7 text-white/62">{item.text}</p>
                                </article>
                            );
                        })}
                    </div>

                    <div className="mt-8 border border-[#B88A3D]/25 bg-[#101010] p-7 md:p-10">
                        <h2 className="font-serif text-3xl font-semibold text-[#D4A84B]">Order restaurant favorites through partner apps.</h2>
                        <p className="mt-4 max-w-3xl leading-7 text-white/62">
                            Pickup and delivery options will be available through Toast, Uber Eats, and DoorDash as service begins.
                        </p>
                        <Link to="/pickup" className="mt-7 inline-flex items-center gap-2 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                            View Ordering Options <ArrowRight size={17} />
                        </Link>
                    </div>

                    <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                        <section className="border border-[#B88A3D]/25 bg-[#141414] p-7 md:p-9">
                            <BriefcaseBusiness className="mb-5 text-[#D4A84B]" size={32} strokeWidth={1.35} />
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A84B]/80">Office Lunch & Fast Meals</p>
                            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">Built for nearby offices and quick lunch breaks.</h2>
                            <p className="mt-4 leading-7 text-white/62">
                                A simple fast-eating menu can support commercial businesses around Plano with one-bowl meals, shawarma, sandwiches, rolls, wings, and easy sides.
                            </p>
                            <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                {QUICK_MEAL_ITEMS.map((item) => (
                                    <div key={item} className="border border-white/10 px-4 py-3 text-sm font-medium text-white/72">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="border border-[#B88A3D]/25 bg-[#101010] p-7 md:p-9">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A84B]/80">5Spice Signature Add-Ons</p>
                            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">Small bites that make orders memorable.</h2>
                            <p className="mt-4 leading-7 text-white/62">
                                Add sweets and spring rolls as signature extras for individual meals, office orders, and lunch-and-learn trays.
                            </p>
                            <div className="mt-7 space-y-3">
                                {SIGNATURE_ADD_ONS.map((item) => (
                                    <div key={item} className="border-l-2 border-[#D4A84B] bg-white/[0.03] px-4 py-3 text-white/72">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Kitchen;
