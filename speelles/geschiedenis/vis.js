'use strict';
/* =========================================================================
   GESCHIEDENIS: bouwstenen (canoniek: tools/speelles-engine/geschiedenis/vis.js)
   Familie E (historisch redeneren): volgorde vóór jaartal, oorzaak en gevolg op soort,
   bewijs uit de bron zelf, personen uit elkaar houden, en het antwoord goed opschrijven.
   Elke bouwsteen: VIS.naam = (podium, p, api) => opruim?  (alle inhoud via p)
   Alle bouwstenen werken ook als baas- of bewijsvraag ({t:'mc'}-plek in een pool of
   bewijsronde: {visual, p, vraag?}); ze roepen dan api.fout() bij elke fout.
   Vereist engine.js en geschiedenis/teken.js (GS). Zit in een IIFE: geen globale namen.
     tijdlijn       gebeurtenissen op volgorde zetten; een fout noemt beide jaartallen
     oorzakenweb    per kaart: oorzaak of gevolg, dan de soort (en eventueel direct/indirect)
     bronspeurder   een bewering bewijzen met een detail uit de bron (niet uit het onderschrift)
     personenbord   een feit bij de goede persoon zetten (Filipsen, Oranjes, pausen)
     touwtrek       particularisme tegenover centralisatie: welke kant trekt deze maatregel?
     antwoordbouwer formuleren: modus 'bouw' (zinnen kiezen per stap) of 'schrijf' (zelf typen,
                    nakijken op criteria, daarna het modelantwoord)
   ========================================================================= */
