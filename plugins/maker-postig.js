import { canvas, guard, parts } from '../lib/canvasApi.js';
import { cleanup, imageCollector, start } from '../lib/canvasSession.js';

const usage = (px) => `${px} username|nama|like|komentar|repost|verified\n\n*Contoh:*\n${px} botcahx|tio|99999|999|999|true\n\nIsian setelah username opsional (default 999 atau false).`;

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const session = conn.cvs?.[m.chat];

  if (session && session.command !== command) cleanup(conn, m.chat);

  if (!conn.cvs?.[m.chat]) {
    return m.reply(start(conn, m, { command, usage: usage(px), labels: ['foto profil (avatar)', 'foto postingan'] }));
  }

  if (session.stage !== 'text') {
    return m.reply(`Baru *${session.images.length}/2* gambar diterima. Kirim gambar ke-${session.images.length + 1}.`);
  }

  const [username, nama, like, komentar, repost, verified] = parts(text);

  if (!username) throw `Isian belum lengkap. Kirim:\n*${usage(px)}*`;

  const [avatar, foto] = session.images.map((v) => v.url);

  await m.reply(wait);
  const { buffer } = await canvas('canvas-postIg', {
    ppUrl: avatar,
    photoUrl: foto,
    username,
    name: nama || m.name || m.pushName || username,
    likeCount: like || '999',
    commentCount: komentar || '999',
    repostCount: repost || '999',
    isVerified: verified || 'false',
  });
  cleanup(conn, m.chat);
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.before = imageCollector;
handler.help = ['postig <username|nama|like|komentar|repost|verified>'];
handler.tags = ['maker'];
handler.command = /^(postig)$/i;
handler.limit = true;

export default handler;
