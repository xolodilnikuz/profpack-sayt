/**
 * Profpack sayti → Telegram guruh + Google Sheets jadval + @Profpacksaytbot
 *
 * • Saytdagi «So‘rov qoldiring» formasi to‘ldirilganda so‘rov Telegram guruhga xabar bo‘lib keladi
 *   va «Profpack so‘rovlar» jadvaliga yangi qator bo‘lib yoziladi.
 * • Kimdir botda «Start» bossa (yoki unga yozsa), bot aloqa raqami, ish vaqti va manzilni yuboradi.
 *
 * Bot tokeni kodda emas, skript sozlamalarida turadi:
 *   ⚙️ Project Settings (Настройки проекта) → Script Properties → BOT_TOKEN.
 * Bot sozlamalari (webhook, tavsif, /start buyrug‘i) — «botniSozlash» funksiyasini bir marta ▶ Run qiling.
 */

// so‘rovlar yoziladigan Google Sheets jadvali («Profpack so‘rovlar») — havoladagi /d/ dan keyingi qism
const SHEET_ID = '1g5mWxJsJ09dTTh5MTjdNXnC-aevZ_M0_rHM2uzGZ5xM';
// shu skriptning web app havolasi (Deploy → Manage deployments) — Telegram yangiliklarni shu yerga yuboradi
const WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw9UkDTU3-cKmIljEtMR3szTTWMQbmoJkLFaE36kxWZz7A3ucOsLosOmy0TezfDDkyT0w/exec';
const SITE_URL = 'https://www.profpack.uz/';
const PHONE = '+998959460000';

// forma maydonlari: [saytdagi nomi, guruh va jadvaldagi sarlavha, belgi]
const FIELDS = [
  ['name', 'Ism', '👤'],
  ['phone', 'Telefon', '📞'],
  ['company', 'Kompaniya', '🏢'],
  ['need', 'Nima kerak', '📦'],
  ['volume', 'Hajm', '⚖️'],
  ['note', 'Izoh', '📝'],
];
const LANGS = { uz: 'o‘zbekcha', ru: 'ruscha', en: 'inglizcha' };

// botda «Start» bosilganda yuboriladigan xabar (Telegram tili ruscha bo‘lsa — ruscha, aks holda o‘zbekcha)
const INFO = {
  uz: {
    text: '👋 <b>Assalomu alaykum! Profpack’ga xush kelibsiz.</b>\n\n' +
      'Biz — to‘liq siklli qadoq zavodimiz: makulaturani qayta ishlab, rulon qog‘oz, gofrokarton ' +
      'va logotipingiz bosilgan qutilar tayyorlaymiz.\n\n' +
      '📞 <b>Buyurtma va savollar uchun qo‘ng‘iroq qiling:</b>\n' +
      '<b>+998 95 946 00 00</b>\n' +
      'Raqamni bosing — qo‘ng‘iroq ochiladi. Pastdagi kontaktni telefoningizga saqlab ham qo‘yishingiz mumkin.\n\n' +
      '🕗 <b>Ish vaqti:</b> har kuni, 08:00–18:00\n' +
      '📍 <b>Manzil:</b> Toshkent sh., Yangihayot tumani, Kanora ko‘chasi, 3-uy',
    site: '🌐 Saytni ochish', calc: '🧮 Narxni hisoblash', contact: 'qadoq zavodi',
  },
  ru: {
    text: '👋 <b>Здравствуйте! Добро пожаловать в Profpack.</b>\n\n' +
      'Мы — упаковочный завод полного цикла: перерабатываем макулатуру, выпускаем рулонную бумагу, ' +
      'гофрокартон и коробки с вашим логотипом.\n\n' +
      '📞 <b>Заказы и вопросы — звоните:</b>\n' +
      '<b>+998 95 946 00 00</b>\n' +
      'Нажмите на номер, чтобы позвонить, или сохраните контакт ниже.\n\n' +
      '🕗 <b>Время работы:</b> ежедневно, 08:00–18:00\n' +
      '📍 <b>Адрес:</b> г. Ташкент, Янгихаётский район, ул. Канора, 3',
    site: '🌐 Открыть сайт', calc: '🧮 Рассчитать цену', contact: 'упаковочный завод',
  },
};

