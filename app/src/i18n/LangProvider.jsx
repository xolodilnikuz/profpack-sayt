import { createContext, useCallback, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { DEFAULT_LANG, initialLang as detectInitial, isLang, pick, saveLang } from './lang.js';
import { meta } from './texts/meta.js';

const LangContext = createContext(null);

// Butun sahifa tili: <html lang>, sarlavha (title) va meta description ham shu yerda almashadi.
// initialLang — faqat sinov/SSR uchun (oddiy holatda til index.html skripti qo‘ygan <html lang> dan olinadi).
export function LangProvider({ initialLang, children }) {
  const [lang, setLangState] = useState(() => (isLang(initialLang) ? initialLang : detectInitial()));

  // useLayoutEffect: matn, <html lang> (ruscha sarlavha shrifti) va title bir kadrda almashadi
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    document.title = pick(meta.title, lang);
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.content = pick(meta.description, lang);
  }, [lang]);

  // tugma bosilganda: tilni almashtirib, tanlovni saqlaymiz
  const setLang = useCallback(l => {
    const next = isLang(l) ? l : DEFAULT_LANG;
    saveLang(next);
    setLangState(next);
  }, []);

  const value = useMemo(() => ({ lang, setLang, t: v => pick(v, lang) }), [lang, setLang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

// const { lang, setLang, t } = useLang();  t({ uz, ru, en }) → joriy tildagi matn
export function useLang() {
  return useContext(LangContext);
}
