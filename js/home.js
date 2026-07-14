/* =========================================================================
   MOOD PERFUME homepage init  →  MP.pages.home()
   Called by the SPA router (layout.js) on first load and after each swap.
   Registers cleanups so timers/listeners don't stack across navigations.
   ========================================================================= */
window.MP = window.MP || {};
(function (MP) {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  MP.pages = MP.pages || {};

  function renderProducts() {
    const byTag = t => PRODUCTS.filter(p => p.tag === t);
    const best = byTag("Best Seller").slice(0, 4);
    $("#bestGrid").innerHTML = (best.length ? best : PRODUCTS.slice(0, 4)).map(p => MP.productCard(p, "Best Seller")).join("");

    const news = byTag("New Arrival").slice(0, 12);
    const newList = news.length ? news : PRODUCTS.slice(0, 8);
    const wrap = p => `<div class="w-[75vw] sm:w-[45vw] md:w-[30vw] lg:w-[23vw] xl:w-[19vw] flex-shrink-0">${MP.productCard(p, "New Arrival")}</div>`;
    $("#newTrack").innerHTML = newList.concat(newList).map(wrap).join("");

    const comingNames = ["Oud Zarian", "Carnal Flower", "Amber Aoud"];
    let coming = comingNames.map(n => PRODUCTS.find(p => p.name === n)).filter(Boolean);
    if (!coming.length) coming = PRODUCTS.filter(p => p.tag === "Coming Soon");
    $("#comingGrid").innerHTML = coming.map(p => MP.productCard(p, "Coming Soon")).join("");
  }

  function renderBrands() {
    const grid = $("#brandGrid"), pageEl = $("#brandPage"), pagesEl = $("#brandPages");
    const prev = $("#brandPrev"), next = $("#brandNext");
    if (!grid) return;
    const PER = 12, pages = Math.ceil(BRANDS.length / PER);
    let page = 0;
    pagesEl.textContent = pages;
    const initials = n => n.split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();
    function draw() {
      grid.innerHTML = BRANDS.slice(page * PER, page * PER + PER).map(b => `
        <a href="shop.html" class="group flex flex-col items-center justify-center gap-4 text-center p-6 min-h-[160px] rounded-2xl bg-black/20 border border-white/5 transition-all duration-500 hover:border-brand-accent hover:bg-brand-bg/30 hover:-translate-y-1">
          <span class="w-16 h-16 grid place-items-center rounded-full border border-brand-accent/40 font-serif text-2xl text-brand-accent transition-all duration-500 group-hover:bg-brand-accent group-hover:text-brand-bg group-hover:border-transparent">${initials(b.name)}</span>
          <h3 class="font-serif text-base text-white leading-tight">${b.name}</h3>
          <span class="text-[10px] uppercase tracking-[0.2em] text-brand-text/40">${b.count} scent${b.count > 1 ? "s" : ""}</span>
        </a>`).join("");
      pageEl.textContent = page + 1;
      prev.disabled = page === 0; next.disabled = page >= pages - 1;
    }
    prev.addEventListener("click", () => { if (page > 0) { page--; draw(); } });
    next.addEventListener("click", () => { if (page < pages - 1) { page++; draw(); } });
    draw();
  }

  function heroSlider() {
    const slides = $$(".hero-slide"), dotsWrap = $("#heroDots");
    if (!slides.length) return;
    let i = 0, timer;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    dotsWrap.innerHTML = slides.map((_, n) => `<button data-n="${n}" class="h-1.5 rounded-full transition-all duration-500 ${n === 0 ? "w-8 bg-brand-accent" : "w-4 bg-brand-accent/30"}" aria-label="Slide ${n + 1}"></button>`).join("");
    const dots = $$("button", dotsWrap);
    function go(n) {
      slides[i].style.opacity = "0"; slides[i].style.transform = "scale(1.1)"; slides[i].style.zIndex = "0";
      i = (n + slides.length) % slides.length;
      slides[i].style.opacity = "1"; slides[i].style.transform = "scale(1)"; slides[i].style.zIndex = "1";
      dots.forEach((d, k) => d.className = `h-1.5 rounded-full transition-all duration-500 ${k === i ? "w-8 bg-brand-accent" : "w-4 bg-brand-accent/30"}`);
    }
    slides.forEach((s, n) => { s.style.transform = n === 0 ? "scale(1)" : "scale(1.1)"; s.style.zIndex = n === 0 ? "1" : "0"; });
    function start() { if (reduce) return; clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); }
    $("#heroNext").addEventListener("click", () => { go(i + 1); start(); });
    $("#heroPrev").addEventListener("click", () => { go(i - 1); start(); });
    dots.forEach(d => d.addEventListener("click", () => { go(+d.dataset.n); start(); }));
    start();
    const onVis = () => document.hidden ? clearInterval(timer) : start();
    document.addEventListener("visibilitychange", onVis);
    MP.onCleanup(() => { clearInterval(timer); document.removeEventListener("visibilitychange", onVis); });
  }

  function decantsBanner() {
    const wrap = $("#decantSlides"); if (!wrap) return;
    const imgs = ["img/decant-1.png", "img/decant-2.png", "img/decant-3.png", "img/decant-4.png"];
    wrap.innerHTML = imgs.map((f, n) =>
      `<div class="absolute inset-0 w-full h-full transition-opacity ease-in-out" style="opacity:${n === 0 ? 1 : 0};transition-duration:1500ms;z-index:${n === 0 ? 1 : 0}"><img src="${f}" alt="Fragrance display ${n + 1}" class="w-full h-full object-cover" loading="lazy" data-ph="photo"></div>`).join("");
    const layers = $$(":scope > div", wrap);
    let i = 0;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => { layers[i].style.opacity = "0"; layers[i].style.zIndex = "0"; i = (i + 1) % layers.length; layers[i].style.opacity = "1"; layers[i].style.zIndex = "1"; }, 4000);
    MP.onCleanup(() => clearInterval(t));
  }

  function nicheScrollCrossfade() {
    const section = $("#niche"); if (!section) return;
    const layers = $$(".niche-bg", section);
    if (!layers.length) return;
    let ticking = false;
    function update() {
      ticking = false;
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      const active = Math.min(layers.length - 1, Math.floor(progress * layers.length));
      layers.forEach((l, idx) => { l.style.opacity = idx === active ? "1" : "0"; l.style.transform = idx === active ? "scale(1)" : "scale(1.15)"; });
    }
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    MP.onCleanup(() => window.removeEventListener("scroll", onScroll));
  }

  MP.pages.home = function () {
    renderProducts();
    renderBrands();
    heroSlider();
    decantsBanner();
    nicheScrollCrossfade();
  };
})(window.MP);
