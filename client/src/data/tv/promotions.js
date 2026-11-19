// Promotional content for the marketing TVs (4–6), kept apart from the menu
// and prices. Only add what the owners approve: never made-up offers,
// discounts, or prices.
//
// A campaign is a set of slides that can be switched on or off and scheduled:
//   enabled   false hides the whole campaign
//   schedule  optional, in Chicago time (see schedule.js), e.g.
//             { startDate: '2026-12-01', endDate: '2026-12-31',
//               days: ['sat', 'sun'], startTime: '07:00', endTime: '11:00' }
//   slides    shown in order, then repeated
// A slide has an id, a template, a duration in seconds, optionally its own
// enabled/schedule, and the template's fields. A TV picks campaigns in
// tv/murphy.js; with nothing live it shows a 5Spice brand slide.
//
// Templates (components/tv/templates/):
//   'dish-showcase'   one dish or campaign full screen: its photo or video
//                     under a dark overlay, a short label, and the name.
//                     Fields: dishId (name from the menu) or title, eyebrow
//                     (short label above the name), optional tagline (owner-
//                     approved wording only), optional media (as below).
//   'dish-spotlight'  a dish's photo or video beside its name, description,
//                     and price, all taken from the menu.
//                     Fields: dishId, eyebrow (small label above the name),
//                     optional media ({ type: 'video' | 'gif' | 'image', src,
//                     fallback }); without it, the dish's entry in media.js.
export const PROMO_CAMPAIGNS = {
    // Signature dishes for TV 4 (media from media.js, placeholders for now).
    'signature-dishes': {
        enabled: true,
        slides: [
            { id: 'kacchi', template: 'dish-showcase', dishId: 'beef-kachchi', eyebrow: 'Our Signature', duration: 10 },
            { id: 'chicken-roast', template: 'dish-showcase', dishId: 'chicken-roast', eyebrow: 'Our Signature', duration: 10 },
            { id: 'fuchka', template: 'dish-showcase', dishId: 'fuchka', eyebrow: 'Our Signature', duration: 10 },
        ],
    },
};
