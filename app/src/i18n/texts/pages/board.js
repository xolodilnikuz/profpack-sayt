// «Gofrokarton» sahifasi:  /gofrokarton/  ·  /ru/gofrokarton/  ·  /en/corrugated-board/
// Odamlar qidiradigan so‘zlar: gofrokarton, gofra karton, gofrokarton narxi; гофрокартон, листовой гофрокартон, гофролист.
// Maydonlar izohi — boxes.js boshida.
import { PRICE, FAQ, num } from '../faq.js';
import { NEED } from '../contact.js';
import { products } from '../products.js';
import { PHONE } from '../../../data/site.js';

export const board = {
  nav: { uz: 'Gofrokarton', ru: 'Гофрокартон', en: 'Board' },
  short: { uz: '3 va 5 qatlamli gofrokarton listlar', ru: 'Листы 3- и 5-слойного гофрокартона', en: '3- and 5-layer corrugated sheets' },
  meta: {
    title: {
      uz: 'Gofrokarton listlar, 3 va 5 qatlamli — Profpack, Toshkent',
      ru: 'Гофрокартон листовой 3- и 5-слойный в Ташкенте — Profpack',
      en: 'Corrugated board sheets, 3- and 5-layer — Profpack, Tashkent',
    },
    description: {
      uz: `3 va 5 qatlamli gofrokarton (gofra karton) listlar kerakli formatda, zavodning o‘zidan. 1 m² narxi ${num(PRICE.blankMin)} so‘mdan. Profpack, Toshkent. Tel: ${PHONE.display}.`,
      ru: `Листовой гофрокартон 3- и 5-слойный в нужном формате от производителя. Цена от ${num(PRICE.blankMin)} сум за 1 м². Profpack, Ташкент. Тел.: ${PHONE.display}.`,
      en: `3- and 5-layer corrugated board sheets cut to your format, direct from the manufacturer. From ${num(PRICE.blankMin, ',')} UZS per m². Profpack, Tashkent. Tel: ${PHONE.display}.`,
    },
  },
  h1: [
    { uz: 'Gofrokarton listlar', ru: 'Листовой гофрокартон', en: 'Corrugated board' },
    { uz: '3 va 5 qatlamli', ru: '3- и 5-слойный', en: '3- and 5-layer sheets' },
  ],
  lead: {
    uz: 'Gofrokartonni (gofra karton) o‘zimiz ishlab chiqargan qog‘ozdan tayyorlaymiz va kerakli formatdagi listlarga — zagotovkalarga kesib beramiz.',
    ru: 'Делаем гофрокартон из бумаги собственного производства и раскраиваем его в листы (гофролисты, заготовки) нужного формата.',
    en: 'We make corrugated board from our own paper and cut it into sheets (blanks) of the format you need.',
  },
  cta: products.cta,
  need: NEED.sheets,
  art: 'sheets',
  tags: [
    { uz: '3 qatlamli (T)', ru: '3-слойный (Т)', en: '3-layer (T)' },
    { uz: '5 qatlamli (P)', ru: '5-слойный (П)', en: '5-layer (P)' },
    { uz: 'Formatga kesish', ru: 'Раскрой в формат', en: 'Cut to format' },
  ],
  facts: [
    [{ uz: 'Qatlam', ru: 'Слои', en: 'Layers' }, { uz: '3 (T) va 5 (P)', ru: '3 (Т) и 5 (П)', en: '3 (T) and 5 (P)' }],
    [{ uz: 'Format', ru: 'Формат', en: 'Format' }, { uz: 'Buyurtma bo‘yicha', ru: 'По заказу', en: 'Made to order' }],
    [{ uz: 'Marka', ru: 'Марка', en: 'Grade' }, { uz: 'Yuk va taxlashga qarab', ru: 'По нагрузке и штабелированию', en: 'Based on load and stacking' }],
    [{ uz: 'Narx', ru: 'Цена', en: 'Price' }, { uz: `1 m² — ${num(PRICE.blankMin)} so‘mdan`, ru: `от ${num(PRICE.blankMin)} сум за 1 м²`, en: `from ${num(PRICE.blankMin, ',')} UZS per m²` }],
  ],

  blocks: [
    {
      type: 'text',
      title: { uz: 'Gofrokarton qanday tuzilgan', ru: 'Как устроен гофрокартон', en: 'How corrugated board is built' },
      paras: [
        {
          uz: 'Gofrokarton — tekis qatlamlar (testlayner) orasiga to‘lqinli qatlam (flyuting) kraxmal yelim bilan yopishtirilgan karton.',
          ru: 'Гофрокартон — это картон, в котором волнистый слой (флютинг) вклеен крахмальным клеем между плоскими слоями (тестлайнер).',
          en: 'Corrugated board is a fluted layer (fluting) bonded with starch adhesive between flat layers (testliner).',
        },
        {
          uz: 'Bitta to‘lqinli qatlam — 3 qatlamli (T markalari), ikkitasi — 5 qatlamli (P markalari) gofrokarton.',
          ru: 'Один гофрослой — это 3-слойный гофрокартон (марки Т), два — 5-слойный (марки П).',
          en: 'One fluted layer makes 3-layer board (T grades); two make 5-layer board (P grades).',
        },
        {
          uz: 'To‘lqin kartonni yengil, lekin egilish va siqilishga chidamli qiladi — shuning uchun gofrokarton qadoqning asosiy materiali.',
          ru: 'Гофр делает картон лёгким, но стойким к изгибу и сжатию — поэтому гофрокартон остаётся основным материалом для упаковки.',
          en: 'The flutes make the board light yet resistant to bending and compression, which is why corrugated board is the main packaging material.',
        },
      ],
    },
    {
      type: 'cards',
      title: { uz: 'Qatlam, profil va marka', ru: 'Слои, профиль и марка', en: 'Layers, flutes and grades' },
      items: [
        {
          title: { uz: '3 qatlamli (T)', ru: '3-слойный (Т)', en: '3-layer (T)' },
          text: {
            uz: 'Ikki tekis qatlam orasida bitta to‘lqinli qatlam. Yengil va o‘rtacha og‘irlikdagi mahsulotlar qadog‘i uchun.',
            ru: 'Один гофрослой между двумя плоскими слоями. Для упаковки лёгких и средних по весу товаров.',
            en: 'One fluted layer between two flat liners. For packaging light and medium-weight goods.',
          },
        },
        {
          title: { uz: '5 qatlamli (P)', ru: '5-слойный (П)', en: '5-layer (P)' },
          text: {
            uz: 'Ikkita to‘lqinli qatlam — og‘ir yuklar va baland taxlash uchun mustahkamroq karton.',
            ru: 'Два гофрослоя — более прочный картон для тяжёлых грузов и высокого штабеля.',
            en: 'Two fluted layers: a stronger board for heavy loads and high stacks.',
          },
        },
        {
          title: { uz: 'E, B va C profillar', ru: 'Профили E, B и C', en: 'E, B and C flutes' },
          text: {
            uz: 'Profil — to‘lqin balandligi. GOST 7376-89 bo‘yicha: E — 1,1–1,6 mm, B — 2,2–3,2 mm, C — 3,2–4,4 mm.',
            ru: 'Профиль — это высота гофра. По ГОСТ 7376-89: E — 1,1–1,6 мм, B — 2,2–3,2 мм, C — 3,2–4,4 мм.',
            en: 'The flute profile is the wave height. Per GOST 7376-89: E is 1.1–1.6 mm, B is 2.2–3.2 mm, C is 3.2–4.4 mm.',
          },
        },
        {
          title: { uz: 'Marka tanlash', ru: 'Выбор марки', en: 'Choosing a grade' },
          text: {
            uz: 'Bir sinf ichida marka raqami qancha katta bo‘lsa, karton qirraviy siqilishga shuncha chidamli. Markani yuk og‘irligi va taxlash balandligiga qarab tanlab beramiz.',
            ru: 'В пределах одного класса чем больше номер марки, тем выше сопротивление торцевому сжатию. Марку подберём по весу груза и высоте штабеля.',
            en: 'Within one class, the higher the grade number, the higher the edge crush resistance. We choose the grade by load weight and stacking height.',
          },
        },
      ],
    },
    { type: 'calc', kind: 'blank' },
    { type: 'how' },
  ],

  faq: [
    {
      q: { uz: 'Gofrokarton narxi qancha?', ru: 'Сколько стоит гофрокартон?', en: 'How much does corrugated board cost?' },
      a: {
        uz: `Narx markaga bog‘liq: gofrokarton list (zagotovka) uchun 1 m² ${num(PRICE.blankMin)} so‘mdan ${num(PRICE.blankMax)} so‘mgacha. List uzunligi va enini kalkulyatorga kiriting — bir dona va butun partiya narxi darhol chiqadi.`,
        ru: `Цена зависит от марки: лист гофрокартона (заготовка) стоит от ${num(PRICE.blankMin)} до ${num(PRICE.blankMax)} сум за 1 м². Введите длину и ширину листа в калькулятор — он сразу покажет цену за штуку и за всю партию.`,
        en: `The price depends on the grade: a corrugated sheet (blank) costs from ${num(PRICE.blankMin, ',')} to ${num(PRICE.blankMax, ',')} UZS per m². Enter the sheet length and width in the calculator to see the price per piece and for the whole batch.`,
      },
    },
    FAQ.layers,
    FAQ.flutes,
    FAQ.moq,
  ],
};
