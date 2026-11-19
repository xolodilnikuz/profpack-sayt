// Alohida sahifalar matnlari. Kalit — sahifa id si (src/data/pages.js), qiymat — shu sahifaning matnlari.
// Bitta sahifa — bitta fayl: boxes.js (karobka), printing.js (pechat), board.js (gofrokarton),
// paper.js (rulon qog‘oz), waste.js (makulatura). Hammasi uchun umumiy matnlar — common.js.
import { meta } from '../meta.js';
import { boxes } from './boxes.js';
import { printing } from './printing.js';
import { board } from './board.js';
import { paper } from './paper.js';
import { wastePage } from './waste.js';

export { topicsCommon } from './common.js';

export const TOPICS = { boxes, printing, board, paper, waste: wastePage };

// sahifaning brauzer sarlavhasi va tavsifi: alohida sahifa — o‘ziniki, bosh sahifa — meta.js
export const metaFor = page => (TOPICS[page] ? TOPICS[page].meta : meta);
