import { canvas, guard } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks\n\n*Contoh:*\n${px} Deploy server jam 3 pagi`;

  if (!text) throw guide;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-jarvisMeme', { text: text.trim() });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['jarvis <teks>'];
handler.tags = ['maker'];
handler.command = /^(jarvis)$/i;
handler.limit = true;

export default handler;
