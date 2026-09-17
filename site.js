/* =========================================================================
   EReaders shared behaviour — products.html and product.html.
   Requires catalog.js to be loaded first.
   ========================================================================= */
(function (global) {
  'use strict';
  const C = global.EReadersCatalog;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const onMQ = (mq, fn) => (mq.addEventListener ? mq.addEventListener('change', fn) : mq.addListener(fn));

  /* ---------------------------------------------------------------------
     Product card markup (shop grid + related products)
     --------------------------------------------------------------------- */
  function priceHTML(p) {
    const f = C.formatPrice(p);
    return f
      ? '<div class="price"><strong>' + f + '</strong><small>List price</small></div>'
      : '<div class="price price--tbc"><strong>Price coming soon</strong></div>';
  }

  function compareButtonHTML(p, compareIds, labels) {
    const inCompare = compareIds.includes(p.id);
    const full = !inCompare && compareIds.length >= C.MAX_COMPARE;
    return '<button class="btn-ghost' + (labels.large ? ' btn-ghost--lg' : '') + '" type="button" data-compare="' + p.id + '" aria-pressed="' + inCompare + '"' +
      (full ? ' disabled title="You can compare up to ' + C.MAX_COMPARE + ' devices"' : '') + '>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (inCompare ? '<path d="M5 12.5l4.5 4.5L19 7.5"/>' : '<path d="M12 5v14M5 12h14"/>') + '</svg>' +
      '<span>' + (inCompare ? labels.on : labels.off) + '</span>' +
      (labels.withName ? '<span class="visually-hidden"> ' + C.esc(p.name) + '</span>' : '') + '</button>';
  }

  function cardHTML(p, compareIds, options) {
    const opts = options || {};
    const specs = C.specChips(p).map((s) => '<li>' + C.esc(s) + '</li>').join('');
    const tag = opts.headingLevel || 'h3';
    return '<li class="card">' +
      '<div class="card-media">' +
        '<img src="' + p.image + '" alt="' + C.esc(p.alt) + '" decoding="async">' +
        (p.status === 'coming-soon' ? '<span class="status">Coming soon</span>' : '') +
      '</div>' +
      '<div class="card-body">' +
        '<p class="card-brand">' + C.esc(p.brandName) + '</p>' +
        '<' + tag + ' class="card-title"><a href="' + p.url + '">' + C.esc(p.name) + '</a></' + tag + '>' +
        (specs ? '<ul class="specs" aria-label="Key details">' + specs + '</ul>' : '') +
        '<div class="card-foot">' + priceHTML(p) +
          (opts.compare === false ? '' : compareButtonHTML(p, compareIds, { off: 'Compare', on: 'Comparing', withName: true })) +
        '</div>' +
      '</div>' +
    '</li>';
  }

  /* ---------------------------------------------------------------------
     Dialog helper (focus returns to the element that opened it)
     --------------------------------------------------------------------- */
  function setupDialog(dialog, getFallbackFocus) {
    let opener = null;
    function restore() {
      let target = opener;
      if ((!target || !document.contains(target)) && getFallbackFocus) target = getFallbackFocus();
      if (target) target.focus({ preventScroll: true });
      opener = null;
    }
    function close() {
      if (typeof dialog.close === 'function') { if (dialog.open) dialog.close(); }
      else { dialog.removeAttribute('open'); restore(); }
    }
    dialog.addEventListener('close', restore);
    dialog.addEventListener('click', function (e) {
      if (e.target === dialog || e.target.closest('[data-close]')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && dialog.open) { e.preventDefault(); close(); }
    });
    return {
      open: function (trigger) {
        opener = trigger || document.activeElement;
        if (typeof dialog.showModal === 'function') { if (!dialog.open) dialog.showModal(); }
        else dialog.setAttribute('open', '');
        const closeBtn = $('[data-close]', dialog);
        if (closeBtn) closeBtn.focus();
      },
      close: close
    };
  }

  /* ---------------------------------------------------------------------
     Navigation menu (tablet / phone) — one shared set of nav nodes
     --------------------------------------------------------------------- */
  function setupMenu() {
    const nav = $('#site-nav');
    if (!nav) return;
    const toggle = $('.menu-toggle', nav);
    const menu = $('#primary-menu');
    const isOpen = () => nav.classList.contains('is-open');
    function setMenu(open, focusToggle) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      if (open) { const first = $('a', menu); if (first) first.focus(); }
      else if (focusToggle) toggle.focus();
    }
    toggle.addEventListener('click', () => setMenu(!isOpen(), isOpen()));
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen() && !document.querySelector('dialog[open]')) { e.preventDefault(); setMenu(false, true); }
    });
    document.addEventListener('pointerdown', function (e) { if (isOpen() && !nav.contains(e.target)) setMenu(false, false); });
    nav.addEventListener('focusout', function (e) { if (isOpen() && e.relatedTarget && !nav.contains(e.relatedTarget)) setMenu(false, false); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a') && isOpen()) setMenu(false, false); });
    onMQ(window.matchMedia('(min-width: 1081px)'), function () { if (isOpen()) setMenu(false, false); });
  }

  /* ---------------------------------------------------------------------
     Static star field — generated once, redrawn only on significant resize
     --------------------------------------------------------------------- */
  function setupStars() {
    const canvas = $('#stars');
    const ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
    if (!ctx) return;
    let seed = 20260916;
    const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
    const stars = [];
    for (let i = 0; i < 320; i++) stars.push({ x: rnd(), y: rnd(), r: 0.4 + rnd() * 0.8, a: 0.12 + rnd() * 0.4, blur: false });
    for (let i = 0; i < 40; i++) stars.push({ x: rnd(), y: rnd(), r: 1.1 + rnd() * 1.0, a: 0.07 + rnd() * 0.1, blur: true });
    let w0 = 0, h0 = 0, raf = 0;
    function draw() {
      const w = window.innerWidth, h = window.innerHeight;
      if (w === w0 && Math.abs(h - h0) < 120) return;
      w0 = w; h0 = h;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#F7F4ED';
      stars.forEach(function (p) {
        ctx.globalAlpha = p.a;
        ctx.shadowBlur = p.blur ? 6 : 0;
        ctx.shadowColor = p.blur ? 'rgba(247, 244, 237, 0.9)' : 'transparent';
        ctx.beginPath(); ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    }
    window.addEventListener('resize', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; draw(); });
    });
    draw();
  }

  setupMenu();
  setupStars();
  $$('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });

  global.EReadersUI = { $, $$, priceHTML, compareButtonHTML, cardHTML, setupDialog };
})(window);
