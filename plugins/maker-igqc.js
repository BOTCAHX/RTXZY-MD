import { canvas, clock, guard, imageSource, imageUrl, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks|jam\n\n*Contoh:*\n${px} Hidup itu indah|12:30\n\nJam opsional, default jam sekarang. Kirim atau balas gambar bersamanya.`;

  if (!text) throw guide;

  const [teks, jam] = parts(text);

  if (!teks) throw guide;
  if (!imageSource(m)) throw `*❌ Media tidak ditemukan!*\n\n${guide}`;

  const imgUrl = await imageUrl(m);

  await m.reply(wait);
  const { buffer } = await canvas('canvas-igqc', {
    txt: teks,
    imgUrl,
    menuTimeStr: jam || clock(),
  });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['igqc <teks|jam>'];
handler.tags = ['maker'];
handler.command = /^(igqc)$/i;
handler.limit = true;

export default handler;
