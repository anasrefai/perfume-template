/* =========================================================================
   MOOD PERFUME — remaining page init fns (about / tips / contact / wishlist /
   cart / checkout). Called by the SPA router (layout.js).
   ========================================================================= */
window.MP = window.MP || {};
(function (MP) {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  MP.pages = MP.pages || {};

  /* ---------------- ABOUT ---------------- */
  MP.pages.about = function () {
    const g = $("#aboutGallery"); if (!g) return;
    g.innerHTML = MP.GALLERY.map(f => `<img src="${f}" alt="Scent inspiration" class="aspect-square object-cover rounded-xl border border-white/5 hover:scale-[1.03] transition-transform duration-500" loading="lazy" data-ph="photo">`).join("");
  };

  /* ---------------- TIPS (static) ---------------- */
  MP.pages.tips = function () {};

  /* ---------------- CONTACT ---------------- */
  MP.pages.contact = function () {
    const form = $("#contactForm"); if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const bad = [...form.elements].find(el => el.required && !el.value.trim());
      if (bad) { bad.focus(); bad.style.borderColor = "#ef4444"; MP.toast("Please fill in all fields."); return; }
      const name = form.name.value.trim();
      const msg = form.message.value.trim();
      const text = encodeURIComponent(`Hi ${MP.BRAND}! I'm ${name}. I'm looking for: ${msg}`);
      MP.toast("Opening WhatsApp…");
      setTimeout(() => location.href = `${MP.WA}?text=${text}`, 700);
    });
  };

  /* ---------------- WISHLIST ---------------- */
  MP.pages.wishlist = function () {
    const head = $("#wishHead"), root = $("#wishRoot");
    if (!root) return;
    function draw() {
      const items = MP.wish.list().map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
      if (!items.length) {
        head.innerHTML = "";
        root.innerHTML = `
          <div class="text-center py-20">
            <div class="w-20 h-20 mx-auto grid place-items-center rounded-full border border-brand-accent/30 text-brand-accent text-3xl mb-8"><i class="far fa-heart"></i></div>
            <h2 class="text-3xl font-serif font-bold text-brand-accent mb-4">Your Wishlist is Empty</h2>
            <p class="text-brand-text/80 mb-8">Add your favorite fragrances to keep track of them here.</p>
            <a href="shop.html" class="inline-block bg-brand-accent text-brand-bg font-bold text-lg px-8 py-3 rounded-md shadow-lg transition-all duration-300 hover:bg-brand-text">Explore Brands</a>
          </div>`;
        return;
      }
      head.innerHTML = `
        <p class="text-brand-text/50 text-xs uppercase tracking-[0.3em] mb-4"><a href="index.html" class="hover:text-brand-accent">Home</a> / Wishlist</p>
        <div class="flex items-end justify-between flex-wrap gap-4">
          <h1 class="font-serif text-4xl md:text-6xl font-bold text-brand-accent">Your Wishlist</h1>
          <span class="text-brand-text/60 text-sm">${items.length} item${items.length > 1 ? "s" : ""}</span>
        </div>`;
      root.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">${items.map(p => MP.productCard(p)).join("")}</div>`;
      MP.reveal();
    }
    draw();
    const onWish = () => draw();
    document.addEventListener("mp:wishchange", onWish);
    MP.onCleanup(() => document.removeEventListener("mp:wishchange", onWish));
  };

  /* ---------------- CART ---------------- */
  MP.pages.cart = function () {
    const root = $("#cartPage"); if (!root) return;
    const c = MP.cart;
    function draw() {
      if (!c.items.length) {
        root.innerHTML = `<div class="lg:col-span-2 text-center py-24 rounded-3xl bg-black/20 border border-white/5">
          <i class="fas fa-bag-shopping text-5xl text-brand-accent/30 mb-6"></i>
          <p class="text-brand-text/70 mb-8 text-lg">Your cart is empty.</p>
          <a href="shop.html" class="inline-flex items-center gap-3 px-8 py-4 border border-brand-accent text-brand-accent rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all uppercase text-xs tracking-widest">Browse Fragrances</a></div>`;
        return;
      }
      root.innerHTML = `
        <div class="space-y-4">
          ${c.items.map((i, idx) => `
            <div class="flex gap-5 items-center bg-black/20 border border-white/5 rounded-2xl p-4">
              <a href="${MP.productHref(i)}" class="w-24 h-28 flex-shrink-0 rounded-xl overflow-hidden glass border border-white/5 grid place-items-center p-2"><img src="${i.img}" alt="${i.name}" class="w-full h-full object-contain" data-ph="bottle"></a>
              <div class="flex-1 min-w-0">
                <p class="text-brand-accent/70 text-[10px] uppercase tracking-[0.2em]">${i.brand}</p>
                <h3 class="font-serif text-white text-lg">${i.name}</h3>
                <p class="text-brand-text/50 text-sm mb-3">Size: ${i.size}</p>
                <div class="flex items-center gap-4">
                  <div class="flex items-center border border-white/15 rounded-full">
                    <button class="w-8 h-8 grid place-items-center text-brand-text hover:text-brand-accent" data-dec="${idx}">−</button>
                    <span class="w-8 text-center text-sm text-white tabular-nums">${i.qty}</span>
                    <button class="w-8 h-8 grid place-items-center text-brand-text hover:text-brand-accent" data-inc="${idx}">+</button>
                  </div>
                  <button class="text-brand-text/40 hover:text-red-400 text-sm" data-del="${idx}"><i class="fas fa-trash-can mr-1"></i>Remove</button>
                </div>
              </div>
              <span class="font-serif text-xl text-brand-accent tabular-nums self-start">${MP.money(i.price * i.qty)} JOD</span>
            </div>`).join("")}
        </div>
        <div class="bg-black/20 border border-brand-accent/20 rounded-2xl p-6 lg:sticky lg:top-32">
          <h3 class="font-serif text-2xl text-white mb-6">Order Summary</h3>
          <div class="flex justify-between text-brand-text/70 mb-3"><span>Subtotal</span><span class="tabular-nums">${MP.money(c.total())} JOD</span></div>
          <div class="flex justify-between text-brand-text/70 mb-3"><span>Shipping</span><span>Calculated at checkout</span></div>
          <div class="border-t border-white/10 my-4"></div>
          <div class="flex justify-between text-white font-serif text-xl mb-6"><span>Total</span><span class="text-brand-accent tabular-nums">${MP.money(c.total())} JOD</span></div>
          <a href="checkout.html" class="flex items-center justify-center gap-3 w-full bg-brand-accent text-brand-bg font-bold py-4 rounded-full hover:bg-brand-text transition-colors uppercase tracking-widest text-sm">Checkout<i class="fas fa-arrow-right"></i></a>
          <a href="shop.html" class="block text-center text-brand-text/60 hover:text-brand-accent text-xs uppercase tracking-[0.2em] mt-4">Continue Shopping</a>
        </div>`;
      root.querySelectorAll("[data-inc]").forEach(b => b.onclick = () => { c.setQty(+b.dataset.inc, c.items[+b.dataset.inc].qty + 1); draw(); });
      root.querySelectorAll("[data-dec]").forEach(b => b.onclick = () => { c.setQty(+b.dataset.dec, c.items[+b.dataset.dec].qty - 1); draw(); });
      root.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { c.remove(+b.dataset.del); draw(); });
    }
    draw();
  };

  /* ---------------- CHECKOUT ---------------- */
  /* =====================================================================
     FORMSPREE ENDPOINT — replace the placeholder with your real endpoint
     from https://formspree.io (Forms → New form → copy URL, looks like
     https://formspree.io/f/xxxxxxxx). Until then submissions run in DEMO
     mode (no network request).
     ===================================================================== */
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";
  const FORMSPREE_READY = !/REPLACE_WITH_YOUR_ID/.test(FORMSPREE_ENDPOINT);

  MP.pages.checkout = function () {
    const root = $("#checkoutRoot"); if (!root) return;
    const c = MP.cart;
    if (!c.items.length) {
      root.innerHTML = `<div class="lg:col-span-2 text-center py-24 rounded-3xl bg-black/20 border border-white/5">
        <i class="fas fa-bag-shopping text-5xl text-brand-accent/30 mb-6"></i>
        <p class="text-brand-text/70 mb-8 text-lg">Your cart is empty — nothing to check out.</p>
        <a href="shop.html" class="inline-flex items-center gap-3 px-8 py-4 border border-brand-accent text-brand-accent rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all uppercase text-xs tracking-widest">Browse Fragrances</a></div>`;
      return;
    }
    const orderLines = c.items.map(i => `${i.qty}× ${i.brand} — ${i.name} (${i.size}) @ ${MP.money(i.price)} = ${MP.money(i.price * i.qty)} JOD`).join("\n");
    const total = MP.money(c.total());
    const field = (label, name, type, ph, extra = "") =>
      `<div><label class="block text-xs uppercase tracking-[0.15em] text-brand-accent mb-2">${label}</label>
        ${type === "textarea"
          ? `<textarea name="${name}" rows="3" placeholder="${ph}" ${extra} class="w-full bg-black/30 border border-white/15 rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent resize-none"></textarea>`
          : `<input name="${name}" type="${type}" placeholder="${ph}" ${extra} class="w-full bg-black/30 border border-white/15 rounded-lg px-4 py-3 text-brand-text focus:outline-none focus:border-brand-accent">`}</div>`;

    root.innerHTML = `
      <form id="checkoutForm" novalidate class="space-y-5">
        <div class="grid sm:grid-cols-2 gap-5">
          ${field("Full Name", "name", "text", "e.g. Layla Ahmad", "required autocomplete='name'")}
          ${field("Phone / WhatsApp", "phone", "tel", "+962 …", "required autocomplete='tel'")}
        </div>
        ${field("City", "city", "text", "e.g. Amman", "required")}
        ${field("Delivery Address", "address", "textarea", "Street, building, apartment, landmark…", "required")}
        ${field("Order Notes (optional)", "notes", "textarea", "Anything we should know")}
        <input type="hidden" name="order" value=""><input type="hidden" name="total" value="${total} JOD"><input type="hidden" name="_subject" value="New Mood Perfume order">
        <button type="submit" class="w-full flex items-center justify-center gap-3 bg-brand-accent text-brand-bg font-bold uppercase tracking-widest text-sm py-4 rounded-full transition-all duration-300 hover:bg-brand-text hover:-translate-y-1 shadow-lg">Place Order · ${total} JOD<i class="fas fa-arrow-right"></i></button>
        <p class="text-brand-text/40 text-xs text-center">${FORMSPREE_READY ? "Your order is sent securely to our inbox." : "⚠ Demo mode — add your Formspree endpoint in js/pages.js to receive real orders."}</p>
      </form>
      <div class="bg-black/20 border border-brand-accent/20 rounded-2xl p-6 lg:sticky lg:top-32">
        <h3 class="font-serif text-2xl text-white mb-6">Order Summary</h3>
        <div class="space-y-3 mb-5 max-h-64 overflow-y-auto pr-1">
          ${c.items.map(i => `<div class="flex gap-3 items-center">
            <div class="w-12 h-14 flex-shrink-0 rounded-lg overflow-hidden glass border border-white/5 grid place-items-center p-1"><img src="${i.img}" class="w-full h-full object-contain" alt="" data-ph="bottle"></div>
            <div class="flex-1 min-w-0"><p class="text-white text-sm truncate">${i.name}</p><p class="text-brand-text/50 text-xs">${i.size} × ${i.qty}</p></div>
            <span class="text-brand-accent text-sm tabular-nums">${MP.money(i.price * i.qty)}</span></div>`).join("")}
        </div>
        <div class="border-t border-white/10 pt-4 flex justify-between text-white font-serif text-xl"><span>Total</span><span class="text-brand-accent tabular-nums">${total} JOD</span></div>
      </div>`;

    const form = $("#checkoutForm");
    form.order.value = orderLines;
    form.addEventListener("submit", async e => {
      e.preventDefault();
      const bad = [...form.elements].find(el => el.required && !el.value.trim());
      if (bad) { bad.focus(); bad.style.borderColor = "#ef4444"; MP.toast("Please complete all required fields."); return; }
      const btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Placing order…';
      const done = () => {
        MP.cart.items = []; MP.cart.save();
        root.innerHTML = `<div class="lg:col-span-2 text-center py-24 rounded-3xl bg-black/20 border border-brand-accent/30">
          <div class="w-20 h-20 mx-auto grid place-items-center rounded-full bg-brand-accent text-brand-bg text-3xl mb-6"><i class="fas fa-check"></i></div>
          <h2 class="font-serif text-3xl text-white mb-3">Order received!</h2>
          <p class="text-brand-text/70 mb-8 max-w-md mx-auto">Thank you — we'll confirm your order and delivery details on WhatsApp shortly.</p>
          <a href="shop.html" class="inline-flex items-center gap-3 px-8 py-4 border border-brand-accent text-brand-accent rounded-full hover:bg-brand-accent hover:text-brand-bg transition-all uppercase text-xs tracking-widest">Continue Shopping</a></div>`;
        (MP.scrollTo || (t => window.scrollTo(0, t)))(0);
      };
      if (!FORMSPREE_READY) { setTimeout(done, 900); return; }
      try {
        const res = await fetch(FORMSPREE_ENDPOINT, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(form) });
        if (res.ok) done(); else throw new Error("Submit failed");
      } catch (err) {
        btn.disabled = false; btn.innerHTML = "Place Order · " + total + " JOD";
        MP.toast("Something went wrong — please try again or WhatsApp us.");
      }
    });
  };
})(window.MP);
