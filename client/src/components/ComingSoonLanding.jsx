import React from 'react';
import {
    CalendarDays,
    Facebook,
    Globe2,
    Instagram,
    Mail,
    ShoppingBasket,
    Utensils,
    Users,
} from 'lucide-react';
import { LOGOS, OFFERINGS, SOCIAL_LINKS } from '../config/site';

const featureIcons = [ShoppingBasket, Utensils, Users];

const featureAccents = [
    {
        gradient: 'from-brand-green/45 via-brand-green/10 to-transparent',
        label: 'Abstract market freshness accent',
    },
    {
        gradient: 'from-brand-orange/35 via-brand-gold/10 to-transparent',
        label: 'Abstract warm kitchen accent',
    },
    {
        gradient: 'from-brand-gold/35 via-brand-green/10 to-transparent',
        label: 'Abstract DFW community accent',
    },
];

const spiceDots = [
    '#8B1A1A',
    '#B88A3D',
    '#1D1D2E',
    '#D4500A',
    '#2D6A3F',
];

const focusClass = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A84B]';

const ComingSoonLanding = () => {
    const instagramHref = SOCIAL_LINKS.instagramUrl || `https://instagram.com/${SOCIAL_LINKS.instagramHandle.replace('@', '')}`;

    return (
        <main className="relative min-h-svh overflow-x-hidden bg-[#0E0E0E] text-[#F0EAD6]">
            <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E_0%,#161616_56%,#0E0E0E_100%)]" />
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.055] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.75)_1px,transparent_0)] [background-size:22px_22px]" />

            <section className="relative z-10 min-h-[min(900px,100svh)] px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
                <div className="mx-auto flex w-full max-w-7xl flex-col">
                    <div className="flex justify-center">
                        <img
                            src={LOGOS.wide}
                            alt="5Spice Market & Kitchen official logo"
                            className="h-auto w-[210px] object-contain sm:w-[300px] lg:w-[350px]"
                        />
                    </div>

                    <div className="relative mx-auto mt-8 max-w-5xl lg:mt-10">
                        <div className="relative z-10 animate-fade-in-up text-center">
                            <h1 className="mx-auto max-w-5xl font-serif text-[2.95rem] font-bold leading-[0.98] text-white sm:text-6xl lg:text-[5rem] xl:text-[5.8rem]">
                                A New Home Is Coming to{' '}
                                <span className="block text-[#D4A84B] sm:inline">
                                    Plano, Texas.
                                </span>
                            </h1>

                            <div className="mx-auto my-5 flex max-w-xs items-center justify-center gap-3">
                                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#B88A3D]/70 to-[#B88A3D]/25" />
                                <span className="h-1.5 w-1.5 rotate-45 border border-[#D4A84B]/75" aria-hidden="true" />
                                <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#B88A3D]/70 to-[#B88A3D]/25" />
                            </div>

                            <div className="space-y-1">
                                <p className="font-['Noto_Sans_Bengali'] text-2xl font-semibold tracking-wide text-[#D4A84B] sm:text-3xl">
                                    পাঁচফোড়ন
                                </p>
                                <p className="text-sm uppercase tracking-[0.24em] text-[#F0EAD6]/60">
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
                                        {index < spiceDots.length - 1 && <span className="h-px w-5 bg-[#B88A3D]/35" aria-hidden="true" />}
                                    </React.Fragment>
                                ))}
                            </div>

                            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                                Named after "পাঁচফোড়ন" — the traditional five-spice blend at the heart of every South Asian kitchen.
                            </p>

                            <p className="mt-5 flex flex-wrap justify-center gap-x-3 gap-y-2 text-sm font-medium text-white/82 sm:text-base">
                                <span>Premium Halal Grocery</span>
                                <span className="text-[#2D6A3F]" aria-hidden="true">•</span>
                                <span>Fresh Produce</span>
                                <span className="text-[#2D6A3F]" aria-hidden="true">•</span>
                                <span>Fresh Fish</span>
                                <span className="text-[#2D6A3F]" aria-hidden="true">•</span>
                                <span>Authentic Bangladeshi Restaurant</span>
                            </p>

                            <div className="mt-8 inline-flex items-center gap-4 border border-[#B88A3D]/45 bg-[#1A1A1A]/70 px-5 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-sm">
                                <CalendarDays className="text-[#D4A84B]" size={24} aria-hidden="true" />
                                <div className="text-left">
                                    <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#B88A3D]">Opening</p>
                                    <p className="font-serif text-2xl font-semibold leading-none text-white">Early 2027</p>
                                    <p className="mt-1 text-xs italic tracking-[0.16em] text-[#D4A84B]">In Sha Allah</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
                                    className="group flex min-h-[23rem] flex-col overflow-hidden border border-[#B88A3D]/35 bg-[#1A1A1A]/86 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-colors duration-300 hover:border-[#D4A84B]/60"
                                >
                                    <div className="flex flex-1 flex-col items-center px-6 py-8 text-center sm:px-8 md:px-5 lg:px-8">
                                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#B88A3D]/45 text-[#D4A84B]">
                                            <Icon size={29} strokeWidth={1.35} aria-hidden="true" />
                                        </div>
                                        <h3 className="max-w-[14rem] font-serif text-3xl font-semibold leading-tight text-white md:text-[1.72rem] lg:text-4xl">
                                            {offering.title}
                                        </h3>
                                        <div className="my-5 h-0.5 w-10 bg-[#2D6A3F]" />
                                        <p className="max-w-[21rem] text-sm leading-7 text-white/74 sm:text-base md:text-sm lg:text-base">
                                            {offering.text}
                                        </p>
                                    </div>
                                    <div
                                        className={`relative h-24 overflow-hidden bg-gradient-to-t ${accent.gradient}`}
                                        role="img"
                                        aria-label={accent.label}
                                    >
                                        <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle_at_25%_70%,rgba(212,168,75,0.62),transparent_18%),radial-gradient(circle_at_68%_42%,rgba(45,106,63,0.52),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_54%)]" />
                                        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#D4A84B]/50 to-transparent" />
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section aria-labelledby="follow-details" className="relative z-10 px-5 pb-12 sm:px-8 lg:px-12 lg:pb-16">
                <div className="mx-auto max-w-7xl animate-fade-in-up border border-[#B88A3D]/40 bg-[#101010]/82 px-6 py-8 text-center shadow-[0_26px_90px_rgba(0,0,0,0.25)] sm:px-10">
                    <h2 id="follow-details" className="font-serif text-3xl font-semibold text-[#D4A84B] sm:text-4xl">
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
                            className={`inline-flex min-h-12 items-center gap-2 border border-[#B88A3D]/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B] ${focusClass}`}
                        >
                            <Facebook size={18} aria-hidden="true" />
                            Facebook
                        </a>
                        <a
                            href={instagramHref}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Follow 5Spice Market on Instagram"
                            className={`inline-flex min-h-12 items-center gap-2 border border-[#B88A3D]/45 px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80 transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B] ${focusClass}`}
                        >
                            <Instagram size={18} aria-hidden="true" />
                            Instagram
                        </a>
                    </div>

                    <address className="mt-7 flex flex-col items-center justify-center gap-3 text-sm not-italic text-[#D4A84B] sm:flex-row sm:gap-6 sm:text-base">
                        <a href="https://5spicemarket.com" className={`inline-flex items-center gap-2 transition-colors hover:text-white ${focusClass}`}>
                            <Globe2 size={18} aria-hidden="true" />
                            5spicemarket.com
                        </a>
                        <span className="hidden h-5 w-px bg-[#B88A3D]/40 sm:block" aria-hidden="true" />
                        <a href={`mailto:${SOCIAL_LINKS.email}`} className={`inline-flex items-center gap-2 transition-colors hover:text-white ${focusClass}`}>
                            <Mail size={18} aria-hidden="true" />
                            {SOCIAL_LINKS.email}
                        </a>
                    </address>
                </div>
            </section>
        </main>
    );
};

export default ComingSoonLanding;
