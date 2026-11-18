import { canvas, clock, guard, imageSource, imageUrl, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara pakai:*\n1. Kirim gambar dengan caption command, atau balas (reply) sebuah gambar\n2. Ketik:\n${px} teks|caption|jam\n\n*Contoh:*\n${px} Selamat pagi semua|hshs|12:30\n\nCaption wajib diisi, jam opsional (default jam sekarang).`;

  if (!text) throw guide;

  const [teks, caption, jam] = parts(text);

  if (!teks || !caption) throw guide;
  if (!imageSource(m)) throw `*❌ Gambar tidak ditemukan!*\n\nBalas (reply) gambar dulu, atau kirim gambar dengan caption command.\n\n${guide}`;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-iqcDark', {
    txt: teks,
    caption,
    imgUrl: await imageUrl(m),
    timeStr: jam || clock(),
  });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['igqc2 <teks|caption|jam>'];
handler.tags = ['maker'];
handler.command = /^(igqc2)$/i;
handler.limit = true;

export default handler;
