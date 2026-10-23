# 5Spice Website — Maintainer Guide

How to update the menu, menu photos, weekly deals, location details, and page
copy on 5spicemarket.com, plus copy-paste prompts for asking Claude Code to
do it for you.

> All paths below are relative to the repo root. Content lives in plain
> JavaScript/JSON files. There is no CMS or database.
>
> If [spec 02](specs/02-content-ops-runtime-json.md) (moving menus and
> locations to JSON) ships, the menu and location paths in this guide will
> change. Update this guide at the same time.

---

## 1. Quick map: what lives where

| I want to change… | Edit this file / folder |
|---|---|
| A dish (name, description, price, vegetarian tag, origin) | `client/src/data/menus/shared-items.js` |
| Which dishes a location serves, and in what category | `client/src/data/menus/murphy.js`, `client/src/data/menus/plano.js` |
| A dish served at only one location | That location's menu file (`items: [...]`, see §3.4) |
| Show or hide a location's whole menu page | `flags.menuPublished` in `client/src/data/locations/<slug>.js` |
| Menu photos | Image files in `client/public/images/menu/`, then the dish's `image` field (see §4) |
| Weekly deals | `client/public/weekly-deals.json` |
| Location status, hours, phone, address, Facebook, ordering links | `client/src/data/locations/murphy.js`, `client/src/data/locations/plano.js` |
| Catering / dine-in / take-out status badges | `services` in the location file |
| Which location is the site default | Order of `LOCATIONS` in `client/src/data/locations/index.js` (first = default) |
| General email, catering email, brand Facebook/Instagram | `client/src/config/site.js` (`SOCIAL_LINKS`, `CATERING_EMAIL`) |
| Market departments, homepage offering cards, Kitchen highlight cards | `client/src/config/site.js` (`MARKET_DEPARTMENTS`, `OFFERINGS`, `MENU_HIGHLIGHTS`) |
| Wording on a specific page | `client/src/pages/<Page>.jsx` (see §7) |
| Logo, favicons, social preview image | `client/public/` (use the provided brand assets only) |
| Site mode (coming soon / live) | `VITE_APP_SITE_MODE`: `client/.env` locally, **Vercel project settings** in production |

The technical reference for the data files is `client/src/data/README.md`.

---

## 2. Before and after any change

1. **Work on a branch**, never directly on `main`:
   `git checkout -b content/<short-description>`
2. **Preview locally:** `cd client && npm install && npm run dev`, then open
   http://localhost:5173
3. **Check before you push:** `cd client && npm run lint && npm run build`.
   Both must pass. The build also regenerates `client/public/sitemap.xml`.
4. Push the branch and open a pull request. The live site updates after the
   PR is merged and Vercel redeploys. This includes `weekly-deals.json`:
   no rebuild is needed, but the file still has to be deployed.

---

## 3. Updating the menu

Menus are **hidden right now** (`flags.menuPublished: false` on every
location) because the menu isn't final. While hidden, the menu pages return
"Page not found", and every "View Menu" button, sitemap entry, and Google
menu link is turned off. You can still edit the menu safely while it's
hidden.

### 3.1 How the menu is built

- **`shared-items.js`** holds every dish once, keyed by an id like
  `'kacchi-biryani'`.
- **`murphy.js` / `plano.js`** (in `client/src/data/menus/`) list
  **categories** in display order, and which dish ids go in each.
- Categories are organized **by course**, not by cuisine: Starters, Biryani
  & Rice, Curries, Kebabs & Grill, Breads, Desserts, Drinks.

### 3.2 Dish fields

```js
'kacchi-biryani': {
    id: 'kacchi-biryani',          // must match the key; lowercase-with-dashes
    name: 'Kacchi Biryani',
    description: 'Short, accurate description.',
    price: null,                   // a number like 14.99, or null → shows "Price TBD"
    dietary: [],                   // e.g. ['vegetarian']
    origin: 'Bangladeshi',         // optional: 'Bangladeshi' | 'Indian' | 'Pakistani'
    available: true,               // false → shows an "Unavailable" tag
    image: null,                   // see §4
},
```

### 3.3 Common edits

- **Change a price or description:** edit the dish in `shared-items.js`.
  Every location using that dish updates.
- **Add a dish:** add it to `shared-items.js`, then add its id to the right
  category in each location's menu file.
- **Remove a dish from one location:** delete its id from that location's
  menu file (leave it in `shared-items.js` if another location uses it).
- **Temporarily unavailable:** set `available: false`.
- **Add or reorder categories:** edit the `categories` array in the location's
  menu file. Order on the page follows the order in the file.

### 3.4 A dish only one location serves

Add an `items` array next to `itemIds` in that category:

```js
{ name: 'Curries', itemIds: ['beef-bhuna'], items: [
    { id: 'murphy-special-curry', name: '…', description: '…', price: null,
      dietary: [], available: true, image: null },
] },
```

