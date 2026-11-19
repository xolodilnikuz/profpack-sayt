import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLogger, createServer, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BUSINESS, PHONE, SITE_URL } from './src/data/site.js';
import { DEFAULT_LANG, LANGS } from './src/i18n/lang.js';
import { meta } from './src/i18n/texts/meta.js';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = fileURLToPath(new URL('./public', import.meta.url));

// Tayyor sayt qayerga yoziladi:
//  • kompyuterda `npm run build` (app/ ichida) — repo ildiziga: index.html, ru/, en/, static/, assets/ … (GitHub Pages shuni ko‘rsatadi);
//  • Vercel'da (u VERCEL muhit o‘zgaruvchisini qo‘yadi) — app/dist ga (vercel.json dagi outputDirectory).
const OUT_DIR = process.env.VERCEL ? 'dist' : '..';

// har til sahifasining to‘liq manzili: o‘zbekcha — sayt manzilining o‘zi, qolganlari — /ru/, /en/
const pageUrl = lang => SITE_URL + (lang === DEFAULT_LANG ? '' : `${lang}/`);
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
//  • sitemap.xml — sayt xaritasi: uchala til sahifasi (bir-birining tarjimasi ekani ko‘rsatiladi), sanasi — build kuni.
function seoFiles() {
  return {
    name: 'profpack-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      const alternates = LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${pageUrl(l)}"/>`).join('\n');
      const urls = LANGS.map(l => `  <url>\n    <loc>${pageUrl(l)}</loc>\n    <lastmod>${today}</lastmod>\n${alternates}\n  </url>`).join('\n');
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n` });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`,
      });
    },
  };
}

// Kompaniya ma’lumoti qidiruv tizimlari tushunadigan ko‘rinishda (schema.org JSON-LD): nomi, manzili, telefoni, ish vaqti.
// Ma’lumot src/data/site.js dan olinadi (BUSINESS, PHONE) — sahifadagi aloqa bo‘limi bilan bir xil bo‘lishi kerak.
function jsonLd(lang) {
  const logo = `${SITE_URL}assets/profpack-logo.png`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
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
    ],
  };
  // "<" belgisi skript ichida HTML tegi bo‘lib qolmasligi uchun almashtiriladi
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

// index.html qolipidan bitta til sahifasini yasaydi: <html lang>, sarlavha, tavsif, og:…, canonical, hreflang, JSON-LD va tayyor HTML.
function pageHtml(template, lang, app) {
  // topilmasa — build to‘xtaydi (index.html o‘zgargan bo‘lsa, shu yerda bilinadi)
  const swap = (html, re, to, what) => {
    if (!re.test(html)) throw new Error(`index.html da ${what} topilmadi — ${lang} sahifasini yasab bo‘lmadi`);
    return html.replace(re, to);
  };
  const headLinks = [
    `<link rel="canonical" href="${pageUrl(lang)}">`,
    // hreflang: qidiruv tizimi har foydalanuvchiga o‘z tilidagi sahifani ko‘rsatadi
    ...LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${pageUrl(l)}">`),
    `<link rel="alternate" hreflang="x-default" href="${pageUrl(DEFAULT_LANG)}">`,
    `<meta property="og:url" content="${pageUrl(lang)}">`,
    `<meta property="og:locale" content="${OG_LOCALE[lang]}">`,
    // og:image — havola ulashilganda chiqadigan rasm, to‘liq manzil bilan
    `<meta property="og:image" content="${SITE_URL}assets/profpack-logo.png">`,
  ].join('\n');

  let html = template;
  html = swap(html, /<html lang="uz">/, () => `<html lang="${lang}" data-page="${lang}">`, '<html lang="uz">');
  html = swap(html, /<title>[\s\S]*?<\/title>/, () => `<title>${esc(meta.title[lang])}</title>`, '<title>');
  html = swap(html, /(<meta name="description" content=")[^"]*(">)/, (_, a, b) => a + esc(meta.description[lang]) + b, 'meta description');
  html = swap(html, /(<meta property="og:title" content=")[^"]*(">)/, (_, a, b) => a + esc(meta.ogTitle[lang]) + b, 'og:title');
  html = swap(html, /(<meta property="og:description" content=")[^"]*(">)/, (_, a, b) => a + esc(meta.ogDescription[lang]) + b, 'og:description');
  html = swap(html, /<meta property="og:image" content="assets\/profpack-logo\.png">/, () => headLinks, 'og:image');
  html = swap(html, /<\/head>/, () => `${jsonLd(lang)}\n</head>`, '</head>');
  // /ru/ va /en/ sahifalari bir pog‘ona ichkarida turadi — fayllarga yo‘l "../" bilan boshlanadi
  if (lang !== DEFAULT_LANG) html = html.replace(/((?:href|src)=")\.\//g, '$1../');
  return swap(html, /<div id="root"><\/div>/, () => `<div id="root" data-prerendered="${lang}">${app}</div>`, '<div id="root"></div>');
}

// Tayyor HTML (prerender): build paytida sahifa Node'da har til uchun bir martadan chiziladi (src/entry-server.jsx)
// va shu til sahifasiga yoziladi: index.html (o‘zbekcha), ru/index.html, en/index.html.
// Brauzerda React shu HTML'ni "jonlantiradi" (src/main.jsx). Shunda matn JavaScript'siz ham HTML ichida bo‘ladi:
// qidiruv tizimlari uchala tilni alohida sahifa sifatida o‘qiydi, sekin internetda matn darhol ko‘rinadi.
// Sayt manzili (SITE_URL — src/data/site.js) ham shu yerda yoziladi: canonical, hreflang, og:url, og:image.
function prerender() {
  const pages = new Map();   // til → tayyor sahifa HTML
  return {
    name: 'profpack-prerender',
    apply: 'build',
    enforce: 'post',          // generateBundle Vite index.html ni tayyorlab bo‘lgandan keyin ishlashi kerak
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
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
          for (const lang of LANGS) pages.set(lang, pageHtml(html, lang, render(lang)));
        } finally {
          await server.close();
        }
        return pages.get(DEFAULT_LANG);
      },
    },
    generateBundle() {
      if (pages.size !== LANGS.length) this.error('prerender: til sahifalari tayyor emas (index.html qayta ishlanmadi)');
      for (const lang of LANGS) {
        if (lang !== DEFAULT_LANG) this.emitFile({ type: 'asset', fileName: `${lang}/index.html`, source: pages.get(lang) });
      }
    },
  };
}

// Vite natija papkasi kod papkasining ota-papkasi bo‘lsa "(!) build.outDir must not be … a parent directory of root" deb ogohlantiradi.
// Bu yerda shunday ataylab qilingan: build faqat index.html, ru/, en/, static/, assets/ va bir nechta kichik fayl yozadi, app/ ichiga hech narsa tushmaydi.
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
