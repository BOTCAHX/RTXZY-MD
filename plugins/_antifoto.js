const exports = {};
exports.before = async function(m, { isAdmin, isBotAdmin }) {
  if (m.isZapo && m.fromMe) return;
  let chat = global.db.data.chats[m.chat]
  let isFoto = m.mtype
  if (chat.antiFoto && isFoto ) {
    if (isAdmin || !isBotAdmin) {
      // admin/bot bukan admin → foto tidak dihapus
    } else {
    if(isFoto === "imageMessage")	 
      await this.sendMessage(m.chat, { delete: m.key });
      return true
    }
  }
  return true
}

export default exports;
