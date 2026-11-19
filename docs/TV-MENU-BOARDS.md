# TV screens (Murphy)

Six in-store TVs at 5Spice Kitchen – Murphy. Each TV opens its own page on the
website:

| TV | Address | Type | Shows |
|---|---|---|---|
| TV 1 | https://5spicemarket.com/tv/murphy/1 | Menu | Biriyani & Rice |
| TV 2 | https://5spicemarket.com/tv/murphy/2 | Menu | Curries, Kebabs & Sides |
| TV 3 | https://5spicemarket.com/tv/murphy/3 | Menu | Breakfast, Snacks, Sweets & Drinks |
| TV 4 | https://5spicemarket.com/tv/murphy/4 | Promo | Signature dishes (photos, videos) |
| TV 5 | `/tv/murphy/5` (to build) | Promo | Breakfast, lunch, dinner specials and offers |
| TV 6 | `/tv/murphy/6` (to build) | Promo | Catering, community events, branding |

These pages aren't linked from the website, aren't in the sitemap, and tell
search engines not to list them (`noindex`, plus `Disallow: /tv/` in
`robots.txt`). Anyone who types the address can still open them, so never put
anything private on a TV.

Every screen is drawn at 1920×1080 and scaled to fit, so it looks the same on
any TV size and on Fire TV browsers that report 960×540. The logo is the
location's own (5Spice Kitchen for Murphy, `client/src/data/locations/murphy.js`).

## What to edit

| To change | Edit |
|---|---|
| What each TV shows (type, title, sections, campaigns) | `client/src/data/tv/murphy.js` |
| Dish names, descriptions, prices | `client/src/data/menus/shared-items.js` (same data as the website menu) |
| Which menu dishes show a description | `murphyDescribedDishes` in `client/src/data/tv/murphy.js` |
| Promotions: slides, on/off, schedules | `client/src/data/tv/promotions.js` |
| Dish photos and videos | `client/src/data/tv/media.js` (+ the file in `client/public/tv-media/`) |

Merging to `main` deploys. TVs notice the new version within about 5 minutes
and reload by themselves (they also reload daily at 4 AM).

## Menu TVs (1–3)

Text only: categories, dish names, prices, and a short description for dishes
whose name alone may not tell guests what they are. No photos, so the type can
be large.

- Two columns. Each column is a list of sections; a section is a part of the
  Murphy menu (`{ category: 'Biriyani & Rice Dishes', group: 'Chicken' }`), so
  a dish added to the menu appears on its TV automatically. A section can
  instead list dishes (`{ title, itemIds: [...] }`).
- Anything that doesn't fit is left out whole (never cut in half). If a dish
  goes missing after adding one, move a section to the other column or to
  another TV.
- Prices sit right after each dish name and stay hidden until a dish has one.
- **Sample prices:** previews (your computer, PR preview links) fill in
  made-up prices from `client/src/data/tv/sample-prices.js` so the layout can
  be judged with prices. The live site never shows them, unless you add
  `?preview=1` to a TV address to check the layout there. Delete that file
  once real prices are in.

