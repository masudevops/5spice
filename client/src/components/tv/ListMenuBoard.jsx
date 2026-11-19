import { useLayoutEffect, useRef } from 'react';
import Price from './Price';

// One column of a text-only menu board: section headings with their dishes.
// Anything that doesn't fit is left out whole (never cut in half), and a
// heading left with no dishes under it is hidden too.
const MenuColumn = ({ sections }) => {
    const columnRef = useRef(null);

    useLayoutEffect(() => {
        const fit = () => {
            const column = columnRef.current;
            if (!column) return;
            const blocks = [...column.children];
            for (const block of blocks) block.hidden = false;
            for (const block of blocks) {
                if (block.offsetTop + block.offsetHeight > column.clientHeight) block.hidden = true;
            }
            blocks.forEach((block, index) => {
                const next = blocks.slice(index + 1).find((other) => !other.hidden);
                if (block.dataset.heading !== undefined && (!next || next.dataset.heading !== undefined)) block.hidden = true;
            });
        };
        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(columnRef.current);
        document.fonts?.ready.then(fit);
        return () => observer.disconnect();
    }, [sections]);

    return (
        <div ref={columnRef} className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {sections.flatMap((section, index) => [
                <h2
                    key={`heading-${section.title}`}
                    data-heading
                    className={`flex items-center gap-5 pb-2 font-serif text-[44px] font-semibold leading-tight text-brand-gold after:h-px after:flex-1 after:bg-brand-gold-deep/45 ${index > 0 ? 'mt-5' : ''}`}
                >
                    {section.title}
                </h2>,
                ...section.items.map((item) => (
                    <div key={item.id} className="py-[6px]">
                        <div className="flex items-baseline justify-between gap-8">
                            <p className="font-serif text-[46px] font-bold leading-[1.1] text-white">{item.name}</p>
                            <Price price={item.price} className="text-[42px]" />
                        </div>
                        {item.showDescription && item.description && (
                            <p className="mt-1 text-[28px] leading-snug text-brand-cream/86">{item.description}</p>
                        )}
                    </div>
                )),
            ])}
        </div>
    );
};

// Text-only menu board: two columns of large type with prices lined up on
// the right, no media, so it reads from 6–10 feet away.
const ListMenuBoard = ({ screen }) => (
    <main className="flex min-h-0 flex-1 gap-16 px-16 pb-5 pt-6">
        {screen.columns.map((sections, index) => [
            index > 0 && <span key={`rule-${index}`} className="w-px shrink-0 bg-brand-gold-deep/30" aria-hidden="true" />,
            <MenuColumn key={index} sections={sections} />,
        ])}
    </main>
);

export default ListMenuBoard;
