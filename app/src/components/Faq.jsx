import { useLang } from '../i18n/LangProvider.jsx';
import { faq } from '../i18n/texts';

// ===== Savollar (ochiladigan <details>) =====
// items — savol-javoblar ro‘yxati: bosh sahifada — texts/faq.js dagi hammasi, alohida sahifalarda — o‘sha sahifaniki.
export default function Faq({ items = faq.items }) {
  const { t } = useLang();
  return (
    <section className="sec faq" id="savollar" aria-labelledby="faq-title">
      <div className="wrap">
        <h2 id="faq-title">{t(faq.title)}</h2>
        <div className="faq__list">
          {items.map((item, i) => (
            <details key={i}>
              <summary>{t(item.q)}</summary>
              <p>{t(item.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