// ---------- sayt (forma) va Telegram (webhook) shu yerga yuboradi ----------
function doPost(e) {
  const p = (e && e.parameter) || {};
  if (p.tg) return telegramUpdate_(e, p.tg);
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (d.website) return reply_(true);                         // spam-bot to‘ldirgan yashirin maydon — jim o‘tkazamiz
    const v = {};
    FIELDS.forEach(([k]) => { v[k] = clean_(d[k]); });
    if (v.phone.replace(/\D/g, '').length < 9) return reply_(false, 'phone');

    const time = Utilities.formatDate(new Date(), 'Asia/Tashkent', 'dd.MM.yyyy HH:mm');
    const lang = LANGS[d.lang] || clean_(d.lang);

    let saved = false, sent = false;
    try { saved = saveRow_([time, ...FIELDS.map(([k]) => v[k]), lang]); } catch (err) { console.error('Jadval: ' + err); }
    try { sendTelegram_(message_(v, time, lang)); sent = true; } catch (err) { console.error(err); }
    return reply_(saved || sent, saved || sent ? '' : 'server');
  } catch (err) {
    console.error(err);
    return reply_(false, 'server');
  }
}

// brauzerda havolani ochib tekshirish uchun
function doGet() {
  return ContentService.createTextOutput('Profpack forma qabul qiluvchisi ishlayapti.');
}

// ---------- bir marta ▶ Run: webhook, bot tavsifi va /start buyrug‘ini sozlaydi ----------
function botniSozlash() {
  const props = PropertiesService.getScriptProperties();
  token_();
  // guruhga botni kim qo‘shgan bo‘lsa — o‘sha egasi; boshqalar botni o‘z guruhiga qo‘shib, so‘rovlarni «o‘g‘irlay» olmaydi
  if (!props.getProperty('OWNER_ID')) {
    const up = tg_('getUpdates', {});
    const chatId = props.getProperty('CHAT_ID');
    (up.result || []).forEach(u => {
      const cm = u.my_chat_member;
      if (cm && String(cm.chat.id) === chatId && ['left', 'kicked'].indexOf(cm.new_chat_member.status) < 0) props.setProperty('OWNER_ID', String(cm.from.id));
    });
  }
  if (!props.getProperty('TG_SECRET')) props.setProperty('TG_SECRET', Utilities.getUuid().replace(/-/g, ''));

  const steps = {
    webhook: tg_('setWebhook', { url: WEB_APP_URL + '?tg=' + props.getProperty('TG_SECRET'), allowed_updates: ['message', 'my_chat_member'], drop_pending_updates: true }),
    buyruq: tg_('setMyCommands', { commands: [{ command: 'start', description: 'Aloqa raqami, ish vaqti va manzil' }] }),
    buyruqRu: tg_('setMyCommands', { commands: [{ command: 'start', description: 'Телефон, время работы и адрес' }], language_code: 'ru' }),
    tavsif: tg_('setMyDescription', { description: 'Profpack — to‘liq siklli qadoq zavodi: rulon qog‘oz, gofrokarton va brendli qutilar.\n\n«Start» tugmasini bosing — aloqa raqamimiz, ish vaqti va manzilimizni yuboramiz.' }),
    tavsifRu: tg_('setMyDescription', { description: 'Profpack — упаковочный завод полного цикла: рулонная бумага, гофрокартон и брендированные коробки.\n\nНажмите «Start» — пришлём телефон, время работы и адрес.', language_code: 'ru' }),
    qisqa: tg_('setMyShortDescription', { short_description: 'Gofrokarton va brendli qutilar zavodi. Tel: +998 95 946 00 00' }),
    qisqaRu: tg_('setMyShortDescription', { short_description: 'Завод гофрокартона и брендированных коробок. Тел: +998 95 946 00 00', language_code: 'ru' }),
  };
  Object.keys(steps).forEach(k => console.log(k + ': ' + (steps[k].ok ? 'ok' : steps[k].description)));
  console.log('Guruh egasi aniqlandi: ' + (props.getProperty('OWNER_ID') ? 'ha' : 'yo‘q'));
  webhookHolati();
}

