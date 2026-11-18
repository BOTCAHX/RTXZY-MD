import { avatarUrl, canvas, guard, optionalImageUrl, parts } from '../lib/canvasApi.js';

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const guide = `Format salah!\n\n*Cara pakai:*\n${px} username|pesan\n\n*Contoh:*\n${px} botcahx|Mantap kali bos\n\nAvatar diambil dari foto profil kamu. Balas (reply) gambar kalau mau memakai foto lain.`;

  if (!text) throw guide;

  const [username, pesan] = parts(text);

  if (!username || !pesan) throw guide;

  const avatar = await optionalImageUrl(m);
  const params = {
    username,
    message: pesan,
    avatarUrl: avatar || (await avatarUrl(conn, m.sender, '')),
  };

  await m.reply(wait);
  const { buffer } = await canvas('canvas-ttqc', params);
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.help = ['ttqc <username|pesan>'];
handler.tags = ['maker'];
handler.command = /^(ttqc)$/i;
handler.limit = true;

export default handler;
