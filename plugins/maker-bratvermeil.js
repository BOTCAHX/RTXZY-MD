import { canvas, guard } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks\n\n*Contoh:*\n${px} Vermeil in Gold`;

  if (!text) throw guide;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-bratVermeil', { text: text.trim() });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['bratvermeil <teks>'];
handler.tags = ['maker'];
handler.command = /^(bratvermeil)$/i;
handler.limit = true;

export default handler;
