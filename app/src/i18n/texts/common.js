// Bir nechta joyda ishlatiladigan matnlar: header, mobil menyu, footer.

export const common = {
  order: { uz: 'Buyurtma berish', ru: 'Заказать', en: 'Order now' },           // header, menyu, bosh ekran tugmasi
  homeAria: { uz: 'Profpack — bosh sahifa', ru: 'Profpack — главная', en: 'Profpack — home' },   // logotip havolasi (ekran o‘quvchilar uchun)
};

// header va mobil menyu
export const header = {
  navAria: { uz: 'Asosiy menyu', ru: 'Основное меню', en: 'Main menu' },
  langAria: 'Til / Язык / Language',
  menuAria: { uz: 'Menyu', ru: 'Меню', en: 'Menu' },
};

// menyu bandlari: href — sahifadagi bo‘lim (#id)
export const nav = {
  process: { href: '#step-1', uz: 'Jarayon', ru: 'Процесс', en: 'Process' },
  products: { href: '#mahsulotlar', uz: 'Mahsulotlar', ru: 'Продукция', en: 'Products' },
  waste: { href: '#makulatura', uz: 'Makulatura', ru: 'Макулатура', en: 'Waste paper' },
  why: { href: '#afzalliklar', uz: 'Afzalliklar', ru: 'Преимущества', en: 'Why us' },
  calc: { href: '#kalkulyator', uz: 'Kalkulyator', ru: 'Калькулятор', en: 'Calculator' },
  contact: { href: '#aloqa', uz: 'Aloqa', ru: 'Контакты', en: 'Contacts' },
  faq: { href: '#savollar', uz: 'Savollar', ru: 'Вопросы', en: 'FAQ' },
};

// qaysi bandlar qayerda va qaysi tartibda chiqadi
export const HEADER_NAV = [nav.process, nav.products, nav.waste, nav.why, nav.calc, nav.contact];   // header + mobil menyu
export const FOOTER_NAV = [nav.process, nav.products, nav.waste, nav.why, nav.calc, nav.faq];       // footer «Bo‘limlar»
