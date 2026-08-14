import fs from 'fs';
import { proto } from 'zapo-js';
import uploader from '../lib/uploadFile.ts';
import { stickerToImage, stickerToGif, stickerToMp4, detectStickerKind, STICKER_KIND } from '../lib/sticker-convert.ts';

function findMediaInner(q) {
    if (!q || typeof q !== 'object') return null;
    if (q.url || q.directPath || q.mediaKey) return q;
    if (q.msg && typeof q.msg === 'object' && (q.msg.url || q.msg.directPath || q.msg.mediaKey)) return q.msg;
    if (q.message && typeof q.message === 'object') {
        if (q.message.url || q.message.directPath || q.message.mediaKey) return q.message;
        for (const k of Object.keys(q.message)) {
            const v = q.message[k];
            if (v && typeof v === 'object' && (v.url || v.directPath || v.mediaKey)) return v;
        }
    }
    return null;
}

async function downloadSticker(conn, q) {
    let buffer = Buffer.alloc(0);
    let reason = '';
    if (typeof q.download === 'function') {
        try {
            buffer = await q.download();
        } catch (e) {
            reason = 'smsg-dl: ' + (e?.message || e);
        }
    }
    if (buffer && buffer.length) return { buffer, reason: '' };

    const inner = findMediaInner(q);
    if (!inner) {
        return { buffer, reason: reason || 'media tidak lengkap: ' + JSON.stringify(Object.keys(q || {})) };
    }
    try {
        const wrapped = { stickerMessage: { ...inner, mimetype: 'image/webp' } };
        let bytes;
        try {
            bytes = await conn._client.message.downloadBytes(wrapped);
        } catch (e) {
            reason = 'direct-plain: ' + (e?.message || e);
            try {
                bytes = await conn._client.message.downloadBytes(new proto.Message(wrapped));
            } catch (e2) {
                reason += ' | direct-proto: ' + (e2?.message || e2);
                return { buffer: Buffer.alloc(0), reason };
            }
        }
        return { buffer: Buffer.from(bytes), reason };
    } catch (e) {
        return { buffer: Buffer.alloc(0), reason: 'direct: ' + (e?.message || e) };
    }
}

let handler: WaPlugin = async (m, { conn, usedPrefix, command }) => {
    let q = m.quoted ? m.quoted : m;
    let mime = (q.msg || q).mimetype || q.mediaType || '';
    let isSticker = /sticker/i.test(q.mtype || '') || /webp|was/i.test(mime) || q.isLottie;
    if (!isSticker) {
        await m.reply(`Reply sticker with command ${usedPrefix + command}`);
        return;
    }
    await m.reply(wait);
    let buffer;
    try {
        const r = await downloadSticker(conn, q);
        buffer = r.buffer;
        if (!buffer || !buffer.length) {
            await m.reply('Gagal mengunduh sticker.' + (r.reason ? '\n⚠️ ' + String(r.reason).slice(0, 300) : ''));
            return;
        }
        // 1) Coba API dulu
        try {
            const media = await uploader(buffer);
            let json;
            if (command === 'togif' || command === 'tomp4') {
                json = await (await fetch(`https://api.botcahx.eu.org/api/tools/webp2mp4?url=${media}&apikey=${btc}`)).json();
            } else if (command === 'toimg') {
                json = await (await fetch(`https://api.botcahx.eu.org/api/tools/webp2png?url=${media}&apikey=${btc}`)).json();
            }
            if (json && json.result) {
                await conn.sendFile(m.chat, json.result, null, '*DONE*', m);
                return;
            }
        } catch (e) {
            console.warn('sticker: api gagal, fallback ke lokal:', e?.message || e);
        }
        // 2) Fallback konversi lokal
        const isLottie = detectStickerKind(buffer) === STICKER_KIND.LOTTIE;
        let out;
        let filename = 'sticker.png';
        if (isLottie) {
            out = await stickerToGif(buffer);
            filename = 'sticker.gif';
        } else if (command === 'toimg') {
            out = await stickerToImage(buffer);
        } else if (command === 'togif') {
            out = await stickerToGif(buffer);
            filename = 'sticker.gif';
        } else {
            out = await stickerToMp4(buffer);
            filename = 'sticker.mp4';
        }
        if (out && out.length) {
            await conn.sendFile(m.chat, out, filename, '*DONE*', m);
        } else {
            await m.reply('Error: Failed to convert file. Please try again.');
        }
    } catch (err) {
        console.error('sticker convert error:', err);
        let dbg = 'no-buffer';
        if (buffer && buffer.length) {
            try { fs.writeFileSync('/tmp/lottie-debug.bin', buffer); } catch { /* ignore */ }
            dbg = 'kind=' + detectStickerKind(buffer) + ' head=' + buffer.slice(0, 8).toString('hex') + ' len=' + buffer.length;
        }
        await m.reply('An error occurred while processing your request.\n⚠️ ' + String(err?.message || err).slice(0, 200) + '\n' + dbg);
    }
}

handler.help = ['toimg', 'togif', 'tomp4'];
handler.tags = ['tools'];
handler.command = /^(toimg|togif|tomp4)$/i;
handler.limit = true;

export default handler;
