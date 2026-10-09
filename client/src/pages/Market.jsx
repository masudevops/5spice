import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Candy, Fish, Leaf, PackageSearch, Snowflake, ShoppingBasket, Store, Utensils } from 'lucide-react';
import { MARKET_DEPARTMENTS } from '../config/site';
import { useSelectedLocation } from '../hooks/useSelectedLocation';

const icons = [ShoppingBasket, Fish, Leaf, PackageSearch, Snowflake, Candy];

const Market = () => {
    const { selectedLocation, selectLocation, visibleLocations } = useSelectedLocation();
    const marketLocations = visibleLocations.filter((location) => location.flags.hasMarket);
    const showNoMarketState = selectedLocation && !selectedLocation.flags.hasMarket;

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-[#F0EAD6]">
            <section className="relative overflow-hidden px-5 py-16 sm:px-8 lg:px-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(45,106,63,0.18),transparent_34%),linear-gradient(135deg,#0E0E0E,#161616)]" />
                <div className="relative mx-auto max-w-7xl">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#D4A84B]">Premium Halal Market</p>
                    <h1 className="mt-5 max-w-4xl font-serif text-5xl font-bold leading-tight text-white md:text-6xl">Department highlights for your family grocery run.</h1>
                    <p className="mt-5 max-w-2xl text-lg leading-8 text-white/68">
                        Discover fresh fish, premium zabiha halal meat, farm-fresh produce, pantry staples, and specialty groceries chosen for everyday family cooking.
                    </p>
                </div>
            </section>

            {showNoMarketState ? (
                <section className="px-5 pb-20 sm:px-8 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="border border-[#B88A3D]/25 bg-[#141414] p-7 md:p-10">
                            <Store className="mb-5 text-[#D4A84B]" size={32} strokeWidth={1.35} />
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#D4A84B]/80">Kitchen Only At This Location</p>
                            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white">
                                {selectedLocation.displayName} serves our kitchen menu, not the grocery market.
                            </h2>
                            <p className="mt-4 max-w-3xl leading-7 text-white/62">
                                {selectedLocation.shortName} is a kitchen-only location, so halal meat, fresh fish, produce, and pantry
                                items aren't available here. {marketLocations.length > 0 && (
                                    <>
                                        For the full grocery market, visit{' '}
                                        {marketLocations.map((location, index) => (
                                            <React.Fragment key={location.slug}>
                                                {index > 0 && ' or '}
                                                <Link to={`/locations/${location.slug}`} className="font-semibold text-[#D4A84B] hover:text-white">
                                                    {location.displayName}
                                                </Link>
                                            </React.Fragment>
                                        ))}
                                        .
                                    </>
                                )}
                            </p>
                            <div className="mt-7 flex flex-wrap gap-3">
                                {marketLocations.map((location) => (
                                    <button
                                        key={location.slug}
                                        type="button"
                                        onClick={() => selectLocation(location.slug)}
                                        className="inline-flex items-center gap-2 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]"
                                    >
                                        Switch to {location.shortName} <ArrowRight size={17} />
                                    </button>
                                ))}
                                <Link
                                    to="/kitchen"
                                    className="inline-flex items-center gap-2 border border-[#B88A3D]/45 px-6 py-4 font-bold uppercase tracking-[0.16em] text-[#D4A84B] transition-colors hover:border-[#D4A84B] hover:text-white"
                                >
                                    <Utensils size={17} /> View {selectedLocation.shortName} Menu
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="px-5 pb-20 sm:px-8 lg:px-12">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {MARKET_DEPARTMENTS.map((department, index) => {
                                const Icon = icons[index];
                                return (
                                    <article key={department.title} className="border border-[#B88A3D]/25 bg-[#141414] p-7">
                                        <Icon className="mb-5 text-[#D4A84B]" size={31} strokeWidth={1.35} />
                                        <h2 className="font-serif text-3xl font-semibold leading-tight text-white">{department.title}</h2>
                                        <p className="mt-4 leading-7 text-white/62">{department.text}</p>
                                        <div className="mt-6 border-t border-white/10 pt-5">
                                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D4A84B]/75">What you'll find</p>
                                            <ul className="mt-3 space-y-2 text-sm text-white/60">
                                                {department.items.map((item) => (
                                                    <li key={item} className="flex gap-2">
                                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1CA433]" />
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>

                        <div className="mt-8 border border-[#B88A3D]/25 bg-[#101010] p-7 md:p-10">
                            <h2 className="font-serif text-3xl font-semibold text-[#D4A84B]">Shop online after launch.</h2>
                            <p className="mt-4 max-w-3xl leading-7 text-white/62">
                                After opening, grocery shopping options will be available through our verified delivery partners so you can plan your visit or shop from nearby.
                            </p>
                            <Link to="/pickup" className="mt-7 inline-flex items-center gap-2 bg-[#1CA433] px-6 py-4 font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#168C2B]">
                                View Ordering Options <ArrowRight size={17} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Market;
