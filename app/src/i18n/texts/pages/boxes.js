// «Karobka» sahifasi:  /karobka/  ·  /ru/korobki/  ·  /en/boxes/
// Odamlar qidiradigan so‘zlar: karobka, karton karobka, karobka zakaz, karobka narxi; коробки, картонные коробки, гофрокороба.
// Tuzilishi (hamma sahifada bir xil — src/components/TopicPage.jsx):
//   nav — menyudagi nomi;  short — «boshqa sahifalar» ro‘yxatidagi bir qatorli izoh;
//   meta — brauzer sarlavhasi (60 belgigacha) va qidiruvdagi tavsif (160 belgigacha);
//   h1 — sahifa sarlavhasi (ikki qator, ikkinchisi kraft rangida);  lead — sarlavha ostidagi matn;
//   cta — asosiy tugma;  need — tugma bosilganda formadagi «Nima kerak?» tanlovi;  art — rasm (src/components/Art.jsx);
//   tags — sarlavha ostidagi yorliqlar;  facts — o‘ngdagi kartochkadagi [nomi, qiymati] juftlari;
//   blocks — sahifa bo‘limlari tartib bilan;  faq — savol-javoblar.
import { PRICE, FAQ, num } from '../faq.js';
import { NEED } from '../contact.js';
import { calc } from '../calc.js';
import { products } from '../products.js';
import { PHONE } from '../../../data/site.js';

