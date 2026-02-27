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
    if (!(hashHex in global.db.data.sticker)) return;

    const hash = global.db.data.sticker[hashHex];
    const { text, mentionedJid } = hash;

    const baileys = await getBaileys();
    const { proto, generateWAMessage, areJidsSameUser } = baileys;

    const fakeMsg = await generateWAMessage(m.chat, {
      text: text,
      mentions: mentionedJid || []
    }, {
      userJid: this.user?.id,
      quoted: m.quoted?.fakeObj || m.quoted
    });

    fakeMsg.key.fromMe = areJidsSameUser(m.sender, this.user?.id);
    fakeMsg.key.id = m.key.id;
    fakeMsg.pushName = m.pushName || m.name || '';

    if (m.isGroup) fakeMsg.participant = m.sender;

    const upsertEvent = {
      ...chatUpdate,
      messages: [proto.WebMessageInfo.fromObject(fakeMsg)],
      type: 'append'  
    };

    this.ev.emit('messages.upsert', upsertEvent);
  }
};