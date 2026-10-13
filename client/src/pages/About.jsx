import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, HandHeart, Leaf, ShieldCheck } from 'lucide-react';
import { useDocumentHead } from '../hooks/useDocumentHead';

const values = [
    { title: 'Halal, always', text: 'Everything we serve and sell is halal, so every family can eat and shop with confidence.', icon: ShieldCheck },
    { title: 'Quality and freshness', text: 'Dishes made with care in our kitchen, and a market built around fresh meat, seafood, and produce.', icon: Leaf },
    { title: 'Community first', text: 'Rooted in Bangladeshi tradition and proud to welcome Pakistani, Indian, Middle Eastern, and all DFW families.', icon: HandHeart },
];

const About = () => {
    useDocumentHead({
        title: 'Our Story | 5Spice Market & Kitchen',
        description: 'The story behind 5Spice, named after পাঁচফোড়ন (panch phoron), the Bengali five-spice blend. Halal Bangladeshi catering in Murphy, with a halal market coming to Plano.',
    });

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-[3.25rem] sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Our Story</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-[2.6rem] font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                        {/* One sentence per line; on narrow phones a sentence may wrap within itself. */}
                        <span className="block text-balance sm:whitespace-nowrap">More Than Food.</span>
                        <span className="block text-balance sm:whitespace-nowrap">A Feeling of Home.</span>
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
                        5Spice brings authentic Bangladeshi cooking and premium halal groceries to North Texas. Our Murphy kitchen is taking catering orders now, with dine-in and take-out coming soon, and our Plano market and restaurant will open in early 2027, In Sha Allah.
                    </p>
                </div>
            </section>

            <section aria-labelledby="our-story-heading" className="relative overflow-hidden border-y border-[#B88A3D]/20 bg-[#0B0B0B] px-5 py-16 sm:px-8 md:py-[5.75rem] lg:px-12">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,168,75,0.12),transparent_55%)]" />
                <div className="relative mx-auto max-w-2xl text-center">
                    {/* Five dots, one for each spice in the blend. */}
                    <div className="flex items-center justify-center gap-2.5" aria-hidden="true">
                        {['#D4A84B', '#1CA433', '#D4A84B', '#1CA433', '#D4A84B'].map((color, index) => (
                            <span key={index} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: color }} />
                        ))}
                    </div>

                    <h2 id="our-story-heading" className="mt-8">
                        <span lang="bn" className="block font-bengali text-5xl font-semibold leading-[1.35] text-[#D4A84B] sm:text-6xl md:text-7xl">
                            পাঁচফোড়ন
                        </span>
                        <span className="mt-3 block font-serif text-2xl font-semibold text-white sm:text-3xl">
                            The Aroma of Home
                        </span>
                    </h2>

                    <div className="mx-auto mt-10 h-px w-16 bg-[#B88A3D]/50" aria-hidden="true" />

                    <div className="mt-10 space-y-6 text-pretty text-left text-lg leading-[1.9] text-white/72 sm:text-center">
                        <p className="text-balance font-serif text-2xl italic leading-snug text-white sm:text-[1.75rem]">
                            Some memories begin with a familiar aroma.
                        </p>
                        <p>
                            The gentle crackle of <span lang="bn" className="font-bengali text-[#D4A84B]">পাঁচফোড়ন</span> in a warm pan.
                            The comforting smell coming from the kitchen. The familiar aroma of <span lang="bn" className="font-bengali text-[#D4A84B]">মায়ের রান্না</span>,
                            filling the home as everyone gathers around the table.
                        </p>
                        <p>For many of us, these little moments are what make a house feel like home.</p>
                        <p>
                            Inspired by <span lang="bn" className="font-bengali text-[#D4A84B]">পাঁচফোড়ন</span>, the traditional five-spice blend of Bengali cooking,
                            5Spice was born from a simple idea: to bring the flavors, warmth, and traditions of home closer to our community.
                        </p>
                        <p>
                            From the familiar ingredients that bring our favorite recipes to life to the meals prepared with care in our kitchen,
                            5Spice is our way of keeping those traditions alive and sharing them with the next generation.
                        </p>
                    </div>

                    <div className="mt-14 flex items-center justify-center gap-4" aria-hidden="true">
                        <span className="h-px w-10 bg-[#B88A3D]/50 sm:w-16" />
                        <span className="h-1.5 w-1.5 rounded-full bg-[#1CA433]" />
                        <span className="h-px w-10 bg-[#B88A3D]/50 sm:w-16" />
                    </div>
                    <p className="mt-6 text-balance font-serif text-3xl font-semibold leading-tight text-[#D4A84B] sm:text-4xl">
                        Five spices. Countless memories. One home.
                    </p>
                </div>
            </section>

            <section className="px-5 py-20 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
                    {values.map((value) => {
                        const Icon = value.icon;
                        return (
                            <article key={value.title} className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                                <Icon className="mb-5 text-[#D4A84B]" size={30} strokeWidth={1.4} aria-hidden="true" />
                                <h2 className="font-serif text-2xl font-semibold text-white">{value.title}</h2>
                                <p className="mt-4 leading-7 text-white/62">{value.text}</p>
                            </article>
                        );
                    })}
                </div>
                <div className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-3">
                    <Link to="/locations" className="inline-flex items-center gap-2 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                        Our Locations <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                    <Link to="/contact" className="inline-flex items-center gap-2 border border-[#B88A3D]/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white">
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
