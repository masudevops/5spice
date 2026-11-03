// Forgiving dish search: "biryani" finds "Biriyani", "kacchi" finds
// "Kachchi", "pulao" finds "Polao". Each word typed must match the dish name,
// description, or aliases, either as plain text or by its consonant
// "skeleton" (vowels, h, and y dropped; z read as j, so "rejala" finds
// "Rezala"; doubled letters collapsed). Very short skeletons only match as
// plain text, so add common spellings like "tehri" to a dish's aliases.

const plain = (value) =>
    value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

const skeleton = (word) =>
    word
        .replace(/ph/g, 'f')
        .replace(/z/g, 'j')
        .replace(/[^a-z]/g, '')
        .replace(/[aeiouyh]/g, '')
        .replace(/(.)\1+/g, '$1');

const words = (value) => plain(value).split(/[^a-z0-9]+/).filter(Boolean);

export const buildSearchIndex = (item) => {
    const text = [item.name, item.description, ...(item.aliases ?? [])].filter(Boolean).join(' ');
    return {
        text: plain(text),
        skeletons: words(text).map(skeleton).filter(Boolean),
    };
};

export const matchesSearch = (index, query) => {
    const queryWords = words(query);
    return queryWords.every((word) => {
        if (index.text.includes(word)) return true;
        const wordSkeleton = skeleton(word);
        return wordSkeleton.length >= 3 && index.skeletons.some((s) => s.startsWith(wordSkeleton));
    });
};
