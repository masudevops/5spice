import React from 'react';
import { BriefcaseBusiness, CheckCircle, Gift, Mail } from 'lucide-react';
import { CONTACT } from '../config/site';

const cateringHighlights = [
    '100% zabiha halal meat options',
    'Authentic Bangladeshi and South Asian dishes',
    'Family trays and event-size portions',
    'Manual quote confirmation by the 5Spice team',
];

const officeHighlights = [
    'Lunch-and-learn bulk meals for nearby offices',
    'Receptionist and office manager outreach for 10+ order groups',
    'Fast lunch bundles with sweets or spring roll add-ons',
    'Delivery availability confirmed by distance, order size, and schedule',
];

const Catering = () => {
    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Event Catering</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Food your family and guests will recognize.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Weddings, office meals, community events, family gatherings, and special occasions with authentic flavor and careful planning.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                        <h2 className="font-serif text-3xl font-semibold text-white">Catering Details</h2>
                        <ul className="mt-7 space-y-4">
                            {cateringHighlights.map(item => (
                                <li key={item} className="flex gap-3 text-white/68">
                                    <CheckCircle className="mt-0.5 shrink-0 text-[#D4A84B]" size={19} />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border border-[#B88A3D]/25 bg-[#101010] p-7">
                        <h2 className="font-serif text-3xl font-semibold text-[#D4A84B]">Request a Quote</h2>
                        <p className="mt-4 leading-7 text-white/62">
                            Send your event details and the 5Spice team will help plan menu options, portions, timing, and next steps.
                        </p>
                        <a href={`mailto:${CONTACT.email}?subject=5%20Spice%20Catering%20Request`} className="mt-7 inline-flex items-center gap-3 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                            <Mail size={19} /> Email Catering Request
                        </a>
                    </div>
                </div>

                <div className="mx-auto mt-8 max-w-7xl border border-[#B88A3D]/25 bg-[#101010] p-7 md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <BriefcaseBusiness className="mb-5 text-[#D4A84B]" size={32} strokeWidth={1.35} />
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A84B]/80">Office Lunch Program</p>
                            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">Fast meals for commercial teams around Plano.</h2>
                            <p className="mt-4 leading-7 text-white/62">
                                The 5Spice team can visit nearby office spaces, introduce lunch options, and coordinate simple group orders for reception desks, office managers, and lunch-and-learn events.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            {officeHighlights.map((item, index) => (
                                <div key={item} className="border border-white/10 bg-white/[0.03] p-4">
                                    {index === 1 ? (
                                        <Gift className="mb-3 text-[#D4A84B]" size={21} strokeWidth={1.45} />
                                    ) : (
                                        <CheckCircle className="mb-3 text-[#D4A84B]" size={21} strokeWidth={1.45} />
                                    )}
                                    <p className="text-sm leading-6 text-white/70">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Catering;
