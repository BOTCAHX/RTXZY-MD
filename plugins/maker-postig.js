import { avatarUrl, canvas, guard, imageSource, imageUrl, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara pakai:*\n1. Kirim gambar dengan caption command, atau balas (reply) sebuah gambar\n2. Ketik:\n${px} username|nama|like|komentar|repost|verified\n\n*Contoh:*\n${px} botcahx|tio|99999|999|999|true\n\nIsian setelah username opsional (default 999 atau false).`;

  if (!text) throw guide;

  const [username, nama, like, komentar, repost, verified] = parts(text);

  if (!username) throw guide;
  if (!imageSource(m)) throw `*❌ Gambar tidak ditemukan!*\n\nBalas (reply) gambar dulu, atau kirim gambar dengan caption command.\n\n${guide}`;

  const photoUrl = await imageUrl(m);

  await m.reply(wait);
  const { buffer } = await canvas('canvas-postIg', {
    ppUrl: await avatarUrl(conn, m.sender, photoUrl),
    photoUrl,
    username,
    name: nama || m.name || m.pushName || username,
    likeCount: like || '999',
    commentCount: komentar || '999',
    repostCount: repost || '999',
    isVerified: verified || 'false',
  });
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['postig <username|nama|like|komentar|repost|verified>'];
handler.tags = ['maker'];
handler.command = /^(postig)$/i;
handler.limit = true;

export default handler;
