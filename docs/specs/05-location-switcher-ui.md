# Spec 5: Location switcher UI

**Status:** Built, pending manual browser sign-off — top of backlog per
owner (2026-10-07). Code complete and lint/build-clean; needs a human pass
in an actual browser (desktop + mobile) before calling it done, since
headless verification wasn't available in the build environment.
**Type:** Feature (UX)
**Depends on:** nothing. Independent of Spec 2 (content ops) — this spec
works against the current `.js` location data and will keep working
unchanged once that data moves to runtime JSON.

## Why

5Spice now has two locations with different offerings (Plano: market +
kitchen; Murphy: kitchen only), and the plumbing to let a visitor pick one
already exists — `useSelectedLocation` (persists choice to
`localStorage`) and `LocationSelector` (a bare native `<select>`) — but it's
only wired into the `/pickup` page. Kitchen reads the selection silently
(for its "View Full Menu" link) without ever showing the visitor they have
a choice. There's no way to tell which location you're looking at, or
switch, from anywhere else on the site.

Owner's stated priority for this one: **user-friendly and visually
polished, matching current branding** — this is explicitly not "just make
the dropdown work," it's "make it feel designed."

## Goal

A visitor can see which 5Spice location they're currently browsing and
switch to another, from any page, through a component that looks like it
belongs to this site's dark/gold design language — not a plain HTML
`<select>`.

## Design

### Component: `LocationSwitcher`

Replaces `components/LocationSelector.jsx`. A button that shows the current
location (pin icon + short name, e.g. "Plano") that opens a small branded
panel on click:

- Button: `MapPin` icon + `selectedLocation.shortName`, gold border matching
  existing controls (`border-[#B88A3D]/30`, gold `#D4A84B` on hover/focus),
  chevron that rotates on open (`framer-motion`, already a dependency — no
  new package needed).
- Panel: one row per visible location — name, a short type tag ("Market &
  Kitchen" / "Kitchen Only" derived from `flags.hasMarket`/`hasKitchen`),
  and its status copy (`openingText`, e.g. "Opening Early 2027, In Sha
  Allah" / "Opening Soon"). Selected location gets a gold left-border or
  checkmark. Same `#141414` panel background / `#B88A3D/25` borders used
  everywhere else on the site (`LocationCard`, `Catering`, etc.) so it reads
  as the same system, not a new one.
- Renders nothing if there's only one visible location (same guard the
  current `LocationSelector` already has) — so this stays dormant and
  harmless if Murphy is ever hidden again.
- Keyboard/accessible: a real `<button>` + listbox pattern (or
  `<details>`/native popover if it covers the a11y needs more simply),
  `aria-expanded`, arrow-key navigation, closes on `Escape`/outside click.

### Placement

- **Desktop:** in the thin utility bar above the main header (currently
  shows `{CONTACT.city}` as static text) — swap that static city label for
  the switcher. It's the most natural "you are here, change it" spot and
  doesn't crowd the primary nav links.
- **Mobile:** at the top of the slide-out mobile menu (`Navbar.jsx`'s
  `mobileMenuOpen` panel), above the page links. The bottom tab bar stays
  untouched — no room there, and it's not the right pattern for a modal
  choice like this.
- **`/pickup`:** swap its existing `LocationSelector` usage for the new
  component so there's one switcher implementation, not two.

### Behavior

- Selecting a location calls the existing `selectLocation(slug)` from
  `useSelectedLocation` — no change to the hook or its `localStorage` key.
- No hard redirects on switch. Instead, pages that don't apply to the
  selected location show an in-page empty state rather than bouncing the
  visitor away. `Market` now does this: if the selected location's
  `flags.hasMarket` is `false` (e.g. Murphy), the department grid is
  replaced with a message explaining this location is kitchen-only, plus a
  "Switch to Plano" button (one per visible market-carrying location,
  computed from data — not hardcoded) and a link to that location's menu.
  `Pickup` and `Kitchen` already handled this correctly via their existing
  flag checks before this spec started.

## Non-goals

- No change to `useSelectedLocation`'s storage/fallback logic — it already
  does the right thing (remembers choice, falls back to default if the
  stored slug becomes invalid).
- No geolocation-based auto-selection — out of scope, not requested.

## Acceptance criteria

- [x] `LocationSwitcher` component exists, styled consistently with
      existing brand components (colors, borders, typography already in
      use — no new visual language introduced).
- [x] Visible in the desktop utility bar and inside the mobile slide-out
      menu, on every page (via `Navbar`/`Layout`), not just `/pickup`.
- [x] `/pickup` uses the same component (old `LocationSelector` usage
      removed; file deleted, confirmed nothing else referenced it).
- [x] `Market` shows an in-page empty state (not a dead end) when the
      selected location has no grocery market, with a one-click switch to
      each location that does.
- [ ] Renders nothing when only one location is visible — implemented via
      the same `locations.length <= 1` guard as the old component, but not
      yet manually re-verified in a browser.
- [ ] Keyboard operable: open with Enter/Space, navigate with arrows, close
      with Escape, selection announced to screen readers — built on a
      real `<button>` + `role="listbox"`/`role="option"` pattern with
      Escape/outside-click handling, but not yet manually verified with a
      keyboard or screen reader.
- [x] Selecting a location updates `Kitchen`'s "View Full Menu" link,
      `Pickup`'s ordering links/groups, and `Market`'s empty state — and
      that update is now visible on *every* consumer at once (Navbar
      included), not just the component where the click happened. See
      changelog below — this was broken until the owner caught it by
      actually using the feature; a code read-through alone had missed it.
- [x] No new npm dependencies added (`framer-motion` was already an
      installed, unused dependency — this is its first real usage).
- [ ] Checked on mobile viewport widths in an actual browser — not done;
      headless browser verification was attempted but the sandbox had no
      route to download a Chromium binary. Needs a manual pass.

## Changelog

- 2026-10-08: Owner tested in-browser: switching Murphy → Plano via the
  "Switch to Plano" button on the Market empty state updated Market's
  content correctly, but the Navbar switcher kept showing "Murphy." Root
  cause: `useSelectedLocation` held its selection in local component
  `useState`, so every component calling the hook got its own independent
  copy — Navbar's copy never learned about Market's change. Fixed by
  converting it to a single shared value via React Context
  (`SelectedLocationProvider`, mounted once in `App.jsx`); all call sites
  (`Navbar`, `Market`, `Kitchen`, `Pickup`) now read the same state with no
  change to their own code, since the hook's name and return shape stayed
  identical. File renamed `useSelectedLocation.js` → `.jsx` (now contains
  JSX for the Provider).
