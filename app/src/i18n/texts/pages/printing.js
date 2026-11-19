// «Pechat» sahifasi:  /pechat/  ·  /ru/pechat/  ·  /en/printing/
// Odamlar qidiradigan so‘zlar: karobkaga pechat, logotip bosish, logotipli karobka, brendli quti;
// печать на коробках, коробки с логотипом, флексопечать.
// Maydonlar izohi — boxes.js boshida.
import { FAQ } from '../faq.js';
import { NEED } from '../contact.js';
import { PHONE } from '../../../data/site.js';

export const printing = {
  nav: { uz: 'Pechat', ru: 'Печать', en: 'Printing' },
  short: { uz: 'Karobkaga logotip va markirovka bosish', ru: 'Печать логотипа и маркировки на коробках', en: 'Logo and marking printing on boxes' },
  meta: {
    title: {
      uz: 'Karobkaga pechat va logotip bosish — Profpack, Toshkent',
      ru: 'Печать логотипа на коробках в Ташкенте — Profpack',
      en: 'Logo printing on corrugated boxes in Tashkent — Profpack',
    },
    description: {
      uz: `Karobkaga logotip, dizayn va markirovka bosamiz: fleksopechat, shtrix- va QR-kodlar. Logotipli karobkalar — Profpack, Toshkent. Tel: ${PHONE.display}.`,
      ru: `Печатаем на коробках логотип, дизайн и маркировку: флексопечать, штрих- и QR-коды. Коробки с логотипом — завод Profpack, Ташкент. Тел.: ${PHONE.display}.`,
      en: `We print logos, designs and markings on corrugated boxes: flexo printing, barcodes and QR codes. Branded boxes by Profpack, Tashkent. Tel: ${PHONE.display}.`,
    },
  },
  h1: [
    { uz: 'Karobkaga pechat', ru: 'Печать логотипа', en: 'Logo printing' },
    { uz: 'va logotip bosish', ru: 'на коробках', en: 'on boxes' },
  ],
  lead: {
    uz: 'Logotip, dizayn va markirovkani karobkaning o‘ziga fleksografik usulda bosamiz. Karobkani ham, pechatni ham bitta zavodda qilamiz — brendli (logotipli) quti sizga tayyor holda keladi.',
    ru: 'Наносим логотип, дизайн и маркировку прямо на коробку флексографским способом. И коробку, и печать делаем на одном заводе — вы получаете готовую брендированную упаковку.',
    en: 'We flexo-print your logo, design and markings directly on the box. The box and the print are made in one plant, so your branded packaging arrives ready to use.',
  },
  cta: { uz: 'Brendli quti buyurtma qilish', ru: 'Заказать коробки с логотипом', en: 'Order branded boxes' },
  need: NEED.branded,
  art: 'branded',
  tags: [
    { uz: 'Fleksopechat', ru: 'Флексопечать', en: 'Flexo printing' },
    { uz: 'Logotip va dizayn', ru: 'Логотип и дизайн', en: 'Logo and design' },
    { uz: 'Shtrix- va QR-kod', ru: 'Штрих- и QR-коды', en: 'Barcodes and QR codes' },
  ],
  facts: [
    [{ uz: 'Usul', ru: 'Способ', en: 'Method' }, { uz: 'Fleksografik bosma', ru: 'Флексографская печать', en: 'Flexographic printing' }],
    [{ uz: 'Nima bosiladi', ru: 'Что печатаем', en: 'What we print' }, { uz: 'Logotip, dizayn, markirovka', ru: 'Логотип, дизайн, маркировка', en: 'Logo, design, markings' }],
    [{ uz: 'Kodlar', ru: 'Коды', en: 'Codes' }, { uz: 'Shtrix-kod, QR-kod', ru: 'Штрих-код, QR-код', en: 'Barcode, QR code' }],
    [{ uz: 'Ranglar', ru: 'Цвета', en: 'Colours' }, { uz: 'Maket bo‘yicha', ru: 'По макету', en: 'Per your artwork' }],
  ],

  blocks: [
    {
      type: 'cards',
      title: { uz: 'Karobkaga nima bosiladi', ru: 'Что печатаем на коробках', en: 'What we print on boxes' },
      items: [
        {
          title: { uz: 'Logotip va dizayn', ru: 'Логотип и дизайн', en: 'Logo and design' },
          text: {
            uz: 'Brend belgisi, nomi va firma uslubidagi bezak — mahsulotingiz javonda ham, omborda ham tanilib turadi.',
            ru: 'Знак и название бренда, оформление в фирменном стиле — ваш товар узнают и на полке, и на складе.',
            en: 'Your brand mark, name and house-style artwork, so your product stands out on the shelf and in the warehouse.',
          },
        },
        {
          title: { uz: 'Markirovka', ru: 'Маркировка', en: 'Markings' },
          text: {
            uz: 'Mahsulot nomi, og‘irligi, ishlab chiqaruvchi ma’lumotlari va boshqa kerakli yozuvlar karobkaning o‘ziga bosiladi.',
            ru: 'Название товара, вес, данные производителя и другие нужные надписи наносятся прямо на коробку.',
            en: 'The product name, weight, manufacturer details and other required text go straight onto the box.',
          },
        },
        {
          title: { uz: 'Shtrix- va QR-kodlar', ru: 'Штрих- и QR-коды', en: 'Barcodes and QR codes' },
          text: {
            uz: 'Ombor hisobi va savdo uchun kodlar karobkaga bosiladi — alohida yorliq yopishtirish shart emas.',
            ru: 'Коды для складского учёта и торговли печатаются на коробке — отдельную этикетку клеить не нужно.',
            en: 'Codes for warehouse tracking and retail are printed on the box, so there is no need for a separate label.',
          },
        },
        {
          title: { uz: 'Manipulyatsion belgilar', ru: 'Манипуляционные знаки', en: 'Handling symbols' },
          text: {
            uz: '«Tepasi», «Mo‘rt», «Namdan saqlang» kabi belgilar — yuk to‘g‘ri tashilishi va saqlanishi uchun.',
            ru: 'Знаки «Верх», «Хрупкое», «Беречь от влаги» и другие — чтобы груз правильно перевозили и хранили.',
            en: 'Symbols such as “This way up”, “Fragile” and “Keep dry”, so the load is carried and stored correctly.',
          },
        },
      ],
    },
    {
      type: 'text',
      title: { uz: 'Fleksopechat nima', ru: 'Что такое флексопечать', en: 'What flexo printing is' },
      paras: [
        {
          uz: 'Fleksografiya (fleksopechat) — gofrokartonga bosishning eng keng tarqalgan usuli: tasvir egiluvchan bosma qolipdan (klishe) tez quriydigan bo‘yoq bilan kartonning o‘ziga o‘tkaziladi.',
          ru: 'Флексография (флексопечать) — самый распространённый способ печати по гофрокартону: изображение переносится на картон с гибкой печатной формы (клише) быстросохнущими красками.',
          en: 'Flexography (flexo printing) is the most common way to print on corrugated board: the image is transferred onto the board from a flexible printing plate with fast-drying inks.',
        },
        {
          uz: 'Bu usul katta tirajlar uchun tez va tejamli, yozuv va belgilar aniq chiqadi. Ranglar maketingiz bo‘yicha tanlanadi.',
          ru: 'Способ быстрый и экономичный на больших тиражах, а надписи и знаки получаются чёткими. Цвета подбираем по вашему макету.',
          en: 'It is fast and economical for long runs, and text and symbols come out crisp. Colours follow your artwork.',
        },
        {
          uz: 'Buyurtma uchun logotip yoki tayyor maketni yuboring, karobka o‘lchami va tirajni ayting — bosma joylashuvini kelishib, narx va muddatni hisoblaymiz.',
          ru: 'Для заказа пришлите логотип или готовый макет, назовите размер коробки и тираж — согласуем расположение печати и рассчитаем цену и сроки.',
          en: 'To order, send your logo or finished artwork and tell us the box size and run length. We agree the print layout and quote the price and lead time.',
        },
      ],
    },
    { type: 'how' },
  ],

  faq: [
    FAQ.logo,
    {
      q: { uz: 'Karobkaga pechat narxi qancha?', ru: 'Сколько стоит печать на коробках?', en: 'How much does printing on boxes cost?' },
      a: {
        uz: 'Narx karobka o‘lchami, bosma ranglari va tirajga bog‘liq. Maketingizni va kerakli sonni yuboring — narx va muddatni hisoblab aytamiz.',
        ru: 'Цена зависит от размера коробки, цветов печати и тиража. Пришлите макет и нужное количество — рассчитаем цену и сроки.',
        en: 'The price depends on the box size, the print colours and the run length. Send your artwork and quantity and we will quote the price and lead time.',
      },
    },
    FAQ.size,
    FAQ.moq,
  ],
};
