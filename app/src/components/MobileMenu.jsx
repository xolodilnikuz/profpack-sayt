import { useLang } from '../i18n/LangProvider.jsx';
import { common } from '../i18n/texts';
import { PHONE } from '../data/site.js';
import { useNav } from './useNav.js';

// Mobil menyu (burger bosilganda ochiladi). Istalgan havola bosilsa — yopiladi.
export default function MobileMenu({ open, setMenu }) {
  const { t } = useLang();
  const items = useNav();
  return (
    <div className="menu" id="menu" hidden={!open} onClick={e => { if (e.target.closest('a')) setMenu(false); }}>
      {items.map(item => <a key={item.key} href={item.href} aria-current={item.current ? 'page' : undefined}>{item.label}</a>)}
      <a className="btn btn--kraft" href="#aloqa">{t(common.order)}</a>
      <a className="hdr__phone" href={`tel:${PHONE.tel}`}>{PHONE.display}</a>
    </div>
  );
}
