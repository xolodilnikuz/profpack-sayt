import { useLang } from '../i18n/LangProvider.jsx';
import { HOME, PAGES } from '../data/pages.js';
import { HEADER_NAV, nav, TOPICS } from '../i18n/texts';

// Header va mobil menyu bandlari:
//  • bosh sahifada — sahifa bo‘limlari (Jarayon, Mahsulotlar … — texts/common.js dagi HEADER_NAV);
//  • alohida sahifalarda — shu sahifalarning o‘zi (Karobka, Pechat …) va «Aloqa»; ochiq turgani belgilanadi (current).
export function useNav() {
  const { t, page, href } = useLang();
  if (page === HOME) return HEADER_NAV.map(item => ({ key: item.href, href: item.href, label: t(item) }));
  return [
    ...PAGES.map(p => ({ key: p.id, href: href(p.id), label: t(TOPICS[p.id].nav), current: p.id === page })),
    { key: 'contact', href: nav.contact.href, label: t(nav.contact) },
  ];
}

// logotip havolasi: bosh sahifada — tepaga (#top), alohida sahifalarda — bosh sahifaga
export function useHomeHref() {
  const { page, href } = useLang();
  return page === HOME ? '#top' : href(HOME);
}
