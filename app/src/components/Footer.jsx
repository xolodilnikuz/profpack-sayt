import { useLang } from '../i18n/LangProvider.jsx';
import { common, footer, FOOTER_NAV, TOPICS, topicsCommon } from '../i18n/texts';
import { HOME, PAGES } from '../data/pages.js';
import { PHONE, TELEGRAM, EMAIL } from '../data/site.js';
import { LogoLink } from './Logo.jsx';

export default function Footer() {
  const { t, page, href } = useLang();
  // «Bo‘limlar» — bosh sahifadagi bo‘limlar: alohida sahifalardan bosh sahifaning o‘sha bo‘limiga olib boradi
  const sectionHref = hash => (page === HOME ? hash : href(HOME, hash));
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <LogoLink label={t(common.homeAria)} />
            <p>{t(footer.tagline)}</p>
          </div>
          <div>
            <h4>{t(footer.sections)}</h4>
            <ul>{FOOTER_NAV.map(item => <li key={item.href}><a href={sectionHref(item.href)}>{t(item)}</a></li>)}</ul>
          </div>
          <div>
            {/* alohida sahifalar: har sahifadan hammasiga havola (qidiruv tizimlari ham shu orqali topadi) */}
            <h4>{t(topicsCommon.footerTitle)}</h4>
            <ul>
              {PAGES.map(p => (
                <li key={p.id}><a href={href(p.id)} aria-current={p.id === page ? 'page' : undefined}>{t(TOPICS[p.id].nav)}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4>{t(footer.contact)}</h4>
            <ul>
              <li><a href={`tel:${PHONE.tel}`}>{PHONE.display}</a></li>
              <li><a href={TELEGRAM.url} target="_blank" rel="noopener">Telegram</a></li>
              <li><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            </ul>
          </div>
        </div>
        <div className="ftr__bottom"><span>© <span id="year">{new Date().getFullYear()}</span> Profpack</span><span>{t(footer.rights)}</span></div>
      </div>
    </footer>
  );
}
