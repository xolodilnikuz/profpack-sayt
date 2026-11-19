import { createRoot, hydrateRoot } from 'react-dom/client';
import { LangProvider } from './i18n/LangProvider.jsx';
import { initialLang } from './i18n/lang.js';
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

// Build qilingan har sahifada (/, /ru/, /en/) o‘z tilidagi tayyor HTML bor; tili — data-prerendered="ru" (src/entry-server.jsx).
//  • kerakli til sahifa tili bilan bir xil — React tayyor HTML'ni qayta chizmasdan "jonlantiradi" (hydrate);
//  • til boshqa (masalan, / manzilida saqlangan tanlov ruscha) — tayyor HTML tozalanadi va sahifa shu tilda chiziladi
//    (u paytgacha index.html dagi <style> tayyor HTML'ni yashirib turadi — til "sakrab" almashmaydi);
//  • `npm run dev` da tayyor HTML yo‘q — sahifa odatdagidek chiziladi.
if (rootEl.firstElementChild && rootEl.getAttribute('data-prerendered') === initialLang()) {
  hydrateRoot(rootEl, app);
} else {
  rootEl.replaceChildren();
  createRoot(rootEl).render(app);
}
rootEl.removeAttribute('data-prerendered');
document.documentElement.classList.remove('pp-swap');