**Readability:** sized for 6–10 ft. Dish names 46px (about 0.8 in tall on a
55" TV), prices 42px gold, section headings 44px, descriptions 28px. Text is
white, gold, or cream at 86%, all at least 8:1 contrast on the dark
background.

## Promo TVs (4–6)

A slideshow of **slides**, grouped into **campaigns**.

- **Campaigns** can be switched off (`enabled: false`) and scheduled by date,
  day of the week, and time of day, always in Chicago time:
  `{ startDate: '2026-12-01', endDate: '2026-12-31', days: ['sat', 'sun'], startTime: '07:00', endTime: '11:00' }`.
  Slides can have their own `enabled` and `schedule` too.
- Each TV lists the campaigns it plays (`campaigns: [...]` in `murphy.js`),
  so every TV has its own content. Live slides play in order, each for its
  `duration` in seconds, then repeat. Schedules are re-checked every 30
  seconds.
- With nothing live, the TV shows a 5Spice brand slide (logo, tagline, 100%
  Zabiha Halal), never a blank screen.
- **Templates** set how a slide looks. Today: `dish-spotlight` (a dish's
  photo or video beside its name, description, and price, all from the menu).
  More (specials, catering, events) get added in
  `client/src/components/tv/templates/` and registered in its `index.js`.
- Only owner-approved content: never made-up promotions, discounts, or prices.
  Prices on slides come from the menu.

## Media

Use real 5Spice footage and photos only. No stock or AI-generated media.

Until real media arrives, TV 4's dishes show animated placeholder GIFs in the
5Spice colors (`tv-media/placeholder-gold.gif`, `-orange`, `-green`; no food
shown). Replace them dish by dish in `media.js`.

**Preview photos (testing only):** previews (your computer, PR preview links,
or a TV address ending in `?preview=1`) show free stand-in food photos instead
(`tv-media/preview/`, `PREVIEW_MEDIA` in `media.js`): public domain or CC0
photos from Wikimedia Commons that need no credit. They are not 5Spice's
dishes, so the live TVs never show them. Delete them once 5Spice's own photos
are in.

- **Video (recommended):** MP4, H.264, 1280×720, 3–5 seconds, no sound, about
  1–2 MB. Plays muted and looping.
- **Photo:** JPG or WebP, 1280 px wide. Also used as a video's fallback.
- **GIF:** works, but an MP4 of the same clip is usually 3–5× smaller and
  smoother. Prefer MP4.

If a video fails to load (or doesn't start within 15 seconds), the TV shows
the fallback photo; if that fails too, a 5Spice placeholder.

**When you replace a file, give it a new name** (`kacchi-2.mp4`) and update
`media.js`. TVs cache media for up to a day, so reusing a name can keep the old
clip showing.

Converting a raw clip (needs [ffmpeg](https://ffmpeg.org)):

```sh
# 5-second, 720p, silent MP4 that starts playing quickly
ffmpeg -i raw.mov -t 5 -an -vf "scale=1280:-2,fps=30" -c:v libx264 -profile:v high \
  -pix_fmt yuv420p -crf 26 -maxrate 1.8M -bufsize 3.6M -movflags +faststart kacchi.mp4

# Fallback photo from the clip's first second
ffmpeg -ss 1 -i kacchi.mp4 -frames:v 1 -q:v 3 kacchi.jpg
```

## Fire TV setup

Seen on the Murphy TVs (2026-11-17 photos): Silk's address bar was showing,
which shrinks the board, and the blacks looked gray-blue (TV picture mode).

1. **Full screen (Silk):** use Silk's own hide-toolbar / full-screen button,
   or press any remote button on the page (the page then asks for full
   screen). A page reload (after an update, or the 4 AM refresh) can bring
   the address bar back in Silk. If it does, use a kiosk browser (step 4).
2. **TV picture:** picture mode Standard or Calibrated (not Vivid), color
   temperature Normal or Warm, dynamic contrast and eco/power-saving off.
   **Overscan off** (often "Size: Normal", "Just Scan", or "Full Pixel").
   Sleep timers and auto power-off off.
3. **Fire TV settings:** screensaver "Never", sleep "Never" if offered.
4. **Kiosk browser (recommended for unattended TVs):** e.g. Fully Kiosk
   Browser: start URL = that TV's address, kiosk / full-screen mode on, launch
   on boot on (the TV comes back by itself after a power cut), keep screen on,
   offline caching on (the update check always goes to the network, so
   caching doesn't stop updates).
5. Label each Fire TV stick with its TV number.

## Test checklist (on each TV)

- [ ] The right screen shows for that TV, filling the screen with no address
      bar or mouse pointer.
- [ ] From where guests order (6–10 ft), dish names, prices, and descriptions
      are readable.
- [ ] Blacks look black, not gray or blue.
- [ ] Promo TV: slides change, videos play smoothly and silently.
- [ ] Unplug the TV and Fire TV stick, plug back in: the screen returns on its
      own (needs a kiosk browser with launch on boot).
- [ ] Turn off the Wi-Fi: the screen keeps showing. Turn it back on: still fine.
- [ ] Deploy a small change: the TV shows it within about 5 minutes, still
      full screen.
- [ ] Leave it running overnight: still running in the morning.

## Later: Toast POS

Menu TVs read dishes through `getMenuItem()` and the menu structure through
`getMenuByLocationSlug()` in `client/src/data/menus/index.js`. To take names
and prices from Toast, those are the places to change (Toast API keys must stay
on a server, so it would read from a small server job or a file that job
writes, never call Toast from the browser). Promotions and media stay
team-managed in `promotions.js` and `media.js`.
