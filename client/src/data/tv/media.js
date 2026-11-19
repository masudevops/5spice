// Photos and videos for the promo TVs (4–6), kept apart from the menu (names,
// descriptions, prices) and from the slide layouts, so dishes can later come
// from Toast POS while your team keeps managing media here.
//
// Every slide has a media key: its `mediaKey`, else its `dishId` (a dish id
// from menus/shared-items.js). A slide's own `media` (promotions.js) wins
// over both lists below.
//   type      'video' (MP4), 'image' (JPG, WebP), or 'gif'
//   src       a file in client/public/tv-media/, e.g. '/tv-media/kacchi.mp4'
//   fallback  optional photo, shown if the video can't play
// A key with no entry (or whose files fail to load) shows a plain dark
// background behind the text. When you replace a file, give it a new name
// (kacchi-2.mp4) so the TVs pick it up right away.
// Video size and format: see docs/TV-MENU-BOARDS.md.

// 5Spice's OWN photos and videos. These show everywhere, live TVs included.
// Examples:
//   'beef-kachchi': { type: 'video', src: '/tv-media/kacchi.mp4', fallback: '/tv-media/kacchi.jpg' },
//   'catering-trays': { type: 'image', src: '/tv-media/catering-trays.webp' },
export const TV_MEDIA = {
};

// STOCK PHOTOS: temporary development assets, NOT photos of 5Spice's dishes.
// They show only on previews (this computer, PR preview links, or a TV
// address ending in ?preview=1), marked "Stock photo" on screen, and never
// on the live TVs. Files in client/public/tv-media/stock/, one line each:
//   'beef-kachchi': stock('kacchi.jpg'),  // source URL, license
// Unsplash and Pexels photos are free to use with no credit required. Delete
// an entry once the same key is in TV_MEDIA above.
export const stock = (file) => ({ type: 'image', src: `/tv-media/stock/${file}`, stock: true });

export const STOCK_MEDIA = {
};
