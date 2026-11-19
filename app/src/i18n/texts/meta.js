// Brauzer sarlavhasi (title), qidiruv tizimlari uchun tavsif (meta description) va havola ulashilganda chiqadigan matn (og:…).
// Build paytida har til sahifasiga (/, /ru/, /en/) o‘z tilidagisi yoziladi (vite.config.js → prerender).
// O‘zbekcha qiymatlarni index.html da ham bir xil qilib qo‘ying (`npm run dev` da o‘sha ko‘rinadi).
//
// Qidiruv uchun eng muhim joy — title va description: odamlar qidiradigan so‘zlar shu yerda turishi kerak
// (o‘zbekcha: karobka, gofrokarton; ruscha: коробки, гофрокартон; shahar — Toshkent). Title 60 belgidan, tavsif 160 belgidan oshmasin.
import { PHONE } from '../../data/site.js';

export const meta = {
  title: {
    uz: 'Karobka va gofrokarton ishlab chiqarish — Profpack, Toshkent',
    ru: 'Коробки и гофрокартон от производителя в Ташкенте — Profpack',
    en: 'Corrugated boxes and board manufacturer in Tashkent — Profpack',
  },
  description: {
    uz: `Profpack zavodi, Toshkent: gofra karton karobkalar (qutilar) istalgan o‘lchamda, logotip bosish, gofrokarton va rulon qog‘oz. Tel: ${PHONE.display}.`,
    ru: `Завод Profpack в Ташкенте: картонные коробки (гофрокороба) на заказ, печать логотипа, гофрокартон и рулонная бумага. Тел.: ${PHONE.display}.`,
    en: `Profpack plant in Tashkent: custom-size corrugated cardboard boxes, logo printing, corrugated board and paper rolls. Tel: ${PHONE.display}.`,
  },
  // havola Telegram, WhatsApp va boshqalarda ulashilganda chiqadigan sarlavha va matn
  ogTitle: {
    uz: 'Profpack — to‘liq siklli qadoq zavodi',
    ru: 'Profpack — завод упаковки полного цикла',
    en: 'Profpack — a full-cycle packaging plant',
  },
  ogDescription: {
    uz: 'Makulaturani qayta ishlaymiz, rulon qog‘oz va gofrokarton ishlab chiqaramiz, karobka yasab, logotipingizni bosamiz.',
    ru: 'Перерабатываем макулатуру, выпускаем рулонную бумагу и гофрокартон, делаем из него коробки и печатаем на них ваш логотип.',
    en: 'We recycle waste paper, produce paper rolls and corrugated board, turn it into boxes and print your logo on them.',
  },
};
