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
export const TV_MEDIA = {
    // 'beef-kachchi': { type: 'video', src: '/tv-media/kacchi.mp4', fallback: '/tv-media/kacchi.jpg' },
    // 'chicken-roast': { type: 'image', src: '/tv-media/chicken-roast.webp' },
    // 'fuchka': { type: 'gif', src: '/tv-media/fuchka.gif' },
};
