import fetch from 'node-fetch';
import uploadImage from './uploadImage.js';

const API = 'https://api.botcahx.eu.org/api/maker';

export const parts = (text) =>
  String(text || '')
    .split('|')
    .map((v) => v.trim());

export const clock = (sep = ':') =>
  new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  })
    .format(new Date())
    .replace(':', sep);

export const imageSource = (m) => {
  const src = m.quoted && m.quoted.download ? m.quoted : m;
  const mime = src.msg?.mimetype || src.mimetype || src.mtype || '';
  return /image/i.test(mime) ? src : null;
};

export const imageUrl = async (m) => {
  const src = imageSource(m);
  if (!src) throw 'Kirim atau balas sebuah gambar.';
  const buffer = await src.download();
  if (!buffer || buffer.length < 1024) throw 'Gambar gagal diunduh, coba kirim ulang.';
  return uploadImage(buffer);
};

export const optionalImageUrl = async (m) => (imageSource(m) ? imageUrl(m) : null);

export const avatarUrl = async (conn, jid, fallback) => {
  try {
    return await conn.profilePictureUrl(jid, 'image');
  } catch {
    return fallback;
  }
};

export const canvas = async (path, params) => {
  const query = new URLSearchParams({ ...params, apikey: btc });
  const res = await fetch(`${API}/${path}?${query}`);
  const type = res.headers.get('content-type') || '';
  if (res.status !== 200 || !/^(image|video)\//.test(type)) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body.message) message = body.message;
    } catch {}
    throw message;
  }
  return { buffer: await res.buffer(), type };
};

export const guard = (run) => async (m, ctx) => {
  try {
    await run(m, ctx);
  } catch (e) {
    console.log(e);
    if (typeof e === 'string') return m.reply(e);
    m.reply('❌ Terjadi kesalahan saat memproses.');
  }
};
