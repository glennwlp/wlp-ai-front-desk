# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: owners and managers of small, appointment-based local businesses (barbers and salons, clinics and practices, studios and local services). Their day is a calendar of customers; they are often working with their hands or with the client in front of them, and many have no receptionist. Questions and booking requests arrive after hours and go unanswered until the next morning, by which time some customers have booked elsewhere. Their job: get every customer question answered and booked without being on the phone.

Secondary: agencies setting it up for several clients, and multi-location businesses (served by the Custom tier, not the primary audience).

## Product Purpose

AI Front Desk by WhitelabelPRESS is an AI assistant that lives on a business's website and handles a customer conversation from first question to booked appointment: answers questions from the business's own documents, books into the connected calendar, sends reminders, and hands off to a person when needed. Success for the owner: no question goes unanswered after hours, and bookings land in the calendar by morning.

The product is pre-launch. The current site's job is to explain the product and collect leads through the contact form (`#contact`, `POST /api/contact`).

## Positioning

One continuous conversation instead of separate tools: the same assistant answers, books, reminds, and hands off, in a single thread. It answers only from what the business has given it, and it only offers times that are actually free.

## Operating Context

- Setup: upload FAQs, price list, and policies (or point it at the existing website); connect a calendar with services, durations, and opening hours; paste one widget snippet into WordPress, Shopify, Wix, or any site; set widget colours to match the brand. Pitched as "set up in an afternoon, no code."
- Daily use: the owner checks a dashboard inbox of conversations, bookings, and handoffs when they choose to.
- Handoff: when a question needs a person, the assistant says so and passes the full conversation to the team.

## Capabilities and Constraints

- Launch channel is website chat only. Messenger, WhatsApp, and Instagram are planned and must be described as coming later, never as live.
- English only for now.
- Plans: Starter (chat, trained on documents, email handoff, history), Growth (adds calendar booking, reminders, live handoff, future channels), Custom (multi-location, widget branding, setup help; "coming soon").
- Prices: Starter $19 (500 conversations/mo), Standard $35 (1,000, includes booking), Growth $59 and Pro $99 later; care plan add-on $7 (300). Setup $149, or $299 with booking; free for early customers. Early customers keep launch price.
- Undecided: launch date, Privacy and Terms pages (links currently inert).
- Site stack: Astro + Tailwind 4, static build served by a Cloudflare Worker, which also hosts the contact endpoint (Turnstile, Notion row, Apps Script email). Page is currently `noindex`.

## Brand Commitments

- Name: "AI Front Desk", by WhitelabelPRESS. Contact address: glenn@whitelabelpress.com.
- Voice (from current copy): plain, concrete, owner-to-owner. Short sentences, specific examples (a haircut is $38, Sam has 9:30), no AI hype or jargon.

## Evidence on Hand

- Imagery: `src/assets/img/` (hero-barber, barber, dental, owner) photos.
- Customer quotes in the "Made for businesses that run on appointments" section are sample text for layout, marked on the page as such. No real customers, testimonials, usage numbers, or confirmed prices exist yet; do not present any as real.
- Proof stats (24/7, replies in seconds, one inbox) describe product behaviour, not measured results.

## Product Principles

1. Show the conversation, not the claim: concrete example exchanges carry the argument better than feature lists.
2. Honest about stage: pre-launch facts stay unconfirmed until they are real (prices, channels, customers).
3. Owner's time first: everything should read as less work for someone with no receptionist.
4. The human stays in control: handoff and the dashboard are part of the promise, not an afterthought.
