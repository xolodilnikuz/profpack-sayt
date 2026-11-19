import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useLang } from '../i18n/LangProvider.jsx';
import { story as storyText, steps as STEPS } from '../i18n/texts';
import { usePickNeed } from './OrderContext.jsx';
import Hero from './Hero.jsx';
import Scene3D from './Scene3D.jsx';

// 3D yuklanmasa ko‘rinadigan statik quti rasmi (.no-webgl)
function StageFallback() {
  return (
    <svg className="stage-fallback" viewBox="0 0 200 160" aria-hidden="true">
      <polygon points="100,26 153.69,57 113.85,80 60.16,49" fill="#E3C597" />
      <polygon points="60.16,49 113.85,80 113.85,132 60.16,101" fill="#D3A876" />
      <polygon points="113.85,80 153.69,57 153.69,109 113.85,132" fill="#B38657" />
      <polygon points="84.41,35 138.1,66 129.44,71 75.75,40" fill="#EDD7AE" />
      <g transform="matrix(.866 .5 0 1 60.16 49)"><rect x="7" y="18" width="48" height="14.2" rx="3" fill="none" stroke="#1B2152" strokeWidth="1.3" /><rect x="9.1" y="20" width="21.3" height="10.2" rx=".8" fill="#1B2152" /><text x="19.75" y="28.4" textAnchor="middle" fontFamily="Saira" fontWeight="600" fontSize="9" fill="#D3A876">Prof</text><text x="43.3" y="28.4" textAnchor="middle" fontFamily="Saira" fontWeight="600" fontSize="9" fill="#1B2152">pack</text></g>
    </svg>
  );
}

// ===== 3D: makulaturadan qutigacha =====
// Sahna orqada "yopishib" turadi, ustidan bosh ekran va 5 bosqich paneli aylanadi.
// Panellar joylashuvidan S qiymati (0 — bosh ekran … 5 — pechat) hisoblanadi; 3D sahna ham shundan foydalanadi.
export default function Story() {
  const { t, lang, href } = useLang();
  const pickNeed = usePickNeed();
  const storyRef = useRef(null);
  const trackerRef = useRef(null);
  const api = useRef({ storyS: () => 0, onScroll: () => {} });

  useLayoutEffect(() => {
    const story = storyRef.current, steps = [...trackerRef.current.children];
    const panels = [...story.querySelectorAll('.panel')].map(p => [p, p.querySelector('.wrap'), p.querySelector('.panel__inner')]);
    // har bir panel matni ekranda yopishib turgan oraliqning o‘rtasi = shu 3D bosqichning to‘liq ko‘rinadigan nuqtasi
    let anchors = [];
    const measure = () => {
      const top = story.getBoundingClientRect().top;
      anchors = panels.map(([p]) => p.getBoundingClientRect().top - top + (p.offsetHeight - innerHeight) / 2);
    };
    // 0 (bosh ekran) … 5 (pechat)
    const storyS = () => {
      const y = -story.getBoundingClientRect().top;
      if (y <= anchors[0]) return 0;
      for (let i = 0; i < anchors.length - 1; i++) if (y < anchors[i + 1]) return i + (y - anchors[i]) / (anchors[i + 1] - anchors[i]);
      return anchors.length - 1;
    };
    // bosqichlar treki + matn kartalari o‘z paneli markazdan uzoqlashganda so‘nadi (3D obyektni to‘smasligi uchun)
    const onScroll = () => {
      const idx = Math.round(storyS());
      steps.forEach((li, i) => { li.classList.toggle('is-active', i + 1 === idx); li.classList.toggle('is-done', i + 1 < idx); });
      for (const [, wrap, inner] of panels) {
        const q = wrap.getBoundingClientRect().top / innerHeight;
        const o = Math.min(1, Math.max(0, 1 - Math.abs(q) * 2.2));
        inner.style.opacity = o.toFixed(3);
        inner.style.visibility = o < .02 ? 'hidden' : '';
      }
    };
    const onResize = () => { measure(); onScroll(); };
    api.current = { storyS, onScroll };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onResize);
    measure();
    onScroll();
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onResize); };
  }, []);

  // til almashganda ham qayta hisoblanadi (asl sahifadagidek)
  useEffect(() => { api.current.onScroll(); }, [lang]);

  const getStoryS = useCallback(() => api.current.storyS(), []);

  return (
    <section className="story" id="story" aria-label={t(storyText.aria)} ref={storyRef}>
      <div className="story__stage">
        <div className="story__bg"></div>
        <div className="story__grid"></div>
        <Scene3D storyRef={storyRef} getStoryS={getStoryS} />
        <StageFallback />
        <div className="story__shade"></div>
        <ol className="tracker" aria-label={t(storyText.trackerAria)} ref={trackerRef}>
          {STEPS.map((step, i) => (
            <li key={i}><a href={`#step-${i + 1}`}><span>{t(step.tracker)}</span><i></i></a></li>
          ))}
        </ol>
      </div>

      <div className="story__panels">
        <Hero />
        {STEPS.map((step, i) => (
          <article className="panel step" id={`step-${i + 1}`} key={i}>
            <div className="wrap"><div className="panel__inner">
              <span className="step__num">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="step__title">{t(step.title)}</h2>
              <p className="step__text">{t(step.text)}</p>
              <ul className="tags">{step.tags.map((tag, j) => <li key={j}>{t(tag)}</li>)}</ul>
              {/* shu bosqich mahsulotining alohida sahifasi (karobka, pechat, makulatura …) */}
              {step.more && <a className="more" href={href(step.more.page)}>{t(step.more.label)}</a>}
              {step.cta && (
                <div className="actions"><a className="btn btn--kraft" href="#aloqa" onClick={pickNeed(step.cta.need)}>{t(step.cta.label)}</a></div>
              )}
            </div></div>
          </article>
        ))}
      </div>
    </section>
  );
}