### 3.5 Publishing a menu

When the owners confirm a location's menu is final, set
`flags.menuPublished: true` in `client/src/data/locations/<slug>.js`. Then run
the build and confirm `/locations/<slug>/menu` appears in
`client/public/sitemap.xml`.

### 3.6 Menu rules

- **Never invent prices.** Leave `price: null` until the kitchen team
  confirms the real price.
- **Halal is stated once per menu** (`halalStatement`), not as a per-dish
  tag. Everything 5Spice serves is halal.
- Bangladeshi dishes lead. Indian and Pakistani dishes are part of the same
  regional family. Use `origin` tags; don't group the menu by cuisine.
- Don't make up dish details (ingredients, "award-winning", spice claims).

---

## 4. Menu photos

> **Current status:** every dish has an `image` field, but **the menu page
> does not display photos yet.** Turning photos on is a small, one-time code
> change. Use the prompt in §8.2 when real photos are ready.

**Photo rules (from the owners):**
- Only real photos of 5Spice food. **No stock, AI-generated, or placeholder
  food images.**
- It's fine for some dishes to have no photo. They show without one.

**Where photos go:**
- Folder: `client/public/images/menu/` (create it the first time).
- File name = the dish id: `kacchi-biryani.webp`, `beef-bhuna.webp`.
- Format: `.webp` (or `.jpg`), landscape **4:3**, about **1200×900 px**,
  under **200 KB** each. Compress before adding (e.g. squoosh.app).
- In `shared-items.js`, set the dish's image to the public path:
  `image: '/images/menu/kacchi-biryani.webp'`

---

## 5. Weekly deals

File: `client/public/weekly-deals.json`. It's plain JSON, so watch the
commas and quotes.

- **No active deals:** keep `"deals": []`. The page then says deals start
  when the market opens. This is the current state.
- **Deals running:**

```json
{
  "updatedLabel": "Deals for June 2–8",
  "note": "While supplies last.",
  "deals": [
    {
      "id": "basmati-rice",
      "title": "Basmati Rice",
      "category": "Pantry",
      "description": "10 lb bags this week.",
      "badge": "This Week"
    }
  ]
}
```

- Only list real, active promotions. Remove them when they end.
- Weekly Deals is grocery-only. It never appears for kitchen-only locations.

---

## 5a. Catering milestones (homepage)

File: `client/src/config/site.js` → `CATERING_STATS`. This is one combined
total for all 5Spice kitchens, shown in the homepage "Every Gathering Matters"
section and in the "Proudly Serving Our Community" section of the Catering page.

- Set `guestsServed` and/or `eventsCompleted` to the verified running total.
  The site rounds down to a milestone, so entering `1240` shows **1,000+**.
- A metric stays hidden while it is `null` or below its minimum (100 guests,
  10 events). If both are hidden, the whole section is hidden.
- Set `asOf` to the date you checked (`'YYYY-MM-DD'`). It's for your records
  and isn't shown on the site.
- Count guests the same way each time, as the booked guest count per event.
  Never enter estimates.

---

## 6. Location details

Files: `client/src/data/locations/murphy.js`, `client/src/data/locations/plano.js`.

| Field | What it does |
|---|---|
| `status` | `'open'` (operating, even if only catering), `'coming-soon'`, or `'hidden'` |
| `statusLabel` | Short badge text, e.g. "Catering Available Now" |
| `openingText` | Longer status line, e.g. "Opening Early 2027, In Sha Allah" |
| `services` | `catering`, `dineIn`, `takeOut`: each `'open'` or `'coming-soon'` |
| `hours` | Leave `[]` until confirmed; the site then shows `hoursNote` |
| `phone`, `email`, `address` | Shown on location, Contact, Catering pages and in Google data |
| `socialLinks.facebook` | Location-specific Facebook page |
| `orderingLinks` | `toast`, `uberEats`, `doorDash`, `instacart`. Empty = button hidden |
| `lat`, `lng` | Map coordinates for Google data (currently placeholders) |

**When Murphy opens dine-in or take-out:** set `dineIn` and/or `takeOut` to
`'open'`, then update `statusLabel` and `openingText`. The "Order from
Murphy" button and call-to-order prompts come back automatically.

**Hours format:** one entry per day, e.g.
`{ day: 'Monday', hours: '11:00 AM – 9:00 PM' }`. Never put estimated hours
here, because they're published to Google.

**Ordering links:** paste only verified, working storefront URLs for that
exact location.


---

## 7. Page copy: which file

