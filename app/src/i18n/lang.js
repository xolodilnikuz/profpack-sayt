// Til tanlash, saqlash va sahifa manzili.
//
// Har til o‘z manzilida turadi — qidiruv tizimlari uchala tilni alohida sahifa sifatida o‘qiydi:
//   /      — o‘zbekcha (asosiy)
//   /ru/   — ruscha
//   /en/   — inglizcha
// Build paytida har biriga o‘z tilidagi tayyor HTML yoziladi (vite.config.js → prerender).
//
// Til tartibi: manzil (/ru/, /en/) → ?lang= (eski havolalar) → saqlangan tanlov (localStorage 'pp-lang') → brauzer tili.
// Brauzer tilidan faqat ruscha aniqlanadi; inglizcha faqat tanlansa yoki /en/ ochilsa (mahalliy mijozlar uchun asosiy til o‘zbekcha).
// Eslatma: index.html dagi kichik skript ham aynan shu tartibda <html lang> ni React’dan oldin qo‘yadi.

export const LANGS = ['uz', 'ru', 'en'];
export const DEFAULT_LANG = 'uz';
const STORAGE_KEY = 'pp-lang';
const LANG_PATH = /^(.*\/)(ru|en)\/?(?:index\.html)?$/;   // …/ru/, …/en/ (oxirgi "/" siz yoki index.html bilan ham)

export const isLang = l => LANGS.includes(l);

// Manzilni ikkiga ajratadi: sayt joylashgan papka va til.
// "/ru/" → { base: "/", lang: "ru" };  "/profpack-sayt/en/" → { base: "/profpack-sayt/", lang: "en" };  "/" → { base: "/", lang: null }
export function splitPath(pathname) {
  const m = pathname.match(LANG_PATH);
  return m ? { base: m[1], lang: m[2] } : { base: pathname.replace(/[^/]*$/, ''), lang: null };
}

// shu tildagi sahifa manzili: o‘zbekcha — papkaning o‘zi, qolganlari — ru/ va en/
export function langPath(lang, pathname) {
  return splitPath(pathname).base + (lang === DEFAULT_LANG ? '' : `${lang}/`);
}

export function detectLang() {
  try {
    let l = splitPath(location.pathname).lang || new URLSearchParams(location.search).get('lang') || localStorage.getItem(STORAGE_KEY);
    if (!isLang(l)) l = /^ru\b/i.test(navigator.language || '') ? 'ru' : 'uz';
    return l;
  } catch {
    return DEFAULT_LANG;
  }
}

// boshlang‘ich til (Node'da — build paytidagi prerender — asosiy til)
export function initialLang() {
  return typeof document === 'undefined' ? DEFAULT_LANG : detectLang();
}

// foydalanuvchi tanlovini eslab qolamiz (faqat til tugmasi bosilganda)
export function saveLang(l) {
  try { localStorage.setItem(STORAGE_KEY, l); } catch {}
}

// Manzil qatorini tilga moslaydi, sahifa qayta yuklanmaydi: / ↔ /ru/ ↔ /en/. Eski ?lang= parametri olib tashlanadi.
export function syncUrl(lang) {
  const u = new URL(location.href);
  const path = langPath(lang, u.pathname);
  if (u.pathname === path && !u.searchParams.has('lang')) return;
  u.pathname = path;
  u.searchParams.delete('lang');
  history.replaceState(history.state, '', u);
}

// { uz, ru, en } obyektidan joriy tildagi matn; oddiy satr o‘zgarishsiz qaytadi (tarjima qilinmaydigan matnlar)
export function pick(value, lang) {
  if (value == null || typeof value === 'string' || typeof value === 'number') return value ?? '';
  return value[lang] ?? value[DEFAULT_LANG] ?? '';
}