export const boxes = {
  nav: { uz: 'Karobka', ru: 'Коробки', en: 'Boxes' },
  short: { uz: 'Karton karobkalar istalgan o‘lchamda', ru: 'Картонные коробки любых размеров', en: 'Corrugated boxes in any size' },
  meta: {
    title: {
      uz: 'Karton karobka zakaz va narxi — Profpack zavodi, Toshkent',
      ru: 'Картонные коробки на заказ в Ташкенте, цена — Profpack',
      en: 'Custom corrugated boxes in Tashkent, prices — Profpack',
    },
    description: {
      uz: `Karton karobkalar (gofroqutilar) istalgan o‘lchamda: 3 va 5 qatlamli, logotip bilan. 1 m² narxi ${num(PRICE.boxMin)} so‘mdan. Profpack, Toshkent. Tel: ${PHONE.display}.`,
      ru: `Картонные коробки (гофрокороба) любых размеров на заказ: 3- и 5-слойные, с логотипом. Цена от ${num(PRICE.boxMin)} сум за 1 м². Profpack, Ташкент. Тел.: ${PHONE.display}.`,
      en: `Custom-size corrugated cardboard boxes: 3- and 5-layer, with logo printing. From ${num(PRICE.boxMin, ',')} UZS per m². Profpack plant, Tashkent. Tel: ${PHONE.display}.`,
    },
  },
  h1: [
    { uz: 'Karton karobkalar', ru: 'Картонные коробки', en: 'Corrugated boxes' },
    { uz: 'istalgan o‘lchamda', ru: 'на заказ', en: 'made to order' },
  ],
  lead: {
    uz: 'Profpack — Toshkentdagi karobka ishlab chiqaruvchi zavod. Gofrokartonni o‘zimiz ishlab chiqaramiz, undan sizning o‘lchamingizda karobka (gofroquti, karton quti) yasaymiz va kerak bo‘lsa logotipingizni bosamiz.',
    ru: 'Profpack — производитель картонных коробок в Ташкенте. Сами выпускаем гофрокартон, делаем из него коробки (гофрокороба, гофроящики) по вашим размерам и при необходимости печатаем логотип.',
    en: 'Profpack is a corrugated box manufacturer in Tashkent. We make the corrugated board ourselves, turn it into boxes in your dimensions and print your logo if needed.',
  },
  cta: products.cta,
  need: NEED.boxes,
  art: 'box',
  tags: [
    'FEFCO 0201',
    'FEFCO 0427',
    { uz: '3 va 5 qatlam', ru: '3 и 5 слоёв', en: '3 and 5 layers' },
    { uz: 'Logotip bosish', ru: 'Печать логотипа', en: 'Logo printing' },
  ],
  facts: [
    [{ uz: 'Turi', ru: 'Тип', en: 'Type' }, { uz: 'FEFCO 0201, 0427, lotok, panjara', ru: 'FEFCO 0201, 0427, лотки, решётки', en: 'FEFCO 0201, 0427, trays, partitions' }],
    [{ uz: 'O‘lcham', ru: 'Размер', en: 'Size' }, { uz: 'Istalgan, buyurtma bo‘yicha', ru: 'Любой, под заказ', en: 'Any, made to order' }],
    [{ uz: 'Karton', ru: 'Картон', en: 'Board' }, { uz: '3 va 5 qatlamli', ru: '3- и 5-слойный', en: '3- and 5-layer' }],
    [{ uz: 'Bosma', ru: 'Печать', en: 'Printing' }, { uz: 'Fleksografik', ru: 'Флексография', en: 'Flexographic' }],
    [{ uz: 'Narx', ru: 'Цена', en: 'Price' }, { uz: `1 m² — ${num(PRICE.boxMin)} so‘mdan`, ru: `от ${num(PRICE.boxMin)} сум за 1 м²`, en: `from ${num(PRICE.boxMin, ',')} UZS per m²` }],
  ],

  blocks: [
    {
      type: 'cards',
      title: { uz: 'Karobka turlari', ru: 'Виды коробок', en: 'Types of boxes' },
      lead: {
        uz: 'FEFCO xalqaro katalogidagi konstruksiyalar yoki mahsulotingizga moslab loyihalangan karobka.',
        ru: 'Конструкции из международного каталога FEFCO или коробка, спроектированная под ваш товар.',
        en: 'Designs from the international FEFCO code or a box engineered for your product.',
      },
      items: [
        {
          title: { uz: 'To‘rt klapanli karobka (FEFCO 0201)', ru: 'Четырёхклапанная коробка (FEFCO 0201)', en: 'Four-flap box (FEFCO 0201)' },
          text: {
            uz: 'Eng ko‘p ishlatiladigan transport karobkasi: tepasi va tagi to‘rttadan klapan bilan yopiladi. Mahsulotni tashish, saqlash va jo‘natish uchun.',
            ru: 'Самая распространённая транспортная коробка: верх и дно закрываются четырьмя клапанами. Для перевозки, хранения и отправки товаров.',
            en: 'The most common shipping box: the top and bottom each close with four flaps. For transporting, storing and shipping goods.',
          },
        },
        {
          title: { uz: 'O‘zi yig‘iladigan karobka (FEFCO 0427)', ru: 'Самосборная коробка (FEFCO 0427)', en: 'Self-assembly box (FEFCO 0427)' },
          text: {
            uz: 'Yelim va skotchsiz yig‘iladi, qopqog‘i ochilib-yopiladi. Internet-do‘kon jo‘natmalari va iste’mol qadoqlari uchun qulay.',
            ru: 'Собирается без клея и скотча, крышка открывается и закрывается. Удобна для отправок интернет-магазинов и потребительской упаковки.',
            en: 'Assembles without glue or tape and has a hinged lid. Handy for e-commerce shipments and consumer packaging.',
          },
        },
        {
          title: { uz: 'Lotoklar', ru: 'Лотки', en: 'Trays' },
          text: {
            uz: 'Usti ochiq karton lotoklar — mahsulotni tashish va javonga terish uchun.',
            ru: 'Открытые картонные лотки — для перевозки товара и выкладки на полке.',
            en: 'Open-top cardboard trays for carrying goods and displaying them on the shelf.',
          },
        },
        {
          title: { uz: 'Panjara va qistirmalar', ru: 'Решётки и вкладыши', en: 'Partitions and inserts' },
          text: {
            uz: 'Karobka ichini bo‘limlarga ajratadi va mahsulotni zarbadan saqlaydi: shisha idish, butilka va mo‘rt buyumlar uchun.',
            ru: 'Делят коробку на ячейки и защищают товар от ударов: для стеклянной тары, бутылок и хрупких изделий.',
            en: 'They divide the box into cells and protect goods from impact: for glass containers, bottles and fragile items.',
          },
        },
      ],
    },
    {
      type: 'text',
      title: { uz: 'Karobka qanday tanlanadi', ru: 'Как подобрать коробку', en: 'How we choose your box' },
      paras: [
        {
          uz: 'Karobka buyurtmachining o‘lchami bo‘yicha tayyorlanadi: uzunlik × eni × balandlikni, mahsulot og‘irligini va kerakli sonni ayting.',
          ru: 'Коробки изготавливаем по размерам заказчика: назовите длину × ширину × высоту, вес товара и нужное количество.',
          en: 'Boxes are made to the customer’s dimensions: tell us the length × width × height, the product weight and the quantity you need.',
        },
        {
          uz: 'Kartonni yuk og‘irligi va palletdagi taxlash balandligiga qarab tanlaymiz: yengil mahsulot uchun 3 qatlamli, og‘ir yuk va baland taxlash uchun 5 qatlamli gofrokarton.',
          ru: 'Картон подбираем по весу груза и высоте штабеля на паллете: для лёгкого товара — 3-слойный, для тяжёлых грузов и высокого штабеля — 5-слойный гофрокартон.',
          en: 'We choose the board by load weight and pallet stacking height: 3-layer board for light goods, 5-layer board for heavy loads and high stacks.',
        },
        {
          uz: 'Kerak bo‘lsa, seriyadan oldin namuna karobka tayyorlaymiz. Ishlatilgan karobka esa yana makulaturaga aylanadi — qadoq to‘liq qayta ishlanadi.',
          ru: 'При необходимости до запуска серии изготовим образец коробки. А использованная коробка снова становится макулатурой — упаковка полностью перерабатывается.',
          en: 'If needed, we make a sample box before the production run. And a used box becomes waste paper again, so the packaging is fully recyclable.',
        },
      ],
    },
    { type: 'calc', kind: 'box' },
    { type: 'how' },
  ],

  faq: [
    FAQ.price,
    FAQ.size,
    FAQ.logo,
    {
      q: { uz: 'Karobkani yetkazib berasizmi?', ru: 'Доставляете ли вы коробки?', en: 'Do you deliver the boxes?' },
      a: {
        uz: `Ha. Karobka narxi yetkazib berish bilan ham hisoblanadi: kalkulyatorda «${calc.ship.uz}» belgisini qo‘ying. Manzil va muddatni buyurtma paytida kelishamiz.`,
        ru: `Да. Цену коробки можно рассчитать и с доставкой: отметьте в калькуляторе «${calc.ship.ru}». Адрес и сроки согласуем при заказе.`,
        en: `Yes. The box price can be calculated with delivery: tick “${calc.ship.en}” in the calculator. We agree the address and dates when you order.`,
      },
    },
    FAQ.load,
    FAQ.fefco,
    FAQ.moq,
  ],
};
