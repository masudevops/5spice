// Photos and videos for the in-store TV menu boards. Kept apart from the menu
// (names, descriptions, prices) so dishes can later come from Toast POS while
// your team keeps managing media here.
//
// Key: a dish id from menus/shared-items.js, or the `mediaId` a screen column
// asks for (to show different footage of the same dish on another screen).
//   type      'video' (MP4), 'gif', or 'image' (JPG, WebP, PNG)
//   src       a file in client/public/tv-media/, e.g. '/tv-media/kacchi.mp4'
//   fallback  optional photo, shown if the video can't play and as the
//             video's first frame while it loads
//
// A dish with no entry, or whose files fail to load, shows the 5Spice
// placeholder. Use real 5Spice footage and photos only (no stock or
// AI-generated media). When you replace a file, give it a new name
// (kacchi-2.mp4) so the TVs pick it up right away.
// Video size and format: see docs/TV-MENU-BOARDS.md.
// Examples:
//   'beef-kachchi': { type: 'video', src: '/tv-media/kacchi.mp4', fallback: '/tv-media/kacchi.jpg' },
//   'chicken-roast': { type: 'image', src: '/tv-media/chicken-roast.webp' },
//   'fuchka': { type: 'gif', src: '/tv-media/fuchka.gif' },

// PLACEHOLDERS: animated 5Spice-color GIFs (no food) so the boards show
// motion until real footage arrives. Replace each line with the dish's own
// media, then delete the placeholder-*.gif files once none are used.
const placeholder = (color) => ({ type: 'gif', src: `/tv-media/placeholder-${color}.gif` });

export const TV_MEDIA = {
    // TV 1
    'beef-kachchi': placeholder('gold'),
    'chicken-roast': placeholder('orange'),
    fuchka: placeholder('green'),
    // TV 2
    'mutton-kachchi': placeholder('gold'),
    'mutton-bhuna': placeholder('orange'),
    'beef-tikka-kebab': placeholder('green'),
    // TV 3
    'paratha-roti': placeholder('gold'),
    'bhuna-khichuri': placeholder('orange'),
    firni: placeholder('green'),
};
