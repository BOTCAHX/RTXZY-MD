import { canvas, guard } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks\n\n*Contoh:*\n${px} charli xcx\n\nTema biasa: ${usedPrefix}brat, tema hitam: ${usedPrefix}bratblack`;

  if (!text) throw guide;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-bratImg', { text: text.trim(), theme: 'green', blur: '0' });
  await conn.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, author: global.author });
});

handler.help = ['bratgreen <teks>'];
handler.tags = ['sticker'];
handler.command = /^(bratgreen)$/i;
handler.limit = true;

export default handler;
