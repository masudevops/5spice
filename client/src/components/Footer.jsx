import { Link } from 'react-router-dom';
import { Facebook, HandHeart, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { CATERING_EMAIL, LOGOS, SOCIAL_LINKS } from '../config/site';
import { anyVisibleLocationHasFlag, getLocationLabel, getVisibleLocations } from '../data/locations';
import { toTelHref } from '../utils/phone';

// Labels match the main navigation so pages are named the same everywhere.
const buildLinkGroups = () => [
    {
        title: 'Explore',
        links: [
            ['Home', '/'],
            ...(anyVisibleLocationHasFlag('hasMarket') ? [['Market', '/market']] : []),
            ['Kitchen', '/kitchen'],
            ['Locations', '/locations'],
            ...(anyVisibleLocationHasFlag('hasWeeklyDeals') ? [['Weekly Deals', '/sales']] : []),
        ],
    },
    {
        title: 'Services',
        links: [
            ['Catering', '/catering'],
            ['Order Online', '/pickup'],
            ['About', '/about'],
            ['Contact', '/contact'],
        ],
    },
];

const Footer = () => {
    const visibleLocations = getVisibleLocations();

    return (
        <footer className="border-t border-brand-gold-deep/25 bg-ink-950 pb-24 pt-14 text-brand-cream md:pb-12">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mb-12 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
                    <div>
                        <img
                            src={LOGOS.wide}
                            alt="5Spice Market & Kitchen"
                            className="mb-6 h-16 w-auto object-contain"
                        />
                        <p className="max-w-sm text-sm leading-7 text-white/62">
                            Five spices. One home. Authentic halal Bangladeshi cuisine in Murphy, and a premium halal market and restaurant coming to Plano.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="5Spice Market on Facebook" className="flex h-11 w-11 items-center justify-center border border-brand-gold-deep/30 text-white/75 transition-colors hover:border-brand-gold hover:text-brand-gold">
                                <Facebook size={19} />
                            </a>
                            <a href={SOCIAL_LINKS.instagramUrl} target="_blank" rel="noreferrer" aria-label="5Spice Market on Instagram" className="flex h-11 w-11 items-center justify-center border border-brand-gold-deep/30 text-white/75 transition-colors hover:border-brand-gold hover:text-brand-gold">
                                <Instagram size={19} />
                            </a>
                            <span className="text-sm text-white/45">{SOCIAL_LINKS.instagramHandle}</span>
                        </div>
                    </div>

                    {buildLinkGroups().map((group) => (
                        <div key={group.title}>
                            <h2 className="mb-5 font-serif text-xl font-semibold text-brand-gold">{group.title}</h2>
                            <ul className="space-y-3 text-sm text-white/58">
                                {group.links.map(([label, href]) => (
                                    <li key={href}>
                                        <Link to={href} className="transition-colors hover:text-white">{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div>
                        <h2 className="mb-5 font-serif text-xl font-semibold text-brand-gold">Visit</h2>
                        <ul className="space-y-5 text-sm text-white/62">
                            {visibleLocations.map((loc) => (
                                <li key={loc.slug}>
                                    <Link to={`/locations/${loc.slug}`} className="font-semibold text-white/85 transition-colors hover:text-white">
                                        {getLocationLabel(loc)}
                                    </Link>
                                    {loc.statusLabel && (
                                        <span className={`mt-1 block text-xs font-bold uppercase tracking-[0.14em] ${loc.status === 'open' ? 'text-brand-green' : 'text-brand-gold'}`}>
                                            {loc.openingText}
                                        </span>
                                    )}
                                    <a href={loc.googleMapsUrl} target="_blank" rel="noreferrer" className="mt-2 flex gap-3 transition-colors hover:text-white">
                                        <MapPin size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                                        {loc.address.full}
                                    </a>
                                    {loc.phone && (
                                        <a href={toTelHref(loc.phone)} className="mt-2 flex gap-3 transition-colors hover:text-white">
                                            <Phone size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                                            {loc.phone}
                                        </a>
                                    )}
                                </li>
                            ))}
                            <li className="flex gap-3">
                                <Mail size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                                <a href={`mailto:${SOCIAL_LINKS.email}`} className="transition-colors hover:text-white">{SOCIAL_LINKS.email}</a>
                            </li>
                            <li className="flex gap-3">
                                <HandHeart size={18} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden="true" />
                                <a href={`mailto:${CATERING_EMAIL}`} className="transition-colors hover:text-white">{CATERING_EMAIL}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-6 text-center text-xs text-white/38">
                    <p>&copy; {new Date().getFullYear()} 5Spice Market & Kitchen. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
