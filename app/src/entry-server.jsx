import { renderToString } from 'react-dom/server';
import { LangProvider } from './i18n/LangProvider.jsx';
import App from './App.jsx';

// Tayyor HTML (prerender): `npm run build` paytida sahifa Node'da har til uchun bir martadan chiziladi va natija
// shu til sahifasidagi <div id="root"> ga yoziladi: index.html (uz), ru/index.html, en/index.html (vite.config.js → prerender).
// Shunda matn JavaScript yuklanmasdan oldin ham sahifada bo‘ladi: qidiruv tizimlari uchala tilni o‘qiydi,
// sekin internetda matn darhol ko‘rinadi. Daraxt src/main.jsx dagi bilan aynan bir xil bo‘lishi shart (hydrate).
export function render(lang) {
  return renderToString(
    <LangProvider initialLang={lang}>
      <App />
    </LangProvider>,
  );
}
