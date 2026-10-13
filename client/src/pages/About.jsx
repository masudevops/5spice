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
        description: 'The story behind 5Spice, named after পাঁচফোড়ন (panch phoron), the Bengali five-spice blend. Authentic halal Bangladeshi cuisine in Murphy, with a halal market coming to Plano.',
    });

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,138,61,0.14),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Our Story</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">
                        Five spices. One home for groceries, food, and community.
                    </h1>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-white/68">
                        5Spice brings authentic Bangladeshi cooking and premium halal groceries to North Texas. Our Murphy kitchen is now serving, and our Plano market and restaurant will open in early 2027, In Sha Allah.
                    </p>
                    <div className="mt-8 max-w-3xl border border-[#B88A3D]/25 bg-[#101010]/78 p-7">
                        <p className="font-bengali text-4xl font-semibold text-[#D4A84B]">পাঁচফোড়ন</p>
                        <p className="mt-3 font-serif text-3xl font-semibold text-white">Five spices. One home.</p>
                        <p className="mt-4 leading-7 text-white/64">
                            Named after "পাঁচফোড়ন" — the traditional five-spice blend at the heart of every South Asian kitchen.
                        </p>
                    </div>
                </div>
            </section>

            <section className="px-5 pb-20 sm:px-8 lg:px-12">
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
