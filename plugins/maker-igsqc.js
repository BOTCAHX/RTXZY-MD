import { avatarUrl, canvas, guard, imageSource, imageUrl } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara pakai:*\n1. Kirim gambar dengan caption command, atau balas (reply) sebuah gambar\n2. Ketik:\n${px} username\n\n*Contoh:*\n${px} botcahx\n\nLike, komentar, dan repost otomatis 999. Kalau username dikosongkan, dipakai nama kamu.`;

  if (!imageSource(m)) throw `*❌ Gambar tidak ditemukan!*\n\nBalas (reply) gambar dulu, atau kirim gambar dengan caption command.\n\n${guide}`;

  const photoUrl = await imageUrl(m);

  await m.reply(wait);
  const { buffer } = await canvas('canvas-igstoryImg', {
    ppUrl: await avatarUrl(conn, m.sender, photoUrl),
    photoUrl,
    username: String(text || '').trim() || m.name || m.pushName || 'user',
    likeCount: '999',
    commentCount: '999',
    repostCount: '999',
    isVerified: 'false',
  });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['igsqc <username>'];
handler.tags = ['maker'];
handler.command = /^(igsqc)$/i;
handler.limit = true;

export default handler;
