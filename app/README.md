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

## Saytga chiqarish

1. `app/` ichida o‘zgartiring, `npm run dev` bilan tekshiring.
2. `npm run build` — repo ildiziga `index.html`, `static/`, `assets/`, `.nojekyll` yoziladi (eski `static/` avval o‘chiriladi).
3. `app/` va ildizdagi shu fayllarni commit qilib, `main` ga push qiling.
4. GitHub Pages taxminan bir daqiqada yangilanadi.

**Diqqat:** ildizdagi `index.html` va `static/` qo‘lda tahrirlanmaydi — keyingi `npm run build` ularni qayta yozadi.
