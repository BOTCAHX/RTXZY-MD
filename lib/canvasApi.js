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
  const url = await uploadImage(buffer);
  if (!/^https?:\/\//i.test(url || '')) throw 'Gagal mengunggah gambar, coba kirim ulang.';
  return url;
};

export const optionalImageUrl = async (m) => (imageSource(m) ? imageUrl(m) : null);

export const avatarUrl = async (conn, jid, fallback) => {
  try {
    const url = await conn.profilePictureUrl(jid, 'image');
    if (/^https?:\/\//i.test(url || '')) return url;
  } catch {}
  return fallback;
};

const request = async (path, params) => {
  const query = new URLSearchParams({ ...params, apikey: btc });
  return fetch(`${API}/${path}?${query}`);
};

export const canvas = async (path, params) => {
  let res = await request(path, params);

  if (res.status >= 500) res = await request(path, params);

  const type = res.headers.get('content-type') || '';
  if (res.status !== 200 || !/^(image|video)\//.test(type)) {
    let message = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      if (body.message) message = body.message;
    } catch {
      try {
        const body = (await res.text()).replace(/<[^>]*>/g, ' ').trim();
        if (body) message = body.slice(0, 120);
      } catch {}
    }
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
