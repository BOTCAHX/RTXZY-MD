import uploadImage from '../lib/uploadImage.js';
import { createHash } from 'crypto';

const IMAGE_TIMEOUT = 90_000;
const TEXT_TIMEOUT = 180_000;

const GUIDE = (p, c) => `*Cara pakai ${p + c}:*
1. Ketik *${p + c}* — bot minta 2 gambar
2. Kirim *2 gambar berbeda* (avatar komentator 1 & 2)
3. Kirim caption:
${p + c} user1|komentar1|likes|user2|balasan|likes2

*Contoh:*
${p + c} BOTCAHX|Mantap kali bos|12500|Supri|Setuju banget|15

• likes boleh kosong (otomatis 0)
• Semua avatar diambil dari 2 gambar yang kamu kirim`;

const store = conn => (conn.ttc = conn.ttc && typeof conn.ttc === 'object' ? conn.ttc : {});

const cleanup = (conn, id) => {
    const s = conn.ttc?.[id];
    if (!s) return;
    if (s.timeout) clearTimeout(s.timeout);
    delete conn.ttc[id];
};

const arm = (conn, id, stage, ms, note) => {
    const s = conn.ttc[id];
    clearTimeout(s.timeout);
    s.stage = stage;
    s.timeout = setTimeout(() => {
        if (!conn.ttc?.[id]) return;
        delete conn.ttc[id];
        conn.reply(id, note);
    }, ms);
};

const digits = v => String(v ?? '').replace(/[^\d]/g, '').replace(/^0+(?=\d)/, '') || '0';

async function render(conn, m, session, field) {
    const [img1, img2] = session.images;

    const query = new URLSearchParams({
        user1: field.user1,
        text1: field.text1,
        likes: digits(field.likes),
        user2: field.user2,
        text2: field.text2,
        likes2: digits(field.likes2),
        avatar1: img1.url,
        avatar2: img2.url,
        avatarMe: img1.url,
        apikey: btc
    });

    const res = await fetch(`https://api.botcahx.eu.org/api/maker/canvas-ttComment?${query}`);
    const type = res.headers.get('content-type') || '';
    const buf = Buffer.from(await res.arrayBuffer());

    if (!type.startsWith('image/')) {
        let msg = `❌ Gagal membuat gambar (HTTP ${res.status}).`;
        try {
            const json = JSON.parse(buf.toString());
            if (json?.message) msg = `❌ ${json.message}`;
        } catch {}
        throw msg;
    }

    cleanup(conn, m.chat);
    await conn.sendMessage(m.chat, {
        image: buf,
        caption: `✅ *TikTok Comment*\n\n◦ ${field.user1}: ${field.text1}\n◦ ${field.user2}: ${field.text2}`
    }, { quoted: m });
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
    store(conn);
    const id = m.chat;
    const px = usedPrefix + command;
    const session = conn.ttc[id];

    if (!session) {
        conn.ttc[id] = { stage: 'images', images: [], prefix: px };
        arm(conn, id, 'images', IMAGE_TIMEOUT, `⏱️ Sesi *${command}* dibatalkan (tidak ada gambar masuk).`);
        return m.reply(`🖼️ Kirim *2 gambar berbeda* sekarang (avatar komentator 1 & 2).\n_Waktu ${IMAGE_TIMEOUT / 1000} detik._\n\nSetelah itu kirim caption:\n*${px} user1|komentar1|likes|user2|balasan|likes2*`);
    }

    if (session.stage === 'images') {
        return m.reply(`Baru *${session.images.length}/2* gambar diterima. Kirim gambar ke-${session.images.length + 1}.`);
    }

    const field = String(text ?? '').split('|').map(v => v.trim());
    const [user1, text1, likes, user2, text2, likes2] = field;

    if (field.length < 6 || !user1 || !text1 || !user2 || !text2) throw GUIDE(usedPrefix, command);

    try {
        await m.reply('⏳ _Sedang membuat gambar..._');
        await render(conn, m, session, { user1, text1, likes, user2, text2, likes2 });
    } catch (e) {
        cleanup(conn, id);
        console.log(e);
        if (typeof e === 'string') return m.reply(e);
        m.reply('❌ Terjadi kesalahan saat memproses.');
    }
};

handler.before = async (m, { conn }) => {
    const session = conn.ttc?.[m.chat];
    if (!session || session.stage !== 'images') return;
    if (m.isZapo) return;

    const q = m.quoted ? m.quoted : m;
    const mime = (q.msg || q).mimetype || '';
    if (!/image\/(png|jpe?g)/i.test(mime)) return;

    try {
        const buf = await q.download();
        if (!buf?.length) return;

        const hash = createHash('sha1').update(buf).digest('hex');
        if (session.images.some(v => v.hash === hash)) {
            return void conn.reply(m.chat, '❌ Gambarnya sama dengan yang tadi. Kirim gambar yang *beda*.', m);
        }

        const url = await uploadImage(buf);
        if (!url) return void conn.reply(m.chat, '❌ Gagal mengunggah gambar, coba kirim ulang.', m);

        session.images.push({ url, hash });

        if (session.images.length < 2) {
            arm(conn, m.chat, 'images', IMAGE_TIMEOUT, '⏱️ Sesi dibatalkan (gambar kurang).');
            return void conn.reply(m.chat, '✅ Gambar 1 diterima. Kirim *gambar 2* (harus beda).', m);
        }

        arm(conn, m.chat, 'text', TEXT_TIMEOUT, '⏱️ Sesi dibatalkan (caption tidak dikirim).');
        const px = session.prefix;
        conn.reply(m.chat, `✅ 2 gambar diterima.\n\nSekarang kirim caption:\n*${px} user1|komentar1|likes|user2|balasan|likes2*\n\n*Contoh:*\n${px} BOTCAHX|Mantap kali bos|12500|Supri|Setuju banget|15`, m);
    } catch (e) {
        console.log(e);
        m.reply('❌ Gagal memproses gambar, coba kirim ulang.');
    }
};

handler.help = ['ttcomment'];
handler.tags = ['maker'];
handler.command = /^(ttcomment|ttc)$/i;
handler.limit = true;

export default handler;
