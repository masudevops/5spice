import { Link } from 'react-router-dom';
import { Facebook, Globe2, Instagram, Mail, MapPin } from 'lucide-react';
import { CONTACT, HOURS, LOGOS, SOCIAL_LINKS } from '../config/site';

const linkGroups = [
    {
        title: 'Explore',
        links: [
            ['Home', '/'],
            ['Market', '/market'],
            ['Restaurant', '/kitchen'],
            ['Weekly Specials', '/sales'],
        ],
    },
    {
        title: 'Services',
        links: [
            ['Catering', '/catering'],
            ['Order Online', '/pickup'],
            ['Our Story', '/about'],
            ['Contact', '/contact'],
        ],
    },
];

const Footer = () => {
    return (
        <footer className="border-t border-[#B88A3D]/25 bg-[#0B0B0B] pb-24 pt-14 text-[#F0EAD6] md:pb-12">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="mb-12 grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
                    <div>
                        <img
                            src={LOGOS.wide}
                            alt="5Spice Market & Kitchen"
                            className="mb-6 h-16 w-auto object-contain"
                        />
                        <p className="max-w-sm text-sm leading-7 text-white/62">
                            Five spices. One home. Premium halal groceries, fresh restaurant meals, and community favorites for Plano and the Greater DFW area.
                        </p>
                        <div className="mt-6 flex items-center gap-3">
                            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="5Spice Market on Facebook" className="flex h-11 w-11 items-center justify-center border border-[#B88A3D]/30 text-white/75 transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B]">
                                <Facebook size={19} />
                            </a>
                            <a href={SOCIAL_LINKS.instagramUrl} target="_blank" rel="noreferrer" aria-label="5Spice Market on Instagram" className="flex h-11 w-11 items-center justify-center border border-[#B88A3D]/30 text-white/75 transition-colors hover:border-[#D4A84B] hover:text-[#D4A84B]">
                                <Instagram size={19} />
                            </a>
                            <span className="text-sm text-white/45">{SOCIAL_LINKS.instagramHandle}</span>
                        </div>
                    </div>

                    {linkGroups.map((group) => (
                        <div key={group.title}>
                            <h2 className="mb-5 font-serif text-xl font-semibold text-[#D4A84B]">{group.title}</h2>
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
                        <h2 className="mb-5 font-serif text-xl font-semibold text-[#D4A84B]">Visit</h2>
                        <ul className="space-y-4 text-sm text-white/62">
                            <li className="flex gap-3">
                                <MapPin size={18} className="mt-0.5 shrink-0 text-[#D4A84B]" />
                                <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">{CONTACT.postalAddress}</a>
                            </li>
                            <li className="flex gap-3">
                                <Mail size={18} className="mt-0.5 shrink-0 text-[#D4A84B]" />
                                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">{CONTACT.email}</a>
                            </li>
                            <li className="flex gap-3">
                                <Globe2 size={18} className="mt-0.5 shrink-0 text-[#D4A84B]" />
                                <a href="https://5spicemarket.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-white">{CONTACT.website}</a>
                            </li>
                        </ul>
                        <div className="mt-6 border border-[#B88A3D]/20 p-4">
                            <p className="mb-3 text-xs uppercase tracking-[0.24em] text-[#D4A84B]">Hours</p>
                            <ul className="space-y-2 text-xs text-white/58">
                                {HOURS.map((item) => (
                                    <li key={item.days} className="flex justify-between gap-4">
                                        <span>{item.days}</span>
                                        <span className="text-white/78">{item.time}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
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
