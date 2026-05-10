let handler  = async (m, { conn, text }) => {
  
let chats = Object.keys(await conn.chats)
conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
for (let id of chats) {
 await sleep(3000)
 
 conn.sendMessage(id, { image: { url: 'https://telegra.ph/file/aa76cce9a61dc6f91f55a.jpg' }, caption: text.trim(), mentions: [m.sender] }, { quoted: m });

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
