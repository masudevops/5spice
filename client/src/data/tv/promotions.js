// Promotional content for the marketing TVs (4–6), kept apart from the menu
// and prices. Only add what the owners approve: never made-up offers,
// discounts, or prices. Prices on slides always come from the menu.
//
// A campaign is a set of slides that can be switched on or off and scheduled:
//   enabled   false switches the whole campaign off (a feature flag)
//   sample    true = example content for reviewing the design: shows only on
//             previews, marked "Sample" on screen, never on the live TVs
//   schedule  optional, in Chicago time (see schedule.js), e.g.
//             { startDate: '2026-12-01', endDate: '2026-12-31',
//               days: ['sat', 'sun'], startTime: '07:00', endTime: '11:00' }
//   slides    shown in order, then repeated
// A slide has an id, a template, a duration in seconds, optionally its own
// enabled/schedule, and the template's fields. Its photo or video comes from
// media.js by `mediaKey` (or `dishId`). A TV picks campaigns in tv/murphy.js.
//
// Templates (components/tv/templates/), all full screen with the photo or
// video behind a dark overlay, the logo, and the halal note:
//   'dish-showcase'  one dish or story. Fields: dishId (name from the menu)
//                    or title, eyebrow (short label above), tagline.
//   'special'        breakfast / lunch / dinner / limited-time offer.
//                    Fields: badge, headline (else the dish's name), dishId,
//                    tagline, dishIds (up to 3 dishes listed with their menu
//                    prices), details, showEndDate (adds "Through <the
//                    campaign's endDate>").
//                    With `servingHours` on its campaign, adds "Now serving"
//                    or the hours; it plays for `duration` while served and
//                    `offHoursDuration` (default 8 s) otherwise.
//   'meals-summary'  "Today's Specials": the meal campaigns in `meals` side by
//                    side with their hours and dishes, the served one marked.
//   'catering'       catering call to action with the catering email and web
//                    address from config/site.js. Fields: eyebrow, headline,
//                    subhead, points, showGuestCount (the confirmed catering
//                    guest total, config/site.js).
//   'brand'          the 5Spice brand slide (logo, cuisine, halal).
export const PROMO_CAMPAIGNS = {
    // TV 4: signature dishes. Chicken Roast and Tehari use 5Spice's own
    // photos; the rest use stock photos (previews only) until real ones.
    'signature-dishes': {
        enabled: true,
        slides: [
            { id: 'kacchi', template: 'dish-showcase', dishId: 'beef-kachchi', eyebrow: 'Our Signature', duration: 10 },
            { id: 'chicken-roast', template: 'dish-showcase', dishId: 'chicken-roast', eyebrow: 'Our Signature', duration: 10 },
            { id: 'tehari', template: 'dish-showcase', dishId: 'beef-tehari', eyebrow: 'Our Signature', duration: 10 },
            { id: 'kala-bhuna', template: 'dish-showcase', dishId: 'beef-kala-bhuna', eyebrow: 'Our Signature', duration: 10 },
            { id: 'fuchka', template: 'dish-showcase', dishId: 'fuchka', eyebrow: 'Our Signature', duration: 10 },
            { id: 'chai', template: 'dish-showcase', dishId: 'special-chai', eyebrow: 'Our Signature', duration: 10 },
        ],
    },

    // TV 5: meal specials. Every meal shows all day so guests learn about all
    // of them: the one being served leads (first, longer, "Now serving"),
    // the others follow labeled with their hours ("Today · 5–9 PM").
    // `servingHours` (Chicago time) is when the meal is served, not when its
    // slides show; `label` names it on the "Today's Specials" slide.
    // SAMPLE content for the design review (the hours, dishes, and wording
    // are examples, not owner-approved): replace with the owners' specials
    // and remove `sample` to put a campaign live.
    breakfast: {
        enabled: true,
        sample: true,
        label: 'Breakfast',
        servingHours: { startTime: '07:00', endTime: '11:00' },
        slides: [
            { id: 'breakfast', template: 'special', mediaKey: 'breakfast', badge: 'Breakfast Special', headline: 'Breakfast Favorites', tagline: 'A warm Bangladeshi start to the day.', dishIds: ['paratha-roti', 'dim-bhaji', 'dal-gosht'], duration: 15 },
        ],
    },
    lunch: {
        enabled: true,
        sample: true,
        label: 'Lunch',
        servingHours: { startTime: '11:00', endTime: '15:00' },
        slides: [
            { id: 'lunch', template: 'special', mediaKey: 'lunch', badge: 'Lunch Special', headline: 'Lunch Favorites', tagline: 'Fresh. Flavorful. Authentic.', dishIds: ['beef-tehari', 'chicken-biryani', 'morog-polao'], duration: 15 },
        ],
    },
    dinner: {
        enabled: true,
        sample: true,
        label: 'Dinner',
        servingHours: { startTime: '17:00', endTime: '21:00' },
        slides: [
            { id: 'dinner', template: 'special', mediaKey: 'dinner', badge: 'Dinner Special', headline: 'Dinner Favorites', tagline: 'Slow-cooked curries, made the traditional way.', dishIds: ['chicken-roast', 'beef-kala-bhuna', 'mutton-bhuna'], duration: 15 },
        ],
    },
    // One slide with every meal side by side and its hours, the one being
    // served highlighted. `meals` lists meal campaigns; switched-off ones
    // are left out.
    'todays-specials': {
        enabled: true,
        sample: true,
        slides: [
            { id: 'todays-specials', template: 'meals-summary', meals: ['breakfast', 'lunch', 'dinner'], duration: 10 },
        ],
    },
    'special-offers': {
        enabled: true,
        sample: true,
        schedule: { startDate: '2026-11-01', endDate: '2026-12-31' },
        slides: [
            { id: 'mutton-kachchi', template: 'special', dishId: 'mutton-kachchi', badge: 'Limited Time', tagline: 'Tender mutton and fragrant rice, slow-cooked together.', duration: 10 },
        ],
    },
    // Switched off: shows how a seasonal campaign waits for its flag.
    seasonal: {
        enabled: false,
        sample: true,
        schedule: { startDate: '2026-12-01', endDate: '2027-01-31' },
        slides: [
            { id: 'winter-chai', template: 'special', dishId: 'special-chai', badge: 'Winter Favorite', duration: 10 },
        ],
    },

    // TV 6: catering and community. Wording from the website's Catering page.
    catering: {
        enabled: true,
        slides: [
            {
                id: 'catering-occasions', template: 'catering', mediaKey: 'catering-trays', duration: 12,
                eyebrow: 'Catering', headline: 'Made for Every Occasion',
                points: ['Weddings & family celebrations', 'Corporate events & office lunches', 'Community gatherings'],
                showGuestCount: true,
            },
            {
                id: 'catering-trays', template: 'catering', mediaKey: 'catering-buffet', duration: 12,
                eyebrow: 'Catering', headline: "Let's Plan Your Next Event",
                points: ['Family trays & party platters', 'Large event catering', 'Customized menus & packages'],
            },
        ],
    },
    community: {
        enabled: true,
        slides: [
            {
                id: 'community', template: 'dish-showcase', mediaKey: 'community', duration: 10,
                eyebrow: 'Our Community', title: 'Proudly Serving Our Community',
                tagline: 'Family gatherings, community celebrations, and events across Murphy, Plano, and North Texas.',
            },
        ],
    },
    brand: {
        enabled: true,
        slides: [{ id: 'brand', template: 'brand', duration: 8 }],
    },
};
