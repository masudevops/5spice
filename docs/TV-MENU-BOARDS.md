# TV screens (Murphy)

Six in-store TVs at 5Spice Kitchen – Murphy. Each TV opens its own page on the
website:

| TV | Address | Type | Shows |
|---|---|---|---|
| TV 1 | https://5spicemarket.com/tv/murphy/1 | Menu | Biriyani & Rice |
| TV 2 | https://5spicemarket.com/tv/murphy/2 | Menu | Curries, Kebabs & Sides |
| TV 3 | https://5spicemarket.com/tv/murphy/3 | Menu | Breakfast, Snacks, Sweets & Drinks |
| TV 4 | https://5spicemarket.com/tv/murphy/4 | Promo | Signature dishes (photos, videos) |
| TV 5 | https://5spicemarket.com/tv/murphy/5 | Promo | Breakfast, lunch, dinner specials and offers |
| TV 6 | https://5spicemarket.com/tv/murphy/6 | Promo | Catering, community, branding |

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
| Which dishes are on the restaurant menu (TVs 1–3) | `client/src/data/menus/murphy.js` (catering: `catering.js`, never on TVs 1–3) |
| Dish names, descriptions, prices | `client/src/data/menus/shared-items.js` (same data as the website menu) |
| Which menu dishes show a description | `murphyDescribedDishes` in `client/src/data/tv/murphy.js` |
| Promotions: slides, on/off, schedules | `client/src/data/tv/promotions.js` |
| Photos and videos (yours, and temporary stock photos) | `client/src/data/tv/media.js` (+ the file in `client/public/tv-media/`) |

Merging to `main` deploys. TVs notice the new version within about 5 minutes
and reload by themselves (they also reload daily at 4 AM). On a promo TV the
reload waits for the next slide change, so it never cuts a video off
(at most 2 minutes).

## Menu TVs (1–3)

Text only: categories, dish names, prices, and a short description for dishes
whose name alone may not tell guests what they are. No photos, so the type can
be large.

- Two columns. Each column is a list of sections; a section is a part of the
  Murphy menu (`{ category: 'Biriyani & Rice Dishes', group: 'Chicken' }`), so
  a dish added to the menu appears on its TV automatically. A section can
  instead list dishes (`{ title, itemIds: [...] }`).
- **Restaurant menu only.** Menu TVs read the restaurant menu
  (`client/src/data/menus/murphy.js`), never the catering menu
  (`catering.js`), so catering-only dishes can't appear on them, even when
  listed by `itemIds`.
- **Text size adapts.** Each board starts with its text up to 1.5× the base
  sizes below and steps down only until everything fits, never below the
  base. A TV with fewer dishes gets bigger text and more space, not more
  crowding. Anything that still doesn't fit at the base size is left out
  whole (never cut in half): move a section to the other column or another
  TV rather than making the text smaller.
- Prices line up on the right of each column and stay hidden until a dish
  has one.
- **Sample prices:** previews (your computer, PR preview links) fill in
  made-up prices from `client/src/data/tv/sample-prices.js` so the layout can
  be judged with prices. The live site never shows them, unless you add
  `?preview=1` to a TV address to check the layout there. Delete that file
  once real prices are in.

**Readability:** base (smallest) sizes are dish names 46px (about 0.8 in tall
on a 55" TV), prices 42px gold, section headings 44px, descriptions 28px; a
shorter menu gets up to 1.5× that (names about 1.2 in) for 10–15 ft. Text is
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
- With none of its campaigns live, a TV plays its `fallback` campaigns
  (TV 5 falls back to the signature dishes outside every meal window), and
  with nothing live at all a 5Spice brand slide, never a blank screen.
- Slides crossfade (1.2 s). No other animation.
- **Templates** (`client/src/components/tv/templates/`) all share one frame
  (`PromoLayout`): the photo or video fills the screen, a dark overlay on the
  left keeps text readable on any image, the Kitchen logo top left and
  "100% Zabiha Halal" bottom left.
  - `dish-showcase` (TV 4, TV 6 community): a label and a dish's name (or a
    title), optional tagline. No price.
  - `special` (TV 5): a gold badge (Breakfast, Today's Special, Limited
    Time…), headline, up to three dishes with their menu prices, and
    optionally "Through <end date>" from the campaign's schedule.
  - `catering` (TV 6): headline, check-marked points, the catering email and
    web address, and the confirmed guest count from `config/site.js`.
  - `brand`: the brand slide.
- Only owner-approved content: never made-up promotions, discounts, or prices.
  Prices on slides come from the menu.
- **Sample content:** a campaign with `sample: true` is an example for
  reviewing the design. It shows only on previews, tagged "Sample content" on
  screen, never on the live TVs. TV 5's breakfast, lunch, dinner, offer, and
  seasonal campaigns are samples today: replace their wording, dishes, and
  times with the owners' and remove `sample` to put them live. TV 6 uses the
  website's approved catering wording, so it is live content.
- **Checking schedules:** add `?at=2026-11-19T08:00` to a preview address to
  see what a promo TV shows at that time.

## Media

Media lives in `client/src/data/tv/media.js`, apart from the slide layouts.
Each slide finds its photo or video by key (its `mediaKey`, else its dish id):

