// 3D hikoya: bosh ekran (hero) va 5 ta ishlab chiqarish bosqichi.
// Qutidagi 3D bosma yozuvlar — scene3d.js da.
import { NEED } from './contact.js';

export const story = {
  aria: { uz: 'Ishlab chiqarish jarayoni', ru: 'Процесс производства', en: 'Production process' },
  trackerAria: { uz: 'Bosqichlar', ru: 'Этапы', en: 'Stages' },
};

export const hero = {
  // sarlavha ikki qatori (ikkinchisi kraft rangida)
  title: [
    { uz: 'Makulaturadan', ru: 'От макулатуры', en: 'From waste paper' },
    { uz: 'brendli qutigacha', ru: 'до фирменной коробки', en: 'to branded boxes' },
  ],
  lead: {
    uz: 'Profpack — to‘liq siklli qadoq zavodi. Makulaturani qayta ishlaymiz, rulon qog‘oz va gofrokarton ishlab chiqaramiz, undan quti yasab, logotipingizni bosamiz.',
    ru: 'Profpack — завод упаковки полного цикла. Перерабатываем макулатуру, выпускаем рулонную бумагу и гофрокартон, делаем из него коробки и печатаем на них ваш логотип.',
    en: 'Profpack is a full-cycle packaging plant. We recycle waste paper, produce paper rolls and corrugated board, turn it into boxes and print your logo on them.',
  },
  see: { uz: 'Jarayonni ko‘rish', ru: 'Смотреть процесс', en: 'See the process' },
  cue: { uz: 'Aylantiring — quti qanday tug‘ilishini ko‘rasiz', ru: 'Листайте — увидите, как рождается коробка', en: 'Scroll to see how a box is born' },
};

