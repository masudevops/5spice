import React from 'react';
import { Clock, Globe2, Mail, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT, HOURS, SOCIAL_LINKS } from '../config/site';

const Contact = () => {
    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Contact</p>
                    <h1 className="mt-5 font-serif text-5xl font-bold text-white md:text-6xl">Plan your visit.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Questions about the market, restaurant, catering, or launch updates? Reach the 5Spice team directly.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1fr]">
                    <div className="grid gap-5">
                        <article className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                            <MapPin className="mb-4 text-[#D4A84B]" size={28} />
                            <h2 className="font-serif text-3xl font-semibold text-white">Location</h2>
                            <p className="mt-3 text-white/62">{CONTACT.postalAddress}</p>
                            <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] underline decoration-[#B88A3D]/40 underline-offset-4 hover:text-white">
                                Open in Maps
                            </a>
                        </article>
                        <article className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                            <Clock className="mb-4 text-[#D4A84B]" size={28} />
                            <h2 className="font-serif text-3xl font-semibold text-white">Hours</h2>
                            <ul className="mt-5 space-y-3 text-white/62">
                                {HOURS.map((item) => (
                                    <li key={item.days} className="flex justify-between gap-4 border-b border-white/8 pb-3">
                                        <span>{item.days}</span>
                                        <span className="text-white/82">{item.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>

                    <div className="border border-[#B88A3D]/25 bg-[#101010] p-7">
                        <MessageCircle className="mb-4 text-[#D4A84B]" size={30} />
                        <h2 className="font-serif text-3xl font-semibold text-[#D4A84B]">Get in Touch</h2>
                        <p className="mt-4 leading-7 text-white/62">
                            Email us directly — we read every message and respond personally.
                        </p>
                        <div className="mt-7 grid gap-3">
                            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 border border-[#B88A3D]/30 px-5 py-4 text-white/78 transition-colors hover:border-[#D4A84B] hover:text-white">
                                <Mail size={19} className="text-[#D4A84B]" />
                                {CONTACT.email}
                            </a>
                            <a href="https://5spicemarket.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-[#B88A3D]/30 px-5 py-4 text-white/78 transition-colors hover:border-[#D4A84B] hover:text-white">
                                <Globe2 size={19} className="text-[#D4A84B]" />
                                {CONTACT.website}
                            </a>
                            <a href={SOCIAL_LINKS.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-[#B88A3D]/30 px-5 py-4 text-white/78 transition-colors hover:border-[#D4A84B] hover:text-white">
                                <MessageCircle size={19} className="text-[#D4A84B]" />
                                {SOCIAL_LINKS.instagramHandle}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
