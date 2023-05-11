let handler = async (m, { conn, command, text }) => {
  await conn.sendMessage(m.chat, { delete: m.key})
}
handler.customPrefix = /(https?:\/\/)?(www\.)?(chat.whatsapp.com\/invite\/)?([0-9A-Za-z]{20,24})/ig
handler.command = new RegExp()

module.exports = handler
