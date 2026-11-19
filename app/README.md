# Profpack sayti (React + Vite)

Sayt manba kodi shu `app/` papkasida. Repo ildizidagi `index.html` va `static/` — shu koddan **avtomatik yaratiladi**.

## Nimani qayerda o‘zgartirish kerak

| Nima | Fayl |
|---|---|
| Barcha matnlar (uz / ru / en yonma-yon) | `src/i18n/texts/` — har bo‘lim o‘z faylida (`story.js`, `products.js`, `calc.js`, `faq.js`, `contact.js` …; ro‘yxati `index.js` da) |
| Telefon, Telegram, email, manzil, ish vaqti, forma havolasi (`FORM_ENDPOINT`), `SITE_URL` | `src/data/site.js` |
| Kalkulyator narxlari va boshlang‘ich qiymatlari | `src/data/prices.js` |
| 3D qutidagi hamkor logotiplari | `src/data/partners.js` + rasmlar `src/assets/partners/` |
| Brauzer sarlavhasi va tavsif | `src/i18n/texts/meta.js` (o‘zbekchasini `index.html` da ham) |
| Bo‘limlar tartibi | `src/App.jsx`; har bir bo‘lim — `src/components/` |
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

**OneDrive haqida:** loyiha papkasi OneDrive ichida bo‘lsa (masalan, Desktop), `npm install` yaratadigan `node_modules`
(≈65 MB, 3 000 dan ortiq fayl) ham OneDrive'ga yuklanadi. Ishlaydi, lekin sekinlashtiradi. Repozitoriyni OneDrive'dan
tashqaridagi papkaga (masalan, `C:\dev\profpack-sayt`) klonlab, o‘sha yerda ishlash qulayroq.

## Tillar va tayyor HTML (qidiruv tizimlari uchun)

Har til o‘z manzilida turadi: `/` — o‘zbekcha, `/ru/` — ruscha, `/en/` — inglizcha. `npm run build` sahifani har til uchun
bir martadan Node'da chizib, uchta fayl yozadi: `index.html`, `ru/index.html`, `en/index.html` (`vite.config.js` → `prerender`,
`src/entry-server.jsx`). Shuning uchun matn JavaScript'siz ham HTML ichida bo‘ladi: qidiruv tizimlari uchala tilni alohida
sahifa sifatida o‘qiydi, sekin internetda matn darhol ko‘rinadi. Brauzerda React shu tayyor HTML'ni "jonlantiradi" (`src/main.jsx`).

- Til tugmalari sahifani qayta yuklamaydi, faqat manzilni almashtiradi (`src/i18n/lang.js`). Eski `?lang=ru` havolalari ham ishlaydi.
- Har sahifaga o‘z tilidagi sarlavha va tavsif (`src/i18n/texts/meta.js`), `hreflang` havolalari, `sitemap.xml` va kompaniya
  ma’lumoti (`BUSINESS` — `src/data/site.js`) build paytida o‘zi yoziladi. Sayt manzili — `SITE_URL` (`src/data/site.js`).
- Buning uchun alohida hech narsa qilish shart emas: matnni o‘zgartirib `npm run build` qilsangiz, uchala sahifa ham yangilanadi.
- Komponent chizilayotganda (`return` dan oldin) `window`, `document`, `localStorage` ishlatilmasin — ular faqat
  `useEffect` yoki hodisa ishlovchilari (onClick …) ichida bo‘lsin, aks holda build xato beradi.

## Saytga chiqarish

1. `app/` ichida o‘zgartiring, `npm run dev` bilan tekshiring.
2. `npm run build` — repo ildiziga `index.html`, `ru/`, `en/`, `static/`, `assets/`, sayt belgisi, `robots.txt`, `sitemap.xml` yoziladi (eski `static/` avval o‘chiriladi).
3. `app/` va ildizdagi shu fayllarni commit qilib, `main` ga push qiling.
4. GitHub Pages taxminan bir daqiqada yangilanadi.

**Diqqat:** ildizdagi `index.html` va `static/` qo‘lda tahrirlanmaydi — keyingi `npm run build` ularni qayta yozadi.

## Vercel

Loyiha Vercel'da ham yig‘iladi (sozlamalar — `vercel.json`). Vercel `npm run build` ni o‘zi ishga tushiradi va tayyor
saytni `app/dist` dan oladi; repo ildizidagi `index.html` va `static/` unga kerak emas (ular GitHub Pages uchun).

- Qo‘lda chiqarish: `cd app` → `npx vercel deploy --prod` (birinchi marta `npx vercel login`).
- Vercel loyihasi GitHub repozitoriyga ulangan bo‘lsa, Root Directory — `app`; har `push` dan keyin sayt o‘zi yangilanadi.
