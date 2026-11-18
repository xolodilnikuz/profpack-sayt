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

// saytning ochiq manzili (apps-script/Code.gs dagi SITE_URL bilan bir xil bo‘lsin; bot shu havolani yuboradi)
export const SITE_URL = 'https://xolodilnikuz.github.io/profpack-sayt/';
