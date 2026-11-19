import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLang } from '../i18n/LangProvider.jsx';
import { form as T, NEEDS } from '../i18n/texts';
import { FORM_ENDPOINT } from '../data/site.js';
import { PHONE_CODE, PHONE_LOCAL_LEN, caretAfterDigits, formatPhone, fullPhone, phoneDigits } from '../lib/phone.js';
import { useOrderActions, useOrderFields } from './OrderContext.jsx';
import { LogoText } from './Logo.jsx';

// So‘rov formasi (pochta yorlig‘i ko‘rinishida). Yuborilganda Google Apps Script (FORM_ENDPOINT) ga POST qiladi.
export default function OrderForm() {
  const { lang, t } = useLang();
  const fields = useOrderFields();
  const { setFields, reset } = useOrderActions();
  const [errKey, setErrKey] = useState('');        // '' | 'phone' | 'fail' | 'off' — matni joriy tilda chiqadi
  const [phoneError, setPhoneError] = useState(false);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const nameRef = useRef(null), phoneRef = useRef(null), doneRef = useRef(null);

  const bind = name => ({ name, value: fields[name], onChange: e => setFields(f => ({ ...f, [name]: e.target.value })) });

  // Telefon: +998 maydon oldida doim turadi, maydonning o‘ziga faqat raqam yoziladi (harf va belgilar tushib qoladi),
  // raqamlar "90 123 45 67" ko‘rinishida ajratiladi. To‘liq raqam qo‘yilsa (+998 90 …) — kod takrorlanmaydi.
  const onPhone = e => {
    const el = e.target;
    const typed = el.value.replace(/\D/g, '');
    const digits = phoneDigits(el.value);
    const next = formatPhone(digits);
    // kursor o‘zidan oldingi raqamlar soniga qarab qo‘yiladi — bo‘shliq qo‘shilganda ham joyidan siljimaydi
    const before = el.value.slice(0, el.selectionStart ?? el.value.length).replace(/\D/g, '').length;
    const pos = typed.slice(0, PHONE_LOCAL_LEN) === digits ? caretAfterDigits(next, Math.min(before, digits.length)) : next.length;
    el.value = next;
    el.setSelectionRange(pos, pos);
    setFields(f => ({ ...f, phone: next }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    const form = e.currentTarget;
    setErrKey(''); setPhoneError(false);
    const digits = phoneDigits(phoneRef.current.value);
    if (digits.length < PHONE_LOCAL_LEN) {
      setErrKey('phone'); setPhoneError(true);
      phoneRef.current.focus();
      return;
    }
    if (!FORM_ENDPOINT) { setErrKey('off'); return; }   // forma hali ulanmagan — soxta «yuborildi» ko‘rsatmaymiz
    setBusy(true);
    try {
      // maydonlar (yashirin "website" ham — spam-bot tuzog‘i) + til va sahifa manzili
      const payload = { ...Object.fromEntries(new FormData(form)), lang, page: location.href };
      payload.phone = fullPhone(digits);   // maydonda faqat koddan keyingi qism turadi — to‘liq raqam yuboriladi: +998 90 123 45 67
      // text/plain: Google Apps Script CORS «preflight» so‘rovini qabul qilmaydi
      const res = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) });
      const out = await res.json().catch(() => null);
      if (!res.ok || !out || !out.ok) throw new Error(res.status);
      flushSync(() => setSent(true));
      doneRef.current.focus({ preventScroll: true });
      doneRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' });
    } catch {
      setErrKey('fail');
    } finally {
      setBusy(false);
    }
  };

  const again = () => {
    flushSync(() => { reset(); setSent(false); });
    nameRef.current.focus();
  };

  return (
    <div className="label">
      <div className="label__top">
        <div className="label__to">{t(T.to)}{' '}
          <span className="logo" aria-label="Profpack"><LogoText /></span>
        </div>
        <div className="barcode" aria-hidden="true"></div>
      </div>
      <form id="order-form" noValidate hidden={sent} onSubmit={onSubmit}>
        <div className="field-row">
          <div className="field"><label htmlFor="f-name">{t(T.name)}</label><input id="f-name" ref={nameRef} autoComplete="name" placeholder={t(T.namePh)} {...bind('name')} /></div>
          <div className={phoneError ? 'field is-error' : 'field'} id="phone-field">
            <label htmlFor="f-phone">{t(T.phone)}</label>
            <div className="phone">
              <label className="phone__code" htmlFor="f-phone">{PHONE_CODE}</label>
              <input id="f-phone" ref={phoneRef} name="phone" type="tel" autoComplete="tel-national" inputMode="numeric" placeholder={T.phonePh} required aria-describedby="form-error" value={fields.phone} onChange={onPhone} />
            </div>
          </div>
        </div>
        <div className="field-row">
          <div className="field"><label htmlFor="f-company">{t(T.company)}</label><input id="f-company" autoComplete="organization" placeholder={t(T.companyPh)} {...bind('company')} /></div>
          <div className="field"><label htmlFor="f-need">{t(T.need)}</label>
            <select id="f-need" {...bind('need')}>
              {NEEDS.map(n => <option key={n.value} value={n.value}>{t(n)}</option>)}
            </select>
          </div>
        </div>
        <div className="field"><label htmlFor="f-volume">{t(T.volume)}</label><input id="f-volume" placeholder={t(T.volumePh)} {...bind('volume')} /></div>
        <div className="field"><label htmlFor="f-note">{t(T.note)}</label><textarea id="f-note" rows="2" placeholder={t(T.notePh)} {...bind('note')}></textarea></div>
        <div className="hp" aria-hidden="true"><label>Website <input tabIndex="-1" autoComplete="off" {...bind('website')} /></label></div>
        <p className="form-error" id="form-error" role="alert">{errKey ? t(T.errors[errKey]) : ''}</p>
        <button className="btn btn--navy" type="submit" disabled={busy}>{t(T.submit)}</button>
        <p className="form-note">{t(T.privacy)}</p>
      </form>
      <div className="form-done" id="form-done" hidden={!sent} tabIndex="-1" ref={doneRef}>
        <h3>{t(T.doneTitle)}</h3>
        <p>{t(T.doneText)}</p>
        <button className="btn btn--navy-line" type="button" id="form-again" onClick={again}>{t(T.again)}</button>
      </div>
    </div>
  );
}
