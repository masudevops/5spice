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
    'chicken-roast': { type: 'image', src: '/tv-media/chicken-roast.jpg' },
    'beef-tehari': { type: 'image', src: '/tv-media/beef-tehari.jpg' },
};

// STOCK PHOTOS: temporary development assets, NOT photos of 5Spice's dishes.
// They show only on previews (this computer, PR preview links, or a TV
// address ending in ?preview=1), marked "Stock photo" on screen, and never
// on the live TVs. Files in client/public/tv-media/stock/ (1920×1080, the
// food placed right of center, dark fill on the left under the text), one
// line each with its source and license. Pexels License, Unsplash License,
// and CC0 (WordPress Photo Directory) all allow free use with no credit
// required; none of these photos are approved for production. To replace
// one with your own photo or video, see docs/TV-MENU-BOARDS.md, then delete
// its line here and its file.
export const stock = (file) => ({ type: 'image', src: `/tv-media/stock/${file}`, stock: true });

export const STOCK_MEDIA = {
    // TV 4 (signature dishes)
    'beef-kachchi': stock('kacchi-biriyani.jpg'), // pexels.com/photo/29260500, Ratul CR, Pexels License
    'beef-kala-bhuna': stock('beef-kala-bhuna.jpg'), // unsplash.com/photos/7-TOCB28rms, Daily Slowdown, Unsplash License
    fuchka: stock('fuchka.jpg'), // pexels.com/photo/34356404, Fahim Shizan, Pexels License
    'special-chai': stock('royal-bengal-chai.jpg'), // wordpress.org/photos/photo/2566aeb20b, ritika000, CC0
    // TV 5 (meal specials)
    breakfast: stock('breakfast-paratha-chai.jpg'), // pexels.com/photo/39901231, jahratreza, Pexels License
    lunch: stock('lunch-biriyani.jpg'), // pexels.com/photo/9609863, Prabal, Pexels License
    dinner: stock('dinner-curry.jpg'), // unsplash.com/photos/eEWlcfydzQ4, Sanket Shah, Unsplash License
    'mutton-kachchi': stock('mutton-kacchi.jpg'), // wordpress.org/photos/photo/816692d387, Shariful Islam, CC0
    // TV 6 (catering and community)
    'catering-trays': stock('catering-chafing-dishes.jpg'), // pexels.com/photo/18749077, micklatter, Pexels License
    'catering-buffet': stock('catering-buffet.jpg'), // pexels.com/photo/12253094, stewphotography, Pexels License
    community: stock('community-event-buffet.jpg'), // pexels.com/photo/39388375, sejio402, Pexels License
};
