import React from 'react';
import {
    CalendarDays,
    Facebook,
    Globe2,
    Instagram,
    Mail,
    MapPin,
    Navigation,
    Phone,
    ShoppingBasket,
    Utensils,
    Users,
} from 'lucide-react';
import { CATERING_EMAIL, LOGOS, OFFERINGS, SOCIAL_LINKS } from '../config/site';
import { getLocationLabel, getOpenLocations } from '../data/locations';
import ServiceStatusList from './ServiceStatusList';
import { toTelHref } from '../utils/phone';

const featureIcons = [ShoppingBasket, Utensils, Users];

const featureAccents = [
    {
        label: 'Abstract market freshness accent',
    },
    {
        label: 'Abstract warm kitchen accent',
    },
    {
        label: 'Abstract DFW community accent',
    },
];

const spiceDots = [
    '#8B1A1A',
    'rgb(var(--color-gold-deep))',
    '#1D1D2E',
    'rgb(var(--color-orange))',
    'rgb(var(--color-forest))',
];

const focusClass = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold';

const cateringMailto = `mailto:${CATERING_EMAIL}?subject=${encodeURIComponent('5Spice Catering Quote Request')}`;

const ComingSoonLanding = () => {
    // Locations already operating (e.g. Murphy catering). Shown without links
    // to other pages, since coming-soon mode hides the site navigation.
    const openLocations = getOpenLocations();
    const instagramHref = SOCIAL_LINKS.instagramUrl || `https://instagram.com/${SOCIAL_LINKS.instagramHandle.replace('@', '')}`;

    return (
        <div className="relative min-h-svh overflow-x-hidden bg-ink-900 text-brand-cream">
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgb(var(--color-gold-deep)/0.14),transparent_34%),linear-gradient(135deg,rgb(var(--color-ink-900))_0%,rgb(var(--color-ink-750))_56%,rgb(var(--color-ink-900))_100%)]" />
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.055] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.75)_1px,transparent_0)] [background-size:22px_22px]" />

            <section className="relative z-10 min-h-[min(900px,100svh)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <div className="mx-auto flex w-full max-w-7xl flex-col">
                    <div className="flex justify-center">
                        <img
                            src={LOGOS.wide}
                            width={LOGOS.wideWidth}
                            height={LOGOS.wideHeight}
                            alt="5Spice Market & Kitchen official logo"
                            className="h-auto w-[210px] object-contain sm:w-[300px] lg:w-[350px]"
                        />
                    </div>

                    <div className="relative mx-auto mt-8 max-w-5xl lg:mt-10">
                        <div className="relative z-10 animate-fade-in-up text-center">
                            <h1 className="mx-auto max-w-5xl font-serif text-[2.95rem] font-bold leading-[0.98] text-white sm:text-6xl lg:text-[5rem] xl:text-[5.8rem]">
                                A New Home Is Coming to{' '}
                                <span className="block text-brand-gold sm:inline">
                                    Plano, Texas.
                                </span>
                            </h1>

                            <div className="mx-auto my-5 flex max-w-xs items-center justify-center gap-3">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-gold-deep/70 to-brand-gold-deep/25" />
                                <span className="h-1.5 w-1.5 rotate-45 border border-brand-gold/75" aria-hidden="true" />
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-brand-gold-deep/70 to-brand-gold-deep/25" />
                            </div>

                            <div className="space-y-1">
                                <p className="font-['Noto_Sans_Bengali'] text-2xl font-semibold tracking-wide text-brand-gold sm:text-3xl">
                                    পাঁচফোড়ন
                                </p>
                                <p className="text-sm uppercase tracking-[0.24em] text-brand-cream/60">
                                    Five spices. One home.
                                </p>
                            </div>

                            <div className="mt-5 flex items-center justify-center gap-2" aria-label="Five spice signature">
                                {spiceDots.map((color, index) => (
                                    <React.Fragment key={color}>
                                        <span
                                            className="h-2.5 w-2.5 rounded-full border border-white/15"
                                            style={{ backgroundColor: color }}
                                            aria-hidden="true"
                                        />
                                        {index < spiceDots.length - 1 && <span className="h-px w-5 bg-brand-gold-deep/35" aria-hidden="true" />}
                                    </React.Fragment>
                                ))}
                            </div>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                                Named after "পাঁচফোড়ন" — the traditional five-spice blend at the heart of every South Asian kitchen.
                            </p>

                            <p className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm font-medium text-white/82 sm:text-base">
                                <span>Premium Halal Grocery</span>
                                <span className="text-brand-forest" aria-hidden="true">•</span>
                                <span>Fresh Produce</span>
                                <span className="text-brand-forest" aria-hidden="true">•</span>
                                <span>Fresh Fish</span>
                                <span className="text-brand-forest" aria-hidden="true">•</span>
                                <span>Authentic Bangladeshi Restaurant</span>
                            </p>

                            <div className="mt-8 inline-flex items-center gap-4 border border-brand-gold-deep/45 bg-ink-700/70 px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                                <CalendarDays className="text-brand-gold" size={24} aria-hidden="true" />
                                <div className="text-left">
                                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-brand-gold-deep">Plano · Opening</p>
                                    <p className="font-serif text-2xl font-semibold leading-none text-white">Early 2027</p>
                                    <p className="mt-1 text-xs italic tracking-[0.16em] text-brand-gold">In Sha Allah</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {openLocations.length > 0 && (
                <section aria-labelledby="now-open-heading" className="relative z-10 px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
                    <div className="mx-auto max-w-4xl animate-fade-in-up">
                        <h2 id="now-open-heading" className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-brand-gold">
                            Already serving the community
                        </h2>
                        {openLocations.map((location) => (
                            <article key={location.slug} className="mt-5 border border-brand-gold-deep/40 bg-ink-850/86 px-6 py-8 text-center shadow-[0_26px_90px_rgba(0,0,0,0.25)] sm:px-10">
                                <h3 className="font-serif text-3xl font-semibold text-white sm:text-4xl">{getLocationLabel(location)}</h3>
                                {location.services && (
                                    <div className="mt-5 flex justify-center">
                                        <ServiceStatusList services={location.services} className="justify-center" />
                                    </div>
                                )}
                                <p className="mt-5 inline-flex items-start gap-2 text-white/75">
                                    <MapPin size={18} className="mt-1 shrink-0 text-brand-gold" aria-hidden="true" />
                                    {location.address.full}
                                </p>
                                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                    {location.services?.catering === 'open' && (
                                        <a href={cateringMailto} className={`inline-flex min-h-12 items-center gap-2 bg-brand-green px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-ink-900 transition-colors hover:bg-brand-green-light ${focusClass}`}>
                                            <Mail size={18} aria-hidden="true" /> Request Catering
                                        </a>
                                    )}
                                    {location.phone && (
                                        <a href={toTelHref(location.phone)} className={`inline-flex min-h-12 items-center gap-2 border border-brand-gold-deep/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-brand-gold hover:text-brand-gold ${focusClass}`}>
                                            <Phone size={18} aria-hidden="true" /> {location.phone}
                                        </a>
                                    )}
                                    <a href={location.googleMapsUrl} target="_blank" rel="noreferrer" className={`inline-flex min-h-12 items-center gap-2 border border-brand-gold-deep/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-brand-gold hover:text-brand-gold ${focusClass}`}>
                                        <Navigation size={18} aria-hidden="true" /> Directions
                                    </a>
                                </div>
                                <p className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-white/55">
                                    {location.services?.catering === 'open' && (
                                        <span>
                                            Catering requests: <a href={`mailto:${CATERING_EMAIL}`} className={`text-brand-gold underline decoration-brand-gold-deep/40 underline-offset-4 hover:text-white ${focusClass}`}>{CATERING_EMAIL}</a>
                                        </span>
                                    )}
                                    {location.socialLinks?.facebook && (
                                        <a href={location.socialLinks.facebook} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1.5 text-brand-gold underline decoration-brand-gold-deep/40 underline-offset-4 hover:text-white ${focusClass}`}>
                                            <Facebook size={15} aria-hidden="true" /> {location.shortName} on Facebook
                                        </a>
                                    )}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            <section aria-labelledby="coming-soon-offerings" className="relative z-10 px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
                <div className="mx-auto max-w-7xl">
                    <h2 id="coming-soon-offerings" className="sr-only">5Spice Market and Kitchen offerings</h2>
                    <div className="grid animate-fade-in-up gap-4 md:grid-cols-3 lg:gap-5">
                        {OFFERINGS.map((offering, index) => {
                            const Icon = featureIcons[index];
                            const accent = featureAccents[index];

                            return (
                                <article
                                    key={offering.title}
                                    className="group flex min-h-[23rem] flex-col overflow-hidden border border-brand-gold-deep/35 bg-ink-700/86 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-colors duration-300 hover:border-brand-gold/60"
                                >
                                    <div className="flex flex-1 flex-col items-center px-6 py-8 text-center sm:px-8 md:px-5 lg:px-8">
                                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-brand-gold-deep/45 text-brand-gold">
                                            <Icon size={29} strokeWidth={1.35} aria-hidden="true" />
                                        </div>
                                        <h3 className="max-w-[14rem] font-serif text-3xl font-semibold leading-tight text-white md:text-[1.72rem] lg:text-4xl">
                                            {offering.title}
                                        </h3>
                                        <div className="my-5 h-0.5 w-10 bg-brand-forest" />
                                        <p className="max-w-[21rem] text-sm leading-7 text-white/74 sm:text-base md:text-sm lg:text-base">
                                            {offering.text}
                                        </p>
                                    </div>
                                    <div
                                        className="relative h-24 overflow-hidden"
                                        role="img"
                                        aria-label={accent.label}
                                    >
                                        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_25%_70%,rgb(var(--color-gold)/0.62),transparent_18%),radial-gradient(circle_at_68%_42%,rgb(var(--color-forest)/0.52),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_54%)]" />
                                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section aria-labelledby="follow-details" className="relative z-10 px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
                <div className="mx-auto max-w-7xl animate-fade-in-up border border-brand-gold-deep/40 bg-ink-850/82 px-6 py-8 text-center shadow-[0_26px_90px_rgba(0,0,0,0.25)] sm:px-10">
                    <h2 id="follow-details" className="font-serif text-3xl font-semibold text-brand-gold sm:text-4xl">
                        Follow our journey to opening day.
                    </h2>
                    <p className="mt-4 text-base text-white/75">
                        Stay connected as we bring 5Spice Market & Kitchen to Plano.
                    </p>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <a
                            href={SOCIAL_LINKS.facebook}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Follow 5Spice Market on Facebook"
                            className={`inline-flex min-h-12 items-center gap-2 border border-brand-gold-deep/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-brand-gold hover:text-brand-gold ${focusClass}`}
                        >
                            <Facebook size={18} aria-hidden="true" />
                            Facebook
                        </a>
                        <a
                            href={instagramHref}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Follow 5Spice Market on Instagram"
                            className={`inline-flex min-h-12 items-center gap-2 border border-brand-gold-deep/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-brand-gold hover:text-brand-gold ${focusClass}`}
                        >
                            <Instagram size={18} aria-hidden="true" />
                            Instagram
                        </a>
                    </div>

                    <address className="mt-7 flex flex-col items-center justify-center gap-3 text-sm not-italic text-brand-gold sm:flex-row sm:gap-6 sm:text-base">
                        <a href="https://5spicemarket.com" className={`inline-flex items-center gap-2 transition-colors hover:text-white ${focusClass}`}>
                            <Globe2 size={18} aria-hidden="true" />
                            5spicemarket.com
                        </a>
                        <span className="hidden h-5 w-px bg-brand-gold-deep/40 sm:block" aria-hidden="true" />
                        <a href={`mailto:${SOCIAL_LINKS.email}`} className={`inline-flex items-center gap-2 transition-colors hover:text-white ${focusClass}`}>
                            <Mail size={18} aria-hidden="true" />
                            {SOCIAL_LINKS.email}
                        </a>
                    </address>
                </div>
            </section>
        </div>
    );
};

export default ComingSoonLanding;
