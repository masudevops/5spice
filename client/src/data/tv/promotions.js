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
            { id: 'kacchi', template: 'dish-spotlight', dishId: 'beef-kachchi', eyebrow: 'Biriyani & Rice', duration: 10 },
            { id: 'chicken-roast', template: 'dish-spotlight', dishId: 'chicken-roast', eyebrow: 'Curries & Specialties', duration: 10 },
            { id: 'fuchka', template: 'dish-spotlight', dishId: 'fuchka', eyebrow: 'Snacks', duration: 10 },
        ],
    },
};
