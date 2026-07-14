/* =========================================================================
   MOOD PERFUME shop init  →  MP.pages.shop()
   Filter pills, sort, load-more, and a slide-in Filter drawer that holds the
   dual-handle price slider + a per-brand checkbox list (live filtering).
   ========================================================================= */
window.MP = window.MP || {};
(function (MP) {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  MP.pages = MP.pages || {};

  const PAGE = 16;
  const tagFor = { best: "Best Seller", new: "New Arrival", coming: "Coming Soon" };
  const ACTIVE = "bg-brand-accent text-brand-dark border-transparent";
  const IDLE = "text-brand-text/70 hover:text-brand-accent hover:border-brand-accent";

  MP.pages.shop = function () {
    const grid = $("#shopGrid");
    if (!grid) return;

    const withPrice = PRODUCTS.filter(p => p.low != null);
    const LO = Math.floor(Math.min(...withPrice.map(p => p.low)));
    const HI = Math.ceil(Math.max(...withPrice.map(p => p.high)));

    let filter = new URLSearchParams(location.search).get("f") || "all";
    let sort = "feat";
    let shown = PAGE;
    let pMin = LO, pMax = HI;
    const selectedBrands = new Set();      // empty = all brands
    let paintSlider = () => {};            // hoisted out of initSlider() so Clear all can repaint

    function list() {
      let items = PRODUCTS.slice();
      if (filter !== "all") items = items.filter(p => p.tag === tagFor[filter]);
      if (selectedBrands.size) items = items.filter(p => selectedBrands.has(p.brand));
      items = items.filter(p => p.low == null ? false : (p.low <= pMax && p.high >= pMin));
      if (sort === "az") items.sort((a, b) => a.name.localeCompare(b.name));
      else if (sort === "lo") items.sort((a, b) => a.low - b.low);
      else if (sort === "hi") items.sort((a, b) => b.high - a.high);
      return items;
    }
    function activeCount() {
      return selectedBrands.size + ((pMin > LO || pMax < HI) ? 1 : 0);
    }
    function updateBadge() {
      const badge = $("#filterBadge");
      if (!badge) return;
      const n = activeCount();
      badge.textContent = n;
      badge.style.display = n ? "grid" : "none";
    }
    function paintPills() {
      $$("#filterPills .pill").forEach(b => {
        const on = b.dataset.filter === filter;
        b.className = "pill px-5 py-2.5 rounded-full text-xs uppercase tracking-[0.15em] border border-brand-accent/30 transition-all duration-300 " + (on ? ACTIVE : IDLE);
      });
    }
    function draw() {
      const items = list();
      grid.innerHTML = items.slice(0, shown).map(p => MP.productCard(p)).join("") ||
        `<p class="col-span-full text-center text-brand-text/60 py-16">No fragrances match these filters.</p>`;
      $("#shopCount").textContent = items.length + " product(s) found";
      const rc = $("#filterResultCount");
      if (rc) rc.textContent = items.length + " result(s)";
      $("#loadMore").parentElement.style.display = shown >= items.length ? "none" : "block";
      updateBadge();
      MP.reveal();
    }
    function initSlider() {
      const min = $("#priceMin"), max = $("#priceMax"), fill = $("#priceFill"), label = $("#priceLabel");
      if (!min || !max) return;
      [min, max].forEach(s => { s.min = LO; s.max = HI; s.step = 1; });
      min.value = pMin; max.value = pMax;
      const pct = v => ((v - LO) / (HI - LO)) * 100;
      paintSlider = () => { label.textContent = `${pMin} – ${pMax} JOD`; fill.style.left = pct(pMin) + "%"; fill.style.right = (100 - pct(pMax)) + "%"; };
      function onInput() {
        let a = +min.value, b = +max.value;
        if (a > b - 5) { if (document.activeElement === min) { a = b - 5; min.value = a; } else { b = a + 5; max.value = b; } }
        pMin = a; pMax = b; shown = PAGE; paintSlider(); draw();
      }
      min.addEventListener("input", onInput);
      max.addEventListener("input", onInput);
      paintSlider();
    }
    function initBrands() {
      const host = $("#brandList");
      if (!host) return;
      host.innerHTML = BRANDS.map(b => `
        <label class="flex items-center gap-3 py-2 cursor-pointer group">
          <input type="checkbox" class="brand-cb peer sr-only" value="${b.name}">
          <span class="w-[18px] h-[18px] rounded border border-brand-accent/40 grid place-items-center shrink-0 transition-colors peer-checked:bg-brand-accent peer-checked:border-brand-accent peer-checked:[&>i]:opacity-100">
            <i class="fas fa-check text-[9px] text-brand-bg opacity-0 transition-opacity"></i>
          </span>
          <span class="flex-1 text-sm text-brand-text/80 group-hover:text-brand-accent transition-colors">${b.name} <span class="text-brand-text/40">(${b.count})</span></span>
        </label>`).join("");
      host.addEventListener("change", e => {
        const cb = e.target.closest(".brand-cb");
        if (!cb) return;
        if (cb.checked) selectedBrands.add(cb.value); else selectedBrands.delete(cb.value);
        shown = PAGE; draw();
      });
    }
    function initDrawer() {
      const drawer = $("#filterDrawer"), bd = $("#filterDrawerBd");
      if (!drawer || !bd) return;
      const open = () => { drawer.classList.remove("translate-x-full"); bd.classList.remove("opacity-0", "invisible"); document.body.style.overflow = "hidden"; };
      const close = () => { drawer.classList.add("translate-x-full"); bd.classList.add("opacity-0", "invisible"); document.body.style.overflow = ""; };
      $("#filterBtn").addEventListener("click", open);
      $("#filterDrawerClose").addEventListener("click", close);
      bd.addEventListener("click", close);
      // release the scroll-lock if the user navigates (SPA) while the drawer is open
      MP.onCleanup(() => { document.body.style.overflow = ""; });
    }
    function clearAll() {
      selectedBrands.clear();
      $$("#brandList .brand-cb").forEach(cb => { cb.checked = false; });
      pMin = LO; pMax = HI;
      const min = $("#priceMin"), max = $("#priceMax");
      if (min) min.value = LO;
      if (max) max.value = HI;
      paintSlider();
      shown = PAGE;
      draw();
    }

    paintPills();
    $$("#filterPills .pill").forEach(b => b.addEventListener("click", () => {
      filter = b.dataset.filter; shown = PAGE; paintPills(); draw();
      MP.scrollTo ? MP.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
    }));
    $("#sortSel").addEventListener("change", e => { sort = e.target.value; shown = PAGE; draw(); });
    $("#loadMore").addEventListener("click", () => { shown += PAGE; draw(); });
    $("#clearFilters").addEventListener("click", clearAll);
    initSlider();
    initBrands();
    initDrawer();
    draw();
  };
})(window.MP);
