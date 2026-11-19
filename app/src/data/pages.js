// =====================================================================
//  Saytdagi alohida sahifalar (bosh sahifadan tashqari).
//
//  Har bir mavzu — o‘z manzilidagi alohida sahifa, uch tilda:
//      /karobka/        /ru/korobki/        /en/boxes/
//  Qidiruv tizimi «karobka», «makulatura», «pechat» kabi har so‘z uchun
//  shu mavzuning o‘z sahifasini ko‘rsatadi.
//
//  id    — sahifaning kod ichidagi nomi (o‘zgartirmang: matnlar, havolalar shu nom bilan bog‘langan);
//  slug  — manzildagi so‘z, har tilda o‘ziniki (faqat kichik lotin harflari, raqam va "-").
//
//  Sahifa matnlari:  src/i18n/texts/pages/<id>.js
//  Yangi sahifa qo‘shsangiz yoki slug ni o‘zgartirsangiz — vercel.json dagi "redirects" ro‘yxatiga ham
//  shu manzilni yozing (yozilmasa `npm run build` to‘xtab, nima qilish kerakligini aytadi).
// =====================================================================
export const HOME = 'home';

export const PAGES = [
  { id: 'boxes', slug: { uz: 'karobka', ru: 'korobki', en: 'boxes' } },
  { id: 'printing', slug: { uz: 'pechat', ru: 'pechat', en: 'printing' } },
  { id: 'board', slug: { uz: 'gofrokarton', ru: 'gofrokarton', en: 'corrugated-board' } },
  { id: 'paper', slug: { uz: 'rulon-qogoz', ru: 'bumaga', en: 'paper-rolls' } },
  { id: 'waste', slug: { uz: 'makulatura', ru: 'makulatura', en: 'waste-paper' } },
];
