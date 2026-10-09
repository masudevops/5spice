# Spec 4: Catering inquiry form + notifications

**Status:** Deferred — explicitly parked by the owner (2026-10-07) pending
bandwidth. Written now so the approach is decided and ready to pick up,
not because it's scheduled.
**Type:** Feature
**Depends on:** nothing

## Why

`Catering.jsx` today only offers a `mailto:` link ("Email Catering Request").
That works but loses structure — no guaranteed event date, guest count, or
contact info, and no record on the 5Spice side unless the sender's email
client cooperates. A real form that captures the essentials and notifies the
team would convert better and give cleaner leads.

The owner's instruction: do this if it's low complexity, otherwise defer.
Verdict after scoping below: a real form is low complexity *if* built on a
static-friendly third-party form backend; it gets noticeably more complex if
built on a serverless function, especially given the pending Azure move
(Spec 3) which would otherwise force a second migration of that function
later. That's why this is deferred rather than attempted now, and why the
recommendation below is the one to use whenever it's picked back up.

## Goal (when this is picked up)

Replace the `mailto:` link with a real `<form>` on `/catering` that captures
event details and sends the 5Spice team a notification on submit — without
adding a backend, and without anything that breaks when Spec 3 (Azure
migration) happens.

## Recommended approach: static-friendly form backend

Use a third-party form endpoint (e.g. Web3Forms, Formspree, or similar) that
the form `POST`s to directly from the browser. The service emails
`info@5spicemarket.com` (CLAUDE.md §5) on each submission.

Why this over a serverless function:

- Zero backend code to write, host, or migrate — the form posts to the same
  external URL regardless of whether the site is on Vercel or Azure Static
  Web Apps, so Spec 3 doesn't touch this at all.
- Matches the existing site philosophy — no native checkout/backend yet
  (CLAUDE.md §4), everything routes to a third party.
- Free tier is enough for catering-inquiry volume.

Trade-off: email formatting/branding is controlled by the third-party
service's template, not fully custom, and there's an external dependency
for a business-critical notification path (mitigate with the fallback
below).

### Form fields (draft — confirm with Branding & Marketing before building)

- Name (required)
- Email and/or phone (at least one required)
- Event date (required)
- Guest count (required)
- Event type (dropdown: wedding, office lunch, community event, other — ties
  into the existing "Catering Details" / "Office Lunch Program" split
  already on the page)
- Message / details (optional free text)
- Location preference, if more than one location has `flags.hasCatering`
  (currently both Plano and Murphy do)

### Fallback

Keep the `mailto:` link visible as a secondary option ("or email us
directly") in case the form service has an outage — low effort, and avoids
a single point of failure for a lead-generation path.

### What NOT to do

- Don't invent response-time promises ("we'll respond within 24 hours")
  unless Branding & Marketing confirms that's accurate (CLAUDE.md §10: no
  made-up claims).
- Don't build a serverless-function version "to have more control" unless
  Spec 3 has already landed and the hosting target is settled — otherwise
  it's work that gets redone.

## Non-goals

- No lead-management dashboard or CRM integration — just a notification
  email, matching "basic form" as requested.
- No SMS/Slack notification in the first version — email only, matching
  `CONTACT.email` already in use elsewhere on the site.

## Acceptance criteria (for whenever this is built)

- [ ] Form fields confirmed with Branding & Marketing (no invented copy).
- [ ] Submitting the form sends a notification to `info@5spicemarket.com`
      and shows the user a clear success state.
- [ ] Submitting with missing required fields shows inline validation,
      not a silent failure.
- [ ] `mailto:` fallback remains visible on the page.
- [ ] Works identically regardless of host (manually verified on both
      Vercel and, once it exists, the Azure Static Web Apps deployment).
- [ ] No new secrets committed to the repo; any API key/endpoint ID is in
      `client/.env` and documented in `.env.example` per CLAUDE.md §6.
