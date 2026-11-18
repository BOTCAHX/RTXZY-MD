import { canvas, guard, imageSource, imageUrl } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara penggunaan:*\n${px} judul berita\n\n*Contoh:*\n${px} Pemerintah Umumkan Kebijakan Baru Tahun 2026\n\nKirim atau balas gambar untuk foto beritanya.`;

  if (!text) throw guide;
  if (!imageSource(m)) throw `*❌ Media tidak ditemukan!*\n\n${guide}`;

  const photoUrl = await imageUrl(m);

  await m.reply(wait);
  const { buffer } = await canvas('canvas-kompasCanvas', { text: text.trim(), photoUrl });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['kompascanvas <judul>'];
handler.tags = ['maker'];
handler.command = /^(kompascanvas)$/i;
handler.limit = true;

export default handler;
