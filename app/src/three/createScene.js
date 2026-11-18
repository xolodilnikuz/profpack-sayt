// ===== 3D sahna: makulaturadan qutigacha =====
// Asl sahifadagi modul deyarli o‘zgarishsiz ko‘chirilgan. Farqlari:
//  • hammasi createScene() ichida; dispose() hammasini tozalaydi (hodisalar, kadr sikli, WebGL resurslari);
//  • bosqich qiymati (S) getStoryS() dan olinadi (Story komponenti hisoblaydi; asl: window.ppStoryS);
//  • til — setLang() orqali (asl: 'pp:lang' hodisasi);
//  • hamkor logotiplari — src/data/partners.js (fayllar, asl: data URI), yozuvlar — src/i18n/texts/scene3d.js.
//
// const scene = createScene(canvas, { story, getStoryS, lang });  scene.setLang('ru');  scene.dispose();
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';
import { BRANDS as PARTNERS } from '../data/partners.js';
import { scene3d } from '../i18n/texts/scene3d.js';

// qutidagi bosma yozuvlar tilga bog‘liq
const TXT = Object.fromEntries(['uz', 'ru', 'en'].map(l => [l, { front: scene3d.front[l], side: scene3d.side[l], roll: scene3d.roll[l] }]));

export function createScene(canvas, { story, getStoryS, lang: startLang } = {}) {
  const root = document.documentElement;
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (err) {
    root.classList.add('no-webgl');
    throw err;
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.localClippingEnabled = true;
  renderer.setClearColor(0x000000, 0);

  // shriftlar canvas teksturalari uchun kerak (Onest — lotin va kirill)
  const fontsReady = () => Promise.race([
    Promise.all([document.fonts.load('600 100px Saira'), ...['500 40px Onest', '600 40px Onest'].map(f => document.fonts.load(f, 'Aa Яя'))]),
    new Promise(r => setTimeout(r, 2500)),
  ]).catch(() => {});

  let lang = TXT[startLang] ? startLang : 'uz';
  let disposed = false, rafId = 0, repaint = null;
  const cleanup = [];   // dispose() da bajariladi
  const listen = (target, type, fn, opts) => { target.addEventListener(type, fn, opts); cleanup.push(() => target.removeEventListener(type, fn, opts)); };

  init().catch(err => console.error(err));

  async function init() {
    await fontsReady();
    if (disposed) return;

    // hamkorlar (src/data/partners.js). Logotipi topilmaganlar nomi bilan chiqadi. null — Profpack’ning o‘z bosmasi
    const BRANDS = PARTNERS.map(b => b && { ...b });
    // logotiplar yuklanib bo‘lgach chizamiz
    await Promise.all(BRANDS.filter(b => b && b.src).map(b => new Promise(done => {
      const img = new Image();
      img.onload = () => { b.img = img; done(); };
      img.onerror = done;
      img.src = b.src;
    })));
    if (disposed) return;
    const faceBrand = [null, null];   // qutining katta tomonlari: 0 — old, 1 — orqa

    /* ---------- helpers ---------- */
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const seg = (v, a, b) => clamp((v - a) / (b - a));
    const lerp = (a, b, t) => a + (b - a) * t;
    const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const easeIn = t => t * t * t;
    const easeBack = t => 1 + 2.70158 * Math.pow(t - 1, 3) + 1.70158 * Math.pow(t - 1, 2);
    let seed = 11;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const hash3 = (x, y, z) => { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); };

    const INK = '#1B2152';
    const W = 1.3, H = 1, D = .95, F = D / 2, T = .016;         // quti o‘lchamlari (T — karton qalinligi, ~5 mm)
    const NET_W = 2 * W + 2 * D, NET_H = H + 2 * F;               // yoyilgan quti (razvyortka)
    const AMP = .075, FREQ = (2 * Math.PI) / .2, LIN = .02;       // gofro to‘lqini
    const RR = .62, RC = .17;                                     // rulon

    /* ---------- canvas textures ---------- */
    function canvas2d(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return [c, c.getContext('2d')]; }
    function toTex(c) {
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      return t;
    }
    function paintKraft(g, w, h, base) {
      g.fillStyle = base; g.fillRect(0, 0, w, h);
      const each = (x, y, m, fn) => {
        if (x > m && y > m && x < w - m && y < h - m) return fn(0, 0);
        for (const dx of [-w, 0, w]) for (const dy of [-h, 0, h]) fn(dx, dy);
      };
      for (let i = 0, n = (w * h) / 90; i < n; i++) {
        const x = rand() * w, y = rand() * h, r = rand() * 2.2 + .4;
        g.fillStyle = rand() < .55 ? `rgba(92,60,30,${rand() * .13})` : `rgba(245,222,188,${rand() * .14})`;
        each(x, y, 4, (dx, dy) => { g.beginPath(); g.arc(x + dx, y + dy, r, 0, 6.283); g.fill(); });
      }
      g.lineWidth = .8;
      for (let i = 0, n = (w * h) / 260; i < n; i++) {
        const x = rand() * w, y = rand() * h, a = rand() * Math.PI, l = rand() * 12 + 3;
        g.strokeStyle = rand() < .5 ? `rgba(80,50,22,${rand() * .22})` : `rgba(250,232,205,${rand() * .25})`;
        each(x, y, 16, (dx, dy) => { g.beginPath(); g.moveTo(x + dx, y + dy); g.lineTo(x + dx + Math.cos(a) * l, y + dy + Math.sin(a) * l); g.stroke(); });
      }
    }
    function rr(g, x, y, w, h, r) {
      g.beginPath(); g.moveTo(x + r, y);
      g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
      g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
    }
    function drawLogo(g, cx, cy, w) {
      const h = w * .296, x = cx - w / 2, y = cy - h / 2, lw = w * .0145;
      g.save();
      g.strokeStyle = INK; g.lineWidth = lw;
      rr(g, x + lw / 2, y + lw / 2, w - lw, h - lw, h * .15); g.stroke();
      const bx = x + w * .046, by = y + h * .145, bw = w * .444, bh = h * .705;
      g.fillStyle = INK; rr(g, bx, by, bw, bh, h * .05); g.fill();
      g.font = `600 ${h * .64}px Saira, sans-serif`; g.textAlign = 'center'; g.textBaseline = 'alphabetic';
      const fit = (txt, tw) => clamp(tw / g.measureText(txt).width, .7, 1.3);
      const base = y + h * .735;
      g.save(); g.globalCompositeOperation = 'destination-out';           // "Prof" — kraft rangida ochiq qoladi
      g.translate(bx + bw / 2, base); g.scale(fit('Prof', w * .4), 1); g.fillText('Prof', 0, 0); g.restore();
      g.save(); g.translate(x + w * .737, base); g.scale(fit('pack', w * .43), 1); g.fillText('pack', 0, 0); g.restore();
      g.restore();
    }
    function drawRecycle(g, cx, cy, r) {
      g.save(); g.translate(cx, cy); g.strokeStyle = INK; g.fillStyle = INK;
      g.lineWidth = r * .17; g.lineCap = 'round';
      const V = [0, 1, 2].map(i => { const a = -Math.PI / 2 + i * 2 * Math.PI / 3; return [Math.cos(a) * r, Math.sin(a) * r]; });
      for (let i = 0; i < 3; i++) {
        const [x0, y0] = V[i], [x1, y1] = V[(i + 1) % 3];
        const sx = lerp(x0, x1, .16), sy = lerp(y0, y1, .16), ex = lerp(x0, x1, .64), ey = lerp(y0, y1, .64);
        g.beginPath(); g.moveTo(sx, sy); g.lineTo(ex, ey); g.stroke();
        const a = Math.atan2(y1 - y0, x1 - x0), hl = r * .34, hw = r * .25;
        g.beginPath();
        g.moveTo(ex + Math.cos(a) * hl * .8, ey + Math.sin(a) * hl * .8);
        g.lineTo(ex + Math.cos(a + Math.PI / 2) * hw, ey + Math.sin(a + Math.PI / 2) * hw);
        g.lineTo(ex + Math.cos(a - Math.PI / 2) * hw, ey + Math.sin(a - Math.PI / 2) * hw);
        g.closePath(); g.fill();
      }
      g.restore();
    }
    function drawUpArrows(g, x, y, s) {
      g.save(); g.strokeStyle = INK; g.fillStyle = INK; g.lineWidth = s * .09;
      for (const dx of [s * .22, s * .68]) {
        const cx = x + dx;
        g.beginPath(); g.moveTo(cx, y + s * .82); g.lineTo(cx, y + s * .3); g.stroke();
        g.beginPath(); g.moveTo(cx, y + s * .05); g.lineTo(cx - s * .17, y + s * .36); g.lineTo(cx + s * .17, y + s * .36); g.closePath(); g.fill();
      }
      g.fillRect(x, y + s * .9, s * .9, s * .09);
      g.restore();
    }
    function drawUmbrella(g, x, y, s) {
      g.save(); g.fillStyle = INK; g.strokeStyle = INK; g.lineWidth = s * .08; g.lineCap = 'round';
      const cx = x + s / 2, top = y + s * .42, R = s * .44, r3 = R / 3;
      g.beginPath(); g.arc(cx, top, R, Math.PI, 0);
      for (let i = 2; i >= 0; i--) g.arc(cx - R + r3 * (2 * i + 1), top, r3, 0, Math.PI, true);
      g.closePath(); g.fill();
      g.beginPath(); g.moveTo(cx, top); g.lineTo(cx, y + s * .85); g.arc(cx - s * .1, y + s * .85, s * .1, 0, Math.PI, false); g.stroke();
      for (const [dx, dy] of [[.12, .02], [.5, -.07], [.88, .02]]) { g.beginPath(); g.ellipse(x + s * dx, y + s * dy, s * .03, s * .06, 0, 0, 6.283); g.fill(); }
      g.restore();
    }
    // tilga bog‘liq teksturalar: canvas saqlanadi, til almashganda qayta chiziladi
    function inkCanvas(w, h, draw) {
      const [c, g] = canvas2d(w, h), tex = toTex(c);
      const paint = () => { g.clearRect(0, 0, w, h); draw(g, w, h); tex.needsUpdate = true; };
      paint();
      return { tex, paint };
    }
    function drawBrand(g, cx, cy, maxW, maxH, name) {
      let size = maxH;
      g.font = `700 ${size}px Saira, sans-serif`;
      const tw = g.measureText(name).width;
      if (tw > maxW) { size *= maxW / tw; g.font = `700 ${size}px Saira, sans-serif`; }
      g.fillStyle = INK; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(name, cx, cy);
      g.textBaseline = 'alphabetic';
    }
    function drawBrandMark(g, cx, cy, maxW, maxH, b) {
      if (!b.img) return drawBrand(g, cx, cy, maxW * 1.1, maxH * .66, b.name);
      const iw = b.img.naturalWidth || 300, ih = b.img.naturalHeight || 150;
      const s = Math.min(maxW / iw, maxH / ih), dw = iw * s, dh = ih * s;
      let src = b.img;
      if (b.tint) {   // logotip shakli saqlanadi, rangi bosma bo‘yog‘iga almashadi
        const [c, t] = canvas2d(Math.ceil(dw), Math.ceil(dh));
        t.drawImage(b.img, 0, 0, dw, dh);
        t.globalCompositeOperation = 'source-in'; t.fillStyle = b.tint; t.fillRect(0, 0, dw, dh);
        src = c;
      }
      g.save(); g.globalAlpha = .92;   // kraftdagi fleksobosma biroz xira chiqadi
      g.drawImage(src, cx - dw / 2, cy - dh / 2, dw, dh);
      g.restore();
    }
    function drawFront(g, w, h, brand) {
      if (brand) {
        drawBrandMark(g, w / 2, h * .37, w * .66, h * .44, brand);
        drawLogo(g, w * .6, h * .855, w * .2);   // ishlab chiqaruvchi belgisi
      } else drawLogo(g, w / 2, h * .42, w * .72);
      g.fillStyle = INK; g.textAlign = 'center'; g.font = `500 ${w * .036}px Onest, sans-serif`;
      g.fillText(TXT[lang].front, w / 2, h * .64);
      drawUpArrows(g, w * .07, h * .77, h * .14);
      drawUmbrella(g, w * .19, h * .775, h * .13);
      drawRecycle(g, w * .9, h * .85, h * .075);
    }
    const frontInk = inkCanvas(1024, Math.round(1024 * H / W), (g, w, h) => drawFront(g, w, h, faceBrand[0]));
    const backInk = inkCanvas(1024, Math.round(1024 * H / W), (g, w, h) => drawFront(g, w, h, faceBrand[1]));
    const sideInk = inkCanvas(768, Math.round(768 * H / D), (g, w, h) => {
      drawUpArrows(g, w * .1, h * .08, h * .15);
      drawUmbrella(g, w * .34, h * .09, h * .14);
      drawRecycle(g, w * .5, h * .5, w * .2);
      g.fillStyle = INK; g.textAlign = 'center'; g.font = `600 ${w * .06}px Onest, sans-serif`;
      g.fillText(TXT[lang].side, w / 2, h * .76);
      drawLogo(g, w / 2, h * .88, w * .42);
    });
    const rollSkin = (() => {
      const [c, g] = canvas2d(1024, 512); paintKraft(g, 1024, 512, '#c69a65');
      g.fillStyle = 'rgba(70,45,20,.35)'; g.fillRect(80, 0, 3, 512);
      const tex = toTex(c);
      const label = () => {
        g.fillStyle = '#f3f1ec'; g.fillRect(560, 170, 190, 170);
        g.fillStyle = INK; g.textAlign = 'left';
        g.font = '600 34px Saira, sans-serif'; g.fillText('Profpack', 582, 218);
        g.font = '500 18px Onest, sans-serif'; g.fillText(TXT[lang].roll, 582, 246);
        for (let x = 582; x < 726;) { const bw = (x * 7) % 3 < 1.5 ? 2 : 4; g.fillRect(x, 264, bw, 54); x += bw + ((x * 13) % 5 < 2.5 ? 2 : 3); }
        tex.needsUpdate = true;
      };
      label();
      return { tex, label };
    })();
    // til almashganda (setLang) qayta chiziladi
    repaint = () => { frontInk.paint(); backInk.paint(); sideInk.paint(); rollSkin.label(); };
    function capTex() {
      const [c, g] = canvas2d(512, 512), R = 256, rc = R * RC / RR;
      g.fillStyle = '#c99e6a'; g.fillRect(0, 0, 512, 512);
      for (let r = R; r > rc; r -= 2.3) {
        const k = rand();
        g.strokeStyle = k < .33 ? 'rgba(120,85,48,.55)' : k < .66 ? 'rgba(236,210,170,.6)' : 'rgba(175,130,85,.5)';
        g.lineWidth = 1.4; g.beginPath(); g.arc(R, R, r, 0, 6.283); g.stroke();
      }
      const grd = g.createRadialGradient(R, R, rc, R, R, R);
      grd.addColorStop(0, 'rgba(60,40,20,.3)'); grd.addColorStop(.2, 'rgba(0,0,0,0)');
      grd.addColorStop(.9, 'rgba(0,0,0,0)'); grd.addColorStop(1, 'rgba(60,40,20,.4)');
      g.fillStyle = grd; g.fillRect(0, 0, 512, 512);
      return toTex(c);
    }
    function radialTex(stops) {
      const [c, g] = canvas2d(256, 256); const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
      stops.forEach(([o, col]) => grd.addColorStop(o, col)); g.fillStyle = grd; g.fillRect(0, 0, 256, 256);
      return new THREE.CanvasTexture(c);
    }

    /* ---------- scene ---------- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
    const CAM_D = 9;
    camera.position.set(0, .55, CAM_D); camera.lookAt(0, 0, 0);
    const pmrem = new THREE.PMREMGenerator(renderer);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), .04).texture;
    scene.add(new THREE.HemisphereLight(0xdfe5ff, 0x20264f, .8));
    const keyLight = new THREE.DirectionalLight(0xfff1de, 2.3); keyLight.position.set(4, 6, 6); scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x7f97ff, 2.4); rimLight.position.set(-6, 3, -5); scene.add(rimLight);

    const stage = new THREE.Group(); scene.add(stage);

    const kraftCanvas = canvas2d(512, 512); paintKraft(kraftCanvas[1], 512, 512, '#c99e6a');
    const kraftTex = toTex(kraftCanvas[0]); kraftTex.wrapS = kraftTex.wrapT = THREE.RepeatWrapping;

    /* ---------- quti (yoyilgan → yig‘ilgan) ---------- */
    const kraftOuter = new THREE.MeshStandardMaterial({ map: kraftTex, roughness: .82, envMapIntensity: .7, transparent: true });
    const kraftInner = new THREE.MeshStandardMaterial({ map: kraftTex, color: 0xcdb898, roughness: .92, envMapIntensity: .5, transparent: true });
    const kraftEdge = new THREE.MeshStandardMaterial({ color: 0xb38d5f, roughness: .95, transparent: true });
    const boxMats = [kraftEdge, kraftEdge, kraftEdge, kraftEdge, kraftOuter, kraftInner];
    const inkClip = new THREE.Plane(new THREE.Vector3(0, -1, 0), 1e3);
    const inkMats = [frontInk.tex, sideInk.tex, backInk.tex].map(map => new THREE.MeshStandardMaterial({
      map, transparent: true, roughness: .5, depthWrite: false, clippingPlanes: [inkClip],
      polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
    }));
    const fadeMats = [kraftOuter, kraftInner, kraftEdge, ...inkMats];

    function slab(w, h, ink) {
      const g = new THREE.Group();
      // tekstura har bir yuzaga o‘lchamiga qarab beriladi — cho‘zilgan tola yog‘och tolasiga o‘xshab qolmasin
      const geo = new THREE.BoxGeometry(w, h, T), uv = geo.attributes.uv;
      for (let i = 16; i < 24; i++) uv.setXY(i, uv.getX(i) * w, uv.getY(i) * h);
      g.add(new THREE.Mesh(geo, boxMats));
      if (ink) { const p = new THREE.Mesh(new THREE.PlaneGeometry(w * .985, h * .985), ink); p.position.z = T / 2 + .003; g.add(p); }
      return g;
    }
    const flapHinges = { minor: [], major: [] };
    function addFlaps(parent, w, kind) {
      // katta klapanlar o‘rtada ingichka tirqish bilan uchrashadi; kichiklari yopilganda ularning ostiga tushadi (setFold)
      const len = kind === 'major' ? F - .003 : F;
      for (const dir of [1, -1]) {
        const hinge = new THREE.Group(); hinge.position.y = dir * H / 2; hinge.userData.dir = dir;
        const flap = slab(w - .012, len); flap.position.y = dir * len / 2; hinge.add(flap);
        parent.add(hinge); flapHinges[kind].push(hinge);
        if (kind === 'major') {
          // bukilish chizig‘i: yopiq qutining qirrasi taxta burchagidek emas, yumaloq egilgandek ko‘rinadi
          const crease = new THREE.Mesh(new THREE.CylinderGeometry(T * .49, T * .49, w - .012, 12, 1, true).rotateZ(Math.PI / 2), kraftOuter);
          crease.position.y = dir * H / 2; parent.add(crease);
        }
      }
    }
    const boxRoot = new THREE.Group(); stage.add(boxRoot);
    const boxInner = new THREE.Group(); boxRoot.add(boxInner);
    const front = slab(W, H, inkMats[0]); boxInner.add(front); addFlaps(front, W, 'major');
    const hingeR = new THREE.Group(); hingeR.position.x = W / 2; front.add(hingeR);
    const sideR = slab(D, H, inkMats[1]); sideR.position.x = D / 2; hingeR.add(sideR); addFlaps(sideR, D, 'minor');
    const hingeB = new THREE.Group(); hingeB.position.x = D; hingeR.add(hingeB);
    const back = slab(W, H, inkMats[2]); back.position.x = W / 2; hingeB.add(back); addFlaps(back, W, 'major');
    const hingeL = new THREE.Group(); hingeL.position.x = -W / 2; front.add(hingeL);
    const sideL = slab(D, H, inkMats[1]); sideL.position.x = -D / 2; hingeL.add(sideL); addFlaps(sideL, D, 'minor');

    function setFold(k1, k2, k3) {
      hingeR.rotation.y = Math.PI / 2 * k1; hingeB.rotation.y = Math.PI / 2 * k1; hingeL.rotation.y = -Math.PI / 2 * k1;
      for (const h of flapHinges.minor) { h.rotation.x = -h.userData.dir * Math.PI / 2 * k2; h.position.y = h.userData.dir * (H / 2 - T * 1.04 * k2); }
      for (const h of flapHinges.major) h.rotation.x = -h.userData.dir * Math.PI / 2 * k3;
      boxInner.position.set(-W / 2 * (1 - k1), 0, D / 2 * k1);
    }

    // shtans (kesish va bukish) chiziqlari
    const dies = (() => {
      const xs = [0, D, D + W, 2 * D + W, NET_W].map(v => v - NET_W / 2), yT = H / 2 + F, yB = -H / 2 - F, z = .2;
      const cut = [], fold = [];
      const line = (arr, x1, y1, x2, y2) => arr.push(x1, y1, z, x2, y2, z);
      line(cut, xs[0], yB, xs[0], yT); line(cut, xs[4], yB, xs[4], yT); line(cut, xs[0], yT, xs[4], yT); line(cut, xs[0], yB, xs[4], yB);
      for (const x of xs.slice(1, 4)) { line(cut, x, H / 2, x, yT); line(cut, x, -H / 2, x, yB); line(fold, x, -H / 2, x, H / 2); }
      line(fold, xs[0], H / 2, xs[4], H / 2); line(fold, xs[0], -H / 2, xs[4], -H / 2);
      // har bir chiziq ikki qatlam: to‘q navy "soya" + yorqin lazer — kraft ustida ham, fon ustida ham ko‘rinadi
      const grp = new THREE.Group(), mats = [];
      const mk = (arr, color, width, dashed, order) => {
        const mat = new LineMaterial({ color, linewidth: width, transparent: true, depthTest: false, dashed, dashSize: .08, gapSize: .055 });
        mats.push(mat);
        const l = new LineSegments2(new LineSegmentsGeometry().setPositions(arr), mat);
        l.computeLineDistances(); l.renderOrder = order; grp.add(l);
      };
      mk(cut, 0x0e1233, 5, false, 10); mk(fold, 0x0e1233, 5, true, 10);
      mk(cut, 0x8fd0ff, 2, false, 11); mk(fold, 0x8fd0ff, 2, true, 11);
      grp.userData.mats = mats;
      return grp;
    })();
    boxRoot.add(dies);

    /* ---------- rulon + gofrokarton ---------- */
    const mill = new THREE.Group(); stage.add(mill);
    const boardTex = kraftTex.clone(); boardTex.repeat.set(NET_W / W, NET_H / H); boardTex.needsUpdate = true;
    const linerMat = new THREE.MeshStandardMaterial({ map: boardTex, color: 0xd6bd9a, roughness: .9, envMapIntensity: .55, transparent: true });
    const linerEdge = new THREE.MeshStandardMaterial({ color: 0x9c744a, roughness: .95, transparent: true });
    const topMat = linerMat.clone(), topEdge = linerEdge.clone();
    const fluteMat = new THREE.MeshStandardMaterial({ color: 0xd9b27c, roughness: .9, side: THREE.DoubleSide, transparent: true });

    const linerGeo = new THREE.BoxGeometry(NET_W, LIN, NET_H);
    const linerBottom = new THREE.Mesh(linerGeo.clone().translate(NET_W / 2, 0, 0), [linerEdge, linerEdge, linerMat, linerMat, linerEdge, linerEdge]);
    linerBottom.position.set(-NET_W / 2, LIN / 2, 0);
    const linerTop = new THREE.Mesh(linerGeo, [topEdge, topEdge, topMat, topMat, topEdge, topEdge]);
    const fluteGeo = new THREE.PlaneGeometry(NET_W, NET_H, 320, 1); fluteGeo.rotateX(-Math.PI / 2);
    { const p = fluteGeo.attributes.position; for (let i = 0; i < p.count; i++) p.setY(i, Math.sin(p.getX(i) * FREQ)); fluteGeo.computeVertexNormals(); }
    const flute = new THREE.Mesh(fluteGeo, fluteMat);
    const board = new THREE.Group(); board.add(linerBottom, flute, linerTop); mill.add(board);

    const roll = new THREE.Group(); mill.add(roll);
    const rollBody = new THREE.Mesh(new THREE.CylinderGeometry(RR, RR, NET_H, 72, 1, true), new THREE.MeshStandardMaterial({ map: rollSkin.tex, roughness: .8, envMapIntensity: .7 }));
    rollBody.rotation.x = Math.PI / 2; roll.add(rollBody);
    const capMat = new THREE.MeshStandardMaterial({ map: capTex(), roughness: .9, envMapIntensity: .6 });
    for (const s of [1, -1]) {
      const cap = new THREE.Mesh(new THREE.RingGeometry(RC, RR, 72, 1), capMat);
      cap.position.z = s * NET_H / 2; if (s < 0) cap.rotation.y = Math.PI; roll.add(cap);
    }
    const core = new THREE.Mesh(new THREE.CylinderGeometry(RC, RC, NET_H + .04, 40, 1, true), new THREE.MeshStandardMaterial({ color: 0x6e4d2e, roughness: .9, side: THREE.DoubleSide }));
    core.rotation.x = Math.PI / 2; roll.add(core);
    // shaffof obyektlar tartibi: avval karton, keyin uning oldidagi quti razvyortkasi
    boxRoot.traverse(o => { if (o.isMesh) o.renderOrder = 2; });

    /* ---------- makulatura bo‘laklari ---------- */
    function crumple(geo, amt) {
      const p = geo.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
        const k = 1 + (hash3(+x.toFixed(4), +y.toFixed(4), +z.toFixed(4)) - .5) * amt;
        p.setXYZ(i, x * k, y * k, z * k);
      }
      geo.computeVertexNormals(); return geo;
    }
    const ballGeo = crumple(new THREE.IcosahedronGeometry(.13, 1), .6);
    const sheetGeo = (() => {
      const g = new THREE.PlaneGeometry(.36, .27, 4, 3), p = g.attributes.position;
      for (let i = 0; i < p.count; i++) p.setZ(i, (hash3(p.getX(i) * 9, p.getY(i) * 9, 1) - .5) * .1);
      const n = g.toNonIndexed(); n.computeVertexNormals(); return n;
    })();
    const chunkGeo = new THREE.BoxGeometry(.34, .025, .25);

    const scraps = [];
    const dummy = new THREE.Object3D();
    function addScraps(geo, mat, n, palette) {
      const mesh = new THREE.InstancedMesh(geo, mat, n);
      mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage); mesh.frustumCulled = false;
      const col = new THREE.Color(), data = [];
      for (let i = 0; i < n; i++) {
        mesh.setColorAt(i, col.set(palette[Math.floor(rand() * palette.length)]));
        const u = rand() * 2 - 1, th = rand() * Math.PI * 2, rr2 = .28 + Math.pow(rand(), .55) * .95, s = Math.sqrt(1 - u * u);
        data.push({
          start: new THREE.Vector3((rand() - .5) * W * .9, (rand() - .5) * H * .9, (rand() - .5) * D * .9),
          cloud: new THREE.Vector3(Math.cos(th) * s * rr2 * 2.2, u * rr2 * 1.35, Math.sin(th) * s * rr2 * 1.2),
          rot: new THREE.Vector3(rand() * 6.28, rand() * 6.28, rand() * 6.28),
          spin: new THREE.Vector3((rand() - .5) * 1.6, (rand() - .5) * 1.6, (rand() - .5) * 1.6),
          phase: rand() * 6.28, scale: .7 + rand() * .6, delay: rand(), twist: 4 + rand() * 3,
        });
        dummy.scale.setScalar(1e-4); dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceColor.needsUpdate = true; mesh.visible = false;
      stage.add(mesh); scraps.push({ mesh, data });
    }
    addScraps(ballGeo, new THREE.MeshStandardMaterial({ roughness: .95, flatShading: true }), 85, ['#eceef2', '#d6dae1', '#c7cbd2', '#e9e2d4', '#b9bfca']);
    addScraps(sheetGeo, new THREE.MeshStandardMaterial({ roughness: .9, flatShading: true, side: THREE.DoubleSide }), 75, ['#f0f2f5', '#dfe3ea', '#c9cdd5', '#e6dccb', '#d3def0']);
    addScraps(chunkGeo, new THREE.MeshStandardMaterial({ map: kraftTex, roughness: .9 }), 55, ['#ffffff', '#eadfce', '#d8c5aa']);

    function updateScraps(t01, t12, time) {
      const show = t01 > 0 && t12 < 1;
      for (const { mesh, data } of scraps) {
        mesh.visible = show;
        if (!show) continue;
        for (let i = 0; i < data.length; i++) {
          const d = data[i];
          const b = easeOut(seg(t01, .04 + d.delay * .15, .62 + d.delay * .3));
          const v = ease(seg(t12, d.delay * .25, .84 + d.delay * .14));
          let x = d.cloud.x + Math.sin(time * .6 + d.phase) * .07, y = d.cloud.y + Math.cos(time * .5 + d.phase) * .07, z = d.cloud.z;
          if (v > 0) {
            const r = Math.hypot(x, y) * Math.pow(1 - v, 1.4), a = Math.atan2(y, x) + v * d.twist;
            x = Math.cos(a) * r; y = Math.sin(a) * r * .8; z *= 1 - v;
          }
          dummy.position.set(lerp(d.start.x, x, b), lerp(d.start.y, y, b), lerp(d.start.z, z, b));
          const s = d.scale * easeBack(seg(t01, .02 + d.delay * .12, .3 + d.delay * .15)) * (1 - easeIn(seg(t12, .5, .92)));
          dummy.scale.setScalar(Math.max(s, 1e-4));
          dummy.rotation.set(d.rot.x + time * d.spin.x + v * 6, d.rot.y + time * d.spin.y, d.rot.z + time * d.spin.z + v * 4);
          dummy.updateMatrix(); mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      }
    }

    /* ---------- atmosfera ---------- */
    const dust = (() => {
      const n = 420, arr = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { arr[i * 3] = (rand() - .5) * 20; arr[i * 3 + 1] = (rand() - .5) * 14; arr[i * 3 + 2] = -2 - rand() * 9; }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
      return new THREE.Points(g, new THREE.PointsMaterial({ color: 0xa9b6ff, size: .06, map: radialTex([[0, 'rgba(255,255,255,1)'], [.35, 'rgba(255,255,255,.45)'], [1, 'rgba(255,255,255,0)']]), transparent: true, opacity: .6, depthWrite: false }));
    })();
    scene.add(dust);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: radialTex([[0, 'rgba(0,0,0,.6)'], [.5, 'rgba(0,0,0,.25)'], [1, 'rgba(0,0,0,0)']]), color: 0x000000, transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; stage.add(shadow);

    // pechat skaneri
    const scanMat = new THREE.MeshBasicMaterial({ color: 0x8fd0ff, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending });
    const scan = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), scanMat); scan.rotation.x = -Math.PI / 2; scan.renderOrder = 11; scan.visible = false; scene.add(scan);
    const scanLineMat = new THREE.LineBasicMaterial({ color: 0xcdeeff, transparent: true });
    scan.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1, 1)), scanLineMat));
    const bb = new THREE.Box3(), bbSize = new THREE.Vector3(), bbCenter = new THREE.Vector3();

    /* ---------- timeline ---------- */
    // S: 0 qahramon quti · 1 makulatura · 2 rulon · 3 gofrokarton · 4 quti · 5 pechat
    const TT = (S, k) => seg(S - k, .15, .88);
    const widthsKey = [2.5, 6.1, 2.8, 5.9, 2.6, 2.6];
    const heightsKey = [2.3, 3.3, 2.5, 2.6, 2.4, 2.4];
    const buildWidth = b => lerp(NET_W + .5, 2.6, ease(seg(b, .44, .72)));
    function buildPose(b, pr) {
      return {
        k1: ease(seg(b, .42, .66)), k2: ease(seg(b, .6, .8)), k3: ease(seg(b, .74, .95)),
        open: seg(b, .28, .42),
        die: seg(b, .16, .26) * (1 - seg(b, .42, .54)),
        turn: ease(seg(b, .42, .9)),
        ink: seg(pr, .08, .86),
      };
    }
    const layout = { aw: .52, ah: .74, max: 1.6 };
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    // hamkor brendlari: tayyor quti har necha soniyada yarim aylanadi,
    // aylanishdan oldin orqaga o‘tib turgan katta tomonga navbatdagi brend bosiladi
    const turnBox = { angle: 0, from: 0, to: 0, t0: -1, next: 0, idx: 0, idle: false };
    const TURN_DUR = 1.6, HOLD = 2.8;
    function paintFace(face, brand) {
      if (faceBrand[face] === brand) return;
      faceBrand[face] = brand; (face ? backInk : frontInk).paint();
    }
    function updateBrandTurn(idle, visible, time) {
      const B = turnBox;
      if (B.t0 >= 0) {
        const p = clamp((time - B.t0) / TURN_DUR);
        B.angle = lerp(B.from, B.to, ease(p));
        if (p < 1) return;
        B.angle = B.to = B.to % (2 * Math.PI); B.t0 = -1; B.next = time + HOLD;
      }
      if (!visible) {   // quti ko‘rinmayapti — keyingi safar yana Profpack bosmasidan boshlanadi
        B.idx = 0; B.angle = B.to = 0; B.idle = false; paintFace(0, null); paintFace(1, null);
        return;
      }
      if (idle && !B.idle) B.next = time + HOLD;
      B.idle = idle;
      const facing = B.angle > 1 ? 1 : 0;
      // bosqich o‘zgarsa, aylanishni tugatib old tomonni kameraga qaytaramiz
      if (idle ? time >= B.next : facing === 1) {
        if (idle) { B.idx = (B.idx + 1) % BRANDS.length; paintFace(1 - facing, BRANDS[B.idx]); }
        B.from = B.angle; B.to = B.angle + Math.PI; B.t0 = time;
      }
    }

    function update(S, time, intro) {
      const t01 = TT(S, 0), t12 = TT(S, 1), t23 = TT(S, 2), t34 = TT(S, 3), t45 = TT(S, 4);

      // kadrga sig‘dirish
      const k = Math.min(4, Math.floor(S)), tk = TT(S, k);
      let rw = lerp(widthsKey[k], widthsKey[k + 1], tk);
      const rh = lerp(heightsKey[k], heightsKey[k + 1], tk);
      if (k === 3) rw = lerp(lerp(widthsKey[3], NET_W + .5, seg(tk, 0, .25)), widthsKey[4], ease(seg(tk, .44, .72)));

      // quti
      let pose, boxScale = 1, spin;
      if (S < 2) {
        if (intro < 1) { const b = lerp(.14, 1, seg(intro, 0, .72)); pose = buildPose(b, seg(intro, .7, 1)); rw = Math.max(rw, buildWidth(b)); }
        else pose = buildPose(1, 1);
        boxScale = 1 - easeIn(seg(t01, 0, .5));
        spin = t01 * 2.4;
      } else {
        pose = buildPose(t34, t45);
        spin = ease(t45) * Math.PI * 2;
      }

      const visH = 2 * CAM_D * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)), visW = visH * camera.aspect;
      const fit = Math.min((layout.aw * visW) / rw, (layout.ah * visH) / rh, layout.max);
      stage.scale.setScalar(fit);
      stage.position.y = Math.sin(time * .9) * .05;
      stage.rotation.set(mouse.y * .08, mouse.x * .2, 0);

      boxRoot.visible = boxScale > .002 && (pose.open > 0 || pose.die > 0);
      setFold(pose.k1, pose.k2, pose.k3);
      for (const m of fadeMats) m.opacity = pose.open;
      boxRoot.scale.setScalar(Math.max(boxScale, 1e-3));
      const idle = (S < 2 ? 1 - seg(S, 0, .5) : seg(S, 4.2, 5)) * pose.turn;
      const showcase = !reduceMotion && pose.ink >= 1 && ((S < .12 && intro >= 1) || S > 4.92);
      updateBrandTurn(showcase, boxRoot.visible, time);
      boxRoot.rotation.set(.36 * pose.turn + Math.sin(time * .7) * .04 * idle, -.72 * pose.turn + spin + Math.sin(time * .45) * .2 * idle + turnBox.angle, 0);
      dies.visible = pose.die > .001;
      for (const m of dies.userData.mats) m.opacity = pose.die;

      // makulatura
      updateScraps(t01, t12, time);

      // rulon → gofrokarton
      // karton tik turib, yoyilgan quti ortida qoladi — quti ustidan paydo bo‘ladi, so‘ng karton yashiriladi
      mill.visible = t12 > .3 && t34 < .43;
      if (mill.visible) {
        const a = ease(seg(t23, 0, .3)), c = ease(seg(t34, 0, .28));
        mill.rotation.set(lerp(lerp(.24, .56, a), Math.PI / 2, c), lerp(lerp(-.62, -.42, a), 0, c), 0);
        mill.position.set(0, lerp(lerp(0, -.28, a), 0, c), lerp(0, -(2 * LIN + 2 * AMP) - T / 2 - .012, c));
        const u = ease(seg(t23, .15, .55)), rs = 1 - .45 * u;
        const rollS = easeBack(seg(t12, .45, 1)) * (1 - easeIn(seg(t23, .55, .7)));
        roll.visible = rollS > .003;
        roll.scale.set(Math.max(rollS * rs, 1e-3), Math.max(rollS * rs, 1e-3), Math.max(rollS, 1e-3));
        roll.position.set(lerp(0, -NET_W / 2, a) + u * NET_W, lerp(0, RR * rs * rollS + LIN, a), 0);
        roll.rotation.z = -t12 * 4 - (u * NET_W) / RR;

        board.visible = t23 > .14;
        linerBottom.scale.x = Math.max(u, 1e-3);
        const f = ease(seg(t23, .5, .75)), g2 = ease(seg(t23, .6, .85)), pr = ease(seg(t23, .85, 1));
        flute.visible = t23 > .5;
        flute.scale.y = lerp(.002, AMP, seg(t23, .55, .82));
        flute.position.y = lerp(lerp(1.8, LIN + .42, f), LIN + AMP, pr);
        linerTop.visible = t23 > .6;
        linerTop.position.y = lerp(lerp(3, .9, g2), LIN * 1.5 + 2 * AMP, pr);
        fluteMat.opacity = seg(t23, .5, .6);
        topMat.opacity = topEdge.opacity = seg(t23, .6, .7);
      }

      // fon
      dust.rotation.y = time * .015; dust.position.y = S * .45;
      shadow.position.y = -1.2;
      shadow.scale.set(rw * .62, 1.3, 1);
      shadow.material.opacity = .55 * (1 - .65 * t01 * (1 - t12));

      // pechat: kliping tekisligi pastdan yuqoriga ko‘tariladi
      stage.updateMatrixWorld(true);
      if (!boxRoot.visible || pose.ink >= 1) { inkClip.constant = 1e3; scan.visible = false; }
      else if (pose.ink <= 0) { inkClip.constant = -1e3; scan.visible = false; }
      else {
        bb.setFromObject(boxInner); bb.getSize(bbSize); bb.getCenter(bbCenter);
        const y = lerp(bb.min.y, bb.max.y, pose.ink);
        inkClip.constant = y;
        scan.visible = true;
        scan.position.set(bbCenter.x, y, bbCenter.z);
        scan.scale.set(bbSize.x * 1.25, bbSize.z * 1.25, 1);
        const fade = Math.sin(Math.PI * pose.ink);
        scanMat.opacity = .2 * fade; scanLineMat.opacity = .9 * fade;
      }
    }

    /* ---------- layout / loop ---------- */
    function resize() {
      const w = canvas.clientWidth || innerWidth, h = canvas.clientHeight || innerHeight;
      renderer.setPixelRatio(Math.min(devicePixelRatio, w < 760 ? 1.75 : 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      if (w >= 900 && w / h > 1.05) { camera.setViewOffset(w, h, -w * .19, -h * .02, w, h); Object.assign(layout, { aw: .52, ah: .7, max: 1.6 }); }
      else { camera.setViewOffset(w, h, 0, h * .19, w, h); Object.assign(layout, { aw: .88, ah: .38, max: 1.25 }); }
      camera.updateProjectionMatrix();
      for (const m of dies.userData.mats) m.resolution.set(w, h);
    }
    listen(window, 'resize', resize);
    resize();

    listen(window, 'pointermove', e => {
      if (e.pointerType === 'touch') return;
      mouse.tx = (e.clientX / innerWidth) * 2 - 1; mouse.ty = (e.clientY / innerHeight) * 2 - 1;
    }, { passive: true });

    // bosqich qiymati Story komponentidan (panellar joylashuvi bo‘yicha) olinadi — matn va 3D bir xil yuradi
    const storyS = () => (getStoryS ? getStoryS() : 0);
    let S = storyS(), active = true, last = performance.now(), introStart = null;
    const io = new IntersectionObserver(([e]) => { active = e.isIntersecting; last = performance.now(); }, { rootMargin: '120px' });
    io.observe(story);
    cleanup.push(() => io.disconnect());

    function frame(now) {
      if (disposed) return;
      rafId = requestAnimationFrame(frame);
      if (!active || document.hidden) return;
      const dt = Math.min(.05, (now - last) / 1000); last = now;
      const target = storyS();
      // yumshoq ergashish: tez aylantirilsa ham 3D animatsiya sakramasdan, ravon yetib boradi
      S += (target - S) * (1 - Math.exp(-dt * (reduceMotion ? 40 : 3.2)));
      if (Math.abs(target - S) < 1e-4) S = target;
      if (introStart === null) introStart = now;
      if (S > .05) introStart = -Infinity;   // foydalanuvchi aylantirdi — intro darhol tugaydi
      const intro = reduceMotion ? 1 : clamp((now - introStart) / 2800);
      const time = reduceMotion ? 0 : now / 1000;
      mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
      update(S, time, intro);
      renderer.render(scene, camera);
    }
    rafId = requestAnimationFrame(frame);

    // WebGL resurslarini bo‘shatish (dispose)
    cleanup.push(() => {
      const textures = new Set([scene.environment]);
      scene.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        for (const m of [].concat(o.material || [])) { if (m.map) textures.add(m.map); m.dispose(); }
      });
      textures.forEach(t => t && t.dispose());
      pmrem.dispose();
    });
  }

  return {
    // qutidagi bosma yozuvlar tilini almashtiradi (uz | ru | en)
    async setLang(l) {
      const next = TXT[l] ? l : 'uz';
      if (next === lang) return;
      lang = next;
      if (!repaint) return;   // teksturalar hali chizilmagan — birinchi chizishda shu til olinadi
      await fontsReady();
      if (!disposed) repaint();
    },
    // kadr siklini to‘xtatadi, hodisalarni olib tashlaydi va WebGL resurslarini bo‘shatadi
    dispose() {
      if (disposed) return;
      disposed = true;
      cancelAnimationFrame(rafId);
      cleanup.forEach(fn => fn());
      renderer.dispose();
    },
  };
}
