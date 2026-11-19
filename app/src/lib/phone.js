// So‘rov formasidagi telefon maydoni: mamlakat kodi (+998) doim turadi,
// foydalanuvchi faqat qolgan 9 ta raqamni yozadi — u "90 123 45 67" ko‘rinishida ajratiladi.

export const PHONE_CODE = '+998';
export const PHONE_LOCAL_LEN = 9;         // koddan keyingi raqamlar soni
const GROUPS = [2, 3, 2, 2];              // 90 123 45 67

// Kiritilgan matndan koddan keyingi raqamlarni ajratadi (ko‘pi bilan 9 ta); harf va belgilar tashlab yuboriladi.
// To‘liq raqam qo‘yilsa ("+998 90 123 45 67", "998901234567") — mamlakat kodi olib tashlanadi.
// Qo‘lda yozilgan "99 812 34 56" kabi raqamdagi 998 ga tegilmaydi: kod deb faqat "+998" yoki 12 xonali raqam boshidagi 998 olinadi.
export function phoneDigits(value) {
  const raw = String(value ?? '');
  const plus = raw.lastIndexOf(PHONE_CODE);
  let d = (plus >= 0 ? raw.slice(plus + PHONE_CODE.length) : raw).replace(/\D/g, '');
  if (plus < 0 && d.length >= 3 + PHONE_LOCAL_LEN && d.startsWith('998')) d = d.slice(3);
  return d.slice(0, PHONE_LOCAL_LEN);
}

// "901234567" → "90 123 45 67" (to‘liq bo‘lmasa — borigacha: "9012" → "90 12")
export function formatPhone(digits) {
  const parts = [];
  let i = 0;
  for (const n of GROUPS) {
    if (i >= digits.length) break;
    parts.push(digits.slice(i, i + n));
    i += n;
  }
  return parts.join(' ');
}

// to‘liq raqam: "+998 90 123 45 67" (forma shu ko‘rinishda yuboradi)
export const fullPhone = digits => `${PHONE_CODE} ${formatPhone(digits)}`;

// ajratilgan matnda n-raqamdan keyingi o‘rin — yozish paytida kursor joyidan siljimasligi uchun
export function caretAfterDigits(formatted, n) {
  if (n <= 0) return 0;
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/\d/.test(formatted[i]) && ++seen === n) return i + 1;
  }
  return formatted.length;
}
