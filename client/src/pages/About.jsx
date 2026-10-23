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
        <div className="min-h-screen bg-ink-900 text-brand-cream">
            {/* Hero and story share one background so they read as a single continuous section. */}
            <div className="relative overflow-hidden border-b border-brand-gold-deep/20 bg-ink-950">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_0%,rgb(var(--color-gold-deep)/0.16),transparent),radial-gradient(ellipse_60%_35%_at_50%_42%,rgb(var(--color-gold)/0.07),transparent)]" />
                <section className="relative px-5 pb-6 pt-[3.25rem] sm:px-8 lg:px-12">
                    <div className="relative mx-auto max-w-3xl text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-brand-gold">Our Story</p>
                        <h1 className="mt-5 font-serif text-[2.6rem] font-bold leading-tight text-white sm:text-5xl md:text-6xl">
                            {/* One sentence per line; on narrow phones a sentence may wrap within itself. */}
                            <span className="block text-balance sm:whitespace-nowrap">More Than Food.</span>
                            <span className="block text-balance sm:whitespace-nowrap">A Feeling of Home.</span>
                        </h1>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/68">
                            Rooted in Bangladeshi traditions, 5Spice brings authentic flavors, premium halal groceries, and a sense of community to North Texas.
                        </p>
                        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/68">
                            Our Murphy kitchen is now accepting catering orders, while our Plano market and restaurant are preparing to welcome you in early 2027, In Sha Allah.
                        </p>
                    </div>
                </section>

                <section aria-labelledby="our-story-heading" className="relative px-5 pb-16 pt-14 sm:px-8 md:pb-[5.75rem] md:pt-20 lg:px-12">
                    <div className="relative mx-auto max-w-2xl text-center">
                        {/* Five dots, one for each spice in the blend. */}
                        <div className="flex items-center justify-center gap-2.5" aria-hidden="true">
                            {['bg-brand-gold', 'bg-brand-green', 'bg-brand-gold', 'bg-brand-green', 'bg-brand-gold'].map((color, index) => (
                                <span key={index} className={`h-1.5 w-1.5 rounded-full ${color}`} />
                            ))}
                        </div>

                        <h2 id="our-story-heading" className="mt-8">
                            <span lang="bn" className="block font-bengali text-5xl font-semibold leading-[1.35] text-brand-gold sm:text-6xl md:text-7xl">
                                পাঁচফোড়ন
                            </span>
                            <span className="mt-3 block font-serif text-2xl font-semibold text-white sm:text-3xl">
                                The Aroma of Home
                            </span>
                        </h2>

                        <div className="mx-auto mt-10 h-px w-16 bg-brand-gold-deep/50" aria-hidden="true" />

                        <div className="mt-10 space-y-6 text-pretty text-left text-lg leading-[1.9] text-white/72 sm:text-center">
                            <p className="text-balance font-serif text-2xl italic leading-snug text-white sm:text-[1.75rem]">
                                Some memories begin with a familiar aroma.
                            </p>
                            <p>
                                The gentle crackle of <span lang="bn" className="font-bengali text-brand-gold">পাঁচফোড়ন</span> in a warm pan.
                                The aroma of <span lang="bn" className="font-bengali text-brand-gold">মায়ের রান্না</span> drifting through the house as everyone gathers around the table.
                            </p>
                            <p>For many of us, these little moments are what make a house feel like home.</p>
                            <p>
                                Inspired by <span lang="bn" className="font-bengali text-brand-gold">পাঁচফোড়ন</span>, the traditional five-spice blend of Bengali cooking,
                                5Spice was born from a simple idea: to bring the flavors, warmth, and traditions of home closer to our community.
                            </p>
                            <p>
                                From the familiar ingredients that bring our favorite recipes to life to the meals prepared with care in our kitchen,
                                5Spice is our way of keeping those traditions alive and sharing them with the next generation.
                            </p>
                        </div>

                        <div className="mt-14 flex items-center justify-center gap-4" aria-hidden="true">
                            <span className="h-px w-10 bg-brand-gold-deep/50 sm:w-16" />
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                            <span className="h-px w-10 bg-brand-gold-deep/50 sm:w-16" />
                        </div>
                        <p className="mt-6 text-balance font-serif text-3xl font-semibold leading-tight text-brand-gold sm:text-4xl">
                            Five spices. Countless memories. One home.
                        </p>
                    </div>
                </section>
            </div>

            <section className="px-5 py-20 sm:px-8 lg:px-12">
                <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
                    {values.map((value) => {
                        const Icon = value.icon;
                        return (
                            <article key={value.title} className="border border-brand-gold-deep/25 bg-ink-800 p-7">
                                <Icon className="mb-5 text-brand-gold" size={30} strokeWidth={1.4} aria-hidden="true" />
                                <h2 className="font-serif text-2xl font-semibold text-white">{value.title}</h2>
                                <p className="mt-4 leading-7 text-white/62">{value.text}</p>
                            </article>
                        );
                    })}
                </div>
                <div className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-3">
                    <Link to="/locations" className="inline-flex items-center gap-2 bg-brand-green px-6 py-4 font-bold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:bg-brand-green-light">
                        Our Locations <ArrowRight size={17} aria-hidden="true" />
                    </Link>
                    <Link to="/contact" className="inline-flex items-center gap-2 border border-brand-gold-deep/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-brand-gold transition-colors hover:border-brand-gold hover:text-white">
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default About;
