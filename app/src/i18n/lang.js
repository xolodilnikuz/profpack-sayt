// Til va sahifa manzili: aniqlash, saqlash, havolalar.
//
// Har til va har sahifa o‘z manzilida turadi — qidiruv tizimlari ularni alohida sahifa sifatida o‘qiydi:
//   /            /ru/            /en/              — bosh sahifa (o‘zbekcha — asosiy)
//   /karobka/    /ru/korobki/    /en/boxes/        — alohida sahifalar (ro‘yxati: src/data/pages.js)
// Build paytida har biriga o‘z tilidagi tayyor HTML yoziladi (vite.config.js → prerender).
//
// Til tartibi: manzil (/ru/, /en/) → ?lang= (eski havolalar) → saqlangan tanlov (localStorage 'pp-lang') → brauzer tili.
// Brauzer tilidan faqat ruscha aniqlanadi; inglizcha faqat tanlansa yoki /en/ ochilsa (mahalliy mijozlar uchun asosiy til o‘zbekcha).
// Qidiruv robotlariga brauzer tili qo‘llanmaydi — ular har manzilda shu manzilning o‘z tilidagi sahifani ko‘radi.
// Eslatma: index.html dagi kichik skript ham aynan shu tartibda <html lang> ni React’dan oldin qo‘yadi.
import { HOME, PAGES } from '../data/pages.js';

export const LANGS = ['uz', 'ru', 'en'];
export const DEFAULT_LANG = 'uz';
const STORAGE_KEY = 'pp-lang';

export const isLang = l => LANGS.includes(l);

const pageBySlug = slug => PAGES.find(p => LANGS.some(l => p.slug[l] === slug));
const SLUGS = [...new Set(PAGES.flatMap(p => LANGS.map(l => p.slug[l])))];
// …/ru/korobki/ → papka, til, sahifa. Til va sahifa ixtiyoriy; oxirgi "/" siz yoki index.html bilan ham ishlaydi
const PATH = new RegExp(`^(.*?/)(?:(${LANGS.filter(l => l !== DEFAULT_LANG).join('|')})(?:/|$))?(?:(${SLUGS.join('|')})/?)?(?:index\\.html)?$`);

// Sahifa manzili sayt papkasidan boshlab: '' · 'ru/' · 'karobka/' · 'ru/korobki/'
export function pagePath(lang, page = HOME) {
  const p = PAGES.find(x => x.id === page);
  return (lang === DEFAULT_LANG ? '' : `${lang}/`) + (p ? `${p.slug[lang]}/` : '');
}

// Sahifa necha pog‘ona ichkarida turadi: 0 — /,  1 — /ru/ yoki /karobka/,  2 — /ru/korobki/
export function pageDepth(lang, page = HOME) {
  return (lang === DEFAULT_LANG ? 0 : 1) + (PAGES.some(p => p.id === page) ? 1 : 0);
}

// `from` sahifasidan `to` sahifasiga nisbiy havola (shu tilda). Nisbiy bo‘lgani uchun sayt istalgan
// papkada ishlaydi (o‘z domeni yoki GitHub Pages /profpack-sayt/). hash — bo‘lim: '#aloqa'
export function pageHref(lang, from, to, hash = '') {
  return ('../'.repeat(pageDepth(lang, from)) || './') + pagePath(lang, to) + hash;
}

// Manzilni uchga ajratadi: sayt joylashgan papka, til va sahifa.
// "/ru/korobki/" → { base: "/", lang: "ru", page: "boxes" };  "/profpack-sayt/en/" → { base: "/profpack-sayt/", lang: "en", page: "home" }
export function splitPath(pathname) {
  const m = pathname.match(PATH);
  if (!m) return { base: pathname.replace(/[^/]*$/, ''), lang: null, page: HOME };
  const p = m[3] && pageBySlug(m[3]);
  return { base: m[1], lang: m[2] || null, page: p ? p.id : HOME };
}

const isBot = () => /bot|crawl|spider/i.test(navigator.userAgent || '');

export function detectLang() {
  try {
    let l = splitPath(location.pathname).lang || new URLSearchParams(location.search).get('lang') || localStorage.getItem(STORAGE_KEY);
    if (!isLang(l)) l = !isBot() && /^ru\b/i.test(navigator.language || '') ? 'ru' : 'uz';
    return l;
  } catch {
    return DEFAULT_LANG;
  }
}

// boshlang‘ich til (Node'da — build paytidagi prerender — asosiy til)
export function initialLang() {
  return typeof document === 'undefined' ? DEFAULT_LANG : detectLang();
}

// qaysi sahifa ochilgan (manzil bo‘yicha); Node'da — bosh sahifa
export function initialPage() {
  return typeof document === 'undefined' ? HOME : splitPath(location.pathname).page;
}

// foydalanuvchi tanlovini eslab qolamiz (faqat til tugmasi bosilganda)
export function saveLang(l) {
  try { localStorage.setItem(STORAGE_KEY, l); } catch {}
}

// Manzil qatorini til va sahifaga moslaydi, sahifa qayta yuklanmaydi: /karobka/ ↔ /ru/korobki/ ↔ /en/boxes/.
// Eski ?lang= parametri olib tashlanadi.
export function syncUrl(lang, page = HOME) {
  const u = new URL(location.href);
  const path = splitPath(u.pathname).base + pagePath(lang, page);
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
