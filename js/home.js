/* =========================================================================
   SOLE WHIFF homepage — 1:1 interaction layer (matches live solewhiff.com)
   Depends on js/products.js (PRODUCTS, BRANDS)
   ========================================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const WA = "https://wa.me/962795634234";
  const CDN = "https://cdn.shopify.com/s/files/1/0979/7206/0241/files/";

  /* ---------- badge variants (exact live classes) ---------- */
  const BADGE = {
    "Best Seller": 'bg-brand-accent text-brand-dark text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-full shadow-2xl backdrop-blur-xl border border-white/10',
    "New Arrival": 'bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg border border-white/10 backdrop-blur-md',
    "Coming Soon": 'bg-brand-accent text-brand-dark text-[8px] font-black uppercase tracking-widest px-3 py-2 rounded-full shadow-2xl backdrop-blur-xl border border-white/10'
  };

  function money(n) { return Number(n).toFixed(2); }
  function priceStr(p) {
    if (p.low == null) return "";
    return `( ${money(p.low)} - ${money(p.high)} ) JOD`;
  }

  /* ---------- product card (exact live structure) ---------- */
  function card(p, tag) {
    const t = tag || p.tag;
    const cta = t === "Coming Soon" ? "Book Now" : "View Details";
    const ctaSize = t === "Coming Soon" ? "text-[8px]" : "text-[10px]";
    const badge = t && BADGE[t]
      ? `<div class="absolute top-6 left-6 z-30 pointer-events-none"><span class="${BADGE[t]}">${t}</span></div>` : "";
    return `
    <div class="group relative flex flex-col items-center">
      <div class="relative w-full aspect-[3/4] mb-6 rounded-[2rem] overflow-hidden glass border border-white/5 transition-all duration-700 group-hover:border-brand-accent/40 group-hover:-translate-y-4 group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] bg-brand-bg/10">
        ${badge}
        <div class="absolute inset-0 flex items-center justify-center p-8 cursor-zoom-in z-20">
          <div class="absolute w-48 h-48 bg-brand-accent/5 rounded-full blur-[70px] opacity-40 group-hover:opacity-100 transition-opacity duration-1000"></div>
          <img src="${p.img}" alt="${p.name}" class="relative z-10 w-full h-full object-contain transition-all duration-1000 ease-out group-hover:scale-110 grayscale-[0.1] group-hover:grayscale-0 drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]" loading="lazy">
        </div>
        <div class="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end p-8 z-30">
          <a href="${WA}" class="px-8 py-3 bg-brand-accent text-brand-dark font-black uppercase tracking-[0.2em] ${ctaSize} transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 hover:bg-white shadow-2xl rounded-full w-fit mb-4">${cta}</a>
        </div>
      </div>
      <div class="text-center px-4">
        <p class="text-brand-accent/70 text-xs uppercase tracking-[0.3em] mb-2">${p.brand}</p>
        <h3 class="font-serif text-xl md:text-2xl text-white mb-2">${p.name}</h3>
        ${p.low != null ? `<p class="text-brand-text/60 text-sm tabular-nums">${priceStr(p)}</p>` : ""}
      </div>
    </div>`;
  }

  /* ---------- render sections ---------- */
  function renderProducts() {
    const byTag = t => PRODUCTS.filter(p => p.tag === t);

    // Best sellers: 4
    const best = (byTag("Best Seller").slice(0, 4));
    const bestList = best.length ? best : PRODUCTS.slice(0, 4);
    $("#bestGrid").innerHTML = bestList.map(p => card(p, "Best Seller")).join("");

    // New arrivals marquee: 12 unique, duplicated for seamless loop
    const news = byTag("New Arrival").slice(0, 12);
    const newList = news.length ? news : PRODUCTS.slice(4, 16);
    const cardWrap = p => `<div class="w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[23vw] xl:w-[19vw] flex-shrink-0">${card(p, "New Arrival")}</div>`;
    $("#newTrack").innerHTML = newList.concat(newList).map(cardWrap).join("");

    // Coming soon: 5 (from known names, fallback to any)
    const comingNames = ["Strange Heavens Out Of The Blue", "Wild Vetiver", "Promise", "Basso", "Torino 21"];
    let coming = comingNames.map(n => PRODUCTS.find(p => p.name === n)).filter(Boolean);
    if (coming.length < 5) coming = PRODUCTS.slice(20, 25);
    $("#comingGrid").innerHTML = coming.map(p => card(p, "Coming Soon")).join("");
  }

  /* ---------- brands grid + pagination ---------- */
  function renderBrands() {
    const grid = $("#brandGrid"), pageEl = $("#brandPage"), pagesEl = $("#brandPages");
    const prev = $("#brandPrev"), next = $("#brandNext");
    const PER = 12;
    const pages = Math.ceil(BRANDS.length / PER);
    let page = 0;
    pagesEl.textContent = pages;

    function initials(name) {
      return name.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
    }
    function draw() {
      const slice = BRANDS.slice(page * PER, page * PER + PER);
      grid.innerHTML = slice.map(b => `
        <a href="shop.html" class="group flex flex-col items-center justify-center gap-4 text-center p-6 min-h-[160px] rounded-2xl bg-black/20 border border-white/5 transition-all duration-500 hover:border-brand-accent hover:bg-brand-bg/30 hover:-translate-y-1">
          <span class="w-16 h-16 grid place-items-center rounded-full border border-brand-accent/40 font-serif text-2xl text-brand-accent transition-all duration-500 group-hover:bg-brand-accent group-hover:text-brand-bg group-hover:border-transparent">${initials(b.name)}</span>
          <h3 class="font-serif text-base text-white leading-tight">${b.name}</h3>
          <span class="text-[10px] uppercase tracking-[0.2em] text-brand-text/40">${b.count} scents</span>
        </a>`).join("");
      pageEl.textContent = page + 1;
      prev.disabled = page === 0;
      next.disabled = page >= pages - 1;
    }
    prev.addEventListener("click", () => { if (page > 0) { page--; draw(); } });
    next.addEventListener("click", () => { if (page < pages - 1) { page++; draw(); } });
    draw();
  }

  /* ---------- scent inspirations gallery marquee ---------- */
  function renderGallery() {
    const files = [
      "69e0b641-daf1-442a-b6cd-a15c62d70af5_800x.jpg?v=1761563976",
      "WhatsApp_Image_2025-10-28_at_08.48.45_1_800x.jpg?v=1761630734",
      "WhatsApp_Image_2025-10-28_at_08.48.45_2_800x.jpg?v=1761630735",
      "WhatsApp_Image_2025-10-28_at_08.48.45_3_800x.jpg?v=1761630735",
      "WhatsApp_Image_2025-10-28_at_08.48.45_800x.jpg?v=1761630734",
      "WhatsApp_Image_2025-10-28_at_08.48.46_1_800x.jpg?v=1761630734",
      "WhatsApp_Image_2025-10-28_at_08.48.46_2_800x.jpg?v=1761630734"
    ];
    const tile = f => `<div class="flex-shrink-0"><img src="${CDN}${f}" alt="Scent inspiration" class="h-40 w-52 object-cover rounded-xl border border-white/5" loading="lazy"></div>`;
    $("#galleryTrack").innerHTML = files.concat(files).map(tile).join("");
  }

  /* ---------- hero slider (crossfade + scale, like live 2000ms) ---------- */
  function heroSlider() {
    const slides = $$(".hero-slide");
    const dotsWrap = $("#heroDots");
    let i = 0, timer;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    dotsWrap.innerHTML = slides.map((_, n) =>
      `<button data-n="${n}" class="h-1.5 rounded-full transition-all duration-500 ${n === 0 ? "w-8 bg-brand-accent" : "w-4 bg-brand-accent/30"}" aria-label="Slide ${n + 1}"></button>`).join("");
    const dots = $$("button", dotsWrap);

    function go(n) {
      slides[i].style.opacity = "0";
      slides[i].style.transform = "scale(1.1)";
      slides[i].style.zIndex = "0";
      i = (n + slides.length) % slides.length;
      slides[i].style.opacity = "1";
      slides[i].style.transform = "scale(1)";
      slides[i].style.zIndex = "1";
      dots.forEach((d, k) => {
        d.className = `h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-brand-accent" : "w-4 bg-brand-accent/30"}`;
      });
    }
    slides.forEach((s, n) => { s.style.transform = n === 0 ? "scale(1)" : "scale(1.1)"; s.style.zIndex = n === 0 ? "1" : "0"; });
    function start() { if (reduce) return; clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); }
    $("#heroNext").addEventListener("click", () => { go(i + 1); start(); });
    $("#heroPrev").addEventListener("click", () => { go(i - 1); start(); });
    dots.forEach(d => d.addEventListener("click", () => { go(+d.dataset.n); start(); }));
    start();
    document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : start());
  }

  /* ---------- pure decants crossfade banner ---------- */
  function decantsBanner() {
    const wrap = $("#decantSlides");
    const imgs = ["decant11.png?v=1769890976", "decant13.png?v=1769893670", "decant12.png?v=1769893670", "decant14.png?v=1769894241"];
    wrap.innerHTML = imgs.map((f, n) =>
      `<div class="absolute inset-0 w-full h-full transition-opacity ease-in-out" style="opacity:${n === 0 ? 1 : 0};transition-duration:1500ms;z-index:${n === 0 ? 1 : 0}">
        <img src="${CDN}${f}&width=1600" alt="Fragrance display ${n + 1}" class="w-full h-full object-cover" loading="lazy"></div>`).join("");
    const layers = $$("div", wrap).filter(d => d.style.transitionDuration);
    let i = 0;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setInterval(() => {
      layers[i].style.opacity = "0"; layers[i].style.zIndex = "0";
      i = (i + 1) % layers.length;
      layers[i].style.opacity = "1"; layers[i].style.zIndex = "1";
    }, 4000);
  }

  /* ---------- scroll reveal ---------- */
  function scrollReveal() {
    const els = $$(".scroll-animate");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("visible")); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
  }

  /* ---------- sticky header transparent -> solid ---------- */
  function stickyHeader() {
    const hdr = $("#hdr");
    const onScroll = () => {
      if (window.scrollY > 40) {
        hdr.classList.add("bg-brand-dark/95", "backdrop-blur-md", "shadow-lg", "shadow-black/20", "py-2");
        hdr.classList.remove("py-4", "bg-transparent");
      } else {
        hdr.classList.remove("bg-brand-dark/95", "backdrop-blur-md", "shadow-lg", "shadow-black/20", "py-2");
        hdr.classList.add("py-4", "bg-transparent");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- mobile drawer ---------- */
  function drawer() {
    const d = $("#drawer"), bd = $("#drawerBd");
    const open = () => { d.classList.remove("translate-x-full"); bd.classList.remove("opacity-0", "invisible"); document.body.style.overflow = "hidden"; };
    const close = () => { d.classList.add("translate-x-full"); bd.classList.add("opacity-0", "invisible"); document.body.style.overflow = ""; };
    $("#burger").addEventListener("click", open);
    $("#drawerClose").addEventListener("click", close);
    bd.addEventListener("click", close);
    $$("#drawer a").forEach(a => a.addEventListener("click", close));
  }

  /* ---------- back to top ---------- */
  function backToTop() {
    const b = $("#toTop");
    b.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => {
      const on = window.scrollY > 700;
      b.classList.toggle("opacity-0", !on);
      b.classList.toggle("invisible", !on);
      b.classList.toggle("translate-y-3", !on);
    }, { passive: true });
  }

  // QA-only: ?flat=1 collapses full-viewport sections so the whole page can be captured in one screenshot
  function flatMode() {
    if (!/[?&]flat=1/.test(location.search)) return;
    const s = document.createElement("style");
    s.textContent = "#hero{height:640px!important}#niche{min-height:620px!important}" +
      "section.min-h-\\[80vh\\]{min-height:520px!important}" +
      ".h-\\[90vh\\]{height:560px!important}.scroll-animate{opacity:1!important;transform:none!important}";
    document.head.appendChild(s);
  }

  document.addEventListener("DOMContentLoaded", () => {
    flatMode();
    renderProducts();
    renderBrands();
    renderGallery();
    heroSlider();
    decantsBanner();
    stickyHeader();
    drawer();
    scrollReveal();
    backToTop();
  });
})();
