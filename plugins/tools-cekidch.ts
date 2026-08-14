import axios from 'axios';

const CHANNEL_PAGE = 'https://whatsapp.com/channel/';

const UA_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9'
};

function decodeEntities(str = '') {
  return str
    .replace(/&#0?39;|&#x27;/gi, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&#x2022;|&#8226;/g, '•')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#\d+;/g, '');
}

function parseChannelId(text) {
  if (text.includes('whatsapp.com/channel/')) {
    return text.split('whatsapp.com/channel/')[1].split('/')[0];
  }
  if (text.includes('wa.me/channel/')) {
    return text.split('wa.me/channel/')[1].split('/')[0];
  }
  return text;
}

async function scrapeChannelPage(channelId) {
  const url = CHANNEL_PAGE + channelId;
  const { data } = await axios.get(url, { timeout: 20000, headers: UA_HEADERS, maxRedirects: 5 });
  const ogTitle = data.match(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i)?.[1];
  const ogDesc = data.match(/<meta[^>]+property="og:description"[^>]+content="([^"]*)"/i)?.[1] ?? '';
  const ogImage = decodeEntities(data.match(/<meta[^>]+property="og:image"[^>]+content="([^"]*)"/i)?.[1]);
  const metaDesc = data.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1] ?? '';
  if (!ogTitle) throw new Error('channel page returned no metadata');
  const followers = ogDesc.match(/([\d.,]+)\s*followers/i)?.[1] ?? ogDesc.match(/([\d.,]+)\s*subscribers/i)?.[1];
  let description = (metaDesc || ogDesc).replace(/^Follow\s+[^']+'s\s+WhatsApp Channel\.\s*/i, '');
  description = decodeEntities(description);
  return { name: decodeEntities(ogTitle), followers, description, picture: ogImage };
}

let handler: WaPlugin = async (m, { conn, text, command, usedPrefix }) => {
  if (!text) throw `Silakan masukkan link channel WhatsApp.\nContoh:\n${usedPrefix + command} https://whatsapp.com/channel/0029VbAI9JCBKfi5qXq9yJ01`
  const channelId = parseChannelId(text);

  let meta = null;
  let via = 'api';
  try {
    const newsletter = conn._client?.newsletter;
    if (newsletter?.fetch) {
      const jid = channelId.endsWith('@newsletter') ? channelId : `${channelId}@newsletter`;
      try {
        meta = await newsletter.fetch(jid, { fetchFullImage: true });
      } catch (e) {
        try {
          meta = await newsletter.fetchByInvite(channelId, { fetchFullImage: true });
        } catch (e2) {
          console.error('cekidch newsletter api failed (jid + invite):', e?.message, '|', e2?.message)
        }
      }
    }
  } catch (err) {
    console.error('cekidch newsletter api error:', err?.message)
  }

  if (!meta || !meta.name) {
    try {
      meta = await scrapeChannelPage(channelId);
      via = 'web';
    } catch (err) {
      console.error('cekidch scrape failed:', err?.message)
      return m.reply(`*Error*: ID channel tidak valid atau channel tidak ditemukan.\n\nID yang digunakan: ${channelId}`);
    }
  }

  let response = `📢 *Informasi Channel WhatsApp*\n\n`;
  response += `📛 *Nama Channel*: ${meta.name || '-'}\n`;
  response += `🆔 *ID Channel*: ${channelId}\n`;
  response += `👥 *Jumlah Subscriber*: ${meta.subscribersCount ?? meta.followers ?? '-'}\n`;
  if (meta.verification) response += `✅ *Verifikasi*: ${meta.verification}\n`;
  if (meta.creationTime) response += `⏰ *Waktu Dibuat*: ${new Date(meta.creationTime * 1000).toLocaleString()}\n`;
  response += `📝 *Deskripsi*:\n${meta.description || '-'}\n`;
  response += `\n_(sumber: ${via === 'api' ? 'API WhatsApp' : 'halaman web channel'})_`;

  let previewUrl = null;
  if (meta.preview?.directPath) {
    previewUrl = 'https://mmg.whatsapp.net' + meta.preview.directPath;
  } else if (typeof meta.picture === 'string') {
    previewUrl = meta.picture;
  } else if (meta.picture?.directPath) {
    previewUrl = 'https://mmg.whatsapp.net' + meta.picture.directPath;
  }
  if (previewUrl) {
    try {
      const { data: imageBuffer } = await axios.get<Buffer>(previewUrl, {
        timeout: 20000,
        responseType: 'arraybuffer',
        headers: UA_HEADERS
      });
      await conn.sendFile(m.chat, Buffer.from(imageBuffer), 'preview.jpg', response, m);
    } catch (e) {
      console.error('cekidch send preview failed:', e?.message)
      return m.reply(response);
    }
  } else {
    return m.reply(response);
  }
}

handler.command = ['cekidch'];
handler.tags = ['tools'];
handler.premium = false;
handler.limit = true;

export default handler;
