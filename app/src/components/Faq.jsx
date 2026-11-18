import { useLang } from '../i18n/LangProvider.jsx';
import { faq } from '../i18n/texts';

// ===== Savollar (ochiladigan <details>) =====
export default function Faq() {
  const { t } = useLang();
  return (
    <section className="sec faq" id="savollar" aria-labelledby="faq-title">
      <div className="wrap">
        <h2 id="faq-title">{t(faq.title)}</h2>
        <div className="faq__list">
          {faq.items.map((item, i) => (
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
