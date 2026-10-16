'use strict';
/* =========================================================================
   GESCHIEDENIS: tekenbibliotheek (canoniek: tools/speelles-engine/geschiedenis/teken.js)
   Eén globale GS. Alles eigen SVG volgens de beeldstandaard: drie tonen per vorm
   (licht linksboven, schaduw rechtsonder), ogen met iris, pupil, twee glimlichtjes en
   een knipperend ooglid, en een ademende romp (CSS-klassen gs-adem / gs-knip in vis.css).
   - GS.SOORT: vaste kleur + werkboekdefinitie per soort oorzaak (zelfde kleuren als de films,
     tools/remotion-leren/src/film/figuren-gs.tsx).
   - GS.portret(look, {fase}) -> <svg> 100x100 (medaillon, hoofd en schouders).
   - GS.PERSOON.<id> = {naam, sub, look}; GS.pers(id) = portret van die persoon.
   - GS.baas({kleur, kleur2, ogen, vorm, extra}) -> <svg> 120x120 (een denkfout als monster).
   - GS.gids (uil Pien, detective), GS.merk.
   - GS.gewestenkaart({kleur, label, kroon, munten, titel}) -> <svg> 334x206, schematisch.
   - GS.voorwerp.<naam>() -> svg-markup 100x100 (bul, edict, plakkaat, schip, munt ...).
   - GS.poppetje(x, y, s, {jas, huid, hoofd, houding, fase, spiegel}) -> klein mens voor scènes (bronnen).
   - GS.defs(): gedeelde gradients voor de voorwerpen, één keer per pagina.
   ========================================================================= */
