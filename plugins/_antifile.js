const exports = {};
exports.before = async function(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return;
  let chat = global.db.data.chats[m.chat];
  let isDocument = m.mtype;
  if (chat && chat.antifile && isDocument) {
    if (isAdmin || !isBotAdmin) {     
    } else {
      if (isDocument === "documentMessage") {
        await this.sendMessage(m.chat, { delete: m.key });
        return true;
      }
    }
  }
  return true;
}

export default exports;
