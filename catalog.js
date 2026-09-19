/* =========================================================================
   EReaders catalog — shared by products.html and product.html.
   -------------------------------------------------------------------------
   EDIT PRODUCTS HERE.
   Prices are US list prices (USD) gathered in September 2026 from the Kobo
   compare page, the official BOOX shop, and published Amazon Kindle list
   prices. Verify and update before launch.

     id:      URL slug → product.html?id=<id>
     price:   number, or null to show "Price coming soon"
     status:  'available' | 'coming-soon'
     screen:  display size in inches (string) or null
     colour:  true (colour E Ink) | false (black & white) | null (unknown → hidden)
     pen:     true | false | null (unknown → hidden)
     buttons: true if the device has physical page-turn buttons
     form:    illustration shape — 'slim' | 'buttons' | 'pen' | 'phone'
     family:  optional — devices sharing a family are shown as versions of each other
     variant: optional — short label for this device within its family
     options: optional — extra choices shown as option cards, e.g.
              { 'Colour': [{ label: 'Black', image: 'assets/x.jpg' }, { label: 'Jade' }],
                'Storage': [{ label: '16 GB', price: 159.99 }, { label: '32 GB', price: 179.99 }] }
              Storage sizes below are each model's base configuration — verify before launch.
              Devices with unconfirmed storage (Scribe, Palma 3, Note Mini C, Note Air6 C) have none listed.
     photos:  optional — extra product photos shown below the specifications, e.g.
              ['assets/photos/kindle-paperwhite-1.jpg', 'assets/photos/kindle-paperwhite-2.jpg']
              Until set, the page shows empty photo frames in their place.
   ========================================================================= */
