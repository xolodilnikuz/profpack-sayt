import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createLogger, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PUBLIC_DIR = fileURLToPath(new URL('./public', import.meta.url));

// `npm run build` (app/ ichida) tayyor saytni repo ildiziga yozadi: index.html, static/, assets/, .nojekyll
const OUT_DIR = '..';

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
  plugins: [react(), copyPublic()],
  build: {
    outDir: OUT_DIR,
    emptyOutDir: false,          // ildizdagi boshqa fayllarga tegmaymiz; eski static/ ni scripts/clean.mjs o‘chiradi
    assetsDir: 'static',         // JS/CSS va rasmlar → ../static/
    copyPublicDir: false,        // public/ ni yuqoridagi copyPublic() nusxalaydi
    chunkSizeWarningLimit: 800,  // 3D bo‘lak (three.js bilan) ~520 kB — alohida yuklanadi, sahifa matni undan oldin chiqadi
  },
});
