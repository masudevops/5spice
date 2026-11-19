// Dish photos and videos for the marketing TVs (4–6). Kept apart from the
// menu (names, descriptions, prices) so dishes can later come from Toast POS
// while your team keeps managing media here. A promo slide about a dish uses
// its entry here unless the slide sets its own `media` (promotions.js).
//
// Key: a dish id from menus/shared-items.js.
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

// PLACEHOLDERS: animated 5Spice-color GIFs (no food) until real footage
// arrives. Replace each line with the dish's own media, then delete the
// placeholder-*.gif files once none are used.
const placeholder = (color) => ({ type: 'gif', src: `/tv-media/placeholder-${color}.gif` });

export const TV_MEDIA = {
    'beef-kachchi': placeholder('gold'),
    'chicken-korma': placeholder('orange'),
    samusa: placeholder('green'),
    firni: placeholder('gold'),
};

// PREVIEW ONLY: free photos (public domain / CC0, no credit required) from
// Wikimedia Commons, so the layout can be judged with real food on the TVs.
// They are NOT 5Spice's dishes, so they show only on previews (this computer,
// PR preview links, or a TV address ending in ?preview=1), never on the live
// TVs. Delete them once 5Spice's own photos are in TV_MEDIA.
// Sources (commons.wikimedia.org/wiki/File:…):
//   kacchi-biriyani.jpg  Hyderabadi_Kachay_Gosht_Ki_Biryani.JPG (CC0)
//   chicken-korma.jpg    Chicken_Korma.JPG (CC0)
//   samusa.jpg           Samosa_fried.JPG (public domain)
//   firni.jpg            Firni.JPG (CC0)
const previewPhoto = (file) => ({ type: 'image', src: `/tv-media/preview/${file}` });

export const PREVIEW_MEDIA = {
    'beef-kachchi': previewPhoto('kacchi-biriyani.jpg'),
    'chicken-korma': previewPhoto('chicken-korma.jpg'),
    samusa: previewPhoto('samusa.jpg'),
    firni: previewPhoto('firni.jpg'),
};
