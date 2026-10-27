# Creative Art and Frame — Indian Art & Handcrafted Paintings Store

A premium gallery-style storefront for Pattachitra, palm leaf engravings, embroidered paintings, straw craft and canvas art.

Built with Next.js 16 (App Router, Cache Components), TypeScript, Tailwind CSS v4, Framer Motion, GSAP ScrollTrigger and Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## What's included

**Homepage (10 sections):** cinematic gallery hero with a lighting intro, dust particles and pointer parallax · heritage story with mask reveal · editorial collection panels with 3D tilt · a pinned, scroll-driven craftsmanship journey · signature artwork gallery with filters, quick view and wishlist · "Art in your space" masonry with room previews, a lightbox and an interactive **Explore in a Room** tool · why-choose cards · collection stories carousel · gifting and enquiry form (WhatsApp) · dark closing gallery and footer.

**Shop:** `/shop` with filters (category, handmade/print, price, style, size, availability, curated tags) synced to the URL · `/collections/[slug]` category landing pages · `/artwork/[slug]` product pages with detail views, magnifier, full-screen zoom, size variants, room preview, WhatsApp enquiry and related works · cart drawer and `/cart` · `/checkout` · `/wishlist`.

**Also:** search overlay, branded loader (once per session), magnetic CTAs, desktop cursor labels, reduced-motion support throughout, Product / Breadcrumb / Organization JSON-LD, sitemap and robots.

## Before launch — replace the demo content

| What | Where |
| --- | --- |
| Brand name, WhatsApp number, email, phone, address, socials, accepted payment methods | `src/lib/site.ts` (or `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_SITE_URL`) |
| Products — names, prices, sizes, stock, delivery times are **sample data** | `src/data/products.ts` |
| Product photography — current images are **Wikimedia Commons stand-ins** (see `/credits`); they show the crafts but are not the store's stock | `public/images/art/` + `src/data/art.ts` |
| Brand story (about page is a template) | `src/app/about/page.tsx`, `src/components/home/Heritage.tsx` |
| Shipping, returns, privacy and terms (bracketed placeholders) | `src/app/policies/[slug]/page.tsx` |
| Customer testimonials — add **genuine** reviews only; the section shows an invitation while empty | `src/data/stories.ts` |
| Services the business offers (custom work, framing, bulk, international) | `site.services` in `src/lib/site.ts` |

Once real photography replaces the stand-ins, delete the "Demo catalogue · Image credits" note in `src/components/layout/Footer.tsx` and the `/credits` page (or keep credits for any remaining licensed images).

### Adding product photos

Put a WebP (max ~2000 px on the long side) in `public/images/art/`, add an entry to `src/data/art.ts` with its real `width`/`height`, then reference the key from a product. `next/image` handles responsive sizes and AVIF/WebP.

## Payments

No payment gateway is connected. Checkout validates the customer's details and then opens WhatsApp with the full order for the store to confirm — **no payment is taken and no order is marked as paid**.

To connect a provider (Razorpay, Stripe, Shopify, Medusa…), implement `createCheckout` in `src/lib/commerce.ts` (ideally via a server route) and set `isPaymentConfigured = true`. The checkout button then redirects to the provider's payment page.

## Project map

```
src/app/                 routes (home, shop, collections, artwork, cart, checkout, wishlist, about, contact, policies, credits)
src/components/home/     the ten homepage sections
src/components/shop/     product card, quick view, gallery, purchase panel, filters, cart, checkout
src/components/rooms/    illustrated room mock-ups used for "view in a room"
src/components/layout/   header, footer, loader, search, WhatsApp button
src/components/motion/   smooth scroll, reveal, magnetic, cursor
src/data/                catalogue, categories, image registry, editorial stories
src/lib/                 site config, WhatsApp links, formatting, commerce integration point
```