// bosqichlar (tartib 3D animatsiya bilan bog‘liq — 5 ta qolishi kerak).
// tracker — pastdagi bosqichlar chizig‘idagi qisqa nomi; cta — bosqich ostidagi tugma (ixtiyoriy)
export const steps = [
  {
    tracker: { uz: 'Makulatura', ru: 'Макулатура', en: 'Waste paper' },
    title: { uz: 'Makulatura qabul qilish', ru: 'Приём макулатуры', en: 'Waste paper intake' },
    text: {
      uz: 'Zavodga eski karton qutilar, bosma karton, kitob-jurnallar, ofis qog‘ozi va gazetalar keladi. Makulatura GOST 10700-97 navlari bo‘yicha saralanadi va plyonka, metall, skoba kabi aralashmalardan tozalanadi.',
      ru: 'На завод поступают старые картонные коробки, печатный картон, книги и журналы, офисная бумага и газеты. Макулатуру сортируют по маркам ГОСТ 10700-97 и очищают от плёнки, металла, скоб и других примесей.',
      en: 'Old cardboard boxes, printed board, books and magazines, office paper and newspapers arrive at the plant. Waste paper is sorted by GOST 10700-97 grades and cleaned of film, metal, staples and other contaminants.',
    },
    tags: [
      { uz: 'MS-5B — gofrokarton', ru: 'МС-5Б — гофрокартон', en: 'MS-5B — corrugated board' },
      { uz: 'MS-6B — bosma karton', ru: 'МС-6Б — печатный картон', en: 'MS-6B — printed board' },
      { uz: 'MS-7B — kitob, jurnal', ru: 'МС-7Б — книги, журналы', en: 'MS-7B — books, magazines' },
      { uz: 'MS-8V — gazetalar', ru: 'МС-8В — газеты', en: 'MS-8V — newspapers' },
    ],
  },
  {
    tracker: { uz: 'Rulon qog‘oz', ru: 'Рулонная бумага', en: 'Paper rolls' },
    title: { uz: 'Qayta ishlash va rulon qog‘oz', ru: 'Переработка и рулонная бумага', en: 'Recycling and paper rolls' },
    text: {
      uz: 'Makulatura maydalanadi va gidrorazbivatelda suv bilan aralashtirilib, qog‘oz massasiga aylanadi. Massa tozalanadi, qog‘oz-karton mashinasida presslanadi, quritiladi va rulonlarga o‘raladi: tekis qatlam uchun testlayner, to‘lqinli qatlam uchun flyuting.',
      ru: 'Макулатуру измельчают и распускают в воде в гидроразбивателе до бумажной массы. Массу очищают, на бумагоделательной машине прессуют, сушат и сматывают в рулоны: тестлайнер для плоских слоёв, флютинг для гофрированного слоя.',
      en: 'Waste paper is shredded and pulped with water in a hydropulper. The pulp is cleaned, then pressed and dried on the paper machine and wound into rolls: testliner for the flat layers, fluting for the corrugated layer.',
    },
    tags: [
      { uz: 'Maydalash', ru: 'Измельчение', en: 'Shredding' },
      { uz: 'Massa tayyorlash', ru: 'Массоподготовка', en: 'Stock preparation' },
      { uz: 'Presslash va quritish', ru: 'Прессование и сушка', en: 'Pressing and drying' },
      { uz: 'Rulonga o‘rash', ru: 'Намотка в рулоны', en: 'Winding into rolls' },
    ],
  },
  {
    tracker: { uz: 'Gofrokarton', ru: 'Гофрокартон', en: 'Corrugated board' },
    title: { uz: 'Gofrokarton ishlab chiqarish', ru: 'Производство гофрокартона', en: 'Corrugated board production' },
    text: {
      uz: 'Gofroagregatda flyuting rifli vallar orasidan o‘tib, to‘lqin shakliga keladi va kraxmal yelim bilan testlayner qatlamlariga yopishtiriladi. Bitta to‘lqinli qatlam — 3 qatlamli, ikkitasi — 5 qatlamli gofrokarton.',
      ru: 'На гофроагрегате флютинг проходит между рифлёными валами, приобретает волнистую форму и склеивается крахмальным клеем со слоями тестлайнера. Один гофрослой — 3-слойный гофрокартон, два — 5-слойный.',
      en: 'On the corrugator, fluting passes between fluted rolls, takes on a wave shape and is bonded to testliner layers with starch adhesive. One fluted layer makes 3-layer board, two make 5-layer board.',
    },
    tags: [
      { uz: '3 qatlamli (T)', ru: '3-слойный (Т)', en: '3-layer (T)' },
      { uz: '5 qatlamli (P)', ru: '5-слойный (П)', en: '5-layer (P)' },
      { uz: 'Kraxmal yelim', ru: 'Крахмальный клей', en: 'Starch adhesive' },
    ],
  },
  {
    tracker: { uz: 'Quti', ru: 'Коробка', en: 'Box' },
    title: { uz: 'Quti yasash', ru: 'Изготовление коробок', en: 'Box making' },
    text: {
      uz: 'Gofrokarton listlari o‘lchamga kesiladi, bigovka qilinadi, kerak bo‘lsa shtamp bilan kesiladi (vysechka) va yelimlanadi. Standart to‘rt klapanli qutidan (FEFCO 0201) o‘zi yig‘iladigan qutilar, lotoklar va panjaralargacha.',
      ru: 'Листы гофрокартона раскраивают по размеру, бигуют, при необходимости вырубают штампом (высечка) и склеивают. От стандартной четырёхклапанной коробки (FEFCO 0201) до самосборных коробок, лотков и решёток.',
      en: 'Corrugated sheets are cut to size, creased, die-cut where needed and glued. From the standard four-flap box (FEFCO 0201) to self-assembly boxes, trays and partitions.',
    },
    tags: [
      'FEFCO 0201',
      'FEFCO 0427',
      { uz: 'Lotok va panjaralar', ru: 'Лотки и решётки', en: 'Trays and partitions' },
    ],
  },
  {
    tracker: { uz: 'Pechat', ru: 'Печать', en: 'Printing' },
    title: { uz: 'Pechat — brendingiz qutida', ru: 'Печать — ваш бренд на коробке', en: 'Printing — your brand on the box' },
    text: {
      uz: 'Logotip, dizayn va markirovka qutiga fleksografik usulda bosiladi — manipulyatsion belgilar, shtrix- va QR-kodlar ham. Ishlatilgan quti esa yana makulaturaga aylanadi — aylana yopiladi.',
      ru: 'Логотип, дизайн и маркировку наносят флексографской печатью — включая манипуляционные знаки, штрих- и QR-коды. А использованная коробка снова становится макулатурой — круг замыкается.',
      en: 'Your logo, design and markings are flexo-printed on the box, including handling symbols, barcodes and QR codes. A used box becomes waste paper again, and the loop is closed.',
    },
    tags: [
      { uz: 'Fleksobosma', ru: 'Флексопечать', en: 'Flexo printing' },
      { uz: 'Logotip va markirovka', ru: 'Логотип и маркировка', en: 'Logo and markings' },
      { uz: 'Shtrix- va QR-kod', ru: 'Штрих- и QR-коды', en: 'Barcodes and QR codes' },
    ],
    // need — bosilganda so‘rov formasidagi «Nima kerak?» tanlovi
    cta: { label: { uz: 'Brendli quti buyurtma qilish', ru: 'Заказать коробки с логотипом', en: 'Order branded boxes' }, need: NEED.branded },
  },
];
