import uploadImage from '../lib/uploadImage.js';
import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command }) => {
    var q = m.quoted ? m.quoted : m;
    var mime = (q.msg || q).mimetype || q.mediaType || '';
    
    let endpoint = '';
    if (command == 'tofigure') endpoint = 'tofigurev3';
    else if (command == 'tofigure2') endpoint = 'tofigurev2';
    else if (command == 'tofigure3') endpoint = 'tofigure';

    if (/image/g.test(mime) && !/webp/g.test(mime)) {
        await conn.reply(m.chat, "⏳ Sedang diproses...", m);
        try {
            const img = await q.download?.();
            let out = await uploadImage(img);
            let old = new Date();
            
            const { data: submitData } = await axios.get(`https://api.botcahx.eu.org/api/maker/${endpoint}`, {
                params: { url: out, apikey: btc }
            });

            if (!submitData.status || !submitData.jobId) {
                throw new Error(submitData.message || 'Gagal submit job.');
            }

            let jobId = submitData.jobId;
            let jobType = submitData.type;

            let convert = await pollJobResult(jobType, jobId);

            await conn.sendMessage(m.chat, { 
                image: convert, 
                caption: `🍟 *Fetching:* ${((new Date() - old) * 1)} ms`
            }, { quoted: m });

        } catch (e) {
            console.error(e);
            if (typeof e === 'string') return m.reply(e);
            m.reply("[ ! ] Terjadi kesalahan saat memproses gambar.");
        }
    } else {
        m.reply(`Kirim gambar dengan caption *${usedPrefix + command}* atau tag gambar yang sudah dikirim.`);
    }
};

handler.help = ['tofigure', 'tofigure2', 'tofigure3'];
handler.command = ['tofigure', 'tofigure2', 'tofigure3'];
handler.tags = ['maker'];
handler.premium = false;
handler.limit = true;

export default handler;

/*
 * @ Poll job status until done/failed, or timeout.
 * @ Param {string} type - job type (e.g. "tofigurev3", "tofigurev2", "tofigure")
 * @ Param {string} jobId - job id returned from submit call
 * @ Param {object} [opts] - { intervalMs, timeoutMs }
 * @ Returns {Buffer} - the final image buffer
 * @ Throws {Error} - on failure or timeout
 */
async function pollJobResult(type, jobId, opts = {}) {
  const intervalMs = opts.intervalMs || 3000;
  const timeoutMs = opts.timeoutMs || 240000;
  const startedAt = Date.now();
  const statusUrl = 'https://api.botcahx.eu.org/api/maker/status/editing-image';

  while (true) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error(`Timeout menunggu hasil job (${type}/${jobId}).`);
    }

    const res = await axios.get(statusUrl, {
      params: { type, jobId },
      responseType: 'arraybuffer',
      validateStatus: () => true
    });

    const contentType = (res.headers['content-type'] || '').toLowerCase();
    const isJson = contentType.includes('application/json');

    if (isJson) {
      let data;
      try {
        data = JSON.parse(Buffer.from(res.data).toString('utf-8'));
      } catch {
        throw new Error(`Gagal parse response status job (${type}/${jobId}).`);
      }

      if (data.status === 'pending') {
        await new Promise(r => setTimeout(r, intervalMs));
        continue;
      }

      if (data.status === false) {
        throw new Error(data.message || `Job ${type}/${jobId} gagal diproses.`);
      }

      const resultUrl = data.result || data.url || data.data?.result || data.data?.url;
      if (resultUrl) {
        const imgRes = await axios.get(resultUrl, { responseType: 'arraybuffer' });
        return Buffer.from(imgRes.data);
      }

      await new Promise(r => setTimeout(r, intervalMs));
      continue;
    }

    return Buffer.from(res.data);
  }
}
