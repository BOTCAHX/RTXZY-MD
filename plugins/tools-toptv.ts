let handler: WaPlugin = async (m, { conn, command, usedPrefix }) => {
  try {
    if (m.message.extendedTextMessage) {
      if (!m.message.extendedTextMessage.contextInfo?.quotedMessage?.videoMessage) {
        throw `Balas video dengan perintah ${usedPrefix + command}`
      }
      
      var datavid: { ptvMessage: unknown } = { ptvMessage: m.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage }
      conn.relayMessage(m.chat, datavid, {})
    } else {
      if (!m.message.videoMessage) {
        throw `Balas video dengan perintah ${usedPrefix + command}`
      }
      
      var datavid: { ptvMessage: unknown } = { ptvMessage: m.message.videoMessage }
      conn.relayMessage(m.chat, datavid, {})
    }
  } catch (error) {
    m.reply(error.toString())
  }
}
handler.help = ['ptv','toptv']
handler.command = /^(toptv|ptv|ptvmessage)$/i
handler.tags = ['tools']
handler.limit = true;
export default handler
