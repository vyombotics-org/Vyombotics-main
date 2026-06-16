# Roadmap — step by step

Main aapko 4 phases me deliver karunga. Har phase ek turn me ho jayega.

## Phase A — Polish & Discoverability (no external setup needed)

Mai abhi shuru kar sakta hoon.

1. **Courses page me search + filters** — keyword search, category, price range, level
2. **Better landing page** — proper hero, features, faculty section, testimonials, FAQ refresh, course preview grid
3. **Mobile responsive audit** — sab routes mobile pe theek karna
4. **Coupon/discount codes** — admin create, student apply at checkout

## Phase B — Instructor tools

5. **Instructor analytics dashboard** — revenue, enrollment trend, top batches, student engagement
6. **Better seed data** — 3-4 realistic courses with varied batches

## Phase C — Email notifications (needs ek choti si user action)

7. **Lovable Emails** — domain setup dialog appear hoga (aap apna email subdomain configure karenge, ~2 min). Phir mai integrate karunga:
   - Welcome email on signup
   - Payment confirmation
   - Live class reminder (1 hr before)
   - New discussion reply
   - Batch expiry warning (3 days before)
   - Certificate issued

## Phase D — Payments & Video (needs user-provided keys)

8. **Real Razorpay payments** — aap Razorpay account banayenge, mujhe Key ID + Secret denge, mai checkout + webhook integrate karunga
9. **Video upload to Cloud storage** — abhi external URL paste karna padta hai; direct upload + signed playback (no extra creds needed actually, ye Phase A ke saath ho sakta hai)

## Out of scope (separate ask karna padega)

- Native live streaming (LiveKit/Daily — paid third-party, dedicated setup)
- Marketing/newsletter emails (Lovable doesn't support; alag service chahiye)

## Execution order

Mai sequentially turn-by-turn karunga:

- **Turn 1 (abhi)**: Phase A (#1-4)
- **Turn 2**: Phase B (#5-6) + Phase D #9 (video upload)
- **Turn 3**: Phase C setup — domain dialog dikhaunga, configure karne ke baad templates + triggers
- **Turn 4**: Phase D #8 — jab aap Razorpay keys dene ko ready ho

Confirm karo to Turn 1 start karu, ya koi phase skip/reorder karna h?
