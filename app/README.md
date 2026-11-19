# Profpack sayti (React + Vite)

Sayt manba kodi shu `app/` papkasida. Repo ildizidagi `index.html`, sahifa papkalari (`ru/`, `en/`, `karobka/` …) va `static/` — shu koddan **avtomatik yaratiladi**.

## Nimani qayerda o‘zgartirish kerak

| Nima | Fayl |
|---|---|
| Bosh sahifa matnlari (uz / ru / en yonma-yon) | `src/i18n/texts/` — har bo‘lim o‘z faylida (`story.js`, `products.js`, `calc.js`, `faq.js`, `contact.js` …; ro‘yxati `index.js` da) |
| Alohida sahifalar matnlari (karobka, pechat, gofrokarton, rulon qog‘oz, makulatura) | `src/i18n/texts/pages/` — har sahifa bitta faylda |
| Alohida sahifalar ro‘yxati va manzillari | `src/data/pages.js` |
| Telefon, Telegram, email, manzil, ish vaqti, forma havolasi (`FORM_ENDPOINT`), `SITE_URL` | `src/data/site.js` |
| Kalkulyator narxlari va boshlang‘ich qiymatlari | `src/data/prices.js` |
| 3D qutidagi hamkor logotiplari | `src/data/partners.js` + rasmlar `src/assets/partners/` |
| Brauzer sarlavhasi va tavsif | bosh sahifa — `src/i18n/texts/meta.js` (o‘zbekchasini `index.html` da ham); alohida sahifalar — o‘z faylidagi `meta` |
| Bosh sahifa bo‘limlari tartibi | `src/App.jsx`; har bir bo‘lim — `src/components/` |
| Alohida sahifalar qolipi | `src/components/TopicPage.jsx` |
| Ko‘rinish (CSS) | `src/styles.css` |
| 3D sahna | `src/three/createScene.js` |
| Forma qabul qiluvchi (Google Apps Script) | `apps-script/Code.gs` |

Matn shunday yoziladi: `{ uz: 'Mahsulotlar', ru: 'Продукция', en: 'Products' }` — bitta joyda uch til.

## Ishga tushirish

```
cd app
npm install      # faqat birinchi marta
npm run dev      # ko‘rish: terminalda chiqqan manzilni brauzerda oching
npm run build    # tayyor saytni repo ildiziga yozadi
```

