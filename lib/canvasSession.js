import { createHash } from 'crypto';
import uploadImage from './uploadImage.js';

export const IMAGE_TIMEOUT = 90_000;
export const TEXT_TIMEOUT = 180_000;

export const store = (conn) => (conn.cvs = conn.cvs && typeof conn.cvs === 'object' ? conn.cvs : {});

export const cleanup = (conn, id) => {
  const session = conn.cvs?.[id];
  if (!session) return;
  if (session.timeout) clearTimeout(session.timeout);
  delete conn.cvs[id];
};

export const arm = (conn, id, stage, ms, note) => {
  const session = conn.cvs?.[id];
  if (!session) return;

  clearTimeout(session.timeout);
  session.stage = stage;
  session.timeout = setTimeout(() => {
    if (!conn.cvs?.[id]) return;
    delete conn.cvs[id];
    conn.reply(id, note);
  }, ms);
};

export const start = (conn, m, { command, usage, labels }) => {
  store(conn);
  cleanup(conn, m.chat);

  conn.cvs[m.chat] = { stage: 'images', images: [], command, usage, labels };
  arm(conn, m.chat, 'images', IMAGE_TIMEOUT, `⏱️ Sesi *${command}* dibatalkan (tidak ada gambar masuk).`);

  return `🖼️ Kirim *2 gambar* sekarang:\n1. ${labels[0]}\n2. ${labels[1]}\n_Waktu ${IMAGE_TIMEOUT / 1000} detik._\n\nSetelah itu kirim:\n*${usage}*`;
};

export const imageCollector = async (m, { conn }) => {
  const session = conn.cvs?.[m.chat];
  if (!session || session.stage !== 'images') return;
  if (m.isZapo) return;

  const q = m.quoted ? m.quoted : m;
  const mime = (q.msg || q).mimetype || '';
  if (!/image\/(png|jpe?g)/i.test(mime)) return;

  try {
    const buffer = await q.download();
    if (!buffer?.length) return;

    const hash = createHash('sha1').update(buffer).digest('hex');
    if (session.images.some((v) => v.hash === hash)) {
      return void conn.reply(m.chat, '❌ Gambarnya sama dengan yang tadi. Kirim gambar yang *beda*.', m);
    }

    const url = await uploadImage(buffer);
    if (!url) return void conn.reply(m.chat, '❌ Gagal mengunggah gambar, coba kirim ulang.', m);

    session.images.push({ url, hash });

    if (session.images.length < 2) {
      arm(conn, m.chat, 'images', IMAGE_TIMEOUT, '⏱️ Sesi dibatalkan (gambar kurang).');
      return void conn.reply(m.chat, `✅ Gambar 1 (${session.labels[0]}) diterima. Kirim *gambar 2* (${session.labels[1]}).`, m);
    }

    arm(conn, m.chat, 'text', TEXT_TIMEOUT, '⏱️ Sesi dibatalkan (isian tidak dikirim).');
    conn.reply(m.chat, `✅ 2 gambar diterima.\n\nSekarang kirim:\n*${session.usage}*`, m);
  } catch (e) {
    console.log(e);
    m.reply('❌ Gagal memproses gambar, coba kirim ulang.');
  }
};
