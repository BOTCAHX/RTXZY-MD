import { canvas, guard, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks|theme\n\n*Contoh:*\n${px} charli xcx|black\n\nTheme opsional: green, black, blue, dan lainnya (default green).`;

  if (!text) throw guide;

  const [teks, theme] = parts(text);

  if (!teks) throw guide;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-bratImg', {
    text: teks,
    theme: theme || 'green',
    blur: '0',
  });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['brat <teks|theme>'];
handler.tags = ['maker'];
handler.command = /^(brat)$/i;
handler.limit = true;

export default handler;