Kerak bo‘ladi: [Node.js](https://nodejs.org) 18 yoki undan yangi.

`npm run dev` da alohida sahifalar ham ochiladi: manzil oxiriga `/karobka/`, `/ru/korobki/` va h.k. qo‘shing.

**OneDrive haqida:** loyiha papkasi OneDrive ichida bo‘lsa (masalan, Desktop), `npm install` yaratadigan `node_modules`
(≈65 MB, 3 000 dan ortiq fayl) ham OneDrive'ga yuklanadi. Ishlaydi, lekin sekinlashtiradi. Repozitoriyni OneDrive'dan
tashqaridagi papkaga (masalan, `C:\dev\profpack-sayt`) klonlab, o‘sha yerda ishlash qulayroq.

## Alohida sahifalar (qidiruv uchun)

Odamlar «karobka», «makulatura qabul qilish», «karobkaga pechat» kabi har xil so‘zlar bilan qidiradi. Qidiruv tizimi
har so‘rovga shu mavzuning **o‘z sahifasini** ko‘rsatadi, shuning uchun har mavzu alohida sahifada turadi:

| Mavzu | O‘zbekcha | Ruscha | Inglizcha | Matn fayli |
|---|---|---|---|---|
| Karobka | `/karobka/` | `/ru/korobki/` | `/en/boxes/` | `pages/boxes.js` |
| Pechat | `/pechat/` | `/ru/pechat/` | `/en/printing/` | `pages/printing.js` |
| Gofrokarton | `/gofrokarton/` | `/ru/gofrokarton/` | `/en/corrugated-board/` | `pages/board.js` |
| Rulon qog‘oz | `/rulon-qogoz/` | `/ru/bumaga/` | `/en/paper-rolls/` | `pages/paper.js` |
| Makulatura | `/makulatura/` | `/ru/makulatura/` | `/en/waste-paper/` | `pages/waste.js` |

Har sahifaning matn faylida: `meta` — Google'da chiqadigan sarlavha (60 belgigacha) va tavsif (160 belgigacha),
`h1` — sahifa sarlavhasi, `lead` — kirish matni, `facts` — o‘ngdagi kartochka, `blocks` — bo‘limlar, `faq` — savol-javoblar.
Odamlar qidiradigan so‘zlar aynan `meta.title`, `h1` va matn ichida turishi kerak — lekin matn avvalo odam o‘qishi uchun yoziladi.
Yozilgan har bir gap rost bo‘lsin (narxlar `src/data/prices.js` dan o‘zi olinadi).

**Yangi sahifa qo‘shish:**

1. `src/data/pages.js` ga qator qo‘shing (`id` va uch tildagi `slug`).
2. `src/i18n/texts/pages/` da shu sahifaning matn faylini yarating (namuna — `boxes.js`) va `pages/index.js` dagi `TOPICS` ga yozing.
3. `vercel.json` dagi `redirects` → `source` ichiga yangi manzillarni qo‘shing (masalan, `|yangi-sahifa/?$|ru/novaya/?$|en/new-page/?$`).
   Qo‘shilmasa, Vercel bu manzilni bosh sahifaga yo‘naltirib yuboradi — `npm run build` buni tekshiradi va xatoni aytadi.
4. `npm run build`. Sahifa menyu, footer, sayt xaritasi (`sitemap.xml`) va boshqa sahifalardagi havolalarga o‘zi qo‘shiladi.

Sahifalar orasidagi havolalar kodda `href('boxes')` ko‘rinishida yoziladi (`useLang()` dan) — manzil til va joriy sahifaga
qarab o‘zi hisoblanadi.

## Tillar va tayyor HTML (qidiruv tizimlari uchun)

Har til o‘z manzilida turadi: `/` — o‘zbekcha, `/ru/` — ruscha, `/en/` — inglizcha (alohida sahifalar ham xuddi shunday).
`npm run build` har sahifani har til uchun bir martadan Node'da chizib, o‘z fayliga yozadi: `index.html`, `ru/index.html`,
`karobka/index.html`, `ru/korobki/index.html` … (`vite.config.js` → `prerender`, `src/entry-server.jsx`). Shuning uchun matn
JavaScript'siz ham HTML ichida bo‘ladi: qidiruv tizimlari har sahifani har tilda alohida o‘qiydi, sekin internetda matn darhol
ko‘rinadi. Brauzerda React shu tayyor HTML'ni "jonlantiradi" (`src/main.jsx`).

- Til tugmalari sahifani qayta yuklamaydi, faqat manzilni almashtiradi (`src/i18n/lang.js`). Eski `?lang=ru` havolalari ham ishlaydi.
- Brauzeri rus tilida bo‘lgan odamga sahifa ruscha ochiladi; qidiruv robotlari esa har manzilda shu manzilning o‘z tilini ko‘radi.
- Har sahifaga o‘z tilidagi sarlavha va tavsif, `hreflang` havolalari, `sitemap.xml` va kompaniya ma’lumoti
  (`BUSINESS` — `src/data/site.js`) build paytida o‘zi yoziladi. Sayt manzili — `SITE_URL` (`src/data/site.js`).
- Google Search Console va Yandex Webmaster tasdiqlash kodlari — `src/data/site.js` dagi `VERIFY`.
- Buning uchun alohida hech narsa qilish shart emas: matnni o‘zgartirib `npm run build` qilsangiz, hamma sahifa yangilanadi.
- Komponent chizilayotganda (`return` dan oldin) `window`, `document`, `localStorage` ishlatilmasin — ular faqat
  `useEffect` yoki hodisa ishlovchilari (onClick …) ichida bo‘lsin, aks holda build xato beradi.

## Saytga chiqarish

1. `app/` ichida o‘zgartiring, `npm run dev` bilan tekshiring.
2. `npm run build` — repo ildiziga `index.html`, sahifa papkalari (`ru/`, `en/`, `karobka/`, `pechat/`, `gofrokarton/`,
   `rulon-qogoz/`, `makulatura/`), `static/`, `assets/`, sayt belgisi, `robots.txt`, `sitemap.xml` yoziladi (eski `static/` avval o‘chiriladi).
3. `app/` va ildizdagi shu fayl va papkalarni commit qilib, `main` ga push qiling.
4. GitHub Pages bir necha daqiqada yangilanadi.

**Diqqat:** ildizdagi `index.html`, sahifa papkalari va `static/` qo‘lda tahrirlanmaydi — keyingi `npm run build` ularni qayta yozadi.

## Vercel

Loyiha Vercel'da ham yig‘iladi (sozlamalar — `vercel.json`). Vercel `npm run build` ni o‘zi ishga tushiradi va tayyor
saytni `app/dist` dan oladi; repo ildizidagi `index.html` va `static/` unga kerak emas (ular GitHub Pages uchun).

- Qo‘lda chiqarish: `cd app` → `npx vercel deploy --prod` (birinchi marta `npx vercel login`).
- Vercel loyihasi GitHub repozitoriyga ulangan bo‘lsa, Root Directory — `app`; har `push` dan keyin sayt o‘zi yangilanadi.
- `vercel.json` dagi `redirects`: saytda yo‘q manzillar (eski sayt sahifalari) bosh sahifaga yo‘naltiriladi. Mavjud sahifalar
  shu qoidadagi istisnolar ro‘yxatida turadi — yangi sahifa qo‘shganda uni ham yozish kerak (yuqoriga qarang).
