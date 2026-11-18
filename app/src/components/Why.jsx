import { useLang } from '../i18n/LangProvider.jsx';
import { why } from '../i18n/texts';

// belgilar (texts/why.js dagi icon nomi bo‘yicha)
const ICONS = {
  cycle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 12a8 8 0 0 1-14 5.3M4 12a8 8 0 0 1 14-5.3" /><path d="M18 2.8v4h-4M6 21.2v-4h4" /></svg>,
  box: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 8l8-4 8 4v8l-8 4-8-4z" /><path d="M4 8l8 4 8-4M12 12v8" /></svg>,
  print: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="6" y="3" width="12" height="5" rx="1" /><path d="M4 8h16v8H4zM7 16v5h10v-5M8 12h3" /></svg>,
  stack: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="13" width="8" height="8" /><rect x="13" y="13" width="8" height="8" /><rect x="8" y="4" width="8" height="8" /></svg>,
  leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z" /><path d="M5 19l8-8" /></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5" /><path d="M12 7v5l3.5 2" /></svg>,
};

// ===== Nega Profpack (afzalliklar) =====
export default function Why() {
  const { t } = useLang();
  return (
    <section className="sec why" id="afzalliklar">
      <div className="wrap why__grid">
        <div className="why__head">
          <h2>{t(why.title)}</h2>
          <p>{t(why.lead)}</p>
        </div>
        <ul className="why__list">
          {why.items.map(item => (
            <li key={item.icon}>
              {ICONS[item.icon]}
              <h3>{t(item.title)}</h3>
              <p>{t(item.text)}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
