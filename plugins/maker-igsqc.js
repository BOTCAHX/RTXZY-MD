import { canvas, guard } from '../lib/canvasApi.js';
import { cleanup, imageCollector, start } from '../lib/canvasSession.js';

const usage = (px) => `*${px} username*\n\n*Contoh:*\n${px} botcahx\n\nUsername opsional, default nama kamu.`;

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const session = conn.cvs?.[m.chat];

  if (session && session.command !== command) cleanup(conn, m.chat);

  if (!conn.cvs?.[m.chat]) {
    return m.reply(start(conn, m, { command, usage: usage(px), labels: ['foto profil (avatar)', 'foto story'] }));
  }

  if (session.stage !== 'text') {
    return m.reply(`Baru *${session.images.length}/2* gambar diterima. Kirim gambar ke-${session.images.length + 1}.`);
  }

  const [avatar, photo] = session.images.map((v) => v.url);
  const username = String(text || '').trim() || m.name || m.pushName || 'user';

  await m.reply(wait);
  const { buffer } = await canvas('canvas-igstoryImg', {
    ppUrl: avatar,
    photoUrl: photo,
    username,
    likeCount: '999',
    commentCount: '999',
    repostCount: '999',
    isVerified: 'false',
  });
  cleanup(conn, m.chat);
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.before = imageCollector;
handler.help = ['igsqc <username>'];
handler.tags = ['maker'];
handler.command = /^(igsqc)$/i;
handler.limit = true;

export default handler;
