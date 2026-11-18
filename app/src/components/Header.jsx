import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangProvider.jsx';
import { LANGS } from '../i18n/lang.js';
import { common, header, HEADER_NAV } from '../i18n/texts';
import { PHONE } from '../data/site.js';
import { LogoLink } from './Logo.jsx';

// Yuqoridagi qotirilgan header: menyu, til almashtirgich, telefon, «Buyurtma berish», burger (mobil)
export default function Header({ menuOpen, setMenu }) {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef(null);

  // sahifa biroz aylantirilgach header to‘qroq bo‘ladi
  useEffect(() => {
    const onScroll = () => setScrolled(scrollY > 8);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); };
  }, []);

  // Escape — mobil menyuni yopadi va fokusni burgerga qaytaradi
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = e => { if (e.key === 'Escape') { setMenu(false); burgerRef.current.focus(); } };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [menuOpen, setMenu]);

  return (
    <header className={scrolled ? 'hdr is-scrolled' : 'hdr'}>
      <div className="wrap">
        <LogoLink label={t(common.homeAria)} />
        <nav className="nav" aria-label={t(header.navAria)}>
          {HEADER_NAV.map(item => <a key={item.href} href={item.href}>{t(item)}</a>)}
        </nav>
        <div className="lang" role="group" aria-label={header.langAria}>
          {LANGS.map(l => (
            <button key={l} type="button" data-lang={l} aria-pressed={String(l === lang)} onClick={() => { if (l !== lang) setLang(l); }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <a className="hdr__phone" href={`tel:${PHONE.tel}`}>{PHONE.display}</a>
        <a className="btn btn--kraft" href="#aloqa">{t(common.order)}</a>
        <button
          ref={burgerRef}
          className="burger"
          type="button"
          aria-expanded={String(menuOpen)}
          aria-controls="menu"
          aria-label={t(header.menuAria)}
          onClick={() => setMenu(!menuOpen)}
        ><span></span><span></span></button>
      </div>
    </header>
  );
}
