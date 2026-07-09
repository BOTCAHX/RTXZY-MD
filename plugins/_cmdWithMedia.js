const { loadBaileys } = require('../baileys-loader.mjs');

let baileysCache = null;

/** Convert comma-separated decimal keys to hex keys (migration from old format).
 *  Runs on every message — cheap after first pass since converted keys won't match. */
function migrateStickerKeys() {
    const sticker = global.db.data?.sticker;
    if (!sticker) return;
    const commaKey = /^\d+(,\d+){31}$/;  // 32 comma-sep decimals = old key format
    for (const key of Object.keys(sticker)) {
        if (!commaKey.test(key)) continue;
        const hexKey = Buffer.from(key.split(',').map(Number)).toString('hex');
        if (hexKey in sticker) continue;  // already exists, skip
        sticker[hexKey] = sticker[key];
        delete sticker[key];
    }
}

/** Normalize fileSha256 to hex string regardless of input type */
function hashToHex(fileSha256) {
    return Buffer.from(fileSha256).toString('hex');
}

async function getBaileys() {
    if (!baileysCache) {
        baileysCache = await loadBaileys();
    }
    return baileysCache;
}

module.exports = {
    async all(m, chatUpdate) {
        if (m.isBaileys) return;
        if (!m.message) return;

        // Run migration — no guard so it also catches keys loaded after init
        migrateStickerKeys();

        if (!m.msg?.fileSha256) return;

        const hashHex = hashToHex(m.msg.fileSha256);

        if (!(hashHex in global.db.data?.sticker)) return;

        const cmdData = global.db.data.sticker[hashHex];
        const { text, mentionedJid } = cmdData;

        const baileys = await getBaileys();
        const { proto, generateWAMessage } = baileys;

        try {
            const fakeMsg = await generateWAMessage(m.chat, {
                text: text,
                mentions: mentionedJid || [],
            }, {
                userJid: m.sender,
            });

            fakeMsg.key = {
                ...fakeMsg.key,
                fromMe: false,
                id: m.key.id,
                participant: m.sender,
            };

            const upsertEvent = {
                ...chatUpdate,
                messages: [proto.WebMessageInfo.fromObject(fakeMsg)],
                type: 'append'
            };

            this.ev.emit('messages.upsert', upsertEvent);

        } catch (e) {
            console.error('Error Media:', e);
        }
    }
};
