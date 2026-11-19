// «Makulatura» sahifasi:  /makulatura/  ·  /ru/makulatura/  ·  /en/waste-paper/
// Odamlar qidiradigan so‘zlar: makulatura (makalatura) qabul qilish, makulatura topshirish, makulatura narxi;
// приём макулатуры, сдать макулатуру, сдать картон.
// «Qabul qilamiz / qilmaymiz» ro‘yxatlari va GOST talablari — bosh sahifadagi bilan bitta joyda: ../waste.js
// Maydonlar izohi — boxes.js boshida.
import { FAQ } from '../faq.js';
import { waste } from '../waste.js';
import { ADDRESS, HOURS, PHONE } from '../../../data/site.js';

const lower = s => s.charAt(0).toLowerCase() + s.slice(1);   // "Har kuni, 08:00–18:00" → gap ichida kichik harf bilan

export const wastePage = {
  nav: { uz: 'Makulatura', ru: 'Макулатура', en: 'Waste paper' },
  short: { uz: 'Makulatura qabul qilamiz', ru: 'Принимаем макулатуру', en: 'We buy waste paper' },
  meta: {
    title: {
      uz: 'Makulatura qabul qilish Toshkentda — Profpack zavodi',
      ru: 'Приём макулатуры в Ташкенте, сдать картон — Profpack',
      en: 'We buy waste paper and cardboard in Tashkent — Profpack',
    },
    description: {
      uz: `Makulatura qabul qilamiz: karton, eski karobka, kitob-jurnal, ofis qog‘ozi, gazeta. Narx navi va hajmiga qarab. Profpack, Toshkent. Tel: ${PHONE.display}.`,
      ru: `Принимаем макулатуру от предприятий, магазинов и складов: картон, б/у коробки, книги, офисная бумага, газеты. Завод Profpack, Ташкент. Тел.: ${PHONE.display}.`,
      en: `We buy waste paper from businesses, shops and warehouses: cardboard, used boxes, books, office paper, newspapers. Profpack, Tashkent. Tel: ${PHONE.display}.`,
    },
  },
  h1: [
    { uz: 'Makulatura', ru: 'Приём', en: 'We buy' },
    { uz: 'qabul qilish', ru: 'макулатуры', en: 'waste paper' },
  ],
  lead: {
    uz: 'Korxonalar, do‘konlar, omborlar va bosmaxonalardan makulatura qabul qilamiz: karton, eski karobkalar, kitob-jurnallar, ofis qog‘ozi va gazetalar. Narx navi va hajmiga qarab kelishiladi.',
    ru: 'Принимаем макулатуру от предприятий, магазинов, складов и типографий: картон, б/у коробки, книги и журналы, офисную бумагу и газеты. Цена зависит от марки и объёма.',
    en: 'We buy waste paper from businesses, shops, warehouses and print shops: cardboard, used boxes, books and magazines, office paper and newspapers. The price depends on grade and volume.',
  },
  cta: waste.cta.label,
  need: waste.cta.need,
  art: 'bale',
  tags: [
    { uz: 'Karton va eski karobkalar', ru: 'Картон и б/у коробки', en: 'Cardboard and used boxes' },
    { uz: 'Kitob va jurnallar', ru: 'Книги и журналы', en: 'Books and magazines' },
    { uz: 'Ofis qog‘ozi', ru: 'Офисная бумага', en: 'Office paper' },
    { uz: 'Gazetalar', ru: 'Газеты', en: 'Newspapers' },
  ],
  facts: [
    [{ uz: 'Kimdan', ru: 'От кого', en: 'From' }, { uz: 'Korxona, do‘kon, ombor, bosmaxona', ru: 'Предприятия, магазины, склады, типографии', en: 'Businesses, shops, warehouses, print shops' }],
    [{ uz: 'Navlar', ru: 'Марки', en: 'Grades' }, { uz: 'MS-5B, MS-6B, MS-7B, MS-8V', ru: 'МС-5Б, МС-6Б, МС-7Б, МС-8В', en: 'MS-5B, MS-6B, MS-7B, MS-8V' }],
    [{ uz: 'Namlik', ru: 'Влажность', en: 'Moisture' }, { uz: '15% dan ko‘p emas', ru: 'не более 15%', en: 'no more than 15%' }],
    [{ uz: 'Narx', ru: 'Цена', en: 'Price' }, { uz: 'Navi va hajmiga qarab', ru: 'По марке и объёму', en: 'By grade and volume' }],
    [{ uz: 'Manzil', ru: 'Адрес', en: 'Address' }, ADDRESS],
    [{ uz: 'Ish vaqti', ru: 'Время работы', en: 'Hours' }, HOURS],
  ],
  // so‘rov formasi ustidagi matn (boshqa sahifalarda — contact.js dagi umumiy matn)
  contactLead: {
    uz: 'Qanday makulatura va taxminan qancha borligini yozing — narx va topshirish tartibi bo‘yicha siz bilan bog‘lanamiz.',
    ru: 'Напишите, какая у вас макулатура и примерный объём, — свяжемся с вами и согласуем цену и порядок сдачи.',
    en: 'Tell us what waste paper you have and roughly how much, and we will get back to you about the price and delivery terms.',
  },

  blocks: [
    // «Qabul qilamiz / qilmaymiz» ro‘yxatlari (../waste.js) va GOST talablari
    { type: 'lists', title: { uz: 'Qanday makulatura qabul qilinadi', ru: 'Какую макулатуру принимаем', en: 'What waste paper we accept' } },
    {
      type: 'text',
      title: { uz: 'Makulatura nimaga aylanadi', ru: 'Во что превращается макулатура', en: 'What your waste paper becomes' },
      paras: [
        {
          uz: 'Makulatura (ko‘pchilik «makalatura» deb ham yozadi) — ishlatilgan qog‘oz va karton: eski karobkalar, karton qadoq, kitob-jurnallar, ofis qog‘ozi va gazetalar.',
          ru: 'Макулатура — это использованные бумага и картон: старые коробки, картонная упаковка, книги и журналы, офисная бумага и газеты.',
          en: 'Waste paper is used paper and cardboard: old boxes, cardboard packaging, books and magazines, office paper and newspapers.',
        },
        {
          uz: 'Zavodda u navlar bo‘yicha saralanadi, plyonka, metall va skobalardan tozalanadi, maydalanib qog‘oz massasiga aylantiriladi.',
          ru: 'На заводе её сортируют по маркам, очищают от плёнки, металла и скоб, измельчают и распускают в бумажную массу.',
          en: 'At the plant it is sorted by grade, cleaned of film, metal and staples, then shredded and pulped.',
        },
        {
          uz: 'Shu massadan rulon qog‘oz, undan gofrokarton va yangi karobkalar ishlab chiqariladi — topshirgan makulaturangiz yana qadoqqa aylanadi. Profpack har oy taxminan 2 500 tonna makulaturani qayta ishlaydi.',
          ru: 'Из этой массы делают рулонную бумагу, из неё — гофрокартон и новые коробки: сданная вами макулатура снова становится упаковкой. Profpack перерабатывает около 2 500 тонн макулатуры в месяц.',
          en: 'The pulp becomes paper rolls, then corrugated board and new boxes, so the waste paper you hand in turns back into packaging. Profpack recycles about 2,500 tonnes of waste paper a month.',
        },
      ],
    },
    {
      type: 'steps',
      title: { uz: 'Makulatura qanday topshiriladi', ru: 'Как сдать макулатуру', en: 'How to sell us waste paper' },
      items: [
        {
          title: { uz: 'Tayyorlang', ru: 'Подготовьте', en: 'Prepare' },
          text: {
            uz: 'Karton va qog‘ozni alohida yig‘ing, quruq joyda saqlang. Plyonka, skotch, skoba va oziq-ovqat qoldiqlarini olib tashlang.',
            ru: 'Собирайте картон и бумагу отдельно и храните в сухом месте. Уберите плёнку, скотч, скобы и остатки пищи.',
            en: 'Collect cardboard and paper separately and keep them dry. Remove film, tape, staples and food residue.',
          },
        },
        {
          title: { uz: 'Bog‘laning', ru: 'Свяжитесь с нами', en: 'Contact us' },
          text: {
            uz: 'Qo‘ng‘iroq qiling yoki so‘rov qoldiring: makulatura turi va taxminiy hajmini ayting.',
            ru: 'Позвоните или оставьте заявку: назовите вид макулатуры и примерный объём.',
            en: 'Call or send a request and tell us the type of waste paper and the approximate volume.',
          },
        },
        {
          title: { uz: 'Kelishuv', ru: 'Согласование', en: 'Agreement' },
          text: {
            uz: 'Navi va hajmiga qarab narxni, topshirish tartibi va vaqtini kelishamiz.',
            ru: 'Согласуем цену по марке и объёму, порядок и время сдачи.',
            en: 'We agree the price by grade and volume, and how and when you deliver.',
          },
        },
        {
          title: { uz: 'Topshirish', ru: 'Сдача', en: 'Delivery' },
          text: {
            uz: `Makulatura zavodda qabul qilinadi: ${ADDRESS.uz}.`,
            ru: `Макулатуру принимаем на заводе: ${ADDRESS.ru}.`,
            en: `We accept waste paper at the plant: ${ADDRESS.en}.`,
          },
        },
      ],
    },
    { type: 'eco' },   // O‘zbekistondagi qog‘oz chiqindisi raqamlari (../eco.js)
  ],

  faq: [
    {
      q: { uz: 'Makulatura narxi qancha?', ru: 'По какой цене вы принимаете макулатуру?', en: 'How much do you pay for waste paper?' },
      a: {
        uz: `Narx makulatura naviga va hajmiga qarab kelishiladi. Qanday makulatura va taxminan qancha borligini ayting — aniq narxni telefon orqali aytamiz: ${PHONE.display}.`,
        ru: `Цена зависит от марки макулатуры и объёма. Расскажите, какая у вас макулатура и сколько её, — точную цену назовём по телефону: ${PHONE.display}.`,
        en: `The price depends on the grade and volume. Tell us what waste paper you have and how much, and we will give you an exact price by phone: ${PHONE.display}.`,
      },
    },
    {
      q: { uz: 'Qanday makulatura qabul qilinadi?', ru: 'Какую макулатуру вы принимаете?', en: 'What waste paper do you accept?' },
      a: {
        uz: 'Gofrokarton va eski karobkalar (MS-5B), bosma karton va karton qadoq (MS-6B), kitob, jurnal va daftarlar (MS-7B), ofis qog‘ozi, arxiv hujjatlari va gazetalar (MS-8V). Plyonka yoki polietilen qoplamali, parafinli va yog‘li qog‘oz, folga, kassa cheklari hamda nam yoki kuygan makulatura qabul qilinmaydi.',
        ru: 'Гофрокартон и б/у коробки (МС-5Б), печатный картон и картонную упаковку (МС-6Б), книги, журналы и тетради (МС-7Б), офисную бумагу, архивные документы и газеты (МС-8В). Не принимаем бумагу с плёнкой или полиэтиленовым покрытием, парафинированную и жирную бумагу, фольгу, кассовые чеки, а также мокрую или горелую макулатуру.',
        en: 'Corrugated board and used boxes (MS-5B), printed board and cardboard packaging (MS-6B), books, magazines and notebooks (MS-7B), office paper, archive documents and newspapers (MS-8V). We do not accept film- or polyethylene-coated paper, waxed or greasy paper, foil, till receipts, or wet or burnt waste paper.',
      },
    },
    FAQ.wastePrep,
    {
      q: { uz: 'Makulatura qayerda qabul qilinadi?', ru: 'Где вы принимаете макулатуру?', en: 'Where do you accept waste paper?' },
      a: {
        uz: `Zavodda: ${ADDRESS.uz}. Ish vaqti: ${lower(HOURS.uz)}. Kelishdan oldin qo‘ng‘iroq qiling: ${PHONE.display}.`,
        ru: `На заводе: ${ADDRESS.ru}. Время работы: ${lower(HOURS.ru)}. Перед приездом позвоните: ${PHONE.display}.`,
        en: `At the plant: ${ADDRESS.en}. Working hours: ${lower(HOURS.en)}. Please call before you come: ${PHONE.display}.`,
      },
    },
  ],
};
