import React from 'react';
import { Link } from 'react-router-dom';
import { BriefcaseBusiness, CalendarClock, CheckCircle, Clock, Facebook, Mail, MapPin, Navigation, Phone, Users } from 'lucide-react';
import { CATERING_EMAIL } from '../config/site';
import { getCateringOpenLocations, getVisibleLocations } from '../data/locations';
import { useDocumentHead } from '../hooks/useDocumentHead';
import { toTelHref } from '../utils/phone';

const cateringHighlights = [
    '100% Zabiha Halal Meat',
    'Authentic Bangladeshi & South Asian Cuisine',
    'Family Trays, Party Platters & Large Event Catering',
    'Customized Menus & Catering Packages',
];

const corporateHighlights = [
    { icon: Users, text: 'Group lunches and team meetings' },
    { icon: BriefcaseBusiness, text: 'Corporate events and office celebrations' },
    { icon: CheckCircle, text: 'Flexible portions sized for your group' },
    { icon: CalendarClock, text: 'Pickup or delivery options confirmed with your quote' },
];

// Prefilled email so customers send everything needed for a quote in one message.
const quoteEmailBody = `Hello 5Spice Catering team,

I'd like a catering quote. Here are my event details:

Name:
Phone number:
Event date and time:
Event location (city):
Number of guests:
Type of event:
Preferred dishes:
Pickup or delivery:
Anything else we should know:

Thank you!`;

const quoteMailto = `mailto:${CATERING_EMAIL}?subject=${encodeURIComponent('5Spice Catering Quote Request')}&body=${encodeURIComponent(quoteEmailBody)}`;

const Catering = () => {
    const cateringLocations = getCateringOpenLocations();
    const upcomingLocations = getVisibleLocations().filter(
        (location) => location.status === 'coming-soon' && location.services?.catering !== 'open'
    );

    useDocumentHead({
        title: 'Halal Bangladeshi Catering in Murphy & Plano, TX | 5Spice Kitchen',
        description: 'Authentic halal Bangladeshi and South Asian catering for weddings, family celebrations, corporate events, and community gatherings in Murphy, Plano, and across DFW.',
    });

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Halal Bangladeshi Catering</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Authentic Bangladeshi Flavors, Made for Every Occasion.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        From weddings and family celebrations to corporate lunches and community gatherings, enjoy authentic Bangladeshi and South Asian halal cuisine, freshly prepared with care.
                    </p>
                    {cateringLocations.length > 0 && (
                        <div className="mt-7 flex flex-wrap gap-3">
                            {cateringLocations.map((location) => (
                                <a
                                    key={location.slug}
                                    href="#catering-location"
                                    className="inline-flex items-center gap-2 border border-[#1CA433]/40 bg-[#1CA433]/10 px-4 py-2 text-sm font-semibold text-white/85 transition-colors hover:border-[#1CA433] hover:text-white"
                                >
                                    <MapPin size={16} className="shrink-0 text-[#1CA433]" aria-hidden="true" />
                                    Now accepting catering orders from {location.displayName} – {location.shortName}.
                                </a>
                            ))}
                        </div>
                    )}
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
                        <h2 className="font-serif text-3xl font-semibold text-[#D4A84B]">Let's Plan Your Next Event!</h2>
                        <p className="mt-4 leading-7 text-white/62">
                            Share your event date, location, guest count, and preferred dishes, and we'll put together a personalized quote for you.
                        </p>
                        <a href={quoteMailto} className="mt-7 inline-flex items-center gap-3 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                            <Mail size={19} /> Email Catering Request
                        </a>
                        <p className="mt-4 text-sm text-white/55">
                            Or write to <a href={`mailto:${CATERING_EMAIL}`} className="text-[#D4A84B] underline decoration-[#B88A3D]/40 underline-offset-4 hover:text-white">{CATERING_EMAIL}</a>
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-8 max-w-7xl border border-[#B88A3D]/25 bg-[#101010] p-7 md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <BriefcaseBusiness className="mb-5 text-[#D4A84B]" size={32} strokeWidth={1.35} />
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A84B]/80">For Teams &amp; Businesses</p>
                            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">Corporate &amp; Office Catering</h2>
                            <p className="mt-4 leading-7 text-white/62">
                                Bring authentic halal Bangladeshi and South Asian dishes to your next team lunch, client meeting, or company event, with portions planned around your group.
                            </p>
                        </div>
                        <ul className="grid gap-3 sm:grid-cols-2">
                            {corporateHighlights.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <li key={item.text} className="border border-white/10 bg-white/[0.03] p-4">
                                        <Icon className="mb-3 text-[#D4A84B]" size={21} strokeWidth={1.45} aria-hidden="true" />
                                        <p className="text-sm leading-6 text-white/70">{item.text}</p>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div id="catering-location" className="mx-auto mt-8 max-w-7xl scroll-mt-24 border border-[#B88A3D]/25 bg-[#141414] p-7 md:p-10">
                    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                        <div>
                            <h2 className="font-serif text-3xl font-semibold leading-tight text-white">Proudly Serving Our Community</h2>
                            <p className="mt-4 leading-7 text-white/62">
                                We're honored to cater family gatherings, community celebrations, and events across Murphy, Plano, and North Texas.
                            </p>
                        </div>
                        <div className="grid gap-4">
                            {cateringLocations.map((location) => (
                                <article key={location.slug} className="border border-[#B88A3D]/25 bg-[#101010] p-6">
                                    <h3 className="font-serif text-2xl font-semibold text-[#D4A84B]">
                                        <Link to={`/locations/${location.slug}`} className="hover:text-white">
                                            {location.displayName} – {location.shortName}
                                        </Link>
                                    </h3>
                                    <p className="mt-3 flex items-start gap-2 text-white/72">
                                        <MapPin size={18} className="mt-0.5 shrink-0 text-[#D4A84B]" aria-hidden="true" />
                                        {location.address.full}
                                    </p>
                                    <div className="mt-5 flex flex-wrap gap-3">
                                        {location.phone && (
                                            <a href={toTelHref(location.phone)} className="inline-flex items-center gap-2 border border-[#B88A3D]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white">
                                                <Phone size={15} aria-hidden="true" /> {location.phone}
                                            </a>
                                        )}
                                        <a href={location.googleMapsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[#B88A3D]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white">
                                            <Navigation size={15} aria-hidden="true" /> Directions
                                        </a>
                                        {location.socialLinks?.facebook && (
                                            <a href={location.socialLinks.facebook} target="_blank" rel="noreferrer" aria-label={`${location.displayName} – ${location.shortName} on Facebook`} className="inline-flex items-center gap-2 border border-[#B88A3D]/35 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white">
                                                <Facebook size={15} aria-hidden="true" /> Facebook
                                            </a>
                                        )}
                                    </div>
                                </article>
                            ))}
                            {upcomingLocations.map((location) => (
                                <p key={location.slug} className="flex items-start gap-2 text-sm leading-6 text-white/58">
                                    <Clock size={16} className="mt-1 shrink-0 text-[#D4A84B]" aria-hidden="true" />
                                    <span>
                                        Coming next:{' '}
                                        <Link to={`/locations/${location.slug}`} className="font-semibold text-white/80 underline decoration-[#B88A3D]/40 underline-offset-4 hover:text-white">
                                            {location.displayName} – {location.shortName}
                                        </Link>
                                        {location.openingText && <> · {location.openingText}</>}
                                    </span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Catering;
