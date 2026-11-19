// «Rulon qog‘oz» sahifasi:  /rulon-qogoz/  ·  /ru/bumaga/  ·  /en/paper-rolls/
// Odamlar qidiradigan so‘zlar: rulon qog‘oz, testlayner, flyuting; бумага для гофрирования, тестлайнер, флютинг.
// Maydonlar izohi — boxes.js boshida.
import { NEED } from '../contact.js';
import { products } from '../products.js';
import { PHONE } from '../../../data/site.js';

export const paper = {
  nav: { uz: 'Rulon qog‘oz', ru: 'Бумага', en: 'Paper rolls' },
  short: { uz: 'Testlayner va flyuting rulonlarda', ru: 'Тестлайнер и флютинг в рулонах', en: 'Testliner and fluting in rolls' },
  meta: {
    title: {
      uz: 'Rulon qog‘oz: testlayner va flyuting — Profpack, Toshkent',
      ru: 'Бумага для гофрокартона: тестлайнер и флютинг — Profpack',
      en: 'Testliner and fluting paper rolls — Profpack, Tashkent',
    },
    description: {
      uz: `Makulaturadan ishlab chiqarilgan rulon qog‘oz: gofrokarton uchun testlayner va flyuting, format buyurtma bo‘yicha. Profpack, Toshkent. Tel: ${PHONE.display}.`,
      ru: `Рулонная бумага из макулатуры: тестлайнер и флютинг (бумага для гофрирования), формат по заказу. Завод Profpack, Ташкент. Тел.: ${PHONE.display}.`,
      en: `Recycled paper in rolls: testliner and fluting for corrugated board, formats made to order. Profpack plant, Tashkent. Tel: ${PHONE.display}.`,
    },
  },
  h1: [
    { uz: 'Rulon qog‘oz:', ru: 'Рулонная бумага:', en: 'Paper rolls:' },
    { uz: 'testlayner va flyuting', ru: 'тестлайнер и флютинг', en: 'testliner and fluting' },
  ],
  lead: {
    uz: 'Makulaturani qayta ishlab, gofrokarton uchun qog‘oz ishlab chiqaramiz va rulonlarda sotamiz: tekis qatlamlar uchun testlayner, to‘lqinli qatlam uchun flyuting.',
    ru: 'Перерабатываем макулатуру в бумагу для гофрокартона и продаём её в рулонах: тестлайнер для плоских слоёв и флютинг для гофрированного слоя.',
    en: 'We recycle waste paper into paper for corrugated board and sell it in rolls: testliner for the flat layers and fluting for the corrugated layer.',
  },
  cta: products.cta,
  need: NEED.rolls,
  art: 'roll',
  tags: [
    { uz: 'Testlayner', ru: 'Тестлайнер', en: 'Testliner' },
    { uz: 'Flyuting', ru: 'Флютинг', en: 'Fluting' },
    { uz: 'Format buyurtma bo‘yicha', ru: 'Формат по заказу', en: 'Formats to order' },
  ],
  facts: [
    [{ uz: 'Turi', ru: 'Тип', en: 'Type' }, { uz: 'Testlayner, flyuting', ru: 'Тестлайнер, флютинг', en: 'Testliner, fluting' }],
    [{ uz: 'Xomashyo', ru: 'Сырьё', en: 'Raw material' }, { uz: 'Makulatura', ru: 'Макулатура', en: 'Waste paper' }],
    [{ uz: 'Format', ru: 'Формат', en: 'Format' }, { uz: 'Buyurtma bo‘yicha', ru: 'По заказу', en: 'Made to order' }],
    [{ uz: 'Qo‘llanishi', ru: 'Применение', en: 'Use' }, { uz: 'Gofrokarton ishlab chiqarish', ru: 'Производство гофрокартона', en: 'Corrugated board production' }],
  ],

  blocks: [
    {
      type: 'cards',
      title: { uz: 'Qog‘oz turlari', ru: 'Виды бумаги', en: 'Paper types' },
      items: [
        {
          title: { uz: 'Testlayner', ru: 'Тестлайнер', en: 'Testliner' },
          text: {
            uz: 'Gofrokartonning tekis — tashqi va ichki — qatlamlari uchun qog‘oz. Karton yuzasini hosil qiladi, bosma ham shu qatlamga tushadi.',
            ru: 'Бумага для плоских слоёв гофрокартона — наружного и внутреннего. Образует поверхность картона, на неё же наносится печать.',
            en: 'Paper for the flat layers of corrugated board, outer and inner. It forms the board surface, and printing goes on this layer.',
          },
        },
        {
          title: { uz: 'Flyuting', ru: 'Флютинг', en: 'Fluting' },
          text: {
            uz: 'To‘lqinli qatlam uchun qog‘oz. Rifli vallar orasidan o‘tib to‘lqin shaklini oladi va kartonga mustahkamlik beradi.',
            ru: 'Бумага для гофрирования — для волнистого слоя. Проходит между рифлёными валами, принимает форму волны и придаёт картону жёсткость.',
            en: 'Paper for the corrugated layer. It passes between fluted rolls, takes on a wave shape and gives the board its rigidity.',
          },
        },
      ],
    },
    {
      type: 'text',
      title: { uz: 'Qog‘oz qanday ishlab chiqariladi', ru: 'Как производится бумага', en: 'How the paper is made' },
      paras: [
        {
          uz: 'Xomashyo — GOST 10700-97 navlari bo‘yicha saralangan va plyonka, metall, skoba kabi aralashmalardan tozalangan makulatura.',
          ru: 'Сырьё — макулатура, отсортированная по маркам ГОСТ 10700-97 и очищенная от плёнки, металла, скоб и других примесей.',
          en: 'The raw material is waste paper sorted by GOST 10700-97 grades and cleaned of film, metal, staples and other contaminants.',
        },
        {
          uz: 'Makulatura maydalanadi va gidrorazbivatelda suv bilan aralashtirilib, qog‘oz massasiga aylanadi.',
          ru: 'Макулатуру измельчают и распускают в воде в гидроразбивателе до бумажной массы.',
          en: 'The waste paper is shredded and pulped with water in a hydropulper.',
        },
        {
          uz: 'Massa tozalanadi, qog‘oz-karton mashinasida presslanadi, quritiladi va rulonlarga o‘raladi.',
          ru: 'Массу очищают, на бумагоделательной машине прессуют, сушат и сматывают в рулоны.',
          en: 'The pulp is cleaned, then pressed and dried on the paper machine and wound into rolls.',
        },
      ],
    },
  ],

  faq: [
    {
      q: { uz: 'Testlayner va flyuting nimasi bilan farq qiladi?', ru: 'Чем тестлайнер отличается от флютинга?', en: 'What is the difference between testliner and fluting?' },
      a: {
        uz: 'Testlayner — gofrokartonning tekis qatlamlari uchun, flyuting — to‘lqinli qatlami uchun qog‘oz. Ikkalasi ham makulaturadan ishlab chiqariladi.',
        ru: 'Тестлайнер — бумага для плоских слоёв гофрокартона, флютинг — для волнистого слоя. Оба вида производятся из макулатуры.',
        en: 'Testliner is paper for the flat layers of corrugated board; fluting is for the corrugated layer. Both are made from waste paper.',
      },
    },
    {
      q: { uz: 'Rulon formati (eni) qanday bo‘ladi?', ru: 'Какого формата (ширины) рулоны?', en: 'What roll formats (widths) are available?' },
      a: {
        uz: 'Format buyurtma bo‘yicha tayyorlanadi. Kerakli en va hajmni yozing — imkoniyat va muddatni aytamiz.',
        ru: 'Формат изготавливается по заказу. Напишите нужную ширину и объём — сообщим возможности и сроки.',
        en: 'Formats are made to order. Tell us the width and volume you need and we will confirm what is possible and when.',
      },
    },
    {
      q: { uz: 'Rulon qog‘oz narxi qancha?', ru: 'Сколько стоит рулонная бумага?', en: 'How much do paper rolls cost?' },
      a: {
        uz: 'Narx hajm va texnik talablarga qarab hisoblanadi. So‘rov qoldiring yoki qo‘ng‘iroq qiling — hisoblab aytamiz.',
        ru: 'Цена рассчитывается по объёму и техническим требованиям. Оставьте заявку или позвоните — рассчитаем.',
        en: 'The price depends on volume and technical requirements. Send a request or call us for a quote.',
      },
    },
  ],
};
