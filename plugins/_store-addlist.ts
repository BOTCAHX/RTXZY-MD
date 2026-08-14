import * as zapo from '../lib/simple.ts';
import type { WaProtoWebMessageInfoClass } from '../types/proto.js';

let handler: WaPlugin = async (m, { conn, text, command, usedPrefix }) => {
  const { proto } = zapo;
  
	let M = proto.WebMessageInfo as WaProtoWebMessageInfoClass;
	if (!m.quoted) throw `balas pesan dengan perintah *${usedPrefix + command}*`;
	if (!text) throw `penggunaan: ${usedPrefix + command} <teks>\n\ncontoh:\n${usedPrefix + command} tes`;
	let msgs = db.data.chats[m.chat].listStr;
	if (text in msgs) throw `'${text}' telah terdaftar di List store`;
	msgs[text.toLowerCase()] = M.fromObject(await m.getQuotedObj() as Record<string, unknown>).toJSON();
	m.reply(`berhasil menambahkan ${text.toLowerCase()} ke List Store.\n\nakses dengan mengetik namanya`.trim());
};

handler.help = ['list'].map(v => 'add' + v + ' <teks>');
handler.tags = ['store'];
handler.command = /^addlist$/i;
handler.group = true;
handler.admin = true;

export default handler;