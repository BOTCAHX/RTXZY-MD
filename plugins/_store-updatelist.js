const { loadBaileys } = require('../baileys-loader.mjs');

let baileys;

const handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!baileys) {
    baileys = await loadBaileys();
  }

  const { proto } = baileys;
  
  const M = proto.WebMessageInfo;
  
  if (!m.quoted) {
    throw `Balas pesan dengan perintah *${usedPrefix + command}*`;
  }

  if (!text) {
    throw `Penggunaan: ${usedPrefix + command} <nama>\n\nContoh:\n${usedPrefix + command} tes2`;
  }

  const msgs = db.data.chats[m.chat].listStr;
  if (!(text.toLowerCase() in msgs)) {
    throw `'${text.toLowerCase()}' belum terdaftar di List store.`;
  }

  msgs[text.toLowerCase()] = M.fromObject(await m.getQuotedObj()).toJSON();
  m.reply(`Berhasil mengupdate *${text.toLowerCase()}* ke List Store.\n\nAkses dengan mengetik ${text.toLowerCase().trim()}`);
};

handler.help = ['list'].map(v => 'update' + v + ' <nama>');
handler.tags = ['store'];
handler.command = /^updatelist$/i;
handler.group = true;
handler.admin = true;

module.exports = handler;