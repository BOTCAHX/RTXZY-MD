const exports = {};
exports.before = async function(m, { isAdmin, isBotAdmin }) {
  if (m.isZapo && m.fromMe) return;
  let chat = global.db.data.chats[m.chat];
  let isAudio = m.mtype;
  if (chat && chat.autodelvn && isAudio) {
    if (isAdmin || !isBotAdmin) {
      // admin/bot bukan admin → VN tidak dihapus
    } else {
      if (isAudio === "audioMessage") {
        await this.sendMessage(m.chat, { delete: m.key });
        return true;
      }
    }
  }
  return true;
}

export default exports;
