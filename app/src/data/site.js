// =====================================================================
//  Aloqa ma’lumotlari — BITTA joy. Telefon, Telegram, email, manzil va
//  ish vaqti shu yerdan header, menyu, aloqa bo‘limi, footer va forma
//  xabarlariga olinadi. Shu yerda o‘zgartirsangiz — hamma joyda o‘zgaradi.
// =====================================================================

// telefon: display — ekranda ko‘rinishi, tel — tel: havolasi uchun (bo‘shliqsiz)
export const PHONE = {
  display: '+998 93 746 59 59',
  tel: '+998937465959',
};

// Telegram bot: url — havola, handle — ekranda ko‘rinadigan nomi
export const TELEGRAM = {
  url: 'https://t.me/Profpacksaytbot?start=sayt',
  handle: '@Profpacksaytbot',
};

export const EMAIL = 'info@profpack.uz';

// manzil va ish vaqti — uch tilda
export const ADDRESS = {
  uz: 'Toshkent sh., Yangihayot tumani, Kanora ko‘chasi, 3-uy',
  ru: 'г. Ташкент, Янгихаётский район, ул. Канора, 3',
  en: '3 Kanora St., Yangihayot District, Tashkent',
};

export const HOURS = {
  uz: 'Har kuni, 08:00–18:00',
  ru: 'Ежедневно, 08:00–18:00',
  en: 'Daily, 08:00–18:00',
};

// So‘rovlarni qabul qiluvchi Google Apps Script havolasi (…/exec) — u so‘rovni Telegram guruhga va Google Sheets'ga yozadi
// (backend kodi: apps-script/Code.gs). Bo‘sh bo‘lsa, forma mijozga qo‘ng‘iroq qilishni so‘raydi (so‘rov yo‘qolib ketmasligi uchun).
export const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbw9UkDTU3-cKmIljEtMR3szTTWMQbmoJkLFaE36kxWZz7A3ucOsLosOmy0TezfDDkyT0w/exec';

// Qidiruv tizimlari uchun kompaniya ma’lumoti: build paytida index.html ga yoziladi (JSON-LD, vite.config.js).
// Sahifada ko‘rinib turgan ma’lumot (aloqa bo‘limi) bilan bir xil bo‘lishi kerak; manzil qismlarga bo‘lingan.
export const BUSINESS = {
  name: 'Profpack',
  description: 'To‘liq siklli qadoq zavodi: makulaturani qayta ishlash, rulon qog‘oz, gofrokarton, gofroqutilar va brendli bosma qutilar.',
  street: 'Kanora ko‘chasi, 3-uy, Yangihayot tumani',
  city: 'Toshkent',
  country: 'UZ',
  opens: '08:00',     // har kuni
  closes: '18:00',
};

// saytning asosiy manzili (oxirida "/" bilan). Build paytida index.html ga yoziladi: canonical, og:url, og:image.
// robots.txt va sitemap.xml ham shu manzil bilan yaratiladi.
// apps-script/Code.gs dagi SITE_URL bilan bir xil bo‘lsin — Telegram bot shu havolani yuboradi.
export const SITE_URL = 'https://www.profpack.uz/';