(() => {
  const fbEl = () => h('div', { class: 'feedback', 'aria-live': 'polite' });
  const zegt = (fb, soort, html) => { fb.className = 'feedback ' + soort; fb.innerHTML = html; };
  const schud = el => { el.classList.remove('gs-schud'); void el.offsetWidth; el.classList.add('gs-schud'); };
  const foutje = (api, mis) => { api.fout?.(); if (mis) api.spot(mis); };
  const lab = it => it.label || String(it.jaar);
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const SOORT = GS.SOORT;

  /* ===================================================================== TIJDLIJN
     p.items: [{id, t, jaar (getal), label?, baan?, w?, mis?}] ; p.start (aantal dat al ligt, standaard 1)
     p.vast (aanbieden in deze volgorde) ; p.banen {id: {naam, kleur}} ; p.toonJaar (jaartal al op de kaart) ; p.na */
  VIS.tijdlijn = (pod, p, api) => {
    const items = p.items.map((it, i) => ({ ...it, _i: i }));
    const opVolgorde = items.slice().sort((a, b) => a.jaar - b.jaar);
    const nStart = Math.min(p.start ?? 1, items.length - 1);
    const gelegd = [];
    for (let k = 0; k < nStart; k++) gelegd.push(opVolgorde[Math.round((k + .5) * opVolgorde.length / nStart - .5)]);
    gelegd.sort((a, b) => a.jaar - b.jaar);
    let rij = items.filter(it => !gelegd.includes(it));
    if (!p.vast) rij = shuffle(rij);
    const fb = fbEl(), nu = h('div', { class: 'gs-tl-nu' }), lijst = h('ol', { class: 'gs-tl' }), teller = h('div', { class: 'minis' });
    const kleur = it => (p.banen && p.banen[it.baan]?.kleur) || null;
    const kaart = (it, open) => h('div', { class: 'gs-tl-kaart' + (open ? ' open' : ''), style: kleur(it) ? `--baan:${kleur(it)}` : '' },
      open || p.toonJaar ? h('span', { class: 'gs-tl-jaar' }, lab(it)) : null, h('span', { class: 'gs-tl-t', html: it.t }),
      p.banen && it.baan ? h('small', { class: 'gs-tl-baan' }, p.banen[it.baan].naam) : null);
    function teken() {
      lijst.innerHTML = ''; nu.innerHTML = '';
      const it = rij[0];
      teller.textContent = it ? `Nog ${rij.length} te leggen` : '';
      if (it) { const k = kaart(it, false); k.classList.add('nu'); k._it = it; nu.append(h('div', { class: 'gs-tl-label' }, 'Waar hoort deze?'), k); }
      for (let k = 0; k <= gelegd.length; k++) {
        if (it) {
          const prev = gelegd[k - 1], next = gelegd[k];
          const ok = (!prev || prev.jaar <= it.jaar) && (!next || it.jaar <= next.jaar);
          const s = h('li', {}, h('button', { class: 'gs-tl-slot', type: 'button', 'aria-label': k === 0 ? 'Helemaal vooraan' : k === gelegd.length ? 'Helemaal achteraan' : 'Tussen deze twee', onclick: e => leg(k, e.currentTarget) }, k === 0 ? '↑ hier: het vroegst' : k === gelegd.length ? '↓ hier: het laatst' : '← hier ertussen'));
          s.firstChild._goed = ok; lijst.append(s);
        }
        if (k < gelegd.length) lijst.append(h('li', {}, kaart(gelegd[k], true)));
      }
      if (!it) { lijst.classList.add('af'); api.klaar(p.na); }
    }
    function leg(k, knopEl) {
      const it = rij[0]; if (!it) return;
      const prev = gelegd[k - 1], next = gelegd[k];
      if ((!prev || prev.jaar <= it.jaar) && (!next || it.jaar <= next.jaar)) {
        gelegd.splice(k, 0, it); rij.shift();
        api.geefXP(3, knopEl);
        zegt(fb, 'goed', `<b>Ja: ${lab(it)}.</b> ${it.w || ''}`);
        teken();
      } else {
        schud(knopEl);
        let tx;
        if (prev && prev.jaar > it.jaar) tx = `<b>Te laat.</b> “${it.t}” was in <b>${lab(it)}</b>, en dat is vóór “${prev.t}” (${lab(prev)}).`;
        else tx = `<b>Te vroeg.</b> “${it.t}” was in <b>${lab(it)}</b>, en dat is ná “${next.t}” (${lab(next)}).`;
        zegt(fb, 'fout', tx + (it.hint ? ' ' + it.hint : ''));
        foutje(api, it.mis || p.mis);
      }
    }
    pod.append(h('div', { class: 'vis gs-tijdlijn' }, p.vraag ? h('div', { class: 'vraag', style: 'margin:0', html: p.vraag }) : null, teller, nu, lijst, fb));
    teken();
  };

  /* ===================================================================== OORZAKENWEB
     p.gebeurtenis {t, jaar?} ; p.kaarten [{t, kant:'oorzaak'|'gevolg', soort, as2?, w, fout:{kant,soort,as2}, mis:{kant,soort,as2}|id}]
     p.vragen: ['kant','soort'] (standaard) en/of 'as2' ; p.as2 {vraag, opties:[{id, t}]} ; p.vast ; p.na */
  VIS.oorzakenweb = (pod, p, api) => {
    const g = p.gebeurtenis, vragen = p.vragen || ['kant', 'soort', ...(p.as2 ? ['as2'] : [])];
    const rij = p.vast ? p.kaarten.slice() : shuffle(p.kaarten);
    const fb = fbEl(), vak = h('div', { class: 'gs-ow-vak' }), teller = h('div', { class: 'minis' });
    const kolO = h('div', { class: 'gs-ow-kol' }, h('b', {}, '← Oorzaken')), kolG = h('div', { class: 'gs-ow-kol' }, h('b', {}, 'Gevolgen →'));
    const toonO = vragen.includes('kant') || rij.some(c => c.kant === 'oorzaak'), toonG = vragen.includes('kant') || rij.some(c => c.kant === 'gevolg');
    const web = h('div', { class: 'gs-ow-web' }, toonO ? kolO : null, h('div', { class: 'gs-ow-midden' }, h('small', {}, g.jaar || ''), h('b', { html: g.t })), toonG ? kolG : null);
    let k = 0, combo = 0;
    const misVan = (c, as) => typeof c.mis === 'string' ? c.mis : c.mis?.[as];
    function volgende() {
      vak.innerHTML = '';
      const c = rij[k];
      if (!c) { teller.textContent = ''; vak.append(h('div', { class: 'groot' }, 'Het web is af!')); api.klaar(p.na); return; }
      teller.textContent = `Kaart ${k + 1} van ${rij.length}`;
      const kaart = h('div', { class: 'gs-ow-kaart', html: c.t });
      vak.append(kaart);
      let stap = 0, fouten = 0;
      const vraagEl = h('div', { class: 'gs-ow-vraag' }), knoppen = h('div', { class: 'gs-ow-knoppen' });
      vak.append(vraagEl, knoppen);
      function stel() {
        knoppen.innerHTML = '';
        const as = vragen[stap];
        if (!as) {
          kaart.classList.add('af');
          const s = SOORT[c.soort];
          const chip = h('div', { class: 'gs-ow-chip', style: s ? `--soort:${s.kleur}` : '' }, h('span', { html: c.t }), h('small', {}, [s ? s.naam : '', c.as2 ? ' · ' + (p.as2.opties.find(o => o.id === c.as2)?.t || c.as2) : ''].join('')));
          (c.kant === 'gevolg' ? kolG : kolO).append(chip);
          combo = fouten ? 0 : combo + 1;
          api.geefXP(Math.min(2 + combo, 6), chip);
          zegt(fb, 'goed', '<b>Klopt.</b> ' + (c.w || ''));
          k++; setTimeout(volgende, minderBeweging() ? 0 : 450); return;
        }
        if (as === 'kant') {
          vraagEl.innerHTML = `Gebeurde dit <b>vóór</b> of <b>ná</b> “${g.t}”?`;
          knoppen.className = 'gs-ow-knoppen twee';
          [['oorzaak', 'Oorzaak', 'gebeurde ervoor'], ['gevolg', 'Gevolg', 'gebeurde erna']].forEach(([id, t, sub]) => {
            const b = h('button', { class: 'gs-keus', type: 'button', onclick: () => kies(as, id, b) }, h('b', {}, t), h('small', {}, sub)); b._goed = id === c.kant; knoppen.append(b);
          });
        } else if (as === 'soort') {
          vraagEl.innerHTML = 'Welke <b>soort</b> is het?';
          knoppen.className = 'gs-ow-knoppen vier';
          Object.entries(SOORT).forEach(([id, s]) => {
            const b = h('button', { class: 'gs-keus soort', type: 'button', style: `--soort:${s.kleur}`, onclick: () => kies(as, id, b) }, h('b', {}, s.naam), h('small', {}, s.uitleg)); b._goed = id === c.soort; knoppen.append(b);
          });
        } else {
          vraagEl.innerHTML = p.as2.vraag;
          knoppen.className = 'gs-ow-knoppen twee';
          p.as2.opties.forEach(o => { const b = h('button', { class: 'gs-keus', type: 'button', onclick: () => kies(as, o.id, b) }, h('b', {}, o.t), o.sub ? h('small', {}, o.sub) : null); b._goed = o.id === c.as2; knoppen.append(b); });
        }
      }
      function kies(as, id, b) {
        const goed = as === 'kant' ? c.kant : as === 'soort' ? c.soort : c.as2;
        if (id === goed) {
          if (as === 'soort') kaart.style.setProperty('--soort', SOORT[id].kleur);
          zegt(fb, 'goed', as === 'kant' ? `<b>Ja, ${id === 'oorzaak' ? 'een oorzaak' : 'een gevolg'}.</b>` : as === 'soort' ? `<b>Ja: ${SOORT[id].naam}.</b> Dat is ${SOORT[id].uitleg}.` : '<b>Ja.</b>');
          stap++; stel();
        } else {
          fouten++; b.disabled = true; schud(b);
          let tx = c.fout?.[as];
          if (!tx && as === 'kant') tx = c.kant === 'oorzaak' ? `Dit gebeurde vóór “${g.t}” en hielp het veroorzaken: een oorzaak.` : `Dit gebeurde ná “${g.t}”, als reactie erop: een gevolg.`;
          if (!tx && as === 'soort') tx = `${SOORT[id].naam[0].toUpperCase() + SOORT[id].naam.slice(1)} is ${SOORT[id].uitleg}. Deze kaart gaat over ${SOORT[c.soort].uitleg}: <b>${SOORT[c.soort].naam}</b>.`;
          zegt(fb, 'fout', '<b>Nog niet.</b> ' + (tx || 'Kijk nog eens.'));
          foutje(api, misVan(c, as));
        }
      }
      stel();
    }
    pod.append(h('div', { class: 'vis gs-oorzakenweb' }, p.vraag ? h('div', { class: 'vraag', style: 'margin:0', html: p.vraag }) : null, teller, vak, fb, web));
    volgende();
  };

  /* ===================================================================== BRONSPEURDER
     p.titel ; p.svg + p.vb (beeldbron) óf p.tekst [string | {t, goed, w, fout, mis}] (tekstbron: tik de zin die het bewijst)
     p.onderschrift (tikbaar; het onderschrift is géén bewijs: p.onderschriftFout) ; p.vraag
     p.plekken [{x, y, r?, label, goed, w, fout, mis}] (loep-plekken in de beeldbron) ; p.min (goede bewijzen nodig, 1) ; p.na */
  VIS.bronspeurder = (pod, p, api) => {
    const fb = fbEl(); let goed = 0, af = false;
    const nodig = p.min || 1;
    const vondsten = h('div', { class: 'gs-bs-vondst' });
    const teller = h('div', { class: 'minis' }, nodig > 1 ? `Vind ${nodig} bewijzen` : 'Vind het bewijs');
    function raak(o, el) {
      if (af || el.classList.contains('gevonden') || el.classList.contains('mis')) return;
      if (o.goed) {
        el.classList.add('gevonden'); goed++; api.geefXP(4, el);
        vondsten.append(h('span', { class: 'gs-bs-chip' }, '✓ ' + (o.label || '').replace(/<[^>]+>/g, '')));
        zegt(fb, 'goed', `<b>Bewijs gevonden.</b> ${o.w || ''}`);
        if (goed >= nodig) { af = true; teller.textContent = ''; api.klaar(p.na); } else teller.textContent = `Nog ${nodig - goed} bewijs te gaan`;
      } else {
        el.classList.add('mis'); schud(el);
        zegt(fb, 'fout', `<b>${o.label ? o.label + ': ' : ''}geen bewijs.</b> ${o.fout || 'Dit detail zegt niets over de vraag.'}`);
        foutje(api, o.mis);
      }
    }
    const bron = h('figure', { class: 'gs-bron' }, h('figcaption', { class: 'gs-bron-titel' }, p.titel || 'Bron'));
    if (p.svg) {
      const s = sv('svg', { viewBox: p.vb || '0 0 320 200', class: 'gs-bron-svg', role: 'img', 'aria-label': p.alt || p.titel || 'bron', html: p.svg });
      (p.plekken || []).forEach((o, i) => {
        const r = o.r || 14;
        const g = sv('g', { class: 'gs-loep', tabindex: 0, role: 'button', 'aria-label': 'Bekijk dit detail', 'data-plek': i });
        g.innerHTML = `<circle cx="${o.x}" cy="${o.y}" r="${Math.max(r + 10, 24)}" fill="transparent"/><circle class="ring" cx="${o.x}" cy="${o.y}" r="${r}" fill="none" stroke-width="2.4" stroke-dasharray="4 3"/><circle class="stip" cx="${o.x + r * .72}" cy="${o.y - r * .72}" r="9.5"/><text class="nr" x="${o.x + r * .72}" y="${o.y - r * .72 + 5}" text-anchor="middle" font-size="15">${i + 1}</text>`;
        g._goed = !!o.goed;
        g.addEventListener('click', () => { raak(o, g); if (g.classList.contains('gevonden') || g.classList.contains('mis')) g.querySelector('.nr').textContent = o.goed ? '✓' : '×'; });
        g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); g.dispatchEvent(new MouseEvent('click')); } });
        s.append(g);
      });
      bron.append(s);
    }
    if (p.tekst) {
      const bq = h('blockquote', { class: 'gs-bron-tekst' });
      p.tekst.forEach(d => {
        if (typeof d === 'string') { bq.append(document.createTextNode(d)); return; }
        const b = h('button', { class: 'gs-zin', type: 'button', html: d.t }); b._goed = !!d.goed;
        b.addEventListener('click', () => raak({ ...d, label: d.label || '' }, b));
        bq.append(b);
      });
      bron.append(bq);
    }
    if (p.onderschrift) {
      const os = h('button', { class: 'gs-onderschrift', type: 'button', html: '<small>Onderschrift</small>' + p.onderschrift });
      os._goed = false;
      os.addEventListener('click', () => { if (af) return; schud(os); zegt(fb, 'fout', `<b>Het onderschrift is geen bewijs.</b> ${p.onderschriftFout || 'De vraag zegt: bewijs het met een element uit de bron zelf. Het onderschrift is uitleg van de maker van het boek, niet de bron. Zoek in het beeld.'}`); foutje(api, p.onderschriftMis || 'F2'); });
      bron.append(os);
    }
    pod.append(h('div', { class: 'vis gs-bronspeurder' }, p.vraag ? h('div', { class: 'gs-bs-vraag', html: p.vraag }) : null, bron, teller, vondsten, fb));
  };

  /* ===================================================================== PERSONENBORD
     p.personen: [id uit GS.PERSOON | {id, naam, sub, svg}] ; p.feiten [{t, wie, w, fout:{id: tekst}, mis}] ; p.vast ; p.na */
  VIS.personenbord = (pod, p, api) => {
    const pers = p.personen.map(x => typeof x === 'string' ? { id: x, naam: GS.PERSOON[x].naam, sub: GS.PERSOON[x].sub, svg: GS.pers(x) } : x);
    const rij = p.vast ? p.feiten.slice() : shuffle(p.feiten); let k = 0;
    const fb = fbEl(), feit = h('div', { class: 'gs-pb-feit' }), teller = h('div', { class: 'minis' });
    const bord = h('div', { class: 'gs-pb-bord' + (pers.length > 4 ? ' drie' : '') });
    pers.forEach(x => {
      const b = h('button', { class: 'gs-pb-pers', type: 'button', 'data-wie': x.id, onclick: () => kies(x, b) },
        h('span', { class: 'gs-pb-foto', html: x.svg }), h('b', {}, x.naam), x.sub ? h('small', {}, x.sub) : null, h('span', { class: 'gs-pb-feiten' }));
      bord.append(b);
    });
    function toon() {
      bord.querySelectorAll('.gs-pb-pers').forEach(b => { b.disabled = false; b.classList.remove('mis'); b._goed = rij[k] && b.dataset.wie === rij[k].wie; });
      if (k >= rij.length) { feit.innerHTML = '<b>Het bord is compleet.</b>'; teller.textContent = ''; api.klaar(p.na); return; }
      teller.textContent = `Feit ${k + 1} van ${rij.length}`;
      feit.innerHTML = rij[k].t;
    }
    function kies(x, b) {
      const f = rij[k]; if (!f) return;
      if (x.id === f.wie) {
        b.querySelector('.gs-pb-feiten').append(h('span', { html: f.kort || f.t }));
        api.geefXP(3, b); zegt(fb, 'goed', `<b>${x.naam}.</b> ${f.w || ''}`); k++; toon();
      } else {
        b.classList.add('mis'); b.disabled = true; schud(b);
        zegt(fb, 'fout', `<b>Niet ${x.naam}.</b> ${f.fout?.[x.id] || 'Kijk naar de jaartallen en de rol onder de namen.'}`);
        foutje(api, f.mis);
      }
    }
    pod.append(h('div', { class: 'vis gs-personenbord' }, p.vraag ? h('div', { class: 'vraag', style: 'margin:0', html: p.vraag }) : null, teller, feit, bord, fb));
    toon();
  };

  /* ===================================================================== TOUWTREK
     p.links {naam, sub} ; p.rechts {naam, sub} ; p.kaarten [{t, jaar?, kant:'links'|'rechts', w, fout, mis}] (op volgorde)
     p.kaart (gewestenkaart eronder, standaard true) ; p.start (knoop, -3..3) ; p.na */
  VIS.touwtrek = (pod, p, api) => {
    let pos = p.start || 0, k = 0;
    const fb = fbEl(), teller = h('div', { class: 'minis' });
    const touw = h('div', { class: 'gs-tt-touw' }), kaartVak = h('div', { class: 'gs-tt-kaart' }), kaartEl = h('div', { class: 'gs-tt-gk' });
    const L = p.links, R = p.rechts;
    function tekenTouw() {
      const x = 167 + pos * 34;
      touw.innerHTML = `<svg viewBox="0 0 334 96" class="svgvis" role="img" aria-label="Touwtrekken: knoop op ${pos < 0 ? 'de kant van ' + L.naam : pos > 0 ? 'de kant van ' + R.naam : 'het midden'}">` +
        `<path d="M167 8 V88" stroke="var(--line)" stroke-width="2" stroke-dasharray="4 4"/>` +
        `<path d="M40 52 C120 ${48 + pos} 220 ${48 - pos} 294 52" stroke="#A8784A" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M40 50 C120 ${46 + pos} 220 ${46 - pos} 294 50" stroke="#D8B07A" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>` +
        [0, 1, 2].map(i => `<g transform="translate(${8 + i * 14} ${30 + (i % 2) * 6})"><path d="M0 0 V34" stroke="#5A3A22" stroke-width="2"/><path d="M1 1 H16 L12 7 L16 13 H1Z" fill="${['#E9A23B', '#5BA8D9', '#8FC46A'][i]}"/></g>`).join('') +
        `<g transform="translate(300 30)"><path d="M0 18 l3 -14 l6 7 l6 -11 l6 11 l6 -7 l3 14Z" fill="#F4C64E" stroke="#9A6A10"/><rect x="0" y="18" width="30" height="5" rx="2" fill="#E2A92A"/></g>` +
        `<g style="transition:transform .5s var(--ease)" transform="translate(${x} 51)"><circle r="11" fill="#E07A1E" stroke="#8A3A0A" stroke-width="2"/><circle cx="-3" cy="-3" r="3.4" fill="#fff" opacity=".45"/></g>` +
        `<text x="6" y="90" font-size="14" fill="var(--ink)">${L.naam}</text><text x="328" y="90" text-anchor="end" font-size="14" fill="var(--ink)">${R.naam}</text></svg>`;
      if (p.kaart !== false) {
        const e = Math.max(0, Math.min(1, (pos + 1) / 4));
        kaartEl.innerHTML = `<svg viewBox="0 0 334 206" class="svgvis" role="img" aria-label="Schematische kaart van de gewesten">${GS.gewestenkaart({ munten: pos < 1, lijnen: pos > 0, eenheid: pos > 0 ? e : 0, label: true })}</svg>` +
          `<div class="gs-tt-uitleg">${pos <= 0 ? '<b>Elk gewest</b> eigen bestuur, eigen wetten, eigen munt.' : pos < 3 ? '<b>Steeds meer één bestuur</b> vanuit Brussel.' : '<b>Bijna één staat</b>: overal dezelfde wetten en regels.'}</div>`;
      }
    }
    function toon() {
      kaartVak.innerHTML = '';
      const c = p.kaarten[k];
      if (!c) { teller.textContent = ''; kaartVak.append(h('div', { class: 'groot', style: 'font-size:1.05rem' }, p.slot || 'Zo ging het touwtrekken heen en weer.')); api.klaar(p.na); return; }
      teller.textContent = `Maatregel ${k + 1} van ${p.kaarten.length}`;
      const bl = h('button', { class: 'gs-keus', type: 'button', onclick: () => kies('links', bl) }, h('b', {}, '← ' + L.naam), h('small', {}, L.sub || ''));
      const br = h('button', { class: 'gs-keus', type: 'button', onclick: () => kies('rechts', br) }, h('b', {}, R.naam + ' →'), h('small', {}, R.sub || ''));
      bl._goed = c.kant === 'links'; br._goed = c.kant === 'rechts';
      kaartVak.append(h('div', { class: 'gs-ow-kaart' }, c.jaar ? h('small', { class: 'gs-tl-jaar' }, c.jaar) : null, h('span', { html: c.t })), h('div', { class: 'gs-ow-vraag' }, 'Welke kant trekt dit?'), h('div', { class: 'gs-ow-knoppen twee' }, bl, br));
    }
    function kies(kant, b) {
      const c = p.kaarten[k];
      if (kant === c.kant) {
        pos = Math.max(-3, Math.min(3, pos + (kant === 'links' ? -1 : 1)));
        api.geefXP(3, b); zegt(fb, 'goed', `<b>Ja: ${kant === 'links' ? L.naam : R.naam}.</b> ${c.w || ''}`);
        k++; tekenTouw(); toon();
      } else {
        b.disabled = true; schud(b);
        zegt(fb, 'fout', `<b>Andersom.</b> ${c.fout || ''}`);
        foutje(api, c.mis || p.mis);
      }
    }
    pod.append(h('div', { class: 'vis gs-touwtrek' }, teller, touw, kaartVak, fb, kaartEl));
    tekenTouw(); toon();
  };

  /* ===================================================================== ANTWOORDBOUWER (formuleren)
     p.vraag (de toetsvraag) ; p.bron {titel, svg, vb, tekst, onderschrift} (optioneel, alleen om te lezen)
     p.modus 'bouw' | 'schrijf'
       bouw:    p.stappen [{label, opties:[{t, goed} | {t, fout, mis}]}]  (bv. soort voorop / wat gebeurde / daardoor / bewijs)
       schrijf: p.criteria [{naam, woorden:[...], eerst?, tip, mis?}]   (eerst = in de eerste 14 woorden)
                p.model [regels] (modelantwoord; wordt na het nakijken getoond). p.stappen mag erbij: na 2 pogingen
                bouwt ze hem dan met blokken.
     p.na */
  VIS.antwoordbouwer = (pod, p, api) => {
    const fb = fbEl(), wrap = h('div', { class: 'vis gs-ab' });
    if (p.vraag) wrap.append(h('div', { class: 'gs-ab-vraag', html: '<small>Toetsvraag</small>' + p.vraag }));
    if (p.bron) {
      const b = h('figure', { class: 'gs-bron klein' }, h('figcaption', { class: 'gs-bron-titel' }, p.bron.titel || 'Bron'));
      if (p.bron.svg) b.append(sv('svg', { viewBox: p.bron.vb || '0 0 320 200', class: 'gs-bron-svg', role: 'img', 'aria-label': p.bron.titel || 'bron', html: p.bron.svg }));
      if (p.bron.tekst) b.append(h('blockquote', { class: 'gs-bron-tekst', html: p.bron.tekst }));
      if (p.bron.onderschrift) b.append(h('div', { class: 'gs-onderschrift stil', html: '<small>Onderschrift</small>' + p.bron.onderschrift }));
      wrap.append(b);
    }
    const vak = h('div', { class: 'gs-ab-vak' });
    wrap.append(vak, fb); pod.append(wrap);

    function bouw() {
      vak.innerHTML = '';
      const regels = h('ol', { class: 'gs-ab-regels' }), keus = h('div', { class: 'gs-ab-keus' });
      vak.append(h('div', { class: 'gs-ab-label' }, 'Bouw je antwoord, regel voor regel'), regels, keus);
      let s = 0;
      const slots = p.stappen.map((st, i) => { const li = h('li', { class: 'gs-ab-regel' + (i === 0 ? ' nu' : '') }, h('small', {}, st.label), h('span', { class: 'gs-ab-leeg' }, '…')); regels.append(li); return li; });
      function stel() {
        keus.innerHTML = '';
        slots.forEach((li, i) => li.classList.toggle('nu', i === s));
        if (s >= p.stappen.length) {
          regels.classList.add('af');
          keus.append(h('div', { class: 'gs-ab-check' }, p.stappen.map(st => h('span', {}, '✓ ' + st.label))));
          zegt(fb, 'goed', '<b>Zo schrijf je het op.</b> Elke stap op een eigen regel, met het verband erin. Zo haal je alle punten.');
          api.klaar(p.na); return;
        }
        shuffle(p.stappen[s].opties).forEach(o => {
          const b = h('button', { class: 'gs-ab-optie', type: 'button', html: o.t }); b._goed = !!o.goed;
          b.addEventListener('click', () => {
            if (o.goed) { slots[s].querySelector('.gs-ab-leeg').innerHTML = o.t; slots[s].classList.add('gevuld'); api.geefXP(2, b); zegt(fb, 'goed', '<b>Ja.</b> ' + (o.w || '')); s++; stel(); }
            else { b.disabled = true; schud(b); zegt(fb, 'fout', '<b>Die levert geen punt op.</b> ' + (o.fout || '')); foutje(api, o.mis); }
          });
          keus.append(b);
        });
      }
      stel();
    }

    function schrijf() {
      vak.innerHTML = '';
      let pogingen = 0;
      const ta = h('textarea', { class: 'gs-ab-tekst', rows: 5, placeholder: p.placeholder || 'Schrijf je antwoord. Elke stap op een eigen regel.', 'aria-label': 'Jouw antwoord' });
      const lijst = h('ul', { class: 'gs-ab-criteria' }, p.criteria.map(c => h('li', {}, h('i', {}, '○'), h('span', {}, c.naam))));
      const kijk = h('button', { class: 'knop klein gs-ab-kijk', type: 'button' }, 'Nakijken');
      const hulp = h('div', { class: 'gs-ab-hulp' });
      vak.append(h('div', { class: 'gs-ab-label' }, 'Schrijf het zelf op'), lijst, ta, kijk, hulp);
      kijk.addEventListener('click', () => {
        const tekst = norm(ta.value);
        if (tekst.trim().length < 8) { zegt(fb, 'info', 'Schrijf eerst je antwoord op. Een paar korte regels is genoeg.'); return; }
        const woorden = tekst.split(/\s+/);
        const begin = woorden.slice(0, 14).join(' ');
        const uit = p.criteria.map(c => ({ c, ok: (c.woorden || []).some(w => (c.eerst ? begin : tekst).includes(norm(w))) }));
        [...lijst.children].forEach((li, i) => { li.classList.toggle('ok', uit[i].ok); li.classList.toggle('mis', !uit[i].ok); li.firstChild.textContent = uit[i].ok ? '✓' : '×'; });
        const mis = uit.filter(x => !x.ok);
        if (!mis.length) {
          kijk.disabled = true; ta.readOnly = true;
          zegt(fb, 'goed', '<b>Alles erin!</b> Vergelijk het met het modelantwoord: staat bij jou hetzelfde verband?');
          hulp.innerHTML = ''; hulp.append(h('div', { class: 'gs-ab-model' }, h('small', {}, 'Modelantwoord'), (p.model || []).map(r => h('div', { html: r }))));
          api.klaar(p.na); return;
        }
        pogingen++; api.fout?.();
        mis.forEach(x => { if (x.c.mis) api.spot(x.c.mis); });
        zegt(fb, 'fout', '<b>Nog niet alle punten.</b> ' + mis.map(x => x.c.tip).join(' '));
        if (pogingen >= 2 && !hulp.firstChild) {
          if (p.stappen) hulp.append(h('button', { class: 'knop zacht klein', type: 'button', onclick: () => { zegt(fb, 'info', 'We bouwen hem samen, regel voor regel.'); bouw(); } }, 'Help me: bouw hem met blokken'));
          else hulp.append(h('div', { class: 'gs-ab-model' }, h('small', {}, 'Zo kan het'), (p.model || []).map(r => h('div', { html: r }))), h('div', { class: 'hint' }, 'Schrijf het nu in je eigen woorden op en kijk opnieuw na.'));
        }
      });
    }
    (p.modus === 'schrijf' ? schrijf : bouw)();
  };
})();
