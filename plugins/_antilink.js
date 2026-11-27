let handler = m => m

let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i

handler.before = async function (m, { conn, isBotAdmin, isAdmin }) {
  if ((m.isBaileys && m.fromMe) || m.fromMe || !m.isGroup) return true

  let chat = global.db.data.chats[m.chat]
  if (!chat.antiLink) return true

  let teks = m.text || ""
  if (m.message?.extendedTextMessage?.text) teks = m.message.extendedTextMessage.text
  if (m.message?.conversation) teks = m.message.conversation
  if (m.message?.imageMessage?.caption) teks += m.message.imageMessage.caption
  if (m.message?.videoMessage?.caption) teks += m.message.videoMessage.caption

  let isGroupLink = linkRegex.exec(teks)

  if (chat.antiLink && isGroupLink) {
    await m.reply(`*「 ANTI LINK 」*\n\nA group link was detected from *${await conn.getName(m.sender)}*.`)

    if (isAdmin) return m.reply('*「 ANTI LINK 」*\n\nYou are an admin, so no action was taken.')
    if (!isBotAdmin) return m.reply('*「 ANTI LINK 」*\n\nThe bot is not an admin, so it cannot remove anyone.')

    let linkGC = ('https://chat.whatsapp.com/' + await conn.groupInviteCode(m.chat))
    let isLinkconnGc = new RegExp(linkGC, 'i')
    let isgclink = isLinkconnGc.test(teks)

    if (isgclink) return m.reply('*「 ANTI LINK 」*\n\nThis is the group\'s own invite link, so no action was taken.')

    await conn.sendMessage(m.chat, { delete: m.key })
    await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove")
    await m.reply(`*「 ANTI LINK 」*\n\n*${await conn.getName(m.sender)}* has been removed for sending a group link.`)
  }
  return true
}

export default handler
