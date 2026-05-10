const { loadBaileys } = require('../baileys-loader.mjs');

let baileysCache = null;

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

        if (!m.msg?.fileSha256) return;

        const hashHex = m.msg.fileSha256.toString('hex');

        if (!(hashHex in global.db.data?.sticker)) return;

        const cmdData = global.db.data.sticker[hashHex];
        const { text, mentionedJid } = cmdData;

        const baileys = await getBaileys();
        const { proto, generateWAMessage, areJidsSameUser } = baileys;

        try {
            const fakeMsg = await generateWAMessage(m.chat, {
                text: text,
                mentions: mentionedJid || [],
            }, {
                userJid: this.user?.id,
                quoted: m.quoted?.fakeObj || m.quoted || null,
            });

            fakeMsg.key = {
                ...fakeMsg.key,
                fromMe: areJidsSameUser(m.sender, this.user?.id),
                id: m.key.id,
                participant: m.isGroup ? m.sender : undefined,
            };

            fakeMsg.messageContextInfo = m.messageContextInfo;

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