import { avatarUrl, canvas, guard, imageSource, imageUrl, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara pakai:*\n1. Kirim gambar dengan caption command, atau balas (reply) sebuah gambar\n2. Ketik:\n${px} teks|nama|nomor|mode|tag\n\n*Contoh:*\n${px} Halo selamat pagi!|Budi|0896543443|dark|botcahx\n\nIsian setelah teks opsional: nama default nama kamu, nomor default nomor kamu, mode default dark, tag default botcahx.`;

  if (!text) throw guide;

  const [teks, nama, nomor, mode, tag] = parts(text);

  if (!teks) throw guide;
  if (!imageSource(m)) throw `*❌ Gambar tidak ditemukan!*\n\nBalas (reply) gambar dulu, atau kirim gambar dengan caption command.\n\n${guide}`;

  const imgUrl = await imageUrl(m);

  await m.reply(wait);
  const { buffer } = await canvas('canvas-qcwa', {
    username: nama || m.name || m.pushName || 'user',
    text: teks,
    imgUrl,
    mode: mode || 'dark',
    phone:
      String(nomor || '').replace(/[^0-9]/g, '') ||
      String(m.sender || '').replace(/[^0-9]/g, '') ||
      String(global.numberowner || '').replace(/[^0-9]/g, ''),
    ppUrl: await avatarUrl(conn, m.sender, imgUrl),
    tag: tag || 'botcahx',
  });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['qcwa <teks|nama|nomor|mode|tag>'];
handler.tags = ['maker'];
handler.command = /^(qcwa)$/i;
handler.limit = true;

export default handler;
