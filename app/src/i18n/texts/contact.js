// «So‘rov qoldiring» (aloqa) bo‘limi va buyurtma formasi.
// Telefon, Telegram, email, manzil, ish vaqti qiymatlari — src/data/site.js da.
import { PHONE } from '../../data/site.js';

// formadagi «Nima kerak?» ro‘yxati (tartib — shu yerdagidek; birinchisi — boshlang‘ich tanlov).
// value — so‘rov bilan Telegram guruh va Google Sheets'ga boradigan qiymat (o‘zbekcha, o‘zgartirmang);
// uz/ru/en — ro‘yxatda ko‘rinadigan nomi.
export const NEEDS = [
  { id: 'boxes', value: 'Gofroqutilar', uz: 'Gofroqutilar', ru: 'Гофрокороба', en: 'Corrugated boxes' },
  { id: 'branded', value: 'Brendli qutilar', uz: 'Brendli qutilar', ru: 'Коробки с логотипом', en: 'Branded boxes' },
  { id: 'sheets', value: 'Gofrokarton listlar', uz: 'Gofrokarton listlar', ru: 'Листы гофрокартона', en: 'Corrugated sheets' },
  { id: 'rolls', value: 'Rulon qog‘oz', uz: 'Rulon qog‘oz', ru: 'Рулонная бумага', en: 'Paper rolls' },
  { id: 'waste', value: 'Makulatura topshirish', uz: 'Makulatura topshirish', ru: 'Сдать макулатуру', en: 'Sell waste paper' },
];
// NEED.boxes → 'Gofroqutilar' va h.k. (tugmalar formani shu qiymat bilan to‘ldiradi)
export const NEED = Object.fromEntries(NEEDS.map(n => [n.id, n.value]));

export const contact = {
  title: { uz: 'So‘rov qoldiring', ru: 'Оставьте заявку', en: 'Send a request' },
  lead: {
    uz: 'Qanday quti yoki material kerakligini yozing — mutaxassisimiz narx va muddat bilan qayta aloqaga chiqadi.',
    ru: 'Напишите, какая коробка или материал вам нужны, — специалист свяжется с вами и назовёт цену и сроки.',
    en: 'Tell us what box or material you need, and our specialist will get back to you with a price and lead time.',
  },
  // aloqa ro‘yxatidagi nomlar
  labels: {
    phone: { uz: 'Telefon', ru: 'Телефон', en: 'Phone' },
    telegram: 'Telegram',
    email: 'Email',
    address: { uz: 'Manzil', ru: 'Адрес', en: 'Address' },
    hours: { uz: 'Ish vaqti', ru: 'Время работы', en: 'Working hours' },
  },
};

export const form = {
  to: { uz: 'Kimga', ru: 'Кому', en: 'To' },
  name: { uz: 'Ismingiz', ru: 'Ваше имя', en: 'Your name' },
  namePh: { uz: 'Ism Familiya', ru: 'Имя Фамилия', en: 'First and last name' },
  phone: { uz: 'Telefon', ru: 'Телефон', en: 'Phone' },
  phonePh: '+998 __ ___ __ __',
  company: { uz: 'Kompaniya', ru: 'Компания', en: 'Company' },
  companyPh: { uz: 'Ixtiyoriy', ru: 'Необязательно', en: 'Optional' },
  need: { uz: 'Nima kerak?', ru: 'Что нужно?', en: 'What do you need?' },
  volume: { uz: 'Taxminiy hajm', ru: 'Примерный объём', en: 'Approximate volume' },
  volumePh: { uz: 'Masalan, 5 000 dona yoki 2 tonna', ru: 'Например, 5 000 шт. или 2 тонны', en: 'For example, 5,000 pcs or 2 tonnes' },
  note: { uz: 'Izoh', ru: 'Комментарий', en: 'Comment' },
  notePh: { uz: 'O‘lcham, qatlam, bosma ranglari…', ru: 'Размер, слойность, цвета печати…', en: 'Size, layers, print colours…' },
  submit: { uz: 'So‘rov yuborish', ru: 'Отправить заявку', en: 'Send request' },
  privacy: { uz: 'Ma’lumotlaringiz faqat buyurtma bo‘yicha aloqa uchun ishlatiladi.', ru: 'Ваши данные используются только для связи по заказу.', en: 'Your details are only used to contact you about your order.' },

  // yuborilgandan keyingi holat
  doneTitle: { uz: 'So‘rov yuborildi', ru: 'Заявка отправлена', en: 'Request sent' },
  doneText: { uz: 'Rahmat! Tez orada siz bilan bog‘lanamiz.', ru: 'Спасибо! Мы скоро с вами свяжемся.', en: 'Thank you! We will contact you shortly.' },
  again: { uz: 'Yana so‘rov yuborish', ru: 'Отправить ещё одну заявку', en: 'Send another request' },

  // xato xabarlari (til almashsa, ko‘rinib turgan xabar ham tarjima qilinadi)
  errors: {
    phone: {
      uz: 'Telefon raqamini to‘liq kiriting, masalan: +998 90 123 45 67.',
      ru: 'Введите номер телефона полностью, например: +998 90 123 45 67.',
      en: 'Please enter the full phone number, for example: +998 90 123 45 67.',
    },
    fail: {
      uz: `So‘rov yuborilmadi. Qayta urinib ko‘ring yoki ${PHONE.display} raqamiga qo‘ng‘iroq qiling.`,
      ru: `Заявка не отправлена. Попробуйте ещё раз или позвоните по номеру ${PHONE.display}.`,
      en: `The request was not sent. Please try again or call ${PHONE.display}.`,
    },
    off: {
      uz: `Onlayn so‘rov hozircha ishlamayapti. Iltimos, ${PHONE.display} raqamiga qo‘ng‘iroq qiling.`,
      ru: `Онлайн-заявка пока не работает. Пожалуйста, позвоните по номеру ${PHONE.display}.`,
      en: `Online requests are not available yet. Please call ${PHONE.display}.`,
    },
  },
};
