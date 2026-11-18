import { renderToString } from 'react-dom/server';
import { LangProvider } from './i18n/LangProvider.jsx';
import { DEFAULT_LANG } from './i18n/lang.js';
import App from './App.jsx';

// Tayyor HTML (prerender): `npm run build` paytida sahifa Node'da bir marta chiziladi va natija
// index.html ichidagi <div id="root"> ga yoziladi (vite.config.js → prerender). Shunda matn JavaScript
// yuklanmasdan oldin ham sahifada bo‘ladi: qidiruv tizimlari o‘qiydi, sekin internetda darhol ko‘rinadi.
// Til — asosiy (o‘zbekcha). Daraxt src/main.jsx dagi bilan aynan bir xil bo‘lishi shart (hydrate).
export function render() {
  return renderToString(
    <LangProvider initialLang={DEFAULT_LANG}>
      <App />
    </LangProvider>,
  );
}
