import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { HOME } from '../data/pages.js';
import { DEFAULT_LANG, initialLang as detectInitial, isLang, pageHref, pick, saveLang, syncUrl } from './lang.js';
import { metaFor } from './texts/pages/index.js';

const LangContext = createContext(null);

// Butun sahifa tili: <html lang>, sarlavha (title), meta description va manzil qatori ham shu yerda almashadi.
// page — qaysi sahifa chizilyapti ('home' yoki src/data/pages.js dagi id): sarlavha, manzil va havolalar shunga qarab olinadi.
// initialLang — build paytidagi prerender uchun (brauzerda til manzil, saqlangan tanlov va brauzer tilidan aniqlanadi).
export function LangProvider({ initialLang, page = HOME, children }) {
  const [lang, setLangState] = useState(() => (isLang(initialLang) ? initialLang : detectInitial()));

  // useLayoutEffect: matn, <html lang> (ruscha sarlavha shrifti) va title bir kadrda almashadi
  useLayoutEffect(() => {
    const root = document.documentElement;
    const meta = metaFor(page);
    root.lang = lang;
    document.title = pick(meta.title, lang);
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = pick(meta.description, lang);
    syncUrl(lang, page);   // manzil tilga mos bo‘ladi: havola ulashilsa yoki sahifa yangilansa, shu til ochiladi
  }, [lang, page]);

  // tugma bosilganda: tilni almashtirib, tanlovni saqlaymiz (sahifa qayta yuklanmaydi)
  const setLang = useCallback(l => {
    const next = isLang(l) ? l : DEFAULT_LANG;
    saveLang(next);
    setLangState(next);
  }, []);

  const value = useMemo(() => ({
    lang,
    page,
    setLang,
    t: v => pick(v, lang),
    // boshqa sahifaga havola (shu tilda): href('boxes') → "./karobka/",  href('home', '#aloqa') → "../#aloqa"
    href: (to, hash) => pageHref(lang, page, to, hash),
  }), [lang, page, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// const { lang, page, setLang, t, href } = useLang();  t({ uz, ru, en }) → joriy tildagi matn
export function useLang() {
  return useContext(LangContext);
}
