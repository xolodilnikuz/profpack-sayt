import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLogger, createServer, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { HOME, PAGES } from './src/data/pages.js';
import { BUSINESS, PHONE, SITE_URL, VERIFY } from './src/data/site.js';
import { DEFAULT_LANG, LANGS, pageDepth, pagePath, splitPath } from './src/i18n/lang.js';
import { faq } from './src/i18n/texts/faq.js';
import { meta } from './src/i18n/texts/meta.js';
import { TOPICS, metaFor, topicsCommon } from './src/i18n/texts/pages/index.js';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = fileURLToPath(new URL('./public', import.meta.url));

// Tayyor sayt qayerga yoziladi:
//  • kompyuterda `npm run build` (app/ ichida) — repo ildiziga: index.html, ru/, en/, karobka/ …, static/, assets/ (GitHub Pages shuni ko‘rsatadi);
//  • Vercel'da (u VERCEL muhit o‘zgaruvchisini qo‘yadi) — app/dist ga (vercel.json dagi outputDirectory).
const OUT_DIR = process.env.VERCEL ? 'dist' : '..';

// Saytdagi barcha sahifalar: bosh sahifa + alohida sahifalar (src/data/pages.js), har biri uch tilda.
const VIEWS = [HOME, ...PAGES.map(p => p.id)];
const EVERY = LANGS.flatMap(lang => VIEWS.map(view => ({ lang, view })));
const isDefault = (lang, view) => lang === DEFAULT_LANG && view === HOME;

// sahifaning to‘liq manzili: https://www.profpack.uz/ · …/ru/ · …/karobka/ · …/ru/korobki/
const pageUrl = (lang, view = HOME) => SITE_URL + pagePath(lang, view);
const OG_LOCALE = { uz: 'uz_UZ', ru: 'ru_RU', en: 'en_US' };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// public/ dagi fayllarni (assets/profpack-logo.png, sayt belgisi, .nojekyll) build natijasiga o‘zimiz qo‘shamiz.
// Sabab: natija repo ildiziga yoziladi va public/ shu papka ichida qoladi —
// Vite'ning o‘z nusxalashi bunday holatda ogohlantirish chiqaradi.
function copyPublic() {
  return {
    name: 'profpack-copy-public',
    apply: 'build',
    generateBundle() {
      const walk = dir => {
        for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
          const file = path.join(dir, e.name);
          if (e.isDirectory()) walk(file);
          else this.emitFile({ type: 'asset', fileName: path.relative(PUBLIC_DIR, file).split(path.sep).join('/'), source: fs.readFileSync(file) });
        }
      };
      walk(PUBLIC_DIR);
    },
  };
}

