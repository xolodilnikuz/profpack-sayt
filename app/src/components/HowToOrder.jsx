import { useLang } from '../i18n/LangProvider.jsx';
import { how } from '../i18n/texts';

// ===== Raqamlangan bosqichlar =====
// Odatda — «Buyurtma qanday beriladi» (texts/how.js). Boshqa bosqichlar uchun: title va steps ([{ title, text }]) bering.
export default function HowToOrder({ title = how.title, steps = how.steps }) {
  const { t } = useLang();
  return (
    <section className="sec how" aria-labelledby="how-title">
      <div className="wrap">
        <h2 id="how-title">{t(title)}</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={i}><span className="n">{i + 1}</span><h3>{t(s.title)}</h3><p>{t(s.text)}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