(function (global) {
  'use strict';

  /* STORE CONTACT — shown under the product photos ("Also order from").
     whatsapp: international number, digits only (e.g. '8801XXXXXXXXX')
     phone:    number as dialled, e.g. '+8801XXXXXXXXX'
     maps:     Google Maps link to the shop
     Leave a value empty to show that button greyed out. */
  const CONTACT = {
    whatsapp: '8801811411811',
    phone: '+8801811411811',
    maps: 'https://maps.app.goo.gl/vXz8oHogEz2aisP98'
  };

  /* CARE PLANS — optional protection add-ons shown under the Buy buttons.
     DRAFT: names, terms and prices below are placeholders. Replace with the shop's real plans before launch.
       name:   plan name (bold)
       detail: what it covers
       years:  coverage length, shown as the green badge
       rate:   price as a share of the device's list price (0.10 = 10%), or use price: 19.99 for a fixed price */
  const CARE_PLANS = [
    { id: 'care', name: 'EReaders Care', detail: 'Free repair for hardware faults for 365 days', years: 1, rate: 0.08 },
    { id: 'screen', name: 'EReaders Screen Care', detail: 'One screen replacement for accidental cracks within 365 days', years: 1, rate: 0.12 },
    { id: 'care-plus', name: 'EReaders Care+', detail: 'Hardware repair plus one screen replacement for 730 days', years: 2, rate: 0.18 }
  ];

  const BRANDS = {
    kindle: { name: 'Kindle', store: 'https://www.amazon.com/' },
    kobo: { name: 'Kobo', store: 'https://ereader.kobo.com/en-us' },
    boox: { name: 'BOOX', store: 'https://shop.boox.com/' }
  };

  const PRODUCTS = [
    // ---- Kindle ----
    { id: 'kindle', brand: 'kindle', name: 'Kindle', price: 109.99, status: 'available', screen: '6', colour: false, pen: false, buttons: false, form: 'slim', options: { Storage: [{ label: '16 GB', price: 109.99 }] }, blurb: 'The compact, everyday Kindle for reading anywhere.' },
    { id: 'kindle-paperwhite', family: 'paperwhite', variant: 'Standard', brand: 'kindle', name: 'Kindle Paperwhite', price: 159.99, status: 'available', screen: '7', colour: false, pen: false, buttons: false, form: 'slim', options: { Storage: [{ label: '16 GB', price: 159.99 }] }, blurb: 'A larger glare-free screen in a slim, waterproof design.' },
    { id: 'kindle-paperwhite-se', family: 'paperwhite', variant: 'Signature Edition', brand: 'kindle', name: 'Kindle Paperwhite Signature Edition', price: 199.99, status: 'available', screen: '7', colour: false, pen: false, buttons: false, form: 'slim', options: { Storage: [{ label: '32 GB', price: 199.99 }] }, blurb: 'Paperwhite with more storage, an auto-adjusting light, and wireless charging.' },
    { id: 'kindle-colorsoft', family: 'colorsoft', variant: 'Standard', brand: 'kindle', name: 'Kindle Colorsoft', price: 249.99, status: 'available', screen: '7', colour: true, pen: false, buttons: false, form: 'slim', options: { Storage: [{ label: '16 GB', price: 249.99 }] }, blurb: 'Kindle reading with a colour display for covers, comics, and highlights.' },
    { id: 'kindle-colorsoft-se', family: 'colorsoft', variant: 'Signature Edition', brand: 'kindle', name: 'Kindle Colorsoft Signature Edition', price: 279.99, status: 'available', screen: '7', colour: true, pen: false, buttons: false, form: 'slim', options: { Storage: [{ label: '32 GB', price: 279.99 }] }, blurb: 'The colour Kindle with extra storage and wireless charging.' },
    { id: 'kindle-scribe', family: 'scribe', variant: 'Black & white', brand: 'kindle', name: 'Kindle Scribe', price: 499.99, status: 'available', screen: '11', colour: false, pen: true, buttons: false, form: 'pen', blurb: 'A large-screen Kindle for reading and writing, with a pen included.' },
    { id: 'kindle-scribe-colorsoft', family: 'scribe', variant: 'Colorsoft', brand: 'kindle', name: 'Kindle Scribe Colorsoft', price: 629.99, status: 'available', screen: '11', colour: true, pen: true, buttons: false, form: 'pen', blurb: 'Kindle Scribe with a colour display for notes, highlights, and sketches.' },

    // ---- Kobo ----
    { id: 'kobo-clara-bw', family: 'clara', variant: 'Black & white', brand: 'kobo', name: 'Kobo Clara BW', price: 159.99, status: 'available', screen: '6', colour: false, pen: false, buttons: false, form: 'slim', options: { Storage: [{ label: '16 GB', price: 159.99 }] }, blurb: 'A light, waterproof 6-inch reader with a crisp black-and-white screen.' },
    { id: 'kobo-clara-colour', family: 'clara', variant: 'Colour', brand: 'kobo', name: 'Kobo Clara Colour', price: 179.99, status: 'available', screen: '6', colour: true, pen: false, buttons: false, form: 'slim', options: { Storage: [{ label: '16 GB', price: 179.99 }] }, blurb: 'A pocketable, waterproof reader with a colour E Ink screen.' },
    { id: 'kobo-libra-colour', brand: 'kobo', name: 'Kobo Libra Colour', price: 259.99, status: 'available', screen: '7', colour: true, pen: true, buttons: true, form: 'buttons', options: { Storage: [{ label: '32 GB', price: 259.99 }] }, blurb: 'Colour reading with page-turn buttons and support for a stylus.' },
    { id: 'kobo-elipsa-2e', brand: 'kobo', name: 'Kobo Elipsa 2E', price: 399.99, status: 'available', screen: '10.3', colour: false, pen: true, buttons: false, form: 'pen', options: { Storage: [{ label: '32 GB', price: 399.99 }] }, blurb: 'A large reading and note-taking device designed around its stylus.' },

    // ---- BOOX ----
    { id: 'boox-go-6-gen2', brand: 'boox', name: 'BOOX Go 6 (Gen II)', price: 199.99, status: 'available', screen: '6', colour: false, pen: false, buttons: false, form: 'slim', options: { Storage: [{ label: '32 GB', price: 199.99 }] }, blurb: 'A compact Android-based E Ink reader for books and apps.' },
    { id: 'boox-go-7', brand: 'boox', name: 'BOOX Go 7', price: 249.99, status: 'available', screen: '7', colour: false, pen: false, buttons: true, form: 'buttons', options: { Storage: [{ label: '64 GB', price: 249.99 }] }, blurb: 'A 7-inch reader with physical page-turn buttons.' },
    { id: 'boox-go-color-7-gen2', brand: 'boox', name: 'BOOX Go Color 7 (Gen II)', price: 279.99, status: 'available', screen: '7', colour: true, pen: true, buttons: true, form: 'buttons', options: { Storage: [{ label: '64 GB', price: 279.99 }] }, blurb: 'A 7-inch colour E Ink reader with page-turn buttons and stylus support.' },
    { id: 'boox-palma-3', brand: 'boox', name: 'BOOX Palma 3', price: 339.99, status: 'coming-soon', screen: '6.13', colour: null, pen: null, buttons: false, form: 'phone', blurb: 'A phone-sized E Ink reader that fits in a pocket.' },
    { id: 'boox-note-mini-c', brand: 'boox', name: 'BOOX Note Mini C', price: 579.99, status: 'coming-soon', screen: '8.52', colour: true, pen: true, buttons: false, form: 'pen', blurb: 'A portable colour E Ink note-taker.' },
    { id: 'boox-note-air6-c', brand: 'boox', name: 'BOOX Note Air6 C', price: 579.99, status: 'available', screen: '10.3', colour: true, pen: true, buttons: false, form: 'pen', blurb: 'A 10.3-inch colour E Ink tablet for reading, notes, and documents.' }
  ];

  /* ---------------------------------------------------------------------
     Illustrations — generic device drawings, not photos of specific models.
     --------------------------------------------------------------------- */
  const COLOUR_BLOCKS = ['#C0633F', '#3F7C8C', '#BA944B', '#5F7390', '#8C6B2E', '#2E4666'];
  const LINE_PATTERN = [1, 0.93, 1, 0.86, 0.97, 1, 0.68, 0, 1, 0.95, 1, 0.82, 0.58, 1, 0.9, 1];

  function lines(x, y, w, n, gap) {
    let s = '';
    for (let i = 0; i < n; i++) {
      const f = LINE_PATTERN[i % LINE_PATTERN.length];
      if (f) s += "<rect x='" + x + "' y='" + (y + i * gap).toFixed(1) + "' width='" + (w * f).toFixed(1) + "' height='2.6' rx='1.3' fill='#17283E' fill-opacity='.5'/>";
    }
    return s;
  }
  function colourGrid(x, y, w, h) {
    const cw = (w - 6) / 2, ch = (h - 12) / 3;
    let s = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
      s += "<rect x='" + (x + c * (cw + 6)).toFixed(1) + "' y='" + (y + r * (ch + 6)).toFixed(1) + "' width='" + cw.toFixed(1) + "' height='" + ch.toFixed(1) + "' rx='2' fill='" + COLOUR_BLOCKS[(r * 2 + c) % COLOUR_BLOCKS.length] + "' fill-opacity='.9'/>";
    }
    return s;
  }
  function frame(x, y, w, h, r) {
    return "<rect x='" + x + "' y='" + y + "' width='" + w + "' height='" + h + "' rx='" + r + "' fill='url(#b)'/>" +
      "<rect x='" + (x + 0.5) + "' y='" + (y + 0.5) + "' width='" + (w - 1) + "' height='" + (h - 1) + "' rx='" + (r - 0.5) + "' fill='none' stroke='#E6CEA0' stroke-opacity='.3'/>";
  }
  function deviceSVG(form, colour, screen) {
    const defs = "<defs><linearGradient id='b' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#2E4668'/><stop offset='1' stop-color='#0E1826'/></linearGradient></defs>";
    const shadow = (cx, rx) => "<ellipse cx='" + cx + "' cy='193' rx='" + rx + "' ry='5' fill='#000' fill-opacity='.18'/>";
    let body = '';
    if (form === 'buttons') {
      body = shadow(80, 56) + frame(18, 8, 124, 178, 16) + "<rect x='26' y='18' width='86' height='158' rx='4' fill='#F7F4ED'/>" +
        (colour ? colourGrid(34, 28, 70, 138) : "<rect x='34' y='30' width='14' height='14' rx='2' fill='#BA944B'/>" + lines(34, 52, 70, 14, 8.6)) +
        "<rect x='120' y='66' width='12' height='26' rx='5' fill='#E6CEA0' fill-opacity='.85'/><rect x='120' y='98' width='12' height='26' rx='5' fill='#E6CEA0' fill-opacity='.5'/>";
    } else if (form === 'pen') {
      body = shadow(80, 64) + frame(12, 6, 130, 182, 12) + "<rect x='21' y='16' width='112' height='162' rx='4' fill='#F4F0E6'/>" +
        (colour
          ? colourGrid(30, 26, 44, 70) + "<g stroke='#17283E' stroke-opacity='.6' stroke-width='1.6' fill='none' stroke-linecap='round'><path d='M84 32c5-4 9 3 14-1s8 3 12-1'/><path d='M84 46c5-4 9 3 14 0s7 2 11-1'/><path d='M84 60c5-3 9 2 13 0'/></g>" +
            "<path d='M32 150l18-20 12 10 16-22 30 32' stroke='#3F7C8C' stroke-width='2' fill='none' stroke-linejoin='round' stroke-linecap='round'/><circle cx='112' cy='118' r='6' fill='#C0633F' fill-opacity='.85'/>"
          : "<g stroke='#17283E' stroke-opacity='.6' stroke-width='1.6' fill='none' stroke-linecap='round'><path d='M31 36c5-5 9 3 14-1s8 3 13-1 8 2 12 0 7 2 11 0'/><path d='M31 50c6-4 9 3 15-1s9 3 13 0 9 2 14-1'/><path d='M31 64c5-4 10 3 15 0s8 2 12-1'/></g>" +
            "<rect x='31' y='82' width='92' height='60' rx='4' fill='none' stroke='#BA944B' stroke-width='1.6' stroke-dasharray='3 3'/><path d='M40 132l16-18 12 11 14-20 30 27' stroke='#17283E' stroke-opacity='.55' stroke-width='1.6' fill='none' stroke-linejoin='round' stroke-linecap='round'/>") +
        "<g transform='rotate(-10 156 110)'><rect x='152' y='38' width='8' height='124' rx='4' fill='#E6CEA0'/><rect x='152' y='56' width='8' height='3' fill='#BA944B'/><path d='M152 160l4 14 4-14z' fill='#BA944B'/></g>";
    } else if (form === 'phone') {
      body = shadow(85, 40) + frame(50, 6, 70, 182, 14) + "<rect x='57' y='16' width='56' height='160' rx='4' fill='#F7F4ED'/>" +
        (colour ? colourGrid(63, 26, 44, 140) : "<rect x='63' y='26' width='26' height='4' rx='2' fill='#BA944B'/>" + lines(63, 40, 44, 15, 8.6)) +
        "<rect x='121' y='50' width='3' height='22' rx='1.5' fill='#E6CEA0' fill-opacity='.7'/>";
    } else {
      body = shadow(80, 48) + frame(34, 8, 92, 176, 12) + "<rect x='42' y='18' width='76' height='150' rx='4' fill='#F7F4ED'/>" +
        (colour ? colourGrid(50, 28, 60, 130) : "<rect x='50' y='30' width='34' height='4' rx='2' fill='#BA944B'/>" + lines(50, 44, 60, 13, 8.6)) +
        "<rect x='72' y='174' width='16' height='2.5' rx='1.25' fill='#E6CEA0' fill-opacity='.35'/>";
    }
    // Scale the drawing by screen size so smaller readers look smaller (6″ ≈ 80%, 10″+ = 100%).
    const inches = parseFloat(screen) || 7;
    const s = Math.min(1, Math.max(0.78, 0.8 + (inches - 6) * 0.05));
    const scaled = "<g transform='translate(85 196) scale(" + s.toFixed(3) + ") translate(-85 -196)'>" + body + '</g>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 170 200'>" + defs + scaled + '</svg>');
  }

  /* ---------------------------------------------------------------------
     Derived fields + shared helpers
     --------------------------------------------------------------------- */
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  PRODUCTS.forEach(function (p, i) {
    p.order = i;
    p.brandName = BRANDS[p.brand].name;
    p.store = BRANDS[p.brand].store;
    p.url = 'product.html?id=' + encodeURIComponent(p.id);
    p.image = deviceSVG(p.form, p.colour === true, p.screen);
    p.alt = 'Illustration of ' + (p.screen ? 'a ' + p.screen + '-inch ' : 'an ') + (p.colour ? 'colour ' : '') +
      (p.form === 'pen' ? 'e-note tablet with a stylus' : p.form === 'phone' ? 'phone-sized e-reader' : 'e-reader');
    p.search = [p.name, p.brandName, p.blurb].join(' ').toLowerCase();
  });

  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));

  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }
  function formatPrice(p) {
    return typeof p.price === 'number' ? money.format(p.price) : null;
  }
  function specChips(p) {
    const out = [];
    if (p.screen) out.push(p.screen + '″ screen');
    if (p.colour === true) out.push('Colour');
    if (p.colour === false) out.push('Black & white');
    if (p.pen === true) out.push('Pen support');
    if (p.buttons) out.push('Page buttons');
    return out;
  }
  const displayLabel = (p) => (p.colour === true ? 'Colour E Ink' : p.colour === false ? 'Black & white E Ink' : null);
  const yesNo = (v) => (v === true ? 'Yes' : v === false ? 'No' : null);
  const statusLabel = (p) => (p.status === 'coming-soon' ? 'Coming soon' : 'Available');

  /* Compare list persists across pages (max 3). Storage can be unavailable. */
  const COMPARE_KEY = 'ereaders-compare';
  const MAX_COMPARE = 3;
  function loadCompare() {
    try {
      const ids = JSON.parse(localStorage.getItem(COMPARE_KEY) || '[]');
      return Array.isArray(ids) ? ids.filter((id) => byId[id]).slice(0, MAX_COMPARE) : [];
    } catch (e) { return []; }
  }
  function saveCompare(ids) {
    try { localStorage.setItem(COMPARE_KEY, JSON.stringify(ids)); } catch (e) { /* ignore */ }
  }

  global.EReadersCatalog = {
    CONTACT, CARE_PLANS, BRANDS, PRODUCTS, byId, esc, money, formatPrice, specChips, displayLabel, yesNo, statusLabel,
    MAX_COMPARE, loadCompare, saveCompare
  };
})(window);
