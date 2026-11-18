import { useLang } from '../i18n/LangProvider.jsx';
import { common, HEADER_NAV } from '../i18n/texts';
import { PHONE } from '../data/site.js';

// Mobil menyu (burger bosilganda ochiladi). Istalgan havola bosilsa — yopiladi.
export default function MobileMenu({ open, setMenu }) {
  const { t } = useLang();
  return (
    <div className="menu" id="menu" hidden={!open} onClick={e => { if (e.target.closest('a')) setMenu(false); }}>
      {HEADER_NAV.map(item => <a key={item.href} href={item.href}>{t(item)}</a>)}
      <a className="btn btn--kraft" href="#aloqa">{t(common.order)}</a>
      <a className="hdr__phone" href={`tel:${PHONE.tel}`}>{PHONE.display}</a>
    </div>
  );
}
