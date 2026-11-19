import { Fragment } from 'react';
import { useLang } from '../i18n/LangProvider.jsx';
import { common, hero } from '../i18n/texts';

// Sarlavha qatorlari: har qator alohida blok (.line). Qatorlar orasidagi bo‘shliq ekranda ko‘rinmaydi,
// lekin sarlavha matn sifatida o‘qilganda (qidiruv tizimi, ekran o‘quvchi) so‘zlar yopishib qolmaydi.
export function TitleLines({ lines }) {
  const { t } = useLang();
  return lines.map((line, i) => <Fragment key={i}>{i > 0 && ' '}<span className="line">{t(line)}</span></Fragment>);
}

// Bosh ekran: 3D hikoyaning birinchi paneli (id="top" — logotip havolasi shu yerga olib keladi)
export default function Hero() {
  const { t } = useLang();
  return (
    <div className="panel panel--hero" id="top">
      <div className="wrap">
        <div className="panel__inner">
          <h1 className="hero__title"><TitleLines lines={hero.title} /></h1>
          <p className="hero__lead">{t(hero.lead)}</p>
          <div className="actions">
            <a className="btn btn--kraft" href="#aloqa">{t(common.order)}</a>
            <a className="btn btn--line" href="#step-1">{t(hero.see)}</a>
          </div>
        </div>
        <div className="cue" aria-hidden="true"><i></i>{t(hero.cue)}</div>
      </div>
    </div>
  );
}