// webhook holati: so‘nggi xato bo‘lsa, shu yerda ko‘rinadi
function webhookHolati() {
  const w = tg_('getWebhookInfo', {}).result || {};
  console.log('Webhook: ' + (w.url ? 'ulangan' : 'yo‘q') + '; navbatda: ' + w.pending_update_count +
    '; so‘nggi xato: ' + (w.last_error_message || 'yo‘q'));
}

// ---------- qo‘lda tekshirish uchun (webhook ulanmagan bo‘lsa): guruhni qayta topadi ----------
function ulash() {
  PropertiesService.getScriptProperties().deleteProperty('CHAT_ID');
  console.log('Ulandi, guruh ID: ' + findChat_());
}

// ---------- sinov: soxta so‘rov yuborib, guruh va jadvalni tekshiradi ----------
function sinov() {
  const r = doPost({ postData: { contents: JSON.stringify({
    name: 'Sinov', phone: '+998 90 000 00 00', company: 'Profpack', need: 'Gofroqutilar',
    volume: '1 000 dona', note: 'Bu sinov xabari — e’tibor bermang', lang: 'uz',
  }) } });
  console.log(r.getContent());
}

// ---------- Telegram'dan kelgan yangilanish ----------
function telegramUpdate_(e, key) {
  const ok = HtmlService.createHtmlOutput('ok');                 // Telegram uchun oddiy 200 javob
  if (key !== PropertiesService.getScriptProperties().getProperty('TG_SECRET')) return ok;
  try {
    const u = JSON.parse(e.postData.contents);
    const cache = CacheService.getScriptCache();                 // bir yangilanishni ikki marta ishlamaslik uchun
    if (cache.get('u' + u.update_id)) return ok;
    cache.put('u' + u.update_id, '1', 21600);
    if (u.my_chat_member) onChatMember_(u.my_chat_member);
    const m = u.message;
    if (m && m.chat && m.chat.type === 'private') sendInfo_(m.chat.id, m.from && m.from.language_code);
  } catch (err) {
    console.error(err);
  }
  return ok;
}

// bot guruhga qo‘shildi yoki chiqarildi
function onChatMember_(cm) {
  const c = cm.chat, props = PropertiesService.getScriptProperties();
  if (['group', 'supergroup', 'channel'].indexOf(c.type) < 0) return;
  const current = props.getProperty('CHAT_ID'), owner = props.getProperty('OWNER_ID');
  if (['left', 'kicked'].indexOf(cm.new_chat_member.status) >= 0) {
    if (current === String(c.id)) props.deleteProperty('CHAT_ID');
    return;
  }
  const by = String(cm.from && cm.from.id);
  if (owner ? by !== owner : !!current) return;                  // begona guruh — e’tibor bermaymiz
  props.setProperty('CHAT_ID', String(c.id));
  if (!owner) props.setProperty('OWNER_ID', by);
  sendTelegram_('✅ <b>Profpack sayti shu guruhga ulandi.</b>\nSaytdagi formadan keladigan so‘rovlar shu yerga tushadi.', c.id);
}

// «Start» yoki istalgan xabarga — aloqa ma’lumotlari
function sendInfo_(chatId, code) {
  const t = INFO[/^ru/.test(code || '') ? 'ru' : 'uz'];
  tg_('sendMessage', {
    chat_id: chatId, text: t.text, parse_mode: 'HTML', disable_web_page_preview: true,
    reply_markup: { inline_keyboard: [[{ text: t.site, url: SITE_URL }, { text: t.calc, url: SITE_URL + '#kalkulyator' }]] },
  });
  tg_('sendContact', { chat_id: chatId, phone_number: PHONE, first_name: 'Profpack', last_name: '— ' + t.contact });
}

// ---------- yordamchi funksiyalar ----------
function token_() {
  const t = (PropertiesService.getScriptProperties().getProperty('BOT_TOKEN') || '').trim();
  if (!/^\d+:[\w-]{20,}$/.test(t)) throw new Error('Bot tokeni qo‘yilmagan: ⚙️ Project Settings → Script Properties → BOT_TOKEN.');
  return t;
}

