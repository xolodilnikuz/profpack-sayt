import { renderToString } from 'react-dom/server';
import { LangProvider } from './i18n/LangProvider.jsx';
import App from './App.jsx';

// Tayyor HTML (prerender): `npm run build` paytida har sahifa Node'da har til uchun bir martadan chiziladi va natija
// shu sahifaning <div id="root"> iga yoziladi: index.html, ru/index.html, karobka/index.html, ru/korobki/index.html …
// (vite.config.js → prerender). Shunda matn JavaScript yuklanmasdan oldin ham sahifada bo‘ladi: qidiruv tizimlari
// har sahifani har tilda o‘qiydi, sekin internetda matn darhol ko‘rinadi.
// Daraxt src/main.jsx dagi bilan aynan bir xil bo‘lishi shart (hydrate).
export function render(lang, page) {
  return renderToString(
    <LangProvider initialLang={lang} page={page}>
      <App page={page} />
    </LangProvider>,
  );
}