// Qidiruv tizimlari uchun fayllar — sayt manzili (SITE_URL) bo‘yicha build paytida yoziladi:
//  • robots.txt — saytni o‘qishga ruxsat va sayt xaritasi manzili;
//  • sitemap.xml — sayt xaritasi: barcha sahifalar uch tilda (bir-birining tarjimasi ekani ko‘rsatiladi), sanasi — build kuni.
function seoFiles() {
  return {
    name: 'profpack-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const urls = VIEWS.flatMap(view => {
        const alternates = LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l, view)}"/>`).join('\n');
        return LANGS.map(l => `  <url>\n    <loc>${pageUrl(l, view)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`);
      }).join('\n');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n` });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

// Sahifa ma’lumoti qidiruv tizimlari tushunadigan ko‘rinishda (schema.org JSON-LD):
//  • kompanniya: nomi, manzili, telefoni, ish vaqti (src/data/site.js dagi BUSINESS, PHONE — sahifadagi aloqa bo‘limi bilan bir xil bo‘lishi kerak);
//  • sahifadagi savol-javoblar (FAQPage);
//  • alohida sahifalarda — sahifaning o‘zi va unga yo‘l (Bosh sahifa → Karobka).
function jsonLd(lang, view) {
  const logo = `${SITE_URL}assets/profpack-logo.png`;
  const url = pageUrl(lang, view);
  const topic = TOPICS[view];
  const graph = [
    { '@type': 'WebSite', '@id': `${SITE_URL}#website`, url: SITE_URL, name: BUSINESS.name, inLanguage: LANGS, publisher: { '@id': `${SITE_URL}#org` } },
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${SITE_URL}#org`,
      name: BUSINESS.name,
      url: SITE_URL,
      logo,
      image: logo,
      description: meta.description[lang],
      telephone: PHONE.tel,
      address: { '@type': 'PostalAddress', streetAddress: BUSINESS.street, addressLocality: BUSINESS.city, addressCountry: BUSINESS.country },
      openingHoursSpecification: [{
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: BUSINESS.opens,
        closes: BUSINESS.closes,
      }],
      contactPoint: { '@type': 'ContactPoint', telephone: PHONE.tel, contactType: 'sales', availableLanguage: LANGS },
      areaServed: BUSINESS.country,
    },
  ];
  if (topic) {
    graph.push(
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: topic.meta.title[lang],
        description: topic.meta.description[lang],
        inLanguage: lang,
        isPartOf: { '@id': `${SITE_URL}#website` },
        about: { '@id': `${SITE_URL}#org` },
        breadcrumb: { '@id': `${url}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: topicsCommon.home[lang], item: pageUrl(lang) },
          { '@type': 'ListItem', position: 2, name: topic.nav[lang], item: url },
        ],
      },
    );
  }
  // sahifadagi «Ko‘p so‘raladigan savollar» bo‘limi — savol-javoblar shu tilda (bosh sahifa: texts/faq.js, alohida sahifa: o‘zining faq i)
  graph.push({
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    inLanguage: lang,
    mainEntity: (topic ? topic.faq : faq.items).map(item => ({ '@type': 'Question', name: item.q[lang], acceptedAnswer: { '@type': 'Answer', text: item.a[lang] } })),
  });
  // "<" belgisi skript ichida HTML tegi bo‘lib qolmasligi uchun almashtiriladi
  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`;
}

// index.html qolipidan bitta sahifani yasaydi: <html lang>, sarlavha, tavsif, og:…, canonical, hreflang, JSON-LD va tayyor HTML.
function pageHtml(template, lang, view, app) {
  const where = `${lang}/${view}`;
  // topilmasa — build to‘xtaydi (index.html o‘zgargan bo‘lsa, shu yerda bilinadi)
  const swap = (html, re, to, what) => {
    if (!re.test(html)) throw new Error(`index.html da ${what} topilmadi — ${where} sahifasini yasab bo‘lmadi`);
    return html.replace(re, to);
  };
  const m = metaFor(view);
  const title = m.title[lang];
  const description = m.description[lang];
  // havola ulashilganda chiqadigan sarlavha va matn: bosh sahifada alohida yozilgan, qolganlarida — sarlavha va tavsifning o‘zi
  const ogTitle = m.ogTitle ? m.ogTitle[lang] : title;
  const ogDescription = m.ogDescription ? m.ogDescription[lang] : description;
  const headLinks = [
    `<link rel="canonical" href="${pageUrl(lang, view)}">`,
    // hreflang: qidiruv tizimi har foydalanuvchiga shu sahifaning o‘z tilidagisini ko‘rsatadi
    ...LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l, view)}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANG, view)}">`,
    `<meta property="og:url" content="${pageUrl(lang, view)}">`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}">`,
    // og:image — havola ulashilganda chiqadigan rasm, to‘liq manzil bilan
    `<meta property="og:image" content="${SITE_URL}assets/profpack-logo.png">`,
    // sayt egasini tasdiqlash kodlari (VERIFY — src/data/site.js); bo‘sh bo‘lsa, qo‘shilmaydi
    VERIFY.google && `<meta name="google-site-verification" content="${esc(VERIFY.google)}">`,
    VERIFY.yandex && `<meta name="yandex-verification" content="${esc(VERIFY.yandex)}">`,
  ].filter(Boolean).join('\n');

  let html = template;
  html = swap(html, /<html lang="uz">/, () => `<html lang="${lang}" data-page="${lang}">`, '<html lang="uz">');
  html = swap(html, /<title>[\s\S]*?<\/title>/, () => `<title>${esc(title)}</title>`, '<title>');
  html = swap(html, /(<meta name="description" content=")[^"]*(">)/, (_, a, b) => a + esc(description) + b, 'meta description');
  html = swap(html, /(<meta property="og:title" content=")[^"]*(">)/, (_, a, b) => a + esc(ogTitle) + b, 'og:title');
  html = swap(html, /(<meta property="og:description" content=")[^"]*(">)/, (_, a, b) => a + esc(ogDescription) + b, 'og:description');
  html = swap(html, /<meta property="og:image" content="assets\/profpack-logo\.png">/, () => headLinks, 'og:image');
  html = swap(html, /<\/head>/, () => `${jsonLd(lang, view)}\n</head>`, '</head>');
  // ichkaridagi sahifalar (/ru/, /karobka/ — bir pog‘ona, /ru/korobki/ — ikki) fayllarga "../" orqali boradi
  const up = '../'.repeat(pageDepth(lang, view));
  if (up) html = html.replace(/((?:href|src)=")\.\//g, (_, a) => a + up);
  return swap(html, /<div id="root"><\/div>/, () => `<div id="root" data-prerendered="${lang}" data-view="${view}">${app}</div>`, '<div id="root"></div>');
}

// Build oldidan tekshiruvlar — xato bo‘lsa, build to‘xtab, nima qilish kerakligini aytadi:
//  1) manzildagi so‘zlar (slug) to‘g‘ri yozilgan va takrorlanmaydi;
//  2) index.html dagi til aniqlovchi kichik skript har sahifa manzilidan tilni src/i18n/lang.js bilan bir xil topadi;
//  3) vercel.json dagi yo‘naltirish (eski manzillar → bosh sahifa) yangi sahifalarni "yutib yubormaydi".
function checkRoutes(template) {
  const fail = msg => { throw new Error(`Sahifa manzillari tekshiruvi: ${msg}`); };

  const seen = new Map();
  for (const p of PAGES) {
    for (const l of LANGS) {
      const slug = p.slug && p.slug[l];
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug || '')) fail(`src/data/pages.js: "${p.id}" sahifasining ${l} tilidagi slug i noto‘g‘ri ("${slug}"). Faqat kichik lotin harflari, raqam va "-" bo‘lsin.`);
      if (LANGS.includes(slug)) fail(`src/data/pages.js: slug til kodi bilan bir xil bo‘lmasin ("${slug}").`);
      if (seen.has(slug) && seen.get(slug) !== p.id) fail(`src/data/pages.js: "${slug}" ikki xil sahifada ishlatilgan (${seen.get(slug)} va ${p.id}).`);
      seen.set(slug, p.id);
    }
    if (!TOPICS[p.id]) fail(`"${p.id}" sahifasining matnlari topilmadi: src/i18n/texts/pages/ ga fayl qo‘shib, index.js dagi TOPICS ga yozing.`);
  }

  const inline = template.match(/location\.pathname\.match\(\/(.+?)\/\);/);
  if (!inline) fail('index.html dagi til aniqlovchi skript topilmadi (location.pathname.match(/…/)).');
  const langRe = new RegExp(inline[1]);
  const redirect = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).redirects?.[0]?.source;
  if (!redirect) fail('vercel.json da redirects[0].source topilmadi.');
  const redirectRe = new RegExp(`^${redirect}$`);

  for (const { lang, view } of EVERY) {
    const rel = pagePath(lang, view);
    const want = lang === DEFAULT_LANG ? null : lang;
    for (const base of ['/', '/profpack-sayt/']) {        // o‘z domeni va GitHub Pages papkasi
      for (const p of [base + rel, (base + rel).replace(/\/$/, '') || '/', `${base + rel}index.html`]) {
        const got = splitPath(p);
        if (p !== '/profpack-sayt' && (got.lang !== want || got.page !== view)) fail(`src/i18n/lang.js: "${p}" manzili noto‘g‘ri o‘qildi (til: ${got.lang}, sahifa: ${got.page}; kutilgan: ${want}, ${view}).`);
        const m = p.match(langRe);
        if (p !== '/profpack-sayt' && (m ? m[2] : null) !== want) fail(`index.html dagi skript "${p}" manzilidan tilni noto‘g‘ri topdi (${m ? m[2] : null}; kutilgan: ${want}).`);
      }
    }
    if (rel) {
      for (const p of [`/${rel}`, `/${rel}`.replace(/\/$/, '')]) {
        if (redirectRe.test(p)) fail(`vercel.json: "${p}" manzili bosh sahifaga yo‘naltirilib qoladi. redirects[0].source ichidagi istisnolar qatoriga "|${rel.replace(/\/$/, '')}/?$" ni qo‘shing.`);
      }
    }
  }
  if (!redirectRe.test('/eski-sahifa/')) fail('vercel.json: eski manzillarni bosh sahifaga yo‘naltirish ishlamayapti (redirects[0].source).');
}

// Sarlavha va tavsif uzunligi: qidiruv natijasida kesilib qolmasligi uchun sarlavha 60, tavsif 160 belgidan oshmasin
function checkMeta(warn) {
  for (const { lang, view } of EVERY) {
    const m = metaFor(view);
    const t = m.title[lang].length, d = m.description[lang].length;
    if (t > 62) warn(`sarlavha uzun (${t} belgi, 60 gacha bo‘lsin): ${lang}/${view} — ${m.title[lang]}`);
    if (d > 165) warn(`tavsif uzun (${d} belgi, 160 gacha bo‘lsin): ${lang}/${view}`);
  }
}

// Tayyor HTML (prerender): build paytida har sahifa Node'da har til uchun bir martadan chiziladi (src/entry-server.jsx)
// va o‘z manziliga yoziladi: index.html, ru/index.html, karobka/index.html, ru/korobki/index.html …
// Brauzerda React shu HTML'ni "jonlantiradi" (src/main.jsx). Shunda matn JavaScript'siz ham HTML ichida bo‘ladi:
// qidiruv tizimlari har sahifani har tilda alohida o‘qiydi, sekin internetda matn darhol ko‘rinadi.
// Sayt manzili (SITE_URL — src/data/site.js) ham shu yerda yoziladi: canonical, hreflang, og:url, og:image.
function prerender() {
  const key = (lang, view) => `${lang}/${view}`;
  const pages = new Map();   // "til/sahifa" → tayyor sahifa HTML
  return {
    name: 'profpack-prerender',
    apply: 'build',
    enforce: 'post',          // generateBundle Vite index.html ni tayyorlab bo‘lgandan keyin ishlashi kerak
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        checkRoutes(html);
        checkMeta(msg => logger.warn(`(!) ${msg}`));
        // komponentlarni Node'da ishga tushirish uchun vaqtinchalik Vite serveri (port ochmaydi, fayllarni kuzatmaydi)
        const server = await createServer({
          configFile: false,
          root: ROOT,
          appType: 'custom',
          logLevel: 'error',
          esbuild: { jsx: 'automatic' },
          server: { middlewareMode: true, hmr: false, watch: null },
          optimizeDeps: { noDiscovery: true, include: [] },
        });
        try {
          const { render } = await server.ssrLoadModule('/src/entry-server.jsx');
          for (const { lang, view } of EVERY) pages.set(key(lang, view), pageHtml(html, lang, view, render(lang, view)));
        } finally {
          await server.close();
        }
        return pages.get(key(DEFAULT_LANG, HOME));
      },
    },
    generateBundle() {
      if (pages.size !== EVERY.length) this.error('prerender: sahifalar tayyor emas (index.html qayta ishlanmadi)');
      for (const { lang, view } of EVERY) {
        if (!isDefault(lang, view)) this.emitFile({ type: 'asset', fileName: `${pagePath(lang, view)}index.html`, source: pages.get(key(lang, view)) });
      }
    },
  };
}

// Vite natija papkasi kod papkasining ota-papkasi bo‘lsa "(!) build.outDir must not be … a parent directory of root" deb ogohlantiradi.
// Bu yerda shunday ataylab qilingan: build faqat index.html, sahifa papkalari, static/, assets/ va bir nechta kichik fayl yozadi, app/ ichiga hech narsa tushmaydi.
// Shu bitta ogohlantirishni faqat OUT_DIR === '..' bo‘lganda yashiramiz; qolgan barcha xabarlar odatdagidek chiqadi.
const logger = createLogger();
const warn = logger.warn;
logger.warn = (msg, options) => {
  if (OUT_DIR === '..' && msg.includes('build.outDir must not be the same directory of root')) return;
  warn(msg, options);
};

export default defineConfig({
  // nisbiy yo‘llar: sayt istalgan manzilda ishlaydi (o‘z domeni, vercel.app yoki GitHub Pages /profpack-sayt/)
  base: './',
  customLogger: logger,
  plugins: [react(), copyPublic(), seoFiles(), prerender()],
  build: {
    outDir: OUT_DIR,
    emptyOutDir: false,          // ildizdagi boshqa fayllarga tegmaymiz; eski static/ ni scripts/clean.mjs o‘chiradi
    assetsDir: 'static',         // JS/CSS va rasmlar → ../static/
    copyPublicDir: false,        // public/ ni yuqoridagi copyPublic() nusxalaydi
    chunkSizeWarningLimit: 800,  // 3D bo‘lak (three.js bilan) ~520 kB — alohida yuklanadi, sahifa matni undan oldin chiqadi
  },
});
