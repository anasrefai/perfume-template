# Mood Perfume — Perfume Store Template

A static, front-end template for a luxury niche-perfume storefront, built with plain
HTML, CSS and vanilla JavaScript (no build step). Monochrome black & white theme.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero slider, best sellers, new arrivals, decants, coming soon, brands |
| `shop.html` | Product catalogue with filters, price range, sort and load-more |
| `product.html` | Product detail — `?slug=<product-slug>`, size tiers, add to cart |
| `cart.html` | Cart — quantities, line totals, subtotal |
| `checkout.html` | Checkout form (Formspree, demo mode until configured) |
| `wishlist.html` | Saved fragrances |
| `about.html` | Brand story, values, gallery |
| `tips.html` | Fragrance application & storage tips |
| `contact.html` | WhatsApp CTA + request form |

## Structure

```
css/app.css        Custom CSS on top of the Tailwind CDN utilities
img/               All site imagery (see "Images" below) — nothing is hotlinked
js/products.js     Product + brand data (19 products, 19 houses)
js/components.js   Shared constants (brand, WhatsApp, socials), product card, toast
js/cart.js         Cart + wishlist state (localStorage: mp_cart / mp_wish)
js/layout.js       Header/footer injection, SPA router, smooth scroll, parallax
js/home.js         Homepage init (hero slider, marquees, brand pager)
js/shop.js         Shop init (filters, price slider, sort, load more)
js/product.js      Product detail init
js/pages.js        About / tips / contact / wishlist / cart / checkout inits
```

All JS attaches to a single global, `window.MP`. Every page loads the scripts in the
same order and sets `<body data-page="…" data-init="…">` to select its init function.

## Images

Every image is served locally from `img/`. Nothing is loaded from an external CDN.
If a file is missing, `MP.imageFallback()` swaps in a dark placeholder tile rather than
showing a broken image, so the layout holds while assets are being produced.

| Path | Count | Used by | Ratio |
|------|-------|---------|-------|
| `img/logo.png` | 1 | header, drawer, footer, favicon, OG image | square, transparent |
| `img/hero-1…3.jpg` | 3 | homepage hero slider | wide (~16:9) |
| `img/parallax-banner.jpg` | 1 | "Design that captivates" | wide |
| `img/decant-1…4.jpg` | 4 | "Pure Decants" banner | wide |
| `img/niche-1…3.jpg` | 3 | Niche section backgrounds | wide |
| `img/decanting-explainer.jpg` | 1 | "What is Decanting?" | ~1:1 |
| `img/gallery-1…8.jpg` | 8 | footer marquee + About gallery | square |
| `img/products/<slug>.png` / `.webp` | 19 | product cards & detail | 3:4, transparent |

Product image filenames come from each product's `slug` in `js/products.js`.

## Configuration

Edit `js/components.js`:

```js
MP.BRAND = "Mood Perfume";
MP.WA    = "https://wa.me/962798784200";   // WhatsApp — used everywhere
MP.IG    = "https://www.instagram.com/mood_perfume_jo/";
MP.FB    = "https://www.facebook.com/profile.php?id=61590755106091";
```

Checkout posts to Formspree. Set `FORMSPREE_ENDPOINT` in `js/pages.js`; until then the
form runs in demo mode and makes no network request.

## Run locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Design system

- **Colors:** monochrome — `#000000` bg · `#0a0a0a` surface · `#ffffff` accent · `#cfcfcf` text
- **Type:** Playfair Display (display serif) · Poppins (body) · Tajawal (Arabic)
- **Motion:** hero crossfade slider, IntersectionObserver scroll-reveal, card hover
  effects, marquee gallery — all with `prefers-reduced-motion` support

## Notes

This is a template/demo project. Product names and brand marks belong to their respective
owners; supply your own catalogue and imagery before any public or commercial use.
