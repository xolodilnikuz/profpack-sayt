// =====================================================================
//  Narx kalkulyatori uchun narxlar (so‘m, 1 m² uchun).
//
//  Har bir marka: [zagotovka, quti yetkazib berishsiz, quti yetkazib berish bilan]
//    • zagotovka — gofrokarton list (Zagotovka rejimi);
//    • quti yetkazib berishsiz / bilan — Quti rejimi, «Yetkazib berish bilan» belgisiga qarab;
//    • null — bu markadan quti qilinmaydi: Quti rejimida marka tanlab bo‘lmaydi.
//
//  Hisob: uzunlik × eni (mm) ÷ 1 000 000 = m²; m² × markaning 1 m² narxi = 1 dona narxi.
//  Marka qo‘shish/o‘chirish — shu jadvalga qator qo‘shing/o‘chiring, ro‘yxat o‘zi yangilanadi
//  (tartib shu yerdagidek bo‘ladi).
// =====================================================================
export const PRICES = {
  M21: [3700, null, null], M26: [2900, null, null], M27: [2300, null, null],
  M31: [4900, 5900, 6100], M35: [3900, 4700, 4900], M36: [3600, 4300, 4500], M37: [3300, 3800, 4000],
  M41: [6400, 7600, 7800], M43: [4900, 7000, 7200], M46: [4800, 6300, 6500], M47: [4600, 5800, 6000],
  M51: [7000, 8500, 8700], M54: [5900, 7200, 7400], M55: [5400, 6500, 6700], M57: [5000, 6000, 6200],
};

// kalkulyator ochilgandagi boshlang‘ich qiymatlar
export const CALC_DEFAULTS = {
  kind: 'box',      // 'box' — Quti, 'blank' — Zagotovka
  mark: 'M36',
  len: '2050',      // uzunligi, mm
  wid: '670',       // eni, mm
  qty: '1',         // soni, dona
  ship: true,       // «Yetkazib berish bilan» belgilangan
};
