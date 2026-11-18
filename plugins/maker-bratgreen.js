import { canvas, guard } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks\n\n*Contoh:*\n${px} charli xcx\n\nVersi tema biasa: ${usedPrefix}brat, tema hitam: ${usedPrefix}bratblack`;

  if (!text) throw guide;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-bratImg', { text: text.trim(), theme: 'green', blur: '0' });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['bratgreen <teks>'];
handler.tags = ['maker'];
handler.command = /^(bratgreen)$/i;
handler.limit = true;

export default handler;
