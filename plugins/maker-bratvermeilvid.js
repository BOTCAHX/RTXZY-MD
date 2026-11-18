import { canvas, guard } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks\n\n*Contoh:*\n${px} Vermeil in Gold`;

  if (!text) throw guide;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-bratvidVermeil', { text: text.trim(), format: 'mp4' });
  await conn.sendMessage(m.chat, { video: buffer, mimetype: 'video/mp4' }, { quoted: m });
});

handler.help = ['bratvermeilvid <teks>'];
handler.tags = ['maker'];
handler.command = /^(bratvermeilvid)$/i;
handler.limit = true;

export default handler;
