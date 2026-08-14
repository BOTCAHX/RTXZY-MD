let handler: WaPlugin = m => m

handler.before = function (m, { isAdmin, isBotAdmin }) {
  if (m.isZapo && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let sender = global.db.data.chats[m.sender]
  

  let isSticker = m.mtype
  if (chat.antiSticker && isSticker) {
    if(isSticker === "stickerMessage" || isSticker === "lottieStickerMessage"){
      if (global.opts) {
        if (!(isAdmin || !isBotAdmin)) {
          this.sendMessage(m.chat, { delete: m.key })
        }
        return true
      }
    }
  }
  return true
}

handler.group = true
export default handler
