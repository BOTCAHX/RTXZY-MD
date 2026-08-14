import fetch from 'node-fetch';

const listnabi = [
  "adam", "ayyub", "daud", "dzulkifli", "harun", "hud", "ibrahim",
  "idris", "ilyas", "ilyasa", "isa", "ishaq", "ismail", "luth",
  "muhammad", "musa", "nuh", "sholeh", "sulaiman", "syuaib", "yahya",
  "yaqub", "yunus", "yusuf", "zakariya"
];

let handler: WaPlugin = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) 
    throw `Masukkan kisah nabi yang ingin kamu cari!\n\nContoh: ${usedPrefix + command} isa`;
  if (!listnabi.includes(text.toLowerCase())) {
    throw `Nabi ${text} tidak tersedia. Silakan pilih salah satu dari:\n- ${listnabi.join("\n- ")}`;
  }

  try {
    await m.reply(wait);  
    let res = await fetch(`https://api.botcahx.eu.org/api/muslim/kisahnabi?nabi=${text}&apikey=${btc}`);
    let json = await res.json();

    let restext = `―-KISAH NABI-―\n\n` +
      `Nama       : ${json.result.name}\n` +
      `Kelahiran  : ${json.result.kelahiran}\n` +
      `Wafat usia : ${json.result.wafat_usia}\n` +
      `Singgah    : ${json.result.singgah}\n` +
      `Kisah      : ${json.result.kisah}`;

    conn.reply(m.chat, restext);
  } catch (e) {
    throw eror
  }
};

handler.help = ['kisahnabi'];
handler.tags = ['islam'];
handler.command = /^(kisahnabi)$/i;
handler.group = false;
handler.limit = true;

export default handler;
