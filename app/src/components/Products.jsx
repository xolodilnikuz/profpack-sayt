import { Fragment } from 'react';
import { useLang } from '../i18n/LangProvider.jsx';
import { products, topicsCommon } from '../i18n/texts';
import { usePickNeed } from './OrderContext.jsx';
import { ART } from './Art.jsx';

// ===== Mahsulotlar: yoyilgan quti ko‘rinishida 4 panel =====
// Har panel nomi va «Batafsil» — shu mahsulotning alohida sahifasiga havola (texts/products.js dagi page).
export default function Products() {
  const { t, href } = useLang();
  const pickNeed = usePickNeed();
  return (
    <section className="sec products" id="mahsulotlar">
      <div className="wrap">
        <header className="sec-head">
          <h2>{t(products.title)}</h2>
          <p>{t(products.lead)}</p>
        </header>

        <div className="net">
          {products.items.map(item => (
            <article className="net__panel" key={item.art}>
              <div className="net__flap kraft-tex">{ART[item.art]}</div>
              <div className="net__face kraft-tex">
                <h3><a href={href(item.page)}>{t(item.title)}</a></h3>
                <p>{t(item.text)}</p>
                <dl className="spec">
                  {item.spec.map(([dt, dd], i) => <Fragment key={i}><dt>{t(dt)}</dt><dd>{t(dd)}</dd></Fragment>)}
                </dl>
              </div>
              <div className="net__base kraft-tex">
                <a className="net__cta" href="#aloqa" onClick={pickNeed(item.need)}>{t(products.cta)}</a>
                <a className="net__more" href={href(item.page)} aria-label={`${t(topicsCommon.more)}: ${t(item.title)}`}>{t(topicsCommon.more)}</a>
              </div>
            </article>
          ))}
        </div>
        <div className="legend" aria-hidden="true"><span><i></i>{t(products.legendCut)}</span><span><i className="fold"></i>{t(products.legendFold)}</span></div>
      </div>
    </section>
  );
}
