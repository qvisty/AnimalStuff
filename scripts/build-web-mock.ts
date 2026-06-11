/**
 * Genererer docs/index.html — en statisk web-mock af appen til GitHub Pages.
 * Mocken genbruger branddatabasen, kilderne og statusmetadata, så den altid
 * matcher appen. Kør med: npx tsx scripts/build-web-mock.ts
 */
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { BRANDS } from '../src/data/brands';
import { STATUS_SOURCES } from '../src/data/sources';
import { statusMeta } from '../src/theme';

const html = `<!DOCTYPE html>
<html lang="da">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Kaninfri 🐰 — web-mock</title>
<style>
  :root { --bg:#F7F6F2; --card:#fff; --text:#1F2937; --muted:#6B7280; --primary:#2F855A; --border:#E5E7EB; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--text); font-family:-apple-system,Segoe UI,Roboto,sans-serif; }
  main { max-width:480px; margin:0 auto; padding:16px; }
  h1 { font-size:22px; margin:8px 0 2px; }
  .sub { color:var(--muted); font-size:13px; margin:0 0 16px; }
  .panel { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:14px; margin-bottom:14px; }
  label { font-size:13px; font-weight:600; display:block; margin-bottom:6px; }
  input { width:100%; font-size:16px; padding:11px 13px; border:1px solid var(--border); border-radius:10px; }
  button { margin-top:8px; width:100%; background:var(--primary); color:#fff; border:0; border-radius:10px; padding:12px; font-size:15px; font-weight:600; cursor:pointer; }
  button:disabled { opacity:.6; }
  .card { background:var(--card); border-radius:12px; border-left:6px solid var(--muted); padding:14px; margin:10px 0; box-shadow:0 2px 6px rgba(0,0,0,.08); }
  .row { display:flex; align-items:center; gap:10px; }
  .emoji { font-size:28px; }
  .brand { font-weight:700; font-size:17px; }
  .status { font-weight:600; font-size:13px; margin-top:2px; }
  .desc { color:var(--muted); font-size:13px; line-height:1.45; margin-top:8px; }
  .detail { font-size:13px; margin-top:6px; }
  .note { font-size:13px; color:var(--muted); font-style:italic; margin-top:6px; }
  .sources { border-top:1px solid var(--border); margin-top:10px; padding-top:10px; }
  .sources h4 { margin:0 0 4px; font-size:12px; }
  .src { margin-top:6px; }
  .src a { color:var(--primary); font-size:13px; font-weight:600; }
  .src p { margin:2px 0 0; font-size:12px; color:var(--muted); line-height:1.4; }
  .hint { color:var(--muted); font-size:13px; line-height:1.5; }
  footer { color:var(--muted); font-size:12px; line-height:1.5; margin:20px 0; }
</style>
</head>
<body>
<main>
  <h1>Kaninfri 🐰</h1>
  <p class="sub">Web-mock af mobilappen — er produktet testet på dyr?</p>

  <div class="panel">
    <label for="q">🔍 Søg efter mærke</label>
    <input id="q" type="search" placeholder="fx Nivea, Lush eller GOSH" autocomplete="off">
  </div>

  <div class="panel">
    <label for="bc">📷 Slå stregkode op (EAN)</label>
    <input id="bc" type="text" inputmode="numeric" placeholder="fx 4005808179404">
    <button id="bcBtn">Slå produkt op</button>
    <p class="hint">I mobilappen scannes koden med kameraet. Her indtastes den
    manuelt og slås op i Open Beauty Facts / Open Food Facts.</p>
  </div>

  <div id="out"></div>

  <footer>Databasen er vejledende og bygger på offentlige lister fra Leaping
  Bunny (crueltyfreeinternational.org) og PETA samt mærkernes egne erklæringer.
  Tjek altid den aktuelle certificering, før du træffer en endelig beslutning.</footer>
</main>
<script>
const BRANDS = ${JSON.stringify(BRANDS)};
const STATUS_SOURCES = ${JSON.stringify(STATUS_SOURCES)};
const META = ${JSON.stringify(statusMeta)};

function normalize(name) {
  return name.toLowerCase().normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9æøå]+/g, ' ')
    .trim();
}
const namesOf = (b) => [b.name, ...(b.aliases ?? [])].map(normalize);

function findBrand(query) {
  const q = normalize(query);
  if (!q) return undefined;
  let exact, partial;
  for (const b of BRANDS) for (const n of namesOf(b)) {
    if (n === q) exact ??= b;
    else if (q.includes(n) || n.includes(q)) partial ??= b;
  }
  return exact ?? partial;
}
const searchBrands = (query) => {
  const q = normalize(query);
  return q ? BRANDS.filter((b) => namesOf(b).some((n) => n.includes(q)))
    .sort((a, b) => a.name.localeCompare(b.name, 'da')) : [];
};

const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function card(result) {
  const m = META[result.status];
  const b = result.brand;
  const sources = [...STATUS_SOURCES[result.status], ...((b && b.sources) || [])];
  return '<div class="card" style="border-left-color:' + m.color + '">'
    + '<div class="row"><span class="emoji">' + m.emoji + '</span><div>'
    + '<div class="brand">' + esc(b ? b.name : (result.queriedName || 'Ukendt mærke')) + '</div>'
    + '<div class="status" style="color:' + m.color + '">' + esc(m.label) + '</div></div></div>'
    + (result.productName ? '<div class="detail">Produkt: ' + esc(result.productName) + '</div>' : '')
    + '<div class="desc">' + esc(m.description) + '</div>'
    + (b && b.certifications && b.certifications.length ? '<div class="detail">Certificeringer: ' + esc(b.certifications.join(', ')) + '</div>' : '')
    + (b && b.parentCompany ? '<div class="detail">Moderselskab: ' + esc(b.parentCompany) + '</div>' : '')
    + (b && b.note ? '<div class="note">' + esc(b.note) + '</div>' : '')
    + '<div class="sources"><h4>Kilder</h4>' + sources.map((s) =>
        '<div class="src"><a href="' + esc(s.url) + '" target="_blank" rel="noopener">🔗 ' + esc(s.title) + '</a>'
        + '<p>' + esc(s.explanation) + '</p></div>').join('')
    + '</div></div>';
}

const out = document.getElementById('out');
const q = document.getElementById('q');
q.addEventListener('input', () => {
  const hits = searchBrands(q.value);
  out.innerHTML = q.value.trim()
    ? (hits.length
        ? hits.map((b) => card({ status: b.status, brand: b, queriedName: b.name })).join('')
        : '<p class="hint">Ingen mærker matcher “' + esc(q.value.trim()) + '”. Databasen er vejledende — kig efter Leaping Bunny- eller PETA-logoet på emballagen.</p>')
    : '';
});

const bc = document.getElementById('bc');
const btn = document.getElementById('bcBtn');
btn.addEventListener('click', async () => {
  const code = bc.value.trim();
  if (!code) return;
  btn.disabled = true;
  out.innerHTML = '<p class="hint">Slår produktet op …</p>';
  try {
    let product;
    for (const base of ['https://world.openbeautyfacts.org/api/v2/product/',
                        'https://world.openfoodfacts.org/api/v2/product/']) {
      try {
        const res = await fetch(base + encodeURIComponent(code) + '.json');
        if (!res.ok) continue;
        const data = await res.json();
        if (data.status === 1 && data.product && data.product.brands) { product = data.product; break; }
      } catch {}
    }
    if (!product) {
      out.innerHTML = '<p class="hint">Produktet blev ikke fundet i Open Beauty Facts eller Open Food Facts. Prøv at søge på mærkets navn i stedet.</p>';
      return;
    }
    const candidates = product.brands.split(',').map((s) => s.trim()).filter(Boolean);
    let result = { status: 'unknown', queriedName: candidates[0] || '' };
    for (const c of candidates) {
      const brand = findBrand(c);
      if (brand) { result = { status: brand.status, brand, queriedName: c }; break; }
    }
    result.productName = product.product_name;
    out.innerHTML = card(result);
  } finally {
    btn.disabled = false;
  }
});
</script>
</body>
</html>
`;

const outDir = join(__dirname, '..', 'docs');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'index.html'), html);
console.log('Skrev docs/index.html (' + html.length + ' tegn)');
