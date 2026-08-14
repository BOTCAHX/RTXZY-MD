const exports = {};
exports.before = async function(m, { isAdmin, isBotAdmin }) {
  if (m.isZapo && m.fromMe) return;
  let chat = global.db.data.chats[m.chat];
  let isVideo = m.mtype;
  if (chat && chat.antivideo && isVideo) {
    if (isAdmin || !isBotAdmin) {
      // admin/bot bukan admin → video tidak dihapus
    } else {
      if (isVideo === "videoMessage") {
        await this.sendMessage(m.chat, { delete: m.key });
        return true;
      }
    }
  }
  return true;
}

export default exports;
