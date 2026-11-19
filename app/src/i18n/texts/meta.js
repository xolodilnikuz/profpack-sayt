// Brauzer sarlavhasi (title), qidiruv tizimlari uchun tavsif (meta description) va havola ulashilganda chiqadigan matn (og:…).
// Build paytida har til sahifasiga (/, /ru/, /en/) o‘z tilidagisi yoziladi (vite.config.js → prerender).
// O‘zbekcha qiymatlarni index.html da ham bir xil qilib qo‘ying (`npm run dev` da o‘sha ko‘rinadi).
export const meta = {
  title: {
    uz: 'Profpack — makulaturadan brendli qutigacha',
    ru: 'Profpack — от макулатуры до фирменной коробки',
    en: 'Profpack — from waste paper to branded boxes',
  },
  description: {
    uz: 'Profpack — to‘liq siklli qadoq zavodi: makulaturani qayta ishlash, rulon qog‘oz, gofrokarton, gofroqutilar va brendli bosma qutilar.',
    ru: 'Profpack — завод упаковки полного цикла: переработка макулатуры, рулонная бумага, гофрокартон, гофрокороба и коробки с печатью логотипа.',
    en: 'Profpack is a full-cycle packaging plant: waste paper recycling, paper rolls, corrugated board, corrugated boxes and boxes printed with your brand.',
  },
  // havola Telegram, WhatsApp va boshqalarda ulashilganda chiqadigan sarlavha va matn
  ogTitle: {
    uz: 'Profpack — to‘liq siklli qadoq zavodi',
    ru: 'Profpack — завод упаковки полного цикла',
    en: 'Profpack — a full-cycle packaging plant',
  },
  ogDescription: {
    uz: 'Makulaturani qayta ishlaymiz, rulon qog‘oz va gofrokarton ishlab chiqaramiz, quti yasab, logotipingizni bosamiz.',
    ru: 'Перерабатываем макулатуру, выпускаем рулонную бумагу и гофрокартон, делаем из него коробки и печатаем на них ваш логотип.',
    en: 'We recycle waste paper, produce paper rolls and corrugated board, turn it into boxes and print your logo on them.',
  },
};
