/* =========================================================================
   MOOD PERFUME — shared components & helpers (used by every page)
   Exposes window.MP  { BRAND, WA, IG, FB, BADGE, money, priceStr, sizeTiers,
                        productCard, toast, reveal }
   ========================================================================= */
window.MP = window.MP || {};
(function (MP) {
  "use strict";

  MP.BRAND = "Mood Perfume";
  MP.WA = "https://wa.me/962798784200";
  MP.IG = "https://www.instagram.com/mood_perfume_jo/";
  MP.FB = "https://www.facebook.com/profile.php?id=61590755106091";

  /* "Scent Inspirations" gallery — shared by the footer marquee and the
     About page grid. Square (1:1) source images. */
  MP.GALLERY = Array.from({ length: 8 }, (_, i) => `img/${i + 1}.jpg`);

  /* badge variants — monochrome: solid white pill for the headline tags,
     outlined dark pill for New Arrival so the three stay distinguishable. */
  MP.BADGE = {
    "Best Seller": 'bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full shadow-2xl backdrop-blur-xl border border-white/10',
    "New Arrival": 'bg-brand-dark/80 text-brand-accent text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-brand-accent/40 backdrop-blur-md',
    "Coming Soon": 'bg-brand-accent text-brand-dark text-[8px] font-black uppercase tracking-widest px-3 py-2 rounded-full shadow-2xl backdrop-blur-xl border border-white/10'
  };

  MP.money = n => Number(n).toFixed(2);
  MP.priceStr = p => (p.low == null ? "" : `( ${MP.money(p.low)} - ${MP.money(p.high)} ) JOD`);

  /* size/variant tiers derived from a product's price range.
     A decant store sells small vials up to the full bottle; the low price is
     the smallest decant, the high price is the full bottle. */
  MP.sizeTiers = function (p) {
    if (p.low == null) return [];
    const lo = p.low, hi = p.high, span = hi - lo;
    const mk = (label, price) => ({ label, price: Math.round(price * 100) / 100 });
    return [
      mk("2 ml", lo),
      mk("5 ml", lo + span * 0.10),
      mk("10 ml", lo + span * 0.22),
      mk("30 ml", lo + span * 0.52),
      mk("Full Bottle", hi)
    ];
  };

  MP.productHref = p => `product.html?slug=${encodeURIComponent(p.slug)}`;

  /* programmatic navigation that still plays the page-fade transition */
  MP.navigate = function (href) {
    if ("startViewTransition" in document) { location.href = href; return; }
    document.body.classList.add("page-fade-out");
    setTimeout(() => { location.href = href; }, 240);
  };

  /* product card — glass tile, badge, hover reveal + a wishlist heart.
     Clicking the tile opens the product detail page. */
  MP.productCard = function (p, tag) {
    const t = tag || p.tag;
    const cta = t === "Coming Soon" ? "Book Now" : "View Details";
    const ctaSize = t === "Coming Soon" ? "text-[8px]" : "text-[10px]";
    const badge = t && MP.BADGE[t]
      ? `<div class="absolute top-6 left-6 z-30 pointer-events-none"><span class="${MP.BADGE[t]}">${t}</span></div>` : "";
    const wished = MP.wish && MP.wish.has(p.id);
    const heart = `<button type="button" data-wish="${p.id}" aria-label="Toggle wishlist for ${p.name}" class="wish-btn absolute top-5 right-5 z-40 w-10 h-10 grid place-items-center rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white/90 hover:text-red-400 transition-all duration-300${wished ? " is-wished" : ""}"><i class="${wished ? "fas" : "far"} fa-heart"></i></button>`;
    const href = MP.productHref(p);
    return `
    <a href="${href}" class="group relative flex flex-col items-center no-underline" aria-label="View details for ${p.name}">
      <div class="relative w-full aspect-[3/4] mb-6 rounded-[2rem] overflow-hidden glass border border-white/5 transition-all duration-700 group-hover:border-brand-accent/40 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] bg-brand-bg/10">
        ${badge}${heart}
        <div class="absolute inset-0 flex items-center justify-center p-8 cursor-zoom-in z-20">
          <div class="absolute w-48 h-48 bg-brand-accent/5 rounded-full blur-[70px] opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <img src="${p.img}" alt="${p.name}" class="relative z-10 w-full h-full object-contain transition-all duration-1000 ease-out group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" loading="lazy" data-ph="bottle">
        </div>
        <div class="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end p-8 z-30">
          <span class="px-8 py-3 bg-brand-accent text-brand-dark font-black uppercase tracking-[0.2em] ${ctaSize} transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 group-hover:bg-white shadow-2xl rounded-full w-fit mb-4">${cta}</span>
        </div>
      </div>
      <div class="text-center px-4">
        <p class="text-brand-accent/70 text-xs uppercase tracking-[0.3em] mb-2">${p.brand}</p>
        <h3 class="font-serif text-xl md:text-2xl text-white mb-2">${p.name}</h3>
        ${p.low != null ? `<p class="text-brand-text/60 text-sm tabular-nums">${MP.priceStr(p)}</p>` : ""}
      </div>
    </a>`;
  };

  /* toast (bottom-center) */
  let toastEl, toastT;
  MP.toast = function (msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "fixed left-1/2 bottom-8 z-[300] -translate-x-1/2 translate-y-32 flex items-center gap-3 bg-brand-dark border border-brand-accent text-brand-text px-6 py-3 rounded-lg shadow-2xl text-sm transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]";
      toastEl.setAttribute("role", "status");
      toastEl.setAttribute("aria-live", "polite");
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = `<i class="fas fa-check text-brand-accent"></i><span>${msg}</span>`;
    toastEl.style.transform = "translate(-50%,0)";
    clearTimeout(toastT);
    toastT = setTimeout(() => { toastEl.style.transform = "translate(-50%,8rem)"; }, 3000);
  };

  /* scroll reveal — idempotent; call after inserting dynamic .scroll-animate */
  MP.reveal = function () {
    const els = [...document.querySelectorAll(".scroll-animate:not([data-revealed])")];
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visible")); return; }
    if (!MP._io) {
      MP._io = new IntersectionObserver((ents, io) => {
        ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    }
    els.forEach(e => { e.setAttribute("data-revealed", ""); MP._io.observe(e); });
  };

  /* ---------------------------------------------------------------------
     Local-image fallback. Every image on this site is served from ./img/.
     Until the real files are dropped in, a missing file must degrade to a
     dark placeholder tile rather than a broken-image glyph — and must never
     fall back to a remote CDN. Registered once, capture phase, because
     `error` does not bubble.
     --------------------------------------------------------------------- */
  const PH_ICON = { bottle: "fa-spray-can-sparkles", photo: "fa-image", logo: "fa-wind" };

  function toPlaceholder(img) {
    if (!img || img.tagName !== "IMG" || img.dataset.phDone) return;
    img.dataset.phDone = "1";
    const kind = img.dataset.ph || "photo";
    const ph = document.createElement("span");
    ph.className = "img-ph " + (img.className || "");
    ph.setAttribute("role", "img");
    ph.setAttribute("aria-label", img.alt || "Image placeholder");
    ph.innerHTML = `<i class="fas ${PH_ICON[kind] || PH_ICON.photo}" aria-hidden="true"></i>`;
    if (img.style.cssText) ph.style.cssText = img.style.cssText;
    img.replaceWith(ph);
  }

  /* Images already in the parsed HTML can fail *before* DOMContentLoaded fires,
     so their error event is missed by the listener below. Sweep for those:
     a finished image with no intrinsic width has failed. (Lazy images that
     haven't started yet report complete === false and are left to the listener.) */
  MP.sweepImages = function (scope) {
    (scope || document).querySelectorAll("img:not([data-ph-done])").forEach(img => {
      if (img.complete && img.naturalWidth === 0) toPlaceholder(img);
    });
  };

  MP.imageFallback = function () {
    if (MP._imgFb) return;
    MP._imgFb = true;
    document.addEventListener("error", e => toPlaceholder(e.target), true);
    MP.sweepImages();
  };
})(window.MP);
