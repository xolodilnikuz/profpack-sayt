import { useLang } from '../i18n/LangProvider.jsx';
import { common, footer, FOOTER_NAV } from '../i18n/texts';
import { PHONE, TELEGRAM, EMAIL } from '../data/site.js';
import { LogoLink } from './Logo.jsx';

export default function Footer() {
  const { t } = useLang();
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
            <ul>{FOOTER_NAV.map(item => <li key={item.href}><a href={item.href}>{t(item)}</a></li>)}</ul>
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
