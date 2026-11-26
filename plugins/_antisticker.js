let handler = m => m

const stickerTypes = ['stickerMessage', 'lottieStickerMessage', 'audioStickerMessage']

const isStickerMessage = (m) => stickerTypes.includes(m.mtype) ||
  !!m.message?.audioStickerMessage ||
  !!(m.msg?.message?.stickerMessage || m.msg?.message?.lottieStickerMessage)

handler.before = function (m, { isAdmin, isBotAdmin }) {
  if (m.isZapo && m.fromMe) return true
  let chat = global.db.data.chats[m.chat]
  if (!chat?.antiSticker) return true
  if (!isStickerMessage(m)) return true
  if (isAdmin || !isBotAdmin) {
    console.log(`[antisticker] skip ${m.id} mtype=${m.mtype} isAdmin=${isAdmin} isBotAdmin=${isBotAdmin}`)
    return true
  }
  this.sendMessage(m.chat, { delete: m.key }).catch(e => console.error(`[antisticker] gagal hapus ${m.id}:`, e?.message || e))
  return true
}

handler.group = true
export default handler
