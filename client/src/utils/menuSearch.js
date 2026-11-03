// Forgiving dish search. Each word typed must match the start of a word in
// the dish name, description, or aliases ("bir" finds "Biryani", "lassi"
// doesn't find "classic").
//
// When a word matches nothing as typed, it may instead be off by a letter or
// two from a word in a dish name or alias, so "biriyani" finds "Biryani",
// "kacchi" finds "Kachchi", and "phirni" finds "Firni" (but "biriyani"
// doesn't find "Borhani"). Add other common spellings, like "tehri", to a
// dish's aliases.

const plain = (value) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

const words = (value) => plain(value).split(/[^a-z0-9]+/).filter(Boolean);

// Number of single-letter edits (add, remove, change) between two words.
const editDistance = (a, b) => {
    let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
    for (let i = 1; i <= a.length; i += 1) {
        const current = [i];
        for (let j = 1; j <= b.length; j += 1) {
            current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
        }
        previous = current;
    }
    return previous[b.length];
};

export const buildSearchIndex = (item) => {
    const nameWords = words([item.name, ...(item.aliases ?? [])].join(' '));
    return { nameWords, words: [...nameWords, ...words(item.description ?? '')] };
};

const plainMatch = (index, word) => index.words.some((w) => w.startsWith(word));

// Compares against the start of each name word, so a misspelled word still
// matches while it's being typed.
const closeMatch = (index, word) => {
    if (word.length < 4) return false;
    const allowed = Math.max(1, Math.floor(word.length / 4));
    return index.nameWords.some((w) =>
        [-1, 0, 1].some((extra) => editDistance(word, w.slice(0, word.length + extra)) <= allowed)
    );
};

// Returns a test for one dish's index. `indexes` is every dish on the menu,
// used to decide which words need the spelling-tolerant comparison.
export const createSearchMatcher = (indexes, query) => {
    const queryWords = words(query);
    if (queryWords.length === 0) return () => true;
    const fuzzy = new Set(queryWords.filter((word) => !indexes.some((index) => plainMatch(index, word))));
    return (index) => queryWords.every((word) => (fuzzy.has(word) ? closeMatch(index, word) : plainMatch(index, word)));
};
