import { useEffect, useRef } from 'react';
import { useLang } from '../i18n/LangProvider.jsx';

// 3D sahna uchun <canvas>. Sahnaning o‘zi — src/three/createScene.js (three.js alohida bo‘lakda,
// sahifa matni undan oldin chiqadi). getStoryS — Story hisoblagan bosqich qiymati (0…5).
export default function Scene3D({ storyRef, getStoryS }) {
  const { lang } = useLang();
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const langRef = useRef(lang);
  langRef.current = lang;

  useEffect(() => {
    const root = document.documentElement;
    let cancelled = false, started = false;
    // 3D yuklanmasa — statik rasm
    const fallback = setTimeout(() => { if (!started) root.classList.add('no-webgl'); }, 6000);
    import('../three/createScene.js')
      .then(({ createScene }) => {
        if (cancelled) return;
        sceneRef.current = createScene(canvasRef.current, { story: storyRef.current, getStoryS, lang: langRef.current });
        started = true;
      })
      .catch(err => console.error(err));
    return () => {
      cancelled = true;
      clearTimeout(fallback);
      if (sceneRef.current) sceneRef.current.dispose();
      sceneRef.current = null;
    };
  }, [storyRef, getStoryS]);

  // qutidagi bosma yozuvlar tilga bog‘liq
  useEffect(() => { if (sceneRef.current) sceneRef.current.setLang(lang); }, [lang]);

  return <canvas id="scene" aria-hidden="true" ref={canvasRef}></canvas>;
}
