# TV menu boards

In-store menu boards for the TVs at 5Spice Kitchen – Murphy. Each TV opens its
own page on the website:

| TV | Address | Shows |
|---|---|---|
| TV 1 | https://5spicemarket.com/tv/murphy/1 | Biriyani, Curries & Snacks |
| TV 2 | https://5spicemarket.com/tv/murphy/2 | Biriyani, Curries & Kebabs |
| TV 3 | https://5spicemarket.com/tv/murphy/3 | Breakfast, Sides & Sweets |

More TVs can be added later (`/tv/murphy/4`, …) by adding a screen to
`client/src/data/tv/murphy.js`. The header uses the location's own logo
(5Spice Kitchen for Murphy, set in `client/src/data/locations/murphy.js`).

These pages aren't linked from the website, aren't in the sitemap, and tell
search engines not to list them (`noindex`, plus `Disallow: /tv/` in
`robots.txt`). Anyone who types the address can still open them, so never put
anything private on a board.

A board is drawn at 1920×1080 and scaled to fit, so it looks the same on any
TV size and on Fire TV browsers that report 960×540.

## What to edit

| To change | Edit |
|---|---|
| Which dishes a TV shows, column titles, screen title | `client/src/data/tv/murphy.js` |
| A dish's video or photo | `client/src/data/tv/media.js` (+ the file in `client/public/tv-media/`) |
| Dish names, descriptions, prices | `client/src/data/menus/shared-items.js` (same data as the website menu) |

- Each column has one featured dish (with media) and up to 4 more dishes. If
  you list more than fit, the extras are left out whole, never cut in half.
- Featured dishes always show their description. Listed dishes show one only
  if they're in `murphyDescribedDishes` (same file): dishes whose name alone
  may not tell guests what they are. The rest stay name-only so the text can
  be big enough to read from across the room.
- Prices sit right after each dish name, and stay hidden until a dish has
  one, so boards can go up before prices are final.
- **Previewing with sample prices:** add `?samplePrices=1` to a TV address
  (e.g. `/tv/murphy/1?samplePrices=1`) to fill in made-up prices from
  `client/src/data/tv/sample-prices.js`. They never show on the normal TV
  addresses or the website. Delete that file once real prices are in.
- Merging to `main` deploys. TVs notice the new version within about 5
  minutes and reload by themselves (they also reload daily at 4 AM).

## Media

Use real 5Spice footage and photos only. No stock or AI-generated media.

Until real media arrives, each featured dish shows an animated placeholder
GIF in the 5Spice colors (`tv-media/placeholder-gold.gif`, `-orange`,
`-green`; no food shown). Replace them dish by dish in `media.js`.

- **Video (recommended):** MP4, H.264, 1280×720, 3–5 seconds, no sound, about
  1–2 MB. Videos play muted, loop, and start one column at a time, so a TV
  never downloads all of them at once.
- **Photo:** JPG or WebP, 1280 px wide. Also used as a video's fallback.
- **GIF:** works, but an MP4 of the same clip is usually 5–10× smaller and
  smoother. Prefer MP4.

The frame is 2:1, slightly wider than 16:9, so keep the dish centered: a little
of the top and bottom of a 16:9 clip is cropped.

If a video fails to load (or doesn't start within 15 seconds), the board shows
the fallback photo; if that fails too, a 5Spice placeholder. Menu names and
prices are always visible either way.

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

## Readability

Sized for a 55" TV read from about 8–12 ft away: dish names and prices are
34–36 px (about 0.6 in tall on screen), descriptions 23 px. Text is white,
gold, or cream at 86%, all at least 8:1 contrast on the dark background.
Keep the background dark: it cuts glare and makes food media stand out.

## Fire TV setup

1. **TV settings:** turn off sleep timers, auto power-off, and eco/power-saving
   mode; picture size 16:9 / Normal. **Turn overscan off** (often "Size:
   Normal", "Just Scan", or "Full Pixel"): many TVs crop the screen edges
   otherwise. Picture mode Standard or Calibrated, not Vivid.
2. **Fire TV settings:** screensaver off (or "Never"), and sleep "Never" if
   offered.
3. **Browser:** a kiosk browser such as Fully Kiosk Browser, set to:
   - Start URL: that TV's address (e.g. `https://5spicemarket.com/tv/murphy/1`)
   - Kiosk / full-screen mode on (hides the address bar)
   - Launch on boot on, so the board comes back after a power cut
   - Keep screen on
   - Offline caching on, so the last board keeps showing if the Wi-Fi drops
     (the board's update check always goes to the network, so caching doesn't
     stop updates)
4. Label each Fire TV stick with its TV number.

## Test checklist (on each TV)

- [ ] The right board shows for that TV, filling the screen with no bars,
      address bar, or mouse pointer.
- [ ] From where guests order, you can read a dish description, not just
      the names.
- [ ] Videos play smoothly, loop, and stay silent; photos show where set.
- [ ] Unplug the TV and Fire TV stick, plug back in: the board returns on its
      own within a couple of minutes.
- [ ] Turn off the Wi-Fi: the board keeps showing. Turn it back on: still fine.
- [ ] Deploy a small change: the TV shows it within about 5 minutes.
- [ ] Leave it running overnight: still playing in the morning.

## Later: Toast POS

Boards read dishes through one function, `getMenuItem()` in
`client/src/data/menus/index.js`. To take names and prices from Toast, that's
the one place to change (Toast API keys must stay on a server, so it would read
from a small server job or a file that job writes, never call Toast from the
browser). Media stays in `media.js`, matched to dishes by id, so your team
keeps managing it.
