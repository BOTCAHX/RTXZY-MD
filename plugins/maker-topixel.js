import { canvas, guard, imageSource, imageUrl, parts } from '../lib/canvasApi.js';

const level = (value) => {
  const angka = parseInt(value, 10);
  if (!Number.isFinite(angka)) return 10;
  return Math.min(100, Math.max(1, angka));
};

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara pakai:*\n1. Kirim gambar dengan caption command, atau balas (reply) sebuah gambar\n2. Ketik:\n${px} level\n\n*Contoh:*\n${px} 10\n\nLevel 1 sampai 100 (default 10).`;

  if (!imageSource(m)) throw `*❌ Gambar tidak ditemukan!*\n\nBalas (reply) gambar dulu, atau kirim gambar dengan caption command.\n\n${guide}`;

  const [angka] = parts(text);
  const inputPath = await imageUrl(m);

  await m.reply(wait);
  const { buffer } = await canvas('canvas-topixel', {
    inputPath,
    pixelLevel: level(angka),
  });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['topixel <level>'];
handler.tags = ['maker'];
handler.command = /^(topixel)$/i;
handler.limit = true;

export default handler;
