import { useLang } from '../i18n/LangProvider.jsx';
import { eco } from '../i18n/texts';

// ===== Ekologiya: raqamlar =====
export default function Eco() {
  const { t } = useLang();
  return (
    <section className="eco" id="ekologiya">
      <div className="wrap">
        <div className="eco__grid">
          <div><h2>{t(eco.title)}</h2></div>
          {eco.stats.map((s, i) => (
            <div key={i}><div className="eco__num">{t(s.num)}<small>{t(s.unit)}</small></div><p className="eco__lbl">{t(s.label)}</p></div>
          ))}
        </div>
        <p className="eco__note">{t(eco.note)}</p>
      </div>
    </section>
  );
}
