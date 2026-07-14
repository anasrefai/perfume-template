/* =========================================================================
   MOOD PERFUME product init  →  MP.pages.product()
   Reads ?slug= , renders gallery + size tiers + qty + Add-to-Cart
   ("Added ✓" state, no navigation) + Ask-on-WhatsApp + related.
   NOTE: the live product page is client-routed (no crawlable HTML), so the
   description / notes copy is generic placeholder keyed off brand + name.
   ========================================================================= */
window.MP = window.MP || {};
(function (MP) {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const money = MP.money;
  MP.pages = MP.pages || {};

  MP.pages.product = function () {
    const root = $("#productRoot");
    if (!root) return;
    const slug = new URLSearchParams(location.search).get("slug");
    const p = (typeof PRODUCTS !== "undefined") && PRODUCTS.find(x => x.slug === slug);

    if (!p) {
      root.innerHTML = `
        <div class="text-center py-24">
          <i class="fas fa-wind text-5xl text-brand-accent/30 mb-6"></i>
          <h1 class="font-serif text-3xl text-white mb-4">Fragrance not found</h1>
          <p class="text-brand-text/70 mb-8">We couldn't find that scent. It may have sold out or moved.</p>
          <a href="shop.html" class="inline-flex items-center gap-3 px-8 py-4 border border-brand-accent text-brand-accent rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all uppercase text-xs tracking-widest">Back to Shop</a>
        </div>`;
      const rel = $("#relatedGrid"); if (rel) rel.closest("section").remove();
      return;
    }

    document.title = `${p.name} — ${p.brand} — ${MP.BRAND}`;
    const tiers = MP.sizeTiers(p);
    const tagBadge = p.tag && MP.BADGE[p.tag] ? `<span class="${MP.BADGE[p.tag]} inline-block mb-4">${p.tag}</span>` : "";

    // Real per-product fragrance data (js/products.js).
    const NOTE_ROWS = [["top", "Top"], ["heart", "Heart"], ["base", "Base"], ["blend", "Notes"]];
    const notes = p.notes || {};
    const noteRows = NOTE_ROWS
      .filter(([k]) => Array.isArray(notes[k]) && notes[k].length)
      .map(([k, label]) => `<p><span class="text-brand-accent uppercase text-xs tracking-widest">${label}</span> — ${notes[k].join(", ")}</p>`)
      .join("");
    const metaBits = [p.year ? `Launched ${p.year}` : "", p.perfumer ? `Perfumer: ${p.perfumer}` : ""].filter(Boolean);
    const metaLine = metaBits.length
      ? `<p class="text-brand-text/50 text-xs uppercase tracking-[0.2em] mt-3">${metaBits.join(" &nbsp;·&nbsp; ")}</p>`
      : "";

    root.innerHTML = `
      <nav class="text-brand-text/50 text-xs uppercase tracking-[0.2em] mb-10">
        <a href="index.html" class="hover:text-brand-accent">Home</a> /
        <a href="shop.html" class="hover:text-brand-accent">Shop</a> /
        <span class="text-brand-text/70">${p.name}</span>
      </nav>
      <div class="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div class="md:sticky md:top-32">
          <div class="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden glass border border-white/5 grid place-items-center p-10">
            <div class="absolute w-72 h-72 bg-brand-accent/10 rounded-full blur-[90px]"></div>
            <img id="mainImg" src="${p.img}" alt="${p.brand} ${p.name}" class="relative z-10 w-full h-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]" data-ph="bottle">
          </div>
          <div class="flex gap-3 mt-4">
            ${[0, 1, 2].map((n, idx) => `
              <button data-thumb class="w-20 h-24 rounded-xl overflow-hidden glass border ${idx === 0 ? "border-brand-accent" : "border-white/5"} grid place-items-center p-2 transition-all">
                <img src="${p.img}" alt="View ${n + 1}" class="w-full h-full object-contain ${idx === 0 ? "" : "opacity-60"}" data-ph="bottle"></button>`).join("")}
          </div>
        </div>
        <div>
          ${tagBadge}
          <p class="text-brand-accent/80 text-sm uppercase tracking-[0.3em] mb-3">${p.brand}</p>
          <h1 class="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-5">${p.name}</h1>
          <p class="text-3xl font-serif text-brand-accent tabular-nums mb-8" id="priceTag">${tiers.length ? money(tiers[0].price) + " JOD" : "—"}</p>
          <div class="mb-8">
            <p class="text-xs uppercase tracking-[0.2em] text-brand-text/60 mb-3">Select Size</p>
            <div id="sizes" class="flex flex-wrap gap-3">
              ${tiers.map((t, i) => `
                <button data-size="${i}" class="size-btn px-5 py-3 rounded-full border text-sm transition-all duration-300 ${i === 0 ? "border-brand-accent bg-brand-accent/10 text-brand-accent" : "border-white/15 text-brand-text/70 hover:border-brand-accent/60"}">
                  <span class="font-semibold">${t.label}</span>
                  <span class="block text-[11px] opacity-70 tabular-nums">${money(t.price)} JOD</span></button>`).join("")}
            </div>
          </div>
          <div class="flex items-center gap-4 mb-8">
            <div class="flex items-center border border-white/15 rounded-full">
              <button id="qtyDec" class="w-11 h-11 grid place-items-center text-brand-text hover:text-brand-accent text-lg" aria-label="Decrease quantity">−</button>
              <span id="qtyVal" class="w-10 text-center text-white tabular-nums">1</span>
              <button id="qtyInc" class="w-11 h-11 grid place-items-center text-brand-text hover:text-brand-accent text-lg" aria-label="Increase quantity">+</button>
            </div>
            <button id="wishBtn" class="w-12 h-12 grid place-items-center rounded-full border border-white/15 text-brand-text hover:text-red-400 hover:border-red-400/50 transition-all" aria-label="Add to wishlist"><i class="${MP.wish.has(p.id) ? "fas" : "far"} fa-heart"></i></button>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 mb-6">
            <button id="addBtn" class="flex-1 inline-flex items-center justify-center gap-3 bg-brand-accent text-brand-bg font-bold uppercase tracking-widest text-sm py-4 rounded-full transition-all duration-300 hover:bg-brand-text hover:-translate-y-1 shadow-lg"><i class="fas fa-bag-shopping"></i> Add to Cart</button>
            <a id="askBtn" href="#" class="flex-1 inline-flex items-center justify-center gap-3 bg-transparent border border-brand-accent/50 text-brand-accent font-bold uppercase tracking-widest text-sm py-4 rounded-full transition-all duration-300 hover:bg-brand-accent/10 hover:border-brand-accent"><i class="fab fa-whatsapp text-lg"></i> Ask About This</a>
          </div>
          <p class="text-brand-text/40 text-xs mb-8"><i class="fas fa-circle-info mr-1"></i> "Ask About This" is for inquiries only — complete your order through the cart &amp; checkout.</p>
          <div class="border-t border-white/10 pt-8 space-y-4">
            <div>
              <h3 class="font-serif text-xl text-white mb-2">Description</h3>
              <p class="text-brand-text/70 leading-relaxed">${p.description ? p.description : `${p.name} by ${p.brand} is a distinguished niche composition.`} Available as a precise ${MP.BRAND} decant or a full bottle — each decant is transferred with sterile precision so you experience the fragrance exactly as the house intended.</p>
              ${metaLine}
            </div>
            <details class="group border border-white/10 rounded-xl overflow-hidden" open>
              <summary class="flex items-center justify-between px-5 py-4 cursor-pointer text-white font-medium list-none">Fragrance Notes<i class="fas fa-chevron-down transition-transform group-open:rotate-180 text-brand-accent"></i></summary>
              <div class="px-5 pb-5 text-brand-text/70 text-sm space-y-1">
                ${noteRows || '<p class="text-brand-text/50">Notes available on request.</p>'}
              </div>
            </details>
            <details class="group border border-white/10 rounded-xl overflow-hidden">
              <summary class="flex items-center justify-between px-5 py-4 cursor-pointer text-white font-medium list-none">Shipping &amp; Authenticity<i class="fas fa-chevron-down transition-transform group-open:rotate-180 text-brand-accent"></i></summary>
              <div class="px-5 pb-5 text-brand-text/70 text-sm">100% authentic. Decanted from original bottles using sterile technique. Fast delivery to Amman and all cities across Jordan.</div>
            </details>
          </div>
        </div>
      </div>`;

    let sizeIdx = 0, qty = 1;
    const priceTag = $("#priceTag");
    const setPrice = () => priceTag.textContent = money(tiers[sizeIdx].price * qty) + " JOD";

    document.querySelectorAll(".size-btn").forEach(b => b.addEventListener("click", () => {
      sizeIdx = +b.dataset.size;
      document.querySelectorAll(".size-btn").forEach((x, i) => {
        const on = i === sizeIdx;
        x.className = "size-btn px-5 py-3 rounded-full border text-sm transition-all duration-300 " + (on ? "border-brand-accent bg-brand-accent/10 text-brand-accent" : "border-white/15 text-brand-text/70 hover:border-brand-accent/60");
      });
      setPrice();
    }));
    $("#qtyInc").addEventListener("click", () => { qty++; $("#qtyVal").textContent = qty; setPrice(); });
    $("#qtyDec").addEventListener("click", () => { qty = Math.max(1, qty - 1); $("#qtyVal").textContent = qty; setPrice(); });

    document.querySelectorAll("[data-thumb]").forEach((t, i) => t.addEventListener("click", () => {
      document.querySelectorAll("[data-thumb]").forEach((x, j) => {
        x.classList.toggle("border-brand-accent", j === i);
        x.classList.toggle("border-white/5", j !== i);
        x.querySelector("img").classList.toggle("opacity-60", j !== i);
      });
    }));

    // Add to Cart — stays on page, shows "Added ✓" then reverts; badge updates.
    const addBtn = $("#addBtn");
    let addTimer;
    addBtn.addEventListener("click", () => {
      const t = tiers[sizeIdx];
      MP.cart.add({ id: p.id, slug: p.slug, brand: p.brand, name: p.name, img: p.img, size: t.label, price: t.price, qty }, { silent: true });
      addBtn.innerHTML = '<i class="fas fa-check"></i> Added';
      addBtn.classList.add("!bg-green-600", "!text-white");
      clearTimeout(addTimer);
      addTimer = setTimeout(() => {
        addBtn.innerHTML = '<i class="fas fa-bag-shopping"></i> Add to Cart';
        addBtn.classList.remove("!bg-green-600", "!text-white");
      }, 1600);
    });

    $("#askBtn").href = `${MP.WA}?text=${encodeURIComponent(`Hi ${MP.BRAND}! I have a question about ${p.name} by ${p.brand}.`)}`;

    $("#wishBtn").addEventListener("click", () => {
      const on = MP.wish.toggle(p.id);
      $("#wishBtn").querySelector("i").className = (on ? "fas" : "far") + " fa-heart";
    });

    let rel = PRODUCTS.filter(x => x.brand === p.brand && x.slug !== p.slug).slice(0, 4);
    if (rel.length < 4) rel = rel.concat(PRODUCTS.filter(x => x.slug !== p.slug && !rel.includes(x)).slice(0, 4 - rel.length));
    const relGrid = $("#relatedGrid"); if (relGrid) relGrid.innerHTML = rel.map(x => MP.productCard(x)).join("");
    MP.reveal();
  };
})(window.MP);
