# Sole Whiff — Perfume Store Template

A static, front-end template for a luxury niche-perfume storefront, built with plain
HTML, CSS and vanilla JavaScript (no build step). Created as a design study/template.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — hero slider, best sellers, new arrivals, decants, coming soon, brands, testimonials |
| `shop.html` | Product catalogue with filters, sort and load-more |
| `about.html` | Brand story, values, gallery |
| `tips.html` | Fragrance application & storage tips |
| `contact.html` | WhatsApp CTA + request form |

## Structure

```
css/style.css     Design system (tokens, components, responsive)
js/main.js        Shared header/footer, hero slider, scroll reveal, wishlist, etc.
js/products.js    Product/brand data module
```

## Run locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Design system

- **Colors:** deep teal `#1D4648` + warm gold on near-black
- **Type:** Playfair Display (display serif) · Poppins (body) · Tajawal (Arabic)
- **Motion:** hero crossfade slider, IntersectionObserver scroll-reveal, card hover
  effects, marquee gallery — all with `prefers-reduced-motion` support

## Notes

This is a learning/template project. Product imagery and brand assets referenced here
belong to their respective owners — replace them with your own before any public/commercial use.
