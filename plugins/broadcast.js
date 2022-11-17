const {command, isPublic} = require(".../lib")

command(
  {      pattern: "bdc",
         fromMe: isPublic,
         type: "mics",
  },
  async (m, { conn, text }) => {
     let chats = Object.keys(await conn.chats)
     conn.reply(m.chat, `_Mengirim pesan broadcast ke ${chats.length} chat_`, m)
     for (let id of chats) {
        let bcbg = 'https://database.tioclkp02.repl.co/1920b808c70288df5bbe1.png'
        await conn.send2ButtonImg(id, bcbg, text.trim(), wm, 'Thanks Info', 'thanks', 'Owner', '.owner', m)
     }
  m.reply('*Broadcast amarok*')
}
message.help = ['broadcast','bc'].map(v => v + ' <teks>')
message.tags = ['owner']
message.command = /^(broadcast|bc)$/i
message.owner = true
message.mods = false
message.premium = false
message.group = false
message.private = false

message.admin = false
message.botAdmin = false

message.fail = null
