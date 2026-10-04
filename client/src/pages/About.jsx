import React from 'react';
import { HandHeart, Leaf, ShieldCheck } from 'lucide-react';

const values = [
    { title: 'Zabiha halal care', text: 'A grocery and kitchen experience designed around trusted halal standards.', icon: ShieldCheck },
    { title: 'Fresh daily essentials', text: 'Produce, fish, meat, spices, rice, frozen goods, and pantry staples for family cooking.', icon: Leaf },
    { title: 'Community first', text: 'Built for Bangladeshi, Pakistani, Indian, Middle Eastern, and Greater DFW communities.', icon: HandHeart },
];

const About = () => {
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
                        5Spice Market & Kitchen was created to bring premium halal groceries, fresh ingredients, and authentic Bangladeshi cuisine together in Plano.
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
                                <Icon className="mb-5 text-[#D4A84B]" size={30} strokeWidth={1.4} />
                                <h2 className="font-serif text-2xl font-semibold text-white">{value.title}</h2>
                                <p className="mt-4 leading-7 text-white/62">{value.text}</p>
                            </article>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default About;
