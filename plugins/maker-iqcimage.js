import { canvas, clock, guard, optionalImageUrl, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara pakai:*\n${px} nama|waktu\n\n*Contoh:*\n${px} Budi|08:30\n\nWaktu opsional, default jam sekarang. Foto juga opsional: balas (reply) gambar kalau mau memakainya.`;

  if (!text) throw guide;

  const [nama, waktu] = parts(text);

  if (!nama) throw guide;

  const params = { nama, waktu: waktu || clock() };

  const photoUrl = await optionalImageUrl(m);
  if (photoUrl) params.photoUrl = photoUrl;

  await m.reply(wait);
  const { buffer } = await canvas('canvas-iqcImage', params);
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['iqcimage <nama|waktu>'];
handler.tags = ['maker'];
handler.command = /^(iqcimage)$/i;
handler.limit = true;

export default handler;
