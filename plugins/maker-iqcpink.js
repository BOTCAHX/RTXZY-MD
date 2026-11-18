import { canvas, clock, guard, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks|jam\n\n*Contoh:*\n${px} Kesendirian adalah teman terbaik ku|22.54\n\nJam opsional, default jam sekarang.`;

  if (!text) throw guide;

  const [teks, jam] = parts(text);

  if (!teks) throw guide;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-iqcPink', {
    text: teks,
    time: jam || clock('.'),
  });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['iqcpink <teks|jam>'];
handler.tags = ['maker'];
handler.command = /^(iqcpink)$/i;
handler.limit = true;

export default handler;
