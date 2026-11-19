import { useLang } from '../i18n/LangProvider.jsx';
import { waste } from '../i18n/texts';
import { PHONE } from '../data/site.js';
import { usePickNeed } from './OrderContext.jsx';

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#1B2152" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
);
const Cross = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#7A2E22" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17" /></svg>
);

// «Qabul qilamiz» / «Qabul qilmaymiz» ro‘yxatlari (bosh sahifa va «Makulatura» sahifasida bir xil)
export function WasteLists() {
  const { t } = useLang();
  return (
    <div className="lists">
      <div className="list">
        <h3>{t(waste.acceptTitle)}</h3>
        <ul>{waste.accept.map((x, i) => <li key={i}><Check />{t(x)}</li>)}</ul>
      </div>
      <div className="list list--no">
        <h3>{t(waste.rejectTitle)}</h3>
        <ul>{waste.reject.map((x, i) => <li key={i}><Cross />{t(x)}</li>)}</ul>
      </div>
    </div>
  );
}

// ===== Makulatura topshiring (bosh sahifa) =====
export default function Waste() {
  const { t, href } = useLang();
  const pickNeed = usePickNeed();
  return (
    <section className="sec waste kraft-tex" id="makulatura">
      <div className="wrap waste__grid">
        <div>
          <h2>{t(waste.title)}</h2>
          <p className="waste__lead">{t(waste.lead)}</p>
          <p className="waste__req">{t(waste.req)}</p>
          <div className="actions">
            <a className="btn btn--navy" href="#aloqa" onClick={pickNeed(waste.cta.need)}>{t(waste.cta.label)}</a>
            <a className="btn btn--navy-line" href={`tel:${PHONE.tel}`}>{t(waste.call)}</a>
          </div>
          <a className="more more--ink" href={href('waste')}>{t(waste.more)}</a>
        </div>
        <WasteLists />
      </div>
    </section>
  );
}
