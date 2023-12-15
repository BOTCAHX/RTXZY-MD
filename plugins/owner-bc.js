let handler  = async (m, { conn, text }) => {
  
let chats = Object.keys(await conn.chats)
conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
for (let id of chats) {
 await sleep(3000)
 conn.relayMessage(id, {
extendedTextMessage:{
                text: text.trim(), 
                contextInfo: {
                     externalAdReply: {
                        title: wm,
                        mediaType: 1,
                        previewType: 0,
                        renderLargerThumbnail: true,
                        thumbnailUrl: 'https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg',
                        sourceUrl: ''
                    }
                }, mentions: [m.sender]
}}, {})    

     }
  m.reply('Broadcast selesai')
}
handler.help = ['broadcast','bc'].map(v => v + ' <teks>')
handler.tags = ['owner']
handler.command = /^(broadcast|bc)$/i
handler.owner = true
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
