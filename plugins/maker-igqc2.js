import { canvas, clock, guard, imageSource, imageUrl, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} teks|caption|jam\n\n*Contoh:*\n${px} Selamat pagi semua|hshs|12:30\n\nCaption wajib diisi, jam opsional (default jam sekarang). Kirim atau balas gambar bersamanya.`;

  if (!text) throw guide;

  const [teks, caption, jam] = parts(text);

  if (!teks || !caption) throw guide;
  if (!imageSource(m)) throw `*❌ Media tidak ditemukan!*\n\n${guide}`;

  const params = { txt: teks, caption, imgUrl: await imageUrl(m), timeStr: jam || clock() };

  await m.reply(wait);
  const { buffer } = await canvas('canvas-iqcDark', params);
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['igqc2 <teks|caption|jam>'];
handler.tags = ['maker'];
handler.command = /^(igqc2)$/i;
handler.limit = true;

export default handler;
