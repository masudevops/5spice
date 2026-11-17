import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Facebook, HandHeart, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { CATERING_EMAIL, PHONE_TO_BE_UPDATED, SOCIAL_LINKS } from '../config/site';
import { getLocationLabel, getVisibleLocations } from '../data/locations';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { toTelHref } from '../utils/phone';

const cardClass = 'flex flex-col border border-brand-gold-deep/25 bg-ink-800 p-7';
const rowLinkClass = 'flex min-h-11 items-center gap-3 border border-brand-gold-deep/30 px-5 py-3 text-white/78 transition-colors hover:border-brand-gold hover:text-white';

// How to reach the right person. Addresses, hours, and directions live on the
// Locations pages; this page only links to them.
const Contact = () => {
    const locations = getVisibleLocations();
    const locationPhones = locations.filter((location) => location.phone);
    const locationFacebooks = locations.filter((location) => location.socialLinks?.facebook);
    const quoteMailto = `mailto:${CATERING_EMAIL}?subject=${encodeURIComponent('5Spice Catering Quote Request')}`;

    useDocumentHead({
        title: 'Contact 5Spice | Murphy & Plano, TX',
        description: 'Contact 5Spice Kitchen in Murphy, TX, ask about catering, or get updates on 5Spice Market & Kitchen, opening in Plano in early 2027, In Sha Allah.',
    });

    return (
        <div className="min-h-screen bg-ink-900 text-brand-cream">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-gold-deep)/0.14),transparent_34%),linear-gradient(135deg,rgb(var(--color-ink-900)),rgb(var(--color-ink-750)))]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Contact</p>
                    <h1 className="mt-5 font-serif text-5xl font-bold text-white md:text-6xl">Get in touch.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Questions about our Murphy kitchen, catering, or the upcoming Plano market? We'd love to hear from you.
                    </p>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-7xl">
                    <div className="grid gap-5 md:grid-cols-2">
                        <article className={cardClass}>
                            <Mail className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">General Questions</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">Questions, feedback, or partnership inquiries. We read every message and respond personally.</p>
                            <div className="mt-6">
                                <a href={`mailto:${SOCIAL_LINKS.email}`} className={rowLinkClass}>
                                    <Mail size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                                    <span className="break-all">{SOCIAL_LINKS.email}</span>
                                </a>
                            </div>
                        </article>

                        <article className={cardClass}>
                            <HandHeart className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Catering &amp; Events</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">Weddings, family celebrations, corporate events, and community gatherings.</p>
                            <div className="mt-6 grid gap-3">
                                <a href={`mailto:${CATERING_EMAIL}`} className={rowLinkClass}>
                                    <Mail size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                                    <span className="break-all">{CATERING_EMAIL}</span>
                                </a>
                                <div className="flex flex-wrap gap-3">
                                    <a href={quoteMailto} className="inline-flex min-h-11 items-center gap-2 bg-brand-green px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light">
                                        Request a Quote
                                    </a>
                                    <Link to="/catering" className="inline-flex min-h-11 items-center gap-2 px-2 py-3 text-sm font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:text-white">
                                        Catering Details <ArrowRight size={15} aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </article>

                        <article className={cardClass}>
                            <Instagram className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Follow Us</h2>
                            <p className="mt-3 text-sm leading-7 text-white/58">Opening news, first looks, and specials. You can also message us on Facebook.</p>
                            <div className="mt-6 grid gap-3">
                                <a href={SOCIAL_LINKS.instagramUrl} target="_blank" rel="noreferrer" className={rowLinkClass}>
                                    <Instagram size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                                    <span>Instagram: {SOCIAL_LINKS.instagramHandle}</span>
                                </a>
                                <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" className={rowLinkClass}>
                                    <Facebook size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                                    <span>Facebook: {SOCIAL_LINKS.facebookHandle}</span>
                                </a>
                                {locationFacebooks.map((location) => (
                                    <a key={location.slug} href={location.socialLinks.facebook} target="_blank" rel="noreferrer" className={rowLinkClass}>
                                        <Facebook size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                                        <span>{getLocationLabel(location)} on Facebook</span>
                                    </a>
                                ))}
                            </div>
                        </article>

                        <article className={cardClass}>
                            <Phone className="mb-4 text-brand-gold" size={28} strokeWidth={1.4} aria-hidden="true" />
                            <h2 className="font-serif text-2xl font-semibold text-white">Phone</h2>
                            {locationPhones.length > 0 ? (
                                <div className="mt-6 grid gap-3">
                                    {locationPhones.map((location) => (
                                        <a key={location.slug} href={toTelHref(location.phone)} className={rowLinkClass}>
                                            <Phone size={18} className="shrink-0 text-brand-gold" aria-hidden="true" />
                                            <span>{location.shortName}: {location.phone}</span>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-3 text-sm leading-7 text-white/58">
                                    {PHONE_TO_BE_UPDATED}. Email us or message us on Facebook in the meantime.
                                </p>
                            )}
                        </article>
                    </div>

                    {locations.length > 0 && (
                        <div className="mt-8 flex flex-col gap-3 border-t border-brand-gold-deep/20 pt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
                            <p className="flex items-center gap-2 font-semibold text-white">
                                <MapPin size={18} className="shrink-0 text-brand-gold" aria-hidden="true" /> Visiting us?
                            </p>
                            {locations.map((location) => (
                                <Link key={location.slug} to={`/locations/${location.slug}`} className="tap-area inline-flex items-center gap-2 text-brand-gold underline decoration-brand-gold-deep/40 underline-offset-4 hover:text-white">
                                    {getLocationLabel(location)}
                                </Link>
                            ))}
                            <Link to="/locations" className="tap-area inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.16em] text-white/70 hover:text-white">
                                All Locations <ArrowRight size={15} aria-hidden="true" />
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Contact;
