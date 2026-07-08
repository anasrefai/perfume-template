/* =========================================================================
   SOLE WHIFF — interactions (clone/template)
   ========================================================================= */
(function () {
  "use strict";

  const LOGO = "https://cdn.shopify.com/s/files/1/0979/7206/0241/files/LOGO5.png?v=1766602502";
  const WA = "https://wa.me/962795634234";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const page = document.body.dataset.page || "home";

  /* ---------- SVG icons ---------- */
  const I = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>',
    user:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    heart:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 20s-7-4.35-9.5-8.5C1 8 3 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3 0 5 3 3.5 6.5C19 15.65 12 20 12 20Z"/></svg>',
    bag:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    menu:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    arrow:  '<svg class="arw" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 6l-6 6 6 6"/></svg>',
    right:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 6l6 6-6 6"/></svg>',
    up:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 15l6-6 6 6"/></svg>',
    check:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
    fb:     '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3l.5-3H14V4.5c0-.8.3-1.5 1.6-1.5H17V.2C16.6.1 15.5 0 14.4 0 12 0 10.5 1.4 10.5 4v2H8v3h2.5v9H14V9Z"/></svg>',
    ig:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    wa:     '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.3.5c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.2.1.4.1.5-.1l.7-.9c.2-.2.4-.2.6-.1l1.8.9c.3.1.4.2.5.3.1.2.1.7-.2 1.1Z"/></svg>',
    request:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M11 4h2l.4 2.1a6 6 0 0 1 1.6.9l2-.8 1 1.7-1.6 1.4a6 6 0 0 1 0 1.8l1.6 1.4-1 1.7-2-.8a6 6 0 0 1-1.6.9L13 20h-2l-.4-2.1a6 6 0 0 1-1.6-.9l-2 .8-1-1.7 1.6-1.4a6 6 0 0 1 0-1.8L5 8.1l1-1.7 2 .8a6 6 0 0 1 1.6-.9L11 4Z"/><circle cx="12" cy="12" r="2.4"/></svg>'
  };

  const NAV = [
    ["Home", "index.html", "home"],
    ["About Us", "about.html", "about"],
    ["Brands", "shop.html", "brands"],
    ["Tips", "tips.html", "tips"],
    ["Contact Us", "contact.html", "contact"]
  ];

  /* ---------- HEADER ---------- */
  function header() {
    const el = $("#site-header");
    if (!el) return;
    const links = NAV.map(([t, h, k]) =>
      `<a href="${h}" class="${page === k ? "active" : ""}">${t}</a>`).join("");
    el.innerHTML = `
    <div class="topbar">
      <div class="container">
        <a href="#">Free Decant On Orders Over 50 JOD</a>
        <a href="#">Authentic Niche Fragrances · Aqaba, Jordan</a>
      </div>
    </div>
    <header class="header" id="hdr">
      <div class="container">
        <a href="index.html" class="brand-logo" aria-label="Sole Whiff home">
          <img src="${LOGO}" alt="Sole Whiff">
        </a>
        <nav class="nav" aria-label="Primary">${links}</nav>
        <div class="header-actions">
          <button class="icon-btn desktop-only" aria-label="Search">${I.search}</button>
          <button class="lang-btn desktop-only" aria-label="Switch to Arabic">AR</button>
          <a href="#" class="icon-btn desktop-only" aria-label="Account">${I.user}</a>
          <a href="#" class="icon-btn desktop-only" id="wishBtn" aria-label="Wishlist">${I.heart}<span class="badge" id="wishBadge" hidden>0</span></a>
          <a href="#" class="icon-btn" id="cartBtn" aria-label="Cart">${I.bag}<span class="badge" id="cartBadge" hidden>0</span></a>
          <button class="icon-btn hamburger" id="burger" aria-label="Open menu">${I.menu}</button>
        </div>
      </div>
    </header>
    <div class="drawer-backdrop" id="drawerBd"></div>
    <aside class="drawer" id="drawer" aria-label="Mobile menu">
      <div class="drawer-head">
        <img src="${LOGO}" alt="Sole Whiff">
        <button class="icon-btn" id="drawerClose" aria-label="Close menu">${I.close}</button>
      </div>
      <nav class="drawer-nav">${links}</nav>
      <div class="drawer-foot">
        <a href="https://www.instagram.com/sole.whiff/" class="socials-a icon-btn" aria-label="Instagram">${I.ig}</a>
        <a href="${WA}" class="socials-a icon-btn" aria-label="WhatsApp">${I.wa}</a>
        <span style="margin-left:auto;color:var(--gold-2);font-weight:600;letter-spacing:.1em">AR</span>
      </div>
    </aside>`;

    // sticky styling
    const hdr = $("#hdr");
    const onScroll = () => hdr.classList.toggle("scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // drawer
    const drawer = $("#drawer"), bd = $("#drawerBd");
    const open = () => { drawer.classList.add("open"); bd.classList.add("open"); document.body.classList.add("no-scroll"); };
    const close = () => { drawer.classList.remove("open"); bd.classList.remove("open"); document.body.classList.remove("no-scroll"); };
    $("#burger").addEventListener("click", open);
    $("#drawerClose").addEventListener("click", close);
    bd.addEventListener("click", close);
    $$(".drawer-nav a").forEach(a => a.addEventListener("click", close));

    // cart / wishlist counters (demo) + toast interactions
    $("#cartBtn").addEventListener("click", e => { e.preventDefault(); toast("Your cart is empty — start exploring."); });
    $("#wishBtn")?.addEventListener("click", e => { e.preventDefault(); location.href = "shop.html"; });
    refreshBadges();
  }

  /* ---------- FOOTER ---------- */
  const GALLERY = [
    "69e0b641-daf1-442a-b6cd-a15c62d70af5_800x.jpg?v=1761563976",
    "WhatsApp_Image_2025-10-28_at_08.48.45_1_800x.jpg?v=1761630734",
    "WhatsApp_Image_2025-10-28_at_08.48.45_2_800x.jpg?v=1761630735",
    "WhatsApp_Image_2025-10-28_at_08.48.45_3_800x.jpg?v=1761630735",
    "WhatsApp_Image_2025-10-28_at_08.48.45_800x.jpg?v=1761630734",
    "WhatsApp_Image_2025-10-28_at_08.48.46_1_800x.jpg?v=1761630734",
    "WhatsApp_Image_2025-10-28_at_08.48.46_2_800x.jpg?v=1761630734"
  ].map(f => "https://cdn.shopify.com/s/files/1/0979/7206/0241/files/" + f);

  function footer() {
    const el = $("#site-footer");
    if (!el) return;
    const links = NAV.filter(n => n[2] !== "brands")
      .concat([["Shop All", "shop.html", "brands"]])
      .map(([t, h]) => `<a href="${h}">${t}</a>`).join("");
    const imgs = GALLERY.concat(GALLERY).map(s => `<img src="${s}" alt="Scent inspiration" loading="lazy">`).join("");
    el.innerHTML = `
    <div class="gallery-head">
      <h4>Scent Inspirations</h4>
      <p>A glimpse into our world of fragrance.</p>
    </div>
    <div class="marquee"><div class="marquee-track">${imgs}</div></div>
    <footer class="footer">
      <div class="container footer-top">
        <div class="footer-brand">
          <img src="${LOGO}" alt="Sole Whiff">
          <p>Redefining your perfumes. Luxury niche fragrances &amp; precise decants, delivered across Jordan.</p>
        </div>
        <div>
          <h4>Explore</h4>
          <div class="footer-links">${links}</div>
        </div>
        <div>
          <h4>Connect</h4>
          <div class="socials">
            <a href="https://web.facebook.com/Patchouli.Perfumes.Aqaba/" aria-label="Facebook">${I.fb}</a>
            <a href="https://www.instagram.com/sole.whiff/" aria-label="Instagram">${I.ig}</a>
            <a href="${WA}" aria-label="WhatsApp">${I.wa}</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom container">
        © ${new Date().getFullYear()} Sole Whiff. All rights reserved. — template clone for study.
      </div>
    </footer>`;
  }

  /* ---------- badges ---------- */
  function refreshBadges() {
    const w = JSON.parse(localStorage.getItem("sw_wish") || "[]");
    const wb = $("#wishBadge");
    if (wb) { wb.textContent = w.length; wb.hidden = w.length === 0; }
  }

  /* ---------- product card ---------- */
  function priceStr(p) {
    if (p.low == null) return "";
    const f = n => Number(n).toFixed(2);
    return `<span class="card-price">( <b>${f(p.low)}</b> – <b>${f(p.high)}</b> ) JOD</span>`;
  }
  function tagHtml(p) {
    if (!p.tag) return "";
    const cls = p.tag === "Coming Soon" ? "card-tag coming" : "card-tag";
    return `<span class="${cls}">${p.tag}</span>`;
  }
  window.cardHtml = function (p) {
    const cta = p.tag === "Coming Soon" ? "Book Now" : "View Details";
    return `
    <article class="card" data-reveal>
      <div class="card-media">
        ${tagHtml(p)}
        <button class="card-wish" data-wish="${p.id}" aria-label="Add ${p.name} to wishlist">${I.heart}</button>
        <img src="${p.img}" alt="${p.brand} ${p.name}" loading="lazy">
        <div class="card-overlay"><a href="${WA}" class="btn">${cta} ${I.arrow}</a></div>
      </div>
      <div class="card-body">
        <div class="card-brand">${p.brand}</div>
        <h3 class="card-name">${p.name}</h3>
        ${priceStr(p)}
      </div>
    </article>`;
  };

  function bindWish(scope = document) {
    const wish = new Set(JSON.parse(localStorage.getItem("sw_wish") || "[]"));
    $$("[data-wish]", scope).forEach(btn => {
      const id = +btn.dataset.wish;
      if (wish.has(id)) btn.classList.add("active");
      btn.addEventListener("click", e => {
        e.preventDefault(); e.stopPropagation();
        if (wish.has(id)) { wish.delete(id); btn.classList.remove("active"); }
        else { wish.add(id); btn.classList.add("active"); toast("Added to your wishlist."); }
        localStorage.setItem("sw_wish", JSON.stringify([...wish]));
        refreshBadges();
      });
    });
  }
  window.bindWish = bindWish;

  /* ---------- toast ---------- */
  let toastEl, toastT;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = `${I.check}<span>${msg}</span>`;
    toastEl.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => toastEl.classList.remove("show"), 3200);
  }
  window.swToast = toast;

  /* ---------- scroll reveal ---------- */
  function reveal() {
    const els = $$("[data-reveal]");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const el = en.target;
          const kids = el.classList.contains("stagger") ? $$(":scope > *", el) : [];
          if (kids.length) kids.forEach((k, i) => k.style.transitionDelay = (i * 60) + "ms");
          el.classList.add("in");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(e => io.observe(e));
  }
  window.swReveal = reveal;

  /* ---------- hero slider ---------- */
  function heroSlider() {
    const hero = $(".hero");
    if (!hero) return;
    const slides = $$(".hero-slide", hero);
    const dots = $$(".hero-dots button", hero);
    let i = 0, timer;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const go = n => {
      slides[i].classList.remove("active"); dots[i]?.classList.remove("active");
      i = (n + slides.length) % slides.length;
      slides[i].classList.add("active"); dots[i]?.classList.add("active");
    };
    const start = () => { if (reduce) return; clearInterval(timer); timer = setInterval(() => go(i + 1), 6000); };
    $(".hero-arrow.next", hero)?.addEventListener("click", () => { go(i + 1); start(); });
    $(".hero-arrow.prev", hero)?.addEventListener("click", () => { go(i - 1); start(); });
    dots.forEach((d, n) => d.addEventListener("click", () => { go(n); start(); }));
    start();
    // pause on tab hidden
    document.addEventListener("visibilitychange", () => document.hidden ? clearInterval(timer) : start());
  }

  /* ---------- generic slider (testimonials) ---------- */
  function initTesti() {
    const root = $("#testi");
    if (!root) return;
    const track = $(".testi-track", root);
    const slides = $$(".testi-slide", track);
    let i = 0;
    const go = n => { i = (n + slides.length) % slides.length; track.style.transform = `translateX(-${i * 100}%)`; };
    track.style.transition = "transform .7s cubic-bezier(.22,1,.36,1)";
    $("#testiPrev").addEventListener("click", () => go(i - 1));
    $("#testiNext").addEventListener("click", () => go(i + 1));
    let t = setInterval(() => go(i + 1), 5500);
    root.addEventListener("mouseenter", () => clearInterval(t));
    root.addEventListener("mouseleave", () => t = setInterval(() => go(i + 1), 5500));
  }
  window.initTesti = initTesti;

  /* ---------- back to top ---------- */
  function backToTop() {
    const btn = document.createElement("button");
    btn.className = "to-top"; btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = I.up;
    document.body.appendChild(btn);
    btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", () => btn.classList.toggle("show", window.scrollY > 700), { passive: true });
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    header();
    footer();
    if (typeof window.renderPage === "function") window.renderPage();
    heroSlider();
    initTesti();
    bindWish();
    reveal();
    backToTop();
  });
})();
