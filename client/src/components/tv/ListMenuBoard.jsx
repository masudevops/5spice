import { useLayoutEffect, useRef } from 'react';
import Price from './Price';

// Text size adapts to how many dishes a TV has: it starts as large as
// MAX_SCALE allows and steps down only until everything fits, never below
// MIN_SCALE. Scale 1 = dish names 46px (about 0.8 in tall on a 55" TV),
// prices 42px, headings 44px, descriptions 28px; spacing grows with it.
// A short menu gets bigger text, never a crowded one.
const BASE_NAME_PX = 46;
const MIN_SCALE = 1;
const MAX_SCALE = 1.5;
const SCALE_STEP = 0.05;

const fitsIn = (column) => {
    const last = column.lastElementChild;
    return !last || last.offsetTop + last.offsetHeight <= column.clientHeight;
};

// At the smallest size, anything that still doesn't fit is left out whole
// (never cut in half), and a heading left with no dishes under it too.
const hideOverflow = (column) => {
    const blocks = [...column.children];
    for (const block of blocks) {
        if (block.offsetTop + block.offsetHeight > column.clientHeight) block.hidden = true;
    }
    blocks.forEach((block, index) => {
        const next = blocks.slice(index + 1).find((other) => !other.hidden);
        if (block.dataset.heading !== undefined && (!next || next.dataset.heading !== undefined)) block.hidden = true;
    });
};

// One column: section headings with their dishes. Sizes are in em, so they
// all follow the board's font size.
const MenuColumn = ({ sections }) => (
    <div data-column className="relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {sections.flatMap((section, index) => [
            <h2
                key={`heading-${section.title}`}
                data-heading
                className={`flex items-center gap-5 pb-[0.18em] font-serif text-[0.957em] font-semibold leading-tight text-brand-gold after:h-px after:flex-1 after:bg-brand-gold-deep/45 ${index > 0 ? 'mt-[0.45em]' : ''}`}
            >
                {section.title}
            </h2>,
            ...section.items.map((item) => (
                <div key={item.id} className="py-[0.13em]">
                    <div className="flex items-baseline justify-between gap-8">
                        <p className="font-serif text-[1em] font-bold leading-[1.1] text-white">{item.name}</p>
                        <Price price={item.price} className="text-[0.913em]" />
                    </div>
                    {item.showDescription && item.description && (
                        <p className="mt-[0.1em] text-[0.609em] leading-snug text-brand-cream/86">{item.description}</p>
                    )}
                </div>
            )),
        ])}
    </div>
);

// Text-only menu board: two columns of large type with prices lined up on
// the right, no media, so it reads from across the room.
const ListMenuBoard = ({ screen }) => {
    const boardRef = useRef(null);

    useLayoutEffect(() => {
        const fit = () => {
            const board = boardRef.current;
            if (!board) return;
            const columns = [...board.querySelectorAll('[data-column]')];
            for (const column of columns) for (const block of column.children) block.hidden = false;
            const allFit = () => columns.every(fitsIn);
            let scale = MAX_SCALE;
            board.style.fontSize = `${BASE_NAME_PX * scale}px`;
            while (scale > MIN_SCALE && !allFit()) {
                scale = Math.max(MIN_SCALE, Math.round((scale - SCALE_STEP) * 100) / 100);
                board.style.fontSize = `${BASE_NAME_PX * scale}px`;
            }
            board.dataset.scale = scale;
            if (!allFit()) columns.forEach(hideOverflow);
        };
        fit();
        const observer = new ResizeObserver(fit);
        observer.observe(boardRef.current);
        document.fonts?.ready.then(fit);
        return () => observer.disconnect();
    }, [screen]);

    return (
        <main ref={boardRef} className="flex min-h-0 flex-1 gap-16 px-16 pb-5 pt-6">
            {screen.columns.map((sections, index) => [
                index > 0 && <span key={`rule-${index}`} className="w-px shrink-0 bg-brand-gold-deep/30" aria-hidden="true" />,
                <MenuColumn key={index} sections={sections} />,
            ])}
        </main>
    );
};

export default ListMenuBoard;
