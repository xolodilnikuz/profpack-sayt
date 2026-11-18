import { useLang } from '../i18n/LangProvider.jsx';
import { common, hero } from '../i18n/texts';

// Bosh ekran: 3D hikoyaning birinchi paneli (id="top" — logotip havolasi shu yerga olib keladi)
export default function Hero() {
  const { t } = useLang();
  return (
    <div className="panel panel--hero" id="top">
      <div className="wrap">
        <div className="panel__inner">
          <h1 className="hero__title">{hero.title.map((line, i) => <span className="line" key={i}>{t(line)}</span>)}</h1>
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
