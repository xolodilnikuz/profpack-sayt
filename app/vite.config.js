import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLogger, createServer, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { BUSINESS, PHONE, SITE_URL } from './src/data/site.js';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const PUBLIC_DIR = fileURLToPath(new URL('./public', import.meta.url));

// Tayyor sayt qayerga yoziladi:
//  • kompyuterda `npm run build` (app/ ichida) — repo ildiziga: index.html, static/, assets/, .nojekyll (GitHub Pages shuni ko‘rsatadi);
//  • Vercel'da (u VERCEL muhit o‘zgaruvchisini qo‘yadi) — app/dist ga (vercel.json dagi outputDirectory).
const OUT_DIR = process.env.VERCEL ? 'dist' : '..';

// public/ dagi fayllarni (assets/profpack-logo.png, .nojekyll) build natijasiga o‘zimiz qo‘shamiz.
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
//  • sitemap.xml — sayt xaritasi (bitta sahifa), sanasi — build kuni.
function seoFiles() {
  return {
    name: 'profpack-seo-files',
    apply: 'build',
    generateBundle() {
      const today = new Date().toISOString().slice(0, 10);
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}sitemap.xml\n` });
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}</loc><lastmod>${today}</lastmod></url>\n</urlset>\n`,
      });
    },
  };
}

// Kompaniya ma’lumoti qidiruv tizimlari tushunadigan ko‘rinishda (schema.org JSON-LD): nomi, manzili, telefoni, ish vaqti.
// Ma’lumot src/data/site.js dan olinadi (BUSINESS, PHONE) — sahifadagi aloqa bo‘limi bilan bir xil bo‘lishi kerak.
function jsonLd() {
  const logo = `${SITE_URL}assets/profpack-logo.png`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${SITE_URL}#website`, url: SITE_URL, name: BUSINESS.name, inLanguage: ['uz', 'ru', 'en'], publisher: { '@id': `${SITE_URL}#org` } },
      {
        '@type': ['Organization', 'LocalBusiness'],
        '@id': `${SITE_URL}#org`,
        name: BUSINESS.name,
        url: SITE_URL,
        logo,
        image: logo,
        description: BUSINESS.description,
        telephone: PHONE.tel,
        address: { '@type': 'PostalAddress', streetAddress: BUSINESS.street, addressLocality: BUSINESS.city, addressCountry: BUSINESS.country },
        openingHoursSpecification: [{
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: BUSINESS.opens,
          closes: BUSINESS.closes,
        }],
        contactPoint: { '@type': 'ContactPoint', telephone: PHONE.tel, contactType: 'sales', availableLanguage: ['uz', 'ru', 'en'] },
        areaServed: BUSINESS.country,
      },
    ],
  };
  // "<" belgisi skript ichida HTML tegi bo‘lib qolmasligi uchun almashtiriladi
  return `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

// Tayyor HTML (prerender): build paytida sahifa Node'da bir marta chiziladi (src/entry-server.jsx, o‘zbekcha)
// va index.html dagi <div id="root"> ichiga yoziladi. Brauzerda React shu HTML'ni "jonlantiradi" (src/main.jsx).
// Shunda sahifa matni JavaScript'siz ham HTML ichida bo‘ladi: qidiruv tizimlari o‘qiydi, sekin internetda darhol ko‘rinadi.
// Sayt manzili (SITE_URL — src/data/site.js) ham shu yerda yoziladi:
//  • og:image — havola ulashilganda chiqadigan rasm, to‘liq manzil bilan;
//  • canonical va og:url — sayt bir nechta manzilda ochilsa ham (o‘z domeni, vercel.app, github.io),
//    qidiruv tizimlari asosiy manzil sifatida SITE_URL ni oladi.
function prerender() {
  const ROOT_DIV = '<div id="root"></div>';
  const OG_IMAGE = 'content="assets/profpack-logo.png"';
  const OG_IMAGE_TAG = '<meta property="og:image"';
  return {
    name: 'profpack-prerender',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        for (const part of [ROOT_DIV, OG_IMAGE, '</head>']) if (!html.includes(part)) throw new Error(`index.html da ${part} topilmadi — prerender qilib bo‘lmadi`);
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
          const app = render();
          return html
            .replace(OG_IMAGE, () => `content="${SITE_URL}assets/profpack-logo.png"`)
            .replace(OG_IMAGE_TAG, () => `<link rel="canonical" href="${SITE_URL}">\n<meta property="og:url" content="${SITE_URL}">\n${OG_IMAGE_TAG}`)
            .replace('</head>', () => `${jsonLd()}\n</head>`)
            .replace(ROOT_DIV, () => `<div id="root" data-prerendered>${app}</div>`);
        } finally {
          await server.close();
        }
      },
    },
  };
}

// Vite natija papkasi kod papkasining ota-papkasi bo‘lsa "(!) build.outDir must not be … a parent directory of root" deb ogohlantiradi.
// Bu yerda shunday ataylab qilingan: build faqat index.html, static/, assets/ va .nojekyll yozadi, app/ ichiga hech narsa tushmaydi.
// Shu bitta ogohlantirishni faqat OUT_DIR === '..' bo‘lganda yashiramiz; qolgan barcha xabarlar odatdagidek chiqadi.
const logger = createLogger();
const warn = logger.warn;
logger.warn = (msg, options) => {
  if (OUT_DIR === '..' && msg.includes('build.outDir must not be the same directory of root')) return;
  warn(msg, options);
};

export default defineConfig({
  // nisbiy yo‘llar: sayt istalgan manzilda ishlaydi (GitHub Pages /profpack-sayt/ yoki o‘z domeni)
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
