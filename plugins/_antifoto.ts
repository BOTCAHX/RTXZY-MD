const exports: WaPlugin = {} as WaPlugin;
exports.before = async function(m, { isAdmin, isBotAdmin }) {
  if (m.isZapo && m.fromMe) return;
  let chat = global.db.data.chats[m.chat]
  let isFoto = m.mtype
  if (chat.antiFoto && isFoto ) {
    if (isAdmin || !isBotAdmin) {
      // admin or bot not admin: photo not deleted
    } else {
    if(isFoto === "imageMessage")	 
      await this.sendMessage(m.chat, { delete: m.key });
      return true
    }
  }
  return true
}

export default exports;
