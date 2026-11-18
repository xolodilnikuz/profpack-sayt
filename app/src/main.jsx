import { createRoot, hydrateRoot } from 'react-dom/client';
import { LangProvider } from './i18n/LangProvider.jsx';
import { DEFAULT_LANG, initialLang } from './i18n/lang.js';
import App from './App.jsx';
import './styles.css';

// StrictMode ishlatilmaydi: u dev rejimida effektlarni ikki marta ishga tushiradi va
// 3D sahna bitta <canvas> da ikkinchi WebGL renderer yaratib qo‘yardi.
const rootEl = document.getElementById('root');
const app = (
  <LangProvider>
    <App />
  </LangProvider>
);

// Build qilingan index.html ichida sahifaning tayyor o‘zbekcha HTML nusxasi bor (src/entry-server.jsx).
//  • til o‘zbekcha — React shu tayyor HTML'ni qayta chizmasdan "jonlantiradi" (hydrate);
//  • boshqa til (ru/en) — tayyor HTML tozalanadi va sahifa shu tilda chiziladi
//    (u paytgacha index.html dagi <style> tayyor HTML'ni yashirib turadi — til "sakrab" almashmaydi);
//  • `npm run dev` da tayyor HTML yo‘q — sahifa odatdagidek chiziladi.
if (rootEl.firstElementChild && initialLang() === DEFAULT_LANG) {
  hydrateRoot(rootEl, app);
} else {
  rootEl.replaceChildren();
  createRoot(rootEl).render(app);
}
rootEl.removeAttribute('data-prerendered');
