// Hamkorlar: 3D qutida bo‘sh turganda navbat bilan bosiladigan brendlar (tartib — shu ro‘yxatdagidek).
// Zavod aytganlari + profpack.uz va u-enter.uz da tilga olinganlar.
// Manbalar: Akfa, Pepsi, Samsung — Wikimedia Commons; Artel, Rozmetov, Krember, Premier — o‘z rasmiy saytlari.
// Logotip fayllari: src/assets/partners/. Logotipi topilmaganlar (src yo‘q) nomi bilan chiqadi.
// null — Profpack’ning o‘z bosmasi (ro‘yxat boshida turishi kerak).
import akfa from '../assets/partners/akfa.svg';
import artel from '../assets/partners/artel.svg';
import rozmetov from '../assets/partners/rozmetov.svg';
import pepsi from '../assets/partners/pepsi.svg';
import krember from '../assets/partners/krember.png';
import premier from '../assets/partners/premier.png';
import samsung from '../assets/partners/samsung.svg';

export const BRANDS = [
  null,
  { name: 'AKFA', src: akfa },
  { name: 'ARTEL', src: artel },
  { name: 'ROZMETOV', src: rozmetov },
  { name: 'PEPSI', src: pepsi },
  { name: 'BOYLER' },
  { name: 'KREMBER', src: krember },
  { name: 'TECHNOPARK' },
  { name: 'PREMIER', src: premier, tint: '#161616' },   // asl logotip oq — kraftda bir rangli bosma
  { name: 'SAMSUNG', src: samsung },
];
