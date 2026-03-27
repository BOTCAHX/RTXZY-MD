const { loadBaileys } = require('../baileys-loader.mjs');

let baileys;

let handler = async (m, { conn, text, usedPrefix }) => {
    if (!baileys) {
        baileys = await loadBaileys();
    }

    function no(number) {
        if (!number) return '';
        return number.replace(/\s/g, '').replace(/[@+-]/g, '').replace(/[^0-9]/g, '');
    }

    let who = '';

    if (m.mentionedJid && m.mentionedJid.length > 0) {
        who = m.mentionedJid[0];
    } else if (text) {
        let cleaned = no(text);
        if (cleaned) {
            who = cleaned + '@s.whatsapp.net';
        }
    }

    if (!who) {
        return conn.reply(m.chat, `*『 G A G A L 』*\n\n${usedPrefix}unprem @tag / nomor\n\n*Contoh:*\n${usedPrefix}unprem @user\n${usedPrefix}unprem 6285764068784`, m);
    }

    if (who.endsWith('@lid')) {
        who = who.replace('@lid', '@s.whatsapp.net');
    }

    if (!global.db.data.users[who]) {
        return conn.reply(m.chat, `❌ User dengan ID ${who.split('@')[0]} tidak ditemukan di database.`, m);
    }

    global.db.data.users[who].premium = false;
    global.db.data.users[who].premiumTime = 0;

    await conn.reply(m.chat, `*Berhasil menghapus akses premium untuk @${who.split('@')[0]}.*`, m, {
        contextInfo: { mentionedJid: [who] }
    });
};

handler.help = ['unprem'];
handler.tags = ['owner'];
handler.command = /^(unprem|delprem)$/i;
handler.owner = true;
handler.fail = null;

module.exports = handler;