| Page | URL | File |
|---|---|---|
| Home | `/` | `client/src/components/LaunchLanding.jsx` |
| Market | `/market` | `client/src/pages/Market.jsx` |
| Kitchen | `/kitchen` | `client/src/pages/Kitchen.jsx` |
| Catering | `/catering` | `client/src/pages/Catering.jsx` |
| Locations | `/locations` | `client/src/pages/Locations.jsx` |
| A location | `/locations/<slug>` | `client/src/pages/LocationDetail.jsx` (content comes from location data) |
| Menu | `/locations/<slug>/menu` | `client/src/pages/LocationMenu.jsx` (content comes from menu data) |
| Weekly Deals | `/sales` | `client/src/pages/Sales.jsx` + `weekly-deals.json` |
| Order Online | `/pickup` | `client/src/pages/Pickup.jsx` |
| About / Our Story | `/about` | `client/src/pages/About.jsx` |
| Contact | `/contact` | `client/src/pages/Contact.jsx` |
| Navbar / Footer | every page | `client/src/components/Navbar.jsx`, `Footer.jsx` |

Each page sets its own Google title and description in a `useDocumentHead({...})`
block near the top of the file. Default social-share text is in
`client/index.html`.

**Brand rules for any copy:** always "5Spice" (one word). Lead with
Bangladeshi identity. Keep "In Sha Allah" exactly as written. No invented
claims, prices, reviews, or hours. Plano is described in future tense until
it opens.

---

## 8. Prompts to send to Claude Code

Open Claude Code in the repo folder and paste one of these. Fill in the
`[brackets]`. Claude reads `CLAUDE.md` automatically, so brand rules apply.

### 8.1 Update the menu

```
Update the 5Spice menu for [Murphy / Plano / both]. Work on a new branch.

Changes:
- Add: [dish name] in [category]: "[description]", price [$X or "leave null"], [vegetarian?], origin [Bangladeshi/Indian/Pakistani]
- Change: [dish name] price to [$X] / description to "[...]"
- Remove from [location]: [dish name]
- Mark unavailable: [dish name]

Rules: edit client/src/data/menus/shared-items.js and the location menu
files only. Don't invent prices or dish details; use null where I didn't give
a price. Keep categories by course. Don't change flags.menuPublished.
Run lint and build, show me the diff summary, and commit.
```

### 8.2 Turn on menu photos (one-time setup)

```
Real menu photos are ready. Please enable photos on the menu page
(client/src/pages/LocationMenu.jsx) using each dish's existing `image` field.

Requirements: only show a photo when `image` is set (dishes without photos
must look clean, not broken). 4:3 image above the dish name, lazy-loaded,
with alt text "[dish name] at 5Spice". Match the existing dark/gold card
style. No placeholder images. Check on mobile and desktop. Work on a branch,
run lint and build, and commit.
```

### 8.3 Add menu photos

```
I added menu photos to client/public/images/menu/: [list file names].
Set the `image` field for each matching dish in
client/src/data/menus/shared-items.js (file name = dish id). Tell me if any
file doesn't match a dish id or is over 200 KB. Don't add any other images.
Run lint and build and commit on a branch.
```

### 8.4 Publish a menu

```
The [Murphy / Plano] menu is final. Set flags.menuPublished to true for
[location], run the build, confirm the menu page and sitemap entry appear,
check the "View Menu" buttons on mobile and desktop, and commit on a branch.
```

### 8.5 Weekly deals

```
Update client/public/weekly-deals.json with these deals for [dates]:
- [title] ([category]): "[description]", badge "[badge]"
[or: "Clear all deals — none are running."]
Keep the JSON valid. Don't add deals I didn't list. Commit on a branch.
```

### 8.6 Location status / hours / ordering links

```
Update [Murphy / Plano] in client/src/data/locations/[slug].js:
- Services: dine-in [open/coming-soon], take-out [open/coming-soon], catering [open/coming-soon]
- Hours: [Mon–Thu 11 AM – 9 PM, Fri–Sat ..., Sun ...]
- Phone: [number]
- Ordering links: Toast [url], Uber Eats [url], DoorDash [url]
Update statusLabel and openingText to match. Then check every page that
shows location status (home, Kitchen, Order Online, Contact, footer, navbar)
so nothing says something is open when it isn't. Run lint and build and
commit on a branch.
```

### 8.6a Catering milestones

```
Update CATERING_STATS in client/src/config/site.js:
guestsServed [verified total or null], eventsCompleted [verified total or null],
asOf [today's date]. Don't change the UI. Check the homepage section in live
mode, run lint and build, and commit on a branch.
```

### 8.7 Copy change on a page

```
On the [page] page (/[url]), change "[current text]" to "[new text]".
Keep everything else unchanged: layout, spacing, design. Check mobile and
desktop and commit on a branch.
```

---

## 9. Pre-publish checklist

- [ ] `npm run lint` and `npm run build` pass in `client/`
- [ ] No invented prices, hours, deals, reviews, or ordering links
- [ ] Plano isn't described as open; Murphy's services match reality
- [ ] `client/public/sitemap.xml` lists only pages you intend to publish
- [ ] Checked on a phone-width screen
- [ ] Production `VITE_APP_SITE_MODE` is set correctly in Vercel
