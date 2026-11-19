// «Makulatura topshiring» bo‘limi.
import { NEED } from './contact.js';

export const waste = {
  title: { uz: 'Makulatura topshiring', ru: 'Сдайте макулатуру', en: 'Sell us your waste paper' },
  lead: {
    uz: 'Korxonalar, do‘konlar, omborlar va bosmaxonalardan makulatura qabul qilamiz. Narx navi va hajmiga qarab kelishiladi.',
    ru: 'Принимаем макулатуру от предприятий, магазинов, складов и типографий. Цена зависит от марки и объёма.',
    en: 'We accept waste paper from businesses, shops, warehouses and print shops. The price depends on grade and volume.',
  },
  req: {
    uz: 'GOST 10700-97 talablari: namlik — 15% dan ko‘p emas, har bir toyda bitta nav, sim, skoba, qum va oziq-ovqat qoldiqlarisiz.',
    ru: 'Требования ГОСТ 10700-97: влажность — не более 15%, в одной кипе — одна марка, без проволоки, скоб, песка и остатков пищи.',
    en: 'GOST 10700-97 requirements: moisture no more than 15%, one grade per bale, no wire, staples, sand or food residue.',
  },
  // need — bosilganda so‘rov formasidagi «Nima kerak?» tanlovi
  cta: { label: { uz: 'Makulatura topshirish', ru: 'Сдать макулатуру', en: 'Sell waste paper' }, need: NEED.waste },
  call: { uz: 'Qo‘ng‘iroq qilish', ru: 'Позвонить', en: 'Call us' },
  // «Makulatura» sahifasiga havola (/makulatura/)
  more: { uz: 'Makulatura qabul qilish haqida batafsil', ru: 'Подробнее о приёме макулатуры', en: 'More about selling us waste paper' },

  acceptTitle: { uz: 'Qabul qilamiz', ru: 'Принимаем', en: 'We accept' },
  accept: [
    { uz: 'Gofrokarton va eski qutilar — MS-5B', ru: 'Гофрокартон и б/у коробки — МС-5Б', en: 'Corrugated board and used boxes — MS-5B' },
    { uz: 'Bosma karton va karton qadoq — MS-6B', ru: 'Печатный картон и картонная упаковка — МС-6Б', en: 'Printed board and cardboard packaging — MS-6B' },
    { uz: 'Kitob, jurnal va daftarlar (muqovasiz) — MS-7B', ru: 'Книги, журналы и тетради (без обложек) — МС-7Б', en: 'Books, magazines and notebooks (without covers) — MS-7B' },
    { uz: 'Ofis qog‘ozi va arxiv hujjatlari', ru: 'Офисная бумага и архивные документы', en: 'Office paper and archive documents' },
    { uz: 'Gazetalar — MS-8V', ru: 'Газеты — МС-8В', en: 'Newspapers — MS-8V' },
  ],

  rejectTitle: { uz: 'Qabul qilmaymiz', ru: 'Не принимаем', en: 'We do not accept' },
  reject: [
    { uz: 'Plyonka yoki polietilen qoplamali qog‘oz, tetrapak', ru: 'Бумага с плёнкой или полиэтиленовым покрытием, тетрапак', en: 'Film- or polyethylene-coated paper, Tetra Pak' },
    { uz: 'Parafinli, yog‘li va bitumli qog‘oz', ru: 'Парафинированная, жирная и битумированная бумага', en: 'Waxed, greasy and bitumen-coated paper' },
    { uz: 'Folga, metallashtirilgan qog‘oz va fotoqog‘oz', ru: 'Фольга, металлизированная бумага и фотобумага', en: 'Foil, metallised paper and photo paper' },
    { uz: 'Kassa cheklari (termoqog‘oz)', ru: 'Кассовые чеки (термобумага)', en: 'Till receipts (thermal paper)' },
    { uz: 'Nam, kuygan yoki chirigan makulatura', ru: 'Мокрая, горелая или гнилая макулатура', en: 'Wet, burnt or rotten waste paper' },
  ],
};
