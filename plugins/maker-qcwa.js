import { canvas, guard, parts } from '../lib/canvasApi.js';
import { cleanup, imageCollector, start } from '../lib/canvasSession.js';

const usage = (px) => `*${px} teks|nama|nomor|mode|tag*\n\n*Contoh:*\n${px} Halo selamat pagi!|Budi|082221792667|dark|botcahx\n\nNama, nomor, mode, dan tag opsional.`;

let handler = guard(async (m, { conn, text, usedPrefix, command }) => {
  const px = usedPrefix + command;
  const session = conn.cvs?.[m.chat];

  if (session && session.command !== command) cleanup(conn, m.chat);

  if (!conn.cvs?.[m.chat]) {
    return m.reply(start(conn, m, { command, usage: usage(px), labels: ['foto profil (avatar)', 'foto chat'] }));
  }

  if (session.stage !== 'text') {
    return m.reply(`Baru *${session.images.length}/2* gambar diterima. Kirim gambar ke-${session.images.length + 1}.`);
  }

  const [teks, nama, nomor, mode, tag] = parts(text);

  if (!teks) throw `Isian belum lengkap. Kirim:\n\n${usage(px)}`;

  const [avatar, foto] = session.images.map((v) => v.url);
  const phone =
    String(nomor || '').replace(/[^0-9]/g, '') ||
    String(m.sender || '').replace(/[^0-9]/g, '') ||
    String(global.numberowner || '').replace(/[^0-9]/g, '');

  await m.reply(wait);
  const { buffer } = await canvas('canvas-qcwa', {
    username: nama || m.name || m.pushName || 'user',
    text: teks,
    imgUrl: foto,
    mode: mode || 'dark',
    phone,
    ppUrl: avatar,
    tag: tag || 'botcahx',
  });
  cleanup(conn, m.chat);
  await conn.sendMessage(m.chat, { image: buffer }, { quoted: m });
});

handler.before = imageCollector;
handler.help = ['qcwa <teks|nama|nomor|mode|tag>'];
handler.tags = ['maker'];
handler.command = /^(qcwa)$/i;
handler.limit = true;

export default handler;
