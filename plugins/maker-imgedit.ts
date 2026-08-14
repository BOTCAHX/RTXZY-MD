import uploadImage from '../lib/uploadImage.ts';
import fetch from 'node-fetch';
import axios from 'axios';

let handler: WaPlugin = async (m, { 
  conn, 
  usedPrefix, 
  command, 
  args,
  text
}) => {
  var q = m.quoted ? m.quoted : m;
  var mime = (q.msg || q).mimetype || q.mediaType || '';

  let endpoint = '';
  let isImgEdit = command === 'imgedit';
  let promptText = isImgEdit ? (text || args.join(' ')) : '';

  if (isImgEdit && !promptText) {
    return m.reply(`Please provide text for editing the image.`);
  }

  switch (command) {
    case 'todisney':
      endpoint = 'jadidisney';
      break;
    case 'topixar':
      endpoint = 'jadipixar';
      break;
    case 'tocartoon':
      endpoint = 'jadicartoon';
      break;
    case 'tocyberpunk':
      endpoint = 'jadicyberpunk';
      break;
    case 'tovangogh':
      endpoint = 'jadivangogh';
      break;
    case 'topixelart':
      endpoint = 'jadipixelart';
      break;
    case 'tocomicbook':
      endpoint = 'jadicomicbook';
      break;
    case 'tohijab':
      endpoint = 'jadihijab';
      break;
    case 'tohitam':
    case 'hitamkan':
    case 'hytamkan':
      endpoint = 'jadihitam';
      break;
    case 'toputih':
      endpoint = 'jadiputih';
      break;
    case 'toghibli':
      endpoint = 'jadighibili';
      break;
    case 'imgedit':
      endpoint = 'imgedit';
      break;
    default:
      return m.reply(`Command *${command}* not recognized. Please use a valid one.`);
  }

  if (/image/g.test(mime) && !/webp/g.test(mime)) {
    await conn.reply(m.chat, '🍟 *Processing...*', m);
    try {
      const img = await q.download?.();
      let out = await uploadImage(img);
      let old = Date.now();

      // Step 1: submit job
      let submitData;

      if (isImgEdit) {
        const { data } = await axios.post("https://api.botcahx.eu.org/api/maker/imgedit", {
          text: promptText,
          url: out,
          apikey: btc
        });
        submitData = data;
      } else {
        const { data } = await axios.get(`https://api.botcahx.eu.org/api/maker/${endpoint}`, {
          params: { url: out, apikey: btc }
        });
        submitData = data;
      }

      if (!submitData.status || !submitData.jobId) {
        throw new Error(submitData.message || 'Gagal submit job.');
      }

      let jobId = submitData.jobId;
      let jobType = submitData.type;

      // Step 2: poll until done
      let convert = await pollJobResult(jobType, jobId, { isJsonResult: isImgEdit });

      if (isImgEdit) {
        await conn.sendMessage(m.chat, {
          image: convert,
          caption: `🍟 *Fetching* : ${((Date.now() - old) * 1)} ms\n📋 *Prompt*: ${promptText}`
        }, { quoted: m });
      } else {
        await conn.sendMessage(m.chat, {
          image: convert,
          caption: `🍟 *Fetching* : ${((Date.now() - old) * 1)} ms`
        }, { quoted: m });
      }

    } catch (e) {
      console.log(e);
      m.reply(`[ ! ] Identifikasi Gagal.`)
    }
  } else {
    m.reply(`Please send an image with caption *${usedPrefix + command}* or reply to an image.`);
  }
};

handler.help = ['todisney', 'topixar', 'tocartoon', 'tocyberpunk', 'tovangogh', 'topixelart', 'tocomicbook', 'tohijab', 'tohitam', 'hitamkan', 'hytamkan', 'toputih', 'toghibli', 'imgedit'];
handler.command = ['todisney', 'topixar', 'tocartoon', 'tocyberpunk', 'tovangogh', 'topixelart', 'tocomicbook', 'tohijab', 'tohitam', 'hitamkan', 'hytamkan', 'toputih', 'toghibli', 'imgedit'];
handler.tags = ['maker'];
handler.premium = false;
handler.limit = 5;

export default handler;

/*
 * @ Poll job status until done/failed, or timeout.
 * @ Param {string} type - job type (e.g. "imgedit", "jadidisney", "jadipixar", ...)
 * @ Param {string} jobId - job id returned from submit call
 * @ Param {object} [opts] - { intervalMs, timeoutMs, isJsonResult }
 *   - isJsonResult: true if while status is "pending" the response is a JSON status,
 *     and when done also a JSON containing { result: "url" } (imgedit only).
 *     false if when done the response is directly an image buffer (not JSON).
 * @ Returns {Buffer} - the final image buffer
 * @ Throws {Error} - on failure or timeout
 */
async function pollJobResult(type, jobId, opts: { intervalMs?: number; timeoutMs?: number; isJsonResult?: boolean } = {}) {
  const intervalMs = opts.intervalMs || 3000;
  const timeoutMs = opts.timeoutMs || 240000; // 4 minutes
  const isJsonResult = !!opts.isJsonResult;
  const startedAt = Date.now();
  const statusUrl = 'https://api.botcahx.eu.org/api/maker/status/editing-image';

  while (true) {
    if (Date.now() - startedAt > timeoutMs) {
      throw new Error(`Timeout menunggu hasil job (${type}/${jobId}).`);
    }

    const res = await axios.get<Buffer>(statusUrl, {
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

      if (isJsonResult) {
        if (resultUrl) {
          const imgRes = await axios.get<Buffer>(resultUrl, { responseType: 'arraybuffer' });
          return Buffer.from(imgRes.data);
        }
        await new Promise(r => setTimeout(r, intervalMs));
        continue;
      }

      await new Promise(r => setTimeout(r, intervalMs));
      continue;
    }

    return Buffer.from(res.data);
  }
}
