// «Mahsulotlar» bo‘limi (yoyilgan quti ko‘rinishidagi 4 ta panel).
import { NEED } from './contact.js';

export const products = {
  title: { uz: 'Mahsulotlar', ru: 'Продукция', en: 'Products' },
  lead: {
    uz: 'Zanjirning har bir bo‘g‘inini alohida ham sotamiz: rulon qog‘ozdan tortib brendli qutigacha. Narx hajm va texnik talablarga qarab hisoblanadi.',
    ru: 'Каждое звено цепочки продаём и отдельно: от рулонной бумаги до коробок с вашим брендом. Цена рассчитывается по объёму и техническим требованиям.',
    en: 'We also sell every link of the chain separately, from paper rolls to branded boxes. Prices depend on volume and technical requirements.',
  },
  cta: { uz: 'Narxini so‘rash', ru: 'Узнать цену', en: 'Request a price' },
  legendCut: { uz: 'kesish chizig‘i', ru: 'линия реза', en: 'cut line' },
  legendFold: { uz: 'bukish chizig‘i', ru: 'линия биговки', en: 'crease line' },

  // art — panel tepasidagi rasm (src/components/Products.jsx dagi ART);
  // need — «Narxini so‘rash» bosilganda so‘rov formasidagi «Nima kerak?» tanlovi;
  // spec — [nomi, qiymati] juftlari
  items: [
    {
      art: 'roll',
      need: NEED.rolls,
      title: { uz: 'Rulon qog‘oz', ru: 'Рулонная бумага', en: 'Paper rolls' },
      text: {
        uz: 'Makulaturadan olingan qog‘oz rulonlarda: gofrokartonning tekis qatlamlari uchun testlayner va to‘lqinli qatlami uchun flyuting.',
        ru: 'Бумага из макулатуры в рулонах: тестлайнер для плоских слоёв гофрокартона и флютинг для гофрированного слоя.',
        en: 'Paper made from waste paper, in rolls: testliner for the flat layers of corrugated board and fluting for the corrugated layer.',
      },
      spec: [
        [{ uz: 'Turi', ru: 'Тип', en: 'Type' }, { uz: 'Testlayner, flyuting', ru: 'Тестлайнер, флютинг', en: 'Testliner, fluting' }],
        [{ uz: 'Xomashyo', ru: 'Сырьё', en: 'Raw material' }, { uz: 'Makulatura', ru: 'Макулатура', en: 'Waste paper' }],
        [{ uz: 'Format', ru: 'Формат', en: 'Format' }, { uz: 'Buyurtma bo‘yicha', ru: 'По заказу', en: 'Made to order' }],
      ],
    },
    {
      art: 'sheets',
      need: NEED.sheets,
      title: { uz: 'Gofrokarton listlar', ru: 'Листы гофрокартона', en: 'Corrugated sheets' },
      text: {
        uz: '3 qatlamli (T) va 5 qatlamli (P) gofrokarton listlari kerakli formatda kesib beriladi.',
        ru: 'Листы 3-слойного (Т) и 5-слойного (П) гофрокартона, раскроенные в нужный формат.',
        en: '3-layer (T) and 5-layer (P) corrugated sheets, cut to the format you need.',
      },
      spec: [
        [{ uz: 'Qatlam', ru: 'Слои', en: 'Layers' }, '3 / 5'],
        [{ uz: 'Marka', ru: 'Марка', en: 'Grade' }, { uz: 'Yuk va taxlashga qarab', ru: 'По нагрузке и штабелированию', en: 'Based on load and stacking' }],
      ],
    },
    {
      art: 'box',
      need: NEED.boxes,
      title: { uz: 'Gofroqutilar', ru: 'Гофрокороба', en: 'Corrugated boxes' },
      text: {
        uz: 'To‘rt klapanli qutilar (FEFCO 0201), o‘zi yig‘iladigan qutilar (FEFCO 0427), lotoklar, panjaralar va qistirmalar — logistika, oziq-ovqat va savdo uchun.',
        ru: 'Четырёхклапанные коробки (FEFCO 0201), самосборные коробки (FEFCO 0427), лотки, решётки и вкладыши — для логистики, продуктов питания и торговли.',
        en: 'Four-flap boxes (FEFCO 0201), self-assembly boxes (FEFCO 0427), trays, partitions and inserts for logistics, food and retail.',
      },
      spec: [
        [{ uz: 'Turi', ru: 'Тип', en: 'Type' }, { uz: 'FEFCO katalogi bo‘yicha', ru: 'По каталогу FEFCO', en: 'Per the FEFCO code' }],
        [{ uz: 'O‘lcham', ru: 'Размер', en: 'Size' }, { uz: 'Istalgan', ru: 'Любой', en: 'Any' }],
      ],
    },
    {
      art: 'branded',
      need: NEED.branded,
      title: { uz: 'Brendli qutilar', ru: 'Коробки с логотипом', en: 'Branded boxes' },
      text: {
        uz: 'Logotip, markirovka va manipulyatsion belgilar bosilgan qutilar — mahsulotingiz javonda ham, omborda ham tanilib turadi.',
        ru: 'Коробки с логотипом, маркировкой и манипуляционными знаками — ваш товар узнают и на полке, и на складе.',
        en: 'Boxes printed with your logo, markings and handling symbols, so your product stands out on the shelf and in the warehouse.',
      },
      spec: [
        [{ uz: 'Bosma', ru: 'Печать', en: 'Printing' }, { uz: 'Fleksografik', ru: 'Флексография', en: 'Flexographic' }],
        [{ uz: 'Ranglar', ru: 'Цвета', en: 'Colours' }, { uz: 'Maket bo‘yicha', ru: 'По макету', en: 'Per your artwork' }],
      ],
    },
  ],
};
