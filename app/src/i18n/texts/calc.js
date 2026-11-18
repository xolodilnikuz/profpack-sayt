// «Narx kalkulyatori» bo‘limi. Narxlarning o‘zi — src/data/prices.js da.
export const calc = {
  title: { uz: 'Narx kalkulyatori', ru: 'Калькулятор цены', en: 'Price calculator' },
  lead: {
    uz: 'Gofrokarton list o‘lchamini millimetrda kiriting — narx darhol hisoblanadi.',
    ru: 'Введите размер листа гофрокартона в миллиметрах — цена рассчитается сразу.',
    en: 'Enter the corrugated sheet size in millimetres and the price is calculated instantly.',
  },
  formula: {
    uz: 'Hisob: uzunlik × eni ÷ 1 000 000 = maydon (m²); maydon × 1 m² narxi = 1 dona narxi.',
    ru: 'Расчёт: длина × ширина ÷ 1 000 000 = площадь (м²); площадь × цена 1 м² = цена 1 шт.',
    en: 'Calculation: length × width ÷ 1,000,000 = area (m²); area × price per m² = price per piece.',
  },
  rate: { uz: '1 m² narxi', ru: 'Цена 1 м²', en: 'Price per m²' },
  kindAria: { uz: 'Mahsulot turi', ru: 'Тип продукции', en: 'Product type' },
  box: { uz: 'Quti', ru: 'Коробка', en: 'Box' },
  blank: { uz: 'Zagotovka', ru: 'Заготовка', en: 'Blank' },
  mark: { uz: 'Marka', ru: 'Марка', en: 'Grade' },
  len: { uz: 'Uzunligi, mm', ru: 'Длина, мм', en: 'Length, mm' },
  wid: { uz: 'Eni, mm', ru: 'Ширина, мм', en: 'Width, mm' },
  qty: { uz: 'Soni, dona', ru: 'Количество, шт.', en: 'Quantity, pcs' },
  ship: { uz: 'Yetkazib berish bilan', ru: 'С доставкой', en: 'With delivery' },
  area: { uz: 'Maydoni', ru: 'Площадь', en: 'Area' },
  unit: { uz: '1 dona narxi', ru: 'Цена 1 шт.', en: 'Price per piece' },
  total: { uz: 'Jami', ru: 'Итого', en: 'Total' },
  order: { uz: 'Shu o‘lcham bilan buyurtma berish', ru: 'Заказать этот размер', en: 'Order this size' },

  // natija ostidagi izoh
  note: {
    ship: { uz: 'Narx yetkazib berish bilan.', ru: 'Цена с доставкой.', en: 'Price includes delivery.' },
    noship: { uz: 'Narx yetkazib berishsiz.', ru: 'Цена без доставки.', en: 'Price excludes delivery.' },
    blank: { uz: 'Zagotovka narxi.', ru: 'Цена заготовки.', en: 'Blank price.' },
  },

  // o‘lchov birliklari va valyuta
  units: {
    cur: { uz: 'so‘m', ru: 'сум', en: 'UZS' },
    mm: { uz: 'mm', ru: 'мм', en: 'mm' },
    m2: { uz: 'm²', ru: 'м²', en: 'm²' },
    pcs: { uz: 'dona', ru: 'шт.', en: 'pcs' },
  },

  // «Shu o‘lcham bilan buyurtma berish» bosilganda so‘rov formasiga ("Izoh") o‘tadigan matn bo‘laklari:
  // «Marka M36, quti, yetkazib berish bilan. O‘lcham: 2050 × 670 mm. Kalkulyator bo‘yicha: 6 180,75 so‘m»
  orderNote: {
    mark: { uz: 'Marka', ru: 'Марка', en: 'Grade' },
    box: { uz: 'quti', ru: 'коробка', en: 'box' },
    blank: { uz: 'zagotovka', ru: 'заготовка', en: 'blank' },
    ship: { uz: 'yetkazib berish bilan', ru: 'с доставкой', en: 'with delivery' },
    noship: { uz: 'yetkazib berishsiz', ru: 'без доставки', en: 'without delivery' },
    size: { uz: 'O‘lcham', ru: 'Размер', en: 'Size' },
    calc: { uz: 'Kalkulyator bo‘yicha', ru: 'По калькулятору', en: 'Calculator estimate' },
  },
};
