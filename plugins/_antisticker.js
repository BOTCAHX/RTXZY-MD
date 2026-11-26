let handler = m => m

const stickerTypes = ['stickerMessage', 'lottieStickerMessage', 'audioStickerMessage']

handler.before = function (m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  let isSticker = stickerTypes.includes(m.mtype) ||
    !!(m.msg?.message?.stickerMessage || m.msg?.message?.lottieStickerMessage)
  if (chat?.antiSticker && isSticker) {
    if (global.opts) {
      if (!(isAdmin || !isBotAdmin)) {
        this.sendMessage(m.chat, { delete: m.key })
      }
      return true
    }
  }
  return true
}

handler.group = true
export default handler
