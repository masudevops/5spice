import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Facebook, HandHeart, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { CATERING_EMAIL, SOCIAL_LINKS } from '../config/site';
import { getLocationLabel, getVisibleLocations } from '../data/locations';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { toTelHref } from '../utils/phone';

const Contact = () => {
    const locations = getVisibleLocations();

    useDocumentHead({
        title: 'Contact 5Spice | Murphy & Plano, TX',
        description: 'Contact 5Spice Kitchen in Murphy, TX, ask about catering, or get updates on 5Spice Market & Kitchen, opening in Plano in early 2027, In Sha Allah.',
    });

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Contact</p>
                    <h1 className="mt-5 font-serif text-5xl font-bold text-white md:text-6xl">Plan your visit.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Questions about our Murphy kitchen, catering, or the upcoming Plano market? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_1fr]">
                    <div className="grid gap-5">
                        {locations.map((location) => {
                            const isOpen = location.status === 'open';
                            return (
                                <article key={location.slug} className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                                    <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${isOpen ? 'text-[#1CA433]' : 'text-[#D4A84B]'}`}>
                                        {location.openingText}
                                    </p>
                                    <h2 className="mt-3 font-serif text-3xl font-semibold text-white">
                                        <Link to={`/locations/${location.slug}`} className="hover:text-[#D4A84B]">{getLocationLabel(location)}</Link>
                                    </h2>
                                    <p className="mt-4 flex items-start gap-2 text-white/68">
                                        <MapPin size={18} className="mt-1 shrink-0 text-[#D4A84B]" aria-hidden="true" />
                                        {location.address.full}
                                    </p>
                                    {location.hours.length === 0 && location.hoursNote && (
                                        <p className="mt-2 flex items-start gap-2 text-sm text-white/55">
                                            <Clock size={16} className="mt-0.5 shrink-0 text-[#D4A84B]" aria-hidden="true" />
                                            {location.hoursNote}
                                        </p>
                                    )}
                                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold uppercase tracking-[0.16em]">
                                        {location.phone && (
                                            <a href={toTelHref(location.phone)} className="inline-flex items-center gap-2 text-[#D4A84B] hover:text-white">
                                                <Phone size={16} aria-hidden="true" /> {location.phone}
                                            </a>
                                        )}
                                        <a href={location.googleMapsUrl} target="_blank" rel="noreferrer" className="text-[#D4A84B] underline decoration-[#B88A3D]/40 underline-offset-4 hover:text-white">
                                            Open in Maps
                                        </a>
                                        {location.socialLinks?.facebook && (
                                            <a href={location.socialLinks.facebook} target="_blank" rel="noreferrer" aria-label={`${getLocationLabel(location)} on Facebook`} className="inline-flex items-center gap-2 text-[#D4A84B] hover:text-white">
                                                <Facebook size={16} aria-hidden="true" /> Facebook
                                            </a>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    <div className="border border-[#B88A3D]/25 bg-[#101010] p-7">
                        <MessageCircle className="mb-4 text-[#D4A84B]" size={30} aria-hidden="true" />
                        <h2 className="font-serif text-3xl font-semibold text-[#D4A84B]">Get in Touch</h2>
                        <p className="mt-4 leading-7 text-white/62">
                            Email us directly. We read every message and respond personally.
                        </p>
                        <div className="mt-7 grid gap-3">
                            <a href={`mailto:${SOCIAL_LINKS.email}`} className="flex items-center gap-3 border border-[#B88A3D]/30 px-5 py-4 text-white/78 transition-colors hover:border-[#D4A84B] hover:text-white">
                                <Mail size={19} className="shrink-0 text-[#D4A84B]" aria-hidden="true" />
                                <span>General: {SOCIAL_LINKS.email}</span>
                            </a>
                            <a href={`mailto:${CATERING_EMAIL}`} className="flex items-center gap-3 border border-[#B88A3D]/30 px-5 py-4 text-white/78 transition-colors hover:border-[#D4A84B] hover:text-white">
                                <HandHeart size={19} className="shrink-0 text-[#D4A84B]" aria-hidden="true" />
                                <span>Catering: {CATERING_EMAIL}</span>
                            </a>
                            <a href={SOCIAL_LINKS.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 border border-[#B88A3D]/30 px-5 py-4 text-white/78 transition-colors hover:border-[#D4A84B] hover:text-white">
                                <Instagram size={19} className="shrink-0 text-[#D4A84B]" aria-hidden="true" />
                                <span>Instagram: {SOCIAL_LINKS.instagramHandle}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
