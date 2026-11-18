// «Ko‘p so‘raladigan savollar» bo‘limi: q — savol, a — javob.
export const faq = {
  title: { uz: 'Ko‘p so‘raladigan savollar', ru: 'Частые вопросы', en: 'Frequently asked questions' },
  items: [
    {
      q: { uz: 'E, B va C profillar nimasi bilan farq qiladi?', ru: 'Чем отличаются профили E, B и C?', en: 'What is the difference between E, B and C flutes?' },
      a: {
        uz: 'Profil — gofrokarton to‘lqinining balandligi. GOST 7376-89 bo‘yicha: E — 1,1–1,6 mm, yupqa va bosma uchun silliq, kichik va iste’mol qadoqlari uchun; B — 2,2–3,2 mm, eng ko‘p ishlatiladigan, ezilishga chidamli; C — 3,2–4,4 mm, taxlashda mustahkamroq. Ikki to‘lqinli BC va EB profillari — og‘ir yuklar uchun 5 qatlamli karton.',
        ru: 'Профиль — это высота гофра. По ГОСТ 7376-89: E — 1,1–1,6 мм, тонкий, с гладкой поверхностью под печать, для мелкой и потребительской упаковки; B — 2,2–3,2 мм, самый распространённый, устойчив к смятию; C — 3,2–4,4 мм, прочнее при штабелировании. Двойные профили BC и EB — это 5-слойный картон для тяжёлых грузов.',
        en: 'The flute profile is the height of the corrugated wave. Per GOST 7376-89: E is 1.1–1.6 mm, thin and smooth for printing, used for small and consumer packaging; B is 2.2–3.2 mm, the most widely used and crush-resistant; C is 3.2–4.4 mm and stronger when stacked. Double-wall BC and EB profiles are 5-layer board for heavy loads.',
      },
    },
    {
      q: { uz: '3 qatlamli va 5 qatlamli gofrokarton farqi nimada?', ru: 'Чем 3-слойный гофрокартон отличается от 5-слойного?', en: 'What is the difference between 3-layer and 5-layer board?' },
      a: {
        uz: '3 qatlamli kartonda (T markalari) ikki tekis qatlam orasida bitta to‘lqinli qatlam bor, 5 qatlamlida (P markalari) — ikkita. Bir sinf ichida marka raqami qancha katta bo‘lsa, karton qirraviy siqilishga shuncha chidamli: masalan, GOST 7376-89 bo‘yicha T-23 uchun kamida 3,8 kN/m, P-32 uchun kamida 6,0 kN/m.',
        ru: 'В 3-слойном картоне (марки Т) между двумя плоскими слоями один гофрослой, в 5-слойном (марки П) — два. В пределах одного класса чем больше номер марки, тем выше сопротивление торцевому сжатию: например, по ГОСТ 7376-89 для Т-23 — не менее 3,8 кН/м, для П-32 — не менее 6,0 кН/м.',
        en: '3-layer board (T grades) has one fluted layer between two flat liners; 5-layer board (P grades) has two. Within one class, the higher the grade number, the higher the edge crush resistance: per GOST 7376-89, for example, at least 3.8 kN/m for T-23 and at least 6.0 kN/m for P-32.',
      },
    },
    {
      q: { uz: 'Quti qancha yuk ko‘taradi?', ru: 'Какой вес выдержит коробка?', en: 'How much weight can a box hold?' },
      a: {
        uz: 'Bu karton markasiga, quti o‘lchamiga va palletdagi taxlash balandligiga bog‘liq. Qutining siqilishga chidamliligi (BCT) kartonning qirraviy siqilishga chidamliligidan (ECT) hisoblanadi. Mahsulot og‘irligi va saqlash sharoitini yozing — mos marka va konstruksiyani tanlab beramiz.',
        ru: 'Это зависит от марки картона, размеров коробки и высоты штабеля на паллете. Сопротивление коробки сжатию (BCT) рассчитывают по сопротивлению картона торцевому сжатию (ECT). Напишите вес товара и условия хранения — подберём марку и конструкцию.',
        en: 'It depends on the board grade, box size and pallet stacking height. Box compression strength (BCT) is calculated from the board’s edge crush resistance (ECT). Tell us the product weight and storage conditions and we will choose the right grade and design.',
      },
    },
    {
      q: { uz: 'FEFCO 0201 nima degani?', ru: 'Что означает FEFCO 0201?', en: 'What does FEFCO 0201 mean?' },
      a: {
        uz: 'FEFCO — gofroqadoq konstruksiyalarining xalqaro katalogi. Kodning dastlabki ikki raqami guruhni bildiradi: 02 — klapanli qutilar, 04 — yig‘iladigan qutilar va lotoklar, 09 — qistirma va panjaralar. 0201 — eng keng tarqalgan to‘rt klapanli quti, 0427 — yelimsiz o‘zi yig‘iladigan quti. O‘lcham doim uzunlik × eni × balandlik tartibida beriladi.',
        ru: 'FEFCO — международный каталог конструкций гофроупаковки. Первые две цифры кода — группа: 02 — коробки с клапанами, 04 — складные коробки и лотки, 09 — вкладыши и решётки. 0201 — самая распространённая четырёхклапанная коробка, 0427 — самосборная коробка без клея. Размеры всегда указывают в порядке длина × ширина × высота.',
        en: 'FEFCO is the international code of corrugated packaging designs. The first two digits are the group: 02 — slotted boxes, 04 — folder-type boxes and trays, 09 — inserts and partitions. 0201 is the most common four-flap box, and 0427 is a glue-free self-assembly box. Dimensions are always given as length × width × height.',
      },
    },
    {
      q: { uz: 'Minimal buyurtma va tayyorlash muddati qancha?', ru: 'Какой минимальный заказ и срок изготовления?', en: 'What is the minimum order and lead time?' },
      a: {
        uz: 'Ular konstruksiya, bosma va tirajga bog‘liq. So‘rov qoldiring — aniq minimal partiya va muddatni hisoblab aytamiz.',
        ru: 'Это зависит от конструкции, печати и тиража. Оставьте заявку — назовём точную минимальную партию и срок.',
        en: 'They depend on the design, printing and run length. Send a request and we will tell you the exact minimum batch and lead time.',
      },
    },
    {
      q: { uz: 'Makulaturani qanday tayyorlab topshirish kerak?', ru: 'Как подготовить макулатуру к сдаче?', en: 'How should I prepare waste paper for delivery?' },
      a: {
        uz: 'Karton va qog‘ozni alohida yig‘ing, quruq joyda saqlang — GOST 10700-97 bo‘yicha namlik 15% dan oshmasligi kerak. Plyonka, skotch, skoba va oziq-ovqat qoldiqlarini olib tashlang. Katta hajmni toy qilib bog‘lash qulay; topshirish shartlarini telefon orqali kelishamiz.',
        ru: 'Собирайте картон и бумагу отдельно и храните в сухом месте — по ГОСТ 10700-97 влажность не должна превышать 15%. Уберите плёнку, скотч, скобы и остатки пищи. Большие объёмы удобно связывать в кипы; условия сдачи согласуем по телефону.',
        en: 'Collect cardboard and paper separately and keep them dry: per GOST 10700-97, moisture must not exceed 15%. Remove film, tape, staples and food residue. Large volumes are easiest to tie into bales; we agree delivery terms by phone.',
      },
    },
  ],
};
