/* =========================================================================
   MOOD PERFUME — cart + wishlist state (localStorage). No drawer:
   the cart icon and "Add to Cart" both take the user to the cart page.
   Exposes  MP.cart  { items, add, remove, setQty, count, total, save, sync }
            MP.wish  { ids, has, toggle, count, sync }
   ========================================================================= */
window.MP = window.MP || {};
(function (MP) {
  "use strict";
  const CART_KEY = "mp_cart", WISH_KEY = "mp_wish";
  const read = k => { try { return JSON.parse(localStorage.getItem(k)) || []; } catch { return []; } };
  const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  /* ---------------- cart ---------------- */
  const cart = {
    items: read(CART_KEY),               // [{id, slug, brand, name, img, size, price, qty}]
    save() { write(CART_KEY, this.items); this.sync(); },
    add(entry, opts = {}) {
      const key = i => i.slug + "|" + i.size;
      const found = this.items.find(i => key(i) === key(entry));
      if (found) found.qty += entry.qty;
      else this.items.push({ ...entry });
      this.save();
      if (opts.silent !== true) MP.toast && MP.toast(`Added to cart — ${entry.name} (${entry.size})`);
    },
    remove(idx) { this.items.splice(idx, 1); this.save(); },
    setQty(idx, q) { this.items[idx].qty = Math.max(1, q); this.save(); },
    count() { return this.items.reduce((n, i) => n + i.qty, 0); },
    total() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
    sync() {
      document.querySelectorAll("[data-cart-badge]").forEach(el => {
        const n = this.count(); el.textContent = n; el.classList.toggle("hidden", n === 0);
      });
      document.dispatchEvent(new CustomEvent("mp:cartchange"));
    }
  };
  MP.cart = cart;

  /* ---------------- wishlist ---------------- */
  const wish = {
    ids: new Set(read(WISH_KEY).map(Number)),
    has(id) { return this.ids.has(Number(id)); },
    toggle(id) {
      id = Number(id);
      if (this.ids.has(id)) { this.ids.delete(id); }
      else { this.ids.add(id); MP.toast && MP.toast("Added to your wishlist."); }
      write(WISH_KEY, [...this.ids]); this.sync();
      document.dispatchEvent(new CustomEvent("mp:wishchange"));
      return this.ids.has(id);
    },
    list() { return [...this.ids]; },
    count() { return this.ids.size; },
    sync() {
      document.querySelectorAll("[data-wish-badge]").forEach(el => { const n = this.count(); el.textContent = n; el.classList.toggle("hidden", n === 0); });
      // reflect state on any visible heart toggles
      document.querySelectorAll("[data-wish]").forEach(btn => {
        const on = this.has(btn.dataset.wish);
        btn.classList.toggle("is-wished", on);
        const ic = btn.querySelector("i"); if (ic) ic.className = (on ? "fas" : "far") + " fa-heart";
      });
    }
  };
  MP.wish = wish;

  document.addEventListener("DOMContentLoaded", () => { cart.sync(); wish.sync(); });
})(window.MP);