const GS = (() => {
  /* ---------- kleur ---------- */
  const rgb = c => { const n = parseInt(c.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; };
  const hx = a => '#' + a.map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  const mix = (a, b, t) => { const A = rgb(a), B = rgb(b); return hx(A.map((x, i) => x + (B[i] - x) * t)); };
  const donker = (c, t = .3) => mix(c, '#1A0E14', t);
  const licht = (c, t = .3) => mix(c, '#FFFFFF', t);
  let nr = 0; const uid = p => p + (++nr);

  const SOORT = {
    religieus: { kleur: '#8E5BC4', naam: 'religieus', bijv: 'religieuze', uitleg: 'alles wat met geloof te maken heeft' },
    economisch: { kleur: '#D08A1E', naam: 'economisch', bijv: 'economische', uitleg: 'alles wat met arbeid en geld te maken heeft' },
    politiek: { kleur: '#2F7DD1', naam: 'politiek', bijv: 'politieke', uitleg: 'alles wat met organisatie en bestuur te maken heeft' },
    sociaal: { kleur: '#D9486E', naam: 'sociaal', bijv: 'sociale', uitleg: 'hoe mensen in een samenleving met elkaar omgaan' },
  };

  /* lineaire en radiale gradient met drie tonen */
  const lin = (id, c, { x2 = 1, y2 = 1, ds = .32, dl = .3 } = {}) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}"><stop offset="0" stop-color="${licht(c, dl)}"/><stop offset=".5" stop-color="${c}"/><stop offset="1" stop-color="${donker(c, ds)}"/></linearGradient>`;
  const rad = (id, c, { cx = .36, cy = .3, r = .8, ds = .28, dl = .32 } = {}) => `<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}"><stop offset="0" stop-color="${licht(c, dl)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${donker(c, ds)}"/></radialGradient>`;

  /* ---------- portret (medaillon) ----------
     look: {huid, haar, baard, haarStijl:'kort'|'lang'|'kaal'|'tonsuur'|'krul'|'geen', baardStijl:'geen'|'kort'|'vol'|'puntje'|'gevorkt'|'snor'|'lang',
            hoofd:'geen'|'muts'|'baret'|'hoed'|'kroon'|'keizerskroon'|'tiara'|'kalot'|'kap'|'monnik'|'helm'|'hertogshoed',
            hoofdKleur, veer, jas, kraag:'geen'|'plooi'|'bont'|'bef'|'kant'|'harnas', bont, keten, achter, iris, stemming:'neutraal'|'blij'|'ernstig'|'boos'|'bezorgd'|'trots',
            oud (0..1), vrouw, parels, blos, sjerp} */
  function portret(L = {}, { fase = 0 } = {}) {
    const id = uid('gp');
    const huid = L.huid || '#EEC6A6', haar = L.haar || '#4A3020', baard = L.baard || haar, jas = L.jas || '#2B2730';
    const achter = L.achter || '#2E4A7A', iris = L.iris || '#5A3E26', st = L.stemming || 'neutraal', oud = L.oud || 0;
    const H = { l: licht(huid, .3), k: huid, s: donker(huid, .2) };
    const defs = `<defs>${rad(id + 'a', achter, { cx: .4, cy: .35, r: .75, dl: .25, ds: .35 })}${rad(id + 'h', huid, { cx: .36, cy: .3, r: .85, dl: .28, ds: .18 })}` +
      `${lin(id + 'j', jas, { x2: 1, y2: .6, dl: .22, ds: .4 })}${rad(id + 'r', haar, { cx: .35, cy: .25, r: .9, dl: .25, ds: .35 })}${lin(id + 'g', '#E2B54A', { x2: 1, y2: 1, dl: .4, ds: .3 })}` +
      `<clipPath id="${id}c"><circle cx="50" cy="50" r="46"/></clipPath></defs>`;
    let o = `<circle cx="50" cy="50" r="49" fill="url(#${id}g)"/><circle cx="50" cy="50" r="46" fill="url(#${id}a)"/>`;
    o += `<g clip-path="url(#${id}c)">`;
    /* licht achter het hoofd */
    o += `<ellipse cx="44" cy="40" rx="30" ry="26" fill="#fff" opacity=".10"/>`;
    o += `<g class="gs-adem" style="animation-delay:${-fase * 1.3}s">`;
    /* schouders en jas */
    o += `<path d="M2 104 C4 82 22 70 50 69 C78 70 96 82 98 104Z" fill="url(#${id}j)"/>`;
    o += `<path d="M10 100 C14 86 26 77 40 74" stroke="${licht(jas, .35)}" stroke-width="2" fill="none" opacity=".55" stroke-linecap="round"/>`;
    if (L.sjerp) o += `<path d="M28 74 L78 104 L68 106 L22 78Z" fill="${L.sjerp}"/><path d="M28 74 L78 104" stroke="${licht(L.sjerp, .35)}" stroke-width="1.5"/>`;
    if (L.kraag === 'harnas') o += `<path d="M14 104 C16 86 30 76 50 75 C70 76 84 86 86 104Z" fill="url(#${id}m)"/><defs>${lin(id + 'm', '#8C93A0', { dl: .45, ds: .4 })}</defs><path d="M30 84 C40 80 60 80 70 84" stroke="#E8ECF2" stroke-width="1.6" fill="none" opacity=".8"/><circle cx="50" cy="92" r="2.2" fill="#C9A23A"/>`;
    /* hals */
    o += `<path d="M42 56 L42 72 C46 75 54 75 58 72 L58 56Z" fill="${H.s}"/>`;
    /* kraag */
    if (L.kraag === 'plooi') o += `<path d="M28 70 C36 63 64 63 72 70 C70 77 30 77 28 70Z" fill="#F7F3EA"/>` + [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<path d="M${30 + i * 5} 68 c1 3 3 4 5 3" stroke="#C9C1B2" stroke-width="1.1" fill="none"/>`).join('') + `<path d="M30 72 C40 76 60 76 70 72" stroke="#D8D0C2" stroke-width="1.2" fill="none"/>`;
    else if (L.kraag === 'kant') o += `<path d="M24 74 C32 66 68 66 76 74 L70 86 C60 80 40 80 30 86Z" fill="#FBF8F2"/><path d="M30 86 C40 80 60 80 70 86" stroke="#CFC6B6" stroke-width="1.2" fill="none" stroke-dasharray="2 2"/>`;
    else if (L.kraag === 'bont') o += `<path d="M16 86 C22 72 36 70 42 72 L44 104 L30 104 C24 98 18 94 16 86Z M84 86 C78 72 64 70 58 72 L56 104 L70 104 C76 98 82 94 84 86Z" fill="${L.bont || '#7A5636'}"/>` + [[22, 82], [27, 90], [33, 80], [78, 82], [73, 90], [67, 80]].map(([x, y]) => `<path d="M${x} ${y} l2 3" stroke="${licht(L.bont || '#7A5636', .3)}" stroke-width="1.2" stroke-linecap="round"/>`).join('');
    else if (L.kraag === 'bef') o += `<path d="M46 72 L44 86 L50 84 L56 86 L54 72Z" fill="#F6F4EE"/><path d="M50 74 V84" stroke="#CFC9BC" stroke-width="1"/>`;
    if (L.keten) o += `<path d="M30 78 C40 92 60 92 70 78" stroke="#E2B54A" stroke-width="2.4" fill="none" stroke-dasharray="3 1.6"/><circle cx="50" cy="91" r="3.4" fill="url(#${id}g)" stroke="#8A5A10" stroke-width=".8"/>`;
    if (L.parels) o += `<path d="M38 72 C44 80 56 80 62 72" stroke="#FFFDF6" stroke-width="2.6" fill="none" stroke-dasharray=".1 3.2" stroke-linecap="round"/>`;
    /* haar achter (lang / vrouw) */
    if (L.haarStijl === 'lang') o += `<path d="M30 40 C28 60 30 70 36 74 L64 74 C70 70 72 60 70 40 C66 22 34 22 30 40Z" fill="url(#${id}r)"/>`;
    /* oren */
    if (!L.vrouw && L.hoofd !== 'monnik' && L.hoofd !== 'kap') o += `<ellipse cx="32.5" cy="45" rx="3.6" ry="5.4" fill="${H.k}"/><ellipse cx="67.5" cy="45" rx="3.6" ry="5.4" fill="${H.s}"/><path d="M32 42 c1.6 1 1.6 4 0 5" stroke="${donker(huid, .3)}" stroke-width=".9" fill="none"/>`;
    /* hoofd */
    o += `<ellipse cx="50" cy="43" rx="17" ry="20.5" fill="url(#${id}h)"/>`;
    if (oud > .4) o += `<path d="M40 30 c4 -1.4 8 -1.4 12 0 M41 33.5 c3.5 -1 6.5 -1 10 0" stroke="${donker(huid, .18)}" stroke-width=".8" fill="none" opacity="${oud * .8}"/>`;
    /* blos */
    o += `<ellipse cx="40" cy="51" rx="4" ry="2.4" fill="#E88A80" opacity="${(L.blos ?? .5) * .45}"/><ellipse cx="60" cy="51" rx="4" ry="2.4" fill="#E88A80" opacity="${(L.blos ?? .5) * .4}"/>`;
    /* ogen */
    const oog = x => `<ellipse cx="${x}" cy="44" rx="3.7" ry="2.7" fill="#FFFDF8"/><circle cx="${x + .5}" cy="44.2" r="2.2" fill="${iris}"/><circle cx="${x + .6}" cy="44.3" r="1.15" fill="#1C1015"/>` +
      `<circle cx="${x + 1.3}" cy="43.3" r=".75" fill="#fff"/><circle cx="${x - .4}" cy="45" r=".35" fill="#fff" opacity=".8"/>` +
      `<g class="gs-knip" style="animation-delay:${-fase * 1.7}s"><ellipse cx="${x}" cy="44" rx="4" ry="3" fill="${H.k}"/><path d="M${x - 4} 44 h8" stroke="${donker(huid, .35)}" stroke-width=".9"/></g>`;
    o += oog(43) + oog(57);
    /* wenkbrauwen */
    const bw = { boos: ['M38 39 L47 41', 'M62 39 L53 41'], ernstig: ['M38 39.5 L47 40.2', 'M62 39.5 L53 40.2'], bezorgd: ['M38 40 L47 38.4', 'M62 40 L53 38.4'], blij: ['M38 39 C41 37 44 37 47 38.4', 'M62 39 C59 37 56 37 53 38.4'] }[st] || ['M38 39 C41 37.6 44 37.6 47 38.6', 'M62 39 C59 37.6 56 37.6 53 38.6'];
    o += bw.map(d => `<path d="${d}" stroke="${L.wenk || donker(L.haarStijl === 'kaal' ? baard : haar, .2)}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('');
    /* neus */
    const nl = L.neus || 1;
    o += `<path d="M50 45 C49 ${48 + nl * 2} ${47 - nl} ${51 + nl * 1.5} 49 ${52 + nl}" stroke="${donker(huid, .28)}" stroke-width="1.2" fill="none" stroke-linecap="round"/><ellipse cx="51.2" cy="${50 + nl}" rx="1.1" ry=".7" fill="#fff" opacity=".5"/>`;
    /* mond */
    const mond = { blij: 'M44.5 56 C47 59.4 53 59.4 55.5 56', boos: 'M45 58 C48 56 52 56 55 58', ernstig: 'M45.5 57.2 L54.5 57.2', bezorgd: 'M45.5 57.8 C48 56.4 52 56.4 54.5 57.8', trots: 'M45 56.6 C48 58 52 58 55 56.2' }[st] || 'M45.5 56.6 C48 58.2 52 58.2 54.5 56.6';
    o += `<path d="${mond}" stroke="#8A3A34" stroke-width="1.5" fill="none" stroke-linecap="round"/>`;
    /* baard */
    const B = baard;
    const bs = L.baardStijl || 'geen';
    if (bs === 'vol') o += `<path d="M33 46 C33 62 40 70 50 70 C60 70 67 62 67 46 C64 54 60 58 50 58 C40 58 36 54 33 46Z" fill="url(#${id}b)"/><defs>${rad(id + 'b', B, { cx: .4, cy: .3, dl: .2, ds: .3 })}</defs><path d="M44 55 C47 53 53 53 56 55" stroke="${donker(B, .2)}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    if (bs === 'kort') o += `<path d="M36 52 C37 62 43 66 50 66 C57 66 63 62 64 52 C60 58 56 60 50 60 C44 60 40 58 36 52Z" fill="${B}" opacity=".95"/><path d="M44 55.2 C47 53.6 53 53.6 56 55.2" stroke="${B}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    if (bs === 'puntje') o += `<path d="M46 60 C47 66 49 70 50 71 C51 70 53 66 54 60 C52 61 48 61 46 60Z" fill="${B}"/><path d="M44.5 55.4 C47 54 53 54 55.5 55.4" stroke="${B}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`;
    if (bs === 'gevorkt') o += `<path d="M36 52 C37 66 43 76 47 80 L50 72 L53 80 C57 76 63 66 64 52 C60 58 56 60 50 60 C44 60 40 58 36 52Z" fill="url(#${id}b)"/><defs>${rad(id + 'b', B, { cx: .4, cy: .3, dl: .3, ds: .25 })}</defs><path d="M44 55 C47 53.4 53 53.4 56 55" stroke="${B}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
    if (bs === 'lang') o += `<path d="M34 50 C34 70 42 84 50 86 C58 84 66 70 66 50 C62 58 58 60 50 60 C42 60 38 58 34 50Z" fill="url(#${id}b)"/><defs>${rad(id + 'b', B, { cx: .4, cy: .3, dl: .25, ds: .3 })}</defs><path d="M44 55 C47 53.4 53 53.4 56 55" stroke="${B}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    if (bs === 'snor') o += `<path d="M43 55.6 C46 53.6 49 54.6 50 55.4 C51 54.6 54 53.6 57 55.6 C54 56 52 56.4 50 56 C48 56.4 46 56 43 55.6Z" fill="${B}"/>`;
    if (bs !== 'geen' && bs !== 'snor') o += [[42, 63], [50, 66], [58, 63], [46, 68], [54, 68]].map(([x, y]) => `<path d="M${x} ${y} l.6 2.4" stroke="${licht(B, .3)}" stroke-width=".7" stroke-linecap="round" opacity=".7"/>`).join('');
    /* haar boven */
    const hs = L.haarStijl || 'kort';
    if (hs === 'kort' || hs === 'lang') o += `<path d="M32.5 42 C31 26 40 20 50 20 C61 20 69 26 67.5 42 C66 34 62 29 56 28 C50 31 42 30 38 28 C34 31 33.5 36 32.5 42Z" fill="url(#${id}r)"/>`;
    if (hs === 'krul') o += `<path d="M31 44 C28 26 38 18 50 18 C62 18 72 26 69 44 C68 36 64 30 58 28 C52 31 44 31 40 28 C35 31 32 36 31 44Z" fill="url(#${id}r)"/>` + [[34, 30], [40, 23], [50, 20], [60, 23], [66, 30]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="${licht(haar, .12)}" opacity=".7"/>`).join('');
    if (hs === 'kaal') o += `<path d="M32.5 44 C32 36 33 33 35 31 C35 37 35 40 36 44Z M67.5 44 C68 36 67 33 65 31 C65 37 65 40 64 44Z" fill="url(#${id}r)"/><ellipse cx="45" cy="27" rx="6" ry="3" fill="#fff" opacity=".3"/>`;
    if (hs === 'tonsuur') o += `<path d="M32.5 44 C30 30 36 22 44 21 C40 25 39 28 40 30 C46 27 54 27 60 30 C61 28 60 25 56 21 C64 22 70 30 67.5 44 C66 36 63 32 60 31 C54 29 46 29 40 31 C37 32 34 36 32.5 44Z" fill="url(#${id}r)"/>`;
    /* hoofddeksel */
    const hk = L.hoofdKleur || '#1C1A20';
    const hoed = L.hoofd || 'geen';
    if (hoed === 'muts') o += `<defs>${lin(id + 'k', hk, { dl: .25, ds: .35 })}</defs><path d="M30 30 C30 16 70 16 70 30 C64 26 36 26 30 30Z" fill="url(#${id}k)"/><path d="M30 30 C38 27 62 27 70 30" stroke="${licht(hk, .3)}" stroke-width="1.2" fill="none"/>`;
    if (hoed === 'baret' || hoed === 'hoed') o += `<defs>${lin(id + 'k', hk, { dl: .25, ds: .35 })}</defs><path d="M24 30 C24 16 46 10 58 12 C74 14 80 24 76 30 C66 25 34 25 24 30Z" fill="url(#${id}k)"/><path d="M26 29 C40 25 62 25 75 29" stroke="${licht(hk, .35)}" stroke-width="1.3" fill="none"/>` + (L.veer ? `<path d="M64 14 C74 4 86 6 90 12 C82 12 74 14 66 20Z" fill="${L.veer}"/><path d="M66 18 C74 12 82 10 88 11" stroke="${donker(L.veer, .25)}" stroke-width=".8" fill="none"/>` : '');
    if (hoed === 'hertogshoed') o += `<defs>${lin(id + 'k', hk, { dl: .25, ds: .35 })}</defs><path d="M28 30 C26 18 36 8 52 8 C66 8 74 18 72 30 C62 26 38 26 28 30Z" fill="url(#${id}k)"/><path d="M28 30 C38 33 62 33 72 30 L72 26 C62 29 38 29 28 26Z" fill="${L.bont || '#5A3A22'}"/>`;
    if (hoed === 'kalot') o += `<defs>${lin(id + 'k', hk, { dl: .3, ds: .3 })}</defs><path d="M36 25 C38 17 62 17 64 25 C58 22 42 22 36 25Z" fill="url(#${id}k)"/>`;
    if (hoed === 'camauro') o += `<defs>${lin(id + 'k', '#B81E2A', { dl: .3, ds: .35 })}</defs><path d="M31 34 C29 16 71 16 69 34 C62 29 38 29 31 34Z" fill="url(#${id}k)"/><path d="M31 34 C38 31 62 31 69 34 L69 37 C62 34 38 34 31 37Z" fill="#F6F2EA"/>`;
    if (hoed === 'tiara') o += `<defs>${lin(id + 'k', '#F3EFE6', { dl: .3, ds: .2 })}</defs><path d="M36 30 C34 18 40 4 50 2 C60 4 66 18 64 30Z" fill="url(#${id}k)"/>` + [26, 18, 10].map(y => `<path d="M${36 + (30 - y) * .1} ${y} C44 ${y + 2} 56 ${y + 2} ${64 - (30 - y) * .1} ${y}" stroke="#D6A93A" stroke-width="2.4" fill="none"/>`).join('') + `<circle cx="50" cy="2.5" r="2.2" fill="#D6A93A"/>`;
    if (hoed === 'kroon' || hoed === 'keizerskroon') o += `<path d="M33 30 L34 17 L41 24 L50 13 L59 24 L66 17 L67 30Z" fill="url(#${id}g)" stroke="#8A5A10" stroke-width=".8"/><path d="M33 30 H67" stroke="#8A5A10" stroke-width="1.2"/>` + [[41, 27, '#C0303A'], [50, 26, '#2F6AC8'], [59, 27, '#1F9E72']].map(([x, y, c]) => `<circle cx="${x}" cy="${y}" r="1.8" fill="${c}"/>`).join('') + (hoed === 'keizerskroon' ? `<path d="M41 18 C44 8 56 8 59 18" stroke="#C9A23A" stroke-width="2" fill="none"/><path d="M50 4 v6 M47 7 h6" stroke="#C9A23A" stroke-width="1.8"/>` : '');
    if (hoed === 'kap') o += `<defs>${lin(id + 'k', hk, { dl: .22, ds: .35 })}</defs><path d="M28 60 C24 40 30 18 50 16 C70 18 76 40 72 60 C70 44 66 30 50 29 C34 30 30 44 28 60Z" fill="url(#${id}k)"/><path d="M33 40 C36 30 44 26 50 26 C56 26 64 30 67 40" stroke="${L.kapRand || '#E2B54A'}" stroke-width="2" fill="none"/>`;
    if (hoed === 'monnik') o += `<defs>${lin(id + 'k', hk, { dl: .22, ds: .35 })}</defs><path d="M26 74 C20 46 28 16 50 15 C72 16 80 46 74 74 C70 52 66 32 50 31 C34 32 30 52 26 74Z" fill="url(#${id}k)"/>`;
    if (hoed === 'helm') o += `<defs>${lin(id + 'k', '#9AA2AE', { dl: .45, ds: .4 })}</defs><path d="M24 32 C28 30 32 18 50 16 C68 18 72 30 76 32 C66 30 34 30 24 32Z" fill="url(#${id}k)"/><path d="M48 16 C50 8 52 8 54 16" fill="url(#${id}k)"/>`;
    o += `</g></g><circle cx="50" cy="50" r="46" fill="none" stroke="#8A5A10" stroke-width="1.2"/>`;
    return `<svg viewBox="0 0 100 100" aria-hidden="true">${defs}${o}</svg>`;
  }

  /* ---------- personen (alleen wat in het werkboek staat) ---------- */
  const PERSOON = {
    luther: { naam: 'Maarten Luther', sub: '1483-1546 · monnik en leraar, Wittenberg', look: { huid: '#EDC2A0', haar: '#5A3E2A', haarStijl: 'kort', hoofd: 'baret', hoofdKleur: '#1E1C22', jas: '#1E1C22', kraag: 'bef', achter: '#6A4A9A', iris: '#4A3424', stemming: 'ernstig', neus: 1.2, blos: .6 } },
    julius: { naam: 'Paus Julius II', sub: '1443-1513 · liet de Sint-Pieter verfraaien', look: { huid: '#E6BC9C', baard: '#E6E2DA', baardStijl: 'lang', haarStijl: 'kaal', haar: '#D8D2CA', hoofd: 'camauro', jas: '#B81E2A', kraag: 'bont', bont: '#F3EFE6', achter: '#8A6A2A', oud: 1, iris: '#4A3A2C', stemming: 'ernstig' } },
    leo: { naam: 'Paus Leo X', sub: '1475-1521 · stuurde Luther een bul', look: { huid: '#F0C8A8', haarStijl: 'kort', haar: '#5A4030', hoofd: 'tiara', jas: '#C8202E', kraag: 'bont', bont: '#F6F2EA', achter: '#B88A2A', iris: '#4A3A2C', stemming: 'boos', blos: .9 } },
    karel: { naam: 'Karel V', sub: '1500-1558 · keizer, koning van Spanje, heer der Nederlanden', look: { huid: '#EDC4A6', haar: '#A9A39C', baard: '#B8B2AA', haarStijl: 'kort', baardStijl: 'vol', hoofd: 'muts', hoofdKleur: '#1A171C', jas: '#26222A', kraag: 'bont', bont: '#7A5636', keten: true, achter: '#2E4A7A', iris: '#4E6A84', oud: .8, neus: 1.2 } },
    frederik3: { naam: 'Frederik III de Wijze', sub: 'keurvorst van Saksen, beschermt Luther', look: { huid: '#EBC0A0', haar: '#8A6A4A', baard: '#9A7A5A', haarStijl: 'kort', baardStijl: 'vol', hoofd: 'hertogshoed', hoofdKleur: '#3A2A4A', bont: '#6A4A2E', jas: '#4A2E3A', kraag: 'bont', bont2: '#6A4A2E', keten: true, achter: '#3E6A4A', oud: .6, stemming: 'blij' } },
    stoute: { naam: 'Filips de Stoute', sub: '1342-1404 · eerste Bourgondische hertog', look: { huid: '#EEC4A4', haar: '#3E2A1E', haarStijl: 'kort', hoofd: 'hertogshoed', hoofdKleur: '#1E3A6A', bont: '#7A5636', jas: '#24407A', kraag: 'bont', bont2: '#7A5636', keten: true, achter: '#C8742A', iris: '#4A3424', stemming: 'trots', neus: 1.3 } },
    goede: { naam: 'Filips de Goede', sub: '1396-1467 · kleinzoon, centralisatie', look: { huid: '#EEC6A6', haar: '#2A1E18', haarStijl: 'kort', hoofd: 'muts', hoofdKleur: '#151216', jas: '#141218', kraag: 'plooi', keten: true, achter: '#B8902A', iris: '#3A2A1E', stemming: 'ernstig', neus: 1.1 } },
    maria: { naam: 'Maria van Bourgondië', sub: '1457-1482 · tekende het Groot Privilege', look: { huid: '#F4D2BA', haar: '#C8964E', haarStijl: 'lang', vrouw: true, hoofd: 'kap', hoofdKleur: '#3A2A5A', kapRand: '#E2B54A', jas: '#5A2E6A', parels: true, achter: '#2F7DD1', iris: '#5D7FA0', blos: .9, stemming: 'bezorgd' } },
    maximiliaan: { naam: 'Maximiliaan I', sub: '1459-1519 · Habsburger, trouwt met Maria', look: { huid: '#EBC09E', haar: '#6A4A30', haarStijl: 'lang', hoofd: 'hoed', hoofdKleur: '#2A1E1A', jas: '#5A3A22', kraag: 'bont', bont: '#8A6440', keten: true, achter: '#A23A3A', iris: '#4A3424', neus: 1.5 } },
    schone: { naam: 'Filips de Schone', sub: '1478-1506 · zoon van Maria en Maximiliaan', look: { huid: '#F2CDB0', haar: '#8A5A2E', haarStijl: 'lang', hoofd: 'muts', hoofdKleur: '#3A1E2A', jas: '#6A1E2E', kraag: 'bont', bont: '#8A6440', keten: true, achter: '#3E8A6A', iris: '#4E6A84', blos: .8, stemming: 'blij' } },
    margaoost: { naam: 'Margaretha van Oostenrijk', sub: '1480-1530 · tante en landvoogdes van Karel V', look: { huid: '#F0CDB4', haar: '#6B4A30', haarStijl: 'geen', vrouw: true, hoofd: 'kap', hoofdKleur: '#F2EEE6', kapRand: '#9A8A7A', jas: '#2A2430', achter: '#4A6A8A', iris: '#6A4A2E', blos: .7, oud: .4 } },
    calvijn: { naam: 'Johannes Calvijn', sub: '1509-1564 · Fransman, calvinisme', look: { huid: '#E6BA98', haar: '#3A2A1E', baard: '#4A3424', haarStijl: 'kort', baardStijl: 'lang', hoofd: 'kalot', hoofdKleur: '#151316', jas: '#1E1C22', kraag: 'bef', achter: '#5A3A7A', iris: '#3A2A1E', stemming: 'ernstig', neus: 1.4, blos: .3 } },
    filips: { naam: 'Filips II', sub: '1527-1598 · koning van Spanje vanaf 1555', look: { huid: '#F2D1B8', haar: '#C79A5A', baard: '#C99B58', haarStijl: 'kort', baardStijl: 'puntje', hoofd: 'geen', jas: '#1C1A22', kraag: 'plooi', keten: true, achter: '#7A2A3A', iris: '#5D7FA0', stemming: 'ernstig' } },
    margaparma: { naam: 'Margaretha van Parma', sub: '1522-1586 · halfzus van Filips, landvoogdes', look: { huid: '#F0CDB4', haar: '#6B4A30', haarStijl: 'geen', vrouw: true, hoofd: 'kap', hoofdKleur: '#231C22', kapRand: '#E2B54A', jas: '#2E2430', parels: true, achter: '#4A3A5A', iris: '#6A4A2E', blos: .9, stemming: 'bezorgd' } },
    alva: { naam: 'Hertog van Alva', sub: '1507-1582 · generaal, landvoogd na 1567', look: { huid: '#E3B896', haar: '#9C9590', baard: '#C8C3BC', haarStijl: 'kaal', baardStijl: 'gevorkt', hoofd: 'geen', jas: '#2A2D36', kraag: 'harnas', sjerp: '#B8202E', achter: '#5A1A1E', iris: '#3A2A1E', oud: 1, neus: 1.4, blos: .3, stemming: 'boos' } },
    willem: { naam: 'Willem van Oranje', sub: '1533-1584 · leider van de Opstand', look: { huid: '#EEC6A6', haar: '#4A3020', baard: '#4E3322', haarStijl: 'kort', baardStijl: 'kort', hoofd: 'hoed', hoofdKleur: '#1C1A20', veer: '#F5F1E8', jas: '#2B2730', kraag: 'plooi', keten: true, achter: '#E07A1E', iris: '#5A3E26' } },
    gerards: { naam: 'Balthasar Gerards', sub: 'vermoordde Willem in 1584', look: { huid: '#E2B898', haar: '#2A1E16', haarStijl: 'kort', baardStijl: 'snor', baard: '#2A1E16', hoofd: 'geen', jas: '#3A3028', kraag: 'plooi', achter: '#3A3A3A', iris: '#2A1E16', stemming: 'boos' } },
    farnese: { naam: 'Alexander Farnese', sub: 'nieuwe Spaanse landvoogd, wint het zuiden', look: { huid: '#E8BC98', haar: '#2A1E16', baard: '#2A1E16', haarStijl: 'kort', baardStijl: 'kort', hoofd: 'geen', jas: '#2A2D36', kraag: 'harnas', sjerp: '#B8202E', achter: '#6A2A2A', iris: '#2A1E16', stemming: 'trots' } },
    maurits: { naam: 'Maurits van Nassau', sub: 'zoon van Willem · stadhouder, legeraanvoerder', look: { huid: '#EEC4A2', haar: '#7A5232', baard: '#8A6038', haarStijl: 'kort', baardStijl: 'puntje', hoofd: 'geen', jas: '#2A2D36', kraag: 'harnas', sjerp: '#E07A1E', achter: '#E8902A', iris: '#4A3424', stemming: 'ernstig' } },
    oldenbarnevelt: { naam: 'Johan van Oldenbarnevelt', sub: '1547-1619 · landsadvocaat van Holland', look: { huid: '#E8C0A0', haar: '#E6E2DA', baard: '#ECE8E0', haarStijl: 'kaal', baardStijl: 'lang', hoofd: 'kalot', hoofdKleur: '#151316', jas: '#1A1A20', kraag: 'plooi', achter: '#2E5A4A', iris: '#4A3A2C', oud: 1, stemming: 'neutraal' } },
    fh: { naam: 'Frederik Hendrik', sub: 'halfbroer van Maurits · de stedendwinger', look: { huid: '#F0CCAE', haar: '#6A4A2E', baard: '#7A5434', haarStijl: 'krul', baardStijl: 'puntje', hoofd: 'geen', jas: '#3A2E26', kraag: 'kant', sjerp: '#E07A1E', achter: '#D88A2A', iris: '#4A3424', stemming: 'trots' } },
    pietHein: { naam: 'Piet Hein', sub: '1577-1629 · kaapte de zilvervloot (1628)', look: { huid: '#DDA882', haar: '#5A3A22', baard: '#5E3E24', haarStijl: 'krul', baardStijl: 'kort', hoofd: 'hoed', hoofdKleur: '#1C1A20', jas: '#2A2620', kraag: 'kant', achter: '#2F6A9A', iris: '#3A5A7A', stemming: 'blij', blos: .8 } },
    coen: { naam: 'Jan Pieterszoon Coen', sub: '1587-1629 · gouverneur-generaal van de VOC', look: { huid: '#E8C0A0', haar: '#2A1E16', baard: '#2A1E16', haarStijl: 'kort', baardStijl: 'puntje', hoofd: 'geen', jas: '#141218', kraag: 'plooi', achter: '#4A4A2A', iris: '#2A1E16', stemming: 'boos' } },
  };
  let fase = 0;
  const pers = id => portret(PERSOON[id].look, { fase: (fase++ % 7) * .37 });

  /* ---------- baas: een denkfout als monster (120x120) ---------- */
  function baas({ kleur = '#8E5BC4', kleur2, ogen = 2, vorm = 'blob', extra = '', hoed = '', mond = 'grijns' } = {}) {
    const id = uid('gb'); kleur2 = kleur2 || donker(kleur, .45);
    const defs = `<defs>${rad(id, kleur, { cx: .36, cy: .3, r: .85, dl: .35, ds: .45 })}</defs>`;
    const lijf = vorm === 'spook'
      ? `<path d="M22 110 C20 60 34 22 60 22 C86 22 100 60 98 110 L88 101 L78 112 L68 101 L58 112 L48 101 L38 112 L30 102Z" fill="url(#${id})"/>`
      : vorm === 'twee'
        ? `<path d="M14 108 C8 74 22 40 46 40 C52 40 56 44 60 48 C64 44 68 40 74 40 C98 40 112 74 106 108 C98 118 22 118 14 108Z" fill="url(#${id})"/>`
        : `<path d="M16 106 C8 70 24 30 60 28 C96 30 112 70 104 106 C96 118 24 118 16 106Z" fill="url(#${id})"/>`;
    const rand = `<path d="M24 98 C18 76 26 52 44 40" stroke="${licht(kleur, .55)}" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/><path d="M98 100 C104 82 100 62 88 48" stroke="${kleur2}" stroke-width="4" fill="none" opacity=".35" stroke-linecap="round"/>`;
    const xs = vorm === 'twee' ? [40, 80] : ogen === 1 ? [60] : ogen === 3 ? [44, 60, 76] : [48, 72];
    const oy = vorm === 'twee' ? 64 : 60;
    const oog = (x, i) => { const r = ogen === 1 ? 11 : 7.6; return `<circle cx="${x}" cy="${oy}" r="${r}" fill="#FFFDF8" stroke="${kleur2}" stroke-width="1.4"/><circle cx="${x + 1.5}" cy="${oy + 1}" r="${r * .52}" fill="#3A1E2E"/><circle cx="${x + 1.6}" cy="${oy + 1.2}" r="${r * .26}" fill="#120A0E"/>` +
      `<circle cx="${x + r * .45}" cy="${oy - r * .25}" r="${r * .2}" fill="#fff"/><circle cx="${x - r * .2}" cy="${oy + r * .35}" r="${r * .09}" fill="#fff"/>` +
      `<g class="gs-knip" style="animation-delay:${-i * .9}s"><circle cx="${x}" cy="${oy}" r="${r + .8}" fill="${kleur}"/><path d="M${x - r} ${oy} h${r * 2}" stroke="${kleur2}" stroke-width="1.6"/></g>`; };
    const wenk = xs.map(x => `<path d="M${x - 9} ${oy - 13} L${x + 4} ${oy - 9}" stroke="${kleur2}" stroke-width="3" stroke-linecap="round"/>`).join('');
    const md = vorm === 'twee'
      ? `<path d="M32 84 C36 90 44 90 48 84 M72 84 C76 90 84 90 88 84" stroke="${kleur2}" stroke-width="3" fill="#fff"/>`
      : mond === 'o' ? `<ellipse cx="60" cy="86" rx="8" ry="6" fill="#3A1E2E"/><ellipse cx="60" cy="88" rx="4" ry="2.4" fill="#E86A7A"/>`
        : `<path d="M44 82 C52 92 68 92 76 82" stroke="${kleur2}" stroke-width="3" fill="#fff"/><path d="M50 84 l3 5 l3 -5 M62 84 l3 5 l3 -5" fill="#fff" stroke="${kleur2}" stroke-width="1"/>`;
    const glans = `<ellipse cx="42" cy="42" rx="13" ry="6" fill="#fff" opacity=".3" transform="rotate(-28 42 42)"/>`;
    return `<svg viewBox="0 0 120 120" aria-hidden="true">${defs}<ellipse cx="60" cy="114" rx="42" ry="5" fill="#000" opacity=".16"/><g class="gs-adem">${lijf}${rand}${glans}${xs.map(oog).join('')}${wenk}${md}${hoed}${extra}</g></svg>`;
  }

  /* ---------- gids: Pien, de detective-uil ---------- */
  const gids = (() => {
    const id = uid('gu');
    return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs>${rad(id + 'l', '#B8865A', { cx: .38, cy: .3, dl: .35, ds: .4 })}${rad(id + 'b', '#F3DDB8', { cx: .4, cy: .3, dl: .3, ds: .2 })}${lin(id + 'h', '#3E5A8A', { dl: .3, ds: .35 })}</defs>` +
      `<ellipse cx="50" cy="94" rx="26" ry="3.5" fill="#000" opacity=".15"/><g class="gs-adem">` +
      `<path d="M22 90 C14 60 24 26 50 24 C76 26 86 60 78 90 C70 98 30 98 22 90Z" fill="url(#${id}l)"/>` +
      `<path d="M32 88 C28 66 36 50 50 50 C64 50 72 66 68 88 C60 94 40 94 32 88Z" fill="url(#${id}b)"/>` +
      [[42, 66], [50, 62], [58, 66], [46, 74], [54, 74], [50, 82]].map(([x, y]) => `<path d="M${x - 3} ${y} q3 3 6 0" stroke="#B8865A" stroke-width="1.2" fill="none"/>`).join('') +
      `<path d="M20 70 C14 56 18 44 26 40 C26 52 28 62 30 72Z" fill="#8A5E3A"/><path d="M80 70 C86 56 82 44 74 40 C74 52 72 62 70 72Z" fill="#7A522F"/>` +
      `<circle cx="38" cy="42" r="11" fill="#FFF6E6"/><circle cx="62" cy="42" r="11" fill="#FFF6E6"/>` +
      `<circle cx="39" cy="43" r="6.5" fill="#E89A2A"/><circle cx="63" cy="43" r="6.5" fill="#E89A2A"/><circle cx="39.5" cy="43.5" r="3.6" fill="#1C1015"/><circle cx="63.5" cy="43.5" r="3.6" fill="#1C1015"/>` +
      `<circle cx="41" cy="41.5" r="1.4" fill="#fff"/><circle cx="65" cy="41.5" r="1.4" fill="#fff"/><circle cx="37.6" cy="45.6" r=".6" fill="#fff"/><circle cx="61.6" cy="45.6" r=".6" fill="#fff"/>` +
      `<g class="gs-knip"><circle cx="38" cy="42" r="11.6" fill="#A87A50"/><circle cx="62" cy="42" r="11.6" fill="#A87A50"/></g>` +
      `<path d="M46 50 L50 58 L54 50Z" fill="#E8A23A"/><path d="M47 51 L50 54" stroke="#fff" stroke-width="1" opacity=".6"/>` +
      `<path d="M22 30 C22 18 40 12 52 13 C66 14 80 20 78 30 C66 26 34 26 22 30Z" fill="url(#${id}h)"/><path d="M24 29 C38 25 62 25 77 29" stroke="#9AB4DA" stroke-width="1.4" fill="none"/>` +
      `<path d="M66 16 C74 8 84 9 88 14 C80 14 74 16 68 21Z" fill="#F4B740"/>` +
      `<circle cx="80" cy="76" r="9" fill="#DCEBF6" fill-opacity=".55" stroke="#6E4520" stroke-width="3"/><ellipse cx="77" cy="73" rx="3" ry="2" fill="#fff" opacity=".8"/><path d="M73 83 L66 90" stroke="#6E4520" stroke-width="4" stroke-linecap="round"/></g></svg>`;
  })();
  const merk = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="#fff" stroke-width="2.4"/><path d="M14.5 14.5 L20 20" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/><path d="M7.5 9 C8.5 7 11 6.6 12.4 8" stroke="#fff" stroke-width="1.4" fill="none" opacity=".7"/></svg>`;

  /* ---------- gewestenkaart (schematisch, geen echte kaart) ----------
     14 tegels, grofweg op hun plek (noord boven, west links).
     kleur: {gewest: kleur} of functie(gewest) -> kleur|null ; label (true) ; kroon: gewest met kroon ;
     munten: elk gewest een eigen munt (particularisme) ; lijnen: alle tegels met lijnen naar Brussel (centralisatie). */
  const GEWEST = [
    ['Friesland', 1, 0], ['Groningen', 2, 0], ['Holland', 0, 1], ['Utrecht', 1, 1], ['Overijssel', 2, 1],
    ['Zeeland', 0, 2], ['Brabant', 1, 2], ['Gelre', 2, 2], ['Limburg', 3, 2], ['Vlaanderen', 0, 3],
    ['Henegouwen', 1, 3], ['Namen', 2, 3], ['Artesië', 0, 4], ['Luxemburg', 2, 4],
  ];
  const TEGELKLEUR = ['#E9A23B', '#5BA8D9', '#E2724A', '#8FC46A', '#C77DC9', '#4FB5A4', '#E8C14A', '#D9686E', '#7A9AE0', '#B88A5A', '#6CC1C9', '#C9A0E8', '#A8C85A', '#E89AB8'];
  const tegelXY = (c, r) => [4 + c * 82, 6 + r * 40];
  function gewestenkaart({ kleur = null, label = true, munten = false, lijnen = false, kroon = null, titel = '', grijs = '#CFC6CC', eenheid = 0 } = {}) {
    const id = uid('gk');
    let o = `<defs><filter id="${id}s" x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="1" dy="2" stdDeviation="1.4" flood-opacity=".22"/></filter>${lin(id + 'z', '#BFE3F4', { x2: 0, y2: 1, dl: .2, ds: .1 })}</defs>`;
    o += `<rect x="0" y="0" width="334" height="206" rx="14" fill="url(#${id}z)" opacity=".55"/>`;
    o += `<path d="M2 20 C20 30 10 60 4 90" stroke="#fff" stroke-width="2" fill="none" opacity=".5"/><text x="6" y="16" font-size="14.5" fill="#3E6A8A" opacity=".8">Noordzee</text>`;
    const br = tegelXY(1, 2);
    if (lijnen) GEWEST.forEach(([n, c, r]) => { const [x, y] = tegelXY(c, r); if (n !== 'Brabant') o += `<path d="M${x + 39} ${y + 17} L${br[0] + 39} ${br[1] + 17}" stroke="#2F7DD1" stroke-width="2" stroke-dasharray="4 3" opacity="${.35 + eenheid * .5}"/>`; });
    GEWEST.forEach(([n, c, r], i) => {
      const [x, y] = tegelXY(c, r);
      let k = typeof kleur === 'function' ? kleur(n, i) : kleur ? kleur[n] : TEGELKLEUR[i];
      if (k === undefined || k === null) k = grijs;
      if (eenheid) k = mix(k, '#2F7DD1', eenheid * .85);
      const t = uid('gt');
      o += `<defs>${lin(t, k, { x2: .3, y2: 1, dl: .28, ds: .22 })}</defs><g filter="url(#${id}s)"><rect x="${x}" y="${y}" width="78" height="34" rx="9" fill="url(#${t})" stroke="${donker(k, .3)}" stroke-width="1"/>` +
        `<path d="M${x + 6} ${y + 5} H${x + 60}" stroke="#fff" stroke-width="1.6" opacity=".45" stroke-linecap="round"/></g>`;
      if (label) o += `<text x="${x + 39}" y="${y + 22.5}" text-anchor="middle" font-size="14.5"${n.length > 8 ? ' textLength="72" lengthAdjust="spacingAndGlyphs"' : ''} fill="${mix(k, '#000', .72)}">${n}</text>`;
      if (munten) o += `<circle cx="${x + 70}" cy="${y + 6}" r="6" fill="#F4C64E" stroke="#9A6A10" stroke-width="1"/><circle cx="${x + 70}" cy="${y + 6}" r="3.6" fill="none" stroke="#B8861A" stroke-width="1"/><circle cx="${x + 68.4}" cy="${y + 4.4}" r="1.4" fill="#fff" opacity=".7"/>`;
      if (kroon === n || (Array.isArray(kroon) && kroon.includes(n))) o += `<path d="M${x + 62} ${y - 4} l2 -8 l4 4 l4 -6 l4 6 l4 -4 l2 8Z" fill="#F4C64E" stroke="#9A6A10" stroke-width=".8"/>`;
    });
    if (lijnen) o += `<circle cx="${br[0] + 39}" cy="${br[1] + 30}" r="5" fill="#fff" stroke="#2F7DD1" stroke-width="2"/><text x="${br[0] + 46}" y="${br[1] + 36}" font-size="14" fill="#1E4A8A">Brussel</text>`;
    if (titel) o += `<text x="330" y="202" text-anchor="end" font-size="14.5" fill="#5A4A55">${titel}</text>`;
    o += `<text x="330" y="17" text-anchor="end" font-size="14.8" fill="#7A6A75">schematisch</text>`;
    return o;
  }

  /* ---------- poppetje: klein mens voor scènes (voeten op x,y; hoogte ±60*s) ----------
     {jas, huid, hoofd:'geen'|'muts'|'hoed'|'helm'|'kap', houding:'staan'|'armen'|'huil'|'wijs'|'bijbel'|'piek', fase, spiegel} */
  function poppetje(x, y, s = 1, { jas = '#5A4A6A', huid = '#EEC6A6', hoofd = 'geen', houding = 'staan', fase = 0, spiegel = false, haar = '#4A3020' } = {}) {
    const id = uid('pp');
    const J = { l: licht(jas, .28), k: jas, s: donker(jas, .35) };
    const arm = (ax, d) => `<path d="${d}" stroke="${J.s}" stroke-width="5.5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${J.k}" stroke-width="3.6" fill="none" stroke-linecap="round"/>`;
    let armen = '';
    if (houding === 'armen') armen = arm(0, 'M-7 -38 L-15 -54') + arm(0, 'M7 -38 L15 -54') + `<circle cx="-15" cy="-55" r="2.6" fill="${huid}"/><circle cx="15" cy="-55" r="2.6" fill="${huid}"/>`;
    else if (houding === 'huil') armen = arm(0, 'M-7 -38 L-4 -50') + arm(0, 'M7 -38 L4 -50') + `<circle cx="-3" cy="-51" r="2.8" fill="${huid}"/><circle cx="3" cy="-51" r="2.8" fill="${huid}"/><path d="M-6 -46 v4 M6 -46 v4" stroke="#7FC4F0" stroke-width="1.4" stroke-linecap="round"/>`;
    else if (houding === 'wijs') armen = arm(0, 'M-7 -38 L-10 -24') + arm(0, 'M7 -38 L20 -46') + `<circle cx="21" cy="-47" r="2.6" fill="${huid}"/>`;
    else if (houding === 'bijbel') armen = arm(0, 'M-7 -38 L-12 -50') + arm(0, 'M7 -38 L12 -30') + `<rect x="-18" y="-58" width="11" height="8" rx="1.5" fill="#3A2A22"/><path d="M-12.5 -58 v8" stroke="#E2B54A" stroke-width="1"/>`;
    else if (houding === 'piek') armen = arm(0, 'M-7 -38 L-10 -24') + arm(0, 'M7 -38 L12 -30') + `<path d="M14 -2 L14 -78" stroke="#6E4520" stroke-width="2.2"/><path d="M14 -86 L17 -78 H11Z" fill="#B8BEC8"/>`;
    else armen = arm(0, 'M-7 -38 L-10 -22') + arm(0, 'M7 -38 L10 -22');
    const hoofdSvg = {
      muts: `<path d="M-7 -55 C-7 -64 7 -64 7 -55Z" fill="#2A2228"/>`,
      hoed: `<path d="M-11 -55 C-10 -62 -6 -66 0 -66 C6 -66 10 -62 11 -55Z" fill="#1E1A20"/><path d="M-12 -55 H12" stroke="#1E1A20" stroke-width="2"/>`,
      helm: `<path d="M-10 -56 C-8 -64 8 -64 10 -56 Z" fill="#A8B0BC"/><path d="M-1 -64 C0 -68 1 -68 2 -64" fill="#A8B0BC"/>`,
      kap: `<path d="M-8 -48 C-10 -60 -6 -66 0 -66 C6 -66 10 -60 8 -48 C6 -56 -6 -56 -8 -48Z" fill="${J.s}"/>`,
    }[hoofd] || `<path d="M-6.4 -55 C-6 -62 6 -62 6.4 -55 C4 -58 -4 -58 -6.4 -55Z" fill="${haar}"/>`;
    return `<g transform="translate(${x} ${y}) scale(${spiegel ? -s : s} ${s})"><defs>${lin(id, jas, { x2: 1, y2: .4, dl: .25, ds: .38 })}</defs>` +
      `<ellipse cx="0" cy="0" rx="11" ry="2.6" fill="#000" opacity=".18"/>` +
      `<g class="gs-adem" style="animation-delay:${-fase * 1.1}s"><path d="M-4 -2 L-3.5 -18 M4 -2 L3.5 -18" stroke="#2A2228" stroke-width="3.4" stroke-linecap="round"/>` +
      `<path d="M-9 -16 C-10 -30 -8 -40 0 -41 C8 -40 10 -30 9 -16Z" fill="url(#${id})"/>${armen}` +
      `<circle cx="0" cy="-50" r="6.6" fill="${huid}"/><circle cx="-2" cy="-52" r="2.2" fill="#fff" opacity=".25"/><circle cx="-2.2" cy="-50" r=".9" fill="#2A1A22"/><circle cx="2.2" cy="-50" r=".9" fill="#2A1A22"/>${hoofdSvg}</g></g>`;
  }

  /* ---------- voorwerpen (100x100, markup zonder <svg>) ---------- */
  const voorwerp = {
    bul: () => `<path d="M22 14 H72 C80 14 82 22 78 26 V84 C78 90 72 92 66 90 H24Z" fill="url(#gs-papier)" stroke="#A88A5A"/><path d="M30 28 H68 M30 38 H70 M30 48 H64 M30 58 H68" stroke="#8A6A4A" stroke-width="2.4" stroke-linecap="round" opacity=".6"/><path d="M50 72 v18" stroke="#B8202E" stroke-width="3"/><circle cx="50" cy="90" r="9" fill="#B8202E"/><circle cx="47" cy="87" r="3" fill="#E8606A"/><path d="M45 92 l10 -6" stroke="#7A1018" stroke-width="1.4"/>`,
    edict: () => `<path d="M18 18 H82 V86 H18Z" fill="url(#gs-papier)" stroke="#A88A5A"/><path d="M26 30 H74 M26 40 H74 M26 50 H66 M26 60 H74" stroke="#5A4A3A" stroke-width="2.4" stroke-linecap="round" opacity=".55"/><path d="M60 64 l4 -8 l4 5 l4 -7 l4 7 l4 -5 l2 8Z" fill="#E2B54A" stroke="#8A5A10" stroke-width=".8"/><text x="28" y="78" font-size="10" fill="#5A3A2A">EDICT</text>`,
    plakkaat: () => `<path d="M16 12 H84 V90 H16Z" fill="url(#gs-papier)" stroke="#A88A5A"/><text x="50" y="28" text-anchor="middle" font-size="11" fill="#5A1A1A">PLACCAET</text><path d="M24 38 H76 M24 46 H76 M24 54 H70 M24 62 H76 M24 70 H60" stroke="#5A4A3A" stroke-width="2" stroke-linecap="round" opacity=".5"/><circle cx="72" cy="80" r="7" fill="#B8202E"/><circle cx="20" cy="16" r="2.4" fill="#6A6A6A"/><circle cx="80" cy="16" r="2.4" fill="#6A6A6A"/>`,
    smeekschrift: () => `<path d="M14 30 C14 20 24 18 30 22 H76 C84 22 86 30 82 34 V78 C82 84 76 86 70 84 H30 C22 84 14 82 14 74Z" fill="url(#gs-papier)" stroke="#A88A5A"/><path d="M26 36 H72 M26 46 H72 M26 56 H66 M26 66 H70" stroke="#5A4A3A" stroke-width="2" stroke-linecap="round" opacity=".5"/><circle cx="66" cy="76" r="6" fill="#2F6AC8"/>`,
    beeld: () => `<ellipse cx="50" cy="92" rx="22" ry="4" fill="#000" opacity=".15"/><path d="M36 90 L38 52 C38 40 44 34 50 34 C56 34 62 40 62 52 L64 90Z" fill="url(#gs-steen)" stroke="#9A9086"/><circle cx="50" cy="26" r="10" fill="url(#gs-steen)" stroke="#9A9086"/><ellipse cx="50" cy="14" rx="12" ry="3" fill="none" stroke="#E2B54A" stroke-width="2"/>`,
    munt: () => `<circle cx="50" cy="52" r="34" fill="url(#gs-goudm)" stroke="#9A6A10" stroke-width="2"/><circle cx="50" cy="52" r="26" fill="none" stroke="#B8861A" stroke-width="1.5" stroke-dasharray="2 2"/><text x="50" y="60" text-anchor="middle" font-size="22" fill="#7A4A00">10%</text>`,
    schip: () => `<path d="M10 70 C30 78 70 78 90 70" stroke="#5BA8D9" stroke-width="5" fill="none"/><path d="M16 60 H86 L76 74 H26Z" fill="url(#gs-hout)"/><path d="M50 14 V60 M30 22 V60 M70 24 V60" stroke="#5A3A22" stroke-width="2.4"/><path d="M50 16 C62 24 62 40 50 48Z M30 24 C40 30 40 42 30 48Z M70 26 C80 32 80 44 70 50Z" fill="#F6F0E2" stroke="#C8B89A"/><path d="M50 10 l10 3 l-10 3Z" fill="#E07A1E"/>`,
    pakhuis: () => `<path d="M14 90 V40 L32 20 L50 40 V90Z M50 90 V40 L68 20 L86 40 V90Z" fill="url(#gs-baksteen)" stroke="#6A2A1A"/><path d="M26 50 h12 v10 h-12Z M26 68 h12 v10 h-12Z M62 50 h12 v10 h-12Z M62 68 h12 v10 h-12Z" fill="#3A2A22"/><path d="M32 26 v-8 M68 26 v-8" stroke="#3A2A22" stroke-width="2"/>`,
    bijbel: () => `<path d="M14 30 C26 24 40 24 50 32 C60 24 74 24 86 30 V80 C74 74 60 74 50 82 C40 74 26 74 14 80Z" fill="#F6F0E2" stroke="#8A6A4A" stroke-width="1.5"/><path d="M50 32 V82" stroke="#8A6A4A" stroke-width="1.5"/><path d="M22 40 H42 M22 48 H42 M22 56 H40 M58 40 H78 M58 48 H78 M58 56 H74" stroke="#5A4A3A" stroke-width="1.6" opacity=".5"/>`,
  };

  /* gedeelde gradients voor de voorwerpen: één keer per pagina */
  function defs() {
    if (document.getElementById('gs-defs')) return;
    const el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    el.id = 'gs-defs'; el.setAttribute('width', '0'); el.setAttribute('height', '0'); el.setAttribute('aria-hidden', 'true'); el.style.position = 'absolute';
    el.innerHTML = `<defs>${lin('gs-papier', '#F4E6C4', { dl: .35, ds: .18 })}${lin('gs-steen', '#E8E2D8', { dl: .3, ds: .3 })}${rad('gs-goudm', '#F4C64E', { dl: .45, ds: .35 })}${lin('gs-hout', '#9A6A3E', { dl: .3, ds: .35 })}${lin('gs-baksteen', '#A8523A', { dl: .25, ds: .35 })}</defs>`;
    document.body.prepend(el);
  }

  return { poppetje, defs, SOORT, mix, licht, donker, uid, portret, PERSOON, pers, baas, gids, merk, gewestenkaart, GEWEST, voorwerp };
})();
