// Til tanlash va saqlash.
// Tartib: ?lang= → saqlangan tanlov (localStorage 'pp-lang') → brauzer tili.
// Brauzer tilidan faqat ruscha aniqlanadi; inglizcha faqat tanlansa (mahalliy mijozlar uchun asosiy til o‘zbekcha).
// Eslatma: index.html dagi kichik skript ham aynan shu tartibda <html lang> ni React’dan oldin qo‘yadi.

export const LANGS = ['uz', 'ru', 'en'];
export const DEFAULT_LANG = 'uz';
const STORAGE_KEY = 'pp-lang';

export const isLang = l => LANGS.includes(l);

export function detectLang() {
  try {
    let l = new URLSearchParams(location.search).get('lang') || localStorage.getItem(STORAGE_KEY);
    if (!isLang(l)) l = /^ru\b/i.test(navigator.language || '') ? 'ru' : 'uz';
    return l;
  } catch {
    return DEFAULT_LANG;
  }
}

// boshlang‘ich til: index.html skripti qo‘ygan <html lang> (u bo‘lmasa — qayta aniqlaymiz)
export function initialLang() {
  if (typeof document === 'undefined') return DEFAULT_LANG;
  const l = document.documentElement.lang;
  return isLang(l) ? l : detectLang();
}

// foydalanuvchi tanlovini eslab qolamiz; manzilda ?lang= bo‘lsa, uni ham yangilaymiz
export function saveLang(l) {
  try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  const u = new URL(location.href);
  if (u.searchParams.has('lang')) { u.searchParams.set('lang', l); history.replaceState(null, '', u); }
}

// { uz, ru, en } obyektidan joriy tildagi matn; oddiy satr o‘zgarishsiz qaytadi (tarjima qilinmaydigan matnlar)
export function pick(value, lang) {
  if (value == null || typeof value === 'string' || typeof value === 'number') return value ?? '';
  return value[lang] ?? value[DEFAULT_LANG] ?? '';
}