- `TV_MEDIA`: 5Spice's own photos and videos. Shown everywhere, live TVs
  included.
- `STOCK_MEDIA`: stock photos (Unsplash or Pexels license) used as
  **temporary development assets** so the design can be judged with food.
  Shown only on previews, tagged "Stock photo" on screen, never on the live
  TVs, and never presented as 5Spice's dishes. Files in
  `client/public/tv-media/stock/`.
- No entry: a plain dark background behind the text.

**Replacing a stock photo with your own photo or video:**

1. Put the file in `client/public/tv-media/` with a new name, e.g.
   `kacchi.mp4` and a still `kacchi.jpg` (see sizes below).
2. In `media.js`, add a line to `TV_MEDIA` under the same key:
   `'beef-kachchi': { type: 'video', src: '/tv-media/kacchi.mp4', fallback: '/tv-media/kacchi.jpg' },`
3. Delete that key's line from `STOCK_MEDIA` and its file from
   `tv-media/stock/`. Once every stock photo is replaced, delete the folder.

**Stock photos in use (temporary, previews only, not approved for
production):** files in `client/public/tv-media/stock/`, each 1920×1080 with
the food right of center and a dark fill on the left under the text.

| Key (slide) | File | Source | License |
|---|---|---|---|
| `beef-kachchi` (TV 4 Kacchi) | `kacchi-biriyani.jpg` | pexels.com/photo/29260500 (Ratul CR) | Pexels |
| `beef-kala-bhuna` (TV 4) | `beef-kala-bhuna.jpg` | unsplash.com/photos/7-TOCB28rms (Daily Slowdown) | Unsplash |
| `fuchka` (TV 4) | `fuchka.jpg` | pexels.com/photo/34356404 (Fahim Shizan) | Pexels |
| `special-chai` (TV 4 Royal Bengal Chai) | `royal-bengal-chai.jpg` | wordpress.org/photos/photo/2566aeb20b (ritika000) | CC0 |
| `breakfast` (TV 5) | `breakfast-paratha-chai.jpg` | pexels.com/photo/39901231 (jahratreza) | Pexels |
| `lunch` (TV 5) | `lunch-biriyani.jpg` | pexels.com/photo/9609863 (Prabal) | Pexels |
| `dinner` (TV 5) | `dinner-curry.jpg` | unsplash.com/photos/eEWlcfydzQ4 (Sanket Shah) | Unsplash |
| `mutton-kachchi` (TV 5 offer) | `mutton-kacchi.jpg` | wordpress.org/photos/photo/816692d387 (Shariful Islam) | CC0 |
| `catering-trays` (TV 6) | `catering-chafing-dishes.jpg` | pexels.com/photo/18749077 (micklatter) | Pexels |
| `catering-buffet` (TV 6) | `catering-buffet.jpg` | pexels.com/photo/12253094 (stewphotography) | Pexels |
| `community` (TV 6) | `community-event-buffet.jpg` | pexels.com/photo/39388375 (sejio402) | Pexels |

The Pexels and Unsplash licenses and CC0 allow free commercial use with no
credit required, but they don't cover how a photo is presented: never show a
stock photo as if it were 5Spice's own dish, and check with the owners before
any reaches a live TV. Photos with people in them (the chafing-dish line on
TV 6) carry no model release.

**5Spice's own photos in use** (`TV_MEDIA`, shown everywhere including live
TVs): `chicken-roast` → `tv-media/chicken-roast.jpg`, `beef-tehari` →
`tv-media/beef-tehari.jpg` (restaurant photos, 2026-11-19, prepared at
1920×1080). Phone photos work: shoot in landscape, close up, in soft
daylight, without flash or glare.

Shoot or pick media as one campaign: same warm, natural light, similar color
temperature, the dish on the right two thirds of the frame (the left third
sits under the text).

- **Video (recommended):** MP4, H.264, 1920×1080, 5–10 seconds, no sound,
  about 3–5 MB. Plays muted and looping, full screen.
- **Photo:** JPG or WebP, 1920×1080 (landscape), about 300–500 KB. Also used
  as a video's fallback.
- **GIF:** works, but an MP4 of the same clip is usually 3–5× smaller and
  smoother. Prefer MP4.

If a video fails to load (or doesn't start within 15 seconds, or freezes for
15 seconds while playing), the TV shows the fallback photo; if that fails
too, the plain dark background.

**When you replace a file, give it a new name** (`kacchi-2.mp4`) and update
`media.js`. TVs cache media for up to a day, so reusing a name can keep the old
clip showing.

Converting a raw clip (needs [ffmpeg](https://ffmpeg.org)):

```sh
# 8-second, 1080p, silent MP4 that starts playing quickly
ffmpeg -i raw.mov -t 8 -an -vf "scale=1920:-2,fps=30" -c:v libx264 -profile:v high \
  -pix_fmt yuv420p -crf 24 -maxrate 4M -bufsize 8M -movflags +faststart kacchi.mp4

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
- [ ] From where guests order (10–15 ft), dish names, prices, and descriptions
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
writes, never call Toast from the browser). The restaurant
menu (`murphy.js`) and the catering menu (`catering.js`) are kept apart, so each
can map to its own Toast menu and prices. Promotions and media stay
team-managed in `promotions.js` and `media.js`.
