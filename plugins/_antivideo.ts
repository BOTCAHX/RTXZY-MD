const exports: WaPlugin = {} as WaPlugin;
exports.before = async function(m, { isAdmin, isBotAdmin }) {
  if (m.isZapo && m.fromMe) return;
  let chat = global.db.data.chats[m.chat];
  let isVideo = m.mtype;
  if (chat && chat.antivideo && isVideo) {
    if (isAdmin || !isBotAdmin) {
      // admin or bot not admin: video not deleted
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
