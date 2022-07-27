let handler = async (m, { conn }) => {
let ye = `@${m.sender.split`@`[0]}`
let esce = `
Hai ${ye} Bot Ini Tidak open source :)\n\n Tapi kalian bisa menggunakan Database Bot Ini\n\n> https://database.tioclkp02.repl.co\n> https://json-server.tioclkp02.repl.co
`
conn.sendBut(m.chat, esce, wm3, 'Thanks', 'thanks', m) 
}
handler.help = ['sc', 'sourcecode']
handler.tags = ['info']
handler.command = /^(sc|sourcecode)$/i

module.exports = handler
