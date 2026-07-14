/* =========================================================================
   MOOD PERFUME — shared layout: header + footer injection & global behaviours
   (sticky nav, mobile drawer, back-to-top, gallery marquee, Lenis smooth
    scroll, View-Transitions page fades, scroll-reveal)
   Include on every page AFTER products.js, components.js, cart.js.
   Set  <body data-page="home|about|brands|tips|contact|...">
   ========================================================================= */
window.MP = window.MP || {};
(function (MP) {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const LOGO = "img/logo.png";
  const WA = MP.WA;

  /* ---- per-navigation cleanup registry (timers/listeners set by page inits) ---- */
  MP._cleanups = MP._cleanups || [];
  MP.onCleanup = fn => MP._cleanups.push(fn);
  MP.runCleanups = () => { MP._cleanups.forEach(f => { try { f(); } catch (e) {} }); MP._cleanups = []; };

  const NAV = [
    ["Home", "index.html", "home"],
    ["About Us", "about.html", "about"],
    ["Brands", "shop.html", "brands"],
    ["Tips", "tips.html", "tips"],
    ["Contact Us", "contact.html", "contact"]
  ];

  /* ---------------- HEADER ---------------- */
  function header() {
    const host = $("#site-header"); if (!host) return;
    const links = NAV.map(([t, h, k]) =>
      `<li class="relative group"><a href="${h}" data-nav="${k}" class="nav-link text-sm font-semibold tracking-wide text-brand-text/80 hover:text-brand-accent transition-colors duration-300 py-2 relative">${t}<span class="nav-underline absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-brand-accent transition-all duration-300"></span></a></li>`
    ).join("");
    const drawerLinks = NAV.map(([t, h]) => `<a href="${h}" class="font-serif text-2xl text-white py-3 border-b border-white/10 hover:text-brand-accent hover:pl-2 transition-all">${t}</a>`).join("");

    host.innerHTML = `
    <header id="hdr" class="fixed bg-transparent py-4 w-full top-0 z-[100] transition-all duration-500">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="flex items-center justify-between h-20 md:h-24 relative">
          <div class="md:hidden flex items-center gap-1">
            <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 text-brand-accent transition-all active:scale-90" aria-label="My Account"><i class="far fa-user text-sm"></i></a>
            <a href="cart.html" class="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/5 text-brand-accent transition-all active:scale-90" aria-label="Cart"><i class="fas fa-shopping-bag text-sm"></i><span data-cart-badge class="hidden absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-brand-accent text-brand-bg text-[9px] font-bold grid place-items-center">0</span></a>
          </div>
          <div class="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
            <a href="index.html" aria-label="Mood Perfume home"><img src="${LOGO}" alt="Mood Perfume" class="h-12 md:h-16 aspect-square object-contain" data-ph="logo"></a>
          </div>
          <nav class="hidden md:block absolute left-1/2 -translate-x-1/2" aria-label="Primary"><ul class="flex items-center gap-8">${links}</ul></nav>
          <div class="hidden md:flex items-center gap-5 ml-auto">
            <button class="w-9 h-9 flex items-center justify-center rounded-full text-brand-accent hover:bg-white/5 transition-all active:scale-90" aria-label="Search"><i class="fas fa-magnifying-glass text-sm"></i></button>
            <button class="text-xs font-bold tracking-wider text-brand-accent border border-brand-accent/40 rounded-full px-2.5 py-1 hover:bg-brand-accent hover:text-brand-bg transition-all" aria-label="Switch to Arabic">AR</button>
            <a href="#" class="w-9 h-9 flex items-center justify-center rounded-full text-brand-accent hover:bg-white/5 transition-all active:scale-90" aria-label="Account"><i class="far fa-user text-sm"></i></a>
            <a href="wishlist.html" class="relative w-9 h-9 flex items-center justify-center rounded-full text-brand-accent hover:bg-white/5 transition-all active:scale-90" aria-label="Wishlist"><i class="far fa-heart text-sm"></i><span data-wish-badge class="hidden absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-brand-accent text-brand-bg text-[9px] font-bold grid place-items-center">0</span></a>
            <a href="cart.html" class="relative w-9 h-9 flex items-center justify-center rounded-full text-brand-accent hover:bg-white/5 transition-all active:scale-90" aria-label="Cart"><i class="fas fa-shopping-bag text-sm"></i><span data-cart-badge class="hidden absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-brand-accent text-brand-bg text-[9px] font-bold grid place-items-center">0</span></a>
          </div>
          <button id="burger" class="md:hidden w-9 h-9 flex items-center justify-center rounded-full text-brand-accent hover:bg-white/5 transition-all active:scale-90 ml-auto" aria-label="Open menu"><i class="fas fa-bars"></i></button>
        </div>
      </div>
    </header>
    <div id="drawerBd" class="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm opacity-0 invisible transition-all duration-400"></div>
    <aside id="drawer" class="fixed top-0 right-0 z-[120] h-[100dvh] w-[84vw] max-w-sm bg-brand-dark border-l border-brand-accent/20 p-6 translate-x-full transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] flex flex-col" aria-label="Mobile menu">
      <div class="flex items-center justify-between mb-10">
        <img src="${LOGO}" alt="Mood Perfume" class="h-14 aspect-square object-contain" data-ph="logo">
        <button id="drawerClose" class="w-10 h-10 grid place-items-center rounded-full text-brand-accent hover:bg-white/5" aria-label="Close menu"><i class="fas fa-xmark text-lg"></i></button>
      </div>
      <nav class="flex flex-col">${drawerLinks}</nav>
      <div class="mt-auto flex items-center gap-5 text-brand-accent text-xl">
        <a href="${MP.IG}" target="_blank" rel="noopener" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        <a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
        <span class="ml-auto text-sm font-bold">AR</span>
      </div>
    </aside>`;

    // sticky transparent -> solid
    const hdr = $("#hdr");
    const onScroll = () => {
      const solid = window.scrollY > 40;
      hdr.classList.toggle("bg-brand-dark/95", solid);
      hdr.classList.toggle("backdrop-blur-md", solid);
      hdr.classList.toggle("shadow-lg", solid);
      hdr.classList.toggle("shadow-black/20", solid);
      hdr.classList.toggle("py-2", solid);
      hdr.classList.toggle("py-4", !solid);
      hdr.classList.toggle("bg-transparent", !solid);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // mobile drawer
    const drawer = $("#drawer"), bd = $("#drawerBd");
    const open = () => { drawer.classList.remove("translate-x-full"); bd.classList.remove("opacity-0", "invisible"); document.body.style.overflow = "hidden"; };
    const close = () => { drawer.classList.add("translate-x-full"); bd.classList.add("opacity-0", "invisible"); document.body.style.overflow = ""; };
    $("#burger").addEventListener("click", open);
    $("#drawerClose").addEventListener("click", close);
    bd.addEventListener("click", close);
    $$("#drawer a").forEach(a => a.addEventListener("click", close));

    revealHeader();
  }

  /* ---------------- reveal header once Tailwind (Play CDN) has JIT-compiled it ----------------
     The header markup above is injected at runtime, so on a fresh load Tailwind's Play CDN
     hasn't yet generated CSS for its header-unique classes (md:hidden/md:block/md:flex, z-[100]);
     until it does, the header paints in its unstyled mobile-first fallback (burger shown, desktop
     nav hidden) — the "mobile flash". `#site-header` starts at opacity:0 (inline <style> in each
     page's <head>, independent of Tailwind); we fade it in only once compilation has actually
     landed, detected by the arbitrary `z-[100]` on #hdr resolving from "auto" → "100". That's a
     breakpoint-independent signal (unlike md:* which never resolves at mobile widths) polled via
     getComputedStyle rather than a fixed timeout, with a safety deadline so it can never stay hidden. */
  function revealHeader() {
    const host = $("#site-header"), hdr = $("#hdr");
    if (!host || !hdr) return;
    const start = performance.now();
    (function check() {
      const compiled = getComputedStyle(hdr).zIndex === "100";
      if (compiled || performance.now() - start > 2000) host.classList.add("header-ready");
      else requestAnimationFrame(check);
    })();
  }

  /* ---------------- wishlist heart delegation (on product cards) ---------------- */
  function wishlistHearts() {
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-wish]");
      if (!btn) return;
      e.preventDefault(); e.stopPropagation();     // don't follow the card link
      const on = MP.wish.toggle(btn.dataset.wish);
      btn.classList.toggle("is-wished", on);
      const ic = btn.querySelector("i"); if (ic) ic.className = (on ? "fas" : "far") + " fa-heart";
    });
  }

  /* ---------------- scroll parallax (translateY(rect.top * .3)) ----------------
     Registered once; queries layers live so it works after SPA content swaps. */
  function parallax() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ticking = false;
    function update() {
      ticking = false;
      $$("[data-parallax] .parallax-bg").forEach(l => {
        const sec = l.closest("[data-parallax]");
        l.style.transform = `translateY(${sec.getBoundingClientRect().top * 0.3}px)`;
      });
    }
    window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }
  MP.parallax = update => $$("[data-parallax] .parallax-bg").forEach(l => { const s = l.closest("[data-parallax]"); l.style.transform = `translateY(${s.getBoundingClientRect().top * 0.3}px)`; });

  /* ---------------- active nav state (updated on every SPA navigation) ---------------- */
  function updateNavActive() {
    const key = document.body.dataset.page || "";
    $$(".nav-link").forEach(a => {
      const on = a.dataset.nav === key;
      a.classList.toggle("text-brand-accent", on);
      a.classList.toggle("text-brand-text/80", !on);
      const u = a.querySelector(".nav-underline");
      if (u) { u.classList.toggle("w-full", on); u.classList.toggle("w-0", !on); u.classList.toggle("group-hover:w-full", !on); }
    });
  }

  /* ---------------- FOOTER ---------------- */
  function footer() {
    const host = $("#site-footer"); if (!host) return;
    const links = [["Home", "index.html"], ["About Us", "about.html"], ["Tips", "tips.html"], ["Contact Us", "contact.html"]]
      .map(([t, h]) => `<li><a href="${h}" class="hover:text-brand-accent transition-colors">${t}</a></li>`).join("");
    const gallery = MP.GALLERY;
    const tiles = gallery.concat(gallery).map(f => `<div class="flex-shrink-0"><img src="${f}" alt="Scent inspiration" class="h-40 w-52 object-cover rounded-xl border border-white/5" loading="lazy" data-ph="photo"></div>`).join("");

    host.innerHTML = `
    <footer class="bg-brand-dark text-brand-text/70">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center pt-12">
          <a href="index.html" class="inline-block mb-3"><img src="${LOGO}" alt="Mood Perfume" class="h-24 md:h-32 aspect-square object-contain mx-auto" data-ph="logo"></a>
          <p class="text-brand-text/50 text-sm tracking-[0.3em] mb-6" lang="ar" dir="rtl">مود بيرفيوم</p>
          <nav class="mb-8"><ul class="flex justify-center flex-wrap gap-x-6 gap-y-2">${links}</ul></nav>
          <div class="flex justify-center space-x-6 mb-10 text-2xl">
            <a href="${MP.FB}" target="_blank" rel="noopener" aria-label="Facebook" class="hover:text-brand-accent transition-colors"><i class="fab fa-facebook-f"></i></a>
            <a href="${MP.IG}" target="_blank" rel="noopener" aria-label="Instagram" class="hover:text-brand-accent transition-colors"><i class="fab fa-instagram"></i></a>
            <a href="${WA}" target="_blank" rel="noopener" aria-label="WhatsApp" class="hover:text-brand-accent transition-colors"><i class="fab fa-whatsapp"></i></a>
          </div>
        </div>
        <div class="border-t border-brand-accent/10 pt-10">
          <div class="text-center mb-8">
            <h3 class="text-3xl font-serif text-brand-accent mb-1">Scent Inspirations</h3>
            <p class="text-brand-text/70">A glimpse into our world of fragrance.</p>
          </div>
          <div class="marquee-wrap relative overflow-hidden" style="--dur:50s"><div class="marquee-track gap-4">${tiles}</div></div>
        </div>
        <div class="text-center py-12">
          <p class="text-sm md:text-base">© 2026 Mood Perfume. All rights reserved.</p>
        </div>
      </div>
    </footer>`;
  }

  /* ---------------- back to top ---------------- */
  function backToTop() {
    const b = document.createElement("button");
    b.className = "fixed right-6 bottom-6 z-[90] w-12 h-12 rounded-full bg-brand-accent text-brand-bg grid place-items-center shadow-lg opacity-0 invisible translate-y-3 transition-all duration-400 hover:-translate-y-1";
    b.setAttribute("aria-label", "Back to top");
    b.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(b);
    b.addEventListener("click", () => MP.scrollTo(0));
    window.addEventListener("scroll", () => {
      const on = window.scrollY > 700;
      b.classList.toggle("opacity-0", !on); b.classList.toggle("invisible", !on); b.classList.toggle("translate-y-3", !on);
    }, { passive: true });
  }

  /* ---------------- Lenis smooth scroll ---------------- */
  function smoothScroll() {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    MP.scrollTo = (target, opts) => window.scrollTo({ top: (typeof target === "number" ? target : 0), behavior: "smooth" });
    if (reduce) return;
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js";
    s.onload = () => {
      const lenis = new Lenis({ duration: 1.1, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true, syncTouch: false });
      MP.lenis = lenis;
      MP.scrollTo = (t) => lenis.scrollTo(t, { duration: 1.2 });
      function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    };
    document.head.appendChild(s);
  }

  /* ---------------- WhatsApp links ----------------
     Markup uses <a data-wa data-wa-text="…"> so the number lives in exactly
     one place (MP.WA) instead of being hardcoded per page. */
  function resolveWaLinks(scope) {
    $$("[data-wa]", scope || document).forEach(a => {
      const t = a.dataset.waText;
      a.href = MP.WA + (t ? "?text=" + encodeURIComponent(t) : "");
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ---------------- run the current page's init + shared refreshes ---------------- */
  function mountPage() {
    updateNavActive();
    const key = document.body.dataset.init || "";
    if (MP.pages && typeof MP.pages[key] === "function") { try { MP.pages[key](); } catch (e) { console.error(e); } }
    resolveWaLinks();
    MP.sweepImages();   // catch static <img> that failed before the listener attached
    MP.reveal();
    MP.parallax();
    MP.cart.sync(); MP.wish.sync();
  }
  MP.mountPage = mountPage;

  /* ---------------- SPA router: fetch → swap <main> → fade in (no reload) ---------------- */
  const htmlCache = new Map();

  function samePage(href) {
    return new URL(href, location.href).pathname === location.pathname;
  }

  async function fetchDoc(url) {
    if (htmlCache.has(url)) return htmlCache.get(url);
    const res = await fetch(url, { headers: { "X-SPA": "1" } });
    const txt = await res.text();
    const doc = new DOMParser().parseFromString(txt, "text/html");
    htmlCache.set(url, doc);
    return doc;
  }

  async function swap(url, push) {
    let doc;
    try { doc = await fetchDoc(url); }
    catch (e) { location.href = url; return; }            // network fail → hard nav
    const newMain = doc.querySelector("main");
    const curMain = document.querySelector("main");
    if (!newMain || !curMain) { location.href = url; return; }

    MP.runCleanups();                                     // stop old page's timers/listeners

    // fade the outgoing content, then swap
    curMain.classList.add("spa-leave");
    await new Promise(r => setTimeout(r, 180));

    document.title = doc.title;
    document.body.dataset.page = doc.body.dataset.page || "";
    document.body.dataset.init = doc.body.dataset.init || "";
    curMain.replaceWith(newMain);

    if (push) history.pushState({ spa: true }, "", url);
    // reset scroll (instant) so the new page starts at top
    if (MP.lenis) { MP.lenis.scrollTo(0, { immediate: true }); MP.lenis.resize(); } else window.scrollTo(0, 0);

    newMain.classList.add("spa-enter");
    requestAnimationFrame(() => requestAnimationFrame(() => newMain.classList.add("spa-enter-active")));
    setTimeout(() => newMain.classList.remove("spa-enter", "spa-enter-active"), 700);

    mountPage();
  }
  MP.swap = swap;

  function isInternal(href) {
    return href && !href.startsWith("#") && !/^https?:|^mailto:|^tel:|^wa\.me/.test(href) &&
      (/\.html($|[?#])/.test(href) || href === "index.html");
  }

  function router() {
    document.body.classList.add("page-fade-in");   // first-load fade
    document.addEventListener("click", e => {
      const a = e.target.closest("a");
      if (!a) return;
      const raw = a.getAttribute("href");
      if (!raw) return;
      // in-page anchor → smooth scroll
      if (raw.startsWith("#") && raw.length > 1) {
        const t = document.querySelector(raw);
        if (t) { e.preventDefault(); MP.scrollTo ? MP.scrollTo(t) : t.scrollIntoView({ behavior: "smooth" }); }
        return;
      }
      if (a.target === "_blank" || a.hasAttribute("download") || e.metaKey || e.ctrlKey || e.shiftKey) return;
      if (!isInternal(raw)) return;
      e.preventDefault();
      const url = new URL(raw, location.href).href;
      if (samePage(url) && !new URL(url).search) { MP.scrollTo && MP.scrollTo(0); return; }
      swap(url, true);
    });
    window.addEventListener("popstate", () => swap(location.href, false));
  }

  document.addEventListener("DOMContentLoaded", () => {
    MP.imageFallback(); // must run before any <img> is injected
    header();          // injected once, persists across SPA navigations
    footer();          // injected once, persists across SPA navigations
    smoothScroll();    // Lenis
    wishlistHearts();  // delegated (once)
    parallax();        // scroll listener registered once
    backToTop();
    router();          // intercept links + popstate
    mountPage();       // run the first page's init
  });
})(window.MP);
