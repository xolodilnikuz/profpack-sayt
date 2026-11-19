import { useLang } from '../i18n/LangProvider.jsx';
import { contact } from '../i18n/texts';
import { PHONE, TELEGRAM, EMAIL, ADDRESS, HOURS } from '../data/site.js';
import OrderForm from './OrderForm.jsx';

// ===== Aloqa: kontaktlar ro‘yxati + so‘rov formasi =====
// lead — sarlavha ostidagi matn (berilmasa — texts/contact.js dagi umumiy matn)
export default function Contact({ lead = contact.lead }) {
  const { t } = useLang();
  const L = contact.labels;
  return (
    <section className="sec contact" id="aloqa">
      <div className="wrap contact__grid">
        <div>
          <h2>{t(contact.title)}</h2>
          <p className="contact__lead">{t(lead)}</p>
          <ul className="contacts">
            <li><span>{t(L.phone)}</span><a href={`tel:${PHONE.tel}`}>{PHONE.display}</a></li>
            <li><span>{t(L.telegram)}</span><a href={TELEGRAM.url} target="_blank" rel="noopener">{TELEGRAM.handle}</a></li>
            <li><span>{t(L.email)}</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></li>
            <li><span>{t(L.address)}</span><b>{t(ADDRESS)}</b></li>
            <li><span>{t(L.hours)}</span><b>{t(HOURS)}</b></li>
          </ul>
        </div>

        <div className="box-side kraft-tex">
          {/* "bu tomoni tepaga" belgisi */}
          <svg className="box-side__mark" viewBox="0 0 40 40" aria-hidden="true"><g fill="currentColor"><path d="M11 4l-6 10h12zM29 4l-6 10h12z" /><rect x="9.6" y="13" width="2.8" height="17" /><rect x="27.6" y="13" width="2.8" height="17" /><rect x="4" y="33" width="32" height="3" /></g></svg>
          <OrderForm />
        </div>
      </div>
    </section>
  );
}
