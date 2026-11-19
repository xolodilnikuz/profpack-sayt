import { createRoot, hydrateRoot } from 'react-dom/client';
import { HOME } from './data/pages.js';
import { LangProvider } from './i18n/LangProvider.jsx';
import { initialLang, initialPage } from './i18n/lang.js';
import App from './App.jsx';
import './styles.css';

// StrictMode ishlatilmaydi: u dev rejimida effektlarni ikki marta ishga tushiradi va
// 3D sahna bitta <canvas> da ikkinchi WebGL renderer yaratib qo‘yardi.
const rootEl = document.getElementById('root');
// qaysi sahifa ochilgan — manzildan aniqlanadi: / — bosh sahifa, /karobka/, /ru/korobki/ … — alohida sahifalar (src/data/pages.js)
const page = initialPage();
const app = (
  <LangProvider page={page}>
    <App page={page} />
  </LangProvider>
);

// Build qilingan har sahifada o‘z tilidagi tayyor HTML bor: tili — data-prerendered="ru", sahifasi — data-view="boxes" (vite.config.js).
//  • kerakli til va sahifa tayyor HTML bilan bir xil — React uni qayta chizmasdan "jonlantiradi" (hydrate);
//  • til boshqa (masalan, / manzilida saqlangan tanlov ruscha) — tayyor HTML tozalanadi va sahifa shu tilda chiziladi
//    (u paytgacha index.html dagi <style> tayyor HTML'ni yashirib turadi — til "sakrab" almashmaydi);
//  • `npm run dev` da tayyor HTML yo‘q — sahifa odatdagidek chiziladi.
const ready = rootEl.firstElementChild
  && rootEl.getAttribute('data-prerendered') === initialLang()
  && (rootEl.getAttribute('data-view') || HOME) === page;
if (ready) {
  hydrateRoot(rootEl, app);
} else {
  rootEl.replaceChildren();
  createRoot(rootEl).render(app);
}
rootEl.removeAttribute('data-prerendered');
rootEl.removeAttribute('data-view');
document.documentElement.classList.remove('pp-swap');
