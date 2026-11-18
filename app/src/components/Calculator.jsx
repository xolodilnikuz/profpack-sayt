import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLang } from '../i18n/LangProvider.jsx';
import { calc as T, NEED } from '../i18n/texts';
import { PRICES, CALC_DEFAULTS } from '../data/prices.js';
import { useOrderActions } from './OrderContext.jsx';

const MARKS = Object.keys(PRICES);
const BOX_MARKS = MARKS.filter(m => PRICES[m][1]);          // quti qilinadigan markalar
const digits = v => v.replace(/\D/g, '');                    // faqat raqamlar
const num = v => { const n = parseInt(v, 10); return n > 0 ? n : 0; };

// ===== Narx kalkulyatori =====
// uzunlik × eni (mm) ÷ 1 000 000 = m²; m² × markaning 1 m² narxi = 1 dona narxi
export default function Calculator() {
  const { lang, t } = useLang();
  const { prefill } = useOrderActions();
  const [kind, setKind] = useState(CALC_DEFAULTS.kind);
  const [mark, setMark] = useState(CALC_DEFAULTS.mark);
  const [len, setLen] = useState(CALC_DEFAULTS.len);
  const [wid, setWid] = useState(CALC_DEFAULTS.wid);
  const [qty, setQty] = useState(CALC_DEFAULTS.qty);
  const [shipOn, setShipOn] = useState(CALC_DEFAULTS.ship);
  const sheetRef = useRef(null);

  // o‘zbek va rus tilida 5 906,05; ingliz tilida 5,906.05
  const fmt = (v, d, min = 0) => new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'ru-RU', { minimumFractionDigits: min, maximumFractionDigits: d }).format(v);
  const money = v => `${fmt(v, 2, Number.isInteger(v) ? 0 : 2)} ${t(T.units.cur)}`;   // 59 060,50 — tiyin doim ikki xonali

  const L = num(len), Wd = num(wid), Q = num(qty), box = kind === 'box';
  // quti rejimida faqat quti narxi bor markalar tanlanadi
  const markNow = box && !PRICES[mark][1] ? BOX_MARKS[0] : mark;
  const ship = box && shipOn;
  const rate = PRICES[markNow][box ? (ship ? 2 : 1) : 0];
  // tiyinlarda butun son bilan hisoblaymiz — 0,1 + 0,2 kabi xatolar chiqmasin
  const unit = L && Wd ? Math.round(L * Wd * rate / 1e4) : 0;
  const quote = unit ? { L, Wd, Q, mark: markNow, box, ship, unit: unit / 100, total: Q ? unit * Q / 100 : 0 } : null;

  const onKind = e => {
    const k = e.target.value;
    setKind(k);
    if (k === 'box' && !PRICES[mark][1]) setMark(BOX_MARKS[0]);   // tanlangan marka qutiga to‘g‘ri kelmasa — birinchi mosiga o‘tamiz
  };

  // list ko‘rinishi o‘lcham nisbatida
  const size = useRef({ L, Wd });
  size.current = { L, Wd };
  const fitSheet = useCallback(() => {
    const sheet = sheetRef.current, { L, Wd } = size.current;
    const frame = sheet.parentElement.getBoundingClientRect(), maxW = frame.width - 130, maxH = frame.height - 60;
    const s = L && Wd ? Math.min(maxW / L, maxH / Wd) : 0;
    sheet.style.width = `${s ? Math.max(24, L * s) : 240}px`;
    sheet.style.height = `${s ? Math.max(24, Wd * s) : 80}px`;
  }, []);
  useLayoutEffect(fitSheet, [L, Wd, lang, fitSheet]);
  useEffect(() => {
    addEventListener('resize', fitSheet);
    return () => removeEventListener('resize', fitSheet);
  }, [fitSheet]);

  // buyurtma tugmasi hisobni so‘rov formasiga o‘tkazadi
  const onOrder = () => {
    const patch = { need: box ? NEED.boxes : NEED.sheets };
    if (quote) {
      const o = T.orderNote, q = quote, mm = t(T.units.mm);
      const what = q.box ? `${t(o.box)}, ${t(q.ship ? o.ship : o.noship)}` : t(o.blank);
      if (q.Q) patch.volume = `${fmt(q.Q, 0)} ${t(T.units.pcs)}`;
      patch.note = `${t(o.mark)} ${q.mark}, ${what}. ${t(o.size)}: ${q.L} × ${q.Wd} ${mm}. ${t(o.calc)}: ${money(q.Q ? q.total : q.unit)}`;
    }
    prefill(patch);
  };

  return (
    <section className="sec calc" id="kalkulyator" aria-labelledby="calc-title">
      <div className="wrap calc__grid">
        <div>
          <h2 id="calc-title">{t(T.title)}</h2>
          <p className="calc__lead">{t(T.lead)}</p>
          <div className="calc__sheet-wrap" aria-hidden="true">
            <div className="calc__sheet kraft-tex" id="calc-sheet" ref={sheetRef}>
              <span className="calc__dim calc__dim--l" id="calc-dim-l">{L ? `${fmt(L, 0)} ${t(T.units.mm)}` : ''}</span>
              <span className="calc__dim calc__dim--w" id="calc-dim-w">{Wd ? `${fmt(Wd, 0)} ${t(T.units.mm)}` : ''}</span>
            </div>
          </div>
          <p className="calc__formula">{t(T.formula)}</p>
        </div>
        <div className="box-side kraft-tex">
          <div className="label calc__card">
            <div className="label__top">
              <div className="label__to">{t(T.rate)}<b className="calc__rate" id="calc-rate">{money(rate)}</b></div>
              <div className="barcode" aria-hidden="true"></div>
            </div>
            <form id="calc-form" noValidate onSubmit={e => e.preventDefault()}>
              <div className="calc__kind" role="radiogroup" aria-label={t(T.kindAria)}>
                <label><input type="radio" name="kind" value="box" checked={box} onChange={onKind} /><span>{t(T.box)}</span></label>
                <label><input type="radio" name="kind" value="blank" checked={!box} onChange={onKind} /><span>{t(T.blank)}</span></label>
              </div>
              <div className="calc__fields">
                <div className="field"><label htmlFor="c-mark">{t(T.mark)}</label>
                  <select id="c-mark" value={markNow} onChange={e => setMark(e.target.value)}>
                    {MARKS.map(m => <option key={m} value={m} disabled={box && !PRICES[m][1]}>{m}</option>)}
                  </select>
                </div>
                <div className="field"><label htmlFor="c-len">{t(T.len)}</label><input id="c-len" inputMode="numeric" autoComplete="off" maxLength={5} value={len} onChange={e => setLen(digits(e.target.value))} /></div>
                <div className="field"><label htmlFor="c-wid">{t(T.wid)}</label><input id="c-wid" inputMode="numeric" autoComplete="off" maxLength={5} value={wid} onChange={e => setWid(digits(e.target.value))} /></div>
                <div className="field"><label htmlFor="c-qty">{t(T.qty)}</label><input id="c-qty" inputMode="numeric" autoComplete="off" maxLength={7} value={qty} onChange={e => setQty(digits(e.target.value))} /></div>
              </div>
              {/* yetkazib berish faqat quti uchun */}
              <label className="calc__check" id="calc-ship-row" hidden={!box}><input type="checkbox" id="c-ship" checked={shipOn} onChange={e => setShipOn(e.target.checked)} /><span>{t(T.ship)}</span></label>
              <dl className="calc__out" aria-live="polite">
                <div><dt>{t(T.area)}</dt><dd id="calc-area">{quote ? `${fmt(L * Wd / 1e6, 4)} ${t(T.units.m2)}` : '—'}</dd></div>
                <div><dt>{t(T.unit)}</dt><dd id="calc-unit">{quote ? money(quote.unit) : '—'}</dd></div>
                <div className="calc__total"><dt>{t(T.total)}</dt><dd id="calc-total">{quote && Q ? money(quote.total) : '—'}</dd></div>
              </dl>
              <p className="calc__note" id="calc-note">{t(T.note[box ? (ship ? 'ship' : 'noship') : 'blank'])}</p>
              <a className="btn btn--navy" href="#aloqa" id="calc-order" onClick={onOrder}>{t(T.order)}</a>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
