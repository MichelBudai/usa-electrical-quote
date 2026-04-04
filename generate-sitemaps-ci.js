/**
 * generate-sitemaps-ci.js — auto-generated, do not edit manually
 * Génère sitemap1-5.xml + sitemap-index.xml dans out/ après next build
 */
const fs   = require('fs');
const path = require('path');

const BASE_URL  = 'https://usa-electrical-quote.com';
const SERVICES  = ["electrician-quote","panel-upgrade","electrical-inspection","outlet-installation","ceiling-fan-installation","ev-charger-installation","generator-installation","emergency-electrician"];
const LAST_MOD  = '2026-04-03';
const MAX_SPLIT = 49000;
const OUT_DIR   = path.join(process.cwd(), 'out');
const META_PATH = path.join(process.cwd(), 'data', 'city_metadata.json');

function urlLine(url, priority, changefreq = 'yearly') {
  return `  <url><loc>${url}</loc><lastmod>${LAST_MOD}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`;
}
function wrapUrlset(lines) {
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join('\n')}\n</urlset>`;
}
function buildIndex(urls) {
  const items = urls.map(u => `  <sitemap><loc>${u}</loc><lastmod>${LAST_MOD}</lastmod></sitemap>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`;
}

const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
const stateMap = {};
Object.values(meta).forEach(c => {
  const st = c.state.toLowerCase().replace(/\s+/g, '-');
  if (!stateMap[st]) stateMap[st] = [];
  stateMap[st].push(c);
});
const stateKeys = Object.keys(stateMap).sort();

// Build all URLs
const all = [];
all.push(urlLine(BASE_URL, '1.0', 'yearly'));
for (const svc of SERVICES) all.push(urlLine(`${BASE_URL}/${svc}`, '0.9', 'monthly'));
for (const svc of SERVICES)
  for (const st of stateKeys)
    all.push(urlLine(`${BASE_URL}/${svc}/${st}`, '0.8', 'yearly'));
for (const svc of SERVICES)
  for (const st of stateKeys)
    for (const c of stateMap[st]) {
      const citySlug = c.city.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      all.push(urlLine(`${BASE_URL}/${svc}/${st}/${citySlug}`, '0.5', 'yearly'));
    }

console.log(`Total URLs: ${all.length}`);

// Split for Google (49k max per file)
const chunks = [];
for (let i = 0; i < all.length; i += MAX_SPLIT) chunks.push(all.slice(i, i + MAX_SPLIT));

chunks.forEach((chunk, i) => {
  fs.writeFileSync(path.join(OUT_DIR, `sitemap${i+1}.xml`), wrapUrlset(chunk));
  console.log(`  sitemap${i+1}.xml: ${chunk.length} URLs`);
});

// sitemap-index.xml
const indexUrls = chunks.map((_, i) => `${BASE_URL}/sitemap${i+1}.xml`);
fs.writeFileSync(path.join(OUT_DIR, 'sitemap-index.xml'), buildIndex(indexUrls));
console.log(`  sitemap-index.xml: ${chunks.length} fichiers`);