// bot qo‘shilgan guruhni topadi (webhook ulanmagan bo‘lsa), ID'sini saqlaydi va guruhga «✅ ulandi» yuboradi
function findChat_() {
  const out = tg_('getUpdates', {});
  if (!out.ok) throw new Error('Telegram: ' + out.description);
  let chat = null, by = null;
  const seen = [];
  out.result.forEach(u => {
    const m = u.my_chat_member || u.message || u.channel_post;
    const c = m && m.chat;
    if (c) seen.push(c.type + ' «' + (c.title || c.username || c.first_name || c.id) + '»');
    if (!c || ['group', 'supergroup', 'channel'].indexOf(c.type) < 0) return;
    const status = u.my_chat_member && u.my_chat_member.new_chat_member.status;
    if (status === 'left' || status === 'kicked') { if (chat && chat.id === c.id) chat = null; return; }
    chat = c;
    by = m.from ? String(m.from.id) : by;
  });
  if (!chat) {
    const me = tg_('getMe', {});
    throw new Error('Guruh topilmadi. Token @' + (me.result ? me.result.username : '?') + ' botiga tegishli; bot ko‘rgan chatlar: ' +
      (seen.length ? seen.join(', ') : 'yo‘q') + '. Shu botni guruhdan chiqarib, qaytadan qo‘shing.');
  }
  const props = PropertiesService.getScriptProperties();
  props.setProperty('CHAT_ID', String(chat.id));
  if (by && !props.getProperty('OWNER_ID')) props.setProperty('OWNER_ID', by);
  sendTelegram_('✅ <b>Profpack sayti shu guruhga ulandi.</b>\nSaytdagi formadan keladigan so‘rovlar shu yerga tushadi.', chat.id);
  return String(chat.id);
}

function message_(v, time, lang) {
  const lines = ['🆕 <b>Yangi so‘rov — Profpack sayti</b>', ''];
  FIELDS.forEach(([k, label, icon]) => { if (v[k]) lines.push(icon + ' <b>' + label + ':</b> ' + esc_(v[k])); });
  lines.push('', '🌐 ' + esc_(lang) + ' · 🕒 ' + time);
  return lines.join('\n');
}

function sendTelegram_(text, chatId) {
  const props = PropertiesService.getScriptProperties();
  const id = chatId || props.getProperty('CHAT_ID') || findChat_();
  const out = tg_('sendMessage', { chat_id: id, text: text, parse_mode: 'HTML', disable_web_page_preview: true });
  if (out.ok) return;
  // oddiy guruh «supergroup»ga aylansa, Telegram yangi ID beradi — uni saqlab, qayta yuboramiz
  const newId = out.parameters && out.parameters.migrate_to_chat_id;
  if (newId) { props.setProperty('CHAT_ID', String(newId)); return sendTelegram_(text, newId); }
  throw new Error('Telegram: ' + out.description);
}

function tg_(method, payload) {
  const res = UrlFetchApp.fetch('https://api.telegram.org/bot' + token_() + '/' + method, {
    method: 'post', contentType: 'application/json', payload: JSON.stringify(payload), muteHttpExceptions: true,
  });
  return JSON.parse(res.getContentText());
}

function saveRow_(row) {
  const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) return false;                                         // jadval ko‘rsatilmagan — faqat Telegram
  const sh = ss.getSheets()[0];
  if (sh.getLastRow() === 0) {
    sh.appendRow(['Vaqt', ...FIELDS.map(f => f[1]), 'Til']);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, FIELDS.length + 2).setFontWeight('bold');
  }
  // «=», «+», «-», «@» bilan boshlangan qiymat formula bo‘lib qolmasin (telefon raqami ham «+» bilan boshlanadi)
  sh.appendRow(row.map(x => (/^[=+\-@]/.test(x) ? "'" + x : x)));
  return true;
}

function clean_(x) {
  return String(x == null ? '' : x).trim().slice(0, 1000);
}

function esc_(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function reply_(ok, error) {
  return ContentService.createTextOutput(JSON.stringify(ok ? { ok: true } : { ok: false, error: error }))
    .setMimeType(ContentService.MimeType.JSON);
}
