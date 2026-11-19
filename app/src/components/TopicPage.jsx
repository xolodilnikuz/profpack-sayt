import { Fragment } from 'react';
import { useLang } from '../i18n/LangProvider.jsx';
import { TOPICS, topicsCommon, waste } from '../i18n/texts';
import { HOME, PAGES } from '../data/pages.js';
import { PHONE } from '../data/site.js';
import { usePickNeed } from './OrderContext.jsx';
import { ART } from './Art.jsx';
import { TitleLines } from './Hero.jsx';
import { WasteLists } from './Waste.jsx';
import Calculator from './Calculator.jsx';
import HowToOrder from './HowToOrder.jsx';
import Eco from './Eco.jsx';
import Faq from './Faq.jsx';
import Contact from './Contact.jsx';

// =====================================================================
//  Alohida sahifa qolipi: karobka, pechat, gofrokarton, rulon qog‘oz, makulatura.
//  Hammasi bitta qolipda chiziladi; farqi — matnlarda (src/i18n/texts/pages/<id>.js).
//
//  Tartib: bosh ekran (yo‘l, sarlavha, matn, tugmalar + rasmli kartochka) → sahifa bo‘limlari (blocks) →
//          savollar → boshqa sahifalarga havolalar → so‘rov formasi.
//
//  Bo‘lim turlari (blocks dagi type):
//    text   — sarlavha + matn abzaslari (paras)
//    cards  — sarlavha + kartochkalar (items: [{ title, text }]); lead — ixtiyoriy izoh
//    steps  — raqamlangan bosqichlar (items: [{ title, text }])
//    how    — «Buyurtma qanday beriladi» (texts/how.js)
//    calc   — narx kalkulyatori (kind: 'box' yoki 'blank')
//    lists  — makulatura: «Qabul qilamiz / qilmaymiz» ro‘yxatlari va GOST talablari (texts/waste.js)
//    eco    — ekologiya raqamlari (texts/eco.js)
// =====================================================================

function Block({ block }) {
  const { t } = useLang();
  switch (block.type) {
    case 'text':
      return (
        <section className="tsec">
          <div className="wrap tsec__grid">
            <h2>{t(block.title)}</h2>
            <div className="prose">{block.paras.map((p, i) => <p key={i}>{t(p)}</p>)}</div>
          </div>
        </section>
      );
    case 'cards':
      return (
        <section className="tsec">
          <div className="wrap tsec__grid">
            <div className="tsec__head">
              <h2>{t(block.title)}</h2>
              {block.lead && <p>{t(block.lead)}</p>}
            </div>
            <ul className="tcards">
              {block.items.map((item, i) => <li key={i}><h3>{t(item.title)}</h3><p>{t(item.text)}</p></li>)}
            </ul>
          </div>
        </section>
      );
    case 'steps':
      return <HowToOrder title={block.title} steps={block.items} />;
    case 'how':
      return <HowToOrder />;
    case 'calc':
      return <Calculator kind={block.kind} />;
    case 'lists':
      return (
        <section className="sec waste kraft-tex">
          <div className="wrap waste__grid">
            <div>
              <h2>{t(block.title)}</h2>
              <p className="waste__req">{t(waste.req)}</p>
            </div>
            <WasteLists />
          </div>
        </section>
      );
    case 'eco':
      return <Eco />;
    default:
      return null;
  }
}

export default function TopicPage({ id }) {
  const { t, href } = useLang();
  const pickNeed = usePickNeed();
  const topic = TOPICS[id];
  return (
    <>
      {/* bosh ekran */}
      <section className="thero" id="top">
        <div className="story__bg"></div>
        <div className="story__grid"></div>
        <div className="wrap thero__wrap">
          <div className="thero__text">
            <nav className="crumbs" aria-label={t(topicsCommon.crumbsAria)}>
              <a href={href(HOME)}>{t(topicsCommon.home)}</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{t(topic.nav)}</span>
            </nav>
            <h1 className="thero__title"><TitleLines lines={topic.h1} /></h1>
            <p className="hero__lead">{t(topic.lead)}</p>
            <ul className="tags">{topic.tags.map((tag, i) => <li key={i}>{t(tag)}</li>)}</ul>
            <div className="actions">
              <a className="btn btn--kraft" href="#aloqa" onClick={pickNeed(topic.need)}>{t(topic.cta)}</a>
              <a className="btn btn--line" href={`tel:${PHONE.tel}`} aria-label={`${t(topicsCommon.callAria)}: ${PHONE.display}`}>{PHONE.display}</a>
            </div>
          </div>
          {/* rasm va asosiy ma’lumotlar kartochkasi */}
          <div className="tcard kraft-tex">
            <div className="tcard__art">{ART[topic.art]}</div>
            <dl className="spec">
              {topic.facts.map(([dt, dd], i) => <Fragment key={i}><dt>{t(dt)}</dt><dd>{t(dd)}</dd></Fragment>)}
            </dl>
          </div>
        </div>
      </section>

      {/* sahifa bo‘limlari, savollar va boshqa sahifalar */}
      <div className="tbody">
        {topic.blocks.map((block, i) => <Block key={i} block={block} />)}
        <Faq items={topic.faq} />
        <section className="tsec related" aria-labelledby="related-title">
          <div className="wrap">
            <h2 id="related-title">{t(topicsCommon.related)}</h2>
            <ul className="related__list">
              {PAGES.filter(p => p.id !== id).map(p => (
                <li key={p.id}>
                  <a className="kraft-tex" href={href(p.id)}>
                    <b>{t(TOPICS[p.id].nav)}</b>
                    <span>{t(TOPICS[p.id].short)}</span>
                    <i aria-hidden="true">→</i>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <Contact lead={topic.contactLead} />
    </>
  );
}
