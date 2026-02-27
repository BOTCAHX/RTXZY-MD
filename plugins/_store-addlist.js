const { loadBaileys } = require('../baileys-loader.mjs');

let baileys;

let handler = async (m, { conn, text, command, usedPrefix }) => {
  if (!baileys) {
    baileys = await loadBaileys();
  }

  const { proto } = baileys;
  
	let M = proto.WebMessageInfo;
	if (!m.quoted) throw `balas pesan dengan perintah *${usedPrefix + command}*`;
	if (!text) throw `penggunaan: ${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} tes`;
	let msgs = db.data.chats[m.chat].listStr;
	if (text in msgs) throw `'${text}' telah terdaftar di List store`;
	msgs[text.toLowerCase()] = M.fromObject(await m.getQuotedObj()).toJSON();
	m.reply(`berhasil menambahkan ${text.toLowerCase()} ke List Store.\n\nakses dengan mengetik namanya`.trim());
};

handler.help = ['list'].map(v => 'add' + v + ' <teks>');
handler.tags = ['store'];
handler.command = /^addlist$/i;
handler.group = true;
handler.admin = true;

module.exports = handler;